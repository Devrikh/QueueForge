"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const registry_1 = require("./registry");
const prisma_1 = require("./config/prisma");
const redis_1 = require("./config/redis");
const worker = new bullmq_1.Worker("jobs", async (job) => {
    const { jobId, payload } = job.data;
    await prisma_1.prisma.job.update({
        where: { id: jobId },
        data: { status: "processing" }
    });
    try {
        const processor = registry_1.processors[job.name];
        if (!processor) {
            throw new Error("Unknown job type");
        }
        const result = await processor(payload);
        await prisma_1.prisma.job.update({
            where: { id: jobId },
            data: {
                status: "completed",
                result
            }
        });
    }
    catch (error) {
        await prisma_1.prisma.job.update({
            where: { id: jobId },
            data: {
                status: "failed",
                error: error.message
            }
        });
        throw error;
    }
}, {
    connection: redis_1.redis,
    concurrency: 5,
    limiter: {
        max: 10,
        duration: 1000
    }
});
