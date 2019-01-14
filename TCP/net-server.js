const net = require('net');
let count = 0;
let users = {};

net.createServer(conn => {
  let name;
  console.log('new connection.');
  console.log(`连接人数${count}`);
  conn.setEncoding('utf8');
  conn.write(`你好 boy, other people ${count};\r\n
  please write your name and press enter\r\n`);
  count++;
  let chat = '';
  //监听telnet 端发过来的数据
  conn.on('data', data => {
    chat = chat + data.replace('\r\n', '');
    if (data.includes('\r\n')) {
      console.log(chat.replace('\r\n', ''));
      //用户第一次链接进来 记录用户 通知大家 有人进来了
      if (!name) {
        if (chat) {
          name = chat;
          users[chat] = conn;
          for (let i in users) {
            users[i].write(`welcome ${chat} joined the room\r\n`);
          }
        } else {
          conn.write('please write your name: ')
        }
      } else {
        for (let i in users) {
          users[i].write(`${name}: ${chat}\r\n`);
        }
      }
      chat = '';
    }
  })
  conn.on('end', () => {
    console.log('end');
  })
  conn.on('error', (err) => {
    console.log('出错为：' + err.stack);
  })
  //监听 telnet 与服务端断开连接
  conn.on('close', () => {
    console.log(`${name}断开连接。`);
    count--;
    delete users[name];
  })

}).listen(3000);