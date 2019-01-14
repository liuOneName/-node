const http = require('http');

const app = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end('<h2>请求成功。</h2>');
})

function test() {
  console.log(1);
  process.nextTick(() => {
    console.log(3);
  })
  process.nextTick(() => {
    console.log(4);
  })
  console.log(2);
}
// base64 些图片
function writeImg(){
  console.log('写文件');
  var buffer = new Buffer('==ii1j2i3h1i23h', 'base64');
  require('fs').writeFile('test.png', buffer);
}

app.listen(3000, () => {
  console.log(`server running in 3000`);
  test();
  writeImg();
})