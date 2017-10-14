<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Insert title here</title>
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
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/jquery-easyui-1.5/jquery-1.9.1.min.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/jquery-easyui-1.5/jquery.easyui.min.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/jquery-easyui-1.5/themes/insdep/jquery.insdep-extend.min.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/js/base64.js"></script>
</head>
<body>

</body>

<script type="text/javascript">


    $.get("${pageContext.request.contextPath}/config/getMcrouterNodeList", function (data) {
        var server = jQuery.parseJSON(data.message);
        for (var i in server) {
            $("body").append("<a   href=\"javascript:;\" class=\"easyui-linkbutton\" data-options=\"iconCls:'icon-computer',size:'large',iconAlign:'top'\" style=\"width: 141px; height: 77px\" onclick=\"go('" + server[i] + "')\">" + server[i] + "</a><br/><br/>");
        }
        //重新渲染页面，使动态新增的元素生效
        $.parser.parse();
    });

    function go(ip) {
        setCookie("ip", ip, 9999);
        location.href = '${pageContext.request.contextPath}/jsp/mcrouter_node_config.jsp'
    }

    function setCookie(name, value, iDay) {
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + iDay);
        document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + oDate;
    }

</script>
</html>