"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processEmail = processEmail;
async function processEmail(payload) {
    console.log("sending email to", payload.to);
    await new Promise(r => setTimeout(r, 2000));
    return {
        delivered: true
    };
}
