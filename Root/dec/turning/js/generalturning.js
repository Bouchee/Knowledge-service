/**
 * 普通车削
 * 
 * @author fuxianwu
 * @since 2013-01-01
 */
Ext
		.onReady(function() {
			var divnum = 25;// 调整toolbar中的下拉框的大小与位置;
			var numlign = 11;
			
			var pp = 0.8; // 将下拉框图片缩放为80%;

			// 图片大小;
			var reliefangleArr = new Array(143, 79); // 刀片后角
			var reliefanglepp = pp;

			var celengthArr = new Array(216, 80); // 刀片尺寸
			var celengthpp = pp - 0.2;

			var noseradiusArr = new Array(144, 79); // 刀尖圆弧半径
			var noseradiuspp = pp;

			var shapeArr = new Array(198, 80); // 刀片形状
			var shapepp = pp - 0.2;

			var cseriesArr = new Array(264, 79); // 刀片夹紧方式
			var cseriespp = pp - 0.2;

			var handoftoolArr = new Array(151, 80); // 刀具方向
			var handoftoolpp = pp - 0.2;

			var portsizeArr = new Array(230, 80); // 接口规格
			var portsizepp = pp - 0.2;

			var thheadangleArr = new Array(65, 79); // 头部形式
			var thheadanglepp = pp + 0.2;

			var turningtypeArr = new Array(159, 79); // 车削类型
			var turningtypepp = pp - 0.1;

			// 复选框
			var sm = new Ext.grid.CheckboxSelectionModel();

			// 行号
			var rownum = new Ext.grid.RowNumberer({
				header : '序',
				width : 26
			});

			var sm2 = new Ext.grid.CheckboxSelectionModel();

			// 行号
			var rownum2 = new Ext.grid.RowNumberer({
				header : '序',
				width : 26
			});
			// 列模型
			var bladeCm = new Ext.grid.ColumnModel([ rownum, sm,/*, {
				header : '刀片ID', // 列标题
				dataIndex : 'bladeid', // 数据索引,和Store数据存储模型对应
				width : 60, // 列宽度
				sortable : true, // 该列是否要排序
				hidden : true
			// 该列是否隐藏
			}*//*, {
				header : '刀片材料ID',
				dataIndex : 'bladematerialid',
				width : 60,
				sortable : true,
				hidden : true
			}*//*, {
				header : '槽型ID',
				dataIndex : 'grooveid',
				width : 80,
				hidden : true,
				sortable : true
			}*//*, {
				header : '品牌ID',
				dataIndex : 'brandid',
				width : 80,
				hidden : true,
				sortable : true
			}*/{
				header : '刀片名称',
				dataIndex : 'name',
				width : 80,
				// hidden : true,
				sortable : true
			}, {
				header : 'SAP编码',
				dataIndex : 'sapcode',
				width : 100,
				sortable : true,
				hidden : false
			},{
				header : '刀片型号',
				dataIndex : 'bladetype',
				// hidden : true,
				width : 180,
				sortable : true
			}, {
				header : '结构简图',
				dataIndex : 'figure',
				width : 80,
				hidden : true,
				sortable : true
			}, {
				header : '尺寸图',
				dataIndex : 'figure2',
				width : 80,
				hidden : true,
				sortable : true
			}, {
				header : '车削类型',
				dataIndex : 'turningtype',
				width : 80,
				renderer : TURNINGTYPERender,
				// hidden : true,
				sortable : true
			}, /*{
				header : 'SAP编码',
				dataIndex : 'sapcode',
				width : 60,
				sortable : true,
				hidden : false
			}, */{
				header : '刀片材质',
				dataIndex : 'bladematerialname',
				width : 80,
				// hidden : true,
				sortable : true
			}, {
				header : '槽型',
				dataIndex : 'groovename',
				width : 60,
				// hidden : true,
				sortable : true
			}, {
				header : '刀片品牌',
				dataIndex : 'bladebrandname',
				width : 60,
				// hidden : true,
				sortable : true
			}, {
				header : '刀片后角',
				dataIndex : 'reliefangle',
				width : 60,
				align : 'center',
				// hidden : true,
				renderer : RELIEFANGLERender,
				sortable : true
			},{
				header : '刀片形状',
				dataIndex : 'shape',
				align : 'center',
				width : 60,
				renderer : SHAPERender,
				// hidden : true,
				sortable : true
			}, {
				header : '刀片尺寸',
				dataIndex : 'celength',
				width : 80,
				// hidden : true,
				renderer : CELENGTHRender,
				sortable : true
			}, {
				header : '刀尖圆弧半径',
				dataIndex : 'noseradius',
				width : 90,
				align : 'center',
				// hidden : true,
				renderer : NOSERADIUSRender,
				sortable : true
			}, {
				header : '刀片厚度',
				dataIndex : 'thickness',
				width : 60,
				align : 'center',
				renderer : THICKNESS2Render,
				// hidden : true,
				sortable : true
			}, {
				header : '特征描述',
				dataIndex : 'description',
				width : 80,
				// hidden : true,
				sortable : true
			}, {
				header : '刀片特征码',
				dataIndex : 'featurecode',
				width : 80,
				hidden : true,
				sortable : true
			}, {
				header : '最大切削深度',
				dataIndex : 'apmax',
				width : 80,
				hidden : true,
				sortable : true
			}, {
				header : '最小切削深度',
				dataIndex : 'apmin',
				width : 80,
				hidden : true,
				sortable : true
			}, {
				header : '最大切削进给',
				dataIndex : 'fnmax',
				width : 80,
				hidden : true,
				sortable : true
			}, {
				header : '最小切削进给',
				dataIndex : 'fnmin',
				width : 80,
				hidden : true,
				sortable : true
			}, {
				header : '备注信息',
				dataIndex : 'remark',
				width : 120,
				 /*hidden : true,*/
				sortable : true
			} ]);

			function abcRender(value) {
				if (value == "1")
					return "11.00";
				else if (value == "2")
					return "16.00";
				else if (value == "2")
					return "16.00";
				else if (value == "2")
					return "16.00";
				else if (value == "2")
					return "16.00";
				else if (value == "2")
					return "16.00";
				else
					return "c";
			}
			;

			// 列模型
			var toolholderCm = new Ext.grid.ColumnModel([ rownum2, sm2, {
				header : '刀体ID', // 列标题
				dataIndex : 'toolholderid', // 数据索引,和Store数据存储模型对应
				width : 60, // 列宽度
				sortable : true, // 该列是否要排序
				hidden : true
			// 该列是否隐藏
			}, {
				header : '品牌ID',
				dataIndex : 'brandid',
				hidden : true,
				width : 80,
				sortable : true
			}, {
				header : '刀体名称',
				dataIndex : 'name',
				width : 100,
				sortable : true
			// hidden : true
			},  {
				header : 'SAP编码',
				dataIndex : 'sapcode',
				width : 100,
				sortable : true,
				hidden : false
			},{
				header : '刀体型号',
				dataIndex : 'toolholdertype',
				width : 130,
				// hidden : true,
				sortable : true
			}, {
				header : '刀体品牌',
				dataIndex : 'toolholderbrandname',
				// hidden : true,
				width : 80,
				sortable : true
			}, {
				header : '车削类型',
				dataIndex : 'turningtype',
				width : 80,
				renderer : TURNINGTYPERender,
				// hidden : true,
				sortable : true
			}, {
				header : '接口规格',
				dataIndex : 'portsize',
				width : 80,
				/*align : 'center',*/
				/*direction:"ASC",*/
				// hidden : true,
				renderer : PORTSIZERender,
				sortable : true
			}, {
				header : '刀具方向',
				dataIndex : 'handoftool',
				width : 80,
				// hidden : true,
				renderer : HANDOFTOOLRender,
				sortable : true
			}, {
				header : '结构简图',
				dataIndex : 'figure',
				width : 80,
				hidden : true,
				sortable : true
			}, {
				header : '尺寸图',
				dataIndex : 'figure2',
				width : 80,
				hidden : true,
				sortable : true
			}, {
				header : '刀片形式',
				dataIndex : 'featurecode',
				width : 80,
				hidden : true,
				sortable : true
			}, {
				header : '刀片夹紧方式',
				dataIndex : 'cseries',
				width : 100,
				renderer : CSERIESRender,
				// hidden : true,
				sortable : true
			}, {
				header : '刀体长度',
				dataIndex : 'length',
				width : 80,
				align : 'center',
				// hidden : true,
				sortable : true
			}, {
				header : '刀体宽度',
				dataIndex : 'width',
				width : 80,
				align : 'center',
				// hidden : true,
				sortable : true
			}, {
				header : '最小镗孔直径',
				dataIndex : 'bore',
				width : 80,
				align : 'center',
				hidden : true,
				sortable : true
			}, {
				header : '头部形式',
				dataIndex : 'thheadangle',
				width : 80,
				align : 'center',
				renderer : THHEADANGLERender,
				// hidden : true,
				sortable : true
			}, {
				header : '附件1名称',
				dataIndex : 'aname1',
				width : 100,
				 hidden : true,
				sortable : true
			}, {
				header : '附件1型号',
				dataIndex : 'atype1',
				width : 80,
				 hidden : true,
				sortable : true
			}, {
				header : '附件2名称',
				dataIndex : 'aname2',
				width : 80,
				hidden : true,
				sortable : true
			}, {
				header : '附件2型号',
				dataIndex : 'atype2',
				width : 80,
				hidden : true,
				sortable : true
			}, {
				header : '附件3名称',
				dataIndex : 'aname3',
				width : 80,
				hidden : true,
				sortable : true
			}, {
				header : '附件3型号',
				dataIndex : 'atype3',
				width : 80,
				hidden : true,
				sortable : true
			}, {
				header : '附件4名称',
				dataIndex : 'aname4',
				width : 80,
				hidden : true,
				sortable : true
			}, {
				header : '附件4型号',
				dataIndex : 'atype4',
				width : 80,
				hidden : true,
				sortable : true
			}, {
				header : '附件5名称',
				dataIndex : 'aname5',
				width : 80,
				hidden : true,
				sortable : true
			}, {
				header : '附件5型号',
				dataIndex : 'atype5',
				width : 80,
				hidden : true,
				sortable : true
			}, {
				header : '备注信息',
				dataIndex : 'remark',
				width : 80,
				 /*hidden : true,*/
				sortable : true
			} ]);

			// Store数据存储
			var bladeStore = new Ext.data.GroupingStore({
				proxy : new Ext.data.HttpProxy({
					url : 'generalturning.do?code=queryBlade4Manage'
				// queryBlade4Manage是在BladeAction中的方法queryBlade4Manage;
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT',
					sortInfo:{field: "fieldName", direction: "DESC"},
					fields: [{name:'generalturning.do?code=queryBlade4Manage',type:'string'} ]
				}, [ /*{
					name : 'bladeid'
				},*/ {
					name : 'sapcode'
				}, {
					name : 'name'
				}, {
					name : 'bladetype'
				},  {
					name : 'turningtype'
				},  {
					name : 'bladematerialname',type:'string'
				}, {
					name : 'grooveid'
				}, {
					name : 'groovename',type:'string'
				}/*, {
					name : 'brandid'
				}*/, {
					name : 'bladebrandname',type:'string'
				}, {
					name : 'reliefangle'
				}, {
					name : 'shape'
				}, {
					name : 'celength'
				}, {
					name : 'noseradius'
				}, {
					name : 'thickness'
				},  {
					name : 'featurecode'
				}, {
					name : 'apmax'
				}, {
					name : 'apmin'
				}, {
					name : 'fnmax'
				}, {
					name : 'fnmin'
				}, {
					name : 'bladematerialid'
				},{
					name : 'figure'
				}, {
					name : 'figure2'
				},{
					name : 'description'
				},{
					name : 'remark'
				} ]),
				listeners : {
				/*
				 * 'load' : function(store, records) { for (var i = 0; i <
				 * records.length; i++) {
				 * propertyGridStore[records[i].get('name')] =
				 * records[i].get('value'); } } load : { fn : function(store,
				 * records, options) { // get the property grid component var
				 * propGrid = Ext.getCmp('propertyGridid'); // make sure the
				 * property grid exists if (propGrid) { // populate the property
				 * grid with store data propGrid.setSource(store.getAt(0).data); } } }
				 */
				}
			});

			// Store数据存储
			var toolholderStore = new Ext.data.GroupingStore({
				proxy : new Ext.data.HttpProxy({
					url : 'generalturning.do?code=queryToolholder4Manage'
				// queryToolholder4Manage是在ToolholderAction中的方法queryToolholder4Manage;
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [/* {
					name : 'toolholderid'
				}*/{
					name : 'sapcode'
				}, {
					name : 'name'
				}, {
					name : 'toolholdertype'
				}/*, {
					name : 'brandid'
				}*/, {
					name : 'toolholderbrandname'
				}, {
					name : 'turningtype'
				}, {
					name : 'portsize'
				}, {
					name : 'handoftool'
				}, {
					name : 'featurecode'
				}, {
					name : 'cseries'
				}, {
					name : 'cseries'
				}, {
					name : 'length'
				}, {
					name : 'width'
				}, {
					name : 'bore'
				}, {
					name : 'thheadangle'
				}, {
					name : 'aname1'
				}, {
					name : 'atype1'
				}, {
					name : 'aname2'
				}, {
					name : 'atype2'
				}, {
					name : 'aname3'
				}, {
					name : 'atype3'
				}, {
					name : 'aname4'
				}, {
					name : 'atype4'
				}, {
					name : 'aname5'
				}, {
					name : 'atype5'
				},{
					name : 'figure'
				}, {
					name : 'figure2'
				},  {
					name : 'remark'
				} ])
			});

			// 每页显示条数下拉选择框
			var pagesize_combo = new Ext.form.ComboBox({
				name : 'pagesize',
				triggerAction : 'all',
				mode : 'local',
				store : new Ext.data.ArrayStore({
					fields : [ 'value', 'text' ],
					data : [ [ 10, '10 条/页' ], [ 20, '20 条/页' ],
							[ 50, '50 条/页' ], [ 100, '100条/页' ],
							[ 250, '250条/页' ], [ 500, '500条/页' ] ]
				}),
				valueField : 'value',
				displayField : 'text',
				value : '50',
				editable : false,
				width : 85
			});

			var number = parseInt(pagesize_combo.getValue());
			pagesize_combo.on('select', function(comboBox) {
				bbar.pageSize = parseInt(comboBox.getValue());
				number = parseInt(comboBox.getValue());
				bladeStoreLoad();
			});

			var runtimeButton = new Ext.CycleButton({
				showText : true,
				prependText : '实时过滤状态: ',
				items : [ {
					text : '开',
					iconCls : 'lightonIcon',
					checked : parent.grf
				}, {
					text : '关',
					iconCls : 'lightoffIcon',
					checked : !parent.grf
				} ],
				changeHandler : function(btn, item) {
					if (runtimeButton.getActiveItem().itemIndex == '0') {
						if (runtimeButton2.getActiveItem().itemIndex == '1') {
							runtimeButton2.toggleSelected();
							runtimeButton2.setIconClass('lightonIcon');
						}
						calcButton.hide();
						calcButton2.hide();
						parent.grf = true;
					} else {
						if (runtimeButton2.getActiveItem().itemIndex == '0') {
							runtimeButton2.toggleSelected();
							runtimeButton2.setIconClass('lightoffIcon');
						}
						calcButton.show();
						calcButton2.show();
						parent.grf = false;
					}
				}
			});

			var runtimeButton2 = new Ext.CycleButton({
				showText : true,
				prependText : '实时过滤状态: ',
				items : [ {
					text : '开',
					iconCls : 'lightonIcon',
					checked : parent.grf
				}, {
					text : '关',
					iconCls : 'lightoffIcon',
					checked : !parent.grf
				} ],
				changeHandler : function(btn, item) {
					if (runtimeButton2.getActiveItem().itemIndex == '0') {
						if (runtimeButton.getActiveItem().itemIndex == '1') {
							runtimeButton.toggleSelected();
							runtimeButton.setIconClass('lightonIcon');
						}
						calcButton.hide();
						calcButton2.hide();
						parent.grf = true;
					} else {
						if (runtimeButton.getActiveItem().itemIndex == '0') {
							runtimeButton.toggleSelected();
							runtimeButton.setIconClass('lightoffIcon');
						}
						calcButton.show();
						calcButton2.show();
						parent.grf = false;
					}
				}
			});

			var runtimeHelpBtn = new Ext.CycleButton({
				showText : true,
				prependText : '帮助',
				items : [ {
					text : '',
					iconCls : 'lightonIcon',
					checked : parent.rhwf
				}, {
					text : '',
					iconCls : 'lightoffIcon',
					checked : !parent.rhwf
				} ],
				changeHandler : function(btn, item) {
					if (runtimeHelpBtn.getActiveItem().itemIndex == '0') {
						if (runtimeHelpBtn2.getActiveItem().itemIndex == '1') {
							runtimeHelpBtn2.toggleSelected();
							runtimeHelpBtn2.setIconClass('lightonIcon');
						}
						parent.rhwf = true;
					} else {
						if (runtimeHelpBtn2.getActiveItem().itemIndex == '0') {
							runtimeHelpBtn2.toggleSelected();
							runtimeHelpBtn2.setIconClass('lightoffIcon');
						}
						parent.rhwf = false;
					}
				}
			});

			var runtimeHelpBtn2 = new Ext.CycleButton({
				showText : true,
				prependText : '帮助',
				items : [ {
					text : '',
					iconCls : 'lightonIcon',
					checked : parent.rhwf
				}, {
					text : '',
					iconCls : 'lightoffIcon',
					checked : !parent.rhwf
				} ],
				changeHandler : function(btn, item) {
					if (runtimeHelpBtn2.getActiveItem().itemIndex == '0') {
						if (runtimeHelpBtn.getActiveItem().itemIndex == '1') {
							runtimeHelpBtn.toggleSelected();
							runtimeHelpBtn.setIconClass('lightonIcon');
						}
						parent.rhwf = true;
					} else {
						if (runtimeHelpBtn.getActiveItem().itemIndex == '0') {
							runtimeHelpBtn.toggleSelected();
							runtimeHelpBtn.setIconClass('lightoffIcon');
						}
						parent.rhwf = false;
					}
				}
			});

			function getfeaturecode(){var a;if(grid2.getSelectionModel().getSelected()){a=grid2.getSelectionModel().getSelected().data.featurecode}else{a=''};return a};
			
			function getfeaturecode2(){var a;if(grid.getSelectionModel().getSelected()){a=grid.getSelectionModel().getSelected().data.featurecode}else{a=''};return a};
			function bladeStoreLoad() {
				bladeStore
						.load({
							params : {
								start : bbar.pageSize
										* (grid.getBottomToolbar()
												.getPageData().activePage - 1),
								limit : bbar.pageSize,
								workpieceisotype : workpieceisotypeCombo
										.getValue(),
								accuracyid : accuracyCombo.getValue(),
								shape : shapeCombo.getValue(),
								reliefangle : reliefangleCombo.getValue(),
								celength : celengthCombo.getValue(),
								noseradius : noseradiusCombo.getValue(),
								featurecode :getfeaturecode()
							}
						});
			}

			function toolholderStoreLoad() {
				toolholderStore
						.load({
							params : {
								start : bbar2.pageSize
										* (grid2.getBottomToolbar()
												.getPageData().activePage - 1),
								limit : bbar2.pageSize,
								turningtype : turningtypeCombo.getValue(),
								thheadangle : thheadangleCombo.getValue(),
								handoftool : handoftoolCombo.getValue(),
								portsize : portsizeCombo.getValue(),
								cseries : cseriesCombo.getValue(),
								shapeblade : shapeCombo2.getValue(),
								reliefangleblade : reliefangleCombo2.getValue(),
								bore : boreCombo.getValue(),
								featurecode : getfeaturecode2()
							}
						});
			}

			var calcButton = new Ext.Button({
				text : '查询结果',
				iconCls : 'tableIcon',
				hidden : true,
				listeners : {
					click : function(btn, e) {
						bladeStoreLoad();
					}
				}
			});

			var calcButton2 = new Ext.Button({
				text : '查询结果',
				iconCls : 'tableIcon',
				hidden : true,
				listeners : {
					click : function() {
						toolholderStoreLoad();
					}
				}
			});

			// 分页工具栏
			var bbar = new Ext.PagingToolbar(
					{
						pageSize : number,
						store : bladeStore,
						displayInfo : true,
						displayMsg : '显示第 {0} 条到第 {1} 条,共 {2} 条',
						plugins : new Ext.ux.ProgressBarPager(),
						emptyMsg : '对不起,没有符合条件的记录!',
						items : [
								'-',
								'&nbsp;&nbsp;',
								pagesize_combo, /*
												 * '-', '&nbsp;&nbsp;', { text :
												 * '查询结果', iconCls :
												 * 'acceptIcon', handler :
												 * function() { resultDisplay(); //
												 * Ext.getCmp('helpdiv').setText('adfadsf'); } },
												 */
								{
									xtype : 'tbspacer',
									width : 10
								},
								runtimeHelpBtn,
								'-',
								{
									text : '通过选择条目过滤刀体',
									iconCls : 'acceptIcon',
									id : 'selectToolholder',
									handler : function() {
										tabs.activate(1);

										// var record =
										// grid.getSelectionModel().getSelected();
										var records = grid.getSelectionModel()
												.getSelections();

										if (records.length == 0) {
											toolholderStoreLoad();
										} else {
											if (records.length > 1) {
												infoMsg('您选择了 '
														+ records.length
														+ ' 个条目，选择单个条目会获得准确匹配。');
											}

											// grid.getSelectionModel().selectRow(grid.getSelectionModel().last,
											// false);
											toolholderStore
													.load({
														params : {
															start : bbar2.pageSize
																	* (grid2
																			.getBottomToolbar()
																			.getPageData().activePage - 1),
															limit : bbar2.pageSize,
															featurecode : jsArray2JsString(
																	records,
																	'featurecode')
														}
													});
										}
									}
								}, {
									xtype : 'tbspacer',
									width : 10
								}, runtimeButton, {
									xtype : 'tbspacer',
									width : 10
								}, calcButton, {
									text : ' ',
									// iconCls : 'acceptIcon',
									disabled : true,
									disabledClass : 'x-item-disabled-fuxianwu',
									id : 'helpdiv1'
								} ]
					});

			// 每页显示条数下拉选择框
			var pagesize_combo2 = new Ext.form.ComboBox({
				name : 'pagesize',
				triggerAction : 'all',
				mode : 'local',
				store : new Ext.data.ArrayStore({
					fields : [ 'value', 'text' ],
					data : [ [ 10, '10 条/页' ], [ 20, '20 条/页' ],
							[ 50, '50 条/页' ], [ 100, '100条/页' ],
							[ 250, '250条/页' ], [ 500, '500条/页' ] ]
				}),
				valueField : 'value',
				displayField : 'text',
				value : '50',
				editable : false,
				width : 85
			});

			var number2 = parseInt(pagesize_combo2.getValue());
			pagesize_combo2.on('select', function(comboBox) {
				bbar2.pageSize = parseInt(comboBox.getValue());
				number2 = parseInt(comboBox.getValue());
				toolholderStoreLoad();
			});

			// 分页工具栏
			var bbar2 = new Ext.PagingToolbar(
					{
						pageSize : number2,
						store : toolholderStore,
						displayInfo : true,
						displayMsg : '显示第 {0} 条到第 {1} 条,共 {2} 条',
						plugins : new Ext.ux.ProgressBarPager(),
						
						emptyMsg : '对不起,没有符合条件的记录!',
						items : [
								'-',
								'&nbsp;&nbsp;',
								pagesize_combo2, /*
													 * '-', '&nbsp;&nbsp;', {
													 * text : '查询结果', iconCls :
													 * 'acceptIcon', handler :
													 * function() {
													 * resultDisplay(); //
													 * Ext.getCmp('helpdiv').setText('adfadsf'); } },
													 */
								{
									xtype : 'tbspacer',
									width : 10
								},
								runtimeHelpBtn2,
								'-',
								{
									text : '通过选择条目过滤刀片',
									id : 'selectBlade',
									iconCls : 'acceptIcon',
									handler : function() {
										tabs.activate(0);

										// var record =
										// grid2.getSelectionModel().getSelected();
										var records = grid2.getSelectionModel()
												.getSelections();

										if (records.length == 0) {
											bladeStoreLoad();
										} else {
											if (records.length > 1) {
												infoMsg('您选择了 '
														+ records.length
														+ ' 个条目，选择单个条目会获得准确匹配。');
											}

											// grid.getSelectionModel().selectRow(grid.getSelectionModel().last,
											// false);
											bladeStore
													.load({
														params : {
															start : bbar.pageSize
																	* (grid
																			.getBottomToolbar()
																			.getPageData().activePage - 1),
															limit : bbar.pageSize,
															featurecode : jsArray2JsString(
																	records,
																	'featurecode')
														}
													});
										}
									}
								}, {
									xtype : 'tbspacer',
									width : 10
								}, runtimeButton2, {
									xtype : 'tbspacer',
									width : 10
								}, calcButton2, {
									text : ' ',
									// iconCls : 'acceptIcon',
									disabled : true,
									disabledClass : 'x-item-disabled-fuxianwu',
									id : 'helpdiv2'
								} ]
					});

			// 刀片选择的Combo+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
			// 每页显示条数下拉选择框
			/*
			 * function nameaddmark(v, record) { return record.name +
			 * record.mark; }
			 */

			/*
			 * var pagesize_combo_iso = new Ext.form.ComboBox({ name :
			 * 'pagesize', triggerAction : 'all', mode : 'local', store : new
			 * Ext.data.ArrayStore({ fields : ['value', 'text'], data : [[10,
			 * '10 条/页'], [20, '20 条/页'], [50, '50 条/页'], [100, '100条/页'], [250,
			 * '250条/页'], [500, '500条/页']] }), valueField : 'value',
			 * displayField : 'text', value : '50', editable : false, width : 85
			 * });
			 */
			// 工件18状态数据
			var workpieceisotypeStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : 'generalturning.do?code=queryWorkpiecematerial'
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT',
					sortInfo:{field: "fieldName", direction: "DESC"},
					fields: [{name:'generalturning.do?code=queryBlade4Manage',type:'string'} ]
				}, [ {
					name : 'workpiecematerialid',type:'string'
				}, {
					name : 'name'// ,convert: nameaddmark
				}, {
					name : 'name2'
				}, {
					name : 'mark'
				}, {
					name : 'wmtype'
				}, {
					name : 'heattreat'
				}, {
					name : 'hardness'
				} ]),
				baseParams : {
					start : 0,
					limit : bbar.pageSize,
					query : ''
				}
			});
			workpieceisotypeStore.load(/*{
				params : {
					featurecode : getfeaturecode()
				}
			}*/);

			//刀片联动
			
			function workpieceisotypeStoreLoad() {
				workpieceisotypeStore.load({
					params : {
						
						featurecode : getfeaturecode()
					}
				});
			}
		
			function accuracyStoreLoad() {
				accuracyStore.load({
					params : {
						workpiecematerialid : workpieceisotypeCombo.getValue(),
						featurecode : getfeaturecode()
					}
				});
			}
			
			function shapeStoreLoad() {
				shapeStore.load({
					params : {
						accuracyid : accuracyCombo.getValue(),
						workpiecematerialid : workpieceisotypeCombo.getValue(),
						featurecode : getfeaturecode()
						
					} 
				});
			}
			
			function reliefangleStoreLoad() {
				reliefangleStore.load({
					params : {
						accuracyid : accuracyCombo.getValue(),
						workpiecematerialid : workpieceisotypeCombo.getValue(),
						shape : shapeCombo.getValue(),
						featurecode : getfeaturecode()
					}
				});
			}
			
			function celengthStoreLoad() {
				celengthStore.load({
					params : {
						accuracyid : accuracyCombo.getValue(),
						workpiecematerialid : workpieceisotypeCombo.getValue(),
						shape : shapeCombo.getValue(),
						reliefangle : reliefangleCombo.getValue(),
						featurecode : getfeaturecode()
					}
				});
			}
			
			function noseradiusStoreLoad() {
				noseradiusStore.load({
					params : {
						accuracyid : accuracyCombo.getValue(),
						workpiecematerialid : workpieceisotypeCombo.getValue(),
						shape : shapeCombo.getValue(),
						reliefangle : reliefangleCombo.getValue(),
						celength : celengthCombo.getValue(),
						featurecode : getfeaturecode()
					}
				});
			}
			
			
			
			
		//刀体联动	
			function turningtypeStoreLoad() {
				turningtypeStore.load({
					params : {
						
						featurecode : getfeaturecode2()
					}
				});
			}
				
				function thheadangleStoreLoad() {
					var turningtypelsid = turningtypeCombo.getValue();
					if(turningtypelsid=='12'){
					thheadangleStore.load({
						params : {
							turningtype : 112,
							featurecode : getfeaturecode2()
						}
					});
					}else {

						thheadangleStore.load({
							params : {
								turningtype : turningtypeCombo.getValue(),
								featurecode : getfeaturecode2()
							}
						});
						
					}
				}
				
				function handoftoolStoreLoad() {
					var turningtypelsid = turningtypeCombo.getValue();
					if(turningtypelsid=='12'){
					handoftoolStore.load({
						params : {
							turningtype : 112,
							thheadangle : thheadangleCombo.getValue(),
							featurecode : getfeaturecode2()
						}
					});
					}else {

						handoftoolStore.load({
							params : {
								turningtype : turningtypeCombo.getValue(),
								thheadangle : thheadangleCombo.getValue(),
								featurecode : getfeaturecode2()
							}
						});
						
					}
				}
				function shape2StoreLoad() {
					
					var turningtypelsid = turningtypeCombo.getValue();
					if(turningtypelsid=='12'){
					shape2Store.load({
						params : {
							turningtype :112,
							thheadangle : thheadangleCombo.getValue(),
							handoftool : handoftoolCombo.getValue(),
							featurecode : getfeaturecode2()
						}
					});
					}else {
						

						shape2Store.load({
							params : {
								turningtype : turningtypeCombo.getValue(),
								thheadangle : thheadangleCombo.getValue(),
								handoftool : handoftoolCombo.getValue(),
								featurecode : getfeaturecode2()
							}
						});
						
					}
				}
				function reliefangle2StoreLoad() {
					var turningtypelsid = turningtypeCombo.getValue();
					if(turningtypelsid=='12'){
						reliefangle2Store.load({
						params : {
							turningtype :112,
							thheadangle : thheadangleCombo.getValue(),
							handoftool : handoftoolCombo.getValue(),
							shape2 : shapeCombo2.getValue(),
							featurecode : getfeaturecode2()
						}
					});
					}else {
						

						reliefangle2Store.load({
							params : {
								turningtype : turningtypeCombo.getValue(),
								thheadangle : thheadangleCombo.getValue(),
								handoftool : handoftoolCombo.getValue(),
								shape2 : shapeCombo2.getValue(),
								featurecode : getfeaturecode2()
							}
						});
						
					}
				}
			
				function portsizeStoreLoad() {
					var turningtypelsid = turningtypeCombo.getValue();
					if(turningtypelsid=='12'){
						portsizeStore.load({
						params : {
							turningtype :112,
							thheadangle : thheadangleCombo.getValue(),
							handoftool : handoftoolCombo.getValue(),
							shape2 : shapeCombo2.getValue(),
							reliefangle : reliefangleCombo.getValue(),
							featurecode : getfeaturecode2()
						}
					});
					}else {
						

						portsizeStore.load({
							params : {
								turningtype : turningtypeCombo.getValue(),
								thheadangle : thheadangleCombo.getValue(),
								handoftool : handoftoolCombo.getValue(),
								shape2 : shapeCombo2.getValue(),
								reliefangle : reliefangleCombo.getValue(),
								featurecode : getfeaturecode2()
							}
						});
						
					}
				}
				function cseriesStoreLoad() {
					var turningtypelsid = turningtypeCombo.getValue();
					if(turningtypelsid=='12'){
						cseriesStore.load({
						params : {
							turningtype :112,
							thheadangle : thheadangleCombo.getValue(),
							handoftool : handoftoolCombo.getValue(),
							shape2 : shapeCombo2.getValue(),
							reliefangle : reliefangleCombo.getValue(),
							portsize : portsizeCombo.getValue(),
							featurecode : getfeaturecode2()
						}
					});
					}else {
						

						cseriesStore.load({
							params : {
								turningtype : turningtypeCombo.getValue(),
								thheadangle : thheadangleCombo.getValue(),
								handoftool : handoftoolCombo.getValue(),
								shape2 : shapeCombo2.getValue(),
								reliefangle : reliefangleCombo.getValue(),
								portsize : portsizeCombo.getValue(),
								featurecode : getfeaturecode2()
							}
						});
						
					}
				}
				
				function boreStoreLoad() {
					var turningtypelsid = turningtypeCombo.getValue();
					if(turningtypelsid=='12'){
						boreStore.load({
						params : {
							turningtype :112,
							thheadangle : thheadangleCombo.getValue(),
							handoftool : handoftoolCombo.getValue(),
							shape2 : shapeCombo2.getValue(),
							reliefangle : reliefangleCombo.getValue(),
							portsize : portsizeCombo.getValue(),
							cseries : cseriesCombo.getValue(),
							featurecode : getfeaturecode2()
						}
					});
					}else {
						

						boreStore.load({
							params : {
								turningtype : turningtypeCombo.getValue(),
								thheadangle : thheadangleCombo.getValue(),
								handoftool : handoftoolCombo.getValue(),
								shape2 : shapeCombo2.getValue(),
								reliefangle : reliefangleCombo.getValue(),
								portsize : portsizeCombo.getValue(),
								cseries : cseriesCombo.getValue(),
								featurecode : getfeaturecode2()
							}
						});
						
					}
				}
			// 行号
			var rownum_iso = new Ext.grid.RowNumberer({
				header : '序',
				width : 26
			});

			var workpieceisotypeCm = new Ext.grid.ColumnModel([ rownum_iso, {
				header : '工件材料',
				dataIndex : 'name',
				width : 100,
				sortable : true
			}, {
				header : '材料牌号ID',
				dataIndex : 'workpiecematerialid',
				width : 1,
				hidden : true,
				sortable : true
			}, {
				header : '牌号-印记',
				dataIndex : 'name2',
				width : 1,
				hidden : true,
				sortable : true
			}, {
				header : '印记',
				dataIndex : 'mark',
				width : 50,
				// align : 'center',
				sortable : true
			}, {
				header : '材料类型',
				dataIndex : 'wmtype',
				width : 100,
				sortable : true
			}, {
				header : '热处理状态',
				dataIndex : 'heattreat',
				width : 90,
				sortable : true
			}, {
				header : '硬度',
				dataIndex : 'hardness',
				width : 80,
				sortable : true
			} ]);

			// var resultTpl = new Ext.XTemplate('<tpl for="."><div
			// class="search-item">', '{name}', '</div></tpl>');

			var workpieceisotypeGrid = new Ext.grid.GridPanel(
					{
						title : '',
						region : 'center',
						height : 300,
						width : 600,
						stripeRows : true,
						// autoSizeColumns : true,
						trackMouseOver : true,
						frame : true,
						store : workpieceisotypeStore,
						cm : workpieceisotypeCm,
						sm : new Ext.grid.RowSelectionModel({
							singleSelect : true
						}),
						viewConfig : {
							forceFit : true
						},
						/*
						 * bbar : new Ext.PagingToolbar({ pageSize :
						 * bbar.pageSize, store : workpieceisotypeStore,
						 * displayInfo : true, displayMsg : '显示第 {0} 条到第 {1} 条,共
						 * {2} 条', plugins : new Ext.ux.ProgressBarPager(),
						 * emptyMsg : "对不起,没有符合条件的记录!", items : ['-',
						 * '&nbsp;&nbsp;', pagesize_combo_iso] }),
						 */
						tbar : [
								{
									xtype : 'combo',
									id : 'inputname_isotype',
									// hiddenName : 'workpiecematerialid',
									store : workpieceisotypeStore,
									cls : 'search',
									// name : 'filetitle',
									displayField : 'name2',
									valueField : 'workpiecematerialid',
									emptyText : '工件材料牌号|印记',
									// loadingText : '正在加载数据，请稍候...',
									width : 200,
									// pageSize: cln,
									selectOnFocus : true,
									mode : 'local',
									// itemSelector : 'div.search-item',
									typeAhead : false,
									// tpl : resultTpl,
									// tpl : '<table><tr><tpl for="."><td
									// class="x-combo-list-item">{text}</td><tpl
									// if="xindex % 5 ===
									// 0"></tr><tr></tpl></tpl></tr></table>',
									hideTrigger : true,
									enableKeyEvents : true,
									maxHeight : 0,
									plugins : [ new QM.plugin.PinyinFilter ],
									// 响应回车键
									listeners : {
										specialkey : function(field, e) {
											if (e.getKey() == e.ENTER) {
												queryInfo_isotype();
											}
										},
										select : function(record) {
											this
													.setValue(record.data.workpiecematerialid);
										},
										focus : function() {
											workpieceisotypeCombo.setValue('');
										}
									}
								},
								{
									text : '确定',
									iconCls : 'acceptIcon',
									handler : function() {
										var r = workpieceisotypeGrid
												.getSelectionModel()
												.getSelected();
										if (typeof r == 'undefined') {
											infoMsg('您没有选中任何条目，请先选中要修改的项目，您也可以直接双击要选择的行！');
											return;
										} else {
											// workpieceisotypeCombo.setValue(r.get('workpiecematerialid'));
											// workpieceisotypeCombo.setRawValue(r.get('name'));

											selectMenu.hide();

											// refreshBlade();
										}
									}
								}, '->', {
									text : '清空材料牌号',
									iconCls : 'tbar_synchronizeIcon',
									handler : function() {
										// selectMenu.suspendEvents();
										workpieceisotypeCombo.reset();
										selectMenu.hide();
										// selectMenu.resumeEvents();
										// var r =
										// g.getSelectionModel().getSelected();

										// refreshBlade();
									}
								} ],/*
									 * view : new Ext.ux.grid.BufferView({
									 * rowHeight : 50, scrollDelay : true }),
									 */
						listeners : {
							rowdblclick : function(g, rowIndex, event) {
								selectMenu.hide();
								/*
								 * var r = g.getSelectionModel().getSelected();
								 * workpieceisotypeCombo.setValue(r.get('workpiecematerialid'));
								 * workpieceisotypeCombo.setRawValue(r.get('name'));
								 * refreshBlade();
								 */
							},
							rowclick : function(g, rowIndex, event) {
								var r = g.getSelectionModel().getSelected();
								workpieceisotypeCombo.setValue(r
										.get('workpiecematerialid'));
								workpieceisotypeCombo
										.setRawValue(r.get('name'));
							}
						}
					});

			// 查询表格数据
			function queryInfo_isotype() {
				workpieceisotypeCombo.collapse();
				selectMenu.hide();
				/*
				 * var va = Ext.getCmp('inputname_isotype').getRawValue();
				 * workpieceisotypeCombo.setValue(Ext.getCmp('inputname_isotype').getValue());
				 * workpieceisotypeCombo.setRawValue(va.substring(0,
				 * va.indexOf('-')));
				 */

				// refreshBlade();
				/*
				 * workpieceisotypeStore.load({ params : { start : 0, limit :
				 * bbar.pageSize, keyword :
				 * Ext.getCmp('inputname_isotype').getValue() } });
				 */
			}

			var selectMenu = new Ext.menu.Menu({
				items : [ workpieceisotypeGrid ],
				listeners : {
					hide : function(m) {
						accuracyStoreLoad();
						shapeStoreLoad();
						reliefangleStoreLoad();
						celengthStoreLoad();
						noseradiusStoreLoad();
						/*shapeStore.load({
							params : {
								accuracyid : accuracyCombo.getValue(),
								workpiecematerialid : workpieceisotypeCombo.getValue()
							}
						});*/
					
						//alert(workpieceisotypeCombo.getValue());
						// infoMsg('sfgsfdg');
						var r = workpieceisotypeGrid.getSelectionModel()
								.getSelected();
						if (typeof r == 'undefined') {
							workpieceisotypeCombo.reset();
						} else {
							if (workpieceisotypeCombo.getValue() != "") {
								workpieceisotypeCombo.setValue(r
										.get('workpiecematerialid'));
								workpieceisotypeCombo
										.setRawValue(r.get('name'));
							}
						}
						refreshBlade();
					}
				}
			});

			// 工件材料状态下拉框
			var workpieceisotypeCombo = new Ext.form.ComboBox({
				fieldLabel : '工件材料牌号',
				hiddenName : 'workpiecematerialid',
				triggerAction : 'all',
				store : new Ext.data.ArrayStore({
					fields : [ 'name', 'name' ],
					data : [ [] ]
				}),
				displayField : 'name',
				valueField : 'workpiecematerialid',
				lazyRender : true,
				editable : false,
				emptyText : '请选择...',
				loadingText : '正在加载数据...',
				mode : 'local',
				forceSelection : true,
				onSelect : Ext.emptyFn,
				// tpl : resultTpl2,
				// pageSize : cln,
				// minListWidth : 600,
				// plugins : [new QM.plugin.PinyinFilter],
				width : document.body.clientWidth / numlign - divnum,
				listeners : {
					expand : function(field) {
						if (this.menu == null) {
							this.menu = selectMenu;
						}
						// workpieceisotypeStore.load();
						this.menu.show(this.el, "tl-bl?");
						// selectMenu.show();
						Ext.getCmp('inputname_isotype').focus(true, 500);
					}/*
						 * , focus : function(field) { if (this.menu == null) {
						 * this.menu = selectMenu; }
						 * //workpieceisotypeStore.load();
						 * this.menu.show(this.el, "tl-bl?");
						 * //selectMenu.show();
						 * Ext.getCmp('inputname_isotype').focus(true, 500); }
						 */
				}
			});

			// 车削槽型类型数据
			var accuracyStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : 'generalturning.do?code=queryAccuracy4Blade'
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [ {
					name : 'value'
				}, {
					name : 'text'
				} ])
			});
			accuracyStore.load();

			// 车削槽型类型下拉框
			var accuracyCombo = new Ext.form.ComboBox({
				fieldLabel : '车削槽型类型',
				hiddenName : 'accuracyid',
				id : 'accuracyidid',
				emptyText : '请选择...',
				triggerAction : 'all',
				store : accuracyStore,
				displayField : 'text',
				valueField : 'value',
				selectOnFocus : true,
				loadingText : '正在加载数据...',
				mode : 'local',
				forceSelection : true,
				// pageSize : cln,
				// minListWidth : 270,
				plugins : [ new QM.plugin.PinyinFilter ],
				resizable : true,
				width : document.body.clientWidth / numlign - divnum,
				listeners : {
					select : function() {
						refreshBlade();
						
						//alert(accuracyCombo.getValue());
						/*workpieceisotypeStoreLord();*/
					},
					/*
					 * focus : function() { if (parent.rhwf) { hp =
					 * helpWin('test'); }
					 * setTimeout('Ext.getCmp("accuracyidid").expand();', 10); },
					 */
					/*
					 * blur : function() { if (Ext.isDefined(hp) &&
					 * hp.isVisible()) { hp.close(); } },
					 */
					specialkey : function(c, e) {
						if (e.getKey() == e.ESC) {
							c.reset();
							refreshBlade();
						}
					}
				}
			});

			// 刀片形状数据
			/*
			 * var shapeStore = new Ext.data.Store({ proxy : new
			 * Ext.data.HttpProxy({ url :
			 * 'generalturning.do?code=queryShapeInBlade' }), reader : new
			 * Ext.data.JsonReader({ totalProperty : 'TOTALCOUNT', root : 'ROOT' }, [{
			 * name : 'value' }, { name : 'text' }]), listeners : { 'load' :
			 * function(obj) { } } }); // shapeStore.load();
			 */

			// 车削槽型类型数据
			var accuracyStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : 'generalturning.do?code=queryAccuracy4Blade'
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [ {
					name : 'value'
				}, {
					name : 'text'
				} ])
			});
			accuracyStore.load();

			// 车削槽型类型下拉框
			var accuracyCombo = new Ext.form.ComboBox({
				fieldLabel : '车削槽型类型',
				hiddenName : 'accuracyid',
				id : 'accuracyidid',
				emptyText : '请选择...',
				triggerAction : 'all',
				store : accuracyStore,
				displayField : 'text',
				valueField : 'value',
				selectOnFocus : true,
				loadingText : '正在加载数据...',
				mode : 'local',
				forceSelection : true,
				editable : false,
				// pageSize : cln,
				// minListWidth : 270,
				plugins : [ new QM.plugin.PinyinFilter ],
				resizable : true,
				width : document.body.clientWidth / numlign - divnum,
				listeners : {
					select : function() {
						refreshBlade();
						shapeStoreLoad();
						celengthStoreLoad();
						reliefangleStoreLoad();
						noseradiusStoreLoad();
						//alert(accuracyCombo.getValue());
					/*	workpieceisotypeStoreLord();*/
					},
					/*
					 * focus : function() { if (parent.rhwf) { hp =
					 * helpWin('test'); }
					 * setTimeout('Ext.getCmp("accuracyidid").expand();', 10); },
					 */
					/*
					 * blur : function() { if (Ext.isDefined(hp) &&
					 * hp.isVisible()) { hp.close(); } },
					 */
					specialkey : function(c, e) {
						if (e.getKey() == e.ESC) {
							c.reset();
							refreshBlade();
						}
					}
				}
			});
			
			
			// 刀片形状数据
			var shapeStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : 'generalturning.do?code=queryShapeInBlade'
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [ {
					name : 'value'
				}, {
					name : 'text'
				} ])
			});
			shapeStore.load();

			// 刀片形状下拉框
			var shapeCombo = new Ext.form.ComboBox(
					{
						fieldLabel : '刀片形状',
						hiddenName : 'shape',
						id : 'shapeidid',
						emptyText : '请选择...',
						triggerAction : 'all',
						store : shapeStore,
						displayField : 'text',
						valueField : 'value',
						selectOnFocus : true,
						loadingText : '正在加载数据...',
						mode : 'local',
						forceSelection : true,
						//editable : false,
						// pageSize : cln,
						// minListWidth : 270,
						plugins : [ new QM.plugin.PinyinFilter ],
						resizable : true,
						width : document.body.clientWidth / numlign - divnum,
						listWidth : shapeArr[0] * shapepp + 25,
						tpl : '<tpl for="."><div x-combo-list-item class="x-combo-list-item"><img src="'
								+ webContext
								+ '/dec/combo/blade/shape/'
								+ '{value}'
								+ '.png" width='
								+ shapeArr[0]
								* shapepp
								+ ' height='
								+ shapeArr[1]
								* shapepp
								+ '></div></tpl>',
						listeners : {
							/*focus : function() {
								// shapeStore.load();
								setTimeout('Ext.getCmp("shapeidid").expand();',
										1);
							},*/
							select : function() {
								noseradiusStoreLoad();
								celengthStoreLoad();
								reliefangleStoreLoad();
								shapeCombo2.setValue(shapeCombo.getValue());
								celengthCombo.enable();
								celengthCombo.reset();
								refreshBlade();
							},
							specialkey : function(c, e) {
								if (e.getKey() == e.ESC) {
									c.reset();
									shapeCombo2.setValue('');
									if (parent.grf == true) {
										celengthCombo.reset();
										celengthCombo.disable();
									} else {
										// celengthCombo.reset();
										celengthCombo.enable();
									}
									refreshBlade();

								}	if (e.getKey() == e.BACKSPACE) {
									c.reset();
									shapeCombo2.setValue('');
									refreshBlade();
								}
							},
							change : function(c, e) {
								if (Ext.get('shapeidid').dom.value == '') {
									c.reset();
									shapeCombo2.setValue('');
									refreshBlade();
								}
							}
						}
					});

			// 刀片后角数据
			
			  var reliefangleStore = new Ext.data.Store({ proxy : new
			          Ext.data.HttpProxy({ url : 'generalturning.do?code=queryReliefangleInBlade' }), 
			          reader : new
			          Ext.data.JsonReader({ totalProperty : 'TOTALCOUNT', root : 'ROOT' }, 
			        		  [{name : 'value' }, { name : 'text' }]) 
			  }); 
			
			  reliefangleStore.load();
			 

			// 刀片后角下拉框
			var reliefangleCombo = new Ext.form.ComboBox(
					{
						fieldLabel : '刀片后角',
						hiddenName : 'reliefangle',
						id : 'reliefangleidid',
						emptyText : '请选择...',
						triggerAction : 'all',
						store : reliefangleStore,
						displayField : 'text',
						valueField : 'value',
						// title : ' - 空 - ',
						selectOnFocus : true,
						loadingText : '正在加载数据...',
						mode : 'local',
						forceSelection : false,
						// pageSize : cln,
						// minListWidth : 270,
						plugins : [ new QM.plugin.PinyinFilter ],
						resizable : true,
						width : document.body.clientWidth / numlign - divnum,
						listWidth : reliefangleArr[0] * reliefanglepp + 25,
						tpl : '<tpl for="."><div x-combo-list-item class="x-combo-list-item"><img src="'
								+ webContext
								+ '/dec/combo/blade/reliefangle/'
								+ '{value}'
								+ '.png" width='
								+ reliefangleArr[0]
								* reliefanglepp
								+ ' height='
								+ reliefangleArr[1]
								* reliefanglepp + '></div></tpl>',
						// tpl : '<table><tr><tpl for="."><td
						// class="x-combo-list-item"><img
						// src="' + webContext + '/dec/combo/blade/reliefangle/'
						// + '{value}' +
						// '.png'
						// + '" width=60 height=30 />&nbsp;{text}&nbsp;</td><tpl
						// if="xindex % 2
						// === 0"></tr><tr></tpl></tpl></tr></table>',
						listeners : {
							focus : function() {
								// reliefangleStore.load();
								setTimeout(
										'Ext.getCmp("reliefangleidid").expand();',
										1);
							},
							select : function() {
								noseradiusStoreLoad();
								celengthStoreLoad();
								reliefangleCombo2.setValue(reliefangleCombo
										.getValue());
								refreshBlade();
							},
							specialkey : function(c, e) {
								if (e.getKey() == e.ESC) {
									c.reset();
									refreshBlade();
								}if (e.getKey() == e.BACKSPACE) {
									c.reset();
									reliefangleCombo2.setValue('');
									refreshBlade();
								}
							},
							change : function(c, e) {
								if (Ext.get('reliefangleidid,').dom.value == '') {
									c.reset();
									reliefangleCombo2.setValue('');
									refreshBlade();
								}
							}
						}
					});

		
			// 刀片尺寸数据
				
				  var celengthStore = new Ext.data.Store({ proxy : new
				          Ext.data.HttpProxy({ url : 'generalturning.do?code=queryCelengthInBlade' }), 
				          reader : new
				          Ext.data.JsonReader({ totalProperty : 'TOTALCOUNT', root : 'ROOT' }, 
				        		  [{name : 'value' }, { name : 'text' }]) 
				  }); 
				
				  celengthStore.load();

			// 刀片尺寸下拉框
			var celengthCombo = new Ext.form.ComboBox(
					{
						fieldLabel : '刀片尺寸',
						hiddenName : 'celength',
						id : 'celengthidid',
						emptyText : '请选择...',
						triggerAction : 'all',
						disabled : true,
						store : celengthStore,
						displayField : 'text',
						valueField : 'value',
						selectOnFocus : true,
						loadingText : '正在加载数据...',
						mode : 'local',
						forceSelection : true,
						// pageSize : cln,
						// minListWidth : 270,
						plugins : [ new QM.plugin.PinyinFilter ],
						resizable : true,
						width : document.body.clientWidth / numlign - divnum,
						listWidth : celengthArr[0] * celengthpp + 25,
						// tpl : '<table><tr><tpl for="."><td
						// class="x-combo-list-item"><img
						// src="' + webContext + '/dec/combo/blade/celength/' +
						// '{value}' +
						// '.png' + '" width='
						// + celengthArr[0] * celengthpp + ' height=' +
						// celengthArr[1] *
						// celengthpp + ' /></td><tpl if="xindex % 2 ===
						// 0"></tr><tr></tpl></tpl></tr></table>',
						tpl : '<tpl for="."><div x-combo-list-item class="x-combo-list-item"><img src="'
								+ webContext
								+ '/dec/combo/blade/celength/'
								+ '{value}'
								+ '.png" width='
								+ celengthArr[0]
								* celengthpp
								+ ' height='
								+ celengthArr[1]
								* celengthpp + '></div></tpl>',
						listeners : {
							focus : function() {
								// celengthStore.load();
								setTimeout(
										'Ext.getCmp("celengthidid").expand();',
										1);
							},
							/*
							 * afterrender : function(c) { c.doQuery('', true); },
							 */
							expand : function(c) {
								if (c.getStore().isFiltered()) {
									c.getStore().clearFilter(true);
								}
								c
										.getStore()
										.filter(
												[
														{
															property : 'text',
															value : shapeCombo
																	.getValue(),
															anyMatch : false,
															caseSensitive : false
														},
														{
															fn : function(
																	record) {
																return record
																		.get(
																				'text')
																		.substring(
																				0,
																				1) == shapeCombo
																		.getValue();
															}
														} ]);
							},
							select : function() {
								noseradiusStoreLoad();
								refreshBlade();
							},
							specialkey : function(c, e) {
								if (e.getKey() == e.ESC) {
								
								c.reset();
								refreshBlade();}
							}
						}
					});

			
			//刀尖圆弧半径数据 
			  var noseradiusStore = new Ext.data.Store({ proxy :
			  new Ext.data.HttpProxy({ url :  'generalturning.do?code=queryNoseradiusInBlade' }), reader : new
			  Ext.data.JsonReader({ totalProperty : 'TOTALCOUNT', root : 'ROOT' }, [ {
			  name : 'value' } , { name : 'text' } ]) });
			  noseradiusStore.load();
			 

			var noseradiusCombo = new Ext.form.ComboBox({
				fieldLabel		: '刀尖圆弧半径',
				hiddenName		: 'noseradius',
				id				: 'noseradiusidid',
				emptyText		: '请选择...',
				triggerAction	: 'all',
				store			: noseradiusStore,
				displayField	: 'text',
				valueField		: 'value',
				selectOnFocus	: true,
				loadingText		: '正在加载数据...',
				mode			: 'local',
				forceSelection	: true,
				// pageSize : cln,
				// minListWidth : 270,
				plugins			: [new QM.plugin.PinyinFilter],
				resizable		: true,
				width			: document.body.clientWidth / numlign - divnum,
				listWidth		: noseradiusArr[0] * noseradiuspp + 25,
				tpl				: '<tpl for="."><div x-combo-list-item class="x-combo-list-item"><img src="' + webContext + '/dec/combo/blade/noseradius/' + '{value}' + '.png" width='
						+ noseradiusArr[0] * noseradiuspp + ' height=' + noseradiusArr[1] * noseradiuspp + '></div></tpl>',
				listeners		: {
					focus		: function() {
						// noseradiusStore.load();
						setTimeout('Ext.getCmp("noseradiusidid").expand();', 1);
					},
					select		: function() {
						refreshBlade();
					},
					specialkey	: function(c, e) {
						if (e.getKey() == e.ESC) {
							c.reset();
							refreshBlade();
						}if (e.getKey() == e.ENTER) {
						c.setValue(Ext.get('noseradiusidid').dom.value) ;
							refreshBlade();
						}
					/*
						c.reset();
						refreshBlade();
					*/}
				}
			});
			// 车削类型数据
			
			  var turningtypeStore = new Ext.data.Store({ proxy : new
			  Ext.data.HttpProxy({ url : 'generalturning.do?code=queryturningtypeInToolholder' }), reader :
			  new Ext.data.JsonReader({ totalProperty : 'TOTALCOUNT', root :
			  'ROOT' }, [{ name : 'value' }, { name : 'text' }]) });
			  turningtypeStore.load();
			 

			var turningtypeCombo = new Ext.form.ComboBox(
					{
						fieldLabel : '车削类型',
						hiddenName : 'turningtype',
						id : 'turningtypeidid',
						emptyText : '请选择...',
						triggerAction : 'all',
						store : turningtypeStore,
						displayField : 'text',
						valueField : 'value',
						selectOnFocus : true,
						loadingText : '正在加载数据...',
						mode : 'local',
						forceSelection : true,
						lazyRender : true,
						editable : false,
						// pageSize : cln,
						// minListWidth : 270,
						plugins : [ new QM.plugin.PinyinFilter ],
						resizable : true,
						width : document.body.clientWidth / numlign - divnum,
						listWidth : turningtypeArr[0] * turningtypepp + 5,
						tpl : '<tpl for="."><div x-combo-list-item class="x-combo-list-item"><img src="'
								+ webContext
								+ '/dec/combo/toolholder/turningtype/'
								+ '{value}'
								+ '.png" width='
								+ turningtypeArr[0]
								* turningtypepp
								+ ' height='
								+ turningtypeArr[1]
								* turningtypepp + '></div></tpl>',
						listeners : {
							focus : function() {
								setTimeout(
										'Ext.getCmp("turningtypeidid").expand();',
										1);
							},
							expand : function(c) {
								// 车削类型过滤;
								c
										.getStore()
										.filter(
												[
														{
															property : 'value',
															value : '1',
															anyMatch : false,
															caseSensitive : false
														},
														{
															fn : function(
																	record) {
																return record
																		.get(
																				'value')
																		.substring(
																				0,
																				1) == '1';
															}
														} ]);
							},
							select : function(c, r, index) {
								
								if (index == 2) {
									Ext.getCmp('borelableid').show();
									boreCombo.show();
								} else {
									Ext.getCmp('borelableid').hide();
									boreCombo.reset();
									boreCombo.hide();
								}
								
								// toolholderCm.getColumnHeader().getById('bore')
							
								
								refreshToolholder();
								//alert(turningtypeCombo.getValue());
								thheadangleStoreLoad();
								handoftoolStoreLoad();
								shape2StoreLoad();
								reliefangle2StoreLoad();
								portsizeStoreLoad();
								cseriesStoreLoad();
								boreStoreLoad();
							},
							specialkey : function(c, e) {
								if (e.getKey() == e.ESC) {
									c.reset();
									refreshToolholder();
									Ext.getCmp('borelableid').hide();
									boreCombo.reset();
									boreCombo.hide();
								}
							}
						}
					});

			// 头部形式数据
			
			  var thheadangleStore = new Ext.data.Store({ proxy : new
			  Ext.data.HttpProxy({ url :  'generalturning.do?code=queryThheadangleInToolholder' }), reader :
			  new Ext.data.JsonReader({ totalProperty : 'TOTALCOUNT', root :
			  'ROOT' }, [{ name : 'value' }, { name : 'text' }]) });
			 
			  thheadangleStore.load();
			// 头部形式下拉框
			var thheadangleCombo = new Ext.form.ComboBox(
					{
						fieldLabel : '头部形式',
						hiddenName : 'thheadangle',
						id : 'thheadangleidid',
						emptyText : '请选择...',
						triggerAction : 'all',
						store : thheadangleStore,
						displayField : 'text',
						valueField : 'value',
						selectOnFocus : true,
						loadingText : '正在加载数据...',
						mode : 'local',
						forceSelection : true,
						editable : false,
						// pageSize : cln,
						// minListWidth : 270,
						plugins : [ new QM.plugin.PinyinFilter ],
						resizable : true,
						width : document.body.clientWidth / numlign - divnum,
						listWidth : thheadangleArr[0] * 7 * thheadanglepp + 60,
						// tpl : '<tpl for="."><div x-combo-list-item
						// class="x-combo-list-item"><img src="' + webContext +
						// '/dec/combo/toolholder/thheadangle/' + '{value}'
						// + '.png" width="100" height="120"></div></tpl>',
						tpl : '<table><tr><tpl for="."><td class="x-combo-list-item"><img src="'
								+ webContext
								+ '/dec/combo/toolholder/thheadangle/'
								+ '{value}'
								+ '.png'
								+ '" width='
								+ thheadangleArr[0]
								* thheadanglepp
								+ ' height='
								+ thheadangleArr[1]
								* thheadanglepp
								+ ' /></td><tpl if="xindex % 7 === 0"></tr><tr></tpl></tpl></tr></table>',
						listeners : {
							focus : function() {
								// thheadangleStore.load();
								setTimeout(
										'Ext.getCmp("thheadangleidid").expand();',
										1);
							},
							select : function() {
								refreshToolholder();
								handoftoolStoreLoad();
								shape2StoreLoad();
								reliefangle2StoreLoad();
								portsizeStoreLoad();
								cseriesStoreLoad();
								boreStoreLoad();
							},
							specialkey : function(c, e) {
								if (e.getKey() == e.ESC) {
									c.reset();
									refreshToolholder();
								}
							}
						}
					});

			// 刀具方向数据
			
			  var handoftoolStore = new Ext.data.Store({ proxy : new
			  Ext.data.HttpProxy({ url : 'generalturning.do?code=queryHandoftoolInToolholder' }), reader :
			  new Ext.data.JsonReader({ totalProperty : 'TOTALCOUNT', root :
			  'ROOT' }, [{ name : 'value' }, { name : 'text' }]) });
			  handoftoolStore.load();
			 

			// 刀具方向下拉框
			var handoftoolCombo = new Ext.form.ComboBox(
					{
						fieldLabel : '刀具方向',
						hiddenName : 'handoftool',
						id : 'handoftoolidid',
						emptyText : '请选择...',
						triggerAction : 'all',
						store : handoftoolStore,
						displayField : 'text',
						valueField : 'value',
						selectOnFocus : true,
						loadingText : '正在加载数据...',
						mode : 'local',
						forceSelection : true,
						editable : false,
						// pageSize : cln,
						// minListWidth : 270,
						plugins : [ new QM.plugin.PinyinFilter ],
						resizable : true,
						width : document.body.clientWidth / numlign - divnum,
						listWidth : handoftoolArr[0] * handoftoolpp + 5,
						// listAlign : ['tl-bl?', [6, 0]],
						tpl : '<tpl for="."><div x-combo-list-item class="x-combo-list-item"><img src="'
								+ webContext
								+ '/dec/combo/toolholder/handoftool/'
								+ '{value}'
								+ '.png" width='
								+ handoftoolArr[0]
								* handoftoolpp
								+ ' height='
								+ handoftoolArr[1]
								* handoftoolpp + '></div></tpl>',// 已修正
						listeners : {
							focus : function() {
								// handoftoolStore.load();
								setTimeout(
										'Ext.getCmp("handoftoolidid").expand();',
										1);
							},
							select : function() {
								refreshToolholder();
								shape2StoreLoad();
								reliefangle2StoreLoad();
								portsizeStoreLoad();
								cseriesStoreLoad();
								boreStoreLoad();
							},
							specialkey : function(c, e) {
								if (e.getKey() == e.ESC) {
									c.reset();
									refreshToolholder();
								}
							}
						}
					});

			
			
			// 刀片形状数据
			var shape2Store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : 'generalturning.do?code=queryShapeInToolholder'
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [ {
					name : 'value'
				}, {
					name : 'text'
				} ])
			});
			shape2Store.load();
			// 刀片形状下拉框
			var shapeCombo2 = new Ext.form.ComboBox(
					{
						fieldLabel : '刀片形状',
						hiddenName : 'shapeblade',
						id : 'shapebladeidid2',
						emptyText : '请选择...',
						triggerAction : 'all',
						store : shape2Store,
						displayField : 'text',
						valueField : 'value',
						selectOnFocus : true,
						loadingText : '正在加载数据...',
						mode : 'local',
						forceSelection : true,
						//editable : false,
						// pageSize : cln,
						// minListWidth : 270,
						plugins : [ new QM.plugin.PinyinFilter ],
						resizable : true,
						width : document.body.clientWidth / numlign - divnum,
						listWidth : shapeArr[0] * shapepp + 25,
						tpl : '<tpl for="."><div x-combo-list-item class="x-combo-list-item"><img src="'
								+ webContext
								+ '/dec/combo/blade/shape/'
								+ '{value}'
								+ '.png" width='
								+ shapeArr[0]
								* shapepp
								+ ' height='
								+ shapeArr[1]
								* shapepp
								+ '></div></tpl>',
						listeners : {
							focus : function() {
								// shapeStore.load();
								setTimeout(
										'Ext.getCmp("shapebladeidid2").expand();',
										1);
							},
							select : function() {
								shapeCombo.setValue(shapeCombo2.getValue());
								celengthCombo.enable();
								celengthCombo.reset();
								refreshToolholder();
								reliefangle2StoreLoad();
								portsizeStoreLoad();
								cseriesStoreLoad();
								boreStoreLoad();
								
							},
							specialkey : function(c, e) {
								if (e.getKey() == e.ESC) {
									c.reset();
									shapeCombo.setValue('');
									refreshToolholder();
									celengthCombo.reset();
									celengthCombo.disable();
								}
								if (e.getKey() == e.BACKSPACE) {
									c.reset();
									shapeCombo.setValue('');
									refreshToolholder();
								}
							},
							change : function(c, e) {
								if (Ext.get('shapebladeidid2').dom.value == '') {
									c.reset();
									shapeCombo.setValue('');
									refreshToolholder();
								}
							}
						}
					});

			
			// 刀片后角数据
			
			  var reliefangle2Store = new Ext.data.Store({ proxy : new
			          Ext.data.HttpProxy({ url : 'generalturning.do?code=queryReliefangleInToolholder' }), 
			          reader : new
			          Ext.data.JsonReader({ totalProperty : 'TOTALCOUNT', root : 'ROOT' }, 
			        		  [{name : 'value' }, { name : 'text' }]) 
			  }); 
			
			  reliefangle2Store.load();
			// 刀片后角下拉框
			var reliefangleCombo2 = new Ext.form.ComboBox(
					{
						fieldLabel : '刀片后角',
						hiddenName : 'reliefangleblade',
						id : 'reliefanglebladeidid2',
						emptyText : '请选择...',
						triggerAction : 'all',
						store : reliefangle2Store,
						displayField : 'text',
						valueField : 'value',
						selectOnFocus : true,
						// title : ' - 空 - ',
						loadingText : '正在加载数据...',
						mode : 'local',
						forceSelection : false,
						// pageSize : cln,
						// minListWidth : 270,
						plugins : [ new QM.plugin.PinyinFilter ],
						resizable : true,
						width : document.body.clientWidth / numlign - divnum,
						listWidth : reliefangleArr[0] * reliefanglepp + 25,
						tpl : '<tpl for="."><div x-combo-list-item class="x-combo-list-item"><img src="'
								+ webContext
								+ '/dec/combo/blade/reliefangle/'
								+ '{value}'
								+ '.png" width='
								+ reliefangleArr[0]
								* reliefanglepp
								+ ' height='
								+ reliefangleArr[1]
								* reliefanglepp + '></div></tpl>',
						listeners : {
							focus : function() {
								// reliefangleStore.load();
								setTimeout(
										'Ext.getCmp("reliefanglebladeidid2").expand();',
										1);
							},
							select : function() {
								reliefangleCombo.setValue(reliefangleCombo2
										.getValue());
								refreshToolholder();
								portsizeStoreLoad();
								cseriesStoreLoad();
								boreStoreLoad();
							},
							specialkey : function(c, e) {
								if (e.getKey() == e.ESC) {
								c.reset();
								refreshToolholder();}
								if (e.getKey() == e.BACKSPACE) {
									c.reset();
									reliefangleCombo.setValue('');
									refreshToolholder();
								}
							},
							change : function(c, e) {
								if (Ext.get('reliefanglebladeidid2').dom.value == '') {
									c.reset();
									reliefangleCombo.setValue('');
									refreshToolholder();
								}
							}
						}
					});

			// 接口规格数据
			
			  var portsizeStore = new Ext.data.Store({ proxy : new
			  Ext.data.HttpProxy({ url : 'generalturning.do?code=queryPortsizeInToolholder' }), reader :
			  new Ext.data.JsonReader({ totalProperty : 'TOTALCOUNT', root :
			  'ROOT' }, [{ name : 'value' }, { name : 'text' }]) }); 
			  portsizeStore.load();
			 

			// 接口规格下拉框
			var portsizeCombo = new Ext.form.ComboBox(
					{
						fieldLabel : '接口规格',
						hiddenName : 'portsize',
						id : 'portsizeidid',
						emptyText : '请选择...',
						triggerAction : 'all',
						store : portsizeStore,
						displayField : 'text',// codedesc
						valueField : 'value',// dodedic
						selectOnFocus : true,
						loadingText : '正在加载数据...',
						mode : 'local',
						forceSelection : true,
						// pageSize : cln,
						// minListWidth : 270,
						plugins : [ new QM.plugin.PinyinFilter ],
						resizable : true,
						width : document.body.clientWidth / numlign - divnum,
						listWidth : portsizeArr[0] * 2 * portsizepp + 40,
						tpl : '<table><tr><tpl for="."><td class="x-combo-list-item"><img src="'
								+ webContext
								+ '/dec/combo/toolholder/portsize/'
								+ '{value}'
								+ '.png'
								+ '" width='
								+ portsizeArr[0]
								* portsizepp
								+ ' height='
								+ portsizeArr[1]
								* portsizepp
								+ '/></td><tpl if="xindex % 2 === 0"></tr><tr></tpl></tpl></tr></table>',
						listeners : {
							focus : function() {
								// portsizeStore.load();
								setTimeout(
										'Ext.getCmp("portsizeidid").expand();',
										1);
							},
							select : function() {
								refreshToolholder();
								cseriesStoreLoad();
								boreStoreLoad();
							},
							specialkey : function(c, e) {
								if (e.getKey() == e.ESC) {
								c.reset();
								refreshToolholder();}
							}
						}
					});
			
			  //刀片夹紧方式数据 
			  var cseriesStore = new Ext.data.Store({ proxy : new
			  Ext.data.HttpProxy({ url : 'generalturning.do?code=queryCseriesInToolholder' }), reader :
			  new Ext.data.JsonReader({ totalProperty : 'TOTALCOUNT', root :
			  'ROOT' }, [{ name : 'value' }, { name : 'text' }]) });
              cseriesStore.load();
			 

			// 刀片夹紧形式下拉框
			var cseriesCombo = new Ext.form.ComboBox(
					{
						fieldLabel : '刀片夹紧形式',
						hiddenName : 'cseries',
						id : 'cseriesidid',
						emptyText : '请选择...',
						triggerAction : 'all',
						store : cseriesStore,
						displayField : 'text',
						valueField : 'value',
						selectOnFocus : true,
						loadingText : '正在加载数据...',
						mode : 'local',
						forceSelection : true,
						editable : false,
						// pageSize : cln,
						// minListWidth : 270,
						plugins : [ new QM.plugin.PinyinFilter ],
						resizable : true,
						width : document.body.clientWidth / numlign - divnum,
						listWidth : cseriesArr[0] * cseriespp + 12,
						tpl : '<tpl for="."><div x-combo-list-item class="x-combo-list-item"><img src="'
								+ webContext
								+ '/dec/combo/toolholder/cseries/'
								+ '{value}'
								+ '.png" width='
								+ cseriesArr[0]
								* cseriespp
								+ ' height='
								+ cseriesArr[1]
								* cseriespp + '></div></tpl>',
						listeners : {
							focus : function() {
								setTimeout(
										'Ext.getCmp("cseriesidid").expand();',
										1);
							},
							select : function() {
								refreshToolholder();
								boreStoreLoad();
							},
							specialkey : function(c, e) {
								if (e.getKey() == e.ESC) {
									c.reset();
									refreshToolholder();
								}
							}
						}
					});

			  //镗孔直径数据 
			  var boreStore = new Ext.data.Store({ proxy : new
			  Ext.data.HttpProxy({ url : 'generalturning.do?code=queryBoreInToolholder' }), reader :
			  new Ext.data.JsonReader({ totalProperty : 'TOTALCOUNT', root :
			  'ROOT' }, [{ name : 'value' }, { name : 'text' }]) });
              boreStore.load();
			
			var boreCombo = new Ext.form.ComboBox({
				fieldLabel : '最小镗孔直径',
				hiddenName : 'bore',
				id : 'boreid',
				emptyText : '请选择...',
				hidden : true,
				triggerAction : 'all',
				store : boreStore,
				displayField : 'text',
				valueField : 'value',
				selectOnFocus : true,
				loadingText : '正在加载数据...',
				mode : 'local',
				forceSelection : true,
				typeAhead : true,
				cls : 'greatthan',
				enableKeyEvents : true,
				// pageSize : cln,
				// minListWidth : 270,
				//plugins : [ new QM.plugin.PinyinFilter ],
				resizable : true,
				editable : true,
				width : document.body.clientWidth / numlign - divnum,
				listeners : {
					focus : function() {
						setTimeout('Ext.getCmp("boreid").expand();', 1);
					},
					afterrender : function(c) {
						c.setValue('');
					},
					select : function() {
						refreshToolholder();
					},/*
						 * expand : function(c) { //c.addClass('greatthan');
						 * //c.setHideTrigger(true); //c.syncSize(); }, collapse :
						 * function(c) { //c.removeClass('greatthan');
						 * //c.setHideTrigger(false); //c.syncSize(); },
						 */
					specialkey : function(c, e) {
						if (e.getKey() == e.ESC) {
							c.reset();
							refreshToolholder();
						}if (e.getKey() == e.ENTER) {
						c.setValue(Ext.get('boreid').dom.value) ;
							refreshToolholder();
						}
					}
				}
			});

			// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

			// 表格工具栏
			/*
			 * var tbar = new Ext.Toolbar({//workpiecematerialCombo
			 * //workpieceisotypeCombo heigth : 40, buttonAlign : 'left', items : [{
			 * text : '请选择工件材料状态:', height : 20, width :
			 * document.body.clientWidth / numlign - divnum }, '-', '-', { text :
			 * '请选择车削槽型类型:', width : document.body.clientWidth / numlign -
			 * divnum }, '-', '-', { text : '请选择刀片形状:', width :
			 * document.body.clientWidth / numlign - divnum }, '-', '-', { text :
			 * '请选择刀片尺寸:', width : document.body.clientWidth / numlign - divnum },
			 * '-', '-', { text : '请选择刀片后角:', width : document.body.clientWidth /
			 * numlign - divnum }, '-', '-', { text : '请选择刀尖圆弧半径:', width :
			 * document.body.clientWidth / numlign - divnum }] } );
			 */

			var tbar = new Ext.Toolbar({// workpiecematerialCombo
				// //workpieceisotypeCombo
				items : [ new Ext.Toolbar.TextItem({
					text : '工件材料:',
					autoHeight : true
				}), workpieceisotypeCombo, '-', new Ext.Toolbar.TextItem({
					text : '加工类型:',
					autoHeight : true
				}), accuracyCombo, '-', new Ext.Toolbar.TextItem({
					text : '刀片形状:',
					autoHeight : true
				}), shapeCombo, '-', new Ext.Toolbar.TextItem({
					text : '刀片后角:',
					autoHeight : true
				}), reliefangleCombo, '-', new Ext.Toolbar.TextItem({
					text : '刀片尺寸:',
					autoHeight : true
				}), celengthCombo, '-', new Ext.Toolbar.TextItem({
					text : '刀尖圆弧半径:',
					autoHeight : true
				}), noseradiusCombo, '-', '-', {
					text : '打印预览',
					iconCls : 'previewIcon',
					handler : function() {
						printTask();
					}
				}, '->', {
					text : '重置',
					iconCls : 'tbar_synchronizeIcon',
					handler : function() {
						resetCombo();
					}
				} ]
			});

			// 页面过滤
			var filtersBlade = new Ext.ux.grid.GridFilters({// string,numeric,date,list,boolean
				encode : true,
				autoReload : false,
				local : true,
				filters : [ {
					dataIndex : 'sapcode',
					type : 'string'
				}, {
					dataIndex : 'name',
					type : 'string'
				}, {
					dataIndex : 'bladetype',
					type : 'string'
				}, {
					dataIndex : 'figure',
					type : 'string'
				}, {
					dataIndex : 'figure2',
					type : 'string'
				}, {
					dataIndex : 'turningtype',
					type : 'string'
				}, {
					dataIndex : 'bladematerialname',
					type : 'string'
				}, {
					dataIndex : 'groovename',
					type : 'string'
				}, {
					dataIndex : 'bladebrandname',
					type : 'string'
				}, {
					dataIndex : 'reliefangle',
					type : 'string'
				}, {
					dataIndex : 'shape',
					type : 'string'
				}, {
					dataIndex : 'celength',
					type : 'string'
				}, {
					dataIndex : 'noseradius',
					type : 'string'
				}, {
					dataIndex : 'thickness',
					type : 'numeric'
				}, {
					dataIndex : 'description',
					type : 'string'
				}, {
					dataIndex : 'featurecode',
					type : 'string'
				}, {
					dataIndex : 'apmax',
					type : 'numeric'
				}, {
					dataIndex : 'apmin',
					type : 'numeric'
				}, {
					dataIndex : 'fnmax',
					type : 'numeric'
				}, {
					dataIndex : 'fnmin',
					type : 'numeric'
				}, {
					dataIndex : 'remark',
					type : 'string'
				}
				/*
				 * { type : 'list', dataIndex : 'size', options : ['extra
				 * small', 'small', 'medium', 'large', 'extra large'] }
				 */]
			});

			// 页面过滤
			var filtersToolholder = new Ext.ux.grid.GridFilters({// string,numeric,date,list,boolean
				encode : true,
				autoReload : false,
				local : true,
				filters : [ {
					dataIndex : 'sapcode',
					type : 'string'
				}, {
					dataIndex : 'name',
					type : 'string'
				}, {
					dataIndex : 'toolholdertype',
					type : 'string'
				}, {
					dataIndex : 'toolholderbrandname',
					type : 'string'
				}, {
					dataIndex : 'turningtype',
					type : 'string'
				}, {
					dataIndex : 'portsize',
					type : 'string'
				}, {
					dataIndex : 'handoftool',
					type : 'string'
				}, {
					dataIndex : 'figure',
					type : 'string'
				}, {
					dataIndex : 'figure2',
					type : 'string'
				}, {
					dataIndex : 'featurecode',
					type : 'string'
				}, {
					dataIndex : 'cseries',
					type : 'string'
				}, {
					dataIndex : 'length',
					type : 'numeric'
				}, {
					dataIndex : 'width',
					type : 'numeric'
				}, {
					dataIndex : 'bore',
					type : 'numeric'
				}, {
					dataIndex : 'thheadangle',
					type : 'string'
				}, {
					dataIndex : 'aname1',
					type : 'string'
				}, {
					dataIndex : 'atype1',
					type : 'string'
				}, {
					dataIndex : 'aname2',
					type : 'string'
				}, {
					dataIndex : 'atype2',
					type : 'string'
				}, {
					dataIndex : 'aname3',
					type : 'string'
				}, {
					dataIndex : 'atype3',
					type : 'string'
				}, {
					dataIndex : 'aname4',
					type : 'string'
				}, {
					dataIndex : 'atype4',
					type : 'string'
				}, {
					dataIndex : 'aname5',
					type : 'string'
				}, {
					dataIndex : 'atype5',
					type : 'string'
				}, {
					dataIndex : 'remark',
					type : 'string'
				}
				/*
				 * { type : 'list', dataIndex : 'size', options : ['extra
				 * small', 'small', 'medium', 'large', 'extra large'] }
				 */]
			});

			// 表格
			var grid = new Ext.grid.GridPanel({
				title : '<span class="commoncss">刀片选择</span>',
				header : false,
				height : 500,
				id : 'gridid',
				autoScroll : true,
				frame : true,
				region : 'center',
				store : bladeStore,
				stripeRows : true,
				sm : sm,
				cm : bladeCm,
				tbar : tbar,
				bbar : bbar,
				viewConfig : {
					forceFit : false
				// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
				},
				loadMask : {
					msg : '正在加载表格数据,请稍等...'
				},
				view : new Ext.grid.GroupingView(),
				plugins : [ filtersBlade ],
				stateful : sf,
				stateId : 'grid-gt-blade',
				listeners : {
					afterrender : function() {
						if (parent.grf == true) {
							calcButton.hide();
							calcButton2.hide();
						} else {
							calcButton.show();
							calcButton2.show();
						}
					}
				}

			});

			// 表格工具栏
			/*
			 * var tbar2 = new Ext.Toolbar({ items : [turningtypeCombo, '-',
			 * '-', thheadangleCombo, '-', '-', handoftoolCombo, '-', '-',
			 * shapeCombo2, '-', '-', reliefangleCombo2, '-', '-',
			 * portsizeCombo, '-', '-', cseriesCombo, '->', { text : '重置',
			 * iconCls : 'tbar_synchronizeIcon', handler : function() {
			 * resetCombo2(); } }] });
			 */

			var tbar2 = new Ext.Toolbar({// workpiecematerialCombo
				// //workpieceisotypeCombo
				items : [ new Ext.Toolbar.TextItem({
					text : '车削类型:',
					autoHeight : true
				}), turningtypeCombo, '-', new Ext.Toolbar.TextItem({
					text : '头部形式:',
					autoHeight : true
				}), thheadangleCombo, '-', new Ext.Toolbar.TextItem({
					text : '刀具方向:',
					autoHeight : true
				}), handoftoolCombo, '-', new Ext.Toolbar.TextItem({
					text : '刀片形状:',
					autoHeight : true
				}), shapeCombo2, '-', new Ext.Toolbar.TextItem({
					text : '刀片后角:',
					autoHeight : true
				}), reliefangleCombo2, '-', new Ext.Toolbar.TextItem({
					text : '接口规格:',
					autoHeight : true
				}), portsizeCombo, '-', new Ext.Toolbar.TextItem({
					text : '夹紧形式:',
					autoHeight : true
				}), cseriesCombo, '-', new Ext.Toolbar.TextItem({
					text : '镗孔直径:',
					id : 'borelableid',
					hidden : true,
					autoHeight : true
				}), boreCombo,'-', '-', {
					text : '打印预览',
					iconCls : 'previewIcon',
					handler : function() {
						printTask2();
					}
				},  '->', {
					text : '重置',
					iconCls : 'tbar_synchronizeIcon',
					handler : function() {
						resetCombo2();
					}
				} ]
			});

			// 表格
			var grid2 = new Ext.grid.GridPanel({
				title : '<span class="commoncss">刀体选择</span>',
				header : false,
				height : 500,
				id : 'grid2id',
				autoScroll : true,
				frame : true,
				region : 'center',
				store : toolholderStore,
				stripeRows : true,
				sm : sm2,
				cm : toolholderCm,
				tbar : tbar2,
				bbar : bbar2,
				viewConfig : {
					forceFit : false
				// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
				},
				loadMask : {
					msg : '正在加载表格数据,请稍等...'
				},
				view : new Ext.grid.GroupingView(),
				plugins : [ filtersToolholder ],
				stateful : sf,
				stateId : 'grid-gt-toolholder'
			});

			// 表格单击事件
			grid.on('rowclick', function(pGrid, rowIndex, event) {
				// Ext.getCmp('modifyid').enable();
				// Ext.getCmp('deleteid').enable();
			});
			
			
			
			// 表格双击事件
			grid.on('rowdblclick', function(grid, rowIndex, event) {
				propertyDisplay();
			});
			
		
			// 是否默认选中第一行数据
			bbar.on("change", function() {
				// grid.getSelectionModel().selectFirstRow();
			});

			// 页面初始自动查询数据
			bladeStore.load({
				params : {
					start : 0,
					limit : bbar.pageSize
				}
			});

			// 表格单击事件
			grid2.on('rowclick', function(pGrid, rowIndex, event) {
				// Ext.getCmp('modifyid').enable();
				// Ext.getCmp('deleteid').enable();
			});
			// 表格双击事件
			grid2.on('rowdblclick', function(grid, rowIndex, event) {
				propertyDisplay2();
			});

			// 是否默认选中第一行数据
			bbar2.on("change", function() {
				// grid.getSelectionModel().selectFirstRow();
			});

			// 页面初始自动查询数据
			/*
			 * toolholderStore.load({ params : { start : 0, limit :
			 * bbar2.pageSize } });
			 */

			// 表格右键
			var contextmenu = new Ext.menu.Menu({
				id : 'theContextMenu',
				items : [ {
					text : '复制',
					iconCls : 'buildingIcon',
					handler : function() {
						copyCell();
					}
				}, '-', {
					text : '刷新',
					iconCls : 'arrow_refreshIcon',
					handler : function() {
						bladeStoreLoad();
					}
				}, {
					text : '重置',
					iconCls : 'tbar_synchronizeIcon',
					handler : function() {
						resetCombo();
					}
				} ]
			});

			// 复制
			function copyCell() {
				copyToClipboard(infoCell);
			}

			// 绑定右键
			var infoCell;
			grid.on("cellcontextmenu",
					function(grid, rowIndex, columnIndex, e) {// cellcontextmenu
						// //rowcontextmenu
						e.preventDefault();
						grid.getSelectionModel().selectRow(rowIndex);

						var record = grid.getStore().getAt(rowIndex); // 获取record
						var fieldName = grid.getColumnModel().getDataIndex(
								columnIndex);// 当前列的fieldname
						infoCell = record.get(fieldName);// 获取当前单元格数据

						contextmenu.showAt(e.getXY());
					});

			grid.on("contextmenu", function(e) {// cellcontextmenu
				// //rowcontextmenu
				// e.preventDefault();
			});

			// 表格右键
			var contextmenu2 = new Ext.menu.Menu({
				id : 'theContextMenu2',
				items : [ {
					text : '复制',
					iconCls : 'buildingIcon',
					handler : function() {
						copyCell2();
					}
				}, '-', {
					text : '刷新',
					iconCls : 'page_refreshIcon',
					handler : function() {
						toolholderStoreLoad();
					}
				}, {
					text : '重置',
					iconCls : 'tbar_synchronizeIcon',
					handler : function() {
						resetCombo2();
					}
				} ]
			});

			// 复制
			function copyCell2() {
				copyToClipboard(infoCell2);
			}

			// 绑定右键
			var infoCell2;
			grid2.on("cellcontextmenu", function(grid2, rowIndex, columnIndex,
					e) {// cellcontextmenu
				// //rowcontextmenu
				e.preventDefault();
				grid2.getSelectionModel().selectRow(rowIndex);

				var record2 = grid2.getStore().getAt(rowIndex); // 获取record
				var fieldName2 = grid2.getColumnModel().getDataIndex(
						columnIndex);// 当前列的fieldname
				infoCell2 = record2.get(fieldName2);// 获取当前单元格数据

				contextmenu2.showAt(e.getXY());
			});

			grid2.on("contextmenu", function(e) {// cellcontextmenu
				// //rowcontextmenu
				e.preventDefault();
			});

			var tabs = new Ext.TabPanel(
					{
						region : 'center',
						id : 'tabsid',
						enableTabScroll : true,
						// autoWidth : true,
						activeTab : 0,
						height : document.body.clientHeight,
						width : document.body.clientWidth,
						buttonAlign : 'right',
						items : [ grid, grid2 ],
						listeners : {
							tabchange : function(tabpanel, tab) {
								/*
								 * if (tab.getId() == 'gridid') {//激活了刀体grid;
								 * refreshBladeForce(); } else if(tab.getId() ==
								 * 'grid2id') { refreshToolholderForce(); }
								 */
								if (tabpanel.getActiveTab().getId() == 'gridid') {
									workpieceisotypeStoreLoad(); 
									accuracyStoreLoad();
									shapeStoreLoad();
									reliefangleStoreLoad();
									celengthStoreLoad();
									noseradiusStoreLoad();
									
									// 激活了刀体grid;
									// refreshBladeForce();
									// bladeStore.reload();
								//	bladeStoreLoad();
									{

										// var record =
										// grid2.getSelectionModel().getSelected();
										var records = grid2.getSelectionModel()
												.getSelections();
										
										if (records.length == 0) {
											bladeStoreLoad();
										} else {
											if (records.length > 1) {
												infoMsg('您选择了 '
														+ records.length
														+ ' 个条目，选择单个条目会获得准确匹配。');
											}

											// grid.getSelectionModel().selectRow(grid.getSelectionModel().last,
											// false);
											bladeStore
													.load({
														params : {
															start : bbar.pageSize
																	* (grid
																			.getBottomToolbar()
																			.getPageData().activePage - 1),
															limit : bbar.pageSize,
															featurecode : jsArray2JsString(
																	records,
																	'featurecode')
														}
													});
										}
									}

									
								} else if (tabpanel.getActiveTab().getId() == 'grid2id') {
									turningtypeStoreLoad();
									shape2StoreLoad();
									thheadangleStoreLoad();
									handoftoolStoreLoad();
									reliefangle2StoreLoad();
									portsizeStoreLoad();
									cseriesStoreLoad(); 
									boreStoreLoad();
									// toolholderStore.reload();
									// refreshToolholderForce();
								//	toolholderStoreLoad();
									{

										// grid.getSelectionModel().getSelected();
										var records = grid.getSelectionModel()
												.getSelections();

										if (records.length == 0) {
											toolholderStoreLoad();
										} else {
											if (records.length > 1) {
												infoMsg('您选择了 '
														+ records.length
														+ ' 个条目，选择单个条目会获得准确匹配。');
											}

											// grid.getSelectionModel().selectRow(grid.getSelectionModel().last,
											// false);
											toolholderStore
													.load({
														params : {
															start : bbar2.pageSize
																	* (grid2
																			.getBottomToolbar()
																			.getPageData().activePage - 1),
															limit : bbar2.pageSize,
															featurecode : jsArray2JsString(
																	records,
																	'featurecode')
														}
													});
										}
									}
								}
							}
						}
					});

			// 布局模型
			var viewport = new Ext.Viewport({
				layout : 'border',
				items : [ tabs ]
			});

			// 刷新刀片
			function refreshBlade() {
				if (parent.grf == true) {
					refreshBladeForce();
				}
			}

			// 刷新刀片
			function refreshBladeForce() {
				bladeStoreLoad();
			}

			// 刷新刀体
			function refreshToolholder() {
				if (parent.grf == true) {
					refreshToolholderForce();
				}
			}

			function refreshToolholderForce() {
				toolholderStoreLoad();
			}

			// 更新
			function resetCombo() {

				workpieceisotypeCombo.reset();
				accuracyCombo.reset();
				workpieceisotypeStoreLoad();
				accuracyStoreLoad();
				shapeStoreLoad();
				
				reliefangleStoreLoad();
				shapeCombo.setValue('');
				// shapeCombo.reset();
				reliefangleCombo.setValue('');
				// reliefangleCombo.reset();

				celengthCombo.reset();
				celengthCombo.disable();

				noseradiusCombo.reset();

				shapeCombo2.setValue('');
				// shapeCombo2.reset();
				reliefangleCombo2.setValue('');
				// reliefangleCombo2.reset();

				// bladeStore.reload();

				/*
				 * .load({ params : { workpieceisotype : '', accuracyid : '',
				 * shape : '', reliefangle : '', celength : '', noseradius : '' }
				 * });
				 */

				/*
				 * toolholderStore.load({ params : { turningtype :
				 * turningtypeCombo.getValue(), thheadangle :
				 * thheadangleCombo.getValue(), handoftool :
				 * handoftoolCombo.getValue(), portsize :
				 * portsizeCombo.getValue(), cseries : cseriesCombo.getValue(),
				 * shapeblade : '', reliefangleblade : '' } });
				 */
				
				
				pagesize_combo.reset();
				bbar.pageSize=50;
				bladeStoreLoad();
				celengthStoreLoad();
				noseradiusStoreLoad();
				var currentpage=1;
				var currentpage=bbar.store.currentPage;
				bbar.moveFirst();

			}

			// 更新
			function resetCombo2() {
				turningtypeCombo.reset();
				thheadangleCombo.reset();
				handoftoolCombo.reset();
				portsizeCombo.reset();
				cseriesCombo.reset();

				shapeCombo2.setValue('');
				// shapeCombo2.reset();
				reliefangleCombo2.setValue('');
				// reliefangleCombo2.reset();

				boreCombo.reset();
				boreCombo.hide();
				Ext.getCmp('borelableid').hide();

				shapeCombo.setValue('');
				// shapeCombo.reset();
				reliefangleCombo.setValue('');
				// shapeCombo.reset();

				celengthCombo.setValue('');
				celengthCombo.disable();
				/*
				 * bladeStore.load({ params : { workpieceisotype :
				 * workpieceisotypeCombo.getValue(), accuracyid :
				 * accuracyCombo.getValue(), shape : '', reliefangle : '',
				 * celength : celengthCombo.getValue(), noseradius :
				 * noseradiusCombo.getValue() } });
				 */

				// toolholderStore.reload();
				/*
				 * .load({ params : { turningtype : '', thheadangle : '',
				 * handoftool : '', portsize : '', cseries : '', shapeblade :
				 * '', reliefangleblade : '' } });
				 */
				
				
				pagesize_combo2.reset();
				bbar2.pageSize=50;
				
				toolholderStoreLoad();
				turningtypeStoreLoad();
				thheadangleStoreLoad();
				handoftoolStoreLoad();
				shape2StoreLoad();
				reliefangle2StoreLoad();
				portsizeStoreLoad();
				cseriesStoreLoad();
				boreStoreLoad();
				var currentpage=1;
				var currentpage=bbar2.store.currentPage;
				bbar2.moveFirst();

			}

			// 数据动态加载
			function dataLoadDynamic(pictureTabs, cuttingparameter,toolholderPanel,toolholderStorePanel,parameterStore,sapPanel,sapStore) {
				var record = grid.getSelectionModel().getSelected();

				if (pictureTabs.getActiveTab().getItemId() == 'toolholderPanelid') {
					toolholderStorePanel.load({
						params : {
							featurecode : record.data.featurecode
						}
					});
				} else if (pictureTabs.getActiveTab().getItemId() == 'ctparameterid') {
				parameterStore.load({
						params : {workpiecematerialid : workpieceisotypeCombo.getValue(),
							bladematerialid : record.data.bladematerialid,
							grooveid : record.data.grooveid,
							bladetype : record.data.bladetype
						}
					});}else if (pictureTabs.getActiveTab().getItemId() == 'picturePanelid') {
						var newsrc =checkImagePath(record.data.figure);
						Ext.getCmp('boxid').getEl().dom.src = newsrc;
						}
					else if (pictureTabs.getActiveTab().getItemId() == 'sizePanelid') {
					
						var newsrc =checkImagePath(record.data.figure2);
						Ext.getCmp('boxid2').getEl().dom.src = newsrc;

						}
					else if (pictureTabs.getActiveTab().getItemId() == 'picturePanel2id') {
						var newsrc =checkImagePath(record.data.figure);
						Ext.getCmp('boxid3').getEl().dom.src = newsrc;
						}
					else if (pictureTabs.getActiveTab().getItemId() == 'sizePanel2id') {
					
						var newsrc =checkImagePath(record.data.figure2);
						Ext.getCmp('boxid4').getEl().dom.src = newsrc;

						}
				else if (pictureTabs.getActiveTab().getItemId() == 'sapPanelid') {
						sapStore.load({
						params : {
							sapcode : record.data.sapcode
						}
					});}
			}

			// 查看刀片详细信息;
			function propertyDisplay() {
				var record = grid.getSelectionModel().getSelected();
				var index = grid.getStore().indexOf(record);

				var path = checkImagePath(record.data.figure);
				var path2 = checkImagePath(record.data.figure2);
				
			//	品牌跳转
				  var brandStore = new Ext.data.GroupingStore({
						proxy : new Ext.data.HttpProxy({
							url : 'generalturning.do?code=querybrand'
								
							}),
						reader : new Ext.data.JsonReader({
									totalProperty : 'TOTALCOUNT',
									root : 'ROOT'
								}, [{
									name : 'name'
								}, {
									name : 'alias'
								}, {
									name : 'nation'
								}, {
									name : 'office'
								},{
									name : 'address'
								}, {
									name : 'telephone'
										},
										{
											name : 'brandfeature'
												},
										{
											name : 'remark1'
												},{
											name : 'figure'
												}])
					});
					
				 
			
				   brandStore.load({
						
						params : {
							
							name : record.data.bladebrandname
						}
					});
				
					
				  // var brandpath = 'dec/image/brand/SANDVIK.jpg'
				var brandgrid = new Ext.grid.PropertyGrid({
					//title : '品牌详情',
					border : false,
					//autoSort : false,
					frame : true,
					region : 'center',
					//store : brandStore,
					width : 200,
					hideBorders:true,
					//modal : true,
					
					autoSort : false,
				
					cm : bladeCm,
				
					enableColLock : true,
					enableColumnMove : false,
					autoExpandColumn : true,
					loadMask : true,
					stripeRows : true,
					autoScroll : true,
					clicksToEdit : 1,
					
					height : 140,
					id : 'brandgridid',
					//enableColLock : true,
					//enableColumnMove : false,
					//autoExpandColumn : true,
					//loadMask : true,
					//stripeRows : true,
					//autoScroll : true,
					//clicksToEdit : 1,
					/*source : {
						
						
						 "品牌名称": '',  
		                   "别名": '',  
		                   "国家": '',  
		                   "公司": '',  
		                   "地址": '' ,
		                   "电话": '' ,
		                   "特点": '' 
		                   
						
						
					}*/
					listeners:{
						beforeedit : function(e) {
						e.cancel = true;
						return false;
					}}
					
					
				});
				
				
		
				
				var brandDisplayWin = new Ext.Window(
						{
							//title : '品牌详情',
							/*x:((document.body.clientWidth)/numlign-divnum)*2+130,
							y:(document.body.clientWidth)*(1/11),*/
							id:'brandDisplayWinid',
							width : 400,
							//modal : true,
							frame:true,
							layout : 'border',
							height : 280,
							//frame:true,
							//bodyBorder :false,
							 //baseCls: 'my-panel-no-border',
						    //baseCls: 'x-plain', 
					        //border:false,
							closeAction : 'hide',
							maximizable : false,
							closable:false,
							
							
						               
						     items: [ brandgrid,{
									id: 'boxid9',
									region : 'east',
									xtype : 'box',
									autoEl : {
										tag : 'img',
										style : 'width:50%;height:50%;' ,
										src : ''
									}
									
								},{
									   xtype: "textarea",
					                    fieldLabel: "特点",
					                    region : 'south',
					                    id: "brandmemo",
					                    height:140,
					                    readOnly:true,
					                    emptyText:'数据完善中……',
					                    textfield:'11',
					                    width: 330
					                  
									
								}
						            
						        ],
						       
							
							listeners : {}
								
							});
			
				
         //				槽型跳转
				
				
				  var  groovestyleStore = new Ext.data.GroupingStore({
						proxy : new Ext.data.HttpProxy({
							url : 'generalturning.do?code=querygroove'
								
							}),
						reader : new Ext.data.JsonReader({
									totalProperty : 'TOTALCOUNT',
									root : 'ROOT'
								}, [{
									name : 'name'
								}, {
									name : 'accuracyid'
								},{
									name : 'brandid'
								}, {
									name : 'application'
								}, {
									name : 'remark'
								},{
											name : 'figure'
												}])
					});
					
				 
			
				  groovestyleStore.load({
						
						params : {
							
							name : record.data.groovename
						}
					});
				
					
				  // var brandpath = 'dec/image/brand/SANDVIK.jpg'
				var groovestylegrid = new Ext.grid.PropertyGrid({
					//title : '品牌详情',
					border : false,
					//autoSort : false,
					frame : true,
					region : 'center',
					//store : brandStore,
					width : 200,
					hideBorders:true,
					//modal : true,
					height :200,
					clicksToEdit : 1,
					enableColLock : true,
					enableColumnMove : false,
					id : ' groovestylegridid',
					//enableColLock : true,
					//enableColumnMove : false,
					//autoExpandColumn : true,
					//loadMask : true,
					//stripeRows : true,
					//autoScroll : true,
					//clicksToEdit : 1,
					/*source : {
						
						
						 "品牌名称": '',  
		                   "别名": '',  
		                   "国家": '',  
		                   "公司": '',  
		                   "地址": '' ,
		                   "电话": '' ,
		                   "特点": '' 
		                   
						
						
					}*/
					listeners:{
						beforeedit : function(e) {
						e.cancel = true;
						return false;
					}}
					
					
				});
				
				
		
				
				var groovestyleDisplayWin = new Ext.Window(
						{
							//title : '品牌详情',
							/*x:((document.body.clientWidth)/numlign-divnum)*2+130,
							y:(document.body.clientWidth)*(1/11),*/
							id:'groovestyleDisplayWinid',
							width : 350,
							//modal : true,
							frame:true,
							clicksToEdit : 1,
							layout : 'border',
							height : 200,
							//frame:true,
							//bodyBorder :false,
							 //baseCls: 'my-panel-no-border',
						    //baseCls: 'x-plain', 
					        //border:false,
							closeAction : 'hide',
							maximizable : false,
							closable:false,
							
							
						               
						     items: [  groovestylegrid,{
									id: 'boxid10',
									region : 'east',
									xtype : 'box',
									autoEl : {
										tag : 'img',
										style : 'width:42%;height:100%;' ,
										src : ''
									}
									
								}
						            
						        ],
						       
							
							listeners : {}
								
							});
				
				
				
				
//				材质跳转		
				
				
		
				
				  var  materailStore = new Ext.data.GroupingStore({
						proxy : new Ext.data.HttpProxy({
							url : 'generalturning.do?code=querymaterail'
								
							}),
						reader : new Ext.data.JsonReader({
									totalProperty : 'TOTALCOUNT',
									root : 'ROOT'
								}, [{
									name : 'name'
								}, {
									name : 'isotype'
								},{
									name : 'brandid'
								}, {
									name : 'coatingtype'
								}, {
									name : 'coating'
								},{
									name : 'priority'
								},{
									name : 'application	'
								},{
									name : 'remark'}])
					});
					
				 
			
				  materailStore.load({
						
						params : {
							
							name : record.data.bladematerialname
						}
					});
				
					
				  // var brandpath = 'dec/image/brand/SANDVIK.jpg'
				var materailgrid = new Ext.grid.PropertyGrid({
					//title : '品牌详情',
					border : false,
					//autoSort : false,
					frame : true,
					clicksToEdit : 1,
					enableColLock : true,
					enableColumnMove : false,
					region : 'center',
					//store : brandStore,
					width : 200,
					hideBorders:true,
					//modal : true,
					height :200,
					id : ' materailgridid',
					//enableColLock : true,
					//enableColumnMove : false,
					//autoExpandColumn : true,
					//loadMask : true,
					//stripeRows : true,
					//autoScroll : true,
					//clicksToEdit : 1,
					/*source : {
						
						
						 "品牌名称": '',  
		                   "别名": '',  
		                   "国家": '',  
		                   "公司": '',  
		                   "地址": '' ,
		                   "电话": '' ,
		                   "特点": '' 
		                   
						
						
					}*/
					listeners:{
						beforeedit : function(e) {
						e.cancel = true;
						return false;
					}}
					
					
				});
				
			
		
				
				var materailDisplayWin = new Ext.Window(
						{
							//title : '品牌详情',
							/*x:((document.body.clientWidth)/numlign-divnum)*2+130,
							y:(document.body.clientWidth)*(1/11),*/
							id:'materailDisplayWinid',
							width : 200,
							//modal : true,
							frame:true,
							layout : 'border',
							height : 200,
							//frame:true,
							//bodyBorder :false,
							 //baseCls: 'my-panel-no-border',
						    //baseCls: 'x-plain', 
					        //border:false,
							closeAction : 'hide',
							maximizable : false,
							closable:false,
							
							
						               
						     items: [  materailgrid
								
						            
						        ]
						       
							
						     
							});
				
				
				
				
				
				
				
				var propertygrid = new Ext.grid.PropertyGrid({
					title : '刀片详情',
					border : true,
					autoSort : false,
					frame : true,
				//	ds : bladeStore,
					cm : bladeCm,
					id : 'propertyGridid',
					enableColLock : true,
					enableColumnMove : false,
					autoExpandColumn : true,
					loadMask : true,
					stripeRows : true,
					autoScroll : true,
					clicksToEdit : 1,
					propertyNames : {
						'bladeid' : '刀片ID',
						'sapcode' : 'SAP编码',
						'name' : '刀片名称',
						'bladetype' : '刀片型号',
						'figure' : '结构简图',
						'figure2' : '尺寸简图',
						'turningtype' : '车削类型',
						'bladematerialname' : '刀片材质',
			//			'bladematerialid' : '刀片材质ID',
						'groovename' : '槽型',
						'grooveid' : '槽型ID',
						'bladebrandname' : '刀片品牌',
						'brandid' : '刀片品牌ID',
						'reliefangle' : '刀片后角',
						'shape' : '刀片形状',
						'celength' : '刀片尺寸',
						'noseradius' : '刀尖圆弧半径',
						'thickness' : '刀片厚度',
						'description' : '特征描述',
						'featurecode' : '刀片特征码',
						'apmax' : '最大切削深度',
						'apmin' : '最小切削深度',
						'fnmax' : '最大切削进给',
						'fnmin' : '最小切削进给',
						'remark' : '备注'
					},
					customEditors : {
						'turningtype' : new Ext.grid.GridEditor(
								new Ext.form.ComboBox({
									displayField : 'text',
									mode : 'local',
									triggerAction : 'all',
									store : TURNINGTYPEStore
								})),
						'reliefangle' : new Ext.grid.GridEditor(
								new Ext.form.ComboBox({
									displayField : 'text',
									mode : 'local',
									triggerAction : 'all',
									store : RELIEFANGLEStore
								})),
						'shape' : new Ext.grid.GridEditor(
								new Ext.form.ComboBox({
									displayField : 'text',
									mode : 'local',
									triggerAction : 'all',
									store : SHAPEStore
								})),
						'celength' : new Ext.grid.GridEditor(
								new Ext.form.ComboBox({
									displayField : 'text',
									mode : 'local',
									triggerAction : 'all',
									store : CELENGTHStore
								})),
						'noseradius' : new Ext.grid.GridEditor(
								new Ext.form.ComboBox({
									displayField : 'text',
									mode : 'local',
									triggerAction : 'all',
									store : NOSERADIUSStore
								})),
						'thickness' : new Ext.grid.GridEditor(
								new Ext.form.ComboBox({
									displayField : 'text',
									mode : 'local',
									triggerAction : 'all',
									store : THICKNESS2Store
								}))
					},
					customRenderers : {
						'turningtype' : TURNINGTYPERender,
						'reliefangle' : RELIEFANGLERender,
						'shape' : SHAPERender,
						'celength' : CELENGTHRender,
						'noseradius' : NOSERADIUSRender,
						'thickness' : THICKNESS2Render
					},
					listeners : {
						
						rowclick :function(propertygrid, rowIndex, columnIndex, e) {
							var store = propertygrid.getStore();
							var record = store.getAt(rowIndex);
						if(record.data.name=="刀片材质"&&record.data.value!==""){

							materailgrid.setSource({
								  "材质名称": materailStore.getAt(0).get('name'), 
								   'ISO分类': materailStore.getAt(0).get('isotype'),
								   '材质品牌': materailStore.getAt(0).get('brandid'),
								   '涂层类型': materailStore.getAt(0).get('coatingtype'),
								   '涂层': materailStore.getAt(0).get('coating'),
								   "用途": materailStore.getAt(0).get('application'),  
								   "备注": materailStore.getAt(0).get('remark') 
								    }
								   );			     
						
							
							materailDisplayWin.show();}
						else if(record.data.name=="槽型"&&record.data.value!==""){
							groovestylegrid.setSource({
								  "名称": groovestyleStore.getAt(0).get('name'), 
								   '加工类型': groovestyleStore.getAt(0).get('accuracyid'),
								   '槽型品牌': groovestyleStore.getAt(0).get('brandid'),
								   "用途": groovestyleStore.getAt(0).get('application'),  
								   "备注": groovestyleStore.getAt(0).get('remark') 
								    }
								   );			     
							groovestyleDisplayWin.show()
							document.getElementById('boxid10').src=checkImagePath(groovestyleStore.getAt(0).get('figure'));					
							}
					else if (record.data.name=="刀片品牌"&&record.data.value!==""){
						
							brandgrid.setSource({
								
								  "品牌名称": brandStore.getAt(0).get('name'), 
								   '别名': brandStore.getAt(0).get('alias'),
								   "国家": brandStore.getAt(0).get('nation'),  
								   "公司": brandStore.getAt(0).get('office'),  
								   "地址": brandStore.getAt(0).get('address'),  
								   "电话": brandStore.getAt(0).get('telephone'),
								   "备注": brandStore.getAt(0).get('remark1')  }
								   );			     
						    brandDisplayWin.show();	
							document.getElementById('boxid9').src=checkImagePath(brandStore.getAt(0).get('figure'));
							Ext.getCmp('brandmemo').setValue(brandStore.getAt(0).get('brandfeature'))
					}}
				,
						beforeedit : function(e) {
							e.cancel = true;
							return false;
						}
					}
				});
				/*var ctparameterPropertyGrid = new Ext.grid.PropertyGrid({
					title : '切削参数',
					border : true,
					frame : true,
					tabTip : '切削参数不可用时，请先选择材料牌号。',
					id : 'ctparameterid',
					loadMask : true,
					propertyNames : {
						// 'parametersid' : '切削参数ID',
						// 'workpiecematerialid' : '工件材料代码ID',
						// 'bladematerialid' : '刀片材质ID',
						'workpiecematerialname' : '工件材料代码',
						'bladematerialname' : '刀片材质',
						'vcmax' : '最大切削速度(m/min)',
						'vcmin' : '最小切削速度(m/min)'
					},
					listeners : {
						beforeedit : function(e) {
							e.cancel = true;
							return false;
						}
					}
				});*/
               var parameterStore = new Ext.data.GroupingStore({
					proxy : new Ext.data.HttpProxy({
						url : 'generalturning.do?code=queryCtparameter'
							// queryMilling_blade_clamp4Manage是在TempletmillingAction中的方法queryMilling_blade_clamp4Manage;
						}),
					reader : new Ext.data.JsonReader({
								totalProperty : 'TOTALCOUNT',
								root : 'ROOT'
							}, [{
								name : 'apmin'
							}, {
								name : 'apmax'
							}, {
								name : 'fnmax'
							}, {
								name : 'fnmin'
							},{
								name : 'vcmax'
							}, {
								name : 'vcmin'
									}])
				});
              
				// 列模型
		var parameterCm = new Ext.grid.ColumnModel([{
					header :'Vc max<br />(m/min)',
					dataIndex : 'vcmax',
					width : 70,
					align : 'center',
					// hidden : true,
					sortable : true
				}, {
					header : 'Vc min<br />(m/min)',
					dataIndex : 'vcmin',
					width : 70,
					align : 'center',
					// hidden : true,
					sortable : true
				},{
					header : 'Ap max<br />(mm)',
					dataIndex : 'apmax',
					width : 50,
					align : 'center',
					// renderer : THICKNESS2Render,
					// hidden : true,
					sortable : true
				}, {
					header : 'Ap min<br />(mm)',
					dataIndex : 'apmin',
					width : 50,
					align : 'center',
					// hidden : true,
					sortable : true
				}, {
					header : 'Fn max<br />(mm/r)',
					dataIndex : 'fnmax',
					width : 50,
					align : 'center',
					// renderer : THICKNESS2Render,
					// hidden : true,
					sortable : true
				}, {
					header : 'Fn min<br />(mm/r)',
					dataIndex : 'fnmin',
					width : 50,
					align : 'center',
					// hidden : true,
					sortable : true
				}]);
		
		/*var XXDisplayWin = new Ext.Window(
				{
					title : '切削参数计算',
					width : 200,
					modal : true,
					height : 200,
					closeAction : 'hide',
					maximizable : true,
					// plain : true,
					
					
				               
				     items: [ {
				                        fieldLabel: "XX" ,xtype: "textfield"
				                    }
				            
				            
				        ],
				       
					buttons : [
							 {
								text : '保存',
								id : 'savebtn',
								hidden : true,
								iconCls : 'acceptIcon',
								handler : function() {

								}
							}, {
								text : '关闭',
								id : 'cancelbtn',
								iconCls : 'cancelIcon',
								handler : function() {
									XXDisplayWin.close();
								}
							} ],
					listeners : {
						
						},
						
					});
				*/
               var cuttingparameter = new Ext.grid.GridPanel({
					title		: '切削参数',
					header		: false,
					id : 'ctparameterid',
					height		: 500,
					// id : 'grid2id',
			
					autoScroll	: true,
					frame		: true,
					disabled	: true,
					region		: 'center',
					store : parameterStore,
					stripeRows	: true,
					// sm : sm2,
					cm : parameterCm,
					// tbar : tbar2,
					// bbar : bbar2,
					viewConfig	: {
						forceFit	: false
						// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
					},
					
					
					/*buttons : [{
					text : 'XX计算',
					id : 'XX2',
					iconCls : 'app_leftIcon',
					handler : function()
					{
						XXDisplayWin.show();
						}

						
				}],*/
					loadMask	: {
						msg	: '正在加载表格数据,请稍等...'
					}
						// view : new Ext.grid.GroupingView(),
						// plugins : [filtersToolholder],
						// stateful : true,
						// stateId : 'grid-cut-toolholder'
					}	// TODO
				);
             
               
				var picturePanel = new Ext.Panel({
					title : '结构简图',
					 id : 'picturePanelid',
					autoScroll : true,
					frame : true,
					region : 'center',
					// sm : sm2,
					// cm : toolholderCm,
					// tbar : tbar2,
					// bbar : bbar2,
					viewConfig : {
						forceFit : true
					// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
					},
					loadMask : {
						msg : '正在加载图像数据,请稍等...'
					},
					items : [ {
						id: 'boxid',
						xtype : 'box',
						autoEl : {
							tag : 'img',
							style : 'width:80%;height:80%;position:relative;top:10%;left:10%' ,
							src : path
						}
					} ]
				// view : new Ext.grid.GroupingView(),
				// plugins : [filtersToolholder],
				// stateful : true,
				// stateId : 'grid-generalturning-toolholder'
				});
				
				picturePanel.on('render',function(){
		         	   picturePanel.getEl().on('dblclick',function(){
		         	     alert('double click');
		         	   })
		         	        },this); 
				
				var sizePanel = new Ext.Panel({
					title : '尺寸简图',
					 id : 'sizePanelid',
					autoScroll : true,
					frame : true,
					region : 'center',
					// sm : sm2,
					// cm : toolholderCm,
					// tbar : tbar2,
					// bbar : bbar2,
					viewConfig : {
						forceFit : true
					// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
					},
					loadMask : {
						msg : '正在加载图像数据,请稍等...'
					},
					items : [ {
						id: 'boxid2',
						xtype : 'box',
						autoEl : {
							tag : 'img',
							style : 'width:80%;height:80%;position:relative;top:10%;left:10%',
							src : path2
						}
					} ]
				// view : new Ext.grid.GroupingView(),
				// plugins : [filtersToolholder],
				// stateful : true,
				// stateId : 'grid-generalturning-toolholder'
				});

				var toolholderStorePanel = new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
						url : 'generalturning.do?code=queryToolholder4Manage'
					// queryToolholder4Manage是在ToolholderAction中的方法queryToolholder4Manage;
					}),
					reader : new Ext.data.JsonReader({
						totalProperty : 'TOTALCOUNT',
						root : 'ROOT'
					}, [ {
						name : 'sapcode'
					}, {
						name : 'name'
					}, {
						name : 'toolholdertype'
					}, {
						name : 'toolholderbrandname'
					}, {
						name : 'featurecode'
					} ])
				});

				// 匹配刀体表格
				var toolholderPanel = new Ext.grid.GridPanel({
					title : '匹配刀体',
					// header : false,
					autoScroll : true,
					id : 'toolholderPanelid',
					// disabled : true,
					frame : true,
					region : 'center',
					store : toolholderStorePanel,
					stripeRows : true,
					// sm : sm2,
					cm : new Ext.grid.ColumnModel([ new Ext.grid.RowNumberer({
						header : '序',
						width : 26
					}), {
						header : 'SAP编码',
						dataIndex : 'sapcode',
						width : 60,
						sortable : true
					},  {
						header : '刀体名称',
						dataIndex : 'name',
						width : 100,
						sortable : true
					// hidden : true
					}, {
						header : '刀体型号',
						dataIndex : 'toolholdertype',
						width : 130,
						// hidden : true,
						sortable : true
					}, {
						header : '刀体品牌',
						dataIndex : 'toolholderbrandname',
						// hidden : true,
						width : 80,
						sortable : true
					}, {
						header : '刀片形式',
						dataIndex : 'featurecode',
						width : 80,
						sortable : true
					} ]),
					// tbar : tbar2,
					// bbar : bbar2,
					viewConfig : {
						forceFit : true
					// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
					},
					loadMask : {
						msg : '正在加载表格数据,请稍等...'
					}
				});
				
				var sapStore = new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
						url : 'generalturning.do?code=querySapinformation'
					// queryToolholder4Manage是在ToolholderAction中的方法queryToolholder4Manage;
					}),
					reader : new Ext.data.JsonReader({
						totalProperty : 'TOTALCOUNT',
						root : 'ROOT'
					}, [ {
						name : 'id'
					}, {
						name : 'departmentid'
					}, {
						name : 'storagelocation'
					} , {
						name : 'sapcode'
					}, {
						name : 'description'
					}, {
						name : 'position'
					}, {
						name : 'unit'
					}, {
						name : 'price'
					}, {
						name : 'amount'
					}, {
						name : 'worth'
					}, {
						name : 'time'
					}])
				});
				
				// 库存表格
				var sapPanel = new Ext.grid.GridPanel({
					title : '库存信息',
					// header : false,
					autoScroll : true,
					id : 'sapPanelid',
					// disabled : true,
					frame : true,
					region : 'center',
					store : sapStore,
					stripeRows : true,
					// sm : sm2,
					cm : new Ext.grid.ColumnModel([ new Ext.grid.RowNumberer({
						header : '序',
						width : 26
					}), {
						header : '编号',
						dataIndex : 'id',
						width : 60,
						hidden : true,
						sortable : true
						
					}, {
						header : '部门编号',
						dataIndex : 'departmentid',
						width : 100,
						// hidden : true,
						sortable : true
					}, {
						header : '库存地点',
						dataIndex : 'storagelocation',
						width : 100,
						sortable : true
					} , {
						header : 'SAP编码',
						dataIndex : 'sapcode',
						width : 100,
						sortable : true
					}, {
						header : '物料描述',
						dataIndex : 'description',
						width : 130,
						// hidden : true,
						sortable : true
					}, {
						header : '仓位',
						dataIndex : 'position',
						width : 80,
						sortable : true
					} , {
						header : '基本计量单位',
						dataIndex : 'unit',
						width : 60,
						hidden : true,
						sortable : true
					}, {
						header : '单价',
						dataIndex : 'price',
						width : 130,
						hidden : true,
						sortable : true
					}, {
						header : '库存数量',
						dataIndex : 'amount',
						width : 80,
						sortable : true
					} , {
						header : '库存价值',
						dataIndex : 'worth',
						width : 130,
						hidden : true,
						sortable : true
					}, {
						header : '更新时间',
						dataIndex : 'time',
						width : 80,
						sortable : true
					} ]),
					// tbar : tbar2,
					// bbar : bbar2,
					viewConfig : {
						forceFit : true
					// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
					},
					loadMask : {
						msg : '正在加载表格数据,请稍等...'
					}
				});

				var propertyTabs = new Ext.TabPanel({
					region : 'center',
					id : 'propertytabsid',
					enableTabScroll : true,
					// autoWidth : true,
					activeTab : 0,
					height : document.body.clientHeight,
					// width : document.body.clientWidth / 4,
					// width : 400,
					buttonAlign : 'right',
					items : [ propertygrid ]
				/*
				 * , listeners : { tabchange : function(tabpanel, tab) { } }
				 */
				});

				var pictureTabs = new Ext.TabPanel({
					region : 'east',
					split : true,
					enableTabScroll : true,
					width : '60%',
					// collapsible: true,
					// margins:'3 0 3 3',
					// cmargins:'3 3 3 3',
					activeTab : 0,
					height : document.body.clientHeight,
					// width : document.body.clientWidth / 4,
					buttonAlign : 'right',
					items : [picturePanel, sizePanel, 
							toolholderPanel ,sapPanel,cuttingparameter ],
					listeners : {
						tabchange : function(tabpanel, tab) {
							dataLoadDynamic(tabpanel, cuttingparameter,toolholderPanel,toolholderStorePanel,parameterStore,sapPanel,sapStore);
						}
					}
				});

				var propertyDisplayWin = new Ext.Window(
						{
							title : '刀片详细信息',
							width : 800,
							modal : true,
							height : 400,
							closeAction : 'close',
							maximizable : true,
							closable:false,
							// plain : true,
							layout : 'border',
							items : [ propertyTabs, pictureTabs ],
							buttons : [
									/*{
										text : '打印',
										id : 'printbtn',
										iconCls : 'app_leftIcon',
										handler:function(){ 
										       printGrid(stat1_grid);
										}
									},*/
									
									{
										text : '上一条',
										id : 'previousbtn',
										iconCls : 'app_leftIcon',
										handler : function() {
											grid.getSelectionModel().selectRow(
													index - 1);
											grid.getView().focusRow(index - 1);
											index = index - 1;
											if (index <= 0) {
												infoMsg('已经到第一条了.');
												// grid.getSelectionModel().selectRow(index
												// + 1);
												// grid.getView().focusRow(index
												// + 1);
												index = 0;
												record = grid.getStore().getAt(
														index);
												propertygrid.setSource({
													'SAP编码':	record.data.sapcode,
													'刀片名称':	record.data.name,
													'刀片型号':	record.data.bladetype,
													'车削类型':	record.data.turningtype,
													'刀片材质':	record.data.bladematerialname,
													
													'槽型':	record.data.groovename,
												
													'刀片品牌':	record.data.bladebrandname,
												
													'刀片后角':	record.data.reliefangle,
													'刀片形状':	record.data.shape,
													'刀片尺寸':	record.data.celength,
													'刀尖圆弧半径':	record.data.noseradius,
													'刀片厚度':	record.data.thickness,
													
													'刀片特征码':	record.data.featurecode,
													'最大切削深度(mm)':	record.data.apmax,
													'最小切削深度(mm)':	record.data.apmin,
													'最大切削进给(mm/r)':	record.data.fnmax,
													'最小切削进给(mm/r)':	record.data.fnmin,
													'特征描述':	record.data.description,
													'备注':	record.data.remark});
												Ext.getCmp('previousbtn')
														.disable();
											} else {
												record = grid.getStore().getAt(
														index);
												propertygrid.setSource({
													'SAP编码':	record.data.sapcode,
													'刀片名称':	record.data.name,
													'刀片型号':	record.data.bladetype,
													'车削类型':	record.data.turningtype,
													'刀片材质':	record.data.bladematerialname,
													
													'槽型':	record.data.groovename,
												
													'刀片品牌':	record.data.bladebrandname,
												
													'刀片后角':	record.data.reliefangle,
													'刀片形状':	record.data.shape,
													'刀片尺寸':	record.data.celength,
													'刀尖圆弧半径':	record.data.noseradius,
													'刀片厚度':	record.data.thickness,
													
													'刀片特征码':	record.data.featurecode,
													'最大切削深度(mm)':	record.data.apmax,
													'最小切削深度(mm)':	record.data.apmin,
													'最大切削进给(mm/r)':	record.data.fnmax,
													'最小切削进给(mm/r)':	record.data.fnmin,
													'特征描述':	record.data.description,
													'备注':	record.data.remark});
												Ext.getCmp('nextbtn').enable();
											}
											  brandStore.load({
													
													params : {
														
														name : record.data.bladebrandname
													}
												});
											  groovestyleStore.load({
													
													params : {
														
														name : record.data.groovename
													}
												});
											  materailStore.load({
													
													params : {
														
														name : record.data.bladematerialname
													}
												});
											
											dataLoadDynamic(pictureTabs,
													cuttingparameter,toolholderPanel,toolholderStorePanel,parameterStore,sapPanel,sapStore);
										}
									},
									{
										text : '下一条',
										id : 'nextbtn',
										iconCls : 'app_rightIcon',
										handler : function() {
											grid.getSelectionModel().selectRow(
													index + 1);
											grid.getView().focusRow(index + 1);
											index = index + 1;
											if (index >= grid.getStore()
													.getCount() - 1) {
												infoMsg('已经到最后一条了.');
												// grid.getSelectionModel().selectRow(index
												// - 1);
												// grid.getView().focusRow(index
												// - 1);
												index = grid.getStore()
														.getCount() - 1;
												record = grid.getStore().getAt(
														index);
												propertygrid.setSource({
													'SAP编码':	record.data.sapcode,
													'刀片名称':	record.data.name,
													'刀片型号':	record.data.bladetype,
													'车削类型':	record.data.turningtype,
													'刀片材质':	record.data.bladematerialname,
													
													'槽型':	record.data.groovename,
													
													'刀片品牌':	record.data.bladebrandname,
													
													'刀片后角':	record.data.reliefangle,
													'刀片形状':	record.data.shape,
													'刀片尺寸':	record.data.celength,
													'刀尖圆弧半径':	record.data.noseradius,
													'刀片厚度':	record.data.thickness,
													
													'刀片特征码':	record.data.featurecode,
													'最大切削深度(mm)':	record.data.apmax,
													'最小切削深度(mm)':	record.data.apmin,
													'最大切削进给(mm/r)':	record.data.fnmax,
													'最小切削进给(mm/r)':	record.data.fnmin,
													'特征描述':	record.data.description,
													'备注':	record.data.remark});
												Ext.getCmp('nextbtn').disable();
											} else {
												record = grid.getStore().getAt(
														index);
												propertygrid.setSource({
													'SAP编码':	record.data.sapcode,
													'刀片名称':	record.data.name,
													'刀片型号':	record.data.bladetype,
													'车削类型':	record.data.turningtype,
													'刀片材质':	record.data.bladematerialname,
													
													'槽型':	record.data.groovename,
													
													'刀片品牌':	record.data.bladebrandname,
													
													'刀片后角':	record.data.reliefangle,
													'刀片形状':	record.data.shape,
													'刀片尺寸':	record.data.celength,
													'刀尖圆弧半径':	record.data.noseradius,
													'刀片厚度':	record.data.thickness,
													
													'刀片特征码':	record.data.featurecode,
													'最大切削深度(mm)':	record.data.apmax,
													'最小切削深度(mm)':	record.data.apmin,
													'最大切削进给(mm/r)':	record.data.fnmax,
													'最小切削进给(mm/r)':	record.data.fnmin,
													'特征描述':	record.data.description,
													'备注':	record.data.remark});
												Ext.getCmp('previousbtn')
														.enable();
											}
											  brandStore.load({
													
													params : {
														
														name : record.data.bladebrandname
													}
												});
											  groovestyleStore.load({
													
													params : {
														
														name : record.data.groovename
													}
												});
											  materailStore.load({
													
													params : {
														
														name : record.data.bladematerialname
													}
												});
											

											dataLoadDynamic(pictureTabs,
													cuttingparameter,toolholderPanel,toolholderStorePanel,parameterStore,sapPanel,sapStore);
										}
									}, {
										text : '保存',
										id : 'savebtn',
										hidden : true,
										iconCls : 'acceptIcon',
										handler : function() {

										}
									}, {
										text : '关闭',
										id : 'cancelbtn',
										iconCls : 'cancelIcon',
										handler : function() {
											propertyDisplayWin.close();
											brandDisplayWin.close();
											groovestyleDisplayWin.close();
											materailDisplayWin.close();
											
										}
									} ],
							listeners : {
								afterrender : function(tabpanel, tab) {
									propertygrid.setSource({
										'SAP编码':	record.data.sapcode,
										'刀片名称':	record.data.name,
										'刀片型号':	record.data.bladetype,
										'车削类型':	record.data.turningtype,
										'刀片材质':	record.data.bladematerialname,
										
										'槽型':	record.data.groovename,
										
										'刀片品牌':	record.data.bladebrandname,
										
										'刀片后角':	record.data.reliefangle,
										'刀片形状':	record.data.shape,
										'刀片尺寸':	record.data.celength,
										'刀尖圆弧半径':	record.data.noseradius,
										'刀片厚度':	record.data.thickness,
									
										'刀片特征码':	record.data.featurecode,
										'最大切削深度(mm)':	record.data.apmax,
										'最小切削深度(mm)':	record.data.apmin,
										'最大切削进给(mm/r)':	record.data.fnmax,
										'最小切削进给(mm/r)':	record.data.fnmin,
										'特征描述':	record.data.description,
										'备注':	record.data.remark});
								},
								beforeshow : function(win) {
									var workpiecematerialid = workpieceisotypeCombo
											.getValue();
									if (workpiecematerialid != "") {
										Ext.getCmp('ctparameterid').enable();
									} else {
										Ext.getCmp('ctparameterid').disable();
									}
								}
							}
						});

				propertyDisplayWin.show();
			}

			// 查看刀体详细信息;
			function propertyDisplay2() {
				var record = grid2.getSelectionModel().getSelected();
				var index = grid2.getStore().indexOf(record);

				var path = checkImagePath(record.data.figure);
				var path2 = checkImagePath(record.data.figure2);

//				品牌跳转
				  var brandStore = new Ext.data.GroupingStore({
						proxy : new Ext.data.HttpProxy({
							url : 'generalturning.do?code=querybrand'
								
							}),
						reader : new Ext.data.JsonReader({
									totalProperty : 'TOTALCOUNT',
									root : 'ROOT'
								}, [{
									name : 'name'
								}, {
									name : 'alias'
								}, {
									name : 'nation'
								}, {
									name : 'office'
								},{
									name : 'address'
								}, {
									name : 'telephone'
										},
										{
											name : 'brandfeature'
												},
										{
											name : 'remark1'
												},{
											name : 'figure'
												}])
					});
					
				 
			
				   brandStore.load({
						
						params : {
							
							name : record.data.toolholderbrandname
						}
					});
				
					
				  // var brandpath = 'dec/image/brand/SANDVIK.jpg'
				var brandgrid = new Ext.grid.PropertyGrid({
					//title : '品牌详情',
					border : false,
					//autoSort : false,
					frame : true,
					region : 'center',
					//store : brandStore,
					width : 200,
					hideBorders:true,
					clicksToEdit : 1,
					//modal : true,
					height : 140,
					id : 'brandgridid',
					//enableColLock : true,
					//enableColumnMove : false,
					//autoExpandColumn : true,
					//loadMask : true,
					//stripeRows : true,
					//autoScroll : true,
					//clicksToEdit : 1,
					/*source : {
						
						
						 "品牌名称": '',  
		                   "别名": '',  
		                   "国家": '',  
		                   "公司": '',  
		                   "地址": '' ,
		                   "电话": '' ,
		                   "特点": '' 
		                   
						
						
					}*/
					listeners:{
						beforeedit : function(e) {
						e.cancel = true;
						return false;
					}}
					
					
				});
				
				
		
				
				var brandDisplayWin = new Ext.Window(
						{
							//title : '品牌详情',
							/*x:((document.body.clientWidth)/numlign-divnum)*2+130,
							y:(document.body.clientWidth)*(1/11),*/
							id:'brandDisplayWinid',
							width : 400,
							//modal : true,
							frame:true,
							layout : 'border',
							height : 280,
							//frame:true,
							//bodyBorder :false,
							 //baseCls: 'my-panel-no-border',
						    //baseCls: 'x-plain', 
					        //border:false,
							closeAction : 'hide',
							maximizable : false,
							closable:false,
							
							
						               
						     items: [ brandgrid,{
									id: 'boxid9',
									region : 'east',
									xtype : 'box',
									autoEl : {
										tag : 'img',
										style : 'width:50%;height:50%;' ,
										src : ''
									}
									
								},{
									   xtype: "textarea",
					                    fieldLabel: "特点",
					                    region : 'south',
					                    id: "brandmemo",
					                    height:140,
					                    readOnly:true,
					                    emptyText:'数据完善中……',
					                    textfield:'11',
					                    width: 330
					                  
									
								}
						            
						        ],
						       
							
							listeners : {}
								
							});
				
				var propertygrid2 = new Ext.grid.PropertyGrid({
					title : '刀体详情',
					border : true,
					autoSort : false,
					frame : true,
					ds : toolholderStore,
					cm : toolholderCm,
					id : 'propertyGrid2id',
					enableColLock : true,
					enableColumnMove : false,
					autoExpandColumn : true,
					loadMask : true,
					stripeRows : true,
					autoScroll : true,
					clicksToEdit : 1,
					propertyNames : {
						/*'toolholderid' : '刀体ID',*/
						'name' : '刀体名称',
						'sapcode' : 'SAP编码',
						'toolholdertype' : '刀体型号',
						'toolholderbrandname' : '刀体品牌',
					/*	'toolholderid' : '刀体品牌ID',*/
						'turningtype' : '车削类型',
						'portsize' : '接口规格',
						'handoftool' : '刀具方向',
						'figure' : '结构简图',
						'figure2' : '尺寸简图',
						'featurecode' : '刀片形式',
						'cseries' : '刀片夹紧方式',
						'length' : '刀体长度',
						'width' : '刀体宽度',
						'bore' : '最小镗孔直径',
						'thheadangle' : '头部形式',
						'aname1' : '附件1名称',
						'atype1' : '附件1型号',
						'aname2' : '附件2名称',
						'atype2' : '附件2型号',
						'aname3' : '附件3名称',
						'atype3' : '附件3型号',
						'aname4' : '附件4名称',
						'atype4' : '附件4型号',
						'aname5' : '附件5名称',
						'atype5' : '附件5型号',
						'remark' : '备注'
					},
					customEditors : {
						'turningtype' : new Ext.grid.GridEditor(
								new Ext.form.ComboBox({
									displayField : 'text',
									mode : 'local',
									triggerAction : 'all',
									store : TURNINGTYPEStore
								})),
						'portsize' : new Ext.grid.GridEditor(
								new Ext.form.ComboBox({
									displayField : 'text',
									mode : 'local',
									triggerAction : 'all',
									store : PORTSIZEStore
								})),
						'handoftool' : new Ext.grid.GridEditor(
								new Ext.form.ComboBox({
									displayField : 'text',
									mode : 'local',
									triggerAction : 'all',
									store : HANDOFTOOLStore
								})),
						'cseries' : new Ext.grid.GridEditor(
								new Ext.form.ComboBox({
									displayField : 'text',
									mode : 'local',
									triggerAction : 'all',
									store : CSERIESStore
								})),
						'thheadangle' : new Ext.grid.GridEditor(
								new Ext.form.ComboBox({
									displayField : 'text',
									mode : 'local',
									triggerAction : 'all',
									store : THHEADANGLEStore
								}))
					},
					customRenderers : {
						'turningtype' : TURNINGTYPERender,
						'portsize' : PORTSIZERender,
						'handoftool' : HANDOFTOOLRender,
						'cseries' : CSERIESRender,
						'thheadangle' : THHEADANGLERender
					},
					listeners : {
						
						rowclick :function(propertygrid, rowIndex, columnIndex, e) {
							var store = propertygrid.getStore();
							var record = store.getAt(rowIndex);
						
					if (record.data.name=="刀体品牌"&&record.data.value!==""){
						
							brandgrid.setSource({
								
								  "品牌名称": brandStore.getAt(0).get('name'), 
								   '别名': brandStore.getAt(0).get('alias'),
								   "国家": brandStore.getAt(0).get('nation'),  
								   "公司": brandStore.getAt(0).get('office'),  
								   "地址": brandStore.getAt(0).get('address'),  
								   "电话": brandStore.getAt(0).get('telephone'),
								   "备注": brandStore.getAt(0).get('remark1')  }
								   );			     
						    brandDisplayWin.show();	
							document.getElementById('boxid9').src=checkImagePath(brandStore.getAt(0).get('figure'));
							Ext.getCmp('brandmemo').setValue(brandStore.getAt(0).get('brandfeature'))
					}}
				,
						beforeedit : function(e) {
							e.cancel = true;
							return false;
						}
					}
				});

				/*
				 * var cuttingparameter2 = new Ext.grid.GridPanel({ title :
				 * '切削参数', header : false, height : 500, //id : 'grid2id',
				 * autoScroll : true, frame : true, disabled : true, region :
				 * 'center', //store : toolholderStore, stripeRows : true, //sm :
				 * sm2, //cm : toolholderCm, //tbar : tbar2, //bbar : bbar2,
				 * viewConfig : { forceFit : false // 不产生横向滚动条, 各列自动扩展自动压缩,
				 * 适用于列数比较少的情况 }, loadMask : { msg : '正在加载表格数据,请稍等...' } //view :
				 * new Ext.grid.GroupingView(), //plugins : [filtersToolholder],
				 * //stateful : true, //stateId :
				 * 'grid-generalturning-toolholder' } );
				 */

				var picturePanel2 = new Ext.Panel({
					title : '结构简图',
					id : 'picturePanel2id',
					autoScroll : true,
					frame : true,
					region : 'center',
					// sm : sm2,
					// cm : toolholderCm,
					// tbar : tbar2,
					// bbar : bbar2,
					viewConfig : {
						forceFit : true
					// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
					},
					loadMask : {
						msg : '正在加载图像数据,请稍等...'
					},
					items : [ {
						xtype : 'box',
						id: 'boxid3',
						autoEl : {
							tag : 'img',
							style : 'width:80%;height:80%;position:relative;top:10%;left:10%',
							src : path
						}
					} ]
				// view : new Ext.grid.GroupingView(),
				// plugins : [filtersToolholder],
				// stateful : true,
				// stateId : 'grid-generalturning-toolholder'
				});

				var sizePanel2 = new Ext.Panel({
					title : '尺寸简图',
					 id : 'sizePanel2id',
					autoScroll : true,
					frame : true,
					region : 'center',
					// sm : sm2,
					// cm : toolholderCm,
					// tbar : tbar2,
					// bbar : bbar2,
					viewConfig : {
						forceFit : true
					// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
					},
					loadMask : {
						msg : '正在加载图像数据,请稍等...'
					},
					items : [ {
						xtype : 'box',
						id: 'boxid4',
						autoEl : {
							tag : 'img',
							style : 'width:80%;height:80%;position:relative;top:10%;left:10%',
							src : path2
						}
					} ]
				// view : new Ext.grid.GroupingView(),
				// plugins : [filtersToolholder],
				// stateful : true,
				// stateId : 'grid-generalturning-toolholder'
				});

				var bladeStorePanel = new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
						url : 'generalturning.do?code=queryBlade4Manage'
					// queryBlade4Manage是在BladeAction中的方法queryBlade4Manage;
					}),
					reader : new Ext.data.JsonReader({
						totalProperty : 'TOTALCOUNT',
						root : 'ROOT'
					}, [ {
						name : 'sapcode'
					}, {
						name : 'name'
					}, {
						name : 'bladetype'
					}, {
						name : 'bladebrandname'
					}, {
						name : 'featurecode'
					} ])
				});

				// 表格
				var bladePanel = new Ext.grid.GridPanel({
					title : '匹配刀片',
					// header : false,
					autoScroll : true,
					id : 'bladePanelid',
					// disabled : true,
					frame : true,
					region : 'center',
					store : bladeStorePanel,
					stripeRows : true,
					// sm : sm2,
					cm : new Ext.grid.ColumnModel([ new Ext.grid.RowNumberer({
						header : '序',
						width : 26
					}), {
						header : 'SAP编码',
						dataIndex : 'sapcode',
						width : 100,
						sortable : true
					}, {
						header : '刀片名称',
						dataIndex : 'name',
						width : 80,
						// hidden : true,
						sortable : true
					},{
						header : '刀片型号',
						dataIndex : 'bladetype',
						width : 130,
						// hidden : true,
						sortable : true
					}, {
						header : '刀片品牌',
						dataIndex : 'bladebrandname',
						width : 60,
						// hidden : true,
						sortable : true
					}, {
						header : '刀片特征码',
						dataIndex : 'featurecode',
						width : 80,
						sortable : true
					} ]),
					// tbar : tbar2,
					// bbar : bbar2,
					viewConfig : {
						forceFit : true
					// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
					},
					loadMask : {
						msg : '正在加载表格数据,请稍等...'
					}
				});
				
				var sapStore2= new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
						url : 'generalturning.do?code=querySapinformation'
					// queryToolholder4Manage是在ToolholderAction中的方法queryToolholder4Manage;
					}),
					reader : new Ext.data.JsonReader({
						totalProperty : 'TOTALCOUNT',
						root : 'ROOT'
					}, [ {
						name : 'id'
					}, {
						name : 'departmentid'
					}, {
						name : 'storagelocation'
					} , {
						name : 'sapcode'
					}, {
						name : 'description'
					}, {
						name : 'position'
					}, {
						name : 'unit'
					}, {
						name : 'price'
					}, {
						name : 'amount'
					}, {
						name : 'worth'
					}, {
						name : 'time'
					}])
				});
				
				// 库存表格
				var sapPanel2= new Ext.grid.GridPanel({
					title : '库存信息',
					// header : false,
					autoScroll : true,
					/*Scroll : true,*/
					id : 'sapPanel2id',
					// disabled : true,
					frame : true,
					region : 'center',
					store : sapStore2,
					stripeRows : true,
					// sm : sm2,
				/*	viewConfig : {
						style : {overflow :true,overflowX :true}
					// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
					},*/
					cm : new Ext.grid.ColumnModel([ new Ext.grid.RowNumberer({
						header : '序',
						width : 26
					}), {
						header : '编号',
						dataIndex : 'id',
						width : 60,
						hidden : true,
						sortable : true
						
					}, {
						header : '部门编号',
						dataIndex : 'departmentid',
						width : 100,
						// hidden : true,
						sortable : true
					}, {
						header : '库存地点',
						dataIndex : 'storagelocation',
						width : 100,
						sortable : true
					} , {
						header : 'SAP编码',
						dataIndex : 'sapcode',
						width : 100,
						sortable : true
					}, {
						header : '物料描述',
						dataIndex : 'description',
						width : 130,
						// hidden : true,
						sortable : true
					}, {
						header : '仓位',
						dataIndex : 'position',
						width : 80,
						sortable : true
					} , {
						header : '基本计量单位',
						dataIndex : 'unit',
						width : 60,
						hidden : true,
						sortable : true
					}, {
						header : '单价',
						dataIndex : 'price',
						width : 130,
						hidden : true,
						sortable : true
					}, {
						header : '库存数量',
						dataIndex : 'amount',
						width : 80,
						sortable : true
					} , {
						header : '库存价值',
						dataIndex : 'worth',
						width : 130,
						hidden : true,
						sortable : true
					}, {
						header : '更新时间',
						dataIndex : 'time',
						width : 80,
						sortable : true
					} ]),
					// tbar : tbar2,
					// bbar : bbar2,
					viewConfig : {
						forceFit : true
					// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
					},
					loadMask : {
						msg : '正在加载表格数据,请稍等...'
					}
				});

				var propertyTabs2 = new Ext.TabPanel({
					region : 'center',
					id : 'propertytabs2id',
					enableTabScroll : true,
					// autoWidth : true,
					activeTab : 0,
					height : document.body.clientHeight,
					// width : document.body.clientWidth / 4,
					// width : 400,
					buttonAlign : 'right',
					items : [ propertygrid2 ]
				/*
				 * , listeners : { tabchange : function(tabpanel, tab) { } }
				 */
				});

				var pictureTabs2 = new Ext.TabPanel({
					region : 'east',
					split : true,
					enableTabScroll : true,
					width : '60%',
					// collapsible: true,
					// margins:'3 0 3 3',
					// cmargins:'3 3 3 3',
					activeTab : 0,
					height : document.body.clientHeight,
					// width : document.body.clientWidth / 4,
					buttonAlign : 'right',
					items : [ picturePanel2, sizePanel2, 
					bladePanel ,sapPanel2],
					listeners : {
						tabchange : function(tabpanel, tab) {
							if (tab.getId() == 'bladePanelid') {
								bladeStorePanel.load({
									params : {
										featurecode : record.data.featurecode
									}
								});
							}else if (tab.getId() =='sapPanel2id') {
								sapStore2.load({
									params : {
										sapcode : record.data.sapcode
									}
								});}
						}
					}
				});

				var propertyDisplayWin2 = new Ext.Window(
						{
							title : '刀体详细信息',
							width : 800,
							modal : true,
							height : 400,
							closeAction : 'close',
							maximizable : true,
							closable:false,
							// plain : true,
							layout : 'border',
							items : [ propertyTabs2, pictureTabs2 ],
							buttons : [
									{
										text : '上一条',
										id : 'previousbtn2',
										iconCls : 'app_leftIcon',
										handler : function() {
											grid2.getSelectionModel()
													.selectRow(index - 1);
											grid2.getView().focusRow(index - 1);
											index = index - 1;
											if (index <= 0) {
												infoMsg('已经到第一条了.');
												index = 0;
												record = grid2.getStore()
												.getAt(index);
										propertygrid2
												.setSource({'刀体名称':	record.data.name,
													'SAP编码':	record.data.sapcode,
													'刀体型号':	record.data.toolholdertype,
													'刀体品牌':	record.data.toolholderbrandname,
													'车削类型':	record.data.turningtype,
													'接口规格':	record.data.portsize,
													'刀具方向':	record.data.handoftool,
													'刀片形式':	record.data.featurecode,
													'刀片夹紧方式':	record.data.cseries,
													'刀体长度':	record.data.length,
													'刀体宽度':	record.data.width,
													'最小镗孔直径':	record.data.bore,
													'头部形式':	record.data.thheadangle,
													'附件1名称':	record.data.aname1,
													'附件1型号':	record.data.atype1,
													'附件2名称':	record.data.aname2,
													'附件2型号':	record.data.atype2,
													'附件3名称':	record.data.aname3,
													'附件3型号':	record.data.atype3,
													'附件4名称':	record.data.aname4,
													'附件4型号':	record.data.atype4,
													'附件5名称':	record.data.aname5,
													'附件5型号':	record.data.atype5,
													'备注':	record.data.remark});
												Ext.getCmp('previousbtn2')
														.disable();
											} else {
												record = grid2.getStore()
														.getAt(index);
												propertygrid2
														.setSource({'刀体名称':	record.data.name,
															'SAP编码':	record.data.sapcode,
															'刀体型号':	record.data.toolholdertype,
															'刀体品牌':	record.data.toolholderbrandname,
															'车削类型':	record.data.turningtype,
															'接口规格':	record.data.portsize,
															'刀具方向':	record.data.handoftool,
															'刀片形式':	record.data.featurecode,
															'刀片夹紧方式':	record.data.cseries,
															'刀体长度':	record.data.length,
															'刀体宽度':	record.data.width,
															'最小镗孔直径':	record.data.bore,
															'头部形式':	record.data.thheadangle,
															'附件1名称':	record.data.aname1,
															'附件1型号':	record.data.atype1,
															'附件2名称':	record.data.aname2,
															'附件2型号':	record.data.atype2,
															'附件3名称':	record.data.aname3,
															'附件3型号':	record.data.atype3,
															'附件4名称':	record.data.aname4,
															'附件4型号':	record.data.atype4,
															'附件5名称':	record.data.aname5,
															'附件5型号':	record.data.atype5,
															'备注':	record.data.remark});
												Ext.getCmp('nextbtn2').enable();
											}
											
											  brandStore.load({
													
													params : {
														
														name : record.data.toolholderbrandname
													}
												});
											

											if (pictureTabs2.getActiveTab()
													.getItemId() == 'bladePanelid') {
												bladeStorePanel
														.load({
															params : {
																featurecode : record.data.featurecode
															}
														});
											}else if (pictureTabs2.getActiveTab().getItemId() == 'sapPanel2id') {
												sapStore2.load({
													params : {
														sapcode : record.data.sapcode
													}
												});}else if (pictureTabs2.getActiveTab().getItemId() == 'picturePanel2id') {
													var newsrc =checkImagePath(record.data.figure);
													Ext.getCmp('boxid3').getEl().dom.src = newsrc;
													}
												else if (pictureTabs2.getActiveTab().getItemId() == 'sizePanel2id') {
												
													var newsrc =checkImagePath(record.data.figure2);
													Ext.getCmp('boxid4').getEl().dom.src = newsrc;

													}
										}
									},
									{
										text : '下一条',
										id : 'nextbtn2',
										iconCls : 'app_rightIcon',
										handler : function() {
											grid2.getSelectionModel()
													.selectRow(index + 1);
											grid2.getView().focusRow(index + 1);
											index = index + 1;
											if (index >= grid2.getStore()
													.getCount() - 1) {
												infoMsg('已经到最后一条了.');
												index = grid2.getStore()
														.getCount() - 1;
												record = grid2.getStore()
												.getAt(index);
										propertygrid2
												.setSource({'刀体名称':	record.data.name,
													'SAP编码':	record.data.sapcode,
													'刀体型号':	record.data.toolholdertype,
													'刀体品牌':	record.data.toolholderbrandname,
													'车削类型':	record.data.turningtype,
													'接口规格':	record.data.portsize,
													'刀具方向':	record.data.handoftool,
													'刀片形式':	record.data.featurecode,
													'刀片夹紧方式':	record.data.cseries,
													'刀体长度':	record.data.length,
													'刀体宽度':	record.data.width,
													'最小镗孔直径':	record.data.bore,
													'头部形式':	record.data.thheadangle,
													'附件1名称':	record.data.aname1,
													'附件1型号':	record.data.atype1,
													'附件2名称':	record.data.aname2,
													'附件2型号':	record.data.atype2,
													'附件3名称':	record.data.aname3,
													'附件3型号':	record.data.atype3,
													'附件4名称':	record.data.aname4,
													'附件4型号':	record.data.atype4,
													'附件5名称':	record.data.aname5,
													'附件5型号':	record.data.atype5,
													'备注':	record.data.remark});
												Ext.getCmp('nextbtn2')
														.disable();
											} else {
												record = grid2.getStore()
														.getAt(index);
												propertygrid2
														.setSource({'刀体名称':	record.data.name,
															'SAP编码':	record.data.sapcode,
															'刀体型号':	record.data.toolholdertype,
															'刀体品牌':	record.data.toolholderbrandname,
															'车削类型':	record.data.turningtype,
															'接口规格':	record.data.portsize,
															'刀具方向':	record.data.handoftool,
															'刀片形式':	record.data.featurecode,
															'刀片夹紧方式':	record.data.cseries,
															'刀体长度':	record.data.length,
															'刀体宽度':	record.data.width,
															'最小镗孔直径':	record.data.bore,
															'头部形式':	record.data.thheadangle,
															'附件1名称':	record.data.aname1,
															'附件1型号':	record.data.atype1,
															'附件2名称':	record.data.aname2,
															'附件2型号':	record.data.atype2,
															'附件3名称':	record.data.aname3,
															'附件3型号':	record.data.atype3,
															'附件4名称':	record.data.aname4,
															'附件4型号':	record.data.atype4,
															'附件5名称':	record.data.aname5,
															'附件5型号':	record.data.atype5,
															'备注':	record.data.remark});
												Ext.getCmp('previousbtn2')
														.enable();
											}
											
											  brandStore.load({
													
													params : {
														
														name : record.data.toolholderbrandname
													}
												});
											

											if (pictureTabs2.getActiveTab()
													.getItemId() == 'bladePanelid') {
												bladeStorePanel
														.load({
															params : {
																featurecode : record.data.featurecode
															}
														});
											}else if (pictureTabs2.getActiveTab().getItemId() == 'sapPanel2id') {
												sapStore2.load({
													params : {
														sapcode : record.data.sapcode
													}
												});}else if (pictureTabs2.getActiveTab().getItemId() == 'picturePanel2id') {
													var newsrc =checkImagePath(record.data.figure);
													Ext.getCmp('boxid3').getEl().dom.src = newsrc;
													}
												else if (pictureTabs2.getActiveTab().getItemId() == 'sizePanel2id') {
												
													var newsrc =checkImagePath(record.data.figure2);
													Ext.getCmp('boxid4').getEl().dom.src = newsrc;

													}
										}
									}, {
										text : '保存',
										id : 'savebtn2',
										hidden : true,
										iconCls : 'acceptIcon',
										handler : function() {

										}
									}, {
										text : '关闭',
										id : 'cancelbtn2',
										iconCls : 'cancelIcon',
										handler : function() {
											propertyDisplayWin2.close();
											 brandDisplayWin.close();
										}
									} ],
							listeners : {
								afterrender : function(tabpanel, tab) {
									propertygrid2.setSource({'刀体名称':	record.data.name,
										'SAP编码':	record.data.sapcode,
										'刀体型号':	record.data.toolholdertype,
										'刀体品牌':	record.data.toolholderbrandname,
										'车削类型':	record.data.turningtype,
										'接口规格':	record.data.portsize,
										'刀具方向':	record.data.handoftool,
										'刀片形式':	record.data.featurecode,
										'刀片夹紧方式':	record.data.cseries,
										'刀体长度':	record.data.length,
										'刀体宽度':	record.data.width,
										'最小镗孔直径':	record.data.bore,
										'头部形式':	record.data.thheadangle,
										'附件1名称':	record.data.aname1,
										'附件1型号':	record.data.atype1,
										'附件2名称':	record.data.aname2,
										'附件2型号':	record.data.atype2,
										'附件3名称':	record.data.aname3,
										'附件3型号':	record.data.atype3,
										'附件4名称':	record.data.aname4,
										'附件4型号':	record.data.atype4,
										'附件5名称':	record.data.aname5,
										'附件5型号':	record.data.atype5,
										'备注':	record.data.remark});
								}
							}
						});

				propertyDisplayWin2.show();
			}
			// 导出任务计划数据
			function printTask() {
				showWaitMsg('正在准备报表数据,请稍等...');
				
				if(grid.getSelectionModel().getCount()==1){
					var record = grid.getSelectionModel().getSelected()
				}else if(grid.getSelectionModel().getCount()>=2){	
					errorMsg("请只选择一把刀片")
				}else{
					errorMsg("请选择刀片")};
				
				
				Ext.Ajax.request({
					
					url : 'generalturning.do?code=printTask',
				
					
					params : {
						workpieceisotype : workpieceisotypeCombo.getValue(),
						accuracyid : accuracyCombo.getValue(),
						shape : shapeCombo.getValue(),
						reliefangle : reliefangleCombo.getValue(),
						celength : celengthCombo.getValue(),
						noseradius : noseradiusCombo.getValue(),
						sapcode :record.data.sapcode,
				/*		figure2 : checkImagePath(record.data.figure2),*/
					     	featurecode : "",
							workpiecematerialid : workpieceisotypeCombo.getValue(),
							bladematerialid : record.data.bladematerialid,
							grooveid : record.data.grooveid,
							bladetype : record.data.bladetype
							
					},
					success : function(response) {
						hideWaitMsg();
						// doExport('task');
						doExport('generalturning');
					},
					failure : function(response) {
						hideWaitMsg();
						errorMsg("准备报表数据对象发生错误,请检查!");
					}
				});
			}
			
			// 导出任务计划数据
			function printTask2() {
				showWaitMsg('正在准备报表数据,请稍等...');
				
				if(grid2.getSelectionModel().getCount()==1){
					var record = grid2.getSelectionModel().getSelected()
				}else if(grid2.getSelectionModel().getCount()>=2){	
					errorMsg("请只选择一把刀片")
				}else{
					errorMsg("请选择刀片")};
				
				
				Ext.Ajax.request({
					
					url : 'generalturning.do?code=printTask2',
				
					
					params : {
						turningtype : turningtypeCombo.getValue(),
						thheadangle : thheadangleCombo.getValue(),
						handoftool : handoftoolCombo.getValue(),
						shape : shapeCombo2.getValue(),
						reliefangle : reliefangleCombo2.getValue(),
						portsize : portsizeCombo.getValue(),
					    cseries :  cseriesCombo.getValue(),
						sapcode :record.data.sapcode
						/*accuracyid : accuracyCombo.getValue(),
						shape : shapeCombo.getValue(),
						reliefangle : reliefangleCombo.getValue(),
						celength : celengthCombo.getValue(),
						noseradius : noseradiusCombo.getValue(),
						sapcode :record.data.sapcode,
						figure2 : checkImagePath(record.data.figure2),
					     	featurecode : "",
							workpiecematerialid : workpieceisotypeCombo.getValue(),
							bladematerialid : record.data.bladematerialid,
							grooveid : record.data.grooveid,
							bladetype : record.data.bladetype
							*/
					},
					success : function(response) {
						hideWaitMsg();
						// doExport('task');
						doExport('generalturning');
					},
					failure : function(response) {
						hideWaitMsg();
						errorMsg("准备报表数据对象发生错误,请检查!");
					}
				});
			}
			
			
		});
