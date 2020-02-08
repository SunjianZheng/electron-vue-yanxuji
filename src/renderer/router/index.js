import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '*',
      redirect: '/',
      meta: {
        keepAlive: false,
        isBack: false,
      },
    },
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default,
      meta: {
        keepAlive: true,
        isBack: false,
      },
    },
    {
      path: '/photoCollections',
      name: 'photoCollections',
      component: require('@/components/photoCollections/photoCollections').default,
      meta: {
        keepAlive: true,
        isBack: false,
      },
    },
    {
      path: '/photoDetails',
      name: 'photoDetails',
      component: require('@/components/photoDetails/photoDetails').default,
      meta: {
        keepAlive: true,
        isBack: false,
      },
    },
    {
      path: '/upload',
      name: 'upload',
      component: require('@/components/upload').default,
      meta: {
        keepAlive: false,
        isBack: false,
      },
    },
    {
      path: '/createAlbum',
      name: 'createAlbum',
      component: require('@/components/createAlbum').default,
      meta: {
        keepAlive: false,
        isBack: false,
      },
    },
    {
      path: '/search',
      name: 'search',
      component: require('@/components/search/search').default,
      meta: {
        keepAlive: false,
        isBack: false,
      },
    },
    {
      path: '/recommand',
      name: 'recommand',
      component: require('@/components/recommand/recommand').default,
      meta: {
        keepAlive: false,
        isBack: false,
      },
    },
    {
      path: '/about',
      name: 'about',
      component: require('@/components/about/about').default,
      meta: {
        keepAlive: false,
        isBack: false,
      },
    },
    {
      path: '/thisDayInPastYears',
      name: 'thisDayInPastYears',
      component: require('@/components/thisDayInPastYears/thisDayInPastYears').default,
      meta: {
        keepAlive: false,
        isBack: false,
      },
    },
  ],
});
