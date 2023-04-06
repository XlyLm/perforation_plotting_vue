//1. 先引入axios依赖包
import axios from "axios";
import {Msg} from "@/untils/resetMessage";

export const baseURL = "http://localhost:8081";

//2. axios创建对象
const server = axios.create({
    baseURL, //管理后台要使用的接口的基地址
    timeout: 30000, //超时时间,
    // withCredentials: true,
    // headers: {"Content-Type": "application/x-www-form-urlencoded"}
})
server.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//3. 定义前置拦截器，请求拦截器，请求发送出去之前触发的
server.interceptors.request.use(config => {
    // NProgress.start() // start progress bar
    let token = window.localStorage.getItem('access_token');
    if (token != undefined && token != '') {
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

//4. 定义后置拦截器,响应拦截器, 服务器响应回来数据之前触发，
server.interceptors.response.use((response) => {
    //响应回来的数据操作
    if(response.status === 200){
        return response.data;
    }else{
        Msg.error(response.statusText || 'Error');
        return Promise.reject(response.statusText);
    }
}, (error) => {
    //报错的是时候抛出一个报错的信息
    return Promise.reject(error);
})

export function http(method, url, data) {
    const flog = data.types;
    return server({
        method,
        url,
        params: !flog && data,
        data: flog && data,
    }).then(res=>{
        if(res.code === '0000'){
            return res;
        }else{
            Msg.error(res.msg || 'Error');
        }
    }).catch(e=>{
        console.log(e);
    })
}

export default server