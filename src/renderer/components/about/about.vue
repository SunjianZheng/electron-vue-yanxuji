<template>
  <el-container>
    <el-container class="style">
      <!-- <el-header>
        <header>
          <i @click="back" class="el-icon-arrow-left">关于</i>
        </header>
      </el-header> -->
      <el-main>
        <el-card :body-style="{ padding: '0px' }">
          <img src="./../../assets/logo1.png" class="image" style="padding: 10px;">
          <div style="padding: 14px; text-align: center;">
            <div class="bottom clearfix">
              <p class="intro" style="padding: 0 10px 10px 10px;">炎序之意为盛夏时序</p>
              <p class="mainIntro">愿沿途风景与我之回忆在盛夏永存</p>
              <div class="author" @click="linkToGitHub">
                <i class="el-icon-right" style="font-size: 24px; padding-right: 10px; color: #D0104C;"></i>
                <i class="fa fa-github" aria-hidden="true"></i>
                <span>郑卓允</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
const { shell } = require('electron');

export default {
  data() {
    return {
    };
  },
  methods: {
    linkToGitHub() {
      // eslint-disable-next-line
      shell.openExternal('https://github.com/SunjianZheng/electron-vue-yanxuji');
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
    font-size: 24px;
    padding-right: 10px;
}

.author {
  float: right;
  padding: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.fa-github {
  font-size: 24px;
  padding-right: 10px;
}
</style>