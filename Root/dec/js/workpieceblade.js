/**
 * 工件材料刀片材料匹配关系
 * 
 * @author fuxianwu
 * @since 2013-01-01
 */
Ext.onReady(function() {

			// 复选框
			var sm = new Ext.grid.CheckboxSelectionModel();

			// 行号
			var rownum = new Ext.grid.RowNumberer({
						header	: '序',
						width	: 26
					});

			// 列模型
			var cm = new Ext.grid.ColumnModel([rownum, sm, {
				header		: '刀片材质ID', // 列标题
				dataIndex	: 'bladematerialid', // 数据索引,和Store数据存储模型对应
				width		: 60, // 列宽度
				sortable	: true, // 该列是否要排序
				hidden		: true
					// 该列是否隐藏
				}, {
				header		: '工件材料ID', // 列标题
				dataIndex	: 'workpiecematerialid', // 数据索引,和Store数据存储模型对应
				width		: 60, // 列宽度
				sortable	: true, // 该列是否要排序
				hidden		: true
					// 该列是否隐藏
				}, {
				header		: '刀片材质名称',
				dataIndex	: 'name',
				width		: 150,
				sortable	: true
					// hidden : true
				}, {
				header		: 'ISO分类',
				dataIndex	: 'isotype',
				renderer	: ISOTYPERender,
				width		: 120,
				// hidden : true,
				sortable	: true
			}, {
				header		: '刀片品牌编号',
				dataIndex	: 'brandid',
				width		: 200,
				sortable	: true,
				hidden		: true
			}, {
				header		: '涂层类型',
				dataIndex	: 'coatingtype',
				// hidden : true,
				width		: 200,
				sortable	: true
			}, {
				header		: '涂层',
				dataIndex	: 'coating',
				width		: 120,
				// hidden : true,
				sortable	: true
			}, {
				header		: '刀片材质应用',
				dataIndex	: 'bladematerialapplication',
				width		: 200,
				// hidden : true,
				sortable	: true
			}, {
				header		: '刀片材质备注信息',
				dataIndex	: 'bladematerialremark',
				// hidden : true,
				width		: 110,
				sortable	: true
			}, {
				header		: '工件材料牌号',
				dataIndex	: 'name',
				width		: 150,
				sortable	: true
					// hidden : true
				}, {
				header		: '热处理代码',
				dataIndex	: 'heattreatcode',
				width		: 150,
				sortable	: true
					// hidden : true
				}, {
				header		: '材料类型',
				dataIndex	: 'wmtype',
				width		: 150,
				sortable	: true
					// hidden : true
				}, {
				header		: 'ISO分类',
				dataIndex	: 'isotype',
				renderer	: ISOTYPERender,
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '热处理状态',
				dataIndex	: 'heattreat',
				// hidden : true,
				width		: 120,
				sortable	: true
			}, {
				header		: '毛胚状态',
				dataIndex	: 'blanktype',
				width		: 180,
				// hidden : true,
				sortable	: true
			}, {
				header		: '硬度',
				dataIndex	: 'hardness',
				width		: 120,
				// hidden : true,
				sortable	: true
			}, {
				header		: '印记',
				dataIndex	: 'mark',
				// hidden : true,
				width		: 80,
				sortable	: true
			}, {
				header		: '工件材料用途',
				dataIndex	: 'workpiecematerialapplication',
				width		: 330,
				// hidden : true,
				sortable	: true
			}, {
				header		: '工件材料备注信息',
				dataIndex	: 'workpiecemateialremark',
				width		: 100,
				// hidden : true,
				sortable	: true
			}]);

			// Store数据存储
			var store = new Ext.data.GroupingStore({
						proxy	: new Ext.data.HttpProxy({
							url	: 'workpieceblade.do?code=queryWorkpieceblade4Manage'
								// queryWorkpieceblade4Manage是在WorkpiecebladeAction中的方法queryWorkpieceblade4Manage;
							}),
						reader	: new Ext.data.JsonReader({
									totalProperty	: 'TOTALCOUNT',
									root			: 'ROOT'
								}, [{
											name	: 'bladematerialid'
										}, {
											name	: 'bladematerialname'
										}, {
											name	: 'isotype'
										}, {
											name	: 'brandid'
										}, {
											name	: 'coatingtype'
										}, {
											name	: 'coating'
										}, {
											name	: 'bladematerialapplication'
										}, {
											name	: 'bladematerialremark'
										}, {
											name	: 'workpiecematerialid'
										}, {
											name	: 'workpiecematerialname'
										}, {
											name	: 'heattreatcode'
										}, {
											name	: 'wmtype'
										}, {
											name	: 'isotype'
										}, {
											name	: 'heattreat'
										}, {
											name	: 'blanktype'
										}, {
											name	: 'hardness'
										}, {
											name	: 'mark'
										}, {
											name	: 'workpiecematerialapplication'
										}, {
											name	: 'workpiecematerialremark'
										}])
					});

			// 翻页排序时带上查询条件
			store.on('beforeload', function() {
						this.baseParams = {
							keyword	: Ext.getCmp('inputname').getValue()
						};
					});

			// 每页显示条数下拉选择框
			var pagesize_combo = new Ext.form.ComboBox({
						name			: 'pagesize',
						triggerAction	: 'all',
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

			// 分页工具栏
			var bbar = new Ext.PagingToolbar({
						pageSize	: number,
						store		: store,
						displayInfo	: true,
						displayMsg	: '显示第 {0} 条到第 {1} 条,共 {2} 条',
						plugins		: new Ext.ux.ProgressBarPager(),
						emptyMsg	: "对不起,没有符合条件的记录!",
						items		: ['-', '&nbsp;&nbsp;', pagesize_combo]
					});

			// 表格工具栏
			var tbar = new Ext.Toolbar({
						items	: [{
									text	: '新增',
									iconCls	: 'page_addIcon',
									hidden	: true,
									handler	: function() {
										addInit();
									}
								}, {
									text		: '修改',
									iconCls		: 'page_edit_1Icon',
									id			: 'modifyid',
									hidden		: true,
									disabled	: true,
									handler		: function() {
										editInit();
									}
								}, {
									text		: '删除',
									id			: 'deleteid',
									disabled	: true,
									hidden		: true,
									iconCls		: 'page_delIcon',
									handler		: function() {
										deleteInit();
									}
								}, '->', {
									xtype			: 'textfield',
									id				: 'inputname',
									name			: 'inputname',
									cls				: 'search',
									emptyText		: '刀片材料|工件材料',
									width			: 150,
									enableKeyEvents	: true,
									listeners		: {
										specialkey	: function(field, e) {
											if (e.getKey() == Ext.EventObject.ENTER) {
												queryInfo();
											}
										}
									}
								}, {
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
									text	: '高级',
									hidden	: true,
									iconCls	: 'page_findIcon',
									handler	: function() {
										advancedQuery();
									}
								}, {
									text	: '重置',
									iconCls	: 'tbar_synchronizeIcon',
									handler	: function() {
										resetToolbar();
									}
								}]
					});

			// 刀片材料数据集
			var bladematerialStore = new Ext.data.Store({
						proxy		: new Ext.data.HttpProxy({
									url	: 'workpieceblade.do?code=queryBladematerial4Workpieceblade'
								}),
						reader		: new Ext.data.JsonReader({
									totalProperty	: 'TOTALCOUNT',
									root			: 'ROOT'
								}, [{
											name	: 'value'
										}, {
											name	: 'text'
										}]),
						listeners	: {
							'load'	: function(obj) {
							}
						}
					});
			bladematerialStore.load();

			// 刀片材料下拉框
			var bladematerialCombo = new Ext.form.ComboBox({
						fieldLabel		: '刀片材料',
						hiddenName		: 'bladematerialid',
						store			: bladematerialStore,
						mode			: 'local',
						triggerAction	: 'all',
						valueField		: 'value',
						displayField	: 'text',
						// lazyRender : true,
						forceSelection	: true,
						emptyText		: '请选择刀片材料...',
						plugins			: [new QM.plugin.PinyinFilter],
						editable		: true, // 选择输入框可编辑
						// typeAhead : true, // 输入的时候自动匹配待选项目
						anchor			: '89%'
					});

			// 工件材料数据集
			var workpiecematerialStore = new Ext.data.Store({
						proxy		: new Ext.data.HttpProxy({
									url	: 'workpieceblade.do?code=queryWorkpiecematerial4Workpieceblade'
								}),
						reader		: new Ext.data.JsonReader({
									totalProperty	: 'TOTALCOUNT',
									root			: 'ROOT'
								}, [{
											name	: 'value'
										}, {
											name	: 'text'
										}]),
						listeners	: {
							'load'	: function(obj) {
							}
						}
					});
			workpiecematerialStore.load();

			// 工件材料牌号下拉框
			var workpiecematerialCombo = new Ext.form.ComboBox({
						fieldLabel		: '工件材料牌号',
						hiddenName		: 'workpiecematerialid',
						store			: workpiecematerialStore,
						mode			: 'local',
						triggerAction	: 'all',
						valueField		: 'value',
						displayField	: 'text',
						// lazyRender : true,
						forceSelection	: true,
						emptyText		: '请选择工件材料牌号...',
						plugins			: [new QM.plugin.PinyinFilter],
						editable		: true, // 选择输入框可编辑
						// typeAhead : true, // 输入的时候自动匹配待选项目
						anchor			: '89%'
					});

			// 页面过滤
			var filters = new Ext.ux.grid.GridFilters({// string,numeric,date,list,boolean
				encode		: true,
				autoReload	: false,
				local		: true,
				filters		: [{
							dataIndex	: 'bladematerialname',
							type		: 'string'
						}, {
							dataIndex	: 'isotype',
							type		: 'string'
						}, {
							dataIndex	: 'coatingtype',
							type		: 'string'
						}, {
							dataIndex	: 'coating',
							type		: 'string'
						}, {
							dataIndex	: 'bladematerialapplication',
							type		: 'string'
						}, {
							dataIndex	: 'bladematerialremark',
							type		: 'string'
						}, {
							dataIndex	: 'workpiecematerialname',
							type		: 'string'
						}, {
							dataIndex	: 'heattreatcode',
							type		: 'string'
						}, {
							dataIndex	: 'wmtype',
							type		: 'numeric'
						}, {
							dataIndex	: 'isotype',
							type		: 'numeric'
						}, {
							dataIndex	: 'heattreat',
							type		: 'string'
						}, {
							dataIndex	: 'blanktype',
							type		: 'numeric'
						}, {
							dataIndex	: 'hardness',
							type		: 'numeric'
						}, {
							dataIndex	: 'mark',
							type		: 'string'
						}, {
							dataIndex	: 'workpiecematerialapplication',
							type		: 'string'
						}, {
							dataIndex	: 'workpiecematerialremark',
							type		: 'string'
						}
				/*
				 * { type : 'list', dataIndex : 'size', options : ['extra small', 'small', 'medium', 'large', 'extra large'] }
				 */]
			});

			// 新增窗口表单
			var addItemForm = new Ext.form.FormPanel({
						width		: '100%',
						header		: false,
						autoHeight	: true,
						frame		: true,
						layout		: 'form',
						labelWidth	: 100,
						labelAlign	: 'right',
						defaults	: {
							anchor	: '100%'
						},
						bodyStyle	: 'padding:5 5 5 5',
						items		: [{
									layout	: 'column',
									items	: [{
												columnWidth	: .5,
												layout		: 'form',
												defaultType	: 'combo',
												defaults	: {
													width		: '85%',
													anchor		: '89%',
													allowBlank	: false,
													labelStyle	: micolor
												},
												items		: [bladematerialCombo]
											}, {
												columnWidth	: .5,
												layout		: 'form',
												defaultType	: 'textfield',
												defaults	: {
													width		: '85%',
													anchor		: '89%',
													labelStyle	: micolor,
													allowBlank	: false
												},
												items		: [workpiecematerialCombo]
											}]
								}, {
									fieldLabel	: '备注',
									name		: 'remark',
									xtype		: 'textfield',
									anchor		: '94.6%'
									// hidden : true
							}	, {
									id		: 'windowmode',
									name	: 'windowmode',
									xtype	: 'textfield',
									hidden	: true
								}]
					});

			var addItem = new Ext.Window({
						title		: '<span class="commoncss">新增</span>',
						layout		: 'fit',
						width		: 800,
						height		: 150,
						closable	: true, // 是否可关闭
						closeAction	: 'hide',
						collapsible	: false, // 是否可收缩
						maximizable	: false, // 设置是否可以最大化
						border		: false, // 边框线设置
						constrain	: false, // 设置窗口是否可以溢出父容器
						pageY		: document.body.clientHeight / 2 - 150 / 2,// pageY : 20, // 页面定位Y坐标
						pageX		: document.body.clientWidth / 2 - 800 / 2, // 页面定位X坐标
						items		: [addItemForm],
						buttons		: [{
									text	: '保存',
									id		: 'savebtn',
									iconCls	: 'acceptIcon',
									handler	: function() {
										var mode = Ext.getCmp('windowmode').getValue();
										if (mode == 'add')
											submitForm();
										else
											updateForm();
									}
								}, {
									text	: '取消',
									id		: 'cancelbtn',
									iconCls	: 'cancelIcon',
									handler	: function() {
										addItem.hide();
									}
								}]
					});

			// 表格
			var grid = new Ext.grid.GridPanel({
						title		: '<span class="commoncss">刀片</span>',
						header		: false,
						height		: 500,
						autoScroll	: true,
						frame		: true,
						region		: 'center',
						store		: store,
						stripeRows	: true,
						sm			: sm,
						cm			: cm,
						tbar		: tbar,
						bbar		: bbar,
						viewConfig	: {
							forceFit	: false
							// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
						},
						loadMask	: {
							msg	: '正在加载表格数据,请稍等...'
						},
						view		: new Ext.grid.GroupingView(),
						plugins		: [filters],
						stateful	: sf,
						stateId		: 'grid-workpiece-blade'
					});

			// 表格单击事件
			grid.on('rowclick', function(pGrid, rowIndex, event) {
						Ext.getCmp('modifyid').enable();
						Ext.getCmp('deleteid').enable();
					});
			// 表格双击事件
			grid.on('rowdblclick', function(grid, rowIndex, event) {
						editInit();
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
								}, '-', /*
										 * { text : '新增', iconCls : 'page_addIcon', handler : function() { addInit(); } }, { text : '修改', iconCls : 'page_edit_1Icon', handler : function() {
										 * editInit(); } }, { text : '删除', iconCls : 'page_delIcon', handler : function() { deleteInit(); } }, '-',
										 */{
									text	: '查询',
									iconCls	: 'page_findIcon',
									handler	: function() {
										advancedQuery();
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

			// 是否默认选中第一行数据
			bbar.on("change", function() {
						// grid.getSelectionModel().selectFirstRow();
					});

			// 页面初始自动查询数据
			store.load({
						params	: {
							start	: 0,
							limit	: bbar.pageSize
						}
					});

			// 布局模型
			var viewport = new Ext.Viewport({
						layout	: 'border',
						items	: [grid]
					});

			// 查询表格数据
			function queryInfo() {
				store.load({
							params	: {
								start	: 0,
								limit	: bbar.pageSize,
								keyword	: Ext.getCmp('inputname').getValue()
							}
						});
			}

			// 高级查询
			function advancedQuery() {
				infoMsg('高级查询属于自定义查询，需要用户告知开发者所需功能才可进行添加。');
			}

			// 新增
			function addInit() {
				addItemForm.getForm().reset();
				addItem.setTitle('<span class="commoncss">新增</span>');
				Ext.getCmp('windowmode').setValue('add');

				Ext.getCmp('savebtn').setText('保存');
				addItem.show();
			}

			// 修改
			function editInit() {
				var record = grid.getSelectionModel().getSelected();
				if (Ext.isEmpty(record)) {
					infoMsg('您没有选中任何条目，请先选中要修改的项目！');
					return;
				}
				addItemForm.getForm().loadRecord(record);
				addItem.setTitle('<span class="commoncss">修改</span>');

				Ext.getCmp('savebtn').setText('更新');
				Ext.getCmp('windowmode').setValue('edit');
				addItem.show();
			}

			// 删除
			function deleteInit() {
				var records = grid.getSelectionModel().getSelections();
				if (Ext.isEmpty(records)) {
					infoMsg('您没有选中任何条目，请先选中要删除的项目！');
					return;
				}
				var strChecked = jsArray2JsString2(records, 'workpiecematerialid', 'bladematerialid');
				Ext.Msg.confirm('请确认', '确认删除选中的记录吗', function(btn, text) {
							if (btn == 'yes') {
								showWaitMsg();
								Ext.Ajax.request({
											url		: 'workpieceblade.do?code=deleteWorkpieceblade',
											success	: function(response) {
												var resultArray = Ext.util.JSON.decode(response.responseText);
												store.reload();
												infoMsg(resultArray.msg);
											},
											params	: {
												strChecked	: strChecked
											}
										});
							}
						});
			}

			// 保存
			function submitForm() {
				if (!addItemForm.getForm().isValid()) {
					warningMsg('必填项未填写，或填写格式不正确，请检查窗口红色标示的区域!');
					return;
				}
				addItemForm.form.submit({
							url			: 'workpieceblade.do?code=saveWorkpieceblade',
							waitTitle	: '提示',
							method		: 'POST',
							waitMsg		: '正在处理数据,请稍候...',
							success		: function(form, action) {
								store.reload();
								infoMsg(action.result.msg);
								addItem.hide();
							},
							failure		: function(form, action) {
								warningMsg('数据保存失败,错误类型: ' + action.result.msg);
							}
						});
			}

			// 更新
			function updateForm() {
				if (!addItemForm.getForm().isValid()) {
					warningMsg('必填项未填写，或填写格式不正确，请检查窗口红色标示的区域!');
					return;
				}
				addItemForm.form.submit({
							url			: 'workpieceblade.do?code=updateWorkpieceblade',
							waitTitle	: '提示',
							method		: 'POST',
							waitMsg		: '正在处理数据,请稍候...',
							success		: function(form, action) {
								store.reload();
								infoMsg(action.result.msg);
								addItem.hide();
							},
							failure		: function(form, action) {
								warningMsg('数据保存失败,错误类型: ' + action.failureType);
							}
						});
			}

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
		});