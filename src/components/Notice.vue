<template>
    <div>
        <div class="grid-content" style="background-color:white;border:1px solid #EBEEF5">
          <div class="notice">
            <div class="labels-header">
              <!-- <i class="el-icon-notebook-1"></i> -->
              <span class="jian-ge">公告</span>  
            </div>
            <div class="notice-body">
              <!-- <h3 class="notice-title"> {{noticeTitle}} </h3> -->
              <p class="nootice-content"> {{noticeContent}} </p>
            </div>
          </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    font-size:13px;
  }

    .labels{
    width:100%;
    height:auto;
    background-color: white;
    border:1px solid #e6e6e6;
    border-radius: 3px;
    margin:1em 0;
    font-size:13px
  }

  .labels-header{
    text-align: left;
    padding:1em 1em 0 1em;
    // border-bottom:1px solid #e6e6e6;

  }
  .notice-body{
    padding:1em;
  }

  .notice-title{
    text-align: center;
  }

  .notice-content{
    text-align:left;
  }

  .jian-ge{
    padding:0 0.2em;
  }
</style>

<script>
export default {
    data(){
        return{
            noticeTitle:'公告',
            noticeContent:"这里是公告123",
        }
    },
    mounted(){
      this.noticeInfo();
    },
    methods:{
      noticeInfo(){
        this.$axios.get(this.$gd.url_prefix+'/notice').then((response)=>{
          let notice = response.data;
          if(notice.code == 200 && notice.data.length >0){
            this.noticeTitle = notice.data[0].title;
            this.noticeContent = notice.data[0].content;
          }
        })
      }
    }
}
</script>