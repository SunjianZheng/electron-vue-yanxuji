import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import ElementUI from 'element-ui';
import VueAMap from 'vue-amap';
import VueLazyload from 'vue-lazyload';

import '@utils/prototypes';
import 'element-ui/lib/theme-chalk/index.css';
import './../../static/css/style.scss';
// import 'font-awesome/css/font-awesome.css';
import datastore from './datastore/index';
import CONFIG from './config/index';
// import './assets/css/reset.scss';

import App from './App';
import router from './router';
import store from './store';
import Header from './components/Header';
import Masonry from './components/Masonry';
import Card from './components/Card';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
// Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.prototype.$db = datastore;
Vue.prototype.$apiPrefix = CONFIG.API_PREFIX;
Vue.prototype.$originalImagePathPrefix = CONFIG.ORIGINAL_IMAGES_PATH_PREFIX;
Vue.prototype.$compressedImagePathPrefix = CONFIG.COMPRESSED_IMAGES_PATH_PREFIX;

VueAMap.initAMapApiLoader({
  key: CONFIG.AMAP_KEY,
  plugin: ['AMap.Autocomplete', 'AMap.Geocoder', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geolocation'],
  v: '1.4.4',
});

Vue.use(ElementUI);
Vue.use(VueAMap);
Vue.use(VueAxios, axios);

Vue.use(VueLazyload, {
  // error: require('./assets/error.png'),
  // loading: require('./../../static/imgs/loading.gif'),
  // try: 2,
});

Vue.component('Header', Header);
Vue.component('Masonry', Masonry);
Vue.component('Card', Card);

/* eslint-disable no-new */
new Vue({
  components: {
    App,
  },
  router,
  store,
  template: '<App/>',
}).$mount('#app');
