// 获取元素ID
export function getElementFn(id) {
  return document.getElementById(id);
}

// 获取路由参数
export function getQueryString(name, search) {
  search = search || window.location.search;
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = search.substr(1).match(reg);
  if (r !== null) {
    return decodeURIComponent(r[2]);
  }
  return '';
}

// 判断是否登录
export function isLogin() {
  return !!sessionStorage.getItem('isLogin');
}

// 获取用户ID
export function getUserId() {
  return sessionStorage.getItem('isLogin');
}

// 数组中对象取相同id的一条数据
export function toHeavyFn(data, id) {
  if(Array.isArray(data)) {
    let i = 0, len = data.length;
    let arr = [];
    let obj = {};
    for(i; i < len; i ++) {
      if(!obj[data[i][id]]) {
        arr.unshift(data[i]);
        obj[data[i][id]] = i;
      }
    }
    return arr;
  }else {
    return '';
  }
}