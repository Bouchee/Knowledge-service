#foreach($card in $cardList)
	<div id="div.card.${card.menuid}" style="overflow: auto; height: 100%; width: 100%;"></div>
#end
<div id="themeTreeDiv" class="x-hidden"  ></div>
<div id="previewDiv" class="x-hidden"  >
	<img src="${contextPath}/resource/image/theme/${theme}.jpg" />
</div>
<div id="layoutTreeDiv" class="x-hidden"  ></div>
<div id="layout_previewDiv" class="x-hidden"  >
	<img src="${contextPath}/resource/image/theme/layout/${layout}.jpg" />
</div>
${scriptStart}
var default_theme = '${theme}';
var default_layout = '${layout}';
var fu = '${fu}';
var tptl = ${tptl};
var headerDisplayMode_value = ${headerDisplayMode};
if (Ext.state.Manager.get("headerDisplayMode") == true){
headerDisplayMode_value = true;
}else if(Ext.state.Manager.get("headerDisplayMode") == false){
headerDisplayMode_value = false;
};
var mainTabs;
var arr = WEST_NAVIGATION_BAR_WIDTH.split(',');
Ext.onReady(function(){
//Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
mainTabs = new Ext.TabPanel({
region:'center',
activeTab:0,
id:'mainTabs',
enableTabScroll:true,
height:550,
border:false,
frame:true,
plugins: new Ext.ux.TabCloseMenu(),
items:[{
title:"<img align='top' class='IEPNG' src='./resource/image/ext/user.png'/>${welcomePageTitle}",
listeners: {activate: function(){Ext.getCmp('centerPanel').setTitle('${centerTitle} → ${welcomePageTitle}');}},
html:"<iframe name='mainFrame'  src='index.do?code=preferencesInit' scrolling='auto' frameborder='0' width='100%' height='100%' ></iframe>"
}]
});
var viewport = new Ext.Viewport({
layout:'border',
items:[
new Ext.Panel({
region:'north',
contentEl:'north',
//iconCls:'application_homeIcon',
height:85,
titleCollapse:true,
collapsible:true,
collapsed : !headerDisplayMode_value,
border:false,
layout: 'fit',
header:true,
collapseMode:'mini',
title:'${northTitle}',
listeners:{
'collapse':function(){
Ext.state.Manager.set("headerDisplayMode", false);
},
'expand':function(){
Ext.state.Manager.set("headerDisplayMode", true);
}}
}),
new Ext.BoxComponent({
region:'south',
contentEl: 'south',
height:20,
layout: 'fit',
collapsible: true}),
{region:'center',
id: 'centerPanel',
iconCls:'',
title:'${centerTitle}',
header:false,//remove header
autoScroll:false,
layout: 'fit',
items:[mainTabs]},
{region:'west',
id : 'westPanel',
titleCollapse:true,
collapsible: true,
collapsed : ${westAccordionDisplayMode},
minSize: arr[0],
width: arr[1],
maxSize: arr[2],
split: true,
collapseMode:'header',
iconCls:'book_previousIcon',
title: '${westTitle}',
layout:'accordion',
layoutConfig:{
animate : true,
activeOnTop : ${activeOnTop},
fill : ${westAccordionFillMode}
},
items: [
#foreach($card in $cardList)
	{
	autoScroll:true,
	border:false,
	contentEl: 'div.card.${card.menuid}',
	#if(${card.iconcls}&&${card.iconcls}!="")
		iconCls:'${card.iconcls}',
	#end
	title:'${card.menuname}'
	}
	#if(${card.isNotLast})
		,
	#end
#end
]
}
]});
});
//响应树节点单击事件
function addTab(url,name,menuid,pathCh,icon){
if(Ext.isEmpty(icon)){
icon = 's.gif';
}
var id = "tab_id_" + menuid;
if(url == '#' || url == ''){
infoMsg('此菜单还没有指定请求地址,无法为您打开页面.');
return;
}else{
var index = url.indexOf('.do');
if(index != -1)
url = url + '&menuid4Log=' + menuid;
var n = mainTabs.getComponent(id);
if (!n) {
// 如果对centerPanel进行遮罩,则可以出现阴影mainTabs
//Ext.getCmp('centerPanel').getEl().mask('<span style=font-size:12>正在加载页面,请稍等...</span>', 'x-mask-loading');
// document.getElementById('endIeStatus').click();//解决Iframe IE加载不完全的问题
// 兼容IE和FF触发.click()函数
var endIeStatus = document.getElementById("endIeStatus");
if(document.createEvent){
var ev = document.createEvent('HTMLEvents');
ev.initEvent('click', false, true);
endIeStatus.dispatchEvent(ev);
}
else endIeStatus.click();
n = mainTabs.add({
id:id,
title:"<img align='top' class='IEPNG' src='./resource/image/ext/" + icon + "'/>" + name,
closable:true,
layout:'fit',
listeners: {activate: function(){Ext.getCmp('centerPanel').setTitle(pathCh)}},
html:'<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src='+url+'></iframe>'
//如果功能页面使用中心区域阴影加载模式则使用下面的代码unmaskCenterPanel();页面加载完毕后取消阴影
//html:'<iframe scrolling="auto" frameborder="0" onload="unmaskCenterPanel()" width="100%" height="100%" src='+url+'></iframe>'
});
}
mainTabs.setActiveTab(n);
}
}
//解决Iframe IE加载不完全的问题
function endIeStatus(){}
Ext.EventManager.on(window, 'load', function(){
setTimeout(
function() {
Ext.get('loading').remove();
Ext.get('loading-mask').fadeOut({remove:true});
}, 200);
});
//取消阴影(当子页面加载完成后通过parent.XXXX来调用)
function unmaskCenterPanel(){
// 如果对centerPanel进行遮罩,则可以出现阴影
Ext.getCmp('centerPanel').getEl().unmask();
}
				 var fustr = '';
				try{
					if (fu.substr(0, 1) == '0'){
						fustr = '[主题] → [皮肤设置] → 设置个人主题!<br><br>';
					}}
				catch (e){
				}
				try{
					if (fu.substr(1, 1) == '0'){
						fustr = fustr + '[设置] → [密码修改] → 更改个人密码!<br><br>';
					}}catch (e){
				}
				try{
					if (fu.substr(2, 1) == '0'){
						fustr = fustr + '[主题] → [布局方案] → 选择界面布局!<br><br>';
					}}catch (e){
				}
				if (fustr != ''){
					fustr = fustr + '该信息之所以显示，是因为您至少没有配置<font color=red>个人皮肤、布局方案、个人密码</font>中的一个！';
					if(tptl){
						infoMsgClick(fustr);
					}
				}
${scriptEnd}
<style type="text/css">
	#loading-mask {
	Z-INDEX: 20000;
	LEFT: 0px;
	WIDTH: 100%;
	POSITION: absolute;
	TOP: 0px;
	HEIGHT: 100%;
	BACKGROUND-COLOR: white
	}
	#loading {
	PADDING-RIGHT: 2px;
	PADDING-LEFT: 2px;
	Z-INDEX: 20001;
	LEFT: 45%;
	PADDING-BOTTOM: 2px;
	PADDING-TOP: 2px;
	POSITION: absolute;
	TOP: 40%;
	HEIGHT: auto
	}
	#loading IMG {
	MARGIN-BOTTOM: 5px
	}
	#loading .loading-indicator {
	PADDING-RIGHT: 10px;
	PADDING-LEFT: 10px;
	BACKGROUND: white;
	PADDING-BOTTOM: 10px;
	MARGIN: 0px;
	FONT: 12px 宋体, arial, helvetica;
	COLOR: #555;
	PADDING-TOP: 10px;
	HEIGHT: auto;
	TEXT-ALIGN: center
	}
	.banner {
	font-family: "宋体";
	font-size: 12px;
	color:$themeColor;
	}
</style>
<!--显示loding区域-->
<DIV id=loading-mask></DIV>
<DIV id=loading>
	<DIV class=loading-indicator><IMG style="MARGIN-RIGHT: 8px"
			height=32
			src="./resource/image/ajax1.gif"
			width=36 align=absMiddle>系统正在初始化组件,请稍等...</DIV>
	</DIV>
	<div id="north">
		<table border="0" cellpadding="0" cellspacing="0" width="100%"
			height="60" background="./resource/image/banner/${theme}.png">
			<tr >
				<td style="padding-left:15px"><img class="IEPNG"
						src="${banner}" />
				</td>
				<td style="padding-right:5px">
					<table width="100%"   border="0" cellpadding="0" cellspacing="3" class="banner">
						<tr align="right">
							<td>${welcome}，${username}！ 今天是：${date} ${week} <span id="rTime"></span>
							</td>
						</tr>
						<tr align="right">
							<td>
								<table border="0" cellpadding="0" cellspacing="1">
									<tr>
										<td>
											<div id = "themeDiv"></div>
										</td>
										<td>&nbsp;</td>
										<td>
											<div id = "configDiv"></div>
										</td>
										<td>&nbsp;</td>
										<td>
											<div id = "lockDiv"></div>
										</td>
										<td>&nbsp;</td>
										<td>
											<div id = "closeDiv"></div>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</div>
	<div id="south" align="left">
		<table class="banner" width="100%">
			<tr>
				<td width="65%">
					<nobr>&nbsp;<img class="IEPNG" src="./resource/image/ext/comments2.png" />
						&nbsp;欢迎您，${username}！&nbsp;登录帐户：${account}&nbsp;所属部门：${deptname}</nobr>
				</td>
				<td width="35%">
					<div align="right">
						<nobr>${copyright}</nobr>
					</div>
				</td>
			</tr>
		</table>
	</div>
	<a href="#" onclick="javascript:endIeStatus();" id="endIeStatus"
		style="display: none;" />
