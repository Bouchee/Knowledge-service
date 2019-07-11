<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/common/include/taglib.jsp"%>
<ft:html title="" pinyinFilter="true">
<ft:import src="/dec/knowledgebasesystem/inventiontool/triz/js/triz.js" />
<ft:ext.codeStore fields="ISOTYPE,CUTTYPE" showCode="false"/>
<ft:ext.codeRender fields="ISOTYPE,CUTTYPE" />
<ft:body>
    <div id="form-ct"></div>
</ft:body>
</ft:html>