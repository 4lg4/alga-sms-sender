/**
 * Created by www.Alga.me on 10/5/18.
 */

import request from 'request-promise';
import aap, {reject} from 'alga-async-process';

export default async ({to, from, message, config})=> {
  const opt = {
    method: 'POST',
    json: true,
    uri: 'https://rest.clicksend.com/v3/sms/send',
    headers: {
      Authorization: `Basic ${new Buffer(`${config.username}:${config.password}`).toString('base64')}`,
    },
    body: {
      messages: [{
        from,
        to,
        body: message,
      }],
    },
  };

  const [err, success] = await aap(request(opt));

  if (err) {
    return reject(err);
  }

  return JSON.stringify(success, null, 2);
};
