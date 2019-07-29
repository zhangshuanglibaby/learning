$('#sub').on('click',() =>{
    //收集数据
    let data = $('#myform').serialize();
    // console.log(data);//data是url编码
    //发送ajax
    $.ajax({
        type : 'post',
        url : 'http://127.0.0.1:8080/addHero',
        data,
        dataType : "json",
        success : function(res) {
            if(res.code === 200) {
                alert(res.msg);
            }
        }
    })
} )


