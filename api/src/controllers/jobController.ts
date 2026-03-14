import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { jobQueue } from "../queue/jobQueue";

export async function createJob(req: Request, res: Response){

 const { type, payload, priority = 5, delay = 0 } = req.body;

 const job= await prisma.job.create({
  data: {
   type,
   payload,
   status: "queued",
   priority
  }
 });

await jobQueue.add(type, {
  jobId:job.id,
  payload
}, {
    priority,
  delay,
  attempts: 3,
  backoff: {
    type: "exponential",
    delay: 1000
  }
});

 res.json({
  id: job.id,
  status: "queued",
  priority
 });
};



export async function  getJob (req: Request, res: Response) {

 const job = await prisma.job.findUnique({
  where: { id: req.params.id as string}
 });

 res.json(job);
};