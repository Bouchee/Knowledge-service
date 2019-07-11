<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/common/include/taglib.jsp"%>
<ft:html title="报表预览">
<ft:body>
</ft:body>
<script type="text/javascript">
window.onload = function(){
    window.location.href = '<%=request.getAttribute("dataUrl")%>';
};
</script>

</ft:html>