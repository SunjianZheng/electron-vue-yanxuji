<template>
  <div id="photo-collections">
      <el-container>
        <el-main>
          <el-container>
            <el-container class="style">
              <el-header style="text-align: right; font-size: 12px">
                <header>
                  <i @click="back" class="el-icon-arrow-left">{{albumName}}</i>
                </header>

                <!-- <el-button type="primary" @click="move">move test</el-button>
                <el-button type="primary" @click="modifyAlbumInfo">modify album test</el-button> -->

                <div class="settingButtons">
                  <!-- <el-dropdown :hide-on-click="false"> -->
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      菜单<i class="el-icon-setting el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <router-link :to="{path: '/upload', query:{name: albumName}}" class="linkToUpload">
                        <el-dropdown-item icon="el-icon-plus">新增相片</el-dropdown-item>
                      </router-link>
                      <el-dropdown-item icon="el-icon-d-arrow-left" @click.native="showMultiSelect">移动相片</el-dropdown-item>
                      <el-dropdown-item icon="el-icon-setting" @click.native="showForm">变更信息</el-dropdown-item>
                      <el-dropdown-item icon="el-icon-refresh" @click.native="showSingleSelect">变更封面</el-dropdown-item>
                      <el-dropdown-item icon="el-icon-delete" @click.native="showIcons">删除相片</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <i v-show="showOrNot" @click="hideIcons" class="el-icon-circle-check"></i>
                  <i v-show="showFormOrNot" @click="hideForm" class="el-icon-circle-check"></i>
                  <i v-show="showMultiSelectOrNot" @click="cancle" class="el-icon-circle-close"></i>
                  <i v-show="showSingleSelectOrNot" @click="modifyAlbumInfo($event, coverImgUrl), hideSingleSelect($event)" class="el-icon-circle-check"></i>
                </div>
              </el-header>

              <el-main
                v-loading="loading"
                element-loading-text="加载中..."
                element-loading-spinner="el-icon-loading"
                class="waterFallMain"
              >
              <transition name="el-fade-in-linear el-zoom-in-center">
                <div v-show="showMultiSelectOrNot" class="albums">
                  <el-divider class="divider"><i class="el-icon-files"></i></el-divider>
                  <p
                    v-for="(items, index) of albums"
                    @click="hideMultiSelect($event, items.name)"
                    :key="index"
                    class="alName"
                  >
                    <span>{{items.name}}</span>
                    <el-divider></el-divider>
                  </p>
                </div>
              </transition>

              <transition name="el-fade-in-linear el-zoom-in-top">
                <el-form v-show="showFormOrNot" :inline="true" :model="formInline" size="mini" class="formInline">
                    <el-form-item label="名称:">
                      <el-input v-model="formInline.name" placeholder="无"></el-input>
                    </el-form-item>
                    <el-form-item label="描述:">
                      <el-input v-model="formInline.describe" placeholder="无"></el-input>
                    </el-form-item>
                    <el-form-item label="类型:">
                      <el-input v-model="formInline.type" placeholder="无"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button @click="modifyAlbumInfo($event, formInline)" type="success" round icon="el-icon-check"></el-button>
                    </el-form-item>
                  </el-form>
              </transition>

                <div class="masonry">
                  <div v-for="(item, index) in imgArr" :key="index" class="item">
                    <!-- <div v-show="showOrNot" @click="deleteFromAlbum(imgArr[index])" class="delete">
                      <i class="el-icon-delete"></i>
                    </div> -->
                    <router-link v-if="imgArr[index]" :to="{path: '/photoDetails', query:{name: item.split('/')[4]}}">
                      <!-- <img v-lazy="item" class="imgItem" alt @load="handleLoad" /> -->
                      <el-card :body-style="{ padding: '10px' }" shadow="hover">
                        <div v-show="showOrNot" @click="deleteFromAlbum(imgArr[index])" class="delete">
                          <i class="el-icon-delete" style="color: #D05A6E; font-size: 32px;"></i>
                        </div>

                        <div v-show="showMultiSelectOrNot" @click="addToArray($event, imgArr[index], index)" class="addToArray">
                          <i class="el-icon-success multiSelectedCheck" style="font-size: 32px;"></i>
                        </div>


                        <div
                          v-show="showSingleSelectOrNot"
                          @click="singleSelect($event, imgArr[index], index)"
                          :class="{ checked: index === selectedIndex }"
                          class="singleSelect">
                          <i
                            :class="{ successed: index === selectedIndex }"
                            class="el-icon-success"
                            style="color: rgba(0, 0, 0, 0); font-size: 32px;"
                          ></i>
                        </div>
                        <img v-lazy="item" class="imgItem" alt @load="handleLoad" />
                      </el-card>
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
export default {
  name: 'photo-collections',
  data() {
    return {
      query: this.$route.query.id,
      albumName: this.$route.query.name,
      imgArr: [],
      tempImgArr: [],
      needToMove: [],
      showOrNot: false,
      showMultiSelectOrNot: false,
      showSingleSelectOrNot: false,
      showFormOrNot: false,
      albums: [],
      formInline: {
        name: this.$route.query.name,
        describe: this.$route.query.describe,
        type: this.$route.query.type,
      },
      selectedIndex: -1,
      coverImgUrl: '',
      loading: false,
    };
  },
  created() {
    this.getImgs();
    this.getAlbum();
  },
  methods: {
    getImgs() {
      if (this.$route.query.imgUrl) {
        this.imgArr = this.$route.query.imgUrl;
      } else {
        this.loading = true;
        // eslint-disable-next-line
        const query = this.query;
        // this.axios.get(`${this.$apiPrefix}/getOriginalImg?id=${query}`)
        this.axios.get(`${this.$apiPrefix}/getCompressedImg?name=${window.encodeURIComponent(this.albumName)}`)
          .then((res) => {
            this.imgArr = res.data;
            this.loading = false;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    handleLoad() {
      // this.loading = false;
    },
    showIcons(e) {
      e.preventDefault();
      this.showOrNot = true;
    },
    hideIcons(e) {
      e.preventDefault();
      this.showOrNot = false;
    },
    showForm(e) {
      e.preventDefault();
      this.showFormOrNot = true;
      // document.querySelector('.formInline').style.display = 'inline-flex';
    },
    hideForm(e) {
      e.preventDefault();
      this.showFormOrNot = false;
      // document.querySelector('.formInline').style.display = 'none';
    },
    showMultiSelect(e) {
      e.preventDefault();
      this.showMultiSelectOrNot = true;
      // document.querySelector('.albums').style.display = 'block';
    },
    hideMultiSelect(e, albumName) {
      e.preventDefault();
      this.showMultiSelectOrNot = false;
      this.move(this.needToMove, albumName);
      // document.querySelector('.albums').style.display = 'none';
    },
    showSingleSelect(e) {
      e.preventDefault();
      this.showSingleSelectOrNot = true;
    },
    hideSingleSelect(e) {
      e.preventDefault();
      this.showSingleSelectOrNot = false;
    },
    cancle(e) {
      e.preventDefault();
      this.needToMove = [];
      this.showMultiSelectOrNot = false;
      document.querySelector('.albums').style.display = 'none';
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
      return false;
    },
    async changeAvatar() {
      const len = this.imgArr.length;
      const url = this.imgArr[len - 2].split('/')[4];

      await this.axios.post(`${this.$apiPrefix}/changeAvatar?name=${window.encodeURIComponent(this.albumName)}&url=${url}`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async changeAvatarToEmpty() {
      await this.axios.post(`${this.$apiPrefix}/changeAvatar?name=${window.encodeURIComponent(this.albumName)}&url=0`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async getAlbum() {
      await this.axios
        .get(`${this.$apiPrefix}/getAlbum`)
        .then((res) => {
          this.albums = res.data.albums;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    addToArray(e, imgUrl, index) {
      e.preventDefault();
      e.stopPropagation();

      const classAddToArray = document.querySelectorAll('.addToArray')[index];
      const checkedIcon = document.querySelectorAll('.multiSelectedCheck')[index];

      if (classAddToArray.classList.contains('checked')) {
        this.needToMove = this.needToMove.filter(item => item !== imgUrl);
        classAddToArray.classList.remove('checked');
        checkedIcon.classList.remove('successed');
      } else {
        this.needToMove.push(imgUrl);
        classAddToArray.classList.add('checked');
        checkedIcon.classList.add('successed');
      }
      return false;
    },
    singleSelect(e, imgUrl, index) {
      e.preventDefault();
      e.stopPropagation();

      this.selectedIndex = index;
      this.coverImgUrl = imgUrl;
    },
    async move(urlArr, albumName) {
      this.loading = true;
      const len = this.imgArr.length;

      await this.axios.post(`${this.$apiPrefix}/moveImages?urlString=${urlArr}&albumName=${window.encodeURIComponent(albumName)}`)
        .then(async (res) => {
          console.log('move -> res', res);
          if (res.status === 200 && res.data === 1) {
            if (urlArr.indexOf(this.imgArr[len - 1]) === 0 && len > 1) {
              await this.changeAvatar();
            } else if (len === 1) {
              await this.changeAvatarToEmpty();
            }
            await this.getImgs();
            this.loading = false;
          }
          this.loading = false;
        })
        .catch((err) => {
          console.error(err.message);
          this.loading = false;
        });
    },
    async modifyAlbumInfo(e, value) {
      e.preventDefault();
      const originalInfo = [
        this.$route.query.name,
        this.$route.query.describe,
        this.$route.query.type,
      ];
      const info = [];
      let infoString = '';

      if (typeof (value) === 'object') {
        if (originalInfo.indexOf(value.name) === -1) {
          info.push({ name: value.name });
        }
        if (originalInfo.indexOf(value.describe) === -1) {
          info.push({ describe: value.describe });
        }
        if (originalInfo.indexOf(value.type) === -1) {
          info.push({ type: value.type });
        }
      } else if (typeof (value) === 'string') {
        info.push({ avatar: value });
      }

      // eslint-disable-next-line
      const keys = info.map((item) => (Object.keys(item).toString()));
      // eslint-disable-next-line
      info.map((element) => {
        const temp = `${Object.keys(element).toString()}:${Object.values(element).toString()},`;
        infoString += temp;
      });
      await this.axios.post(`${this.$apiPrefix}/modifyAlbumInfo?albumName=${window.encodeURIComponent(this.albumName)}&info=${window.encodeURIComponent(infoString)}`)
        .then(async (res) => {
          if (res.status === 200 && res.data === 1) {
            const index = keys.indexOf('name');
            if (index !== -1) {
              await this.move(this.imgArr, info[index].name);
              this.albumName = info[index].name;
              this.$route.query.name = info[index].name;
            }
          }
          await this.getAlbum();
        })
        .catch((err) => {
          console.error(err.message);
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
  align-items: flex-end;
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

.el-dropdown-link {
  cursor: pointer;
  /* color: #ED784A; */
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
    font-size: 20px;
    padding-right: 10px;
}

.imgItem {
  width: 100%;
  margin-bottom: -5px;
  /* border-radius: 5px; */
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, .35), 0 0 6px rgba(0, 0, 0, .35) */
}

.albums {
    width: 20%;
    height: 445px;
    float: left;
    padding: 0 20px 10px 20px;
    margin-top: 10px;
    margin-right: 15px;
    border-right: 1px solid #d6d6d6;
    /* display: none; */
}

.formInline {
    transform: scale(0.9);
    text-align: left;
    justify-content: start;
    display: flex;
    align-items: center;
    margin-top: 15px;
    /* display: none; */
}

.masonry {
  column-count: 3;
  column-gap: 15px;
  margin: 10px 20px;
}

.alName {
  font-size: 11px;
  /* padding-top: 15px; */
  cursor: pointer;
  /* text-align: center; */
}

.alName:hover {
  color: rgba(144, 179, 234, 0.67);
}

.el-divider {
  margin: 15px 0;
}

.divider {
  margin: 0 0 25px 0 !important;
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
    padding-top: 25px;
    padding-right: 10px;
    color: green;
}

.el-icon-circle-close {
    padding-top: 25px;
    color: red;
}

.item {
  margin-bottom: 10px;
  break-inside: avoid;
  position: relative;
}

.addToArray, .delete , .singleSelect{
  height: 100%;
  width: 100%;
  /* background: rgba(0, 0, 0, 0.3); */
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0px;
  left: 0px;
}

.delete {
  background: rgba(199, 62, 58, 0.3);
  /* background: rgba(0, 0, 0, 0.3); */
}

.checked {
  background: rgba(0, 0, 0, 0.3);
}

.multiSelectedCheck {
  color: rgba(0, 0, 0, 0); 
}
.successed {
  color: green !important;
}
</style>