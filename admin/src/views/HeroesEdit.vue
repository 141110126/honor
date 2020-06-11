<template>
  <div class="heroes-create">
    <h1>{{id ? "编辑英雄" : "创建英雄"}}</h1>
    <el-form label-width="80px" label-position="left" @submit.native.prevent="submit">
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <el-form-item label="名称">
            <el-input type="text" v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="heroes-uploader"
              :action="`${$http.defaults.baseURL}/upload`"
              :show-file-list="false"
              :on-success="handleUploadAvatarSuccess">
              <img v-if="model.avatar" :src="model.avatar" class="heroes">
              <i v-else class="el-icon-plus heroes-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="别名">
            <el-input type="text" v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate v-model="model.scores.difficultly" show-score :max="9"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate v-model="model.scores.skill" show-score :max="9"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate v-model="model.scores.aggression" show-score :max="9"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate v-model="model.scores.survival" show-score :max="9"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.downwindItems" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.upwindItems" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.useSkill"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.combatSkill"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.warfareSkill"></el-input>
          </el-form-item>
        </el-tab-pane>

        <!-- 特殊技能 -->
        <el-tab-pane label="特殊技能">
          <el-button type="primary" size="small" class="add-btn" icon="el-icon-plus" @click="model.characteristic.push({})">添加技能</el-button>
          <el-row :gutter="50">
            <el-col :span="12" v-for="(item,index) in model.characteristic" :key="index" class="characteristic-item">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item>
                <el-upload 
                  :action="`${$http.defaults.baseURL}/upload`"
                  class="heroes-uploader"
                  :on-success="res=>item.img = res.url">
                  <img :src="item.img" class="heroes" v-if="item.img">
                  <i class="el-icon-plus heroes-uploader-icon" v-else></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tip"></el-input>
              </el-form-item>
              <el-button type="danger" icon="el-icon-delete" size="small" @click="model.characteristic.splice(index, 1)">删除</el-button>
            </el-col>
          </el-row>
          
        </el-tab-pane>
      </el-tabs>
      
      <el-form-item>
        <el-button type="primary" native-type="submit" class="submit-btn">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HeroesCreate',
  components: {
    // HelloWorld
  },
  props: ['id'],
  data() {
    return {
      categories:[],
      items:[],
      model:{
        name: '',
        avatar: '',
        title:'',
        categories:[],
        scores: {
          difficulty: 0,
          skill: 0,
          aggression: 0,
          survival: 0
        },
        skins:[],
        characteristic:[],
        DownwindItems:[],
        upwindItems:[],
        useSkill:'',
        combatSkill:'',
        warfareSkill:''
      },
      // parentList:[]
    }
  },
  created(){
    this.getAllCategories();
    this.getAllItems();

    // 修改时
    this.id && this.getHero();
  },
  methods: {
    // 获取所有分类
    async getAllCategories() {
      let res = await this.$http.get('/rest/categories');
      this.categories = res.data.data
    },
    // 获取所有物品
    async getAllItems() {
      let res = await this.$http.get('/rest/items');
      this.items = res.data.data
    },


    // 获取所有分类
    async getAllHeroes() {
      let res = await this.$http.get('/rest/heroes');
      this.parentList = res.data.data
    },

    // 上传头像成功
    handleUploadAvatarSuccess(res, file) {
      console.log(res);
      console.log(file);
      this.model.avatar = res.url
    },
    

    // 获取当前分类
    async getHero() {
      console.log(1212);
      
      let res = await this.$http.get(`/rest/heroes/${this.id}`);
      console.log(res);
      this.model =Object.assign({},this.model, res.data.data);
    },
    async submit() {
      let res = null;
      if(this.id) {
        res = await this.$http.put(`/rest/heroes/${this.id}`, this.model)
      } else {
        res = await this.$http.post('/rest/heroes', this.model)
      }
      if(res.data.code == 201) {
        this.$router.push('/heroes/list');
        this.$message({
          type:'success',
          message:'保存成功'
        })
      }
    }
  }
}
</script>
<style>
.heroes-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.heroes-uploader .el-upload:hover {
  border-color: #409EFF;
}
.heroes-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.heroes {
  width: 178px;
  height: 178px;
  display: block;
}
.add-btn {
  margin: 30px;
}
.characteristic-item {
  margin-bottom: 80px;
}
.submit-btn {
  margin-top: 30px;
}

</style>