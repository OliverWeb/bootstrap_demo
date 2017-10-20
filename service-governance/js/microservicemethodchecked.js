var data=[];
$.get("../microservicemethodchecked/list/",function(result){
	if(result)
	{
		for(var i=0;i<result.length;i++)
		{
			var servicenameandversion=result[i].serviceNameAndVersion;
			var methodname=result[i].methodName;
			var beforeInfo=result[i].beforeInfo;
			var info=result[i].info;
			var createtime=result[i].createtime;
			var displayDefaultVersion;
			var displayGrayVersion;
			var displayTarget;
			var displayRate;
			var displayTags;
			var displayWhiteList;
			var displayBlackList;
			var displayExecutionTimeout;
			
			if(beforeInfo.split(":")[0]==info.split(":")[0])
			{
				displayDefaultVersion=beforeInfo.split(":")[0];
			}
			else
			{
				displayDefaultVersion=info.split(":")[0]+"<font size='2px' >(更新后)</font></br>"+beforeInfo.split(":")[0]+"<font size='2px' >(更新前)</font></br>";
			}
			if(beforeInfo.split(":")[1]==info.split(":")[1])
			{
				displayExecutionTimeout=beforeInfo.split(":")[1];
			}
			else
			{
				displayExecutionTimeout=info.split(":")[1]+"<font size='2px' >(更新后)</font></br>"+beforeInfo.split(":")[1]+"<font size='2px' >(更新前)</font></br>";
			}
			if(beforeInfo.split(":")[2]==info.split(":")[2])
			{
				displayGrayVersion=beforeInfo.split(":")[2];
			}
			else
			{
				displayGrayVersion=info.split(":")[2]+"<font size='2px' >(更新后)</font></br>"+beforeInfo.split(":")[2]+"<font size='2px' >(更新前)</font></br>";
			}
			
			if(beforeInfo.split(":")[3]==info.split(":")[3])
			{
				displayTarget=changeTarget(info.split(":")[3]);	
			}
			else
			{				
				displayTarget=changeTarget(info.split(":")[3])+"<font size='2px' >(更新后)</font></br>"+changeTarget(beforeInfo.split(":")[3])+"<font size='2px' >(更新前)</font></br>";			
			}
			if(beforeInfo.split(":")[4]==info.split(":")[4])
			{
				displayRate=beforeInfo.split(":")[4];
			}
			else
			{
				displayRate=info.split(":")[4]+"<font size='2px' >(更新后)</font></br>"+beforeInfo.split(":")[4]+"<font size='2px' >(更新前)</font></br>";
			}
			if(replace(beforeInfo.split(":")[5])==replace(info.split(":")[5]))
			{
				displayTags=replace(beforeInfo.split(":")[5]);
			}
			else
			{
				displayTags=replace(info.split(":")[5])+"<font size='2px' >(更新后)</font></br>"+replace(beforeInfo.split(":")[5])+"<font size='2px' >(更新前)</font></br>";
			}
			if(replace(beforeInfo.split(":")[6])==replace(info.split(":")[6]))
			{
				displayWhiteList=replace(beforeInfo.split(":")[6]);
			}
			else
			{
				displayWhiteList=replace(info.split(":")[6])+"<font size='2px' >(更新后)</font></br>"+replace(beforeInfo.split(":")[6])+"<font size='2px' >(更新前)</font></br>";
			}
			if(replace(beforeInfo.split(":")[7])==replace(info.split(":")[7]))
			{
				displayBlackList=replace(beforeInfo.split(":")[7]);
			}
			else
			{
				displayBlackList=replace(info.split(":")[7])+"<font size='2px' >(更新后)</font></br>"+replace(beforeInfo.split(":")[7])+"<font size='2px' >(更新前)</font></br>";
			}
			
			data[i]={servicenameandversion:servicenameandversion,methodname:methodname,defaultversion:displayDefaultVersion,grayversion:displayGrayVersion,target:displayTarget,rate:displayRate,tags:displayTags,whiteList:displayWhiteList,blackList:displayBlackList,executionTimeout:displayExecutionTimeout,createtime:createtime};
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
		  		{field:'methodname',title:'微服务方法名',sortable:true,sorter:function(a,b){
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
		  		{field:'createtime',title:'提交审核时间',sortable:true,sorter:function(a,b){
		  			a=a;
                	b=b;
                    if(a < b)
                        return -1;
                    else if(a == b)
                        return 0;
                    else
                        return 1;
		  		}}
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
		var total=$.trim(val.servicenameandversion+"|"+val.methodname+"|"+val.defaultversion+"|"+val.grayversion+"|"+val.target+"|"+val.rate+"|"+val.tags+"|"+val.whiteList+"|"+val.blackList+"|"+val.executionTimeout+"|"+val.createtime).toLowerCase();
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
									{field:'methodname',title:'微服务方法名',sortable:true,sorter:function(a,b){
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
									{field:'createtime',title:'提交审核时间',sortable:true,sorter:function(a,b){
										a=a;
									b=b;
								    if(a < b)
								        return -1;
								    else if(a == b)
								        return 0;
								    else
								        return 1;
									}}
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

function  changeTarget(target)
{
	var displaytarget;
	if(target=="0")
	{
		 displaytarget="无";
	}
	 else if(target=="1")
	{
		 displaytarget="用户名";
	}
	 else if(target=="2")
	{
		 displaytarget="用户Id";
	}
	 else if(target=="3")
	{
		 displaytarget="IP地址";
	}
	return displaytarget;
}

function replace(str)
{
	if(str=="{}")
	{
		str="";
	}
	return str;
}
