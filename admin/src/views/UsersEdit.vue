<template>
  <div class="users-create">
    <h1>{{id ? "编辑管理员" : "创建管理员"}}</h1>
    <el-form label-width="80px" label-position="left" @submit.native.prevent="submit">
      <el-form-item label="用户名">
        <el-input type="text" v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="model.password"></el-input>
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
  name: 'UsersCreate',
  components: {
    // HelloWorld
  },
  props: ['id'],
  data() {
    return {
      model:{
        name: '',
        password: ''
      }
    }
  },
  created(){
    // 修改时
    this.id && this.getUser();
  },
  methods: {
    // 获取所有分类
    async getAllUsers() {
      let res = await this.$http.get('/rest/users');
      this.parentList = res.data.data
    },

    // 获取当前分类
    async getUser() {
      let res = await this.$http.get(`/rest/users/${this.id}`);
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
        res = await this.$http.put(`/rest/users/${this.id}`, newModel)
      } else {
        res = await this.$http.post('/rest/users', newModel)
      }
      if(res.data.code == 201) {
        this.$router.push('/users/list');
        this.$message({
          type:'success',
          message:'保存成功'
        })
      }
    }
  }
}
</script>
