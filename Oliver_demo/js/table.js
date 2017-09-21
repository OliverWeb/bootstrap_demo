//进行表格添加//进行表格添加
$("#add_pool").click(function() {
  if($(".pool_edit").length>0){
    var did_creat=$(".pool_edit");
    console.log(did_creat.length);
    var did_creat_key= $(did_creat[did_creat.length-1]).attr("key");
  }else{
    did_creat_key=-1
  }

  // for(var i=0;i<did_creat.length;i++){
  //   var did_creat_key=$(did_creat[i].find("span").attr("key"));
  // }

  var add_pool = `<tr class="">
                    <td class="" width="45%">
                        <div class="" style="width:30%;display:inline-block;">
                          <input class="form-control" type="text" name="id" value="" placeholder="请输入名称">
                        </div>
                        <a class="pool_delete" href="javascript:;">
                          <span class="label label-danger">Delete</span>
                        </a>
                    </td>
                    <td><a class="pool_edit" key=${did_creat_key+1} href="javascript:;"><span class="label label-success">Edit</span></a></td>
                    <td><a class="pool_view" href="javascript:;"><span class="label label-primary">Detail</span></a></td>
                  </tr>`;
  $('#pool_name_set').append(add_pool);
});
//表格删除
$("body").on("click",".pool_delete",function() {
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
        setTimeout(function(){location.reload()},100);
      } else {
        console.log("取消");
      }
    }
  });

});

// 请求已加入的数据

// function did_data(){
//   var _data="no have data";
//   $.ajax({
//     url: "./json/pool.json",
//     contentType: "application/json",
//     type: "get",
//     // data:JSON.stringify({"name":name,"pwd":pwd}),
//     dataType: "json",
//     success:function(data){
//       _data=data;
//     },error:function(){
//       console.log(服务器异常);
//     }
//   });
//   return _data
// }
// did_data();
//模态框- 分片池设置, 进行选择已加入服务和未加入服务
$('body').on("click", ".pool_edit", function() {
  click_index=$(this).attr("key");
  $('#setModal').modal('show');
  title_value=$(this).parent().prev().find("input").val();   //用于提交数据用
  if($(this).attr("key")){
    var index=$(this).attr("key");
  }else{
    var index=-1;   //判断是页面的初始数据还是新增的数据
  }
  $.ajax({     //返回所有池的名称
    url: "./json/pool_all.json",
    contentType: "application/json",
    type: "get",
    // data:JSON.stringify({"name":name,"pwd":pwd}),
    dataType: "json",
    success:function(data){
    if(index!=-1){     //页面初始数据
      var data_did=_data[index].servers;
      console.log("已经加入的数据的个数:"+data_did.length);    //已加入数据的个数
      console.log("这里数据总的个数:"+data.servers.length); //总的数据个数
      var data_no=data.servers.filter(
      function(e){ return data_did.indexOf(e) < 0;
      });
    }else{data_did=[];data_no=data.servers;}
    console.log("未加入数据的个数"+data_no.length);  //未加入的数据的个数
    //将未加入的数据进行遍历
    data_no.map(function(value,key){
        $('.multi-select').append($("<option value='" +
          value +
          "'"  +
          "selected"+
          ">" +
           value+
          "</option>"));
    });
    $('.multi-select').multiSelect('refresh'); //刷新多选下拉标签
    },
    error:function(){
      console.log("服务器异常");
    }
  });
  if(index!=-1){
    $('.pool_name_title').html(_data[index].key);
    $('.multi-select').empty();//清空下拉标签
    _data[index].servers.map(function(value,key){
        $('.multi-select').append($("<option value='" +
          value +
          "'"  +
          ">" +
           value+
          "</option>"));
    });
  }else{
    $('.multi-select').empty();//清空下拉标签
  }
  $('.multi-select').multiSelect('refresh'); //刷新多选下拉标签

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
 console.log("key:"+click_index);
  var servers = [];//提交数组
  var did_join_html=$(".ms-elem-selectable:visible").find('span');
  console.log(did_join_html.length);
  for(var i=0;i<(did_join_html.length);i++){
    console.log($(did_join_html[i]).html());
    servers.push($(did_join_html[i]).html());
  }
  //数据进行去重
    var did_arr=_data[click_index].servers;
    servers=data.servers.filter(
    function(e){ return did_arr.indexOf(e) < 0;
    });
  var poolName = title_value;
  console.log(poolName);
  var datas = "poolname=" + poolName+"&"+"servers="+servers;
  $.ajax({
    type: "POST",
    dataType: "json", //服务端接收的数据类型
    url: "/users/login",
    data: datas,
    success: function(result) {
      console.dir(result); //打印服务端返回的数据(调试用)
      if (result.resultCode == 200) {
        console.log("SUCCESS");
      };
    },
    error: function() {
       console.log("提交异常");
    }
  });
};
$('body').on("click", ".pool_submit_btn", function() {
  fenpianchi_submit();
  location.reload();
});
//分片池首页的请求加载  start

function pool_name_list() {
  $('.pool_set_box').empty();
  $.ajax({
    url: "./json/pool.json",
    contentType: "application/json",
    type: "get",
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
        $('.pool_set_box').append(pool_name_html);
      });
    },
    error: function() {
      console.log("服务器异常");
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
