//进行表格添加//进行表格添加
$("#add_pool").click(function() {
  var add_pool = '<tr class=""><td class=""><input type = "text" name = "id" value = "1" ><a class="pool_delete" href="javascript:;"><span class="label label-danger">Delete</span></a></td><td>编辑服务器</td > <td>查看详细信息</td> </tr>';
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
$('.pool_edit').click(function(){

    $('#setModal').modal('show');
});
// 产看信息模态框
//$('.pool_view').click(function(){
    $('#viewModal').modal('show');
//});
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

		// //var parent = $('.search_view');
		// $('.view_list li').removeClass('on');
		// //选择包含文本框值的所有加上focus类样式，并把它（们）移到ul的最前面
		// //$(".view_list li").hide
		// //$(".view_list li").hide();
		// $(".view_list li:contains('" + index + "')").addClass("on");
	};
