<%@ page contentType="text/html; charset=utf-8"%>
<%@ include file="/common/include/taglib.jsp"%>
<%
	String path = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
%>
<ft:html showLoading="false" urlSecurity2="false" jqueryEnabled="true">
<ft:ext.myux uxType="tipwindow" />

<script language="JavaScript" type="text/javascript" src="resource/commonjs/contentflow.js" load="slideshow lightbox fancyScrollbar"></script>
<!-- <script language="JavaScript" type="text/javascript" src="system/admin/js/welcome.js"></script>
-->
<script style="text/javascript">
var slidershow = new ContentFlow('contentFlow', {
        	circularFlow:true,//src=/system/admin/js/welcome.js
        	endOpacity:1,
        	startItem:"center",
        	reflectionHeight:0,
        	reflectionGap:0.1,
        	reflectionColor:"#ffffff",
        	scaleFactor:2.0,
        	scaleFactorLandscape:1.2,
        	scaleFactorPortrait:1.2,
        	relativeItemPosition:"top center",
        	flowSpeedFactor:0.5
});
</script>
<ft:body>
	<div id="contentFlow" class="ContentFlow">
		<div class="loadIndicator">
			<div class="indicator"></div>
		</div>
		<div class="flow">
			<div class="item">
				<img class="content" src="<%=path%>/dec/introduce/ipv6_login.png" />
				<div class="caption">系统登录页面</div>
			</div>
			<div class="item">
				<img class="content" src="<%=path%>/dec/introduce/ipv6_function.png" />
				<div class="caption">功能模块展示</div>
			</div><%--
			<div class="item">
				<img class="content" src="<%=path%>/dec/introduce/traditional_layout.png" />
				<div class="caption">系统功能介绍（传统经典布局）</div>
			</div>
			--%><div class="item">
				<img class="content" src="<%=path%>/dec/introduce/ipv6_personal.png" />
				<div class="caption">个性桌面布局</div>
			</div>
			<div class="item">
				<img class="content" src="<%=path%>/dec/introduce/ipv6_interface.png" />
				<div class="caption">经典桌面布局</div>
			</div>
			<div class="item">
				<img class="content" src="<%=path%>/dec/introduce/ipv6_softwaretool.png" />
				<div class="caption">工具软件</div>
			</div>
		</div>
		<div class="globalCaption"></div>
		<div class="scrollbar">
			<div class="slider">
				<div class="position"></div>
			</div>
		</div>
	</div>
</ft:body>
</ft:html>