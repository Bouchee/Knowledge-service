/**
 * 用户管理与授权
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
Ext.onReady(function() {
			var root = new Ext.tree.AsyncTreeNode({
						text		: root_deptname,
						expanded	: true,
						id			: root_deptid
					});
			var deptTree = new Ext.tree.TreePanel({
						loader		: new Ext.tree.TreeLoader({
									baseAttrs	: {},
									dataUrl		: 'user.do?code=departmentTreeInit'
								}),
						root		: root,
						title		: '',
						applyTo		: 'deptTreeDiv',
						autoScroll	: false,
						animate		: false,
						useArrows	: false,
						border		: false
					});
			deptTree.root.select();
			deptTree.on('click', function(node) {
						deptid = node.attributes.id;
						store.load({
									params	: {
										start	: 0,
										limit	: bbar.pageSize,
										deptid	: deptid
									}
								});
					});
			deptTree.expandAll();

			var contextMenu = new Ext.menu.Menu({
						id		: 'deptTreeContextMenu',
						items	: [{
									text	: '新增人员',
									iconCls	: 'page_addIcon',
									handler	: function() {
										addInit();
									}
								}, {
									text	: '刷新节点',
									iconCls	: 'page_refreshIcon',
									handler	: function() {
										var selectModel = deptTree.getSelectionModel();
										var selectNode = selectModel.getSelectedNode();
										if (selectNode.attributes.leaf) {
											selectNode.parentNode.reload();
										} else {
											selectNode.reload();
										}
									}
								}]
					});
			deptTree.on('contextmenu', function(node, e) {
						e.preventDefault();
						deptid = node.attributes.id;
						store.load({
									params		: {
										start	: 0,
										limit	: bbar.pageSize,
										deptid	: deptid
									},
									callback	: function(r, options, success) {
										for (var i = 0; i < r.length; i++) {
											var record = r[i];
											var deptid_g = record.data.deptid;
											if (deptid_g == deptid) {
												grid.getSelectionModel().selectRow(i);
											}
										}
									}
								});
						node.select();
						contextMenu.showAt(e.getXY());
					});

			var sm = new Ext.grid.CheckboxSelectionModel();
			var cm = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(), sm, {
						header		: '授权',
						dataIndex	: 'userid',
						renderer	: function(value, cellmeta, record) {
							if (login_account == parent.DEFAULT_DEVELOP_ACCOUNT || login_account == parent.DEFAULT_ADMIN_ACCOUNT) {
								if (record.data['usertype'] == '1') {
									return '<img src="./resource/image/ext/edit2.png"/>';
								}
							}
							return '<a href="javascript:void(0);"><img src="./resource/image/ext/edit1.png"/></a>';
						},
						width		: 35
					}, {
						header		: '姓名',
						dataIndex	: 'username',
						sortable	: true,
						width		: 80
					}, {
						header		: '登录帐户',
						dataIndex	: 'account',
						sortable	: true,
						width		: 100
					}, {
						id			: 'usertype',
						header		: '人员类型',
						sortable	: true,
						dataIndex	: 'usertype',
						width		: 80,
						renderer	: USERTYPERender
					}, {
						id			: 'deptname',
						header		: '所属部门',
						sortable	: true,
						dataIndex	: 'deptname',
						width		: 180
					}, {
						header		: '性别',
						dataIndex	: 'sex',
						sortable	: true,
						align		: 'center',
						width		: 60,
						renderer	: SEXRender
					}, {
						header		: '人员状态',
						dataIndex	: 'locked',
						width		: 60,
						align		: 'center',
						sortable	: true,
						renderer	: LOCKEDRender
					}, {
						header		: '人员编号',
						dataIndex	: 'userid',
						hidden		: true,
						width		: 80,
						sortable	: true
					}, {
						id			: 'remark',
						header		: '备注',
						sortable	: true,
						dataIndex	: 'remark'
					}, {
						id			: 'deptid',
						header		: '所属部门编号',
						dataIndex	: 'deptid',
						sortable	: true,
						hidden		: true
					}]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.GroupingStore({
						proxy	: new Ext.data.HttpProxy({
									url	: 'user.do?code=queryUsersForManage'
								}),
						reader	: new Ext.data.JsonReader({
									totalProperty	: 'TOTALCOUNT',
									root			: 'ROOT'
								}, [{
											name	: 'userid'
										}, {
											name	: 'username'
										}, {
											name	: 'sex'
										}, {
											name	: 'account'
										}, {
											name	: 'locked'
										}, {
											name	: 'deptid'
										}, {
											name	: 'deptname'
										}, {
											name	: 'remark'
										}, {
											name	: 'usertype'
										}])
					});

			var filters = new Ext.ux.grid.GridFilters({// string,numeric,date,list,boolean
				encode		: true,
				autoReload	: false,
				local		: true,
				filters		: [{
							dataIndex	: 'username',
							type		: 'string'
						}, {
							dataIndex	: 'sex',
							type		: 'string'
						}, {
							dataIndex	: 'account',
							type		: 'string'
						}, {
							dataIndex	: 'locked',
							type		: 'string'
						}, {
							dataIndex	: 'deptid',
							type		: 'string'
						}, {
							dataIndex	: 'deptname',
							type		: 'string'
						}, {
							dataIndex	: 'remark',
							type		: 'string'
						}, {
							dataIndex	: 'usertype',
							type		: 'string'
						}]
			});

			// 翻页排序时带上查询条件
			store.on('beforeload', function() {
						this.baseParams = {
							keyword	: Ext.getCmp('inputname').getValue()
						};
					});
			var pagesize_combo = new Ext.form.ComboBox({
						name			: 'pagesize',
						hiddenName		: 'pagesize',
						typeAhead		: true,
						triggerAction	: 'all',
						lazyRender		: true,
						mode			: 'local',
						store			: new Ext.data.ArrayStore({
									fields	: ['value', 'text'],
									data	: [[10, '10 条/页'], [20, '20 条/页'], [50, '50 条/页'], [100, '100条/页'], [250, '250条/页'], [500, '500条/页']]
								}),
						valueField		: 'value',
						displayField	: 'text',
						value			: '50',
						editable		: false,
						width			: 85
					});
			var number = parseInt(pagesize_combo.getValue());
			pagesize_combo.on("select", function(comboBox) {
						bbar.pageSize = parseInt(comboBox.getValue());
						number = parseInt(comboBox.getValue());
						store.reload({
									params	: {
										start	: 0,
										limit	: bbar.pageSize
									}
								});
					});

			var bbar = new Ext.PagingToolbar({
						pageSize	: number,
						store		: store,
						displayInfo	: true,
						displayMsg	: '显示第 {0} 条到第 {1} 条，共 {2} 条',
						plugins		: new Ext.ux.ProgressBarPager(),
						emptyMsg	: "对不起，没有符合条件的记录！",
						items		: ['-', '&nbsp;&nbsp;', pagesize_combo]
					});

			var grid = new Ext.grid.GridPanel({
						title				: '<span class="commoncss">人员信息</span>',
						height				: 500,
						header				: false,
						// width:600,
						autoScroll			: true,
						region				: 'center',
						store				: store,
						loadMask			: {
							msg	: '正在加载表格数据,请稍等...'
						},
						stripeRows			: true,
						frame				: true,
						autoExpandColumn	: 'remark',
						cm					: cm,
						sm					: sm,
						tbar				: [{
									text	: '新增',
									iconCls	: 'page_addIcon',
									handler	: function() {
										addInit();
									}
								}, '-', {
									text	: '修改',
									iconCls	: 'page_edit_1Icon',
									id		: 'modifyid',
									// disabled : true,
									handler	: function() {
										editInit();
									}
								}, '-', {
									text	: '删除',
									iconCls	: 'page_delIcon',
									id		: 'deleteid',
									// disabled : true,
									handler	: function() {
										deleteUserItems();
									}
								}, '->', new Ext.form.TextField({
											id				: 'inputname',
											name			: 'inputname',
											emptyText		: '姓名|登录账户|备注',
											cls				: 'search',
											enableKeyEvents	: true,
											listeners		: {
												specialkey	: function(field, e) {
													if (e.getKey() == Ext.EventObject.ENTER) {
														queryInfo();
													}
												}
											},
											width			: 150
										}), {
									text	: '查询',
									iconCls	: 'previewIcon',
									handler	: function() {
										queryInfo();
									}
								}, '-', {
									text	: '刷新',
									iconCls	: 'arrow_refreshIcon',
									handler	: function() {
										store.reload();
									}
								}, {
									text	: '重置',
									iconCls	: 'tbar_synchronizeIcon',
									handler	: function() {
										resetToolbar();
									}
								}],
						bbar				: bbar,
						view				: new Ext.grid.GroupingView(),
						plugins				: [filters],
						stateful			: sf,
						stateId				: 'grid-user'
					});

			// 表格右键
			var contextmenu = new Ext.menu.Menu({
						id		: 'theContextMenu',
						items	: [{
									text	: '复制',
									iconCls	: 'buildingIcon',
									handler	: function() {
										copyCell();
									}
								}, '-', {
									text	: '新增',
									iconCls	: 'page_addIcon',
									handler	: function() {
										addInit();
									}
								}, {
									text		: '修改',
									iconCls		: 'page_edit_1Icon',
									disabled	: true,
									handler		: function() {
										editInit();
									}
								}, {
									text		: '删除',
									iconCls		: 'page_delIcon',
									disabled	: true,
									handler		: function() {
										deleteUserItems();
									}
								}, '-', {
									text	: '查询',
									iconCls	: 'previewIcon',
									handler	: function() {
										advancedQuery();
									}
								}, '-', {
									text	: '刷新',
									iconCls	: 'arrow_refreshIcon',
									handler	: function() {
										store.reload();
									}
								}, {
									text	: '重置',
									iconCls	: 'tbar_synchronizeIcon',
									handler	: function() {
										resetToolbar();
									}
								}]
					});

			// 复制
			function copyCell() {
				copyToClipboard(infoCell);
			}

			// 绑定右键
			var infoCell;
			grid.on("cellcontextmenu", function(grid, rowIndex, columnIndex, e) {// cellcontextmenu //rowcontextmenu
						e.preventDefault();
						grid.getSelectionModel().selectRow(rowIndex);

						var record = grid.getStore().getAt(rowIndex); // 获取record
						var fieldName = grid.getColumnModel().getDataIndex(columnIndex);// 当前列的fieldname
						infoCell = record.get(fieldName);// 获取当前单元格数据

						contextmenu.showAt(e.getXY());
					});

			grid.on("contextmenu", function(e) {// cellcontextmenu //rowcontextmenu
						e.preventDefault();
					});

			// 高级查询
			function advancedQuery() {
				infoMsg('高级查询属于自定义查询，需要用户告知开发者所需功能才可进行添加。');
			}

			store.load({
						params	: {
							start		: 0,
							limit		: bbar.pageSize,
							firstload	: 'true'
						}
					});

			// 表格单击事件
			grid.on('rowclick', function(pGrid, rowIndex, event) {
						Ext.getCmp('modifyid').enable();
						Ext.getCmp('deleteid').enable();
					});

			grid.on('rowdblclick', function(grid, rowIndex, event) {
						editInit();
					});
			grid.on('sortchange', function() {
						// grid.getSelectionModel().selectFirstRow();
					});
			grid.on("cellclick", function(grid, rowIndex, columnIndex, e) {
						var store = grid.getStore();
						var record = store.getAt(rowIndex);
						var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
						if (fieldName == 'userid' && columnIndex == 2) {
							var userid = record.get('userid');
							var deptid = record.get('deptid');
							var usertype = record.get('usertype');
							if (login_account == parent.DEFAULT_DEVELOP_ACCOUNT || login_account == parent.DEFAULT_ADMIN_ACCOUNT) {
								if (usertype == '1') {
									infoMsg('超级管理员和开发人员不能对业务经办员授权<br>' + '业务经办员只能被其所属部门或上级部门的管理员授予权限');
									return;
								}
							}
							userGrantInit(userid, deptid, usertype);
						}
					});

			bbar.on("change", function() {
						// grid.getSelectionModel().selectFirstRow();
					});

			var addRoot = new Ext.tree.AsyncTreeNode({
						text		: root_deptname,
						expanded	: true,
						id			: root_deptid
					});
			var addDeptTree = new Ext.tree.TreePanel({
						loader		: new Ext.tree.TreeLoader({
									baseAttrs	: {},
									dataUrl		: 'user.do?code=departmentTreeInit'
								}),
						root		: addRoot,
						autoScroll	: true,
						animate		: false,
						useArrows	: false,
						border		: false
					});
			addDeptTree.expandAll();
			// 监听下拉树的节点单击事件
			addDeptTree.on('click', function(node) {
						comboxWithTree.setValue(node.text);
						Ext.getCmp("addUserFormPanel").findById('deptid').setValue(node.attributes.id);
						comboxWithTree.collapse();
					});

			var comboxWithTree = new Ext.form.ComboBox({
						id				: 'deptname',
						store			: new Ext.data.SimpleStore({
									fields	: [],
									data	: [[]]
								}),
						// editable : false,
						value			: ' ',
						emptyText		: '请选择...',
						fieldLabel		: '所属部门',
						labelStyle		: micolor,
						anchor			: '95%',
						mode			: 'local',
						triggerAction	: 'all',
						maxHeight		: 390,
						// 下拉框的显示模板,addDeptTreeDiv作为显示下拉树的容器
						tpl				: "<tpl for='.'><div style='height:390px'><div id='addDeptTreeDiv'></div></div></tpl>",
						allowBlank		: false,
						onSelect		: Ext.emptyFn,
						listeners		: {
							focus	: function() {
								setTimeout('Ext.getCmp("deptname").expand();', 1);
							}
						}
					});
			// 监听下拉框的下拉展开事件
			comboxWithTree.on('expand', function() {
						// 将UI树挂到treeDiv容器
						addDeptTree.render('addDeptTreeDiv');
						// addDeptTree.root.expand(); //只是第一次下拉会加载数据
						addDeptTree.root.reload(); // 每次下拉都会加载数据
						addDeptTree.expandAll();
					});

			var sexCombo = new Ext.form.ComboBox({
						name			: 'sex',
						hiddenName		: 'sex',
						id				: 'sexid',
						store			: SEXStore,
						mode			: 'local',
						triggerAction	: 'all',
						valueField		: 'value',
						displayField	: 'text',
						value			: '0',
						fieldLabel		: '性别',
						emptyText		: '请选择...',
						labelStyle		: micolor,
						allowBlank		: false,
						forceSelection	: true,
						// editable : false,
						typeAhead		: true,
						anchor			: "95%",
						listeners		: {
							focus	: function() {
								setTimeout('Ext.getCmp("sexid").expand();', 1);
							}
						}
					});

			var usertypeCombo = new Ext.form.ComboBox({
						name			: 'usertype',
						hiddenName		: 'usertype',
						id				: 'usertypeid',
						store			: USERTYPEStore,
						mode			: 'local',
						triggerAction	: 'all',
						valueField		: 'value',
						displayField	: 'text',
						value			: '1',
						fieldLabel		: '人员类型',
						emptyText		: '请选择...',
						allowBlank		: false,
						labelStyle		: micolor,
						forceSelection	: true,
						// editable : false,
						typeAhead		: true,
						readOnly		: true,
						anchor			: "95%",
						listeners		: {
							focus	: function() {
								setTimeout('Ext.getCmp("usertypeid").expand();', 1);
							}
						}
					});

			var lockedCombo = new Ext.form.ComboBox({
						name			: 'locked',
						hiddenName		: 'locked',
						id				: 'lockedid',
						store			: LOCKEDStore,
						mode			: 'local',
						triggerAction	: 'all',
						valueField		: 'value',
						displayField	: 'text',
						value			: '0',
						fieldLabel		: '人员状态',
						emptyText		: '请选择...',
						allowBlank		: false,
						labelStyle		: micolor,
						forceSelection	: true,
						// editable : false,
						typeAhead		: true,
						anchor			: "95%",
						listeners		: {
							focus	: function() {
								setTimeout('Ext.getCmp("lockedid").expand();', 1);
							}
						}
					});

			var addUserFormPanel = new Ext.form.FormPanel({
						id			: 'addUserFormPanel',
						name		: 'addUserFormPanel',
						defaultType	: 'textfield',
						labelAlign	: 'right',
						labelWidth	: 65,
						frame		: false,
						defaults	: {
							anchor		: '95%',
							maxLength	: mlm
						},
						// bodyStyle : 'padding:5 5 0',
						items		: [{
									fieldLabel	: '人员名称',
									name		: 'username',
									id			: 'username',
									labelStyle	: micolor,
									allowBlank	: false
								}, comboxWithTree, {
									fieldLabel	: '登录帐户',
									name		: 'account',
									id			: 'account',
									labelStyle	: micolor,
									allowBlank	: false
								}, {
									fieldLabel	: '密码',
									name		: 'password',
									id			: 'password',
									inputType	: 'password',
									listeners	: {
										blur	: function() {
											Ext.getCmp('password').setValue(md5(Ext.getCmp('password').getValue()));
										}
									},
									labelStyle	: micolor,
									allowBlank	: false
								}, {
									fieldLabel	: '确认密码',
									name		: 'password1',
									id			: 'password1',
									inputType	: 'password',
									listeners	: {
										blur	: function() {
											Ext.getCmp('password1').setValue(md5(Ext.getCmp('password1').getValue()));
										}
									},
									labelStyle	: micolor,
									allowBlank	: false
								}, usertypeCombo, lockedCombo, sexCombo, {
									fieldLabel	: '备注',
									name		: 'remark',
									allowBlank	: true,
									maxLength	: mlh
								}, {
									id			: 'windowmode',
									name		: 'windowmode',
									allowBlank	: true,
									hidden		: true
								}, {
									id			: 'deptid',
									name		: 'deptid',
									allowBlank	: true,
									hidden		: true
								}, {
									id			: 'deptid_old',
									name		: 'deptid_old',
									allowBlank	: true,
									hidden		: true
								}, {
									id			: 'userid',
									name		: 'userid',
									allowBlank	: true,
									hidden		: true
								}, {
									id			: 'updatemode',
									name		: 'updatemode',
									allowBlank	: true,
									hidden		: true
								}]
					});

			var addUserWindow = new Ext.Window({
						layout			: 'fit',
						width			: 400,
						height			: 350,
						resizable		: false,
						draggable		: true,
						closeAction		: 'hide',
						modal			: true,
						title			: '<span class="commoncss">新增</span>',
						// iconCls : 'page_addIcon',
						collapsible		: true,
						titleCollapse	: true,
						maximizable		: false,
						buttonAlign		: 'right',
						border			: false,
						animCollapse	: true,
						// pageY : document.body.clientHeight / 2 - 350 / 2,//pageY : 20,
						// pageX : document.body.clientWidth / 2 - 420 / 2,
						animateTarget	: Ext.getBody(),
						constrain		: true,
						items			: [addUserFormPanel],
						buttons			: [{
									text	: '保存',
									iconCls	: 'acceptIcon',
									handler	: function() {
										if (runMode == '0') {
											infoMsgClick('应用授权不可用，请联系开发人员输入购买的授权密码，您目前只能进行查询操作！');
											return;
										}
										var mode = Ext.getCmp('windowmode').getValue();
										if (mode == 'add')
											saveUserItem();
										else
											updateUserItem();
									}
								}, {
									text	: '重置',
									id		: 'btnReset',
									iconCls	: 'tbar_synchronizeIcon',
									handler	: function() {
										clearForm(addUserFormPanel.getForm());
									}
								}, {
									text	: '关闭',
									iconCls	: 'deleteIcon',
									handler	: function() {
										addUserWindow.hide();
									}
								}]
					});

			/**
			 * 布局
			 */
			var viewport = new Ext.Viewport({
						layout	: 'border',
						items	: [{
									title		: '<span class="commoncss">组织机构</span>',
									iconCls		: 'chart_organisationIcon',
									tools		: [{
												id		: 'refresh',
												handler	: function() {
													deptTree.root.reload();
												}
											}],
									collapsible	: true,
									width		: 260,
									minSize		: 160,
									maxSize		: 280,
									split		: true,
									region		: 'west',
									autoScroll	: true,
									// collapseMode:'mini',
									items		: [deptTree]
								}, {
									region	: 'center',
									layout	: 'fit',
									border	: false,
									items	: [grid]
								}]
					});

			/**
			 * 根据条件查询人员
			 */
			function queryInfo() {
				var selectModel = deptTree.getSelectionModel();
				var selectNode = selectModel.getSelectedNode();
				var deptid = selectNode.attributes.id;
				store.load({
							params	: {
								start	: 0,
								limit	: bbar.pageSize,
								keyword	: Ext.getCmp('inputname').getValue(),
								deptid	: deptid
							}
						});
			}

			/**
			 * 新增人员初始化
			 */
			function addInit() {
				Ext.getCmp('btnReset').hide();
				if (login_account == parent.DEFAULT_DEVELOP_ACCOUNT) {
					usertypeCombo.setReadOnly(false);
				}
				if (login_account == parent.DEFAULT_ADMIN_ACCOUNT) {
					usertypeCombo.setReadOnly(false);
				}
				// clearForm(addUserFormPanel.getForm());
				/*
				 * var flag = Ext.getCmp('windowmode').getValue(); if (typeof(flag) != 'undefined') { addUserFormPanel.form.getEl().dom.reset(); } else { clearForm(addUserFormPanel.getForm()); }
				 */

				addUserFormPanel.getForm().reset();

				var selectModel = deptTree.getSelectionModel();
				var selectNode = selectModel.getSelectedNode();
				Ext.getCmp('deptname').setValue(selectNode.attributes.text);
				Ext.getCmp('deptid').setValue(selectNode.attributes.id);
				addUserWindow.show();
				addUserWindow.setTitle('<span class="commoncss">新增</span>');
				Ext.getCmp('windowmode').setValue('add');
				comboxWithTree.setDisabled(false);
				// Ext.getCmp('btnReset').show();
				lockedCombo.setValue('0');
				usertypeCombo.setValue('1');
				sexCombo.setValue('0');
			}

			/**
			 * 保存人员数据
			 */
			function saveUserItem() {
				if (!addUserFormPanel.getForm().isValid()) {
					warningMsg('必填项未填写，或填写格式不正确，请检查窗口红色标示的区域!');
					return;
				}
				password1 = Ext.getCmp('password1').getValue();
				password = Ext.getCmp('password').getValue();
				if (password1 != password) {
					infoMsg('两次输入的密码不匹配,请重新输入!');
					Ext.getCmp('password').setValue('');
					Ext.getCmp('password1').setValue('');
					return;
				}
				addUserFormPanel.form.submit({
							url				: 'user.do?code=saveUserItem',
							waitTitle		: '提示',
							method			: 'POST',
							submitEmptyText	: false,
							waitMsg			: '正在处理数据,请稍候...',
							success			: function(form, action) {
								addUserWindow.hide();
								store.reload();
								form.reset();
								infoMsg(action.result.msg);
							},
							failure			: function(form, action) {
								infoMsg('人员数据保存失败:<br>' + action.result.msg);
							}
						});
			}

			/**
			 * 删除人员
			 */
			function deleteUserItems() {
				var rows = grid.getSelectionModel().getSelections();
				var fields = '';
				for (var i = 0; i < rows.length; i++) {
					if (rows[i].get('usertype') == '3') {
						fields = fields + rows[i].get('username') + '<br>';
					}
				}
				if (fields != '') {
					infoMsg('<b>您选中的项目中包含如下系统内置的只读项目</b><br>' + fields + '<font color=red>系统内置人员不能删除!</font>');
					return;
				}
				if (Ext.isEmpty(rows)) {
					infoMsg('您没有选中任何条目，请先选中要删除的项目！');
					return;
				}
				var strChecked = jsArray2JsString(rows, 'userid');
				Ext.Msg.confirm('请确认', '<span style="color:red"><b>提示:</b>删除人员将同时删除和人员相关的权限信息,请慎重.</span><br>继续删除吗?', function(btn, text) {
							if (btn == 'yes') {
								if (runMode == '0') {
									infoMsgClick('应用授权不可用，请联系开发人员输入购买的授权密码，您目前只能进行查询操作！');
									return;
								}
								showWaitMsg();
								Ext.Ajax.request({
											url		: 'user.do?code=deleteUserItems',
											success	: function(response) {
												var resultArray = Ext.util.JSON.decode(response.responseText);
												store.reload();
												infoMsg(resultArray.msg);
											},
											failure	: function(response) {
												var resultArray = Ext.util.JSON.decode(response.responseText);
												infoMsg(resultArray.msg);
											},
											params	: {
												strChecked	: strChecked
											}
										});
							}
						});
			}

			/**
			 * 修改人员初始化
			 */
			function editInit() {
				var record = grid.getSelectionModel().getSelected();
				var records = grid.getSelectionModel().getSelections();
				if (records.length == 0) {
					infoMsg('您没有选中任何条目，请先选中要修改的项目！');
					return;
				} else if (records.length > 1) {
					infoMsg('您选择了 ' + records.length + ' 个条目，系统将只修改最先选择的项目！');
					grid.getSelectionModel().selectRow(grid.getSelectionModel().last, false);
				}

				if (record.get('usertype') == '3') {
					infoMsg('系统内置人员,您没有权限修改!');
					return;
				}
				addUserFormPanel.getForm().loadRecord(record);
				addUserWindow.show();
				addUserWindow.setTitle('<span class="commoncss">修改</span>');
				Ext.getCmp('windowmode').setValue('edit');
				Ext.getCmp('deptid_old').setValue(record.get('deptid'));
				Ext.getCmp('password').setValue('@@@@@@');
				Ext.getCmp('password1').setValue('@@@@@@');
				Ext.getCmp('userid').setValue(record.get('userid'));
				Ext.getCmp('btnReset').hide();
			}

			/**
			 * 修改人员数据
			 */
			function updateUserItem() {
				if (!addUserFormPanel.getForm().isValid()) {
					warningMsg('必填项未填写，或填写格式不正确，请检查窗口红色标示的区域!');
					return;
				}
				password1 = Ext.getCmp('password1').getValue();
				password = Ext.getCmp('password').getValue();
				if (password == '@@@@@@' && password1 == '@@@@@@') {
					// Ext.getCmp('updatemode').setValue('1');
				} else {
					Ext.getCmp('updatemode').setValue('2');
					if (password1 != password) {
						infoMsg('两次输入的密码不匹配,请重新输入!');
						Ext.getCmp('password').setValue('');
						Ext.getCmp('password1').setValue('');
						return;
					}
				}
				var deptid = Ext.getCmp('deptid').getValue();
				var deptid_old = Ext.getCmp('deptid_old').getValue();
				if (deptid != deptid_old) {
					Ext.Msg.confirm('确认', '修改所属部门将导致人员/角色映射、人员/菜单映射数据丢失! 继续保存吗?', function(btn, text) {
								if (btn == 'yes') {
									update();
								} else {
									return;
								}
							});
					return;
				} else {
					update();
				}
			}

			/**
			 * 更新
			 */
			function update() {
				addUserFormPanel.form.submit({
							url				: 'user.do?code=updateUserItem',
							waitTitle		: '提示',
							method			: 'POST',
							submitEmptyText	: false,
							waitMsg			: '正在处理数据,请稍候...',
							success			: function(form, action) {
								addUserWindow.hide();
								store.reload();
								form.reset();
								infoMsg(action.result.msg);
							},
							failure			: function(form, action) {
								var msg = action.result.msg;
								infoMsg('人员数据修改失败:<br>' + msg);
							}
						});
			}

			// 人员授权窗口初始化
			function userGrantInit(userid, deptid, usertype) {

				var selectRoleTab = new Ext.Panel({
							title		: '<img src="./resource/image/ext/award_star_silver_3.png" align="top" class="IEPNG"> 选择角色',
							// iconCls: 'user_femaleIcon',
							autoLoad	: {
								url		: 'user.do?code=userGrantInit',
								scripts	: true,
								text	: parent.PAGE_LOAD_MSG,
								params	: {
									userid		: userid,
									deptid		: deptid,
									usertype	: usertype
								}
							}
						});

				var selectMenuTab = new Ext.Panel({
							title		: '<img src="./resource/image/ext/config.png" align="top" class="IEPNG"> 选择菜单',
							// iconCls: 'user_femaleIcon',
							autoLoad	: {
								url		: 'user.do?code=selectMenuInit',
								scripts	: true,
								text	: parent.PAGE_LOAD_MSG,
								params	: {
									userid		: userid,
									deptid		: deptid,
									usertype	: usertype
								}
							}
						});

				var userGrantTabPanel = new Ext.TabPanel({
							activeTab	: 0,
							width		: 600,
							height		: 250,
							border		: false,
							plain		: true,// True表示为不渲染tab候选栏上背景容器图片
							defaults	: {
								autoScroll	: true
							},
							items		: [selectRoleTab, selectMenuTab]
						});

				var userGrantWindow = new Ext.Window({
							layout			: 'fit',
							width			: 400,
							height			: document.body.clientHeight - 100,
							resizable		: true,
							draggable		: true,
							closeAction		: 'close',
							title			: '<span class="commoncss">人员授权</span>',
							iconCls			: 'group_linkIcon',
							modal			: true,
							// pageY : 15,
							// pageX : document.body.clientWidth / 2 - 420 / 2,
							// collapsible : true,
							maximizable		: false,
							animateTarget	: Ext.getBody(),
							// //如果使用autoLoad,建议不要使用动画效果
							buttonAlign		: 'right',
							constrain		: true,
							items			: [userGrantTabPanel],
							buttons			: [{
										text	: '关闭',
										iconCls	: 'deleteIcon',
										handler	: function() {
											userGrantWindow.close();
										}
									}]
						});
				userGrantWindow.show();
			}

			// 重置
			function resetToolbar() {
				Ext.getCmp('inputname').reset();
				store.load({
							params	: {
								start	: 0,
								limit	: bbar.pageSize
							}
						});
			}
		});