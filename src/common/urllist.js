import {Axiosfun} from './request.js';

module.exports={
    articleInfo: data => Axiosfun(data,'/articleInfo',123),
}

