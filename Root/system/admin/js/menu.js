/**
 * 代码表管理
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
Ext.onReady(function() {
			var root = new Ext.tree.AsyncTreeNode({
						text		: root_menuname,
						expanded	: true,
						id			: '01'
					});
			var menuTree = new Ext.tree.TreePanel({
						loader		: new Ext.tree.TreeLoader({
									baseAttrs	: {},
									dataUrl		: './resource.do?code=queryMenuItems'
								}),
						root		: root,
						title		: '',
						applyTo		: 'menuTreeDiv',
						autoScroll	: false,
						animate		: false,
						useArrows	: false,
						border		: false
					});
			menuTree.expandAll();

			menuTree.on('click', function(node) {
						menuid = node.attributes.id;
						menuname = node.attributes.text;
						Ext.getCmp('parentmenuname').setValue(menuname);
						Ext.getCmp('parentid').setValue(menuid);
						store.load({
									params	: {
										start	: 0,
										limit	: bbar.pageSize,
										menuid	: menuid
									}
								});
					});
			menuTree.root.select();
			var contextMenu = new Ext.menu.Menu({
						id		: 'menuTreeContextMenu',
						items	: [{
									text	: '新增菜单',
									iconCls	: 'page_addIcon',
									handler	: function() {
										addInit();
									}
								}, {
									text	: '修改菜单',
									iconCls	: 'page_edit_1Icon',
									handler	: function() {
										editInit();
									}
								}, {
									text	: '删除菜单',
									iconCls	: 'page_delIcon',
									handler	: function() {
										var selectModel = menuTree.getSelectionModel();
										var selectNode = selectModel.getSelectedNode();
										deleteMenuItems('2', selectNode.attributes.id);
									}
								}, {
									text	: '刷新节点',
									iconCls	: 'page_refreshIcon',
									handler	: function() {
										var selectModel = menuTree.getSelectionModel();
										var selectNode = selectModel.getSelectedNode();
										if (selectNode.attributes.leaf) {
											selectNode.parentNode.reload();
										} else {
											selectNode.reload();
										}
									}
								}]
					});
			menuTree.on('contextmenu', function(node, e) {
						e.preventDefault();
						menuid = node.attributes.id;
						menuname = node.attributes.text;
						Ext.getCmp('parentmenuname').setValue(menuname);
						Ext.getCmp('parentid').setValue(menuid);
						store.load({
									params		: {
										start	: 0,
										limit	: bbar.pageSize,
										menuid	: menuid
									},
									callback	: function(r, options, success) {
										for (var i = 0; i < r.length; i++) {
											var record = r[i];
											var menuid_g = record.data.menuid;
											if (menuid_g == menuid) {
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
						header		: '菜单名称',
						dataIndex	: 'menuname',
						sortable	: true,
						width		: 130
					}, {
						header		: '请求路径',
						dataIndex	: 'request',
						sortable	: true,
						width		: 200
					}, {
						header		: '排序号',
						dataIndex	: 'sortno',
						sortable	: true,
						width		: 50
					}, {
						header		: '上级菜单',
						dataIndex	: 'parentmenuname',
						sortable	: true,
						width		: 130
					}, {
						header		: '菜单类型',
						dataIndex	: 'menutype',
						renderer	: MENUTYPERender
					}, {
						header		: '节点类型',
						dataIndex	: 'leaf',
						hidden		: true,
						renderer	: LEAFRender
					}, {
						header		: '图标CSS类名',
						dataIndex	: 'iconcls',
						hidden		: true,
						sortable	: true,
						width		: 120
					}, {
						header		: '图标名称',
						dataIndex	: 'icon',
						sortable	: true,
						width		: 120
					}, {
						header		: '展开状态',
						dataIndex	: 'expanded',
						renderer	: EXPANDRender,
						// hidden : true,
						sortable	: true,
						width		: 60
					}, {
						header		: '桌面图标文件',
						dataIndex	: 'shortcut',
						width		: 100
					}, {
						header		: '桌面弹窗宽度',
						dataIndex	: 'width',
						width		: 100
					}, {
						header		: '桌面弹窗高度',
						dataIndex	: 'height',
						width		: 100
					}, {
						header		: '桌面弹窗滚动条',
						dataIndex	: 'scrollbar',
						width		: 100,
						renderer	: function(value) {
							if (value == '1')
								return '是';
							else
								return '';
						}
					}, {
						id			: 'count',
						header		: '授权状态',
						dataIndex	: 'count',
						hidden		: true,
						renderer	: function(value) {
							if (value == '0')
								return '未授权';
							else
								return '已授权';
						}
					}, {
						header		: '菜单编号',
						dataIndex	: 'menuid',
						hidden		: false,
						width		: 130,
						sortable	: true
					}, {
						id			: 'remark',
						header		: '备注',
						dataIndex	: 'remark'
					}, {
						id			: 'parentid',
						header		: '父节点编号',
						hidden		: true,
						dataIndex	: 'parentid'
					}]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.GroupingStore({
						proxy	: new Ext.data.HttpProxy({
									url	: './resource.do?code=queryMenuItems4Manage'
								}),
						reader	: new Ext.data.JsonReader({
									totalProperty	: 'TOTALCOUNT',
									root			: 'ROOT'
								}, [{
											name	: 'menuid'
										}, {
											name	: 'menuname'
										}, {
											name	: 'parentmenuname'
										}, {
											name	: 'request'
										}, {
											name	: 'iconcls'
										}, {
											name	: 'icon'
										}, {
											name	: 'expanded'
										}, {
											name	: 'leaf'
										}, {
											name	: 'sortno'
										}, {
											name	: 'remark'
										}, {
											name	: 'parentid'
										}, {
											name	: 'count'
										}, {
											name	: 'menutype'
										}, {
											name	: 'shortcut'
										}, {
											name	: 'width'
										}, {
											name	: 'height'
										}, {
											name	: 'scrollbar'
										}])
					});

			var filters = new Ext.ux.grid.GridFilters({// string,numeric,date,list,boolean
				encode		: true,
				autoReload	: false,
				local		: true,
				filters		: [{
							dataIndex	: 'menuname',
							type		: 'string'
						}, {
							dataIndex	: 'parentmenuname',
							type		: 'string'
						}, {
							dataIndex	: 'request',
							type		: 'string'
						}, {
							dataIndex	: 'iconcls',
							type		: 'string'
						}, {
							dataIndex	: 'icon',
							type		: 'string'
						}, {
							dataIndex	: 'expanded',
							type		: 'numeric'
						}, {
							dataIndex	: 'leaf',
							type		: 'numeric'
						}, {
							dataIndex	: 'sortno',
							type		: 'numeric'
						}, {
							dataIndex	: 'remark',
							type		: 'string'
						}, {
							dataIndex	: 'parentid',
							type		: 'string'
						}, {
							dataIndex	: 'count',
							type		: 'numeric'
						}, {
							dataIndex	: 'menutype',
							type		: 'numeric'
						}, {
							dataIndex	: 'shortcut',
							type		: 'string'
						}, {
							dataIndex	: 'width',
							type		: 'numeric'
						}, {
							dataIndex	: 'height',
							type		: 'numeric'
						}, {
							dataIndex	: 'scrollbar',
							type		: 'numeric'
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
						title				: '<span style="font-weight:normal">菜单信息</span>',
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
									text		: '修改',
									iconCls		: 'page_edit_1Icon',
									id			: 'modifyid',
									disabled	: true,
									handler		: function() {
										editInit();
									}
								}, '-', {
									text		: '删除',
									id			: 'deleteid',
									disabled	: true,
									iconCls		: 'page_delIcon',
									handler		: function() {
										deleteMenuItems('1', '');
									}
								}, '->', new Ext.form.TextField({
											id				: 'inputname',
											name			: 'inputname',
											cls				: 'search',
											emptyText		: '菜单名称',
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
									iconCls	: 'page_findIcon',
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
						stateId				: 'grid-menu'
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
										deleteMenuItems('1', '');
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
							start	: 0,
							limit	: bbar.pageSize
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

			bbar.on("change", function() {
						// grid.getSelectionModel().selectFirstRow();
					});

			var addMenuWindow, addMenuFormPanel;
			var comboxWithTree;
			var addRoot = new Ext.tree.AsyncTreeNode({
						text		: root_menuname,
						expanded	: true,
						id			: '01'
					});
			var addMenuTree = new Ext.tree.TreePanel({
						loader		: new Ext.tree.TreeLoader({
									baseAttrs	: {},
									dataUrl		: './resource.do?code=queryMenuItems'
								}),
						root		: addRoot,
						autoScroll	: true,
						animate		: false,
						useArrows	: false,
						border		: false
					});
			addMenuTree.expandAll();

			// 监听下拉树的节点单击事件
			addMenuTree.on('click', function(node) {
						comboxWithTree.setValue(node.text);
						Ext.getCmp("addMenuFormPanel").findById('parentid').setValue(node.attributes.id);
						comboxWithTree.collapse();
					});

			comboxWithTree = new Ext.form.ComboBox({
						id				: 'parentmenuname',
						store			: new Ext.data.SimpleStore({
									fields	: [],
									data	: [[]]
								}),
						editable		: false,
						value			: ' ',
						emptyText		: '请选择...',
						fieldLabel		: '上级菜单',
						anchor			: '94.6%',
						mode			: 'local',
						triggerAction	: 'all',
						labelStyle		: micolor,
						maxHeight		: 390,
						// 下拉框的显示模板,addMenuTreeDiv作为显示下拉树的容器
						tpl				: "<tpl for='.'><div style='height:390px'><div id='addMenuTreeDiv'></div></div></tpl>",
						allowBlank		: false,
						onSelect		: Ext.emptyFn
					});
			// 监听下拉框的下拉展开事件
			comboxWithTree.on('expand', function() {
						// 将UI树挂到treeDiv容器
						addMenuTree.render('addMenuTreeDiv');
						// addMenuTree.root.expand(); //只是第一次下拉会加载数据
						addMenuTree.root.reload(); // 每次下拉都会加载数据
						addMenuTree.expandAll();
					});

			var expandedCombo = new Ext.form.ComboBox({
						name			: 'expanded',
						hiddenName		: 'expanded',
						store			: EXPANDStore,
						mode			: 'local',
						triggerAction	: 'all',
						valueField		: 'value',
						displayField	: 'text',
						// value : '0',
						fieldLabel		: '节点状态',
						emptyText		: '请选择...',
						labelStyle		: micolor,
						allowBlank		: false,
						forceSelection	: true,
						editable		: false,
						typeAhead		: true,
						anchor			: "94.6%"
					});

			var scrollStore = new Ext.data.SimpleStore({
						fields	: ['value', 'text'],
						data	: [['0', '否'], ['1', '是']]
					});

			var scrollCombo = new Ext.form.ComboBox({
						name			: 'scrollbar',
						hiddenName		: 'scrollbar',
						store			: scrollStore,
						mode			: 'local',
						triggerAction	: 'all',
						valueField		: 'value',
						displayField	: 'text',
						// value : '0',
						fieldLabel		: '桌面窗口滚动条',
						emptyText		: '请选择...',
						allowBlank		: true,
						forceSelection	: true,
						editable		: false,
						typeAhead		: true,
						anchor			: "94.6%"
					});

			addMenuFormPanel = new Ext.form.FormPanel({
						id			: 'addMenuFormPanel',
						name		: 'addMenuFormPanel',
						defaultType	: 'textfield',
						labelAlign	: 'right',
						labelWidth	: 98,
						frame		: false,
						bodyStyle	: 'padding:5 5 0',
						items		: [{
									fieldLabel	: '菜单名称',
									name		: 'menuname',
									id			: 'menuname',
									allowBlank	: false,
									labelStyle	: micolor,
									anchor		: '94.6%'
								}, comboxWithTree, {
									fieldLabel	: '请求地址',
									name		: 'request',
									allowBlank	: true,
									anchor		: '94.6%'
								}, expandedCombo, {
									fieldLabel	: '图标CSS类',
									name		: 'iconcls',
									allowBlank	: true,
									anchor		: '94.6%'
								}, {
									fieldLabel	: '图标文件',
									name		: 'icon',
									allowBlank	: true,
									anchor		: '94.6%'
								}, {
									fieldLabel	: '桌面图标',
									name		: 'shortcut',
									allowBlank	: true,
									anchor		: '94.6%'
								}, {
									fieldLabel		: '桌面窗口宽度',
									xtype			: 'numberfield',
									allowDecimals	: false,
									allowNegative	: false,
									name			: 'width',
									allowBlank		: true,
									anchor			: '94.6%'
								}, {
									fieldLabel		: '桌面窗口高度',
									name			: 'height',
									xtype			: 'numberfield',
									allowDecimals	: false,
									allowNegative	: false,
									allowBlank		: true,
									anchor			: '94.6%'
								}, scrollCombo, {
									fieldLabel	: '排序号',
									name		: 'sortno',
									allowBlank	: true,
									anchor		: '94.6%'
								}, {
									fieldLabel	: '备注',
									name		: 'remark',
									allowBlank	: true,
									anchor		: '94.6%'
								}, {
									id		: 'parentid',
									name	: 'parentid',
									hidden	: true
								}, {
									id		: 'windowmode',
									name	: 'windowmode',
									hidden	: true
								}, {
									id		: 'menuid',
									name	: 'menuid',
									hidden	: true
								}, {
									id		: 'parentid_old',
									name	: 'parentid_old',
									hidden	: true
								}, {
									id		: 'count',
									name	: 'count',
									hidden	: true
								}]
					});

			addMenuWindow = new Ext.Window({
						layout			: 'fit',
						width			: 420,
						height			: 385,
						resizable		: false,
						draggable		: true,
						closeAction		: 'hide',
						title			: '<span class="commoncss">新增菜单</span>',
						// iconCls : 'page_addIcon',
						modal			: true,
						collapsible		: true,
						titleCollapse	: true,
						maximizable		: false,
						buttonAlign		: 'right',
						border			: false,
						animCollapse	: true,
						pageY			: document.body.clientHeight / 2 - 315 / 2,// pageY : 20,
						pageX			: document.body.clientWidth / 2 - 420 / 2,
						animateTarget	: Ext.getBody(),
						constrain		: true,
						items			: [addMenuFormPanel],
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
											saveMenuItem();
										else
											updateMenuItem();
									}
								}, {
									text	: '重置',
									id		: 'btnReset',
									iconCls	: 'tbar_synchronizeIcon',
									handler	: function() {
										clearForm(addMenuFormPanel.getForm());
									}
								}, {
									text	: '关闭',
									iconCls	: 'deleteIcon',
									handler	: function() {
										addMenuWindow.hide();
									}
								}]
					});
			/**
			 * 布局
			 */
			var viewport = new Ext.Viewport({
						layout	: 'border',
						items	: [{
									title		: '<span class="commoncss">功能菜单</span>',
									iconCls		: 'layout_contentIcon',
									tools		: [{
												id		: 'refresh',
												handler	: function() {
													menuTree.root.reload();
													menuTree.expandAll();
												}
											}],
									collapsible	: true,
									width		: 260,
									minSize		: 160,
									maxSize		: 280,
									split		: true,
									region		: 'west',
									autoScroll	: true,
									items		: [menuTree]
								}, {
									region	: 'center',
									layout	: 'fit',
									border	: false,
									items	: [grid]
								}]
					});
			/**
			 * 保存菜单数据
			 */
			function saveMenuItem() {
				if (!addMenuFormPanel.form.isValid()) {
					return;
				}
				addMenuFormPanel.form.submit({
							url			: './resource.do?code=saveMenuItem',
							waitTitle	: '提示',
							method		: 'POST',
							waitMsg		: '正在处理数据,请稍候...',
							success		: function(form, action) {
								addMenuWindow.hide();
								store.reload();
								refreshNode(Ext.getCmp('parentid').getValue());
								form.reset();
								infoMsg(action.result.msg);
							},
							failure		: function(form, action) {
								var msg = action.result.msg;
								infoMsg('菜单数据保存失败:<br>' + msg);
							}
						});
			}

			/**
			 * 刷新指定节点
			 */
			function refreshNode(nodeid) {
				var node = menuTree.getNodeById(nodeid);
				/* 异步加载树在没有展开节点之前是获取不到对应节点对象的 */
				if (Ext.isEmpty(node)) {
					menuTree.root.reload();
					return;
				}
				if (node.attributes.leaf) {
					node.parentNode.reload();
				} else {
					node.reload();
				}
			}

			/**
			 * 根据条件查询菜单
			 */
			function queryInfo() {
				store.load({
							params	: {
								start	: 0,
								limit	: bbar.pageSize,
								keyword	: Ext.getCmp('inputname').getValue()
							}
						});
			}

			/**
			 * 删除菜单
			 */
			function deleteMenuItems(pType, pMenuid) {
				var rows = grid.getSelectionModel().getSelections();
				var fields = '';
				for (var i = 0; i < rows.length; i++) {
					if (rows[i].get('menutype') == '1') {
						fields = fields + rows[i].get('menuname') + '<br>';
					}
				}
				if (fields != '') {
					infoMsg('<b>您选中的项目中包含如下系统内置的只读项目</b><br>' + fields + '<font color=red>只读项目不能删除!</font>');
					return;
				}
				if (Ext.isEmpty(rows)) {
					if (pType == '1') {
						infoMsg('您没有选中任何条目，请先选中要删除的项目！');
						return;
					}
				}
				var strChecked = jsArray2JsString(rows, 'menuid');
				Ext.Msg.confirm('请确认', '你真的要删除选中菜单及其包含的所有子菜单吗?', function(btn, text) {
							if (btn == 'yes') {
								if (runMode == '0') {
									infoMsgClick('应用授权不可用，请联系开发人员输入购买的授权密码，您目前只能进行查询操作！');
									return;
								}
								showWaitMsg();
								Ext.Ajax.request({
											url		: './resource.do?code=deleteMenuItems',
											success	: function(response) {
												var resultArray = Ext.util.JSON.decode(response.responseText);
												store.reload();
												if (pType == '1') {
													menuTree.root.reload();
												} else {
													menuTree.root.reload();
												}
												infoMsg(resultArray.msg);
											},
											failure	: function(response) {
												var resultArray = Ext.util.JSON.decode(response.responseText);
												infoMsg(resultArray.msg);
											},
											params	: {
												strChecked	: strChecked,
												type		: pType,
												menuid		: pMenuid
											}
										});
							}
						});
			}

			/**
			 * 修改菜单初始化
			 */
			function editInit() {
				var record = grid.getSelectionModel().getSelected();
				if (Ext.isEmpty(record)) {
					infoMsg('请先选择您要修改的菜单项目');
					return;
				}
				record = grid.getSelectionModel().getSelected();
				if (record.get('menutype') == '1') {
					infoMsg('您选中的记录为系统内置菜单,不允许修改');
					return;
				}
				if (record.get('leaf') == '0') {
					comboxWithTree.setDisabled(true);
				} else {
					comboxWithTree.setDisabled(false);
				}
				addMenuFormPanel.getForm().loadRecord(record);
				addMenuWindow.show();
				addMenuWindow.setTitle('<span style="font-weight:normal">修改菜单</span>');
				Ext.getCmp('windowmode').setValue('edit');
				Ext.getCmp('parentid_old').setValue(record.get('parentid'));
				Ext.getCmp('count').setValue(record.get('count'));
				Ext.getCmp('btnReset').hide();
			}

			/**
			 * 新增菜单初始化
			 */
			function addInit() {
				Ext.getCmp('btnReset').hide();
				// clearForm(addMenuFormPanel.getForm());
				var flag = Ext.getCmp('windowmode').getValue();
				if (typeof(flag) != 'undefined') {
					addMenuFormPanel.form.getEl().dom.reset();
				} else {
					clearForm(addMenuFormPanel.getForm());
				}
				var selectModel = menuTree.getSelectionModel();
				var selectNode = selectModel.getSelectedNode();
				Ext.getCmp('parentmenuname').setValue(selectNode.attributes.text);
				Ext.getCmp('parentid').setValue(selectNode.attributes.id);
				expandedCombo.setValue('0');
				scrollCombo.setValue('0');
				addMenuWindow.show();
				addMenuWindow.setTitle('<span style="font-weight:normal">新增菜单</span>');
				Ext.getCmp('windowmode').setValue('add');
				// Ext.getCmp('btnReset').show();
			}

			/**
			 * 修改菜单数据
			 */
			function updateMenuItem() {
				if (!addMenuFormPanel.form.isValid()) {
					return;
				}
				var parentid = Ext.getCmp('parentid').getValue();
				var parentid_old = Ext.getCmp('parentid_old').getValue();
				var count = Ext.getCmp('count').getValue();
				if (parentid != parentid_old) {
					if (count != '0') {
						Ext.Msg.confirm('请确认', '此菜单已经做过权限分配,修改上级菜单属性将导致其权限信息丢失,继续保存吗?', function(btn, text) {
									if (btn == 'yes') {
										update();
									} else {
										return;
									}
								});
					} else {
						update();
					}
				} else {
					update();
				}

			}

			/**
			 * 更新
			 */
			function update() {
				var parentid = Ext.getCmp('parentid').getValue();
				var parentid_old = Ext.getCmp('parentid_old').getValue();
				addMenuFormPanel.form.submit({
							url			: './resource.do?code=updateMenuItem',
							waitTitle	: '提示',
							method		: 'POST',
							waitMsg		: '正在处理数据,请稍候...',
							success		: function(form, action) {
								addMenuWindow.hide();
								store.reload();
								refreshNode(parentid);
								if (parentid != parentid_old) {
									refreshNode(parentid_old);
								}
								form.reset();
								infoMsg(action.result.msg);
							},
							failure		: function(form, action) {
								var msg = action.result.msg;
								infoMsg('菜单数据修改失败:<br>' + msg);
							}
						});
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