import request from '@utils/request.js';

export function getRecommendPhotos() {
  return request.get('/getRecommendPhotos');
}

export function getRecommendAlbums() {
  return request.get('/getRecommendAlbums');
}
