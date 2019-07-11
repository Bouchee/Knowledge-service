<%@ page contentType="text/html; charset=utf-8"%>
<%@ include file="/common/include/taglib.jsp"%>
<ft:html title="人员管理与授权">
<ft:import src="/system/admin/js/user.js"/>
<ft:ext.codeRender fields="SEX,LOCKED,USERTYPE"/>
<ft:ext.codeStore fields="SEX,LOCKED,USERTYPE:3"/>
<ft:body>
<ft:div key="deptTreeDiv"></ft:div>
</ft:body>
<ft:script>
   var root_deptid = '<ft:out key="rootDeptid" scope="request"/>';
   var root_deptname = '<ft:out key="rootDeptname" scope="request"/>';
   var login_account = '<ft:out key="login_account" scope="request"/>';
</ft:script>
</ft:html>