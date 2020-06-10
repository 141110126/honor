const Koa  = require("koa");
const app = new Koa();
const koaBody = require('koa-body');
const path = require('path')
// 跨域
const cors = require('./plugins/cors.js');
app.use(cors);

// 
const KoaStatic = require('koa-static');
app.use(KoaStatic(path.join(__dirname,'public')))

// 解析请求体
// const koaBody = require('koa-body');
app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, 'public/uploads'), //上传位置
    keepExtensions: true //保留原后缀名
  }
}));

// 添加路由
const routing  = require('./routes/index.js')
routing(app, 'admin');

// 连接数据库
const db = require('./plugins/db.js');
db();

app.listen(3000,() => {
  console.log('服务启动')
})