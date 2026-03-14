"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJob = createJob;
exports.getJob = getJob;
const prisma_1 = require("../config/prisma");
const jobQueue_1 = require("../queue/jobQueue");
async function createJob(req, res) {
    const { type, payload, priority = 5, delay = 0 } = req.body;
    const job = await prisma_1.prisma.job.create({
        data: {
            type,
            payload,
            status: "queued",
            priority
        }
    });
    await jobQueue_1.jobQueue.add(type, {
        jobId: job.id,
        payload
    }, {
        priority,
        delay,
        attempts: 3,
        backoff: {
            type: "exponential",
            delay: 1000
        }
    });
    res.json({
        id: job.id,
        status: "queued",
        priority
    });
}
;
async function getJob(req, res) {
    const job = await prisma_1.prisma.job.findUnique({
        where: { id: req.params.id }
    });
    res.json(job);
}
;
