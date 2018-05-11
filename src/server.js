/**
 * Created by www.Alga.me on 10/5/18.
 */
import os from 'os';
import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import config from './config.json';
import api from './api';

const version = fs.readFileSync(`${__dirname}/version`).toString('utf8').replace(/(\s+|\n)/g, '');

const port = process.env.NODE_PORT || 3000;

const server = express();
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());

const frontEndLocation = (process.env.STAGE === 'dev' || process.env.STAGE === 'development') ? `${__dirname}/frontend/dist` : `${__dirname}/app/frontend`;
server.use(express.static(frontEndLocation));

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  const {token} = req.headers;
  if (!token || token !== config.token) {
    return res.status(401).send();
  }

  next();
});

server.get('/whoami', (req, res) => {
  const timestampInitialRequest = new Date();
  const tagId = timestampInitialRequest.toISOString();

  res.send(JSON.stringify({
    version,
    tag: tagId,
    exectime: `${(new Date() - timestampInitialRequest)} milliseconds`,
    body: req.body,
    query: req.query,
    headers: req.headers,
    os: {
      hostname: os.hostname(),
      network: os.networkInterfaces(),
    },
  }, null, 2));
});

api.forEach((s)=> server[s.method](`/api${s.route}`, s.fn));

// log uncaught Exception
process.on('uncaughtException', (err)=>
  console.error('uncaughtException ', err)
);

// log unhandled promise rejection
process.on('unhandledRejection', (reason)=>
  console.error('unhandledRejection ', reason)
);

server.listen(port, () => console.log(`app listening on port ${port}!`));
