const axios = require('axios');

//封装axios请求，get和post
export default function(url, method, params = {}) {
  let data = method.toLocaleLowerCase() === 'get' ? 'params' : 'data';
  return axios({
    method,
    url,
    [data]: params
  }).then((res) => {
    return Promise.resolve(res.data);
  }).catch((err) => {
    return Promise.reject(err);
  })
}