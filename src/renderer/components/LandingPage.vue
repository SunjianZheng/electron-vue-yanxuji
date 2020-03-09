<template>
  <div id="app">
      <main-page></main-page>
   </div>
</template>

<script>
import MainPage from './LandingPage/MainPage';

export default {
  name: 'landing-page',
  components: { MainPage },
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
