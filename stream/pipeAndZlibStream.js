/**
 * 通过 管道流（pipe）和 链式流 来压缩和解压文件（zlib）;
 */

const fs = require('fs');
const zlib = require('zlib');

fs.createReadStream('writeStream.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('zlib.txt.gz'));

console.log('压缩完成');

setTimeout(() => {
  unzip();
  console.log('解压完成');
}, 5000)
function unzip() {
  fs.createReadStream('zlib.txt.gz')
    .pipe(zlib.createGunzip())
    .pipe((data) => {
      let write = fs.createWriteStream('zlib.txt');
      write.write(data, 'utf8')
      return write;
    });
    // .pipe(fs.createWriteStream('zlib.txt'));
    
}
