$(function () {
	server_li_html=[];
	$.ajax({
		type: "get",
		url: "./json/add_ip.json",
		success:function (data) {
			console.log(data);
			data.map(function (value,key) {
				server_li_html=server_li_html+` <li>
                  <div class="sk_item_pic">
                    <a href="#" class="sk_item_pic_lk">
                      <img src="img/ip.png" title="" class="sk_item_img">
                      <p class="sk_item_name">${value}</p>
                    </a>
                  </div>
                </li>`;
			});
			$('.server_list').append(server_li_html);
		},
		error:function () {
			console.log("提交地址保存异常");
		}
	});
});
/*点击事件进行跳转*/
$('body').on('click','.server_list li',function(){
	var mcrouerIp=$(this).find('.sk_item_name').html();
	window.location.href="mcrouter.html?mcrouerIps="+mcrouerIp;

});