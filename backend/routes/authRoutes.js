import express from "express";
import {registerUser,loginUser} from "../controllers/authController.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { validate } from "../middleware/validate.js";
import { registerSchema, loginSchema } from "../validators/authValidator.js";

const router = express.Router();

router.post("/register", validate(registerSchema), wrapAsync(registerUser));
router.post("/login", validate(loginSchema), wrapAsync(loginUser));

export default router;