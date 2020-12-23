<template>
    <div>
        <div class="grid-content" style="background-color:white">
          <div class="labels">
            <div class="labels-header">
              <i class="el-icon-collection-tag"></i>
              <span class="jian-ge">标签</span>  
            </div>
            <div class="tag-group" style="text-align:left;padding:1em;">
              <el-tag v-for="(item,index) in items" :key="index" :type="item.type" effect="dark" style="margin:0.2em" size="small">
                <span style="margin:0 0.5em">{{ item.label }}</span>
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
            items: [
            { type: '', label: '标签一' },
            { type: 'success', label: '标签二' },
            { type: 'info', label: '标签三' },
            { type: 'danger', label: '标签四' },
            { type: 'warning', label: '标签五' },
            { type: '', label: '标签一' },
            { type: 'success', label: '标签二' },
            { type: 'info', label: '标签三' },
            { type: 'danger', label: '标签四' },
            { type: 'warning', label: '标签五' }
            ],
        }
    }
}
</script>