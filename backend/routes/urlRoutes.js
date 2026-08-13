import express from "express";
import { createShortUrl } from "../controllers/urlController.js";

const router = express.Router();

router.post("/",createShortUrl);


export default router;