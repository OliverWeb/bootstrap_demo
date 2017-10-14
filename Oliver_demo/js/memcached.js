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
											    <td>${value.disabled}</td>
											    <td>${value.ipAddress}</td>
											    <td>${value.port}</td>
											    <td>${value.udpPort}</td>
											    <td>${value.memoryMaxSize}</td>
											    <td>${value.connectNum}</td>
											    <td>${value.user}</td>
											    <td>${value.pidFile}</td>
											    <td style="width:13%;">
													   <button type="button" class="btn btn-primary">
													      修改<i class="fa fa-pencil-square-o">
													   </i>
													  </button>
													   <button type="button" class="btn btn-success">
													    启动<i class="glyphicon glyphicon-off">
													    </i>
													  </button>
													   <button type="button" class="btn btn-info">
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

	$(".add_servers_memcached").click(function(){      //点击保存的时候
		var datas=$("form").serialize();
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
			type: "get",
			url: "./json/mcrouter.json",               //页面初次加载数据请求的地址   根路径pageContext
			success: function (data) {
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
			}
		});
	});

});



