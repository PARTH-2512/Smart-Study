import { Router } from "express";
import { runAiTransformation } from "../controllers/aiController.js";

const router = Router();

router.post("/ai", runAiTransformation);

export default router;
