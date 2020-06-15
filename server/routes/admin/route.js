const Router = require('koa-router');
const router = new Router({prefix: '/admin/api/rest/:resource'}); 
// const Category = require('../../models/Category.js');
const authorizeMiddleware = require('../../middleware/auth.js')
const getModelMiddleware = require('../../middleware/getModel.js')


// 创建分类
router.post('/', authorizeMiddleware(), getModelMiddleware(), async (ctx) => {
  console.log(ctx.request.body);
  let res = await ctx.Model.create(ctx.request.body)
  ctx.body = {
    code: 201,
    status: '成功',
    data: res
  };
})
// 获取分类
router.get('/', authorizeMiddleware(), getModelMiddleware(), async(ctx, next) => {
  let res = await ctx.Model.find().populate('parent').populate('categories') //.limit(10);
  console.log(123);
  
  ctx.body = {
    code: 200,
    status: '成功',
    data: res
  };
})
// 查找分类
router.get('/:id', authorizeMiddleware(), getModelMiddleware(), async (ctx) => {
  let res = await ctx.Model.findById(ctx.params.id);
  ctx.body = {
    code: 200,
    status: '成功',
    data: res
  };
})
// 修改分类
router.put('/:id', authorizeMiddleware(), getModelMiddleware(), async (ctx) => {
  let res = await ctx.Model.findByIdAndUpdate(ctx.params.id, ctx.request.body);
  ctx.body = {
    code: 201,
    status: '成功',
    data: res
  };
})
// 删除分类
router.delete('/:id', authorizeMiddleware(), getModelMiddleware(), async (ctx) => {
  await ctx.Model.findByIdAndDelete(ctx.params.id);
  ctx.body = {
    code: 204,
    status: '成功',
    data: {msg:'删除成功'}
  };
})

module.exports = router;