import express from "express";
import jobRoutes from "./routes/jobRoutes";
import metricsRoutes from "./routes/metricsRoutes";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
import { jobQueue } from "./queue/jobQueue";
import { deadLetterQueue } from "./config/dlq";

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", jobRoutes);
app.use("/api", metricsRoutes);

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

createBullBoard({
  queues: [new BullMQAdapter(jobQueue), new BullMQAdapter(deadLetterQueue)],
  serverAdapter,
});

app.use("/admin/queues", serverAdapter.getRouter());

app.listen(3000, () => {
  console.log("API running on port 3000");
});
