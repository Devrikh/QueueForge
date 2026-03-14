import { Request, Response } from "express";
import { jobQueue } from "../queue/jobQueue";

export const getMetrics = async (req: Request, res: Response) => {
  try {

    const counts = await jobQueue.getJobCounts(
      "waiting",
      "active",
      "completed",
      "failed",
      "delayed"
    );

    res.json({
      queue: "jobs",
      timestamp: new Date().toISOString(),
        metrics: counts
    });

  } catch (error) {

    res.status(500).json({
      error: "Failed to fetch queue metrics"
    });

  }
};