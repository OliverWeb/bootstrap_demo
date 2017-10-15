	var pageContext = document.location.pathname.substr(0, document.location.pathname.substr(1).indexOf("/") + 1);   //获取的根路径操作
// Mcrouter js
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
				url:"./json/mcrouter.json",               //页面初次加载数据请求的地址   根路径pageContext
				success:function (data) {
					console.log(data);
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
											    <td class="targetMaxInflightRequest">${value.targetMaxInflightRequest}</td>
											    <td class="targetMaxPendingRequests">${value.targetMaxPendingRequests}</td>
											    <td class="maxClientOutstandingRequest">${value.maxClientOutstandingRequest}</td>
											    <td class="destinationRateLimiting">${value.destinationRateLimiting}</td>
											    <td>
											    		<button type="button" class="modify btn btn-primary">
													      修改<i class="fa fa-pencil-square-o">
													   </i>
													  </button>
													   <button type="button" class='btn ${value.disabled==1?"btn-success on":"btn-default off"}'>
													   ${value.disabled==1?"开启":"禁用"}<i class="glyphicon glyphicon-off">
													    </i>
													  </button>
													   <button type="button" class="view btn btn-info">
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
		$('#add_mcrouter_modle').modal('show');
		$("input[name='logPath']").val( $(this).parent().parent().find(".logPath").html());
		$("input[name='numProxies']").val( $(this).parent().parent().find(".numProxies").html());
		$("input[name='port']").val( $(this).parent().parent().find(".port").html());
		$("input[name='configFile']").val( $(this).parent().parent().find(".configFile").html());
		$("input[name='routePrefix']").val( $(this).parent().parent().find(".routePrefix").html());
		$("input[name='bigValueSplitThreshold']").val( $(this).parent().parent().find(".bigValueSplitThreshold").html());
		$("input[name='targetMaxInflightRequest']").val( $(this).parent().parent().find(".targetMaxInflightRequest").html());
		$("input[name='targetMaxPendingRequests']").val( $(this).parent().parent().find(".targetMaxPendingRequests").html());
		$("input[name='maxClientOutstandingRequest']").val( $(this).parent().parent().find(".maxClientOutstandingRequest").html());
		$("input[name='destinationRateLimiting']").val( $(this).parent().parent().find(".destinationRateLimiting").html());
	});
	$("#add_mcrouter").click(function(){         //点击添加的
		document.getElementById('server_form').reset();
		$('#add_mcrouter_modle').modal('show');
	});
	$(".add_servers_mcrouter").click(function(){      //点击保存
		if(false){      //所填内容的判断
			$('.tip-message').html("请将内容填写完整!!!");
			$('#messageModal').modal('show');
			setTimeout(function(){
				$('#messageModal').modal('hide');
			},1000);
			return;
		};

		/*变淡序列化,进行提交表单信息*/
		var datas=$("form").serialize();
		if($("#md_3").is(":checked")){
			datas=datas+"&disabled=0"+"&targetMaxInflightRequest"+$('.targetMaxInflightRequest').val();
		}else{
			datas=datas+"&disabled=0";
		}
		// console.log(datas);
		data_ip=$('#ip1').val();
		var dataArr=datas.split("&");
    console.log(datas);
		var parentObj=[];
		dataArr.map(function(value,key){
			childObj={};
			var childArr=value.split("=");
			childObj[childArr[0]]=childArr[1];
			parentObj.push(childObj);
		});
		
		// console.log(parentObj);
			$.ajax({
				type:"get",
				url:"./json/mcrouter.json",               // 点击保存数据请求的地址   根路径pageContext
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
