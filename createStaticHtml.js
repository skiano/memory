// super hacky file to make a static version of this project!

const fs = require('fs')
const path = require('path')
const clientAssets = require('./build/publicAssets')
const rimraf = require('rimraf')

const createHTML = () => {
  return `
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
        <script src='./build/public${clientAssets.main.js}' type="text/javascript"></script>
        <link href="./build/public${clientAssets.main.css || ''}" rel="stylesheet" type="text/css"/>
      </body>
    </html>
  `
}

fs.writeFileSync(path.resolve(__dirname, 'index.html'), createHTML())

rimraf(path.resolve(__dirname, 'build', 'server'), (err) => {
  if (err) return console.error(err)
  console.log('removed server crap')
})
