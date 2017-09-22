var pageContext = document.location.pathname.substr(0,document.location.pathname.substr(1).indexOf("/")+1);   //获取的根路径操作
// todo 进行表格添加//进行表格添加
$("#add_pool").click(function() {
  if($(".pool_edit").length>0){
    var did_creat=$(".pool_edit");
    console.log(did_creat.length);
    did_creat_length=did_creat.length;
    // var did_creat_key= $(did_creat[did_creat.length-1]).attr("key");
  }else{
	  did_creat_length=0;
  }

  // for(var i=0;i<did_creat.length;i++){
  //   var did_creat_key=$(did_creat[i].find("span").attr("key"));
  // }

  var add_pool = `<tr class="">
                    <td class="" width="45%">
                        <div class="" style="width:30%;display:inline-block;">
                          <input class="form-control pool_input_name" type="text" name="id" value="" placeholder="请输入名称">
                        </div>
                        <a class="pool_delete" href="javascript:;">
                          <span class="label label-danger">Delete</span>
                        </a>
                    </td>
                    <td><a class="pool_edit" key=${did_creat_length} href="javascript:;"><span class="label label-success">Edit</span></a></td>
                    <td><a class="pool_view" key=${did_creat_length} href="javascript:;"><span class="label label-primary">Detail</span></a></td>
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
//模态框- 分片池设置, 进行选择已加入服务和未加入服务
$('body').on("click", ".pool_edit", function() {        //点击编辑按钮进行操作的
  var pool_input_name=$(this).parent().prev().find('.pool_input_name').val();
	$('.pool_name_title').val(pool_input_name);
  $('#setModal').modal('show');
  title_value=$(this).parent().prev().find("input").val();   //用于提交数据用
  if($(this).attr("key")){
	  click_index=$(this).attr("key");
    var index=$(this).attr("key");
  }else{
    var index=-1;   //判断是页面的初始数据还是新增的数据
  }
  $.ajax({     //返回所有池的名称
    url: "./json/pool_all.json",               // todo 请求所有池数据
    contentType: "application/json",
    type: "get",
    // data:JSON.stringify({"name":name,"pwd":pwd}),
    dataType: "json",
    success:function(data){
    if(index!=-1){     //页面初始数据     新添加的数据,未加载的要进行全部显示
      if(index+1>_data_length) {
	      data_no=data.servers;
      }else{
	      var data_did = _data[index].servers;
	      console.log("已经加入的数据的个数:" + data_did.length);    //已加入数据的个数
	      console.log("这里数据总的个数:" + data.servers.length); //总的数据个数
	      var data_no = data.servers.filter(
		      function (e) {
			      return data_did.indexOf(e) < 0;
		      });
      }
    }else{
      data_did=[];
      data_no=data.servers;
    }
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
  if(index!=-1){                  //得到总的key值
	  console.log("0:"+_data_length);
	  $('.multi-select').empty();//清空下拉标签
    if(_data_length>index){
	    console.log("点击的下标:"+index);      //对已添加的数量进行判断
	    _data[index].servers.map(function(value,key){
		    $('.multi-select').append($("<option value='" +
			    value +
			    "'"  +
			    ">" +
			    value+
			    "</option>"));
	    });
    }
  }else{
    $('.multi-select').empty();//清空下拉标签
  }
  $('.multi-select').multiSelect('refresh'); //刷新多选下拉标签

});
//  todo 查看假如列表信息 信息模态框
$('body').on("click", ".pool_view", function() {
	$('.view_list').empty();
	$('#viewModal').modal('show');
	var view_key=$(this).attr("key");   //点击的key值
	if(view_key<_data_length){
		_data[view_key].servers.map(function(value, key) {
			var view_list =`<li>${value}</li>`;
			$('.view_list').append(view_list);
		});
  }
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
};
//  todo 异步进行提交分片池配置
function fenpianchi_submit() {
 console.log("key:"+click_index);
  var servers = [];//提交数组
  var did_join_html=$(".ms-elem-selectable:visible").find('span');
  for(var i=0;i<(did_join_html.length);i++){
    servers.push( '"'+$(did_join_html[i]).html().toString()+'"');
  }
	console.log("servers:"+servers);
  var poolName = title_value;
  var datas = "poolname=" + poolName+"&"+"servers="+servers;
  // var datas={"'poolname'":poolName,"'servers'":servers};
  console.log(datas);
  $.ajax({
    type: "POST",
    dataType: "json", //服务端接收的数据类型
    url: pageContext,               // todo  保存提交地址
    data: datas,
    success: function(result) {
      console.dir(result); //打印服务端返回的数据(调试用)
      if (result.resultCode == 200) {
        console.log("SUCCESS");
        console.log(result);
      }
    },
    error: function() {
       console.log("提交异常");
    }
  });
};
$('body').on("click", ".pool_submit_btn", function() {
	fenpianchi_submit();
  //location.reload();        //保存后进行刷子你页面
});
//分片池配置首页的请求加载  start
function pool_name_list() {
  $('.pool_set_box').empty();
  $.ajax({
    url: "./json/pool.json",                // todo 刚进入页面的请求地址   路径:pageContext
    contentType: "application/json",
    type: "get",
    // data:JSON.stringify({"name":name,"pwd":pwd}),
    dataType: "json",
    success: function(data) {
      _data=data;      //这里把数据传给全局
	    _data_length=data.length;      //返回数据的长度
      data.map(function(value, key) {
        var pool_name_html =`  <tr class="pool_set">
              <td class="" width="45%">
                  <div class="" style="width:30%;display:inline-block;">
                      <form  id="pool" class="" method="post">
                        <input disabled="disabled" name="poolNameb" class="form-control pool_input_name" type="text" value="${value.key.substring(value.key.lastIndexOf("/")+1)}" placeholder="请输入名称">
                      </form>
                  </div>
                  <a class="pool_delete" href="javascript:;">
                    <span class="label label-danger">Delete</span>
                  </a>
              </td>
              <td><a class="pool_edit" key=${key} href="javascript:;"><span class="label label-success">Edit</span></a></td>
              <td><a class="pool_view" key=${key} href="javascript:;"><span class="label label-primary">Detail</span></a></td>
            </tr>`;
        $('.pool_set_box').append(pool_name_html);
      });
    },
    error: function() {
      console.log("服务器异常");
    }
  });
}
// todo 页面刚开始加载时候的执行的函数
$(function() {
  pool_name_list();
});
//分片池首页的请求加载  end

