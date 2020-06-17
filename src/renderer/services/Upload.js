import request from '@utils/request.js';

export default function uploadImage(nameOfAlbum) {
  return request.post(`/uploadImg?name=${window.encodeURIComponent(nameOfAlbum)}`);
}
