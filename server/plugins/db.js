const connectStr = require('./dbConfig.js')
const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect(connectStr,{
    useNewUrlParser: true },() => console.log('数据库连接成功'));
  mongoose.connection.on('error', console.error);
}