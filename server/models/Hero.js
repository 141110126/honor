const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: {type: String, required: true},
  avatar: {type: String},
  title: {type: String},
  // 类型
  categories: {
    type: [{type: mongoose.SchemaTypes.ObjectId,ref:'Category'}]
  },
  // 分数
  scores: {
    type: {
      difficulty: {type:Number}, //难度
      skill: {type:Number}, // 技能
      aggression: {type:Number}, // 攻击性
      survival:{type:Number} // 生存
    }
  },
  // 皮肤
  skins: {
    type: [{type:String}]
  },
  // 特殊技能
  characteristic:{
    type:[{
      name: {type:String},
      img: {type:String},
      description: {type:String},
      tip: {type:String}
    }]
  },
  // 顺风出装
  downwindItems:{
    type:[{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}]
  },
  // 逆风出装
  upwindItems:{
    type:[{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}]
  },
  // 使用技巧
  useSkill:{ type:String },
  // 对抗技巧
  combatSkill:{ type:String },
  // 团战思路
  warfareSkill:{ type:String }
})

module.exports = mongoose.model('Hero', schema);