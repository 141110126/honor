const Router = require('koa-router')
const path = require('path');

const router = new Router({prefix: '/admin/api/upload'});
router.post('/',(ctx) => {
  // const file = ctx.request.files.file;
  // ctx.body = file;
  const file = ctx.request.files.file;
  //ctx.body = {path: file.path}; //返回上传的本地文件路径
  //返回链接路径
  const basename = path.basename(file.path);
  ctx.body = {url:`${ctx.origin}/uploads/${basename}`};
})

module.exports = router;