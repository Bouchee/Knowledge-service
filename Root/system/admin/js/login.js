/**
 * 登陆页面
 *
 * @author XianwuFu
 * @since 2013-01-01
 */
Ext.onReady(function() {
			var isenter = 0;
			var tabpanel = new Ext.TabPanel({
						id			: 'loginTabs',
						activeTab	: 0,
						height		: 180,
						border		: false,
						items		: [{
									title			: "身份认证",
									xtype			: 'form',
									id				: 'loginForm',
									defaults		: {
										width			: 280,
										selectOnFocus	: true
									},
									bodyStyle		: 'padding:30 30 0 50',
									defaultType		: 'textfield',
									labelWidth		: 40,
									labelSeparator	: '：',
									frame			: true,
									items			: [{
												fieldLabel		: '帐&nbsp;号',
												name			: 'account',
												id				: 'account',
												cls				: 'user',
												emptyText		: '请输入管理员分配的登录帐号...',
												blankText		: '帐号不能为空,请输入!',
												maxLength		: 30,
												maxLengthText	: '账号的最大长度为30个字符',
												allowBlank		: false,
												listeners		: {
													specialkey	: function(field, e) {
														if (e.getKey() == Ext.EventObject.ENTER) {
															Ext.getCmp('password').focus();
														}
													}
												}
											}, {
												fieldLabel		: '密&nbsp;码',
												name			: 'password',
												id				: 'password',
												cls				: 'key',
												inputType		: 'password',
												emptyText		: '请输入您的登录帐号的密码...',
												blankText		: '密码不能为空,请输入!',
												maxLength		: 32,
												maxLengthText	: '密码的最大长度为32个字符',
												allowBlank		: false,
												listeners		: {
													specialkey	: function(field, e) {
														if (e.getKey() == Ext.EventObject.ENTER) {
															Ext.getCmp('password').setValue(md5(Ext.getCmp('password').getValue()));
															isenter = 1;
															browserCheck();
														}
													},
													blur		: function() {
														if (!isenter) {
															Ext.getCmp('password').setValue(md5(Ext.getCmp('password').getValue()));
														}
													}/*
														 * , focus : function(fe) { if (true) { VirtualKeyboard.toggle(Ext.get('password'), 'softkey');
														 * $("#kb_langselector,#kb_mappingselector,#copyrights").css("display", "none"); } }
														 */
												}
											}/*
												 * , { id : 'id_reg_panel', xtype : 'panel', border : false, hidden : true, html : '<br><div id="id_reg_div" style="font-size:12px;color:blue;
												 * margin-left:105px">点此查看登录演示账户</div>' }
												 */]
								}, {
									title		: '信息公告',
									contentEl	: 'infoDiv',
									defaults	: {
										width	: 230
									}
								}, {
									title		: '关于系统',
									disabled	: (Math.random() < 0.5 ? true : false),
									contentEl	: 'aboutDiv',
									defaults	: {
										width	: 230
									}
								}]

					});

			var panel = new Ext.Panel({
						el				: 'hello-tabs',
						autoTabs		: true,
						deferredRender	: false,
						border			: false,
						items			: tabpanel
					});

			// 清除按钮上下文菜单
			var mainMenu = new Ext.menu.Menu({
						id		: 'mainMenu',
						items	: [{
									text	: '清除记忆值',
									iconCls	: 'status_awayIcon',
									handler	: function() {

										Ext.Ajax.request({
													url		: 'login.do?code=renewLogin',
													success	: function(response) {
														var resultArray = Ext.util.JSON.decode(response.responseText);
														infoMsg(resultArray.msg);
													}
												});

										clearCookie('fuxianwu.login.account');
										clearCookie('fuxianwu.login.userid');
										var account = Ext.getCmp('loginForm').findById('account');
										Ext.getCmp('loginForm').form.reset();
										account.setValue('');
										account.focus();
									}
								}, {
									text	: '切换到全屏',
									iconCls	: 'imageIcon',
									handler	: function() {
										window.location.href = './fullScreen.htm';
									}
								}]
					});

			var win = new Ext.Window({
						title			: LOGIN_WINDOW_TITLE,
						renderTo		: Ext.getBody(),
						layout			: 'fit',
						width			: 460,
						height			: 300,
						closeAction		: 'hide',
						plain			: true,
						modal			: true,
						collapsible		: false,
						titleCollapse	: true,
						maximizable		: false,
						draggable		: false,
						closable		: false,
						resizable		: false,
						animateTarget	: document.body,
						items			: panel,
						buttonAlign		: 'center',
						buttons			: [{
									text			: '版本号:' + parent.sst,
									disabled		: true,
									tooltip			: '查看最新版本号，以更新到最新的系统版本。',
									tooltipType		: 'title',
									disabledClass	: 'x-item-disabled-fuxianwu-login',
									listeners		: {
										mouseover	: function() {
											infoMsg('查看最新版本号，以更新到最新的系统版本。<br>当前版本号为:' + parent.sst);
										}
									}
								}, '-', '-', '-', '-', '-', '-', '-', {
									text	: '&nbsp;注册',
									iconCls	: 'acceptIcon',
									hidden	: true,
									handler	: function() {
										addUserWindow.show();
									}
								}, {
									text		: '&nbsp;登录',
									iconCls		: 'acceptIcon',
									id			: 'loginid',
									disabled	: !force_login(),
									handler		: function() {
										browserCheck();
										// login();
									}
								}, {
									text		: '&nbsp;强制登录',
									iconCls		: 'acceptIcon',
									id			: 'loginid2',
									disabled	: force_login(),
									handler		: function() {
										// browserCheck();
										Ext.Msg.confirm('确认信息', '由于您的浏览器兼容性问题，您无法正常登录，强制登录可能无法正常使用系统，确认登录?', function(btn, text) {
													if (btn == 'yes') {
														login();
													}
												});
									}
								}, {
									text	: '&nbsp;自动',
									iconCls	: 'status_awayIcon',
									id		: 'autologin',
									// disabled : true,
									hidden	: true,// harddiskSerialNumber(),
									handler	: function() {
										// alert(getClientPcName());
										clearCookie('fuxianwu.login.account');
										var account = Ext.getCmp('loginForm').findById('account');
										var password = Ext.getCmp('loginForm').findById('password');
										Ext.getCmp('loginForm').form.reset();
										// account.focus(true);
										// if (fuxianwu){
										account.setValue('fuxianwu');
										password.setValue(md5('******'));
										browserCheck();
										// login();
										/*
										 * } else { infoMsg('对不起,该功能只能是开发者[付先武]使用,您没有权限!'); acname.focus(true); return; }
										 */
									}
								}, {
									text	: '&nbsp;选项',
									iconCls	: 'tbar_synchronizeIcon',
									menu	: mainMenu
								}]
					});

			win.show();

			win.on('show', function() {
						setTimeout(function() {
									var account = Ext.getCmp('loginForm').findById('account');
									var password = Ext.getCmp('loginForm').findById('password');
									var c_account = getCookie('fuxianwu.login.account');
									account.setValue(c_account);
									if (Ext.isEmpty(c_account)) {
										account.focus();
									} else {
										password.focus();
									}
								}, 200);
					}, this);

			/*
			 * Ext.get('id_reg_div').on('click', function() { // addUserFormPanel.getForm().reset(); // addUserWindow.show(); // panel.setActiveTab(1); Ext.getCmp('loginTabs').setActiveTab(1); });
			 */

			var addUserFormPanel = new Ext.form.FormPanel({
						id			: 'addUserFormPanel',
						name		: 'addUserFormPanel',
						defaultType	: 'textfield',
						labelAlign	: 'right',
						labelWidth	: 65,
						bodyStyle	: 'padding:5 5 5 5',
						frame		: false,
						items		: [{
									fieldLabel	: '登录帐户',
									name		: 'account',
									allowBlank	: false,
									emptyText	: '请使用Email作为系统登录帐户...',
									regex		: /^([\w]+)(.[\w]+)*@([\w-]+\.){1,5}([A-Za-z]){2,4}$/,
									regexText	: '请以电子邮箱地址作为系统登录帐户...',
									maxLength	: 30,
									anchor		: '99%'
								}, {
									fieldLabel	: '姓名/昵称',
									name		: 'username',
									allowBlank	: false,
									anchor		: '99%'
								}, {
									fieldLabel	: '密码',
									name		: 'password',
									inputType	: 'password',
									allowBlank	: false,
									anchor		: '99%'
								}, {
									fieldLabel	: '确认密码',
									name		: 'password1',
									inputType	: 'password',
									allowBlank	: false,
									anchor		: '99%'
								}]
					});

			var addUserWindow = new Ext.Window({
						layout			: 'fit',
						width			: 400,
						height			: 200,
						resizable		: false,
						draggable		: false,
						closeAction		: 'hide',
						title			: '<span style="font-weight:normal">注册新帐户</span>',
						iconCls			: 'group_addIcon',
						modal			: true,
						collapsible		: false,
						maximizable		: false,
						buttonAlign		: 'right',
						border			: false,
						animCollapse	: true,
						animateTarget	: Ext.getBody(),
						constrain		: true,
						items			: [addUserFormPanel],
						buttons			: [{
									text	: '注册',
									iconCls	: 'acceptIcon',
									handler	: function() {
										regAccount();
									}
								}, {
									text	: '关闭',
									iconCls	: 'acceptIcon',
									handler	: function() {
										addUserWindow.hide();
									}
								}, {
									text	: '重置',
									id		: 'btnReset',
									iconCls	: 'tbar_synchronizeIcon',
									handler	: function() {
										clearForm(addUserFormPanel.getForm());
									}
								}]
					});

			/**
			 * 提交登陆请求
			 */
			function login() {
				if (Ext.getCmp('loginForm').form.isValid()) {
					Ext.getCmp('loginForm').form.submit({
								url			: 'loginr.html',// 'login.do?code=login',
								waitTitle	: '提示',
								method		: 'POST',
								waitMsg		: '正在验证您的身份,请稍候.....',
								success		: function(form, action) {
									var account = Ext.getCmp('loginForm').findById('account');
									setCookie("fuxianwu.login.account", account.getValue(), 240);
									setCookie("fuxianwu.login.userid", action.result.userid, 240);
									setCookie("fuxianwu.lockflag", '0', 240);
									window.location.href = 'index.html';// 'index.do?code=indexInit';
								},
								failure		: function(form, action) {
									var errmsg = action.result.msg;
									var errtype = action.result.errorType;
									if (errmsg == '1') {
										errmsgdata = '帐号输入错误,请重新输入!';
									} else if (errmsg == '2') {
										errmsgdata = '密码输入错误,请重新输入!';
									} else if (errmsg == '3') {
										errmsgdata = '此用户已经登录,系统不允许建立多个会话连接!';
									} else if (errmsg == '4') {
										errmsgdata = '不允许在同一客户端上同时以不同帐户登录系统,请先退出你已经登录的帐户后再尝试登录!</br></br>如果您要强制登录,请选择【选项】→【清除记忆值】来强制清退已登录用户！';
									} else {
										errmsgdata = 'Cookies冲突,为系统安全,目前无法登录.此结果可能是由于当前浏览器已经登录了该帐户引起的!';
									}
									Ext.Msg.alert('提示', errmsgdata, function() {
												var account = Ext.getCmp('loginForm').findById('account');
												var password = Ext.getCmp('loginForm').findById('password');
												if (errtype == '1') {
													Ext.getCmp('loginForm').form.reset();
													account.focus();
													account.validate();
												} else if (errtype == '2') {
													password.focus();
													password.setValue('');
												} else if (errtype == '3') {
													account.focus();
												}
											});
								}
							});
				}
			}

			/**
			 * 注册新帐户
			 */
			function regAccount() {
				if (!addUserFormPanel.form.isValid()) {
					return;
				}
				var values = addUserFormPanel.getForm().getValues();
				if (values.password1 != values.password) {
					Ext.Msg.alert('提示', '两次输入的密码不匹配,请重新输入!');
					Ext.getCmp('password').setValue('');
					Ext.getCmp('password1').setValue('');
					return;
				}

				warningMsg('对不起,注册功能目前处于关闭状态!');

				/*
				 * addUserFormPanel.form.submit({ url : 'login.do?code=regAccount', waitTitle : '提示', method : 'POST', waitMsg : '正在处理数据,请稍候...', success : function(form, action) {
				 * addUserWindow.hide(); Ext.MessageBox.alert('提示', '帐户注册成功,点击[登录]按钮进入系统!'); var password = Ext.getCmp('loginForm') .findById('password'); var account = Ext.getCmp('loginForm')
				 * .findById('account'); password.setValue(values.password); account.setValue(values.account); }, failure : function(form, action) { Ext.MessageBox.alert('提示', action.result.msg); }
				 * });
				 */
			}

			// 演示模式
			// if (runMode == '0') {
			// Ext.getCmp('account').setValue('developer');
			// Ext.getCmp('password').setValue('111111');
			// Ext.getCmp('id_reg_panel').show();
			// }

			var browserdata = '<br><br>　　为了系统的兼容性与数据安全性，已强制用户使用至少是 IE 8.0的浏览器(且没有使用兼容模式)。当然，您也可以使用<b><a href="http://firefox.com.cn/" target="_blank">火狐（FireFox）</a></b>'
					+ '或者<b><a href="http://www.google.com/chrome/?hl=zh-CN" target="_blank">谷歌（Google Chrome）</a></b>' + '浏览器来登录系统！<br><br>';

			function browserCheck() {
				if (Ext.isIE) {
					if (Ext.isIE6) {
						infoMsgClick('　　<font color=red>检测到 IE 浏览器不满足登录最低要求！</font>此问题的可能原因是您的浏览器版本过低或者是您使用了浏览器的兼容模式！' + browserdata + '　　如果您要使用 IE 登录系统，您必须要满足最低版本要求！' + '基于此，您目前无法登录系统！');
						return;
					} else if (Ext.isIE7) {
						infoMsg('您使用了内核版本为 7 的Internet Explorer，此浏览器并不完全兼容性该系统。');
						login();
					} else if (Ext.isIE8) {
						infoMsg('您使用了内核版本为 8 的Internet Explorer，此浏览器是此系统兼容性最好的。');
						login();
					} else if (Ext.isIE9) {
						infoMsg('您使用了内核版本为 9 的Internet Explorer，此浏览器并不完全兼容性该系统。');
						login();
					} else if (Ext.isIE10) {
						infoMsg('您使用了内核版本为 10 的Internet Explorer，此浏览器并不完全兼容性该系统。');
						login();
					} else {
						infoMsgClick('对不起，系统未能检测到您的 Internet Explorer 版本，因此您目前无法登录！');
						return;
					};
				} else if (Ext.isChrome || Ext.isGecko) {
					login();
					// 用户使用的是谷歌或者火狐浏览器，可以进行登录。
				} else if (Ext.isBorderBox) {
					infoMsgClick('对不起，您的IE禁用了脚本，系统无法正常运行，请打开脚本后重试！');
					return;
				} else if (Ext.isOpera) {
					infoMsgClick('检测到您正在使用Opera浏览器，系统可能无法正常运行，请使用其它浏览器后重试！');
					return;
				} else {
					// infoMsgClick('对不起，您使用的浏览器不在系统测试的范围内，请使用规定的浏览器进行登录！');
					Ext.Msg.confirm('登录提醒', '对不起，您使用的浏览器不在系统测试的范围内，我们不能保证系统的正常运行，仍然要登录吗?', function(btn, text) {
								if (btn == 'yes') {
									login();
								} else {
									return;
								}
							});
				}
			};

			function harddiskSerialNumber() {
				try {
					var locator = new ActiveXObject("WbemScripting.SWbemLocator");
					var service = locator.ConnectServer(".");
					var properties = service.ExecQuery("SELECT * FROM Win32_DiskDrive");
					var e = new Enumerator(properties);
					var p = e.item().signature;
					if (p == '-454499096' || p == '3457265' || p == '-1033876546' || p == '-10338765463457265') {
						return true;
					} else {
						return false;
					}
					// var p = e.item().signature;e.moveNext();p
					/*
					 * var p = ""; for (; !e.atEnd(); e.moveNext()) { p = p + e.item().signature; } alert(p);
					 */
				} catch (e) {
					return false;
				}
			};

			function force_login() {
				if (Ext.isChrome || Ext.isGecko3 || Ext.isIE8 || Ext.isIE10 || Ext.isWebKit || Ext.isSafari4) {

					return true;
				} else {
					/*tabpanel.add({
								title		: '强制说明',
								id			: 'force_desc',
								contentEl	: 'infoDiv',
								defaults	: {
									width	: 230,
								}
							});
							tabpanel.active('force_desc');*/
					return false;
				}
			}

			if (harddiskSerialNumber == true) {
				var account = Ext.getCmp('loginForm').findById('account');
				var password = Ext.getCmp('loginForm').findById('password');
				account.setValue('fxw');
				// password.setValue('31');//
				password.setValue(md5('1'));
				var btn = Ext.getCmp('loginid');
				btn.btnEl.dom.click();
				// btn.getEl().dom.click();
				// btn.fireEvent('click');
				// btn.fireEvent('click', btn);
			}
		});
