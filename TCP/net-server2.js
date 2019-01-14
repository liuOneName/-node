const net = require('net');

let count = 0;

const server = net.createServer(conn => {
  // conn是一个流（net.Stream），可以读写
  conn.write(`第${count}次请求`);
  conn.on('error', (err) => {
    console.log(err.stack + 1)
  })
  conn.on('data', data => console.log(data.toString()))
  count++;
})

server.listen(3000, () => console.log('server running'))