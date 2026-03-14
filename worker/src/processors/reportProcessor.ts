export async function processReport(payload: any) {

  console.log("generating report", payload.reportId);

  await new Promise((r) => setTimeout(r, 3000));

  return { reportGenerated: true };
}