<template>
  <el-container class="main-wrapper">
    <el-aside width="200px">
      <el-menu router :default-openeds="['1']" :default-active="$route.path">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>
            <span>内容管理</span>
          </template>
          <el-menu-item-group>
              <template slot="title">
                <i class="el-icon-email"></i>
                <span>分类</span>
              </template>
              <el-menu-item index="/categories/edit">
                <i class="el-icon-email"></i>
                <span>分类创建</span>
              </el-menu-item>
              <el-menu-item index="/categories/list">
                <i class="el-icon-email"></i>
                <span>分类列表</span>
              </el-menu-item>
          </el-menu-item-group>
          <!-- 物品 -->
          <el-menu-item-group>
              <template slot="title">
                <i class="el-icon-email"></i>
                <span>物品</span>
              </template>
              <el-menu-item index="/items/edit">
                <i class="el-icon-emailitems"></i>
                <span>物品创建</span>
              </el-menu-item>
              <el-menu-item index="/items/list">
                <i class="el-icon-email"></i>
                <span>物品列表</span>
              </el-menu-item>
          </el-menu-item-group>

          <!-- 英雄 -->
          <el-menu-item-group>
              <template slot="title">
                <i class="el-icon-email"></i>
                <span>英雄</span>
              </template>
              <el-menu-item index="/heroes/edit">
                <i class="el-icon-emailitems"></i>
                <span>英雄创建</span>
              </el-menu-item>
              <el-menu-item index="/heroes/list">
                <i class="el-icon-email"></i>
                <span>英雄列表</span>
              </el-menu-item>
          </el-menu-item-group>

          <!-- 文章 -->
          <el-menu-item-group>
              <template slot="title">
                <i class="el-icon-email"></i>
                <span>文章</span>
              </template>
              <el-menu-item index="/articles/edit">
                <i class="el-icon-emailitems"></i>
                <span>文章创建</span>
              </el-menu-item>
              <el-menu-item index="/articles/list">
                <i class="el-icon-email"></i>
                <span>文章列表</span>
              </el-menu-item>
          </el-menu-item-group>

          <!-- 广告位 -->
          <el-menu-item-group>
              <template slot="title">
                <i class="el-icon-email"></i>
                <span>广告位</span>
              </template>
              <el-menu-item index="/ads/edit">
                <i class="el-icon-emailitems"></i>
                <span>广告位创建</span>
              </el-menu-item>
              <el-menu-item index="/ads/list">
                <i class="el-icon-email"></i>
                <span>广告位列表</span>
              </el-menu-item>
          </el-menu-item-group>


        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>header</el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  mounted() {
    console.log(this.$route.path)
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key);
      console.log(keyPath);
      
    }
  }
}
</script>
<style scoped>
.main-wrapper {
  height: 100vh;
  
}
.el-menu {
    height: 100vh;
  }
</style>