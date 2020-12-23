<template>
  <div class="hello">
  <div style="margin:10px auto">
    <el-row :gutter="10">
      <!-- left start -->
      <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6" class="hidden-sm-and-down" style="margin:3px auto">

        <!-- 公告 -->
        <notice></notice>

        <!-- 标签 -->
        <labels></labels>

      </el-col>
      <!-- left end -->

      <!-- center start -->
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" style="margin:3px auto">
        
        <el-tabs type="border-card">

          <!-- news start -->
          <el-tab-pane label="最新资讯">
            <!-- 轮播图 -->
            <carousel></carousel>

            <!-- messsage list -->
            <div class="msg-list" v-for="(item,index) in article" :key="index">
              <div class="msg-title" @click="articleInfo(item.id)">
                <div style="font-weight: bold;">
                  {{item.title}}
                </div>
                <div style="margin-top:0.5em;font-size:14px">
                  <span class="jian-ge"><i class="el-icon-time"></i>   {{item.created_time.split("T")[0]}} </span>
                </div>
              </div>
              <div class="msg-content">
                <div v-html="item.content.substring(0,500)" @click="articleInfo(item.id)"></div><span>...</span>
                <div class="msg-label">
                  <div class="time">
                    <span :plain="true" @click="ding(item.id,index)" style="margin-right:5em"><i class="el-icon-star-off"></i>  {{item.hit}}</span>
                    <span> <i class="el-icon-chat-dot-square"></i> {{item.view}} </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- <div>
              <div class="box" v-for="(i,k) in beers" :key="k">
                <img :src="i.img" alt="">
                    <p>{{ i.name }}</p>
              </div> -->
              <!-- 当网络有延迟提时，显示这个div提示用户 -->
              <div v-loading="load" style="width:100%;text-align:center">
                 {{article_end}}
              </div>
            <!-- </div> -->
          </el-tab-pane>
          <!-- news end -->

          <!-- add message start -->
          <el-tab-pane label="添加信息">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="区域" prop="location">
                <el-select v-model="ruleForm.location" placeholder="请选择区域">
                  <el-option :label="item.name" :value="item.val" v-for="(item,index) in locationList" :key=index></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="行业" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择行业">
                  <el-option :label="item.name" :value="item.val" v-for="(item,index) in industry" :key=index></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="时间" required style="text-align:center;">
                <el-col :span="11">
                  <el-form-item prop="date1">
                    <el-date-picker type="date" placeholder="开始日期" v-model="ruleForm.date1" style="width: 100%"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-form-item prop="date2">
                    <el-date-picker type="date" placeholder="结束日期" v-model="ruleForm.date2" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="标签" prop="type">
                <el-checkbox-group v-model="ruleForm.type">
                  <el-checkbox :label="item.name" name="type" v-for="(item,index) in types" :key=index></el-checkbox>

                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="说明" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <!-- add message end -->

        </el-tabs>



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
import WebInfo from "../components/WebInfo.vue";

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components:{
    notice,
    labels,
    carousel,
    WebInfo,
  },
  data(){
    return {
      carousel:[
        "https://img.zcool.cn/community/01f8b25fd0361c11013fdcc77213eb.jpg@1380w",
        "https://img.zcool.cn/community/01f8b25fd0361c11013fdcc77213eb.jpg@1380w",
        "https://img.zcool.cn/community/01f8b25fd0361c11013fdcc77213eb.jpg@1380w",
      ],
      activeName: 'first',
      beers: [], // 用来接收请求成功的内容
      load: false, // 控制网络延迟提示div的显示
      status:true,
      current_page:1,
      article:[],
      article_end:' 玩命加载中... ...',
      industry:[
        {'val':1,'name':'互联网IT'},
        {'val':2,'name':'制造业'},
        {'val':3,'name':'建筑'},
        {'val':4,'name':'金融'},
        {'val':5,'name':'房产'},
        {'val':6,'name':'教育'},
        {'val':7,'name':'餐饮'},
      ],
      types:[
        {'name':'朝九晚六'},
        {'name':'997'},
        {'name':'环境优美'},
        {'name':'小哥哥多'},
        {'name':'小姐姐多'},
        {'name':'下午茶'},
        {'name':'车补'},
        {'name':'其他'}
      ],
      locationList:[
        {'name':'成都','val':"cd"},
      ],
      ruleForm: {
        name: '',
        region:'',
        location: '',
        date1: '',
        date2: '',
        type: [],
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入具体名称', trigger: 'blur' },
          { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择行业', trigger: 'change' }
        ],
        // location: [
        //   { required: true, message: '请选择所在区域', trigger: 'change' }
        // ],
        date1: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
    }
  },
  mounted () {
    // 当页面加载DOM完时，监控scroll()方法是否成立触发条件
    this.scroll();
  },
  beforeMount () {
    this.article_list();
  },
  methods: {

    // 信息列表
    article_list () {
      if(!this.status) return; // 滚动下拉加载，加载进行中时，多次触发函数，给个状态加以限制
      this.status = false;
      this.$axios.get(this.$gd.url_prefix+'/article_list',{
        params:{
          page:this.current_page
        }
      }).then((response)=>{
        this.status=true
        let data = response.data;
        if(data.code == 200 && data.data.data.length > 0){
          if(data.data.current_page + 1 <= data.data.total){
            this.current_page = data.data.current_page + 1;
            this.load = false
            this.article = [...this.article,...data.data.data]
            // console.log('da--------------');
            // console.log(this.article);
          }else{
            this.article_end = 'Done ~ ~ ~';
            this.load = false
          }
        }
      })
    },

    // 信息详情跳转
    articleInfo(article_id){
      this.$router.push({
        path:'/article',
        query:{
          id:article_id
        }
      })
    }
    ,
    scroll () {
      window.onscroll = () => {
        // 当离底部还有1px时触发
        const bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= 1
        if (bottomOfWindow) {
          this.load = true
          this.article_list()
        }
      }
    },

    // 标记
    ding(article_id,index){
      this.$axios.post(this.$gd.url_prefix+'/add_hit',{
        params:{
          id:article_id
        }
      }).then((response)=>{
        let data = response.data;
        if(data.code == 200){
          this.article[index].hit += 1;
          this.$message('感谢你的支持~~~');
        }else{
          console.log(response);
          this.$message('哦豁,服务器没了~~~');
        }
      })
    },

    // 添加信息
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
          this.ruleForm.date1 = this.dateFormat(this.ruleForm.date1);
           this.ruleForm.date2 = this.dateFormat(this.ruleForm.date2);
          console.log(this.ruleForm);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 时间格式转换
    dateFormat(dateData) {
      var date = new Date(dateData)
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? ('0' + m) : m
      var d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      const time = y + '-' + m + '-' + d
      return time
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .load {
    width: 100%;
    height: 200px;
    text-align: center;
    background-color: wihte;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  // 栅格布局
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  // 标签
  .notice{
    width:100%;
    height:auto;
    background-color: white;
    border:1px solid #e6e6e6;
    border-radius: 3px;
    font-size:13px
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

  // 网站信息
  .web-info{
    width:100%;
    height:auto;
    background-color: white;
    font-size:13px
  }
  .info-header{
    padding:0.5em;
    border-bottom:1px solid #e6e6e6;
  }

  .message{
    border-radius: 3px;
  }

  .message ul li{
    width:50%;
    float: left;
    list-style-type:none;
  }
  
  // 排行榜
  .rank{
    margin:0.5em 0;
    font-size:13px
  }

  // tags
  .tags{
    margin:1em 0;
  }

  // 内容列表
  .msg-list{
    margin:1em 0;
    border:1px solid #e6e6e6;
    border-radius: 3px;
    background-color:white;
  }
  .msg-title{
    text-align:left;
    padding:0.3em 1em;
    border-bottom:1px solid #e6e6e6;
  }

  .msg-title:hover{
      cursor:pointer;
  }

  .msg-content{
    text-align:left;
    padding:0.3em 1em;
  }

  .time{
    padding-top:1em;
    font-size:14px
  }
</style>
