<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/common/include/taglib.jsp"%>
<ft:html title="报表预览" urlSecurity2="false">
<ft:body>
	<APPLET
		CODE="org.xianwu.core.web.report.jasper.applet.EmbeddedViewerApplet.class"
		CODEBASE="<%=request.getContextPath()%>/resource/jasper/applets"
		ARCHIVE="report-applet-fuxianwu.jar,jasperreports-applet-5.0.0.jar,commons-logging-1.1.1.jar,commons-collections-3.2.jar"
		WIDTH="100%" HEIGHT="100%">
		<PARAM NAME=CODE
			VALUE="org.xianwu.core.web.report.jasper.applet.EmbeddedViewerApplet.class">
		<PARAM NAME=CODEBASE
			VALUE="<%=request.getContextPath()%>/resource/jasper/applets">
		<PARAM NAME=ARCHIVE
		VALUE="report-applet-fuxianwu.jar,jasperreports-applet-5.0.0.jar,commons-logging-1.1.1.jar,commons-collections-3.2.jar">
		<PARAM NAME="type" VALUE="application/x-java-applet;version=1.5">
		<PARAM NAME="scriptable" VALUE="false">
		<PARAM NAME="REPORT_URL" VALUE="<%=request.getAttribute("dataUrl")%>">
	</APPLET>
</ft:body>
</ft:html>