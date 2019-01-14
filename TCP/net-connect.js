const net = require('net');

let client = net.connect(3000, 'localhost');
client.on('connect', () => {
  console.log('链接成功');
  client.write('Jocker\r\n');
  client.write('nihao\r\n');

})