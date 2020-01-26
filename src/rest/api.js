import axios from "axios"
import {Message} from 'element-ui'

import router from "../router"

// const baseUrl = 'http://127.0.0.1:5000';
const baseUrl = 'https://fangzhou.weishi100.com/video';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = baseUrl;

axios.interceptors.request.use(function (config) {
  let token = document.cookie;
  if (token) {
    config.timeout = 30000;
    config.headers["Content-Type"] = 'application/json';
    config.headers["Authorization"] = token;
  }
  return config
}, function (error) {
  Message.error(error);
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  let code = response.status;
  let message = response.data.message;
  if (code === 200) {
    return response
  } else if (code === 400) {
    Message.warning(JSON.stringify(message));
    return Promise.reject(message);
  } else if (code === 401) {
    router.replace({
      name: 'Login'
    });
    Message.warning(message);
    return Promise.reject(message);
  }
}, function (error) {
  let status = error.response.status;
  let message = error.response.data.message;
  if (status === 400) {
    Message.warning(JSON.stringify(message));
    return Promise.reject(message);
  } else {
    Message.error('服务器内部错误');
    return Promise.reject(error);
  }
});


export const searchVideo = params => {
  return axios.get('/query/', {params: params})
};
