const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  parent: {
    required: false,
    type: mongoose.SchemaTypes.ObjectId, // 关联模型的Id
    ref: 'Category' // parent关联的模型(model中使用populate时用到的关联模型)
  }
})

module.exports = mongoose.model('Category', schema); //model(集合名,模式实例)