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
                <div v-for="(item,index) in rank" :key="index" class="text item" style="text-align: left;padding:0.2em 0">
                <span @click="rankDump(item.id)" style="cursor:pointer"> {{index+1+'. '+item.title}} </span>
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
</style>