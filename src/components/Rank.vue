<template>
    <div>
        <div class="rank">
            <el-card class="box-card" shadow="never">
                <div slot="header" class="clearfix">
                  <div class="rank-header" style="text-align: left;">
                      <i class="el-icon-s-data"></i>
                      <span class="jian-ge">排行榜</span>
                  </div>
                </div>
                <div v-for="(item,index) in rank" :key="index" class="text" style="text-align: left;">
                  <el-badge v-if="index == 0" value="hot" class="item"  type="danger">
                    <el-button size="small" @click="rankDump(item.id)">{{index+1+'. '+item.title}} </el-button>
                  </el-badge>
                  <el-badge v-else :value="item.hit" :max="99" class="item" type="info">
                    <el-button size="small" @click="rankDump(item.id)" >{{index+1+'. '+item.title}} </el-button>
                  </el-badge>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            rank:[],
        }
    },
    mounted(){
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
        rankDump(article_id){
          this.$router.push({
            path:'/article',
            query:{
              id:article_id
            }
          })
        }
    }
}
</script>

<style lang="scss" scope>
    // 排行榜
  .rank{
    margin:0.5em 0;
    font-size:13px
  }

  .item {
  margin-top: 10px;
  margin-right: 40px;
  cursor:pointer;
}
</style>