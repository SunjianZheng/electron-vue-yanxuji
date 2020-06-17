import request from '@utils/request.js';

export default function getExifData(name) {
  return request.get(`/getExif?name=${name}`);
}
