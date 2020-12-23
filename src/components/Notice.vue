<template>
    <div>
        <div class="grid-content" style="background-color:white;border:1px solid #EBEEF5">
          <div class="notice">
            <div class="labels-header">
              <i class="el-icon-notebook-1"></i>
              <span class="jian-ge">公告</span>  
            </div>
            <div class="notice-body">
              {{noticeContent}}
            </div>
          </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
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
    padding:1em;
    border-bottom:1px solid #e6e6e6;

  }
  .notice-body{
    text-align: left;
    padding:1em;
  }
  .jian-ge{
    padding:0 0.2em;
  }
</style>

<script>
export default {
    data(){
        return{
            noticeContent:"这里是公告123"
        }
    }
}
</script>