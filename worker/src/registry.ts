import { processEmail } from "./processors/emailProcessor";
import { processReport } from "./processors/reportProcessor";

export const processors: Record<string, Function> = {
  email: processEmail,
  report: processReport
};