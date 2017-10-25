/*根路径 用于ajax请求地址的添加*/
var pageContext = document.location.pathname.substr(0,document.location.pathname.substr(1).indexOf("/")+1);   //获取的根路径操作
/// /登录表单提交的
var username = document.getElementById("username");
var usernameTip = document.getElementById("usernameTip");
//TODO 绑定获取焦点事件
username.onfocus = function(){
	//TODO 显示提示信息
	usernameTip.className = "col-md-5 show control-default";
	usernameTip.innerHTML = "请输入8至16位的英文或数字.";
}
//TODO 绑定失去焦点事件
username.onblur = function(){
	if(username.validity.valid){
		//TODO 表示输入正确
		usernameTip.className = "col-md-5 show control-success";
		usernameTip.innerHTML = "用户名输入正确";
	}else if(username.validity.valueMissing){
		//TODO 表示值为空
		usernameTip.className = "col-md-5 show control-error";
		usernameTip.innerHTML = "用户名不能为空";
	}else if(username.validity.patternMismatch){
		//TODO 表示正则不匹配
		usernameTip.className = "col-md-5 show control-error";
		usernameTip.innerHTML = "用户名输入不正确";
	}
//鼠标离开的时候进行判断
	if(username.validity.valid&&password.validity.valid){
		console.log(1);
		$('#node_login').addClass("node_login");
	}else{
		$('#node_login').removeClass("node_login");
	}
};
//TODO 密码的表单验证
var password = document.getElementById("password");
var passwordTip = document.getElementById("passwordTip");
password.onfocus = function(){
	//TODO 显示提示信息
	passwordTip.className = "col-md-5 show control-default";
	passwordTip.innerHTML = "请输入6至12位的数字.";
}
password.onblur = function(){
	if(password.validity.valid){
		passwordTip.className = "col-md-5 show control-success";
		passwordTip.innerHTML = "密码输入正确";
	}else if(password.validity.valueMissing){
		passwordTip.className = "col-md-5 show control-error";
		passwordTip.innerHTML = "密码不能为空";
	}else if(password.validity.patternMismatch){
		passwordTip.className = "col-md-5 show control-error";
		passwordTip.innerHTML = "密码输入不正确";
	}
	//鼠标离开进行判断
	if(username.validity.valid&&password.validity.valid){
		$('#node_login').addClass("node_login");
	}else{
		$('#node_login').removeClass("node_login");
	}
};
//ajax提交代码
$('body').on('click','.node_login',function () {
	/*进行base加密转化处理*/
	  var b = new Base64();
	$('#password').val(b.encode($('#password').val()));
		var username=$("#username").val();
		var password=$('#password').val();
		var data="username="+username+"&"+"username="+password;
		console.log(data);
		//点击跳转后的页面
		$.ajax({
			url:"./json/router.json",             //pageContext这个一个根路径的变量,记得进行拼接
			type:"post",
			data:data,
			success: function (data) {
				if(data.message!=""){}
				setCookie("username",$("#username").val(),24);
				setCookie("password",$("#password").val(),24);
				window.location.href="index.html";
			},
			error: function () {
				console.log("登录提交异常");
			}
		});
});
/*这里进行设置cookie*/
function setCookie(name,value,hours){
	var name = encodeURIComponent(name);
	var value = encodeURIComponent(value);
	var expires = new Date();
	expires.setTime(expires.getTime() + hours*3600000);
	_expires = (typeof hours) == "string" ? "" : ";expires=" + expires.toUTCString();
	document.cookie = name + "=" + value + _expires;
}

// todo 动画开始
var count_particles, stats, update;
stats = new Stats;
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);
count_particles = document.querySelector('.js-count-particles');
update = function() {
	stats.begin();
	stats.end();
	if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
		count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
	}
	requestAnimationFrame(update);
};
requestAnimationFrame(update);
//表单动画结束


