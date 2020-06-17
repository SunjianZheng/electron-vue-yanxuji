<template>
  <el-main class="offline">
    <i class="el-icon-error"></i>
    <p style="color: #CB1B45;">网络无连接</p>
  </el-main>
</template>

<script>
  export default {
    data() {
      return {
        // isOnline: '',
      };
    },
    mounted() {
      window.ononline = () => {
        this.handleNetworkChange();
      };
    },
    methods: {
      handleNetworkChange(netStatus = true) {
        this.$store.commit('App/setOnline', netStatus);
        this.$router.go(-1);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .el-icon-error {
    padding-right: 10px;
    font-size: 18px;
  }
</style>