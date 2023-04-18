const http = require("http");
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const server = http.createServer(app);

const ip_address = require("ip").address();
const port = 8089;

app.get("*", (req, res) => {
  let reqpath = req.path;
  console.log(reqpath);

  if (reqpath == "/index.html" || reqpath == "/") {
    res.setHeader("Content-Type", "text/html");
    fs.createReadStream("index.html").pipe(res);

  } else if (reqpath == "/u16.js" || reqpath == "/u8.js") {
    let contentType = "application/javascript; charset=utf-8";
    if (reqpath == "/u16.js") {
      contentType = "application/javascript; charset=utf-16le";
    }
    res.setHeader("Content-Type", contentType);
    res.setHeader("cache-control", "max-age=1");
    fs.createReadStream("./jquery1.7.2.min.js").pipe(res);
  }
});

server.listen(port, () => {
  console.log(`Server running at ${ip_address}:${port}`);
});
