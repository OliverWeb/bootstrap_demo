//  todo 常规设置
var pageContext = document.location.pathname.substr(0, document.location.pathname.substr(1).indexOf("/") + 1);   //获取的根路径操作
//页面加载的时候进行请求数据
function PoolGeneralHtml() {
	$.ajax({
		type: "get",
		dataType: "json", //服务端接收的数据类型
		url: "./json/cold_warm.json",               // 常规设置获取进行请求地址  变量：pageContext
		success: function (data) {   // 加载页面展示的数据
			if (JSON.stringify(data) == "{}") {
				data = {
					"name": "''",
					"wildcard": ["===请选择==="],
					"policies": {
						"''": ["===请选择==="]
					}
				};
			}

			routeOperateHtml_cold = "";
			routeOperateHtml_warm = "";
			wildardHtml = "";
			/* todo 加载所有option */
			defaultSelect = selectlist;      //默认路由配置中的数组
			defaultSelect.cold.map(function (value, key) {             // todo 每个遍历所有option
				return routeOperateHtml_cold = routeOperateHtml_cold + `<option value=${value} key=${key}>${value}</option>`;
			});
			defaultSelect.warm.map(function (value, key) {             // todo 每个遍历所有option
				return routeOperateHtml_warm = routeOperateHtml_warm + `<option value=${value} key=${key}>${value}</option>`;
			});

			/* todo 默认路由配置*/
			var wildcardLength = data.wildcard.length;
			data.wildcard.map(function (value, key) {             //默认路由配置
				return wildardHtml = wildardHtml + `<tr class="select_option_box">
											<td  style="padding-left:0;" key="${key}">
													<a href="javascript:;" class="add_backup">
															<span class="label label-success">Cold</span>
													</a>
                          <div class="form-group" style="display:inline-block">
												      <select key="${key}" data-size="9" data-type="cold" class="selectpicker option-search router_operate" data-live-search="true" title="===请选择===">
												        ${routeOperateHtml_cold}
												      </select>
												   </div>  
                            <a href="javascript:;" class="add_backup">
															<span class="label label-success">Warm</span>
														</a>
														<div class="form-group" style="display:inline-block">
													      <select key="${key}" data-size="9" data-type="warm" class="selectpicker option-search router_operate" data-live-search="true" title="===请选择===">
													        ${routeOperateHtml_warm}
													      </select>
													   </div> 
														<a href="javascript:;" class="delte_route_operate_default">
                                <span class="label label-danger">Delete</span>
                            </a>
                          </td>
                      </tr>`
			});
			/* todo 操作策略变量*/
			var operatePolicyHTml = "",
				policy_router_index = 0,       //  浅醉路由的的名称下标
				RouterPolicyIndex = 0;         //  操作策略的--table--子内容的下标
			for (var key in data.policies) { // todo  进行循环有多少个策略
				var policy_router_arr = [];   //将数组进行判空
				operatePolicyChildHTml = "";    //将策略中的select 进行清空
				// console.log("属性：" + key + ",值："+ data.policies[key]);
				policy_router_arr = data.policies[key];

				policy_router_arr.map(function (value, index) {           // todo 操作池中中select,进行填充
					operatePolicyChildHTml = operatePolicyChildHTml + `<tr class="router_policy_selcte select_option_box">
                                   <td style="padding-left:0;">
                                   		<a href="javascript:;" class="delte_route_operate_success">
                                         <span class="label label-success">Cold</span>
                                     	</a>
                                      <div class="form-group" style="display:inline-block">
		                                      <select data-size="9" key=${index} data-type="cold" class="selectpicker option-search" data-live-search="true" title="===请选择===">
																								${routeOperateHtml_cold}     
																					</select>
																		  </div>
																		  <a href="javascript:;" class="delte_route_operate_success">
                                         <span class="label label-success">Warm</span>
                                     	</a>
                                     	<div class="form-group" style="display:inline-block">
		                                      <select data-size="9" key=${index} data-type="warm" class=" selectpicker option-search" data-live-search="true" title="===请选择===">
																								${routeOperateHtml_warm}     
																					</select>
																		  </div>
                                     <a href="javascript:;" class="delte_route_operate_default">
                                         <span class="label label-danger">Delete</span>
                                     </a>
                                     
                                   </td>
                                 </tr>`;
				});
				operatePolicyHTml = operatePolicyHTml + `<table key=${RouterPolicyIndex++} class="add_strategy_box table table-striped table-hover table-bordered"  align="center">   
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
			var general_set_data = `<div class="adv-table editable-table">     
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
              
              <!--默认池start-->
             
              <!--默认池end-->
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
			//对路由池操作的进行选定,默认路由进行操作选中
			data.wildcard.map(function (value, key) {

				$('#route_operate .select_option_box').eq(key).find("select").eq(0).selectpicker('val', value.cold);               //默认路由配置 cold
				$('#route_operate .select_option_box').eq(key).find("select").eq(1).selectpicker('val', value.warm);               //默认路由配置  warm
			});
			// todo 对操作路由进行选定
			routerPolicyKey = 0;

			for (var key in data.policies) {     //这列是进行遍历有多少个操作策略

				data.policies[key].map(function (value, key) {     //  操作策略的操作路由池

					$(".strategy_box table.add_strategy_box").eq(routerPolicyKey).find(".router_policy_selcte").eq(key).find("select").eq(0).selectpicker('val', value.cold);
					$(".strategy_box table.add_strategy_box").eq(routerPolicyKey).find(".router_policy_selcte").eq(key).find("select").eq(1).selectpicker('val', value.warm);

				});
				routerPolicyKey++;
			}
			//操作路由选定结束
		},
		error: function () {
			console.log("常规设置请求异常");
		}
	});
};

//选择框列表请求
function selectOption() {
	$.ajax({
		type: "get",
		dataType: "json", //服务端接收的数据类型
		url: "./json/routerlist.json",               // 请求选择框中的所有选项option  变量：pageContext
		success: function (data) {
			selectlist = data;   //  todo  展示所有的option 选择
		},
		complete: function () {
			PoolGeneralHtml();
		}
	});
}

$(function () {
	selectOption();
});
// 表单的增加备份
// $('body').on('click', ".add_backup", function () {
// 	//$('.add_backup>span').removeClass("label-success").addClass("label-primary");
// 	$(this).next().css("display", "inline-block");
// });
//表单的删除的备份事件
// $("body").on('click', ".delete_backup", function () {
//
// 	$(this).parent().css("display", "none");
// });
//删除默认路由配置
$('body').on("click", ".delte_route_operate_default", function () {
	$(this).parent().parent().remove();
});
// 添加路由前缀名称的一条数据
$("body").on("click", ".add_server_btn", function () {
	var add_num = $(this).parent().parent().prev().find(".select_option_box").length;

	var add_server_html = `<tr class="select_option_box">
    <td style="padding-left:0;">
      <a href="javascript:;" class="add_backup">
				<span class="label label-success">Cold</span>
			</a>
	    <div class="form-group" style="display:inline-block">
	      <select key=${add_num} data-size="9" data-type="cold" class=" selectpicker option-search" data-live-search="true" title="===请选择===">
	        ${routeOperateHtml_cold}
	      </select>
	    </div>
      <a href="javascript:;" class="add_backup">
				<span class="label label-success">Warm</span>
			</a>
			<div class="form-group" style="display:inline-block">
		      <select key=${add_num} data-size="9" data-type="cold" class="selectpicker option-search router_operate" data-live-search="true" title="===请选择===">
		        ${routeOperateHtml_warm}
		      </select>
		  </div> 
			<a href="javascript:;" class="delte_route_operate_default">
          <span class="label label-danger">Delete</span>
      </a>
    </td>
  </tr>`;
	$(this).parent().parent().prev().find(".add_server_one_body").append(add_server_html);
	$('.selectpicker').selectpicker('refresh');
});
//删除该策略
$("body").on('click', '.delte_policy', function () {
	$(this).parent().parent().parent().parent().remove();
});
//添加策略
$('body').on("click", ".add_strategy", function () {
	var addstrategy = `<table class="add_strategy_box table table-striped table-hover table-bordered"  align="center">
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
                                 <tr class="select_option_box">
                                   <td style="padding-left:0;">
                                   		<a href="javascript:;" class="delte_route_operate_success">
                                         <span class="label label-success">Cold</span>
                                     	</a>
                                      <div class="form-group" style="display:inline-block">
																		      <select key="0" data-size="9"  data-type="cold" class="selectpicker option-search" data-live-search="true" title="===请选择===">
																		        ${routeOperateHtml_cold}
																		      </select>
																		  </div>
																		  <a href="javascript:;" class="delte_route_operate_success">
                                         <span class="label label-success">Warm</span>
                                     	</a>
                                     	<div class="form-group" style="display:inline-block">
																		      <select key="0" data-size="9" data-type="cold" class="selectpicker option-search" data-live-search="true" title="===请选择===">
																		        ${routeOperateHtml_warm}
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
$('body').on("click", '.submit_general_set_data', function () {
	var judge_router_reporte,judge_polic_name=1,judge_polic_option=1;
	route_prefix_title = "";
	router_selected = [];                // select中的选择项
	route_prefix_title = $("#route_prefix_title").val();              // todo 路由前缀的名称
	/*冷暖池处理对象start */
	/*默认路由配置*/
	$('#route_operate tr').map(function (key, value) {        //todo  获取路由操作中的值
		router_selected_obj={};
		/*处理提交的时候的选择内容为"===请选择==="*/
		if($(value).find("select").eq(0).val()!=""&&$(value).find("select").eq(1).val()!=""){
			router_selected_obj.type="WarmUpRoute";
			router_selected_obj.cold="PoolRoute|"+$(value).find("select").eq(0).val();
			router_selected_obj.warm="PoolRoute|"+$(value).find("select").eq(1).val();
			router_selected.push( router_selected_obj );
		}else{
				judge_router_reporte=true;        /*默认路由操作判断*/
		}
	});
	/*冷暖池处理对象 end*/
	// todo 操作策略参数操作数据传参数
	var policyArr = [],
		  Routepool = [];
			policiesArr={};
	$(".add_strategy_box").map(function (key, value) {      //对操作策略进行循环便利
		router_policy=[];
		Routepool = [];
		if($(value).find("input.pre_router_name").val()!=""){
			$(value).find("tr.select_option_box").map(function (key, value) {   //对操作策略子内容进行处理
				if($(value).find("select").eq(0).val()!="" && $(value).find("select").eq(1).val()!=""){
					router_policy_obj={};
					router_policy_obj.type="WarmUpRoute";
					router_policy_obj.cold="PoolRoute|"+$(value).find("select").eq(0).val();
					router_policy_obj.warm="PoolRoute|"+$(value).find("select").eq(1).val();
					router_policy.push( router_policy_obj );
					judge_polic_option=0;
				}else{
					judge_polic_option=1;
				}
			});
			policiesArr[$(value).find("input.pre_router_name").val()]=router_policy;
			judge_polic_name=0
		}else{
			judge_polic_name=1;
		}

	});
	/* 判断内容是否可以满足提交的需求  start*/
  console.log(judge_polic_name);
	 if(route_prefix_title==""){
		 alert("请填写路由前缀名称");
	 }else if (router_selected.length == 0) {
		alert("请填写默认路由操作");
	}else if(judge_router_reporte){
	 	  alert("请将路由填写完成");
	 }else if(judge_polic_name==1 && judge_polic_option!=1){
			alert("路由策略的名字为空");
	 }else if(judge_polic_name!=1 && judge_polic_option==1){
		 alert("操作路由池没有进行选择");
	} else {
	 	if(JSON.stringify(policiesArr)=="{}"){
	 		var datas={
			  "name": route_prefix_title,
			  "wildcard": JSON.stringify(router_selected)
		  }
	  }else{
		  var datas = {
			  "name": route_prefix_title,
			  "wildcard": JSON.stringify(router_selected),
			  "policies": policiesArr
		  };
	  }
		console.log(datas);
		$.ajax({
			type: "post",
			dataType: "json", //服务端接收的数据类型
			url: "./json/router.json",               // 提交地址 变量：pageContext
			data: datas,
			success: function (data) {
				console.log("提交成功");
			},
			error: function () {
				console.log("提交出现异常");
			}
		});
	}
});
/*对于选着重复option事情的处理*/
$(function () {
	$('body').on('shown.bs.select', '.selectpicker', function (e) {    //当选择页面出现的时候进行一个逻辑处理
		$('.selectpicker').selectpicker('refresh');
		var _this = this;
		var arr_select = [];
		var selectIndex = $(this).attr("key");      //获取当前被选中的内容,
		var tr_length = $(this).parent().parent().parent().parent().find("tr");      //  将所有的tr进行遍历
		tr_length.map(function (key, value) {
			if (key != selectIndex) {
				if ($(value).find('.filter-option').html() != "===请选择===") {
					console.log($(_this).data("type"));

					var arr_optioned = $(value).find('.filter-option').html();
				} else {
					var arr_optioned = "pool";       /*默认操作的特殊处理*/
				}
				arr_select.push(arr_optioned);          //已经被选中的的加入这个数组
			}
		});

		arr_select.map(function (value, key) {
			$(_this).find('[value=' + value + ']').hide();
			$('.selectpicker').selectpicker('refresh');
		});




	});
});

/* todo 代码待使用 请勿删除*/
/*对option重复option进行判定*/
// $("body").on('click','#route_operate .bootstrap-select',function () {
// 	console.log(123);
// 	// $('.router_operate').find('[value=pool02]').remove();
// 	// $('.router_operate').selectpicker('refresh');
//
// });
// $('body').on('hidden.bs.select','.router_operate', function (e) {
//
// });
// $('body').on('shown.bs.select','.router_operate', function (e) {
//
// });
// $('body').on('changed.bs.select','.router_operate', function (e) {
// 	// clickedIndex，newValue，oldValue。
//   console.log(e);
// });
// // $(function(){//这里是进行获取我们选中的值
// // 	$('body').on('change','select.selectpicker', function(){
// // 		selectedValue = $('.selectpicker option:selected').val();
// // 	});
// // 	//上面这里是进行获取选中的值
// // 	$('body').on('changed.bs.select','.router_operate', function (e, clickedIndex, newValue, oldValue) {
// // 		var arr_select=[];
// // 		clickOptionIndex=clickedIndex;
// // 		selectValue=newValue;
// // 		console.log(clickOptionIndex);
// // 		var selectIndex=$(this).attr("key");
// // 		/*获取当前路由操作中select的个数*/
// // 		$('#route_operate select').map(function (key,value) {
// // 				if(key!=selectIndex){
// // 					arr_select.push(value);
// // 				}
// // 		});
// // 		/*对其他的数据进行处理*/
// // 		arr_select.map(function (value,key) {
// // 			console.log(value);
// // 			$(value).find('[value='+selectedValue+']').hide();
// // 			$('.router_operate').selectpicker('refresh');
// // 		});
// //
// // 	});
// });













