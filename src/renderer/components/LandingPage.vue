<template>
  <div id="app">
    <!-- <el-container> -->
      <el-container>
        <el-aside width="250px">
          <!-- 侧边栝 -->
          <keep-alive>
            <nav-bar></nav-bar>
          </keep-alive>
        </el-aside>
        <el-main>
          <!-- Body -->
          <el-container>
            <main-page></main-page>
          </el-container>
        </el-main>
      </el-container>
    <!-- </el-container> -->
   </div>
</template>

<script>
import MainPage from './LandingPage/MainPage';
import NavBar from './navBar/navBar';

export default {
  name: 'landing-page',
  components: { NavBar, MainPage },
  methods: {
  },
};
</script>

<style>

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.el-container{
  height: 100%;
  direction: vertical;
}
.el-aside{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  overflow-y: auto;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  height: 100vh;
  /* padding: 60px 80px; */
  width: 100vw;
}
</style>
