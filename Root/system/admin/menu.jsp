<%@ page contentType="text/html; charset=utf-8"%>
<%@ include file="/common/include/taglib.jsp"%>
<ft:html title="菜单资源管理">
<ft:import src="/system/admin/js/menu.js"/>
<ft:ext.codeRender fields="MENUTYPE,LEAF,EXPAND"/>
<ft:ext.codeStore fields="EXPAND"/>
<ft:body>
<ft:div key="menuTreeDiv"></ft:div>
</ft:body>
<ft:script>
   var root_menuname = '<ft:out key="rootMenuName" scope="request"/>';
</ft:script>
</ft:html>