const app = require('express')();
const http = require('http').Server(app);
const ws = require('socket.io')(http);

const sql = require('./dbConnect');
const pool = sql.connect();
pool.getConnection((err, connection) => {
  if(err){
    console.log('connect err' + err.stack)
  } else {
    connection.query(`select * from user`, (err, res) => {
      if(err){
        console.log('select err' + err.stack);
      } else {
        console.log(res);
        connection.release();
      }
    })
  }
})


const userName = [];

ws.on('connection', socket => {
  console.log('a user connected');
  //监听 message 事件
  socket.on('message', (data, fn) => {
    console.log(data, socket.id);
    socket.broadcast.emit('send',data)
    fn && fn(data, 'right');
  })
  //监听离开事件 leave
  socket.on('leave', data => {
    console.log(data)
    // socket.emit('leave', data);
    //广播除自己外的用户
    socket.broadcast.emit('leave', '某某离开');
  })
  socket.on('login', (data, fn) => {
    userName.push(data);
    console.log('login: ' + data, userName);
    fn && fn();
  })

})




http.listen(3000);