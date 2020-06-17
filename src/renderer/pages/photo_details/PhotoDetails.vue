<template>
  <div id="details-page" v-loading="loading" element-loading-text="加载中..." element-loading-spinner="el-icon-loading">

    <el-container id="details-page" v-loading="loading" element-loading-text="加载中..."
      element-loading-spinner="el-icon-loading">
    <el-main class="container">
      <el-header>
        <Header tittle="详情" class="app-header">
          <div class="btns">
            <i class="el-icon-magic-stick" @click="toggleBackground"
              :class="{'onBackgroundActive':showImageBackgroundOrNot}"></i>
            &nbsp;&nbsp;
            <i class="el-icon-download" @click="download"></i>
          </div>
        </Header>
      </el-header>

      <section v-if="!haveExif" class="bigImageContainer">
        <el-image :src="path" :preview-src-list="srcList">
          <div slot="placeholder" class="image-slot">
            加载中
            <span class="dot">...</span>
          </div>
        </el-image>
      </section>

      <section v-else style="height: 100vh;">
        <div class="photoContainer">
          <el-image :src="path" :preview-src-list="srcList">
            <div slot="placeholder" class="image-slot">
              加载中
              <span class="dot">...</span>
            </div>
          </el-image>
        </div>

        <section class="detailsContainer">
          <div>
            <p v-if="info.Make && info.Model" class="text">设备与型号：{{ info.Make }} {{ info.Model }}</p>
            <p v-if="info.DateTime !== '无'" class="text">拍摄日期：{{ info.DateTime }}</p>
            <p v-if="info.ISOSpeedRatings" class="text">ISO感光度：{{ info.ISOSpeedRatings }}</p>
            <p v-if="info.FNumber" class="text">光圈：f/{{ info.FNumber }}</p>
            <p v-if="info.WhiteBalance" class="text">白平衡：{{ info.WhiteBalance }}</p>
            <p v-if="info.PixelXDimension" class="text">图像的有效宽度：{{ info.PixelXDimension }}px</p>
            <p v-if="info.PixelYDimension" class="text">图像的有效高度：{{ info.PixelYDimension }}px</p>
            <p v-if="info.Longitude" class="text">经度：{{ info.Longitude === 0 ? '无' : info.Longitude}}</p>
            <p v-if="info.Latitude" class="text">纬度：{{ info.Latitude === 0 ? '无' : info.Latitude }}</p>
            <p v-if="info.Address" class="text">地址：{{ info.Address }}</p>
          </div>
        </section>
      </section>

      <section v-if=" center && haveLocation" class="amap-wrapper">
        <el-amap class="amap-box" vid="map" :zoom="zoom" :center="center" :plugin="plugin" :zoomEnable="true"
          :scrollWheel="false" :dragEnable="true" :mapStyle="mapStyle" :lang="lang">
          <el-amap-marker vid="marker" :position="center" :label="label"></el-amap-marker>
          <el-amap-circle vid="circle" :center="center" fill-opacity="0.2" strokeColor="#38f" strokeOpacity="0.8"
            strokeWeight="1" fillColor="#38f"></el-amap-circle>
        </el-amap>
      </section>
      <section v-if="showImageBackgroundOrNot" :style="{
          backgroundImage:'url(' + path + ')',
          width: '75%',
          height: '100vh',
          margin: '0',
          top: '0',
          right: '0',
          bottom: '0',
          left: '0',
          filter: 'blur(250px)',
          transition: 'opacity .3s',
          zIndex: '-1',
          position: 'absolute',
          backgroundAttachment: 'fixed',
        }" class="background"></section>

    </el-main>
    </el-container>


    <el-col v-if="!haveLocation" class="noLocation">
      <i class="el-icon-map-location"></i>
      <p style="color: #CB1B45;">无地理位置信息</p>
    </el-col>
  </div>
</template>


<script>
  // import EXIF from 'exif-js';
  import getExifData from '@services/PhotoDetails';
  import Map from './_Map';

  export default {
    name: 'details-page',
    components: {
      Map,
    },
    data() {
      return {
        originalPath: `${this.$originalImagePathPrefix}/${this.$route.query.name}`,
        path: `${this.$compressedImagePathPrefix}/${this.$route.query.name}`,
        srcList: [`${this.$originalImagePathPrefix}/${this.$route.query.name}`],
        // compressedSrcList: [`http://localhost/compressedImg/${this.$route.query.name}`],
        info: {
          DateTime: '', // 日期
          Make: '', // 制造商
          Model: '', // 型号
          ISOSpeedRatings: Number, // ISO感光度
          FNumber: Number, // 光圈
          PixelXDimension: Number, // 图像的有效宽度
          PixelYDimension: Number, // 图像的有效高度
          WhiteBalance: '', // 白平衡
          Longitude: Number, // 经度
          Latitude: Number, // 纬度
          Address: '', // 地址
        },
        showImageBackgroundOrNot: '',
        haveLocation: 0,
        haveExif: 1,
        loading: false,
        // zoom: 12,
        zoom: 14,
        // mapStyle: 'light',
        mapStyle: 'fresh',
        lang: 'zh_en',
        center: [],
        label: {
          offset: [10, 12],
        },
        plugin: [{
          pName: 'Scale',
        },
        {
          pName: 'Geocoder',
        },
        ],
      };
    },
    mounted() {
      this.getData();
      // eslint-disable-next-line
      this.showImageBackgroundOrNot = eval(localStorage.getItem('activeImageBackground'));
    },
    watch: {
    },
    methods: {
      async getData() {
        this.loading = true;
        await getExifData(this.$route.query.name).then(({ exifResults }) => {
          if (!exifResults) {
            this.haveExif = 0;
            this.loading = false;
            return;
          }
          const data = exifResults.exif.exif;
          const gpsInfo = exifResults.coor || '无';
          const addr = exifResults.addr || false;

          let dateTime = data.DateTimeOriginal || '无';
          if (dateTime !== '无') {
            const dateTimeArr = [];
            let date = dateTime.split(' ')[0];
            const time = dateTime.split(' ')[1];

            // 将2019:11:18 17:25:40 转换为 2019-11-18 17:25:40
            date = date.replace(new RegExp(':', 'g'), '-');
            dateTimeArr.push(date, time);
            dateTime = dateTimeArr.join(' ');
          }

          this.info.DateTime = dateTime;
          this.info.Make = data.LensMake || exifResults.exif.image.Make || false;
          this.info.Model =
          data.LensModel || exifResults.exif.image.Model || false;
          this.info.ISOSpeedRatings = data.ISO || false;
          this.info.FNumber = data.FNumber || false;
          this.info.PixelXDimension = data.ExifImageWidth || false;
          this.info.PixelYDimension = data.ExifImageHeight || false;
          this.info.WhiteBalance = data.WhiteBalance || false;
          this.info.Longitude = parseFloat(gpsInfo.split(',')[0]) || 0;
          this.info.Latitude = parseFloat(gpsInfo.split(',')[1]) || 0;

          this.center[0] = this.info.Longitude;
          this.center[1] = this.info.Latitude;

          // eslint-disable-next-line
          this.center[0] === 0 && this.center[1] === 0 ?
            (this.haveLocation = 0) :
            (this.haveLocation = 1);

          this.info.Address = addr;

          this.haveExif = 1;

          this.loading = false;
        }).catch(() => {
          this.haveExif = 0;
          this.loading = false;
        });
      },
      download() {
        const alink = document.createElement('a');
        alink.href = this.originalPath;
        alink.download = this.$route.query.name;
        alink.click();
      },
      toggleBackground() {
        this.showImageBackgroundOrNot = !this.showImageBackgroundOrNot;
        localStorage.removeItem('activeImageBackground');
        localStorage.setItem('activeImageBackground', this.showImageBackgroundOrNot);
      },
    },
  };
</script>

<style lang="scss" scoped>
  #details-page {
    height: 100vh;
    overflow: scroll;
  }

  .container {
    position: relative;
  }

  .el-header {
    background-color: transparent;
  }

  .el-image /deep/ .el-image__preview {
    width: auto;
    height: auto;
    max-width: 360px;
    max-height: 200px;
    border-radius: 5px;
  }

  .bigImageContainer {
    height: 90vh;
    text-align: center;
    .el-image {
      width: 100%;
      height: 100%;
      line-height: 80vh;
      /deep/.el-image__preview {
        width: 90%;
        max-width: none;
        max-height: none;
        vertical-align: middle;
      }
    }
  }

  .photoContainer {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 5px;
    height: 40%;
  }

  .detailsContainer {
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40%;
  }

  .amap-wrapper {
    height: 100vh;
    padding: 10px;
  }

  .noLocation {
    height: 93vh;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: rgba(231, 148, 96, 0.2); */
    border-radius: 5px;
  }

  // .noLocation {
  //   height: 100vh;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   border-radius: 5px;
  // }

  .noLocation>.el-icon-map-location {
    font-size: 30px;
    padding-right: 5px;
  }
</style>