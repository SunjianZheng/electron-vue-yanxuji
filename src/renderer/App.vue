<template>
  <!-- <div id="app" :style="{height: Height}"> -->
  <div id="app">
    <!-- <keep-alive>
      <router-view></router-view>
    </keep-alive> -->
    <el-container>
      <el-aside width="25%" style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);">
        <!-- <keep-alive> -->
          <nav-bar></nav-bar>
        <!-- </keep-alive> -->
      </el-aside>
      <el-main>
        <el-container>
          <transition name="fade-transform" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import NavBar from './components/navBar/navBar';
  export default {
    name: 'yanxuji',
    components: { NavBar },
    data() {
      return {
      };
    },
    mounted() {
    },
    watch: {
    },
  };
</script>

<style>
  *{
    scroll-behavior: smooth;
    text-decoration: none;
    -webkit-touch-callout:none;
	  -webkit-user-select:none;
	  user-select:none;
    /* font-family: Microsoft Yahei; */
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","????",Arial,sans-serif;
  }
  
  ::-webkit-scrollbar { 
    display: none; 
  }

  input{  
    -webkit-user-select:auto;
  }

  textarea{
    -webkit-user-select:auto;
  }

  .el-header {
    -webkit-app-region: drag;
  }

  .el-header > header,
  .el-header > .settingButtons >
  .el-dropdown, .el-header > .settingButtons > i{
    -webkit-app-region: no-drag;
  }
  .el-dialog__header /deep/ .el-dialog__headerbtn {
    -webkit-app-region: no-drag;
  }
  .el-image-viewer__wrapper /deep/ .el-image-viewer__btn, .el-image-viewer__close {
    -webkit-app-region: no-drag;
  }

  /* .el-loading-spinner .circular{
    width: 48px;
    height: 48px;
    animation: loading-rotate 2s linear infinite;
    display: none;
  }
  .el-loading-spinner{
    background: url('assets/loading.gif') no-repeat;
    width: 100%;
    height: 100%;
    top: 20%;
    left: 20%;
  } */

  /* .el-upload-list__item{
    text-align: center;
  } */
  .el-upload-list--picture-card /deep/ .el-upload-list__item-thumbnail {
    /* width: auto;
    height: 100%; */
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .v-modal {
    background: none;
  }

  .el-loading-spinner > .el-icon-loading,
  .el-loading-spinner > .el-loading-text {
    color: #FB966E;
  }

  .el-icon-map-location {
    color: #CB1B45;
  }

  .el-icon-error {
    color: #CB1B45;
  }

  .el-icon-warning-outline {
    color: #E2943B;
  }

  .el-image__error,
  /* .el-image__inner, */
  /* .el-image__placeholder, */
  .el-image__preview {
    width: auto;
    height: auto;
    max-width: 360px;
    max-height: 202px;
    border-radius: 5px;
  }

  .el-message {
    top: 310px;
    left: 650px;
  }

  /* fade */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.28s;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  /* fade-transform */
  .fade-transform-leave-active,
  .fade-transform-enter-active {
    transition: all .5s;
  }

  .fade-transform-enter {
    opacity: 0;
    /* transform: translateX(-30px); */
  }

  .fade-transform-leave-to {
    opacity: 0;
    /* transform: translateX(30px); */
  }

  /* breadcrumb transition */
  .breadcrumb-enter-active,
  .breadcrumb-leave-active {
    transition: all .5s;
  }

  /* .breadcrumb-enter */
  .breadcrumb-leave-active {
    opacity: 0;
    /* transform: translateX(20px); */
  }

  .breadcrumb-move {
    transition: all .5s;
  }

  .breadcrumb-leave-active {
    position: absolute;
  }
</style>
