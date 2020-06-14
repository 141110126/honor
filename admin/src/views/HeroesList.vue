<template>
  <div class="items-create">
    <el-table :data="tableData" :border="true">
      <el-table-column prop="_id" label="ID"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="avatar" label="头像"></el-table-column>
      <el-table-column prop="categories" label="类型"></el-table-column>
      <!-- <el-table-column prop="scores.difficult" label="难度"></el-table-column>
      <el-table-column prop="scores.skill" label="技能"></el-table-column>
      <el-table-column prop="scores.aggression" label="攻击性"></el-table-column>
      <el-table-column prop="scores.survival" label="生存"></el-table-column>
      <el-table-column prop="skins" label="皮肤"></el-table-column>
      <el-table-column prop="characteristic" label="characteristic"></el-table-column>
      <el-table-column prop="DownwindItems" label="DownwindItems"></el-table-column>
      <el-table-column prop="upwindItems" label="Name"></el-table-column>
      <el-table-column prop="useSkill" label="Icon"></el-table-column>
      <el-table-column prop="combatSkill" label="ID"></el-table-column>
      <el-table-column prop="warfareSkill" label="Name"></el-table-column> -->

      <el-table-column>
        <template slot-scope="scope">
          <el-button type="primary" @click="$router.push(`/heroes/edit/${scope.row._id}`)">编辑</el-button>
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
    this.getHeroes()
  },
  methods: {
    async getHeroes() {
      let res = await this.$http.get('/rest/heroes')
      console.log(res);
      if(res.data.code == 200) {
        this.tableData = res.data.data;
      }
    },
    async deleteitem(id) {
      console.log(id);
      let res = await this.$http.delete(`/rest/heroes/${id}`);
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
