import request from '@utils/request.js';

export default function searchForImages(keyword) {
  return request.get(`/search?key=${encodeURIComponent(keyword)}`);
}
