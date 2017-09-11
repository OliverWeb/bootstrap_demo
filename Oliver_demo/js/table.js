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
//模态框设置
//$('.pool_edit').click(function(){
    $('#myModal').modal('show');
//});
