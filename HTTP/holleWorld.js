const http = require('http');

const server = http.createServer((req, res) => {
  if(req.url === '/favicon.ico') return;
  res.writeHead(200, {'Content-type': 'text/plain', "Access-Control-Allow-Origin": "*"});
  // res.writeHead(200)
  res.write('<a>aaa</a>')
  res.end('<h1>Hello World</h1>')
})
server.listen(3001)