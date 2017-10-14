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
            src="${pageContext.request.contextPath}/js/md5.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/js/base64.js"></script>
</head>
<body>
<div id="information" class="easyui-dialog" data-options="iconCls:'icon-save'"
     style="width: 90%; height: 800px; padding: 5px 5px;left:7%;top:60px; overflow:show; background:#000; color:#25fff7"
     closed="true">
</div>
<div id="add"
     class="easyui-dialog"
     style="width: 300px; height: auto; padding: 5px 5px;left:20%;top:100px" closed="true">
    <form id="node_config">
        <table width="100%">
            <tr>
                <td>IP</td>
                <td><input name="ip" class="easyui-textbox" style="width:160px;height:27px" required="true"/></td>
            </tr>
            <tr>
                <td>安装用户非root（会安装在此用户路径下）：</td>
                <td><input name="user" class="easyui-textbox" style="width:160px;height:27px" required="true"/></td>
            </tr>
            <tr>
                <td>安装用户密码：</td>
                <td><input id="pwd" name="pwd" class="easyui-textbox" style="width:160px;height:27px" type='password'
                           required="true"/></td>
            </tr>
            <tr>
                <td>root权限密码：</td>
                <td><input id="rootpwd" name="rootpwd" class="easyui-textbox" style="width:160px;height:27px"
                           type='password' required="true"/></td>
            </tr>
            <tr>
                <td colspan="2" align="center"><a href="javascript:;" onclick="save()" class="easyui-linkbutton"
                                                  iconCls="icon-ok" style="width: 50%; height: 32px"></a></td>
            </tr>
        </table>
    </form>
</div>
</body>

<script type="text/javascript">
    $.get("${pageContext.request.contextPath}/config/getMemcachedNodeList", function (data) {
        var server = jQuery.parseJSON(data.message);
        for (var i in server) {
            $("body").append("<a   href=\"javascript:;\" class=\"easyui-linkbutton\" data-options=\"iconCls:'icon-computer',size:'large',iconAlign:'top'\" style=\"width: 141px; height: 77px\" onclick=\"go('" + server[i] + "')\">" + server[i] + "</a><br/><br/>");
        }
        //重新渲染页面，使动态新增的元素生效
        $.parser.parse();
    });

    function go(ip) {
        setCookie("ip", ip, 9999);
        location.href = '${pageContext.request.contextPath}/jsp/memcached_node_config.jsp'
    }

    function setCookie(name, value, iDay) {
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + iDay);
        document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + oDate;
    }

</script>
</html>