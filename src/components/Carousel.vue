<template>
    <div>
        <div class="grid-content">
          <el-carousel :interval="5000" arrow="always">
            <el-carousel-item v-for="(item,i) in carousel" :key="i">
              <img :src="item" alt="" style="width:100%;height:100%">
            </el-carousel-item>
          </el-carousel>
        </div>
    </div>
</template>

<style scoped lang="scss">

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

</style>
<script>
export default {
    data() {
        return {
            carousel:[
            "https://img.zcool.cn/community/01f8b25fd0361c11013fdcc77213eb.jpg@1380w",
            "https://img.zcool.cn/community/01f8b25fd0361c11013fdcc77213eb.jpg@1380w",
            "https://img.zcool.cn/community/01f8b25fd0361c11013fdcc77213eb.jpg@1380w",
            ],
            activeName: 'first',
        }
    },
}
</script>