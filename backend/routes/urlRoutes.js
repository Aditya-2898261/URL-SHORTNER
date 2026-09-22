import express from "express";
import { createShortUrl, showMyUrls, deleteUrl } from "../controllers/urlController.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { isLoggedIn } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { createUrlSchema, deleteUrlSchema } from "../validators/urlValidator.js";
//rateLimit
import { rateLimitMiddleware } from "../middleware/rateLimitMiddleware.js";
import { RULES } from "../middleware/rateLimitConfig.js";

const router = express.Router();

router.post("/createShortCode",  isLoggedIn, rateLimitMiddleware(RULES.CREATE_URL), validate(createUrlSchema), wrapAsync(createShortUrl));
router.get("/myUrls", isLoggedIn, rateLimitMiddleware(RULES.MY_LINKS), wrapAsync(showMyUrls));
router.delete("/:urlId", isLoggedIn, rateLimitMiddleware(RULES.DELETE_URL), validate(deleteUrlSchema, "params"), wrapAsync(deleteUrl));


export default router;