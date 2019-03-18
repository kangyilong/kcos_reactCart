import fetch from './fetch';

// 想要操作的数据
export function wantShopData(params) {
  return new Promise((resolve, reject) => {
    fetch('/wantMsg', 'post', params).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    })
  });
}