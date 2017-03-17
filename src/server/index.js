/* eslint-disable import/no-dynamic-require */

import express from 'express';
import request from 'request';
import path from 'path';

const apiServerHost = 'https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json';
const clientAssets = require(KYT.ASSETS_MANIFEST);

const app = express();
app.use(express.static(path.join(process.cwd(), KYT.PUBLIC_DIR)));

app.use('/api', (req, res) => {
  const url = apiServerHost + req.url;
  req.pipe(request(url)).pipe(res);
});

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">
        <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed" rel="stylesheet">
        <title>Memory</title>

        <style>
          html {
            background: #161616;
          }

          .fade-appear {
            opacity: 0.01;
          }

          .fade-appear.fade-appear-active {
            opacity: 1;
            transition: opacity 300ms ease 300ms;
          }
        </style>
      </head>
      <body>
        <div id='root'></div>
        <script src='${clientAssets.main.js}' type="text/javascript"></script>
        <link href="${clientAssets.main.css || ''}" rel="stylesheet" type="text/css"/>
      </body>
    </html>
  `);
});

app.listen(process.env.PORT || parseInt(KYT.SERVER_PORT, 10));
