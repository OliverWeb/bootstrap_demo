	var pageContext = document.location.pathname.substr(0, document.location.pathname.substr(1).indexOf("/") + 1);   //获取的根路径操作
// Mcrouter js
	var editType="add";
	var addPort="";
		$(function () {
			/*监听表单框的中的(是否开启流量控制)*/
			if($("#md_3").is(":checked")){
				$('.flightRequest').removeAttr("disabled");
			}else{
				$(".flightRequest").attr("disabled","disabled");
			}
			$("#md_3").change(function () {
					if($("#md_3").is(":checked")){
						$('.flightRequest').removeAttr("disabled");
					}else{
						$(".flightRequest").attr("disabled","disabled");
					}
			});
			// $('#add_mcrouter_modle').modal('show');
			/*获取链接*/
			var url = window.location.search;
			var mcrouerIpsIndex=url.indexOf('ip');
			if(mcrouerIpsIndex!=-1){
				url=url.substring(mcrouerIpsIndex);
				var 	IpsIndex=url.indexOf("&");
				if(IpsIndex!=-1){
					var IpValur=url.substring("ip".length+1,IpsIndex);
				}else{
					var IpValur=url.substring("ip".length+1);
				}
				// console.log(IpValur);
				$('.ipValue').html("mcrouter服务器 IP:"+IpValur);      //进行ip赋值
			}
			/*赋值结束 end*/
			/*页面进行请求咱咱先布局*/
			$.ajax({
				type:"get",
				url:"./json/mcrouter.json",               //页面初次加载数据请求的地址   url: "../config/node/getMcrouterNodes?mcrouter_ip=" + ip
				data:"mcrouter_ip="+IpValur,
				success:function (data) {
					if(data.status=="success"){
						if(data.message!=""){
							data.message.map(function(value,key){
								var mcrouter_list=`
											    <tr>
											    <td><div class='openbox ${value.disabled==1?"on":"off"} '>${value.disabled==1?"已开启":"已禁用"}</div></td>
											    <td class="logPath">${value.logPath}</td>
											    <td class="numProxies">${value.numProxies}</td>
											    <td class="port">${value.port}</td>
											    <td class="configFile">${value.configFile}</td>
											    <td class="routePrefix">${value.routePrefix}</td>
											    <td class="bigValueSplitThreshold">${value.bigValueSplitThreshold}</td>
											    <td class="maxClientOutstandingRequest">${value.maxClientOutstandingRequest}</td>
											    <td class="destinationRateLimiting">${value.destinationRateLimiting==""?"关":"开"}</td>
											    <td class="targetMaxInflightRequest">${value.targetMaxInflightRequest}</td>
											    <td class="targetMaxPendingRequests">${value.targetMaxPendingRequests}</td>
											    <td style="width: 220px">
											    		<button type="button" class="modify btn btn-primary btn-sm">
													      修改<i class="fa fa-pencil-square-o">
													   </i>
													  </button>
													   <button type="button" class='btn btn-sm openBtn ${value.disabled==1?"btn-success  on":"btn-default off"}'>
													  <span> ${value.disabled==1?"开启":"禁用"} </span><i class="glyphicon glyphicon-off">
													    </i>
													  </button>
													   <button type="button" class="view btn btn-sm btn-info">
													     查看<i class="fa fa-exclamation-circle">
													     </i>
													   </button>
                          </td>
											    </tr>`;
								$(".add_mcrouter_list").append(mcrouter_list);
							});
						}
					}else{}
					// console.log(data);
				},
		error:function (data) {
			console.log("获取数据异常");
		}
	});
	/*页面进行请求咱咱先布局  end*/
	$("body").on("click",".modify",function(){     //点击编辑,修改  edit
		addPort=$(this).parent().parent().find(".port").html();
		var portList=[];
		console.log($(".add_mcrouter_list").find("tr").length);
		$('input.port').blur(function () {
			var targetPort=$('input.port').val();
			$(".add_mcrouter_list").find("tr").map(function(key,value){
				portList.push($(value).find(".port").html());
			});
			portList.map(function(value,key){
				if(value==targetPort&&addPort!=targetPort){
					$('.tip-message').html("监听端口号已存在,请换一个!!");
					$('#messageModal').modal('show');
					setTimeout(function(){
						$('#messageModal').modal('hide');
					},1000);
				}
			});
		});

		/*进行判断是否选中*/
		if($(this).parent().parent().find(".destinationRateLimiting").html()=="开"){
			$("#md_3").attr("checked","true");
			$("input.targetMaxInflightRequest").removeAttr("disabled");
		}else{
			$("#md_3").removeAttr("checked");
			$("input.targetMaxInflightRequest").attr("disabled","disabled");
		}
		editType ="edit";
		$('#add_mcrouter_modle').modal('show');
		$("input.logPath").val( $(this).parent().parent().find(".logPath").html());
		$("input.numProxies").val( $(this).parent().parent().find(".numProxies").html());
		$("input.port").val( $(this).parent().parent().find(".port").html());
		$("input.configFile").val( $(this).parent().parent().find(".configFile").html());
		$("input.routePrefix").val( $(this).parent().parent().find(".routePrefix").html());
		$("input.bigValueSplitThreshold").val( $(this).parent().parent().find(".bigValueSplitThreshold").html());
		$("input.maxClientOutstandingRequest").val( $(this).parent().parent().find(".maxClientOutstandingRequest").html());
		$("input.targetMaxInflightRequest").val( $(this).parent().parent().find(".targetMaxInflightRequest").html());
		$("input.targetMaxPendingRequests").val( $(this).parent().parent().find(".destinationRateLimiting").html());
	});
	$("#add_mcrouter").click(function(){         //点击添加的  add
		/*判断是否已存在端口号*/
		var portList=[];
		$('input.port').blur(function () {
			var targetPort=$('input.port').val();
			$(".add_mcrouter_list").find("tr").map(function(key,value){
				portList.push($(value).find(".port").html());
			});
			portList.map(function(value,key){
				if(value==targetPort){
					$('.tip-message').html("监听端口号已存在,请换一个!!");
					$('#messageModal').modal('show');
					setTimeout(function(){
						$('#messageModal').modal('hide');
					},1000);
				}
			});
		});
		/*判断是否已存在端口号 end */
		editType="add";
		$("#md_3").removeAttr("checked");
		$(".flightRequest").attr("disabled","disabled");
		document.getElementById('server_form').reset();
		$('#add_mcrouter_modle').modal('show');
	});
	/*点击查看的代码*/
	$("body").on("click",".view",function(){
		$("#viewModal").modal('show');
		addPort=$(this).parent().parent().find(".port").html();
		var submitData={
			"server":IpValur,
			"port":addPort
		};
	  	$.ajax({
	  		post:"get",
	  		url:"./json/mcrouterView.json",      //  查看详情 "${pageContext.request.contextPath}/config/dashboard/command_exe"
			  data:submitData,
	  		success:function(data){
	  			if(data.status=="success"){
	  				if(data.message!=""){
						  $("#pid").val(data.message.pid);
						  $("#curr_connections").val(data.message.curr_connections);
						  $("#cmd_get").val(data.message.cmd_get);
						  $("#get_hits").val(data.message.get_hits);
						  $("#get_misses").val(data.message.get_misses);
						  $("#cmd_set").val(data.message.cmd_set);
						  $("#delete_hits").val(data.message.delete_hits);
						  $("#delete_misses").val(data.message.delete_misses);
						  $("#bytes_read").val(data.message.bytes_read);
						  $("#bytes_written").val(data.message.bytes_written);
						  $("#limit_maxbytes").val(data.message.limit_maxbytes);
						  $("#bytes").val(data.message.bytes);
					  }
				  }else{
					  $('.tip-message').html(data.message);
					  $('#viewModal').modal('show');
				  }
	  		},
	  		error:function(data){

	  		}
	  	});

	});
	/*点击开启和关闭的*/
	$('body').on('click','.openBtn',function(){
		$(this).attr("disabled","disabled");
		var _this=this;
		addPort=$(this).parent().parent().find(".port").html();
		var submitData={
			"server":IpValur,
			"key":"/cache-center/nodes/mcrouter/" + IpValur + "/" + addPort
		};
		console.log(submitData);
		if($(this).hasClass("on")){
			 operateUrl="./json/mcrouter.json";     //"${pageContext.request.contextPath}/mcrouter/operation/start_mcrouter"
			console.log("on");
		}else{
			operateUrl="./json/mcrouter.json";    //"${pageContext.request.contextPath}/mcrouter/operation/stop_mcrouter"
			console.log("off");
		}
		$.ajax({
			url:operateUrl,                          //操作开启和关闭的的请求地址
			type:"get",
			data:submitData,
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
	$(".add_servers_mcrouter").click(function(){      //点击保存  提交
		/*判断之前的判断*/
		if($("input.logPath").val()==""){      //所填内容的判断
			$('.tip-message').html("请将日志文件路径填写完整!");
			$('#messageModal').modal('show');
			setTimeout(function(){
				$('#messageModal').modal('hide');
			},1000);
			return;
		}else if($("input.numProxies").val()==""){
			$('.tip-message').html("请将请求线程数量填写完整!");
			$('#messageModal').modal('show');
			setTimeout(function(){
				$('#messageModal').modal('hide');
			},1000);
			return;
		}else if($("input.configFile").val()==""){
			$('.tip-message').html("请将配置文件路径填写完整!");
			$('#messageModal').modal('show');
			setTimeout(function(){
				$('#messageModal').modal('hide');
			},1000);
			return;
		}else if($("input.routePrefix").val()==""){
			$('.tip-message').html("请将默认路由前缀填写完整!");
			$('#messageModal').modal('show');
			setTimeout(function(){
				$('#messageModal').modal('hide');
			},1000);
			return;
		};
		var submitValue={};
		/*表单序列化,进行提交表单信息*/
		submitValue.logPath=$("input.logPath").val();
		submitValue.numProxies=$("input.numProxies").val();
		submitValue.port=$("input.port").val();
		submitValue.configFile=$("input.configFile").val();
		submitValue.routePrefix=$("input.routePrefix").val();
		submitValue.bigValueSplitThreshold=$("input.bigValueSplitThreshold").val();
		submitValue.targetMaxInflightRequest=$("input.targetMaxInflightRequest").val();
		submitValue.targetMaxPendingRequests=$("input.targetMaxPendingRequests").val();
		submitValue.maxClientOutstandingRequest=$("input.maxClientOutstandingRequest").val();
		submitValue.destinationRateLimiting=$("#md_3").is(":checked")==true? destinationRateLimiting:"";
		submitValue.disabled="1";
		console.log(submitValue);
		if(editType=="add"){
			var port=$("input.port").val();
		}else{
			var port=addPort;
		};

		var submitData={
			"value": submitValue,
			"prefix":"/cache-center/nodes/mcrouter/" + IpValur + "/" + port,
			"server":IpValur,
			"editType":editType
		};
		console.log(submitData);
			$.ajax({
				type:"get",
				url:"./json/mcrouter.json",               // 点击 提交 保存数据请求的地址   submit   "../mcrouter/operation/set_mcrouter_node" ,
				data:submitData,
				success:function (data) {
					if(data.status=="success"){
						$('#add_mcrouter_modle').modal('hide');
						$('.tip-message').html("保存成功");
						$('#messageModal').modal('show');
						setTimeout(function(){
							$('#messageModal').modal('hide');
							// location.reload();
						},1000);
					}else{
						$('#add_mcrouter_modle').modal('hide');
						$('.tip-message').html(data.message);
						$('#messageModal').modal('show');
						setTimeout(function(){
							$('#messageModal').modal('hide');
							// location.reload();
						},1000);

					}
				},
				error:function(){
				}
			});
	});
});
