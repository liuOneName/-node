const http = require('http');

const serv = http.createServer((req, res) => {
    console.log(req);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h2>http res</h2>');
});

serv.listen(3000);