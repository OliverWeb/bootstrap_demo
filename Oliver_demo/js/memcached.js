var pageContext = document.location.pathname.substr(0, document.location.pathname.substr(1).indexOf("/") + 1);   //获取的根路径操作
var editType = "add";   //修改的类型
var addPort = "";     //端口号
function textExp(val, reg) {
	return reg.test(val);
}

// /*验证ip start*/
// function isValidIP(ip) {
// 	var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
// 	return reg.test(ip);
// }
//
// function valieIP() {
// 	var ip = $('.ipAddress').val();
// 	if (isValidIP(ip)) {
// 		console.log("有效");
// 	} else {
// 		$('.tip-message').html("请输入正确ip地址");
// 		$('#messageModal').modal('show');
// 		setTimeout(function () {
// 			$('#messageModal').modal('hide');
// 		}, 1000);
// 	}
// };
/*验证ip end*/
$(function () {
	/*获取链接*/
	var url = window.location.search;
	var mcrouerIpsIndex = url.indexOf('ip');
	if (mcrouerIpsIndex != -1) {
		url = url.substring(mcrouerIpsIndex);
		var IpsIndex = url.indexOf("&");
		if (IpsIndex != -1) {
			var IpValur = url.substring("ip".length, IpsIndex);
		} else {
			var IpValur = url.substring("ips".length);
		}
		$('.ipValue').html("memcached服务器 IP:" + IpValur);      //进行ip赋值
		/*赋值结束 end*/
		$('input.ipAddress').val(IpValur);
	}
	/*页面加载请求*/
	$.ajax({
		type: "get",
		url: "./json/memcached.json",               //页面初次加载数据请求的地址   根路径pageContext
		data: "memcached_ip=" + IpValur,
		success: function (data) {
			if (data.status == "success") {
				if (data.message != "") {
					data.message.sort(function(a,b){
						return a.port > b.port;
					});
					data.message.map(function (value, key) {
						var memcached_list = `
											    <tr>
											    <td><div class='openbox ${value.disabled == "1" ? "off" : "on"} '>${value.disabled == "1" ? "已禁用" : "已启用"}</div></td>
											    <td class="ipAddress">${value.ipAddress||""}</td>
											    <td class="port">${value.port||""}</td>
											    <td class="udpPort">${value.udpPort||""}</td>
											    <td class="memoryMaxSize">${value.memoryMaxSize||""}</td>
											    <td class="connectNum">${value.connectNum||""}</td>
											    <td class="user">${value.user||""}</td>
											    <!--<td class="pidFile">${value.pidFile||""}</td>-->
											    <td style="width: 220px">
											    		<button type="button" class="modify btn btn-primary btn-sm">
													      修改<i class="fa fa-pencil-square-o">
													   </i>
													  </button>
													  <button type="button" class='btn btn-sm openBtn ${value.disabled == "1" ? "btn-success  on" : "btn-default off"}'>
													  <span> ${value.disabled == "1" ? "开启" : "禁用"} </span><i class="glyphicon glyphicon-off">
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
			} else {
			}
			// console.log(data);
		},
		error: function (data) {
			console.log("获取数据异常");
		}
	});
	// memcached js
	$("#add_memcached").click(function () {  //点击添加的时候 add
		/*判断端口号是否已存在*/
		var portList = [];
		$('input.port').blur(function () {
			var targetPort = $('input.port').val();
			$(".add_memcached_list").find("tr").map(function (key, value) {
				portList.push($(value).find(".port").html());
			});
			portList.map(function (value, key) {
				if (value == targetPort) {
					$('.tip-message').html("TCP端口号已存在,请换一个!!");
					$('#messageModal').modal('show');
					setTimeout(function () {
						$('#messageModal').modal('hide');
					}, 1000);
				}
			});
		});
		/*判断是否已存在端口号 end */
		editType = "add";
		document.getElementById('server_form').reset();
		$('input.ipAddress').val(IpValur);   /*重置后对表单进行处理*/

		$('#add_memcached_modle').modal('show');
	});
	$("body").on("click", ".modify", function () {     //点击编辑,修改 edit
		// $('select.ipAddress').selectpicker('val', $(this).parent().parent().find(".ipAddress").html());
		addPort = $(this).parent().parent().find(".port").html();
		/*判断端口在列表中是否已经存在*/
		var portList = [];

		$('input.port').blur(function () {
			var targetPort = $('input.port').val();
			$(".add_memcached_list").find("tr").map(function (key, value) {
				portList.push($(value).find(".port").html());
			});
			portList.map(function (value, key) {
				if (value == targetPort && addPort != targetPort) {
					$('.tip-message').html("TCP端口号已存在,请更换一个!!");
					$('#messageModal').modal('show');
					setTimeout(function () {
						$('#messageModal').modal('hide');
					}, 1000);
				}
			});
		});

		/*判断端口在列表中是否已经存在 end*/
		$('#add_memcached_modle').modal('show');
		editType = "edit";
		// $("select.ipAddress").val($(this).parent().parent().find(".ipAddress").html());
		$("input.port").val($(this).parent().parent().find(".port").html());
		$("input.udpPort").val($(this).parent().parent().find(".udpPort").html());
		$("input.memoryMaxSize").val($(this).parent().parent().find(".memoryMaxSize").html());
		$("input.connectNum").val($(this).parent().parent().find(".connectNum").html());
		$("input.user").val($(this).parent().parent().find(".user").html());
		// $("input.pidFile").val($(this).parent().parent().find(".pidFile").html());
	});
	/*查看详情*/
	$('body').on("click", ".view", function () {
		if ($(this).prev().hasClass("off")) {
			$('.tip-message').html("服务器已停止，暂不支持查看具体信息`  !");
			$('#messageModal').modal('show');
			setTimeout(function () {
				$('#messageModal').modal('hide');
			}, 1000);
			return;
		}
		$("#ViewModal").modal('show');
		addPort = $(this).parent().parent().find(".port").html();
		var submitData = {
			"server": IpValur,
			"port": addPort,
			"command": "stats"
		};
		console.log(submitData);
		$.ajax({
			type: "get",
			url: "./json/memcachedView.json",      //查看详情的地址  ${pageContext.request.contextPath}/config/dashboard/command_exe
			// data:submitData,
			success: function (data) {
				if (data.status == "success") {
					if (data.message != "") {
						var dataM = data.message;
						$("#evictions").val(dataM.evictions);
						$("#memory_usage").val(dataM.memory_usage);
						$("#threads").val(dataM.threads);
						$("#hit_rate").val(dataM.hit_rate);
						$("#miss_rate").val(dataM.miss_rate);
						$("#cmd_set").val(dataM.cmd_set);
						$("#read_rate").val(dataM.read_rate);
						$("#write_rate").val(dataM.write_rate);
						$("#rusage_user").val(dataM.rusage_user);
						$("#rusage_system").val(dataM.rusage_system);
						$("#curr_items").val(dataM.curr_items);
						$("#total_items").val(dataM.total_items);
						$("#curr_connection").val(dataM.curr_connection);
						$("#total_connection").val(dataM.total_connection);
					}
				} else {
					$('.tip-message').html(data.message);
					$('#messageModal').modal('show');
					setTimeout(function () {
						$('#messageModal').modal('hide');
					}, 1000);
				}
			},
			error: function (data) {
				$('.tip-message').html("服务器异常!!");
				$('#messageModal').modal('show');
				setTimeout(function () {
					$('#messageModal').modal('hide');
				}, 1000);
			}
		});
	});
	/*点击开启和关闭*/
	$('body').on('click', '.openBtn', function () {
		$(this).attr("disabled", "disabled");
		var _this = this;
		addPort = $(this).parent().parent().find(".port").html();
		if ($(this).hasClass("on")) {
			operateUrl = "./json/mcrouter.json";     //""${pageContext.request.contextPath}/memcached/operation/start_memcached""
			var submitData = {
				"server": IpValur,
				"key": "/cache-center/nodes/memcached/" + IpValur + "/" + addPort
			};
		} else {
			operateUrl = "./json/mcrouter.json";    //"${pageContext.request.contextPath}/memcached/operation/stop_memcached"
			console.log("off");
			var submitData = {
				"server": IpValur,
				"port": addPort
			};
		}
		$.ajax({
			url: operateUrl,                          //操作开启和关闭的的请求地址
			type: "get",
			data: submitData,
			success: function (data) {
				if (data.status == "success") {
					$('.tip-message').html("设置成功!");
					if ($(_this).hasClass("on")) {     //判断是开启还是禁用
						$(_this).find("span").html("禁用");
						$(_this).removeClass("on btn-success").addClass("off btn-default");
						$(_this).parent().parent().first().find(".openbox").removeClass("off").addClass("on").html("已启用");

					} else {
						$(_this).find("span").html("开启");
						$(_this).removeClass("off btn-default").addClass("on btn-success");
						$(_this).parent().parent().first().find(".openbox").removeClass("on").addClass("off").html("已禁用");
					}
					;
					$('#messageModal').modal('show');
					setTimeout(function () {
						$('#messageModal').modal('hide');
						// location.reload();
					}, 1000);
					$(_this).removeAttr("disabled");
				} else {
					$('.tip-message').html(data.message);
					$('#messageModal').modal('show');
					setTimeout(function () {
						$('#messageModal').modal('hide');
					}, 1000);
					// location.reload();
				}
			},
			error: function () {
				$('.tip-message').html("服务器异常");
				$('#messageModal').modal('show');
				setTimeout(function () {
					$('#messageModal').modal('hide');

				}, 1000);
			}
		});
	});
	$(".add_servers_memcached").click(function () {      //  点击保存的触发事件 submit
		// if ($('.ipAddress').val()=="") {      //所填内容的判断
		// 	// $('.tip-message').html("请选择绑定IP");
		// 	// $('#messageModal').modal('show');
		// 	// setTimeout(function () {
		// 	// 	$('#messageModal').modal('hide');
		// 	// }, 1000);
		// 	// return;
		// } else
			if (!textExp($("input.port").val(), /^[0-9]+$/) || $("input.port").val()<1000 || $("input.port").val()>65535) {
			$('.tip-message').html("请正确填写TCP端口!");
			$('#messageModal').modal('show');
			setTimeout(function () {
				$('#messageModal').modal('hide');
			}, 1000);
			return;
		} else if (!textExp($("input.udpPort").val(), /^[0-9]*$/) || $("input.udpPort").val()<1000 || $("input.udpPort").val()>65535) {
			$('.tip-message').html("请正确填写UDP端口!");
			$('#messageModal').modal('show');
			setTimeout(function () {
				$('#messageModal').modal('hide');
			}, 1000);
			return;
		}
		else if (!textExp($("input.memoryMaxSize").val(), /^[0-9]+$/)) {
			$('.tip-message').html("请正确填写内存!");
			$('#messageModal').modal('show');
			setTimeout(function () {
				$('#messageModal').modal('hide');
			}, 1000);
			return;
		} else if (!textExp($("input.connectNum").val(), /^[0-9]+$/)) {
			$('.tip-message').html("请正确填写连接数!");
			$('#messageModal').modal('show');
			setTimeout(function () {
				$('#messageModal').modal('hide');
			}, 1000);
			return;
		} else if (!textExp($("input.user").val(), /^([_0-9A-Za-z]*)$/)) {
			$('.tip-message').html("请正确填写用户名,不能还有特殊字符!");
			$('#messageModal').modal('show');
			setTimeout(function () {
				$('#messageModal').modal('hide');
			}, 1000);
			return;
		}
		// else if ($("input.pidFile").val().indexOf("//") != -1) {
		// 	$('.tip-message').html("请正确填写PID文件路径!");
		// 	$('#messageModal').modal('show');
		// 	setTimeout(function () {
		// 		$('#messageModal').modal('hide');
		// 	}, 1000);
		// 	return;
		// };
		var submitValue = {};
		/*表单序列化,进行提交表单信息*/
		if($("input.ipAddress").val()!=""){
			submitValue.ipAddress = $("input.ipAddress").val();
		}
		if( $("input.port").val()!=""){
			submitValue.port = $("input.port").val();
		}
		if($("input.udpPort").val()!=""){
			submitValue.udpPort = $("input.udpPort").val();
		}
		if($("input.memoryMaxSize").val()!=""){
			submitValue.memoryMaxSize = $("input.memoryMaxSize").val();
		}
		if($("input.connectNum").val()!=""){
			submitValue.connectNum = $("input.connectNum").val();
		}
		if($("input.user").val()!=""){
			submitValue.user = $("input.user").val();
		}
		// if($("input.pidFile").val()!=""){
		// 	submitValue.pidFile = $("input.pidFile").val();
		// }
		submitValue.disabled = "1";
		console.log(submitValue);
		if (editType == "add") {
			var tcpport = $("input.port").val();
		} else {
			var tcpport = addPort;
		}
		var submitData = {
			"value": JSON.stringify(submitValue),
			"server": IpValur,
			"prefix": "/cache-center/nodes/memcached/" + IpValur + "/" + tcpport,
			"editType": editType
		};
		console.log(submitData);
		$.ajax({
			type: "get",
			url: "./json/mcrouter.json",               //保存 添加提交  根路径pageContext
			data: submitData,
			success: function (data) {
				if (data.status == "success") {
					$('#add_memcached_modle').modal('hide');
					$('.tip-message').html("保存成功");
					$('#messageModal').modal('show');
					setTimeout(function () {
						$('#messageModal').modal('hide');
						// location.reload();
					}, 1000);
				} else {
					$('#add_memcached_modle').modal('hide');
					$('.tip-message').html(data.message);
					$('#messageModal').modal('show');
					setTimeout(function () {
						$('#messageModal').modal('hide');
						// location.reload();
					}, 1000);
				}
			}
		});
	});

	/*ip列表的选择*/
	// var ipList="";
	// $.ajax({
	// 	post:"get",
	// 	url:"./json/iplist.json",
	// 	success:function(data){
	// 		if(data.status=="success"){
	// 			console.log(data.message);
	// 			if(data.message!=""){
	// 				var datas=data.message;
	// 				// datas.map(function(value,key){
	// 				// 	return ipList = ipList + `<option value=${value} key=${key}>${value}</option>`;
	// 				// });
	// 				for(var key in datas){
	// 						ipList = ipList + `<option value=${datas[key]}>${datas[key]}</option>`;
	// 				}
	// 				var ipListHTML=`<div class="form-group" style="display:inline-block;margin-bottom: 0">
   //                        <select  data-size="9" class="selectpicker ipAddress"  title="===请选择===">
   //                        	${ipList}
   //                        </select>
   //                      </div>`;
	//
	// 				$('.ipListBox').empty();
	// 				$('.ipListBox').append(ipListHTML);
	// 				$('.selectpicker').selectpicker('refresh');
	// 			}
	// 		}else{
	// 			$('#add_mcrouter_modle').modal('hide');
	// 			$('.tip-message').html("服务器异常");
	// 			$('#messageModal').modal('show');
	// 		}
	// 	},
	// 	error:function(data){
	// 		$('#add_mcrouter_modle').modal('hide');
	// 		$('.tip-message').html("服务器异常");
	// 		$('#messageModal').modal('show');
	// 	}
	// });

});



