// 常规设置
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
      <a href="javascript:;" class="add_backup">
          <span class="label label-success">添加备份</span>
      </a>
      <div style="display:none;"  class="add_backup_box">
        <span style="color:#72d0eb;display:inline-block;">备份比例</span>
        <div class="" style="display:inline-block; width:150px;">
          <div class="progress progress-striped active" style="margin-bottom:-3%;">
            <div class="progress-bar progress-bar-success" role="progressbar"
               aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
               style="width: 10%;">
              <span class="sr-only">10% 完成</span>
            </div>
          </div>
        </div>

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
        <a href="javascript:;" class="delete_backup">
            <span class="label label-danger">删除备份</span>
        </a>

      </div>

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
                       <a href="javascript:;" class="add_backup">
                           <span class="label label-success">添加备份</span>
                       </a>
                       <div style="display:none;"  class="add_backup_box">
                         <span style="color:#72d0eb;display:inline-block;">备份比例</span>
                         <div class="" style="display:inline-block; width:150px;">
                           <div class="progress progress-striped active" style="margin-bottom:-3%;">
                             <div class="progress-bar progress-bar-success" role="progressbar"
                                aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
                                style="width: 10%;">
                               <span class="sr-only">10% 完成</span>
                             </div>
                           </div>
                         </div>

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
                         <a href="javascript:;" class="delete_backup">
                             <span class="label label-danger">删除备份</span>
                         </a>

                       </div>

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
