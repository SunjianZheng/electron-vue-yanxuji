import axios from 'axios';
import CONFIG from '@config';
import showNotifications from '@utils/notifications';
import store from './../store/index';
// import { Base64 } from 'js-base64';
const baseURL = CONFIG.API_PREFIX;

const instance = axios.create({
  baseURL,
  timeout: 5000,
  // withCredentials: true,
});

instance.interceptors.request.use((config) => {
  // config.headers.sra = 'sra';
  // if (process.env.NODE_ENV !== 'development' && config.method == 'get' && config.params) {
  //   config.params = {params: Base64.encode(JSON.stringify(config.params))}
  // }
  if (!store.state.App.isOnliline) {
    return Promise.reject(new Error('offline!'));
  }
  return config;
}, (error) => {
  showNotifications({ title: error || '未知错误', type: 'error' });
  Promise.reject(error);
});

instance.interceptors.response.use(
  (response) => {
    if (typeof response.data === 'string') {
      // response.data = JSON.parse(Base64.decode(response.data));
    }
    if (response.data.code && response.data.code === 200) {
      return response.data;
    }
    showNotifications({ title: '未知错误', type: 'error' });
    return Promise.reject(response.data);
  },
  (error) => {
    if (error.response) {
      const res = error.response;
      const errorMessage = res.data.message;
      switch (res.status) {
        case 301:
          // store.commit('User/SET_SHOW_LOGIN', true);
          // store.commit('User/SET_USER_INFO', {});
          // store.commit('App/SET_REDIRECT', '/home');
          // localStorage.removeItem('userId');
          showNotifications({ title: errorMessage || '用户未登录', type: 'warning' });
          break;
        case 400:
          showNotifications({ title: errorMessage || '未找到资源', type: 'warning' });
          break;
        case 401:
          showNotifications({ title: errorMessage || '用户未登录', type: 'warning' });
          break;
        // case 403:
        //   showNotifications({ title: errorMessage || '权限不足', type: 'error' });
        //   break;
        case 404:
          showNotifications({ title: errorMessage || '资源不存在', type: 'error' });
          break;
        case 408:
          showNotifications({ title: errorMessage || '', type: 'warning' });
          break;
        case 500:
          showNotifications({ title: errorMessage || '服务器开小差了', type: 'error' });
          break;
        case 403:
          showNotifications({ title: errorMessage || '请求失败', type: 'error' });
          break;
        default:
          showNotifications({ title: errorMessage || '未知错误', type: 'error' });
      }
    } else {
      console.error('error', error.message);
      showNotifications({ title: error.message || '请检查网络连接状态!', type: 'error' });
    }

    // showNotifications({ title: '未知错误', type: 'error' });
    return Promise.reject(error.response);
  },
);

export default instance;
