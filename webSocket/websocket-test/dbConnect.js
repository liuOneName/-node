const mysql = require('mysql');

const mysqlHandle = {
  connect: function(){
    const client = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '12345678',
      database: 'socket',
      port: 3306
    })
    return client;
  },
  selectUser: function(client){
    client.query(`select * from user;`, (err, res, fields) => {
      if(err){
        console.log('select err' + err.stack);
      }
      console.log(res);
    });
  }

}

module.exports = mysqlHandle;