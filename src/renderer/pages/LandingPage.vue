<template>
  <el-container v-loading="loading" element-loading-text="加载中..." element-loading-spinner="el-icon-loading"
    class="containerOutside">
    <el-header>
      <Header :showTittle=false class="app-header">
        <el-dropdown>
          <span class="el-dropdown-link">
            菜单
            <i class="el-icon-setting el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus" @click.native="showForm">新增</el-dropdown-item>
            <el-dropdown-item icon="el-icon-delete" @click.native="showIcons">删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <i v-show="showOrNot" @click="hideIcons" class="el-icon-circle-check"></i>
      </Header>
    </el-header>

    <el-main>
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
            <el-button @click="_createAlbum($event), hideForm($event)" type="success" icon="el-icon-check"></el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="reset($event), hideForm($event)" type="danger" icon="el-icon-close"></el-button>
          </el-form-item>
        </el-form>
      </transition>

      <el-row v-if="isOnline && albums">
        <el-col :span="8" v-for="(items, index) of albums" :key="index" :offset="index > 0 ? 6 : 0">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <router-link :to="{
                  path: '/photoCollections',
                  query:{
                    id: items.id,
                    name: items.name,
                    avatar: items.avatar,
                    type: items.type,
                    describe: items.describe}
                  }" class="linkToPhotoCollections">
              <div class="wrapper">
                <Card :imgUrl="items.avatar" :isMasonryCard=false :paddingCard=0></Card>
              </div>
            </router-link>
            <div style="padding: 14px;">
              <span>{{ items.name }}</span>
              <div class="bottom clearfix">
                <time class="time">{{ items.createdTime || currentDate }}</time>
              </div>
              <i v-show="showOrNot" @click="_deleteAlbum(items.name, index)" class="el-icon-delete"></i>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-row v-if="!isOnline" class="offline">
        <i class="el-icon-error" style="padding-right: 10px; font-size: 18px;"></i>
        <p style="color: #CB1B45;">网络无连接</p>
      </el-row>

    </el-main>
  </el-container>
</template>

<script>
  // eslint-disable-next-line
  import {mapState, mapGetters } from 'vuex';
  import showNotifications from '@utils/notifications';
  import {
    getAlbum,
    deleteAlbum,
    createAlbum,
    updateAlbumID,
  } from '@services/Album';
  export default {
    data() {
      return {
        isOnline: navigator.onLine,
        albums: [],
        currentDate: new Date(),
        showOrNot: false,
        showFormOrNot: false,
        loading: false,
        formInline: {
          name: '',
          describe: '',
          type: '',
        },
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
    mounted() {
      if (this.isOnline === true) {
        if (!this.albums.length || this._isUpdateGetter === true) {
          this._getAlbum();
        }
      }
    },
    computed: {
      ...mapGetters('Album', { _albumsGetter: 'getAlbums', _isUpdateGetter: 'getUpdateStatus' }),
    },
    methods: {
      handleNetworkChange(netStatus = true) {
        this.$store.commit('App/setOnline', netStatus);
        this.isOnline = netStatus;
        if (!netStatus) {
          return;
        }
        this._getAlbum();
      },
      async _getAlbum() {
        this.loading = true;
        await getAlbum().then(({ albums }) => {
          // this.albums = albums;
          this.$store.dispatch('Album/updateAlbums', albums);
          this.$store.dispatch('Album/updateStatus', false);
          this.albums = this._albumsGetter;
          this.loading = false;
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
      showForm(e) {
        e.preventDefault();
        this.showFormOrNot = true;
      },
      hideForm(e) {
        e.preventDefault();
        this.showFormOrNot = false;
        this.reset();
      },
      async _createAlbum(e) {
        e.preventDefault();
        await createAlbum({
          name: this.formInline.name,
          describe: this.formInline.describe,
          type: this.formInline.type,
        }).then(({ message }) => {
          this.showFormOrNot = false;
          this.$store.dispatch('Album/updateStatus', true);
          showNotifications({ title: `${message} 请添加相片。` });
          this.linkToUpload();
        });
      },
      reset() {
        if (this.$refs.formInline !== undefined) {
          this.$refs.formInline.resetFields();
        }
      },
      linkToUpload() {
        this.$router.push({
          path: '/upload',
          query: {
            name: this.formInline.name,
          },
        });
      },
      async _deleteAlbum(name, index) {
        this.loading = true;
        await deleteAlbum(name).then(async ({ message }) => {
          // await this._getAlbum();
          // this.$store.dispatch('Album/updateAlbums', this._albumsGetter);
          this.albums.splice(index, 1);
          this.$store.dispatch('Album/updateStatus', true);
          await this._updateAlbumID();
          showNotifications({ title: message });
          this.loading = false;
          this.$db.images.remove({ albumName: name }, { multi: true }, (err) => {
            if (err) throw new Error(err);
          });
        }).catch(() => {
          this.loading = false;
        });
      },
      async _updateAlbumID() {
        await updateAlbumID();
      },
    },
  };
</script>

<style scoped>
  .containerOutside {
    height: 100vh;
  }

  .el-dropdown {
    margin-right: 0px;
  }

  .el-main {
    padding: 5px;
  }

  .offline {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
  }

  .el-col-8 {
    width: 25%;
    margin: 0 30px;
    margin-bottom: 15px;
  }

  .formInline {
    display: flex;
    align-items: flex-end;
    padding: 0 30px;
  }

  .el-card {
    width: 185px;
    height: 265px;
  }

  .wrapper {
    height: 185px;
    width: 185px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .time {
    font-size: 10px;
    color: #999;
  }

  .bottom {
    margin-top: 5px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    height: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }

  .item {
    margin-bottom: 10px;
    break-inside: avoid;
  }

  .el-icon-delete {
    float: right;
    color: red;
  }
</style>