<template>
  <el-container class="style">
    <el-header>
      <Header tittle='上传' class="app-header"></Header>
    </el-header>
    <el-main>
      <el-upload :action=url :limit="12" ref="upload" :multiple="true" :auto-upload="true" list-type="picture-card"
        :on-success="uploadSuccessed" :on-preview="handlePictureCardPreview" style="
            width: 50vw;
            height: inherit;
            text-align: center">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" :modal-append-to-body='false' top="0">
        <img :src="dialogImageUrl" style="height: 83vh; width: 100%; object-fit: contain" alt="">
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
  // import uploadImage from '@services/Upload';
  import showNotifications from '@utils/notifications';
  export default {
    data() {
      return {
        url: `${this.$apiPrefix}/uploadImg?name=${window.encodeURIComponent(this.$route.query.name)}`,
        dialogImageUrl: '',
        dialogVisible: false,
        urlArr: [],
      };
    },
    methods: {
      // handleRemove(file, fileList) {
      //   console.log(file, fileList);
      // },
      uploadSuccessed(response) {
        showNotifications({ title: response.message });
        this.urlArr.push(response.files);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
    },
    beforeDestroy() {
      this.$db.images.update(
        { albumName: this.$route.query.name },
        { $push: { images: { $each: this.urlArr } } },
        {}, () => {
        },
      );
      this.$store.dispatch('PhotoCollections/updateStatus', true);
    },
  };
</script>

<style scoped>
  .el-main {
    height: 100%;
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
</style>