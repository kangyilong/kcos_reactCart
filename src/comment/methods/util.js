// 获取链接入参
export function getParamUrl(url) {
  var reg = new RegExp('(^|&)' + url + '=([^&]*)(&|$)', 'i');
  let lotion = window.location.search;
  var r = lotion.substr(1).match(reg);
  if (r != null) return decodeURIComponent(r[2]);
  return '';
}