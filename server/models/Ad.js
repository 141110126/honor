const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    adsItems: {
        type:[{
            linkUrl: {type:String},
            img: {type:String}
        }]
    }
})

module.exports = mongoose.model('Ad', schema); //model(集合名,模式实例)