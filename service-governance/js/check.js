$.get("../gatewaycheck/list/",function(result){
		refresh(result);
});
var data=[];
function refresh(result){
	if(result)
	{
		for(var i=0;i<result.length;i++)
		{
			var action=result[i].action;
			var createtime=result[i].createtime;
			var displayvalue;
			if(action==1||action==2||action==3)
			{
				displayvalue=result[i].info;
			}
			else if(action==0)
			{
				displayvalue=result[i].beforeInfo;
			}
			var gatewayservicename=displayvalue.split(":")[0];
			var servicenameandversion=displayvalue.split(":")[1]+":"+displayvalue.split(":")[2];
			var servicemethod=displayvalue.split(":")[3];
			var qps=displayvalue.split(":")[4];
			
			if(typeof(qps)=="undefined"||qps=="undefined")
			{
				qps="";
			}
			var status=displayvalue.split(":")[5];
			if(status=="active")
			{
				status="正常";
			}
			else if(status=="inactive")
			{
				status="降级";
			}
			//var checkbox="<input type='checkbox' name='checkbox' value='"+action+"/"+result[i].id+"/"+result[i].beforeInfo+"/"+result[i].info+"'>";
			
			if(action==1)
			{
				var check="<font size='3px' color='green'>待添加</font>";
				data[i]={checkbox:action+"/"+result[i].id+"/"+result[i].beforeInfo+"/"+result[i].info,gatewayservicename:gatewayservicename,servicenameandversion:servicenameandversion,servicemethod:servicemethod,qps:qps,createtime:createtime,check:check};				
			}
			else if(action==0)
			{
				var check="<font size='3px' color='red'>待删除</font>";
				data[i]={checkbox:action+"/"+result[i].id+"/"+result[i].beforeInfo+"/"+result[i].info,gatewayservicename:gatewayservicename,servicenameandversion:servicenameandversion,servicemethod:servicemethod,qps:qps,createtime:createtime,check:check};
			}
			else if(action==2)
			{
				var displayservicenameandversion;
				var displayservicemethod;
				var displayqps;
				if(servicenameandversion!=result[i].beforeInfo.split(":")[1]+":"+result[i].beforeInfo.split(":")[2])
				{
					displayservicenameandversion=servicenameandversion+"<font size='2px' >(更新后)</font></br>"+result[i].beforeInfo.split(":")[1]+":"+result[i].beforeInfo.split(":")[2]+"<font size='2px' >(当前)</font></br>";
				}
				else
				{
					displayservicenameandversion=servicenameandversion;
				}
				
				if(servicemethod!=result[i].beforeInfo.split(":")[3])
				{
					displayservicemethod=servicemethod+"<font size='2px' >(更新后)</font></br>"+result[i].beforeInfo.split(":")[3]+"<font size='2px' >(当前)</font></br>";
				}
				else
				{
					displayservicemethod=servicemethod;
				}
				if(qps!=result[i].beforeInfo.split(":")[4])
				{
					displayqps=qps+"<font size='2px' >(更新后)</font></br>"+result[i].beforeInfo.split(":")[4]+"<font size='2px' >(当前)</font></br>";
				}
				else
				{
					displayqps=qps;
				}
				var check="<font size='3px' color='blue'>待更新</font>";
				data[i]={checkbox:action+"/"+result[i].id+"/"+result[i].beforeInfo+"/"+result[i].info,gatewayservicename:gatewayservicename,servicenameandversion:displayservicenameandversion,servicemethod:displayservicemethod,qps:displayqps,createtime:createtime,check:check};
			}
			else if(action==3)
			{
				var displayservicenameandversion;
				var displayservicemethod;
				var displayqps;
				if(servicenameandversion!=result[i].beforeInfo.split(":")[1]+":"+result[i].beforeInfo.split(":")[2])
				{
					if((result[i].beforeInfo.split(":")[1]+":"+result[i].beforeInfo.split(":")[2])==":")
					{
						displayservicenameandversion=servicenameandversion+"<font size='2px' >(回退后)</font></br>"+""+"<font size='2px' >(当前)</font></br>";
					}
					else
					{
						displayservicenameandversion=servicenameandversion+"<font size='2px' >(回退后)</font></br>"+result[i].beforeInfo.split(":")[1]+":"+result[i].beforeInfo.split(":")[2]+"<font size='2px' >(当前)</font></br>";
					}				
				}
				else
				{
					displayservicenameandversion=servicenameandversion;
				}
				
				if(servicemethod!=result[i].beforeInfo.split(":")[3])
				{
					displayservicemethod=servicemethod+"<font size='2px' >(回退后)</font></br>"+result[i].beforeInfo.split(":")[3]+"<font size='2px' >(当前)</font></br>";
				}
				else
				{
					displayservicemethod=servicemethod;
				}
				if(qps!=result[i].beforeInfo.split(":")[4])
				{
					displayqps=qps+"<font size='2px' >(回退后)</font></br>"+result[i].beforeInfo.split(":")[4]+"<font size='2px' >(当前)</font></br>";
				}
				else
				{
					displayqps=qps;
				}
				var check="<font size='3px' color='#FF9933'>待回退</font>";
				data[i]={checkbox:action+"/"+result[i].id+"/"+result[i].beforeInfo+"/"+result[i].info,gatewayservicename:gatewayservicename,servicenameandversion:displayservicenameandversion,servicemethod:displayservicemethod,qps:displayqps,createtime:createtime,check:check};
			}
		}		
	}

	$('#dg').datagrid({ loadFilter: pagerFilter }).datagrid({
		remoteSort: false,
		toolbar: '#tb',
		fitColumns : true,
		columns:[[
		         {field:'checkbox',checkbox:true},
		  		{field:'gatewayservicename',title:'公网网关服务',width:'15%',sortable:true,sorter:function(a,b){
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
		  		{field:'servicemethod',title:'路由微服务方法名',width:'20%'},
		  		{field:'qps',title:'流量限制（单节点）',width:'13%'},
		  		{field:'createtime',title:'提交审核时间',width:'15%',sortable:true,sorter:function(a,b){
		  			a=a;
                	b=b;
                    if(a < b)
                        return -1;
                    else if(a == b)
                        return 0;
                    else
                        return 1;
		  		}},
		  		{field:'check',title:'待处理',width:'7%'}
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
    $("body").on("click","#all",function(){
    	var isChecked = $(this).prop("checked");
        $("input[name='checkbox']").prop("checked", isChecked);
	})
	$("body").on("click","#pass",function(){
		if($("input[name='checkbox']:checked").length>0)
		{
			 var txt=  "确定全部审核通过？";
			  var option = {
			        title: "提示",
			        btn: parseInt("0011",2),
			        onOk: function(){
			        	$("input[name='checkbox']").each(function(){
							if($(this).prop("checked"))
							{
								var action=$(this).val().split("/")[0];
								var id=$(this).val().split("/")[1];
								var beforeInfo=$(this).val().split("/")[2];
								var info=$(this).val().split("/")[3];
								var value;
								if(action==1||action==2||action==3)
								{
									value=info;
								}
								else if(action==0)
								{
									value=beforeInfo;
								}				
								var gatewayservicename=value.split(":")[0];
								var jsonData={action:action,gatewayServiceName:gatewayservicename,beforeInfo:beforeInfo,info:info,createtime:getMyDate(new Date())};

								$.ajax({
							        type: "POST",
							        url: "../gatewaychecked/insert?checkid="+id,
							        contentType: "application/json",
							        dataType: "json",
							        async: false,
							        data: JSON.stringify(jsonData),
							        success: function (result) {     	
							        }			
							    });
								
							}
						})			
						window.location.reload();
			        },
			        onCancel:function(){		        	
			        }
			    }
			  window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm,option);
		}
		else
		{
			var txt=  "请选中相应的记录进行操作！";
			window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
			return false;
		}	
	})
	
	$("body").on("click","#delete",function(){
		if($("input[name='checkbox']:checked").length>0)
		{
			var txt=  "确定全部撤销？";
			  var option = {
				        title: "提示",
				        btn: parseInt("0011",2),
				        onOk: function(){
				        	$("input[name='checkbox']").each(function(){
								if($(this).prop("checked"))
								{
									$.ajax({
								        type: "GET",
								        url: "../gatewaycheck/delete/?id="+$(this).val().split("/")[1],
								        contentType: "application/json",
								        dataType: "json",
								        async: false,
								        success: function (result) {     	
								        }			
								    });
								}
							})	
							window.location.reload();
				        },
				        onCancel:function(){
				        }
			  	}
			  window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm,option);
		}
		else
		{
			var txt=  "请选中相应的记录进行操作！";
			window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
			return false;
		}	
	})
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
	
	$.each(data,function(key,val){     
		var total=$.trim($(val.check).html()+"|"+val.gatewayservicename+"|"+val.servicenameandversion+"|"+val.servicemethod+"|"+val.qps+"|"+val.checkTime).toLowerCase();		
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
				columns:[[
				        {field:'checkbox',checkbox:true},
				  		{field:'gatewayservicename',title:'公网网关服务',width:'18%',sortable:true,sorter:function(a,b){
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
				  		{field:'servicemethod',title:'路由微服务方法名',width:'20%'},
				  		{field:'qps',title:'流量限制（单节点）',width:'10%'},
				  		{field:'createtime',title:'提交审核时间',width:'15%',sortable:true,sorter:function(a,b){
				  			a=a;
		                	b=b;
		                    if(a < b)
		                        return -1;
		                    else if(a == b)
		                        return 0;
		                    else
		                        return 1;
				  		}},
				  		{field:'check',title:'待审核',width:'7%'}
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

