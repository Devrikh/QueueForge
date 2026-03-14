import { Router } from "express";
import { createJob, getJob } from "../controllers/jobController";

const router = Router();

router.post("/jobs", createJob);
router.get("/jobs/:id", getJob);

export default router;