//node-manager js
// 增加服务事件
$('#add_servers').click(function(){
  $('#add_server_modal').modal('show');
});
//保存服务事件
$('.add_servers_save').click(function(){

});


// Mcrouter js
$("#add_mcrouter").click(function(){
  $('#add_mcrouter_modle').modal('show');
});
$(".add_servers_mcrouter").click(function(){
  if("请求成功"){
    var mcrouter_list=`
    <tr>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    </tr>`;
    $(".add_mcrouter_list").append(mcrouter_list);
  }
});

// memcached js
$("#add_memcached").click(function(){  //点击添加的时候
  console.log(1);
  $('#add_memcached_modle').modal('show');
});
$(".add_servers_memcached").click(function(){
  if("请求成功"){
    var memcached_list=`
    <tr>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>
        <button type="button" class="btn btn-primary">
          修改<i class="fa fa-pencil-square-o">
        </i>
      </button>
      <button type="button" class="btn btn-default">
         启动<i class="fa fa-heart">
        </i>
      </button>
      <button type="button" class="btn btn-success">
        查看<i class="fa fa-exclamation-circle">
        </i>
      </button>
    </td>
    </tr>`;
    $(".add_memcached_list").append(memcached_list);
  }
});
// getNode js
