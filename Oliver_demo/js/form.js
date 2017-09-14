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
// 添加路由前缀名称的一条数据
$(".add_server_btn").click(function(){
  var add_server_html=`<tr>
    <td>
      <form class="form-inline" style="display:inline-block;">
          <div class="form-group">
            <select class="selectpicker" data-live-search="true" title="===请选择=== ">
              <option>Hot Dog, Fries and a Soda</option>
              <option>Burger, Shake and a Smile</option>
              <option>Sugar, Spice and all things nice</option>
              <option>Baby Back Ribs</option>
              <option>dsfssdfedf</option>
            </select>
          </div>
        </form>
      <a href="javascript:;">
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

        <form class="form-inline" style="display:inline-block;">
            <div class="form-group">
              <select  class="selectpicker" data-live-search="true" title="===请选择=== ">
                <option>Hot Dog, Fries and a Soda</option>
                <option>Burger, Shake and a Smile</option>
                <option>Sugar, Spice and all things nice</option>
                <option>Baby Back Ribs</option>
                <option>dsfssdfedf</option>
              </select>
            </div>
          </form>
        <a href="javascript:;" class="delete_backup">
            <span class="label label-danger">删除备份</span>
        </a>

      </div>

    </td>
  </tr>`;
  $(".add_server_one_body").append(add_server_html);

  $("#scriptjs").remove();
  var script = document.createElement("script");
  script.src = "js/bootstrap-select.js";

  document.body.appendChild(script);
  $("#scriptjs").remove();
  var script = document.createElement("script");
  script.src = "js/bootstrap-select.js";
  document.body.appendChild(script);

   $("#scriptjs").remove();
   var script = document.createElement("script");
   script.src = "js/bootstrap-select.js";
   document.body.appendChild(script);

});
