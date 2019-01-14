const fs = require('fs');
//这种方式可以把一个很大的文件，可以把一个大文件分成几次获取
let stream = fs.createReadStream('read.txt');
stream.setEncoding('utf8');
let buf = '';
let i = 0;
stream.on('data', chunk => {
  buf = buf + chunk;
  i++
})
stream.on('end', chunk => {
  console.log(buf.toString());
  console.log(i);
})
stream.on('err', err => {
  console.log('错误: ' + err.stack);
})