/**
 * 加工方式
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
				header		: '切削参数id', // 列标题
				dataIndex	: 'parameterid', // 数据索引,和Store数据存储模型对应
				width		: 60, // 列宽度
				sortable	: true, // 该列是否要排序
				hidden		: true
					// 该列是否隐藏
				}, {
				header		: '工件材料代码',
				dataIndex	: 'workpiecematerialid',
				width		: 60,
				sortable	: true,
				hidden		: true
			}, {
				header		: '工件材料牌号',
				dataIndex	: 'workpiecematerialname',
				width		: 60,
				sortable	: true
					// hidden : true
				}, {
				header		: '刀片材质ID',
				dataIndex	: 'bladematerialid',
				width		: 60,
				sortable	: true,
				hidden		: true
			}, {
				header		: '刀片材质名称',
				dataIndex	: 'bladematerialname',
				width		: 60,
				sortable	: true
					// hidden : true
				}, {
				header		: '最大切削速度',
				dataIndex	: 'vcmax',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '最小切削速度',
				dataIndex	: 'vcmin',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '理想切屑形状',
				dataIndex	: 'chip',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '金属去除率',
				dataIndex	: 'removalrates',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '切削功率',
				dataIndex	: 'power',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '备注',
				dataIndex	: 'remark',
				width		: 80,
				// hidden : true,
				sortable	: true
			}]);

			// Store数据存储
			var store = new Ext.data.GroupingStore({
						proxy	: new Ext.data.HttpProxy({
							url	: 'ctparameter.do?code=queryCtparameter4Manage'
								// queryCtparameter4Manage是在CtparameterAction中的方法queryCtparameter4Manage;
							}),
						reader	: new Ext.data.JsonReader({
									totalProperty	: 'TOTALCOUNT',
									root			: 'ROOT'
								}, [{
											name	: 'parameterid'
										}, {
											name	: 'workpiecematerialid'
										}, {
											name	: 'workpiecematerialname'
										}, {
											name	: 'bladematerialid'
										}, {
											name	: 'bladematerialname'
										}, {
											name	: 'vcmax'
										}, {
											name	: 'vcmin'
										}, {
											name	: 'chip'
										}, {
											name	: 'removalrates'
										}, {
											name	: 'power'
										}, {
											name	: 'remark'
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
									handler	: function() {
										addInit();
									}
								}, {
									text		: '修改',
									iconCls		: 'page_edit_1Icon',
									id			: 'modifyid',
									disabled	: true,
									handler		: function() {
										editInit();
									}
								}, {
									text		: '删除',
									id			: 'deleteid',
									disabled	: true,
									iconCls		: 'page_delIcon',
									handler		: function() {
										deleteInit();
									}
								}, '->', {
									xtype			: 'textfield',
									id				: 'inputname',
									name			: 'inputname',
									cls				: 'search',
									emptyText		: '刀片名称|分类名称',
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

			var workpiecematerialStore = new Ext.data.Store({
						proxy		: new Ext.data.HttpProxy({
									url	: 'ctparameter.do?code=queryWorkpiecematerial4Ctparameter'
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
							// 设置远程数据源下拉选择框的初始值
							'load'	: function(obj) {
								// classStore.setValue('530101');
							}
						}
					});
			workpiecematerialStore.load(); // 如果mode : 'local',时候才需要手动load();

			var workpiecematerialCombo = new Ext.form.ComboBox({
				fieldLabel		: '工件材料代码',
				hiddenName		: 'bladematerialid',
				emptyText		: '请选择工件材料代码...',
				triggerAction	: 'all',
				store			: workpiecematerialStore,
				displayField	: 'text',
				valueField		: 'value',
				loadingText		: '正在加载数据...',
				mode			: 'local', // 数据会自动读取,如果设置为local又调用了store.load()则会读取2次；也可以将其设置为local，然后通过store.load()方法来读取
				forceSelection	: true,
				// typeAhead : true,
				// pageSize : cln,
				// minListWidth : 270,
				// plugins : [new QM.plugin.PinyinFilter],
				resizable		: true,
				// editable : false,
				anchor			: '94.6%'
					// width : '85%'
				});

			var bladematerialStore = new Ext.data.Store({
						proxy		: new Ext.data.HttpProxy({
									url	: 'ctparameter.do?code=queryBladematerial4Ctparameter'
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
							// 设置远程数据源下拉选择框的初始值
							'load'	: function(obj) {
								// classStore.setValue('530101');
							}
						}
					});
			bladematerialStore.load(); // 如果mode : 'local',时候才需要手动load();

			var bladematerialCombo = new Ext.form.ComboBox({
				fieldLabel		: '刀片材质',
				hiddenName		: 'bladematerialid',
				emptyText		: '请选择刀片材质...',
				triggerAction	: 'all',
				store			: bladematerialStore,
				displayField	: 'text',
				valueField		: 'value',
				loadingText		: '正在加载数据...',
				mode			: 'local', // 数据会自动读取,如果设置为local又调用了store.load()则会读取2次；也可以将其设置为local，然后通过store.load()方法来读取
				forceSelection	: true,
				// typeAhead : true,
				// pageSize : cln,
				// minListWidth : 270,
				// plugins : [new QM.plugin.PinyinFilter],
				resizable		: true,
				// editable : false,
				anchor			: '94.6%'
					// width : '85%'
				});

			// 页面过滤
			var filters = new Ext.ux.grid.GridFilters({// string,numeric,date,list,boolean
				encode		: true,
				autoReload	: false,
				local		: true,
				filters		: [{
							dataIndex	: 'workpiecematerialname',
							type		: 'string'
						}, {
							dataIndex	: 'bladematerialname',
							type		: 'string'
						}, {
							dataIndex	: 'vcmax',
							type		: 'numeric'
						}, {
							dataIndex	: 'vcmin',
							type		: 'numeric'
						}, {
							dataIndex	: 'chip',
							type		: 'string'
						}, {
							dataIndex	: 'removalrates',
							type		: 'numeric'
						}, {
							dataIndex	: 'power',
							type		: 'numeric'
						}, {
							dataIndex	: 'remark',
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
						labelWidth	: 60,
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
												defaultType	: 'textfield',
												defaults	: {
													width		: '85%',
													anchor		: '89%',
													allowBlank	: false,
													labelStyle	: micolor
												},
												items		: [workpiecematerialCombo, bladematerialCombo, {
															fieldLabel	: '最大切削速度',
															name		: 'vcmax',
															// xtype : 'numberfield',
															emptyText	: '请输入最大切削速度...'
														}, {
															fieldLabel	: '最小切削速度',
															name		: 'vcmin',
															// xtype : 'numberfield',
															emptyText	: '请输入最小切削速度...'
														}, {
															fieldLabel	: '理想切屑形状',
															name		: 'chip',
															// xtype : 'numberfield',
															emptyText	: '请输入理想切屑形状...'
														}, {
															fieldLabel	: '金属去除率',
															name		: 'removalrates',
															// xtype : 'numberfield',
															emptyText	: '请输入金属去除率...'
														}, {
															fieldLabel	: '切削功率',
															name		: 'power',
															// xtype : 'numberfield',
															emptyText	: '请输入切削功率...'
														}, {
															fieldLabel	: '备注',
															name		: 'remark',
															// xtype : 'numberfield',
															emptyText	: '请输入备注...'
														}]
											}]
								}, {
									id		: 'parameterid',
									name	: 'parameterid',
									xtype	: 'textfield',
									hidden	: true
								}, {
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
						height		: 300,
						closable	: true, // 是否可关闭
						closeAction	: 'hide',
						collapsible	: false, // 是否可收缩
						maximizable	: false, // 设置是否可以最大化
						border		: false, // 边框线设置
						constrain	: false, // 设置窗口是否可以溢出父容器
						pageY		: 20, // 页面定位Y坐标
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
						plugins		: [filters]
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
										deleteInit();
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

				Ext.getCmp('parameterid').setValue(record.get('parameterid'));

				addItem.show();
			}

			// 删除
			function deleteInit() {
				var records = grid.getSelectionModel().getSelections();
				if (Ext.isEmpty(records)) {
					infoMsg('您没有选中任何条目，请先选中要删除的项目！');
					return;
				}
				var strChecked = jsArray2JsString(records, 'parameterid');
				Ext.Msg.confirm('请确认', '确认删除选中的记录吗', function(btn, text) {
							if (btn == 'yes') {
								showWaitMsg();
								Ext.Ajax.request({
											url		: 'ctparameter.do?code=deleteCtparameter',
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
							url			: 'ctparameter.do?code=saveCtparameter',
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

			// 更新
			function updateForm() {
				if (!addItemForm.getForm().isValid()) {
					warningMsg('必填项未填写，或填写格式不正确，请检查窗口红色标示的区域!');
					return;
				}
				addItemForm.form.submit({
							url			: 'ctparameter.do?code=updateCtparameter',
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