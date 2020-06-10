const Router = require('koa-router');
const router = new Router({prefix: '/admin/api/rest/:resource'}); 
// const Category = require('../../models/Category.js');
const getModel = (ctx,next) => {
  let resource = ctx.params.resource;
  console.log(resource);
  
  let modelName = require('inflection').classify(resource);
  console.log(modelName);
  
  Model = require(`../../models/${modelName}.js`)
  return Model;
}
// 创建分类
router.post('/', async (ctx) => {
  let CurrentModel = await getModel(ctx);
  let res = await CurrentModel.create(ctx.request.body)
  ctx.body = {
    code: 201,
    status: '成功',
    data: res
  };
})
// 获取分类
router.get('/', async(ctx) => {
  let CurrentModel = await getModel(ctx);
  let res = await CurrentModel.find().populate('parent')//.limit(10);
  ctx.body = {
    code: 200,
    status: '成功',
    data: res
  };
})
// 查找分类
router.get('/:id', async(ctx) => {
  console.log(1111);
  
  let CurrentModel = await getModel(ctx);
  let res = await CurrentModel.findById(ctx.params.id);
  ctx.body = {
    code: 200,
    status: '成功',
    data: res
  };
})
// 修改分类
router.put('/:id', async(ctx) => {
  let CurrentModel = await getModel(ctx);
  let res = await CurrentModel.findByIdAndUpdate(ctx.params.id, ctx.request.body);
  ctx.body = {
    code: 201,
    status: '成功',
    data: res
  };
})
// 删除分类
router.delete('/:id', async(ctx) => {
  let CurrentModel = await getModel(ctx);
  await CurrentModel.findByIdAndDelete(ctx.params.id);
  ctx.body = {
    code: 204,
    status: '成功',
    data: {msg:'删除成功'}
  };
})

module.exports = router;