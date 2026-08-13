import express from "express";
import { redirectUrl } from "../controllers/urlController.js";
import { wrapAsync } from "../middleware/wrapAsync.js";

const router = express.Router();

router.get("/:shortCode", wrapAsync(redirectUrl));

export default router;