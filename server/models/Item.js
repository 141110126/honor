const Mongoose = require('mongoose');

const schema = new Mongoose.Schema({
  name:{
    type:String,
    required: true
  },
  icon: {
    type:String,
    required: false
  }
})

module.exports = Mongoose.model('Item', schema);