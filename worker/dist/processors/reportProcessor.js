"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processReport = processReport;
async function processReport(payload) {
    console.log("generating report", payload.reportId);
    await new Promise((r) => setTimeout(r, 3000));
    return { reportGenerated: true };
}
