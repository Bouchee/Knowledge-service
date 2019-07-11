<%@ page contentType="text/html; charset=utf-8"%>
<%@ include file="/common/include/taglib.jsp"%>
<ft:html title="角色管理与授权">
<ft:import src="/system/admin/js/role.js"/>
<ft:ext.codeRender fields="ROLETYPE,LOCKED"  />
<ft:ext.codeStore fields="LOCKED,ROLETYPE:3"/>
<ft:body>
<ft:div key="deptTreeDiv"></ft:div>
</ft:body>
<ft:script>
   var root_deptid = '<ft:out key="rootDeptid" scope="request"/>';
   var root_deptname = '<ft:out key="rootDeptname" scope="request"/>';
   var login_account = '<ft:out key="login_account" scope="request"/>';
</ft:script>
</ft:html>