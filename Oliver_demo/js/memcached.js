$(function () {
	/*获取链接*/
	var url = window.location.search;
//    alert(url.length);
//    alert(url.lastIndexOf('='));

	var mcrouerIpsIndex=url.indexOf('ip');
	if(mcrouerIpsIndex!=-1){
		url=url.substring(mcrouerIpsIndex);
		var 	IpsIndex=url.indexOf("&");
		if(IpsIndex!=-1){
			var IpValur=url.substring("ip".length+1,IpsIndex);
		}else{
			var IpValur=url.substring("ips".length+1);
		}
		$('.ipValue').html("mcrouter服务器 IP:"+IpValur);      //进行ip赋值
		/*赋值结束 end*/
	}
   /*页面加载请求*/
	$.ajax({
		type:"get",
		url:"./json/memcached.json",               //页面初次加载数据请求的地址   根路径pageContext
		success:function (data) {
			if(data.status=="success"){
				if(data.message!=""){
					data.message.map(function(value,key){
						var memcached_list=`
											    <tr>
											    <td><div class='openbox ${value.disabled==1?"on":"off"} '>${value.disabled==1?"已开启":"已禁用"}</div></td>
											    <td class="ipAddress">${value.ipAddress}</td>
											    <td class="port">${value.port}</td>
											    <td class="udpPort">${value.udpPort}</td>
											    <td class="memoryMaxSize">${value.memoryMaxSize}</td>
											    <td class="connectNum">${value.connectNum}</td>
											    <td class="user">${value.user}</td>
											    <td class="pidFile">${value.pidFile}</td>
											    <td style="width: 210px">
											    		<button type="button" class="modify btn btn-primary btn-sm">
													      修改<i class="fa fa-pencil-square-o">
													   </i>
													  </button>
													   <button type="button" class='btn btn-sm opneBtn ${value.disabled==1?"btn-success  on":"btn-default off"}'>
													  <span> ${value.disabled==1?"开启":"禁用"} </span><i class="glyphicon glyphicon-off">
													    </i>
													  </button>
													   <button type="button" class="view btn btn-sm btn-info">
													     查看<i class="fa fa-exclamation-circle">
													     </i>
													   </button>
                          </td>
											    </tr>`;
						$(".add_memcached_list").append(memcached_list);
					});
				}
			}else{}
			// console.log(data);
		},
		error:function (data) {
			console.log("获取数据异常");
		}
	});
	// memcached js
	$("#add_memcached").click(function(){  //点击添加的时候
		$('#add_memcached_modle').modal('show');
	});
	$("body").on("click",".modify",function(){     //点击编辑,修改
		$('#add_memcached_modle').modal('show');
		console.log($(this).parent().parent().find(".ipAddress").html());
		$("input.ipAddress").val( $(this).parent().parent().find(".ipAddress").html());
		$("input.port").val( $(this).parent().parent().find(".port").html());
		$("input.udpPort").val( $(this).parent().parent().find(".udpPort").html());
		$("input.memoryMaxSize").val( $(this).parent().parent().find(".memoryMaxSize").html());
		$("input.connectNum").val( $(this).parent().parent().find(".connectNum").html());
		$("input.user").val( $(this).parent().parent().find(".user").html());
		$("input.pidFile").val( $(this).parent().parent().find(".pidFile").html());
	});
	/*查看详情*/
	$('body').on("click",".view",function(){
		$("#ViewModal").modal('show');
		$.ajax({
			post:"get",
			url:"./json/memcachedView.json",
			success:function(data){
				if(data.status=="success"){
					if(data.message!=""){
						$("#evictions").val(data.message.evictions);
						$("#memory_usage").val(data.message.memory_usage);
						$("#threads").val(data.message.threads);
						$("#hit_rate").val(data.message.hit_rate);
						$("#miss_rate").val(data.message.miss_rate);
						$("#cmd_set").val(data.message.cmd_set);
						$("#read_rate").val(data.message.read_rate);
						$("#write_rate").val(data.message.write_rate);
						$("#rusage_user").val(data.message.rusage_user);
						$("#rusage_system").val(data.message.rusage_system);
						$("#curr_items").val(data.message.curr_items);
						$("#total_items").val(data.message.total_items);
						$("#curr_connection").val(data.message.curr_connection);
						$("#total_connection").val(data.message.total_connection);
					}
				}else{
					$('.tip-message').html(data.message);
					$('#messageModal').modal('show');
					setTimeout(function(){
						$('#messageModal').modal('hide');
					},1000);
				}
			},
			error:function(data){
				$('.tip-message').html("服务器异常!");
				$('#messageModal').modal('show');
				setTimeout(function(){
					$('#messageModal').modal('hide');
				},1000);
			}
		});
	});
  /*点击开启和关闭*/
	$('body').on('click','.opneBtn',function(){
		$(this).attr("disabled","disabled");
		var _this=this;
		$.ajax({
			url:"./json/mcrouter.json",                          //操作开启和关闭的的请求地址
			type:"get",
			success:function(data){
				if(data.status=="success"){
					$('.tip-message').html("设置成功!");
					if($(_this).hasClass("on")){     //判断是开启还是禁用
						$(_this).find("span").html("禁用");
						$(_this).removeClass("on btn-success").addClass("off btn-default");
						$(_this).parent().parent().first().find(".openbox").removeClass("on").addClass("off").html("已禁用");

					}else{
						$(_this).find("span").html("开启");
						$(_this).removeClass("off btn-default").addClass("on btn-success");
						$(_this).parent().parent().first().find(".openbox").removeClass("off").addClass("on").html("已开启");
					};
					$('#messageModal').modal('show');
					setTimeout(function(){
						$('#messageModal').modal('hide');
						// location.reload();
					},1000);
					$(_this).removeAttr("disabled");
				}else{
					$('.tip-message').html(data.message);
					$('#messageModal').modal('show');
					setTimeout(function(){
						$('#messageModal').modal('hide');
					},1000);
					// location.reload();
				}
			},
			error:function(){
				$('.tip-message').html("服务器异常");
				$('#messageModal').modal('show');
				setTimeout(function(){
					$('#messageModal').modal('hide');
				},1000);
			}
		});
	});
	$(".add_servers_memcached").click(function(){      //点击保存的时候
		if($("input.ipAddress").val()==""){      //所填内容的判断
			$('.tip-message').html("请将绑定ip填写完整!");
			$('#messageModal').modal('show');
			setTimeout(function(){
				$('#messageModal').modal('hide');
			},1000);
			return;
		}else if($("input.port").val()==""){
			$('.tip-message').html("请填写TCP端口!");
			$('#messageModal').modal('show');
			setTimeout(function(){
				$('#messageModal').modal('hide');
			},1000);
			return;
		}else if($("input.memoryMaxSize").val()==""){
			$('.tip-message').html("请填写内存!");
			$('#messageModal').modal('show');
			setTimeout(function(){
				$('#messageModal').modal('hide');
			},1000);
			return;
		}else if($("input.connectNum").val()==""){
			$('.tip-message').html("请填写连接数!");
			$('#messageModal').modal('show');
			setTimeout(function(){
				$('#messageModal').modal('hide');
			},1000);
			return;
		};
		var datas=$("form").serialize();
		if($("input.udpPort").val()!=""){
			datas=datas+"&udpPort="+$("input.udpPort").val();
		}
		if($("input.user").val()!=""){
			datas=datas+"&user="+$("input.user").val();
		}
		if($("input.pidFile").val()!=""){
			datas=datas+"&pidFile="+$("input.pidFile").val();
		}
		console.log(datas);
		data_ip=$('#ip1').val();
		// var dataArr=datas.split("&");
		// var parentObj=[];
		// dataArr.map(function(value,key){
		// 	childObj={};
		// 	var childArr=value.split("=");
		// 	childObj[childArr[0]]=childArr[1];
		// 	parentObj.push(childObj);
		// });
		// console.log(parentObj);
		$.ajax({
			type: "get",
			url: "./json/mcrouter.json",               //保存 添加memcachedd地址   根路径pageContext
			success: function (data) {
				if(data.status=="success"){
					$('#add_memcached_modle').modal('hide');
					$('.tip-message').html("保存成功");
					$('#messageModal').modal('show');
					setTimeout(function(){
						$('#messageModal').modal('hide');
						// location.reload();
					},1000);
				}else{
					$('#add_memcached_modle').modal('hide');
					$('.tip-message').html(data.message);
					$('#messageModal').modal('show');
					setTimeout(function(){
						$('#messageModal').modal('hide');
						// location.reload();
					},1000);
				}
			}
		});
	});

});



