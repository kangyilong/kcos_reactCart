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