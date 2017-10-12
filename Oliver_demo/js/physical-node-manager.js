//物理节点管理
/*页面初次加载的时候的*/
$(function(){
	$.ajax({
		type: "get",
		url: "./json/physical.json",                  // 保存的提交的链接的地址
		success:function (data) {
				if(data.status=="success"){
					if(data.message!=""){
						data.message.map(function(value,key){
							var server_li_html=` <li>
                  <div class="sk_item_pic">
                    <a href="#" class="sk_item_pic_lk">
                      <img src="img/ip.png" title="" class="sk_item_img">
                      <p class="sk_item_name">${value}</p>
                    </a>
                  </div>
                </li>`;
							$('.server_list').append(server_li_html);
						});
					}
				}
		},error:function(){
			$('.tip-message').html("服务器请求异常!");
			$('#messageModal').modal('show');
			setTimeout(function(){
				$('#messageModal').modal('hide');
			},1000);
	}
	});
});
// 增加服务事件
$('#add_servers').click(function(){
	$('#add_server_modal').modal('show');
	$("input").val("");
});
//保存服务事件
var ip1 = document.getElementById("ip1");
var	ip2 = document.getElementById("ip2");
var ip3 = document.getElementById("ip3");
var ip4 = document.getElementById("ip4");
/*进行验证start*/

/*进行验证end*/
$('.add_servers_save').click(function(){
	if($("#ip1").val()==""||$("#ip2").val()==""||$("#ip3").val()==""||$("#ip4").val()==""){
		$('.tip-message').html("请将内容填写完整!!!");
		$('#messageModal').modal('show');
		setTimeout(function(){
			$('#messageModal').modal('hide');
		},1000);
		return;
	}
	var datas=$("form").serialize();
	// console.log(datas);
	data_ip=$('#ip1').val();
	console.log(datas);
	$.ajax({
		type: "get",
		url: "./json/router.json",                  // 保存的提交的链接的地址
		data:datas,
		success:function (data) {
			if(data.status=="success"){
				if(data.message!=""){
					var server_li_html=` <li>
                  <div class="sk_item_pic">
                    <a href="#" class="sk_item_pic_lk">
                      <img src="img/ip.png" title="" class="sk_item_img">
                      <p class="sk_item_name">${data_ip}</p>
                    </a>
                  </div>
                </li>`;
					$('.server_list').append(server_li_html);
				}
			}else{
				$('.tip-message').html(data.message);
				$('#messageModal').modal('show');
				setTimeout(function(){
					$('#messageModal').modal('hide');
				},1000);
			}

		},
		error:function () {
			$('.tip-message').html("提交地址保存异常");
			$('#messageModal').modal('show');
			setTimeout(function(){
				$('#messageModal').modal('hide');
				location.reload();
			},1000);
		}
	});
	$('#add_server_modal').modal('hide');
	$('.tip-message').html("保存成功");
	$('#messageModal').modal('show');
	setTimeout(function(){
		$('#messageModal').modal('hide');
		location.reload();
	},1000);
});


/*添加服务器*/

