import express from "express";
const router = express.Router();
import {
  contentCreate,
  contentGet,
  contentDelete,
  contentShare,
  contentShareWithId,
} from "../../controllers/BraintwoController";
import { middleware } from "../../middelware/middleware";

router.post("/content",middleware, contentCreate);
router.get("/content",middleware, contentGet);
router.delete("/content",middleware, contentDelete);
router.post("/content/share",middleware, contentShare);
router.get("/content/:shareLink", contentShareWithId);

export default router;
