<%@ page contentType="text/html; charset=utf-8"%>
<%@ include file="/common/include/taglib.jsp"%>
<ft:html title="调色板" >
<ft:import src="/system/admin/js/color.js"/>
<ft:body>
<ft:div key="colorPaletteDiv">
<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="288" height="160">
  <param name="movie" value="./resource/flash/colorPicker.swf" />
  <param name="quality" value="high" />
  <embed src="./resource/flash/colorPicker.swf" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="288" height="160"></embed>
</object>
</ft:div>
</ft:body>
</ft:html>