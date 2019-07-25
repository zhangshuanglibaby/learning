var kits = {};


/**
 * 转换思路是：
        url参数长成： id=10086&name=goudan&pwd=123
        把url参数使用  &  割开，成为  [键=值,键=值...]
        再把数组里面的每个 键=值 再割开 ， [键,值]
 * */
kits.getUrlParams = function () {
  let arr = location.search.substring(1).split('&');
  let prams = {};
  arr.forEach(e=>{
      let temp = e.split('=');
      let key = temp[0];
      let val = temp[1];
      prams[key] = val;
  })
  return prams;
}