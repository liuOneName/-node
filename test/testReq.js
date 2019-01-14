const http = require('http');
const EventEmitter = require('events').EventEmitter;

//node 自定义事件
var event = new EventEmitter();
//监听事件
event.on('end', function(){
  console.log('请求完成，触发自定义事件');
})

const server = http.createServer((req, res) => {
  //设置头 解决跨域
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.writeHead(200, { 'Content-Type': 'text/html' });
  let params = '';
  req.on('data', data => {
    params += data;
  });
  req.on('end', () => {
    console.log('参数接收完成');
    console.log(params);
    event.emit('end');
    res.end('<h2>res</h2>')
  })
});



server.listen(3000);