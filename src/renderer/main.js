import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import ElementUI from 'element-ui';
import VueAMap from 'vue-amap';
import VueLazyload from 'vue-lazyload';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.css';

import App from './App';
import router from './router';
import store from './store';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
// Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.prototype.$apiPrefix = 'http://localhost/api';
Vue.prototype.$originalImagePathPrefix = 'http://localhost/originalImg';
Vue.prototype.$compressedImagePathPrefix = 'http://localhost/compressedImg';

VueAMap.initAMapApiLoader({
  key: 'YOUR-KEY',
  plugin: ['AMap.Autocomplete', 'AMap.Geocoder', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geolocation'],
  v: '1.4.4',
});

Vue.use(ElementUI);
Vue.use(VueAMap);
Vue.use(VueAxios, axios);

Vue.use(VueLazyload, {
  // error: require('./assets/error.png'),
  loading: require('./assets/loading.gif'),
  try: 2,
});

/* eslint-disable no-new */
new Vue({
  components: {
    App,
  },
  router,
  store,
  template: '<App/>',
}).$mount('#app');
