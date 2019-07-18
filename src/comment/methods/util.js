import { wantShopData } from '../../api/shopApi';
import cityData from './city';

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
export async function isLogin() {
  let userId = sessionStorage.getItem('isLogin');
  let statements = `SELECT * FROM userMsg WHERE user_id = '${userId}'`;
  return await wantShopData({statements});
}

// 获取用户ID
export function getUserId() {
  return sessionStorage.getItem('isLogin');
}

// 退出登录
export function outLogin() {
  sessionStorage.clear();
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
        obj[data[i][id]] = `${i}`;
      }
    }
    return arr;
  }else {
    return '';
  }
}

// 日期格式化
export function formatDate(date, fmt = 'yyyy-MM-dd') {
    if(!date) {
        return null;
    }
    date = new Date(date);
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

// 将数组中对象相同id的合并为对象中一项
export function toMergeFn(data, id) {
  if(Array.isArray(data)) {
    let i = 0, len = data.length;
    let targetObj = {};
    let obj = {};
    for(i; i < len; i ++) {
      if(!obj[data[i][id]]) {
        targetObj['option'+i] = [...data[i]];
        obj[data[i][id]] = `${i}`;
      }else {
        targetObj['option'+i] = [data[i], ...targetObj['option'+i]];
      }
    }
    return targetObj;
  }
  return 'NOT ARRAY';
}

// 处理城市信息
export function getCityData() {
  cityData.map(pItem => {
    let name = pItem['name'];
    pItem['label'] = name;
    pItem['value'] = name;
    if(pItem['sub']) {
      pItem['children'] = pItem['sub'].map(cItem => {
        cItem['label'] = cItem['name'];
        cItem['value'] = cItem['name'];
        if(cItem['sub']) {
          cItem['children'] = cItem['sub'].map(item => {
            item['label'] = item['name'];
            item['value'] = item['name'];
            delete item['sub'];
            delete item['name'];
            return item;
          })
        }
        delete cItem['sub'];
        delete cItem['name'];
        return cItem;
      })
    }
    delete pItem['sub'];
    return pItem;
  });
  return cityData;
}