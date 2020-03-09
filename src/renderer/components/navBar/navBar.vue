<template>
  <div class="navBar">
    <el-container>
      <!-- <el-row class="tac"> -->
      <el-col :span="12">
        <div class="btnGroup">
          <TitleButton type="min" />
          <TitleButton type="max" />
          <TitleButton type="close" />
        </div>
        <el-menu default-active="1" class="el-menu-vertical" style="width: 25vw">
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
        <div class="background"></div>
      </el-col>
    <!-- </el-row> -->
    </el-container>
  </div>
</template>

<style scoped>
  .btnGroup {
    width: 100%;
    height: 30px;
    -webkit-app-region: drag;
    cursor: pointer;
  }
  .link{
    display: block;
    color: inherit;
  }
  /* i {
    color: #ED784A;
  } */
  .navBar{
    height: 100vh;
  }
  .logo{
    width: 100%;
    padding: 15px;
    margin-top: 30px;
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
    background: rgba(0,0,0,0);
    border: none;
  }
  .background {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-image: url('./../../assets/background.jpg');
    filter: blur(150px);
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
  }
  .el-submenu .el-menu-item {
    height: 100%;
    line-height: 50px;
    padding: 0 45px;
    min-width: 200px;
  }
  .el-menu-item:hover {
    background: rgba(255,255,255,0.1);
  }
  .is-active{
    color: white;
  }
</style>

<script>
  import TitleButton from './titleButton';
  export default {
    components: { TitleButton },
    data() {
      return {
        isCollapse: true,
        path: './../../assets/background.jfif',
      };
    },
  };
</script>