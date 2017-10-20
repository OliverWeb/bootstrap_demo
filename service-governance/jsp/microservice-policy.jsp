<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>microservice-policy</title>
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/jquery-easyui-1.5/themes/default/easyui.css">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/jquery-easyui-1.5/themes/icon.css">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/jquery-easyui-1.5/demo/demo.css">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/css/xcConfirm.css">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/css/select2.min.css">
<script type="text/javascript"
	src="${pageContext.request.contextPath}/jquery-easyui-1.5/jquery-1.9.1.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/jquery-easyui-1.5/jquery.easyui.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/jquery-easyui-1.5/constant.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/microservice-config.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/xcConfirm.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/select2.min.js"></script>
<style>
input[type="text"]{
margin-left:20px;margin-top:20px;text-align:center;width:250px;height:25px;
}
 td{ white-space: nowrap;}
</style>
</head>
<body>

		<div style="width: 100%; text-align: center;">
			<div style="text-align:center;white-space: nowrap;"><b><font color="red"  size="5px"></font></b></div>
			<div style="text-align:right;">
				<a href="javascript:void(0)" class="easyui-linkbutton"
					iconcls="icon-back" plain="true"
					onclick="javascript:window.history.back();">回退</a>
				<a href="javascript:void(0)" class="easyui-linkbutton"
					iconcls="icon-reload" plain="true"
					onclick="javascript:window.location.reload()">刷新</a>
			</div>		
			
			<center>
			<table width="80%" border="0" cellspacing="0" cellpadding="0" align="center">
					<tr>
							<td style="text-align:right;vertical-align:bottom;width:35%;"><font  size="3px" style="margin-left:35px;">总并发限制</font></td>
							<td ><input type="text"  value=""  onkeyup="value=value.replace(/[^\d]/g,'')" onafterpaste="this.value=this.value.replace(/[^\d]g,'')" onblur = "this.value=((this.value=this.value.replace(/[^\d]/g,''))=='0'?'':this.value)" name='maxConnections' ><font  color="red" size="2px">(填0不生效，默认为512)</font> </td>
					</tr>
					<tr>
							<td style="text-align:right;vertical-align:bottom;width:35%;"><font  size="3px" style="margin-left:35px;">单方法并发限制</font></td>
							<td ><input type="text"  value=""  onkeyup="value=value.replace(/[^\d]/g,'')" onafterpaste="this.value=this.value.replace(/[^\d]g,'')" onblur = "this.value=((this.value=this.value.replace(/[^\d]/g,''))=='0'?'':this.value)" name='maxConnectionsPerMethod'> <font  color="red" size="2px">(填0不生效，默认为64)</font></td>			
					</tr>
					<tr>
							<td style="text-align:right;vertical-align:bottom;width:35%;"><font  size="3px" style="margin-left:35px;">连接超时时间(ms)</font></td>
							<td ><input type="text"  value=""  onkeyup="value=value.replace(/[^\d]/g,'')" onafterpaste="this.value=this.value.replace(/[^\d]g,'')" onblur = "this.value=((this.value=this.value.replace(/[^\d]/g,''))=='0'?'':this.value)" name='connectTimeout'> <font  color="red" size="2px">(填0不生效，默认为3000)</font></td>			
					</tr>
					<tr>
							<td style="text-align:right;vertical-align:bottom;width:35%;"><font  size="3px" style="margin-left:35px;">请求超时时间(ms)</font></td>
							<td ><input type="text"  value=""  onkeyup="value=value.replace(/[^\d]/g,'')" onafterpaste="this.value=this.value.replace(/[^\d]g,'')" onblur = "this.value=((this.value=this.value.replace(/[^\d]/g,''))=='0'?'':this.value)" name='requestTimeout'> <font  color="red" size="2px">(填0不生效，默认为3000)</font></td>			
					</tr>
					<tr>
							<td style="text-align:right;vertical-align:bottom;width:35%;"><font  size="3px" style="margin-left:35px;">响应读取超时时间(ms)</font></td>
							<td ><input type="text"  value=""  onkeyup="value=value.replace(/[^\d]/g,'')" onafterpaste="this.value=this.value.replace(/[^\d]g,'')" onblur = "this.value=((this.value=this.value.replace(/[^\d]/g,''))=='0'?'':this.value)" name='readTimeout'> <font  color="red" size="2px">(填0不生效，默认为3000)</font></td>			
					</tr>
					<tr style="height:50px;">
							<td style="text-align:right;vertical-align:bottom;width:35%;"><font  size="3px">是否存在对应Mock微服务</font></td>
							<td style="vertical-align:bottom;padding-left:20px;">
								<input name="isMock" type="radio" value="true" ><font  size="3px">是</font></input>
								<input name="isMock" type="radio" value="false" ><font  size="3px">否</font></input>
							</td>	
					</tr>
					<tr style="height:50px;display:none;" id="mock">
							<td style="text-align:right;vertical-align:bottom;width:35%;"><font  size="3px">对应Mock微服务名版本</font></td>
							<td style="vertical-align:bottom;padding-left:20px;"><select class="select_gallery"  name='nameandversion'  ></select>
							</td>			
					</tr>
					<tr style="height:50px;"><td colspan="2" style="text-align:center;vertical-align:bottom;"><input type="button" value="更新" onclick="update();javascript:void(0)" /></tr>
			</table>
			</center>
		
</body>
</html>
<script type="text/javascript">
$(function(){ 
	var parentmap=window.parent.parentmap;
	for(key in parentmap)
	{
		var name= $.parseJSON(parentmap[key][0]).name;
		var version=$.parseJSON(parentmap[key][0]).version;
		var nameandversion=name+":"+version;
		$("select[name='nameandversion']").append("<option value="+nameandversion +">"+nameandversion+"</option>");
	}	
	$(".select_gallery").select2();	
	var seviceName = getUrlParam("servicename");
	$("b").children().eq(0).text("["+seviceName+"服务配置]");
	$.get("../etcd/list?prefix=/services/"+seviceName+"/client",function(result){
		initPolicy(result);
	});
	 $(":radio").click(function(){
		   if($(this).val()=="true")
			{
			   $("#mock").show();
			}
		   else
			{
			   $("#mock").hide();
			}
		  });
	$("input[name='isMock']").eq(1).prop('checked', 'checked');
	$.get("../serviceSearchMock?serviceNameAndVersion="+seviceName,function(result){
		if(result)
		{
			$("#mock").show();
			$("select[name='nameandversion']").val(result.value);
			map["nameandversion"]=result.value;
			$(".select_gallery").select2();
			$("input[name='isMock']").eq(0).prop('checked', 'checked');
		}
	});

}); 

function update()
{
	var seviceName = getUrlParam("servicename");
	updatePolicy(seviceName);
}
</script>