<template>
  <div class="categories-create">
    <el-table :data="tableData" :border="true">
      <el-table-column prop="_id" label="ID"></el-table-column>
      <el-table-column prop="name" label="Name"></el-table-column>
      <el-table-column prop="parent.name" label="Parent"></el-table-column>

      <el-table-column>
        <template slot-scope="scope">
          <el-button type="primary" @click="$router.push(`/categories/edit/${scope.row._id}`)">编辑</el-button>
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
  name: 'CategoriesCreate',
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
    this.getCategories()
  },
  methods: {
    async getCategories() {
      let res = await this.$http.get('/rest/categories')
      console.log(res);
      if(res.data.code == 200) {
        this.tableData = res.data.data;
      }
    },
    async deleteCategory(id) {
      console.log(id);
      let res = await this.$http.delete(`/rest/categories/${id}`);
      console.log(res);
      if(res.data.code == 204) {
        this.getCategories()
        this.$message({
          type: 'success',
          message: res.data.data.msg
        })
      }
    }
  }
}
</script>
