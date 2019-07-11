<%@ page contentType="text/html; charset=utf-8"%>
<%@ include file="/common/include/taglib.jsp"%>
<ft:html title="" fcfEnabled="true">
<ft:import src="/system/admin/js/server.js" />
<ft:body>
	<!--
	<ft:flashReport type="L" dataVar="xmlstring_hostmem" id="HostMemChart"
		style="margin-top:5px" width="680" height="200" align="center"
		visible="false" />

	<ft:flashReport type="L" dataVar="xmlstring_cpu" id="CpuChart"
		style="margin-top:5px" width="680" height="200" align="center"
		visible="false" />
	-->
	<ft:flashReport type="3DC" dataVar="xmlString" id="jvmMemChart"
		style="margin-top:5px" width="680" height="300" align="center"
		visible="false" />
</ft:body>
<ft:script>
var jsonInfo = <ft:out key="jsonInfo" scope="request" />;
</ft:script>
</ft:html>