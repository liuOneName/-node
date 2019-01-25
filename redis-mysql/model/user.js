const Sequelize = require('sequelize');

const sequelize = new Sequelize('test', 'root', '12345678', {
  host: '127.0.0.1',
  port: 3306,
  dialect: 'mysql'
});

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

  
module.exports = User;