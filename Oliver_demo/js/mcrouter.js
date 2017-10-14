var pageContext = document.location.pathname.substr(0, document.location.pathname.substr(1).indexOf("/") + 1);   //获取的根路径操作
// Mcrouter js
		$(function () {
			/*监听表单框的中的(是否开启流量控制)*/
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
											    <td><div class="openbox on">启用</div></td>
											    <td>${value.logPath}</td>
											    <td>${value.numProxies}</td>
											    <td>${value.port}</td>
											    <td>${value.configFile}</td>
											    <td>${value.routePrefix}</td>
											    <td>${value.bigValueSplitThreshold}</td>
											    <td>${value.targetMaxInflightRequest}</td>
											    <td>${value.targetMaxPendingRequests}</td>
											    <td>${value.maxClientOutstandingRequest}</td>
											    <td>${value.destinationRateLimiting}</td>
											    <td>${value.key}</td>
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

	$("#add_mcrouter").click(function(){
		$('#add_mcrouter_modle').modal('show');
	});
	$(".add_servers_mcrouter").click(function(){
		if(false){      //所填内容的判断
			$('.tip-message').html("请将内容填写完整!!!");
			$('#messageModal').modal('show');
			setTimeout(function(){
				$('#messageModal').modal('hide');
			},1000);
			return;
		};
		var datas=$("form").serialize();
		// console.log(datas);
		data_ip=$('#ip1').val();
		var dataArr=datas.split("&");

		var parentObj=[];
		dataArr.map(function(value,key){
			childObj={};
			var childArr=value.split("=");
			childObj[childArr[0]]=childArr[1];
			parentObj.push(childObj);
		});
		console.log(parentObj);
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
