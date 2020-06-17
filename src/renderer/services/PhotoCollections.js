import request from '@utils/request.js';

export function getCompressedImages(albumName) {
  return request.get(`/getCompressedImg?name=${window.encodeURIComponent(albumName)}`);
}

export function deleteImage(imageUrl) {
  return request.post(`/deleteImg?url=${imageUrl}`);
}

export function modifyAvatar(albumName, imageUrl) {
  return request.post(`/changeAvatar?name=${window.encodeURIComponent(albumName)}&url=${imageUrl}`);
}

export function moveImages(urlArr, albumName) {
  return request.post(`/moveImages?urlString=${urlArr}&albumName=${window.encodeURIComponent(albumName)}`);
}

export function modifyAlbumInfo(albumName, infoString) {
  return request.post(`/modifyAlbumInfo?albumName=${window.encodeURIComponent(albumName)}&info=${window.encodeURIComponent(infoString)}`);
}
