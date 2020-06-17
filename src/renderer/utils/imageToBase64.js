import axios from 'axios';

export default function getBase64(url) {
  // return axios.get(url, { responseType: 'arraybuffer' })
  //   .then(async (response) => {
  //     await Buffer.from(response.data, 'base64').toString();
  //   });
  // console.log(base64);
  // console.log(typeof base64);
  // return base64;
  // await new Promise((resolve, reject) => {
  // eslint-disable-next-line
  //   axios.get(url, { responseType: 'arraybuffer' }).then(response => (Buffer.from(response.data, 'base64').toString())
  // });
  // eslint-disable-next-line
  return new Promise((resolve, reject) => {
    axios.get(url, { responseType: 'arraybuffer' }).then(async (response) => {
      // console.log(response.data);
      const b64Str = Buffer.from(response.data, 'base64').toString('base64');
      // resolve(await Buffer.from(response.data, 'base64').toString('base64'));
      resolve(b64Str);
    }).catch((error) => {
      reject(error.message);
    });
  });
}
