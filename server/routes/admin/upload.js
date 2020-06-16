const Router = require('koa-router')
const path = require('path');
const authorizeMiddleware = require('../../middleware/auth.js')
const getModelMiddleware = require('../../middleware/getModel.js')

const router = new Router({prefix: '/admin/api/upload'});
router.post('/', authorizeMiddleware(), (ctx) => {
  let file = null;
  if(ctx.request.files.file){
    file = ctx.request.files.file
  } else {
    file = ctx.request.files.image
  }
  //ctx.body = {path: file.path}; //返回上传的本地文件路径
  //返回链接路径
  const basename = path.basename(file.path);
  ctx.body = {url:`${ctx.origin}/uploads/${basename}`};
})

module.exports = router;