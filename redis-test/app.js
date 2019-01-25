const app = require('express')();
const server = require('http').createServer(app);
const User = require('./user.js');
const client = require('./redis.js');
// client.hset('user3', JSON.stringify({name: 'Bill', age: 23, id: 2}), err => {
//   console.log('set reject: ' + err.stack)
// })
// client.hgetall('user2', (err, obj) => {
//   console.log(obj)
// })
// client.get('key1', (err, data) => {
//   console.log(data);
// })

const testUsers = {
  bill: {name: 'Bill', age: 18},
  jocke: {name: 'Jocke', age: 19},
  jerry: {name: 'Jerry', age: 21},
  tom: {name: 'Tom', age: 22},
}

function initRedisUser(users){
  // 先清空 redis
  client.flushall();
  const ids = Object.keys(users);
  let redisUsers = {};
  ids.forEach(id => {
    const user = new User(id, users[id]);
    redisUsers[id] = user;
    user.save();
  })
  return redisUsers;
}
const users = initRedisUser(testUsers);

// bill 订阅 jocke 和 tom， jocke 订阅 bill 、jerry，tom
function followcb(err){
  if(err) console.log('follow err');
}
users.bill.follow('jocke', followcb)
users.bill.follow('tom', followcb)
users.jocke.follow('bill', followcb)
users.jocke.follow('jerry', followcb)
users.jocke.follow('tom', followcb)

async function billfriends(){
  console.log(await users.bill.getFriends())
}
async function jockefollowers(){
  console.log(await await users.tom.getFollowers())
}
jockefollowers();
billfriends()


server.listen(3001)