export const RULES = {
  REGISTER: {
    capacity: 3,
    refillRatePerMs: 1 / (5 * 60 * 1000),
    keyStrategy: (req) => [`rl:register:ip:${req.ip}`],
  },

  LOGIN: {
  capacity: 5,
  refillRatePerMs: 1 / 60000,

  keyStrategy: (req) => {
    const email =
      typeof req.body?.email === "string"
        ? req.body.email.trim().toLowerCase()
        : "";

    return [
      `rl:login:ip:${req.ip}`,
      `rl:login:email:${email}`,
    ];
  },
  },

  CREATE_URL: {
    capacity: 5,
    refillRatePerMs: 1 / 10000,
    keyStrategy: (req) => [`rl:create:user:${req.user}`],
  },

  DELETE_URL: {
    capacity: 10,
    refillRatePerMs: 2 / 60000,
    keyStrategy: (req) => [`rl:delete:user:${req.user}`],
  },

  MY_LINKS: {
    capacity: 30,
    refillRatePerMs: 15 / 60000,
    keyStrategy: (req) => [`rl:mylinks:user:${req.user}`],
  },

  REDIRECT: {
    capacity: 1000,
    refillRatePerMs: 500 / 60000,
    keyStrategy: (req) => [`rl:redirect:ip:${req.ip}`],
  },
};