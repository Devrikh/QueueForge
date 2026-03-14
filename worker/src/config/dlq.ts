import { Queue } from "bullmq";
import { redis } from "./redis";

export const deadLetterQueue = new Queue("dead-jobs", {
  connection: redis
});