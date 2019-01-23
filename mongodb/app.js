const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';

// mongodb 有一个 mongoose 中间件，可以数据模型对应表的方式来操作数据库（不用写sql）

mongoClient.connect(url, (err, db) => {
  if(err) throw err;
  console.log('创建连接');
  const dbo = db.db('test');
  // process.exit(-1)
  dbo.collection('testCol').find({}).toArray((err, res) => {
    if(err) throw err;
    console.log(res);
    db.close();
  })
})