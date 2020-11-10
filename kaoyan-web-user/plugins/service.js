/**
 * Author: CreateSun
 * Date: 2020/7/21
 */
import Axios from 'axios'
import message from "ant-design-vue/lib/message";
import notification from "ant-design-vue/lib/notification";

// const defaultDuration = 2;

Axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
Axios.defaults.headers.post['Content-Type'] = 'text/plain;charset=UTF-8';

let service = Axios.create({
  baseURL: 'http://121.199.56.197:8080',
  // baseURL: 'http://localhost:8080',
  timeout: 10000
});

// 请求拦截 可在请求头中加入token等
service.interceptors.request.use(config => {
  if (Boolean(config.useBaseUrl)) {
    return config
  } else {
    config.baseURL = '';
    return config
  }
}, err => {
  return Promise.reject(err)
});

// 响应拦截 对响应消息作初步的处理
service.interceptors.response.use(res => {
  if (res.data) {
    if (res.data.code !== 200 && res.status !== 200) {
      message.warning('请求失败');
    }
    return res.data
  } else {
    message.warning('请求失败');
  }
}, err => {
  if (err)
  message.error("网络错误")
});

export default service;
