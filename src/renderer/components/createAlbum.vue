<template>
    <el-container class="style">
      <el-header>
        <header>
          <i @click="back" class="el-icon-arrow-left">创建相册</i>
        </header>
      </el-header>
      <el-main>
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item label="名称">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="formLabelAlign.describe"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-input v-model="formLabelAlign.type"></el-input>
          </el-form-item>
          <el-form-item class="formButtons">
            <el-button type="primary" @click="submit">提交</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
</template>

<script>

export default {
  data() {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        describe: '',
        type: '',
      },
    };
  },
  methods: {
    async submit() {
      await this.axios.post(`${this.$apiPrefix}/createAlbum`, null, {
        params: {
          name: this.formLabelAlign.name,
          describe: this.formLabelAlign.describe,
          type: this.formLabelAlign.type,
        },
      })
        .then((res) => {
          this.linkToUpload();
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      // this.$router.back(-1);
    },
    reset() {
      this.$refs.formLabelAlign.resetFields();
    },
    linkToUpload() {
      this.$router.push({
        path: '/upload',
        query: {
          name: this.formLabelAlign.name,
        },
      });
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
.el-form {
  width: 50%;
  padding-bottom: 30px;
  /* float: right; */
}
.formButtons {
  /* display: flex;
  justify-content: center */
  float: right;
}
</style>