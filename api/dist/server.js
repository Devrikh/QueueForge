"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jobRoutes_1 = __importDefault(require("./routes/jobRoutes"));
const metricsRoutes_1 = __importDefault(require("./routes/metricsRoutes"));
const api_1 = require("@bull-board/api");
const bullMQAdapter_1 = require("@bull-board/api/bullMQAdapter");
const express_2 = require("@bull-board/express");
const jobQueue_1 = require("./queue/jobQueue");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});
app.use("/api", jobRoutes_1.default);
app.use("/api", metricsRoutes_1.default);
const serverAdapter = new express_2.ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");
(0, api_1.createBullBoard)({
    queues: [new bullMQAdapter_1.BullMQAdapter(jobQueue_1.jobQueue)],
    serverAdapter
});
app.use("/admin/queues", serverAdapter.getRouter());
app.listen(3000, () => {
    console.log("API running on port 3000");
});
