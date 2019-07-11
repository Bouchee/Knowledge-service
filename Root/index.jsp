<%@ page contentType="text/html; charset=utf-8"%>
<%@ include file="/common/include/taglib.jsp"%>
<ft:html title="${sysTitle}" showLoading="false" exportParams="true"
	isSubPage="false" exportExceptionWindow="true" exportUserinfo="true">
<ft:import src="/resource/commonjs/extTabCloseMenu.js" />
<ft:import src="/system/admin/js/index.js" />
<ft:ext.codeStore fields="SEX" />
<ft:body>
	<ft:arm.Viewport northTitle="${sysTitle}" westTitle="${westTitle}" />
</ft:body>
</ft:html>