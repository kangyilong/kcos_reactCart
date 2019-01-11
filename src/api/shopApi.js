import fetch from './fetch';

// 添加商品数据
export function addShopData(params) {
  return new Promise((resolve, reject) => {
    fetch('/add', 'post', params).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    })
  });
}

// 获取商品列表数据
export function getShopData(params) {
  return new Promise((resolve, reject) => {
    fetch('/getShopMsg', 'get', params).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    })
  });
}

// 修改商品列表数据
export function exitShopData(params) {
  return new Promise((resolve, reject) => {
    fetch('/exitShopMsg', 'post', params).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    })
  });
}

// 获取商品订单数据
export function getOrderData(params) {
  return new Promise((resolve, reject) => {
    fetch('/getOrderMsg', 'get', params).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    })
  });
}