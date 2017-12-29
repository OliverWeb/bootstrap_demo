var pageContext = document.location.pathname.substr(0, document.location.pathname.substr(1).indexOf("/") + 1);   //获取的根路径操作
function textExp(val,reg){
	return reg.test(val);
}
$(function(){
	// $('body').on('shown.bs.select', '.selectpicker', function (e) {
	// 	$('.bs-searchbox input').attr("placeholder","请输入搜索内容...");
	// });
		/*对host和 port 进行处理*/
	var hostList="";
	// $.ajax({
	// 	post:"get",
	// 	url:"./json/host.json",          //"../config/getMcrouterNodeList"
	// 	success:function(data){
	// 		if(data.status=="success"){
	// 			if(data.message!=""){
	// 				var datas=data.message;
	// 				datas.map(function(value,key){
	// 					return hostList = hostList + `<option value=${value} key=${key}>${value}</option>`;
	// 				});
	// 				// var hostHTMl=`<div class="form-group" style="display:inline-block;margin-bottom: 0">
   //         //                <select  data-size="9" class="selectpicker option-search hostList" data-live-search="true" title="===请选择===">
   //         //                	${hostList}
   //         //                </select>
   //         //              </div>`;
	// 				// $('.hostbox').empty();
	// 				// $('.hostbox').append(hostHTMl);
	// 				$('.selectpicker').selectpicker('refresh');
	// 				/*进行处理host选择框*/
	// 				$('body').on('hidden.bs.select', '.hostList', function (e) {
	// 					var portList="";
	// 					if($('.hostList').val()!=""){
	// 						var selectValue=$('.hostList').val();
	// 						$.ajax({
	// 							post:"get",
	// 							url:"./json/port.json",                    // ../config/node/getMcrouterNodes,
	// 							data:"mcrouter_ip="+selectValue,
	// 							success:function(data){
	// 								if(data.status="success"){
	// 									if(data.message!=""){
	// 										var datas=data.message;
	// 										datas.map(function(value,key){
	// 											return portList = portList + `<option value=${value.port} key=${key}>${value.port}</option>`;
	// 										});
	// 										var portHTMl=`<div class="form-group" style="display:inline-block;margin-bottom: 0">
   //                        <select  data-size="9" class="selectpicker option-search portList" data-live-search="true" title="===请选择===">
   //                        	${portList}
   //                        </select>
   //                      </div>`;
	// 										$('.portbox').empty();
	// 										$('.portbox').append(portHTMl);
	// 										$('.selectpicker').selectpicker('refresh');
	// 									}
	// 								}
	// 							},
	// 							error:function(data){
	// 								$('.tip-message').html("服务器异常");
	// 								$('#messageModal').modal('show');
	// 							}
	// 						});
	// 					}else{
	// 					}
	// 				});
	// 				}
	// 		}
	// 	},
	// 	error:function(data){
	// 		$('.tip-message').html("服务器异常");
	// 		$('#messageModal').modal('show');
	// 	}
	// });
	/*点击保存*/
	$(".add_servers_save").click(function(){
		// if($(".hostList").val()==""){
		// 	$('.tip-message').html("请选择Host");
		// 	$('#messageModal').modal('show');
		// 	setTimeout(function(){
		// 		$('#messageModal').modal('hide');
		// 	},1000);
		// 	return;
		// }
		// if($(".portList").val()==""){
		// 	$('.tip-message').html("请选择PORT");
		// 	$('#messageModal').modal('show');
		// 	setTimeout(function(){
		// 		$('#messageModal').modal('hide');
		// 	},1000);
		// 	return;
		// }
		if(!textExp($("#key").val(),/^([_0-9A-Za-z]+)$/)){      //所填内容的判断
			$('.tip-message').html("请输入正确的key");
			$('#messageModal').modal('show');
			setTimeout(function(){
				$('#messageModal').modal('hide');
			},1000);
			return;
		};
		/*提交的数据内容*/
		// var hostname=$(".hostList").val();
		// var port=$("select.portList").val();
		var key=$("#key").val();
		var targetData={
			"key":key
		}
		$.ajax({
			type:"get",
			url:"./json/getNode.json", // 点击保存进行提交数据请求的地址"${pageContext.request.contextPath}/config/node/getMcrouterValue?key="+val+"&hostname="+host+"&port="+port,
			data:targetData,
			success:function (data) {
				if(data.status=="success"){
					$('.getValue').html(data.message);
					$('#getValue').modal('show');
				}else{
					$('.tip-message').html(data.message);
					$('#messageModal').modal('show');
					setTimeout(function(){
						$('#messageModal').modal('hide');
						// location.reload();
					},1000);

				}
			},
			error:function(){

			}
		});




	});
	/*点击删除按钮*/
	$(".delte_servers_save").click(function(){
		/*提交的数据内容*/
		var hostname=$(".hostList").val();
		var port=$("select.portList").val();
		var key=$("#key").val();
		var targetData={
			"key":key
		};
		$.ajax({
			type:"get",
			url:"./json/getNode.json", // pageContext+"/config/node/getMcrouterValue"   删除地址
			data:targetData,
			success:function (data) {
				if(data.status=="success"){
					$('.tip-message').html("删除成功");
					$('#messageModal').modal('show');
				}else{
					$('.tip-message').html(data.message);
					$('#messageModal').modal('show');
				}
			},
			error:function(){
				$('.tip-message').html("服务器异常");
				$('#messageModal').modal('show');
			}
		});
	});
});