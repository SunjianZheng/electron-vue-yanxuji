<template>
  <div id="search-page">
            <el-container class="style">
              <el-header style="text-align: right; font-size: 12px">
                <header>
                  <!-- <i @click="back" class="fa fa-chevron-left" aria-hidden="true"></i> -->
                  <i @click="back" class="el-icon-arrow-left">搜寻</i>
                  <!-- <span>SEARCH</span> -->
                </header>
              </el-header>

              <div style="width: 94%; margin: auto; margin-top: 15px;">
                <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
                  <!-- <el-select v-model="select" slot="prepend" placeholder="请选择">
                    <el-option label="相册" value="1"></el-option>
                    <el-option label="类型" value="2"></el-option>
                    <el-option label="人物" value="3"></el-option>
                  </el-select> -->
                  <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
              </div>

              <el-main
                v-if="isOnline"
                v-loading="loading"
                element-loading-text="加载中..."
                element-loading-spinner="el-icon-loading"
                class="waterFallMain"
              >
                <div class="masonry">
                  <div v-for="(item, index) in imgArr" :key="index" class="item">
                    <!-- <div v-show="showOrNot" @click="deleteFromAlbum(imgArr[index])" class="delete"> -->
                      <!-- <i class="el-icon-delete"></i> -->
                    <!-- </div> -->
                    <!-- <router-link v-if="imgArr[index]" :to="{path: '/photoDetails', query:{name: item.split('/')[4]}}"> -->
                    <router-link v-if="imgArr[index]" :to="{path: '/photoDetails', query:{name: item.split('/')[4]}}">
                      <!-- <img v-lazy="item" class="imgItem" alt /> -->
                      <el-card :body-style="{ padding: '10px' }" shadow="hover">
                        <!-- <div v-show="showOrNot" @click="deleteFromAlbum(imgArr[index])" class="delete">
                          <i class="el-icon-delete"></i>
                        </div> -->
                        <img v-lazy="item" class="imgItem" alt @load="handleLoad" />
                      </el-card>
                    </router-link>
                  </div>
                </div>
              </el-main>
              <el-main v-if="!isOnline" class="offline">
                <i class="el-icon-error" style="padding-right: 10px; font-size: 18px;"></i>
                <p style="color: #CB1B45;">网络无连接</p>
              </el-main>
            </el-container>
   </div>
</template>

<script>
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
  created() {
    window.addEventListener('online', this.updateStatus);
    window.addEventListener('offline', this.updateStatus);
  },
  watch: {
    query() {
      debounce(() => {
        this.search();
      }, 500);
    },
  },
  methods: {
    updateStatus(e) {
      const { type } = e;
      this.isOnline = type === 'online';
    },
    search() {
      this.imgArr = [];
      // eslint-disable-next-line
      this.query.trim().length ? this.loading = true : false;

      if (this.query.trim()) {
        this.axios.get(`${this.$apiPrefix}/search?key=${encodeURIComponent(this.query.trim())}`)
          .then((res) => {
            this.imgArr = res.data;
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
            this.openAlert();
          });
      }
    },
    openAlert() {
      this.$message({
        title: '警告',
        // message: `${msg}, 搜寻无结果!`,
        message: '搜寻无结果!',
        type: 'warning',
        offset: 320,
        center: true,
      });
    },
    handleLoad() {},
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
.waterFallMain {
  padding: 0;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

header {
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
    font-size: 20px;
    padding-right: 10px;
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

.settingButtons {
  display: flex;
}
/* .el-icon-circle-close {
  font-size: 30px;
  position: absolute;
  top: 40%;
  right: 43%;
  color: rgb(195, 82, 82);
} */
.el-icon-circle-check {
    padding-top: 22px;
    color: green;
}

.item {
  margin-bottom: 10px;
  break-inside: avoid;
  /* position: relative; */
}
.delete {
  height: 30px;
  background: rgb(195, 82, 82);
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (min-width: 1024px) {
  .style{
    width: 87%;
  };
  .masonry {
    column-count: 5;
  };
}
</style>