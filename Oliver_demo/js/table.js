//进行表格添加//进行表格添加
$("#add_pool").click(function() {
  var add_pool =`<tr class="">
                    <td class="" width="45%">
                        <div class="" style="width:30%;display:inline-block;">
                          <input class="form-control" type="text" name="id" value="" placeholder="请输入名称">
                        </div>
                        <a class="pool_delete" href="javascript:;">
                          <span class="label label-danger">Delete</span>
                        </a>
                    </td>
                    <td><a class="pool_edit" href="javascript:;"><span class="label label-success">Edit</span></a></td>
                    <td><a class="pool_view" href="javascript:;"><span class="label label-primary">Detail</span></a></td>
                  </tr>`;
  $('#pool_name_set').append(add_pool);
});
//表格删除
$(".pool_delete").click(function(){
  var _this=this;
  bootbox.confirm({
      message: "是否确认删除池?如果是请点击Yes否则点击No!",
      buttons: {
          confirm: {
              label: 'Yes',
              className: 'btn-success'
          },
          cancel: {
              label: 'No',
              className: 'btn-danger'
          }
      },
      callback: function (result) {
          console.log('This was logged in the callback: ' + result);
          if (result) {
            console.log($(_this).parent().parent().remove());
          } else {
            console.log("取消");
          }
      }
  });

});
//模态框- 分片池设置
// $('.pool_edit').click(function(){
//
//     $('#setModal').modal('show');
// });
$('body').on("click",".pool_edit",function(){

    $('#setModal').modal('show');
});
// 产看信息模态框
$('body').on("click",".pool_view",function(){
  $('#viewModal').modal('show');
});
//键盘按键弹起时执行
//键盘按键弹起时执行
$(function(){
　　 view_result=[];
      _view_result=[];
    $('.view_list li').each(function(index){
        view_result.push($(this).html());
        _view_result.push($(this).html());
    });
    view_result.sort();
    _view_result.sort();
});
	function viewsearch(){
		var str = $.trim($('#view_detail').val().toString());//去掉两头空格
		if( str == ''){
      $(".view_list").empty();
      for(var key in _view_result){
          $(".view_list").append("<li>"+view_result[key]+"</li>");
      }
			return false;
		}
    $(".view_list").empty();
    for(var key in view_result){
      if(view_result[key].indexOf(str)!=-1){
        $(".view_list").append("<li>"+view_result[key]+"</li>");
      }
    }
	};

//异步进行提交分片池配置
function fenpianchi_submit() {
    var poolName= $('#poolName').val();
    var datas="poolname="+poolName+"&"+
      $.ajax({
        type: "POST",
        dataType: "json",//服务端接收的数据类型
        url: "/users/login" ,
        data: datas,
        success: function (result) {
          console.log(result);//打印服务端返回的数据(调试用)
          if (result.resultCode == 200) {
            alert("SUCCESS");
          }
          ;
        },
        error : function() {
          alert("异常！");
        }
      });
};
$('body').on("click",".pool_submit_btn",function(){
  fenpianchi_submit();
});
// var str='3,4,5,6';
// var arr=str.split(',');
// $('#my_multi_select3').selectpicker('val', arr);
// $("#my_multi_select3").append($("<option value=" + ">" + AA + "</option>"));
// $('.multi-select').selectpicker();
                //
                // var optionString = "";
                //
                // for (i = 0; i <3; i++) {
                //     optionString += "<option value=\'"+"AA" +"\'>" + "AAAA" + "</option>";
                // }
                // console.log(optionString);
                // var myobj = document.getElementById("my_multi_select3");
                // if (myobj.options.length == 0)
                // {
                //     $("#my_multi_select3").html(optionString);
                //     $("#my_multi_select3").selectpicker('refresh');
                // }
