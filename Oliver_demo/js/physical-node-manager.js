//物理节点管理
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
ip1.onblur=function(){
	if(ip1.validity.valid&&ip2.validity.valid&&ip3.validity.valid&&ip4.validity.valid){
		console.log("验证成功");
	}
};
/*进行验证end*/

$('.add_servers_save').click(function(){
	var datas=$("form").serialize();
	// console.log(datas);
	data_ip=$('#ip1').val();
	console.log(data_ip);
	$.ajax({
		type: "get",
		url: "./json/router.json",
		data:datas,
		success:function (data) {
			var server_li_html=` <li>
                  <div class="sk_item_pic">
                    <a href="#" class="sk_item_pic_lk">
                      <img src="img/ip.png" title="" class="sk_item_img">
                      <p class="sk_item_name">${data_ip}</p>
                    </a>
                  </div>
                </li>`;
			$('.server_list').append(server_li_html);
		},
		error:function () {
			console.log("提交地址保存异常");
		}
	});
});


/*添加服务器*/

