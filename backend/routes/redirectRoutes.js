import express from "express";
import { redirectUrl } from "../controllers/urlController.js";
import { wrapAsync } from "../utils/wrapAsync.js";

const router = express.Router();

router.get("/:shortCode", wrapAsync(redirectUrl));

export default router;