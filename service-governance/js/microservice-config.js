function init()
{
	var data=window.parent.servicedata;
	if(data)
	{
		if(data.length==0)
		{
			setTimeout(function () {
				window.location.reload();
		    }, 500);
		}
	}
	$('#dg').datagrid({ loadFilter: pagerFilter }).datagrid({
		remoteSort: false,
		toolbar: '#tb',
		fitColumns : true,
		columns:[[
		  		{field:'name',title:'微服务名',width:'30%',sortable:true,sorter:function(a,b){
		  			a=a;
                	b=b;
                    if(a < b)
                        return -1;
                    else if(a == b)
                        return 0;
                    else
                        return 1;
		  		}},
		  		{field:'version',title:'版本',width:'10%'},
		  		{field:'link',title:'部署地址',width:'20%'},
		  		{field:'config',title:'服务配置',width:'20%'},
		  		{field:'methodlink',title:'方法列表',width:'20%'}
		      ]],
		pagination:true,
		fitColumns : true,
        striped : true, // 隔行变色特性
        nowrap : true,
        rownumbers : true,
		data: data
	});
	var p = $('#dg').datagrid('getPager');  
    $(p).pagination({  
        pageSize: 10,//每页显示的记录条数，默认为10    
        pageList: [5, 10, 15],//可以设置每页记录条数的列表    
        beforePageText: '第',//页数文本框前显示的汉字    
        afterPageText: '页    共 {pages} 页',  
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',  
    });  
}

function refresh(result)
{
  	if(result)
	{
		var map={};
		var tmpList=new Array();
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
				var name=result[i].name;
				if(name!=("/services")&&name==".")
					{
						tmpList.push(key.split("/")[2]);
					}
			}
		tmpList.sort();
		var data = [];
		for(var i=tmpList.length-1;i>=0;i--)
		{
			var name=tmpList[i];
			var status;
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
			if($.inArray(name, window.parent.serviceupdatelist)>=0)
			{
				config="<a href='javascript:void(0)'  class='cue' style='text-decoration:none'><font size='3px' color='blue'>更新未审核</font></a>";
			}
			else
			{
				config="<a href='microservice-policy.jsp?servicename="+name+"' ><span class='l-btn-left l-btn-icon-left'><span class='l-btn-text'><font size='3px'>配置</font><span class='l-btn-icon icon-edit'>&nbsp;</span></span></a>";
			}
			
			var version=name.split(":")[1];
			name=name.split(":")[0];
			data[i]={name:name,version:version,link:link,config:config,methodlink:methodlink};
		}
		window.parent.servicedata=data;
		window.parent.parentmap=map;
	}
	$('#dg').datagrid({ loadFilter: pagerFilter }).datagrid({
		remoteSort: false,
		toolbar: '#tb',
		fitColumns : true,
		columns:[[
		  		{field:'name',title:'微服务名',width:'30%',sortable:true,sorter:function(a,b){
		  			a=a;
                	b=b;
                    if(a < b)
                        return -1;
                    else if(a == b)
                        return 0;
                    else
                        return 1;
		  		}},
		  		{field:'version',title:'版本',width:'10%'},
		  		{field:'link',title:'部署地址',width:'20%'},
		  		{field:'config',title:'服务配置',width:'20%'},
		  		{field:'methodlink',title:'方法列表',width:'20%'}
		      ]],
		pagination:true,
		fitColumns : true,
        striped : true, // 隔行变色特性
        nowrap : true,
        rownumbers : true,
		data: data
	});
	var p = $('#dg').datagrid('getPager');  
    $(p).pagination({  
        pageSize: 10,//每页显示的记录条数，默认为10    
        pageList: [5, 10, 15],//可以设置每页记录条数的列表    
        beforePageText: '第',//页数文本框前显示的汉字    
        afterPageText: '页    共 {pages} 页',  
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',  
    });  
}
$(function(){ 
	$("body").on("click","a",function(){
		if($(this).attr("class")=="cue")
		{
			var txt=  "待更新审核中，不可操作！";
			window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
		}
	});
});

function getUrlParam(name){
	var location=window.location
	 var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	   var r = window.location.search.substr(1).match(reg);
	   if (r != null) return unescape(r[2]); return null; 
}

var ipdata = [];
function initip(name)
{
	var map=window.parent.parentmap;
	var arrList=map[name];
	var i=0;
	var hasbeta=false;
	$.each(arrList, function(n,value){
		var node=$.parseJSON(value);
		var listkey=name+":"+node.host+":"+node.port;
		if(typeof(node) != "undefined"&&typeof(node.host) != "undefined")
		{
			var ipstatus="正常";
			var weight="8";
			var beta="否";
			var connections="";
			var fails="";
			$.ajax({
		        type: "GET",
		        url: "../etcd/list?prefix=/services/"+name+"/nodes/"+node.host+":"+node.port,
		        async: false,
		        success: function (result) { 
		        	for(var i=0;i<result.length;i++)
					{
						if(result[i].key.indexOf("down")>0)
						{
							if((result[i].value=="1"||result[i].value=="true"))
							{
								ipstatus="下线";
							}
						}
						if(result[i].key.indexOf("weight")>0)
						{
							if(result[i].value!="undefined"&&result[i].value!=""&&result[i].value!="0")
							{
								weight=result[i].value;
							}
						}
						if(result[i].key.indexOf("beta")>0)
						{
							if((result[i].value=="1"||result[i].value=="true"))
							{
								beta="是";
								hasbeta=true;
							}
						}
						if(result[i].key.indexOf("connections")>0)
						{
							if(result[i].value!="undefined"&&result[i].value!="")
							{
								connections=result[i].value;
							}
						}
						if(result[i].key.indexOf("fails")>0)
						{
							if(result[i].value!="undefined"&&result[i].value!="")
							{
								fails=result[i].value;
							}
						}
					}
		        }
			});
			if($.inArray(listkey, window.parent.serviceipupdatelist)>=0)
			{
				config="<a href='javascript:void(0)'  class='cue' style='text-decoration:none'><font size='3px' color='blue'>更新未审核</font></a>";
			}
			else
			{
				config="<a href='javascript:void(0);' class='config'><span class='l-btn-left l-btn-icon-left'><span class='l-btn-text'><font size='3px'>配置</font><span class='l-btn-icon icon-edit'>&nbsp;</span></span></a>";
			}	
			ipdata[i]={name:node.host,port:node.port,status:ipstatus,weight:weight,beta:beta,connections:connections,fails:fails,registerTime:getzf(getMyDate(node.registerTime)),config:config};
			i++;	
		}	
	})
	 $('#ipdg').datagrid({ loadFilter: pagerFilter }).datagrid({
			remoteSort: false,
			toolbar: '#tb',
			fitColumns : true,
			columns:[[
			  		{field:'name',title:'IP地址',width:'15%',sortable:true,sorter:function(a,b){
			  			a=a;
	                	b=b;
	                    if(a < b)
	                        return -1;
	                    else if(a == b)
	                        return 0;
	                    else
	                        return 1;
			  		}},
			  		{field:'port',title:'端口',width:'10%'},
			  		{field:'status',title:'状态',width:'10%'},
			  		{field:'weight',title:'节点权重',width:'10%'},
			  		{field:'beta',title:'beta节点',width:'10%'},
			  		{field:'connections',title:'最大连接数',width:'10%'},
			  		{field:'fails',title:'最大失败次数',width:'10%'},
			  		{field:'registerTime',title:'注册时间',width:'15%'},
			  		{field:'config',title:'节点配置',width:'10%'}
			      ]],
			pagination:true,
			fitColumns : true,
	        striped : true, // 隔行变色特性
	        nowrap : true,
	        rownumbers : true,
			data: ipdata
		});
		var p = $('#ipdg').datagrid('getPager');  
	    $(p).pagination({  
	        pageSize: 10,//每页显示的记录条数，默认为10    
	        pageList: [5, 10, 15],//可以设置每页记录条数的列表    
	        beforePageText: '第',//页数文本框前显示的汉字    
	        afterPageText: '页    共 {pages} 页',  
	        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',  
	    });  
	    return hasbeta;
}
//毫秒数转换为YYYY-MM-DD hh:mm:ss格式
function getMyDate(str){  
    var oDate = new Date(str),  
    oYear = oDate.getFullYear(),  
    oMonth = oDate.getMonth()+1,  
    oDay = oDate.getDate(),  
    oHour = oDate.getHours(),  
    oMin = oDate.getMinutes(),  
    oSen = oDate.getSeconds(),  
    oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSen);//最后拼接时间  
    return oTime;  
};  
//补0操作  
function getzf(num){  
    if(parseInt(num) < 10){  
        num = '0'+num;  
    }  
    return num;  
}  

var map={};
function initPolicy(result)
{
	if(result)
	{
		for(var i=0;i<result.length;i++)
		{
			var key=result[i].key;
			var name=result[i].name;
			var value=result[i].value;
			if(name=="maxConnections"&&typeof(value) != "undefined")
			{
				map["maxConnections"]=value;
				$("input[name='maxConnections']").val(value);
			}
			if(name=="maxConnectionsPerMethod"&&typeof(value) != "undefined")
			{
				map["maxConnectionsPerMethod"]=value;
				$("input[name='maxConnectionsPerMethod']").val(value);
			}
			if(name=="connectTimeout"&&typeof(value) != "undefined")
			{
				map["connectTimeout"]=value;
				$("input[name='connectTimeout']").val(value);
			}
			if(name=="requestTimeout"&&typeof(value) != "undefined")
			{
				map["requestTimeout"]=value;
				$("input[name='requestTimeout']").val(value);
			}
			if(name=="readTimeout"&&typeof(value) != "undefined")
			{
				map["readTimeout"]=value;
				$("input[name='readTimeout']").val(value);
			}
		}
	}
	
	if(typeof(map["maxConnections"]) == "undefined"||map["maxConnections"]=="")
	{
		$("input[name='maxConnections']").val("512");
		map["maxConnections"]="512";
	}
	if(typeof(map["maxConnectionsPerMethod"]) == "undefined"||map["maxConnectionsPerMethod"]=="")
	{
		$("input[name='maxConnectionsPerMethod']").val("64");
		map["maxConnectionsPerMethod"]="64";
	}
	if(typeof(map["connectTimeout"]) == "undefined"||map["connectTimeout"]=="")
	{
		$("input[name='connectTimeout']").val("3000");
		map["connectTimeout"]="3000";
	}
	if(typeof(map["requestTimeout"]) == "undefined"||map["requestTimeout"]=="")
	{
		$("input[name='requestTimeout']").val("3000");
		map["requestTimeout"]="3000";
	}
	if(typeof(map["readTimeout"]) == "undefined"||map["readTimeout"]=="")
	{
		$("input[name='readTimeout']").val("3000");
		map["readTimeout"]="3000";
	}

}

function updatePolicy(seviceName)
{
	var maxConnections=$("input[name='maxConnections']").val();
	var maxConnectionsPerMethod=$("input[name='maxConnectionsPerMethod']").val();
	var connectTimeout=$("input[name='connectTimeout']").val();
	var requestTimeout=$("input[name='requestTimeout']").val();
	var readTimeout=$("input[name='readTimeout']").val();
	var nameandversion=$("select[name='nameandversion']").val();
	var isMock=$("input[name='isMock']:checked").val();
	var beforeMockService;
    var mockService;
	if(typeof(maxConnections)=="undefined"||maxConnections==""||typeof(maxConnectionsPerMethod)=="undefined"||maxConnectionsPerMethod==""||typeof(connectTimeout)=="undefined"||connectTimeout==""||typeof(requestTimeout)=="undefined"||requestTimeout==""||typeof(readTimeout)=="undefined"||readTimeout=="")
	{
		var txt=  "输入不能为空！";
		window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
		return false;
	}
	
	if(typeof(map["nameandversion"])=="undefined")
	{
		beforeMockService="";
	}
	else
	{
		beforeMockService=map["nameandversion"];
	}
	if(isMock=="true")
	{
		mockService=nameandversion;
	}
	else
	{
		mockService="";
	}

	if(map["maxConnections"]!=maxConnections||map["maxConnectionsPerMethod"]!=maxConnectionsPerMethod||map["connectTimeout"]!=connectTimeout||map["requestTimeout"]!=requestTimeout||map["readTimeout"]!=readTimeout||mockService!=beforeMockService)
	{
		var beforeInfo=map["maxConnections"]+":"+map["maxConnectionsPerMethod"]+":"+map["connectTimeout"]+":"+map["requestTimeout"]+":"+map["readTimeout"]+":"+beforeMockService;
		var info=maxConnections+":"+maxConnectionsPerMethod+":"+connectTimeout+":"+requestTimeout+":"+readTimeout+":"+mockService;
		var data={serviceNameAndVersion:seviceName,beforeInfo:beforeInfo,info:info,createtime:getMyDate(new Date())};

		$.ajax({
	        type: "POST",
	        url: "../microservicecheck/insert/",
	        contentType: "application/json",
	        dataType: "json",
	        data: JSON.stringify(data),
	        success: function (jsonResult) {
	        }
	    });
		window.history.back();
	}
}

//分页数据的操作  
function pagerFilter(data) {  
    if (typeof data.length == 'number' && typeof data.splice == 'function') {   // is array  
        data = {  
            total: data.length,  
            rows: data  
        }  
    }  
    var dg = $(this);  
    var opts = dg.datagrid('options');  
    var pager = dg.datagrid('getPager');  
    pager.pagination({  
        onSelectPage: function (pageNum, pageSize) {  
            opts.pageNumber = pageNum;  
            opts.pageSize = pageSize;  
            pager.pagination('refresh', {  
                pageNumber: pageNum,  
                pageSize: pageSize  
            });  
            dg.datagrid('loadData', data);  
        } ,
        onBeforeRefresh: function (pageNumber, pageSize) {
            var CurrentPage = parseInt($('input.pagination-num').val());//刷新跳转到输入页
            var totalsize=data.total;
            console.log(totalsize);
            if ((CurrentPage * pageSize - pageSize) <= totalsize) {
                var firstnum = CurrentPage * pageSize - pageSize + 1;
                var lastnum = CurrentPage * pageSize;
                pager.pagination({
                    pageNumber: CurrentPage,
                }); 
            } 
        },
    });  
    if (!data.originalRows) {  
        data.originalRows = (data.rows);  
    }  
    var start = (opts.pageNumber - 1) * parseInt(opts.pageSize);  
    var end = start + parseInt(opts.pageSize);  
    data.rows = (data.originalRows.slice(start, end));  
    return data;  
}  

function doSearch(value){ 
	value=$.trim(value).toLowerCase();
	var newdata=[];
	var i=0;
	$.each(window.parent.servicedata,function(key,val){     
		var total=$.trim(val.name+"|"+val.version+"|"+$(val.link).text()+"|"+$(val.config).text()).toLowerCase();
		if(total.indexOf(value)>=0)
		{
			newdata[i] = val;
			i++;
		}
	 }); 
	 if(newdata.length>0)
	{
		 $('#dg').datagrid({ loadFilter: pagerFilter }).datagrid({
				remoteSort: false,
				toolbar: '#tb',
				fitColumns : true,
				columns:[[
				  		{field:'name',title:'微服务名',width:'30%',sortable:true,sorter:function(a,b){
				  			a=a;
		                	b=b;
		                    if(a < b)
		                        return -1;
		                    else if(a == b)
		                        return 0;
		                    else
		                        return 1;
				  		}},
				  		{field:'version',title:'版本',width:'10%'},
				  		{field:'link',title:'部署地址',width:'20%'},
				  		{field:'config',title:'服务配置',width:'20%'},
				  		{field:'methodlink',title:'方法列表',width:'20%'}
				      ]],
				pagination:true,
				fitColumns : true,
		        striped : true, // 隔行变色特性
		        nowrap : true,
		        rownumbers : true,
				data: newdata
			});
			var p = $('#dg').datagrid('getPager');  
		    $(p).pagination({  
		        pageSize: 10,//每页显示的记录条数，默认为10    
		        pageList: [5, 10, 15],//可以设置每页记录条数的列表    
		        beforePageText: '第',//页数文本框前显示的汉字    
		        afterPageText: '页    共 {pages} 页',  
		        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',  
		    });  
	}
}

function doIpSearch(value){ 
	value=$.trim(value).toLowerCase();
	var newdata=[];
	var i=0;
	$.each(ipdata,function(key,val){     
		var total=$.trim(val.name+"|"+val.port+"|"+val.weight+"|"+val.status+"|"+val.beta+"|"+val.connections+"|"+val.fails+"|"+val.registerTime+"|"+$(val.config).text()).toLowerCase();
		if(total.indexOf(value)>=0)
		{
			newdata[i] = val;
			i++;
		}
	 }); 
	 if(newdata.length>0)
	{
		 $('#ipdg').datagrid({ loadFilter: pagerFilter }).datagrid({
				remoteSort: false,
				toolbar: '#tb',
				fitColumns : true,
				columns:[[
				  		{field:'name',title:'IP地址',width:'15%',sortable:true,sorter:function(a,b){
				  			a=a;
		                	b=b;
		                    if(a < b)
		                        return -1;
		                    else if(a == b)
		                        return 0;
		                    else
		                        return 1;
				  		}},
				  		{field:'port',title:'端口',width:'10%'},
				  		{field:'status',title:'状态',width:'10%'},
				  		{field:'weight',title:'节点权重',width:'10%'},
				  		{field:'beta',title:'beta节点',width:'10%'},
				  		{field:'connections',title:'最大连接数',width:'10%'},
				  		{field:'fails',title:'最大失败次数',width:'10%'},
				  		{field:'registerTime',title:'注册时间',width:'15%'},
				  		{field:'config',title:'节点配置',width:'10%'}
				      ]],
				pagination:true,
				fitColumns : true,
		        striped : true, // 隔行变色特性
		        nowrap : true,
		        rownumbers : true,
				data: newdata
			});
			var p = $('#ipdg').datagrid('getPager');  
		    $(p).pagination({  
		        pageSize: 10,//每页显示的记录条数，默认为10    
		        pageList: [5, 10, 15],//可以设置每页记录条数的列表    
		        beforePageText: '第',//页数文本框前显示的汉字    
		        afterPageText: '页    共 {pages} 页',  
		        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',  
		    });  
	}
}
function doMethodSearch(value){ 
	value=$.trim(value).toLowerCase();
	var newdata=[];
	var i=0;
	$.each(methoddata,function(key,val){     
		var total=$.trim(val.methodName+"|"+val.defaultversion+"|"+val.grayversion+"|"+val.target+"|"+val.rate+"|"+val.tags+"|"+val.whiteList+"|"+val.blackList+"|"+val.executionTimeout).toLowerCase();
		if(total.indexOf(value)>=0)
		{
			newdata[i] = val;
			i++;
		}
	 }); 
	 if(newdata.length>0)
	{
		 $('#methoddg').datagrid({ loadFilter: pagerFilter }).datagrid({
				remoteSort: false,
				toolbar: '#tb',
				fitColumns : true,
				columns:[[
				  		{field:'methodName',title:'方法名',sortable:true,sorter:function(a,b){
				  			a=a;
		                	b=b;
		                    if(a < b)
		                        return -1;
		                    else if(a == b)
		                        return 0;
		                    else
		                        return 1;
				  		}},
				  		{field:'defaultversion',title:'默认版本'},
				  		{field:'grayversion',title:'灰度版本'},
				  		{field:'target',title:'灰度判断依据'},
				  		{field:'rate',title:'灰度比例（%）'},
				  		{field:'tags',title:'灰度标签'},
				  		{field:'whiteList',title:'灰度白名单'},
				  		{field:'blackList',title:'灰度黑名单'},
				  		{field:'executionTimeout',title:'方法执行超时时间（ms）'},
				  		{field:'config',title:'接口配置'}
				      ]],
				pagination:true,
				fitColumns : true,
		        striped : true, // 隔行变色特性
		        nowrap : true,
		        rownumbers : true,
				data: newdata
			});
		 var p = $('#methoddg').datagrid('getPager');  
		    $(p).pagination({  
		        pageSize: 10,//每页显示的记录条数，默认为10    
		        pageList: [5, 10, 15],//可以设置每页记录条数的列表    
		        beforePageText: '第',//页数文本框前显示的汉字    
		        afterPageText: '页    共 {pages} 页',  
		        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',  
		    });  
	}
}

function	initmethod(result){
	if(result)
	{
		for(var i=0;i<result.length;i++)
		{
			var key=result[i].key;
			var value=result[i].value;
			if(key.indexOf("/info")>0&&(typeof(value) != "undefined"))
			{
				 var path="http://"+$.parseJSON(value).host+":"+$.parseJSON(value).port+"/"+$.parseJSON(value).name;
				 $.ajax({
				        type: "GET",
				        url:"../etcd/servicemethod?path="+path+"&isVer=true",
				        async: false,
				        success: function (result) {    
				        	 window.parent.methodMap=result;
							 var methodList=new Array();
							 $.each(result, function (key, value) { 
								 $.ajax({
								        type: "GET",
								        url: "../etcd/list?prefix=/services/"+seviceName+"/policy/"+key,
								        async: false,
								        success: function (result) {          
								        	 var grayversion=0;
											 var defaultversion=0;
											 var rate=0;
											 var target=0;
											 var tags="";
											 var userNameWhiteList="";
											 var userIdWhiteList="";
											 var ipWhiteList="";
											 var userNameBlackList="";
											 var userIdBlackList="";
											 var ipBlackList="";
											 var displayWhiteList="";
											 var displayBlackList="";
											 var executionTimeout=3000;
											 var config;
											 if(result)
											{
												for(var i=0;i<result.length;i++)
												{
													if(result[i].key.indexOf("default.version")>0&&typeof(result[i].value)!="undefined")
													{
														defaultversion=result[i].value;
													}
													
													if(result[i].key.indexOf("gray.version")>0&&typeof(result[i].value)!="undefined")
													{
														grayversion=result[i].value;
													}
													
													if(result[i].key.indexOf("gray.target")>0&&typeof(result[i].value)!="undefined")
													{
														target=result[i].value;
													}
													
													if(result[i].key.indexOf("gray.rate")>0&&typeof(result[i].value)!="undefined")
													{
														rate=result[i].value;
													}
													
													if(result[i].key.indexOf("gray.tags")>0&&typeof(result[i].value)!="undefined")
													{
														tags=result[i].value;
													}
													
													if(result[i].key.indexOf("gray.white.username")>0&&typeof(result[i].value)!="undefined")
													{
														userNameWhiteList=result[i].value;
													}
													
													if(result[i].key.indexOf("gray.white.userid")>0&&typeof(result[i].value)!="undefined")
													{
														userIdWhiteList=result[i].value;
													}
													
													if(result[i].key.indexOf("gray.white.ip")>0&&typeof(result[i].value)!="undefined")
													{
														ipWhiteList=result[i].value;
													}
													
													if(result[i].key.indexOf("gray.black.username")>0&&typeof(result[i].value)!="undefined")
													{
														userNameBlackList=result[i].value;
													}
													
													if(result[i].key.indexOf("gray.black.userid")>0&&typeof(result[i].value)!="undefined")
													{
														userIdBlackList=result[i].value;
													}
													
													if(result[i].key.indexOf("gray.black.ip")>0&&typeof(result[i].value)!="undefined")
													{
														ipBlackList=result[i].value;
													}
													
													if(result[i].key.indexOf("execution.timeout")>0&&typeof(result[i].value)!="undefined")
													{
														executionTimeout=result[i].value;
													}
												}
											}
											 var displaytarget;
											 if(target=="0")
											{
												 displaytarget="无";
												 displayWhiteList="";
												 displayBlackList="";
											}
											 else if(target=="1")
											{
												 displaytarget="用户名";
												 displayWhiteList=userNameWhiteList;
												 displayBlackList=userNameBlackList;
											}
											 else if(target=="2")
											{
												 displaytarget="用户Id";
												 displayWhiteList=userIdWhiteList;
												 displayBlackList=userIdBlackList;
											}
											 else if(target=="3")
											{
												 displaytarget="IP地址";
												 displayWhiteList=ipWhiteList;
												 displayBlackList=ipBlackList;
											}
											 
											 if($.inArray(seviceName+key, window.parent.methodupdatelist)>=0)
											{
												 config="<a href='javascript:void(0)'  style='text-decoration:none'><font size='3px' color='#FF9933'>更新未审核</font></a>";
											}	
											 else
											 {
												 var data={serviceName:seviceName,methodName:key,defaultversion:defaultversion,grayversion:grayversion,target:target,rate:rate,tags:tags,userNameWhiteList:userNameWhiteList,userIdWhiteList:userIdWhiteList,ipWhiteList:ipWhiteList,userNameBlackList:userNameBlackList,userIdBlackList:userIdBlackList,ipBlackList:ipBlackList,executionTimeout:executionTimeout};						
												 var datajson=escape(JSON.stringify(data));												
												 config="<a href='microservice-method-policy.jsp?data="+datajson+"'><span class='l-btn-left l-btn-icon-left'><span class='l-btn-text'><font size='3px'>接口配置</font><span class='l-btn-icon icon-edit'>&nbsp;</span></span></a>";
											 }
											 
											 var displaydata={methodName:key,defaultversion:defaultversion,grayversion:grayversion,target:displaytarget,rate:rate/100,tags:tags,whiteList:displayWhiteList,blackList:displayBlackList,executionTimeout:executionTimeout,config:config};
											 methodList.push(displaydata);
								        }		
								    });
						 		}); 
							 for(var i=0;i<methodList.length;i++)
							{
								 methoddata[i]=methodList[i];
							}						
				        }
				 });
			}
		}
	}
	 $('#methoddg').datagrid({ loadFilter: pagerFilter }).datagrid({
			remoteSort: false,
			toolbar: '#tb',
			fitColumns : true,
			columns:[[
			  		{field:'methodName',title:'方法名',sortable:true,sorter:function(a,b){
			  			a=a;
	                	b=b;
	                    if(a < b)
	                        return -1;
	                    else if(a == b)
	                        return 0;
	                    else
	                        return 1;
			  		}},
			  		{field:'defaultversion',title:'默认版本'},
			  		{field:'grayversion',title:'灰度版本'},
			  		{field:'target',title:'灰度判断依据'},
			  		{field:'rate',title:'灰度比例（%）'},
			  		{field:'tags',title:'灰度标签'},
			  		{field:'whiteList',title:'灰度白名单'},
			  		{field:'blackList',title:'灰度黑名单'},
			  		{field:'executionTimeout',title:'方法执行超时时间（ms）'},
			  		{field:'config',title:'接口配置'}
			      ]],
			pagination:true,
			fitColumns : true,
	        striped : true, // 隔行变色特性
	        nowrap : true,
	        rownumbers : true,
			data: methoddata
		});
	 var p = $('#methoddg').datagrid('getPager');  
	    $(p).pagination({  
	        pageSize: 10,//每页显示的记录条数，默认为10    
	        pageList: [5, 10, 15],//可以设置每页记录条数的列表    
	        beforePageText: '第',//页数文本框前显示的汉字    
	        afterPageText: '页    共 {pages} 页',  
	        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',  
	    });  
}