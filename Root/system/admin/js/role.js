/**
 * 角色管理与授权
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
									dataUrl		: './role.do?code=departmentTreeInit'
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
									text	: '新增角色',
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
						dataIndex	: 'roleid',
						renderer	: function(value, cellmeta, record) {
							if (login_account == parent.DEFAULT_DEVELOP_ACCOUNT || login_account == parent.DEFAULT_ADMIN_ACCOUNT) {
								if (record.data['roletype'] == '1') {
									return '<img src="./resource/image/ext/edit2.png"/>';
								}
							}
							return '<a href="javascript:void(0);"><img src="./resource/image/ext/edit1.png"/></a>';
						},
						width		: 35
					}, {
						header		: '角色名称',
						dataIndex	: 'rolename',
						sortable	: true,
						width		: 180
					}, {
						header		: '角色类型',
						dataIndex	: 'roletype',
						width		: 100,
						sortable	: true,
						renderer	: ROLETYPERender
					}, {
						id			: 'deptname',
						header		: '所属部门',
						dataIndex	: 'deptname',
						sortable	: true,
						width		: 220
					}, {
						header		: '角色状态',
						dataIndex	: 'locked',
						width		: 60,
						sortable	: true,
						renderer	: LOCKEDRender
					}, {
						header		: '角色编号',
						dataIndex	: 'roleid',
						hidden		: false,
						width		: 80,
						sortable	: true
					}, {
						id			: 'remark',
						header		: '备注',
						sortable	: true,
						dataIndex	: 'remark'
					}, {
						id			: 'deptid',
						sortable	: true,
						header		: '所属部门编号',
						dataIndex	: 'deptid',
						hidden		: true
					}]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.GroupingStore({
						proxy	: new Ext.data.HttpProxy({
									url	: './role.do?code=queryRolesForManage'
								}),
						reader	: new Ext.data.JsonReader({
									totalProperty	: 'TOTALCOUNT',
									root			: 'ROOT'
								}, [{
											name	: 'roleid'
										}, {
											name	: 'rolename'
										}, {
											name	: 'locked'
										}, {
											name	: 'roletype'
										}, {
											name	: 'deptid'
										}, {
											name	: 'deptname'
										}, {
											name	: 'remark'
										}])
					});

			var filters = new Ext.ux.grid.GridFilters({// string,numeric,date,list,boolean
				encode		: true,
				autoReload	: false,
				local		: true,
				filters		: [{
							dataIndex	: 'rolename',
							type		: 'string'
						}, {
							dataIndex	: 'locked',
							type		: 'string'
						}, {
							dataIndex	: 'roletype',
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
						title				: '<span class="commoncss">角色信息</span>',
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
									handler	: function() {
										editInit();
									}
								}, '-', {
									text	: '删除',
									iconCls	: 'page_delIcon',
									handler	: function() {
										deleteRoleItems();
									}
								}, '->', new Ext.form.TextField({
											id				: 'inputname',
											name			: 'inputname',
											cls				: 'search',
											emptyText		: '角色名称',
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
						stateId				: 'grid-role'
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
									text	: '修改',
									iconCls	: 'page_edit_1Icon',
									handler	: function() {
										editInit();
									}
								}, {
									text	: '删除',
									iconCls	: 'page_delIcon',
									handler	: function() {
										deleteRoleItems();
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

			// 重置
			function resetToolbar() {
				Ext.getCmp('inputname').setValue('');
				store.load({
							params	: {
								start	: 0,
								limit	: bbar.pageSize
							}
						});
			}

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
			grid.on('rowdblclick', function(grid, rowIndex, event) {
						editInit();
					});
			grid.on('sortchange', function() {
						// grid.getSelectionModel().selectFirstRow();
					});
			bbar.on("change", function() {
						// grid.getSelectionModel().selectFirstRow();
					});
			grid.on("cellclick", function(grid, rowIndex, columnIndex, e) {
						var store = grid.getStore();
						var record = store.getAt(rowIndex);
						var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
						if (fieldName == 'roleid' && columnIndex == 2) {
							var roleid = record.get(fieldName);
							var deptid = record.get('deptid');
							var roletype = record.get('roletype');
							if (login_account == parent.DEFAULT_DEVELOP_ACCOUNT || login_account == parent.DEFAULT_ADMIN_ACCOUNT) {
								if (roletype == '1') {
									infoMsg('超级管理员和开发人员不能对业务角色授权<br>' + '业务角色只能被其所属部门或上级部门的管理员授予经办权限');
									return;
								}
							}
							roleGrantInit(roleid, deptid, roletype);
						}
					});
			var addRoot = new Ext.tree.AsyncTreeNode({
						text		: root_deptname,
						expanded	: true,
						id			: root_deptid
					});
			var addDeptTree = new Ext.tree.TreePanel({
						loader		: new Ext.tree.TreeLoader({
									baseAttrs	: {},
									dataUrl		: './role.do?code=departmentTreeInit'
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
						Ext.getCmp("addRoleFormPanel").findById('deptid').setValue(node.attributes.id);
						comboxWithTree.collapse();
					});
			var comboxWithTree = new Ext.form.ComboBox({
						id				: 'deptname',
						store			: new Ext.data.SimpleStore({
									fields	: [],
									data	: [[]]
								}),
						editable		: false,
						value			: ' ',
						emptyText		: '请选择...',
						fieldLabel		: '所属部门',
						labelStyle		: micolor,
						anchor			: '100%',
						mode			: 'local',
						triggerAction	: 'all',
						maxHeight		: 390,
						// 下拉框的显示模板,addDeptTreeDiv作为显示下拉树的容器
						tpl				: "<tpl for='.'><div style='height:390px'><div id='addDeptTreeDiv'></div></div></tpl>",
						allowBlank		: false,
						onSelect		: Ext.emptyFn
					});
			// 监听下拉框的下拉展开事件
			comboxWithTree.on('expand', function() {
						// 将UI树挂到treeDiv容器
						addDeptTree.render('addDeptTreeDiv');
						// addDeptTree.root.expand(); //只是第一次下拉会加载数据
						addDeptTree.root.reload(); // 每次下拉都会加载数据
						addDeptTree.expandAll();
					});

			var lockedCombo = new Ext.form.ComboBox({
						name			: 'locked',
						hiddenName		: 'locked',
						store			: LOCKEDStore,
						mode			: 'local',
						triggerAction	: 'all',
						valueField		: 'value',
						displayField	: 'text',
						value			: '0',
						fieldLabel		: '角色状态',
						emptyText		: '请选择...',
						labelStyle		: micolor,
						allowBlank		: false,
						forceSelection	: true,
						editable		: false,
						typeAhead		: true,
						anchor			: "99%"
					});

			var roletypeCombo = new Ext.form.ComboBox({
						name			: 'roletype',
						hiddenName		: 'roletype',
						store			: ROLETYPEStore,
						mode			: 'local',
						triggerAction	: 'all',
						valueField		: 'value',
						displayField	: 'text',
						readOnly		: true,
						value			: '1',
						fieldLabel		: '角色类型',
						emptyText		: '请选择...',
						labelStyle		: micolor,
						allowBlank		: false,
						forceSelection	: true,
						editable		: false,
						typeAhead		: true,
						anchor			: "99%"
					});
			var addRoleFormPanel = new Ext.form.FormPanel({
						id			: 'addRoleFormPanel',
						name		: 'addRoleFormPanel',
						defaultType	: 'textfield',
						labelAlign	: 'right',
						labelWidth	: 58,
						frame		: false,
						bodyStyle	: 'padding:5 5 0',
						items		: [{
									fieldLabel	: '角色名称',
									name		: 'rolename',
									id			: 'rolename',
									allowBlank	: false,
									labelStyle	: micolor,
									anchor		: '99%'
								}, comboxWithTree, roletypeCombo, lockedCombo, {
									fieldLabel	: '备注',
									name		: 'remark',
									allowBlank	: true,
									anchor		: '99%'
								}, {
									id		: 'windowmode',
									name	: 'windowmode',
									hidden	: true
								}, {
									id		: 'deptid',
									name	: 'deptid',
									hidden	: true
								}, {
									id		: 'deptid_old',
									name	: 'deptid_old',
									hidden	: true
								}, {
									id		: 'roleid',
									name	: 'roleid',
									hidden	: true
								}]
					});

			var addRoleWindow = new Ext.Window({
						layout			: 'fit',
						width			: 400,
						height			: 225,
						resizable		: false,
						draggable		: true,
						closable		: true,
						modal			: true,
						closeAction		: 'hide',
						title			: '<span class="commoncss">新增角色</span>',
						// iconCls : 'page_addIcon',
						collapsible		: true,
						titleCollapse	: true,
						maximizable		: false,
						buttonAlign		: 'right',
						border			: false,
						animCollapse	: true,
						pageY			: document.body.clientHeight / 2 - 225 / 2,// pageY : 20,
						pageX			: document.body.clientWidth / 2 - 420 / 2,
						animateTarget	: Ext.getBody(),
						constrain		: true,
						items			: [addRoleFormPanel],
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
											saveRoleItem();
										else
											updateRoleItem();
									}
								}, {
									text	: '重置',
									id		: 'btnReset',
									iconCls	: 'tbar_synchronizeIcon',
									handler	: function() {
										clearForm(addRoleFormPanel.getForm());
									}
								}, {
									text	: '关闭',
									iconCls	: 'deleteIcon',
									handler	: function() {
										addRoleWindow.hide();
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
			 * 根据条件查询角色
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
			 * 新增角色初始化
			 */
			function addInit() {
				Ext.getCmp('btnReset').hide();
				if (login_account == parent.DEFAULT_DEVELOP_ACCOUNT) {
					roletypeCombo.setReadOnly(false);
				}
				if (login_account == parent.DEFAULT_ADMIN_ACCOUNT) {
					roletypeCombo.setReadOnly(false);
				}
				// clearForm(addRoleFormPanel.getForm());
				var flag = Ext.getCmp('windowmode').getValue();
				if (typeof(flag) != 'undefined') {
					addRoleFormPanel.form.getEl().dom.reset();
				} else {
					clearForm(addRoleFormPanel.getForm());
				}
				var selectModel = deptTree.getSelectionModel();
				var selectNode = selectModel.getSelectedNode();
				Ext.getCmp('deptname').setValue(selectNode.attributes.text);
				Ext.getCmp('deptid').setValue(selectNode.attributes.id);
				addRoleWindow.show();
				addRoleWindow.setTitle('<span class="commoncss">新增角色</span>');
				Ext.getCmp('windowmode').setValue('add');
				comboxWithTree.setDisabled(false);
				lockedCombo.setValue('0');
				roletypeCombo.setValue('1');
				// Ext.getCmp('btnReset').show();
			}

			/**
			 * 保存角色数据
			 */
			function saveRoleItem() {
				if (!addRoleFormPanel.form.isValid()) {
					return;
				}
				addRoleFormPanel.form.submit({
							url			: './role.do?code=saveRoleItem',
							waitTitle	: '提示',
							method		: 'POST',
							waitMsg		: '正在处理数据,请稍候...',
							success		: function(form, action) {
								addRoleWindow.hide();
								deptid = Ext.getCmp('deptid').getValue();
								store.reload();
								form.reset();
								infoMsg(action.result.msg);
							},
							failure		: function(form, action) {
								var msg = action.result.msg;
								infoMsg('角色数据保存失败:<br>' + msg);
							}
						});
			}

			/**
			 * 删除角色
			 */
			function deleteRoleItems() {
				var rows = grid.getSelectionModel().getSelections();
				var fields = '';
				for (var i = 0; i < rows.length; i++) {
					if (rows[i].get('roletype') == '3') {
						fields = fields + rows[i].get('rolename') + '<br>';
					}
				}
				if (fields != '') {
					infoMsg('<b>您选中的项目中包含如下系统内置的只读项目</b><br>' + fields + '<font color=red>系统内置角色不能删除!</font>');
					return;
				}
				if (Ext.isEmpty(rows)) {
					infoMsg('您没有选中任何条目，请先选中要删除的项目！');
					return;
				}
				var strChecked = jsArray2JsString(rows, 'roleid');
				Ext.Msg.confirm('请确认', '<span style="color:red"><b>提示:</b>删除角色将同时删除和角色相关的权限信息,请慎重.</span><br>继续删除吗?', function(btn, text) {
							if (btn == 'yes') {
								if (runMode == '0') {
									infoMsgClick('应用授权不可用，请联系开发人员输入购买的授权密码，您目前只能进行查询操作！');
									return;
								}
								showWaitMsg();
								Ext.Ajax.request({
											url		: './role.do?code=deleteRoleItems',
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
			 * 修改角色初始化
			 */
			function editInit() {
				var record = grid.getSelectionModel().getSelected();
				if (Ext.isEmpty(record)) {
					infoMsg('请先选择要修改的角色!');
					return;
				}
				if (record.get('roletype') == '3') {
					infoMsg('系统内置角色,您没有权限修改!');
					return;
				}
				addRoleFormPanel.getForm().loadRecord(record);
				addRoleWindow.show();
				addRoleWindow.setTitle('<span class="commoncss">修改角色</span>');
				Ext.getCmp('windowmode').setValue('edit');
				Ext.getCmp('deptid_old').setValue(record.get('deptid'));
				Ext.getCmp('roleid').setValue(record.get('roleid'));
				Ext.getCmp('btnReset').hide();
			}

			/**
			 * 修改角色数据
			 */
			function updateRoleItem() {
				if (!addRoleFormPanel.form.isValid()) {
					return;
				}
				var deptid = Ext.getCmp('deptid').getValue();
				var deptid_old = Ext.getCmp('deptid_old').getValue();
				if (deptid != deptid_old) {
					Ext.Msg.confirm('确认', '修改所属部门将导致角色-人员映射关系丢失! 继续保存吗?', function(btn, text) {
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
				addRoleFormPanel.form.submit({
							url			: './role.do?code=updateRoleItem',
							waitTitle	: '提示',
							method		: 'POST',
							waitMsg		: '正在处理数据,请稍候...',
							success		: function(form, action) {
								addRoleWindow.hide();
								store.reload();
								form.reset();
								infoMsg(action.result.msg);
							},
							failure		: function(form, action) {
								var msg = action.result.msg;
								infoMsg('角色数据修改失败:<br>' + msg);
							}
						});
			}

			/**
			 * 角色授权窗口初始化
			 */
			function roleGrantInit(roleid, deptid, roletype) {

				var operatorTab = new Ext.Panel({
							title		: '<img src="./resource/image/ext/config.png" align="top" class="IEPNG"> 经办权限授权',
							// iconCls: 'user_femaleIcon',
							autoLoad	: {
								url		: './role.do?code=operatorTabInit',
								scripts	: true,
								text	: parent.PAGE_LOAD_MSG,
								params	: {
									roleid		: roleid,
									deptid		: deptid,
									roletype	: roletype
								}
							}
						});

				var selectUserTab = new Ext.Panel({
							title		: '<img src="./resource/image/ext/group.png" align="top" class="IEPNG"> 选择人员',
							// iconCls:'chart_organisationIcon',
							autoLoad	: {
								url		: './role.do?code=selectUserTabInit',
								scripts	: true,
								text	: parent.PAGE_LOAD_MSG,
								params	: {
									roleid		: roleid,
									deptid		: deptid,
									roletype	: roletype
								}
							}
						});

				var managerTab = new Ext.Panel({
							title		: '<img src="./resource/image/ext/wrench.png" align="top" class="IEPNG"> 授权权限授权',
							// iconCls: 'status_onlineIcon',
							autoLoad	: {
								url		: './role.do?code=managerTabInit',
								scripts	: true,
								text	: parent.PAGE_LOAD_MSG,
								params	: {
									roleid		: roleid,
									deptid		: deptid,
									roletype	: roletype
								}
							}
						});

				var roleGrantTabPanel = new Ext.TabPanel({
							activeTab	: 0,
							width		: 600,
							height		: 250,
							plain		: true,// True表示为不渲染tab候选栏上背景容器图片
							defaults	: {
								autoScroll	: true
							}
						});

				roleGrantTabPanel.add(operatorTab);
				if (login_account == parent.DEFAULT_DEVELOP_ACCOUNT) {
					roleGrantTabPanel.add(managerTab);
				}
				if (login_account == parent.DEFAULT_ADMIN_ACCOUNT) {
					roleGrantTabPanel.add(managerTab);
				}
				roleGrantTabPanel.add(selectUserTab);
				var roleGrantWindow = new Ext.Window({
							layout			: 'fit',
							width			: 400,
							height			: document.body.clientHeight,
							resizable		: true,
							draggable		: true,
							closeAction		: 'close',
							closable		: true,
							title			: '<span class="commoncss">角色授权</span>',
							// iconCls : 'award_star_silver_3Icon',
							modal			: true,
							pageY			: 15,
							pageX			: document.body.clientWidth / 2 - 420 / 2,
							collapsible		: true,
							titleCollapse	: true,
							maximizable		: false,
							// animateTarget: document.body,
							// //如果使用autoLoad,建议不要使用动画效果
							buttonAlign		: 'right',
							constrain		: true,
							items			: [roleGrantTabPanel],
							buttons			: [{
										text	: '关闭',
										iconCls	: 'deleteIcon',
										handler	: function() {
											roleGrantWindow.close();
										}
									}]
						});
				roleGrantWindow.show();
				if (roletype == '2') {
					// operatorTab.disable();
				} else if (roletype == '1') {
					managerTab.disable();
				}
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