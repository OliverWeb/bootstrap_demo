<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>gateway-config</title>
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/jquery-easyui-1.5/themes/default/easyui.css">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/jquery-easyui-1.5/themes/icon.css">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/jquery-easyui-1.5/demo/demo.css">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/css/kingTable.css">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/css/xcConfirm.css">
<script type="text/javascript"
	src="${pageContext.request.contextPath}/jquery-easyui-1.5/jquery-1.9.1.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/jquery-easyui-1.5/jquery.easyui.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/jquery-easyui-1.5/constant.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/jquery.kingTable.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/gateway-config.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/xcConfirm.js"></script>
<style>
tr,td{font-size:15px;<br/>color:#000000;<br/>background:#ffffff;<br/>}
</style>
</head>
<body>
		<div style="width: 100%; height:100%;text-align:center;">
		<div style="text-align:left">
			<a style="text-align:right;"href="javascript:void(0)" class="easyui-linkbutton"
					iconcls="" plain="true"
					onclick="copyToDatabase()"><font color="red"  size="3px">同步网关服务到数据库</font></a>
		</div>
	</div>
</body>
</html>
<script type="text/javascript">

function copyToDatabase()
{
	 var tmpList=new Array();
	var servicemap={};
	var statusmap={};
	var qpsmap={};
	var list=new Array();
	$.get("../etcd/list?prefix=/gateway/front/public/services/",function(result){
		if(result)
		{
			for(var i=0;i<result.length;i++)
			{
				var key=result[i].key;
				var name=result[i].name;
				var value=result[i].value;
				if(key.indexOf("services/")>0&&name.indexOf("/")<0)
					{	
						tmpList.push(name);
					}
				if(key.indexOf("/provider")>0&&typeof(value) != "undefined")
					{
						servicemap[name.split("/")[0]]=value;
					}
				if(key.indexOf("/status")>0&&typeof(value) != "undefined")
					{
						statusmap[name.split("/")[0]]=value;
					}
				if(key.indexOf("/maxConnectionsPerMethod")>0&&typeof(value) != "undefined")
				{
					qpsmap[name.split("/")[0]]=value;
				}
			}
			for(var i=0;i<tmpList.length;i++)
			{
				var service=servicemap[tmpList[i]];
				var servicestatus=statusmap[tmpList[i]]
				var qps=qpsmap[tmpList[i]];
				if(typeof(qps)=="undefined"||"undefined"==qps)
				{
					qps="64"
				}
				var jsonDataString={"gatewayServiceName":tmpList[i],"serviceName":service.split(":")[0],"serviceVersion":service.split(":")[1],"serviceMethod":service.split(":")[2],"status":servicestatus,"qps":qps,"ver":0};
				var jsonDataString2={"gatewayServiceName":tmpList[i],"serviceName":service.split(":")[0],"serviceVersion":service.split(":")[1],"serviceMethod":service.split(":")[2],"status":servicestatus,"qps":qps,"ver":1};
				list.push(jsonDataString);
				list.push(jsonDataString2);
			}
		}

	/* 	$.post("../gatewayservice/insertList/",{"json": JSON.stringify(list)},function(result){
			alert(result);
		});  */
		
		$.ajax({
	        type: "POST",
	        url: "../gatewayservice/insertList/",
	        dataType: "json",
	        async: true,
	        data: {"json": JSON.stringify(list)},
	        success: function (result) {     	
	        }			
	    });
		
	}); 

}
</script>