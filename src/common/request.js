import axios from "axios"
import config  from "./config.base.js"


var Axiosfun = function (method) {
    this.method = method;
};
Axiosfun.prototype.axios = function (data, url, fun) {
    var that = this;
    var url_address = config+url;
    axios({
        method: that.method,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        url: url_address,
        data: data
    }).then(function (e) {
        var middle_token = false;
        if (typeof e.data.data != 'undefined') {
            if (typeof e.data.data.token != 'undefined') {
                middle_token = e.data.data.token;
            }
        }
        if (middle_token) { // 有返回token 处理   2tian
            var middle_token_d = new Date();
            middle_token_d.setTime(middle_token_d.getTime() + (2 * 24 * 60 * 60 * 1000));
            var expires = "expires=" + middle_token_d.toGMTString();
            document.cookie = "KONG=" + middle_token + "; " + expires+"; path=/;";
        }
        console.log(e.data, '封装返回数据')
        fun(e.data)
    }).catch(function (error) {
        // alert(error)
      });
};
var Axios_post = new Axiosfun('POST');
var Axios_get = new Axiosfun('GET');
