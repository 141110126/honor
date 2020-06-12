const mongoose = require('mongoose');
const Category = require('./Category.js')

const schema = mongoose.Schema({
  categories: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: Category
  }],
  title: {type:String},
  content: {type:String}
})

module.exports = mongoose.model('Article', schema);