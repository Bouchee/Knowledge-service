<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/common/include/taglib.jsp"%>
<ft:html title=""  uxEnabled="true" pinyinFilter="true">
<script type="text/javascript" src="/dec/js/jquery-1.7.2.min.js"></script>
<ft:import src="/dec/turning/js/generalturning.js" />
<ft:ext.codeStore fields="ISOTYPE,TURNINGTYPE,THICKNESS2,CELENGTH,NOSERADIUS,THHEADANGLE,HANDOFTOOL,CSERIES,SHAPE,RELIEFANGLE,PORTSIZE,BORE" showCode="false"/>
<ft:ext.codeRender fields="ISOTYPE,TURNINGTYPE,THICKNESS2,CELENGTH,NOSERADIUS,THHEADANGLE,HANDOFTOOL,CSERIES,SHAPE,RELIEFANGLE,PORTSIZE,BORE" />
<ft:body>
</ft:body>
</ft:html>