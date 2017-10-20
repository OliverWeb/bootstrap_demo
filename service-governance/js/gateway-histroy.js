var data = [];
var verdata=[];
function initHistroy()
{
	$.get("../gatewayservicehistroy/list",function(result){
		if(result)
		{
			for(var i=0;i<result.length;i++)
			{
				var gatewayservicename=result[i].gatewayServiceName;
				var servicename=result[i].serviceName;
				var serviceversion=result[i].serviceVersion;
				var servicemethod=result[i].serviceMethod;
				var servicenameandversion=servicename+":"+serviceversion;
				if(servicenameandversion==":")
				{
					servicenameandversion="";
				}
				var qps=result[i].qps;
				var beforeInfo=gatewayservicename+":"+servicename+":"+serviceversion+":"+servicemethod+":"+qps;
				if($.inArray(gatewayservicename, window.parent.backlist)>=0)
				{
					var verconfig="<a href='' class='edit' name="+gatewayservicename+" style='text-decoration:none'><font size='3px' color='#FF9933'>回退未审核</font></a>";
				}
				else if($.inArray(gatewayservicename, window.parent.updatelist)>=0)
				{
					var verconfig="<a href='' class='edit' name="+gatewayservicename+" style='text-decoration:none'><font size='3px' color='blue'>更新未审核</font></a>";
				}
				else if($.inArray(gatewayservicename, window.parent.deletelist)>=0)
				{
					var verconfig="<a href='' class='edit' name="+gatewayservicename+" style='text-decoration:none'><font size='3px' color='red'>删除未审核</font></a>";
				}
				else
				{
					var verconfig="<a href='gateway-ver.jsp?gatewayservicename="+gatewayservicename+"' class='edit' name="+gatewayservicename+"><span class='l-btn-left l-btn-icon-left'><span class='l-btn-text'><font size='3px'>版本回退</font><span class='l-btn-icon icon-edit'>&nbsp;</span></span></a>";
				}	
				data[i]={name:gatewayservicename,servicenameandversion:servicenameandversion,servicemethod:servicemethod,qps:qps,verconfig:verconfig};
			}
			$('#dg').datagrid({ loadFilter: pagerFilter }).datagrid({
				remoteSort: false,
				toolbar: '#tb',
				fitColumns : true,
				columns:[[
				  		{field:'name',title:'公网网关服务',width:'20%',sortable:true,sorter:function(a,b){
				  			a=a;
		                	b=b;
		                    if(a < b)
		                        return -1;
		                    else if(a == b)
		                        return 0;
		                    else
		                        return 1;
				  		}},
				  		{field:'servicenameandversion',title:'路由微服务名版本',width:'30%'},
				  		{field:'servicemethod',title:'路由微服务方法名',width:'20%'},
				  		{field:'qps',title:'流量限制（单节点）',width:'15%'},
				  		{field:'verconfig',title:'版本配置',width:'15%'}
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
		
	});
}


function doSearch(value){ 
	value=$.trim(value).toLowerCase();
	var newdata=[];
	var i=0;
	$.each(data,function(key,val){     
		var total=$.trim(val.servicenameandversion+"|"+val.servicemethod+"|"+val.name+"|"+val.qps+"|"+$(val.verconfig).text()).toLowerCase();
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
				  		{field:'name',title:'公网网关服务',width:'20%',sortable:true,sorter:function(a,b){
				  			a=a;
		                	b=b;
		                    if(a < b)
		                        return -1;
		                    else if(a == b)
		                        return 0;
		                    else
		                        return 1;
				  		}},
				  		{field:'servicenameandversion',title:'路由微服务名版本',width:'30%'},
				  		{field:'servicemethod',title:'路由微服务方法名',width:'20%'},
				  		{field:'qps',title:'流量限制（单节点）',width:'15%'},
				  		{field:'verconfig',title:'版本配置',width:'15%'}
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

function doVerSearch(value){ 
	value=$.trim(value).toLowerCase();
	var newdata=[];
	var i=0;
	$.each(verdata,function(key,val){     
		var total=$.trim(val.servicenameandversion+"|"+val.servicemethod+"|"+val.name+"|"+val.qps+"|"+$(val.config).text()).toLowerCase();
		if(total.indexOf(value)>=0)
		{
			newdata[i] = val;
			i++;
		}
	 }); 
	 if(newdata.length>0)
	{
		 $('#verdg').datagrid({ loadFilter: pagerFilter }).datagrid({
				remoteSort: false,
				toolbar: '#tb',
				fitColumns : true,
				columns:[[
				  		{field:'name',title:'版本',width:'10%'},
				  		{field:'servicenameandversion',title:'路由微服务名版本',width:'30%'},
				  		{field:'servicemethod',title:'路由微服务方法名',width:'25%'},
				  		{field:'qps',title:'流量限制（单节点）',width:'20%'},
				  		{field:'config',title:'版本选择',width:'15%'}
				      ]],
				pagination:true,
				fitColumns : true,
		        striped : true, // 隔行变色特性
		        nowrap : true,
		        rownumbers : true,
				data: newdata
			});
		 var p = $('#verdg').datagrid('getPager');  
		    $(p).pagination({  
		        pageSize: 10,//每页显示的记录条数，默认为10    
		        pageList: [5, 10, 15],//可以设置每页记录条数的列表    
		        beforePageText: '第',//页数文本框前显示的汉字    
		        afterPageText: '页    共 {pages} 页',  
		        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',  
		    });  
	}
}

function getUrlParam(name){
	var location=window.location
	 var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	   var r = window.location.search.substr(1).match(reg);
	   if (r != null) return unescape(r[2]); return null; 
}

var verbeforeInfo;
function initver(gatewayservicename)
{
	$.get("../gatewayver/list?gatewayservicename="+gatewayservicename,function(result){
		if(result)
		{
			var j=0;
			for(var i=0;i<result.length;i++)
			{
				if(result[i].ver==0)
				{
					verbeforeInfo=result[i].gatewayServiceName+":"+result[i].serviceName+":"+result[i].serviceVersion+":"+result[i].serviceMethod+":"+result[i].qps;
				}
			}
			for(var i=0;i<result.length;i++)
			{
				if(result[i].ver!=0)
				{
					var gatewayservicename=result[i].gatewayServiceName;
					var servicename=result[i].serviceName;
					var serviceversion=result[i].serviceVersion;
					var servicenameandversion=servicename+":"+serviceversion;
					var servicemethod=result[i].serviceMethod;
					var qps=result[i].qps;
					var ver=result[i].ver;
					var config;
					var info=gatewayservicename+":"+servicename+":"+serviceversion+":"+servicemethod+":"+qps;
					
					if(info==verbeforeInfo)
					{
						config="<font color='red'  size='3px'>当前版本</font>";
					}else
					{
						config="<a href='' class='back' value='"+info+"'><span class='l-btn-left l-btn-icon-left'><span class='l-btn-text'><font size='3px'>回退到该版本</font><span class='l-btn-icon icon-redo'>&nbsp;</span></span></a>";				
					}			
					verdata[j]={name:"V"+ver,servicenameandversion:servicenameandversion,servicemethod:servicemethod,qps:qps,config:config};
					j++;
				}			
			}
			 $('#verdg').datagrid({ loadFilter: pagerFilter }).datagrid({
					remoteSort: false,
					toolbar: '#tb',
					fitColumns : true,
					columns:[[
					  		{field:'name',title:'版本',width:'10%'},
					  		{field:'servicenameandversion',title:'路由微服务名版本',width:'30%'},
					  		{field:'servicemethod',title:'路由微服务方法名',width:'25%'},
					  		{field:'qps',title:'流量限制（单节点）',width:'20%'},
					  		{field:'config',title:'版本选择',width:'15%'}
					      ]],
					pagination:true,
					fitColumns : true,
			        striped : true, // 隔行变色特性
			        nowrap : true,
			        rownumbers : true,
					data: verdata
				});
			 var p = $('#verdg').datagrid('getPager');  
			    $(p).pagination({  
			        pageSize: 10,//每页显示的记录条数，默认为10    
			        pageList: [5, 10, 15],//可以设置每页记录条数的列表    
			        beforePageText: '第',//页数文本框前显示的汉字    
			        afterPageText: '页    共 {pages} 页',  
			        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',  
			    });  
		}
	});
}

$(function(){ 
	 $("body").on("click","a",function(){
			if($(this).attr("class")=="edit")
			{
				if($.inArray($(this).attr("name"), window.parent.degradeList)>=0)
	    		{
	        		var txt=  "降级处理中，不可操作！";
					window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
	        		return false;
	    		}
				if($.inArray($(this).attr("name"), window.parent.deletelist)>=0)
				{
		    		var txt=  "待删除审核中，不可操作！";
					window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
		    		return false;
				}
				if($.inArray($(this).attr("name"), window.parent.updatelist)>=0)
				{
		    		var txt=  "待更新审核中，不可操作！";
					window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
		    		return false;
				}
				if($.inArray($(this).attr("name"), window.parent.backlist)>=0)
				{
		    		var txt=  "待回退审核中，不可操作！";
					window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
		    		return false;
				}
			}
	    	if($(this).attr("class")=="back")
	    	{
	    		var value=$(this).attr("value");
	    		
	    		var data={action:"3",beforeInfo:verbeforeInfo,info:value,createtime:getMyDate(new Date())};
	    		$.ajax({
	    	        type: "POST",
	    	        url: "../gatewaycheck/insert/",
	    	        contentType: "application/json",
	    	        dataType: "json",
	    	        data: JSON.stringify(data),
	    	        async: false,
	    	        success: function (result) {
	    	        }
	    	    });
	        	window.parent.Open('公网网关服务历史版本列表','gateway-histroy.jsp')
	    	}
	    });
}); 

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
        },
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