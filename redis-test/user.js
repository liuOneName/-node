/**
 *用户模型: 所有用户数据的名称都以 user_ + num + : + type 的格式, 数据都是 hash 格式的
 * @param {用户id} id 
 * @param {用户数据} data 
 */
const client = require('./redis.js');
const User = function (id, data) {
  if (this instanceof User) {
    this.id = id;
    this.data = data;
  } else {
    throw 'this is a constructor.'
  }
}
/**
 * 从 redis 中查询用户，并返回用户实例
 * @param {用户id} id 时
 * @param {callback} fn 
 */
User.find = function (id) {
  return new Promise((resolve, reject) => {
    client.hgetall(`user_${id}:data`, (err, data) => {
      if (err) reject(err);
      resolve(new User(id, data));
    })
  })
}
/**
 * 向 redis 中存储当前用户的数据
 */
User.prototype.save = function () {
  client.hmset(`user_${this.id}:data`, this.data, (err, data) => {
    if(err) console.log('set error');
  })
}
// -----------关注 和 取关-----------
// follows  表示当前用户关注的人
// followers 表示当前用户的粉丝
/**
 * 关注方法
 * @param {想关注的用户id} userid 
 * @param {callback} fn 
 */
User.prototype.follow = function (userid, fn) {
  client.multi()
    .sadd(`user_${this.id}:follows`, userid)
    .sadd(`user_${userid}:followers`, this.id)
    .exec(fn)
}
/**
 * 取关方法
 * @param {取关用户id} userid 
 * @param {callback} fn 
 */
User.prototype.unfollow = function (userid, fn) {
  client.multi()
    .srem(`user_${this.id}:follows`, userid)
    .srem(`user_${userid}:followers`, this.id)
    .exec(fn)
}
/**
 * 获取关注人方法
 */
User.prototype.getFollows = async function(){
  return new Promise((resolve, reject) => {
    client.smembers(`user_${this.id}:follows`, (err, data) => {
      if(err) reject(err);
      resolve(data);
    })
  })
}
/**
 * 获取粉丝方法
 */
User.prototype.getFollowers = async function(){
  return new Promise((resolve, reject) => {
    client.smembers(`user_${this.id}:followers`, (err, data) => {
      if(err) reject(err);
      // console.log(data)
      resolve(data);
    })
  })
}
/**
 * 获取相互关注的人
 */
User.prototype.getFriends = async function(){
  return new Promise((resolve, reject) => {
    client.sinter(`user_${this.id}:follows`, `user_${this.id}:followers`, (err, data) => {
      if(err) reject(err);
      resolve(data);
    })
  })
}
module.exports = User;