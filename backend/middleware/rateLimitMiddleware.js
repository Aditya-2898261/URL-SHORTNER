import { redisClient } from "../config/redis.js";

const TOKEN_BUCKET_SCRIPT = `
    local capacity = tonumber(ARGV[1])
    local now = tonumber(ARGV[2])
    local refillRatePerMs = tonumber(ARGV[3])

    if not capacity or capacity < 1 
      or not now 
      or not refillRatePerMs  or refillRatePerMs <= 0 then
     return redis.error_reply("Invalid token bucket configuration")
    end

    local bucketCount = #KEYS
    if bucketCount == 0 then 
     return redis.error_reply("At least one bucket key is required")
    end
      
    local buckets = {}
    local maxRetryAfterMs = 0

    for i = 1, bucketCount do
      local values = redis.call("HMGET",KEYS[i],"tokens","lastRefillTime")
      local tokens = tonumber(values[1])
      local lastRefillTime = tonumber(values[2])

      if not tokens or not lastRefillTime then 
        tokens = capacity
        lastRefillTime = now
      else
        local elapsed = math.max(0, now - lastRefillTime)
        local tokensToAdd = elapsed * refillRatePerMs
        tokens = math.min(capacity, tokens + tokensToAdd)
        lastRefillTime = now
      end

      buckets[i] = {
       tokens = tokens,
       lastRefillTime = lastRefillTime
      }

      if tokens < 1 then 
        local retryAfterMs = math.ceil((1 - tokens) / refillRatePerMs)
        maxRetryAfterMs = math.max(maxRetryAfterMs,retryAfterMs)
      end
    end

    local allowed = 1

    if maxRetryAfterMs > 0 then 
       allowed = 0;
    else
       for i = 1, bucketCount do
         buckets[i].tokens = buckets[i].tokens-1
       end
    end

    local ttlMs = math.ceil((capacity/refillRatePerMs)+1000)


    for i = 1, bucketCount do
      redis.call("HSET",KEYS[i],"tokens", tostring(buckets[i].tokens), "lastRefillTime", tostring(buckets[i].lastRefillTime))
      redis.call("PEXPIRE",KEYS[i],ttlMs)
    end

    local minTokens = buckets[1].tokens
    for i = 2, bucketCount do
      minTokens = math.min(minTokens,buckets[i].tokens)
    end

    return {
       allowed,
       maxRetryAfterMs,
       math.floor(minTokens)
    }
`;

export const rateLimitMiddleware = (rule) => {
    return async(req,res,next) => {
        if(
            !rule || 
            !Number.isFinite(rule.capacity) ||
            rule.capacity < 1 ||
            !Number.isFinite(rule.refillRatePerMs) ||
            rule.refillRatePerMs <= 0 ||
            typeof rule.keyStrategy !== "function"
        ){
            const err = new Error("Invalid rate-limit rule");
            err.statusCode = 500;
            return next(err);
        }

        let keys;
        try{
            keys = rule.keyStrategy(req);
        }catch(error){
            error.statusCode = error.statusCode || 500;
            return next(error);
        }

        if(
            !Array.isArray(keys) || 
            keys.length === 0 ||
            keys.some((key) => typeof key !== "string" || key.length === 0)
        ){
            const err = new Error("Invalid rate-limit keys");
            err.statusCode = 500;
            return next(err);
        }


        try{
          const result = await redisClient.eval(TOKEN_BUCKET_SCRIPT,{
            keys,
            arguments:[
                String(rule.capacity),
                String(Date.now()),
                String(rule.refillRatePerMs),
            ],
          });  

          const [allowed, retryAfterMs, remaining] = result;

          if(Number(allowed) === 0){
            const retryAfterSeconds = Math.max(1, Math.ceil(Number(retryAfterMs)/1000));
            res.set("Retry-After", String(retryAfterSeconds));
            return res.status(429).json({
              message:"Too many requests. Please try again later.",
              retryAfter: retryAfterSeconds,
            });
          }

          res.set("X-RateLimit-Limit", String(rule.capacity));
          res.set("X-RateLimit-Remaining",String(Math.max(0, Number(remaining))));

          return next();

        }catch(error){
            console.log("Rate limiter Redis error:",error);
            return next();
        }
    };
};