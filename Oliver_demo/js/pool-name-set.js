var pageContext = document.location.pathname.substr(0,document.location.pathname.substr(1).indexOf("/")+1);   //获取的根路径操作
// todo 进行表格添加//进行表格添加
$("#add_pool").click(function() {
  if($(".pool_edit").length>0){
    var did_creat=$(".pool_edit");
    console.log(did_creat.length);
    did_creat_length=did_creat.length;
  }else{
	  did_creat_length=0;
  }
  var add_pool = `<tr class="">
                    <td class="" width="45%">
                        <div class="" style="width:30%;display:inline-block;">
                          <input class="form-control pool_input_name" type="text" name="id" value="" placeholder="请输入名称">
                        </div>
                        <a class="pool_delete" href="javascript:;" key=${did_creat_length}>
                          <span class="label label-danger" >Delete</span>
                        </a>
                    </td>
                    <td><a class="pool_edit" key=${did_creat_length} href="javascript:;"><span class="label label-success">Edit</span></a></td>
                    <td><a class="pool_view" key=${did_creat_length} href="javascript:;"><span class="label label-primary">Detail</span></a></td>
                  </tr>`;
  $('#pool_name_set').append(add_pool);
});
//表格删除请求
$("body").on("click",".pool_delete",function() {
  var _this = this;
  var delete_key=$(this).attr("key");
	var datas= "poolname="+$(this).prev().find("input").val()+"&mcroutersetupname=sharededpools";
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
	      if(delete_key<_data_length){
		      $.ajax({
		       type: "POST",
		       dataType: "json", //服务端接收的数据类型
		       url: pageContext,               // todo   点击删除   进行提交地址
		       data: datas,
		       success: function(result) {
		          console.log(result);
			         $(_this).parent().parent().remove();
			         setTimeout(function(){location.reload()},100);
		       },
		       error: function() {
		         console.log("删除提交异常");
		       }
		      });
	      }else{
		      $(_this).parent().parent().remove();
	      }
      } else {
        console.log("取消");
      }
    }
  });

});
//未加载数据进行处理方法;
function join_server(){
	$.ajax({     //返回所有池的名称
		url:"./json/pool_all.json",         // todo 请求所有池数据  变量:pageContext
		contentType: "application/json",
		type: "get",
		// data:JSON.stringify({"name":name,"pwd":pwd}),
		dataType: "json",
		success:function(data){
			if(data.status=="success"){
				data=data.message;
				console.log(data);
				if(click_index!=-1){     //页面初始数据     新添加的数据,未加载的要进行全部显示
					if(click_index+1>_data_length) {
						console.log("进来了");
						data_no=data.servers;
					}else{
						var data_did = _data_server_list;
						console.log("已经加入的数据的个数:" + data_did.length);    //已加入数据的个数
						console.log("这里数据总的个数:" + data.servers.length); //总的数据个数
						var data_no = data.servers.filter(
							function (e) {
								return data_did.indexOf(e) < 0;
							});
					}
				}else{
					console.log("数据被清空");
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

			}else{
				alert(data.message);
			}

		},
		error:function(){
			console.log("服务器异常");
		}
	});
}
//模态框- 分片池设置, 进行选择已加入服务和未加入服务
$('body').on("click", ".pool_edit", function() {        //点击编辑按钮进行操作的
  pool_input_name=$(this).parent().prev().find('.pool_input_name').val();
	$('.pool_name_title').val(pool_input_name);
  $('#setModal').modal('show');
  title_value=$(this).parent().prev().find("input").val();   //用于提交数据用
  if($(this).attr("key")){
	  click_index=parseFloat($(this).attr("key"));
  }else{
    click_index=-1;   //判断是页面的初始数据还是新增的数据
  }
  //点击编辑进行当前数据已加入的数据进行展示
	_data_server_list=[];   //在提交之前进行编辑
	$('.multi-select').empty();
	console.log("清空处理");

	if(pool_input_name){
		$.ajax({
			type: "POST",
			dataType: "json", //服务端接收的数据类型
			url: "./json/pool_name.json",               // 用pool_name 进行请求地址
			data: "poolname="+pool_input_name,
			success: function(data) {
				if(data.status=="success"){
					data=data.message;
					_data_server_list=data;       //这里_data为
					if(click_index!=-1){                  //得到总的key值
						$('.multi-select').empty();//清空下拉标签
						if(_data_length>click_index){
							console.log("点击的下标:"+click_index);      //对已添加的数量进行判断
							_data_server_list.map(function(value,key){
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
				}else{
					alert(data.message);
				}

			},
			complete:function(){
				join_server();     //加载去servers列表数据请求
			},
			error: function() {
				console.log("编辑获取提交异常");
			}
		});
	}else{
		console.log("数据为空");
		join_server();   //加载去servers列表数据请求
	}
	// _data_server_list=["192.168.177.155:9527 ", "192.168.177.159:9528 "];


  $('.multi-select').multiSelect('refresh'); //刷新多选下拉标签

});
//  todo 查看加入列表信息 信息模态框
$('body').on("click", ".pool_view", function() {
	$('.view_list').empty();
	$('#viewModal').modal('show');
	var view_key=$(this).attr("key");   //点击的key值
	pool_input_name_view=$(this).parent().prev().prev().find('.pool_input_name').val();
	console.log(pool_input_name_view);
	_data_server_list=[];
	if(pool_input_name_view){
		$.ajax({
			type: "POST",
			dataType: "json", //服务端接收的数据类型
			url: "./json/pool_name.json",               // 用poolname获取servers进行请求地址(用户查看信息)
			data: "poolname="+pool_input_name_view,
			success: function(data) {
				if(data.status=="success"){
					data=data.message;
					_data_server_list=data;           //这里_data为
					if(view_key<_data_length){
						_data_server_list.map(function(value, key) {
							var view_list =`<li>${value}</li>`;
							$('.view_list').append(view_list);
						});
					}
				}else{
					alert(data.message);
				}

			},
			error: function() {
				console.log("提交异常");
			}
		});
	}
	// _data_server_list=["192.168.177.152:9526 ", "192.168.177.159:9527 "];
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
  var poolName = $(".pool_name_title").val();
	if(click_index<_data_length){
		var  old_dataservers=_data_server_list;
		var old_poolname=pool_input_name;
		var datas = "poolname=" + poolName+"&"+"servers="+servers+"&"+"old_poolname="+old_poolname+"&"+"old_dataservers="+old_dataservers;   //把原先存在的数据加上
	}else{
		var datas = "poolname=" + poolName+"&"+"servers="+servers;     //如果在原先的数据进行修改的时候,把原先数据也进行提交
	}
  // var datas={"'poolname'":poolName,"'servers'":servers};
  console.log(datas);
  $.ajax({
    type: "POST",
    dataType: "json", //服务端接收的数据类型
    url: pageContext,               // todo  点击保存提交的请求地址
    data: datas,
    success: function(result) {
      cnsole.log("保存成功");
    },
	  complete:function () {
		  location.reload();        //保存后进行刷子你页面
	  },
    error: function() {
       console.log("提交异常");
    }
  });
};
$('body').on("click", ".pool_submit_btn", function() {
	fenpianchi_submit();          //分片次进行提交
});

/*分片次第一次加载pool_name*/
function pool_name(){
	$('.pool_set_box').empty();
	$.ajax({
		url: "./json/pool_name.json",                // todo 第一次仅请求池的名称地址--- 路径:pageContext
		contentType: "application/json",
		type: "get",
		// data:JSON.stringify({"name":name,"pwd":pwd}),
		dataType: "json",
		success: function(data){
			if(data.status=="success"){
				data=data.message;
				_data_length=data.length;     //返回数据的长度
				data.map(function(value, key) {
					var pool_name_html =`  <tr class="pool_set">
              <td class="" width="45%">
                  <div class="" style="width:30%;display:inline-block;">
                      <form  id="pool" class="" method="post">
                        <input disabled="disabled" name="poolNameb" class="form-control pool_input_name" type="text" value="${value.substring(value.lastIndexOf("/")+1)}" placeholder="请输入名称">
                      </form>
                  </div>
                  <a class="pool_delete" href="javascript:;" key=${key}><span class="label label-danger" >Delete</span></a>
              </td>
              <td><a class="pool_edit" key=${key} href="javascript:;"><span class="label label-success">Edit</span></a></td>
              <td><a class="pool_view" key=${key} href="javascript:;"><span class="label label-primary">Detail</span></a></td>
            </tr>`;
					$('.pool_set_box').append(pool_name_html);
				});
			}else{
				alert(data.message);
			}

		},
		error: function() {
			console.log("服务器异常");
		}
	});
}
// todo 页面刚开始加载时候的执行的函数
$(function() {
	pool_name();
});
//分片池首页的请求加载  end

