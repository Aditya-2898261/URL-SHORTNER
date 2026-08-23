import express from "express";
import { createShortUrl, showMyUrls, deleteUrl } from "../controllers/urlController.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { isLoggedIn } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { createUrlSchema, deleteUrlSchema } from "../validators/urlValidator.js";

const router = express.Router();

router.post("/createShortCode", isLoggedIn, validate(createUrlSchema), wrapAsync(createShortUrl));
router.get("/myUrls", isLoggedIn, wrapAsync(showMyUrls));
router.delete("/:urlId", isLoggedIn,validate(deleteUrlSchema, "params"), wrapAsync(deleteUrl));


export default router;