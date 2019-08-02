$('#tbody').on('click', 'a:last-child', function () {
  //删除要在用户点击确认后再操作
  if (!confirm('确认删除吗?')) {
    return;
  };
  //获取id
  let id = $(this).attr('data-id');
  //利用闭归保存指向这里的this
  let _this = this;
  //发送ajax
  $.ajax({
    type : 'get',
    url : 'http://127.0.0.1:8080/deleteHeroById',
    data : {id},
    success : function(res) {
      if(res.code === 200) {
        $(_this).parents('tr').remove();
        alert('删除成功');
      }
    }
  })
})