var data=[];
$.get("../microservicechecked/list/",function(result){
	if(result)
	{
		for(var i=0;i<result.length;i++)
		{
			var servicenameandversion=result[i].serviceNameAndVersion;
			var beforeInfo=result[i].beforeInfo;
			var info=result[i].info;
			var createtime=result[i].createtime;
			var displaymaxConnections;
			var displaymaxConnectionsPerMethod;
			var displayconnectTimeout;
			var displayrequestTimeout;
			var displayreadTimeout;
			var beforemockservice;
			var mockservice;
			var displaymockservice;
			
			if(beforeInfo.split(":")[0]==info.split(":")[0])
			{
				displaymaxConnections=beforeInfo.split(":")[0];
			}
			else
			{
				displaymaxConnections=info.split(":")[0]+"<font size='2px' >(更新后)</font></br>"+beforeInfo.split(":")[0]+"<font size='2px' >(更新前)</font></br>";
			}
			if(beforeInfo.split(":")[1]==info.split(":")[1])
			{
				displaymaxConnectionsPerMethod=beforeInfo.split(":")[1];
			}
			else
			{
				displaymaxConnectionsPerMethod=info.split(":")[1]+"<font size='2px' >(更新后)</font></br>"+beforeInfo.split(":")[1]+"<font size='2px' >(更新前)</font></br>";
			}
			if(beforeInfo.split(":")[2]==info.split(":")[2])
			{
				displayconnectTimeout=beforeInfo.split(":")[2];
			}
			else
			{
				displayconnectTimeout=info.split(":")[2]+"<font size='2px' >(更新后)</font></br>"+beforeInfo.split(":")[2]+"<font size='2px' >(更新前)</font></br>";
			}
			if(beforeInfo.split(":")[3]==info.split(":")[3])
			{
				displayrequestTimeout=beforeInfo.split(":")[3];
			}
			else
			{
				displayrequestTimeout=info.split(":")[3]+"<font size='2px' >(更新后)</font></br>"+beforeInfo.split(":")[3]+"<font size='2px' >(更新前)</font></br>";
			}
			if(beforeInfo.split(":")[4]==info.split(":")[4])
			{
				displayreadTimeout=beforeInfo.split(":")[4];
			}
			else
			{
				displayreadTimeout=info.split(":")[4]+"<font size='2px' >(更新后)</font></br>"+beforeInfo.split(":")[4]+"<font size='2px' >(更新前)</font></br>";
			}
			
			if(beforeInfo.split(":").length==6)
			{
				beforemockservice="";
			}
			else
			{
				beforemockservice=beforeInfo.split(":")[5]+beforeInfo.split(":")[6];
			}

			if(info.split(":").length==6)
			{
				mockservice="";
			}
			else
			{
				mockservice=info.split(":")[5]+":"+info.split(":")[6];
			}
			
			if(mockservice==beforemockservice)
			{
				displaymockservice=mockservice;
			}
			else
			{
				displaymockservice=mockservice+"<font size='2px' >(更新后)</font></br>"+beforemockservice+"<font size='2px' >(更新前)</font></br>";
			}
			
			data[i]={servicenameandversion:servicenameandversion,maxConnections:displaymaxConnections,maxConnectionsPerMethod:displaymaxConnectionsPerMethod,connectTimeout:displayconnectTimeout,requestTimeout:displayrequestTimeout,readTimeout:displayreadTimeout,displaymockservice:displaymockservice,createtime:createtime};
		}
	}
	
	$('#dg').datagrid({ loadFilter: pagerFilter }).datagrid({
		remoteSort: false,
		toolbar: '#tb',
		fitColumns : true,
		columns:[[
		  		{field:'servicenameandversion',title:'微服务名版本',sortable:true,sorter:function(a,b){
		  			a=a;
                	b=b;
                    if(a < b)
                        return -1;
                    else if(a == b)
                        return 0;
                    else
                        return 1;
		  		}},
		  		{field:'maxConnections',title:'总并发限制'},
		  		{field:'maxConnectionsPerMethod',title:'单方法并发限制	'},
		  		{field:'connectTimeout',title:'连接超时时间(ms)'},
		  		{field:'requestTimeout',title:'请求超时时间(ms)'},
		  		{field:'readTimeout',title:'响应读取超时时间(ms)'},
		  		{field:'displaymockservice',title:'对应Mock微服务名版本'},
		  		{field:'createtime',title:'提交审核时间'}
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
});


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
		var total=$.trim(val.servicenameandversion+"|"+val.maxConnections+"|"+val.maxConnectionsPerMethod+"|"+val.connectTimeout+"|"+val.requestTimeout+"|"+val.readTimeout+"|"+val.displaymockservice+"|"+val.createtime).toLowerCase();
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
				  		{field:'servicenameandversion',title:'微服务名版本',sortable:true,sorter:function(a,b){
				  			a=a;
		                	b=b;
		                    if(a < b)
		                        return -1;
		                    else if(a == b)
		                        return 0;
		                    else
		                        return 1;
				  		}},
				  		{field:'maxConnections',title:'总并发限制'},
				  		{field:'maxConnectionsPerMethod',title:'单方法并发限制	'},
				  		{field:'connectTimeout',title:'连接超时时间(ms)'},
				  		{field:'requestTimeout',title:'请求超时时间(ms)'},
				  		{field:'readTimeout',title:'响应读取超时时间(ms)'},
				  		{field:'displaymockservice',title:'对应Mock微服务名版本'},
				  		{field:'createtime',title:'提交审核时间'}
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
