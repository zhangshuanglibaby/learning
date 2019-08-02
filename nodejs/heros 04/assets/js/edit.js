$('#sub').on('click', () => {
  //非空判断
  if ($('#name').val().trim().length === 0) {
    alert('用户名不能为空');
    return;
  }
  //收集数据
  let data = $('#form').serialize();
  //发送ajax请求
  $.ajax({
    type : 'post',
    url : 'http://127.0.0.1:8080/editHero',
    data,
    success : function(res) {
      if(res.code === 200) {
        alert(res.msg);
        location.href = '/index.html';
      }
    }
  })

})