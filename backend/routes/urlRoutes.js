import express from "express";
import { createShortUrl } from "../controllers/urlController.js";
import { wrapAsync } from "../middleware/wrapAsync.js";

const router = express.Router();

router.post("/",wrapAsync(createShortUrl));


export default router;