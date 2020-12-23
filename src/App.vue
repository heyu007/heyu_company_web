<template>
  <div id="app">
    <div class="nav-top">
      <el-menu class="el-menu-demo" mode="horizontal" style="background-color:rgba(255,255,255,0.7)">
        <el-menu-item>
          假装有logo
        </el-menu-item>
        <el-menu-item style="float:right">
          <el-input  placeholder="请输入内容" prefix-icon="el-icon-search" v-model="keyword" @change="serach"></el-input>
        </el-menu-item>
      </el-menu>
      <div class="line"></div>
    </div>
    <div class="index_bg" style="width:100%;height:500px;" :style="'background:url('+index_bg_show+') repeat center center'"></div>
    <div style="margin-top:30px"></div>

    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: '',
      index_bg:[
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608268489507&di=437aea185596346a4f497ffa68d7aa02&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F9%2F586369e34d79d.jpg',
        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3238133352,1084162866&fm=26&gp=0.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608268489505&di=7b545641f307749c0e7e2606c8b7de1c&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F8%2F58b3843f75d67.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608268489505&di=1ddf94b5fb2792da249a26fbb3e11013&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-05-21%2F5b02579f2e7cc.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608269754304&di=d5de04972b6f22f2f25a25df5e308627&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Ff%2F571de965bff16.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608269786897&di=0e9d691c346d42ccc659c78ce194b347&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2017-12-12%2F5a2f6b3829b3b.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608269814887&di=fe9f6064e9e380b1eaf262986f6f00c6&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fb%2F575fbfdfa0d56.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608269919225&di=54a5ea35b8c7191f5dd73f12bc798a34&imgtype=0&src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170816%2Fe722f0f48d344cfea8f3d31badddb231_th.png',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608269940519&di=4861493a0f740f1be6b50648b8c8dd8a&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2017-10-10%2F59dc6446cc736.jpg',
      ],
      index_bg_show:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608268489507&di=437aea185596346a4f497ffa68d7aa02&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F9%2F586369e34d79d.jpg',
    }
  },
  mounted(){
    this.rand_bg();
  },
  methods:{
    serach(e){
      console.log(e)
    },
    rand_bg(){
      let Max = this.index_bg.length - 1;
      let Min = 0;
      let rand_index = Math.floor(Math.random() * (Max - Min + 1)) + Min;
      this.index_bg_show = this.index_bg[rand_index];
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  background-color:#FaFaFa;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  };
}

.nav-top{
  width: 100%;
  position: fixed;
  top:0;
  z-index:999;
  left:0;
}

.index_bg{
  width:100%;

}
</style>
