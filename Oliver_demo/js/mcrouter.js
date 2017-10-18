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
											    <td class="destinationRateLimiting">${value.destinationRateLimiting}</td>
											    <td class="targetMaxInflightRequest">${value.targetMaxInflightRequest}</td>
											    <td class="targetMaxPendingRequests">${value.targetMaxPendingRequests}</td>
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
	$("body").on("click",".modify",function(){     //点击编辑,修改
		editType ="edit";
		addPort=$(this).parent().parent().find(".port").html();
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
	$("#add_mcrouter").click(function(){         //点击添加的
		editType="add";
		document.getElementById('server_form').reset();
		$('#add_mcrouter_modle').modal('show');
	});
	/*点击查看的代码*/
	$("body").on("click",".view",function(){
	  if($(this).prev().hasClass("off")){
		  $('.tip-message').html("服务器已停止，暂不支持查看具体信息");
		  $('#messageModal').modal('show');
		  setTimeout(function(){
			  $('#messageModal').modal('hide');
		  },1000);
	  }else{
	  	$.ajax({
	  		post:"get",
	  		url:"",
	  		success:function(data){
	  			if(data.status=="success"){
	  				if(data.message!=""){
							/*对页面进行填充*/
					  }
				  }else{
					  $('.tip-message').html(data.message);
					  $('#viewModal').modal('show');
				  }
	  		},
	  		error:function(data){

	  		}
	  	});
	  }
	});
	/*点击开启和关闭的*/
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
	$(".add_servers_mcrouter").click(function(){      //点击保存
		/*判断之前的判断*/
		var numexp = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;      //正则验证
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
		var McrouterValue={};
		/*表单序列化,进行提交表单信息*/
		McrouterValue.logPath=$("input.logPath").val();
		McrouterValue.numProxies=$("input.numProxies").val();
		McrouterValue.port=$("input.port").val();
		McrouterValue.configFile=$("input.configFile").val();
		McrouterValue.routePrefix=$("input.routePrefix").val();
		McrouterValue.bigValueSplitThreshold=$("input.bigValueSplitThreshold").val();
		McrouterValue.targetMaxInflightRequest=$("input.targetMaxInflightRequest").val();
		McrouterValue.targetMaxPendingRequests=$("input.targetMaxPendingRequests").val();
		McrouterValue.maxClientOutstandingRequest=$("input.maxClientOutstandingRequest").val();
		McrouterValue.destinationRateLimiting=$("#md_3").is(":checked")==true? destinationRateLimiting:"";
		McrouterValue.disabled="1";
		console.log(McrouterValue);
		if(editType=="add"){
			var port=$("input.port").val();
		}else{
			var port=addPort;
		};

		var data={
			"value": McrouterValue,
			"server":IpValur,
			"tmpPrefix":"/cache-center/nodes/mcrouter/" + IpValur + "/" + port,
			"editType":editType
		};
		console.log(data);
			$.ajax({
				type:"get",
				url:"./json/mcrouter.json",               // 点击保存数据请求的地址   根路径pageContext
				data:data,
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
