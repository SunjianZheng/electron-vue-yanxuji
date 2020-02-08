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
          <!-- <i @click="back" class="fa fa-chevron-left" aria-hidden="true"></i> -->
          <i @click="back" class="el-icon-arrow-left">上传</i>
        </header>
      </el-header>
      <el-main>
        <el-upload
          :action= url
          :limit="12"
          ref="upload"
          :multiple="true"
          :auto-upload="true"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          style="padding: 10px 20px;"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import NavBar from './navBar/navBar';

export default {
  components: { NavBar },
  data() {
    return {
      url: `${this.$apiPrefix}/uploadImg?id=${this.$route.query.id}`,
      dialogImageUrl: '',
      dialogVisible: false,
    };
  },
  methods: {
    // handleRemove(file, fileList) {
    //   console.log(file, fileList);
    // },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    back() {
      this.$router.back(-1);
    },
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
</style>