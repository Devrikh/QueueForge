import axios from "axios";
console.log("TEST FILE STARTED");
const API = "http://localhost:3000";

async function createJob(type: string, payload: any, delay = 0, priority = 5) {
  const res = await axios.post(`${API}/api/jobs`, {
    type,
    payload,
    delay,
    priority
  });

  return res.data.id;
}

async function getJob(id: string) {
  const res = await axios.get(`${API}/api/jobs/${id}`);
  return res.data;
}

async function getMetrics() {
  const res = await axios.get(`${API}/api/metrics`);
  return res.data;
}

async function wait(ms: number) {
  return new Promise(r => setTimeout(r, ms));
}

async function testSingleJob() {

  console.log("TEST 1: Single Job Execution");

  const jobId = await createJob("email", {
    to: "test@test.com"
  });

  console.log("Job created:", jobId);

  for (let i = 0; i < 10; i++) {

    const job = await getJob(jobId);

    console.log("Status:", job.status);

    if (job.status === "completed") {
      console.log("Job completed");
      return;
    }

    await wait(1000);
  }

  console.log("Job did not finish in time");
}

async function testDelayedJob() {

  console.log("\nTEST 2: Delayed Job");

  const jobId = await createJob(
    "report",
    { reportId: 42 },
    5000
  );

  console.log("Delayed job created:", jobId);

}

async function loadTest() {

  console.log("\nTEST 3: Load Test (20 jobs)");

  const promises = [];

  for (let i = 0; i < 20; i++) {
    promises.push(
      createJob("email", {
        to: `user${i}@test.com`
      })
    );
  }

  const ids = await Promise.all(promises);

  console.log("Jobs created:", ids.length);
}

async function metricsTest() {

  console.log("\nTEST 4: Metrics");

  const metrics = await getMetrics();

  console.log(metrics);
}



async function concurrencyTest() {

  console.log("\nTEST 5: Worker Concurrency");

  const start = Date.now();

  const jobs = [];

  for (let i = 0; i < 10; i++) {

    jobs.push(
      createJob("report", {
        reportId: i
      })
    );

  }

  const ids = await Promise.all(jobs);

  console.log("Created jobs:", ids.length);

  let completed = 0;

  while (completed < ids.length) {

    completed = 0;

    for (const id of ids) {

      const job = await getJob(id);

      if (job.status === "completed") {
        completed++;
      }

    }

    console.log("Completed:", completed);

    await wait(1000);

  }

  const end = Date.now();

  const duration = (end - start) / 1000;

  console.log("\nAll jobs finished in", duration, "seconds");

}




async function run() {

  console.log("QueueForge Test Suite\n");


  try{
  await testSingleJob();

  await testDelayedJob();

  await loadTest();
  await concurrencyTest();

  await wait(3000);

  await metricsTest();

   } catch (err) {

    console.error("TEST FAILED", err);

  }

  console.log("\nTests finished");
}

run();