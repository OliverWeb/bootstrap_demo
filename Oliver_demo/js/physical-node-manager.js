//物理节点管理
/*页面初次加载的时候的*/
var timerlog;
/*验证ip start*/
function isValidIP(ip) {
	var reg =  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
	return reg.test(ip);
}
function valieIP(){
	var ip = $('#ip1').val();
	if(isValidIP(ip)){
		console.log("有效");
	}else{
		$('.tip-message').html("请输入正确ip地址");
		$('#messageModal').modal('show');
		setTimeout(function(){
			$('#messageModal').modal('hide');
		},1000);
	}
};
/*验证ip start*/
$(function(){
	$(document).on("show.bs.modal", "#add_server_modal", function(){

		$(this).css("overflow-y", "scroll");
		// 防止出现滚动条，出现的话，你会把滚动条一起拖着走的
	});
	$("body").on("click",".sk_item_pic",function(){
		$('.tip-message').html("暂未开放");
		$('#messageModal').modal('show');
		setTimeout(function(){
			$('#messageModal').modal('hide');
		},1000);
	});
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
/*log打印日志的方法*/
function  getLog(ip){
	$.ajax({
		post:"get",
		url:"./json/log.json",                            //  '${pageContext.request.contextPath}/config/getInitLogs?ip=' + ip,
		data:"ip="+ip,
		success:function(data){
			if(data.status=="success"){
				if(data.message!=""){
					var result=data.message;
					var len = (result).length;
					if (len > 0) {
						for (var i = 0; i < len; i++) {
							$("#information").append(result[i] + "<br/>");
							$('#information').scrollTop($('#information')[0].scrollHeight);
							if (result[i].indexOf("@end") != -1) {
								clearInterval(timerlog);
								$('.tip-message').html("操作成功");
								$('#messageModal').modal('show');
								setTimeout(function(){
									$('#messageModal').modal('hide');
								},2000);
								$(".logclose").click(function () {   //点击关闭的时候进行的停止请求
									$('#logModal').modal('hide');
									$("#information").empty();
									location.reload();
								})
							}
						}
					}
				}
			}else{
				$('.tip-message').html(data.message);
				$('#messageModal').modal('show');
			}
		},
		error:function(data){

		}
	});
}
//保存服务事件
$('.add_servers_save').click(function(){
	if($("#ip1").val()==""||$("#ip2").val()==""||$("#ip3").val()==""||$("#ip4").val()==""){
		$('.tip-message').html("请将内容填写完整!!!");
		$('#messageModal').modal('show');
		setTimeout(function(){
			$('#messageModal').modal('hide');
		},1000);
		return;
	}
	var b = new Base64();
	var pwd=$("#ip3").val();
	var rootpwd=$("#ip4").val();
	if (pwd.length > 0) {
		$("#ip3").val(b.encode(pwd));
	}
	if (rootpwd.length > 0) {
		$("#ip4").val(b.encode(rootpwd));
	}
	var datas=$("form").serialize();
	data_ip=$('#ip1').val();
	console.log(datas);
	$.ajax({
		type: "get",
		url: "./json/logip.json",      // 保存的提交的链接的地址   save  ,submit, "${pageContext.request.contextPath}/config/node/addNewServer"
		data:datas,
		success:function (data) {
			if(data.status=="success"){
				if(data.message!=""){
					$('#add_server_modal').modal('hide');
					/*打印日志*/
					$('#logModal').modal('show');
					$('#logModal').unbind("click"); //移除click
					timerlog=setInterval(function(){
						getLog(data.message);
					},1000);
					//点击关闭的时候进行的停止请求
					$(".logclose").click(function () {
						$('#logModal').modal('hide');
						clearInterval(timerlog);
						$("#information").empty();
					});
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
			$('.tip-message').html("服务器异常");
			$('#messageModal').modal('show');
			setTimeout(function(){
				$('#messageModal').modal('hide');
				// location.reload();
			},1000);
		}
	});
});

/*添加服务器*/

