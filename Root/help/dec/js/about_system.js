Ext.onReady(function() {
	// 帮助窗口

	var store = new Ext.data.Store({
				proxy		: new Ext.data.HttpProxy({
							url	: 'index.do?code=queryAbout4Manager'
						}),
				reader		: new Ext.data.JsonReader({
							totalProperty	: 'TOTALCOUNT',
							root			: 'ROOT'
						}, [{
									name	: 'value'
								}, {
									name	: 'text'
								}, {
									name	: 'enname'
								}, {
									name	: 'ext'
								}, {
									name	: 'description'
								}]),
				baseParams	: {
					flag	: '1'
				}
			});
	store.load();

	// var abc = new Array(['101', 'teacher'], ['102', '学员库'], ['103', '班级课表'], ['104', '考试科目库'], ['105', '综合管理'], ['106', '课程库'], ['107', '班级费用'], ['108', '学员成绩'], ['109', '考试科目'], ['110', '班主任']);
	var fp = parent.webContext + '/help' + parent.webContext + '/pdf/';
	var readWin = new Ext.Window({
				header		: false,
				width		: 800,
				// modal : true,
				height		: 435,
				closable	: false,
				constrain	: true,
				// plain : true,
				maximized	: true,
				layout		: 'fit',
				tbar		: [{
							xtype	: 'tbtext',
							id		: 'help-text',
							width	: 500,
							text	: '提示：关于系统基本操作的说明文档。'
						}, /* { text : '保存', iconCls : 'page_edit_1Icon', handler : function() { addInit(); } }, { text : '打印', iconCls : 'printerIcon', handler : function() { editInit(); } }, */
						'->'/*, {
							xtype	: 'button',
							text	: 'UI权限示例',
							id		: 'ui_auth_button_demo'
						}*/, {
							xtype	: 'tbtext',
							text	: '操作手册:'
						}, new Ext.form.ComboBox({
									fieldLabel		: '操作手册',
									// hideLabel : true,
									hiddenName		: 'classid',
									id				: 'help-combo',
									emptyText		: '请选择操作手册...',
									triggerAction	: 'all',
									width			: 180,
									store			: store,
									displayField	: 'text',
									valueField		: 'value',
									loadingText		: '正在加载数据...',
									mode			: 'local', // 数据会自动读取,如果设置为local又调用了store.load()则会读取2次；也可以将其设置为local，然后通过store.load()方法来读取
									forceSelection	: true,
									// typeAhead : true,
									// pageSize : cln,
									// plugins : [new QM.plugin.PinyinFilter],
									// selectOnFocus : true,
									minListWidth	: 270,
									// listClass : 'x-menu',
									listAlign		: 'br-br?',// what the hell was this?
									// resizable :true,
									// width : 200,
									// checkField : 'checked',
									// ,maxItemsCount : 5
									// beforeBlur : function() {// override beforeBlur method },
									tpl				: '<table><tr><tpl for="."><td width=110 class="x-combo-list-item"><img src="'
											+ Ext.BLANK_IMAGE_URL
											+ '" class="ux-lovcombo-icon ux-lovcombo-icon-{[values.checked?"checked":"unchecked"]}">{text}</td><tpl if="xindex % 10 === 0"></tr><tr></tpl></tpl></tr></table>',
									listWidth		: 1000,
									listeners		: {
										select	: function(cb, rec, index) {
											var htp = Ext.getCmp('help-tabpanel');
											var n = htp.getComponent(cb.getValue());
											if (!n) {
												n = htp.add({
															id			: rec.data.value,
															title		: rec.data.text,
															closable	: true,
															layout		: 'fit',
															html		: '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="' + fp + rec.data.enname + rec.data.ext
																	+ '"></iframe>',
															listeners	: {
																activate	: function(p) {
																	if (rec.data.description != null || rec.data.description != '') {
																		Ext.getCmp('help-text').setText('提示：' + rec.data.description);
																	}
																	Ext.getCmp('help-combo').setValue('');
																}
															}
														});
											}
											htp.setActiveTab(n);
											if (rec.data.description != null || rec.data.description != '') {
												Ext.getCmp('help-text').setText('提示：' + rec.data.description);
											}
										}
									}

								})],
				items		: [new Ext.TabPanel({
							region		: 'center',
							id			: 'help-tabpanel',
							// activeTab : 0,
							width		: '100%',
							// height:'100%',
							header		: false,
							tabWidth	: 150,
							// frame : true,
							// plugins : new Ext.ux.TabCloseMenu(),
							items		: [{ // xtype : 'box',
								id			: '100',
								title		: '关于系统',
								closable	: false,
								modal		: false,
								layout		: 'fit',
								html		: '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="' + fp + 'about' + '.pdf"></iframe>',
								listeners	: {
									activate	: function(p) {
										Ext.getCmp('help-text').setText('提示：关于系统基本操作的说明文档。');
									}
								}
							}],
							listeners	: {
								deactivate	: function(p) {
									p.removeAll(true);
								}
							}
						})]
			});

	readWin.show();

	Ext.getCmp('help-tabpanel').setActiveTab(0);

		/*
		 * function getData(value){ var rec = store.getAt(store.find('value', value)); return parent.webContext + '/help' + parent.webContext + '/pdf/' + rec.data.text + rec.data.ext }
		 */
});