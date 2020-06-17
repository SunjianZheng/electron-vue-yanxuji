const state = {
  albumName: '',
  photos: [],
  isUpdate: false,
};

const getters = {
  getAlbumName: state => state.albumName,
  getPhotos: state => state.photos,
  getUpdateStatus: state => state.isUpdate,
};


const mutations = {
  setAlbumName(state, name) {
    state.albumName = name.slice();
  },
  setPhotos(state, base64Arr) {
    state.photos = base64Arr.slice();
  },
  setUpdateStatus(state, status) {
    state.isUpdate = status;
  },
};

const actions = {
  updateAlbumName(context, base64Arr) {
    context.commit('setAlbumName', base64Arr);
  },
  updatePhotos(context, name) {
    context.commit('setPhotos', name);
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
