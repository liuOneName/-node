const app = require('express')();
const server = require('http').createServer(app);
const Sequelize = require('sequelize');
const bodyParser = require('body-parser')

/**
 * 这里利用框架，使用数据模型操作数据库。
 */

/**
 * desc: Sequelize 有多个参数，好像前两个必传, 好坑啊 要利用 dialect 指定数据库类型（还要安装对应的依赖），
 */
const sequelize = new Sequelize('test', 'root', '12345678', {
  host: '127.0.0.1',
  port: 3306,
  dialect: 'mysql'
});
/**
 * desc: sequelize.define() 的第一个参数为 模型名称，第二个参数为 模型属性对象
 */
const User = sequelize.define('user', {
  name: Sequelize.STRING,
  age: Sequelize.INTEGER,
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER
  },
},
  {
    timestamps: false, // sequelize默认会自动为其添加 createdAt 和 updatedAt， 当定义 timestamps false 时可以去掉
    tableName: 'user', // 指定表名， 不写默认是 模型名加 `s` 
  })

// 测试连接
sequelize
  .authenticate()
  .then(() => {
    console.log('连接成功');
  })
  .catch(err => {
    console.error('连接失败:', err);
  });

async function getAllDataToArr(arg) {
  return new Promise((resolve, reject) => {
    let arr = [];
    if (arg) {
      arr = arg.map(val => val.get())
    }
    resolve(arr);
  })
}
// get 方法中可以传参
User.findAll({
  where: {
    age: 23
  }
}).then(async user => {
  const data = await getAllDataToArr(user);
  console.log(data);
})

// 下面两种方式是一样的
// User.findOne({attributes: ['name', 'age']}).then(users => {
//   console.log(users.get())
// })
// User.findOne({attributes: {exclude: ['id']}}).then(users => {
//   console.log(users.get())
// })

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  // 允许 请带上的请求头
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
/**
 * get User
 */

app.get('/users', (req, res) => {
  User.findAll().then(async users => {
    const data = await getAllDataToArr(users)
    res.send(data)
  })
})
app.post('/save', (req, res) => {
  User.create(req.body).then(user => {
    // console.log(user.get());
    // 可以接着在返回的对象上执行操作
    // user.name = 'Tomson';
    // user.save()
    // user.update({name: 'Tomson'})
    res.send('success')
  }).catch(err => {
    res.writeHead(500)
    res.send('error')
  })
})

app.get('/delete', (req, res) => {
  console.log(req.query);
  User.destroy({
    where: {
      ...req.query
    }
  }).then(user => {
    res.send('success')
  }).catch(err => {
    res.writeHead(500)
    res.send('error')
  })
})
app.get('/update', (req, res) => {
  console.log(req.query);
  User.update({ name: req.query.name }, {
    where: {
      id: Number(req.query.id)
    }
  }).then(user => {
    res.send('success')
  }).catch(err => {
    res.writeHead(500)
    res.send('error')
  })
})

server.listen(3000);