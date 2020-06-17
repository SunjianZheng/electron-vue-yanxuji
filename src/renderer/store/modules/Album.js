const state = {
  albums: [],
  isUpdate: false,
};

const getters = {
  getAlbums: state => state.albums,
  getUpdateStatus: state => state.isUpdate,
};


const mutations = {
  setAlbums(state, arr) {
    state.albums = arr.slice();
  },
  setUpdateStatus(state, status) {
    state.isUpdate = status;
  },
};

const actions = {
  updateAlbums(context, arr) {
    context.commit('setAlbums', arr);
  },
  updateStatus(context, status) {
    context.commit('setUpdateStatus', status);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
