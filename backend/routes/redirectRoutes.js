import express from "express";
import { redirectUrl } from "../controllers/urlController.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { validate } from "../middleware/validate.js";
import { redirectSchema } from "../validators/urlValidator.js";

const router = express.Router();

router.get("/:shortCode", validate(redirectSchema, "params"), wrapAsync(redirectUrl));

export default router;