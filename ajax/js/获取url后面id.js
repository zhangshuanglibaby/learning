let kits = {};

kits.getUrlParams = function () {
    let data = location.search.substring(1);
    //创建一个空对象
    let params = {};
    //切割data的&符号变成数组
    let arr = data.split('&');
    //遍历arr的每个元素,切割每个元素的'='
    arr.forEach(e => {
        let temp = e.split('=');
        let key = temp[0];
        let val = temp[1];
        params[key] = val;
    })
    return params;
}