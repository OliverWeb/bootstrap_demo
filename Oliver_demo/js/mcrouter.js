// Mcrouter js
		$(function () {
			/*获取链接*/
			var url = window.location.search;
//    alert(url.length);
//    alert(url.lastIndexOf('='));
			console.log(url);
			var mcrouerIpsIndex=url.indexOf('mcrouerIps');
			url=url.substring(mcrouerIpsIndex);
			var 	IpsIndex=url.indexOf("&");
			if(IpsIndex!=-1){
				var IpValur=url.substring("mcrouerIps".length+1,IpsIndex);
			}
			$('.ipValue').html("mcrouter服务器 IP:"+IpValur);      //进行ip赋值
			/*赋值结束 end*/
			/*页面进行请求咱咱先布局*/
			$.ajax({
				type:"get",
				url:"./json/mcrouter.json",
				success:function (data) {
					console.log(data);
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
		if("请求成功"){
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
		}
	});
});