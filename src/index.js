/**
 * Created by www.Alga.me on 10/5/18.
 */

import aap, {reject} from 'alga-async-process';
import config from './config.json';

export default async ({provider, from, to, message})=> {
  if (!provider || !to || !message) {
    return reject('provider, to (phone number) and message are required');
  }

  const _from = from || config.from;

  if (_from && _from.length > 11) {
    return reject(`"from" max length 11 chars. (${_from}) has ${_from.length} chars`);
  }

  const send = require(`./providers/${provider}`).default;
  const _config = config.providers[provider];

  const [err, success] = await aap(send({config: _config, to, message, from: _from}));

  if (err) {
    return reject(err);
  }

  return success;
};
