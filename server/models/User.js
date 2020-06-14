const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
      type: String,
      select:false,
      set(val) {
        return bcrypt.hashSync(val, 10)
      }
  },
})

module.exports = mongoose.model('User', schema); //model(集合名,模式实例)