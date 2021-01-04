<template>
    <div>
        <div style="margin:10px auto">
            <el-row :gutter="10">
                <!-- left start -->
                <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6" class="hidden-sm-and-down" style="margin:3px auto">

                    <!-- 公告 -->
                    <notice></notice>

                    <!-- 标签 -->
                    <labels></labels>
                                
                    <!-- 网站备注 -->
                    <Notes></Notes>
                            
                    <!-- 友链 -->
                    <Links></Links>

                </el-col>
                <!-- left end -->

                <!-- center start -->
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" style="margin:3px auto">    
                    
                   <!-- article info -->
                   <div class="article-msg">
                        <div class="article-title">
                            <div>{{article_title}}</div>
                            <div class="article-label">
                                <span class="jian-ge"> <i class="el-icon-time"></i> {{create_time}} </span>
                                <span class="jian-ge"> <i class="el-icon-view"></i> {{article_view}} </span>
                            </div>
                        </div>  
                        <div class="article-content">
                            <span v-html="article_content"></span>
                        </div>
                        <div v-if="article_reply" class="replies">
                            <div class="reply" v-for="(item,index) in article_reply" :key="index">
                                <div class="reply-content">
                                    <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                                        <!-- <span class="el-icon-user" style="width:30px;height:30px;font-size:30px;border:1px solid 1px;"></span> -->
                                        <!-- <el-avatar shape="square" :size="50" :src="squareUrl"></el-avatar> -->
                                        <el-image :src="squareUrl" style="width:80%"></el-image>
                                    </el-col> 
                                    <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                                        <div class="jian-ge">
                                            {{item.content}}
                                        </div>
                                        <div class="jian-ge" style="font-size:12px;padding-top:1em"> 
                                            <span class="jian-ge"> <i class="el-icon-time"></i> {{item.created_time.split("T")[0]}} </span>
                                            <span><i class="el-icon-star-off" @click="ding(item.id,index)"></i> {{item.hit}}</span>
                                        </div>
                                    </el-col>  
                                </div>
                            </div>    
                            <div class="reply">
                                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                                  <el-form-item prop="desc">
                                        <el-input type="textarea" v-model="ruleForm.desc" placeholder="回复"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                                    </el-form-item>
                                </el-form>
                            </div> 
                        </div>
                   </div>

                </el-col>
                <!-- center end -->

                <!-- right start -->
                <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6" style="margin:3px auto;">

                    <!-- 网站信息 -->
                    <webInfo></webInfo>

                </el-col>
                <!-- right end -->
            </el-row>
        </div>
    </div>
</template>

<script>
import notice from "../components/Notice.vue";
import labels from "../components/Labels.vue";
import carousel from "../components/Carousel.vue";
import webInfo from "../components/WebInfo.vue";
import Notes from "../components/Notes.vue";
import Links from "../components/Links.vue";

export default {
    components:{
        notice,
        labels,
        carousel,
        webInfo,
        Notes,
        Links,
    },
    mounted(){
        this.findArticle();
    },
    data() {
        return {
            squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
            article_title:'',
            article_content:'',
            create_time:'',
            article_view:0,
            article_reply:[],
            ruleForm: {
                desc: ''
            },
            rules: {
                desc: [
                    { required: true, message: '回复内容不能为空哟', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{

        // 文章信息
        findArticle(){
           this.$axios.get(this.$gd.url_prefix+'/articleInfo',{
               params:{
                   id:this.$route.query.id
               }
           }).then((response)=>{
            let data = response.data;
            if(data.code == 200 && data.data){
                let dataInfo = data.data;
                this.article_title = dataInfo.title;
                this.article_content = dataInfo.content; 
                this.create_time = dataInfo.create_time;
                this.article_view = dataInfo.view;
                this.article_reply = dataInfo.reply;      
            }
           })

        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.$axios.post(this.$gd.url_prefix+'/add_reply_content',{
                    params:{
                        content:this.ruleForm.desc,
                        article_id:this.$route.query.id,
                    }
                }).then((response)=>{
                    let data = response.data;
                    this.$message('回复成功');
                    console.log(data);
                    if(data.code == 200 && data.data){
                        data.data.hit = 0;
                        this.article_reply.push(data.data);
                    }
                    this.ruleForm.desc = '';
                })

            } else {
                this.$message({
                    message:'请填写回复信息',
                    type:'warning'
                })
                return false;
            }
            });
        },

        // 重置表单回复内容
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
            // 标记
        ding(reply_id,index){
            this.$axios.post(this.$gd.url_prefix+'/add_reply_hit',{
                params:{
                    id:reply_id
                }
            }).then((response)=>{
                let data = response.data;
                if(data.code == 200){
                    this.article_reply[index].hit += 1;
                this.$message('感谢你的支持~~~');
                }else{
                    console.log(response);
                    this.$message('哦豁,服务器没了~~~');
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
    .article-msg{
        width:100%;
        background-color:white;
        margin:0 auto;
    }

    .article-title{
        width:94%;
        padding:1em 0;
        border-bottom: 1px solid #ccc;
        margin:0 auto;
    }

    .article-content{
        width:94%;
        padding:1em;
        margin:0 auto;
    }

    .article-label{
        font-size:12px;
        padding-top:0.5em
    }

    .jian-ge{
        padding:0 0.2em;
    }

    .reply{
        width:97%;
        padding:0.5em;
        // display:inline-block;
        // display:flex
    }

    .reply-content{
        width:auto;
        height:50px;
        padding:0.5em 0;
        border: 1px solid #ccc;
        border:1px solid #ccc;
        border-radius:3px;
    }

</style>