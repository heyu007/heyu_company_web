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
                <i class="el-icon-phone-outline"> 电话热线 ：12345</i>
              </div>
              <div style="text-align: left;padding-bottom:1em">
                <i class="el-icon-date"> 今日日期 ： {{dateInfo}} </i>
              </div>
              <div style="text-align: left;padding-bottom:1em">
                <i class="el-icon-sunny"></i> <span v-html="weather"></span>
              </div>
              <div style="text-align: left;padding-bottom:1em">
                <i class="el-icon-location-outline"> 我的位置 ：{{province + city + district}}</i>
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
            weather:"本地天气：拼命加载中~~~",
            province: "北极",
            city:"北极",
            district:"北极",
            dateInfo:'',
            web_info:{
              "name":'laowang',
              "header_img":'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1024793515,716085277&fm=15&gp=0.jpg'
            },
        }
    },
    mounted(){
        this.getLocation(); // 调用获取地理位置
    },
    methods:{
        /**获取地图定位*/
        getLocation() {
          // this.$cookieStore.delCookie('locationMsg');return;
          this.getCurrentDate(0);
          let locationMsg = this.$cookieStore.getCookie('locationMsg');
          if(locationMsg){
            console.log('welcome baby');
            this.province = this.$cookieStore.getCookie('province');
            this.city = this.$cookieStore.getCookie('city');
            this.district = this.$cookieStore.getCookie('district');
            this.weather = this.$cookieStore.getCookie('weather');
          }else{
            let _that = this;
            let geolocation = location.initMap("map-container"); //定位
            AMap.event.addListener(geolocation, "complete", result => {
                // console.log(result)
                _that.lat = result.position.lat;
                _that.lng = result.position.lng;
                _that.province = result.addressComponent.province;
                _that.city = result.addressComponent.city;
                _that.district = result.addressComponent.district;
                _that.weatherInfo(this.province,this.city);
            });
          }
        },
        // 天气
        weatherInfo(province,city){
          if(province && city){
            this.$axios.post(this.$gd.url_prefix+'/weather',{
              msg:this.province+this.city+'天气',
            }).then((response)=>{
              let weatherInfoMsg = response.data;
              // console.log(weatherInfoMsg);
              let res = JSON.parse(weatherInfoMsg.data);
              // console.log(res);
              if(res.result == 0){
                this.weather = res.content.split("{br}").join('</br>');
                let cookieData = {
                  province:this.province,
                  city:this.city,
                  district:this.district,
                  weather:this.weather,
                }
                let expDay = 1;
                this.$cookieStore.setCookie('locationMsg',true,expDay);
                this.$cookieStore.setCookie('province',this.province,expDay);
                this.$cookieStore.setCookie('city',this.city,expDay);
                this.$cookieStore.setCookie('district',this.district,expDay);
                this.$cookieStore.setCookie('weather',this.weather,expDay);
              }
            })
          }
        },

        // 日期
        getCurrentDate(n) {
          var dd = new Date();
          if (n) {
            dd.setDate(dd.getDate() - n);
          }
          var year = dd.getFullYear();
          var month =
            dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
          var day = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
          this.dateInfo = year + "-" + month + "-" + day;
        },
    }
}
</script>