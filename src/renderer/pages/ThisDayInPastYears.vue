<template>
  <el-container>
    <el-container v-loading="loading" element-loading-text="加载中..." element-loading-spinner="el-icon-loading"
      class="style">
      <el-header>
        <Header tittle="往年今日" class="app-header"></Header>
      </el-header>
      <!-- <el-main v-if="isOnline && imgArr" class="waterFallMain"> -->
      <el-main v-if="imgArr" class="waterFallMain">
        <div class="masonry">
          <div v-for="(item, index) in imgArr" :key="item + '_'" class="item">
            <router-link v-if="imgArr[index]" :to="{path: '/photoDetails', query:{name: item.split('/')[4]}}">
              <img :src="item" class="imgItem" alt />
            </router-link>
          </div>
        </div>
        <!-- <Masonry :imgArr="imgArr"></Masonry> -->
      </el-main>
      <el-main v-if="!isOnline" class="offline">
        <i class="el-icon-error" style="padding-right: 10px; font-size: 18px;"></i>
        <p style="color: #CB1B45;">网络无连接</p>
      </el-main>
      <el-main v-if="isOnline && imgArr.length === 0" class="notFound">
        <i class="el-icon-warning-outline" style="padding-right: 10px; font-size: 18px;"></i>
        <p style="color: #E2943B;">暂无记录</p>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import searchForImages from '@services/Search';
  export default {
    data() {
      return {
        isOnline: navigator.onLine,
        imgArr: [],
        loading: false,
      };
    },
    created() {
      this.searchForImg();
    },
    methods: {
      async searchForImg() {
        this.loading = true;
        // const day = moment()
        //   .locale('zh-cn')
        //   .format('YYYY-MM-DD HH:mm:ss')
        //   .split(' ')[0]
        //   .split('-')
        //   .splice(1, 2)
        //   .join(':');
        const date = new Date();
        // eslint-disable-next-line
        let mm = date.getMonth() + 1;
        // eslint-disable-next-line
        mm = mm < 10 ? '0' + mm : mm;
        // eslint-disable-next-line
        const dd = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        // eslint-disable-next-line
        const day = mm + ':' + dd;

        await searchForImages(day).then(({ result }) => {
          this.imgArr = result;
          this.loading = false;
        }).catch(() => {
          this.loading = false;
        });
      },
    },
  };
</script>

<style scoped>

  .el-main {
    height: 100vh;
    padding: 5px;
  }

  .offline,
  .notFound {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .imgItem {
    width: 100%;
    border-radius: 5px;
  }

  .masonry {
    column-count: 3;
    column-gap: 15px;
    margin: 10px 40px;
  }
</style>