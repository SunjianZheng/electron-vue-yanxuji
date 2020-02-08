<template>
  <div id="photo-details">
    <!-- <el-container> -->
      <el-container>
        <el-aside width="250px">
          <!-- 侧边栏 -->
          <keep-alive>
            <nav-bar></nav-bar>
          </keep-alive>
        </el-aside>
        <el-main>
          <!-- Body -->
          <el-container>
            <Details></Details>
          </el-container>
        </el-main>
      </el-container>
    <!-- </el-container> -->
   </div>
</template>

<script>
import NavBar from './../navBar/navBar';
import Details from './details';

export default {
  name: 'photo-details',
  components: { NavBar, Details },
  methods: {
  },
};
</script>

<style scoped>

</style>