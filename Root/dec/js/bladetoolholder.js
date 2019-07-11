/**
 * 刀片刀体匹配关系
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
				header		: '刀片ID', // 列标题
				dataIndex	: 'bladeid', // 数据索引,和Store数据存储模型对应
				width		: 60, // 列宽度
				sortable	: true, // 该列是否要排序
				hidden		: true
					// 该列是否隐藏
				}, {
				header		: '刀体ID', // 列标题
				dataIndex	: 'toolholderid', // 数据索引,和Store数据存储模型对应
				width		: 60, // 列宽度
				sortable	: true, // 该列是否要排序
				hidden		: true
					// 该列是否隐藏
				}, {
				header		: '刀片ERP编码',
				dataIndex	: 'bladeerpcode',
				width		: 60,
				sortable	: true
					// hidden : true
				}, {
				header		: '刀片材质',
				dataIndex	: 'bladematerialid',
				width		: 80,
				sortable	: true
					// hidden : true
				}, {
				header		: '刀片名称',
				dataIndex	: 'bladename',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '刀片型号',
				dataIndex	: 'bladetype',
				// hidden : true,
				width		: 80,
				sortable	: true
			}, {
				header		: '车削类型',
				dataIndex	: 'promethodid',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '加工方式',
				dataIndex	: 'promethod',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '结构简图',
				dataIndex	: 'bladefigure',
				// hidden : true,
				width		: 80,
				sortable	: true
			}, {
				header		: '刀片品牌',
				dataIndex	: 'bladebrand',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '刀片后角',
				dataIndex	: 'reliefangle',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '刀片尺寸',
				dataIndex	: 'celength',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '刀片形状',
				dataIndex	: 'shape',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '特征描述',
				dataIndex	: 'description',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '刀片厚度',
				dataIndex	: 'thickness',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '槽型ID',
				dataIndex	: 'grooveid',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '刀尖圆弧半径',
				dataIndex	: 'noseradius',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '刀片备注信息',
				dataIndex	: 'bladeremark',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '刀体ID',
				dataIndex	: 'toolholderid',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '刀体ERP编码',
				dataIndex	: 'toolholdererpcode',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '刀体名称',
				dataIndex	: 'toolholdername',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '刀体型号',
				dataIndex	: 'toolholdertype',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '刀体品牌',
				dataIndex	: 'toolholderbrand',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '车削类型',
				dataIndex	: 'promethodid',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '接口规格',
				dataIndex	: 'interfacetype',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '切削方向',
				dataIndex	: 'handoftool',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '结构简图',
				dataIndex	: 'toolholderfigure',
				width		: 80,
				hidden : true,
				sortable	: true
			}, {
				header		: '刀片形状',
				dataIndex	: 'shape',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '刀片尺寸',
				dataIndex	: 'celength',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '刀片夹紧方式',
				dataIndex	: 'cseries',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '刀体长度',
				dataIndex	: 'length',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '刀体宽度',
				dataIndex	: 'width',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '刀体重量',
				dataIndex	: 'weight',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '头部形式',
				dataIndex	: 'thheadangle',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '附件1名称',
				dataIndex	: 'aname1',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '附件1型号',
				dataIndex	: 'atype1',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '附件2名称',
				dataIndex	: 'aname2',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '附件2型号',
				dataIndex	: 'atype2',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '附件3名称',
				dataIndex	: 'aname3',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '附件3型号',
				dataIndex	: 'atype3',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '附件4名称',
				dataIndex	: 'aname4',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '附件4型号',
				dataIndex	: 'atype4',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '附件5名称',
				dataIndex	: 'aname5',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '附件5型号',
				dataIndex	: 'atype5',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '机床备注信息',
				dataIndex	: 'machinetoolremark',
				width		: 80,
				// hidden : true,
				sortable	: true
			}]);

			// Store数据存储
			var store = new Ext.data.GroupingStore({
						proxy	: new Ext.data.HttpProxy({
							url	: 'bladetoolholder.do?code=queryBladetoolholder4Manage'
								// queryBladetoolholder4Manage是在BladetoolholderAction中的方法queryBladetoolholder4Manage;
							}),
						reader	: new Ext.data.JsonReader({
									totalProperty	: 'TOTALCOUNT',
									root			: 'ROOT'
								}, [{
											name	: 'bladeid'
										}, {
											name	: 'bladeerpcode'
										}, {
											name	: 'bladename'
										}, {
											name	: 'bladetype'
										}, {
											name	: 'promethodid'
										}, {
											name	: 'bladefigure'
										}, {
											name	: 'bladematerialid'
										}, {
											name	: 'bladebrand'
										}, {
											name	: 'reliefangle'
										}, {
											name	: 'celength'
										}, {
											name	: 'thickness'
										}, {
											name	: 'shape'
										}, {
											name	: 'description'
										}, {
											name	: 'grooveid'
										}, {
											name	: 'noseradius'
										}, {
											name	: 'bladeremark'
										}, {
											name	: 'toolholderid'
										}, {
											name	: 'toolholdererpcode'
										}, {
											name	: 'toolholdername'
										}, {
											name	: 'toolholdertype'
										}, {
											name	: 'toolholderbrand'
										}, {
											name	: 'promethodid'
										}, {
											name	: 'interfacetype'
										}, {
											name	: 'handoftool'
										}, {
											name	: 'toolholderfigure'
										}, {
											name	: 'shape'
										}, {
											name	: 'celength'
										}, {
											name	: 'cseries'
										}, {
											name	: 'length'
										}, {
											name	: 'width'
										}, {
											name	: 'weight'
										}, {
											name	: 'thheadangle'
										}, {
											name	: 'aname1'
										}, {
											name	: 'atype1'
										}, {
											name	: 'aname2'
										}, {
											name	: 'atype2'
										}, {
											name	: 'aname3'
										}, {
											name	: 'atype3'
										}, {
											name	: 'aname4'
										}, {
											name	: 'atype4'
										}, {
											name	: 'aname5'
										}, {
											name	: 'atype5'
										}, {
											name	: 'toolholderremark'
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
									hidden	: true,
									iconCls	: 'page_addIcon',
									handler	: function() {
										addInit();
									}
								}, {
									text		: '修改',
									iconCls		: 'page_edit_1Icon',
									hidden		: true,
									id			: 'modifyid',
									disabled	: true,
									handler		: function() {
										editInit();
									}
								}, {
									text		: '删除',
									id			: 'deleteid',
									hidden		: true,
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
									emptyText		: '刀片名称|刀体名称',
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

			// 刀片型号数据集
			var bladeStore = new Ext.data.Store({
						proxy		: new Ext.data.HttpProxy({
									url	: 'bladetoolholder.do?code=queryBlade4Bladetoolholder'
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
			bladeStore.load();

			// 刀片型号下拉框
			var bladeCombo = new Ext.form.ComboBox({
						fieldLabel		: '刀片型号',
						hiddenName		: 'bladeid',
						store			: bladeStore,
						mode			: 'local',
						triggerAction	: 'all',
						valueField		: 'value',
						displayField	: 'text',
						// lazyRender : true,
						forceSelection	: true,
						emptyText		: '请选择刀片型号...',
						plugins			: [new QM.plugin.PinyinFilter],
						editable		: true, // 选择输入框可编辑
						// typeAhead : true, // 输入的时候自动匹配待选项目
						anchor			: '89%'
					});

			// 刀体型号数据集
			var toolholderStore = new Ext.data.Store({
						proxy		: new Ext.data.HttpProxy({
									url	: 'bladetoolholder.do?code=queryToolholder4Bladetoolholder'
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
			toolholderStore.load();

			// 刀体型号下拉框
			var toolholderCombo = new Ext.form.ComboBox({
						fieldLabel		: '刀体型号',
						hiddenName		: 'toolholderid',
						store			: toolholderStore,
						mode			: 'local',
						triggerAction	: 'all',
						valueField		: 'value',
						displayField	: 'text',
						// lazyRender : true,
						forceSelection	: true,
						emptyText		: '请选择刀体型号...',
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
							dataIndex	: 'bladeerpcode',
							type		: 'string'
						}, {
							dataIndex	: 'bladename',
							type		: 'string'
						}, {
							dataIndex	: 'bladetype',
							type		: 'string'
						}, {
							dataIndex	: 'bladefigure',
							type		: 'string'
						}, {
							dataIndex	: 'bladebrand',
							type		: 'string'
						}, {
							dataIndex	: 'reliefangle',
							type		: 'string'
						}, {
							dataIndex	: 'celength',
							type		: 'string'
						}, {
							dataIndex	: 'thickness',
							type		: 'numeric'
						}, {
							dataIndex	: 'shape',
							type		: 'string'
						}, {
							dataIndex	: 'description',
							type		: 'string'
						}, {
							dataIndex	: 'noseradius',
							type		: 'string'
						}, {
							dataIndex	: 'bladeremark',
							type		: 'string'
						}, {
							dataIndex	: 'toolholdererpcode',
							type		: 'string'
						}, {
							dataIndex	: 'toolholdername',
							type		: 'string'
						}, {
							dataIndex	: 'toolholdertype',
							type		: 'string'
						}, {
							dataIndex	: 'toolholderbrand',
							type		: 'string'
						}, {
							dataIndex	: 'interfacetype',
							type		: 'string'
						}, {
							dataIndex	: 'handoftool',
							type		: 'string'
						}, {
							dataIndex	: 'toolholderfigure',
							type		: 'string'
						}, {
							dataIndex	: 'shape',
							type		: 'string'
						}, {
							dataIndex	: 'celength',
							type		: 'string'
						}, {
							dataIndex	: 'cseries',
							type		: 'string'
						}, {
							dataIndex	: 'length',
							type		: 'numeric'
						}, {
							dataIndex	: 'width',
							type		: 'numeric'
						}, {
							dataIndex	: 'weight',
							type		: 'string'
						}, {
							dataIndex	: 'thheadangle',
							type		: 'string'
						}, {
							dataIndex	: 'aname1',
							type		: 'string'
						}, {
							dataIndex	: 'atype1',
							type		: 'string'
						}, {
							dataIndex	: 'aname2',
							type		: 'string'
						}, {
							dataIndex	: 'atype2',
							type		: 'string'
						}, {
							dataIndex	: 'aname3',
							type		: 'string'
						}, {
							dataIndex	: 'atype3',
							type		: 'string'
						}, {
							dataIndex	: 'aname4',
							type		: 'string'
						}, {
							dataIndex	: 'atype4',
							type		: 'string'
						}, {
							dataIndex	: 'aname5',
							type		: 'string'
						}, {
							dataIndex	: 'atype5',
							type		: 'string'
						}, {
							dataIndex	: 'toolholderremark',
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
												defaultType	: 'combo',
												defaults	: {
													width		: '85%',
													anchor		: '89%',
													allowBlank	: false,
													labelStyle	: micolor
												},
												items		: [bladeCombo]
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
												items		: [toolholderCombo]
											}]
								}, {
									fieldLabel	: '备注',
									name		: 'remark',
									anchor		: '94.6%',
									xtype		: 'textfield'
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
						pageY		: document.body.clientHeight / 2 - 150 / 2,// pageY :
						// 20, //
						// 页面定位Y坐标
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
						stateId		: 'grid-blade-toolholder'
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
								}, '-', {
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
			grid.on("cellcontextmenu", function(grid, rowIndex, columnIndex, e) {// cellcontextmenu
						// //rowcontextmenu
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
				var strChecked = jsArray2JsString2(records, 'bladeid', 'toolholderid');
				Ext.Msg.confirm('请确认', '确认删除选中的记录吗', function(btn, text) {
							if (btn == 'yes') {
								showWaitMsg();
								Ext.Ajax.request({
											url		: 'bladetoolholder.do?code=deleteBladetoolholder',
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
							url				: 'bladetoolholder.do?code=saveBladetoolholder',
							waitTitle		: '提示',
							method			: 'POST',
							submitEmptyText	: false,
							waitMsg			: '正在处理数据,请稍候...',
							success			: function(form, action) {
								store.reload();
								infoMsg(action.result.msg);
								addItem.hide();
							},
							failure			: function(form, action) {
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
							url				: 'bladetoolholder.do?code=updateBladetoolholder',
							waitTitle		: '提示',
							method			: 'POST',
							submitEmptyText	: false,
							waitMsg			: '正在处理数据,请稍候...',
							success			: function(form, action) {
								store.reload();
								infoMsg(action.result.msg);
								addItem.hide();
							},
							failure			: function(form, action) {
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