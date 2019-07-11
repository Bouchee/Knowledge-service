#if(${doctypeEnable} == "true")
	<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
#end
<html>
	<head>
		<!-- <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7,IE=EmulateIE8" /> -->
		<title>${title}</title>
		<meta http-equiv="keywords" content="">
			<meta http-equiv="content-type" content="text/html; charset=UTF-8">
			<meta http-equiv="content-script-type" content="text/javascript">
				<meta http-equiv="description" content="">
					<meta http-equiv="pragma" content="no-cache">
						<meta http-equiv="cache-control" content="no-cache, must-revalidate">
							<!-- todo 控制页面强制更新<meta http-equiv="expires" content="-1"> -->
							<link rel="shortcut icon" href="${contextPath}/resource/image${contextPath}/${titleIcon}" />
							#if(${extDisabled} == "false")
								<link rel="stylesheet" type="text/css" href="${contextPath}/resource/css/ext_icon.css"/>
								<link rel="stylesheet" type="text/css" href="${contextPath}/resource/theme/${theme}/resources/css/ext-all-min.css"/>
								<script type="text/javascript" src="${contextPath}/resource/extjs/adapter/ext/ext-base-min.js"></script>
								<script type="text/javascript" src="${contextPath}/resource/extjs/ext-all-min.js"></script>
								<link rel="stylesheet" type="text/css" href="${contextPath}/resource/css/ext_css_patch.css" />
								<script type="text/javascript" src="${contextPath}/resource/extjs/src/locale/ext-lang-zh_CN.js"></script>
							#end
							#if(${jqueryEnabled} == "true")
								<script type="text/javascript" src="${contextPath}/resource/jquery/jquery-1.3.2.js"></script>
							#end
							#if(${uxEnabled} == "true")
								<script type="text/javascript" src="${contextPath}/resource/extjs/ux/ux-all-min.js"></script>
								<link rel="stylesheet" type="text/css" href="${contextPath}/resource/extjs/ux/css/ux-all-min.css"/>
							#end
							#if(${fcfEnabled} == "true")
								<script type="text/javascript" src="${contextPath}/resource/commonjs/fusionCharts.js"></script>
							#end
							#if(${pinyinFilter} == "true")
								<script type="text/javascript" src="${contextPath}/resource/commonjs/pinyinFilter.js"></script>
							#end
							<link rel="stylesheet" type="text/css" href="${contextPath}/resource/css/systemFunction.css"/>

							<!--<script type="text/javascript" src="${contextPath}/resource/commonjs/zeroclipboard/ZeroClipboard.js"></script>-->
							<script type="text/javascript" src="${contextPath}/resource/commonjs/systemFunction.js"></script>
							<script type="text/javascript">
								Ext.state.Manager.setProvider(new Ext.state.CookieProvider({
									expires: new Date(new Date().getTime()+(1000*60*60*24*31))
								}));
								var webContext = '${contextPath}';
								var sst = '${sst}';
								var grf = ${grf};
								var rhwf = ${rhwf};
								var gdlf = ${gdlf};
								var runMode = '${runMode}';
								var ajaxErrCode = '${ajaxErrCode}';
								var micolor = 'color:${micolor};';
								var fucolor = 'color:${fucolor};';
								var cln = ${cln};
								var mll = ${mll};
								var mlm = ${mlm};
								var mlh = ${mlh};
								var sf = ${sf};
								Ext.QuickTips.init();
								Ext.form.Field.prototype.msgTarget = '${formValidationMessageLocation}';
								Ext.BLANK_IMAGE_URL = '${contextPath}/resource/image/ext/s.gif';
								Ext.Ajax.on('requestexception', function(conn, response, options) {
								if (response.status == ajaxErrCode) {
								setTimeout(function(){
								top.Ext.MessageBox.alert('提示', '会话丢失(可能原因:1.长时间未操作;2.Web服务容器重启),您将被强制重定向到登录页面!', function() {
								parent.location.href = webContext + '/login.html';
								});
								},200);
								}else if (response.status == '998') {
								setTimeout(function(){
								top.Ext.MessageBox.alert('提示', '您的会话连接由于在其它窗口上被注销而失效,系统将把您强制重定向到登录界面.', function() {
								parent.location.href = webContext + '/login.html';
								});
								},200);
								}else if (response.status == -1) {
								setTimeout(function(){
								top.Ext.MessageBox.alert('提示', '请求失败,超时或服务器无响应.', function() {
								});
								},200);
								}else{
								parent.showException(response.responseText);
								}
								});
								#if(${exportParams} == "true")
									#foreach($param in $paramList)var ${param.paramkey}='${param.paramvalue}';#end
								#end
								#if(${exportUserinfo} == "true")
									var userid = '${userInfo.getUserid()}';
									var username = '${userInfo.getUsername()}';
									var account = '${userInfo.getAccount()}';
									var deptid = '${userInfo.getDeptid()}';
									var customId = '${userInfo.getCustomId().trim()}';
									var theme = '${userInfo.getTheme()}';
									var explorer = '${userInfo.getExplorer()}';
								#end
								#if(${isSubPage} == "true")
									#if(${urlSecurity}=="1" && ${urlSecurity2}=="true")
										window.onload=function(){
										if(parent.userid != '${userInfo.getUserid()}'){
										top.Ext.MessageBox.alert('提示', '这是一个非法请求或者您的会话连接由于在其它窗口上被注销而失效,系统将把您强制重定向到登录界面.', function() {
										parent.window.location.href = webContext + '/login.html';
										});
										}
										};
									#end
									Ext.Ajax.on('beforerequest', function(conn, opts) {
									Ext.Ajax.extraParams={'loginuserid':parent.userid};
									});
									#else
										Ext.Ajax.on('beforerequest', function(conn, opts) {
										if(window.userid) Ext.Ajax.extraParams={'loginuserid':userid};
										});
								#end
								#if(${exportExceptionWindow} == "true")
									function showException(strMsg) {
									var arr = EXCEPTION_CLIENT_WIN_SIZE.split(',');
									var shortWindow = new Ext.Window({
									title : '<span class="commoncss">系统发生错误</span>',
									layout : 'fit',
									iconCls : 'exclamationIcon',
									width : arr[0],
									height : arr[1],
									animateTarget : Ext.getBody(),
									closable : true,
									closeAction : 'close',
									collapsible : false,
									modal : true,
									maximizable : false,
									border : false,
									constrain : true,
									items : [new Ext.Panel({
									html : EXCEPTION_CLIENT_MSG,
									style : "font-size: 13px;",
									autoScroll : true
									})],
									buttons : [{
									text : '更多信息',
									iconCls : 'previewIcon',
									handler : function() {
									var detailWindow = new Ext.Window({
									title : '<span class="commoncss">系统运行时异常堆栈详细信息</span>',
									layout : 'fit',
									iconCls : 'previewIcon',
									width : document.body.clientWidth - 300,
									height : document.body.clientHeight - 150,
									animateTarget : Ext.getBody(),
									closable : true,
									closeAction : 'close',
									collapsible : false,
									modal : true,
									maximizable : true,
									border : false,
									constrain : false,
									buttons:[{
									text : '关闭',
									iconCls : 'deleteIcon',
									handler : function() {
									detailWindow.hide();
									}
									}],
									items : [new Ext.Panel({
									html : strMsg,
									style : "font-size: 13px;",
									autoScroll : true
									})]
									}).show();
									}
									},{
									text : '关闭',
									iconCls : 'deleteIcon',
									handler : function() {
									shortWindow.close();
									}
									}]
									}).show();
									}
								#end
							</script>
</head>
#if(${showLoading} == "true")
	<style type="text/css">
		#loading-mask {
		Z-INDEX: 20000;
		LEFT: 0px;
		WIDTH: 100%;
		POSITION: absolute;
		TOP: 0px;
		HEIGHT: 100%;
		BACKGROUND-COLOR: white
		}
		#loading {
		PADDING-RIGHT: 2px;
		PADDING-LEFT: 2px;
		Z-INDEX: 20001;
		LEFT: 32%;
		PADDING-BOTTOM: 2px;
		PADDING-TOP: 2px;
		POSITION: absolute;
		TOP: 40%;
		HEIGHT: auto
		}
		#loading IMG {
		MARGIN-BOTTOM: 5px
		}
		#loading .loading-indicator {
		PADDING-RIGHT: 10px;
		PADDING-LEFT: 10px;
		BACKGROUND: white;
		PADDING-BOTTOM: 10px;
		MARGIN: 0px;
		FONT: 12px 宋体, arial, helvetica;
		COLOR: #555;
		PADDING-TOP: 10px;
		HEIGHT: auto;
		TEXT-ALIGN: center
		}
	</style>
	<script type="text/javascript">
		Ext.EventManager.on(window, 'load', function(){
		setTimeout(
		function() {
		Ext.get('loading').remove();
		Ext.get('loading-mask').fadeOut({remove:true});
		}, 1);
		});
	</script>
	<DIV id=loading-mask></DIV>
	<DIV id=loading>
		<DIV class=loading-indicator><IMG style="MARGIN-RIGHT: 5px"
				height=16
				src="${contextPath}/resource/image/ajax.gif"
				width=16 align=absMiddle>${pageLoadMsg}</DIV>
		</DIV>
#end
