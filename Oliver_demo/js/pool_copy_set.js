//  todo 常规设置
var pageContext = document.location.pathname.substr(0, document.location.pathname.substr(1).indexOf("/") + 1);   //获取的根路径操作
//页面加载的时候进行请求数据
function PoolGeneralHtml() {
	$.ajax({
		type: "get",
		dataType: "json", //服务端接收的数据类型
		url: "./json/copy.json",               // 常规设置获取进行请求地址  变量：pageContext
		success: function (data) {   // 加载页面展示的数据
		  if(data.status=="success"){
			  if (data.message== "") {
				  data = {
					  "name": "''",
					  "wildcard": ["===请选择==="],
					  "policies": {
						  "''": ["===请选择==="]
					  }
				  };
			  }else{
				  data=data.message;
			  }
			  routeOperateHtml = "";
			  wildardHtml = "";
			  /* todo 加载所有option */
			  defaultSelect = selectlist;      //默认路由配置中的数
			  defaultSelect.map(function (value, key) {             // todo 每个遍历所有option
				  return routeOperateHtml = routeOperateHtml + `<option value=${value} key=${key}>${value}</option>`;
			  });
			  /* todo 默认路由配置*/
			  var wildcardLength = data.wildcard.length;
			  data.wildcard.map(function (value, key) {             //默认路由配置
				  return wildardHtml = wildardHtml + `<tr class="select_option_box">
											<td class="02"  style="padding-left:0;" key="${key}">
                          <div class="form-group" style="display:inline-block">
												      <select key="${key}" data-size="9" class="selectpicker option-search router_operate" data-live-search="true" title="===请选择===">
												        ${routeOperateHtml}
												      </select>
												   </div>  
                            <a href="javascript:;" class="delte_route_operate_default">
                                <span class="label label-danger">Delete</span>
                            </a>
                            <a href="javascript:;" class="add_backup">
															<span class="label label-success">添加备份</span>
														</a>
														<div style="display:none;"  class="add_backup_box">
													<div class="form-group" style="display:inline-block">
												      <select key="${key}" data-size="9" class="selectpicker option-search router_operate" data-live-search="true" title="===请选择===">
												        ${routeOperateHtml}
												      </select>
												   </div> 
													<a href="javascript:;" class="delete_backup">
														<span class="label label-danger">删除备份</span>
													</a>
													<span style="color:#72d0eb;display:inline-block;">备份比例</span>
													<div class="" style="width:20%;display:inline-block;">
                          <input class="form-control percentage" type="text" value="" placeholder="例如:0.1">
                     		 </div>
												</div>
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
                                      <div class="form-group" style="display:inline-block">
		                                      <select data-size="9" key=${index} class="selectpicker option-search" data-live-search="true" title="===请选择===">
																								${routeOperateHtml}     
																					</select>
																		   </div>
                                     <a href="javascript:;" class="delte_route_operate_default">
                                         <span class="label label-danger">Delete</span>
                                     </a>
                                      <a href="javascript:;" class="add_backup">
				<span class="label label-success">添加备份</span>
			</a>
			<div style="display:none;"  class="add_backup_box">
			
				<div class="form-group" style="display:inline-block">
			      <select  data-size="9" class="selectpicker option-search router_operate" data-live-search="true" title="===请选择===">
			        ${routeOperateHtml}
			      </select>
			   </div> 
				<a href="javascript:;" class="delete_backup">
					<span class="label label-danger">删除备份</span>
				</a>
				<span style="color:#72d0eb;display:inline-block;">备份比例</span>
				<div class="" style="width:20%;display:inline-block;">
        <input class="form-control percentage" type="text" value="" placeholder="例如:0.1">
               </div>
					
			
			</div>
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
			  //对默认路由此操作的option进行选定
			  // console.log(data.wildcard);
			  data.wildcard.map(function (value, key) {
				  /*对返回数据的类型进行判断*/
				  if(typeof (value)=="object"){
					  $('#route_operate .select_option_box').eq(key).find('.add_backup_box').css("display","inline-block");
					  $('#route_operate .select_option_box').eq(key).find('select.router_operate').eq(0).selectpicker('val', value.pool);               //默认路由配置
					  $('#route_operate .select_option_box').eq(key).find('select.router_operate').eq(1).selectpicker('val', value.shadows[0].target);  //默认路由配置
					  $('#route_operate .select_option_box').eq(key).find('input').val(value.shadows[0].key_fraction_range[1]);

				  }else if(typeof (value)=="string"){
					  $('#route_operate .select_option_box').eq(key).find('select.router_operate').eq(0).selectpicker('val', value);               //默认路由配置
				  }
			  });

			  // todo 对操作策略进行选定
			  routerPolicyKey = 0;
			  for (var key in data.policies) {     //这列是进行遍历有多少个操作策略

				  data.policies[key].map(function (value, key) {     //  操作策略的操作路由池
					  if(typeof (value)=="object"){
						  $(".add_strategy_box").eq(routerPolicyKey).find(".select_option_box").eq(key).find(".add_backup_box").css("display","inline-block");
						  $(".add_strategy_box").eq(routerPolicyKey).find(".select_option_box").eq(key).find("select.selectpicker").eq(0).selectpicker('val', value.pool);
						  $(".add_strategy_box").eq(routerPolicyKey).find(".select_option_box").eq(key).find("select.selectpicker").eq(1).selectpicker('val', value.shadows[0].target);
						  $(".add_strategy_box").eq(routerPolicyKey).find(".select_option_box").eq(key).find("input").val(value.shadows[0].key_fraction_range[1]);
					  }else if(typeof (value)=="string"){
						  $(".add_strategy_box").eq(routerPolicyKey).find(".select_option_box").eq(key).find("select.selectpicker").eq(0).selectpicker('val', value);
					  }

				  });
				  routerPolicyKey++;
			  }
			  //操作路由选定结束
		  }else{
			  $('.tip-message').html(data.message);
			  $('#messageModal').modal('show');
			  setTimeout(function(){
				  $('#messageModal').modal('hide');
			  },1000);
		  }
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
		url: "./json/routerlist_genreal.json",               // 请求选择框中的所有选项option  变量：pageContext
		success: function (data) {
			if(data.status=="success"){
				if(data.message!=""){
					selectlist = data.message;   //  todo  展示所有的option 选择
				}
			}else{
				$('.tip-message').html(data.message);
				$('#messageModal').modal('show');
				setTimeout(function(){
					$('#messageModal').modal('hide');
				},1000);
			}
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
$('body').on('click', ".add_backup", function () {
	//$('.add_backup>span').removeClass("label-success").addClass("label-primary");
	$(this).next().css("display", "inline-block");
});
//表单的删除的备份事件
$("body").on('click', ".delete_backup", function () {

	$(this).parent().css("display", "none");
});
//删除默认路由配置
$('body').on("click", ".delte_route_operate_default", function () {
	$(this).parent().parent().remove();
});
// 添加路由前缀名称的一条数据
$("body").on("click", ".add_server_btn", function () {
	var  add_num=$(this).parent().parent().prev().find(".select_option_box").length;

	var add_server_html = `<tr class="router_policy_selcte select_option_box">
    <td style="padding-left:0;">
      <div class="form-group" style="display:inline-block">
		      <select key=${add_num} data-size="9" class="selectpicker option-search" data-live-search="true" title="===请选择===">
		        ${routeOperateHtml}
		      </select>
		    </div>
      <a href="javascript:;" class="delte_route_operate_default">
          <span class="label label-danger">Delete</span>
      </a>
      <a href="javascript:;" class="add_backup">
				<span class="label label-success">添加备份</span>
			</a>
			<div style="display:none;"  class="add_backup_box">
			
				<div class="form-group" style="display:inline-block">
			      <select  data-size="9" class="selectpicker option-search router_operate" data-live-search="true" title="===请选择===">
			        ${routeOperateHtml}
			      </select>
			   </div> 
				<a href="javascript:;" class="delete_backup">
					<span class="label label-danger">删除备份</span>
				</a>
				<span style="color:#72d0eb;display:inline-block;">备份比例</span>
				<div class="" style="width:20%;display:inline-block;">
        <input class="form-control percentage" type="text" value="" placeholder="例如:0.1">
               </div>
					
			
			</div>
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
                                 <tr class="router_policy_selcte select_option_box">
                                   <td style="padding-left:0;">
                                      <div class="form-group" style="display:inline-block">
																		      <select key="0" data-size="9" class="selectpicker option-search" data-live-search="true" title="===请选择===">
																		        ${routeOperateHtml}
																		      </select>
																		    </div>
                                     <a href="javascript:;" class="delte_route_operate_default">
                                         <span class="label label-danger">Delete</span>
                                     </a>
                                     <a href="javascript:;" class="add_backup">
				<span class="label label-success">添加备份</span>
			</a>
			<div style="display:none;"  class="add_backup_box">
			
				<div class="form-group" style="display:inline-block">
			      <select  data-size="9" class="selectpicker option-search router_operate" data-live-search="true" title="===请选择===">
			        ${routeOperateHtml}
			      </select>
			   </div> 
				<a href="javascript:;" class="delete_backup">
					<span class="label label-danger">删除备份</span>
				</a>
				<span style="color:#72d0eb;display:inline-block;">备份比例</span>
				<div class="" style="width:20%;display:inline-block;">
        <input class="form-control percentage" type="text" value="" placeholder="例如:0.1">
               </div>
					
			
			</div>
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
	route_prefix_title = "";
	router_selected = [];                // select中的选择项
	route_prefix_title = $("#route_prefix_title").val();              // todo 路由前缀的名称
	/* router_selected_did 提交的路由操作的内容*/
	router_selected_did = [];
	$('#route_operate tr').map(function (key, value) {        //todo  获取路由操作中的值
		if($(value).find("select").eq(1).val()!=""&&$(value).find("select").eq(0).val()!=""){
			router_selected_did.push({
				"type": "PoolRoute",
				"pool":  "PoolRoute|"+$(value).find("select").eq(0).val(),
				"shadows": [{
					"target": "PoolRoute|"+$(value).find("select").eq(1).val(),
					"key_fraction_range": [0, $(value).find(".percentage").val()]
				}]
			});
		}else if($(value).find("select").eq(0).val()!=""){
			router_selected_did.push("PoolRoute|"+$(value).find("select").eq(0).val());
		}
	});
	// todo 操作策略参数
	var policyArr = [];
	$(".add_strategy_box").map(function (key, value) {      //对操作策略进行循环便利
		Routepool_did = [];
		Routepool = [];
		pass=true;  //百分比是否可以通过进行提交
		$(value).find(".router_policy_selcte").map(function (key, value) {
			if($(value).find('select').eq(1).val()!=""&&$(value).find('select').eq(0).val()!=""){
				if($(value).find(".percentage").val()==""){
					$('.tip-message').html("请填写本分比例");
					$('#messageModal').modal('show');
					pass=false;
				}else{
					Routepool_did.push({
						"type": "PoolRoute",
						"pool":  "PoolRoute|"+$(value).find('select').eq(0).val(),
						"shadows": [{
							"target": "PoolRoute|"+$(value).find('select').eq(1).val(),
							"index_range": [0, 2],
							"key_fraction_range": [0, $(value).find(".percentage").val()]
						}]
					});
				}
			}else if($(value).find('select').eq(0).val()!=""){
				Routepool_did.push("PoolRoute|"+$(value).find('select').eq(0).val());
			}
		});
		policyArr.push(
			{
				"Routealiases": $(value).find(".pre_router_name").val(),
				"Routepool": Routepool_did
			}
		);
	});

	if (router_selected_did.length==0 || route_prefix_title == "") {
		if (route_prefix_title == "") {

			$('.tip-message').html("请输入路由前缀名称");
			$('#messageModal').modal('show');
			return;
		} else if (router_selected_did.length==0) {

			$('.tip-message').html("请选择默认路由配置");
			$('#messageModal').modal('show');

		}
	} else if(pass){
		policyArr.map(function (value, key) {               //对操作的策略进行判断是否为空

			if (value.Routealiases == "" && value.Routepool.length != 0) {
				$('.tip-message').html("前缀名称和路由操作必须都进行填写或两者都不填");
				$('#messageModal').modal('show');
			} else if (value.Routealiases != "" && value.Routepool.length == 0) {
				$('.tip-message').html("前缀名称和路由操作必须都进行填写或两者都不填");
				$('#messageModal').modal('show');
			}
		});
		if (policyArr.length == 0) {
			// console.log("操作策略填写内容为空");
		}
		if (router_selected_did.length == 0) {
			$('.tip-message').html("默认路由配置的路由操作请添加");
			$('#messageModal').modal('show');
		}
		var dataobj={};
		policyArr.map(function(value,index){
			if(value.Routealiases!=""&&value.Routepool.length!=0){
				dataobj[value.Routealiases]=value.Routepool;
			}
		});
		if(JSON.stringify(dataobj)=="{}"){
			var datas = {
				"aliases": route_prefix_title,
				"wildcard":JSON.stringify(router_selected_did),
			};
		}else{
			var datas = {
				"aliases": route_prefix_title,
				"wildcard":JSON.stringify(router_selected_did),
				"policies": JSON.stringify(dataobj)
			};
		}
		console.log(datas);
		$.ajax({
			type: "post",
			dataType: "json", //服务端接收的数据类型
			url: "./json/copy.json",               // 提交地址 变量：pageContext
			data: datas,
			success: function (data) {
				if(data.status=="success"){
					if(data.message!=""){
						$('.tip-message').html("保存成功");
						$('#messageModal').modal('show');
						setTimeout(function(){
							$('#messageModal').modal('hide');
							location.reload()
						},1000);
					}
				}else{
					$('.tip-message').html(data.message);
					$('#messageModal').modal('show');
					setTimeout(function(){
						$('#messageModal').modal('hide');
					},1000);
				}
			},
			error: function () {
				$('.tip-message').html("服务器异常");
				$('#messageModal').modal('show');
				setTimeout(function(){
					$('#messageModal').modal('hide');
				},1000);
			}
		});
	}
});
/*对于重复option事情的处理*/
$(function () {
	$('body').on('shown.bs.select', '.selectpicker', function (e) {
		$('.selectpicker').selectpicker('refresh');
		var _this = this;
		var arr_select = [];
		var selectIndex = $(this).attr("key");
		var tr_length=$(this).parent().parent().parent().parent().find("tr");
		// console.log(selectIndex);

		tr_length.map(function (key, value) {
			if (key != selectIndex) {
				if($(value).find('.filter-option').html()!="===请选择==="){
					var arr_optioned=$(value).find('.filter-option').html();
				}else{
					var arr_optioned="pool";
				}
				arr_select.push(arr_optioned);
			}
		});
		// console.log(arr_select);
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













