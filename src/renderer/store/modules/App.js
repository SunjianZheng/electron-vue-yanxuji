const state = {
  isOnliline: navigator.onLine,
};

const getters = {
  isOnliline: state => state.isOnliline,
};

const mutations = {
  setOnline(state, flag) {
    state.isOnliline = flag;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
