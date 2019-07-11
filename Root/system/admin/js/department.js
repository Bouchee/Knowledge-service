/**
 * 部门管理
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
									dataUrl		: 'organization.do?code=departmentTreeInit'
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
									text	: '新增部门',
									iconCls	: 'page_addIcon',
									handler	: function() {
										addInit();
									}
								}, {
									text	: '修改部门',
									iconCls	: 'page_edit_1Icon',
									handler	: function() {
										editInit();
									}
								}, {
									text	: '删除部门',
									iconCls	: 'page_delIcon',
									handler	: function() {
										var selectModel = deptTree.getSelectionModel();
										var selectNode = selectModel.getSelectedNode();
										deleteDeptItems('2', selectNode.attributes.id);
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
						deptname = node.attributes.text;
						Ext.getCmp('parentdeptname').setValue(deptname);
						Ext.getCmp('parentid').setValue(deptid);
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
						header		: '部门名称',
						sortable	: true,
						dataIndex	: 'deptname',
						width		: 200
					}, {
						header		: '业务对照码',
						sortable	: true,
						dataIndex	: 'customid',
						width		: 100
					}, {
						header		: '上级部门',
						sortable	: true,
						dataIndex	: 'parentdeptname',
						width		: 200
					}, {
						header		: '排序号',
						dataIndex	: 'sortno',
						sortable	: true,
						width		: 50
					}, {
						header		: '节点类型',
						sortable	: true,
						dataIndex	: 'leaf',
						hidden		: true,
						renderer	: LEAFRender
					}, {
						id			: 'parentid',
						header		: '父节点编号',
						sortable	: true,
						hidden		: true,
						dataIndex	: 'parentid'
					}, {
						id			: 'usercount',
						sortable	: true,
						header		: '下属用户数目',
						hidden		: true,
						dataIndex	: 'usercount'
					}, {
						id			: 'rolecount',
						header		: '下属角色数目',
						hidden		: true,
						sortable	: true,
						dataIndex	: 'rolecount'
					}, {
						header		: '部门编号',
						dataIndex	: 'deptid',
						hidden		: false,
						width		: 130,
						sortable	: true
					}, {
						id			: 'remark',
						header		: '备注',
						sortable	: true,
						hidden		: false,
						dataIndex	: 'remark'
					}]);

			// 数据存储
			var store = new Ext.data.GroupingStore({
						proxy	: new Ext.data.HttpProxy({
									url	: 'organization.do?code=queryDeptsForManage'
								}),
						reader	: new Ext.data.JsonReader({
									totalProperty	: 'TOTALCOUNT',
									root			: 'ROOT'
								}, [{
											name	: 'deptid'
										}, {
											name	: 'deptname'
										}, {
											name	: 'sortno'
										}, {
											name	: 'customid'
										}, {
											name	: 'parentdeptname'
										}, {
											name	: 'leaf'
										}, {
											name	: 'remark'
										}, {
											name	: 'parentid'
										}, {
											name	: 'usercount'
										}, {
											name	: 'rolecount'
										}])
					});

			var filters = new Ext.ux.grid.GridFilters({// string,numeric,date,list,boolean
				encode		: true,
				autoReload	: false,
				local		: true,
				filters		: [{
							dataIndex	: 'deptname',
							type		: 'string'
						}, {
							dataIndex	: 'sortno',
							type		: 'string'
						}, {
							dataIndex	: 'customid',
							type		: 'string'
						}, {
							dataIndex	: 'parentdeptname',
							type		: 'string'
						}, {
							dataIndex	: 'leaf',
							type		: 'string'
						}, {
							dataIndex	: 'remark',
							type		: 'string'
						}, {
							dataIndex	: 'parentid',
							type		: 'string'
						}, {
							dataIndex	: 'usercount',
							type		: 'string'
						}, {
							dataIndex	: 'rolecount',
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
						title				: '<span class="commoncss">部门信息</span>',
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
									iconCls		: 'page_delIcon',
									id			: 'deleteid',
									disabled	: true,
									handler		: function() {
										deleteDeptItems('1', '');
									}
								}, '->', new Ext.form.TextField({
											id				: 'inputname',
											name			: 'inputname',
											cls				: 'search',
											emptyText		: '部门名称|备注',
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
						stateId				: 'grid-department'
					});

			store.load({
						params	: {
							start		: 0,
							limit		: bbar.pageSize,
							firstload	: 'true'
						}
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
									// id : 'modifyid',
									disabled	: true,
									handler		: function() {
										editInit();
									}
								}, {
									text		: '删除',
									iconCls		: 'page_delIcon',
									// id : 'deleteid',
									disabled	: true,
									handler		: function() {
										deleteDeptItems('1', '');
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

			var addRoot = new Ext.tree.AsyncTreeNode({
						text		: root_deptname,
						expanded	: true,
						id			: root_deptid
					});
			var addDeptTree = new Ext.tree.TreePanel({
						loader		: new Ext.tree.TreeLoader({
									baseAttrs	: {},
									dataUrl		: './organization.do?code=departmentTreeInit'
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
						Ext.getCmp("addDeptFormPanel").findById('parentid').setValue(node.attributes.id);
						comboxWithTree.collapse();
					});
			var comboxWithTree = new Ext.form.ComboBox({
						id				: 'parentdeptname',
						store			: new Ext.data.SimpleStore({
									fields	: [],
									data	: [[]]
								}),
						editable		: false,
						value			: ' ',
						emptyText		: '请选择...',
						fieldLabel		: '上级部门',
						anchor			: '95%',
						mode			: 'local',
						triggerAction	: 'all',
						labelStyle		: micolor,
						maxHeight		: 390,
						// 下拉框的显示模板,addDeptTreeDiv作为显示下拉树的容器
						tpl				: "<tpl for='.'><div style='height:390px'><div id='addDeptTreeDiv'></div></div></tpl>",
						allowBlank		: false,
						onSelect		: Ext.emptyFn,
						listeners		: {
							focus	: function() {
								setTimeout('Ext.getCmp("parentdeptname").expand();', 1);
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
			var addDeptFormPanel = new Ext.form.FormPanel({
						id			: 'addDeptFormPanel',
						name		: 'addDeptFormPanel',
						defaultType	: 'textfield',
						labelAlign	: 'right',
						labelWidth	: 70,
						frame		: false,
						bodyStyle	: 'padding:5 5 0',
						items		: [{
									fieldLabel	: '部门名称',
									name		: 'deptname',
									id			: 'deptname',
									allowBlank	: false,
									labelStyle	: micolor,
									maxLength	: mlm,
									anchor		: '95%'
								}, comboxWithTree, {
									fieldLabel	: '业务对照码',
									name		: 'customid',
									labelStyle	: fucolor,
									maxLength	: mlm,
									allowBlank	: true,
									anchor		: '95%'
								}, {
									fieldLabel	: '排序号',
									name		: 'sortno',
									labelStyle	: fucolor,
									maxLength	: mlm,
									allowBlank	: true,
									anchor		: '95%'
								}, {
									fieldLabel	: '备注',
									name		: 'remark',
									maxLength	: mlh,
									allowBlank	: true,
									anchor		: '95%'
								}, {
									id		: 'parentid',
									name	: 'parentid',
									hidden	: true
								}, {
									id		: 'windowmode',
									name	: 'windowmode',
									hidden	: true
								}, {
									id		: 'deptid',
									name	: 'deptid',
									hidden	: true
								}, {
									id		: 'parentid_old',
									name	: 'parentid_old',
									hidden	: true
								}]
					});
			var addDeptWindow = new Ext.Window({
						layout			: 'fit',
						width			: 400,
						height			: 230,
						resizable		: false,
						draggable		: true,
						closable		: true,
						modal			: true,
						closeAction		: 'hide',
						title			: '<span class="commoncss">新增</span>',
						// iconCls : 'page_addIcon',
						collapsible		: false,
						// titleCollapse : true,
						maximizable		: false,
						buttonAlign		: 'right',
						border			: false,
						animCollapse	: true,
						// pageY : document.body.clientHeight / 2 - 225 / 2,//pageY : 20,
						// pageX : document.body.clientWidth / 2 - 420 / 2,
						animateTarget	: Ext.getBody(),
						constrain		: true,
						items			: [addDeptFormPanel],
						buttons			: [{
									text	: '保存',
									iconCls	: 'acceptIcon',
									id		: 'btn_id_save_update',
									handler	: function() {
										if (runMode == '0') {
											infoMsgClick('应用授权不可用，请联系开发人员输入购买的授权密码，您目前只能进行查询操作！');
											return;
										}
										var mode = Ext.getCmp('windowmode').getValue();
										if (mode == 'add')
											saveDeptItem();
										else
											updateDeptItem();
									}
								}, {
									text	: '重置',
									id		: 'btnReset',
									iconCls	: 'tbar_synchronizeIcon',
									handler	: function() {
										clearForm(addDeptFormPanel.getForm());
									}
								}, {
									text	: '关闭',
									iconCls	: 'deleteIcon',
									handler	: function() {
										addDeptWindow.hide();
									}
								}]
					});
			// 布局
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
			 * 根据条件查询部门
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
			 * 新增部门初始化
			 */
			function addInit() {
				Ext.getCmp('btnReset').hide();
				// clearForm(addDeptFormPanel.getForm());
				var flag = Ext.getCmp('windowmode').getValue();
				if (typeof(flag) != 'undefined') {
					addDeptFormPanel.form.getEl().dom.reset();
				} else {
					clearForm(addDeptFormPanel.getForm());
				}
				var selectModel = deptTree.getSelectionModel();
				var selectNode = selectModel.getSelectedNode();
				Ext.getCmp('parentdeptname').setValue(selectNode.attributes.text);
				Ext.getCmp('parentid').setValue(selectNode.attributes.id);
				addDeptWindow.show();
				addDeptWindow.setTitle('<span class="commoncss">新增</span>');
				Ext.getCmp('windowmode').setValue('add');
				comboxWithTree.setDisabled(false);
				// Ext.getCmp('btnReset').show();
			}

			/**
			 * 保存部门数据
			 */
			function saveDeptItem() {
				if (!addDeptFormPanel.form.isValid()) {
					return;
				}
				addDeptFormPanel.form.submit({
							url				: 'organization.do?code=saveDeptItem',
							waitTitle		: '提示',
							method			: 'POST',
							submitEmptyText	: false,
							waitMsg			: '正在处理数据,请稍候...',
							success			: function(form, action) {
								addDeptWindow.hide();
								store.reload();
								refreshNode(Ext.getCmp('parentid').getValue());
								form.reset();
								infoMsg(action.result.msg);
							},
							failure			: function(form, action) {
								var msg = action.result.msg;
								infoMsg('部门数据保存失败:<br>' + msg);
							}
						});
			}

			/**
			 * 刷新指定节点
			 */
			function refreshNode(nodeid) {
				var node = deptTree.getNodeById(nodeid);
				/* 异步加载树在没有展开节点之前是获取不到对应节点对象的 */
				if (Ext.isEmpty(node)) {
					deptTree.root.reload();
					return;
				}
				if (node.attributes.leaf) {
					node.parentNode.reload();
				} else {
					node.reload();
				}
			}

			/**
			 * 修改部门初始化
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

				if (record.get('leaf') == '0' || record.get('usercount') != '0' || record.get('rolecount') != '0') {
					comboxWithTree.setDisabled(true);
				} else {
					comboxWithTree.setDisabled(false);
				}
				if (record.get('deptid') == '001') {
					var a = Ext.getCmp('parentdeptname');
					a.emptyText = '已经是顶级部门';
				} else {
				}
				addDeptFormPanel.getForm().loadRecord(record);
				addDeptWindow.show();
				addDeptWindow.setTitle('<span style="font-weight:normal">修改</span>');
				Ext.getCmp('windowmode').setValue('edit');
				Ext.getCmp('parentid_old').setValue(record.get('parentid'));
				Ext.getCmp('btnReset').hide();
			}

			/**
			 * 修改部门数据
			 */
			function updateDeptItem() {
				if (!addDeptFormPanel.form.isValid()) {
					return;
				}
				update();
			}

			/**
			 * 更新
			 */
			function update() {
				var parentid = Ext.getCmp('parentid').getValue();
				var parentid_old = Ext.getCmp('parentid_old').getValue();
				addDeptFormPanel.form.submit({
							url				: 'organization.do?code=updateDeptItem',
							waitTitle		: '提示',
							method			: 'POST',
							submitEmptyText	: false,
							waitMsg			: '正在处理数据,请稍候...',
							success			: function(form, action) {
								addDeptWindow.hide();
								store.reload();
								refreshNode(parentid);
								if (parentid != parentid_old) {
									refreshNode(parentid_old);
								}
								form.reset();
								infoMsg(action.result.msg);
							},
							failure			: function(form, action) {
								var msg = action.result.msg;
								infoMsg('部门数据修改失败:<br>' + msg);
							}
						});
			}

			/**
			 * 删除部门
			 */
			function deleteDeptItems(pType, pDeptid) {
				var rows = grid.getSelectionModel().getSelections();
				var fields = '';
				for (var i = 0; i < rows.length; i++) {
					if (rows[i].get('deptid') == '001') {
						fields = fields + rows[i].get('deptname') + '<br>';
					}
				}
				if (fields != '') {
					Ext.Msg.alert('提示', '<b>您选中的项目中包含如下系统内置的只读项目</b><br>' + fields + '<font color=red>只读项目不能删除!</font>');
					return;
				}
				if (Ext.isEmpty(rows)) {
					if (pType == '1') {
						infoMsg('您没有选中任何条目，请先选中要删除的项目！');
						return;
					}
				}
				var strChecked = jsArray2JsString(rows, 'deptid');
				Ext.Msg.confirm('请确认', '<span style="color:red"><b>提示:</b>删除部门将同时删除部门下属人员和角色以及它们的权限信息,请慎重.</span><br>继续删除吗?', function(btn, text) {
							if (btn == 'yes') {
								if (runMode == '0') {
									infoMsgClick('应用授权不可用，请联系开发人员输入购买的授权密码，您目前只能进行查询操作！');
									return;
								}
								showWaitMsg();
								Ext.Ajax.request({
											url		: 'organization.do?code=deleteDeptItems',
											success	: function(response) {
												var resultArray = Ext.util.JSON.decode(response.responseText);
												store.reload();
												if (pType == '1') {
													deptTree.root.reload();
												} else {
													deptTree.root.reload();
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
												deptid		: pDeptid
											}
										});
							}
						});
			}

			// 重置
			function resetToolbar() {
				Ext.getCmp('inputname').setValue('');
				store.load({
							params	: {
								start		: 0,
								limit		: bbar.pageSize,
								firstload	: 'true'
							}
						});
			}

		});