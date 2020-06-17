import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/',
      meta: {},
    },
    {
      path: '/',
      name: 'landing-page',
      component: require('@pages/LandingPage').default,
      meta: {},
    },
    {
      path: '/photoCollections',
      name: 'photoCollections',
      component: require('@pages/PhotoCollections').default,
      meta: {},
    },
    {
      path: '/photoDetails',
      name: 'photoDetails',
      component: require('@pages/photo_details/PhotoDetails').default,
      meta: {},
    },
    {
      path: '/upload',
      name: 'upload',
      component: require('@pages/Upload').default,
      meta: {},
    },
    {
      path: '/search',
      name: 'search',
      component: require('@pages/Search').default,
      meta: {},
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: require('@pages/Recommend').default,
      meta: {},
    },
    {
      path: '/about',
      name: 'about',
      component: require('@pages/About').default,
      meta: {},
    },
    {
      path: '/thisDayInPastYears',
      name: 'thisDayInPastYears',
      component: require('@pages/ThisDayInPastYears').default,
      meta: {},
    },
    // {
    //   path: '/netError',
    //   name: 'netError',
    //   component: require('@components/NetError').default,
    //   meta: {},
    // },
  ],
  // scrollBehavior() {
  //   return {
  //     x: 0,
  //     y: 0,
  //   };
  // },
});
