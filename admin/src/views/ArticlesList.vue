<template>
  <div class="articles-create">
    <el-table :data="tableData" :border="true">
      <el-table-column prop="_id" label="ID"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <!-- <el-table-column prop="item in categories" label="所属分类">{{item.name}}</el-table-column> -->

      <el-table-column prop="categories" label="所属分类">
        <template slot-scope="scope">
          <span v-for="item in scope.row.categories" :key="item._id">{{item.name}}、</span>
        </template>
      </el-table-column>

      <el-table-column>
        <template slot-scope="scope">
          <el-button type="primary" @click="$router.push(`/articles/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="danger" @click="deleteCategory(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'ArticlesCreate',
  components: {
    // HelloWorld
  },
  data() {
    return {
      tableData: []
    }
  },
  created() {
    console.log(this.tableData);
    this.getArticles()
  },
  methods: {
    async getArticles() {
      let res = await this.$http.get('/rest/articles')
      console.log(res);
      if(res.data.code == 200) {
        this.tableData = res.data.data;
      }
    },
    async deleteCategory(id) {
      console.log(id);
      let res = await this.$http.delete(`/rest/articles/${id}`);
      console.log(res);
      if(res.data.code == 204) {
        this.getArticles()
        this.$message({
          type: 'success',
          message: res.data.data.msg
        })
      }
    }
  }
}
</script>
