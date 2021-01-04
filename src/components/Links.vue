<template>
    <div>
        <div class="grid-content">
            <el-link type="info" v-for="(item,index) in link" :key="index" :href="item.href" target="_blank" class="jian-ge"  :underline="false"> {{item.name}} </el-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.grid-content{
    border:1px solid #e6e6e6;
    border-radius: 3px;
    min-height: 36px;
    font-size:13px;
    background-color:white;
    padding:1em;
    margin-bottom: 1em;
}
.jian-ge{
    padding:0.1em 1em 0.1em 0;
    margin:0 0.1em;
}
</style>

<script>
export default {
    data(){
        return{
            link:[
                {name:'百度',href:'https://www.baidu.com'},
                {name:'新浪',href:'https://www.sina.com.cn'},
                {name:'淘宝',href:'https://www.taobao.com'},
                {name:'阿里云',href:'https://www.aliyun.com'},
                {name:'百度',href:'https://www.baidu.com'},
                {name:'新浪',href:'https://www.sina.com'},
                {name:'淘宝',href:'https://www.taobao.com'},
                {name:'阿里云',href:'https://www.aliyun.com'},
                {name:'百度',href:'https://www.baidu.com'},
                {name:'新浪',href:'https://www.sina.com'},
                {name:'淘宝',href:'https://www.taobao.com'},
                {name:'阿里云',href:'https://www.aliyun.com'},
                {name:'百度',href:'https://www.baidu.com'},
                {name:'新浪',href:'https://www.sina.com'},
                {name:'淘宝',href:'https://www.taobao.com'},
                {name:'阿里云',href:'https://www.aliyun.com'},
            ],
        }
    }
}
</script>