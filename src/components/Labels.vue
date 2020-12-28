<template>
    <div>
        <div class="grid-content" style="background-color:white">
          <div class="labels">
            <div class="labels-header">
              <!-- <i class="el-icon-collection-tag"></i> -->
              <span class="jian-ge">标签</span>  
            </div>
            <div class="tag-group" style="text-align:left;padding:1em;">
              <el-tag v-for="(item,index) in labels" :key="index" :type="labelTypeList[Math.floor(Math.random() * (labelTypeList.length -1))]" effect="dark" style="margin:0.2em" size="small">
                <span style="margin:0 0.5em">{{ item.name }}</span>
              </el-tag>
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
    padding:1em 1em 0 1em;
    // border-bottom:1px solid #e6e6e6;

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
            labelTypeList:['success','primary','info','warning','danger',''],
            labels: [
              {name:'标签1',number:'1'},
              {name:'标签1',number:'1'},
              {name:'标签1',number:'1'},
              {name:'标签1',number:'1'},
              {name:'标签1',number:'1'},
              {name:'标签1',number:'1'},
              {name:'标签1',number:'1'},
              {name:'标签1',number:'1'},
              {name:'标签1',number:'1'},
              {name:'标签1',number:'1'},
              {name:'标签1',number:'1'},
            ]
        }
    },
    mounted(){
      this.labelList();
    },
    methods:{
      labelList(){
        this.$axios.get(this.$gd.url_prefix+'/label').then((response)=>{
          let labels = response.data;
          // console.log(labels);
          if(labels.code == 200 && labels.data.lenght > 0){
            this.labels = labels.data;
          }
        })
      }
    }
}
</script>