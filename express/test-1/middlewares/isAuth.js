function isAuth(req, res, next) {
  if(!req.header('Authorization')){
    return res.send(403)
  }
  next()
}

// module.exports = isAuth;

// 下面的这种导出方式相当于 module.exports = {isAuth}
// 因此在导入方导入的是一个对象，isAuth 只是其中的一个属性。
exports.isAuth = isAuth;