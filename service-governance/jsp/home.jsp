<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>首页</title>
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
<style>
html,body{height:100%;}

</style>
<body style="overflow:-Scroll;overflow-y:hidden;overflow-x:hidden" >
	<div style="margin: -10px 0;text-align:right" class="login"><a href='javascript:void(0)' class='tologin'>未登录</a></div>
	<h1 align="center">SERVICE</h1>
	<div class="easyui-layout" style="width: 100%; height: 90%;">
		<div data-options="region:'west',split:true" title="菜单栏"
			style="width: 150px;">
			<ul id="tree"></ul>
		</div>
		<div
			data-options="region:'center',iconCls:'icon-star_bronze_half_grey'">
			<div class="easyui-tabs" fit="true" border="false" id="tabs">
				<div title="首页">
					<h1>Welcome to service-govenance .</h1>
				</div>
			</div>
		</div>
	</div>
	<div id="tabsMenu" class="easyui-menu" style="width: 120px;">
		<div name="close">关闭</div>
		<div name="Other">关闭其他</div>
		<div name="All">关闭所有</div>
	</div>
	<div id="loginAndRegDialog" title="用户登陆"
		style="width: 250px; height: 200px;">
		<form id="loginInputForm" action="post">
			<table>
				<tr>
					<th>用户名</th>
					<td><input name="name" type="text" /></td>
				</tr>
				<tr>
					<th>密码</th>
					<td><input name="password" type="password" /></td>
				</tr>
			</table>
		</form>
	</div>
</body>
</body>

<script type="text/javascript">
var loginAndRegDialog;

$(function() {
	loginAndRegDialog = $("#loginAndRegDialog");
	// 将div渲染程dialog
	loginAndRegDialog.dialog({
		closable : false,
		modal : true,
		buttons : [ {
			text : '跳过',
			handler : function() {
				loginAndRegDialog.dialog('close');
			}
		}, {
			text : '登陆',
			handler : function() {
				$.ajax({
					type : "POST", 
					url : "../login",
					data : $("#loginInputForm").serialize(),
					cache : false,	// 不缓存此页面
					dataType : 'json',	// 预期服务器返回的数据类型。
					success : function(data, textStatus) {	// 请求成功后的回调函数
						if (data && data.success) {	// 成功, 隐藏dialog
							loginAndRegDialog.dialog('close');
							isLogin=true;
							$(".login").html("欢迎，"+data.name);
							$.messager.alert('标题',data.msg);
						} else { // 失败, 弹 对话框
							$.messager.alert('标题',data.msg);
						}						
					},
					error : function (XMLHttpRequest, textStatus, errorThrown) {
						console.info("Ajax 执行失败");
					}
				});
			}
		} ]
	});
	
	$(".tologin").click(function(){
		loginAndRegDialog.dialog('open');
	});

});
	var treeData=[{
		text:'服务治理',
		children:[{
			text:'微服务',
			children:[{
				text:'微服务列表',
				attributes:{
					url:'${pageContext.request.contextPath}/jsp/microservice-config.jsp' 
				}
			},
			{
				text:'微服务配置待审核',
				attributes:{
					url:'${pageContext.request.contextPath}/jsp/microservicecheck.jsp' 
				}
			},
			{
				text:'微服务配置已审核',
				attributes:{
					url:'${pageContext.request.contextPath}/jsp/microservicechecked.jsp' 
				}
			},
			{
				text:'微服务节点配置待审核',
				attributes:{
					url:'${pageContext.request.contextPath}/jsp/microserviceipcheck.jsp' 
				}
			},
			{
				text:'微服务节点配置已审核',
				attributes:{
					url:'${pageContext.request.contextPath}/jsp/microserviceipchecked.jsp' 
				}
			},
			{
				text:'微服务方法配置待审核',
				attributes:{
					url:'${pageContext.request.contextPath}/jsp/microservicemethodcheck.jsp' 
				}
			},
			{
				text:'微服务方法配置已审核',
				attributes:{
					url:'${pageContext.request.contextPath}/jsp/microservicemethodchecked.jsp' 
				}
			}]
		},
		{
			text:'公网网关服务',
			children:[{
				text:'公网网关服务列表',
				attributes:{
					url:'${pageContext.request.contextPath}/jsp/gateway-config.jsp'
				}
			},
			{
				text:'公网网关待审核',
				attributes:{
					url:'${pageContext.request.contextPath}/jsp/check.jsp'
				}
			},
			{
				text:'公网网关已审核',
				attributes:{
					url:'${pageContext.request.contextPath}/jsp/checked.jsp'
				}
			},
			{
				text:'公网网关节点配置待审核',
				attributes:{
					url:'${pageContext.request.contextPath}/jsp/gatewayipcheck.jsp'
				}
			},
			{
				text:'公网网关节点配置已审核',
				attributes:{
					url:'${pageContext.request.contextPath}/jsp/gatewayipchecked.jsp'
				}
			},
			{
				text:'公网网关服务历史版本列表',
				attributes:{
					url:'${pageContext.request.contextPath}/jsp/gateway-histroy.jsp'
				}
			}]
		},
		{
			text:'服务监控',
			attributes:{
				url:'${pageContext.request.contextPath}/jsp/prometheus.jsp'
			}		
		}]
	}];
</script>

<script type="text/javascript">
var parentmap={};
var data=[];
var servicedata=[];
var gatewaydata=[];
var ismicroinit=false;
var isinit=false;
var deletelist=new Array();
var addlist=new Array();
var updatelist=new Array();
var backlist=new Array();
var gatewayipLen=1;
var serviceupdatelist=new Array();
var serviceipupdatelist=new Array();
var gatewayipupdatelist=new Array();
var methodupdatelist=new Array();
var degradeList=new Array();
var hascheckbetaList=new Array();
var hascheckbeta=false;
var isLogin=false;
var methodMap={};
$("#tree").tree({
	data : treeData,
	lines : true,
	onClick : function(node) {
		if (node.attributes) {
			Open(node.text, node.attributes.url);
		}
	}
});

//绑定tabs的右键菜单
$("#tabs").tabs({
	onContextMenu : function(e, title) {
		e.preventDefault();
		$('#tabsMenu').menu('show', {
			left : e.pageX,
			top : e.pageY
		}).data("tabTitle", title);
	}
});

//实例化menu的onClick事件
$("#tabsMenu").menu({
	onClick : function(item) {
		CloseTab(this, item.name);
	}
});

//在右边center区域打开菜单，新增tab
function Open(text, url) {

var content = '<iframe scrolling="auto" frameborder="0"  src="' + url
		+ '" style="width:100%;height:100%;"></iframe>';
if ($("#tabs").tabs('exists', text)) {
	var currTab = $('#tabs').tabs('getTab', text); 
	$('#tabs').tabs('select',text);
	$('#tabs').tabs('update', {
		tab : currTab,
		options : {
			content : content,
			closable : true
		}
	}); 
} else {
	$('#tabs').tabs('add', {
		title : text,
		closable : true,
		content : content
	});
}
}

//几个关闭事件的实现
function CloseTab(menu, type) {
var curTabTitle = $(menu).data("tabTitle");
var tabs = $("#tabs");

if (type === "close") {
	tabs.tabs("close", curTabTitle);
	return;
}

var allTabs = tabs.tabs("tabs");
var closeTabsTitle = [];

$.each(allTabs, function() {
	var opt = $(this).panel("options");
	if (opt.closable && opt.title != curTabTitle && type === "Other") {
		closeTabsTitle.push(opt.title);
	} else if (opt.closable && type === "All") {
		closeTabsTitle.push(opt.title);
	}
});

for (var i = 0; i < closeTabsTitle.length; i++) {
	tabs.tabs("close", closeTabsTitle[i]);
}
}

function refreshgatewayip()
{
	gatewayipupdatelist=new Array();
	hascheckbeta=false;
	$.ajax({
        type: "GET",
        url: "../gatewayipcheck/list",
        async: false,
        success: function (result) {          
        	if(result)
    		{
        		for(var i=0;i<result.length;i++)
        		{
        			gatewayipupdatelist.push(result[i].ip+":"+result[i].port);
        			if(result[i].beta=="1"&&result[i].beforebeta!="1")
        			{
        				hascheckbeta=true;
        			}
        		}
    		}
        }			
    });
}

function refreshmicroservice()
{
	serviceupdatelist=new Array();
	$.ajax({
        type: "GET",
        url: "../microservicecheck/list",
        async: false,
        success: function (result) {          
        	if(result)
    		{
    			for(var i=0;i<result.length;i++)
    			{
    				serviceupdatelist.push(result[i].serviceNameAndVersion);
    			}
    		}
        }			
    });
}

function refreshmicroservicemethod()
{
	methodupdatelist=new Array();
	$.ajax({
        type: "GET",
        url: "../microservicemethodcheck/list",
        async: false,
        success: function (result) {          
        	if(result)
    		{
        		for(var i=0;i<result.length;i++)
    			{
    				methodupdatelist.push(result[i].serviceNameAndVersion+result[i].methodName);
    			}
    		}
        }			
    });
}

function refreshmicroserviceip()
{
	serviceipupdatelist=new Array();
	hascheckbetaList=new Array();
	$.ajax({
        type: "GET",
        url: "../microserviceipcheck/list",
        async: false,
        success: function (result) {          
        	if(result)
    		{
        		for(var i=0;i<result.length;i++)
    			{
    				serviceipupdatelist.push(result[i].serviceNameAndVersion+":"+result[i].ip+":"+result[i].port);
    				if(result[i].beta=="1"&&result[i].beforebeta!="1")
    				{
    					hascheckbetaList.push(result[i].serviceNameAndVersion);
    				}
    			}
    		}
        }			
    });
}

$.get("../etcd/list?prefix=/services/",function(result){
	if(result)
	{
		refreshmicroservice();
		initRead(result);
	}	
});

function refreshgatewaycheck()
{
	addlist=new Array();
	deletelist=new Array();
	updatelist=new Array();
	backlist=new Array();
	$.ajax({
        type: "GET",
        url: "../gatewaycheck/list/",
        async: false,
        success: function (result) {          
        	if(result)
    		{
        		for(var i=0;i<result.length;i++)
    			{
        			for(var i=0;i<result.length;i++)
        			{
        				var action=result[i].action;
        				if(action==1)
        				{
        					addlist.push(result[i].info.split(":")[0]);				
        				}
        				else if(action==0)
        				{
        					deletelist.push(result[i].beforeInfo.split(":")[0]);
        				}
        				else if(action==2)
        				{
        					updatelist.push(result[i].beforeInfo.split(":")[0]);
        				}
        				else if(action==3)
        				{
        					backlist.push(result[i].beforeInfo.split(":")[0]);
        				}
        			}				
    			}
    		}
        }			
    });
}

$.get("../etcd/list?prefix=/gateway/public/services/",function(getwayresult){
	$.get("../gatewaycheck/list/",function(result){
		if(result)
		{
			for(var i=0;i<result.length;i++)
			{
				var action=result[i].action;
				if(action==1)
				{
					addlist.push(result[i].info.split(":")[0]);				
				}
				else if(action==0)
				{
					deletelist.push(result[i].beforeInfo.split(":")[0]);
				}
				else if(action==2)
				{
					updatelist.push(result[i].beforeInfo.split(":")[0]);
				}
				else if(action==3)
				{
					backlist.push(result[i].beforeInfo.split(":")[0]);
				}
			}				
		}	
		if(getwayresult)
		{
			initReadGateway(getwayresult);
		}
	});
	
});


function initRead(result){
	var map={};
	var tmpList=new Array();
	var serviceList=new Array();
	for(var i=0;i<result.length;i++)
		{
			var key=result[i].key;
			var value=result[i].value;
			if(key.indexOf("/info")>0&&(typeof(value) != "undefined")&&value!="")
				{
					var mapkey=key.split("/")[2];
					if(typeof(map[mapkey]) != "undefined")
					{
						map[mapkey].push(value);
					}else
					{
						var arrList = new Array();
						arrList.push(value);
						map[mapkey]=arrList;
					}
				}
		}
	for(var i=0;i<result.length;i++)
		{
			var key=result[i].key;
			var name=result[i].name
			if(key!=("/services")&&name==".")
				{
					tmpList.push(key.split("/")[2]);
				}
		}
	tmpList.sort();
	var data = [];
	for(var i=tmpList.length-1;i>=0;i--)
	{
		var name=tmpList[i];
		var link;
		var config;
		var methodlink;
		if(name in map) 
		{
			link="<a href='ip.jsp?servicename="+name+"' ><span class='l-btn-left l-btn-icon-left'><span class='l-btn-text'><font size='3px'>集群地址</font><span class='l-btn-icon icon-search'>&nbsp;</span></span></a>";
			methodlink="<a href='method.jsp?servicename="+name+"' ><span class='l-btn-left l-btn-icon-left'><span class='l-btn-text'><font size='3px'>方法列表</font><span class='l-btn-icon icon-search'>&nbsp;</span></span></a>";
		}
		else
		{
			link="<a href='' onclick='return false'  style='text-decoration:none'><font size='3px'>无节点</font></a>";
			methodlink="<a href='' onclick='return false'  style='text-decoration:none'><font size='3px'>不可获取</font></a>"
		}
		if($.inArray(name, serviceupdatelist)>=0)
		{
			config="<a href='javascript:void(0)'  style='text-decoration:none'><font size='3px' color='blue'>更新未审核</font></a>";
		}
		else
		{
			config="<a href='microservice-policy.jsp?servicename="+name+"' ><span class='l-btn-left l-btn-icon-left'><span class='l-btn-text'><font size='3px'>配置</font><span class='l-btn-icon icon-edit'>&nbsp;</span></span></a>";
		}
	
		var version=name.split(":")[1];
		name=name.split(":")[0];
		data[i]={name:name,version:version,link:link,config:config,methodlink:methodlink};
		var jsonDataString={"serviceName":name,"version":version};
		serviceList.push(jsonDataString);
	}
	parentmap = map;
	servicedata=data;
	/* $.ajax({
        type: "POST",
        url: "../microservice/insertList/",
        dataType: "json",
        async: true,
        data: {"json": JSON.stringify(serviceList)},
        success: function (result) {     	
        }			
    }); */
}

function initReadGateway(result){
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
        		gatewayipLen=gatewayiplist.length;
        	}
        }			
    });
	var link;
	var data = [];
	var servicemap={};
	var statusmap={};
	var qpsmap={};
	var gatewayserviceList=new Array();
	var list=new Array();
	for(var i=0;i<result.length;i++)
		{
			var key=result[i].key;
			var name=result[i].name;
			var value=result[i].value;
			if(key.indexOf("services/")>0&&name.indexOf("/")<0)
				{	
					gatewayserviceList.push(name);
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
	gatewayserviceList.sort();
	for(var i=0;i<gatewayserviceList.length;i++)
		{
			var servicemethod="";
			var servicenameandversion="";
			var service=servicemap[gatewayserviceList[i]];
			var servicestatus=statusmap[gatewayserviceList[i]]
			var qps=qpsmap[gatewayserviceList[i]];
			
			if(typeof(qps) == "undefined"||qps=="")
			{
				qps="64";
			}
			
			var jsonDataString={"gatewayServiceName":gatewayserviceList[i],"serviceName":service.split(":")[0],"serviceVersion":service.split(":")[1],"serviceMethod":service.split(":")[2],"status":servicestatus,"qps":qps,"ver":0};
			var jsonDataString2={"gatewayServiceName":gatewayserviceList[i],"serviceName":service.split(":")[0],"serviceVersion":service.split(":")[1],"serviceMethod":service.split(":")[2],"status":servicestatus,"qps":qps,"ver":1};
			list.push(jsonDataString);
			list.push(jsonDataString2);
			
			var value=gatewayserviceList[i]+":"+service+":"+qps+":"+servicestatus;
			if(typeof(service) != "undefined")
				{
					servicenameandversion=service.split(":")[0]+":"+service.split(":")[1];
					servicemethod=service.split(":")[2];
				}
			if(typeof(servicestatus) == "undefined"||servicestatus=="")
				{
					servicestatus="inactive";
				}
				
			if(servicestatus=="active")
			{
				displaystatus="<a href='javascript:void(0)' class='active' value='"+service+"'>未降级</a>";
				degrade="<a href='javascript:void(0)'><span class='l-btn-left l-btn-icon-left'><span class='l-btn-text'><font color='red'  size='3px' class='degrade' id='"+value+"'>屏蔽</font></span><span class='l-btn-icon icon-cancel'>&nbsp;</span></span></a>"+
				"<a href='javascript:void(0)' ><span class='l-btn-left l-btn-icon-left'><span class='l-btn-text'><font color='red'  size='3px' class='display' id='"+value+"'>降级</font></span><span class='l-btn-icon icon-no'>&nbsp;</span></span></a>";
			}
			else if(servicestatus=="inactive")
			{
				displaystatus="<a href='javascript:void(0)' class='active' value='"+service+"'>已屏蔽降级</a>";
				degrade="<a href='javascript:void(0)' ><span class='l-btn-left l-btn-icon-left'><span class='l-btn-text'><font color='green'  size='3px' class='recover' id='"+value+"'>恢复</font></span><span class='l-btn-icon icon-ok'>&nbsp;</span></span></a>";
				degradeList.push(gatewayserviceList[i]);
			}
			else if(servicestatus=="displace")
			{
				displaystatus="<a href='javascript:void(0)' class='displace' value='"+service+"'>已业务降级</a>";
				degrade="<a href='javascript:void(0)' ><span class='l-btn-left l-btn-icon-left'><span class='l-btn-text'><font color='green'  size='3px' class='recover' id='"+value+"'>恢复</font></span><span class='l-btn-icon icon-ok'>&nbsp;</span></span></a>";
				degradeList.push(gatewayserviceList[i]);
			}
			else if(servicestatus=="mingle")
			{
				displaystatus="<a href='javascript:void(0)' class='mingle' value='"+service+"' id='"+gatewayserviceList[i]+"'>已自定义降级</a>";
				degrade="<a href='javascript:void(0)' ><span class='l-btn-left l-btn-icon-left'><span class='l-btn-text'><font color='green'  size='3px' class='recover' id='"+value+"'>恢复</font></span><span class='l-btn-icon icon-ok'>&nbsp;</span></span></a>";
				degradeList.push(gatewayserviceList[i]);
			}
	
				if($.inArray(gatewayserviceList[i], window.parent.deletelist)>=0)
				{
					link="<a href='javascript:void(0)' class='edit' name="+gatewayserviceList[i]+" style='text-decoration:none'><font size='3px' color='red'>删除未审核</font></a>";
				}
				else if($.inArray(gatewayserviceList[i], window.parent.updatelist)>=0)
				{
					link="<a href='javascript:void(0)' class='edit' name="+gatewayserviceList[i]+" style='text-decoration:none'><font size='3px' color='blue'>更新未审核</font></a>";
				}
				else if($.inArray(gatewayserviceList[i], window.parent.backlist)>=0)
				{
					link="<a href='javascript:void(0)' class='back' name="+gatewayserviceList[i]+" style='text-decoration:none'><font size='3px' color='#FF9933'>回退未审核</font></a>";
				}
				else
				{
					link="<a href='gateway-edit.jsp?dataId="+i+"' class='edit' name='"+gatewayserviceList[i]+"'><span class='l-btn-left l-btn-icon-left'><span class='l-btn-text'><font size='3px'>治理配置</font><span class='l-btn-icon icon-edit'>&nbsp;</span></span></a>";
				}
				
				data[i]={checkbox:value,name:gatewayserviceList[i],servicenameandversion:servicenameandversion,servicemethod:servicemethod,qps:parseInt(qps)*gatewayipLen,displaystatus:displaystatus,degrade:degrade,link:link};
			}
			gatewaydata = data;
			
			$.ajax({
		        type: "POST",
		        url: "../gatewayservice/insertList/",
		        dataType: "json",
		        async: true,
		        data: {"json": JSON.stringify(list)},
		        success: function (result) {     	
		        }			
		    });
}

function getTime()
{
	var myDate = new Date();
	//获取当前年
	var year=myDate.getFullYear();
	//获取当前月
	var month=myDate.getMonth()+1;
	//获取当前日
	var date=myDate.getDate(); 
	var h=myDate.getHours();       //获取当前小时数(0-23)
	var m=myDate.getMinutes();     //获取当前分钟数(0-59)
	var s=myDate.getSeconds();  

	var now=year+'-'+month+"-"+date+" "+h+':'+m+":"+s;
}
</script>




</html>