const http = require('http');

const req = http.request({host: '127.0.0.1', port: 3000, url: '/', method: 'GET'}, res => {
  let data = '';
  res.setEncoding('utf8');
  res.on('data', chunk => {
    data += chunk;
  })
  res.on('end', () => {
    console.log(data);
  })
})
// 发数据，这个req 对象跟 创建服务时的 req 对象用法一样, 下面这两种方式都是可以发送数据的
req.write();
req.end();

// 这种请求方式发送数据是通过 最后的 end 方法发送的 例：end(JSON.stringify({name: 'Bill', age: 23}))
// 当然，上面的这种写法像 jquery 的 ajax 方法一样， 自然就有相应的 get 方法，下面是一个简写的例子, 参数通过path可以传 path：'/?name=Bill&age=23'
// get 请求好像可以像下面这么写， 但是 post 方式好像只能像上面那样写

http.get({host: '127.0.0.1', path: '/', port: 3000}, res => {
  let data = '';
  res.setEncoding('utf8');
  res.on('data', chunk => {
    data += chunk;
  })
  res.on('end', () => {
    console.log(data);
  })
})