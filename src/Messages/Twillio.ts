const accountSid = 'ACdf4d3f53109aacd30df1bac1a744fb5e';
const authToken = '8ac577f35cdc45a81967caeb312b950a';

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
