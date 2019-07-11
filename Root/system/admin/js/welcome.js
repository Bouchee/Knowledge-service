/**
 * 欢迎页面
 */
Ext.onReady(function() {
			new Ext.ux.TipWindow({
						title	: '<span class=commoncss>提示</span>',
						html	: '您有[0]条未读信息',
						iconCls	: 'commentsIcon'
					}).show(Ext.getBody());
		});

/*
 * Ext.Ajax.request({ url : 'login.do?code=queryCountMessage&userid='+window.parent.userid, success : function(response) { var obj = Ext.util.JSON.decode(response.responseText); var tip = new
 * Ext.ux.TipWindow({ name : 'tip', title : '<span class=commoncss>提示</span>', // html : '您有['+obj.countInteger+']条未读信息 // &nbsp;<a // href=System/unreadMessage.jsp >查看详情</a>', html : '您有[' +
 * obj.countInteger + ']条未读信息 &nbsp;<label id="xx" style="cursor:hand;color:blue"><u>查看详情</u></label>', iconCls : 'commentsIcon' }).show(Ext.getBody()); Ext.get('xx').on('click', function() {
 * window.parent.addTab('login.do?code=openUnreadMessage', '未读消息', 'unreadMessage','未读信息','tab_blank.png'); }); }, failure : function(response) { hideWaitMsg(); } });
 */