<template>
  <el-container>
    <el-aside style="width: 250px;">
      <keep-alive>
        <nav-bar></nav-bar>
      </keep-alive>
    </el-aside>
    <el-container class="style">
      <el-header>
        <header>
          <i @click="back" class="el-icon-arrow-left">往年今日</i>
        </header>
      </el-header>
      <el-main
        v-if="isOnline && imgArr"
        v-loading="loading"
        element-loading-text="加载中..."
        element-loading-spinner="el-icon-loading"
        class="waterFallMain"
       >
        <div class="masonry">
          <div v-for="(item, index) in imgArr" :key="index" class="item">
            <router-link v-if="imgArr[index]" :to="{path: '/photoDetails', query:{name: item.split('/')[4]}}">
              <img :src="item" class="imgItem" alt />
            </router-link>
          </div>
        </div>
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
import NavBar from './../navBar/navBar';

export default {
  components: { NavBar },
  data() {
    return {
      isOnline: navigator.onLine,
      imgArr: [],
      loading: false,
    };
  },
  created() {
    window.addEventListener('online', this.updateStatus);
    window.addEventListener('offline', this.updateStatus);
    this.searchForImg();
  },
  methods: {
    searchForImg() {
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
      console.log(day);

      this.axios.get(`${this.$apiPrefix}/search?key=${encodeURIComponent(day)}`)
        .then((res) => {
          this.imgArr = res.data;
          this.loading = false;
        })
        .catch((err) => {
          console.error(err.message);
          this.loading = false;
        });
    },
    updateStatus(e) {
      const { type } = e;
      this.isOnline = type === 'online';
      if (this.isOnline) {
        this.searchForImg();
      }
    },
    back() {
      this.$router.back(-1);
    },
  },
  beforeDestroy() {
    window.removeEventListener('online', this.updateStatus);
    window.removeEventListener('offline', this.updateStatus);
  },
};
</script>

<style scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header {
  font-size: 24px;
  text-align: center;
}

.el-dropdown{
  float: right;
  padding-top: 20px;
  margin-right: 10px;
}

.el-main{
  padding: 5px;
}

.style {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 75%;
  overflow-y: auto;
}

.el-icon-arrow-left {
    float: left;
    line-height: 42px;
    font-size: 24px;
    padding-right: 10px;
}

.offline,
.notFound {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}

.waterFallMain {
  padding: 0;
}

.imgItem {
  width: 100%;
  border-radius: 5px;
}

.masonry {
  column-count: 3;
  column-gap: 15px;
  margin: 10px 20px;
}
</style>