function debounce(fn, delay) {
  let timer;
  return function(...args){
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
function throttle(fn, delay) {
  let timer;
  return function(...args) {
    !timer &&
      (timer = setTimeout(function() {
        fn.apply(this, args);
        timer = null;
      }, delay));
  };
}
// "yyyy/MM-dd hh(HH):mm:ss"
function formatDate(date, fmt) {
  function padLeftZero(str) {
    return ("00" + str).substr(str.length);
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "H+": date.getHours(),
    "h+": date.getHours()-12,
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}

export { debounce, throttle, formatDate };
