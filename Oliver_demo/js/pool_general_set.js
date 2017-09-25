                                                                        //  todo 常规设置
var pageContext = document.location.pathname.substr(0,document.location.pathname.substr(1).indexOf("/")+1);   //获取的根路径操作
//页面加载的时候进行请求数据
$(function () {
	$.ajax({
		type: "get",
		dataType: "json", //服务端接收的数据类型
		url: "./json/router.json",               // 用常规设置获取进行请求地址(用户查看信息)  变量：pageContext
		success: function(data) {
			console.log(data);
			var general_set_data=`<div class="adv-table editable-table ">
              <table class="table table-striped table-hover table-bordered"  align="center">
                <caption class="mcrouter_title">路由前缀</caption>
                <tbody>
                  <tr>
                    <td class="" style="width:20%;">路由前缀名称</td>
                    <td class="" style="text-align:left;">
                      <div class="" style="width:30%;display:inline-block;">
                          <input class="form-control" type="text" id="route prefix_title" value=${data.route_prefix_title} placeholder="请输入名称">
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table class="table table-striped table-hover table-bordered"  align="center">
                <caption class="mcrouter_title">默认路由配置</caption>
                <tbody>
                  <tr>
                    <td class="" style="width:20%;" rowspan="2" >路由操作</td>
                    <td class="" style="text-align:left;">
                    <table class="add_server_one">

                      <tbody class="add_server_one_body" id="route_operate">
                        <tr>
                          <td style="padding-left:0;">
                            <form role="form" style="display:inline-block">
                              	<div class="form-group" style="margin-bottom:0;height:100px;overflow-y:auto; ">
                              		<select class="form-control" style="width:230px;text-align:center;">
                              			<option>1</option>
                              			<option>2</option>
                              			<option>3</option>
                              			<option>4</option>
                              			<option>5</option>
                              			<option>1</option>
                              			<option>2</option>
                              			<option>3</option>
                              			<option>4</option>
                              			<option>5</option>
                              			<option>1</option>
                              			<option>2</option>
                              			<option>3</option>
                              			<option>4</option>
                              			<option>5</option>
                              		</select>

                              	</div>
                              </form>
                            <a href="javascript:;" class="dele_row">
                                <span class="label label-danger">Delete</span>
                            </a>
                            

                          </td>
                        </tr>

                      </tbody>
                    </table>
                    </td>
                  </tr>
                  <tr>

                    <td style="text-align:left;">
                      <a href="javascript:;" class="add_server_btn">
                        <span class="label label-success" >添加服务器</span>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="strategy_box">

                  <div class="mcrouter_title">操作策略</div >

                <table class="add_strategy_box table table-striped table-hover table-bordered"  align="center">
                  <tbody id="operate_policy">
                    <tr>
                      <td class="" style="width:20%;">路由前缀</td>
                      <td class="" style="text-align:left;">
                        <div class="" style="width:30%;display:inline-block;">
                            <input class="form-control" type="text" id="pool_name" value="" placeholder="请输入名称">
                        </div>
                    </tr>
                    <tr>
                      <td>操作路由池</td>
                      <td>
                       <table>
                         <tr>
                           <td>
                             <table class="add_server_one">

                               <tbody class="add_server_one_body">
                                 <tr>
                                   <td style="padding-left:0;">
                                     <form role="form" style="display:inline-block">
                                       	<div class="form-group" style="margin-bottom:0;">
                                       		<select class="form-control" style="width:230px;text-align:center;">
                                       			<option>1</option>
                                       			<option>2</option>
                                       			<option>3</option>
                                       			<option>4</option>
                                       			<option>5</option>
                                       		</select>

                                       	</div>
                                       </form>
                                     <a href="javascript:;" class="dele_row">
                                         <span class="label label-danger">Delete</span>
                                     </a>
                                     
                                   </td>
                                 </tr>

                               </tbody>
                             </table>
                           </td>
                         </tr>
                         <tr>

                           <td style="text-align:left;">
                             <a href="javascript:;" class="add_server_btn">
                               <span class="label label-success" >添加服务器</span>
                             </a>
                           </td>
                         </tr>

                       </table>
                      </td>
                    </tr>
                    <tr >
                      <td colspan="2">
                        <a href="javascript:;" class="dele_row">
                            <span class="label label-danger">删除该策略</span>
                        </a></td>
                    </tr>
                  </tbody>
                </table>

              </div>
              <a href="javascript:;" class="add_strategy">
              <span class="label label-success">添加策略</span>
              </a>
              <a href="javascript:;" class="add_strategy">
                <span class="label label-success">保存</span>
              </a>
            </div>`;
			$(".general_set_box").append(general_set_data);
		},
		error: function() {
			console.log("常规设置请求异常");
		}
	});
});

// 表单的增加备份
$('body').on('click',".add_backup",function(){
  //$('.add_backup>span').removeClass("label-success").addClass("label-primary");
  $(this).next().css("display","inline-block");
});
//表单的删除的备份事件
$("body").on('click',".delete_backup",function(){

  $(this).parent().css("display","none");
});
//删除整行
$('body').on("click",".delte_row",function(){
    $(this).parent().parent().remove();
});
// 添加路由前缀名称的一条数据
$(".add_server_btn").click(function(){
  var add_server_html=`<tr>
    <td style="padding-left:0;">
      <form role="form" style="display:inline-block">
          <div class="form-group" style="margin-bottom:0;">
            <select class="form-control" style="width:230px;text-align:center;">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>

          </div>
        </form>
      <a href="javascript:;" class="delte_row">
          <span class="label label-danger">Delete</span>
      </a>
    </td>
  </tr>`;
  console.log($(this).parent().parent().prev().find(".add_server_one_body").append(add_server_html));
});
//删除该策略
$("body").on('click','.dele_row',function(){
  $(this).parent().parent().parent().parent().remove();
});
//添加策略
$('.add_strategy').click(function(){
  var addstrategy=`<table class="add_strategy_box table table-striped table-hover table-bordered"  align="center">
    <tbody>
      <tr>
        <td class="" style="width:20%;">路由前缀</td>
        <td class="" style="text-align:left;">
          <div class="" style="width:30%;display:inline-block;">
              <input class="form-control" type="text" name="id" value="" placeholder="请输入名称">
          </div>
      </tr>
      <tr>
        <td>操作路由池</td>
        <td>
         <table>
           <tr>
             <td>
               <table class="add_server_one">

                 <tbody class="add_server_one_body">
                   <tr>
                     <td style="padding-left:0;">
                       <form role="form" style="display:inline-block">
                          <div class="form-group" style="margin-bottom:0;">
                            <select class="form-control" style="width:230px;text-align:center;">
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </select>

                          </div>
                         </form>
                       <a href="javascript:;" class="dele_row">
                           <span class="label label-danger">Delete</span>
                       </a>
                     </td>
                   </tr>

                 </tbody>
               </table>
             </td>
           </tr>
           <tr>

             <td style="text-align:left;">
               <a href="javascript:;" class="add_server_btn">
                 <span class="label label-success" >添加服务器</span>
               </a>
             </td>
           </tr>

         </table>
        </td>
      </tr>
      <tr >
        <td colspan="2">
          <a href="javascript:;" class="dele_row">
              <span class="label label-danger">删除该策略</span>
          </a></td>
      </tr>
    </tbody>
  </table>`;
  $(".strategy_box").append(addstrategy);
});
