<template>
  <div class="articles-create">
    <h1>{{id ? "编辑文章" : "创建文章"}}</h1>
    <el-form label-width="80px" label-position="left" @submit.native.prevent="submit">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option v-for="item in categoriesList" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input type="text" v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item>
        <vue-editor id="editor" useCustomImageHandler @image-added="handleImageAdded" v-model="model.content"> </vue-editor>
        <!-- <vue-editor v-model="model.content" useCustomImageHandler @imageAdded="handleImageAdded" /> -->
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
import { VueEditor } from 'vue2-editor'
export default {
  name: 'CategoriesCreate',
  components: {
    VueEditor
  },
  props: ['id'],
  data() {
    return {
      model:{
        categories:[],
        title: ''
      },
      categoriesList:[]
    }
  },
  created(){
    // 创建时
    this.getAllCategories();
    // 修改时
    this.id && this.getArticle();
  },
  methods: {
    // 
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      formData.append("image", file);
      let res = await this.$http.post('/upload',formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    // 获取所有分类
    async getAllCategories() {
      let res = await this.$http.get('/rest/categories');
      console.log(res.data)
      this.categoriesList = res.data.data
    },

    // 获取当前分类
    async getArticle() {
      let res = await this.$http.get(`/rest/articles/${this.id}`);
      this.model = res.data.data;
    },
    async submit() {
      // 如果没有parent，则不提交parent字段
      let newModel = this.model;
      let res = null;
      if(this.id) {
        res = await this.$http.put(`/rest/articles/${this.id}`, newModel)
      } else {
        res = await this.$http.post('/rest/articles', newModel)
      }
      if(res.data.code == 201) {
        this.$router.push('/articles/list');
        this.$message({
          type:'success',
          message:'保存成功'
        })
      }
    }
  }
}
</script>
