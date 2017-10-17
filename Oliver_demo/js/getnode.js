$(function(){
	$('body').on('shown.bs.select', '.selectpicker', function (e) {
		$('.bs-searchbox input').attr("placeholder","请输入搜索内容...");
	});
		/*对host和 port 进行处理*/
	var hostList="";
	$.ajax({
		post:"get",
		url:"./json/host.json",
		success:function(data){
			if(data.status=="success"){
				if(data.message!=""){
					var datas=data.message;
					console.log(datas);
					datas.map(function(value,key){
						return hostList = hostList + `<option value=${value} key=${key}>${value}</option>`;
					});
					var hostHTMl=`<div class="form-group" style="display:inline-block;margin-bottom: 0">
                          <select  data-size="9" class="selectpicker option-search hostList" data-live-search="true" title="===请选择===">
                          	${hostList}
                          </select>
                        </div>`;

					$('.hostbox').empty();
					$('.hostbox').append(hostHTMl);
					$('.selectpicker').selectpicker('refresh');
					/*进行处理host选择框*/
					$('body').on('hidden.bs.select', '.hostList', function (e) {
						var portList="";
						if($('.hostList').val()!=""){
							$.ajax({
								post:"get",
								url:"./json/port.json",
								success:function(data){
									if(data.status="success"){
										if(data.message!=""){
											var datas=data.message;
											datas.map(function(value,key){
												return portList = portList + `<option value=${value} key=${key}>${value}</option>`;
											});
											var portHTMl=`<div class="form-group" style="display:inline-block;margin-bottom: 0">
                          <select  data-size="9" class="selectpicker option-search portList" data-live-search="true" title="===请选择===">
                          	${portList}
                          </select>
                        </div>`;
											$('.portbox').empty();
											$('.portbox').append(portHTMl);
											$('.selectpicker').selectpicker('refresh');
										}
									}
								},
								error:function(data){

								}
							});
						}else{

						}
					});
					}
			}
		},
		error:function(data){

		}
	});
	/*点击保存*/
	$(".add_servers_save").click(function(){
		if($(".hostList").val()==""){
			$('.tip-message').html("请选择Host");
			$('#messageModal').modal('show');
			setTimeout(function(){
				$('#messageModal').modal('hide');
			},1000);
			return;
		}
		if($(".portList").val()==""){
			$('.tip-message').html("请选择PORT");
			$('#messageModal').modal('show');
			setTimeout(function(){
				$('#messageModal').modal('hide');
			},1000);
			return;
		}
		if($("#key").val()==""){      //所填内容的判断
			$('.tip-message').html("请输入key值");
			$('#messageModal').modal('show');
			setTimeout(function(){
				$('#messageModal').modal('hide');
			},1000);
			return;
		};
		/*提交的数据内容*/
		var hostname=$(".hostList").val();
		var port=$(".portList").val();
		var key=$("#key").val();
		var datas="key="+key+"&hostname="+hostname+"&port="+port;
		console.log(datas);
		$.ajax({
			type:"get",
			url:"./json/mcrouter.json",               // 点击保存进行提交数据请求的地址   根路径pageContext
			success:function (data) {
				if(data.status=="success"){
					$('#add_mcrouter_modle').modal('hide');
					$('.tip-message').html("设置成功");
					$('#messageModal').modal('show');
					setTimeout(function(){
						$('#messageModal').modal('hide');
						// location.reload();
					},1000);
				}else{
					$('#add_mcrouter_modle').modal('hide');
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

});