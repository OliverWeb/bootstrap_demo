<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>memcached</title>
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
<script type="text/javascript" src="${pageContext.request.contextPath}/jquery-easyui-1.5/echarts.js"></script>
</head>
<body>
	<div id="q" title="查看memcached服务器信息" id="showStats" class="easyui-dialog"
		style="width: 300px; height:auto; padding: 10px 20px;" closed="true">
		<table width="100%" border="1" align="center" id="server_info">
			<tr title="服务器进程随机ID"><td>服务器进程ID(pid)</td><td></td></tr>
			<tr title="当前客户端连接该服务器的数量" ><td>当前连接数量(curr_connections)</td><td></td></tr>
			<tr title="该服务器接收到的get命令请求次数"><td>get命令请求次数(cmd_get)</td><td></td></tr>
			<tr title="该服务器接收到的get命令的执行成功[命中]率"><td>get命令命中率(get_hits )</td><td></td></tr>
			<tr title="该服务器接收到的get命令的执行失败[丢失率]"><td>get命令丢失率(get_misses)</td><td></td></tr>
			<tr title="该服务器接收到的set命令的请求次数"><td>set命令请求次数(cmd_set )</td><td></td></tr>
			<tr title="该服务器接收到的delete命令的执行成功[命中]率"><td>delete命令命中率(delete_hits )</td><td></td></tr>
			<tr title="该服务器接收到的delete命令的执行失败[丢失]率" ><td>delete命令丢失率(delete_misses )</td><td></td></tr>
			<tr title="该服务器读取的总字节数" ><td>读取的总字节数(bytes_read)</td><td></td></tr>
			<tr title="该服务器发送的总字节数" ><td>发送的总字节数(bytes_writen)</td><td></td></tr>
			<tr title="分配给该服务器的总内存大小" ><td>分配的总内存大小(limit_maxbytes )</td><td></td></tr>
			<tr title="该服务当前存储占用的内存大小" ><td>当前存储占用的字节数(bytes)</td><td></td></tr>
		</table>
	</div>
		<div style="width: 80%; text-align: left;">
			<a href="javascript:void(0)" class="easyui-linkbutton"
				iconcls="icon-reload" plain="true"
				onclick="javascript:window.location.reload()">刷新</a>
			<a href="javascript:void(0)" class="easyui-linkbutton"
				iconcls="icon-back" plain="true"
				onclick="javascript:window.history.go(-1)">返回</a>
		</div>
		<br /> <br />
		<table align="center" border="1" width="100%" id="memcached_dashboard" >	
		<tr><td></td></tr>	
		</table>
	<br><br><br>
	<div id="pic"  style="height: 400px;width: 400px">
	
	</div>
	<br/>
	<br/>
	<div id="pic2"  style="height: 400px;width: 400px">
	
	</div>
	
		<br/>
	<br/>
	<div id="pic3"  style="height: 400px;width: 400px">
	
	</div>
	
</body>
<script type="text/javascript">
$.ajaxSetup({  
    async : false  
}); 



function getstats(server){
	var res;
	$.get("${pageContext.request.contextPath}/config/dashboard/show_memcached?server="+server,function(result){
		res= result;
	})
	
	return res;
}


function show(server){
	var serverInfo=getstats(server);
	
	
	var server_infos=$("#server_info").find("tr");
	$(server_infos[0]).children().eq(1).html(serverInfo.pid);
	$(server_infos[1]).children().eq(1).html(serverInfo.curr_connections);
	$(server_infos[2]).children().eq(1).html(serverInfo.cmd_get);
	$(server_infos[3]).children().eq(1).html(serverInfo.get_hits);
	$(server_infos[4]).children().eq(1).html(serverInfo.get_misses);
	$(server_infos[5]).children().eq(1).html(serverInfo.cmd_set);
	$(server_infos[6]).children().eq(1).html(serverInfo.delete_hits);
	$(server_infos[7]).children().eq(1).html(serverInfo.delete_misses);
	$(server_infos[8]).children().eq(1).html(serverInfo.bytes_read);
	$(server_infos[9]).children().eq(1).html(serverInfo.bytes_written);
	$(server_infos[10]).children().eq(1).html(serverInfo.limit_maxbytes);
	$(server_infos[11]).children().eq(1).html(serverInfo.bytes);
	
	$("#q").dialog("open").dialog('setTitle',server);
	
	
	var myChart = echarts.init(document.getElementById('pic'));
	option = {
		    title : {
		        text: 'memcached内存',
		        subtext: server,
		        x:'center'
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        orient: 'vertical',
		        left: 'left',
		        data: ['已使用内存','剩余内存']
		    },
		    series : [
		        {
		            name: 'memcached内存',
		            type: 'pie',
		            radius : '55%',
		            center: ['50%', '60%'],
		            data:[
		                {value:serverInfo.bytes, name:'已使用内存'},
		                {value:serverInfo.limit_maxbytes, name:'剩余内存'},
		            ],
		            itemStyle: {
		                emphasis: {
		                    shadowBlur: 10,
		                    shadowOffsetX: 0,
		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
		                }
		            }
		        }
		    ]
		};
	myChart.setOption(option);
	
	
	
	
	
	
	 myChart = echarts.init(document.getElementById('pic2'));
	option = {
			color:["red","yellow"],
		    title : {
		        text: 'get',
		        subtext: server,
		        x:'center'
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        orient: 'vertical',
		        left: 'left',
		        data: ['hits','misses']
		    },
		    series : [
		        {
		            name: 'get命令命中率和丢失率',
		            type: 'pie',
		            radius : '55%',
		            center: ['50%', '60%'],
		            data:[
		                {value:serverInfo.get_hits, name:'hits'},
		                {value:serverInfo.get_misses, name:'misses'},
		            ],
		            itemStyle: {
		                emphasis: {
		                    shadowBlur: 10,
		                    shadowOffsetX: 0,
		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
		                }
		            }
		        }
		    ]
		};
	myChart.setOption(option);
	
	
	
	 myChart = echarts.init(document.getElementById('pic3'));
		option = {
				color:["bule","green"],
			    title : {
			        text: 'get',
			        subtext: server,
			        x:'center'
			    },
			    tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c} ({d}%)"
			    },
			    legend: {
			        orient: 'vertical',
			        left: 'left',
			        data: ['hits','misses']
			    },
			    series : [
			        {
			            name: 'deletet命令命中率和丢失率',
			            type: 'pie',
			            radius : '55%',
			            center: ['50%', '60%'],
			            data:[
			                {value:serverInfo.delete_hits, name:'hits'},
			                {value:serverInfo.delete_misses, name:'misses'},
			            ],
			            itemStyle: {
			                emphasis: {
			                    shadowBlur: 10,
			                    shadowOffsetX: 0,
			                    shadowColor: 'rgba(0, 0, 0, 0.5)'
			                }
			            }
			        }
			    ]
			};
		myChart.setOption(option);
} 

$(function(){
	$("#memcached_dashboard").on("click","input[value='stop']",function(){
		stop_memcached($(this).parent().parent().children().eq(0).text())
		$(this).parent().parent().children().eq(1).html("off");
		$(this).parent().parent().children().eq(1).css("background-color","red");
		$(this).parent().parent().children().eq(3).html("")
		$(this).parent().html("<input type='button' value='start' />");
		
	})
	
	$("#memcached_dashboard").on("click","input[value='start']",function(){
		start_memcached($(this).parent().parent().children().eq(0).text())
		
		$(this).parent().parent().children().eq(1).html("on");
		$(this).parent().parent().children().eq(1).css("background-color","green");
		$(this).parent().parent().children().eq(3).html("<input type='button' value='show' onclick='show(\""+$(this).parent().parent().children().eq(0).text()+"\")' />")
		$(this).parent().html("<input type='button' value='stop' /> <input type='button' value='clear' /> <input placeholder='请输入要删除的key' /><input type='button' value='delete'  />");
		
	})
	
	$("#memcached_dashboard").on("click","input[value='clear']",function(){
		if(clearing){
			alert("正在清理，请勿重复点击");
			return;
		}
		clearing=true;
		var server=$(this).parent().parent().children(":first").text();
		
		$.get("${pageContext.request.contextPath}/config/dashboard/clear_memcached?server="+server,function(result){
			alert("已清理缓存");
			clearing=false;
		})
	});
	
	
	$("#memcached_dashboard").on("click","input[value='delete']",function(){
		if(deleting){
			alert("正在删除，请勿重复点击");
			return;
		}
		deleting=true;
		var server=$(this).parent().parent().children(":first").text();
		var key=$(this).prev().val();
		$.get("${pageContext.request.contextPath}/config/dashboard/remove_key?server="+server+"&key="+key,function(result){
			alert("已删除");
			deleting=false;
		})
	});
	
	
	
	
})

var clearing=false;
var deleting=false;
	
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

	
	
	
	
	var memcached;
	$.ajax({
		type:"post",
		url:"${pageContext.request.contextPath}/config/dashboard/getMemcachedNodeDatas?memcached_ip="+ip,
		success:function(result){
			memcached=result;
		}
	})
	
	
	
	

	var htm="<tr><th>服务地址</th><th>状态</th><th>操作</th><th>stats</th></tr>";
	var server_ip=memcached[0].server_ip;
	var status;
	var len=memcached.length;
	for(var i=1;i<len;i++){
		server_port=memcached[i].port;
		server=server_ip+":"+server_port;
		status=memcached[i].disabled;
		htm+="<tr>";
		htm+="<td>"+server+"</td>";
		htm+="<td bgcolor='"+(status=="0"?"green":(status=="1"?"red":"grey"))+"'>"+(status==0?"on":"off")+"</td>";
		htm+="<td>"+(status=="0"?"<input type='button' value='stop' /> <input type='button' value='clear' /> <input placeholder='请输入要删除的key' /><input type='button' value='delete'  />":"<input type='button' value='start' /> ")+"</td>";
		htm+=status=="0"?("<td><input type='button' value='show' onclick='show(\""+server+"\")' /></td>"):"<td></td>";	
		htm+="</tr>";
	}
	$("#memcached_dashboard").html(htm);
	
	
	
var starting=false;	
function stop_memcached(server){
	if(starting){
		alert("正在启动，请勿重复点击！");
		return;
	}
	starting=true;
	$.get("${pageContext.request.contextPath}/config/dashboard/stop_memcached?server="+server,function(result){
		alert("memcached服务器:"+server+" 已停止");
		starting=false;
	})
}

var stoping=false;
function start_memcached(server){
	if(stoping){
		alert("正在停止，请勿重复点击！");
		return;
	}
	stoping=true;
	$.get("${pageContext.request.contextPath}/config/dashboard/start_memcached?server="+server,function(result){
		alert("memcached服务器:"+server+" 已开启");
		stoping=false;
	})
}
	
</script>
</html>