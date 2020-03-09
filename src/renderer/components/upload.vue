<template>
    <el-container class="style">
      <el-header>
        <header>
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
          style="
            padding: 10px 20px;
            width: 51vw;
            height: 90vh;
            text-align: center;"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog
          :visible.sync="dialogVisible"
          :modal-append-to-body='false'
        >
          <img :src="dialogImageUrl" style="height: 83vh; width: 100%; object-fit: contain" alt="">
        </el-dialog>
      </el-main>
    </el-container>
</template>

<script>

export default {
  data() {
    return {
      url: `${this.$apiPrefix}/uploadImg?name=${window.encodeURIComponent(this.$route.query.name)}`,
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
  align-items: flex-end;
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
      display: flex;
    justify-content: center;
    align-items: center;
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

  .el-dialog__wrapper /deep/ .el-dialog {
    width: 75vw !important;
    height: 100vh !important;
    margin-top: 0 !important;
    float: right !important;
  }
  .el-dialog /deep/ .el-dialog__body {
    text-align: center !important;
  }
</style>