<template>
  <div class="amap-wrapper">
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
  </div>
</template>

<script>
export default {
  name: 'map-page',
  data() {
    // const self = this;
    return {
      props: {
        // Longitude: {
        //   type: Number,
        //   required: true,
        // },
        // Latitude: {
        //   type: Number,
        //   required: true,
        // },
        coordinate: {
          type: Object,
          required: true,
        },
      },
      zoom: 16,
      center: [121.406051, 31.179695],
      label: {
        offset: [10, 12],
      },
      plugin: [
        {
          pName: 'Scale',
        },
      ],
    };
  },
  mounted() {
    // this.getCoor();
  },
  methods: {
    getCoor() {
    },
  },
};
</script>

<style>
.amap-wrapper {
  height: 300px;
}
</style>
