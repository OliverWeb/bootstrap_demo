$(function () {
	/*获取链接*/
	var url = window.location.search;
//    alert(url.length);
//    alert(url.lastIndexOf('='));
	console.log(url);
	var mcrouerIpsIndex=url.indexOf('mcrouerIps');
	if(mcrouerIpsIndex!=-1){
		url=url.substring(mcrouerIpsIndex);
		var 	IpsIndex=url.indexOf("&");
		if(IpsIndex!=-1){
			var IpValur=url.substring("mcrouerIps".length+1,IpsIndex);
		}else{
			var IpValur=url.substring("mcrouerIps".length+1);
		}
		$('.ipValue').html("mcrouter服务器 IP:"+IpValur);      //进行ip赋值
		/*赋值结束 end*/
	}

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


});

