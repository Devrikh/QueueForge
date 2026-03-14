import { Worker } from "bullmq";
import { processors } from "./registry";
import { prisma } from "./config/prisma";
import { redis } from "./config/redis";
import { deadLetterQueue } from "./config/dlq";

const worker = new Worker(
  "jobs",
  async (job) => {
    const { jobId, payload } = job.data;

    await prisma.job.update({
      where: { id: jobId },
      data: { status: "processing" },
    });

    try {
      const processor = processors[job.name];

      if (!processor) {
        throw new Error("Unknown job type");
      }

      const result = await processor(payload);

      await prisma.job.update({
        where: { id: jobId },
        data: {
          status: "completed",
          result,
        },
      });
    } catch (error: any) {
      await deadLetterQueue.add("dead-job", {
        originalJobId: jobId,
        payload,
        error: error.message,
      });

      await prisma.job.update({
        where: { id: jobId },
        data: {
          status: "failed",
          error: error.message,
        },
      });

      throw error;
    }
  },
  {
    connection: redis,
    concurrency: 5,
    limiter: {
      max: 10,
      duration: 1000,
    },
  },
);
