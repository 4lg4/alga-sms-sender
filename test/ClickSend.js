/**
 * Created by www.Alga.me on 10/5/18.
 */

import config from '../src/config.json';
import request from 'request-promise';

console.log('=========[ Test rest endpoint ]==============');
(async ()=> {
  const optGet = {
    method: 'GET',
    json: true,
    uri: 'https://rest.clicksend.com/v3/lists',
    headers: {
      Authorization: `Basic ${new Buffer(`${config.providers.ClickSend.username}:${config.providers.ClickSend.password}`).toString('base64')}`,
    },
  };

  console.log('\n\n\n');
  console.log(optGet);
  try {
    const success = await request(optGet);
    console.log('success', success);
  } catch (e) {
    console.log('error', e);
  }

  //
  // const optPost = {
  //   method: 'POST',
  //   json: true,
  //   uri: 'https://rest.clicksend.com/v3/sms/send',
  //   headers: {
  //     Authorization: `Basic ${config.username}:${config.password}`,
  //   },
  //   body: {
  //     messages: [{
  //       from,
  //       to,
  //       body: message,
  //     }],
  //   },
  // };
  //
  // console.log('\n\n\n');
  // console.log(optPost);
  // try {
  //   const success = await request(optPost);
  //   console.log('success', success);
  // } catch (e) {
  //   console.log('error', e);
  // }


  process.exit();
})();
