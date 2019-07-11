<%@ page contentType="text/html; charset=utf-8"%>
<%@ include file="/common/include/taglib.jsp"%>
<ft:html title="UI组件角色授权">
<ft:import src="/system/admin/js/uirole.js" />
<ft:body>
	<ft:div key="deptTreeDiv"></ft:div>
	<ft:ext.codeRender fields="CMPTYPE" />
	<ft:ext.codeStore fields="CMPTYPE" />
	<ft:ext.codeRender fields="PARTAUTHTYPE" />
	<ft:ext.codeStore fields="PARTAUTHTYPE" />
</ft:body>
<ft:script>
   var root_deptid = '<ft:out key="rootDeptid" scope="request" />';
   var root_deptname = '<ft:out key="rootDeptname" scope="request" />';
   var root_menuname = '<ft:out key="rootMenuName" scope="request" />';
</ft:script>
</ft:html>