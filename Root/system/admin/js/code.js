/**
 * 字典管理
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
Ext.onReady(function() {
			var sm = new Ext.grid.CheckboxSelectionModel();
			var cm = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(), sm, {
						header		: '对照字段',
						dataIndex	: 'field',
						sortable	: true,
						width		: 130
					}, {
						header		: '字段名称',
						dataIndex	: 'fieldname',
						sortable	: true
					}, {
						header		: '代码',
						dataIndex	: 'codedic',
						width		: 50,
						sortable	: true
					}, {
						header		: '代码含义',
						dataIndex	: 'codedesc',
						sortable	: true
					}, {
						header		: '启用状态',
						dataIndex	: 'enabled',
						renderer	: ENABLEDRender,
						sortable	: true
					}, {
						header		: '编辑模式',
						dataIndex	: 'editmode',
						renderer	: EDITMODERender,
						sortable	: true
					}, {
						header		: '字段编号',
						dataIndex	: 'codeid',
						hidden		: false,
						width		: 80,
						sortable	: true
					}, {
						header		: '备注',
						dataIndex	: 'remark',
						id			: 'remark'
					}]);

			var store = new Ext.data.GroupingStore({
						proxy	: new Ext.data.HttpProxy({
									url	: './resource.do?code=queryCodeItems'
								}),
						reader	: new Ext.data.JsonReader({
									totalProperty	: 'TOTALCOUNT',
									root			: 'ROOT'
								}, [{
											name	: 'codeid'
										}, {
											name	: 'field'
										}, {
											name	: 'fieldname'
										}, {
											name	: 'codedic'
										}, {
											name	: 'codedesc'
										}, {
											name	: 'enabled'
										}, {
											name	: 'editmode'
										}, {
											name	: 'remark'
										}])
					});

			var filters = new Ext.ux.grid.GridFilters({// string,numeric,date,list,boolean
				encode		: true,
				autoReload	: false,
				local		: true,
				filters		: [{
							dataIndex	: 'field',
							type		: 'string'
						}, {
							dataIndex	: 'fieldname',
							type		: 'string'
						}, {
							dataIndex	: 'codedic',
							type		: 'string'
						}, {
							dataIndex	: 'codedesc',
							type		: 'string'
						}, {
							dataIndex	: 'enabled',
							type		: 'string'
						}, {
							dataIndex	: 'editmode',
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
									data	: [[10, '10条/页'], [20, '20条/页'], [50, '50条/页'], [100, '100条/页'], [250, '250条/页'], [500, '500条/页']]
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
						title				: '<span class="commoncss">字典数据列表</span>',
						height				: 510,
						header				: false,
						store				: store,
						region				: 'center',
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
										codeWindow.show();
									}
								}, '-', {
									text		: '修改',
									iconCls		: 'page_edit_1Icon',
									id			: 'modifyid',
									disabled	: true,
									handler		: function() {
										ininEditCodeWindow();
									}
								}, '-', {
									text		: '删除',
									iconCls		: 'page_delIcon',
									id			: 'deleteid',
									disabled	: true,
									handler		: function() {
										deleteCodeItems();
									}
								}, '-', {
									text	: '内存同步',
									iconCls	: 'arrow_refreshIcon',
									handler	: function() {
										synMemory('要对字典数据进行内存同步操作吗?', '1');
									}
								}, '-', '提示:维护字典后必须执行内存同步!', '->', new Ext.form.TextField({
											id				: 'inputname',
											name			: 'inputname',
											cls				: 'search',
											emptyText		: '字段|字段名|代码描述',
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
						stateId				: 'grid-code'
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
										codeWindow.show();
									}
								}, {
									text	: '修改',
									iconCls	: 'page_edit_1Icon',
									handler	: function() {
										ininEditCodeWindow();
									}
								}, {
									text	: '删除',
									iconCls	: 'page_delIcon',
									handler	: function() {
										deleteCodeItems();
									}
								}, '-', {
									text	: '查询',
									iconCls	: 'page_findIcon',
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

			grid.addListener('rowdblclick', ininEditCodeWindow);

			grid.on('sortchange', function() {
						// grid.getSelectionModel().selectFirstRow();
					});

			// 表格单击事件
			grid.on('rowclick', function(pGrid, rowIndex, event) {
						Ext.getCmp('modifyid').enable();
						Ext.getCmp('deleteid').enable();
					});

			store.load({
						params	: {
							start	: 0,
							limit	: bbar.pageSize
						}
					});

			bbar.on("change", function() {
						// grid.getSelectionModel().selectFirstRow();
					});
			/**
			 * 新增代码对照表
			 */
			var codeWindow;
			var formPanel;
			var enabledCombo = new Ext.form.ComboBox({
						name			: 'enabled',
						hiddenName		: 'enabled',
						store			: ENABLEDStore,
						mode			: 'local',
						triggerAction	: 'all',
						valueField		: 'value',
						displayField	: 'text',
						value			: '1',
						fieldLabel		: '启用状态',
						emptyText		: '请选择...',
						labelStyle		: micolor,
						allowBlank		: false,
						forceSelection	: true,
						editable		: false,
						typeAhead		: true,
						anchor			: '100%'
					});

			var editmodeCombo = new Ext.form.ComboBox({
						name			: 'editmode',
						hiddenName		: 'editmode',
						typeAhead		: true,
						triggerAction	: 'all',
						lazyRender		: true,
						mode			: 'local',
						store			: EDITMODEStore,
						valueField		: 'value',
						displayField	: 'text',
						anchor			: '100%',
						value			: '1',
						editable		: false,
						labelStyle		: micolor,
						emptyText		: '请选择...',
						fieldLabel		: '编辑模式'
					});

			formPanel = new Ext.form.FormPanel({
						id			: 'codeForm',
						name		: 'codeForm',
						defaultType	: 'textfield',
						labelAlign	: 'right',
						labelWidth	: 60,
						frame		: false,
						bodyStyle	: 'padding:5 5 0',
						items		: [{
									fieldLabel	: '对照字段',
									name		: 'field',
									anchor		: '100%',
									labelStyle	: micolor,
									allowBlank	: false
								}, {
									fieldLabel	: '字段名称',
									name		: 'fieldname',
									anchor		: '100%',
									labelStyle	: micolor,
									allowBlank	: false
								}, {
									xtype		: 'numberfield',
									fieldLabel	: '字段代码',
									name		: 'codedic',
									anchor		: '100%',
									labelStyle	: micolor,
									allowBlank	: false
								}, {
									fieldLabel	: '代码描述',
									name		: 'codedesc',
									anchor		: '100%',
									labelStyle	: micolor,
									allowBlank	: false
								}, enabledCombo, editmodeCombo, {
									fieldLabel	: '备注',
									name		: 'remark',
									anchor		: '100%',
									allowBlank	: true
								}]
					});

			codeWindow = new Ext.Window({
						layout			: 'fit',
						width			: 300,
						height			: 315,
						resizable		: false,
						draggable		: true,
						closeAction		: 'hide',
						title			: '<span class="commoncss">新增字典</span>',
						// iconCls : 'page_addIcon',
						modal			: true,
						collapsible		: true,
						titleCollapse	: true,
						maximizable		: false,
						buttonAlign		: 'right',
						border			: false,
						animCollapse	: true,
						animateTarget	: Ext.getBody(),
						constrain		: true,
						items			: [formPanel],
						buttons			: [{
									text	: '保存',
									iconCls	: 'acceptIcon',
									handler	: function() {
										if (runMode == '0') {
											infoMsgClick('应用授权不可用，请联系开发人员输入购买的授权密码，您目前只能进行查询操作！');
											return;
										}
										if (codeWindow.getComponent('codeForm').form.isValid()) {
											codeWindow.getComponent('codeForm').form.submit({
														url			: './resource.do?code=saveCodeItem',
														waitTitle	: '提示',
														method		: 'POST',
														waitMsg		: '正在处理数据,请稍候...',
														success		: function(form, action) {
															store.reload();
															Ext.Msg.confirm('请确认', '代码对照新增成功,您要继续添加代码对照吗?', function(btn, text) {
																		if (btn == 'yes') {
																			codeWindow.getComponent('codeForm').form.reset();
																		} else {
																			codeWindow.hide();
																			synMemory('要立即进行内存同步吗？');
																		}
																	});
														},
														failure		: function(form, action) {
															var msg = action.result.msg;
															infoMsg('代码对照表保存失败:<br>' + msg);
															codeWindow.getComponent('codeForm').form.reset();
														}
													});
										} else {
											// 表单验证失败
										}
									}
								}, {
									text	: '关闭',
									iconCls	: 'deleteIcon',
									handler	: function() {
										codeWindow.hide();
									}
								}]
					});

			/** *****************修改代码对照*********************** */
			var enabledCombo_E = new Ext.form.ComboBox({
						name			: 'enabled',
						hiddenName		: 'enabled',
						store			: ENABLEDStore,
						mode			: 'local',
						triggerAction	: 'all',
						valueField		: 'value',
						displayField	: 'text',
						value			: '1',
						fieldLabel		: '启用状态',
						emptyText		: '请选择...',
						labelStyle		: micolor,
						allowBlank		: false,
						forceSelection	: true,
						editable		: false,
						typeAhead		: true,
						anchor			: '100%'
					});

			var editmodeCombo_E = new Ext.form.ComboBox({
						name			: 'editmode',
						hiddenName		: 'editmode',
						typeAhead		: true,
						triggerAction	: 'all',
						lazyRender		: true,
						disabled		: true,
						fieldClass		: 'x-custom-field-disabled',
						mode			: 'local',
						labelStyle		: micolor,
						store			: EDITMODEStore,
						valueField		: 'value',
						displayField	: 'text',
						anchor			: '100%',
						value			: '1',
						editable		: false,
						emptyText		: '请选择...',
						fieldLabel		: '编辑模式'
					});

			var editCodeWindow, editCodeFormPanel;
			editCodeFormPanel = new Ext.form.FormPanel({
						labelAlign	: 'right',
						labelWidth	: 60,
						defaultType	: 'textfield',
						frame		: false,
						bodyStyle	: 'padding:5 5 0',
						id			: 'editCodeFormPanel',
						name		: 'editCodeFormPanel',
						items		: [{
									fieldLabel	: '对照字段',
									name		: 'field',
									anchor		: '100%',
									labelStyle	: micolor,
									allowBlank	: false
								}, {
									fieldLabel	: '字段名称',
									name		: 'fieldname',
									anchor		: '100%',
									labelStyle	: micolor,
									allowBlank	: false
								}, {
									xtype		: 'numberfield',
									fieldLabel	: '字段代码',
									name		: 'codedic',
									anchor		: '100%',
									labelStyle	: micolor,
									allowBlank	: false
								}, {
									fieldLabel	: '代码描述',
									name		: 'codedesc',
									anchor		: '100%',
									labelStyle	: micolor,
									allowBlank	: false
								}, enabledCombo_E, editmodeCombo_E, {
									fieldLabel	: '备注',
									name		: 'remark',
									anchor		: '100%',
									allowBlank	: true
								}, {
									fieldLabel	: '代码编号',
									name		: 'codeid',
									anchor		: '100%',
									hidden		: true,
									hideLabel	: true
								}]
					});

			editCodeWindow = new Ext.Window({
						layout			: 'fit',
						width			: 300,
						height			: 315,
						resizable		: false,
						draggable		: true,
						closeAction		: 'hide',
						title			: '<span class="commoncss">修改字典</span>',
						modal			: true,
						collapsible		: true,
						titleCollapse	: true,
						maximizable		: false,
						buttonAlign		: 'right',
						border			: false,
						animCollapse	: true,
						animateTarget	: Ext.getBody(),
						constrain		: true,
						items			: [editCodeFormPanel],
						buttons			: [{
									text	: '保存',
									iconCls	: 'acceptIcon',
									handler	: function() {
										if (runMode == '0') {
											infoMsgClick('应用授权不可用，请联系开发人员输入购买的授权密码，您目前只能进行查询操作！');
											return;
										}
										updateCodeItem();
									}
								}, {
									text	: '关闭',
									iconCls	: 'deleteIcon',
									handler	: function() {
										editCodeWindow.hide();
									}
								}]

					});
			/**
			 * 布局
			 */
			var viewport = new Ext.Viewport({
						layout	: 'border',
						items	: [grid]
					});

			/**
			 * 初始化代码修改出口
			 */
			function ininEditCodeWindow() {
				var record = grid.getSelectionModel().getSelected();
				if (Ext.isEmpty(record)) {
					infoMsg('您没有选中任何条目，请先选中要修改的项目！');
					return;
				}
				// record = grid.getSelectionModel().getSelected();
				if (record.get('editmode') == '0') {
					infoMsg('您选中的记录为系统内置代码对照,您没有权限修改!');
					return;
				}
				editCodeWindow.show();
				editCodeFormPanel.getForm().loadRecord(record);
			}

			/**
			 * 修改字典
			 */
			function updateCodeItem() {
				if (!editCodeFormPanel.form.isValid()) {
					return;
				}
				editCodeFormPanel.form.submit({
							url			: './resource.do?code=updateCodeItem',
							waitTitle	: '提示',
							method		: 'POST',
							waitMsg		: '正在处理数据,请稍候...',
							success		: function(form, action) {
								editCodeWindow.hide();
								store.reload();
								synMemory('字典修改成功,要立即进行内存同步吗？');
							},
							failure		: function(form, action) {
								var msg = action.result.msg;
								infoMsg('代码对照表保存失败:<br>' + msg);
							}
						});
			}

			/**
			 * 内存同步
			 */
			function synMemory(msg, flag) {
				Ext.Msg.confirm('请确认', msg, function(btn, text) {
							if (btn == 'yes') {
								showWaitMsg();
								Ext.Ajax.request({
											url		: 'resource.do?code=synMemory',
											success	: function(response) {
												if (flag == '1') {
													store.reload();
												}
												var resultArray = Ext.util.JSON.decode(response.responseText);
												infoMsg(resultArray.msg);
											},
											failure	: function(response) {
												infoMsg('内存同步失败');
											}
										});
							}
						});
			}

			/**
			 * 删除代码对照
			 */
			function deleteCodeItems() {
				if (runMode == '0') {
					infoMsgClick('应用授权不可用，请联系开发人员输入购买的授权密码，您目前只能进行查询操作！');
					return;
				}
				var rows = grid.getSelectionModel().getSelections();
				var fields = '';
				for (var i = 0; i < rows.length; i++) {
					if (rows[i].get('editmode') == '0') {
						fields = fields + rows[i].get('fieldname') + '->' + rows[i].get('codedesc') + '<br>';
					}
				}
				if (fields != '') {
					infoMsg('<b>您选中的项目中包含如下系统内置的只读项目</b><br>' + fields + '<font color=red>只读项目不能删除!</font>');
					return;
				}
				if (Ext.isEmpty(rows)) {
					infoMsg('您没有选中任何条目，请先选中要删除的项目！');
					return;
				}
				var strChecked = jsArray2JsString(rows, 'codeid');
				Ext.Msg.confirm('请确认', '你真的要删除字典吗?', function(btn, text) {
							if (btn == 'yes') {
								showWaitMsg();
								Ext.Ajax.request({
											url		: './resource.do?code=deleteCodeItem',
											success	: function(response) {
												store.reload();
												synMemory('字典删除成功,要立即进行内存同步吗？');
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
			 * 根据条件查询字典
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
			 * 刷新字典
			 */
			function refreshCodeTable() {
				store.load({
							params	: {
								start	: 0,
								limit	: bbar.pageSize
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