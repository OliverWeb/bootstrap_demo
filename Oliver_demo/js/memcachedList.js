$(function () {
	server_li_html=[];
	$.ajax({
		type: "get",
		url: "./json/iplist.json",
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
			$('.tip-message').html("服务器异常");
			$('#messageModal').modal('show');
			setTimeout(function(){
				$('#messageModal').modal('hide');
				location.reload();
			},1000);
		}
	});
});
/*点击事件进行跳转*/
$('body').on('click','.server_list li',function(){
	var mcrouerIp=$(this).find('.sk_item_name').html();
	window.location.href="memcached.html?ip="+mcrouerIp;

});