<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>mcrouter</title>
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/jquery-easyui-1.5/themes/default/easyui.css">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/jquery-easyui-1.5/themes/icon.css">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/jquery-easyui-1.5/demo/demo.css">
<script type="text/javascript"
	src="${pageContext.request.contextPath}/jquery-easyui-1.5/jquery-1.9.1.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/jquery-easyui-1.5/jquery.easyui.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/jquery-easyui-1.5/echarts.js"></script>
</head>
<body>

<div id="a" title="mcrouter logs" id="start_mcrouter"
		class="easyui-dialog"
		style="width: 1000px; height: auto; padding: 5px 5px;" closed="true">
		
</div>

	<div id="q" title="查看mcrouter服务器信息" id="showStats"
		class="easyui-dialog"
		style="width: 500px; height: auto; padding: 10px 20px;" closed="true">
		<table width="100%" border="1" align="center" id="server_info">
			<tr title="该服务器的随机进程编号">
				<td>服务器进程ID(pid)</td>
				<td></td>
			</tr>
			<tr title="该服务器的父进程编号">
				<td>父进程ID(parent_pid)</td>
				<td></td>
			</tr>
			<tr title="该mcrouter服务器下的memcached服务器数量">
				<td>服务器数量(num_servers)</td>
				<td></td>
			</tr>
			<tr title="可能存在问题故障的服务器数量">
				<td>可疑的服务器数量(num_suspect_servers)</td>
				<td></td>
			</tr>
			<tr title="连接该服务器的客户端数量">
				<td>客户端数量(num_clients)</td>
				<td></td>
			</tr>
			<tr title="未完成的get请求队列">
				<td>未完成的get请求队列(outstanding_route_get_reqs_queued)</td>
				<td></td>
			</tr>
			<tr title="未完成的get队列平均大小">
				<td>未完成的get队列的平均大小(outstanding_route_get_avg_queue_size)</td>
				<td></td>
			</tr>
			<tr title="未完成的get请求平均等待秒数">
				<td>未完成的get请求平均等待秒数(outstanding_route_get_avg_wait_time_sec)</td>
				<td></td>
			</tr>
			<tr title="未完成的update请求队列">
				<td>未完成的update请求队列(outstanding_route_update_reqs_queued)</td>
				<td></td>
			</tr>
			<tr title="未完成的update队列的平均大小">
				<td>未完成的update队列的平均大小(outstanding_route_update_avg_queue_size)</td>
				<td></td>
			</tr>
			<tr title="未完成的update请求平均等待秒数">
				<td>未完成的update请求平均等待秒数(outstanding_route_update_avg_wait_time_sec)</td>
				<td></td>
			</tr>
			<tr title="轻微故障数量">
				<td>轻微故障数量(ps_num_minor_faults)</td>
				<td></td>
			</tr>
			<tr title="严重的需要紧急处理的故障数量">
				<td>严重故障数量(ps_num_major_faults)</td>
				<td></td>
			</tr>
			<tr title="成功连接上该服务器的客户端数量">
				<td>成功连接的客户端连接数(successful_client_connections)</td>
				<td></td>
			</tr>
			<tr title="cas命令请求总数">
				<td>cas命令请求总数(cmd_cas_count)</td>
				<td></td>
			</tr>
			<tr title="平均每秒接收cas的请求数">
				<td>平均每秒接收cas的请求数(cmd_cas)</td>
				<td></td>
			</tr>
			<tr title="平均每秒执行cas的正常请求次数">
				<td>平均每秒执行cas的正常请求的次数(cmd_cas_outlier)</td>
				<td></td>
			</tr>
			<tr title="每秒发送cas的请求总数">
				<td>每秒发送cas的请求总数(cmd_cas_outlier_all)</td>
				<td></td>
			</tr>
			<tr title="delete命令请求总数">
				<td>delete命令请求总数(cmd_delete_count)</td>
				<td></td>
			</tr>
			<tr title="平均每秒接收delete的请求数">
				<td>平均每秒接收delete的请求数(cmd_delete)</td>
				<td></td>
			</tr>
			<tr title="平均每秒执行delete的正常请求的次数">
				<td>平均每秒执行delete的正常请求的次数(cmd_delete_outlier)</td>
				<td></td>
			</tr>
			<tr title="每秒发送delete的请求总数">
				<td>每秒发送delete的请求总数(cmd_delete_outlier_all)</td>
				<td></td>
			</tr>
			<tr title="get命令请求总数">
				<td>get命令请求总数(cmd_get_count)</td>
				<td></td>
			</tr>
			<tr title="平均每秒接收get的请求数">
				<td>平均每秒接收get的请求数(cmd_get)</td>
				<td></td>
			</tr>
			<tr title="平均每秒执行get的正常请求的次数">
				<td>平均每秒执行get的正常请求的次数(cmd_get_outlier)</td>
				<td></td>
			</tr>
			<tr title="每秒发送get的请求总数">
				<td>每秒发送get的请求总数(cmd_get_outlier_all)</td>
				<td></td>
			</tr>
			<tr title="gets命令请求总数">
				<td>gets命令请求总数(cmd_gets_count)</td>
				<td></td>
			</tr>
			<tr title="平均每秒接收gets的请求数">
				<td>平均每秒接收gets的请求数(cmd_gets)</td>
				<td></td>
			</tr>
			<tr title="平均每秒执行gets的正常请求的次数">
				<td>平均每秒执行gets的正常请求的次数(cmd_gets_outlier)</td>
				<td></td>
			</tr>
			<tr title="平均每秒发送gets请求总数">
				<td>每秒发送gets的请求总数(cmd_gets_outlier_all)</td>
				<td></td>
			</tr>
			<tr title="set命令请求总数">
				<td>set命令请求总数(cmd_set_count)</td>
				<td></td>
			</tr>
			<tr title="平均每秒接收set的请求数">
				<td>平均每秒接收set的请求数(cmd_set)</td>
				<td></td>
			</tr>
			<tr title="平均每秒执行set的正常请求的次数">
				<td>平均每秒执行set的正常请求的次数(cmd_set_outlier)</td>
				<td></td>
			</tr>
			<tr title="每秒发送set的请求总数">
				<td>每秒发送set的请求总数(cmd_set_outlier_all)</td>
				<td></td>
			</tr>
		</table>
	</div>


		<div style="width: 80%; text-align: left;">
			<a href="javascript:void(0)" class="easyui-linkbutton"
				iconcls="icon-reload" plain="true"
				onclick="javascript:window.location.reload()">刷新</a>
		</div>
		<br /> <br />
		<table align="center" border="1" width="100%" id="mcrouter_dashboard">
			<tr>
				<td></td>
			</tr>
		</table>
	<br>
	<br>
	<br>
</body>
<script type="text/javascript">
function getCookie(name)
{
    var arr=document.cookie.split('; ');
    var i=0;
    for(i=0;i<arr.length;i++)
    {
        //arr2->['username', 'abc']
        var arr2=arr[i].split('=');         
        if(arr2[0]==name)
        {  
            var getC = decodeURIComponent(arr2[1]);
            return getC;
        }
    }     
    return '';
}

var ip =getCookie("ip");

	
	function getstats(server){
		var res;
		
		
		$.ajax({
			url:"${pageContext.request.contextPath}/config/dashboard/show_memcached?server="+server,
			type:"get",
			dataType:"json",
			async : false,
			success:function(result){
				res=result;
			}
		})
		
		return res;
	}

	function show(server,obj) {
		var status=($(obj).parent().prev().prev().text());
		if(status=='off'){
			alert("服务器已停止，暂不支持查看具体信息");
			return;
		}
		var res = getstats(server);
		
		var server_infos = $("#server_info").find("tr");
		$(server_infos[0]).children().eq(1).html(res.pid);
		$(server_infos[1]).children().eq(1).html(res.parent_pid);
		$(server_infos[2]).children().eq(1).html(res.num_servers);
		$(server_infos[3]).children().eq(1).html(res.num_suspect_servers);
		$(server_infos[4]).children().eq(1).html(res.num_clients);
		$(server_infos[5]).children().eq(1).html(
				res.outstanding_route_get_reqs_queued);
		$(server_infos[6]).children().eq(1).html(
				res.outstanding_route_get_avg_queue_size);
		$(server_infos[7]).children().eq(1).html(
				res.outstanding_route_get_avg_wait_time_sec);
		$(server_infos[8]).children().eq(1).html(
				res.outstanding_route_update_reqs_queued);
		$(server_infos[9]).children().eq(1).html(
				res.outstanding_route_update_avg_queue_size);
		$(server_infos[10]).children().eq(1).html(
				res.outstanding_route_update_avg_wait_time_sec);
		$(server_infos[11]).children().eq(1).html(res.ps_num_minor_faults);
		$(server_infos[12]).children().eq(1).html(res.ps_num_major_faults);
		$(server_infos[13]).children().eq(1).html(
				res.successful_client_connections);
		$(server_infos[14]).children().eq(1).html(res.cmd_cas_count);
		$(server_infos[15]).children().eq(1).html(res.cmd_cas);
		$(server_infos[16]).children().eq(1).html(res.cmd_cas_outlier);
		$(server_infos[17]).children().eq(1).html(res.cmd_cas_outlier_all);
		$(server_infos[18]).children().eq(1).html(res.cmd_delete_count);
		$(server_infos[19]).children().eq(1).html(res.cmd_delete);
		$(server_infos[20]).children().eq(1).html(res.cmd_delete_outlier);
		$(server_infos[21]).children().eq(1).html(res.cmd_delete_outlier_all);
		$(server_infos[22]).children().eq(1).html(res.cmd_get_count);
		$(server_infos[23]).children().eq(1).html(res.cmd_get);
		$(server_infos[24]).children().eq(1).html(res.cmd_get_outlier);
		$(server_infos[25]).children().eq(1).html(res.cmd_get_outlier_all);
		$(server_infos[26]).children().eq(1).html(res.cmd_gets_count);
		$(server_infos[27]).children().eq(1).html(res.cmd_gets);
		$(server_infos[28]).children().eq(1).html(res.cmd_gets_outlier);
		$(server_infos[29]).children().eq(1).html(res.cmd_gets_outlier_all);
		$(server_infos[30]).children().eq(1).html(res.cmd_set_count);
		$(server_infos[31]).children().eq(1).html(res.cmd_set);
		$(server_infos[32]).children().eq(1).html(res.cmd_set_outlier);
		$(server_infos[33]).children().eq(1).html(res.cmd_set_outlier_all);

		$("#q").dialog("open").dialog('setTitle', server);
	}

	var mcrouter;
	$
			.ajax({
				type : "post",
				url : "${pageContext.request.contextPath}/config/dashboard/getMcrouterNodeDatas?mcrouter_ip="+ip,
				async : false,
				success : function(result) {
					mcrouter = result;
				}
			})

	var htm = "<tr><th>服务地址</th><th>状态</th><th>操作</th><th>stats</th></tr>";
	var server_ip=mcrouter[0].server_ip;
	var len=mcrouter.length;	
	
	
	for(var i=1;i<len;i++){
		server_port=mcrouter[i].port;
		server=server_ip+":"+server_port;
		status=(mcrouter[i].disabled==0)?"on":"off";
		htm += "<tr>";
		htm += "<td>" + server + "</td>";
		htm += "<td bgcolor='"
				+ (status == "on" ? "green"
						: (status == "off" ? "red" : "grey")) + "'>" + status
				+ "</td>";
		htm += "<td>"
				+ (status == "on" ? "<input type='button' value='stop' />"
						: (status == "off" ? "<input type='button' value='start' />"
								: "<input type='button' value='stop' />"))
				+ "</td>";
		htm += "<td><input type='button' value='show stats' onclick='show(\""
				+ server + "\",this)' /> <input type='button' value='show log'  onclick='down(\""
				+ server + "\")'/> </td>";
		htm += "</tr>";
	}
	
	
	
	$("#mcrouter_dashboard").html(htm);

	$(function() {
		$("#mcrouter_dashboard").on(
				"click",
				"input[value='stop']",
				function() {
					stop_mcrouter($(this).parent().parent().children().eq(0).text(),this);
					

				})

		$("#mcrouter_dashboard")
				.on(
						"click",
						"input[value='start']",
						function() {
							start_mcrouter($(this).parent().parent().children().eq(0).text(),this);
							
						})



	
	})

	var starting=false;
	function start_mcrouter(server,obj) {
		if(starting){
			alert("正在启动，请勿重复点击");
			return;
		}
		starting=true;
		$.get("${pageContext.request.contextPath}/config/dashboard/start_mcrouter?server="+server,
				function(result) {
					alert("started");
					$(obj).parent().parent().children().eq(1).html(
					"on");
			$(obj).parent().parent().children().eq(1).css(
					"background-color", "green");
			$(obj)
					.parent()
					.html(
							"<input type='button' value='stop' />");

					starting=false;
					$("#a").dialog("close")
				})
				$("#a").dialog("open").dialog("setTitle","mcrouter-logs");
		$("#a").html("");
		setTimeout("getLogs()",500);
	}
	
	function getLogs(){
		
		$.get("${pageContext.request.contextPath}/config/dashboard/getMcrouterLogs?server="+server,
				function(result) {
					//alert(result);
					var len=(result).length;
					if(len>0){
					for(var i =0;i<len;i++){
					
						$("#a").append("logs--- "+result[i]+"<br/>");
						setTimeout("",200);
					}
					}
					if(starting)
					setTimeout("getLogs()",500);
				})
	}
	var stoping=false;
	function stop_mcrouter(server,obj) {
		if(stoping){
			alert("正在停止，请勿重复点击");
			return;
		}
		stoping=true;
		$.get("${pageContext.request.contextPath}/config/dashboard/stop_mcrouter?server="+server,
				function(result) {
					alert("stoped");
					$(obj).parent().parent().children().eq(1).html("off");
					$(obj).parent().parent().children().eq(1).css(
							"background-color", "red");
					$(obj).parent().html(
							"<input type='button' value='start' />");
					stoping=false;
				})
	}
	
	function down(server){
		window.open("../config/dashboard/downloadLog?server="+server)
	
	}
	
	
</script>

</html>