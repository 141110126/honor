<template>
  <div class="items-create">
    <el-table :data="tableData" :border="true">
      <el-table-column prop="_id" label="ID"></el-table-column>
      <el-table-column prop="name" label="Name"></el-table-column>
      <el-table-column prop="icon" label="Icon"></el-table-column>

      <el-table-column>
        <template slot-scope="scope">
          <el-button type="primary" @click="$router.push(`/items/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="danger" @click="deleteitem(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
  data() {
    return {
      tableData: []
    }
  },
  created() {
    console.log(this.tableData);
    this.getItems()
  },
  methods: {
    async getItems() {
      let res = await this.$http.get('/rest/items')
      console.log(res);
      if(res.data.code == 200) {
        this.tableData = res.data.data;
      }
    },
    async deleteitem(id) {
      console.log(id);
      let res = await this.$http.delete(`/rest/items/${id}`);
      console.log(res);
      if(res.data.code == 204) {
        this.getItems()
        this.$message({
          type: 'success',
          message: res.data.data.msg
        })
      }
    }
  }
}
</script>
