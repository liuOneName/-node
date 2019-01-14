/**
 * **
 * --b9cf2bba-0142-4590-b5b0-72e6851846d5
Content-Disposition: form-data; name="file"; filename="1514887565294.jpg"
Content-Type: image/png; charset=utf-8
图片文件流
--b9cf2bba-0142-4590-b5b0-72e6851846d5--**

上面表示一个file文件通过formData形式上传的数据格式。
 */

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method.toLocaleUpperCase();
  if (method === 'GET' && url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    res.end(`
      <form method='post' action='/upload' enctype="multipart/form-data">
        <input type='file' name='img' /><br/>
        <input type='submit' value='上传' />
      </form>
    `);
  } else if (method === 'POST' && url === '/upload') {
    var chunks = [];
    var bufferconcat;
    var size;
    req.on("data", function (chunk) {
      chunks.push(chunk);
      size = chunk.length;
    });
    var newArray = [];
    req.on("end", function () {
      res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
      bufferconcat = Buffer.concat(chunks, size); // 由这里开始不太明白，是怎么处理的二进制，怎么筛选出来的头信息还有去掉头尾。
      for (var a = 0; a < bufferconcat.length; a++) {
        if (bufferconcat[a].toString() == 13 && bufferconcat[a + 1].toString() == 10) {
          newArray.push(a);
        }
      }
      console.log(newArray)
      var name = bufferconcat.slice(newArray[0], newArray[1]).toString().split(";")[2].split("=")[1];
      var filename = name.split("\"");
      var test = bufferconcat.slice(newArray[1], newArray[3]);
      console.log(test.toString().split(':')[1])
      console.log(filename); // 根据文件大小有不同长度的数组，但是最后一个和前四个元素表示的东西是固定的,  好像最后一个不确定
      // console.log(bufferconcat.slice(newArray[newArray.length - 2]).toString())
      var imgBuffer = bufferconcat.slice(newArray[3] + 2, newArray[newArray.length - 2]);
      var imgBase64 = imgBuffer.toString('base64');
      var decodeImg = new Buffer(imgBase64, 'base64');
      const wri = fs.createWriteStream(filename[1]);
      wri.write(decodeImg, test.toString().split(':')[1].trim());
      wri.end();
      wri.on('finish', function () {
        console.log("写入完成。");
        fs.readdir(__dirname, (err, doc) => {
          console.log(doc.join(';'));
          res.end('success' + doc.join(';'));
        })
      });
      wri.on('error', function (err) {
        console.log(err.stack);
      });
    })
    req.on('error', err => {
      console.log('req 接收报错');
      res.writeHead(500, { 'Content-Type': 'text/html;charset=utf-8' });
      res.end(err.stack);
    })
    // res.end();
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' });
    res.end('<h2>404</h2>')
  }
})

server.listen(3000);