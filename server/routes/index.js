const fs = require('fs');
const path = require('path');

module.exports = (app, dir) => {
  // let dirPath = path.resolve(__dirname, dir);
  // fs.readdirSync(dirPath).forEach((file) => {
  //   let route = require(`${dirPath}/${file}`)
  //   app.use(route.routes())
  // })

  let dirPath = path.resolve(__dirname, dir);
  fs.readdirSync(dirPath).forEach((file) => {
    let route = require(`${dirPath}/${file}`)
    console.log(file);
    
    app.use(route.routes())
  })

  // let route = require('./admin/route');
  // app.use(route.routes());
}
