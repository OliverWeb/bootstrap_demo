<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>首页</title>
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
            src="${pageContext.request.contextPath}/jquery-easyui-1.5/jquery.min.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/jquery-easyui-1.5/jquery.easyui.min.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/jquery-easyui-1.5/themes/insdep/jquery.insdep-extend.min.js"></script>
</head>
<body>
<div style="margin: 20px 0;"></div>
<h1 align="center">ETCD-CONFIG</h1>
<div class="easyui-layout" style="width: 100%; height: 1000px;">
    <div data-options="region:'west',split:true" title="菜单栏"
         style="width: 150px;">
        <ul id="tree"></ul>
    </div>
    <div
            data-options="region:'center',iconCls:'icon-star_bronze_half_grey'">
        <div class="easyui-tabs" fit="true" border="false" id="tabs">
            <div title="首页">
                <h1>Welcome to etcd-config .</h1>
            </div>
        </div>
    </div>
</div>
<div id="tabsMenu" class="easyui-menu" style="width: 120px;">
    <div name="close">关闭</div>
    <div name="Other">关闭其他</div>
    <div name="All">关闭所有</div>
</div>
</body>

<script type="text/javascript">
    var treeData = [{
        text: '菜单',
        children: [{
            text: 'mcrouter配置',
            children: [{
                text: 'pools',
                attributes: {
                    url: '${pageContext.request.contextPath}/jsp/pools-config.jsp'
                }
            }, {
                text: 'reliability',
                attributes: {
                    url: '${pageContext.request.contextPath}/jsp/reliability-config.jsp'
                }
            },
                {
                    text: 'cool-warm',
                    attributes: {
                        url: '${pageContext.request.contextPath}/jsp/cool-warm-config.jsp'
                    }
                },
                {
                    text: 'shadow',
                    attributes: {
                        url: '${pageContext.request.contextPath}/jsp/shadow-config.jsp'
                    }
                }
            ]

        },

            {
                text: 'node',
                children: [
                    {
                        text: '物理节点管理',
                        attributes: {
                            url: '${pageContext.request.contextPath}/jsp/server_list.jsp'
                        }
                    },
                    {
                        text: 'mcrouter节点',
                        attributes: {
                            url: '${pageContext.request.contextPath}/jsp/mcrouter_node_config_list.jsp'
                        }
                    },
                    {
                        text: 'memcache节点',
                        attributes: {
                            url: '${pageContext.request.contextPath}/jsp/memcached_node_config_list.jsp'
                        },
                    },
                    {
                        text: 'getnode',
                        attributes: {
                            url: '${pageContext.request.contextPath}/jsp/getnode.jsp'
                        },
                    }
                ]

            }]
    }];
</script>

<script type="text/javascript">
    $("#tree").tree({
        data: treeData,
        lines: true,
        onClick: function (node) {
            if (node.attributes) {
                Open(node.text, node.attributes.url);
            }
        }
    });

    //绑定tabs的右键菜单
    $("#tabs").tabs({
        onContextMenu: function (e, title) {
            e.preventDefault();
            $('#tabsMenu').menu('show', {
                left: e.pageX,
                top: e.pageY
            }).data("tabTitle", title);
        }
    });

    //实例化menu的onClick事件
    $("#tabsMenu").menu({
        onClick: function (item) {
            CloseTab(this, item.name);
        }
    });


    //在右边center区域打开菜单，新增tab
    function Open(text, url) {
        var content = '<iframe scrolling="auto" frameborder="0"  src="' + url
            + '" style="width:100%;height:100%;"></iframe>';
        if ($("#tabs").tabs('exists', text)) {
            $('#tabs').tabs('select', text);
            var currTab = $('#tabs').tabs('getTab', text);
            $('#tabs').tabs('update', {
                tab: currTab,
                options: {
                    content: content,
                    closable: true
                }
            });
        } else {
            $('#tabs').tabs('add', {
                title: text,
                closable: true,
                content: content
            });
        }
    }

    //几个关闭事件的实现
    function CloseTab(menu, type) {
        var curTabTitle = $(menu).data("tabTitle");
        var tabs = $("#tabs");

        if (type === "close") {
            tabs.tabs("close", curTabTitle);
            return;
        }

        var allTabs = tabs.tabs("tabs");
        var closeTabsTitle = [];

        $.each(allTabs, function () {
            var opt = $(this).panel("options");
            if (opt.closable && opt.title != curTabTitle && type === "Other") {
                closeTabsTitle.push(opt.title);
            } else if (opt.closable && type === "All") {
                closeTabsTitle.push(opt.title);
            }
        });

        for (var i = 0; i < closeTabsTitle.length; i++) {
            tabs.tabs("close", closeTabsTitle[i]);
        }
    }

</script>


</html>