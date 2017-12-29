var pageContext = document.location.pathname.substr(0, document.location.pathname.substr(1).indexOf("/") + 1);   //获取的根路径操作
// Mcrouter js
function textExp(val, reg) {
	return reg.test(val);
}

var editType = "add";
var addPort = "";
$(function () {
/*监听表单框的中的(是否开启流量控制)*/
	if ($("#md_3").is(":checked")) {
		$('.flightRequest').removeAttr("disabled");
	} else {
		$(".flightRequest").attr("disabled", "disabled");
	}
	$("#md_3").change(function () {
		if ($("#md_3").is(":checked")) {
			$('.flightRequest').removeAttr("disabled");
		} else {
			$(".flightRequest").attr("disabled", "disabled");
		}
	});
	// $('#add_mcrouter_modle').modal('show');
	/*获取链接*/
	var url = window.location.search;
	var mcrouerIpsIndex = url.indexOf('ip');
	if (mcrouerIpsIndex != -1) {
		url = url.substring(mcrouerIpsIndex);
		var IpsIndex = url.indexOf("&");
		if (IpsIndex != -1) {
			var IpValur = url.substring("ip".length + 1, IpsIndex);
		} else {
			var IpValur = url.substring("ip".length + 1);
		}
		// console.log(IpValur);
		$('.ipValue').html("mcrouter服务器 IP:" + IpValur);      //进行ip赋值
	}
	/*赋值结束 end*/
	/*页面进行请求咱咱先布局*/
	$.ajax({
		type: "get",
		url: "./json/mcrouter.json",               //页面初次加载数据请求的地址   url: "../config/node/getMcrouterNodes?mcrouter_ip=" + ip
		data: "mcrouter_ip=" + IpValur,
		success: function (data) {
			if (data.status == "success") {
				if (data.message != "") {
          console.table(data.message);
          data.message.sort(function(a,b){
	          return a.port > b.port;
					});
					data.message.map(function (value, key) {
						var mcrouter_list = `
											    <tr>
											    <td><div class='openbox ${value.disabled == "1" ? "off" : "on"} '>${value.disabled == 1 ? "已禁用" : "已开启"}</div></td>
											    <td class="logPath">${value.logPath || ""}</td>
											    <td class="numProxies">${value.numProxies || ""}</td>
											    <td class="port">${value.port || ""}</td>
											   <!--  <td class="configFile">${value.configFile || ""}</td>  -->
											 <!--     <td class="routePrefix">${value.routePrefix.substring("/cache_center/".length,value.routePrefix.lastIndexOf('/') )|| ""}</td> -->
											    <td class="bigValueSplitThreshold">${value.bigValueSplitThreshold || ""}</td>
											    <td class="maxClientOutstandingRequest">${value.maxClientOutstandingRequest || ""}</td>
											    <td class="destinationRateLimiting">${value.destinationRateLimiting != "1" ? "关" : "开"}</td>
											    <td class="targetMaxInflightRequest">${value.targetMaxInflightRequest || ""}</td>
											    <td class="targetMaxPendingRequests">${value.targetMaxPendingRequests || ""}</td>
											    <td style="width: 300px">
											    		<button type="button" class="modify btn btn-primary btn-sm">
													      修改<i class="fa fa-pencil-square-o">
													   </i>
													  </button>
													   <button type="button" class='btn btn-sm openBtn ${value.disabled == 1 ? "btn-success  on" : "btn-default off"}'>
													  <span> ${value.disabled == 1 ? "开启" : "禁用"} </span><i class="glyphicon glyphicon-off">
													    </i>
													  </button>
													   <button type="button" class="view btn btn-sm btn-info">
													     查看<i class="fa fa-exclamation-circle">
													     </i>
													   </button>
													   <button type="button" class="viewLog btn btn-sm btn-warning">
													     日志<i class="fa fa-exclamation-circle">
													     </i>
													   </button>
                          </td>
											    </tr>`;
						$(".add_mcrouter_list").append(mcrouter_list);
					});
				}
			} else {
			}
			// console.log(data);
		},
		error: function (data) {
			$('.tip-message').html("服务器异常");
			$('#messageModal').modal('show');
			setTimeout(function () {
				$('#messageModal').modal('hide');
			}, 1000);
		}
	});
	/*页面进行请求咱咱先布局  end*/
	$("body").on("click", ".modify", function () {     //点击编辑,修改  edit

		// $('select.routePrefixList').selectpicker('val', $(this).parent().parent().find(".routePrefix").html());
		addPort = $(this).parent().parent().find(".port").html();
		var portList = [];
		console.log($(".add_mcrouter_list").find("tr").length);
		$('input.port').blur(function () {
			var targetPort = $('input.port').val();
			$(".add_mcrouter_list").find("tr").map(function (key, value) {
				portList.push($(value).find(".port").html());
			});
			portList.map(function (value, key) {
				if (value == targetPort && addPort != targetPort) {
					$('.tip-message').html("监听端口号已存在,请换一个!!");
					$('#messageModal').modal('show');
					setTimeout(function () {
						$('#messageModal').modal('hide');
					}, 1000);
				}
			});
		});

		/*进行判断是否选中*/
		if ($(this).parent().parent().find(".destinationRateLimiting").html() == "开") {
			$("#md_3").attr("checked", "true");
			$("input.targetMaxInflightRequest").removeAttr("disabled");
		} else {
			$("#md_3").removeAttr("checked");
			$("input.targetMaxInflightRequest").attr("disabled", "disabled");
		}
		editType = "edit";
		$('#add_mcrouter_modle').modal('show');
		$("input.logPath").val($(this).parent().parent().find(".logPath").html());
		$("input.numProxies").val($(this).parent().parent().find(".numProxies").html());
		$("input.port").val($(this).parent().parent().find(".port").html());
		// $("input.configFile").val($(this).parent().parent().find(".configFile").html());
		// $("input.routePrefix").val($(this).parent().parent().find(".routePrefix").html());
		$("input.bigValueSplitThreshold").val($(this).parent().parent().find(".bigValueSplitThreshold").html());
		$("input.maxClientOutstandingRequest").val($(this).parent().parent().find(".maxClientOutstandingRequest").html());
		$("input.targetMaxInflightRequest").val($(this).parent().parent().find(".targetMaxInflightRequest").html());
		$("input.targetMaxPendingRequests").val($(this).parent().parent().find(".targetMaxPendingRequests").html());
	});
	$("#add_mcrouter").click(function () {         //点击添加的  add
		/*判断是否已存在端口号*/
		var portList = [];
		$('input.port').blur(function () {
			var targetPort = $('input.port').val();
			$(".add_mcrouter_list").find("tr").map(function (key, value) {
				portList.push($(value).find(".port").html());
			});
			portList.map(function (value, key) {
				if (value == targetPort) {
					$('.tip-message').html("监听端口号已存在,请换一个!!");
					$('#messageModal').modal('show');
					setTimeout(function () {
						$('#messageModal').modal('hide');
					}, 1000);
				}
			});
		});
		/*判断是否已存在端口号 end */
		editType = "add";
		$("#md_3").removeAttr("checked");
		$(".flightRequest").attr("disabled", "disabled");
		document.getElementById('server_form').reset();
		$('#add_mcrouter_modle').modal('show');
	});
	/*点击查看的代码*/
	$("body").on("click", ".view", function () {
		if ($(this).prev().hasClass("off")) {
			$('.tip-message').html("服务器已停止，暂不支持查看具体信息!");
			$('#messageModal').modal('show');
			setTimeout(function () {
				$('#messageModal').modal('hide');
			}, 1000);
			return;
		}
		$("#viewModal").modal('show');
		addPort = $(this).parent().parent().find(".port").html();
		var submitData = {
			"server": IpValur,
			"port": addPort,
			"command": "mcrouter"
		};
		$.ajax({
			post: "get",
			url: "./json/memcachedView.json",      //  查看详情 "${pageContext.request.contextPath}/config/dashboard/command_exe"
			data: submitData,
			success: function (data) {
				if (data.status == "success") {
					var dataM = data.message;
					//接收请求数
					$("#requestCount").val(dataM.requestCount);
					//请求mcrouter启动漏油，但是尚未收到答复的数量
					$("#proxyreqsprocessing").val(dataM.proxyreqsprocessing);
					// 请求排队，尚未漏油的数量
					$("#proxyreqswaiting").val(dataM.proxyreqswaiting);
					//读取请求数
					$("#allgetcount").val(dataM.allgetcount);
					//请求中读取数占比
					$("#allgetrate").val(dataM.allgetrate);
					//服务器时间
					$("#servertime").val(dataM.servertime);
				} else {
					$('.tip-message').html(data.message);
					$('#viewModal').modal('show');
				}
			},
			error: function (data) {
				$('.tip-message').html("服务器异常!!");
				$('#viewModal').modal('show');
			}
		});

	});
	/*查看日志的情况 start*/
	$("body").on("click", ".viewLog", function () {
		$("#information").html("");
		if ($(this).prev().hasClass("on")) {
			$('.tip-message').html("服务器已停止，暂不支持查看具体信息!");
			$('#messageModal').modal('show');
			setTimeout(function () {
				$('#messageModal').modal('hide');
			}, 1000);
			return;
		}
		$("#viewlog").modal('show');
		addPort = $(this).parent().parent().find(".port").html();
		var logfilename=$(this).parent().parent().find(".logPath").html();
		var submitData = {
			"ip": IpValur,
			"port": addPort,
			"logfilename":logfilename
		};
		$.ajax({
			post: "get",
			url: "./json/viewlog.json",      //  查看详情 "${pageContext.request.contextPath}/config/dashboard/command_exe"
			data: submitData,
			success: function (data) {
				if (data.status == "success") {
					var dataM = data.message;
					dataM= dataM.split("<br>");
					var dataHtml="";
					dataM.pop();
					console.log(dataM);
					dataM.map(function(value,key){
						dataHtml+=key+"："+value+"<br/>";
					});
					$("#information").append(dataHtml);
				} else {
					$('.tip-message').html(data.message);
					$('#viewModal').modal('show');
				}
			},
			error: function (data) {
				$('.tip-message').html("服务器异常");
				$('#viewModal').modal('show');
			}
		});

	});
	/*查看日志的情况 end*/
	$('body').on('click', '.openBtn', function () {
		$(this).attr("disabled", "disabled");
		var _this = this;
		addPort = $(this).parent().parent().find(".port").html();
		console.log(submitData);
		if ($(this).hasClass("on")) {
			operateUrl = "./json/mcrouter.json";     //"${pageContext.request.contextPath}/mcrouter/operation/start_mcrouter"
			console.log("on");
			var submitData = {
				"server": IpValur,
				"key": "/cache-center/nodes/mcrouter/" + IpValur + "/" + addPort
			};
		} else {
			operateUrl = "./json/mcrouter.json";    //"${pageContext.request.contextPath}/mcrouter/operation/stop_mcrouter"
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
						$(_this).parent().parent().first().find(".openbox").removeClass("on").addClass("off").html("已禁用");
					} else {
						$(_this).find("span").html("开启");
						$(_this).removeClass("off btn-default").addClass("on btn-success");
						$(_this).parent().parent().first().find(".openbox").removeClass("off").addClass("on").html("已开启");
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
	$(".add_servers_mcrouter").click(function () {      //点击保存  提交
		/*判断之前的判断*/
		if ($("input.logPath").val()=="" || $("input.logPath").val().indexOf("//") != -1 ) {      //所填内容的判断
			$('.tip-message').html("请正确填写日志文件路径!");
			$('#messageModal').modal('show');
			setTimeout(function () {
				$('#messageModal').modal('hide');
			}, 1000);
			return;
		} else if (!textExp($("input.numProxies").val(), /^[0-9]+$/)) {
			$('.tip-message').html("请正确填写求线程数量!");
			$('#messageModal').modal('show');
			setTimeout(function () {
				$('#messageModal').modal('hide');
			}, 1000);
			return;
		} else if (!textExp($("input.port").val(), /^[0-9]+$/) || $("input.port").val()<1000 || $("input.port").val()>65535) {
			$('.tip-message').html("请正确填写监听端口号!");
			$('#messageModal').modal('show');
			setTimeout(function () {
				$('#messageModal').modal('hide');
			}, 1000);
			return;
		}
		// else if ($("input.configFile").val().indexOf("//") != -1) {
		// 	$('.tip-message').html("请填写配置文件路径!");
		// 	$('#messageModal').modal('show');
		// 	setTimeout(function () {
		// 		$('#messageModal').modal('hide');
		// 	}, 1000);
		// 	return;
		// }
		// else if ( $("input.routePrefix").val().indexOf("//") != -1) {
		// 	$('.tip-message').html("请正确填写默认路由前缀!");
		// 	$('#messageModal').modal('show');
		// 	setTimeout(function () {
		// 		$('#messageModal').modal('hide');
		// 	}, 1000);
		// 	return;
		// }
		else if (!textExp($("input.bigValueSplitThreshold").val(), /^[0-9]*$/)) {
			$('.tip-message').html("请正确填写截取长度!");
			$('#messageModal').modal('show');
			setTimeout(function () {
				$('#messageModal').modal('hide');
			}, 1000);
			return;
		}
		else if (!textExp($("input.maxClientOutstandingRequest").val(), /^[0-9]*$/)) {
			$('.tip-message').html("请正确填写客户端最大连接数!");
			$('#messageModal').modal('show');
			setTimeout(function () {
				$('#messageModal').modal('hide');
			}, 1000);
			return;
		} else if (!textExp($("input.targetMaxPendingRequests").val(), /^[0-9]*$/)) {
			$('.tip-message').html("请正确填写未发送数据缓存最大值!");
			$('#messageModal').modal('show');
			setTimeout(function () {
				$('#messageModal').modal('hide');
			}, 1000);
			return;
		}
		// if ($("#md_3").is(":checked")) {
		// 	if (!textExp($("input.targetMaxInflightRequest").val(), /^[0-9]*$/)) {
		// 		$('.tip-message').html("请正确填写限制发送请求的速度!");
		// 		$('#messageModal').modal('show');
		// 		setTimeout(function () {
		// 			$('#messageModal').modal('hide');
		// 		}, 1000);
		// 		return;
		// 	}
		//
		// }
		var submitValue = {};
		/*表单序列化,进行提交表单信息*/
		if($("input.logPath").val()!=""){
			submitValue.logPath = $("input.logPath").val();
		}
		if($("input.numProxies").val()!=""){
			submitValue.numProxies = $("input.numProxies").val();
		}
		if($("input.port").val()!=""){
			submitValue.port = $("input.port").val();
		}
		// if($("input.configFile").val()!=""){
		// 	submitValue.configFile = $("input.configFile").val();
		// }
			submitValue.routePrefix = "/cach_center/thewildcard/";
		if($("input.bigValueSplitThreshold").val()!=""){
			submitValue.bigValueSplitThreshold = $("input.bigValueSplitThreshold").val();
		}
		// if($("input.targetMaxInflightRequest").val()!=""){
		// 	submitValue.targetMaxInflightRequest = $("input.targetMaxInflightRequest").val();
		// }
		if($("input.targetMaxPendingRequests").val()!=""){
			submitValue.targetMaxPendingRequests = $("input.targetMaxPendingRequests").val();
		}
		if($("input.maxClientOutstandingRequest").val()!=""){
			submitValue.maxClientOutstandingRequest = $("input.maxClientOutstandingRequest").val();
		}
		// submitValue.destinationRateLimiting = $("#md_3").is(":checked") == true ? "1" : "0";
		submitValue.disabled = "1";
		console.log(submitValue);
		if (editType == "add") {
			var port = $("input.port").val();
		} else {
			var port = addPort;
		}
		var submitData = {
			"value": submitValue,
			"prefix": "/cache-center/nodes/mcrouter/" + IpValur + "/" + port,
			"server": IpValur,
			"editType": editType
		};
		console.log(submitData);
		$.ajax({
			type: "get",
			url: "./json/mcrouter.json",               // 点击 提交 保存数据请求的地址   submit   "../mcrouter/operation/set_mcrouter_node" ,
			data: submitData,
			success: function (data) {
				if (data.status == "success") {
					$('#add_mcrouter_modle').modal('hide');
					$('.tip-message').html("保存成功");
					$('#messageModal').modal('show');
					setTimeout(function () {
						$('#messageModal').modal('hide');
						// location.reload();
					}, 1000);
				} else {
					$('#add_mcrouter_modle').modal('hide');
					$('.tip-message').html(data.message);
					$('#messageModal').modal('show');
					setTimeout(function () {
						$('#messageModal').modal('hide');
						// location.reload();
					}, 1000);

				}
			},
			error: function () {
			}
		});
	});
/*c*/

		// var routePrefixList="";
		// $.ajax({
		// 	post:"get",
		// 	url:"./json/routePrefixList.json",
		// 	success:function(data){
		// 		if(data.status=="success"){
		// 			if(data.message!=""){
		// 				var datas=data.message;
		// 				// datas.map(function(value,key){
		// 				// 	return routePrefixList = routePrefixList + `<option value=${value} key=${key}>${value}</option>`;
		// 				// });
		// 				for(var key in datas){
		// 					if(key=="normal"){
		// 						routePrefixList = routePrefixList + `<option value=${datas[key].substring("/cache_center/".length,datas[key].lastIndexOf('/'))}>${datas[key].substring("/cache_center/".length,datas[key].lastIndexOf('/'))}(常规模式)</option>`;
		// 					}
		// 					if(key=="reliabilityshadow"){
		// 						routePrefixList = routePrefixList + `<option value=${datas[key].substring("/cache_center/".length,datas[key].lastIndexOf('/'))}>${datas[key].substring("/cache_center/".length,datas[key].lastIndexOf('/'))}(复制模式)</option>`;
		// 					}
		// 					if(key=="coldwarm"){
		// 						routePrefixList = routePrefixList + `<option value=${datas[key].substring("/cache_center/".length,datas[key].lastIndexOf('/'))}>${datas[key].substring("/cache_center/".length,datas[key].lastIndexOf('/'))}(冷缓存预热)</option>`;
		// 					}
		// 				}
		// 				var routePrefixHTMl=`<div class="form-group" style="display:inline-block;margin-bottom: 0">
     //                      <select  data-size="9" class="selectpicker routePrefixList"  title="===请选择===">
     //                      	${routePrefixList}
     //                      </select>
     //                    </div>`;
		//
		// 				$('.routePrefixbox').empty();
		// 				$('.routePrefixbox').append(routePrefixHTMl);
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
