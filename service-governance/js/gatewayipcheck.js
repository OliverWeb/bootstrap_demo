var data=[];
$.get("../gatewayipcheck/list/",function(result){
	if(result)
	{
		for(var i=0;i<result.length;i++)
		{
			var ip=result[i].ip;
			var port=result[i].port;
			var beforestatus=result[i].beforeStatus;
			var beforeweight=result[i].beforeWeight;
			var beforebeta=result[i].beforeBeta;
			var beforeconnections=result[i].beforeConnections;
			var beforefails=result[i].beforeFails;
			var status=result[i].status;
			var weight=result[i].weight;
			var beta=result[i].beta;
			var connections=result[i].connections;
			var fails=result[i].fails;
			var createtime=result[i].createtime;
			var displaystatus;
			var displayweight;
			var displaybeta;
			var displayconnections;
			var displayfails;
			if(beforestatus=="0")
			{
				beforestatus="正常";
			}
			else
			{
				beforestatus="下线";
			}
			if(status=="0")
			{
				status="正常";
			}
			else
			{
				status="下线";
			}
			if(beta=="0"||beta=="")
			{
				beta="否";
			}
			else if(beta=="1")
			{
				beta="是";
			}
			if(beforebeta=="0"||beforebeta=="")
			{
				beforebeta="否";
			}
			else if(beforebeta=="1")
			{
				beforebeta="是";
			}
			if(beforebeta=="否"&&beta=="是")
			{
				hascheckbeta=true;
			}
			if(beforestatus==status)
			{
				displaystatus=status;
			}
			else
			{
				displaystatus=status+"<font size='2px' >(更新后)</font></br>"+beforestatus+"<font size='2px' >(当前)</font></br>";
			}
			if(beforeweight==weight)
			{
				displayweight=weight;
			}
			else
			{
				displayweight=weight+"<font size='2px' >(更新后)</font></br>"+beforeweight+"<font size='2px' >(当前)</font></br>";
			}			
			if(beforebeta==beta)
			{
				displaybeta=beta;
			}
			else
			{
				displaybeta=beta+"<font size='2px' >(更新后)</font></br>"+beforebeta+"<font size='2px' >(当前)</font></br>";
			}
			if(beforeconnections==connections)
			{
				displayconnections=connections;
			}
			else
			{
				displayconnections=connections+"<font size='2px' >(更新后)</font></br>"+beforeconnections+"<font size='2px' >(当前)</font></br>";
			}
			if(beforefails==fails)
			{
				displayfails=fails;
			}
			else
			{
				displayfails=fails+"<font size='2px' >(更新后)</font></br>"+beforefails+"<font size='2px' >(当前)</font></br>";
			}
			var reg = new RegExp("\"","g");
			var checkbox=JSON.stringify(result[i]).replace(reg,"'");
			data[i]={checkbox:checkbox,ip:ip,port:port,displaystatus:displaystatus,displayweight:displayweight,displaybeta:displaybeta,displayconnections:displayconnections,displayfails:displayfails,createtime:createtime};
		}
	}
	
	$('#dg').datagrid({ loadFilter: pagerFilter }).datagrid({
		remoteSort: false,
		toolbar: '#tb',
		fitColumns : true,
		columns:[[
		  		{field:'checkbox',checkbox:true},
		  		{field:'ip',title:'节点IP',width:'19%'},
		  		{field:'port',title:'端口',width:'10%'},
		  		{field:'displaystatus',title:'状态',width:'10%'},
		  		{field:'displayweight',title:'节点权重',width:'10%'},
		  		{field:'displaybeta',title:'beta节点',width:'10%'},
		  		{field:'displayconnections',title:'最大连接数',width:'10%'},
		  		{field:'displayfails',title:'最大失败次数',width:'10%'},
		  		{field:'createtime',title:'提交审核时间',width:'20%',sortable:true,sorter:function(a,b){
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
								var reg = new RegExp("'","g");
								var value=JSON.parse($(this).val().replace(reg,"\""));				
								value.createtime=getMyDate(new Date());
								$.ajax({
							        type: "POST",
							        url: "../gatewayipchecked/insert?checkid="+value.id,
							        contentType: "application/json",
							        dataType: "json",
							        async: false,
							        data: JSON.stringify(value),
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
									var reg = new RegExp("'","g");
									var value=JSON.parse($(this).val().replace(reg,"\""));									
									$.ajax({
								        type: "GET",
								        url: "../gatewayipcheck/delete?id="+value.id,
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
		var total=$.trim(val.ip+"|"+val.port+"|"+val.displaystatus+"|"+val.displayweight+"|"+val.displaybeta+"|"+val.displayconnections+"|"+val.displayfails+"|"+val.createtime).toLowerCase();
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
				  		{field:'ip',title:'节点IP',width:'19%'},
				  		{field:'port',title:'端口',width:'10%'},
				  		{field:'displaystatus',title:'状态',width:'10%'},
				  		{field:'displayweight',title:'节点权重',width:'10%'},
				  		{field:'displaybeta',title:'beta节点',width:'10%'},
				  		{field:'displayconnections',title:'最大连接数',width:'10%'},
				  		{field:'displayfails',title:'最大失败次数',width:'10%'},
				  		{field:'createtime',title:'提交审核时间',width:'20%',sortable:true,sorter:function(a,b){
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
