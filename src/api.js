/**
 * Created by www.Alga.me on 10/5/18.
 */

import aap from 'alga-async-process';
import config from './config.json';
import sendSMS from './lib/SMS';


const callerExtractBody = ({caller, body})=> {
  if (caller === 'dialogflow') {
    return body.queryResult.parameters;
  }

  return body;
};

export default [
  {
    method: 'post',
    route: '/send',
    fn: async (req, res) => {
      const {body} = req;
      const {caller} = req.query;
      let theBody;

      if (caller) {
        theBody = callerExtractBody({caller, body});
      } else {
        theBody = req.body;
      }

      const {to, from, provider, message} = theBody;

      const [err, result] = await aap(sendSMS({config, to, from, provider, message}));

      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      console.log('success', result);
      res.send(result);

      // console.log('==== POST');
      // console.log(to, from, provider, message);
      // res.status(200).send();
    },
  },
];
