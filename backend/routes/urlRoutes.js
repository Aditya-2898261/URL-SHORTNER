import express from "express";
import { createShortUrl, showMyUrls, deleteUrl } from "../controllers/urlController.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { isLoggedIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createShortCode", isLoggedIn, wrapAsync(createShortUrl));
router.get("/myUrls", isLoggedIn, wrapAsync(showMyUrls));
router.delete("/:urlId", isLoggedIn, wrapAsync(deleteUrl));


export default router;