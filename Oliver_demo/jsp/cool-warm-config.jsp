<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
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
<script type="text/javascript"
	src="${pageContext.request.contextPath}/jquery-easyui-1.5/constant.js"></script>
 <script type="text/javascript"
	src="${pageContext.request.contextPath}/js/cool-warm-config.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/pool.js"></script>
<style>
.key{
text-align: right;
}
.value{
text-align: left;
}
</style>
</head>
<body>


		<div style="width: 80%; text-align: left;">
			<a href="javascript:void(0)" class="easyui-linkbutton"
				iconcls="icon-reload" plain="true"
				onclick="javascript:window.location.reload()">刷新</a>
		</div>

		<!-- <table align="center" border="1" width="100%" id="pools">
			<caption><b><font color="red" >/pools [服务器池配置]</font></b></caption>
			<tr>
				<th width="30%">池名称</th>
				<th>池列表</th>
			</tr>
			
			<tr>
				<td colspan="2"><input type="button" value="添加池" /></td>
			</tr>
		</table>
		<br/>
		<br/> -->
		
		<table  align="center" border="1" width="100%" id="routes">
			<caption><b><font color="red" >/routes [路由配置]</font></b></caption>
			<tr><td width="30%" class="key">/routes/aliases [路由前缀]</td><td class="value"><span class="editable" ><input/></span></td></tr>
			<tr><td class="key">/routes/route/type [路由类型]</td><td class="value"><select><option value='AllAsyncRoute'>AllAsyncRoute</option><option value='LatestRoute'>LatestRoute</option><option value='AllFastestRoute'>AllFastestRoute</option><option value='AllInitialRoute'>AllInitialRoute</option><option value='AllMajorityRoute'>AllMajorityRoute</option><option value='AllSyncRoute'>AllSyncRoute</option><option value='FailoverRoute'>FailoverRoute</option><option value='ErrorRoute'>ErrorRoute</option><option value='FailoverWithExptimeRoute'>FailoverWithExptimeRoute</option><option value='HashRoute'>HashRoute</option><option value='HostIdRoute'>HostIdRoute</option><option value='MigrateRoute'>MigrateRoute</option><option value='MissFailoverRoute'>MissFailoverRoute</option><option value='ModifyExptimeRoute'>ModifyExptimeRoute</option><option value='NullRoute'>NullRoute</option><option value='PrefixSelectorRoute'>PrefixSelectorRoute</option><option value='PoolRoute'>PoolRoute</option><option value='OperationSelectorRoute'>OperationSelectorRoute</option><option value='RandomRoute'>RandomRoute</option><option value='WarmUpRoute'>WarmUpRoute</option></select></td></tr>			
			<tr><td colspan="2" ><input type="button" value="添加前缀路由" /></td></tr>
		</table>
		
		<br/>
		<br/>
		<table  align="center" border="1" width="100%" id="wildcard">
			<caption><b><font color="red" >/wildcard [默认路由配置]</font></b></caption>
			<tr><td width="30%" class="key">/wildcard/type [路由类型] </td><td  class="value"><select><option value='AllAsyncRoute'>AllAsyncRoute</option><option value='LatestRoute'>LatestRoute</option><option value='AllFastestRoute'>AllFastestRoute</option><option value='AllInitialRoute'>AllInitialRoute</option><option value='AllMajorityRoute'>AllMajorityRoute</option><option value='AllSyncRoute'>AllSyncRoute</option><option value='FailoverRoute'>FailoverRoute</option><option value='ErrorRoute'>ErrorRoute</option><option value='FailoverWithExptimeRoute'>FailoverWithExptimeRoute</option><option value='HashRoute'>HashRoute</option><option value='HostIdRoute'>HostIdRoute</option><option value='MigrateRoute'>MigrateRoute</option><option value='MissFailoverRoute'>MissFailoverRoute</option><option value='ModifyExptimeRoute'>ModifyExptimeRoute</option><option value='NullRoute'>NullRoute</option><option value='PrefixSelectorRoute'>PrefixSelectorRoute</option><option value='PoolRoute'>PoolRoute</option><option value='OperationSelectorRoute'>OperationSelectorRoute</option><option value='RandomRoute'>RandomRoute</option><option value='WarmUpRoute'>WarmUpRoute</option></select></td></tr>
			<tr><td class="key">/wildcard/default_policy [默认策略] </td><td  class="value"><span class="editable" ><input/></span></td></tr>
			<tr><td class="key">/wildcard/operation_policies/get/type [get操作类型] </td><td  class="value"><select><option value='AllAsyncRoute'>AllAsyncRoute</option><option value='LatestRoute'>LatestRoute</option><option value='AllFastestRoute'>AllFastestRoute</option><option value='AllInitialRoute'>AllInitialRoute</option><option value='AllMajorityRoute'>AllMajorityRoute</option><option value='AllSyncRoute'>AllSyncRoute</option><option value='FailoverRoute'>FailoverRoute</option><option value='ErrorRoute'>ErrorRoute</option><option value='FailoverWithExptimeRoute'>FailoverWithExptimeRoute</option><option value='HashRoute'>HashRoute</option><option value='HostIdRoute'>HostIdRoute</option><option value='MigrateRoute'>MigrateRoute</option><option value='MissFailoverRoute'>MissFailoverRoute</option><option value='ModifyExptimeRoute'>ModifyExptimeRoute</option><option value='NullRoute'>NullRoute</option><option value='PrefixSelectorRoute'>PrefixSelectorRoute</option><option value='PoolRoute'>PoolRoute</option><option value='OperationSelectorRoute'>OperationSelectorRoute</option><option value='RandomRoute'>RandomRoute</option><option value='WarmUpRoute'>WarmUpRoute</option></select></td></tr>
			<tr><td class="key">/wildcard/operation_policies/get/children [get操作路由池] </td><td  class="value"><table align="center"  width="100%"><tr><td><input type="button" value="添加路由池" /></td></tr></table></td></tr>
			<tr><td class="key">/wildcard/operation_policies/set/type [set操作类型] </td><td  class="value"><select><option value='AllAsyncRoute'>AllAsyncRoute</option><option value='LatestRoute'>LatestRoute</option><option value='AllFastestRoute'>AllFastestRoute</option><option value='AllInitialRoute'>AllInitialRoute</option><option value='AllMajorityRoute'>AllMajorityRoute</option><option value='AllSyncRoute'>AllSyncRoute</option><option value='FailoverRoute'>FailoverRoute</option><option value='ErrorRoute'>ErrorRoute</option><option value='FailoverWithExptimeRoute'>FailoverWithExptimeRoute</option><option value='HashRoute'>HashRoute</option><option value='HostIdRoute'>HostIdRoute</option><option value='MigrateRoute'>MigrateRoute</option><option value='MissFailoverRoute'>MissFailoverRoute</option><option value='ModifyExptimeRoute'>ModifyExptimeRoute</option><option value='NullRoute'>NullRoute</option><option value='PrefixSelectorRoute'>PrefixSelectorRoute</option><option value='PoolRoute'>PoolRoute</option><option value='OperationSelectorRoute'>OperationSelectorRoute</option><option value='RandomRoute'>RandomRoute</option><option value='WarmUpRoute'>WarmUpRoute</option></select></td></tr>
			<tr><td class="key">/wildcard/operation_policies/set/children [set操作路由池] </td><td  class="value"><table align="center"  width="100%"><tr><td><input type="button" value="添加路由池" /></td></tr></table></td></tr>
			<tr><td class="key">/wildcard/operation_policies/add/type [add操作类型] </td><td  class="value"><select><option value='AllAsyncRoute'>AllAsyncRoute</option><option value='LatestRoute'>LatestRoute</option><option value='AllFastestRoute'>AllFastestRoute</option><option value='AllInitialRoute'>AllInitialRoute</option><option value='AllMajorityRoute'>AllMajorityRoute</option><option value='AllSyncRoute'>AllSyncRoute</option><option value='FailoverRoute'>FailoverRoute</option><option value='ErrorRoute'>ErrorRoute</option><option value='FailoverWithExptimeRoute'>FailoverWithExptimeRoute</option><option value='HashRoute'>HashRoute</option><option value='HostIdRoute'>HostIdRoute</option><option value='MigrateRoute'>MigrateRoute</option><option value='MissFailoverRoute'>MissFailoverRoute</option><option value='ModifyExptimeRoute'>ModifyExptimeRoute</option><option value='NullRoute'>NullRoute</option><option value='PrefixSelectorRoute'>PrefixSelectorRoute</option><option value='PoolRoute'>PoolRoute</option><option value='OperationSelectorRoute'>OperationSelectorRoute</option><option value='RandomRoute'>RandomRoute</option><option value='WarmUpRoute'>WarmUpRoute</option></select></td></tr>
			<tr><td class="key">/wildcard/operation_policies/add/children [add操作路由池] </td><td  class="value"><table align="center"  width="100%"><tr><td><input type="button" value="添加路由池" /></td></tr></table></td></tr>
			<tr><td class="key">/wildcard/operation_policies/delete/type [delete操作类型] </td><td  class="value"><select><option value='AllAsyncRoute'>AllAsyncRoute</option><option value='LatestRoute'>LatestRoute</option><option value='AllFastestRoute'>AllFastestRoute</option><option value='AllInitialRoute'>AllInitialRoute</option><option value='AllMajorityRoute'>AllMajorityRoute</option><option value='AllSyncRoute'>AllSyncRoute</option><option value='FailoverRoute'>FailoverRoute</option><option value='ErrorRoute'>ErrorRoute</option><option value='FailoverWithExptimeRoute'>FailoverWithExptimeRoute</option><option value='HashRoute'>HashRoute</option><option value='HostIdRoute'>HostIdRoute</option><option value='MigrateRoute'>MigrateRoute</option><option value='MissFailoverRoute'>MissFailoverRoute</option><option value='ModifyExptimeRoute'>ModifyExptimeRoute</option><option value='NullRoute'>NullRoute</option><option value='PrefixSelectorRoute'>PrefixSelectorRoute</option><option value='PoolRoute'>PoolRoute</option><option value='OperationSelectorRoute'>OperationSelectorRoute</option><option value='RandomRoute'>RandomRoute</option><option value='WarmUpRoute'>WarmUpRoute</option></select></td></tr>
			<tr><td class="key">/wildcard/operation_policies/delete/children [delete操作路由池] </td><td  class="value"><table align="center"  width="100%"> <tr><td><input type="button" value="添加路由池" /></td></tr></table></td></tr>
		</table>
		<br/>
		<br/>
<input type="button" value="update" onclick="update()" />


<h1></h1>

</body>


</html>