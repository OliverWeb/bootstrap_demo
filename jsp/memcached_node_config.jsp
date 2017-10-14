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
                <td>绑定IP：</td>
                <td><input id="ipAddress" class="easyui-textbox" style="width: 166px;height:27px" required="true"/></td>
            </tr>
            <tr>
                <td>TCP端口：</td>
                <td><input id="port" class="easyui-textbox" style="width: 166px;height:27px" required="true"/></td>
            </tr>
            <tr>
                <td>UDP端口：</td>
                <td><input id="udpPort" class="easyui-textbox" style="width: 166px;height:27px"/></td>
            </tr>
            <tr>
                <td>内存：</td>
                <td><input id="memoryMaxSize" class="easyui-textbox" style="width: 166px;height:27px" required="true"/>
                </td>
            </tr>
            <tr>
                <td>连接数：</td>
                <td><input id="connectNum" class="easyui-textbox" style="width: 166px;height:27px" required="true"/>
                </td>
            </tr>
            <tr>
                <td>用户名：</td>
                <td><input id="user" class="easyui-textbox" style="width: 166px;height:27px"/></td>
            </tr>
            <tr>
                <td>PID文件路径：</td>
                <td><input id="pidFile" class="easyui-textbox" style="width: 166px;height:27px"/></td>
            </tr>
            <tr>
                <td colspan="2" align="center"><a href="javascript:;" onclick="commit_add()"
                                                  class="easyui-linkbutton" iconCls="icon-ok"
                                                  style="width: 50%; height: 32px"></a></td>
            </tr>
        </table>
    </form>
</div>

<div id="server-status"
     class="easyui-dialog"
     style="width: auto; height: auto; padding: 5px 5px;left:20%;top:100px" closed="true">
    <form id="show-status">
        <table width="100%">
            <tr title="LRU回收item数量，判断内存是否已满，如果不为零并且数值走高说明内存不足">
                <td>正在回收的数据数量（条目）</td>
                <td><input id="evictions" class="easyui-textbox" style="width: 166px;height:27px"/>
                </td>
            </tr>
            <tr title="内存使用率，当前使用内存站总内存的比值">
                <td>内存使用率</td>
                <td><input id="memory_usage" class="easyui-textbox" style="width: 166px;height:27px"/>
                </td>
            </tr>
            <tr title="当前线程数量">
                <td>当前处理线程数量</td>
                <td><input id="threads" class="easyui-textbox" style="width: 166px;height:27px"/>
                </td>
            </tr>
            <tr title="命中率">
                <td>命中率</td>
                <td><input id="hit_rate" class="easyui-textbox" style="width: 166px;height:27px"/>
                </td>
            </tr>
            <tr title="miss率">
                <td>miss率</td>
                <td><input id="miss_rate" class="easyui-textbox" style="width: 166px;height:27px"/>
                </td>
            </tr>
            <tr title="写入请求数">
                <td>写入请求数</td>
                <td><input id="cmd_set" class="easyui-textbox" style="width: 166px;height:27px"/>
                </td>
            </tr>
            <tr title="读取数据占总数据流量的比值">
                <td>读取数据占总数据流量的比值</td>
                <td><input id="read_rate" class="easyui-textbox" style="width: 166px;height:27px"/>
                </td>
            </tr>
            <tr title="写书数据占总数据流量的比值">
                <td>写入数据占总数据流量的比值</td>
                <td><input id="write_rate" class="easyui-textbox" style="width: 166px;height:27px"/>
                </td>
            </tr>
            <tr title="cpu用户时间">
                <td>cpu用户时间</td>
                <td><input id="rusage_user" class="easyui-textbox" style="width: 166px;height:27px"/>
                </td>
            </tr>
            <tr title="cpu系统时间">
                <td>cpu系统时间</td>
                <td><input id="rusage_system" class="easyui-textbox" style="width: 166px;height:27px"/>
                </td>
            </tr>
            <tr title="当前数据量">
                <td>当前数据量</td>
                <td><input id="curr_items" class="easyui-textbox" style="width: 166px;height:27px"/>
                </td>
            </tr>
            <tr title="历史累计数据量">
                <td>历史累计数据量</td>
                <td><input id="total_items" class="easyui-textbox" style="width: 166px;height:27px"/>
                </td>
            </tr>
            <tr title="当前连接数">
                <td>当前连接数</td>
                <td><input id="curr_connection" class="easyui-textbox" style="width: 166px;height:27px"/>
                </td>
            </tr>
            <tr title="历史累计连接数">
                <td>历史累计连接数</td>
                <td><input id="total_connection" class="easyui-textbox" style="width: 166px;height:27px"/>
                </td>
            </tr>
        </table>
    </form>
</div>
<div style="width: 100%; text-align: left;">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="icon-reload"
       onclick="javascript:window.location.reload()">刷新</a>
    <a id="addbutton" href="javascript:;"
       onclick="javascript:$('#addinstance').dialog('open').dialog('setTitle', '添加memcached实例');"
       class="easyui-linkbutton" iconCls="icon-add">添加memcached实例</a>
    <br/>
    <br/>
    <table id="memcached_node_config" class="easyui-datagrid" style="width:100%;height:auto;">
    </table>
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
        fit:false,
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
        $("#memcached_node_config").datagrid({
            title: 'memcached服务器 IP:' + ip,
            collapsible: false,
            loadMsg: 'Loading... ',
            nowrap: true,//允许换行
//            fitColumns: true,//宽度自适应
            singleSelect: true,
            checkbox: false,
            url: "../config/node/getMemcachedNodes?memcached_ip=" + ip,
            columns: [[
                {field: 'disabled', title: '运行状态', width: 100, align: 'center', formatter: server_status},
                {
                    field: 'ipAddress',
                    title: '绑定IP',
                    width: 170,
                    align: 'center'
                },
                {
                    field: 'port',
                    title: 'TCP端口',
                    width: 85,
                    align: 'center',
                },
                {
                    field: 'udpPort',
                    title: 'UDP端口',
                    width: 85,
                    align: 'center',
                },
                {
                    field: 'memoryMaxSize',
                    title: '内存',
                    width: 85,
                    align: 'center',
                },
                {
                    field: 'connectNum',
                    title: '连接数',
                    width: 85,
                    align: 'center',
                },
                {
                    field: 'user',
                    title: '用户名',
                    width: 100,
                    align: 'center',
                },
                {
                    field: 'pidFile',
                    title: 'PID文件路径',
                    width: 732,
                    align: 'center',
                },
                {
                    field: 'key',
                    title: '操作',
                    width: 250,
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
        $.get("${pageContext.request.contextPath}/memcached/operation/start_memcached", {
            server: ip,
            key: key
        }, function (result) {
            stoping = false;
            if ('success' == result.status) {
                $.messager.alert("操作提示", "memcache实例[ " + port + " ]启动成功！", "info", function () {
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
        $.get("${pageContext.request.contextPath}/memcached/operation/stop_memcached", {
            server: ip,
            port: port
        }, function (result) {
            stoping = false;
            if ('success' == result.status) {
                $.messager.alert("提示信息", "memcache实例[ " + port + " ]关闭！", "info", function () {
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
            port: port,
            command: "stats"
        }, function (result) {
            $('#server-status').dialog('open').dialog('setTitle', '实例状态');

            var res = jQuery.parseJSON(result.message)
            $('#evictions').textbox('textbox').attr('readonly', true);
            $("#evictions").textbox("setValue", res.evictions);

            $('#memory_usage').textbox('textbox').attr('readonly', true);
            $("#memory_usage").textbox("setValue", res.memory_usage);

            $('#threads').textbox('textbox').attr('readonly', true);
            $("#threads").textbox("setValue", res.threads);

            $('#hit_rate').textbox('textbox').attr('readonly', true);
            $("#hit_rate").textbox("setValue", res.hit_rate);

            $('#miss_rate').textbox('textbox').attr('readonly', true);
            $("#miss_rate").textbox("setValue", res.miss_rate);

            $('#cmd_set').textbox('textbox').attr('readonly', true);
            $("#cmd_set").textbox("setValue", res.cmd_set);

            $('#read_rate').textbox('textbox').attr('readonly', true);
            $("#read_rate").textbox("setValue", res.read_rate);

            $('#write_rate').textbox('textbox').attr('readonly', true);
            $("#write_rate").textbox("setValue", res.write_rate);

            $('#rusage_user').textbox('textbox').attr('readonly', true);
            $("#rusage_user").textbox("setValue", res.rusage_user);

            $('#rusage_system').textbox('textbox').attr('readonly', true);
            $("#rusage_system").textbox("setValue", res.rusage_system);

            $('#curr_items').textbox('textbox').attr('readonly', true);
            $("#curr_items").textbox("setValue", res.curr_items);

            $('#total_items').textbox('textbox').attr('readonly', true);
            $("#total_items").textbox("setValue", res.total_items);

            $('#curr_connection').textbox('textbox').attr('readonly', true);
            $("#curr_connection").textbox("setValue", res.curr_connection);

            $('#total_connection').textbox('textbox').attr('readonly', true);
            $("#total_connection").textbox("setValue", res.total_connection);
        })
    }

    function edit(index, key) {
        $('#memcached_node_config').datagrid('selectRow', index);
        var row = $('#memcached_node_config').datagrid('getSelected');
        if (row) {
            $('#addinstance').dialog('open').dialog('setTitle', '修改实例配置');
            $("#ipAddress").textbox("setValue", row.ipAddress);
            $("#port").textbox("setValue", row.port);
            $("#udpPort").textbox("setValue", row.udpPort);
            $("#memoryMaxSize").textbox("setValue", row.memoryMaxSize);
            $("#connectNum").textbox("setValue", row.connectNum);
            $("#user").textbox("setValue", row.user);
            $("#pidFile").textbox("setValue", row.pidFile);
            $("#editType").val("edit");
            $("#prefix0").val(key);
        }
    }

    function commit_add() {
        if (commiting) {
            $.messager.alert("警告", "正在更新，请勿重复提交", "warning");
            return;
        }

        var ipexp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;

        var ipAddress = $("#ipAddress").textbox("getValue");
        if (!isNull(ipAddress) && ipAddress.match(ipexp) == null) {
            $.messager.alert("错误", "请输入正确的IP地址！", "error");
            return;
        }

        var numexp = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;

        var tcpport = $("#port").textbox("getValue");
        if (!isNull(tcpport) && tcpport.match(numexp) == null) {
            $.messager.alert("错误", "请输入正确的端口号！", "error");
            return;
        }
        var udpport = $("#udpPort").textbox("getValue");
        if (!isNull(udpport) && udpport.match(numexp) == null) {
            $.messager.alert("错误", "请输入正确的端口号！", "error");
            return;
        }
        var memsize = $("#memoryMaxSize").textbox("getValue");
        if (!isNull(memsize) && memsize.match(numexp) == null) {
            $.messager.alert("错误", "请输入正确的缓存大小！", "error");
            return;
        }
        var linknum = $("#connectNum").textbox("getValue");
        if (!isNull(linknum) && linknum.match(numexp) == null) {
            $.messager.alert("错误", "请输入正确的连接数！", "error");
            return;
        }
        var user = $("#user").textbox("getValue");
        var pidfilepath = $("#pidFile").textbox("getValue");
        var editType = $("#editType").val();
        var prefix0 = $("#prefix0").val();

        value = "{";
        value = appendStr(value, "ipAddress", ipAddress);
        value = appendStr(value, "port", tcpport);
        value = appendStr(value, "udpPort", udpport);
        value = appendStr(value, "memoryMaxSize", memsize);
        value = appendStr(value, "connectNum", linknum);
        value = appendStr(value, "user", user);
        value = appendStr(value, "pidFile", pidfilepath);
        value = appendStr(value, "disabled", "1");
        value = endStr(value);

        commiting = true;
        var tmpPrefix = "/cache-center/nodes/memcached/" + ip + "/" + tcpport;
        if ("edit" == editType) {
            tmpPrefix = prefix0;
        }

        $.get("../memcached/operation/set_memcache_node", {
            "value": value,
            prefix: tmpPrefix,
            server: ip,
            editType: editType
        }, function (result) {
            $("#addinstance").dialog("close");
            if ('success' == result.status) {
                $.messager.alert("提示信息", result.message, "info");
                $("#memcached_node_config").datagrid("appendRow", {
                    ipAddress: ipAddress,
                    port: tcpport,
                    udpPort: udpport,
                    memoryMaxSize: memsize,
                    connectNum: linknum,
                    user: user,
                    pidFile: pidfilepath,
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