import request from '@utils/request.js';

export function getAlbum() {
  return request.get('/getAlbum');
}

export function deleteAlbum(albumName) {
  return request.post(`/deleteAlbum?name=${encodeURIComponent(albumName)}`);
}

export function createAlbum({ name = 'xxx', describe = '', type = '' }) {
  return request.post('/createAlbum', null, {
    params: {
      name,
      describe,
      type,
    },
  });
}

export function updateAlbumID() {
  return request.post('/updateAlbumID');
}
