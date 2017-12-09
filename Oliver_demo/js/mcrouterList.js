var pageContext = document.location.pathname.substr(0, document.location.pathname.substr(1).indexOf("/") + 1);   //获取的根路径操作
$(function () {
	server_li_html=[];
	$.ajax({
		type: "get",
		url: "./json/iplist.json",                              //页面处理加载时候的页面  ${pageContext.request.contextPath}/config/getMcrouterNodeList
		success:function (data) {
			if(data.status=="success"){
				if(data.message!=""){
					data.message.sort().map(function (value,key) {
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
				}
			}else{
				$('.tip-message').html(data.message);
				$('#messageModal').modal('show');
			}


		},
		error:function () {
			$('#messageModal').modal('服务器异常');
			setTimeout(function(){
				$('#messageModal').modal('hide');
			},1000);
		}
	});
});
/*点击事件进行跳转*/
$('body').on('click','.server_list li',function(){
	var mcrouerIp=$(this).find('.sk_item_name').html();
	window.location.href="mcrouter.html?ip="+mcrouerIp;

});