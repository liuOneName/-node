const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
  console.log('连接成功');
  // 监听各种 socket 事件
})










server.listen(3000)