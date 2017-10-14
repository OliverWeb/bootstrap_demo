<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>etcd 节点配置</title>
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/jquery-easyui-1.5/themes/default/easyui.css">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/jquery-easyui-1.5/themes/icon.css">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/jquery-easyui-1.5/demo/demo.css">
<script type="text/javascript"
	src="${pageContext.request.contextPath}/jquery-easyui-1.5/jquery.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/jquery-easyui-1.5/jquery.easyui.min.js"></script>
</head>
<body>
		
	<div style="margin: 20px 0;"></div>
	<div id="p4" class="easyui-panel" title="get"
		style="width: 500px; height: 300px; padding: 10px; background: #fafafa;"
		data-options="iconCls:'',maximizable:true">
		<table  align="center">
			<tr><td align="right">HOST:</td><td align="left"><input id='HOST' /></td></tr>
			<tr><td align="right">PORT:</td><td align="left"><input id='PORT' /></td></tr>
			<tr><td align="right">key:</td><td align="left"><input id="key" class="easyui-textbox" required /></td></tr>
			<tr><td align="right">value:</td><td align="left"><input id="value" class="easyui-textbox"  /></td></tr>
			<tr><td colspan="2" align="center" > <input type="button" value="get" /></td></tr>
		</table>
	</div>
	
</body>
<script type="text/javascript">
 $.get("../config/getMcrouterNodeList",function(result){
     var server = jQuery.parseJSON(result.message);
     var datas=new Array();
     for (var i in server) {
		var data=new Object();
		data.value=server[i];
		datas.push(data);
	}
	$('#HOST').combobox({
	    data:datas,
	    valueField:"value",
	    textField:'value',
	    onSelect:function(res){
	    	$.get("../config/node/getMcrouterNodes?mcrouter_ip="+res.value,function(result2){
	    		var datas2=new Array();
	    		var len2=result2.length;
	    		for(var i=0;i<len2;i++){
	    			var data2=new Object();
	    			data2.port=result2[i].port;
	    			datas2.push(data2);
	    		}
	    		$("#PORT").combobox({
	    			data:datas2,
	    			valueField:"port",
	    		    textField:'port',
	    		})
	    	})
	    }
	});
}) 


$(function(){
	$("input[value='get']").click(function(){
		var host=$("#HOST").combobox("getValue");
		var port=$("#PORT").combobox("getValue");
		alert(host);
		alert(port);
		return;
		
		var val=$("#key").textbox("getValue");
		
		$.get("${pageContext.request.contextPath}/config/node/getMcrouterValue?key="+val+"&hostname="+host+"&port="+port,function(result){
			alert(result.value)
			$("#value").textbox("setValue",result.value);
		})
	});
})

</script>
</html>