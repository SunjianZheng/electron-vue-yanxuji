<template>
  <el-container class="navbar">
    <el-main>

      <div class="btnGroup">
        <TitleButton type="min" />
        <TitleButton type="max" />
        <TitleButton type="close" />
      </div>

      <div class="logoContainer">
        <img class="logo" src="static/imgs/logo.png" alt="">
        <!-- <img class="logo" -->
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlIAAAC0CAYAAABfXcLFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGimlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTAzLTA5VDE5OjM0OjI1KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIwLTAzLTA5VDE5OjM0OjI1KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMC0wMy0wOVQxOTozNDoyNSswODowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpmYTQ5ZGVmZi1jOWY2LTg4NGQtOTQzOS1hNDJhNWQ4MzllZDgiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo0NjE1ZTQ5NS00YWYwLWEwNDgtYmFmYy03MDI0MzNlZWY1NTUiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpmMDJkOGNmZC0xNzE3LTliNGEtYjAxZi00NTM2NGRkOWVkMGEiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmYwMmQ4Y2ZkLTE3MTctOWI0YS1iMDFmLTQ1MzY0ZGQ5ZWQwYSIgc3RFdnQ6d2hlbj0iMjAyMC0wMy0wOVQxOTozNDoyNSswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpmYTQ5ZGVmZi1jOWY2LTg4NGQtOTQzOS1hNDJhNWQ4MzllZDgiIHN0RXZ0OndoZW49IjIwMjAtMDMtMDlUMTk6MzQ6MjUrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHBob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4gPHJkZjpCYWc+IDxyZGY6bGk+eG1wLmRpZDo3NzhhOWE2ZC04MGE1LTRjNGUtODA3MS0yY2NmYmNjNjA5NGI8L3JkZjpsaT4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz75nipzAAArvElEQVR4nO3de5gcdZ3v8TfZbDbbT07Mstk4D8vDInLYiMidcB+CcrdVLiaoYBUXZUFAqBENLEIe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"
          alt="">
      </div>

      <el-menu default-active="1" class="el-menu-vertical">
        <el-menu-item index="1">
          <router-link to="/" tag="div" class="link">
            <i class="el-icon-position"></i>
            <span>主页</span>
          </router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link to="/search" tag="div" class="link">
            <i class="el-icon-search"></i>
            <span>搜寻</span>
          </router-link>
        </el-menu-item>
        <el-menu-item index="3">
          <router-link to="/recommend" tag="div" class="link">
            <i class="el-icon-star-off"></i>
            <span>推荐</span>
          </router-link>
        </el-menu-item>
        <el-menu-item index="4">
          <router-link to="/thisDayInPastYears" tag="div" class="link">
            <i class="el-icon-time"></i>
            <span>往年今日</span>
          </router-link>
        </el-menu-item>
        <el-menu-item index="5">
          <router-link to="/about" tag="div" class="link">
            <i class="el-icon-more-outline"></i>
            <span>关于</span>
          </router-link>
        </el-menu-item>
      </el-menu>

      <i v-show="isDarkMode" @click="changeTheme('light')" class="el-icon-moon theme-mode"></i>
      <i v-show="!isDarkMode" @click="changeTheme('dark')" class="el-icon-sunny theme-mode"></i>

    </el-main>
  </el-container>
</template>

<script>
  import TitleButton from './_TittleBtn';
  export default {
    components: {
      TitleButton,
    },
    data() {
      return {
        isCollapse: true,
        isDarkMode: false,
        currentHour: 0,
        themeMode: '',
        // path: './../../assets/background.jfif',
      };
    },
    beforeMount() {
      this.currentHour = new Date().getHours();
    },
    mounted() {
      const htmlElement = document.documentElement;
      const mode = (this.currentHour <= 6 || this.currentHour >= 18) ? 'dark' : 'light';
      htmlElement.setAttribute('theme', mode);

      this.themeMode = mode;

      switch (this.themeMode) {
        case 'dark':
          this.isDarkMode = true;
          break;
        case 'light':
          this.isDarkMode = false;
          break;
        default:
          this.isDarkMode = false;
          break;
      }
    },
    methods: {
      changeTheme(mode) {
        const htmlElement = document.documentElement;
        htmlElement.setAttribute('theme', mode);
        this.isDarkMode = !this.isDarkMode;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .navbar {
    height: 100vh;
    position: relative;
    -webkit-app-region: drag;

    .btnGroup {
      height: 30px;
      cursor: pointer;
    }

    .el-container {
      height: 100vh;
      // -webkit-app-region: drag;
    }

    .logoContainer {
      padding: 20px;

      .logo {
        width: 100%;
        margin: 20px 0px;
      }
    }

    .el-menu {
      background: transparent;
      border: none;
      -webkit-app-region: no-drag;
    }

    .el-submenu .el-menu-item {
      height: 100%;
      line-height: 50px;
      padding: 0 45px;
      min-width: 200px;
      background: transparent;
    }

    .el-menu-item:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .theme-mode {
      position: absolute;
      right: 15px;
      bottom: 15px;
      color: yellow;
      -webkit-app-region: no-drag;
    }    
  }
  
</style>