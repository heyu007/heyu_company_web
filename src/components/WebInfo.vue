<template>
    <div>
        <div class="grid-content">
          <div class="web-info">
              <div class="web-info-header">
                <div class="web-introduce" style="background: url('https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3238133352,1084162866&fm=26&gp=0.jpg');">
                  <div class="stationmaster">
                    <img :src="web_info.header_img" alt="" style="width:5em;height:5em;border-radius: 5px;">
                  </div>
                </div>
                <div class="web-something">
                  <span>以梦为马，不负韶华</span>
                </div>
              </div>
            <el-card class="box-card" shadow="never">
              <div style="text-align: left;padding-bottom:1em">
                <i class="el-icon-location-outline"> {{province + city + district}}</i>
              </div>
              <div style="text-align: left;padding-bottom:1em">
                <i class="el-icon-location-outline"> {{province + city + district}}</i>
              </div>
              <div style="text-align: left;padding-bottom:1em">
                <i class="el-icon-location-outline"> {{province + city + district}}</i>
              </div>
              <div style="text-align: left;padding-bottom:1em">
                <i class="el-icon-location-outline"> {{province + city + district}}</i>
              </div>
            </el-card>
          </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
 .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

// 网站信息
  .web-info{
    width:100%;
    height:auto;
    font-size:13px
  }
  .info-header{
    padding:0.5em;
    border-bottom:1px solid #e6e6e6;
  }

  .message{
    border-radius: 3px;
  }

  .message ul li{
    width:50%;
    float: left;
    list-style-type:none;
  }
  
  // 排行榜
  .rank{
    margin:0.5em 0;
    font-size:13px
  }

  // tags
  .tags{
    margin:1em 0;
  }

  // web-info
  .web-info-header{
    width:100%;
    height:auto;
    margin-bottom:1em;
    border:1px solid #EBEEF5;
    border-radius: 3px;
    background-color: white;
  }

  .web-introduce{
    width:100%;
    height:100px;
  }

  .stationmaster{
    width: 5em;
    height: 5em;
    position: relative;
    top:60px;
    margin:0 auto;
  }
  .web-something{
    width:90%;
    height: auto;
    margin:0 auto;
    text-align: center;
    padding: 3em 0 1em;
  }
</style>

<script>
import { location } from "../common/location.js";

export default {
    data(){
        return{
            province: "",
            city:"",
            district:"",
            web_info:{
              "name":'heyu',
              "header_img":'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1024793515,716085277&fm=15&gp=0.jpg'
            },
            rank:[],
        }
    },
    mounted(){
        this.getLocation(); // 调用获取地理位置
        this.articleRank();
    },
    methods:{
         articleRank(){
           this.$axios.get(this.$gd.url_prefix+'/article_rank_list').then((response)=>{
             let rank = response.data;
             if(rank.code == 200 && rank.data.length > 0){
               this.rank = rank.data;
             }
            //  console.log(this.rank[0].title);return;
           }) 
         },
    
        /**获取地图定位*/
        getLocation() {
            let _that = this;
            let geolocation = location.initMap("map-container"); //定位
            AMap.event.addListener(geolocation, "complete", result => {
                // console.log(result)
                _that.lat = result.position.lat;
                _that.lng = result.position.lng;
                _that.province = result.addressComponent.province;
                _that.city = result.addressComponent.city;
                _that.district = result.addressComponent.district;
            });
        },
    }
}
</script>