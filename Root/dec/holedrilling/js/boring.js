/**
 * 镗孔
 * 
 * @author fuxianwu
 * @since 2013-01-01
 */

// 工件材料状态//Workpiecematerial//workpiecematerial
// 镗孔类型//Cuttype//cuttype
// 直径//Nominaldiameter//nominaldiameter
// 深度//Depth//depth
// 冷却类型//Coolingtype//coolingtype
Ext.onReady(function() {
	var divnum = 25;// 调整toolbar中的下拉框的大小与位置;
	var numlign = 11;

	var pp = 0.8; // 将下拉框图片缩放为80%;

	var grid_ratio = 0.55; // 上下两个grid的高度比例
	var grid_init = true;
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
	var sm3 = new Ext.grid.CheckboxSelectionModel();

	// 行号
	var rownum3 = new Ext.grid.RowNumberer({
				header : '序',
				width : 26
			});
	// 列模型（镗孔）
	var hd_holedrillingCm = new Ext.grid.ColumnModel([rownum, sm, {
				header : '名称',
				dataIndex : 'name',
				width : 100,
				// hidden : true,
				sortable : true
			}, {
				header : 'SAP编号',
				dataIndex : 'sapcode',
				width : 120,
				sortable : true
				// hidden : true
		}	, {
				header : '型号',
				dataIndex : 'type',
				width : 150,
				// hidden : true,
				sortable : true
			}, {
				header : '简图',
				dataIndex : 'figure',
				width : 100,
				hidden : true,
				sortable : true
			}, {
				header : '实物图',
				dataIndex : 'figure2',
				width : 100,
				hidden : true,
				sortable : true
			}, {
				header : '品牌',
				dataIndex : 'brandid',
				// hidden : true,
				width : 80,
				sortable : true
			}, {
				header : '公称直径',
				dataIndex : 'nominaldiameter',
				width : 120,
				//hidden : true,
				sortable : true
			}, {
				header : '长度',
				dataIndex : 'length',
				width : 80,
				// hidden : true,
				sortable : true
			}, {
				header : '镗孔类型',
				dataIndex : 'cuttype',
				width : 80,
				hidden : true,
				sortable : true
			}, /*
				 * { header : '类型详情ID', dataIndex : 'typeid', width : 80, align :
				 * 'center', hidden : true, sortable : true },
				 */{
				header : '刀具类型',
				dataIndex : 'hdtooltype',
				width : 80,
				align : 'center',
				renderer : HDTOOLTYPERender,
				hidden : true,
				sortable : true
			}, {
				header : '冷却类型',
				dataIndex : 'coolingtype',
				width : 120,
				align : 'center',
				hidden : true,
				sortable : true
			}, {
				header : '特点',
				dataIndex : 'description',
				width : 120,
				align : 'center',
				hidden : true,
				sortable : true
			}, {
				header : '备注信息',
				dataIndex : 'remark',
				width : 120,
				// hidden : true,
				sortable : true
			}, /*
				 * { header : '系数K1', dataIndex : 'k1', width : 100, align :
				 * 'center', // renderer : CSERIESRender, // hidden : true,
				 * sortable : true },
				 */{
				header : '附件1名称',
				dataIndex : 'aname1',
				width : 120,
				align : 'center',
				// hidden : true,
				sortable : true
			}, {
				header : '附件1类型',
				dataIndex : 'anametype1',
				width : 120,
				align : 'center',
				// hidden : true,
				sortable : true
			}, {
				header : '附件2名称',
				dataIndex : 'aname2',
				width : 120,
				align : 'center',
				// hidden : true,
				sortable : true
			}, {
				header : '附件2类型',
				dataIndex : 'anametype2',
				width : 120,
				align : 'center',
				// hidden : true,
				sortable : true
			}, {
				header : '附件3名称',
				dataIndex : 'aname3',
				width : 120,
				align : 'center',
				// hidden : true,
				sortable : true
			}, {
				header : '附件3类型',
				dataIndex : 'anametype3',
				width : 120,
				align : 'center',
				// hidden : true,
				sortable : true
			}, {
				header : '附件4名称',
				dataIndex : 'aname4',
				width : 120,
				align : 'center',
				// hidden : true,
				sortable : true
			}/*
				 * , { header : '沟槽长度', dataIndex : 'groovelength', width : 120,
				 * align : 'center', hidden : true, sortable : true }, { header :
				 * '引导锥长度', dataIndex : 'guideconelength', width : 120, align :
				 * 'center', hidden : true, sortable : true }
				 */]);

	// 列模型（镗孔）
	var hd_blade_boringCm = new Ext.grid.ColumnModel([rownum2, sm2, {
				header : '名称',
				dataIndex : 'name',
				width : 80,
				// hidden:true,
				sortable : true
			}, /*
				 * { header : '编号', dataIndex : 'toolholderid', width : 80,
				 * hidden : true, sortable : true },
				 */{
				header : 'SAP编号',
				dataIndex : 'sapcode',
				width : 80,
				// hidden:true,
				sortable : true
			},

			{
				header : '型号',
				dataIndex : 'type',
				width : 80,
				// hidden:true,
				sortable : true
			}, {
				header : '槽型',
				dataIndex : 'grooveid',
				width : 80,
				// hidden:true,
				sortable : true
			}, {
				header : '简图',
				dataIndex : 'figure1',
				width : 80,
				hidden : true,
				sortable : true
			}, {
				header : '实物图',
				dataIndex : 'figure2',
				width : 80,
				hidden : true,
				sortable : true
			}, {
				header : '品牌',
				dataIndex : 'brandid',
				width : 80,
				// hidden:true,
				sortable : true
			}, {
				header : '形状',
				dataIndex : 'shape',
				width : 80,
				// hidden:true,
				sortable : true
			}, {
				header : '后角',
				dataIndex : 'reliefangle',
				width : 80,
				// hidden:true,
				sortable : true
			}, {
				header : '可转位次数',
				dataIndex : 'indexabletimes',
				width : 80,
				// hidden:true,
				sortable : true
			}, {
				header : '内切圆直径',
				dataIndex : 'diameter',
				width : 80,
				// hidden:true,
				sortable : true
			}, {
				header : '厚度',
				dataIndex : 'thickness',
				width : 80,
				// hidden:true,
				sortable : true
			}, {
				header : '刀尖圆弧半径',
				dataIndex : 'noseradius',
				width : 80,
				// hidden:true,
				sortable : true
			}, {
				header : '特点',
				dataIndex : 'description',
				width : 80,
				// hidden:true,
				sortable : true
			}, {
				header : '备注信息',
				dataIndex : 'remark',
				width : 80,
				// hidden:true,
				sortable : true
			}, {
				header : '特征码ID',
				dataIndex : 'featurecode',
				width : 80,
				hidden : true,
				sortable : true
			} /*
				 * , { header : '系数K2', dataIndex : 'k2', width : 80,
				 * hidden:true, sortable : true }
				 */]);

	// 列模型（模块通用）
	var hd_toolholder_boring_moduleCm = new Ext.grid.ColumnModel([rownum3, sm3, /*
																				 * {
																				 * header :
																				 * '编号',
																				 * dataIndex :
																				 * 'toolholderid',
																				 * width :
																				 * 80,
																				 * hidden :
																				 * true,
																				 * sortable :
																				 * true },
																				 */		{
				header : '名称',
				dataIndex : 'name',
				width : 80,
				// hidden:true,
				sortable : true
			}, {
				header : 'SAP编号',
				dataIndex : 'sapcode',
				width : 80,
				// hidden:true,
				sortable : true
			}, {
				header : '型号',
				dataIndex : 'type',
				width : 80,
				// hidden:true,
				sortable : true
			}, {
				header : '简图',
				dataIndex : 'figure',
				width : 80,
				hidden : true,
				sortable : true
			}, {
				header : '实物图',
				dataIndex : 'figure2',
				width : 80,
				hidden : true,
				sortable : true
			}, {
				header : '品牌',
				dataIndex : 'brandid',
				width : 80,
				// hidden:true,
				sortable : true
			}, {
				header : '切削类型',
				dataIndex : 'cuttype',
				width : 80,
				// hidden:true,
				sortable : true
			}, {
				header : '标准',
				dataIndex : 'standard',
				width : 80,
				hidden : true,
				sortable : true
			}, {
				header : '公称直径',
				dataIndex : 'nodiameter',
				width : 80,
				// hidden:true,
				sortable : true
			}, {
				header : '可调精度',
				dataIndex : 'adprecision',
				width : 80,
				// hidden:true,
				sortable : true
			}, {
				header : '主偏角',
				dataIndex : 'mainangle',
				width : 80,
				// hidden:true,
				sortable : true
			}, {
				header : '齿数',
				dataIndex : 'teethnumber',
				width : 80,
				// hidden:true,
				sortable : true
			}, {
				header : '总长',
				dataIndex : '	length',
				width : 80,
				// hidden:true,
				sortable : true
			}, {
				header : '钻孔深度',
				dataIndex : 'depth',
				width : 80,
				// hidden:true,
				sortable : true
			}, {
				header : 'MCM	',
				dataIndex : 'mcm',
				width : 80,
				hidden : true,
				sortable : true
			}, {
				header : 'MCC',
				dataIndex : 'mcc',
				width : 80,
				hidden : true,
				sortable : true
			}, {
				header : '冷却类型',
				dataIndex : 'coolingtype',
				width : 80,
				// hidden:true,
				sortable : true
			}]);

	// Store数据存储（镗孔主表）
	var hd_holedrillingStore = new Ext.data.GroupingStore({
				proxy : new Ext.data.HttpProxy({
					url : 'boring.do?code=queryHd_holedrilling4Manage'
						// queryHd_holedrilling4Manage是在DrillingAction中的方法queryHd_holedrilling4Manage;
					}),
				reader : new Ext.data.JsonReader({
							totalProperty : 'TOTALCOUNT',
							root : 'ROOT'
						}, [/*
							 * { name : 'toolholderid' },
							 */{
									name : 'sapcode'
								}, {
									name : 'name'
								}, {
									name : 'type'
								}, {
									name : 'typeid'
								}, {
									name : 'brandid'
								}, {
									name : 'cuttype'
								}, /*{
									name : 'typeid'
								},*/ {
									name : 'hdtooltype'
								}, {
									name : 'description'
								}, {
									name : 'nominaldiameter'
								}, {
									name : 'length'
								}, {
									name : 'depth'
								}, {
									name : 'portsize'
								}, {
									name : 'centreblade'
								}, {
									name : 'coolingtype'
								}, {
									name : 'guideconelength'
								}, {
									name : 'groovelength'
								}, {
									name : 'remark'
								}, {
									name : 'aname1'
								}, {
									name : 'aname2'
								}, {
									name : 'aname3'
								}, {
									name : 'aname4'
								}, {
									name : 'anametype1'
								}, {
									name : 'anametype2'
								}, {
									name : 'anametype3'
								}, {
									name : 'anametype4'
								}, {
									name : 'figure'
								}, {
									name : 'figure2'
								},{
									name : 'featurecode'
								},  {
									name : 'k1'
								}]),
				listeners : {

	}
			});

	// Store数据存储（镗孔刀片）
	var hd_blade_boringStore = new Ext.data.GroupingStore({
				proxy : new Ext.data.HttpProxy({
					url : 'boring.do?code=queryHd_blade_boring4Manage'
						// queryHd_blade_boring4Manage是在BoringAction中的方法queryHd_blade_boring4Manage;
					}),
				reader : new Ext.data.JsonReader({
							totalProperty : 'TOTALCOUNT',
							root : 'ROOT'
						}, [/*{
									name : 'bladeid'
								},*/ {
									name : 'sapcode'
								}, {
									name : 'name'
								}, {
									name : 'type'
								}, {
									name : 'brandid'
								}, {
									name : 'materialid'
								}, {
									name : 'grooveid'
								}, {
									name : 'shape'
								}, {
									name : 'reliefangle'
								}, {
									name : 'indexabletimes'
								}, {
									name : 'diameter'
								}, {
									name : 'thickness'
								}, {
									name : 'noseradius'
								}, {
									name : 'description'
								}, {
									name : 'remark'
								}, {
									name : 'featurecode'
								}, {
									name : 'figure'
								}, {
									name : 'figure2'
								}, {
									name : 'k2'
								}]),
				listeners : {

	}
			});

	// 每页显示条数下拉选择框
	var pagesize_combo = new Ext.form.ComboBox({
				name : 'pagesize',
				triggerAction : 'all',
				mode : 'local',
				store : new Ext.data.ArrayStore({
							fields : ['value', 'text'],
							data : [[10, '10 条/页'], [20, '20 条/页'],
									[50, '50 条/页'], [100, '100条/页'],
									[250, '250条/页'], [500, '500条/页']]
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
				hd_holedrillingStoreLoad();
			});
	// 刀片自动加载
	var autoLoadButton = new Ext.CycleButton({
				showText : true,
				prependText : '模块自动加载: ',
				items : [{
							text : '开',
							iconCls : 'lightonIcon',
							checked : parent.gdlf
						}, {
							text : '关',
							iconCls : 'lightoffIcon',
							checked : !parent.gdlf
						}],
				changeHandler : function(btn, item) {
					if (btn.getActiveItem().itemIndex == '0') {

						parent.gdlf = true;
					} else {

						parent.gdlf = false;
					}
				}
			});

	// 实时过滤按钮
	var runtimeButton = new Ext.CycleButton({
				showText : true,
				prependText : '实时过滤状态: ',
				items : [{
							text : '开',
							iconCls : 'lightonIcon',
							checked : parent.grf
						}, {
							text : '关',
							iconCls : 'lightoffIcon',
							checked : !parent.grf
						}],
				changeHandler : function(btn, item) {
					if (runtimeButton.getActiveItem().itemIndex == '0') {
						/*
						 * if (runtimeButton2.getActiveItem().itemIndex == '1') {
						 * runtimeButton2.toggleSelected();
						 * runtimeButton2.setIconClass('lightonIcon'); }
						 */
						calcButton.hide();
						// calcButton2.hide();
						parent.grf = true;
					} else {
						/*
						 * if (runtimeButton2.getActiveItem().itemIndex == '0') {
						 * runtimeButton2.toggleSelected();
						 * runtimeButton2.setIconClass('lightoffIcon'); }
						 */
						calcButton.show();
						// calcButton2.show();
						parent.grf = false;
					}
				}
			});

	// 查询结果按钮
	var calcButton = new Ext.Button({
				text : '查询结果',
				iconCls : 'tableIcon',
				hidden : true,
				listeners : {
					click : function(btn, e) {
						hd_holedrillingStoreLoad();
					}
				}
			});
	// 分页工具栏
	var bbar = new Ext.PagingToolbar({
				pageSize : number,
				store : hd_holedrillingStore,
				displayInfo : true,
				displayMsg : '显示第 {0} 条到第 {1} 条,共 {2} 条',
				plugins : new Ext.ux.ProgressBarPager(),
				emptyMsg : '对不起,没有符合条件的记录!',
				items : ['-', '&nbsp;&nbsp;', pagesize_combo, {
							xtype : 'tbspacer',
							width : 10
						}, autoLoadButton, runtimeButton, {
							xtype : 'tbspacer',
							width : 10
						}, calcButton, {
							text : ' ',
							// iconCls : 'acceptIcon',
							disabled : true,
							disabledClass : 'x-item-disabled-fuxianwu',
							id : 'helpdiv1'
						}]
			});

	// 工件材料状态数据
	var workpieceisotypeStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : 'generalturning.do?code=queryWorkpiecematerial'
						}),
				reader : new Ext.data.JsonReader({
							totalProperty : 'TOTALCOUNT',
							root : 'ROOT'
						}, [{
									name : 'workpiecematerialid'
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
								}]),
				baseParams : {
					start : 0,
					limit : bbar.pageSize,
					query : ''
				}
			});
	workpieceisotypeStore.load();

	// 行号
	var rownum_iso = new Ext.grid.RowNumberer({
				header : '序',
				width : 26
			});

	var workpieceisotypeCm = new Ext.grid.ColumnModel([rownum_iso, {
				header : '材料牌号',
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
			}]);

	var workpieceisotypeGrid = new Ext.grid.GridPanel({
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
				 * bbar : new Ext.PagingToolbar({ pageSize : bbar.pageSize,
				 * store : workpieceisotypeStore, displayInfo : true, displayMsg :
				 * '显示第 {0} 条到第 {1} 条,共 {2} 条', plugins : new
				 * Ext.ux.ProgressBarPager(), emptyMsg : "对不起,没有符合条件的记录!", items :
				 * ['-', '&nbsp;&nbsp;', pagesize_combo_iso] }),
				 */
				tbar : [{
							xtype : 'combo',
							id : 'inputname_isotype',
							// hiddenName : 'workpiecematerialid',
							store : workpieceisotypeStore,
							cls : 'search',
							// name : 'filetitle',
							displayField : 'name2',
							valueField : 'workpiecematerialid',
							emptyText : '材料牌号|印记',
							// loadingText : '正在加载数据，请稍候...',
							width : 200,
							// pageSize: cln,
							selectOnFocus : true,
							mode : 'local',
							// itemSelector : 'div.search-item',
							typeAhead : false,
							hideTrigger : true,
							enableKeyEvents : true,
							maxHeight : 0,
							plugins : [new QM.plugin.PinyinFilter],
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
						}, {
							text : '确定',
							iconCls : 'acceptIcon',
							handler : function() {
								var r = workpieceisotypeGrid
										.getSelectionModel().getSelected();
								if (typeof r == 'undefined') {
									infoMsg('您没有选中任何条目，请先选中要修改的项目，您也可以直接双击要选择的行！');
									return;
								} else {
									// workpieceisotypeCombo.setValue(r.get('workpiecematerialid'));
									// workpieceisotypeCombo.setRawValue(r.get('name'));

									selectMenu.hide();

									// refreshMilling_toolholder_integral();
								}
							}
						}, '->', {
							text : '清空材料牌号',
							iconCls : 'tbar_synchronizeIcon',
							handler : function() {
								// selectMenu.suspendEvents();
								workpieceisotypeCombo.reset();
								// workpieceisotypeCombo3.reset();

								selectMenu.hide();
								// selectMenu.resumeEvents();
								// var r =
								// g.getSelectionModel().getSelected();

								// refreshMilling_toolholder_integral();
							}
						}],/*
							 * view : new Ext.ux.grid.BufferView({ rowHeight :
							 * 50, scrollDelay : true }),
							 */
				listeners : {
					rowdblclick : function(g, rowIndex, event) {
						selectMenu.hide();
					},
					rowclick : function(g, rowIndex, event) {
						var r = g.getSelectionModel().getSelected();
						workpieceisotypeCombo.setValue(r
								.get('workpiecematerialid'));
						workpieceisotypeCombo.setRawValue(r.get('name'));
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
		 * workpieceisotypeCombo.setRawValue(va.substring(0, va.indexOf('-')));
		 */

		// refreshMilling_toolholder_integral();
		/*
		 * workpieceisotypeStore.load({ params : { start : 0, limit :
		 * bbar.pageSize, keyword : Ext.getCmp('inputname_isotype').getValue() }
		 * });
		 */
	}

	var selectMenu = new Ext.menu.Menu({
				items : [workpieceisotypeGrid],
				listeners : {
					hide : function(m) {
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

								// workpieceisotypeCombo3.setValue(r.get('workpiecematerialid'));
								// workpieceisotypeCombo3.setRawValue(r.get('name'));
							}
						}
						refreshHd_holedrilling();
						hd_blade_boringStoreLoad();
					}
				}
			});

	// 工件材料状态下拉框
	var workpieceisotypeCombo = new Ext.form.ComboBox({
				fieldLabel : '材料牌号',
				hiddenName : 'workpiecematerialid',
				triggerAction : 'all',
				store : new Ext.data.ArrayStore({
							fields : ['name', 'name'],
							data : [[]]
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

	// 镗孔类型数据
	var cuttypeStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : 'boring.do?code=queryCuttypeInBoring'
						}),
				reader : new Ext.data.JsonReader({
							totalProperty : 'TOTALCOUNT',
							root : 'ROOT'
						}, [{
									name : 'value'
								} /*
									 * , { name : 'text' }
									 */])
			});
	cuttypeStore.load();

	// 镗孔类型下拉框
	var cuttypeCombo = new Ext.form.ComboBox({
				fieldLabel : '镗孔类型',
				hiddenName : 'cuttype',
				id : 'cuttypeid',
				emptyText : '请选择...',
				triggerAction : 'all',
				store : cuttypeStore,
				displayField : 'value',
				valueField : 'value',
				selectOnFocus : true,
				loadingText : '正在加载数据...',
				mode : 'local',
				forceSelection : true,
				editable : false,
				// pageSize : cln,
				// minListWidth : 270,
				// plugins : [new QM.plugin.PinyinFilter],
				resizable : true,
				width : document.body.clientWidth / numlign - divnum,
				listeners : {
					focus : function() {
						// cuttypeStore.load();
						setTimeout('Ext.getCmp("cuttypeid").expand();', 1);
					},
					select : function(c, re, index) {
						refreshHd_holedrilling();
					},
					specialkey : function(c, e) {
						if (e.getKey() == e.ESC) {
							if (parent.grf == true) {
								c.reset();
							}
							refreshHd_holedrillingForce();
						}
					}
				}
			});

	   var nominaldiameterStore = new Ext.data.Store({ proxy : new
	  Ext.data.HttpProxy({ url : 'boring.do?code=queryNominaldiameterInBoring' 
	 
	  }), reader : new Ext.data.JsonReader({ totalProperty : 'TOTALCOUNT', root :
	  'ROOT' }, [/*{ name : 'value' } , { name : 'value' } */]) });
	  nominaldiameterStore.load();
	 

	/*
	 * // 直径下拉框 var nominaldiameterCombo = new Ext.form.ComboBox({ fieldLabel :
	 * '直径', hiddenName : 'nominaldiameter', name : 'nominaldiameterid', id :
	 * 'nominaldiameteridid', emptyText : '请选择...', triggerAction : 'all', store :
	 * nominaldiameterStore, displayField : 'value', valueField : 'value',
	 * selectOnFocus : true, loadingText : '正在加载数据...', mode : 'local',
	 * forceSelection : true, // pageSize : cln, // minListWidth : 270, //
	 * plugins : [new QM.plugin.PinyinFilter], resizable : true, width :
	 * document.body.clientWidth / numlign - divnum, // listWidth :
	 * nominaldiameterArr[0] * nominaldiameterpp + 25,
	 * 
	 * tpl : '<tpl for="."><div x-combo-list-item class="x-combo-list-item"><img
	 * src="' + webContext + '/dec/combo/boring/nominaldiameter/' + '{value}' +
	 * '.png" width=' + nominaldiameterArr[0] nominaldiameterpp + ' height=' +
	 * nominaldiameterArr[1] * nominaldiameterpp + '></div></tpl>',
	 * 
	 * listeners : { focus : function() { // nominaldiameterStore.load();
	 * setTimeout('Ext.getCmp("nominaldiameteridid").expand();', 1); }, select :
	 * function(c, re, index) { refreshHd_holedrilling(); }, specialkey :
	 * function(c, e) { if (e.getKey() == e.ESC) { if (parent.grf == true) {
	 * c.reset(); } } if (e.getKey() == e.ENTER) {
	 * c.setValue(Ext.get('nominaldiameteridid').dom.value);
	 * refreshHd_holedrillingForce(); } } } });
	 */

	/*// 直径文本框
	var nominaldiameterCombo = new Ext.form.TextField({
				fieldLabel : '直径',
				hiddenName : 'nominaldiameter',
				name : 'nominaldiameterid',
				id : 'nominaldiameteridid',
				emptyText : '请选择...',
				// triggerAction : 'all',
				// store : nominaldiameterStore,
				// displayField : 'value',
				// valueField : 'value',
				// selectOnFocus : false,
				// editable : true,
				loadingText : '正在加载数据...',
				mode : 'local',
				// vtype: 'numeric',
				// forceSelection : true,
				// pageSize : cln,
				// minListWidth : 270,
				// plugins : [new QM.plugin.PinyinFilter],
				// resizable : true,
				width : document.body.clientWidth / numlign - divnum,
				// listWidth : nominaldiameterArr[0] * nominaldiameterpp + 25,
				
				 * tpl : '<tpl for="."><div x-combo-list-item
				 * class="x-combo-list-item"><img src="' + webContext +
				 * '/dec/combo/boring/nominaldiameter/' + '{value}' + '.png"
				 * width=' + nominaldiameterArr[0] nominaldiameterpp + '
				 * height=' + nominaldiameterArr[1] * nominaldiameterpp + '></div></tpl>',
				 
				listeners : {
					focus : function() {
						// nominaldiameterStore.load();
						setTimeout(
								'Ext.getCmp("nominaldiameteridid").expand();',
								1);
					},
					select : function(c, re, index) {
						refreshHd_holedrilling();
					},
					specialkey : function(c, e) {
						if (e.getKey() == e.ESC) {
							if (parent.grf == true) {
								c.reset();
							}
							refreshHd_holedrillingForce();
						}
						if (e.getKey() == e.ENTER) {

							refreshHd_holedrillingForce();
						}
					}
				}
			});*/

	  
	//提示框
		var gongchengzhijinDisplayWin = new Ext.Window(
				{
					//title : '选择助手',
					id:'gongchengzhijinDisplayWinid',
					x:((document.body.clientWidth)/numlign-divnum)*3+205,
					y:(document.body.clientWidth)*(1/11),
					width : 200,
					//modal : true,
					height : 200,
					frame:false,
					bodyBorder :false,
					 //baseCls: 'my-panel-no-border',
				    //baseCls: 'x-plain', 
			        border:false,
					closeAction : 'hide',
					maximizable : false,
					closable:false,
						//	plain : true,
					
				               
				     items: [ {
							id: 'boxid15',
							xtype : 'box',
							autoEl : {
								tag : 'img',
								style : 'width:100%;height:100%;' ,
								src : 'dec/combo/alter/new/tangkong_gongchengzhijin.png'
							}
						} 
				            
				        ],
				       
					
					listeners : {
						'afterRender':function() {
							setTimeout('close', 1000)}
						
						}
						
					});
	  
	// 公称直径下拉框
	var nominaldiameterCombo = new Ext.form.ComboBox({
		defaultAutoCreate : {
			tag : "input",
			type : "text",
			size : "24",
			autocomplete : "off"
		},
		      fieldLabel : '直径',
				hiddenName : 'nominaldiameter',
				id : 'nominaldiameteridid',
				emptyText : '请选择...',
				triggerAction : 'all',
				store : TKGCZJTSStore,
				displayField : 'text',
				valueField : 'text',
				//selectByValue : false, 
				selectOnFocus : true,
				loadingText : '正在加载数据...',
				mode : 'local',
				forceSelection : true,
				
				// pageSize : cln,
				// minListWidth : 270,
				plugins : [new QM.plugin.PinyinFilter],
				resizable : true,
				//editable : true,
				width : document.body.clientWidth / numlign - divnum,
				
				listWidth :80,
				tpl : '',
				listeners : {
					focus : function() {
						// depthStore.load();
						setTimeout('Ext.getCmp("nominaldiameteridid").expand();', 1);
					},
					expand:function(){gongchengzhijinDisplayWin.show()},
					collapse:function(){gongchengzhijinDisplayWin.hide()},
					select : function(c, re, index) {
						refreshHd_holedrilling();
					},
					specialkey : function(c, e) {
						if (e.getKey() == e.ESC) {
							if (parent.grf == true) {
								c.reset();
							}
							refreshHd_holedrillingForce();

						}
						if (e.getKey() == e.ENTER) {
							  
							c.setValue(Ext.get('nominaldiameteridid').dom.value);
							
							refreshHd_holedrillingForce();
							
				
							
						}
					}
				}
			});
	
	
	// 深度数据
	var depthStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : 'boring.do?code=queryDepthInBoring'
						}),
				reader : new Ext.data.JsonReader({
							totalProperty : 'TOTALCOUNT',
							root : 'ROOT'
						}, [{
									name : 'value'
								} /*
									 * , { name : 'text' }
									 */])
			});
	depthStore.load();
	
	//提示框
	var tangkongshenduDisplayWin = new Ext.Window(
			{
				//title : '选择助手',
				id:'tangkongshenduDisplayWinid',
				x:((document.body.clientWidth)/numlign-divnum)*4+265,
				y:(document.body.clientWidth)*(1/11),
				width : 200,
				//modal : true,
				height : 200,
				frame:false,
				bodyBorder :false,
				 //baseCls: 'my-panel-no-border',
			    //baseCls: 'x-plain', 
		        border:false,
				closeAction : 'hide',
				maximizable : false,
				closable:false,
					//	plain : true,
				
			               
			     items: [ {
						id: 'boxid16',
						xtype : 'box',
						autoEl : {
							tag : 'img',
							style : 'width:100%;height:100%;' ,
							src : 'dec/combo/alter/new/tangkong_tangkongshendu.png'
						}
					} 
			            
			        ],
			       
				
				listeners : {
					'afterRender':function() {
						setTimeout('close', 1000)}
					
					}
					
				});
	
	// 深度下拉框
	var depthCombo = new Ext.form.ComboBox({
				fieldLabel : '深度',
				hiddenName : 'depth',
				id : 'depthid',
				emptyText : '请选择...',
				triggerAction : 'all',
				store : depthStore,
				displayField : 'value',
				valueField : 'value',
				selectByValue : false, 
				selectOnFocus : true,
				loadingText : '正在加载数据...',
				mode : 'local',
				forceSelection : true,
				
				// pageSize : cln,
				// minListWidth : 270,
				plugins : [new QM.plugin.PinyinFilter],
				resizable : true,
				editable : true,
				width : document.body.clientWidth / numlign - divnum,
				listeners : {
					focus : function() {
						// depthStore.load();
						setTimeout('Ext.getCmp("depthid").expand();', 1);
					},
					expand:function(){tangkongshenduDisplayWin.show()},
					collapse:function(){tangkongshenduDisplayWin.hide()},
					select : function(c, re, index) {
						refreshHd_holedrilling();
					},
					specialkey : function(c, e) {
						if (e.getKey() == e.ESC) {
							if (parent.grf == true) {
								c.reset();
							}
							refreshHd_holedrillingForce();

						}
						if (e.getKey() == e.ENTER) {
							  
							c.setValue(Ext.get('depthid').dom.value);
							refreshHd_holedrillingForce();
							
				
							
						}
					}
				}
			});

	// 冷却类型数据
	var coolingtypeStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : 'boring.do?code=queryCoolingtypeInBoring'
						}),
				reader : new Ext.data.JsonReader({
							totalProperty : 'TOTALCOUNT',
							root : 'ROOT'
						}, [{
									name : 'value'
								} /*
									 * , { name : 'text' }
									 */])
			});
	coolingtypeStore.load();
	// 冷却类型下拉框
	var coolingtypeCombo = new Ext.form.ComboBox({
				fieldLabel : '冷却类型',
				hiddenName : 'coolingtype',
				id : 'coolingtypeid',
				emptyText : '请选择...',
				triggerAction : 'all',
				store : coolingtypeStore,
				displayField : 'value',
				valueField : 'value',
				selectOnFocus : true,
				loadingText : '正在加载数据...',
				mode : 'local',
				forceSelection : true,
				editable : false,
				// pageSize : cln,
				// minListWidth : 270,
				// plugins : [new QM.plugin.PinyinFilter],
				resizable : true,
				width : document.body.clientWidth / numlign - divnum,
				listeners : {
					focus : function() {
						// coolingtypeStore.load();
						setTimeout('Ext.getCmp("coolingtypeid").expand();', 1);
					},
					select : function(c, re, index) {
						refreshHd_holedrilling();
					},
					specialkey : function(c, e) {
						if (e.getKey() == e.ESC) {
							if (parent.grf == true) {
								c.reset();
							}
							refreshHd_holedrillingForce();

						}
					}
				}
			});

	// 更新
	function resetCombo() {
		workpieceisotypeCombo.reset();
		cuttypeCombo.reset();
		nominaldiameterCombo.reset();
		depthCombo.reset();
		coolingtypeCombo.reset();
		
		pagesize_combo.reset();
		bbar.pageSize=50;
		hd_holedrillingStoreLoad();
		var currentpage=1;
		var currentpage=bbar.store.currentPage;
		bbar.moveFirst();
		
		hd_blade_boringStoreLoad();
		daoganStoreLoad();
	}

	// 镗孔刀体表格工具栏
	var tbar = new Ext.Toolbar({// workpiecematerialCombo 
		// //workpieceisotypeCombo
		items : [new Ext.Toolbar.TextItem({
							text : '工件材料:',
							autoHeight : true
						}), workpieceisotypeCombo, '-',
				new Ext.Toolbar.TextItem({
							text : '镗孔类型:',
							autoHeight : true
						}), cuttypeCombo, '-', new Ext.Toolbar.TextItem({
							text : '公称直径:',
							autoHeight : true
						}), nominaldiameterCombo, '-',
				new Ext.Toolbar.TextItem({
							text : '镗孔深度:',
							autoHeight : true
						}), depthCombo, '-', new Ext.Toolbar.TextItem({
							text : '冷却类型:',
							autoHeight : true
						}), coolingtypeCombo,'-', '-', {
							text : '刀体打印预览',
							iconCls : 'previewIcon',
							handler : function() {
								printTask();
							}
						},'-', '-', {
							text : '镗孔刀片打印预览',
							iconCls : 'previewIcon',
							handler : function() {
								printTask2();
							}
						},'-', '-', {
							text : '镗刀模块打印预览',
							iconCls : 'previewIcon',
							handler : function() {
								printTask3();
							}
						},  
						'->', {
					text : '重置',
					iconCls : 'tbar_synchronizeIcon',
					handler : function() {
						resetCombo();
					}
				}]
	});

	// 页面过滤
	var filtersHd_holedrilling = new Ext.ux.grid.GridFilters({// string,numeric,date,list,boolean
		encode : true,
		autoReload : false,
		local : true,
		filters : [{
					dataIndex : 'sapcode',
					type : 'string'
				}, {
					dataIndex : 'name',
					type : 'string'
				}, {
					dataIndex : 'type',
					type : 'string'
				}, {
					dataIndex : 'figure',
					type : 'string'
				}, {
					dataIndex : 'figure2',
					type : 'string'
				}, {
					dataIndex : 'brandid',
					type : 'string'
				}, {
					dataIndex : 'nominaldiameter',
					type : 'string'
				}, {
					dataIndex : 'cuttype',
					type : 'string'
				},/* {
					dataIndex : 'typeid',
					type : 'string'
				}, */{
					dataIndex : 'hdtooltype',
					type : 'string'
				}, {
					dataIndex : 'length',
					type : 'numeric'
				}, {
					dataIndex : 'description',
					type : 'string'
				}, {
					dataIndex : 'aname1',
					type : 'string'
				},
				{
					dataIndex : 'anametype1',
					type : 'string'
				},{
					dataIndex : 'aname2',
					type : 'string'
				},
				{
					dataIndex : 'anametype2',
					type : 'string'
				},{
					dataIndex : 'aname3',
					type : 'string'
				},
				{
					dataIndex : 'anametype3',
					type : 'string'
				},{
					dataIndex : 'aname4',
					type : 'string'
				},
				{
					dataIndex : 'anametype4',
					type : 'string'
				},{
					dataIndex : 'remark',
					type : 'string'
				}, {
					dataIndex : 'k1',
					type : 'string'
				}]
	});

	// 页面过滤
	var filtersHd_blade_boring = new Ext.ux.grid.GridFilters({// string,numeric,date,list,boolean
		encode : true,
		autoReload : false,
		local : true,
		filters : [/*
					 * { dataIndex : 'toolholderid', type : 'string' },
					 */{
					dataIndex : 'sapcode',
					type : 'string'
				}, {
					dataIndex : 'name',
					type : 'string'
				}, {
					dataIndex : 'type',
					type : 'string'
				}, {
					dataIndex : 'figure1',
					type : 'string'
				}, {
					dataIndex : 'figure2',
					type : 'string'
				}, {
					dataIndex : 'brandid',
					type : 'string'
				}, {
					dataIndex : 'materialid',
					type : 'string'
				}, {
					dataIndex : 'grooveid',
					type : 'string'
				}, {
					dataIndex : 'length',
					type : 'numeric'
				}, {
					dataIndex : 'nominaldiameter',
					type : 'string'
				},{
					dataIndex : 'shape',
					type : 'string'
				}, {
					dataIndex : 'reliefangle',
					type : 'string'
				}, {
					dataIndex : 'indexabletimes',
					type : 'string'
				}, {
					dataIndex : 'diameter',
					type : 'string'
				}, {
					dataIndex : 'thickness',
					type : 'string'
				}, {
					dataIndex : 'noseradius',
					type : 'string'
				}, {
					dataIndex : 'description',
					type : 'string'
				}, {
					dataIndex : 'remark',
					type : 'string'
				}, {
					dataIndex : 'aname1',
					type : 'string'
				},
				{
					dataIndex : 'anametype1',
					type : 'string'
				},{
					dataIndex : 'aname2',
					type : 'string'
				},
				{
					dataIndex : 'anametype2',
					type : 'string'
				},{
					dataIndex : 'aname3',
					type : 'string'
				},
				{
					dataIndex : 'anametype3',
					type : 'string'
				},{
					dataIndex : 'aname4',
					type : 'string'
				},
				{
					dataIndex : 'anametype4',
					type : 'string'
				},{
					dataIndex : 'featurecode',
					type : 'string'
				}, {
					dataIndex : 'k2',
					type : 'string'
				}]
	});

	// 表格
	var grid = new Ext.grid.GridPanel({
				title : '<span class="commoncss">镗孔刀体</span>',
				header : false,
				height : document.body.clientHeight * grid_ratio,
				id : 'gridid',
				autoScroll : true,
				frame : true,
				region : 'center',
				store : hd_holedrillingStore,
				stripeRows : true,
				sm : sm,
				cm : hd_holedrillingCm,
				tbar : tbar,

				viewConfig : {
					forceFit : false
					// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
				},
				loadMask : {
					msg : '正在加载表格数据,请稍等...'
				},
				view : new Ext.grid.GroupingView(),
				plugins : [filtersHd_holedrilling],
				stateful : sf,
				stateId : 'grid-boring',
				listeners : {
					afterrender : function() {
						if (parent.grf == true) {
							calcButton.hide();
							/*
							 * calcButton2.hide(); calcButton3.hide();
							 */
						} else {
							calcButton.show();
							/*
							 * calcButton2.show(); calcButton3.show();
							 */
						}
					}
				}
			});
	// 表格
	var grid21 = new Ext.grid.GridPanel({
				title : '<span class="commoncss">镗孔刀片</span>',
				header : false,
				height : document.body.clientHeight * (1 - grid_ratio),
				id : 'grid21id',
				autoScroll : true,
				frame : true,
				region : 'center',
				store : hd_blade_boringStore,
				stripeRows : true,
				sm : sm2,
				cm : hd_blade_boringCm,
				// tbar : tbar,
				// bbar : bbar,
				viewConfig : {
					forceFit : false
					// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
				},
				loadMask : {
					msg : '正在加载表格数据,请稍等...'
				},
				view : new Ext.grid.GroupingView(),
				plugins : [filtersHd_blade_boring],
				stateful : sf,
				stateId : 'grid-boring2',
				listeners : {
					afterrender : function() {
						if (parent.grf == true) {
							calcButton.hide();
							/*
							 * calcButton2.hide(); calcButton3.hide();
							 */
						} else {
							calcButton.show();
							/*
							 * calcButton2.show(); calcButton3.show();
							 */
						}
					}
				}
			});

	// Store数据存储（刀杆镗孔刀片）
	var daoganStore = new Ext.data.GroupingStore({
				proxy : new Ext.data.HttpProxy({
					url : 'boring.do?code=queryDaogan'
						// queryHd_blade_boring4Manage是在BoringAction中的方法queryHd_blade_boring4Manage;
					}),
				reader : new Ext.data.JsonReader({
							totalProperty : 'TOTALCOUNT',
							root : 'ROOT'
						}, [/*
							 * { name : 'toolholderid' },
							 */{
									name : 'sapcode'
								}, {
									name : 'name'
								}, {
									name : 'type'
								}, {
									name : 'brandid'
								}, {
									name : 'cuttype'
								}, {
									name : 'standard'
								}, {
									name : 'nodiameter'
								}, {
									name : 'adprecision'
								}, {
									name : 'mainangle'
								}, {
									name : 'teethnumber'
								}, {
									name : 'length'
								}, {
									name : 'mcm'
								}, {
									name : 'mcc'
								}, {
									name : 'coolingtype'
								}, {
									name : 'description'
								}, {
									name : 'remark'
								}, {
									name : 'aname1'
								}, {
									name : 'anametype1'
								}, {
									name : 'aname2'
								}, {
									name : 'anametype2'
								}, {
									name : 'aname3'
								}, {
									name : 'anametype3'
								}, {
									name : 'aname4'
								}, {
									name : 'figure'
								}, {
									name : 'figure2'
								}, {
									name : 'anametype4'
								}]),
				listeners : {

	}
			});

	// 表格
	var grid22 = new Ext.grid.GridPanel({
				title : '<span class="commoncss">镗刀模块</span>',
				header : false,
				height : (document.body.clientHeight) * (1 - grid_ratio),
				id : 'grid22id',
				autoScroll : true,
				frame : true,
				region : 'center',
				store : daoganStore,
				stripeRows : true,
				sm : sm3,
				cm : hd_toolholder_boring_moduleCm,
				// tbar : tbar,
				// bbar : bbar,
				viewConfig : {
					forceFit : true
					// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
				},
				loadMask : {
					msg : '正在加载表格数据,请稍等...'
				},
				view : new Ext.grid.GroupingView(),
				// plugins : [filtersHd_blade_boring],
				stateful : sf,
				stateId : 'grid-boring3',
				listeners : {
					afterrender : function() {
						if (parent.grf == true) {
							calcButton.hide();
							/*
							 * calcButton2.hide(); calcButton3.hide();
							 */
						} else {
							calcButton.show();
							/*
							 * calcButton2.show(); calcButton3.show();
							 */
						}
					}
				}
			});

	// 表格单击事件
	grid.on('rowclick', function(pGrid, rowIndex, event) {
				var recs = pGrid.getSelectionModel().getSelections();
				var rec = grid.getSelectionModel().getSelected();
				// 加载双grid中的下面的grid的数据;
				hd_blade_boringStoreLoad(recs);
				daoganStore.load({
							params : {
								anametype1 : rec.data.anametype1,
								anametype2 : rec.data.anametype2,
								anametype3 : rec.data.anametype3,
								anametype4 : rec.data.anametype4
							}

						});

			});
	// 表格双击事件
	grid.on('rowdblclick', function(grid, rowIndex, event) {
				propertyDisplay();
			});

	// 是否默认选中第一行数据
	bbar.on("change", function() {
				// grid.getSelectionModel().selectFirstRow();
			});

	// 表格单击事件
	grid21.on('rowclick', function(pGrid, rowIndex, event) {
				// Ext.getCmp('modifyid').enable();
				// Ext.getCmp('deleteid').enable();
			});
	// 表格双击事件
	grid21.on('rowdblclick', function(grid, rowIndex, event) {
				propertyDisplay2();
			});

	// 表格单击事件
	grid22.on('rowclick', function(pGrid, rowIndex, event) {
				// Ext.getCmp('modifyid').enable();
				// Ext.getCmp('deleteid').enable();
			});
	// 表格双击事件
	grid22.on('rowdblclick', function(grid, rowIndex, event) {
				propertyDisplay3();
			});
	// 是否默认选中第一行数据

	// 表格右键
	var contextmenu = new Ext.menu.Menu({
				id : 'theContextMenu',
				items : [{
							text : '复制',
							iconCls : 'buildingIcon',
							handler : function() {
								copyCell();
							}
						}, '-', {
							text : '刷新',
							iconCls : 'arrow_refreshIcon',
							handler : function() {
								hd_holedrillingStore.reload();
							}
						}, {
							text : '重置',
							iconCls : 'tbar_synchronizeIcon',
							handler : function() {
								resetCombo();
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

	grid.on("contextmenu", function(e) {// cellcontextmenu
				// //rowcontextmenu
				e.preventDefault();
			});

	// 表格右键
	var contextmenu2 = new Ext.menu.Menu({
				id : 'theContextMenu2',
				items : [{
							text : '复制',
							iconCls : 'buildingIcon',
							handler : function() {
								copyCell2();
							}
						}, '-', {
							text : '刷新',
							iconCls : 'arrow_refreshIcon',
							handler : function() {
								hd_blade_boringStore.reload();
							}
						}, {
							text : '重置',
							iconCls : 'tbar_synchronizeIcon',
							handler : function() {
								resetCombo();
							}
						}]
			});

	// 复制
	function copyCell2() {
		copyToClipboard(infoCell2);
	}

	// 绑定右键
	var infoCell2;
	grid21.on("cellcontextmenu", function(grid21, rowIndex, columnIndex, e) {// cellcontextmenu
				// //rowcontextmenu
				e.preventDefault();
				grid21.getSelectionModel().selectRow(rowIndex);

				var record2 = grid21.getStore().getAt(rowIndex); // 获取record
				var fieldName2 = grid21.getColumnModel()
						.getDataIndex(columnIndex);// 当前列的fieldname
				infoCell2 = record2.get(fieldName2);// 获取当前单元格数据

				contextmenu2.showAt(e.getXY());
			});

	grid21.on("contextmenu2", function(e) {// cellcontextmenu
				// //rowcontextmenu
				e.preventDefault();
			});

	// 表格右键
	var contextmenu3 = new Ext.menu.Menu({
				id : 'theContextMenu3',
				items : [{
							text : '复制',
							iconCls : 'buildingIcon',
							handler : function() {
								copyCell3();
							}
						}, '-', {
							text : '刷新',
							iconCls : 'arrow_refreshIcon',
							handler : function() {
								daoganStore.reload();
							}
						}, {
							text : '重置',
							iconCls : 'tbar_synchronizeIcon',
							handler : function() {
								resetCombo();
							}
						}]
			});

	// 复制
	function copyCell3() {
		copyToClipboard(infoCell3);
	}

	// 绑定右键
	var infoCell3;
	grid22.on("cellcontextmenu", function(grid22, rowIndex, columnIndex, e) {// cellcontextmenu
				// //rowcontextmenu
				e.preventDefault();
				grid22.getSelectionModel().selectRow(rowIndex);

				var record3 = grid22.getStore().getAt(rowIndex); // 获取record
				var fieldName3 = grid22.getColumnModel()
						.getDataIndex(columnIndex);// 当前列的fieldname
				infoCell3 = record3.get(fieldName3);// 获取当前单元格数据

				contextmenu3.showAt(e.getXY());
			});

	grid22.on("contextmenu3", function(e) {// cellcontextmenu
				// //rowcontextmenu
				e.preventDefault();
			});

	// 页面初始自动查询数据
	hd_holedrillingStore.load({
				params : {
					start : 0,
					limit : bbar.pageSize
				}
			});

	var grid2 = new Ext.TabPanel({
				region : 'center',
				id : 'tabsid',
				enableTabScroll : true,
				deferredRender : false,
				autoWidth : true,
				activeTab : 'grid21id',
				height : (document.body.clientHeight) * (1 - grid_ratio),
				// width : document.body.clientWidth,
				buttonAlign : 'right',
				items : [grid21, grid22],
				bbar : bbar,
				listeners : {
					tabchange : function(tabpanel, tab) {
						/*
						 * if (tab.getId() == 'gridid') {//激活了刀体grid;
						 * refreshMilling_toolholder_integralForce(); } else
						 * if(tab.getId() == 'grid2id') {
						 * refreshMilling_toolholder_clampForce(); }
						 */
						if (tabpanel.getActiveTab().getId() == 'grid21id') {

							// 激活了刀体grid;
							// refreshMilling_toolholder_integralForce();
							// milling_toolholder_integralStore.reload();

						} else if (tabpanel.getActiveTab().getId() == 'grid22id'
								& parent.gdlf == true) {
							daoganStore.load({
										params : {
											anametype1 : record.data.anametype1,
											anametype2 : record.data.anametype2,
											anametype3 : record.data.anametype3,
											anametype4 : record.data.anametype4
										}
									});

						}
					}
				}
			});

	var gird1and2 = new Ext.Panel({

				region : 'center',
				frame : false,
				id : 'gird1and2id',
				layout : {
					type : 'vbox',
					align : 'center'
				},
				items : [grid, grid2],
				listeners : {
					resize : function(p, aw, ah, ow, oh) {
						if (!grid_init) {
							if (ah < oh) { // 隐藏了header
								grid.setHeight(grid.height - 80 * grid_ratio);
								grid2.setHeight(grid2.height - 80
										* (1 - grid_ratio));
							} else {
								grid.setHeight(grid.height + 80 * grid_ratio);
								grid2.setHeight(grid2.height + 80
										* (1 - grid_ratio));
							}
						}
						grid_init = false;
					}
				}
			});

	// 布局模型
	var viewport = new Ext.Viewport({
				layout : 'border',
				items : [gird1and2]
			});

	// 刷新刀体
	function refreshHd_holedrilling() {
		if (parent.grf == true) {
			refreshHd_holedrillingForce();
		}
	}

	// 刷新刀体
	function refreshHd_holedrillingForce() {
		hd_holedrillingStoreLoad();
	}

	// 刷新刀片
	function refreshHd_blade_boring() {
		if (parent.grf == true) {
			refreshHd_blade_boringForce();
		}
	}

	// 刷新刀片
	function refreshHd_blade_boringForce() {
		hd_blade_boringStoreLoad();
	}
	// 刷新模块
	function refreshdaogan() {
		if (parent.grf == true) {
			refreshdaoganForce();
		}
	}

	// 刷新模块
	function refreshdaoganForce() {
		daoganStoreLoad();
	}
	// 数据动态加载
	

	// 数据动态加载
	function dataLoadDynamic(pictureTabs,parameterStore,cuttingparameter) {
		var record = grid.getSelectionModel().getSelected(); // 刀体
		var record2 = grid21.getSelectionModel().getSelected();// 刀片
		if (pictureTabs.getActiveTab().getItemId() == 'ctparameterid') {
			parameterStore.load({
						params : {
							workpiecematerialid : workpieceisotypeCombo
									.getValue(),
							k1 : record.data.k1, 
							nominaldiameter:record.data.nominaldiameter,// toolholder
							k2 : record2.data.k2
							// blade
						}
					});
		}
	}

	// 查看镗孔刀具详细信息;
	// TODO 信息详情显示
	function propertyDisplay() {
		var record = grid.getSelectionModel().getSelected();
		var index = grid.getStore().indexOf(record);

		var path = checkImagePath(record.data.figure);
		var path2 = checkImagePath(record.data.figure2);

		var propertygrid = new Ext.grid.PropertyGrid({
					title : '镗刀刀体详情',
					border : true,
					autoSort : false,
					frame : true,
					// ds : hd_toolholder_boringStore,
					id : 'propertyGridid',
					enableColLock : true,
					enableColumnMove : false,
					autoExpandColumn : true,
					loadMask : true,
					stripeRows : true,
					autoScroll : true,
					clicksToEdit : 1,
					propertyNames : {
						/* 'toolholderid' : '刀体编号', */
						'sapcode' : 'SAP编号',
						'name' : '名称',
						'type' : '型号',
						'brandid' : '品牌',
						'cuttype' : '镗孔类型',
						//'typeid' : '刀具类型详情ID',
						'hdtooltype' : '刀具类型',
						'nominaldiameter' : '公称直径',
						'length' : '总长',
						'depth' : '钻孔深度',
						'portsize' : '接口尺寸',
						'centreblade' : '中心刀片',
						'coolingtype' : '冷却类型',
						'description' : '特点',
						'remark' : '备注信息',
						'guideconelength' : '引导锥长度',
						'groovelength' : '沟槽长度',
						'aname1' : '附件1名称',
						'anametype1' : '附件1型号',
						'aname2' : '附件2名称',
						'anametype2' : '附件2型号',
						'aname3' : '附件3名称',
						'anametype3' : '附件3型号',
						'aname4' : '附件4名称',
						'anametype4' : '附件4型号',

						'figure' : '简图',
						'figure2' : '实物图'
						//'k1' : 'k1'
					},

					listeners : {
						beforeedit : function(e) {
							e.cancel = true;
							return false;
						}
					}
				});


		var picturePanel = new Ext.Panel({
			title : '结构简图',
			id : 'picturePanelid',
			autoScroll : true,
			frame : true,
			region : 'center',
			// sm : sm2,
			// cm : milling_toolholder_clampCm,
			// tbar : tbar2,
			// bbar : bbar2,
			viewConfig : {
				forceFit : true
				// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
			},
			loadMask : {
				msg : '正在加载图像数据,请稍等...'
			},
			items : [{
						id : 'boxid',
						xtype : 'box',
						autoEl : {
							tag : 'img',
							style : 'width:80%;height:80%;position:relative;top:10%;left:10%',
							src : path
						}
					}]
				// view : new Ext.grid.GroupingView(),
				// plugins : [filtersMilling_toolholder_clamp],
				// stateful : true,
				// stateId : 'grid-boring-milling_toolholder_clamp'
			});

		
		var picturePanel2 = new Ext.Panel({
			title : '尺寸简图',
			id : 'picturePanel2id',
			autoScroll : true,
			frame : true,
			region : 'center',
			// sm : sm2,
			// cm : milling_toolholder_clampCm,
			// tbar : tbar2,
			// bbar : bbar2,
			viewConfig : {
				forceFit : true
				// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
			},
			loadMask : {
				msg : '正在加载图像数据,请稍等...'
			},
			items : [{
						id : 'boxid6',
						xtype : 'box',
						autoEl : {
							tag : 'img',
							style : 'width:80%;height:80%;position:relative;top:10%;left:10%',
							src : path2
						}
					}]
				// view : new Ext.grid.GroupingView(),
				// plugins : [filtersMilling_toolholder_clamp],
				// stateful : true,
				// stateId : 'grid-boring-milling_toolholder_clamp'
			});
		// 匹配刀片详情表格
		var hd_blade_boringPanel = new Ext.grid.GridPanel({
					title : '匹配刀片',
					// header : false,
					autoScroll : true,
					id : 'hd_blade_boringPanelid',
					// disabled : true,
					frame : true,
					region : 'center',
					store : hd_blade_boringStore,
					stripeRows : true,
					cm : new Ext.grid.ColumnModel([new Ext.grid.RowNumberer({
										header : '序',
										width : 26
									}), /*{
								header : '编号',
								dataIndex : 'bladeid',
								width : 80,
								// hidden:true,
								sortable : true
							}, */{
								header : 'SAP编码',
								dataIndex : 'sapcode',
								width : 80,
								// hidden:true,
								sortable : true
							}, {
								header : '刀片名称',
								dataIndex : 'name',
								width : 80,
								// hidden:true,
								sortable : true
							}, {
								header : '刀片型号',
								dataIndex : 'type',
								width : 80,
								// hidden:true,
								sortable : true
							}, {
								header : '品牌',
								dataIndex : 'brandid',
								width : 80,
								// hidden:true,
								sortable : true
							}, {
								header : '特征码',
								dataIndex : 'featurecode',
								width : 80,
								// hidden:true,
								sortable : true
							}]),
					viewConfig : {
						forceFit : false
						// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
					},
					loadMask : {
						msg : '正在加载表格数据,请稍等...'
					},
					view : new Ext.grid.GroupingView(),
					stateful : sf,
					stateId : 'grid-gt-hd_blade_boring'
				});

		// 匹配模块详情表格
		var modulePanel = new Ext.grid.GridPanel({
					title : '匹配模块',
					// header : false,
					autoScroll : true,
					id : 'modulePanelid',
					// disabled : true,
					frame : true,
					region : 'center',
					store : daoganStore,
					stripeRows : true,
					cm : new Ext.grid.ColumnModel([new Ext.grid.RowNumberer({
										header : '序',
										width : 26
									}), {
								header : 'SAP编号',
								dataIndex : 'sapcode',
								width : 80,
								// hidden:true,
								sortable : true
							},{
								header : '名称',
								dataIndex : 'name',
								width : 80,
								// hidden:true,
								sortable : true
							},  {
								header : '型号',
								dataIndex : 'type',
								width : 80,
								// hidden:true,
								sortable : true
							},  {
								header : '品牌',
								dataIndex : 'brandid',
								width : 80,
								// hidden:true,
								sortable : true
							},  {
								header : '特征码',
								dataIndex : 'featurecode',
								width : 80,
								// hidden:true,
								sortable : true
							}]),
					viewConfig : {
						forceFit : false
						// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
					},
					loadMask : {
						msg : '正在加载表格数据,请稍等...'
					},
					view : new Ext.grid.GroupingView(),
					stateful : sf,
					stateId : 'grid-gt-module'
				});

		var sapStore = new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
						url : 'boring.do?code=querySapinformation'
							// queryToolholder4Manage是在ToolholderAction中的方法queryToolholder4Manage;
						}),
					reader : new Ext.data.JsonReader({
								totalProperty : 'TOTALCOUNT',
								root : 'ROOT'
							}, [{
										name : 'id'
									}, {
										name : 'departmentid'
									}, {
										name : 'storagelocation'
									}, {
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
					cm : new Ext.grid.ColumnModel([new Ext.grid.RowNumberer({
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
								width : 130,
								// hidden : true,
								sortable : true
							}, {
								header : '库存地点',
								dataIndex : 'storagelocation',
								width : 80,
								sortable : true
							}, {
								header : 'SAP编码',
								dataIndex : 'sapcode',
								width : 60,
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
							}, {
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
							}, {
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
							}]),
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
					items : [propertygrid],

					listeners : {
						tabchange : function(tabpanel, tab) {
						}
					}

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
			items : [picturePanel, picturePanel2,hd_blade_boringPanel, modulePanel, sapPanel],
			listeners : {
				tabchange : function(tabpanel, tab) {
					if (tab.getId() == 'hd_blade_boringPanelid') {

						Ext.getCmp('tabsid').setActiveTab(Ext
								.getCmp('grid21id'));
						hd_blade_boringStore.load({
									params : {
										centreblade : record.data.centreblade
									}
								});

					} else if (pictureTabs.getActiveTab().getItemId() == 'picturePanelid') {
						var newsrc = checkImagePath(record.data.figure);
						Ext.getCmp('boxid').getEl().dom.src = newsrc;
					}
					else if (pictureTabs.getActiveTab().getItemId() == 'picturePanel2id') {
						var newsrc = checkImagePath(record.data.figure2);
						Ext.getCmp('boxid6').getEl().dom.src = newsrc;
					}else if (tab.getId() == 'sapPanelid') {
						sapStore.load({
									params : {
										anametype1 : record.data.anametype1,
										aname1 : record.data.aname1,
										aname2 : record.data.aname2,
										aname3 : record.data.aname3,
										aname4 : record.data.aname4,
										anametype2 : record.data.anametype2,
										anametype3 : record.data.anametype3,
										anametype4 : record.data.anametype4
									}
								});
					} else if (tab.getId() == 'modulePanelid') {
						Ext.getCmp('tabsid').setActiveTab(Ext
								.getCmp('grid22id'));
						daoganStore.load({
									params : {
										anametype1 : record.data.anametype1,
										anametype2 : record.data.anametype2,
										anametype3 : record.data.anametype3,
										anametype4 : record.data.anametype4
									}
								});
					}
				}
			}
		});

		var propertyDisplayWin = new Ext.Window({
			title : '镗孔刀具详细信息',
			width : 800,
			modal : true,
			height : 400,
			closeAction : 'close',
			maximizable : true,
			// plain : true,
			layout : 'border',
			items : [propertyTabs, pictureTabs],
			buttons : [{
				text : '上一条',
				id : 'previousbtn',
				iconCls : 'app_leftIcon',
				handler : function() {

					grid.getSelectionModel().selectRow(index - 1);
					grid.getView().focusRow(index - 1);

					index = index - 1;
					if (index <= 0) {
						infoMsg('已经到第一条了.');
						index = 0;
						record = grid.getStore().getAt(index);
						propertygrid.setSource({'SAP编号':	record.data.sapcode ,
							'名称':	record.data.name ,
							'型号':	record.data.type,
							'品牌':	record.data.brandid ,
							'镗孔类型':	record.data.cuttype ,
							'刀具类型详情ID':	record.data.typeid ,
							'刀具类型':	record.data.hdtooltype ,
							'公称直径':	record.data.nominaldiameter ,
							'总长':	record.data.length ,
							'钻孔深度':	record.data.depth ,
							'接口尺寸':	record.data.portsize ,
							'中心刀片':	record.data.centreblade ,
							'冷却类型':	record.data.coolingtype ,
							'特点':	record.data.description ,
							'备注信息':	record.data.remark ,
							'引导锥长度':	record.data.guideconelength ,
							'沟槽长度':	record.data.groovelength ,
							'附件1名称':	record.data.aname1 ,
							'附件1型号':	record.data.anametype1 ,
							'附件2名称':	record.data.aname2 ,
							'附件2型号':	record.data.anametype2 ,
							'附件3名称':	record.data.aname3 ,
							'附件3型号':	record.data.anametype3 ,
							'附件4名称':	record.data.aname4 ,
							'附件4型号':	record.data.anametype4 

							//'k1' :	record.data.k1
							});
						Ext.getCmp('previousbtn').disable();
					} else {
						record = grid.getStore().getAt(index);
						propertygrid.setSource({'SAP编号':	record.data.sapcode ,
							'名称':	record.data.name ,
							'型号':	record.data.type,
							'品牌':	record.data.brandid ,
							'镗孔类型':	record.data.cuttype ,
							'刀具类型详情ID':	record.data.typeid ,
							'刀具类型':	record.data.hdtooltype ,
							'公称直径':	record.data.nominaldiameter ,
							'总长':	record.data.length ,
							'钻孔深度':	record.data.depth ,
							'接口尺寸':	record.data.portsize ,
							'中心刀片':	record.data.centreblade ,
							'冷却类型':	record.data.coolingtype ,
							'特点':	record.data.description ,
							'备注信息':	record.data.remark ,
							'引导锥长度':	record.data.guideconelength ,
							'沟槽长度':	record.data.groovelength ,
							'附件1名称':	record.data.aname1 ,
							'附件1型号':	record.data.anametype1 ,
							'附件2名称':	record.data.aname2 ,
							'附件2型号':	record.data.anametype2 ,
							'附件3名称':	record.data.aname3 ,
							'附件3型号':	record.data.anametype3 ,
							'附件4名称':	record.data.aname4 ,
							'附件4型号':	record.data.anametype4 

							//'k1' :	record.data.k1
							});
						Ext.getCmp('nextbtn').enable();
					}

					if (pictureTabs.getActiveTab().getItemId() == 'hd_blade_boringPanelid') {
						hd_blade_boringStore.load({
									params : {
										centreblade : record.data.centreblade
									}
								});
					}
					if (pictureTabs.getActiveTab().getItemId() == 'sapPanelid') {
						sapStore.load({
									params : {
										anametype1 : record.data.anametype1,
										aname1 : record.data.aname1,
										aname2 : record.data.aname2,
										aname3 : record.data.aname3,
										aname4 : record.data.aname4,
										anametype2 : record.data.anametype2,
										anametype3 : record.data.anametype3,
										anametype4 : record.data.anametype4
									}
								});
					}else if (pictureTabs.getActiveTab().getItemId() == 'picturePanelid') {
						var newsrc = checkImagePath(record.data.figure);
						Ext.getCmp('boxid').getEl().dom.src = newsrc;
					}
					else if (pictureTabs.getActiveTab().getItemId() == 'picturePanel2id') {
						var newsrc = checkImagePath(record.data.figure2);
						Ext.getCmp('boxid6').getEl().dom.src = newsrc;
					}
					if (pictureTabs.getActiveTab().getItemId() == 'modulePanelid') {
						daoganStore.load({
									params : {
										anametype1 : record.data.anametype1,
										anametype2 : record.data.anametype2,
										anametype3 : record.data.anametype3,
										anametype4 : record.data.anametype4
									}
								});
					}
				}
			}, {
				text : '下一条',
				id : 'nextbtn',
				iconCls : 'app_rightIcon',
				handler : function() {
					

					grid.getSelectionModel().selectRow(index + 1);
					grid.getView().focusRow(index + 1);
					index = index + 1;

					if (index >= grid.getStore().getCount() - 1) {
						infoMsg('已经到最后一条了.');
					
						index = grid.getStore().getCount() - 1;
						record = grid.getStore().getAt(
								index);
							propertygrid.setSource({'SAP编号':	record.data.sapcode ,
								'名称':	record.data.name ,
								'型号':	record.data.type,
								'品牌':	record.data.brandid ,
								'镗孔类型':	record.data.cuttype ,
								'刀具类型详情ID':	record.data.typeid ,
								'刀具类型':	record.data.hdtooltype ,
								'公称直径':	record.data.nominaldiameter ,
								'总长':	record.data.length ,
								'钻孔深度':	record.data.depth ,
								'接口尺寸':	record.data.portsize ,
								'中心刀片':	record.data.centreblade ,
								'冷却类型':	record.data.coolingtype ,
								'特点':	record.data.description ,
								'备注信息':	record.data.remark ,
								'引导锥长度':	record.data.guideconelength ,
								'沟槽长度':	record.data.groovelength ,
								'附件1名称':	record.data.aname1 ,
								'附件1型号':	record.data.anametype1 ,
								'附件2名称':	record.data.aname2 ,
								'附件2型号':	record.data.anametype2 ,
								'附件3名称':	record.data.aname3 ,
								'附件3型号':	record.data.anametype3 ,
								'附件4名称':	record.data.aname4 ,
								'附件4型号':	record.data.anametype4 

								//'k1' :	record.data.k1
								});
						Ext.getCmp('nextbtn').disable();
					} else {
						record = grid.getStore().getAt(index);
						propertygrid.setSource({'SAP编号':	record.data.sapcode ,
							'名称':	record.data.name ,
							'型号':	record.data.type,
							'品牌':	record.data.brandid ,
							'镗孔类型':	record.data.cuttype ,
							'刀具类型详情ID':	record.data.typeid ,
							'刀具类型':	record.data.hdtooltype ,
							'公称直径':	record.data.nominaldiameter ,
							'总长':	record.data.length ,
							'钻孔深度':	record.data.depth ,
							'接口尺寸':	record.data.portsize ,
							'中心刀片':	record.data.centreblade ,
							'冷却类型':	record.data.coolingtype ,
							'特点':	record.data.description ,
							'备注信息':	record.data.remark ,
							'引导锥长度':	record.data.guideconelength ,
							'沟槽长度':	record.data.groovelength ,
							'附件1名称':	record.data.aname1 ,
							'附件1型号':	record.data.anametype1 ,
							'附件2名称':	record.data.aname2 ,
							'附件2型号':	record.data.anametype2 ,
							'附件3名称':	record.data.aname3 ,
							'附件3型号':	record.data.anametype3 ,
							'附件4名称':	record.data.aname4 ,
							'附件4型号':	record.data.anametype4 

							//'k1' :	record.data.k1
							});
						Ext.getCmp('previousbtn').enable();
					}

					if (pictureTabs.getActiveTab().getItemId() == 'hd_blade_boringPanelid') {
						hd_blade_boringStore.load({
									params : {
										centreblade : record.data.centreblade
									}
								});
					}
					if (pictureTabs.getActiveTab().getItemId() == 'sapPanelid') {
						sapStore.load({
									params : {
										anametype1 : record.data.anametype1,
										aname1 : record.data.aname1,
										aname2 : record.data.aname2,
										aname3 : record.data.aname3,
										aname4 : record.data.aname4,
										anametype2 : record.data.anametype2,
										anametype3 : record.data.anametype3,
										anametype4 : record.data.anametype4
									}
								});
					}else if (pictureTabs.getActiveTab().getItemId() == 'picturePanelid') {
						var newsrc = checkImagePath(record.data.figure);
						Ext.getCmp('boxid').getEl().dom.src = newsrc;
						
					}
					else if (pictureTabs.getActiveTab().getItemId() == 'picturePanel2id') {
						var newsrc = checkImagePath(record.data.figure2);
						Ext.getCmp('boxid6').getEl().dom.src = newsrc;
					
					}
					if (pictureTabs.getActiveTab().getItemId() == 'modulePanelid') {
						daoganStore.load({
									params : {
										anametype1 : record.data.anametype1,
										anametype2 : record.data.anametype2,
										anametype3 : record.data.anametype3,
										anametype4 : record.data.anametype4
									}
								});
					}
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
				}
			}],
			listeners : {
				afterrender : function(tabpanel, tab) {
					propertygrid.setSource({'SAP编号':	record.data.sapcode ,
						'名称':	record.data.name ,
						'型号':	record.data.type,
						'品牌':	record.data.brandid ,
						'镗孔类型':	record.data.cuttype ,
						'刀具类型详情ID':	record.data.typeid ,
						'刀具类型':	record.data.hdtooltype ,
						'公称直径':	record.data.nominaldiameter ,
						'总长':	record.data.length ,
						'钻孔深度':	record.data.depth ,
						'接口尺寸':	record.data.portsize ,
						'中心刀片':	record.data.centreblade ,
						'冷却类型':	record.data.coolingtype ,
						'特点':	record.data.description ,
						'备注信息':	record.data.remark ,
						'引导锥长度':	record.data.guideconelength ,
						'沟槽长度':	record.data.groovelength ,
						'附件1名称':	record.data.aname1 ,
						'附件1型号':	record.data.anametype1 ,
						'附件2名称':	record.data.aname2 ,
						'附件2型号':	record.data.anametype2 ,
						'附件3名称':	record.data.aname3 ,
						'附件3型号':	record.data.anametype3 ,
						'附件4名称':	record.data.aname4 ,
						'附件4型号':	record.data.anametype4 

						//'k1' :	record.data.k1
						});
				}
			}
		});

		propertyDisplayWin.show();
	}

	// 查看镗刀刀片详细信息;
	// TODO 信息详情显示
	function propertyDisplay2() {
		var record = grid21.getSelectionModel().getSelected();
		var index = grid21.getStore().indexOf(record);

		// var
		// properitystore=Ext.grid.PropertyStore(properitygrid,hd_toolholder_tappingStore);

		var path = checkImagePath(record.data.figure);
		var path2 = checkImagePath(record.data.figure2);

		var propertygrid = new Ext.grid.PropertyGrid({
					title : '镗刀刀片详情',
					border : true,
					autoSort : false,
					frame : true,
					// store : hd_toolholder_tappingStore,
					// cm : hd_toolholder_tappingCm,
					id : 'propertyGridid',
					// enableColLock : true,
					// enableColumnMove : false,
					autoExpandColumn : true,
					loadMask : true,
					stripeRows : true,
					autoScroll : true,
					clicksToEdit : 1,
					propertyNames : {
						//'bladeid' : '刀片id',
						'sapcode' : 'SAP编号',
						'name' : '名称',
						'type' : '型号',
						'figure' : '简图',
						'figure2' : '实物图',
						'brandid' : '品牌',
						'materialid' : '材质',
						'grooveid' : '槽型',
						'shape' : '形状',
						'reliefangle' : '后角',
						'indexabletimes' : '可转位次数',
						'diameter' : '内切圆直径',
						'thickness' : '厚度',
						'noseradius' : '刀尖圆弧半径',
						'description' : '特点',
						'remark' : '备注信息',
						'featurecode' : '特征码ID'

						// 'k2' : '系数K2'

					},
					listeners : {
						beforeedit : function(e) {
							e.cancel = true;
							return false;
						},
						reconfigure : function(grid, store, columnModel) {
							infoMsg("reconfigure rest!");
						}
					}
				});

		/*
		 * propertygrid.reconfigure(hd_toolholder_tappingStore,
		 * hd_toolholder_tappingCm);
		 */

		// Store数据存储
		var parameterStore = new Ext.data.GroupingStore({
					proxy : new Ext.data.HttpProxy({
						url : 'boring.do?code=queryCtparameter'
							// queryMilling_blade_clamp4Manage是在TempletmillingAction中的方法queryMilling_blade_clamp4Manage;
						}),
					reader : new Ext.data.JsonReader({
								totalProperty : 'TOTALCOUNT',
								root : 'ROOT'
							}, [{
										name : 'vc'
									}, {
										name : 'fn'
									}, {
										name : 'shape'
									}, {
										name : 'removalrates'
									}, {
										name : 's'
									}, {
										name : 'f'
									}, {
										name : 'power'
									}])
				});

		// 列模型
		var parameterCm = new Ext.grid.ColumnModel([{
					header : 'Vc<br />(m/min)',
					dataIndex : 'vc',
					width : 60,
					align : 'center',
					// renderer : THICKNESS2Render,
					// hidden : true,
					sortable : true
				}, {
					header : 'S<br />(r/min)',
					dataIndex : 's',
					width : 100,
					align : 'center',
					// renderer : THICKNESS2Render,
					// hidden : true,
					sortable : true
				}, {
					header : 'fn<br />(mm/r)',
					dataIndex : 'fn',
					width : 60,
					align : 'center',
					// hidden : true,
					sortable : true
				}, {
					header : 'F<br />(mm/min)',
					dataIndex : 'f',
					width : 100,
					align : 'center',
					// renderer : THICKNESS2Render,
					// hidden : true,
					sortable : true
				},{
					header : 'shape',
					dataIndex : 'shape',
					width : 60,
					align : 'center',
				    hidden : true,
					sortable : true
				}, {
					header : 'Q<br />(cm^3/min)',
					dataIndex : 'removalrates',
					width : 100,
					align : 'center',
					// renderer : THICKNESS2Render,
					hidden : true,
					sortable : true
				},  {
					header : 'Pc<br />(kW)',
					dataIndex : 'power',
					width : 60,
					align : 'center',
					hidden : true,
					sortable : true
				}]);

		var cuttingparameter = new Ext.grid.GridPanel({
			title : '切削参数',
			header : false,
			height : 500,
			id : 'ctparameterid',
			autoScroll : true,
			frame : true,
			// disabled : true,
			region : 'center',
			store : parameterStore,
			stripeRows : true,
			// sm : sm2,
			cm : parameterCm,
			// tbar : tbar2,
			// bbar : bbar2,
			viewConfig : {
				forceFit : false
				// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
			},
			loadMask : {
				msg : '正在加载表格数据,请稍等...'
			}
				// view : new Ext.grid.GroupingView(),
				// plugins : [filtersMilling_toolholder_clamp],
				// stateful : true,
				// stateId : 'grid-reaming-milling_toolholder_clamp'
			});

		var sapStore = new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
						url : 'generalturning.do?code=querySapinformation'
							// queryToolholder4Manage是在ToolholderAction中的方法queryToolholder4Manage;
						}),
					reader : new Ext.data.JsonReader({
								totalProperty : 'TOTALCOUNT',
								root : 'ROOT'
							}, [{
										name : 'id'
									}, {
										name : 'departmentid'
									}, {
										name : 'storagelocation'
									}, {
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
					cm : new Ext.grid.ColumnModel([new Ext.grid.RowNumberer({
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
								width : 130,
								// hidden : true,
								sortable : true
							}, {
								header : '库存地点',
								dataIndex : 'storagelocation',
								width : 80,
								sortable : true
							}, {
								header : 'SAP编码',
								dataIndex : 'sapcode',
								width : 60,
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
							}, {
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
							}, {
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
							}]),
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

		var picturePanel = new Ext.Panel({
			title : '结构简图',
			id : 'picturePanelid',
			autoScroll : true,
			frame : true,
			region : 'center',
			// sm : sm2,
			// cm : milling_toolholder_clampCm,
			// tbar : tbar2,
			// bbar : bbar2,
			viewConfig : {
				forceFit : true
				// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
			},
			loadMask : {
				msg : '正在加载图像数据,请稍等...'
			},
			items : [{
						id : 'boxid2',
						xtype : 'box',
						autoEl : {
							tag : 'iframe',
							style : 'width:80%;height:80%;position:relative;top:10%;left:10%',
							src : path
						}
					}]
				// view : new Ext.grid.GroupingView(),
				// plugins : [filtersMilling_toolholder_clamp],
				// stateful : true,
				// stateId : 'grid-reaming-milling_toolholder_clamp'
			});

		var sizePanel = new Ext.Panel({
			title : '尺寸简图',
			id : 'sizePanelid',
			autoScroll : true,
			frame : true,
			region : 'center',
			// sm : sm2,
			// cm : milling_toolholder_clampCm,
			// tbar : tbar2,
			// bbar : bbar2,
			viewConfig : {
				forceFit : true
				// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
			},
			loadMask : {
				msg : '正在加载图像数据,请稍等...'
			},
			items : [{
						id : 'boxid3',
						xtype : 'box',
						autoEl : {
							tag : 'iframe',
							style : 'width:80%;height:80%;position:relative;top:10%;left:10%',
							src : path2
						}
					}]
				// view : new Ext.grid.GroupingView(),
				// plugins : [filtersMilling_toolholder_clamp],
				// stateful : true,
				// stateId : 'grid-reaming-milling_toolholder_clamp'
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
			items : [propertygrid]
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
			items : [picturePanel, sizePanel, sapPanel, cuttingparameter],
			listeners : {
				tabchange : function(tabpanel, tab) {
					if (tab.getId() == 'ctparameterid') {
						
						dataLoadDynamic(pictureTabs,parameterStore,cuttingparameter);
						
					} else if (pictureTabs.getActiveTab().getItemId() == 'picturePanelid') {
						var newsrc = checkImagePath(record.data.figure);
						Ext.getCmp('boxid2').getEl().dom.src = newsrc;
					} else if (pictureTabs.getActiveTab().getItemId() == 'sizePanelid') {

						var newsrc = checkImagePath(record.data.figure2);
						Ext.getCmp('boxid3').getEl().dom.src = newsrc;

					} else if (tab.getId() == 'sapPanelid') {
						sapStore.load({
									params : {
										sapcode : record.data.sapcode
									}
								});
					}

				}
			}
		});

		var propertyDisplayWin = new Ext.Window({
			title : '镗刀刀片详细信息',
			width : 800,
			modal : true,
			height : 400,
			closeAction : 'close',
			maximizable : true,
			// plain : true,
			layout : 'border',
			items : [propertyTabs, pictureTabs],
			buttons : [{
				text : '上一条',
				id : 'previousbtn',
				iconCls : 'app_leftIcon',
				handler : function() {
					grid21.getSelectionModel().selectRow(index - 1);
					grid21.getView().focusRow(index - 1);
					index = index - 1;
					if (index <= 0) {
						infoMsg('已经到第一条了.');
						// grid.getSelectionModel().selectRow(index
						// + 1);
						// grid.getView().focusRow(index
						// + 1);
						index = 0;
						record = grid21.getStore().getAt(index);
						propertygrid.setSource({'SAP编号':	record.data.sapcode ,
							'名称':	record.data.name ,
							'型号':	record.data.type ,

							'品牌':	record.data.brandid ,
							'材质':	record.data.materialid ,
							'槽型':	record.data.grooveid ,
							'形状':	record.data.shape ,
							'后角':	record.data.reliefangle ,
							'可转位次数':	record.data.indexabletimes ,
							'内切圆直径':	record.data.diameter ,
							'厚度':	record.data.thickness ,
							'刀尖圆弧半径':	record.data.noseradius ,
							'特点':	record.data.description ,
							'备注信息':	record.data.remark ,
							'特征码ID':	record.data.featurecode });
						Ext.getCmp('previousbtn').disable();
					} else {
						record = grid21.getStore().getAt(index);
						propertygrid.setSource({'SAP编号':	record.data.sapcode ,
							'名称':	record.data.name ,
							'型号':	record.data.type ,

							'品牌':	record.data.brandid ,
							'材质':	record.data.materialid ,
							'槽型':	record.data.grooveid ,
							'形状':	record.data.shape ,
							'后角':	record.data.reliefangle ,
							'可转位次数':	record.data.indexabletimes ,
							'内切圆直径':	record.data.diameter ,
							'厚度':	record.data.thickness ,
							'刀尖圆弧半径':	record.data.noseradius ,
							'特点':	record.data.description ,
							'备注信息':	record.data.remark ,
							'特征码ID':	record.data.featurecode });
						Ext.getCmp('nextbtn').enable();
					}

					if (pictureTabs.getActiveTab().getItemId() == 'ctparameterid') {
						dataLoadDynamic(pictureTabs,parameterStore,cuttingparameter);
					} else if (pictureTabs.getActiveTab().getItemId() == 'picturePanelid') {
						var newsrc = checkImagePath(record.data.figure);
						Ext.getCmp('boxid2').getEl().dom.src = newsrc;
					} else if (pictureTabs.getActiveTab().getItemId() == 'sizePanelid') {

						var newsrc = checkImagePath(record.data.figure2);
						Ext.getCmp('boxid3').getEl().dom.src = newsrc;

					} else if (pictureTabs.getActiveTab().getItemId() == 'sapPanelid') {
						sapStore.load({
									params : {
										sapcode : record.data.sapcode
									}
								});
					}

				}
			}, {
				text : '下一条',
				id : 'nextbtn',
				iconCls : 'app_rightIcon',
				handler : function() {
					grid21.getSelectionModel().selectRow(index + 1);
					grid21.getView().focusRow(index + 1);
					index = index + 1;
					if (index >= grid21.getStore().getCount() - 1) {
						infoMsg('已经到最后一条了.');
						// grid.getSelectionModel().selectRow(index
						// - 1);
						// grid.getView().focusRow(index
						// - 1);
						index = grid21.getStore().getCount() - 1;
						record = grid21.getStore().getAt(index);
						propertygrid.setSource({'SAP编号':	record.data.sapcode ,
							'名称':	record.data.name ,
							'型号':	record.data.type ,

							'品牌':	record.data.brandid ,
							'材质':	record.data.materialid ,
							'槽型':	record.data.grooveid ,
							'形状':	record.data.shape ,
							'后角':	record.data.reliefangle ,
							'可转位次数':	record.data.indexabletimes ,
							'内切圆直径':	record.data.diameter ,
							'厚度':	record.data.thickness ,
							'刀尖圆弧半径':	record.data.noseradius ,
							'特点':	record.data.description ,
							'备注信息':	record.data.remark ,
							'特征码ID':	record.data.featurecode });
						Ext.getCmp('nextbtn').disable();
					} else {
						record = grid21.getStore().getAt(index);
						propertygrid.setSource({'SAP编号':	record.data.sapcode ,
							'名称':	record.data.name ,
							'型号':	record.data.type ,

							'品牌':	record.data.brandid ,
							'材质':	record.data.materialid ,
							'槽型':	record.data.grooveid ,
							'形状':	record.data.shape ,
							'后角':	record.data.reliefangle ,
							'可转位次数':	record.data.indexabletimes ,
							'内切圆直径':	record.data.diameter ,
							'厚度':	record.data.thickness ,
							'刀尖圆弧半径':	record.data.noseradius ,
							'特点':	record.data.description ,
							'备注信息':	record.data.remark ,
							'特征码ID':	record.data.featurecode });
						Ext.getCmp('previousbtn').enable();
					}
					if (pictureTabs.getActiveTab().getItemId() == 'ctparameterid') {
						dataLoadDynamic(pictureTabs,parameterStore,cuttingparameter);
					} else if (pictureTabs.getActiveTab().getItemId() == 'picturePanelid') {
						var newsrc = checkImagePath(record.data.figure);
						Ext.getCmp('boxid2').getEl().dom.src = newsrc;
					} else if (pictureTabs.getActiveTab().getItemId() == 'sizePanelid') {

						var newsrc = checkImagePath(record.data.figure2);
						Ext.getCmp('boxid3').getEl().dom.src = newsrc;

					} else if (pictureTabs.getActiveTab().getItemId() == 'sapPanelid') {
						sapStore.load({
									params : {
										sapcode : record.data.sapcode
									}
								});
					}
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
				}
			}],
			listeners : {
				afterrender : function(tabpanel, tab) {
					propertygrid.setSource({'SAP编号':	record.data.sapcode ,
						'名称':	record.data.name ,
						'型号':	record.data.type ,

						'品牌':	record.data.brandid ,
						'材质':	record.data.materialid ,
						'槽型':	record.data.grooveid ,
						'形状':	record.data.shape ,
						'后角':	record.data.reliefangle ,
						'可转位次数':	record.data.indexabletimes ,
						'内切圆直径':	record.data.diameter ,
						'厚度':	record.data.thickness ,
						'刀尖圆弧半径':	record.data.noseradius ,
						'特点':	record.data.description ,
						'备注信息':	record.data.remark ,
						'特征码ID':	record.data.featurecode});
				},
				beforeshow : function(win) {
					var workpiecematerialid = workpieceisotypeCombo.getValue();
					if (workpiecematerialid != "") {
						Ext.getCmp('ctparameterid').enable();
					} else {
						Ext.getCmp('ctparameterid').disable();
					}
				}
				/*
				 * show : function(win) { hd_toolholder_tappingStore.load(); }
				 */
			}
		});

		propertyDisplayWin.show();
	}

	// 查看镗刀模块详细信息;
	// TODO 信息详情显示
	function propertyDisplay3() {
		var record = grid22.getSelectionModel().getSelected();
		var index = grid22.getStore().indexOf(record);

		// var
		// properitystore=Ext.grid.PropertyStore(properitygrid,hd_toolholder_tappingStore);

		var path = checkImagePath(record.data.figure);
		var path2 = checkImagePath(record.data.figure2);

		var propertygrid = new Ext.grid.PropertyGrid({
					title : '镗刀模块详情',
					border : true,
					autoSort : false,
					frame : true,
					// store : hd_toolholder_tappingStore,
					// cm : hd_toolholder_tappingCm,
					id : 'propertyGridid',
					// enableColLock : true,
					// enableColumnMove : false,
					autoExpandColumn : true,
					loadMask : true,
					stripeRows : true,
					autoScroll : true,
					clicksToEdit : 1,
					propertyNames : {
						/* 'toolholderid' : '刀体编号', */
						'sapcode' : 'SAP编号',
						'name' : '名称',
						'type' : '型号',
						'figure' : '简图',
						'figure2' : '实物图',
						'brandid' : '品牌',
						'cuttype' : '切削类型',
						'standard' : '标准',
						'nodiameter' : '公称直径',
						'adprecision' : '可调精度',
						'mainangle' : '主偏角',
						'teethnumber' : '齿数',
						'length' : '总长',
						'mcm' : 'MCM',
						'mcc' : 'MCC',
						'coolingtype' : '冷却类型',

						'description' : '特点',
						'remark' : '备注信息',
						'aname1' : '附件1名称',
						'anametype1' : '附件1类型',
						'aname2' : '附件2名称',
						'anametype2' : '附件2类型',
						'aname3' : '附件3名称',
						'anametype3' : '附件3类型',
						'aname4' : '附件4名称',
						'anametype4' : '附件4类型'
					},
					listeners : {
						beforeedit : function(e) {
							e.cancel = true;
							return false;
						},
						reconfigure : function(grid, store, columnModel) {
							infoMsg("reconfigure rest!");
						}
					}
				});

		/*
		 * propertygrid.reconfigure(hd_toolholder_tappingStore,
		 * hd_toolholder_tappingCm);
		 */

		// Store数据存储
		var parameterStore = new Ext.data.GroupingStore({
					proxy : new Ext.data.HttpProxy({
						url : 'boring.do?code=queryCtparameter'
							// queryMilling_blade_clamp4Manage是在TempletmillingAction中的方法queryMilling_blade_clamp4Manage;
						}),
					reader : new Ext.data.JsonReader({
								totalProperty : 'TOTALCOUNT',
								root : 'ROOT'
							}, [{
								name : 'vc'
							}, {
								name : 'fn'
							}, {
								name : 'shape'
							}, {
								name : 'removalrates'
							}, {
								name : 's'
							}, {
								name : 'f'
							}, {
								name : 'power'
							}])
				});

		// 列模型
		var parameterCm = new Ext.grid.ColumnModel([{
					header : 'vc',
					dataIndex : 'vc',
					width : 60,
					align : 'center',
					// renderer : THICKNESS2Render,
					// hidden : true,
					sortable : true
				}, {
					header : 'fn',
					dataIndex : 'fn',
					width : 60,
					align : 'center',
					// hidden : true,
					sortable : true
				}, {
					header : 'shape',
					dataIndex : 'shape',
					width : 60,
					align : 'center',
					// hidden : true,
					sortable : true
				}, {
					header : 'removalrates',
					dataIndex : 'removalrates',
					width : 100,
					align : 'center',
					// renderer : THICKNESS2Render,
					// hidden : true,
					sortable : true
				}, {
					header : 'power',
					dataIndex : 'power',
					width : 60,
					align : 'center',
					// hidden : true,
					sortable : true
				}]);

		var cuttingparameter = new Ext.grid.GridPanel({
			title : '切削参数',
			header : false,
			height : 500,
			id : 'ctparameterid',
			autoScroll : true,
			frame : true,
			// disabled : true,
			region : 'center',
			store : parameterStore,
			stripeRows : true,
			// sm : sm2,
			cm : parameterCm,
			// tbar : tbar2,
			// bbar : bbar2,
			viewConfig : {
				forceFit : false
				// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
			},
			loadMask : {
				msg : '正在加载表格数据,请稍等...'
			}
				// view : new Ext.grid.GroupingView(),
				// plugins : [filtersMilling_toolholder_clamp],
				// stateful : true,
				// stateId : 'grid-reaming-milling_toolholder_clamp'
			});

		var sapStore = new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
						url : 'generalturning.do?code=querySapinformation'
							// queryToolholder4Manage是在ToolholderAction中的方法queryToolholder4Manage;
						}),
					reader : new Ext.data.JsonReader({
								totalProperty : 'TOTALCOUNT',
								root : 'ROOT'
							}, [{
										name : 'id'
									}, {
										name : 'departmentid'
									}, {
										name : 'storagelocation'
									}, {
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
					cm : new Ext.grid.ColumnModel([new Ext.grid.RowNumberer({
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
								width : 130,
								// hidden : true,
								sortable : true
							}, {
								header : '库存地点',
								dataIndex : 'storagelocation',
								width : 80,
								sortable : true
							}, {
								header : 'SAP编码',
								dataIndex : 'sapcode',
								width : 60,
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
							}, {
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
							}, {
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
							}]),
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

		var picturePanel = new Ext.Panel({
			title : '结构简图',
			id : 'picturePanelid',
			autoScroll : true,
			frame : true,
			region : 'center',
			// sm : sm2,
			// cm : milling_toolholder_clampCm,
			// tbar : tbar2,
			// bbar : bbar2,
			viewConfig : {
				forceFit : true
				// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
			},
			loadMask : {
				msg : '正在加载图像数据,请稍等...'
			},
			items : [{
						id : 'boxid4',
						xtype : 'box',
						autoEl : {
							tag : 'img',
							style : 'width:80%;height:80%;position:relative;top:10%;left:10%',
							src : path
						}
					}]
				// view : new Ext.grid.GroupingView(),
				// plugins : [filtersMilling_toolholder_clamp],
				// stateful : true,
				// stateId : 'grid-reaming-milling_toolholder_clamp'
			});

		var sizePanel = new Ext.Panel({
			title : '尺寸简图',
			id : 'sizePanelid',
			autoScroll : true,
			frame : true,
			region : 'center',
			// sm : sm2,
			// cm : milling_toolholder_clampCm,
			// tbar : tbar2,
			// bbar : bbar2,
			viewConfig : {
				forceFit : true
				// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
			},
			loadMask : {
				msg : '正在加载图像数据,请稍等...'
			},
			items : [{
						id : 'boxid5',
						xtype : 'box',
						autoEl : {
							tag : 'img',
							style : 'width:80%;height:80%;position:relative;top:10%;left:10%',
							src : path2
						}
					}]
				// view : new Ext.grid.GroupingView(),
				// plugins : [filtersMilling_toolholder_clamp],
				// stateful : true,
				// stateId : 'grid-reaming-milling_toolholder_clamp'
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
			items : [propertygrid]
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
			items : [picturePanel, sizePanel, /* cuttingparameter, */
					sapPanel],
			listeners : {
				tabchange : function(tabpanel, tab) {
					if (tab.getId() == 'ctparameterid') {
						parameterStore.load({
									params : {
										workpiecematerialid : workpieceisotypeCombo
												.getValue(),
												nominaldiameter:record.data.nominaldiameter,
										k2 : record.data.k2

									}
								});
					} else if (pictureTabs.getActiveTab().getItemId() == 'picturePanelid') {
						var newsrc = checkImagePath(record.data.figure);
						Ext.getCmp('boxid4').getEl().dom.src = newsrc;
					} else if (pictureTabs.getActiveTab().getItemId() == 'sizePanelid') {

						var newsrc = checkImagePath(record.data.figure2);
						Ext.getCmp('boxid5').getEl().dom.src = newsrc;

					} else if (tab.getId() == 'sapPanelid') {
						sapStore.load({
									params : {
										sapcode : record.data.sapcode
									}
								});
					}

				}
			}
		});

		var propertyDisplayWin = new Ext.Window({
			title : '模块详细信息',
			width : 800,
			modal : true,
			height : 400,
			closeAction : 'close',
			maximizable : true,
			// plain : true,
			layout : 'border',
			items : [propertyTabs, pictureTabs],
			buttons : [{
				text : '上一条',
				id : 'previousbtn',
				iconCls : 'app_leftIcon',
				handler : function() {
					grid22.getSelectionModel().selectRow(index - 1);
					grid22.getView().focusRow(index - 1);
					index = index - 1;
					if (index <= 0) {
						infoMsg('已经到第一条了.');
						// grid.getSelectionModel().selectRow(index
						// + 1);
						// grid.getView().focusRow(index
						// + 1);
						index = 0;
						record = grid22.getStore().getAt(index);
						propertygrid.setSource({'SAP编号':	record.data.sapcode ,
							'名称':	record.data.name,
							'型号':	record.data.type ,

							'品牌':	record.data.brandid ,
							'切削类型':	record.data.cuttype ,
							'标准':	record.data.standard ,
							'公称直径':	record.data.nodiameter ,
							'可调精度':	record.data.adprecision ,
							'主偏角':	record.data.mainangle ,
							'齿数':	record.data.teethnumber ,
							'总长':	record.data.length ,
							'MCM':	record.data.mcm ,
							'MCC':	record.data.mcc ,
							'冷却类型':	record.data.coolingtype ,
							'特点':	record.data.description ,
							'备注信息':	record.data.remark ,
							'附件1名称':	record.data.aname1 ,
							'附件1类型':	record.data.anametype1 ,
							'附件2名称':	record.data.aname2 ,
							'附件2类型':	record.data.anametype2 ,
							'附件3名称':	record.data.aname3 ,
							'附件3类型':	record.data.anametype3 ,
							'附件4名称':	record.data.aname4 ,
							'附件4类型':	record.data.anametype4});
						Ext.getCmp('previousbtn').disable();
					} else {
						record = grid22.getStore().getAt(index);
						propertygrid.setSource({'SAP编号':	record.data.sapcode ,
							'名称':	record.data.name,
							'型号':	record.data.type ,

							'品牌':	record.data.brandid ,
							'切削类型':	record.data.cuttype ,
							'标准':	record.data.standard ,
							'公称直径':	record.data.nodiameter ,
							'可调精度':	record.data.adprecision ,
							'主偏角':	record.data.mainangle ,
							'齿数':	record.data.teethnumber ,
							'总长':	record.data.length ,
							'MCM':	record.data.mcm ,
							'MCC':	record.data.mcc ,
							'冷却类型':	record.data.coolingtype ,
							'特点':	record.data.description ,
							'备注信息':	record.data.remark ,
							'附件1名称':	record.data.aname1 ,
							'附件1类型':	record.data.anametype1 ,
							'附件2名称':	record.data.aname2 ,
							'附件2类型':	record.data.anametype2 ,
							'附件3名称':	record.data.aname3 ,
							'附件3类型':	record.data.anametype3 ,
							'附件4名称':	record.data.aname4 ,
							'附件4类型':	record.data.anametype4});
						Ext.getCmp('nextbtn').enable();
					}

					if (pictureTabs.getActiveTab().getItemId() == 'ctparameterid') {
						dataLoadDynamic(parameterStore);
					} else if (pictureTabs.getActiveTab().getItemId() == 'picturePanelid') {
						var newsrc = checkImagePath(record.data.figure);
						Ext.getCmp('boxid').getEl().dom.src = newsrc;
					} else if (pictureTabs.getActiveTab().getItemId() == 'sizePanelid') {

						var newsrc = checkImagePath(record.data.figure2);
						Ext.getCmp('boxid2').getEl().dom.src = newsrc;

					} else if (pictureTabs.getActiveTab().getItemId() == 'sapPanelid') {
						sapStore.load({
									params : {
										sapcode : record.data.sapcode
									}
								});
					}

				}
			}, {
				text : '下一条',
				id : 'nextbtn',
				iconCls : 'app_rightIcon',
				handler : function() {
					grid22.getSelectionModel().selectRow(index + 1);
					grid22.getView().focusRow(index + 1);
					index = index + 1;
					if (index >= grid22.getStore().getCount() - 1) {
						infoMsg('已经到最后一条了.');
						// grid.getSelectionModel().selectRow(index
						// - 1);
						// grid.getView().focusRow(index
						// - 1);
						index = grid22.getStore().getCount() - 1;
						record = grid22.getStore().getAt(index);
						propertygrid.setSource({'SAP编号':	record.data.sapcode ,
							'名称':	record.data.name,
							'型号':	record.data.type ,

							'品牌':	record.data.brandid ,
							'切削类型':	record.data.cuttype ,
							'标准':	record.data.standard ,
							'公称直径':	record.data.nodiameter ,
							'可调精度':	record.data.adprecision ,
							'主偏角':	record.data.mainangle ,
							'齿数':	record.data.teethnumber ,
							'总长':	record.data.length ,
							'MCM':	record.data.mcm ,
							'MCC':	record.data.mcc ,
							'冷却类型':	record.data.coolingtype ,
							'特点':	record.data.description ,
							'备注信息':	record.data.remark ,
							'附件1名称':	record.data.aname1 ,
							'附件1类型':	record.data.anametype1 ,
							'附件2名称':	record.data.aname2 ,
							'附件2类型':	record.data.anametype2 ,
							'附件3名称':	record.data.aname3 ,
							'附件3类型':	record.data.anametype3 ,
							'附件4名称':	record.data.aname4 ,
							'附件4类型':	record.data.anametype4});
						Ext.getCmp('nextbtn').disable();
					} else {
						record = grid22.getStore().getAt(index);
						propertygrid.setSource({'SAP编号':	record.data.sapcode ,
							'名称':	record.data.name,
							'型号':	record.data.type ,

							'品牌':	record.data.brandid ,
							'切削类型':	record.data.cuttype ,
							'标准':	record.data.standard ,
							'公称直径':	record.data.nodiameter ,
							'可调精度':	record.data.adprecision ,
							'主偏角':	record.data.mainangle ,
							'齿数':	record.data.teethnumber ,
							'总长':	record.data.length ,
							'MCM':	record.data.mcm ,
							'MCC':	record.data.mcc ,
							'冷却类型':	record.data.coolingtype ,
							'特点':	record.data.description ,
							'备注信息':	record.data.remark ,
							'附件1名称':	record.data.aname1 ,
							'附件1类型':	record.data.anametype1 ,
							'附件2名称':	record.data.aname2 ,
							'附件2类型':	record.data.anametype2 ,
							'附件3名称':	record.data.aname3 ,
							'附件3类型':	record.data.anametype3 ,
							'附件4名称':	record.data.aname4 ,
							'附件4类型':	record.data.anametype4});
						Ext.getCmp('previousbtn').enable();
					}
					if (pictureTabs.getActiveTab().getItemId() == 'ctparameterid') {
						dataLoadDynamic(parameterStore);
					} else if (pictureTabs.getActiveTab().getItemId() == 'picturePanelid') {
						var newsrc = checkImagePath(record.data.figure);
						Ext.getCmp('boxid').getEl().dom.src = newsrc;
					} else if (pictureTabs.getActiveTab().getItemId() == 'sizePanelid') {

						var newsrc = checkImagePath(record.data.figure2);
						Ext.getCmp('boxid2').getEl().dom.src = newsrc;

					} else if (pictureTabs.getActiveTab().getItemId() == 'sapPanelid') {
						sapStore.load({
									params : {
										sapcode : record.data.sapcode
									}
								});
					}
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
				}
			}],
			listeners : {
				afterrender : function(tabpanel, tab) {
					propertygrid.setSource({'SAP编号':	record.data.sapcode ,
						'名称':	record.data.name,
						'型号':	record.data.type ,

						'品牌':	record.data.brandid ,
						'切削类型':	record.data.cuttype ,
						'标准':	record.data.standard ,
						'公称直径':	record.data.nodiameter ,
						'可调精度':	record.data.adprecision ,
						'主偏角':	record.data.mainangle ,
						'齿数':	record.data.teethnumber ,
						'总长':	record.data.length ,
						'MCM':	record.data.mcm ,
						'MCC':	record.data.mcc ,
						'冷却类型':	record.data.coolingtype ,
						'特点':	record.data.description ,
						'备注信息':	record.data.remark ,
						'附件1名称':	record.data.aname1 ,
						'附件1类型':	record.data.anametype1 ,
						'附件2名称':	record.data.aname2 ,
						'附件2类型':	record.data.anametype2 ,
						'附件3名称':	record.data.aname3 ,
						'附件3类型':	record.data.anametype3 ,
						'附件4名称':	record.data.aname4 ,
						'附件4类型':	record.data.anametype4});
				},
				beforeshow : function(win) {
					var workpiecematerialid = workpieceisotypeCombo.getValue();
					if (workpiecematerialid != "") {
						Ext.getCmp('ctparameterid').enable();
					} else {
						Ext.getCmp('ctparameterid').disable();
					}
				}
				/*
				 * show : function(win) { hd_toolholder_tappingStore.load(); }
				 */
			}
		});

		propertyDisplayWin.show();
	}

	function hd_holedrillingStoreLoad() {
		hd_holedrillingStore.load({
			params : {
				start : bbar.pageSize
						* (grid2.getBottomToolbar().getPageData().activePage - 1),
				limit : bbar.pageSize,
				workpieceisotype : workpieceisotypeCombo.getValue(),
				cuttype : cuttypeCombo.getValue(),
				nominaldiameter : nominaldiameterCombo.getValue(),
				depth : depthCombo.getValue(),
				coolingtype : coolingtypeCombo.getValue()
			}
		});
	};

	function hd_blade_boringStoreLoad(rec) {
		var jsarrstr = null;
		if (Ext.isDefined(rec)) {
			var jsarrstr = jsArray2JsString(rec, 'centreblade');
		}

		if (parent.gdlf /*
						 * || !Ext.isEmpty(jsarrstr) ||
						 * !Ext.isEmpty(workpieceisotypeCombo.getValue())
						 */) {
			hd_blade_boringStore.load({
						params : {

							workpieceisotype : workpieceisotypeCombo.getValue(),
							// nominaldiameter :
							// nominaldiameterCombo2.getValue(),
							// interferencedepth :
							// interferencedepthCombo2.getValue(),

							centreblade : jsarrstr
						}
					});
		}
	}

	/*
	 * function hd_blade_boringStoreLoad(rec) { var jsarrstr = null; if
	 * (Ext.isDefined(rec)) { var jsarrstr = jsArray2JsString(rec, 'portsize'); }
	 * 
	 * if (parent.gdlf || !Ext.isEmpty(jsarrstr) ||
	 * !Ext.isEmpty(workpieceisotypeCombo.getValue())) {
	 * hd_blade_boringStore.load({ params : {
	 * 
	 * workpieceisotype : workpieceisotypeCombo.getValue(), // nominaldiameter : //
	 * nominaldiameterCombo2.getValue(), // interferencedepth : //
	 * interferencedepthCombo2.getValue(),
	 * 
	 * portsize : jsarrstr } }); } }
	 */
	function daoganStoreLoad() {
		daoganStore.load({
					params : {
						anametype1 : record.data.anametype1,
						anametype2 : record.data.anametype2,
						anametype3 : record.data.anametype3,
						anametype4 : record.data.anametype4
					}
				});
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
			
			url : 'boring.do?code=printTask',
			   
			     
			params : {
				 workpieceisotype : workpieceisotypeCombo.getValue(),
				 cuttype : cuttypeCombo.getValue(),
				 nominaldiameter : nominaldiameterCombo.getValue(),
				 depth : depthCombo.getValue(),
				 coolingtype : coolingtypeCombo.getValue(),
			     sapcode : record.data.sapcode,
			     
			     typeid : record.data.typeid
			     
			     
			    
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
		
			
			if(grid21.getSelectionModel().getCount()==1&&grid.getSelectionModel().getCount()==1){
				var record = grid21.getSelectionModel().getSelected()
			}else if(grid21.getSelectionModel().getCount()>=2){	
				errorMsg("请只选择一把刀片")
			}else if(grid.getSelectionModel().getCount()==0){	
				errorMsg("请选择刀体")
			}else{
				errorMsg("请选择刀片")};
			
		
		Ext.Ajax.request({
			
			url : 'boring.do?code=printTask2',
			   
			
			params : {
				 workpieceisotype1 : workpieceisotypeCombo.getValue(),
				 cuttype : cuttypeCombo.getValue(),
				 nominaldiameter1 : nominaldiameterCombo.getValue(),
				 depth : depthCombo.getValue(),
				 coolingtype : coolingtypeCombo.getValue(),
			     sapcode : record.data.sapcode,
			     workpiecematerialid :  workpieceisotypeCombo.getValue(),
			     nominaldiameter : grid.getSelectionModel().getSelected().data.nominaldiameter,
			     k2 : record.data.k2,
			     k1 : grid.getSelectionModel().getSelected().data.k1
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
	function printTask3() {
		showWaitMsg('正在准备报表数据,请稍等...');
		
	
		
			if(grid22.getSelectionModel().getCount()==1&&grid.getSelectionModel().getCount()==1){
				var record = grid22.getSelectionModel().getSelected()
			}else if(grid22.getSelectionModel().getCount()>=2){	
				errorMsg("请只选择一把刀片")
			}else if(grid.getSelectionModel().getCount()==0){	
				errorMsg("请选择刀体")
			}else{
				errorMsg("请选择刀片")};
		Ext.Ajax.request({
			
			url : 'boring.do?code=printTask3',
			   
			
			params : {
				 workpieceisotype : workpieceisotypeCombo.getValue(),
				 cuttype : cuttypeCombo.getValue(),
				 nominaldiameter : nominaldiameterCombo.getValue(),
				 depth : depthCombo.getValue(),
				 coolingtype : coolingtypeCombo.getValue(),
			     sapcode : record.data.sapcode
			   
			     
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