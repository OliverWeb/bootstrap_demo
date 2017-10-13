var pageContext = document.location.pathname.substr(0, document.location.pathname.substr(1).indexOf("/") + 1);   //获取的根路径操作
// Mcrouter js
		$(function () {
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
					if(data.status=="success"){
						if(data.message!=""){

						}
					}else{

					}
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
		if(false){
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
		console.log(datas);
			$.ajax({
				type:"get",
				url:"./json/mcrouter.json",               //页面初次加载数据请求的地址   根路径pageContext
				success:function (data) {
					if(data.status=="success"){
						if(data.message!=""){
							var mcrouter_list=`
											    <tr>
											    <td>1</td>
											    <td>1</td>
											    <td>1</td>
											    <td>1</td>
											    <td>1</td>
											    <td>1</td>
											    <td>1</td>
											    <td>1</td>
											    <td>1</td>
											    <td>1</td>
											    <td>1</td>
											    <td>1</td>
											    </tr>`;
							$(".add_mcrouter_list").append(mcrouter_list);
							$('#add_server_modal').modal('hide');
						}
					}
				},
				error:function(){

				}
			});




	});
});