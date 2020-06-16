const Router = require('koa-router')
// const path = require('path');
const User = require('../../models/User');
const Jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secret = require('../../plugins/sercet.js')

const router = new Router({prefix: '/admin/api/login'});
router.post('/', async (ctx) => {
  // 获取到用户名和密码
  let {name, password} = ctx.request.body
  // 根据用户名查找
  let currentUser = await User.findOne({name:name}).select('+password');
  if(currentUser == null) {
    ctx.status = 422;
    ctx.body = {message:'用户名不存在'}
    return false;
  }
  // 验证密码
  let isVaild = bcrypt.compareSync(ctx.request.body.password, currentUser.password)
  if(!isVaild) {
    ctx.status = 422;
    ctx.body = {message:'密码不正确'}
    return false;
  }

  // 返回token
  let token = Jwt.sign({ id: currentUser._id }, secret)
  console.log(token);
  ctx.body = {token};
})

module.exports = router;