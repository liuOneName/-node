const http = require('http');
const qs = require('querystring');
console.log(qs.parse('name=Bill&age=12'))

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
  if(req.url === '/'){
    res.end(`
      <form method='POST' action='/url'>
        name: <input name='name' type='text' />
        pw: <input name='password' type='password' />
        <input type='submit' value='提交' />
      </form>
    `);
  } else if(req.url === '/favicon.ico'){
    res.end()
  } else if(req.url === '/url' && req.method === 'POST'){
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    })
    req.on('end', () => {
      data = qs.parse(data)
      res.end(`<h3>name: ${data.name}, pw: ${data.password}</h3>`)
    })
  } else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end('<h1>404</h1>');
  }
})

server.listen(3000);