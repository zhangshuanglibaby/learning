//获取元素
let box = document.querySelector('#box');
let ul = document.querySelector('ul')
let btn = document.querySelector('#btn');

//创建一个数组
let arr = ['胡图图', '图图妈', '图图爸', '小怪', '图图爷爷', '图图外婆', '小美', '刷子', '壮壮', '小豆丁', '大虎', '王子', '小美妈', '健康哥哥', '壮壮妈', '豆丁妈', '牛爷爷', '宠物店老板', '哪吒', '太乙真人', '小猪熊', '小龙女', '李靖', '山鬼', '雷震子', '姜子牙', '女娲', '申公豹', '妲己', '熊大', '熊二', '光头强', '李老板', '吉吉', '毛毛', '涂涂', '萝卜头', '猪猪侠', '菲菲', '小呆呆', '迷糊老师', '超人强'];

//动态展示数据
for (let i = 0; i < arr.length; i++) {
  ul.innerHTML += `<li>${arr[i]}</li>`
}

btn.onclick = function () {
  if (this.value === '开始抽奖') {
    //设置定时器
    timeId = setInterval(() => {
      //利用排他,先清空所有颜色
      for (let k = 0; k < arr.length; k++) {
        ul.children[k].style.backgroundColor = '';
      }     
      //设置随机数字
      let randomColor = parseInt(Math.random() * arr.length);
      //留下当前的颜色
      ul.children[randomColor].style.backgroundColor = 'orange';
      this.value = '停止';
    }, 10);
  } else {
    //清除定时器
    clearInterval(timeId);
    this.value = '开始抽奖'
  }
}