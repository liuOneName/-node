const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');
const fs = require('fs');
const bodyParset = require('body-parser');

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  // 允许 请带上的请求头
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');

  next();
})

app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs')
app.use(bodyParset.urlencoded({extended: false}))
app.use(bodyParset.json())

// 存放房间名称 有一个初始化数据 aini
let rooms = {aini:[]};

io.on('connection', socket => {
  console.log('连接成功');
  // 获取房间名称
  const arr = socket.request.headers.referer.split('/');
  const roomName = arr[arr.length - 1];
  let userName = '';
  console.log(roomName)
  // ------监听各种 socket 事件-------
  // 监听加入房间的事件 join
  socket.on('join', (name, fn) => {
    console.log(name)
    if(name){
      userName = name;
    }
    if(!rooms[roomName]){
      rooms[roomName] = [];
    }
    rooms[roomName].push(name);
    fn && fn()
  })

})

app.get('/', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
  fs.createReadStream('socket.html').pipe(res);
})


app.get('/chat/:name', (req, res) => {
  res. header('Content-Type', 'text/html;charset=utf-8')
  res.render('chat', {name: req.params.name})

})

app.get('/rooms', (req, res) => {
  res. header('Content-Type', 'application/json;charset=utf-8')
  res.send(rooms)
})

app.get('/createRoom', (req, res) => {
  // console.log(req.query);
  if(req.query.roomName && !Object.keys(rooms).includes(req.query.roomName)){
    rooms[req.query.roomName] = [];
  }
  res.send(rooms)
})







server.listen(3000)