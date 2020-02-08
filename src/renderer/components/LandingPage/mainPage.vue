<template>
  <el-container class="style">
    <el-header style="text-align: right; font-size: 12px">
      <header>
        <!-- <div>册集</div> -->
        <div class="settingButtons">
          <el-dropdown>
            <i class="el-icon-setting"></i>
            <el-dropdown-menu slot="dropdown">
              <router-link to="/createAlbum" class="linkToCreateAlbum">
                <el-dropdown-item>新增</el-dropdown-item>
              </router-link>
              <el-dropdown-item @click.native="showIcons">删除</el-dropdown-item>
            </el-dropdown-menu>
            <span>设置</span>
          </el-dropdown>
          <i v-show="showOrNot" @click="hideIcons" class="el-icon-circle-check"></i>
        </div>
      </header>
    </el-header>

    <el-main
      v-loading="loading"
      element-loading-text="加载中..."
      element-loading-spinner="el-icon-loading"
    >
      <el-row v-if="isOnline && albums">
        <el-col :span="8" v-for="(items, index) of albums" :key="index" :offset="index > 0 ? 6 : 0">
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
              <router-link
                :to="{path: '/photoCollections', query:{id: items.id, name: items.name}}"
                class="linkToPhotoCollections"
              >
                <div class="wrapper">
                  <img :src="items.avatar" class="image" />
                  <!-- <el-image
                    style="width: 100%; height: 100%;"
                    :lazy="true"
                    :src="items.avatar"
                    fit="cover" // object-fit造成页面卡顿
                  >
                    <div slot="placeholder" class="image-slot">
                      加载中<span class="dot">...</span>
                    </div>
                  </el-image> -->
                </div>
              </router-link>
              <div style="padding: 14px;">
                <span>{{ items.name }}</span>
                <div class="bottom clearfix">
                  <time class="time">{{ items.createdTime || currentDate }}</time>
                </div>
                <i v-show="showOrNot" @click="deleteAlbum(items.name)" class="el-icon-delete"></i>
              </div>
            </el-card>
          <!-- </router-link> -->
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
export default {
  data() {
    return {
      isOnline: navigator.onLine,
      albums: {},
      currentDate: new Date(),
      showOrNot: false,
      loading: false,
    };
  },
  created() {
    window.addEventListener('online', this.updateStatus);
    window.addEventListener('offline', this.updateStatus);
    if (this.isOnline) {
      this.getAlbum();
    }
  },
  methods: {
    updateStatus(e) {
      const { type } = e;
      this.isOnline = type === 'online';
      if (this.isOnline) {
        this.getAlbum();
      }
    },
    getAlbum() {
      this.loading = true;
      this.axios
        .get(`${this.$apiPrefix}/getAlbum`)
        .then((res) => {
          this.albums = res.data.albums;
          this.loading = false;
        })
        .catch((err) => {
          console.error(err);
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
    async deleteAlbum(name) {
      this.loading = true;
      await this.axios
        .post(`${this.$apiPrefix}/deleteAlbum?name=${encodeURIComponent(name)}`)
        .then(async (res) => {
          if (res.status === 200 && res.data === 1) {
            await this.getAlbum();
            this.loading = false;
          } else {
            console.error('delete failed');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  beforeDestroy() {
    window.removeEventListener('online', this.updateStatus);
    window.removeEventListener('offline', this.updateStatus);
  },
};
</script>

<style scoped>
header {
  font-size: 30px;
  text-align: center;
  padding-top: 10px;
}

.style {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 75%;
  overflow-y: auto;
}

.el-dropdown {
  float: right;
  padding-top: 20px;
  margin-right: 20px;
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
  /* width: 100%; */
  height: 100%;
  /* max-height: 185px;
    max-width: 185px; */
  display: block;
  /* object-fit: cover; */
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.settingButtons {
  display: flex;
  float: right;
  font-size: 14px;
}

.el-icon-circle-check {
  padding-top: 22px;
  color: green;
}

.item {
  margin-bottom: 10px;
  break-inside: avoid;
  /* position: relative; */
}

.el-icon-delete{
  float: right;
  color: rgb(224, 93, 93);
  cursor: pointer;
}
</style>

