import fetch from './fetch';

// 添加商品数据
export function addShopData(params) {
  return new Promise((resolve, reject) => {
    fetch('/addMsg', 'post', params).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    })
  });
}

// 获取商品列表数据
export function getShopData(params) {
  return new Promise((resolve, reject) => {
    fetch('/getMsg', 'get', params).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    })
  });
}

// 修改商品列表数据
export function exitShopData(params) {
  return new Promise((resolve, reject) => {
    fetch('/exitMsg', 'post', params).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    })
  });
}

// 获取商品订单数据
export function getOrderData(params) {
  return new Promise((resolve, reject) => {
    fetch('/getMsg', 'get', params).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    })
  });
}