<template>
  <div id="photo-collections" v-loading="loading" element-loading-text="图片载入中..."
    element-loading-spinner="el-icon-loading">
    <el-container class="style">
      <el-header>
        <Header :tittle="albumName" class="app-header">
          <el-dropdown>
            <span class="el-dropdown-link">
              菜单
              <i class="el-icon-setting el-icon--right"></i>
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
          <!-- <i v-show="showFormOrNot" @click="hideForm" class="el-icon-circle-check"></i> -->
          <i v-show="showMultiSelectOrNot" @click="cancle" class="el-icon-circle-close"></i>
          <i v-show="showSingleSelectOrNot" @click="_modifyAlbumInfo($event, coverImgUrl), hideSingleSelect($event)"
            class="el-icon-circle-check"></i>
        </Header>
      </el-header>
      <el-main class="waterFallMain">
        <transition name="el-fade-in-linear el-zoom-in-center">
          <div v-show="showMultiSelectOrNot" class="albums">
            <el-divider class="divider"><i class="el-icon-files"></i></el-divider>
            <p v-for="(items, index) of albums" @click="hideMultiSelect($event, items.name)" :key="index"
              class="alName">
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
              <el-button @click="_modifyAlbumInfo($event, formInline), hideForm($event)" type="success"
                icon="el-icon-check">
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button @click="hideForm($event)" type="danger"
                icon="el-icon-close">
              </el-button>
            </el-form-item>
          </el-form>
        </transition>

        <!-- <Masonry :imgArr="imgArr">
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
                </Masonry> -->

        <div class="masonry">
          <div v-for="(item, index) in imgArr" :key="index" class="item">
            <router-link v-if="imgArr[index]" :to="{path: '/photoDetails', query:{name: item.split('/')[4]}}">
              <el-card :body-style="{ padding: '10px' }" shadow="hover">
                <div v-show="showOrNot" @click="deleteFromAlbum($event, imgArr[index])" class="delete">
                  <i class="el-icon-delete" style="color: #D05A6E; font-size: 32px;"></i>
                </div>

                <div v-show="showMultiSelectOrNot" @click="addToArray($event, imgArr[index], index)" class="addToArray">
                  <i class="el-icon-success multiSelectedCheck" style="font-size: 32px;"></i>
                </div>


                <div v-show="showSingleSelectOrNot" @click="singleSelect($event, imgArr[index], index)"
                  :class="{ checked: index === selectedIndex }" class="singleSelect">
                  <i :class="{ successed: index === selectedIndex }" class="el-icon-success"
                    style="color: rgba(0, 0, 0, 0); font-size: 32px;"></i>
                </div>
                <img v-lazy="item" class="imgItem" alt @load="handleLoad" />
              </el-card>
            </router-link>
          </div>
        </div>

      </el-main>
    </el-container>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import {
    getCompressedImages,
    deleteImage,
    modifyAvatar,
    moveImages,
    modifyAlbumInfo,
} from '@services/PhotoCollections';
  import showNotifications from '@utils/notifications';
  // import getBase64 from '@utils/imageToBase64';
  export default {
    name: 'photo-collections',
    data() {
      return {
        isOnline: navigator.onLine,
        query: this.$route.query.id,
        albumName: this.$route.query.name,
        imgArr: [],
        // imageBase64Arr: this._albumPhotosGetter,
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
      window.onoffline = () => {
        this.handleNetworkChange(false);
      };
      window.ononline = () => {
        this.handleNetworkChange();
      };
    },
    async mounted() {
      this.$store.dispatch('PhotoCollections/updateAlbumName', this.albumName);
      if (this.isOnline === true) {
        if (!this.imgArr.length || this._isUpdateGetter || this._albumNameGetter !== this.albumName) {
          await this.getImgs();
          // await this.covertPhotosToBase64();
          this.albums = this._Album;
        }
      }
    },
    computed: {
      ...mapGetters('Album', { _Album: 'getAlbums' }),
      ...mapGetters('PhotoCollections', {
        _albumNameGetter: 'getAlbumName',
        // _albumPhotosGetter: 'getPhotos',
        _isUpdateGetter: 'getUpdateStatus',
      }),
    },
    watch: {},
    methods: {
      handleNetworkChange(netStatus = true) {
        this.$store.commit('App/setOnline', netStatus);
        this.isOnline = netStatus;
        if (!netStatus) {
          return;
        }
        this.getImgs();
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
      },
      hideForm(e) {
        e.preventDefault();
        this.showFormOrNot = false;
      },
      showMultiSelect(e) {
        e.preventDefault();
        this.showMultiSelectOrNot = true;
      },
      hideMultiSelect(e, albumName) {
        e.preventDefault();
        this.showMultiSelectOrNot = false;
        this.move(this.needToMove, albumName, false);
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

      async getImgs() {
        this.loading = true;
        await getCompressedImages(this.albumName).then((res) => {
          this.$db.images.findOne({ albumName: this.albumName }, (err, findDoc) => {
            if (err) throw new Error(err);
            if (!findDoc) {
              this.$db.images.insert({
                albumName: this.albumName,
                images: res.compressedImgUrlArr,
              }, (err, newDoc) => {
                if (err) throw new Error(err);
                this.imgArr = newDoc.images;
              });
              return;
            }
            this.imgArr = findDoc.images;
          });
          // this.$store.dispatch('PhotoCollections/updatePhotos', res.compressedImgUrlArr);
          this.$store.dispatch('PhotoCollections/updateStatus', false);
          this.loading = false;
        })
          .catch(() => {
            this.loading = false;
          });
        // }
      },
      // async covertPhotosToBase64() {
      //   const imageBase64Arr = [];
      //   await this.imgArr.forEach(async (v) => {
      //     const b64Str = await getBase64(v);
      //     imageBase64Arr.push(b64Str);
      //   });
      //   this.imageBase64Arr = imageBase64Arr;
      // },

      async deleteFromAlbum(e, url) {
        e.preventDefault();
        this.loading = true;
        const u = url.split('/');
        await deleteImage(u[4]).then(async (res) => {
          const len = this.imgArr.length;
          if (url === this.imgArr[len - 1] && len > 1) {
            await this.changeAvatar();
          } else if (len === 1) {
            await this.changeAvatarToEmpty();
          }
          // this.$store.dispatch('PhotoCollections/updatePhotos', this.imageBase64Arr);
          this.updateDatastore(this.imgArr.remove(url));
          this.$store.dispatch('PhotoCollections/updateStatus', true);

          showNotifications({ title: res.message });
          this.loading = false;
        }).catch(() => {
          this.loading = false;
        });

        return false;
      },

      async changeAvatar() {
        const len = this.imgArr.length;
        const url = this.imgArr[len - 2].split('/')[4];

        await modifyAvatar(this.albumName, url).then((res) => {
          this.$store.dispatch('Album/updateStatus', true);
          showNotifications({ title: res.message });
        });
      },

      async changeAvatarToEmpty() {
        await modifyAvatar(this.albumName, 0).then(() => {
          this.$store.dispatch('Album/updateStatus', true);
        }).catch();
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

      async move(urlArr, albumName, moveAll = true) {
        this.loading = true;
        const len = this.imgArr.length;

        await moveImages(urlArr, albumName).then(async (res) => {
          if (urlArr.indexOf(this.imgArr[len - 1]) === 0 && len > 1) {
            await this.changeAvatar();
          } else if (len === 1) {
            await this.changeAvatarToEmpty();
          }

          // 如果修改了相册名字, 就把所有的相片的url移动
          // 否则只移动选取的部分
          if (moveAll) {
            await this.$db.images.update(
              { albumName },
              { $push: { images: { $each: this.imgArr } } },
              {}, () => {},
            );
          } else {
            const temp = this.imgArr;
            await this.updateDatastore(temp);
            urlArr.forEach((v) => {
              temp.remove(v);
            });

            await this.$db.images.update(
              { albumName },
              { $push: { images: { $each: urlArr } } },
              {}, () => {},
            );
          }

          showNotifications({ title: res.message });
        }).then(() => {
          this.$store.dispatch('PhotoCollections/updateStatus', true);
          this.loading = false;
        }).catch(() => {
          this.loading = false;
        });
      },

      async _modifyAlbumInfo(e, value) {
        e.preventDefault();
        this.loading = true;
        const originalInfo = [
          this.$route.query.name,
          this.$route.query.describe,
          this.$route.query.type,
        ];
        const info = [];
        let infoString = '';

        if (typeof (value) === 'object') {
          if (originalInfo.indexOf(value.name) === -1) {
            info.push({
              name: value.name,
            });
          }
          if (originalInfo.indexOf(value.describe) === -1) {
            info.push({
              describe: value.describe,
            });
          }
          if (originalInfo.indexOf(value.type) === -1) {
            info.push({
              type: value.type,
            });
          }
        } else if (typeof (value) === 'string') {
          info.push({
            avatar: value,
          });
          modifyAvatar(this.albumName, value.split('/')[4]).then((res) => {
            this.$store.dispatch('Album/updateStatus', true);
            showNotifications({ title: res.message });
          });
          // this.changeAvatar(this.albumName, value);
          this.loading = false;
          return;
        }
        // eslint-disable-next-line
        const keys = info.map(item => (Object.keys(item).toString()));
        // eslint-disable-next-line
        info.map((element) => {
          const temp = `${Object.keys(element).toString()}:${Object.values(element).toString()},`;
          infoString += temp;
        });
        await modifyAlbumInfo(this.albumName, infoString).then(async () => {
          const index = keys.indexOf('name');
          if (index !== -1) {
            await this.move(this.imgArr, info[index].name);
            this.albumName = info[index].name;
            this.$route.query.name = info[index].name;
          }
          this.loading = false;
        })
          .catch(() => {
            this.loading = false;
          });
      },
      async updateDatastore(newVal) {
        await this.$db.images.remove(
          { albumName: this.albumName },
          { multi: true },
          (err, numRemoved) => {
            if (err) throw new Error(err);
            if (numRemoved) {
              this.$db.images.insert({
                albumName: this.albumName,
                images: newVal,
              }, (err, newDoc) => {
                if (err) throw new Error(err);
                this.imgArr = newDoc.images;
              });
            }
          },
        );
      },
    },
    beforeDestroy() {
      // this.$store.dispatch('PhotoCollections/updatePhotos', []);
      this.$store.dispatch('PhotoCollections/updateStatus', true);
      this.$store.dispatch('PhotoCollections/updateAlbumName', '');
    },
  };
</script>

<style lang='scss' scoped>
  #photo-collections {
    height: 100vh;
  }

  .waterFallMain {
    padding: 0 15px 15px 15px;
  }

  .imgItem {
    width: 100%;
    margin-bottom: -5px;
    border-radius: 5px;
    // box-shadow: 0 2px 4px rgba(0, 0, 0, .35), 0 0 6px rgba(0, 0, 0, .35);
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
    display: flex;
    align-items: flex-end;
    margin-top: 15px;
    padding: 0 30px;
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


  .item {
    margin-bottom: 10px;
    break-inside: avoid;
    position: relative;
  }

  .item:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .1), 0 0 6px rgba(0, 0, 0, 0);
  }

  .addToArray,
  .delete,
  .singleSelect {
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