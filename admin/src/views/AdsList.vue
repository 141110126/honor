<template>
  <div class="ads-create">
    <el-table :data="tableData" :border="true">
      <el-table-column prop="_id" label="ID"></el-table-column>
      <el-table-column prop="name" label="Name"></el-table-column>
      <!-- <el-table-column prop="parent.name" label="Parent"></el-table-column> -->

      <el-table-column>
        <template slot-scope="scope">
          <el-button type="primary" @click="$router.push(`/ads/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="danger" @click="deleteAds(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
  data() {
    return {
      tableData: []
    }
  },
  created() {
    console.log(this.tableData);
    this.getAds()
  },
  methods: {
    async getAds() {
      let res = await this.$http.get('/rest/ads')
      console.log(res);
      if(res.data.code == 200) {
        this.tableData = res.data.data;
      }
    },
    async deleteAds(id) {
      console.log(id);
      let res = await this.$http.delete(`/rest/ads/${id}`);
      console.log(res);
      if(res.data.code == 204) {
        this.getAds()
        this.$message({
          type: 'success',
          message: res.data.data.msg
        })
      }
    }
  }
}
</script>
