"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
console.log("TEST FILE STARTED");
var API = "http://localhost:3000";
function createJob(type_1, payload_1) {
    return __awaiter(this, arguments, void 0, function (type, payload, delay, priority) {
        var res;
        if (delay === void 0) { delay = 0; }
        if (priority === void 0) { priority = 5; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.post("".concat(API, "/api/jobs"), {
                        type: type,
                        payload: payload,
                        delay: delay,
                        priority: priority
                    })];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res.data.id];
            }
        });
    });
}
function getJob(id) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get("".concat(API, "/api/jobs/").concat(id))];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res.data];
            }
        });
    });
}
function getMetrics() {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get("".concat(API, "/api/metrics"))];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res.data];
            }
        });
    });
}
function wait(ms) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (r) { return setTimeout(r, ms); })];
        });
    });
}
function testSingleJob() {
    return __awaiter(this, void 0, void 0, function () {
        var jobId, i, job;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("TEST 1: Single Job Execution");
                    return [4 /*yield*/, createJob("email", {
                            to: "test@test.com"
                        })];
                case 1:
                    jobId = _a.sent();
                    console.log("Job created:", jobId);
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < 10)) return [3 /*break*/, 6];
                    return [4 /*yield*/, getJob(jobId)];
                case 3:
                    job = _a.sent();
                    console.log("Status:", job.status);
                    if (job.status === "completed") {
                        console.log("Job completed");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, wait(1000)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 2];
                case 6:
                    console.log("Job did not finish in time");
                    return [2 /*return*/];
            }
        });
    });
}
function testDelayedJob() {
    return __awaiter(this, void 0, void 0, function () {
        var jobId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("\nTEST 2: Delayed Job");
                    return [4 /*yield*/, createJob("report", { reportId: 42 }, 5000)];
                case 1:
                    jobId = _a.sent();
                    console.log("Delayed job created:", jobId);
                    return [2 /*return*/];
            }
        });
    });
}
function loadTest() {
    return __awaiter(this, void 0, void 0, function () {
        var promises, i, ids;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("\nTEST 3: Load Test (20 jobs)");
                    promises = [];
                    for (i = 0; i < 20; i++) {
                        promises.push(createJob("email", {
                            to: "user".concat(i, "@test.com")
                        }));
                    }
                    return [4 /*yield*/, Promise.all(promises)];
                case 1:
                    ids = _a.sent();
                    console.log("Jobs created:", ids.length);
                    return [2 /*return*/];
            }
        });
    });
}
function metricsTest() {
    return __awaiter(this, void 0, void 0, function () {
        var metrics;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("\nTEST 4: Metrics");
                    return [4 /*yield*/, getMetrics()];
                case 1:
                    metrics = _a.sent();
                    console.log(metrics);
                    return [2 /*return*/];
            }
        });
    });
}
function concurrencyTest() {
    return __awaiter(this, void 0, void 0, function () {
        var start, jobs, i, ids, completed, _i, ids_1, id, job, end, duration;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("\nTEST 5: Worker Concurrency");
                    start = Date.now();
                    jobs = [];
                    for (i = 0; i < 10; i++) {
                        jobs.push(createJob("report", {
                            reportId: i
                        }));
                    }
                    return [4 /*yield*/, Promise.all(jobs)];
                case 1:
                    ids = _a.sent();
                    console.log("Created jobs:", ids.length);
                    completed = 0;
                    _a.label = 2;
                case 2:
                    if (!(completed < ids.length)) return [3 /*break*/, 8];
                    completed = 0;
                    _i = 0, ids_1 = ids;
                    _a.label = 3;
                case 3:
                    if (!(_i < ids_1.length)) return [3 /*break*/, 6];
                    id = ids_1[_i];
                    return [4 /*yield*/, getJob(id)];
                case 4:
                    job = _a.sent();
                    if (job.status === "completed") {
                        completed++;
                    }
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6:
                    console.log("Completed:", completed);
                    return [4 /*yield*/, wait(1000)];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 2];
                case 8:
                    end = Date.now();
                    duration = (end - start) / 1000;
                    console.log("\nAll jobs finished in", duration, "seconds");
                    return [2 /*return*/];
            }
        });
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("QueueForge Test Suite\n");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, , 9]);
                    return [4 /*yield*/, testSingleJob()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, testDelayedJob()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, loadTest()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, concurrencyTest()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, wait(3000)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, metricsTest()];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 8:
                    err_1 = _a.sent();
                    console.error("TEST FAILED", err_1);
                    return [3 /*break*/, 9];
                case 9:
                    console.log("\nTests finished");
                    return [2 /*return*/];
            }
        });
    });
}
run();
