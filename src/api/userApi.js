import fetch from './fetch';

// 用户登录
export async function userLogin(params) {
  return await fetch('/getMsg', 'get', params);
}

// 用户注册
export async function userRegister(params) {
  return await fetch('/addMsg', 'post', params);
}

// 验证用户昵称是否存在
export async function validationUser(params) {
  return await fetch('/getMsg', 'get', params);
}

// 添加商品到用户购物车
export async function addUserShopCart(params) {
  return await fetch('/addMsg', 'post', params);
}

// 添加商品到用户收藏
export async function addUserCollection(params) {
  return await fetch('/addMsg', 'post', params);
}

// 验证该商品是否加入到收藏
export async function shopJudgeCollection(params) {
  return await fetch('/getMsg', 'get', params);
}