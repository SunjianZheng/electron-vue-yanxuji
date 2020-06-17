<template>
  <div id="search-page">
    <el-container v-loading="loading" element-loading-text="加载中..." element-loading-spinner="el-icon-loading">
      <el-header>
        <Header tittle='搜寻' class="app-header">
          <div class="inputBox" style="width: 80%;">
            <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
              <!-- <el-button slot="append" icon="el-icon-search" @click="search"></el-button> -->
            </el-input>
          </div>
        </Header>
      </el-header>

      <el-main v-if="isOnline" class="waterFallMain">
        <Masonry :imgArr="imgArr"></Masonry>
      </el-main>

      <el-main v-if="!isOnline" class="offline">
        <i class="el-icon-error" style="padding-right: 10px; font-size: 18px;"></i>
        <p style="color: #CB1B45;">网络无连接</p>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import searchForImages from '@services/Search';

  const debounce = (() => {
    let timer = 500;
    return (func, delay) => {
      clearTimeout(timer);
      timer = setTimeout(func, delay);
    };
  })();

  export default {
    name: 'search-page',
    data() {
      return {
        isOnline: navigator.onLine,
        query: '',
        albumName: this.$route.query.name,
        imgArr: [],
        showOrNot: false,
        loading: false,
      };
    },
    watch: {
      query() {
        debounce(() => {
          this.search();
        }, 500);
      },
    },
    methods: {
      search() {
        this.imgArr = [];
        // eslint-disable-next-line
        this.query.trim().length ? this.loading = true : false;

        if (this.query.trim()) {
          searchForImages(this.query.trim()).then((res) => {
            this.imgArr = res.result;
            this.loading = false;
          }).catch(() => {
            this.loading = false;
          });
        }
      },
      handleLoad() {},
    },
  };
</script>

<style lang="scss" scoped>
  .el-container {
    height: 100vh;
  }

  .waterFallMain {
    padding: 0;
  }

  .el-main {
    padding: 5px 42px;

    .masonry {
      column-gap: 60px;
    }
  }

  .offline {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
  }
</style>