<template>
  <el-card :body-style="{ padding: `${paddingCard}px` }" :shadow="shadowOps" :class="isMasonryCard===true ? 'masonryCard' : ''">
                            <div v-if="showWrapper" class="wrapper">
                              <img v-lazy="imgUrl" class="image" />
                              <slot/>
                            </div>
                            <img v-if="!showWrapper" v-lazy="imgUrl" :class="isMasonryCard===true ? 'masonryImgItem' : 'imgItem'" />
                        </el-card>
</template>

<script>
  export default {
    props: {
      isMasonryCard: {
        type: Boolean,
        default: true,
      },
      imgUrl: {
        type: String,
        required: true,
        default: '',
      },
      shadowOps: {
        type: String,
        default: 'hover',
      },
      showWrapper: {
        type: Boolean,
        default: false,
      },
      paddingCard: {
        type: Number,
        default: 10,
      },
    },
    methods: {},
  };
</script>

<style lang="scss" scoped>
.el-card {
  width: 185px;
  height: 185px;
}

.masonryCard {
  height: auto;
}

.wrapper {
    height: 185px;
    width: 185px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    .image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px;
      // display: block;
    }
  }

  .masonryImgItem {
    width: 100%;
    border-radius: 5px;
  }

  .imgItem {
    width: 185px;
    height: 185px;
    object-fit: cover;
    border-radius: 5px;
  }
</style>