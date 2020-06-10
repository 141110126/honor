<template>
  <div class="categories-create">
    <h1>{{id ? "编辑分类" : "创建分类"}}</h1>
    <el-form label-width="80px" label-position="left" @submit.native.prevent="submit">
      <el-form-item label="名称">
        <el-input type="text" v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="父分类">
        <el-select v-model="model.parent" placeholder="请选择父分类">
          <el-option 
            v-for="item in parentList"
            :key="item._id"
            :value="item._id"
            :label="item.name"
            ></el-option>
        </el-select>
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
  name: 'CategoriesCreate',
  components: {
    // HelloWorld
  },
  props: ['id'],
  data() {
    return {
      model:{
        name: '',
        parent: ''
      },
      parentList:[]
    }
  },
  created(){
    // 创建时
    this.getAllCategories();
    // 修改时
    this.id && this.getCategory();
  },
  methods: {
    // 获取所有分类
    async getAllCategories() {
      let res = await this.$http.get('/rest/categories');
      this.parentList = res.data.data
    },

    // 获取当前分类
    async getCategory() {
      let res = await this.$http.get(`/rest/categories/${this.id}`);
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
        res = await this.$http.put(`/rest/categories/${this.id}`, newModel)
      } else {
        res = await this.$http.post('/rest/categories', newModel)
      }
      if(res.data.code == 201) {
        this.$router.push('/categories/list');
        this.$message({
          type:'success',
          message:'保存成功'
        })
      }
    }
  }
}
</script>
