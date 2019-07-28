/**
 * 需要封装一个收集表单数据的方法
 * 步骤 ：1.获取表单元素 --- 一个选择器
 *       2.获取该表单下所有带name属性的后代元素
 *       3.遍历后代元素,组成name = value
 */

function serialize(formSelector) {
  let form = document.querySelector(formSelector);
  let eles = form.querySelectorAll('[name]');
  //创建一个空数组
  let arr = [];
  //由于单选框的值只能有一个,因此要判断
  //遍历eles
  eles.forEach(e => {
    if (e.type === 'radio' && e.checked) {
      let key = e.name;
      let val = e.value;
      arr.push(key + '=' + val);
    }
    if (e.type !== 'radio') {
      let key = e.name;
      let val = e.value;
      arr.push(key + '=' + val);
    }
  });
  //利用数组的jion方法
  return arr.join('&')
}

//注册点击新增事件
let btn = document.querySelector('#sub');
btn.onclick = function() {
  //收集表单数据
  let data = serialize('#myform');
  //发送ajax请求
  let xhr = new XMLHttpRequest();
  xhr.open('get','http://127.0.0.1:8080/addHero?' + data);
  xhr.send();
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
      let res = JSON.parse(xhr.responseText);
      if(res.code === 200) {
        alert(res.msg);
      }
    }
  }
}