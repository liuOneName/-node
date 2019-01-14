/**
 * 管道写入流，大体思想是将一个流写入到另一个流。
 * 这个例子是将一个文件以流的方式读取出来，然后将流写入到另一个流中。
 */

 const fs = require('fs');

 let read = fs.createReadStream('writeStream.txt');
 let write = fs.createWriteStream('pipeStream.txt');

 read.pipe(write);

 console.log('执行完成');