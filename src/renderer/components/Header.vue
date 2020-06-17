<template>
  <section class="app-header">
    <div v-show="showTittle" class="tittle">
      <i @click="back" class="el-icon-arrow-left"><span>{{tittle}}</span></i>
    </div>
    <slot />
  </section>
</template>

<script>
  export default {
    props: {
      tittle: {
        type: String,
        default: '',
      },
      showTittle: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        headerClass: 'app-header',
      };
    },
    mounted() {},
    methods: {
      back() {
        this.$router.back(-1);
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import 'static/css/element';

  .app-header {
    @include yanxujiHeader;

    .tittle {
      flex: 1;
      float: left;
      margin-left: 20px;

      i {
        font-size: 20px;
      }

      span {
        display: inline-block;
        // vertical-align: 2px;
      }
    }

    i:not(.el-icon-arrow-left) {
      float: right;
      padding-right: 25px;
      padding-top: 22px;
    }
  }
</style>