<template>
  <div>
    <el-card class="login-card">
      <div slot="header">
        <h1>登录</h1>
      </div>
      <el-form label-width="60px" labe-position="left" @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input type="text" v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <!-- <el-form-item> -->
          <el-button type="primary" native-type="submit">登录</el-button>
        <!-- </el-form-item> -->
      </el-form>

    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        name:'',
        password: ''
      }
    }
  },
  methods: {
    async login() {
      let res = await this.$http.post('/login', this.model);
      console.log(res);
      localStorage.setItem('token',res.data.token);
      this.$router.push('/categories/edit')
    }
  },
  components: {

  }
}
</script>

<style scoped>
.login-card {
  width: 400px;
  margin: 100px auto;
  text-align: center;
}
h1 {
  margin: 0;
  font-size: 16px;
}
</style>
