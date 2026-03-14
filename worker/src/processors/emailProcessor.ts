export async function processEmail(payload: any) {


    // throw new Error("email service failed");
 console.log("sending email to", payload.to);

 await new Promise(r => setTimeout(r, 2 * 1000));

 
 return {
  delivered: true
 };
}


