<%@ page contentType="text/html; charset=utf-8"%>
<%@ include file="/common/include/taglib.jsp"%>
<ft:html title="${sysTitle}" showLoading="false" exportParams="true" isSubPage="false" jqueryEnabled="true">
<ft:ext.myux uxType="virtualkeyboard"/>
<body style="background-image : url(<%=request.getContextPath() + "/resource/image" + request.getContextPath() + "/login_background.jpg"%>);background-repeat : repeat-x-y;background-position: center top;background-attachment: fixed;">
<ft:import src="/system/admin/js/login.js" />
	<div id="hello-win" class="x-hidden">
	<div id="hello-tabs"><img border="0" width="450" height="70"
		src="<%=request.getAttribute("bannerPath") == null ? request.getContextPath() + "/resource/image" + request.getContextPath() + "/login_banner.png" : request.getAttribute("bannerPath")%>" />
	</div>
	</div>
	<div id="aboutDiv" class="x-hidden"
		style='color: black; padding-left: 10px; padding-top: 10px; font-size: 12px'>
	<br> 开发人员信息:<a
			href="mailto:bluefuxianwu@gmail.com" target="">******@gmail.com</a>
			<br><br><br>
			如果您有什么建议或者需要什么功能,请通过以上邮件联系开发人员.
	</div>
	<div id="infoDiv" class="x-hidden"
		style='color: black; padding-left: 10px; padding-top: 10px; font-size: 12px'>
	<br><br>
	智能工艺知识库系统由四川大学制造学院开发，目前处于系统测试阶段，建议使用IE浏览器登陆，初始帐号为ipv6，密码为1，请登陆后及时修改密码，在使用中过程中如果发现任何问题请向开发团队反馈。<br>
	</div>
</body>
</ft:html>