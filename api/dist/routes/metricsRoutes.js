"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const metricsController_1 = require("../controllers/metricsController");
const router = (0, express_1.Router)();
router.get("/metrics", metricsController_1.getMetrics);
exports.default = router;
