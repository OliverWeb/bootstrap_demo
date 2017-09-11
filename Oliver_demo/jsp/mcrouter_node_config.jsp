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
    <style>
        .key {
            text-align: right;
        }

        .value {
            text-align: left;
        }
    </style>
</head>
<body>

<div id="addinstance"
     class="easyui-dialog"
     style="width: 300px; height: auto; padding: 5px 5px;left:20%;top:100px" closed="true">
    <form id="instance_config">
        <input id="editType" style="display: none;" value="add"/>
        <input id="prefix0" style="display: none;"/>
        <table width="100%">

            <tr>
                <td>日志文件路径：</td>
                <td><input id="logPath" class="easyui-textbox" style="width: 166px;height:27px" required="true"/></td>
            </tr>
            <tr>
                <td>处理客户端请求线程数量：</td>
                <td><input id="numProxies" class="easyui-textbox" style="width: 166px;height:27px" required="true"/>
                </td>
            </tr>
            <tr>
                <td>监听端口号：</td>
                <td><input id="port" class="easyui-textbox" style="width: 166px;height:27px"/></td>
            </tr>
            <tr>
                <td>配置文件路径：</td>
                <td><input id="configFile" class="easyui-textbox" style="width: 166px;height:27px" required="true"/>
                </td>
            </tr>
            <tr>
                <td>默认路由前缀：</td>
                <td><input id="routePrefix" class="easyui-textbox" style="width: 166px;height:27px" required="true"/>
                </td>
            </tr>
            <tr>
                <td>大数据分段发送截取长度：</td>
                <td><input id="bigValueSplitThreshold" class="easyui-textbox" style="width: 166px;height:27px"/></td>
            </tr>
            <tr>
                <td>客户端最大链接数：</td>
                <td><input id="maxClientOutstandingRequest" class="easyui-textbox" style="width: 166px;height:27px"/>
                </td>
            </tr>
            <tr>
                <td>是否开启流量控制：</td>
                <td><input class="easyui-combobox" id="destinationRateLimiting" name="destinationRateLimiting" data-options="panelWidth: 166,panelHeight: 'auto',formatter: formatItem" required="true"/>
                </td>
            </tr>
            <tr>
                <td>限制发送请求的速度(须开启流控)：</td>
                <td><input id="targetMaxInflightRequest" class="easyui-textbox" style="width: 166px;height:27px"/></td>
            </tr>
            <tr>
                <td>未发送数据缓存最大值：</td>
                <td><input id="targetMaxPendingRequests" class="easyui-textbox" style="width: 166px;height:27px"/></td>
            </tr>
            <tr>
                <td colspan="2" align="center"><a href="javascript:;" onclick="commit()"
                                                  class="easyui-linkbutton" iconCls="icon-ok"
                                                  style="width: 50%; height: 32px"></a></td>
            </tr>
        </table>
    </form>
</div>

<div style="width: 80%; text-align: left;">
    <a href="javascript:void(0)" class="easyui-linkbutton"
       iconcls="icon-reload" plain="true"
       onclick="javascript:window.location.reload()">刷新</a>
    <a id="addbutton" href="javascript:;"
       onclick="javascript:$('#addinstance').dialog('open').dialog('setTitle', '添加mcrouter实例');"
       class="easyui-linkbutton" iconCls="icon-add">添加mcrouter实例</a>
    <table id="mcrouter_node_config" class="easyui-datagrid" style="width: 1425px;height:auto;">
    </table>
    <input type='button' value='更新'/>
</div>
</body>
<script type="text/javascript">
    var commiting = false;
    $("#addinstance").dialog({
        cache: false,
        collapsible: false,
        minimizable: false,
        maximizable: false,
        resizable: false,
        modal: true,
        closed: true,
        onClose: function () {
            $("#instance_config").form('clear');
            commiting = false;
        }
    });

    $("#server-status").dialog({
        cache: false,
        collapsible: false,
        minimizable: false,
        maximizable: false,
        resizable: false,
        modal: true,
        closed: true,
        onClose: function () {
            $("#show-status").form('clear');
            commiting = false;
        }
    });

    function formatItem(){
        var s = '<span style="font-weight:bold">Enable</span><br/>' +
            '<span style="color:#888">开启流量控制，开启此开关后才能使后面的"限制发送请求的速度"和"未发送数据缓存最大值"生效</span>'+
            '<span style="font-weight:bold">Disable</span><br/>' +
            '<span style="color:#888">关闭流量控制</span>';
        return s;
    }

    function getCookie(name) {
        var arr = document.cookie.split('; ');
        var i = 0;
        for (i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('=');
            if (arr2[0] == name) {
                var getC = decodeURIComponent(arr2[1]);
                return getC;
            }
        }
        return '';
    }

    var ip = getCookie("ip");
    $(function () {
        $("#mcrouter_node_config").datagrid({
            title: 'mcrouter服务器 IP:' + ip,
            collapsible: false,
            loadMsg: 'Loading... ',
            nowrap: true,//允许换行
            fitColumns: true,//宽度自适应
            singleSelect: true,
            checkbox: false,
            url: "../config/node/getMcrouterNodes?mcrouter_ip=" + ip,
            columns: [[
                {field: 'disabled', title: '运行状态', width: 100, align: 'center', formatter: server_status},
                {
                    field: 'logPath',
                    title: '日志文件路径',
                    width: 180,
                    align: 'center'
                },
                {
                    field: 'numProxies',
                    title: '处理客户端请求线程数量',
                    width: 100,
                    align: 'center',
                },
                {
                    field: 'port',
                    title: '监听端口号',
                    width: 100,
                    align: 'center',
                },
                {
                    field: 'configFile',
                    title: '配置文件路径',
                    width: 100,
                    align: 'center',
                },
                {
                    field: 'routePrefix',
                    title: '默认路由前缀',
                    width: 100,
                    align: 'center',
                },
                {
                    field: 'bigValueSplitThreshold',
                    title: '大数据分段发送截取长度',
                    width: 120,
                    align: 'center',
                },
                {
                    field: 'maxClientOutstandingRequest',
                    title: '客户端最大链接数',
                    width: 180,
                    align: 'center'
                },
                {
                    field: 'destinationRateLimiting',
                    title: '是否开启流量控制',
                    width: 180,
                    align: 'center'
                },
                {
                    field: 'targetMaxInflightRequest',
                    title: '限速阀值',
                    width: 420,
                    align: 'center',
                },
                {
                    field: 'targetMaxPendingRequests',
                    title: '未发送数据缓存最大值',
                    width: 205,
                    align: 'center',
                },
                {
                    field: 'key',
                    title: '操作',
                    width: 205,
                    align: 'center',
                    formatter: operation_buttons
                }
            ]]
        });
    })

    function server_status(val, row, index) {
        if (1 == val) {
            return '<a href="javascript:;" onclick="javascript:;" class="easyui-linkbutton l-btn l-btn-small l-btn-plain" plain="true" iconcls="icon-no" group=""><span class="l-btn-left l-btn-icon-left"><span class="l-btn-text">&nbsp;</span><span class="l-btn-icon icon-no">&nbsp;</span></span></a>';
        }
        return '<a href="javascript:;" onclick="javascript:;" class="easyui-linkbutton l-btn l-btn-small l-btn-plain" plain="true" iconcls="icon-ok" group=""><span class="l-btn-left l-btn-icon-left"><span class="l-btn-text">&nbsp;</span><span class="l-btn-icon icon-ok">&nbsp;</span></span></a>';
    }

    function operation_buttons(val, row, index) {
        val = "'" + val + "'"
        var modify = '<a href="javascript:;" onclick="javascript:edit(' + index + ',' + val + ');" class="easyui-linkbutton l-btn l-btn-small l-btn-plain" plain="true" iconcls="icon-edit" group=""><span class="l-btn-left l-btn-icon-left"><span class="l-btn-text">修改</span><span class="l-btn-icon icon-edit">&nbsp;</span></span></a>';
        var star = ""
        if (1 == row.disabled) {
            star = '<a href="javascript:;" onclick="javascript:star(\'' + row.port + '\',' + val + ');" class="easyui-linkbutton l-btn l-btn-small l-btn-plain" plain="true" iconcls="icon-tip" group=""><span class="l-btn-left l-btn-icon-left"><span class="l-btn-text">启动</span><span class="l-btn-icon icon-tip">&nbsp;</span></span></a>';
        } else {
            star = '<a href="javascript:;" onclick="javascript:stop(\'' + row.port + '\',' + val + ');" class="easyui-linkbutton l-btn l-btn-small l-btn-plain" plain="true" iconcls="icon-remove" group=""><span class="l-btn-left l-btn-icon-left"><span class="l-btn-text">关闭</span><span class="l-btn-icon icon-remove">&nbsp;</span></span></a>';
        }
        var view = '<a href="javascript:;" onclick="javascript:view(\'' + row.ipAddress + '\',\'' + row.port + '\');" class="easyui-linkbutton l-btn l-btn-small l-btn-plain" plain="true" iconcls="icon-search" group=""><span class="l-btn-left l-btn-icon-left"><span class="l-btn-text">查看</span><span class="l-btn-icon icon-search">&nbsp;</span></span></a>';
        return modify + " | " + star + " | " + view;
    }
    var stoping = false;
    function star(port, key) {
        if (stoping) {
            $.messager.alert("错误", "正在启动，请勿重复点击！", "warning");
            return;
        }
        stoping = true;
        $.get("${pageContext.request.contextPath}/mcrouter/operation/start_mcrouter", {
            server: ip,
            key: key
        }, function (result) {
            stoping = false;
            if ('success' == result.status) {
                $.messager.alert("操作提示", "mcrouter实例[ " + port + " ]启动成功！", "info", function () {
                    window.location.reload();
                });
            } else {
                $.messager.alert("错误", result.message, "error");
            }
        });
    }

    function stop(port, key) {
        if (stoping) {
            $.messager.alert("错误", "正在启动，请勿重复点击！", "warning");
            return;
        }
        stoping = true;
        $.get("${pageContext.request.contextPath}/mcrouter/operation/stop_mcrouter", {
            server: ip,
            port: port
        }, function (result) {
            stoping = false;
            if ('success' == result.status) {
                $.messager.alert("提示信息", "mcrouter实例[ " + port + " ]关闭！", "info", function () {
                    window.location.reload();
                });
            } else {
                $.messager.alert("错误", result.message, "error");
            }
        });
    }

    function view(ip, port) {
        $.get("${pageContext.request.contextPath}/config/dashboard/command_exe", {
            server: ip,
            port: port
        }, function (result) {
            $('#server-status').dialog('open').dialog('setTitle', '实例状态');
            $('#pid').textbox('textbox').attr('readonly', true);
            $("#pid").textbox("setValue", result.pid);

            $('#curr_connections').textbox('textbox').attr('readonly', true);
            $("#curr_connections").textbox("setValue", result.curr_connections);

            $('#cmd_get').textbox('textbox').attr('readonly', true);
            $("#cmd_get").textbox("setValue", result.cmd_get);

            $('#get_hits').textbox('textbox').attr('readonly', true);
            $("#get_hits").textbox("setValue", result.get_hits);

            $('#get_misses').textbox('textbox').attr('readonly', true);
            $("#get_misses").textbox("setValue", result.get_misses);

            $('#cmd_set').textbox('textbox').attr('readonly', true);
            $("#cmd_set").textbox("setValue", result.cmd_set);

            $('#delete_hits').textbox('textbox').attr('readonly', true);
            $("#delete_hits").textbox("setValue", result.delete_hits);

            $('#delete_misses').textbox('textbox').attr('readonly', true);
            $("#delete_misses").textbox("setValue", result.delete_misses);

            $('#bytes_read').textbox('textbox').attr('readonly', true);
            $("#bytes_read").textbox("setValue", result.bytes_read);

            $('#bytes_writen').textbox('textbox').attr('readonly', true);
            $("#bytes_writen").textbox("setValue", result.bytes_written);

            $('#limit_maxbytes').textbox('textbox').attr('readonly', true);
            $("#limit_maxbytes").textbox("setValue", result.limit_maxbytes);

            $('#bytes').textbox('textbox').attr('readonly', true);
            $("#bytes").textbox("setValue", result.bytes);
        })
    }

    function edit(index, key) {
        $('#mcrouter_node_config').datagrid('selectRow', index);
        var row = $('#mcrouter_node_config').datagrid('getSelected');
        if (row) {
            $('#addinstance').dialog('open').dialog('setTitle', '修改实例配置');

            $("#logPath").textbox("setValue", row.logPath);
            $("#numProxies").textbox("setValue", row.numProxies);
            $("#port").textbox("setValue", row.udpPort);
            $("#configFile").textbox("setValue", row.memoryMaxSize);
            $("#routePrefix").textbox("setValue", row.connectNum);
            $("#bigValueSplitThreshold").textbox("setValue", row.user);
            $("#targetMaxInflightRequest").textbox("setValue", row.pidFile);
            $("#targetMaxPendingRequests").textbox("setValue", row.pidFile);
            $("#maxClientOutstandingRequest").textbox("setValue", row.pidFile);
            $("#destinationRateLimiting").textbox("setValue", row.pidFile);
            $("#editType").val("edit");
            $("#prefix0").val(key);
        }
    }


    function commit() {
        if (commiting) {
            $.messager.alert("警告", "正在更新，请勿重复提交", "warning");
            return;
        }

        var numexp = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;

        var numProxies = $("#numProxies").textbox("getValue");
        if (!isNull(numProxies) && numProxies.match(numexp) == null) {
            $.messager.alert("错误", "请输入正确的端口号！", "error");
            return;
        }
        var port = $("#port").textbox("getValue");
        if (!isNull(port) && port.match(numexp) == null) {
            $.messager.alert("错误", "请输入正确的端口号！", "error");
            return;
        }
        var bigValueSplitThreshold = $("#bigValueSplitThreshold").textbox("getValue");
        if (!isNull(bigValueSplitThreshold) && bigValueSplitThreshold.match(numexp) == null) {
            $.messager.alert("错误", "请输入正确的缓存大小！", "error");
            return;
        }

        var maxClientOutstandingRequest = $("#maxClientOutstandingRequest").textbox("getValue");
        if (!isNull(maxClientOutstandingRequest) && maxClientOutstandingRequest.match(numexp) == null) {
            $.messager.alert("错误", "请输入正确的连接数！", "error");
            return;
        }

        var logPath = $("#logPath").textbox("getValue");
        var configFile = $("#configFile").textbox("getValue");
        var routePrefix = $("#routePrefix").textbox("getValue");
        var targetMaxPendingRequests = $("#targetMaxPendingRequests").textbox("getValue");
        var targetMaxInflightRequest = $("#targetMaxInflightRequest").textbox("getValue");
        var destinationRateLimiting = $("#destinationRateLimiting").textbox("getValue");
        var editType = $("#editType").val();
        var prefix0 = $("#prefix0").val();


        value = "{";
        value = appendStr(value, "logPath", logPath);
        value = appendStr(value, "numProxies", numProxies);
        value = appendStr(value, "port", port);
        value = appendStr(value, "configFile", configFile);
        value = appendStr(value, "routePrefix", routePrefix);
        value = appendStr(value, "bigValueSplitThreshold", bigValueSplitThreshold);
        value = appendStr(value, "targetMaxInflightRequest", targetMaxInflightRequest);
        value = appendStr(value, "targetMaxPendingRequests", targetMaxPendingRequests);
        value = appendStr(value, "maxClientOutstandingRequest", maxClientOutstandingRequest);
        value = appendStr(value, "destinationRateLimiting", destinationRateLimiting);
        value = appendStr(value, "disabled", "1");
        value = endStr(value);

        commiting = true;
        var tmpPrefix = "/cache-center/nodes/mcrouter/" + ip + "/" + port;
        if ("edit" == editType) {
            tmpPrefix = prefix0;
        }

        $.get("../mcrouter/operation/set_mcrouter_node", {
            "value": value,
            prefix: tmpPrefix,
            server: ip,
            editType: editType
        }, function (result) {
            $("#addinstance").dialog("close");
            if ('success' == result.status) {
                $.messager.alert("提示信息", result.message, "info");
                $("#mcrouter_node_config").datagrid("appendRow", {
                    logPath: logPath,
                    numProxies: numProxies,
                    port: port,
                    configFile: configFile,
                    routePrefix: routePrefix,
                    bigValueSplitThreshold: bigValueSplitThreshold,
                    targetMaxInflightRequest: targetMaxInflightRequest,
                    targetMaxPendingRequests:targetMaxPendingRequests,
                    maxClientOutstandingRequest:maxClientOutstandingRequest,
                    destinationRateLimiting:destinationRateLimiting,
                    disabled: "1",
                    key: tmpPrefix
                });
            } else {
                $.messager.alert("提示信息", result.message, "error");
            }
            commiting = false;
            $.parser.parse();
        });
    }

    function appendStr(str, key, value) {
        if (isNull(value)) {
            return str
        }
        return str + "\"" + key + "\":" + "\"" + value + "\",";
    }

    function endStr(str) {
        return str.substring(0, str.length - 1) + "}";
    }

    function isNull(checkobj) {
        if (checkobj == null || checkobj == undefined || checkobj.length == 0 || checkobj == '') {
            return true;
        }
        return false;
    }
</script>
</html>