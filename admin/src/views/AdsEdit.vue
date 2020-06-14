<template>
  <div class="ads-create">
    <h1>{{id ? "编辑广告位" : "创建广告位"}}</h1>
    <el-form label-width="80px" label-position="left" @submit.native.prevent="submit">
      <el-form-item label="名称">
        <el-input type="text" v-model="model.name"></el-input>
      </el-form-item>

      <el-form-item label="广告">
        <el-button type="primary" size="small" class="add-btn" icon="el-icon-plus" @click="model.adsItems.push({})">添加广告</el-button>
        <el-row :gutter="50">
          <el-col :span="12" v-for="(item,index) in model.adsItems" :key="index" class="ads-item">
            <el-form-item label="链接url">
              <el-input v-model="item.linkUrl"></el-input>
            </el-form-item>
            <el-form-item label="图片">
              <el-upload 
                :action="`${$http.defaults.baseURL}/upload`"
                :on-success="res=>$set(item,'img',res.url)">
                <img :src="item.img" class="uploader-img" v-if="item.img">
                <i class="el-icon-plus uploader-icon" v-else></i>
              </el-upload>
            </el-form-item>
            <el-button type="danger" icon="el-icon-delete" size="small" @click="model.adsItems.splice(index, 1)">删除</el-button>
          </el-col>
        </el-row>
      </el-form-item>
          
      
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'AdsCreate',
  components: {
    // HelloWorld
  },
  props: ['id'],
  data() {
    return {
      model:{
        name: '',
        adsItems: []
      },
    }
  },
  created(){
    // 修改时
    this.id && this.getAds();
  },
  methods: {
    // 获取当前分类
    async getAds() {
      let res = await this.$http.get(`/rest/ads/${this.id}`);
      this.model = res.data.data;
    },
    async submit() {
      // 如果没有parent，则不提交parent字段
      let newModel = this.model;
      if(!this.model.parent) {
        delete newModel['parent'];
        console.log(newModel);
      }
      let res = null;
      if(this.id) {
        res = await this.$http.put(`/rest/ads/${this.id}`, newModel)
      } else {
        res = await this.$http.post('/rest/ads', newModel)
      }
      if(res.data.code == 201) {
        this.$router.push('/ads/list');
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
.el-col {
  margin: 22px 0;
}
.el-form-item .el-form-item {
  margin-bottom: 22px;
}
</style>

