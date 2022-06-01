const express = require("express");
const serveStatic = require("serve-static");
const path = require("path");
const compression = require("compression");
const history = require("connect-history-api-fallback");

const app = express();

app.use(history());

app.use(compression());

//here we are configuring dist to serve app files
app.use("/", serveStatic(path.join(__dirname, "/dist")));

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (_, res) {
  res.sendFile(path.join(__dirname, "/dist"));
});

const port = process.env.PORT || 9020;
app.listen(port);
console.log(`app is listening on port: localhost:${port}`);
