<template>
  <div id="search-page">
      <el-container>
        <el-aside width="250px">
          <keep-alive>
            <nav-bar></nav-bar>
          </keep-alive>
        </el-aside>
        <el-main>
          <el-container>
            <el-container class="style">
              <el-header style="text-align: right; font-size: 12px">
                <header>
                  <i @click="back" class="el-icon-arrow-left">推荐</i>
                </header>
              </el-header>

              <el-main
                v-if="isOnline"
                v-loading="loading"
                element-loading-text="加载中..."
                element-loading-spinner="el-icon-loading"
                class="recommandMain"
              >
                <el-carousel :interval="3000" type="card" height="200px">
                  <el-carousel-item v-for="(item, index) in imgArr" :key="index">
                    <router-link v-if="imgArr[index]" :to="{path: '/photoDetails', query:{name: item.split('/')[4]}}">
                      <img :src="item" class="imgElement" alt="">
                    </router-link>
                  </el-carousel-item>
                </el-carousel>
              </el-main>
              <el-main v-if="!isOnline" class="offline">
                <i class="el-icon-error" style="padding-right: 10px; font-size: 18px;"></i>
                <p style="color: #CB1B45;">网络无连接</p>
              </el-main>
            </el-container>
          </el-container>
        </el-main>
      </el-container>
   </div>
</template>

<script>
import NavBar from './../navBar/navBar';

export default {
  name: 'recommand-page',
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
    this.getRecommandArray();
  },
  watch: {
  },
  methods: {
    updateStatus(e) {
      const { type } = e;
      this.isOnline = type === 'online';
      if (this.isOnline) {
        this.getRecommandArray();
      }
    },
    async getRecommandArray() {
      this.loading = true;

      await this.axios.get(`${this.$apiPrefix}/recommand`)
        .then((res) => {
          this.imgArr = res.data;
          this.loading = false;
        })
        .catch((err) => {
          console.error(err.message);
        });
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
  .recommandMain {
  padding: 0;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header {
  font-size: 30px;
  text-align: center;
}

.el-main{
  padding: 5px;
  display: flex;
  align-items: center;
  margin-bottom: 60px;
}
  .el-carousel {
    width: 90%;
    margin: 0 auto;
  }
  
  .imgElement {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

.offline {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
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

/* .imgItem {
  width: 100%;
  border-radius: 5px;
}

.masonry {
  column-count: 3;
  column-gap: 15px;
  margin: 10px 20px;
}

.settingButtons {
  display: flex;
} */
/* .el-icon-circle-close {
  font-size: 30px;
  position: absolute;
  top: 40%;
  right: 43%;
  color: rgb(195, 82, 82);
} */
/* .el-icon-circle-check {
    padding-top: 22px;
    color: green;
} */

/* .item {
  margin-bottom: 10px;
  break-inside: avoid;
}
.delete {
  height: 30px;
  background: rgb(195, 82, 82);
  display: flex;
  justify-content: center;
  align-items: center;
} */
</style>