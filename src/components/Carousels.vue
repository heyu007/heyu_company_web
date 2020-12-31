<template>
    <div>
        <div class="grid-content">
          <el-carousel :interval="5000" arrow="always" :height="bannerHeight+'px'">
            <el-carousel-item v-for="(item,i) in carousel" :key="i">
              <img :src="item" ref="bannerHeight" alt="" @load="imgLoad" style="width:100%">
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
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2389020455,952833770&fm=26&gp=0.jpg",
            "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2800708547,3266479819&fm=26&gp=0.jpg",
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1371242668,3046995307&fm=26&gp=0.jpg",
            ],
            activeName: 'first',
            bannerHeight:'',
        }
    },
    mounted(){
        this.imgLoad();
        window.addEventListener('resize',()=>{
            this.bannerHeight = this.$refs.bannerHeight[0].height;
            this.imgLoad();
        },false)
    },
    methods:{
        imgLoad(){
            this.$nextTick(()=>{
                this.bannerHeight = this.$refs.bannerHeight[0].height;
            })
        }
    }
}
</script>