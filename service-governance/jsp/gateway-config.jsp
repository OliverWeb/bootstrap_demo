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
	href="${pageContext.request.contextPath}/css/xcConfirm.css">
<script type="text/javascript"
	src="${pageContext.request.contextPath}/jquery-easyui-1.5/jquery-1.9.1.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/jquery-easyui-1.5/jquery.easyui.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/jquery-easyui-1.5/constant.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/gateway-config.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/xcConfirm.js"></script>
<style>
html,body{margin: 0;padding:0}
</style>
</head>
<body>
		<div style="width: 100%; text-align:center;">
			<div style="text-align:center;white-space: nowrap;"><b style="color:blue"><font color="red"  size="5px">[公网网关服务列表]</font></b></div>
			</br>
			<div style="text-align:left;white-space: nowrap; ">
				<a style="color: green; text-decoration:none;font-size:15px;"href="javascript:void(0)"  id="adding"   onclick="window.parent.Open('公网网关待审核','check.jsp')"></a>			
				<a style="color: red; text-decoration:none;font-size: 15px;"href="javascript:void(0)"  id="deleteing" onclick="window.parent.Open('公网网关待审核','check.jsp')"></a>	
				<a style="color: blue; text-decoration:none;font-size: 15px;"href="javascript:void(0)"  id="updateing" onclick="window.parent.Open('公网网关待审核','check.jsp')"></a>	
				<a style="color: #FF9933; text-decoration:none;font-size: 15px;"href="javascript:void(0)"  id="backing" onclick="window.parent.Open('公网网关待审核','check.jsp')"></a>			
			</div>
			</br>
			
			<div id="tb">
				<a style="text-align:right;"href="javascript:void(0)" class="easyui-linkbutton"
					iconcls="icon-reload" plain="true"
					onclick="javascript:window.location.reload()"><font   size="2px">刷新</font></a>
				<a href="gateway-add.jsp" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true"><font   size="2px">添加</font></a>
				<a  class="easyui-linkbutton"  id="delete" data-options="iconCls:'icon-clear',plain:true"><font   size="2px">删除</font></a>
				<a href="gatewayip.jsp" class="easyui-linkbutton"
					iconcls="icon-search" plain="true" ><font   size="2px">公网网关集群地址</font></a>
				<a  class="easyui-linkbutton"  id="download" data-options="iconCls:'icon-print',plain:true"><font   size="2px">导出proto</font></a>
				 <div  style="float: right;">  
                    <input id="ss" class="easyui-searchbox"  
                        searcher="doSearch" prompt="请输入搜索内容"  
                        style="width: 300px; vertical-align: middle;"></input>   
                </div>  
			</div>
		</div>

		<table id="dg"></table>

		<div id="displayDialog" title="降级配置"
		style="display: none;width: 450px; height: 200px;" closed="true">
		<form id="displayInputForm" action="post">
			<table align="center"  width="100%" style="margin-top: 10px;">
				<tr>
					<td align="center">对应Mock服务名版本</td>
					<td colspan=2><input  id="displayservicenameandversion" name="servicenameandversion" type="text"  style="text-align:center;width:400px;height:20px;" readonly/></td>
				</tr>
				<tr style="display:none;">
					<td>降级方法</td>
					<td colspan=2><input id="displaymethod" name="method" type="text"  style="text-align:center;width:240px;height:20px;"  readonly/></td>
				</tr> 
			
				<tr style="height:100px;">
					<td align="center">Mock服务占比</br></br><input class="easyui-slider"  name='mockpercent' id='mockslider'  value="100" style="width:200px" data-options="showTip:true,rule:[0,'|',25,'|',50,'|',75,'|',100]" /></td>
					<td  align="center" id='screentd'>屏蔽占比</br></br><input class="easyui-slider"  id='screenslider'  value="0" style="width:200px" data-options="showTip:true,rule:[0,'|',0],disabled:true" /></td>
					<td  align="center" id='normaltd'>原服务占比</br></br><input class="easyui-slider"  name='percent'  id='slider'  value="0" style="width:200px" data-options="showTip:true,rule:[0,'|',0],disabled:true" /></td>
				</tr>
			</table>
			<input id="displaygatewayservice" name="gatewayservice" type="hidden" style="text-align:center;width:240px;height:20px;" />
			
		</form>
		
	</div>
</body>
</html>
<script type="text/javascript">
var gatewayip=new Array();
$(function(){ 
	window.parent.refreshgatewaycheck();
	load();
    $("body").on("click","#all",function(){
    	var isChecked = $(this).prop("checked");
        $("input[name='checkbox']").prop("checked", isChecked);
	})
	$("#deleteing").text("待删除未审核("+window.parent.deletelist.length+")");
    $("#adding").text("待添加未审核("+window.parent.addlist.length+")");
    $("#updateing").text("待更新未审核("+window.parent.updatelist.length+")");
    $("#backing").text("待回退未审核("+window.parent.backlist.length+")");
    
    displayDialog = $("#displayDialog");
	// 将div渲染程dialog
	displayDialog.dialog({
		closable : false,
		modal : true,
		buttons : [ {
			text : '关闭',
			handler : function() {
				displayDialog.dialog('close');
				$('#mockslider').slider('setValue',100);
				$('#screenslider').slider('setValue',0);
				$('#slider').slider('setValue',0);
			}
		}, {
			text : '确定',
			handler : function() {
				$.ajax({
					type : "POST", 
					url : "../diydegrade",
					data : $("#displayInputForm").serialize(),
					cache : false,	// 不缓存此页面
					dataType : 'json',	// 预期服务器返回的数据类型。
					top:1000,
					success : function(data, textStatus) {	// 请求成功后的回调函数
						if (data && data.success) {	// 成功, 隐藏dialog
							
						} 				
						displayDialog.dialog('close');
						window.location.reload();
					},
					error : function (XMLHttpRequest, textStatus, errorThrown) {
						console.info("Ajax 执行失败");
					}
				});
			}
		} ]
	});
}); 
function load()
{
	if(window.parent.isinit)
	{
		$.ajax({
	        type: "GET",
	        url: "../etcd/list?prefix=/gateway/front/services/api/nodes",
	        async: false,
	        success: function (result) {    
	        	if(result)
	        	{
	        		var gatewayiplist=new Array();
	        		for(var i=0;i<result.length;i++)
	        		{
	        			var key=result[i].key;
	        			var name=result[i].name;
	        			var value=result[i].value;
	        			if(key.indexOf("/info")>0&&typeof(value) != "undefined")
	        			{
	        				var ip=name.split("/")[0].split(":")[0];
	        				gatewayiplist.push(ip);
	        			}
	        		}
	        		window.parent.gatewayipLen=gatewayiplist.length;
	        	}
	        }			
	    });
		$.get("../etcd/list?prefix=/gateway/public/services/",function(result){	
				refresh(result);
		});
	}
	else
	{
		init();
		window.parent.isinit=true;	
	}	
}

	

$('#mockslider').slider({
	onSlideEnd:function (value) {
		 $('#screenslider').slider('enable');
	   $('#slider').slider('setValue',0);
       var screenMax=100-value;
       $('#screenslider').slider({
    		rule: [0, '|', screenMax/2,'|', screenMax],
    		min:0,     //允许的最小值
            max:screenMax,  
            value:screenMax,
    		onSlideEnd:function (value) {
    	       var slidervalue=screenMax-value;
    	       $('#slider').slider('setValue',slidervalue);    	       
    	    }
    	});
		if(value==100)
		{
			 $('#screenslider').slider('disable');
		}
       $('#slider').slider({
    	   rule: [0, '|', screenMax/2,'|', screenMax],
    		min:0,     //允许的最小值
            max:screenMax,  
            value:0,
            disabled:true
       });
    }
});

</script>