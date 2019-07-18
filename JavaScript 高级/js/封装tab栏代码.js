//抽象出个类
class Tag {
  constructor(options) {
    /*
    在代码中会变化的的东西都可以说是对象的属性
    1.li的选择器  --> navSelector
    2.content的选择器 --> contentSelector
    3.事件类型 -- > type
    4.li的特殊类名  --> navClass
    5.content显示的类名  --> contentClass
    */
    //设置默认属性
    options = options || {};
    this.navSelector = options.navSelector || '.nav > li';
    this.contentSelector = options.contentSelector || '.row > .content';
    this.type = options.type || 'mouseover';
    this.navClass = options.navClass || 'active';
    this.contentClass = options.contentClass || 'show';
  }
  //封装鼠标移入方法
  addEvent() {
    //获取元素
    let lis = document.querySelectorAll(this.navSelector);
    let contents = document.querySelectorAll(this.contentSelector);
    //先用一个变量保存这里的this
    let _this = this;
    //注册鼠标移入事件
    lis.forEach((e, i) => {
      //方法里面推荐使用addEventListener的方法注册事件
      e.addEventListener(this.type, function () {
        //利用排他把每个li设置普通
        // lis.forEach(e => {
        //   e.classList.remove(_this.navClass);
        // })
        // //设置当前的自己妖艳
        // this.classList.add(_this.navClass);
        //调用changeNavClass 方法
        _this.changeNavClass(lis,this);
        //利用排他把每个图片都隐藏先
        // contents.forEach(e => {
        //   e.classList.remove(_this.contentClass);
        // })
        // //设置当前自己的内容显现
        // contents[i].classList.add(_this.contentClass);
        //调用 changeContentClass 方法
        _this. changeContentClass(contents,contents[i]);
      })
    })
  }

  //封装设置li类名的方法
  changeNavClass(lis,cunrrentLi) {
    lis.forEach(e => {
      e.classList.remove(this.navClass);
    })
    cunrrentLi.classList.add(this.navClass);
  }

  //封装设置content类名的方法
  changeContentClass(contents,currentContent) {
    contents.forEach(e => {
      e.classList.remove(this.contentClass);
    })
    currentContent.classList.add(this.contentClass);
  }
}