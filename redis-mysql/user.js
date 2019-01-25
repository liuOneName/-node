const client = require('./redis.js');
// // redis 数据格式为 user_ + id:row 的格式
function save(id, data) {
  return new Promise((resolve, reject) => {
    client.hmset(`user_${id}:row`, data, (err, res) => {
      if (err) reject();
      resolve('save success');
    })
  })
}
function gets(id){
  return new Promise((resolve, reject) => {
    client.hgetall(`user_${id}:row`, (err, data) => {
      if(err) reject();
      resolve(data);
    })
  })
}

module.exports = {save, gets}