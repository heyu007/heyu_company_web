<template>
    <div>
        <div class="nav-top">
            <div class="el-menu-demo" mode="horizontal" style="background-color:rgba(255,255,255,0.7)">
                <div class="web-logo">
                假装有logo
                </div>
                <div class="web-search">
                <el-input  placeholder="请输入查询内容" prefix-icon="el-icon-search" v-model="keyword" @change="serach"></el-input>
                </div>
                <div style="clear:both"></div>
            </div>
            <div class="line"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
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

.web-logo{
    float: left;
    height: 60px;
    line-height: 60px;
    margin: 0;
    color:#606266;
    padding:0 0.8em;
}

.web-search{
    float: right;
    height: 60px;
    line-height: 60px;
    margin: 0;
    color:#606266;
    padding:0 0.8em;
}
</style>
<script>
export default {
    data(){
        return{
            keyword:'',
        }
    },
    methods:{
        serach(e){
            // this.$message(e);
            this.$emit('searchChildValue',this.keyword)
        },
    }
}
</script>

