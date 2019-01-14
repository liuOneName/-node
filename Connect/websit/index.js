const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req)
  const url = req.url;
  res.setHeader('Access-Control-Allow-Origin', '*')
  const method = req.method.toLocaleUpperCase();
  if(method === 'GET' && /\/imgs\/\d.jpg/.test(url)){
    fs.stat(__dirname + url, (err, stat) => {
      if(err || !stat.isFile){
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end(`<h2>404 img</h2>`)
        return;
      }
      res.writeHead(200, {'Content-Type': 'image/jpg'})
      fs.createReadStream(process.cwd() + url).pipe(res);
    })
  } else if(method === 'GET' && (url === '/' || url === '/index.html')){
    res.writeHead(200, {'Content-Type': 'text/html'})
    fs.createReadStream(process.cwd() + '/index.html').pipe(res);
  } else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end(`<h2>404</h2>`)
  }
});

server.listen(3000);