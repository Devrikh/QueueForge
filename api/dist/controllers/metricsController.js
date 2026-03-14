"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMetrics = void 0;
const queue_1 = require("../config/queue");
const getMetrics = async (req, res) => {
    try {
        const counts = await queue_1.jobQueue.getJobCounts("waiting", "active", "completed", "failed", "delayed");
        res.json({
            queue: "jobs",
            timestamp: new Date().toISOString(),
            metrics: counts
        });
    }
    catch (error) {
        res.status(500).json({
            error: "Failed to fetch queue metrics"
        });
    }
};
exports.getMetrics = getMetrics;
