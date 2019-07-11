/**
 * 首页部分JS
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
Ext.onReady(function() {

			var themeMenu = new Ext.menu.Menu({
						id		: 'themeMenu',
						items	: [{
									text	: '皮肤设置',
									iconCls	: 'bugIcon',
									handler	: function() {
										themeWindowInit();
									}
								}, {
									text	: '布局设置',
									// disabled : true,
									iconCls	: 'app_rightIcon',
									handler	: function() {
										layoutWindowInit();
									}
								}/* , themeCombo */]
					});

			var themeButton = new Ext.Button({
						text		: '主题',
						iconCls		: 'themeIcon',
						iconAlign	: 'left',
						scale		: 'small',
						width		: 70,
						tooltip		: '<span style="font-size:12px">切换系统主题样式</span>',
						pressed		: false,
						arrowAlign	: 'right',
						renderTo	: 'themeDiv',
						menu		: themeMenu
					});

			var lockButton = new Ext.Button({
						text		: '锁定',
						iconCls		: 'lockIcon',
						iconAlign	: 'left',
						scale		: 'small',
						width		: 70,
						tooltip		: '<span style="font-size:12px">点击锁定系统!</span>',
						pressed		: false,
						arrowAlign	: 'right',
						renderTo	: 'lockDiv',
						handler		: function() {
							lockWindow.show();
							setCookie("fuxianwu.lockflag", '1', 240);
						}
					});

			var mainMenu = new Ext.menu.Menu({
						id		: 'mainMenu',
						items	: [{
									text	: '密码修改',
									iconCls	: 'keyIcon',
									handler	: function() {
										updateUserInit();
									}
								}, /*
									 * { text : '系统锁定', iconCls : 'lockIcon', handler : function() { lockWindow.show(); setCookie("fuxianwu.lockflag", '1', 240); } },
									 */{
									text	: '设为主页',
									iconCls	: 'application_homeIcon',
									handler	: function() {
										setHomepage();
									}
								}/*
									 * , { text : '添加收藏', iconCls : 'award_star_gold_2Icon', handler : function() { addFavorite(); } }
									 */]
					});

			var configButton = new Ext.Button({
						text		: '设置',
						iconCls		: 'configIcon',
						iconAlign	: 'left',
						scale		: 'small',
						width		: 70,
						tooltip		: '<span style="font-size:12px">首选项设置</span>',
						pressed		: false,
						renderTo	: 'configDiv',
						menu		: mainMenu
					});

			var closeButton = new Ext.Button({
						text		: '退出',
						iconCls		: 'cancelIcon',
						iconAlign	: 'left',
						scale		: 'small',
						width		: 70,
						tooltip		: '<span style="font-size:12px">切换用户,安全退出系统</span>',
						pressed		: false,
						arrowAlign	: 'right',
						renderTo	: 'closeDiv',
						handler		: function() {
							logout();
						}
					});

			/** 皮肤设置* */
			var root = new Ext.tree.TreeNode({
						text	: '根节点',
						id		: '00'
					});
			var node01 = new Ext.tree.TreeNode({
						text	: '蓝色妖姬',
						theme	: 'default',
						id		: '01'
					});
			var node02 = new Ext.tree.TreeNode({
						text	: '粉红之恋',
						theme	: 'lightRed',
						id		: '02'
					});
			var node03 = new Ext.tree.TreeNode({
						text	: '金碧辉煌',
						theme	: 'lightYellow',
						id		: '03'
					});
			var node04 = new Ext.tree.TreeNode({
						text	: '钢铁战士',
						theme	: 'gray',
						id		: '04'
					});
			var node05 = new Ext.tree.TreeNode({
						text	: '绿水青山',
						theme	: 'lightGreen',
						id		: '05'
					});
			var node06 = new Ext.tree.TreeNode({
						text	: '紫色忧郁',
						theme	: 'purple2',
						id		: '06'
					});
			var node07 = new Ext.tree.TreeNode({
						text	: '蓝色情怀',
						theme	: 'blueSentiment',
						id		: '07'
					});
			var node08 = new Ext.tree.TreeNode({
						text	: '红粉爱恋',
						theme	: 'pinkLove',
						id		: '08'
					});
			var node09 = new Ext.tree.TreeNode({
						text	: '紫色情缘',
						theme	: 'pink',
						id		: '09'
					});
			var node10 = new Ext.tree.TreeNode({
						text	: '和风物语',
						theme	: 'lightRedYellow',
						id		: '10'
					});
			var node11 = new Ext.tree.TreeNode({
						text	: '清新夏日',
						theme	: 'lightSummer',
						id		: '11'
					});
			var node12 = new Ext.tree.TreeNode({
						text	: '恭贺新禧',
						theme	: 'happyNewYear',
						id		: '12'
					});
			var node13 = new Ext.tree.TreeNode({
						text	: '简约蓝调',
						theme	: 'lightBlue',
						id		: '13'
					});
			var node14 = new Ext.tree.TreeNode({
						text	: '自然之美',
						theme	: 'lightNature',
						id		: '14'
					});
			var node15 = new Ext.tree.TreeNode({
						text	: '末日迷途',
						theme	: 'heavyGray',
						id		: '15'
					});
			var node16 = new Ext.tree.TreeNode({
						text	: '心心相印',
						theme	: 'ourLove',
						id		: '16'
					});
			var node17 = new Ext.tree.TreeNode({
						text	: '梨花春雨',
						theme	: 'pearRain',
						id		: '17'
					});
			var node18 = new Ext.tree.TreeNode({
						text	: '云中歌城',
						theme	: 'cloudMusic',
						id		: '18'
					});
			var node19 = new Ext.tree.TreeNode({
						text	: '素雅清新',
						theme	: 'beautyGrass',
						id		: '19'
					});
			var node20 = new Ext.tree.TreeNode({
						text	: '梦之水蓝',
						theme	: 'dreamWater',
						id		: '20'
					});
			var node21 = new Ext.tree.TreeNode({
						text	: '童话世界',
						theme	: 'childWorld',
						id		: '21'
					});
			var node22 = new Ext.tree.TreeNode({
						text	: '水晶之恋',
						theme	: 'crystalLove',
						id		: '22'
					});

			root.appendChild(node01);
			root.appendChild(node02);
			root.appendChild(node03);
			root.appendChild(node04);
			root.appendChild(node05);
			root.appendChild(node06);
			root.appendChild(node07);
			root.appendChild(node08);
			root.appendChild(node09);
			root.appendChild(node10);
			root.appendChild(node11);
			root.appendChild(node12);
			root.appendChild(node13);
			root.appendChild(node14);
			root.appendChild(node15);
			root.appendChild(node16);
			root.appendChild(node17);
			root.appendChild(node18);
			root.appendChild(node19);
			root.appendChild(node20);
			root.appendChild(node21);
			root.appendChild(node22);

			var themeTree = new Ext.tree.TreePanel({
						autoHeight		: false,
						autoWidth		: false,
						autoScroll		: false,
						animate			: false,
						rootVisible		: false,
						border			: false,
						containerScroll	: true,
						applyTo			: 'themeTreeDiv',
						root			: root
					});
			themeTree.expandAll();
			themeTree.on('click', function(node) {
						var theme = node.attributes.theme;
						var o = document.getElementById('previewDiv');
						o.innerHTML = '<img src="./resource/image/theme/' + theme + '.jpg" />';
					});

			var previewPanel = new Ext.Panel({
						region		: 'center',
						title		: '<span class="commoncss">皮肤预览</span>',
						margins		: '3 3 3 0',
						activeTab	: 0,
						defaults	: {
							autoScroll	: true
						},
						contentEl	: 'previewDiv'
					});

			var themenav = new Ext.Panel({
						title		: '<span class="commoncss">皮肤列表</span>',
						region		: 'west',
						split		: true,
						width		: 120,
						minSize		: 120,
						maxSize		: 150,
						autoScroll	: true,
						collapsible	: true,
						margins		: '3 0 3 3',
						contentEl	: 'themeTreeDiv',
						bbar		: [{
									text	: '保存',
									iconCls	: 'acceptIcon',
									handler	: function() {
										if (runMode == '0') {
											infoMsgClick('应用授权不可用，请联系开发人员输入购买的授权密码，您目前只能进行查询操作！');
											return;
										}
										var o = themeTree.getSelectionModel().getSelectedNode();
										saveUserTheme(o);
									}
								}, '->', {
									text	: '关闭',
									iconCls	: 'deleteIcon',
									handler	: function() {
										themeWindow.hide();
									}
								}]
					});

			var themeWindow = new Ext.Window({
						title			: '<span class="commoncss">皮肤设置</span>',
						closable		: true,
						width			: 630,
						height			: 380,
						closeAction		: 'hide',
						iconCls			: 'bugIcon',
						collapsible		: true,
						titleCollapse	: true,
						border			: true,
						maximizable		: false,
						resizable		: false,
						modal			: true,
						animCollapse	: true,
						animateTarget	: Ext.getBody(),
						// border:false,
						plain			: true,
						layout			: 'border',
						items			: [themenav, previewPanel]
					});

			/** 布局设置* */
			var layout_root = new Ext.tree.TreeNode({
						text	: '根节点',
						id		: '00'
					});
			var layout_node01 = new Ext.tree.TreeNode({
						text	: '传统经典布局',
						layout	: '1',
						id		: '01'
					});
			var layout_node02 = new Ext.tree.TreeNode({
						text	: '个性桌面布局',
						layout	: '2',
						id		: '02'
					});
			layout_root.appendChild(layout_node01);
			layout_root.appendChild(layout_node02);
			var layoutTree = new Ext.tree.TreePanel({
						autoHeight		: false,
						autoWidth		: false,
						autoScroll		: false,
						animate			: false,
						rootVisible		: false,
						border			: false,
						containerScroll	: true,
						applyTo			: 'layoutTreeDiv',
						root			: layout_root
					});
			layoutTree.expandAll();
			layoutTree.on('click', function(node) {
						var layout = node.attributes.layout;
						var o = document.getElementById('layout_previewDiv');
						o.innerHTML = '<img src="./resource/image/theme/layout/' + layout + '.jpg" />';
					});

			var layout_previewPanel = new Ext.Panel({
						region		: 'center',
						title		: '<span class="commoncss">布局预览</span>',
						margins		: '3 3 3 0',
						defaults	: {
							autoScroll	: true
						},
						contentEl	: 'layout_previewDiv'
					});

			var layoutnav = new Ext.Panel({
						title		: '<span class="commoncss">布局列表</span>',
						region		: 'west',
						split		: true,
						width		: 120,
						minSize		: 120,
						maxSize		: 150,
						collapsible	: true,
						margins		: '3 0 3 3',
						contentEl	: 'layoutTreeDiv',
						bbar		: [{
									text	: '保存',
									iconCls	: 'acceptIcon',
									handler	: function() {
										var o = layoutTree.getSelectionModel().getSelectedNode();
										saveUserLayout(o);
									}
								}, '->', {
									text	: '关闭',
									iconCls	: 'deleteIcon',
									handler	: function() {
										layoutWindow.hide();
									}
								}]
					});

			var layoutWindow = new Ext.Window({
						title			: '<span class="commoncss">布局设置</span>',
						closable		: true,
						width			: 723,
						height			: 398,
						closeAction		: 'hide',
						iconCls			: 'app_rightIcon',
						collapsible		: true,
						titleCollapse	: true,
						border			: true,
						maximizable		: false,
						resizable		: false,
						modal			: true,
						animCollapse	: true,
						animateTarget	: Ext.getBody(),
						// border:false,
						plain			: true,
						layout			: 'border',
						items			: [layoutnav, layout_previewPanel]
					});

			/**
			 * 布局窗口初始化
			 */
			function layoutWindowInit() {
				for (i = 0; i < layout_root.childNodes.length; i++) {
					var child = layout_root.childNodes[i];
					if (default_layout == child.attributes.layout) {
						child.select();
					}
				}
				var o = document.getElementById('previewDiv');
				o.innerHTML = '<img src="./resource/image/theme/layout/' + default_layout + '.jpg" />';
				layoutWindow.show();

			}

			/**
			 * 保存用户自定义布局
			 */
			function saveUserLayout(o) {
				if (account == 'fuxianwu') {
					Ext.Msg.alert('提示', '开发账户[fuxianwu]不支持布局切换,请使用其它帐户登录切换!');
					return;
				}
				showWaitMsg();
				Ext.Ajax.request({
							url		: './index.do?code=saveUserLayout',
							success	: function(response) {
								var resultArray = Ext.util.JSON.decode(response.responseText);
								Ext.MessageBox.confirm('请确认', '您选择的[' + o.text + ']布局保存成功,立即应用该布局吗?<br>提示：页面会被刷新,请先确认是否有尚未保存的业务数据,以免丢失!', function(btn, text) {
											if (btn == 'yes') {
												showWaitMsg('正在为您应用布局...');
												location.reload();
											} else {
												Ext.Msg.alert('提示', '请在任何时候按[F5]键刷新页面或者重新登录系统以启用[' + o.text + ']布局!', function() {
															themeWindow.hide();
														});

											}
										});
							},
							params	: {
								layout	: o.attributes.layout
							}
						});
			}
			var isenter = 0;
			/** 密码修改* */
			var lockForm = new Ext.form.FormPanel({
						labelWidth	: 60,
						defaultType	: 'textfield',
						labelAlign	: 'right',
						bodyStyle	: 'padding:10 5 5 5',
						layout		: 'form',
						items		: [{
									fieldLabel		: '帐户密码',
									name			: 'password',
									inputType		: 'password',
									id				: 'password_lock',
									labelStyle		: micolor,
									allowBlank		: false,
									maxLength		: 50,
									selectOnFocus	: true,
									listeners		: {
										specialkey	: function(field, e) {
											if (e.getKey() == Ext.EventObject.ENTER) {
												Ext.getCmp('password_lock').setValue(md5(Ext.getCmp('password_lock').getValue()));
												isenter = 1;
												unlockSystem();
											}
										},
										blur		: function() {
											Ext.getCmp('password_lock').setValue(md5(Ext.getCmp('password_lock').getValue()));
										}
									},
									anchor			: '100%'
								}, {
									xtype	: 'panel',
									border	: false,
									html	: '<div style="font-size:12px;margin-left:10px">(系统已成功锁定，输入登录帐户密码进行解锁。)</div>'
								}]
					});

			var lockWindow = new Ext.Window({
						title			: '<span class="commoncss">系统锁定</span>',
						iconCls			: 'lockIcon',
						layout			: 'fit',
						width			: 320,
						height			: 130,
						closeAction		: 'hide',
						collapsible		: false,
						closable		: false,
						maximizable		: false,
						border			: false,
						modal			: true,
						constrain		: true,
						animateTarget	: Ext.getBody(),
						items			: [lockForm],
						listeners		: {
							'show'	: function(obj) {
								lockForm.form.reset();
								lockForm.findById('password_lock').focus(true, 50);
							}
						},
						buttons			: [{
									text	: '解锁',
									iconCls	: 'keyIcon',
									handler	: function() {
										unlockSystem();
									}
								}, {
									text	: '重新登录',
									iconCls	: 'tbar_synchronizeIcon',
									handler	: function() {
										window.location.href = 'logout.html';
									}
								}]
					});

			var userFormPanel = new Ext.form.FormPanel({
						defaultType	: 'textfield',
						labelAlign	: 'right',
						labelWidth	: 70,
						frame		: false,
						bodyStyle	: 'padding:5 5 0',
						items		: [{
									fieldLabel	: '登录帐户',
									name		: 'account',
									id			: 'account',
									allowBlank	: false,
									// readOnly : true,
									disabled	: true,
									fieldClass	: 'x-custom-field-disabled',
									anchor		: '99%'
								}, {
									fieldLabel	: '姓名',
									name		: 'username',
									id			: 'username',
									allowBlank	: false,
									// readOnly : true,
									disabled	: true,
									fieldClass	: 'x-custom-field-disabled',
									anchor		: '99%'
								}, {
									fieldLabel		: '当前密码',
									name			: 'password2',
									id				: 'password2',
									inputType		: 'password',
									labelStyle		: micolor,
									selectOnFocus	: true,
									maxLength		: 50,
									allowBlank		: false,
									listeners		: {
										blur	: function() {
											Ext.getCmp('password2').setValue(md5(Ext.getCmp('password2').getValue()));
										}
									},
									anchor			: '99%'
								}, {
									fieldLabel		: '新密码',
									name			: 'password',
									id				: 'password',
									inputType		: 'password',
									labelStyle		: micolor,
									selectOnFocus	: true,
									maxLength		: 50,
									allowBlank		: false,
									listeners		: {
										blur	: function() {
											Ext.getCmp('password').setValue(md5(Ext.getCmp('password').getValue()));
										}
									},
									anchor			: '99%'
								}, {
									fieldLabel		: '确认新密码',
									name			: 'password1',
									id				: 'password1',
									inputType		: 'password',
									labelStyle		: micolor,
									selectOnFocus	: true,
									maxLength		: 50,
									allowBlank		: false,
									listeners		: {
										blur	: function() {
											Ext.getCmp('password1').setValue(md5(Ext.getCmp('password1').getValue()));
										}
									},
									anchor			: '99%'
								}, {
									id		: 'userid',
									name	: 'userid',
									hidden	: true
								}]
					});

			var userWindow = new Ext.Window({
						layout			: 'fit',
						width			: 400,
						height			: 230,
						resizable		: false,
						draggable		: true,
						closeAction		: 'hide',
						modal			: true,
						title			: '<span class="commoncss">密码修改</span>',
						iconCls			: 'keyIcon',
						collapsible		: true,
						titleCollapse	: true,
						maximizable		: false,
						buttonAlign		: 'right',
						border			: false,
						animCollapse	: true,
						animateTarget	: Ext.getBody(),
						constrain		: true,
						/*
						 * listeners : { 'show' : function(obj) { Ext.getCmp('password2').focus(true, 200); } }
						 */
						items			: [userFormPanel],
						buttons			: [{
									text	: '保存',
									iconCls	: 'acceptIcon',
									handler	: function() {
										if (runMode == '0') {
											infoMsgClick('应用授权不可用，请联系开发人员输入购买的授权密码，您目前只能进行查询操作！');
											return;
										}
										updateUser();
									}
								}, {
									text	: '关闭',
									iconCls	: 'deleteIcon',
									handler	: function() {
										userWindow.hide();
									}
								}]
					});

			function unlockSystem() {
				// showWaitMsg();
				if (!lockForm.form.isValid())
					return;
				var params = lockForm.getForm().getValues();
				Ext.Ajax.request({
							url		: 'index.do?code=unlockSystem',
							success	: function(response, opts) {
								var resultArray = Ext.util.JSON.decode(response.responseText);
								if (resultArray.flag == "1") {
									lockWindow.hide();
									setCookie("fuxianwu.lockflag", '0', 240);
								} else {
									Ext.Msg.alert('提示', '密码错误,请重新输入', function() {
												lockForm.form.reset();
												lockForm.findById('password_lock').focus();
											});
								}
							},
							failure	: function(response, opts) {
							},
							params	: params
						});
			}

			/**
			 * 皮肤窗口初始化
			 */
			function themeWindowInit() {
				for (i = 0; i < root.childNodes.length; i++) {
					var child = root.childNodes[i];
					if (default_theme == child.attributes.theme) {
						child.select();
					}
				}
				var o = document.getElementById('previewDiv');
				o.innerHTML = '<img src="./resource/image/theme/' + default_theme + '.jpg" />';
				themeWindow.show();
			}

			/**
			 * 保存用户自定义皮肤
			 */
			function saveUserTheme(o) {
				showWaitMsg();
				Ext.Ajax.request({
							url		: './index.do?code=saveUserTheme',
							success	: function(response) {
								var resultArray = Ext.util.JSON.decode(response.responseText);
								Ext.MessageBox.confirm('请确认', '您选择的[' + o.text + ']皮肤保存成功,立即应用该皮肤吗?<br>提示：页面会被刷新,请先确认是否有尚未保存的业务数据,以免丢失!', function(btn, text) {
											if (btn == 'yes') {
												showWaitMsg('正在为您应用皮肤...');
												location.reload();
											} else {
												Ext.Msg.alert('提示', '请在任何时候按[F5]键刷新页面或者重新登录系统以启用[' + o.text + ']皮肤!', function() {
															themeWindow.hide();
														});

											}
										});
							},
							failure	: function(response) {
								var resultArray = Ext.util.JSON.decode(response.responseText);
								Ext.Msg.alert('提示', '数据保存失败');
							},
							params	: {
								theme	: o.attributes.theme
							}
						});
			}

			/**
			 * 加载当前登录用户信息
			 */
			function updateUserInit() {
				userFormPanel.form.reset();
				userWindow.show();
				userWindow.on('show', function() {
							setTimeout(function() {
										userFormPanel.form.load({
													waitTitle	: '提示',
													waitMsg		: '正在读取用户信息,请稍候...',
													url			: 'index.do?code=loadUserInfo',
													success		: function(form, action) {
													},
													failure		: function(form, action) {
														Ext.Msg.alert('提示', '数据读取失败:' + action.failureType);
													}
												});
									}, 5);
						});
			}

			/**
			 * 修改用户信息
			 */
			function updateUser() {
				if (!userFormPanel.form.isValid()) {
					return;
				}
				password1 = Ext.getCmp('password1').getValue();
				password = Ext.getCmp('password').getValue();
				if (password1 != password) {
					Ext.Msg.alert('提示', '两次输入的密码不匹配,请重新输入!');
					Ext.getCmp('password').setValue('');
					Ext.getCmp('password1').setValue('');
					return;
				}
				userFormPanel.form.submit({
							url			: 'index.do?code=updateUserInfo',
							waitTitle	: '提示',
							method		: 'POST',
							waitMsg		: '正在处理数据,请稍候...',
							success		: function(form, action) {
								Ext.MessageBox.alert('提示', '密码修改成功', function() {
											userWindow.hide();
										});
							},
							failure		: function(form, action) {
								var flag = action.result.flag;
								if (flag == '0') {
									Ext.MessageBox.alert('提示', '您输入的当前密码验证失败,请重新输入', function() {
												Ext.getCmp('password2').setValue('');
												Ext.getCmp('password2').focus();
											});
								} else {
									Ext.MessageBox.alert('提示', '密码修改失败');
								}
							}
						});
			}

			function logout() {
				Ext.MessageBox.show({
							title	: '提示',
							msg		: '确认要注销系统,退出登录吗?',
							width	: 250,
							buttons	: Ext.MessageBox.YESNO,
							animEl	: Ext.getBody(),
							icon	: Ext.MessageBox.QUESTION,
							fn		: function(btn) {
								if (btn == 'yes') {
									Ext.MessageBox.show({
												title		: '请等待',
												msg			: '正在注销...',
												width		: 300,
												wait		: true,
												waitConfig	: {
													interval	: 50
												}
											});
									window.location.href = 'logout.html';
								}
							}
						});
			}

			if (getCookie("fuxianwu.lockflag") == '1') {
				lockWindow.show();
			}

			sendKeyF11();
		});

/**
 * 显示系统时钟
 */
function showTime() {
	var date = new Date();
	var h = date.getHours();
	h = h < 10 ? '0' + h : h;
	var m = date.getMinutes();
	m = m < 10 ? '0' + m : m;
	var s = date.getSeconds();
	s = s < 10 ? '0' + s : s;
	document.getElementById('rTime').innerHTML = h + ":" + m + ":" + s;
}

function getHost(url) {
	var host = "null";
	if (typeof url == "undefined" || null == url) {
		url = window.location.href;
	}
	var regex = /^\w+\:\/\/([^\/]*)\/([^\/]*).*/;
	var match = url.match(regex);
	if (typeof match != "undefined" && null != match) {
		host = match[1] + '/' + match[2] + '/login.html';
	}
	return host;
}

function addFavorite() {
	var favURL = "http://" + getHost(document.URL);
	if (document.all) {
		void(0);
	} else {
		window.sidebar.addPanel(parent.SYS_TITLE, favURL, '');
	}
	return false;
};

function setHomepage() {
	var vrl = "http://" + getHost(document.URL);
	// infoMsg(vrl);
	try {
		if (Ext.isIE) {
			document.body.style.behavior = 'url(#default#homepage)';
			document.body.setHomePage(vrl);
			// warningMsg('warning');
		} else {
			showDialog("非 IE 浏览器请手动设置首页!", 'notice');
			doane();
			// errorMsg('error');
		}
	} catch (e) {
		if (window.netscape) {
			try {
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			} catch (e) {
				warningMsg("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将[signed.applets.codebase_principal_support]设置为'true'");
			}
			var prefs = Components.classes['@@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
			prefs.setCharPref('browser.startup.homepage', vrl);
		}
	}
}

window.onload = function() {
	setInterval("showTime()", 1000);
};