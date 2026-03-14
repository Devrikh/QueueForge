"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processors = void 0;
const emailProcessor_1 = require("./processors/emailProcessor");
const reportProcessor_1 = require("./processors/reportProcessor");
exports.processors = {
    email: emailProcessor_1.processEmail,
    report: reportProcessor_1.processReport
};
