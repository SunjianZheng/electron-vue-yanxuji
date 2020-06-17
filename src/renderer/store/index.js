import Vue from 'vue';
import Vuex from 'vuex';

// import { createPersistedState, createSharedMutations } from 'vuex-electron';
import { createPersistedState } from 'vuex-electron';

import modules from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  // plugins: [
  //   createPersistedState(),
  //   createSharedMutations(),
  // ],
  plugins: [
    createPersistedState(),
  ],
  strict: process.env.NODE_ENV !== 'production',
});
