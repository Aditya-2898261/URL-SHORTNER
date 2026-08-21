import express from "express";
import {registerUser,loginUser,testAuth} from "../controllers/authController.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { isLoggedIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", wrapAsync(registerUser));
router.post("/login",wrapAsync(loginUser));
router.get("/test", isLoggedIn, testAuth);

export default router;