const accountSid = 'ACdf4d3f53109aacd30df1bac1a744fb5e';
const authToken = 'd6d155ad651a306aa8334fb4e258c377';
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
