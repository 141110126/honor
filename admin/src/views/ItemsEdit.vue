<template>
  <div class="items-create">
    <h1>{{id ? "编辑物品" : "创建物品"}}</h1>
    <el-form label-width="80px" label-position="left" @submit.native.prevent="submit">
      <el-form-item label="名称">
        <el-input type="text" v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="items-uploader"
          :action="uploadUrl"
          :headers="getAuthHeader()"
          :show-file-list="false"
          :on-success="handleUploadSuccess">
          <img v-if="model.icon" :src="model.icon" class="items">
          <i v-else class="el-icon-plus items-uploader-icon"></i>
        </el-upload>
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
  name: 'ItemsCreate',
  components: {
    // HelloWorld
  },
  props: ['id'],
  data() {
    return {
      model:{
        name: '',
        icon: ''
      },
      // parentList:[]
    }
  },
  created(){
    // 修改时
    this.id && this.getCategory();
  },
  methods: {
    // 获取所有分类
    async getAllItems() {
      let res = await this.$http.get('/rest/items');
      this.parentList = res.data.data
    },

    // 上传成功
    handleUploadSuccess(res, file) {
      console.log(res);
      console.log(file);
      this.model.icon = res.url
    },

    // 获取当前分类
    async getCategory() {
      let res = await this.$http.get(`/rest/items/${this.id}`);
      this.model = res.data.data;
    },
    async submit() {
      let res = null;
      if(this.id) {
        res = await this.$http.put(`/rest/items/${this.id}`, this.model)
      } else {
        res = await this.$http.post('/rest/items', this.model)
      }
      if(res.data.code == 201) {
        this.$router.push('/items/list');
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
.items-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.items-uploader .el-upload:hover {
  border-color: #409EFF;
}
.items-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.items {
  width: 178px;
  height: 178px;
  display: block;
}
</style>