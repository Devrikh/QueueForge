"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jobController_1 = require("../controllers/jobController");
const router = (0, express_1.Router)();
router.post("/jobs", jobController_1.createJob);
router.get("/jobs/:id", jobController_1.getJob);
exports.default = router;
