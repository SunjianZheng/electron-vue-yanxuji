<template>
  <div id="search-page">
      <el-container>
        <el-main>
          <el-container>
            <el-container>
              <el-header style="text-align: right; font-size: 12px">
                <Header tittle='推荐' class="app-header"></Header>
              </el-header>

              <el-main
                v-if="isOnline"
                v-loading="loading"
                element-loading-text="加载中..."
                element-loading-spinner="el-icon-loading"
                class="recommendMain"
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
                    margin: 0 auto;"
                >
                  <div class="albumContainer">
                    <div v-for="(items, index) of recommendByPhotographedDay" :key="'items_'+index" class="reCollections">
                        <router-link
                          :to="{path: '/photoCollections', query:{name: `${items.year}年度`, imgUrl: items.url}}"
                          class="linkToPhotoCollections"
                        >
                          <Card :imgUrl="items.url[0]" :showWrapper=true :paddingCard=0>
                            <div class="shade">
                              <span>{{ items.year + '年度'}}</span>
                            </div>
                          </Card>

                        </router-link>

                    </div>

                    <div v-for="(items, index) of recommendByPhotographedPlace" :key="'items-'+index" class="reCollections">
                      <router-link
                          :to="{path: '/photoCollections', query:{name: `于${items.place}`, imgUrl: items.url}}"
                          class="linkToPhotoCollections">
                        
                        <Card :imgUrl="items.url[0]" :showWrapper=true :paddingCard=0>
                          <div class="shade">
                            <span>{{ '于' + items.place }}</span>
                          </div>
                        </Card>

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

import { getRecommendPhotos, getRecommendAlbums } from '@services/Recommend';

export default {
  name: 'recommend-page',
  data() {
    return {
      isOnline: navigator.onLine,
      imgArr: [],
      albums: {},
      isLoaded: false,
      recommendByPhotographedDay: [],
      recommendByPhotographedPlace: [],
      loading: false,
    };
  },
  created() {
    this._getRecommendPhotos();
    this._getRecommendAlbums();
  },
  // watch: {
  //   isLoaded(newVal, oldVal) {
  //     console.log(`old: ${oldVal}, new: ${newVal}`);
  //     this.isLoaded = newVal;
  //   },
  // },
  methods: {
    async _getRecommendPhotos() {
      this.loading = true;

      await getRecommendPhotos().then((res) => {
        this.imgArr = res.photos;
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
    async _getRecommendAlbums() {
      this.loading = true;

      await getRecommendAlbums().then((res) => {
        const { recommendByPhotographedDay, recommendByPhotographedPlace } = res.albums;
        this.recommendByPhotographedDay = recommendByPhotographedDay;
        this.recommendByPhotographedPlace = recommendByPhotographedPlace;
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
    loadImage(index) {
      this.isLoaded = true;
      const dom = document.querySelectorAll('.shade');
      dom[index].style.display = 'flex';
    },
  },
};
</script>

<style scoped>
  .recommendMain {
  padding: 0;
  height: 100vh;
}

.el-main{
  padding: 5px;
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

  .reCollections {
    margin-bottom: 10px;
  }

.shade {
  height: 185px;
  width: 185px;
  position: absolute;
  background: rgba(0,0,0,0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  color: white;
  /* display: none; */
}

.shade:hover {
  background: none;
  color: transparent;
  /* transform: scale(1); */
  transition: all .5s linear;
}

.offline {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}

</style>