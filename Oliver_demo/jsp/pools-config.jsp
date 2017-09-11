<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>mcrouter-config</title>
    <link rel="stylesheet" type="text/css"
          href="${pageContext.request.contextPath}/jquery-easyui-1.5/themes/default/easyui.css">
    <link rel="stylesheet" type="text/css"
          href="${pageContext.request.contextPath}/jquery-easyui-1.5/themes/icon.css">
    <link rel="stylesheet" type="text/css"
          href="${pageContext.request.contextPath}/jquery-easyui-1.5/demo/demo.css">
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/jquery-easyui-1.5/jquery-1.9.1.min.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/jquery-easyui-1.5/jquery.easyui.min.js"></script>
</head>
<body>
    <div style="width: 80%; text-align: left;">
        <a href="javascript:void(0)" class="easyui-linkbutton"
           iconcls="icon-reload" plain="true"
           onclick="javascript:window.location.reload()">刷新</a>
    </div>

    <table align="center" border="1" width="100%" id="pools">
        <caption>
            <b><font color="red">/pools [服务器池配置]</font></b>
        </caption>
        <tr>
            <th width="30%">池名称</th>
            <th>池列表</th>
        </tr>

        <tr>
            <td colspan="2"><input type="button" value="添加池"/></td>
        </tr>
    </table>
    <br/> <br/>
    <br/> <br/> <input type="button" value="update" onclick="update()"/>

</body>
<script type="text/javascript">
    $.fn.setCursorPosition = function (position) {
        if (this.lengh == 0) return this;
        return $(this).setSelection(position, position);
    }

    $.fn.setSelection = function (selectionStart, selectionEnd) {
        if (this.lengh == 0) return this;
        input = this[0];

        if (input.createTextRange) {
            var range = input.createTextRange();
            range.collapse(true);
            range.moveEnd('character', selectionEnd);
            range.moveStart('character', selectionStart);
            range.select();
        } else if (input.setSelectionRange) {
            input.focus();
            input.setSelectionRange(selectionStart, selectionEnd);
        }

        return this;
    }

    $.fn.focusEnd = function () {
        this.setCursorPosition(this.val().length);
    }

    $(function () {
        $("body").on("click", ":button[value='添加池']", function () {
            $(this).parent().parent().before("<tr><td><span class='editable' ><input/></span> <input type='button' value='删除' /></td><td><table width='100%' align='center'  ><tr><td><span class='editable'><input/></span> <input type='button' value='删除' /></td></tr><tr><td><input type='button' value='添加服务器'/></td></tr></table></td></tr>");
        });

        $("body").on("click", ":button[value='添加服务器']", function () {
            $(this).parent().parent().before("<tr><td><span class='editable' ><input/></span> <input type='button' value='删除' /></td></tr>");
        });
        $("body").on("click", ":button[value='删除']", function () {
            if (confirm("操作不可逆，确定继续？"))
                $(this).parent().parent().remove();
        });

        $("body").on("blur", "input:text", function () {

            val = $(this).val();
            if (val.trim().length == 0) {
                alert("不能为空");
                return;
            }
            $(this).parent().text(val);
        });
        $("body").on("click", ".editable", function () {

            if ($(this).find("input").length > 0) return;

            val = $(this).text()

            $(this).html("<input value=" + val + " />");
            $(this).children().eq(0).focusEnd();

        });
    })


    function update() {
        if (isNull()) {
            alert("存在空值，请检查后提交");
            return;
        }
        if (commiting) {
            alert("正在更新，请勿重复提交");
            return;
        }
        analysePools();
        //alert(str);
        ajaxSendOut()
    }


    function analysePools() {
        str = "{";
        var pools = $("#pools").children("tbody").eq(0).children("tr");
        var len = pools.length - 1;
        for (var i = 1; i < len; i++) {
            var pool = pools[i];
            var poolName = $(pool).children().eq(0).text().trim();
            var servers = $(pool).children().eq(1).find("tr");
            var len2 = servers.length - 1;
            for (var j = 0; j < len2; j++) {
                var server = $(servers[j]).text();
                str = appendStr(str, "/" + poolName + "/s" + j, server);
            }
        }
        str = endStr(str);

    }


    var str = "{"

    function appendStr(str, key, value) {
        return str + "\"" + key + "\":" + "\"" + value + "\",";
    }

    function endStr(str) {
        return str.substring(0, str.length - 1) + "}";
    }

    function ajaxSendOut() {
        commiting = true;
        $.get("../config/mcrouter/set", {"values": str, prefix: "/cache-center/pools/"}, function (result) {
            alert(result.msg);
            commiting = false;
        });
    }


    $.get("../config/mcrouter/get?prefix=/cache-center/pools/", function (result) {
        initRead(result);
    });

    function initRead(result) {
        var len = result.length;
        //alert(len)
        for (var i = 0; i < len; i++) {
            var key = result[i].key;
            //	alert(key)
            var poolName = key.substring(1, key.lastIndexOf("/")).trim();

            var poolTrs = $("#pools").children("tbody").children("tr");
            var len2 = poolTrs.length - 1;
            var flag = true;
            for (var j = 1; j < len2; j++) {
                if ($(poolTrs[j]).children().eq(0).text().trim() == poolName) {
                    $(poolTrs[j]).children().eq(1).find("td:last").eq(0).parent().before("<tr><td><span class='editable'>" + result[i].value.trim() + "</span> <input type='button' value='删除' /></td></tr>");
                    flag = false;
                    break;
                }
            }
            if (flag) {
                $(poolTrs[len2]).before("<tr><td><span class='editable'>" + poolName + "</span> <input type='button' value='删除' /></td><td><table align='center' width='100%' ><tr><td><span class='editable'>" + result[i].value.trim() + "</span> <input type='button' value='删除' /></td></tr><tr><td><input type='button' value='添加服务器' /></td></tr></table></td></tr>");
            }

        }
    }


    function isNull() {
        var edits = $(".editable");
        var len = edits.length
        for (var i = 0; i < len; i++) {
            //alert($(edits[i]).text());
            if ($(edits[i]).text().length == 0) {
                return true;
            }
        }

        return false;
    }

    var commiting = false;

</script>
</html>