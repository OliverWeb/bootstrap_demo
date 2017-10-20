<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>microservice-method-policy</title>
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
					<tr style="height:50px" />
							<td style="text-align:right;vertical-align:bottom;width:35%;"><font  size="3px">默认版本</font></td>
							<td style="vertical-align:bottom;padding-left:20px;"><select id="defaultversion" class="easyui-combobox"  name='defaultversion'  style="width:250px;" panelHeight='auto'></select><font  color="red" size="2px">(为0表示不配置)</font>
							</td>			
					</tr>
					<tr>
							<td style="text-align:right;vertical-align:bottom;width:35%;"><font  size="3px" style="margin-left:35px;">方法执行超时时间（ms）</font></td>
							<td ><input type="text"  value=""  onkeyup="value=value.replace(/[^\d]/g,'')" onafterpaste="this.value=this.value.replace(/[^\d]g,'')" onblur = "this.value=((this.value=this.value.replace(/[^\d]/g,''))=='0'?'':this.value)" name='executionTimeout'> <font  color="red" size="2px">(填0不生效，默认为3000)</font></td>			
					</tr>
					<tr style="height:50px;">
							<td style="text-align:right;vertical-align:bottom;width:35%;"><font  size="3px">是否开启灰度</font></td>
							<td style="vertical-align:bottom;padding-left:20px;">
								<input name="isGray" type="radio" value="true" ><font  size="3px">是</font></input>
								<input name="isGray" type="radio" value="false" ><font  size="3px">否</font></input>
							</td>	
					</tr>
					<tr style="height:50px;display:none;" class="gray" />
							<td style="text-align:right;vertical-align:bottom;width:35%;"><font  size="3px">灰度版本</font></td>
							<td style="vertical-align:bottom;padding-left:20px;"><select id='grayversion' class="easyui-combobox"  name='grayversion'  style="width:250px;" panelHeight='auto'></select>
							</td>			
					</tr>
					<tr style="height:50px;display:none;" class="gray"/>
							<td style="text-align:right;vertical-align:bottom;width:35%;"><font  size="3px">灰度判断依据</font></td>
							<td style="vertical-align:bottom;padding-left:20px;"><select id='target'  class="easyui-combobox"  name='target'  style="width:250px;" panelHeight='auto'  data-options="onChange:function(){changeTarget();}"></select>
							</td>			
					</tr>
					<tr style="height:60px;display:none;" class="gray">
							<td style="text-align:right;vertical-align:bottom;width:35%;"><font  size="3px" style="margin-left:35px;">灰度比例</font></td>
							<td style="vertical-align:middle;padding-left:20px;"><input class="easyui-slider"  name='rate' id='rate'  value="" style="width:250px" data-options="showTip:true,rule:[0,'|',25,'|',50,'|',75,'|',100]" /></td>			
					</tr>
					<tr style="height:50px;display:none;" class="gray">
							<td style="text-align:right;vertical-align:bottom;width:35%;"><font  size="3px" style="margin-left:35px;">灰度标签</font></td>
							<td ><input type="text"  value=""  name='tags' onkeyup="check(this);"><font  color="red" size="2px">(多个时以","分隔)</font></td>			
					</tr>
					<tr style="display:none;" class="gray">
							<td style="text-align:right;vertical-align:bottom;width:35%;"><font  size="3px" style="margin-left:35px;">灰度白名单</font></td>
							<td ><input type="text"  value=""  name='whiteList' onkeyup="check(this);"><font  color="red" size="2px">(多个时以","分隔)</font></td>			
					</tr>
					<tr style="display:none;" class="gray">
							<td style="text-align:right;vertical-align:bottom;width:35%;"><font  size="3px" style="margin-left:35px;">灰度黑名单</font></td>
							<td ><input type="text"  value=""  name='blackList' onkeyup="check(this);"><font  color="red" size="2px">(多个时以","分隔)</font></td>			
					</tr>
					<tr style="height:50px;"><td colspan="2" style="text-align:center;vertical-align:bottom;"><input type="button" value="更新" onclick="updateMethodPolicy();javascript:void(0)" /></tr>
			</table>
			</center>
		
</body>
</html>
<script type="text/javascript">
$(function(){ 
	 $(":radio").click(function(){
		   if($(this).val()=="true")
			{
			   $(".gray").show();
			}
		   else
			{
			   $(".gray").hide();
			}
		  });

	 var mdata = $.parseJSON(getUrlParam("data"));
	 $("b").children().eq(0).text("["+mdata.serviceName+"方法配置]");
	 $("input[name='executionTimeout']").val(mdata.executionTimeout);
	 $('#rate').slider('setValue',mdata.rate/100);    	   
	 $("input[name='tags']").val(mdata.tags);
	 if(mdata.target>0)
	{
		 $("input[name='isGray']").eq(0).prop('checked', 'checked');
		 $(".gray").show();
	}
	 else
	{
		 $("input[name='isGray']").eq(1).prop('checked', 'checked');
	}
	 
	 var versions=window.parent.methodMap[mdata.methodName].split(",");
	 var defaultversionList = [];
	 var grayversionList=[];
	 var targetList=[];
	 defaultversionList.push({"value": 0,"text":0});
	 if(versions.length!=0)
	{
		 for(var i=0;i<versions.length;i++) 
			{
				defaultversionList.push({"value": $.trim(versions[i]),"text":$.trim(versions[i])});
				grayversionList.push({"value": $.trim(versions[i]),"text":$.trim(versions[i])});
			}
	}
	
	 targetList.push({"value": 1,"text":"用户名"});
	 targetList.push({"value": 2,"text":"用户ID"});
	 targetList.push({"value": 3,"text":"IP地址"});
	 $("#defaultversion").combobox("loadData",defaultversionList);
	 $("#grayversion").combobox("loadData",grayversionList);
	 $("#target").combobox("loadData",targetList)
	 $("#defaultversion").combobox('setValue',mdata.defaultversion);
	 $("#grayversion").combobox('setValue',mdata.grayversion);
	 if(mdata.target!=0)
	{
		 $("#target").combobox('setValue',mdata.target);
	}
	 else
	 {
		 $("#target").combobox('setValue',1);
	 }
}); 

function changeTarget()
{
	var mdata = $.parseJSON(getUrlParam("data"));
	  if($("#target").combobox('getValue')=="1")
	{
		 $("input[name='whiteList']").val(mdata.userNameWhiteList);
		 $("input[name='blackList']").val(mdata.userNameBlackList);
	}
	 else if($("#target").combobox('getValue')=="2")
	{
		 $("input[name='whiteList']").val(mdata.userIdWhiteList);
		 $("input[name='blackList']").val(mdata.userIdBlackList);
	} 
	 else if($("#target").combobox('getValue')=="3")
	{
		 $("input[name='whiteList']").val(mdata.ipWhiteList);
		 $("input[name='blackList']").val(mdata.ipBlackList);
	}
}

function updateMethodPolicy()
{
	var defaultversion= $("#defaultversion").combobox('getValue');
	var executionTimeout=$("input[name='executionTimeout']").val();
	var isGray=$("input[type='radio']:checked").val();
	var grayversion="0";
	var target="0";
	var rate="";
	var tags="";
	var whiteList="";
	var blackList="";
	if(isGray=="true")
	{
		grayversion=$("#grayversion").combobox('getValue');
		target=$("#target").combobox('getValue');
		rate=$('#rate').slider('getValue');
		tags=$("input[name='tags']").val();
		whiteList=$("input[name='whiteList']").val();
		blackList=$("input[name='blackList']").val();
	}
	if(rate=="")
	{
		rate="0";
	}

	var value=defaultversion+":"+executionTimeout+":"+grayversion+":"+target+":"+rate+":"+replace(tags)+":"+replace(whiteList)+":"+replace(blackList);
	var mdata = $.parseJSON(getUrlParam("data"));
	var beforeWhiteList="{}";
	var beforeBlackList="{}";
	if(target=="1")
	{
		beforeWhiteList=mdata.userNameWhiteList;
		beforeBlackList=mdata.userNameBlackList;
	}
	else if(target=="2")
	{
		beforeWhiteList=mdata.userIdWhiteList;
		beforeBlackList=mdata.userIdBlackList;
	}
	else if(target=="3")
	{
		beforeWhiteList=mdata.ipWhiteList;
		beforeBlackList=mdata.ipBlackList;
	}
	
	var beforevalue=mdata.defaultversion+":"+mdata.executionTimeout+":"+mdata.grayversion+":"+mdata.target+":"+mdata.rate/100+":"+replace(mdata.tags)+":"+replace(beforeWhiteList)+":"+replace(beforeBlackList);
	console.log(beforevalue);
	if(value!=beforevalue)
	{
		var servicenameandversion=mdata.serviceName;
		var methodname=mdata.methodName;
		var data={serviceNameAndVersion:servicenameandversion,methodName:methodname,beforeInfo:beforevalue,info:value,createtime:getMyDate(new Date())};
		console.log(data);
		$.ajax({
	        type: "POST",
	        url: "../microservicemethodcheck/insert/",
	        contentType: "application/json",
	        dataType: "json",
	        data: JSON.stringify(data),
	        success: function (jsonResult) {
	        }
	    });
		window.history.back();
	}
}
function replace(str)
{
	if(str=="")
	{
		str="{}";
	}
	return str;
}
function check(obj)
{
	var value=$(obj).val();
	if(value!="")
	{
		value=value.replace("，",",");		
		$(obj).val(value);
	}
}
</script>