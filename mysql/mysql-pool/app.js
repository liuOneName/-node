const app = require('express')();
const server = require('http').createServer(app);
const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '12345678',
  database: 'test',
});

async function connect() {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) {
        reject(err)
      } else {
        resolve(conn)
      }
    })
  })
}

async function query(sql) {
  const conn = await connect();
  return new Promise((resolve, reject) => {
    conn.query(sql, (err, data) => {
      if (err) reject(err);
      console.log(data);
      resolve(data)
    })
  })
}

app.get('/', async (req, res) => {
  // const data = await query();
  // res.send(data)
  res.send(await query(`select * from user`))
})
app.get('/id2', async (req, res) => {
  res.send(await query(`select * from user where id=2`))
})



server.listen(3000);




// server.listen(3000);