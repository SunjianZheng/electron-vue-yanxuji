<template>
  <section class="masonry">
    <div v-for="(item, index) in imgArr" :key="item + '_'" class="item">
      <!-- <div v-show="showOrNot" @click="deleteFromAlbum(imgArr[index])" class="delete"> -->
      <!-- <i class="el-icon-delete"></i> -->
      <!-- </div> -->
      <!-- <router-link v-if="imgArr[index]" :to="{path: '/photoDetails', query:{name: item.split('/')[4]}}"> -->
      <router-link v-if="imgArr[index]" :to="{path: '/photoDetails', query:{name: item.split('/')[4]}}">
        <!-- <img v-lazy="item" class="imgItem" alt /> -->
        <!-- <el-card :body-style="{ padding: '10px' }" shadow="hover"> -->
        <!-- <div v-show="showOrNot" @click="deleteFromAlbum(imgArr[index])" class="delete">
                          <i class="el-icon-delete"></i>
                        </div> -->
        <!-- <slot />
                        <img v-lazy="item" class="imgItem" />
                      </el-card> -->
        <Card :imgUrl="item" :showWrapper="showWrapper">
          <slot />
        </Card>
      </router-link>
    </div>
  </section>
</template>

<script>
  export default {
    props: {
      imgArr: {
        type: Array,
        required: true,
        default: [],
      },
      showWrapper: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>

<style lang="scss" scoped>
  .masonry {
    column-count: 3;
    column-gap: 15px;
    margin: 10px 0px;

    .item {
      margin-bottom: 10px;
      break-inside: avoid;
      // .imgItem {
      //   width: 100%;
      //   border-radius: 5px;
      // }
    }
  }
</style>