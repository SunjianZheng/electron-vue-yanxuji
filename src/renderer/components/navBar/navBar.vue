<template>
  <div class="navBar">
    <el-container>
      <el-row class="tac">
      <el-col :span="12">
        <el-menu default-active="1" class="el-menu-vertical-demo">
          <img class="logo" src="./../../assets/logo.png" alt="">
          <!-- <el-submenu index="1"> -->
            <!-- <template slot="title">
              <router-link to="/" class="link">
                <i class="el-icon-location-outline"></i>
                <span>主页</span>
              </router-link>
            </template> -->
            <!-- <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group> -->
          <!-- </el-submenu> -->
          <el-menu-item index="1">
              <router-link to="/" class="link">
                <i class="el-icon-position"></i>
                <span>主页</span>
              </router-link>
            </el-menu-item>
          <el-menu-item index="2">
             <router-link to="/search" class="link">
              <i class="el-icon-search"></i>
              <span>搜寻</span>
             </router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <router-link to="/recommand" class="link">
              <i class="el-icon-star-off"></i>
              <span>推荐</span>
             </router-link>
          </el-menu-item>
          <el-menu-item index="4">
            <router-link to="/thisDayInPastYears" class="link">
              <i class="el-icon-time"></i>
              <span>往年今日</span>
             </router-link>
          </el-menu-item>
          <el-menu-item index="5">
            <router-link to="/about" class="link">
              <i class="el-icon-more-outline"></i>
              <span>关于</span>
             </router-link>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    </el-container>
  </div>
</template>

<style scoped>
  .link{
    display: block;
    color: black;
  }
  i {
    color: #909399 !important;
  }
  .navBar{
    height: 96vh;
  }
  .logo{
    width: 100%;
    padding: 15px;
  }
  .el-row{
    height: 100%;
  }
  .el-col-12 {
    width: 100%;
    height: 100%;
  }
  .el-menu {
    height: 100%;
  }
  .el-submenu .el-menu-item {
    height: 100%;
    line-height: 50px;
    padding: 0 45px;
    min-width: 200px;
  }
</style>

<script>
  export default {
    data() {
      return {
        isCollapse: true,
      };
    },
  };
</script>