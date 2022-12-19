const accountSid = process.env.TWILIO_ACCOUNTSID;
const authToken = process.env.TWILIO_AUTHTOKEN;

export const client = require('twilio')(accountSid, authToken);

export function sendMessages({
  message,
  dest,
}: {
  message: string;
  dest: string;
}) {
  return client.messages
    .create({
      body: message,
      from: '+16693566923',
      to: `+351${dest}`,
    })
    .then((message) => console.log(message.sid));
}
