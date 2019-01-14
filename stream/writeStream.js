const fs = require('fs');

let write = fs.createWriteStream('writeStream.txt');
let data = '恭喜你 写入成功。';
write.write(data, 'utf8');
write.end();
write.on('finish', () => {
  console.log('写入完成');
})
write.on('error', err => {
  console.log(err.stack);
})