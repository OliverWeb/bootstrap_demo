var pageContext = document.location.pathname.substr(0, document.location.pathname.substr(1).indexOf("/") + 1);   //获取的根路径操作
$(function(){
	$('.node-sub').show();
});
//获取地址栏中的参数,获得传递的参数
function GetQueryString(name) {
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null)return  unescape(r[2]); return null;
}
$(function () {
	var username=GetQueryString("username");
	// console.log(username);
	/*进入页面radio*/
	$.ajax({
		type:"post",
		url:"./json/index.json",                  //首次进入的请求地址  pageContext
		success:function (data) {
			if(data.status=="success"){
				console.log(data.message);
				if(data.message!=""){
					$("."+data.message).attr("checked","checked");
				}
			}else{
				$('.tip-message').html(data.message);
				$('#messageModal').modal('show');
				setTimeout(function(){
					$('#messageModal').modal('hide');
				},1000);
			}
		},error:function () {
			$('.tip-message').html("服务器异常");
			$('#messageModal').modal('show');

		}
	});
});

/*单选框*/
$(":radio").click(function(){
	var datas=$(this).data("type");
	$.ajax({
		type:"post",
		url:"./json/copy.json",                    //提交的地址   pageContext
		data:"name="+datas,
		success:function (data) {
			if(data.status=="success"){
				$('.tip-message').html("设置成功");
				$('#messageModal').modal('show');
				setTimeout(function(){
					$('#messageModal').modal('hide');
					location.reload();
				},1000);
			}else{
				$('.tip-message').html(data.message);
				$('#messageModal').modal('show');
				setTimeout(function(){
					$('#messageModal').modal('hide');
					location.reload();
				},1000);
			}
		},error:function(){

		}
	})
});