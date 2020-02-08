<template>
  <div id="photo-collections">
      <el-container>
        <el-aside width="250px">
          <keep-alive>
            <nav-bar></nav-bar>
          </keep-alive>
        </el-aside>
        <el-main
          v-loading="loading"
          element-loading-text="加载中..."
          element-loading-spinner="el-icon-loading"
        >
          <el-container>
            <el-container class="style">
              <el-header style="text-align: right; font-size: 12px">
                <header>
                  <!-- <i @click="back" class="fa fa-chevron-left" aria-hidden="true"></i> -->
                  <i @click="back" class="el-icon-arrow-left">{{albumName}}</i>
                </header>

                <div class="settingButtons">
                  <el-dropdown>
                    <i class="el-icon-setting"></i>
                    <el-dropdown-menu slot="dropdown">
                      <router-link :to="{path: '/upload', query:{id: query}}" class="linkToUpload">
                        <el-dropdown-item>新增</el-dropdown-item>
                      </router-link>
                      <el-dropdown-item @click.native="showIcons">删除</el-dropdown-item>
                    </el-dropdown-menu>
                    <span>设置</span>
                  </el-dropdown>
                  <i v-show="showOrNot" @click="hideIcons" class="el-icon-circle-check"></i>
                </div>
              </el-header>

              <el-main class="waterFallMain">
                <div class="masonry">
                  <div v-for="(item, index) in imgArr" :key="index" class="item">
                    <div v-show="showOrNot" @click="deleteFromAlbum(imgArr[index])" class="delete">
                      <i class="el-icon-delete"></i>
                    </div>
                    <router-link v-if="imgArr[index]" :to="{path: '/photoDetails', query:{name: item.split('/')[4]}}">
                      <img :src="item" class="imgItem" alt />
                    </router-link>
                  </div>
                </div>
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
  name: 'photo-collections',
  components: { NavBar },
  data() {
    return {
      query: this.$route.query.id,
      albumName: this.$route.query.name,
      imgArr: [],
      tempImgArr: [],
      showOrNot: false,
      loading: false,
    };
  },
  created() {
    this.getImgs();
  },
  methods: {
    getImgs() {
      this.loading = true;
      // eslint-disable-next-line
      const query = this.query;
      // this.axios.get(`${this.$apiPrefix}/getOriginalImg?id=${query}`)
      this.axios.get(`${this.$apiPrefix}/getCompressedImg?id=${query}`)
        .then((res) => {
          this.imgArr = res.data;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showIcons(e) {
      e.preventDefault();
      this.showOrNot = true;
    },
    hideIcons(e) {
      e.preventDefault();
      this.showOrNot = false;
    },
    async deleteFromAlbum(url) {
      // eslint-disable-next-line
      event.preventDefault();
      this.loading = true;
      // console.log(url);
      const u = url.split('/');
      // console.log(u[4]);
      await this.axios.post(`${this.$apiPrefix}/deleteImg?url=${u[4]}`)
        .then(async () => {
          // this.imgArr = res.data;
          const len = this.imgArr.length;
          if (url === this.imgArr[len - 1] && len > 1) {
            await this.changeAvatar();
          } else if (len === 1) {
            await this.changeAvatarToEmpty();
          }
          await this.getImgs();
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async changeAvatar() {
      const len = this.imgArr.length;
      const url = this.imgArr[len - 2].split('/')[4];

      await this.axios.post(`${this.$apiPrefix}/changeAvatar?id=${this.query}&url=${url}`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async changeAvatarToEmpty() {
      await this.axios.post(`${this.$apiPrefix}/changeAvatar?id=${this.query}&url=0`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    back() {
      this.$router.back(-1);
    },
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
  align-items: center;
}

header {
  font-size: 30px;
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

.imgItem {
  width: 100%;
  border-radius: 5px;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, .35), 0 0 6px rgba(0, 0, 0, .35) */
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
  position: relative;
}
.delete {
  height: 30px;
  /* background: rgb(195, 82, 82); */
  background: rgba(199, 62, 58, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
</style>