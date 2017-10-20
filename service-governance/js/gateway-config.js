function init(){
	var data=window.parent.gatewaydata;
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
		  		{field:'checkbox',checkbox:true},
		  		{field:'name',title:'公网网关服务',width:'18%',sortable:true,sorter:function(a,b){
		  			a=a;
                	b=b;
                    if(a < b)
                        return -1;
                    else if(a == b)
                        return 0;
                    else
                        return 1;
		  		}},
		  		{field:'servicenameandversion',title:'路由微服务名版本',width:'28%'},
		  		{field:'servicemethod',title:'路由微服务方法名',width:'13%'},
		  		{field:'qps',title:'总流量限制',width:'7%'},
		  		{field:'displaystatus',title:'降级状态',width:'7%'},
		  		{field:'degrade',title:'降级操作',width:'12%'},
		  		{field:'link',title:'配置',width:'13%'}
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

function refresh(result){
	var link;
	var data = [];
	var servicemap={};
	var statusmap={};
	var tmpList=new Array();
	var qpsmap={};
	var degradeList=new Array();
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
		tmpList.sort();
		for(var i=0;i<tmpList.length;i++)
			{
				var servicemethod="";
				var servicenameandversion="";
				var service=servicemap[tmpList[i]];
				var servicestatus=statusmap[tmpList[i]]
				var qps=qpsmap[tmpList[i]];
				var displaystatus;
				if(typeof(qps) == "undefined"||qps=="")
				{
					qps="64";
				}
				var value=tmpList[i]+":"+service+":"+qps+":"+servicestatus;
				
				if(typeof(servicestatus) == "undefined"||servicestatus=="")
				{
					servicestatus="inactive";
				}
				
				if(typeof(service) != "undefined")
				{
					if(servicestatus=="mingle"&&service.split("|")[1].split(":")[3]!=0)
					{
						
						var mockprovider=service.split("|")[0].split(":")[0]+":"+service.split("|")[0].split(":")[1];
						var provider=service.split("|")[1].split(":")[0]+":"+service.split("|")[1].split(":")[1];
						if(service.split("|")[0].split(":")[3]==0)
						{
							servicenameandversion=provider;
						}
						else
						{
							servicenameandversion=mockprovider+"(Mock服务)</br>"+provider+"(原服务)";
						}						
					}
					else
					{
						servicenameandversion=service.split(":")[0]+":"+service.split(":")[1];
					}			
					servicemethod=service.split(":")[2];
				}
					
				if(servicestatus=="active")
				{
					displaystatus="<a href='javascript:void(0)' class='active' value='"+service+"'>未降级</a>";
					degrade="<a href='javascript:void(0)' ><span class='l-btn-left l-btn-icon-left'><span class='l-btn-text'><font color='red'  size='3px' class='degrade' id='"+value+"'>屏蔽</font></span><span class='l-btn-icon icon-cancel'>&nbsp;</span></span></a>"+
					"<a href='javascript:void(0)' ><span class='l-btn-left l-btn-icon-left'><span class='l-btn-text'><font color='red'  size='3px' class='display' id='"+value+"'>降级</font></span><span class='l-btn-icon icon-no'>&nbsp;</span></span></a>";
				}
				else if(servicestatus=="inactive")
				{
					displaystatus="<a href='javascript:void(0)' class='active' value='"+service+"'>已屏蔽降级</a>";
					degrade="<a href='javascript:void(0)' ><span class='l-btn-left l-btn-icon-left'><span class='l-btn-text'><font color='green'  size='3px' class='recover' id='"+value+"'>恢复</font></span><span class='l-btn-icon icon-ok'>&nbsp;</span></span></a>";
					degradeList.push(tmpList[i]);
				}
				else if(servicestatus=="displace")
				{
					displaystatus="<a href='javascript:void(0)' class='displace' value='"+service+"'>已业务降级</a>";
					degrade="<a href='javascript:void(0)' ><span class='l-btn-left l-btn-icon-left'><span class='l-btn-text'><font color='green'  size='3px' class='recover' id='"+value+"'>恢复</font></span><span class='l-btn-icon icon-ok'>&nbsp;</span></span></a>";
					degradeList.push(tmpList[i]);
				}
				else if(servicestatus=="mingle")
				{
					displaystatus="<a href='javascript:void(0)' class='mingle' value='"+service+"' id='"+tmpList[i]+"'>已自定义降级</a>";
					degrade="<a href='javascript:void(0)' ><span class='l-btn-left l-btn-icon-left'><span class='l-btn-text'><font color='green'  size='3px' class='recover' id='"+value+"'>恢复</font></span><span class='l-btn-icon icon-ok'>&nbsp;</span></span></a>";
					degradeList.push(tmpList[i]);
				}
				
				if($.inArray(tmpList[i], window.parent.deletelist)>=0)
				{
					link="<a href='javascript:void(0)' class='edit' name="+tmpList[i]+" style='text-decoration:none'><font size='3px' color='red'>删除未审核</font></a>";
				}
				else if($.inArray(tmpList[i], window.parent.updatelist)>=0)
				{
					link="<a href='javascript:void(0)' class='edit' name="+tmpList[i]+" style='text-decoration:none'><font size='3px' color='blue'>更新未审核</font></a>";
				}
				else if($.inArray(tmpList[i], window.parent.backlist)>=0)
				{
					link="<a href='javascript:void(0)' class='edit' name="+tmpList[i]+" style='text-decoration:none'><font size='3px' color='#FF9933'>回退未审核</font></a>";
				}
				else
				{
					link="<a href='gateway-edit.jsp?dataId="+i+"' class='edit' name='"+tmpList[i]+"'><span class='l-btn-left l-btn-icon-left'><span class='l-btn-text'><font size='3px'>治理配置</font><span class='l-btn-icon icon-edit'>&nbsp;</span></span></a>";
				}
		
				data[i]={checkbox:value,name:tmpList[i],servicenameandversion:servicenameandversion,servicemethod:servicemethod,qps:parseInt(qps)*window.parent.gatewayipLen,displaystatus:displaystatus,degrade:degrade,link:link};
			}
	}
	$('#dg').datagrid({ loadFilter: pagerFilter }).datagrid({
		remoteSort: false,
		toolbar: '#tb',
		fitColumns : true,
		columns:[[
		  		{field:'checkbox',checkbox:true},
		  		{field:'name',title:'公网网关服务',width:'18%',sortable:true,sorter:function(a,b){
		  			a=a;
                	b=b;
                    if(a < b)
                        return -1;
                    else if(a == b)
                        return 0;
                    else
                        return 1;
		  		}},
		  		{field:'servicenameandversion',title:'路由微服务名版本',width:'28%'},
		  		{field:'servicemethod',title:'路由微服务方法名',width:'13%'},
		  		{field:'qps',title:'总流量限制',width:'7%'},
		  		{field:'displaystatus',title:'降级状态',width:'7%'},
		  		{field:'degrade',title:'降级操作',width:'12%'},
		  		{field:'link',title:'配置',width:'13%'}
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
	var parent = window.parent;
	parent.gatewaydata = data;
	parent.gatewayserviceList=tmpList;
	parent.degradeList=degradeList;
}

function doSearch(value){ 
	value=$.trim(value).toLowerCase();
	var newdata=[];
	var i=0;
	$.each(window.parent.gatewaydata,function(key,val){     
		var total=$.trim(val.servicenameandversion+"|"+val.servicemethod+"|"+val.name+"|"+val.qps+"|"+$(val.displaystatus).html()+"|"+$(val.degrade).text()+"|"+$(val.link).html()).toLowerCase();
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
				  		{field:'checkbox',checkbox:true},
				  		{field:'name',title:'公网网关服务',width:'18%',sortable:true,sorter:function(a,b){
				  			a=a;
		                	b=b;
		                    if(a < b)
		                        return -1;
		                    else if(a == b)
		                        return 0;
		                    else
		                        return 1;
				  		}},
				  		{field:'servicenameandversion',title:'路由微服务名版本',width:'28%'},
				  		{field:'servicemethod',title:'路由微服务方法名',width:'13%'},
				  		{field:'qps',title:'总流量限制',width:'7%'},
				  		{field:'displaystatus',title:'降级状态',width:'7%'},
				  		{field:'degrade',title:'降级操作',width:'12%'},
				  		{field:'link',title:'配置',width:'13%'}
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

function getUrlParam(name){
	var location=window.location
	 var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	   var r = window.location.search.substr(1).match(reg);
	   if (r != null) return unescape(r[2]); return null; 
}

function update()
{
	var name=$("input[name='name']").val();
	var nameandversion=$("select[name='nameandversion']").val();
	var servicemethod=$("select[name='servicemethod']").val();
	var qps=$("input[name='qps']").val();
	var data=window.parent.gatewaydata;
	var dataId = getUrlParam("dataId");
	if(typeof(qps)=="undefined"||qps=="")
	{
		qps="64";
	}
	if(typeof(servicemethod)=="undefined"||servicemethod==""||servicemethod==null||typeof(nameandversion)=="undefined"||nameandversion==""||nameandversion==null)
		{
			var txt=  "标*字段不能为空！";
			window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
			return false;
		}
	
	if(data[dataId].servicenameandversion!=nameandversion||data[dataId].servicemethod!=servicemethod||parseInt(data[dataId].qps)/window.parent.gatewayipLen!=parseInt(qps))
	{
		var status;
		if($.trim($(data[dataId].status).text())==$.trim("降级"))
		{
			status='active';
		}
		else if($.trim($(data[dataId].status).text())==$.trim("恢复"))
		{
			status='inactive';	
		}
		var updatevalue=name+":"+nameandversion+":"+servicemethod+":"+qps;
		var beforevalue=name+":"+data[dataId].servicenameandversion+":"+data[dataId].servicemethod+":"+data[dataId].qps/window.parent.gatewayipLen;
		var data={action:"2",beforeInfo:beforevalue,info:updatevalue,createtime:getMyDate(new Date())};
		$.ajax({
	        type: "POST",
	        url: "../gatewaycheck/insert/",
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

$(function(){
	 $("body").on("click",".active",function(){
		 var servicenameandversion=$(this).attr("value").split(":")[0]+":"+$(this).attr("value").split(":")[1];
			$.get("../serviceSearchMock?serviceNameAndVersion="+servicenameandversion,function(result){
	    		if(result)
	    		{			
	    			 $.messager.show({  
	    			        title:'降级信息',  
	    			        msg:'对应Mock微服务名版本:'+result.value,  
	    			        showType:'slide', 
	    			        width:'450px',
	    			        height:'100px',
	    			        style:{  
	    			        	right:'',  
	    			        	top:document.body.scrollTop+document.documentElement.scrollTop,  
	    			        	bottom:''  
	    			        }  
	    			    }); 
	    		}
	    		else
	    		{
	    			var txt=  "没有对应的降级服务！";
					window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
		    		return false;
	    		}
			});
	 });
	 $("body").on("click",".displace",function(){
		 var mockServiceNameAndVersion=$(this).attr("value").split(":")[0]+":"+$(this).attr("value").split(":")[1];
		 $.get("../mockSearchService?mockServiceNameAndVersion="+mockServiceNameAndVersion,function(result){
	    		if(result)
	    		{			
	    			 $.messager.show({  
	    			        title:'降级信息',  
	    			        msg:'降级前微服务名版本:'+result.value,  
	    			        showType:'slide', 
	    			        width:'450px',
	    			        height:'100px',
	    			        style:{  
	    			        	right:'',  
	    			        	top:document.body.scrollTop+document.documentElement.scrollTop,  
	    			        	bottom:'' 
	    			        }  
	    			    }); 
	    		}
			});
	 });
	 $("body").on("click",".mingle",function(){
		 var mockvalue=$(this).attr("value").split("|")[0];
		 var value=$(this).attr("value").split("|")[1];

		 var gatewayservice=$(this).attr("id");
		 var mockpercent=mockvalue.split(":")[3];
		 var serviceNameAndVersion=value.split(":")[0]+":"+value.split(":")[1];
		 var percent=value.split(":")[3];
		 var screenperent=100-mockpercent-percent;
	
		 $.messager.show({  
		        title:'降级信息',  
		        msg:'降级前微服务名版本:'+serviceNameAndVersion+'<br><br>Mock服务占比:'+mockpercent+"%"+'&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;原服务占比:'+percent+"%"+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;屏蔽占比:'+screenperent+"%",  
		        showType:'slide', 
		        width:'450px',
		        height:'130px',
		        style:{  
		        	right:'',  
		        	top:document.body.scrollTop+document.documentElement.scrollTop,  
		        	bottom:''   
		        }  
		    }); 

	 });
    $("body").on("click",".recover",function(){
    	if(!window.parent.isLogin)
		{
    		var txt=  "未登录，不可操作！";
			window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
    		return false;
		}
    	if($.inArray($(this).attr("id").split(":")[0], window.parent.deletelist)>=0)
		{
    		var txt=  "待删除审核中，不可操作！";
			window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
    		return false;
		}
    	if($.inArray($(this).attr("id").split(":")[0], window.parent.updatelist)>=0)
		{
    		var txt=  "待更新审核中，不可操作！";
			window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
    		return false;
		}
    	if($.inArray($(this).attr("id").split(":")[0], window.parent.backlist)>=0)
		{
    		var txt=  "待回退审核中，不可操作！";
			window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
    		return false;
		}
    	
    	var mockServiceNameAndVersion=$(this).attr("id").split(":")[1]+":"+$(this).attr("id").split(":")[2];
		var method=$(this).attr("id").split(":")[3];
		var gatewayservice=$(this).attr("id").split(":")[0];
    	var len=$(this).attr("id").split(":").length;

    	if($(this).attr("id").split(":")[len-1]=="inactive")
    	{
    		$.get("../etcd/write?prefix=/gateway/public/services/"+gatewayservice+"/status&value=active",function(){
    		});
        	window.location.reload();
    	}   
    	else
    	{ 		
        	$.get("../mockSearchService?mockServiceNameAndVersion="+mockServiceNameAndVersion,function(result){
        		if(result)
        		{
        			var providervalue=result.value+":"+method;
        			$.get("../etcd/write?prefix=/gateway/public/services/"+gatewayservice+"/provider&value="+providervalue,function(){
            		});
        			$.get("../etcd/write?prefix=/gateway/public/services/"+gatewayservice+"/status&value=active",function(){
        			});
        	    	window.location.reload();
        		}
        	});
    	}
     	
	});
    
    $("body").on("click",".degrade",function(){
    	if(!window.parent.isLogin)
		{
    		var txt=  "未登录，不可操作！";
			window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
    		return false;
		}
    	if($.inArray($(this).attr("id").split(":")[0], window.parent.deletelist)>=0)
		{
    		var txt=  "待删除审核中，不可操作！";
			window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
    		return false;
		}
    	if($.inArray($(this).attr("id").split(":")[0], window.parent.updatelist)>=0)
		{
    		var txt=  "待更新审核中，不可操作！";
			window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
    		return false;
		}
    	if($.inArray($(this).attr("id").split(":")[0], window.parent.backlist)>=0)
		{
    		var txt=  "待回退审核中，不可操作！";
			window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
    		return false;
		}
    	$.get("../etcd/write?prefix=/gateway/public/services/"+$(this).attr("id").split(":")[0]+"/status&value=inactive",function(){
		});
    	window.location.reload();
	});
    
    $("body").on("click",".display",function(){
    	if(!window.parent.isLogin)
		{
    		var txt=  "未登录，不可操作！";
			window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
    		return false;
		}
    	if($.inArray($(this).attr("id").split(":")[0], window.parent.deletelist)>=0)
		{
    		var txt=  "待删除审核中，不可操作！";
			window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
    		return false;
		}
    	if($.inArray($(this).attr("id").split(":")[0], window.parent.updatelist)>=0)
		{
    		var txt=  "待更新审核中，不可操作！";
			window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
    		return false;
		}
    	if($.inArray($(this).attr("id").split(":")[0], window.parent.backlist)>=0)
		{
    		var txt=  "待回退审核中，不可操作！";
			window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
    		return false;
		}
    	var servicenameandversion=$(this).attr("id").split(":")[1]+":"+$(this).attr("id").split(":")[2];
    	var method=$(this).attr("id").split(":")[3];
    	var gatewayservice=$(this).attr("id").split(":")[0];
    	$.get("../serviceSearchMock?serviceNameAndVersion="+servicenameandversion,function(result){
    		if(result)
    		{
    			if(typeof(result.value)== "undefined"||result.value=="")
    	    	{
    	    		var txt=  "没有对应的降级服务！";
    				window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
    	    		return false;
    	    	}
    	      	    	
    	    	$("#displayservicenameandversion").val(result.value.split(":")[0]+":"+result.value.split(":")[1]);
    	    	$("#displayscreenpercent").val("");
    	    	$("#displaymethod").val(method);
    	    	$("#displaygatewayservice").val(gatewayservice);
    	    	var top = $(".display").offset().top - 130;
    	    	var left = $(".display").offset().left-800;
    	    	displayDialog.window('open').window('resize',{width:'900px',height:'250px',top: top,left:left});
    		}
    		else
    		{
    			var txt=  "没有对应的降级服务！";
				window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
	    		return false;
    		}
    	});
	});
    
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
    });
    
    $("body").on("click","#delete",function(){
		if($("input[name='checkbox']:checked").length)
		{
			$("input[name='checkbox']").each(function(){
				if($(this).prop("checked"))
				{				
					if($.inArray($(this).val().split(":")[0], window.parent.degradeList)>=0)
		    		{
		        		var txt=  "降级处理中，不可删除！";
						window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
		        		return false;
		    		}
					if($.inArray($(this).val().split(":")[0], window.parent.updatelist)>=0)
					{
						var txt=  "待更新审核中，不可删除！";
						window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
			    		return false;
					}
					else if($.inArray($(this).val().split(":")[0], window.parent.backlist)>=0)
		    		{
		        		var txt=  "待回退审核中，不可操作！";
						window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
		        		return false;
		    		}
					else
					{
						var data={action:"0",beforeInfo:$(this).val(),info:"",createtime:getMyDate(new Date())};
						$.ajax({
					        type: "POST",
					        url: "../gatewaycheck/insert/",
					        contentType: "application/json",
					        dataType: "json",
					        data: JSON.stringify(data),
					        success: function (jsonResult) {
					        }
					    });	
						window.location.reload();
					}				 	
				}
			})				
		}
		else
		{
			var txt=  "请选中相应的记录进行操作！";
			window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
			return false;
		}	
		
	})
	$("#download").click(function(){
		var checkedList=new Array();
		if($("input[name='checkbox']:checked").length)
		{
			$("input[name='checkbox']").each(function(){
				if($(this).prop("checked"))
				{		
					checkedList.push($(this).val().split(":")[0]);
				}
			});
		}
		else
		{
			var txt=  "请选中相应的记录进行操作！";
			window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
			return false;
		}
		var gatewaydata=window.parent.gatewaydata;
		var servicemap={};
		for(var i=0;i<gatewaydata.length;i++)
		{
			if($.inArray(gatewaydata[i].name, checkedList)>=0)
			{
				var key=gatewaydata[i].servicenameandversion;
				if(typeof(servicemap[key]) != "undefined")
				{
					servicemap[key].push(gatewaydata[i].name+":"+gatewaydata[i].servicemethod);
				}else
				{
					var arrList = new Array();
					arrList.push(gatewaydata[i].name+":"+gatewaydata[i].servicemethod);
					servicemap[key]=arrList;
				}
			}
		}
		var map=window.parent.parentmap;
		var pathlist=new Array();
		 $.each(servicemap, function (key, value) { 
			 if(map[key])
				{
					var path="http://"+$.parseJSON(map[key][0]).host+":"+$.parseJSON(map[key][0]).port+"/"+$.parseJSON(map[key][0]).name;
					 $.get("../etcd/servicemethod?path="+path,function(result){
						 for(var i=0;i<value.length;i++)
						 {
							var method=value[i].split(":")[1];
						 	value[i]=key+":"+value[i]+":"+result[method]
						 	
						 }		
						 $.ajax({
						        type: "POST",
						        url: "../etcd/createfile/",
						        dataType: "text",
						        data: {"json": JSON.stringify(value)},
						        async: false,
						        success: function(data, textStatus) {
						        		pathlist.push(data);
						        		if(pathlist.length==Object.keys(servicemap).length)
						        		{
						        			 downLoad(pathlist);
						        		}
						        }
						    });
						
					}); 				 
				}	
		 });
	})
})

function downLoad(pathList) { 
    var form = $("<form>");   //定义一个form表单
    form.attr('style', 'display:none');   //在form表单中添加查询参数
    form.attr('target', '');
    form.attr('method', 'post');
    form.attr('action', "../etcd/download/");
	var input = $('<input>');
    input.attr('type', 'hidden');
    input.attr('name', 'pathList');
    input.attr('value', pathList);
    $('body').append(form);  //将表单放置在web中 
    form.append(input);   //将查询参数控件提交到表单上
    form.submit();
    $("form").remove();
 }

function add()
{
	var gatewayservicename=$("input[name='name']").val();
	var nameandversion=$("select[name='nameandversion']").val();
	var servicemethod=$("select[name='servicemethod']").val();
	var service=nameandversion+":"+servicemethod;
	var qps=$("input[name='qps']").val();
	if(typeof(qps)=="undefined"||qps=="")
	{
		qps="64";
	}
	if(typeof(gatewayservicename)=="undefined"||gatewayservicename==""||typeof(servicemethod)=="undefined"||servicemethod==""||servicemethod==null||typeof(nameandversion)=="undefined"||nameandversion==""||nameandversion==null)
	{
		var txt=  "标*字段不能为空！";
		window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
		return false;
	}
	
	if($.inArray(gatewayservicename, window.parent.addlist)>=0)
	{
		var txt=  gatewayservicename+"添加审核中！";
		window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
		return false;
	}
	if($.inArray(gatewayservicename, window.parent.gatewayserviceList)>=0)
	{
		var txt=  gatewayservicename+"已存在！";
		window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
		return false;
	}
	var value=gatewayservicename+":"+nameandversion+":"+servicemethod+":"+qps;
	var data={action:"1",beforeInfo:"",info:value,createtime:getMyDate(new Date())};

	$.ajax({
        type: "POST",
        url: "../gatewaycheck/insert/",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(data),
        success: function (jsonResult) {
        }
    });	
	window.history.back();
}

function setselect(service,value)
{
	var map=window.parent.parentmap;
	if(map[service])
	{
		var path="http://"+$.parseJSON(map[service][0]).host+":"+$.parseJSON(map[service][0]).port+"/"+$.parseJSON(map[service][0]).name;
		 $.get("../etcd/service?path="+path,function(result){
			 for(var i=0;i<result.length;i++)
			 {
				 $("select[name='servicemethod']").append("<option value="+result[i] +">"+result[i]+"</option>");
			 }
			 if(value)
			 {
				 $("select[name='servicemethod']").val(value);
			 }	 
			 $(".select_gallery").select2();
		}); 
	}	
}

var ipdata=[];
function initip(result)
{
	var j=0;
	var ipList=new Array();
	var weightmap={};
	var downmap={};
	var betamap={};
	var connectionsmap={};
	var failsmap={};
	var registertimemap={};
	var hasbeta=false;
	if(result)
	{
		for(var i=0;i<result.length;i++)
		{
			var key=result[i].key;
			var name=result[i].name;
			var value=result[i].value;
			if(key.indexOf("/info")>0&&typeof(value) != "undefined")
			{
				ipList.push(name.split("/")[0]);
				var node=$.parseJSON(value);
				registertimemap[name.split("/")[0]]=node.registerTime;
			}
			if(key.indexOf("/weight")>0&&typeof(value) != "undefined")
			{
				weightmap[name.split("/")[0]]=value;
			}
			if(key.indexOf("/down")>0&&typeof(value) != "undefined")
			{
				downmap[name.split("/")[0]]=value;
			}
			if(key.indexOf("/beta")>0&&typeof(value) != "undefined")
			{
				betamap[name.split("/")[0]]=value;
			}
			if(key.indexOf("/connections")>0&&typeof(value) != "undefined")
			{
				connectionsmap[name.split("/")[0]]=value;
			}
			if(key.indexOf("/fails")>0&&typeof(value) != "undefined")
			{
				failsmap[name.split("/")[0]]=value;
			}
		}
		ipList.sort();
		for(var i=ipList.length-1;i>=0;i--)
		{
			var ip=ipList[i].split(":")[0];
			var port=ipList[i].split(":")[1];
			var status="正常";
			var weight="8";
			var beta="否";
			var connections="";
			var fails="";
			var registertime=registertimemap[ipList[i]];
			if(downmap[ipList[i]]=="1"||downmap[ipList[i]]=="true")
			{
				status="下线";
			}
			if(weightmap[ipList[i]]!="undefined"&&weightmap[ipList[i]]!=""&&weightmap[ipList[i]]!="0")
			{
				weight=weightmap[ipList[i]];
			}
			if(betamap[ipList[i]]=="1"||betamap[ipList[i]]=="true")
			{
				beta="是";
				hasbeta=true;
			}
			if(connectionsmap[ipList[i]]!="undefined"&&connectionsmap[ipList[i]]!="")
			{
				connections=connectionsmap[ipList[i]];
			}
			if(failsmap[ipList[i]]!="undefined"&&failsmap[ipList[i]]!="")
			{
				fails=failsmap[ipList[i]];
			}
			if($.inArray(ipList[i], window.parent.gatewayipupdatelist)>=0)
			{
				config="<a href='javascript:void(0)'   style='text-decoration:none'><font size='3px' color='blue'>更新未审核</font></a>";
			}
			else
			{
				config="<a href='javascript:void(0);' class='ipconfig'><span class='l-btn-left l-btn-icon-left'><span class='l-btn-text'><font size='3px'>配置</font><span class='l-btn-icon icon-edit'>&nbsp;</span></span></a>";
			}	
			ipdata[j]={ip:ip,port:port,status:status,weight:weight,beta:beta,connections:connections,fails:fails,registerTime:getzf(getMyDate(registertime)),config:config};
			j++;	
		}
	}

$('#ipdg').datagrid({ loadFilter: pagerFilter }).datagrid({
		remoteSort: false,
		toolbar: '#tb',
		fitColumns : true,
		columns:[[
		  		{field:'ip',title:'IP地址',width:'15%',sortable:true,sorter:function(a,b){
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
		  		{field:'weight',title:'权重值',width:'10%'},
		  		{field:'beta',title:'beta节点',width:'10%'},
		  		{field:'connections',title:'最大连接数',width:'10%'},
		  		{field:'fails',title:'最大失败次数',width:'10%'},
		  		{field:'registerTime',title:'最后更新时间',width:'15%',sortable:true,sorter:function(a,b){
		  			a=a;
                	b=b;
                    if(a < b)
                        return -1;
                    else if(a == b)
                        return 0;
                    else
                        return 1;
		  		}},
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

function doIpSearch(value){ 
	value=$.trim(value).toLowerCase();
	var newdata=[];
	var i=0;
	$.each(ipdata,function(key,val){     
		var total=$.trim(val.ip+"|"+val.port+"|"+val.status+"|"+val.weight+"|"+val.beta+"|"+val.connections+"|"+val.fails+"|"+val.registerTime).toLowerCase();
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
				  		{field:'ip',title:'IP地址',width:'15%',sortable:true,sorter:function(a,b){
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
				  		{field:'weight',title:'权重值',width:'10%'},
				  		{field:'beta',title:'beta节点',width:'10%'},
				  		{field:'connections',title:'最大连接数',width:'10%'},
				  		{field:'fails',title:'最大失败次数',width:'10%'},
				  		{field:'registerTime',title:'最后更新时间',width:'15%',sortable:true,sorter:function(a,b){
				  			a=a;
		                	b=b;
		                    if(a < b)
		                        return -1;
		                    else if(a == b)
		                        return 0;
		                    else
		                        return 1;
				  		}},
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
