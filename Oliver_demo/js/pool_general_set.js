                                                                        //  todo 常规设置
var pageContext = document.location.pathname.substr(0,document.location.pathname.substr(1).indexOf("/")+1);   //获取的根路径操作
//页面加载的时候进行请求数据
function  PoolGeneralHtml() {
	$.ajax({
		type: "get",
		dataType: "json", //服务端接收的数据类型
		url: "./json/router.json",               // 常规设置获取进行请求地址  变量：pageContext
		success: function(data){   // 加载页面展示的数据
			if(JSON.stringify(data) =="{}"){
				data={
					"name": "''",
					"wildcard": ["===请选择==="],
					"policies": {
						"''": "===请选择==="
					}
				};
			}

			routeOperateHtml="";
			 wildardHtml="";
			 /* todo 加载所有option */
			selectlist.map(function (value,key) {             // todo 每个遍历所有option
				return  routeOperateHtml=routeOperateHtml+`<option key=${key}>${value}</option>`;
			});
			/* todo 默认路由配置*/
			var wildcardLength=data.wildcard.length;
      data.wildcard.map(function(value,key){             //默认路由配置
      	return wildardHtml=wildardHtml+`</tr>
											<td style="padding-left:0;" key="${key}">
                          <div class="form-group" style="display:inline-block">
												      <select class="selectpicker option-search router_operate" data-live-search="true" title="===请选择===">
												        ${routeOperateHtml}
												      </select>
												   </div>  
                            <a href="javascript:;" class="delte_route_operate_default">
                                <span class="label label-danger">Delete</span>
                            </a>
                          </td>
                      </tr>`
      });
      /* todo 操作策略变量*/
      var operatePolicyHTml="",
          policy_router_index=0,       //  浅醉路由的的名称下标
          RouterPolicyIndex=0;         //  操作策略的--table--子内容的下标
			for(var key in data.policies){ // todo  进行循环有多少个策略
				var policy_router_arr=[];   //将数组进行判空
				operatePolicyChildHTml="";    //将策略中的select 进行清空
				// console.log("属性：" + key + ",值："+ data.policies[key]);
				policy_router_arr=data.policies[key].split(",");
				policy_router_arr.map(function(value,index){           // todo 操作池中中select,进行填充
								operatePolicyChildHTml=operatePolicyChildHTml+`<tr class="router_policy_selcte">
                                   <td style="padding-left:0;">
                                      <div class="form-group" style="display:inline-block">
		                                      <select key=${index} class="selectpicker option-search" data-live-search="true" title="===请选择===">
																								${routeOperateHtml}     
																					</select>
																		   </div>
                                     <a href="javascript:;" class="delte_route_operate_default">
                                         <span class="label label-danger">Delete</span>
                                     </a>
                                   </td>
                                 </tr>`;
				});
				operatePolicyHTml=operatePolicyHTml+`<table key=${RouterPolicyIndex++} class="add_strategy_box table table-striped table-hover table-bordered"  align="center">   
                  <tbody class="operate_policy">
                    <tr>
                      <td class="policy_router" style="width:20%;" >前缀路由</td>
                      <td class="" style="text-align:left;">
                        <div class="" style="width:30%;display:inline-block;">
                            <input class="form-control pre_router_name" type="text"  key=${policy_router_index++} value=${key} placeholder="请输入名称">
                        </div>
                    </tr>
                    <tr>
                      <td>操作路由池</td>
                      <td>
                       <table>
                         <tr>
                           <td>
                             <table class="add_server_one">
                               <tbody class="add_server_one_body">
                                  <!--操作路由池中select的个数-->
																		      ${operatePolicyChildHTml}
                               </tbody>
                             </table>
                           </td>
                         </tr>
                         <tr>

                           <td style="text-align:left;">
                             <a href="javascript:;" class="add_server_btn">
                               <span class="label label-success" >添加服务器</span>
                             </a>
                           </td>
                         </tr>

                       </table>
                      </td>
                    </tr>
                    <tr >
                      <td colspan="2">
                        <a href="javascript:;" class="delte_policy">
                            <span class="label label-danger">删除该策略</span>
                        </a></td>
                    </tr>
                  </tbody>
                </table>`;
			}
			//策略end
			//整个布局变量
			var general_set_data=`<div class="adv-table editable-table">     
              <table class="table table-striped table-hover table-bordered"  align="center">
                <caption class="mcrouter_title">路由前缀</caption>
                <tbody>
                  <tr>
                    <td class="" style="width:20%;">路由前缀名称</td>
                    <td class="" style="text-align:left;">
                      <div class="" style="width:30%;display:inline-block;">
                          <input class="form-control route_prefix_title" type="text" id="route_prefix_title" value=${data.name} placeholder="请输入名称">
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table class="table table-striped table-hover table-bordered"  align="center">
                <caption class="mcrouter_title">默认路由配置</caption>
                <tbody>
                  <tr>
                    <td class="" style="width:20%;" rowspan="2" >路由操作</td>
                    <td class="" style="text-align:left;">
                    <table class="add_server_one">

                      <tbody class="add_server_one_body" id="route_operate">
                          ${wildardHtml}
                      </tbody>
                    </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="text-align:left;">
                      <a href="javascript:;" class="add_server_btn">
                        <span class="label label-success" >添加服务器</span>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="strategy_box">
                  <div class="mcrouter_title">操作策略</div >  
                    <!--操作策略-->
                    ${operatePolicyHTml}
              </div>
              <a href="javascript:;" class="add_strategy">
              <span class="label label-success">添加策略</span>
              </a>
              <a href="javascript:;" class="submit_general_set_data">
                <span class="label label-success">保存</span>
              </a>
            </div>`;
			$(".general_set_box").append(general_set_data);
			$('.option-search').selectpicker('refresh');
			//对路由此操作的进行选定
			data.wildcard.map(function (value,key) {
				$('select.router_operate').eq(key).selectpicker('val', value);               //默认路由配置
			});
			// todo 对操作路由进行选定
			routerPolicyKey=0;
			for(var key in data.policies){     //这列是进行遍历有多少个操作策略
				// console.log(data.policies[key].split(","));
				data.policies[key].split(",").map(function(value,key){     //  操作策略的操作路由池
					$(".add_strategy_box").eq(routerPolicyKey).find("select.selectpicker").eq(key).selectpicker('val', value);
				});
				routerPolicyKey++;
			}
			//操作路由选定结束
		},
		error: function() {
			console.log("常规设置请求异常");
		}
	});
};
//选择框列表请求
 function selectOption(){
	 $.ajax({
		 type: "get",
		 dataType: "json", //服务端接收的数据类型
		 url: "./json/routerlist.json",               // 请求选择框中的所有选项option  变量：pageContext
		 success: function (data) {
			 selectlist =data;   //  todo  展示所有的option 选择
		 },
		 complete:function(){
			 PoolGeneralHtml();
		 }
	 });
 }
$(function(){
	selectOption();
});
// 表单的增加备份
$('body').on('click',".add_backup",function(){
  //$('.add_backup>span').removeClass("label-success").addClass("label-primary");
  $(this).next().css("display","inline-block");
});
//表单的删除的备份事件
$("body").on('click',".delete_backup",function(){

  $(this).parent().css("display","none");
});
//删除默认路由配置
$('body').on("click",".delte_route_operate_default",function(){
    $(this).parent().parent().remove();
});
// 添加路由前缀名称的一条数据
$("body").on("click",".add_server_btn",function(){
  var add_server_html=`<tr>
    <td style="padding-left:0;">
      <div class="form-group" style="display:inline-block">
		      <select class="selectpicker option-search" data-live-search="true" title="===请选择===">
		        ${routeOperateHtml}
		      </select>
		    </div>
      <a href="javascript:;" class="delte_route_operate_default">
          <span class="label label-danger">Delete</span>
      </a>
    </td>
  </tr>`;
  $(this).parent().parent().prev().find(".add_server_one_body").append(add_server_html);
	$('.option-search').selectpicker('refresh');

});
//删除该策略
$("body").on('click','.delte_policy',function(){
  $(this).parent().parent().parent().parent().remove();
});
//添加策略
$('body').on("click",".add_strategy",function(){
  var addstrategy=`<table class="add_strategy_box table table-striped table-hover table-bordered"  align="center">
                  <tbody class="operate_policy">
                    <tr>
                      <td class="policy_router" style="width:20%;" >前缀路由</td>
                      <td class="" style="text-align:left;">
                        <div class="" style="width:30%;display:inline-block;">
                            <input class="form-control pre_router_name" type="text"  value="" placeholder="请输入名称">
                        </div>
                    </tr>
                    <tr>
                      <td>操作路由池</td>
                      <td>
                       <table>
                         <tr>
                           <td>
                             <table class="add_server_one">

                               <tbody class="add_server_one_body">
                                 <tr>
                                   <td style="padding-left:0;">
                                      <div class="form-group" style="display:inline-block">
																		      <select class="selectpicker option-search" data-live-search="true" title="===请选择===">
																		        ${routeOperateHtml}
																		      </select>
																		    </div>
                                     <a href="javascript:;" class="delte_route_operate_default">
                                         <span class="label label-danger">Delete</span>
                                     </a>
                                     
                                   </td>
                                 </tr>

                               </tbody>
                             </table>
                           </td>
                         </tr>
                         <tr>

                           <td style="text-align:left;">
                             <a href="javascript:;" class="add_server_btn">
                               <span class="label label-success" >添加服务器</span>
                             </a>
                           </td>
                         </tr>

                       </table>
                      </td>
                    </tr>
                    <tr >
                      <td colspan="2">
                        <a href="javascript:;" class="delte_policy">
                            <span class="label label-danger">删除该策略</span>
                        </a></td>
                    </tr>
                  </tbody>
                </table>`;
  $(".strategy_box").append(addstrategy);
	$('.option-search').selectpicker('refresh');
});
//提交内容的地址的
$('body').on("click",'.submit_general_set_data',function(){
	  route_prefix_title="";
		router_selected=[];                // select中的选择项
	  route_prefix_title=$("#route_prefix_title").val();              // todo 路由前缀的名称
	$('#route_operate .filter-option').map(function(key,value){        //todo  获取路由操作中的值
		router_selected.push($(value).html());
	});
	// todo 操作策略参数
	var  policyArr=[],
			Routepool=[];
	$(".add_strategy_box").map(function(key,value){      //对操作策略进行循环便利
			Routepool=[];
		$(value).find(".filter-option").map(function(key,value){
			if($(value).html() != "===请选择==="){
				Routepool.push($(value).html());
			}

		});
		policyArr.push(
			{"Routealiases":$(value).find(".pre_router_name").val(),
				"Routepool":Routepool
			}
		);
	});
	console.log(router_selected);

	if(router_selected=="===请选择==="||route_prefix_title==""){
		if(route_prefix_title==""){
			alert("请输入路由前缀名称");
		}else if(router_selected=="===请选择==="){
			alert("请选择路由操作的池名称");
		}
	}else{
		policyArr.map(function (value,key) {               //对操作的策略进行判断是否为空
			if( value.Routealiases=="" && value.Routepool.length!=0  ){
				alert("前缀名称和路由操作必须都进行填写或两者都不填");
			}else if(value.Routealiases!=""&&value.Routepool.length==0){
				alert("前缀名称和路由操作必须都进行填写或两者都不填!");
			}
		});

		if(policyArr.length==0){
				console.log("操作策略填写内容为空");
		}
		if(router_selected.length==0){
			alert("默认路由配置的路由操作请添加");
		}
		var datas={
			"aliases":route_prefix_title,
			"wildcard":router_selected,
			"policies":policyArr
		};
		console.log(datas);
		$.ajax({
			type: "post",
			dataType: "json", //服务端接收的数据类型
			url: "./json/router.json",               // 提交地址 变量：pageContext
			data:datas,
			success: function(data) {
				console.log("提交成功");
			},
			error:function(){
				console.log("提交出现异常");
			}
		});
	}
});
