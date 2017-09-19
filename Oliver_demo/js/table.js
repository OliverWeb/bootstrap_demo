//进行表格添加//进行表格添加
$("#add_pool").click(function() {
  var add_pool = `<tr class="">
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
$(".pool_delete").click(function() {
  var _this = this;
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
    callback: function(result) {
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
$('body').on("click", ".pool_edit", function() {
  $('#setModal').modal('show');
  var key=$(this).attr("key");
  console.log(_data[key].key);
  console.log(key);
});
// 产看信息模态框
$('body').on("click", ".pool_view", function() {
  $('#viewModal').modal('show');
});
//键盘按键弹起时执行
//键盘按键弹起时执行
$(function() {
  view_result = [];
  _view_result = [];
  $('.view_list li').each(function(index) {
    view_result.push($(this).html());
    _view_result.push($(this).html());
  });
  view_result.sort();
  _view_result.sort();
});
function viewsearch() {
  var str = $.trim($('#view_detail').val().toString()); //去掉两头空格
  if (str == '') {
    $(".view_list").empty();
    for (var key in _view_result) {
      $(".view_list").append("<li>" + view_result[key] + "</li>");
    }
    return false;
  }
  $(".view_list").empty();
  for (var key in view_result) {
    if (view_result[key].indexOf(str) != -1) {
      $(".view_list").append("<li>" + view_result[key] + "</li>");
    }
  }
};

//异步进行提交分片池配置
function fenpianchi_submit() {
  var poolName = $('#poolName').val();
  var datas = "poolname=" + poolName + "&" + $.ajax({
    type: "POST", dataType: "json", //服务端接收的数据类型
    url: "/users/login",
    data: datas,
    success: function(result) {
      console.dir(result); //打印服务端返回的数据(调试用)
      if (result.resultCode == 200) {
        alert("SUCCESS");
      };
    },
    error: function() {
      alert("异常！");
    }
  });
};
$('body').on("click", ".pool_submit_btn", function() {
  fenpianchi_submit();
});
//分片池首页的请求加载  start

function pool_name_list() {
  $('.pool_set_box').empty();
  $.ajax({
    url: "./json/pool.json", contentType: "application/json", type: "get",
    // data:JSON.stringify({"name":name,"pwd":pwd}),
    dataType: "json",
    success: function(data) {
      _data=data;
      data.map(function(value, key) {
        var pool_name_html =`  <tr class="pool_set">
              <td class="" width="45%">
                  <div class="" style="width:30%;display:inline-block;">
                      <form  id="pool" class="" action="index.html" method="post">
                        <input disabled="disabled" name="poolNameb" class="form-control" type="text" value="${value.key}" placeholder="请输入名称">
                      </form>
                  </div>
                  <a class="pool_delete" href="javascript:;">
                    <span class="label label-danger">Delete</span>
                  </a>
              </td>
              <td><a class="pool_edit" key=${key} href="javascript:;"><span class="label label-success">Edit</span></a></td>
              <td><a class="pool_view" href="javascript:;"><span class="label label-primary">Detail</span></a></td>
            </tr>`;
        console.log(value.key);
        $('.pool_set_box').append(pool_name_html);
      });
    },
    error: function() {
      alert("服务器异常");
    }
  });
}
$(function() {
  pool_name_list();
});
//分片池首页的请求加载  end

//左右选择框加载数据
// function load(mslt_employees,belongto,mark) {//传入$(#ID)
// 2             var jsondata = JSON.stringify({ belongto: 1, username: username });
// 3             var emp = null;
// 4             jQuery.ajax({
// 5                 type: 'POST',
// 6                 url: "../tools/employees_ajax.ashx?action=" + action + "",
// 7                 dataType: "json",//返回JSON对象
// 8                 data:jsondata,//上传JSON格式的参数
// 9                 cache: false,
// 10                async:false,//异步执行
// 11                 success: function (message) {
// 12                     mslt_employees.empty();//清空下拉标签
// 13                     if (message != "0" && message != "none") {
// 14                         var list = message;
// 15                         for (var i = 0; i < list.length; i++) {
// 16                             if (mark == 1) {
// 17                                 if (belongto != 1) {//设置默认选项
// 18                                     mslt_employees.append($("<option value='" + list[i].USERNAME + "' disabled = 'disabled'>" + list[i].USERNAME + "</option>"));
// 19                                 } else {
// 20                                     mslt_employees.append($("<option value='" + list[i].USERNAME + "'>" + list[i].USERNAME + "</option>"));
// 21                                 }
// 22                             } else {
// 23                                 mslt_employees.append($("<option value='" + list[i].USERNAME + "'>" + list[i].USERNAME + "</option>"));
// 24                             }
// 25                             if (i == 0) { emp = list[i].USERNAME;
//                                 } else {
// 26                                 emp = emp + "," + list[i].USERNAME;
// 27                             }
// 28                         }
// 29                     }
// 30                     mslt_employees.multiselect('refresh');//刷新多选下拉标签
// 31                 }, error: function () { return null; }
// 32             });
// 33             return emp;//返回值
// 34         }
//
// $(".ms-elem-selection:hidden")  在未选中列表中的选着隐藏的元素进行提交;
$('.multi-select').append($("<option value='" +
  "AA" +
  "'" +
  "selected" +
  ">" +
  "AAAAAAAAA" +
  "</option>"));
$('.multi-select').multiSelect('refresh'); //刷新多选下拉标签
