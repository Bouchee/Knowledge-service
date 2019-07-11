<%@ page contentType="text/html; charset=utf-8"%>
<%@ include file="/common/include/taglib.jsp"%>
<ft:html title="UI组件托管" uxEnabled="true">
<ft:import src="/system/admin/js/uipart.js"/>
<ft:body>
<ft:div key="menuTreeDiv" />
<ft:ext.codeRender fields="CMPTYPE"/>
<ft:ext.codeStore fields="CMPTYPE"/>

</ft:body>
<ft:script>
   var root_menuname = '<ft:out key="rootMenuName" scope="request"/>';
</ft:script>
</ft:html>