<%@ page language="java" contentType="text/html; charset=utf-8"
pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>gatewayip</title>
	<link rel="stylesheet" type="text/css"
				href="${pageContext.request.contextPath}/jquery-easyui-1.5/themes/insdep/easyui.css">
	<link rel="stylesheet" type="text/css"
				href="${pageContext.request.contextPath}/jquery-easyui-1.5/themes/insdep/easyui_plus.css">
	<link rel="stylesheet" type="text/css"
				href="${pageContext.request.contextPath}/jquery-easyui-1.5/themes/insdep/insdep_theme_default.css">
	<link rel="stylesheet" type="text/css"
				href="${pageContext.request.contextPath}/jquery-easyui-1.5/themes/insdep/icon.css">
	<link rel="stylesheet" type="text/css"
				href="${pageContext.request.contextPath}/jquery-easyui-1.5/demo/demo.css">
	<link rel="stylesheet" type="text/css"
				href="${pageContext.request.contextPath}/css/xcConfirm.css">
	<script type="text/javascript"
					src="${pageContext.request.contextPath}/jquery-easyui-1.5/jquery-1.9.1.min.js"></script>
	<script type="text/javascript"
					src="${pageContext.request.contextPath}/jquery-easyui-1.5/jquery.easyui.min.js"></script>
	<script type="text/javascript"
					src="${pageContext.request.contextPath}/jquery-easyui-1.5/constant.js"></script>
	<script type="text/javascript"
					src="${pageContext.request.contextPath}/js/gateway-config.js"></script>
	<script type="text/javascript"
					src="${pageContext.request.contextPath}/js/xcConfirm.js"></script>
	<script type="text/javascript"
					src="${pageContext.request.contextPath}/jquery-easyui-1.5/themes/insdep/jquery.insdep-extend.min.js"></script>
	<style>
		html, body {
			margin: 0;
			padding: 0
		}
	</style>
</head>
<body>
<div style="width: 100%; text-align: center;">
	<div style="text-align:center;white-space: nowrap;"><b><font color="red" size="5px">[公网网关集群地址]</font></b></div>
</div>
<div style="text-align:left;white-space: nowrap;">
	<a style="color: blue; text-decoration:none;font-size: 15px;" href="javascript:void(0)" id="updateing"
		 onclick="window.parent.Open('公网网关节点配置待审核','gatewayipcheck.jsp')"></a>
	<span style="display:none;float:center;margin-left:350px" class="cue"></span>
</div>
</br>
<div id="tb">
	<a style="text-align:right;" href="javascript:void(0)" class="easyui-linkbutton"
		 iconcls="icon-reload" plain="true"
		 onclick="javascript:window.location.reload()"><font size="2px">刷新</font></a>
	<a href="javascript:void(0)" class="easyui-linkbutton"
		 iconcls="icon-back" plain="true"
		 onclick="javascript:window.history.back();">回退</a>
	<div style="float: right;">
		<input id="ss" class="easyui-searchbox"
					 searcher="doIpSearch" prompt="请输入搜索内容"
					 style="width: 300px; vertical-align: middle;"></input>
	</div>
</div>
<table id="ipdg"></table>
</body>
</html>
<script type="text/javascript">
	$(function () {
		var hasbeta = false;
		window.parent.refreshgatewayip();
		$.ajax({
			type: "GET",
			url: "../etcd/list?prefix=/gateway/front/services/api/nodes",
			contentType: "application/json",
			dataType: "json",
			async: false,
			success: function (result) {
				hasbeta = initip(result);
			}
		});
		var confignum = 0;
		var beforestatus;
		var beforeweight;
		var beforebeta;
		var beforeconnections = "";
		var beforefails = "";
		$("#updateing").text("待更新未审核(" + window.parent.gatewayipupdatelist.length + ")");
		$("body").on("click", "a", function () {
			if ($(this).attr("class") == "ipconfig") {
				if (confignum > 0) {
					var txt = "请先提交前面的更改！";
					window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
					return;
				}

				if ($(this).parent().parent().parent().children().eq(2).children().html() == "正常") {
					beforestatus = 0;
				}
				else {
					beforestatus = 1;
				}

				if ($(this).parent().parent().parent().children().eq(4).children().html() == "否") {
					beforebeta = 0;
				}
				else {
					beforebeta = 1;
				}

				beforeweight = $(this).parent().parent().parent().children().eq(3).children().html();
				if ($(this).parent().parent().parent().children().eq(5).children().html() != "") {
					beforeconnections = $(this).parent().parent().parent().children().eq(5).children().html();
				}
				if ($(this).parent().parent().parent().children().eq(6).children().html() != "") {
					beforefails = $(this).parent().parent().parent().children().eq(6).children().html();
				}

				var ip = $(this).parent().parent().parent().children().eq(0).children().html();
				$(this).parent().parent().parent().children().eq(2).children().html("<select  class='status'><option value='0'>正常</option><option value='1'>下线</option></select>");
				$(this).parent().parent().parent().children().eq(3).children().html("<input type=\"text\"value=\"\" style=\"text-align:center;width:50px;\" class=\"weight\" onkeyup=\"this.value=this.value.replace(/[^\\d]/g,'')\" onafterpaste=\"this.value=this.value.replace(/[^\\d]/g,'')\" onblur =\"this.value=this.value.replace(/[^\\d]/g,'');hide()\" onfocus=\"show(this)\"></input>");
				$(this).parent().parent().parent().children().eq(5).children().html("<input type=\"text\"value=\"\" style=\"text-align:center;width:50px;\" class=\"connections\" onkeyup=\"this.value=this.value.replace(/[^\\d]/g,'')\" onafterpaste=\"this.value=this.value.replace(/[^\\d]/g,'')\" onblur =\"this.value=this.value.replace(/[^\\d]/g,'');hide()\" onfocus=\"show(this)\"></input>");
				$(this).parent().parent().parent().children().eq(6).children().html("<input type=\"text\"value=\"\" style=\"text-align:center;width:50px;\" class=\"fails\" onkeyup=\"this.value=this.value.replace(/[^\\d]/g,'')\" onafterpaste=\"this.value=this.value.replace(/[^\\d]/g,'')\" onblur =\"this.value=this.value.replace(/[^\\d]/g,'');hide()\" onfocus=\"show(this)\"></input>");
				$(this).parent().parent().parent().children().eq(4).children().html("<select  class='beta'><option value='0'>否</option><option value='1'>是</option></select>");
				$(this).parent().parent().parent().children().eq(8).children().html("<a href='javascript:void(0);' class='update'><span class='l-btn-left l-btn-icon-left'><span class='l-btn-text'><font size='3px'>提交</font><span class='l-btn-icon icon-ok'>&nbsp;</span></span></a>");
				$("select[class=status]").val(beforestatus);
				$("select[class=beta]").val(beforebeta);
				$("input[class=weight]").val(beforeweight);
				$("input[class=connections]").val(beforeconnections);
				$("input[class=fails]").val(beforefails);

				confignum = confignum + 1;
			}
		});
		$("body").on("click", "a", function () {
			if ($(this).attr("class") == "update") {
				var host = $(this).parent().parent().parent().children().eq(0).children().html();
				var port = $(this).parent().parent().parent().children().eq(1).children().html();
				var status = $("select[class=status]").val();
				var weight = $("input[class=weight]").val();
				var beta = $("select[class=beta]").val();
				var connections = $("input[class=connections]").val();
				var fails = $("input[class=fails]").val();
				if (weight == 0 || weight == "") {
					weight = 8;
				}
				if (weight > 16) {
					weight = 16;
				}
				if (beta == 1 && beforebeta != 1) {
					if (hasbeta) {
						var txt = "已有beta节点！";
						window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
						return false;
					}
					if (window.parent.hascheckbeta) {
						var txt = "已有待审核beta节点！";
						window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
						return false;
					}
				}
				if (weight != beforeweight || status != beforestatus || beta != beforebeta || connections != beforeconnections || fails != beforefails) {
					var data = {
						ip: host,
						port: port,
						beforeStatus: beforestatus,
						beforeWeight: beforeweight,
						beforeBeta: beforebeta,
						beforeConnections: beforeconnections,
						beforeFails: beforefails,
						status: status,
						weight: weight,
						beta: beta,
						connections: connections,
						fails: fails,
						createtime: getMyDate(new Date())
					};
					$.ajax({
						type: "POST",
						url: "../gatewayipcheck/insert/",
						contentType: "application/json",
						dataType: "json",
						data: JSON.stringify(data),
						success: function (jsonResult) {
						}
					});
					if (beta == 1 && beforebeta != 1) {
						window.parent.hascheckbeta = true;
					}
				}
				window.location.reload();
			}
		});
	});

	function show(obj) {
		if ($(obj).attr("class") == "weight") {
			$(".cue").html('<font size="3px" color="red">0或不填默认设为8，最大为16</font>');
		}
		else {
			$(".cue").html('<font size="3px" color="red">可不填，暂时无效</font>');
		}
		$(".cue").show();
	}

	function hide() {
		$(".cue").hide();
	}
</script>