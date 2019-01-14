const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// 导入 isAuth 授权码判断中间件
const isAuth = require('./middlewares/isAuth');
console.log(isAuth)
const app = express();
// app.on('error', (err, req, res, next) => {
//   if(err){
//     console.log(err);
//     res.end('err');
//   } else {
//     next();
//   }
// })  

// app.set('view engine', 'ejs');
// app.set('views', __dirname + '/views');
// app.set('view options', { layout: false });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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

app.get('/', (req, res) => {
  res.header('Content-Type', 'text/html')
  res.render('index', { name: 'express' });
})

app.get('/search', (req, res) => {
  res.header('Content-Type', 'text/html')
  res.render('search', { search: 'search-content', results: [{ from_user: 'Bill', text: 'bill' }, { from_user: 'Jock', text: 'jock' }] })
})

app.get('/get', (req, res) => {
  console.log(req.query);
  res.send(req.query)
})
// 这种方式 在请求端 id 随意，secure 是一个中间件，这样的中间件可以有多个，例：app.get('/', secure, middleware1, middleware2, (req, res) => {})
app.get('/get/:id', isAuth.isAuth, (req, res) => {
  console.log('id', req.params.id, req.url);
  res.send(req.query)
})

//请求 重定向（路由重定向）
app.get('/redirect', (req, res) => {
  res.header('location', '/search');
  res.send(302)
})

app.post('/post', (req, res) => {
  console.log(req.body)
  res.send(req.body)
})

// 中间件？
function secure(req, res, next) {
  console.log(req.header('Authorization'))
  if(!req.header('Authorization')){
    return res.send(403)
    // 跳过当前路由
    // return next('route') 跳过了这个路由 
  }
  next();
}

app.listen(3000)