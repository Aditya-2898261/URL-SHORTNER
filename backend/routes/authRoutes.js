import express from "express";
import {registerUser,loginUser, getCurrentUser, logoutUser} from "../controllers/authController.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { validate } from "../middleware/validate.js";
import { 
    registerSchema, 
    loginSchema
} from "../validators/authValidator.js";
import { isLoggedIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", validate(registerSchema), wrapAsync(registerUser));
router.post("/login", validate(loginSchema), wrapAsync(loginUser));
router.get("/me", isLoggedIn, wrapAsync(getCurrentUser));
router.post("/logout", logoutUser);

export default router;