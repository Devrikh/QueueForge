import { Queue } from "bullmq";
import { redis } from "../config/redis";

export const jobQueue = new Queue("jobs", {
 connection: redis
});