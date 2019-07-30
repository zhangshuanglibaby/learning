//注册删除点击事件---利用事件委托
$('#tbody').on('click','a:last-child',function() {
    //交互尝试,要在确认点击后才执行操作
    if(!confirm('确定要删除吗')) {
        return;
    }
    //获取id
    let id = $(this).attr('data-id');
    let _this = this;
    //发送ajax
    $.ajax({
        type : 'get',
        url : 'http://127.0.0.1:8080/deleteHeroById',
        data : {id},
        success :function(res) {
            if(res.code === 200) {
                $(_this).parents('tr').remove();
                alert(res.msg);
            }
        }
    })
})