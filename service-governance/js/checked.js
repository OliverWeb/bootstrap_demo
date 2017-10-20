$.get("../gatewaychecked/list/",function(result){	
	refresh(result);	
});
var data=[];
function refresh(result)
{	
	if(result)
	{
		for(var i=0;i<result.length;i++)
		{
			var action=result[i].action;
			var checkTime=result[i].createtime;
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
			var servicename=displayvalue.split(":")[1];
			var serviceversion=displayvalue.split(":")[2];
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

			if(action==1)
			{
				var check="<font size='3px' color='green'>已添加</font>";
				data[i]={gatewayservicename:gatewayservicename,servicenameandversion:servicenameandversion,servicemethod:servicemethod,qps:qps,checkTime:checkTime,check:check};
			}
			else if(action==0)
			{
				var check="<font size='3px' color='red'>已删除</font>";
				data[i]={gatewayservicename:gatewayservicename,servicenameandversion:servicenameandversion,servicemethod:servicemethod,qps:qps,checkTime:checkTime,check:check};
			}
			else if(action==2)
			{
				var check="<font size='3px' color='blue'>已更新</font>";
				var displayservicenameandversion;
				var displayservicemethod;
				var displayqps;
				if(servicenameandversion!=result[i].beforeInfo.split(":")[1]+":"+result[i].beforeInfo.split(":")[2])
				{
					displayservicenameandversion=servicenameandversion+"<font size='2px' >(更新后)</font></br>"+result[i].beforeInfo.split(":")[1]+":"+result[i].beforeInfo.split(":")[2]+"<font size='2px' >(更新前)</font></br>";
				}
				else
				{
					displayservicenameandversion=servicenameandversion;
				}
				if(servicemethod!=result[i].beforeInfo.split(":")[3])
				{
					displayservicemethod=servicemethod+"<font size='2px' >(更新后)</font></br>"+result[i].beforeInfo.split(":")[3]+"<font size='2px' >(更新前)</font></br>";
				}
				else
				{
					displayservicemethod=servicemethod;
				}
				if(qps!=result[i].beforeInfo.split(":")[4])
				{
					displayqps=qps+"<font size='2px' >(更新后)</font></br>"+result[i].beforeInfo.split(":")[4]+"<font size='2px' >(更新前)</font></br>";
				}
				else
				{
					displayqps=qps;
				}
				data[i]={gatewayservicename:gatewayservicename,servicenameandversion:displayservicenameandversion,servicemethod:displayservicemethod,qps:displayqps,checkTime:checkTime,check:check};
			}
			else if(action==3)
			{
				var check="<font size='3px' color='#FF9933'>已回退</font>";
				var displayservicenameandversion;
				var displayservicemethod;
				var displayqps;
				if(servicenameandversion!=result[i].beforeInfo.split(":")[1]+":"+result[i].beforeInfo.split(":")[2])
				{
					displayservicenameandversion=servicenameandversion+"<font size='2px' >(回退后)</font></br>"+result[i].beforeInfo.split(":")[1]+":"+result[i].beforeInfo.split(":")[2]+"<font size='2px' >(回退前)</font></br>";
				}
				else
				{
					displayservicenameandversion=servicenameandversion;
				}
				if(servicemethod!=result[i].beforeInfo.split(":")[3])
				{
					displayservicemethod=servicemethod+"<font size='2px' >(回退后)</font></br>"+result[i].beforeInfo.split(":")[3]+"<font size='2px' >(回退前)</font></br>";
				}
				else
				{
					displayservicemethod=servicemethod;
				}
				if(qps!=result[i].beforeInfo.split(":")[4])
				{
					displayqps=qps+"<font size='2px' >(回退后)</font></br>"+result[i].beforeInfo.split(":")[4]+"<font size='2px' >(回退前)</font></br>";
				}
				else
				{
					displayqps=qps;
				}
				data[i]={gatewayservicename:gatewayservicename,servicenameandversion:servicenameandversion,servicemethod:displayservicemethod,qps:displayqps,checkTime:checkTime,check:check};
			}
		}	
	}
	
	$('#dg').datagrid({ loadFilter: pagerFilter }).datagrid({
		remoteSort: false,
		toolbar: '#tb',
		fitColumns : true,
		columns:[[
		  		{field:'gatewayservicename',title:'公网网关服务',width:'17%',sortable:true,sorter:function(a,b){
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
		  		{field:'qps',title:'流量限制（单节点）',width:'11%'},
		  		{field:'checkTime',title:'审核时间',width:'15%',sortable:true,sorter:function(a,b){
		  			a=a;
                	b=b;
                    if(a < b)
                        return -1;
                    else if(a == b)
                        return 0;
                    else
                        return 1;
		  		}},
		  		{field:'check',title:'处理状态',width:'7%'}
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
				  		{field:'gatewayservicename',title:'公网网关服务',width:'17%',sortable:true,sorter:function(a,b){
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
				  		{field:'qps',title:'流量限制（单节点）',width:'11%'},
				  		{field:'checkTime',title:'审核时间',width:'15%',sortable:true,sorter:function(a,b){
				  			a=a;
		                	b=b;
		                    if(a < b)
		                        return -1;
		                    else if(a == b)
		                        return 0;
		                    else
		                        return 1;
				  		}},
				  		{field:'check',title:'处理状态',width:'7%'}
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

