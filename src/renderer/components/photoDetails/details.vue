<template>
  <el-container class="style">
    <el-header style="text-align: right; font-size: 12px">
      <header>
        <i @click="back" class="el-icon-arrow-left"></i>
      </header>
    </el-header>

    <el-main
      v-loading="loading"
      element-loading-text="加载中..."
      element-loading-spinner="el-icon-loading"
    >


      <el-row>
        <el-col :sm="12" class="container">
          <el-row style="height: 510px;">
            <el-container class="photoContainer" :style="{backgroundImage:'url(' + path + ')'}">
            <!-- <el-container class="photoContainer" style="background-color: rgba(131, 131, 131, 0.1);"> -->
              <el-image
                :src="path"
                :preview-src-list="srcList"
              >
                <div slot="placeholder" class="image-slot">
                  加载中<span class="dot">...</span>
                </div>
              </el-image>
            </el-container>

            <el-container v-if="haveExif" class="detailsContainer">
              <section>
                <p class="text">设备与型号：{{ info.Make }} {{ info.Model }}</p>
                <p class="text">拍摄日期：{{ info.DateTime }}</p>
                <p class="text">ISO感光度：{{ info.ISOSpeedRatings }}</p>
                <p class="text">光圈：f/{{ info.FNumber }}</p>
                <p class="text">白平衡：{{ info.WhiteBalance }}</p>
                <p class="text">图像的有效宽度：{{ info.PixelXDimension }}px</p>
                <p class="text">图像的有效高度：{{ info.PixelYDimension }}px</p>
                <p class="text">经度：{{ info.Longitude === 0 ? '无' : info.Longitude}}</p>
                <p class="text">纬度：{{ info.Latitude === 0 ? '无' : info.Latitude }}</p>
                <p class="text">地址：{{ info.Address }}</p>
                <el-button
                  @click="download"
                  size="mini"
                  type="warning"
                  style="margin-left: 40%; margin-top: 30px"
                >
                  原图下载
                </el-button>
              </section>
            </el-container>
            <el-container v-if="!haveExif" class="detailsContainer">
              <i class="el-icon-error" style="padding-right: 10px; font-size: 18px;"></i>
              <p style="color: #CB1B45;">无法采集EXIF信息</p>
              <el-button
                  @click="download"
                  size="mini"
                  type="warning"
                  style="margin-left: 10px"
                >
                  原图下载
                </el-button>
            </el-container>
          </el-row>
        </el-col>



        <el-col :sm="12" v-if=" center && haveLocation" class="amap-wrapper">
          <el-amap class="amap-box" vid="map" :zoom="zoom" :center="center" :plugin="plugin">
            <el-amap-marker vid="marker" :position="center" :label="label"></el-amap-marker>
            <el-amap-circle
                vid="circle"
                :center="center" 
                fill-opacity="0.2"
                strokeColor="#38f"
                strokeOpacity="0.8"
                strokeWeight="1"
                fillColor="#38f"
            ></el-amap-circle>
          </el-amap>
        </el-col>



        <el-col :sm="12" v-if="!haveLocation" class="noLocation">
          <i class="el-icon-map-location"></i>
          <p style="color: #CB1B45;">无地理位置信息</p>
        </el-col>
      </el-row>



    </el-main>
  </el-container>
</template>


<script>
// import EXIF from 'exif-js';
import Map from './map/map';

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
      haveLocation: 0,
      haveExif: 0,
      loading: false,
      zoom: 12,
      center: [],
      label: {
        offset: [10, 12],
      },
      plugin: [
        {
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
  },
  watch: {
  },
  methods: {
    getData() {
      this.loading = true;
      this.axios.get(`${this.$apiPrefix}/getExif?name=${this.$route.query.name}`)
        .then((res) => {
          // console.log(res);

          const data = res.data.exif.exif;
          const gpsInfo = res.data.coor || '无';
          // eslint-disable-next-line
          const addr = res.data.addr || '无';

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
          this.info.Make = data.LensMake || '无';
          this.info.Model = data.LensModel || '无';
          this.info.ISOSpeedRatings = data.ISO || '无';
          this.info.FNumber = data.FNumber || '无';
          this.info.PixelXDimension = data.ExifImageWidth || '无';
          this.info.PixelYDimension = data.ExifImageHeight || '无';
          this.info.WhiteBalance = data.WhiteBalance || '无';
          // eslint-disable-next-line
          this.info.Longitude = parseFloat(gpsInfo.split(',')[0]) || 0;
          // eslint-disable-next-line
          this.info.Latitude = parseFloat(gpsInfo.split(',')[1]) || 0;

          this.center[0] = this.info.Longitude;
          this.center[1] = this.info.Latitude;

          // eslint-disable-next-line
          this.center[0] ===  0 && this.center[1] === 0 ? this.haveLocation = 0 : this.haveLocation = 1;

          this.info.Address = addr || '无';

          this.haveExif = 1;

          this.loading = false;
        })
        .catch((err) => {
          // console.error(err.response);
          if (err.response.status === 404) {
            this.loading = false;
            this.haveExif = 0;
          }
        });
    },
    download() {
      const alink = document.createElement('a');
      alink.href = this.originalPath;
      alink.download = this.$route.query.name;
      alink.click();
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
  font-size: 30px;
  text-align: center;
  /* padding-top: 10px; */
}

/* .fa-chevron-left, */
.el-icon-arrow-left {
    float: left;
    line-height: 42px;
    font-size: 24px;
    padding-right: 10px;
}

.el-icon-arrow-left::after {
  content: "详情页";
}

.style {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 75%;
  overflow-y: auto;
}

.el-main {
  padding-top: 9px;
}

/* #imgElement {
  max-width: 360px;
  max-height: 202px;
  border-radius: 5px;
} */
/* .el-image__error, .el-image__inner, .el-image__placeholder, .el-image__preview {
    width: auto;
    height: auto;
    max-width: 360px;
    max-height: 202px;
    border-radius: 5px;
  } */

.photoContainer {
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
  height: 60%;
  /* width: 50%; */
  /* padding: 25px 0px 0px 50px; */
}

.amap-wrapper {
  height: 480px;
}

.amap-box {
  padding: 0 5px;
}
.noLocation {
  height: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(231, 148, 96, 0.2);
  border-radius: 5px;
}

.noLocation > .el-icon-map-location {
  font-size: 30px;
  padding-right: 5px;
}

</style>