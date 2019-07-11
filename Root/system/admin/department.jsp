<%@ page contentType="text/html; charset=utf-8"%>
<%@ include file="/common/include/taglib.jsp"%>
<ft:html title="部门管理"  >
<ft:import src="/system/admin/js/department.js"/>
<ft:ext.codeRender fields="LEAF"/>
<ft:body>
<ft:div key="deptTreeDiv"></ft:div>
</ft:body>
<ft:script>
   var root_deptid = '<ft:out key="rootDeptid" scope="request"/>';
   var root_deptname = '<ft:out key="rootDeptname" scope="request"/>';
   
</ft:script>
</ft:html>