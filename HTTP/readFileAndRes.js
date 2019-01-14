/**
 * 将一个流（stream）接入（pipe）到另一个流中，是真的方便。
 */
const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
  if(req.url === '/favicon.ico') return;
  console.log(req.headers);
  // res.writeHead(200, {"Content-Type": 'text/html;charset=utf-8'})
  res.writeHead(200, { 'Content-Type': 'image/png' })
  fs.createReadStream('test.png').pipe(res);
})

server.listen(3000)