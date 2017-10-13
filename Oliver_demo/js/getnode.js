$(function(){

	$("#add_servers").click(function(){
		$('#add_server_modal').modal('show');
	});
	$(".add_servers_save").click(function(){
		if(true){      //所填内容的判断
			$('.tip-message').html("请将内容填写完整!!!");
			$('#messageModal').modal('show');
			setTimeout(function(){
				$('#messageModal').modal('hide');
			},1000);
			return;
		};
		var datas=$("form").serialize();
		$.ajax({
			type:"get",
			url:"./json/mcrouter.json",               // 点击保存数据请求的地址   根路径pageContext
			success:function (data) {
				if(data.status=="success"){
					$('#add_mcrouter_modle').modal('hide');
					$('.tip-message').html("保存成功");
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