<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="edge"/>
    <link rel="shortcut icon" href="${pageContext.request.contextPath}/jquery-easyui-1.5/themes/icons/flash.ico"/>


    <title>演示 - jQuery EasyUI 1.5.x Of Insdep theme examples</title>

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
<div id="master-layout">
    <div data-options="region:'north',border:false,bodyCls:'theme-header-layout'">
        <div class="theme-navigate">
            <div class="left">
                <a href="#" class="easyui-linkbutton left-control-switch"><i class="fa fa-bars fa-lg"></i></a>
                <a href="#" class="easyui-menubutton theme-navigate-user-button"
                   data-options="menu:'.theme-navigate-user-panel'">匿名</a>
                <a href="#" class="easyui-linkbutton">新建</a>
                <a href="#" class="easyui-menubutton" data-options="menu:'#mm1',hasDownArrow:false">文件</a>
                <a href="#" class="easyui-menubutton" data-options="menu:'#mm2',hasDownArrow:false">编辑</a>
                <a href="#" class="easyui-menubutton" data-options="menu:'#mm3',hasDownArrow:false">消息<span
                        class="badge color-default">15</span></a>

                <select id="cc1" class="easyui-combobox theme-navigate-combobox" name="dept" style="width:120px;">
                    <option>选择样式</option>
                    <option>Insdep</option>
                    <option>Bootstrap</option>
                    <option>Gray</option>
                    <option>Metro</option>
                    <option>Material</option>
                </select>

                <div id="mm1" class="theme-navigate-menu-panel">
                    <div>新建</div>
                    <div>打开</div>
                    <div>
                        <span>打开最近文件</span>
                        <div>
                            <div>1 index.html</div>
                            <div>2 calendar-custom.html</div>
                            <div>3 combo-animation.html</div>
                            <div>4 datebox-restrict.html</div>
                            <div>5 datetimespinner-icon.html</div>
                            <div>6 filebox-button-align.html</div>
                            <div>7 menubutton-alignment.html</div>
                            <div>8 messager-interactive.html</div>
                            <div>9 propertygrid-group-format.html</div>
                            <div class="menu-sep"></div>
                            <div>启动时重新打开文件</div>
                        </div>
                    </div>
                    <div>关闭</div>
                    <div>全部关闭</div>
                    <div class="menu-sep"></div>
                    <div data-options="disabled:true,iconCls:'icon-save'">保存</div>
                    <div>另存为</div>
                    <div data-options="disabled:true">保存为全部</div>
                    <div class="menu-sep"></div>
                    <div>
                        <span>导入</span>
                        <div>
                            <div>XML 到模板</div>
                            <div>表格式数据</div>
                            <div data-options="disabled:true">Word 文档</div>
                            <div data-options="disabled:true">Excel 文档</div>
                        </div>
                    </div>
                    <div>
                        <span>导出</span>
                        <div>
                            <div>表格</div>
                        </div>
                    </div>
                    <div class="menu-sep"></div>
                    <div>退出</div>
                </div>

                <div id="mm2" class="theme-navigate-menu-panel">
                    <div>撤销</div>
                    <div data-options="disabled:true">重做</div>
                    <div class="menu-sep"></div>
                    <div>剪切</div>
                    <div>复制</div>
                    <div data-options="disabled:true">粘贴</div>
                    <div data-options="disabled:true">选择性粘贴</div>
                    <div data-options="disabled:true">清除</div>
                    <div class="menu-sep"></div>
                    <div>全选</div>
                    <div>选择父标签</div>
                    <div>选择子标签</div>
                    <div class="menu-sep"></div>
                    <div>查找和替换</div>
                    <div>查找所选</div>
                    <div>查找下一个</div>
                    <div class="menu-sep"></div>
                    <div>快捷键</div>
                    <div>首选项</div>
                </div>

                <div id="mm3" class="theme-navigate-menu-panel" style="width:180px;">
                    <div>产品消息<span class="badge color-success">5</span></div>
                    <div>安全消息<span class="badge color-important">10</span></div>
                    <div>服务消息</div>
                    <div class="menu-sep"></div>
                    <div>查看历史消息</div>
                    <div class="menu-sep"></div>
                    <div>清除消息提示</div>
                </div>


                <div class="theme-navigate-user-panel">
                    <dl>
                        <dd>
                            <img src="../../../themes/insdep/images/portrait86x86.png" width="86" height="86">
                            <b class="badge-prompt">匿名<i class="badge color-important">10</i></b>
                            <span>examples@insdep.com</span>
                            <p>安全等级：<i class="text-success">高</i></p>
                        </dd>
                        <dt>
                            <a class="theme-navigate-user-modify">修改资料</a>
                            <a class="theme-navigate-user-logout">注销</a>
                        </dt>
                    </dl>
                </div>
            </div>
            <div class="right">
                <select id="cc2" class="easyui-combobox theme-navigate-combobox" name="dept" style="width:180px;">
                    <option>Choose a language</option>
                    <option>Chinese</option>
                    <option>English</option>
                    <option>Korean</option>
                    <option>Japanese</option>
                    <option>Arabic</option>
                </select>
                <input class="easyui-searchbox theme-navigate-search"
                       data-options="prompt:'输入搜索的关键词..',menu:'#mm',searcher:doSearch" style="width:300px"></input>
                <a href="#" class="easyui-menubutton theme-navigate-more-button"
                   data-options="menu:'#more',hasDownArrow:false"></a>
                <div id="more" class="theme-navigate-more-panel">
                    <div>联系我们</div>
                    <div>参与改进计划</div>
                    <div>检测更新</div>
                    <div>关于</div>
                </div>
                <div id="mm" class="theme-navigate-menu-panel">
                    <div data-options="name:'all'">全部内容</div>
                    <div data-options="name:'sports'">标题</div>
                    <div data-options="name:'sports'">作者</div>
                    <div data-options="name:'sports'">内容</div>
                </div>
            </div>
        </div>

    </div>

    <!--开始左侧菜单-->
    <div data-options="region:'west',border:false,bodyCls:'theme-left-layout'" style="width:200px;">


        <!--正常菜单-->
        <div class="theme-left-normal">
            <!--theme-left-switch 如果不需要缩进按钮，删除该对象即可-->
            <div class="left-control-switch theme-left-switch"><i class="fa fa-chevron-left fa-lg"></i></div>

            <!--start class="easyui-layout"-->
            <div class="easyui-layout" data-options="border:false,fit:true">
                <!--start region:'north'-->
                <div data-options="region:'north',border:false" style="height:100px;">
                    <!--start theme-left-user-panel-->
                    <div class="theme-left-user-panel">
                        <dl>
                            <dt>
                                <img src="../../../themes/insdep/images/portrait86x86.png" width="43" height="43">
                            </dt>
                            <dd>
                                <b class="badge-prompt">匿名 <i class="badge color-important">10</i></b>
                                <span>examples</span>
                                <p>安全等级：<i class="text-success">高</i></p>
                            </dd>

                        </dl>
                    </div>
                    <!--end theme-left-user-panel-->
                </div>
                <!--end region:'north'-->

                <!--start region:'center'-->
                <div data-options="region:'center',border:false">

                    <!--start easyui-accordion-->
                    <div class="easyui-accordion" data-options="border:false,fit:true">
                        <div title="公共信息">
                            <ul class="easyui-datalist" data-options="border:false,fit:true">
                                <li>企业文化</li>
                                <li>公文</li>
                                <li>新闻公告</li>
                                <li>重大信息</li>
                            </ul>
                        </div>
                        <div title="个人事务">
                            <ul class="easyui-datalist" data-options="border:false,fit:true">
                                <li>内部邮件</li>
                                <li>我的日志</li>
                                <li>我的提醒</li>
                            </ul>
                        </div>
                        <div title="通讯录"></div>
                        <div title="流程中心">
                            <ul class="easyui-datalist" data-options="border:false,fit:true">
                                <li>启动流程</li>
                                <li>待办流程</li>
                                <li>我发起的流程</li>
                            </ul>
                        </div>
                        <div title="文档中心"></div>
                        <div title="个人设置">
                            <ul class="easyui-datalist" data-options="border:false,fit:true">
                                <li>修改密码</li>
                            </ul>
                        </div>

                    </div>
                    <!--end easyui-accordion-->

                </div>
                <!--end region:'center'-->
            </div>
            <!--end class="easyui-layout"-->

        </div>
        <!--最小化菜单-->
        <div class="theme-left-minimal">
            <ul class="easyui-datalist" data-options="border:false,fit:true">
                <li><i class="fa fa-home fa-2x"></i>
                    <p>主题</p></li>
                <li><i class="fa fa-book fa-2x"></i>
                    <p>组件</p></li>
                <li><i class="fa fa-pencil fa-2x"></i>
                    <p>编辑</p></li>
                <li><i class="fa fa-cog fa-2x"></i>
                    <p>设置</p></li>
                <li><a class="left-control-switch"><i class="fa fa-chevron-right fa-2x"></i>
                    <p>打开</p></a></li>
            </ul>
        </div>

    </div>
    <!--结束左侧菜单-->

    <div data-options="region:'center',border:false,href:'info.jsp'" id="control"
         style="padding:20px; background:#fff;">

    </div>
</div>


<script>
    $(function () {




        /*布局部分*/
        $('#master-layout').layout({
            fit: true/*布局框架全屏*/
        });


        /*右侧菜单控制部分*/

        var left_control_status = true;
        var left_control_panel = $("#master-layout").layout("panel", 'west');

        $(".left-control-switch").on("click", function () {
            if (left_control_status) {
                left_control_panel.panel('resize', {width: 70});
                left_control_status = false;
                $(".theme-left-normal").hide();
                $(".theme-left-minimal").show();
            } else {
                left_control_panel.panel('resize', {width: 200});
                left_control_status = true;
                $(".theme-left-normal").show();
                $(".theme-left-minimal").hide();
            }
            $("#master-layout").layout('resize', {width: '100%'})
        });

        /*右侧菜单控制结束*/


        $(".theme-navigate-user-modify").on("click", function () {
            $('.theme-navigate-user-panel').menu('hide');
            $.insdep.window({id: "personal-set-window", href: "user.html", title: "修改资料"});

        });
        //$.insdep.control("list.html");


        var cc1 = $('#cc1').combo('panel');
        cc1.panel({cls: "theme-navigate-combobox-panel"});
        var cc2 = $('#cc2').combo('panel');
        cc2.panel({cls: "theme-navigate-combobox-panel"});


        /*$("#open-layout").on("click",function(){
                var option = {
                    "region":"west",
                    "split":true,
                    "title":"title",
                    "width":180
                };
                $('#master-layout').layout('add', option);

        });*/


    });

    function doSearch(value, name) {
        alert('You input: ' + value + '(' + name + ')');
    }

</script>

<!--第三方插件加载-->
<script src="${pageContext.request.contextPath}/jquery-easyui-1.5/plugin/justgage-1.2.2/raphael-2.1.4.min.js"></script>
<script src="${pageContext.request.contextPath}/jquery-easyui-1.5/plugin/justgage-1.2.2/justgage.js"></script>


<script src="${pageContext.request.contextPath}/jquery-easyui-1.5/plugin/Highcharts-5.0.0/js/highcharts.js"></script>


<script type="text/javascript"
        src="${pageContext.request.contextPath}/jquery-easyui-1.5/plugin/ueditor-1.4.3.3/ueditor.config.js"></script>
<script type="text/javascript"
        src="${pageContext.request.contextPath}/jquery-easyui-1.5/plugin/ueditor-1.4.3.3/ueditor.all.min.js"></script>


<link href="${pageContext.request.contextPath}/jquery-easyui-1.5/plugin/cropper-2.3.4/dist/cropper.min.css"
      rel="stylesheet" type="text/css">
<script src="${pageContext.request.contextPath}/jquery-easyui-1.5/plugin/cropper-2.3.4/dist/cropper.min.js"></script>


<!--第三方插件加载结束-->

</body>
</html>
