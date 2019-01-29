import fetch from './fetch';

// 添加商品数据
export function wantShopData(params) {
  return new Promise((resolve, reject) => {
    fetch('/wantMsg', 'post', params).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    })
  });
}