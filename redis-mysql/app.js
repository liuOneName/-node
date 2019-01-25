const app = require('express')()
const server = require('http').createServer(app);
const User = require('./model/user.js');
const redisUser = require('./user.js');

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  // 允许 请带上的请求头
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
})

async function getAllDataToArr(arg) {
  return new Promise((resolve, reject) => {
    let arr = [];
    if (arg) {
      arr = arg.map(val => val.get())
    }
    resolve(arr);
  })
}

// User.findAll({where: {name: 'Bill'}}).then(async user => {
//   const data = await getAllDataToArr(user);
//   console.log(data);
// })

async function getById(id) {
  return new Promise((resolve, reject) => {
    User.findAll({ where: { id } }).then(async user => {
      const data = await getAllDataToArr(user);
      resolve(data);
    })
  })
}

app.get('/user/:id', async (req, res) => {
  let user = await redisUser.gets(req.params.id);
  if(!user){
    user = await getById(req.params.id);
    user[0] && redisUser.save(req.params.id, user[0]);
    console.log('数据库读取')
  }
  res.send(user); 
})

server.listen(3005)
