export async function processEmail(payload: any) {

 console.log("sending email to", payload.to);

 await new Promise(r => setTimeout(r, 2000));

 return {
  delivered: true
 };
}


