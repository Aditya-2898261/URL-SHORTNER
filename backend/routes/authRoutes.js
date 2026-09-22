import express from "express";
import {registerUser,loginUser, getCurrentUser, logoutUser} from "../controllers/authController.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { validate } from "../middleware/validate.js";
import { registerSchema, loginSchema} from "../validators/authValidator.js";
import { isLoggedIn } from "../middleware/authMiddleware.js";
//rateLimit
import { rateLimitMiddleware } from "../middleware/rateLimitMiddleware.js";
import {RULES} from "../middleware/rateLimitConfig.js"

const router = express.Router();

router.post("/register", rateLimitMiddleware(RULES.REGISTER), validate(registerSchema), wrapAsync(registerUser));
router.post("/login", rateLimitMiddleware(RULES.LOGIN), validate(loginSchema), wrapAsync(loginUser));
router.get("/me", isLoggedIn, wrapAsync(getCurrentUser));
router.post("/logout", logoutUser);

export default router;