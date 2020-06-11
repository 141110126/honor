const mongoose = require('mongoose');

const schema = mongoose.Schema({
  categories:[{type:mongoose.SchemaTypes.ObjectId,ref:'Categories'}],
  title: {type:String},
  description: {type:String}
})

module.exports = mongoose.model('Article', schema);