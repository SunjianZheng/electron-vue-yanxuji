<template>
  <div id="search-page">
      <el-container>
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
                <el-carousel :interval="3000" type="card" height="234px">
                  <el-carousel-item v-for="(item, index) in imgArr" :key="index">
                    <router-link v-if="imgArr[index]" :to="{path: '/photoDetails', query:{name: item.split('/')[4]}}">
                      <img :src="item" class="imgElement" alt="">
                    </router-link>
                  </el-carousel-item>
                </el-carousel>

                <section style="
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding-top: 31px;
                    margin: 0 auto;"
                >
                  <div class="albumContainer">
                    <div v-for="(items, index) of recommandByPhotographedDay" :key="index" style="width: 0px; margin-bottom: 10px;">
                      <el-card :body-style="{ padding: '0px' }" shadow="hover">
                        <router-link
                          :to="{path: '/photoCollections', query:{name: `${items.year}年度`, imgUrl: items.url}}"
                          class="linkToPhotoCollections"
                        >
                          <div class="wrapper">
                            <img v-lazy="items.url[0]" class="image"/>
                            <div class="shade">
                              <span>{{ items.year + '年度'}}</span>
                            </div>
                          </div>
                        </router-link>
                      </el-card>
                    </div>

                    <div v-for="(items, index) of recommandByPhotographedPlace" :key="'items-'+index" style="width: 0px; margin-bottom: 10px;">
                      <router-link
                          :to="{path: '/photoCollections', query:{name: `于${items.city}`, imgUrl: items.url}}"
                          class="linkToPhotoCollections"
                        >
                        <el-card :body-style="{ padding: '0px' }" shadow="hover">
                            <div class="wrapper">
                              <img v-lazy="items.url[0]" class="image" />
                              <div class="shade">
                                <span>{{ '于' + items.place }}</span>
                              </div>
                            </div>
                        </el-card>
                      </router-link>
                    </div>
                  </div>
                </section>
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

export default {
  name: 'recommand-page',
  data() {
    return {
      isOnline: navigator.onLine,
      imgArr: [],
      albums: {},
      recommandByPhotographedDay: [],
      recommandByPhotographedPlace: [],
      loading: false,
    };
  },
  created() {
    window.addEventListener('online', this.updateStatus);
    window.addEventListener('offline', this.updateStatus);
    this.getRecommandArray();
    this.getRecommendAlbums();
    // this.loadImage(this.recommandByPhotographedDay);
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
    async getRecommendAlbums() {
      this.loading = true;
      await this.axios
        .get(`${this.$apiPrefix}/getRecommendAlbums`)
        .then((res) => {
          // this.albums = res.data;
          const { recommandByPhotographedDay, recommandByPhotographedPlace } = res.data;
          this.recommandByPhotographedDay = recommandByPhotographedDay;
          this.recommandByPhotographedPlace = recommandByPhotographedPlace;
          this.loading = false;
        })
        .catch((err) => {
          console.error(err);
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
  height: 100vh;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

header {
  font-size: 30px;
  text-align: center;
}

.el-main{
  padding: 5px;
  /* display: flex;
  align-items: center; */
  /* margin-bottom: 60px; */
}
  .el-carousel {
    width: 90%;
    height: 50%;
    margin: 0 auto;
  }

  .imgElement {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px;
  }

  .albumContainer {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    margin-left: 39px;
    margin-top: 15px;
  }

  .el-card {
  width: 185px;
  height: 185px;
}

.wrapper {
  height: 185px;
  width: 185px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
}

.image {
  height: 100%;
  display: block;
}

.shade {
  height: 185px;
  width: 185px;
  position: absolute;
  background: rgba(0,0,0,0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  color: white;
}

.shade:hover {
  background: none;
  color: rgba(0,0,0,0);
  transform: scale(1);
  transition: all .5s linear;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
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
</style>