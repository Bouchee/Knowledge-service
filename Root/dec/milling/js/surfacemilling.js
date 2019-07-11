/**
 * 面铣
 * 
 * @author fuxianwu
 * @since 2013-01-01
 */
Ext.onReady(function() {
	var divnum = 25;// 调整toolbar中的下拉框的大小与位置;
	var numlign = 11;

	var pp = 0.8; // 将下拉框图片缩放为80%;

	var grid_ratio = 0.65; // 上下两个grid的高度比例
	var grid_init = true;

	// 材料牌号//Workpiecematerial//workpiecematerial
	// 铣削方式//Cutmethod//cutmethod
	// 公称直径//Nominaldiameter//nominaldiameter
	// 主偏角//Mainangle//mainangle
	// 复选框
	var sm = new Ext.grid.CheckboxSelectionModel();
	// 行号
	var rownum = new Ext.grid.RowNumberer({
				header : '序',
				width : 26
			});
	// 复选框
	var sm2 = new Ext.grid.CheckboxSelectionModel();

	// 行号
	var rownum2 = new Ext.grid.RowNumberer({
				header : '序',
				width : 26
			});
	// 复选框
	var sm3 = new Ext.grid.CheckboxSelectionModel();

	// 行号
	var rownum3 = new Ext.grid.RowNumberer({
				header : '序',
				width : 26
			});

	// 列模型（整体）
	var milling_toolholder_integralCm = new Ext.grid.ColumnModel([rownum, sm, /*
																				 * {
																				 * header :
																				 * '刀体编号', //
																				 * 列标题
																				 * dataIndex :
																				 * 'toolholderid', //
																				 * 数据索引,和Store数据存储模型对应
																				 * width :
																				 * 60, //
																				 * 列宽度
																				 * sortable :
																				 * true, //
																				 * 该列是否要排序
																				 * hidden :
																				 * true //
																				 * 该列是否隐藏 },
																				 */{
		header : '刀体名称',
		dataIndex : 'name',
		width : 150,
		sortable : true
			// hidden : true
		}, {
		header : 'SAP编码',
		dataIndex : 'sapcode',
		width : 100,
		sortable : true
			/* hidden : true */
		}, {
		header : '刀体型号',
		dataIndex : 'toolholdertype',
		width : 130,
		// hidden : true,
		sortable : true
	}, {
		header : '切削类型',
		dataIndex : 'cuttype',
		width : 200,
		// renderer : TURNINGTYPERender,
		// hidden : true,
		sortable : true
	}, {
		header : '刀体品牌',
		dataIndex : 'brandid',
		// hidden : true,
		width : 80,
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
		header : '公称直径',
		dataIndex : 'nominaldiameter',
		width : 80,
		align : 'center',
		// hidden : true,
		sortable : true
	}, {
		header : '刃长',
		dataIndex : 'celength',
		width : 80,
		align : 'center',
		// hidden : true,
		sortable : true
	}, {
		header : '螺旋角',
		dataIndex : 'helicalangle',
		width : 80,
		align : 'center',
		hidden : true,
		sortable : true
	}, {
		header : '刃尖倒角半径',
		dataIndex : 'noseradius',
		width : 100,
		align : 'center',
		// renderer : CSERIESRender,
		// hidden : true,
		sortable : true
	}, {
		header : '刃数',
		dataIndex : 'teethnumber',
		width : 80,
		align : 'center',
		// hidden : true,
		sortable : true
	}, {
		header : '刃部锥角',
		dataIndex : 'coneangle',
		width : 80,
		align : 'center',
		// hidden : true,
		sortable : true
	}, {
		header : '接口尺寸',
		dataIndex : 'portsize',
		width : 80,
		align : 'center',
		hidden : true,
		sortable : true
	}, {
		header : '总长',
		dataIndex : 'length',
		width : 80,
		align : 'center',
		// renderer : THHEADANGLERender,
		// hidden : true,
		sortable : true
	}, {
		header : '材质',
		dataIndex : 'mimmaterialname',
		width : 100,
		align : 'center',
		// hidden : true,
		sortable : true
	}, {
		header : '备注信息',
		dataIndex : 'remark',
		width : 80,
		// hidden : true,
		sortable : true
	}]);

	// 列模型(机夹刀体）
	var milling_toolholder_clampCm = new Ext.grid.ColumnModel([rownum2, sm2, /*
																				 * {
																				 * header :
																				 * '刀体编号', //
																				 * 列标题
																				 * dataIndex :
																				 * 'toolholderid', //
																				 * 数据索引,和Store数据存储模型对应
																				 * width :
																				 * 60, //
																				 * 列宽度
																				 * sortable :
																				 * true, //
																				 * 该列是否要排序
																				 * hidden :
																				 * true //
																				 * 该列是否隐藏 },
																				 */{
		header : '刀体名称',
		dataIndex : 'name',
		width : 100,
		sortable : true
			// hidden : true
		}, {
		header : 'SAP编码',
		dataIndex : 'sapcode',
		width : 100,
		sortable : true
			/* hidden : true */
		}, {
		header : '刀体型号',
		dataIndex : 'toolholdertype',
		width : 180,
		// hidden : true,
		sortable : true
	}, {
		header : '铣削类型',
		dataIndex : 'cuttype',
		width : 180,
		// renderer : TURNINGTYPERender,
		// hidden : true,
		sortable : true
	}, {
		header : '刀体品牌',
		dataIndex : 'brandid',
		width : 80,
		// hidden : true,
		sortable : true
	},/*
		 * { header : '结构简图', dataIndex : 'figure', width : 80, hidden : true,
		 * sortable : true }, { header : '尺寸图', dataIndex : 'figure2', width :
		 * 80, hidden : true, sortable : true },
		 */{
		header : '接口规格',
		dataIndex : 'portsize',
		align : 'center',
		width : 100,
		// renderer : SHAPERender,
		// hidden : true,
		sortable : true
	}, {
		header : '公称直径',
		dataIndex : 'nominaldiameter',
		width : 80,
		align : 'center',
		// hidden : true,
		sortable : true
	}, {
		header : '主偏角',
		dataIndex : 'mainangle',
		width : 60,
		align : 'center',
		// hidden : true,
		sortable : true
	}, {
		header : '齿数',
		dataIndex : 'toothnumber',
		width : 60,
		align : 'center',
		// hidden : true,
		sortable : true
	}, {
		header : '有效齿数',
		dataIndex : 'effectivetoothnumber',
		width : 60,
		align : 'center',
		// hidden : true,
		// renderer : RELIEFANGLERender,
		sortable : true
	}, {
		header : '刀具总长',
		dataIndex : 'length',
		width : 80,
		align : 'center',
		// hidden : true,
		// renderer : CELENGTHRender,
		sortable : true
	}, {
		header : '侧铣深度',
		dataIndex : 'interferencedepth',
		width : 90,
		align : 'center',
		// hidden : true,
		// renderer : NOSERADIUSRender,
		sortable : true
	}, {
		header : '最大轴向切深',
		dataIndex : 'apmax',
		width : 80,
		align : 'center',
		// renderer : THICKNESS2Render,
		// hidden : true,
		sortable : true
	}, {
		header : '最大径向切深',
		dataIndex : 'aemax',
		width : 80,
		align : 'center',
		// hidden : true,
		sortable : true
	}, /*
		 * { header : '特征码', dataIndex : 'featurecode', width : 80, hidden :
		 * true, sortable : true },
		 */{
		header : '刀具重量',
		dataIndex : 'toolweight',
		width : 120,
		align : 'center',
		// hidden : true,
		sortable : true
	},/*
		 * { header : '附件1名称', dataIndex : 'aname1', width : 120, hidden : true,
		 * sortable : true }, { header : '附件1型号', dataIndex : 'atype1', width :
		 * 120, hidden : true, sortable : true }, { header : '附件2名称', dataIndex :
		 * 'aname1', width : 120, hidden : true, sortable : true }, { header :
		 * '附件2型号', dataIndex : 'atype1', width : 120, hidden : true, sortable :
		 * true }, { header : '附件3名称', dataIndex : 'aname1', width : 120, hidden :
		 * true, sortable : true }, { header : '附件3型号', dataIndex : 'atype1',
		 * width : 120, hidden : true, sortable : true }, { header : '附件4名称',
		 * dataIndex : 'aname1', width : 120, hidden : true, sortable : true }, {
		 * header : '附件4型号', dataIndex : 'atype1', width : 120, hidden : true,
		 * sortable : true }, { header : '附件5名称', dataIndex : 'aname1', width :
		 * 120, hidden : true, sortable : true }, { header : '附件5型号', dataIndex :
		 * 'atype1', width : 120, hidden : true, sortable : true }, { header :
		 * '附件6名称', dataIndex : 'aname1', width : 120, hidden : true, sortable :
		 * true }, { header : '附件6型号', dataIndex : 'atype1', width : 120, hidden :
		 * true, sortable : true }, { header : '附件7名称', dataIndex : 'aname1',
		 * width : 120, hidden : true, sortable : true }, { header : '附件7型号',
		 * dataIndex : 'atype1', width : 120, hidden : true, sortable : true }, {
		 * header : '附件8名称', dataIndex : 'aname1', width : 120, hidden : true,
		 * sortable : true }, { header : '附件8型号', dataIndex : 'atype1', width :
		 * 120, hidden : true, sortable : true }, { header : '附件9名称', dataIndex :
		 * 'aname1', width : 120, hidden : true, sortable : true }, { header :
		 * '附件9型号', dataIndex : 'atype1', width : 120, hidden : true, sortable :
		 * true },
		 */{
		header : '备注信息',
		dataIndex : 'remark',
		width : 120,
		// hidden : true,
		sortable : true
	}]);

	// 列模型(机夹刀片）
	var milling_blade_clampCm = new Ext.grid.ColumnModel([rownum3, sm3,/*
																		 * {
																		 * header :
																		 * '刀片编号', //
																		 * 列标题
																		 * dataIndex :
																		 * 'bladeid', //
																		 * 数据索引,和Store数据存储模型对应
																		 * width :
																		 * 60, //
																		 * 列宽度
																		 * sortable :
																		 * true, //
																		 * 该列是否要排序
																		 * hidden :
																		 * true //
																		 * 该列是否隐藏 },
																		 */{
		header : '刀片名称',
		dataIndex : 'name',
		width : 100,
		sortable : true
			// hidden : true
		}, {
		header : 'SAP编码',
		dataIndex : 'sapcode',
		width : 100,
		sortable : true
			/* hidden : true */
		}, {
		header : '刀片型号',
		dataIndex : 'bladetype',
		width : 130,
		// hidden : true,
		sortable : true
	}, /*
		 * { header : '结构简图', dataIndex : 'figure', width : 80, hidden : true,
		 * sortable : true }, { header : '实物图', dataIndex : 'figure2', width :
		 * 80, hidden : true, sortable : true },
		 *//*
		 * { header : '刀片材质ID', dataIndex : 'bladematerialid', width : 80, align :
		 * 'center', hidden : true, // renderer : TURNINGTYPERender, hidden :
		 * true, sortable : true },
		 */{
		header : '断屑槽形',
		dataIndex : 'grooveid',
		width : 80,
		align : 'center',
		// hidden : true,
		sortable : true
	}, {
		header : '刀片材质',
		dataIndex : 'bladematerialname',
		width : 80,
		sortable : true
	}, {
		header : '刀片品牌',
		dataIndex : 'brandid',
		// hidden : true,
		width : 80,
		sortable : true
	}, {
		header : '刀片形状',
		dataIndex : 'shape',
		width : 80,
		align : 'center',
		// hidden : true,
		sortable : true
	}, {
		header : '切削刃长度',
		dataIndex : 'celength',
		width : 100,
		align : 'center',
		// renderer : CSERIESRender,
		// hidden : true,
		sortable : true
	}, {
		header : '可转位次数',
		dataIndex : 'turningtime',
		width : 80,
		align : 'center',
		// hidden : true,
		sortable : true
	}, {
		header : '刀片后角',
		dataIndex : 'reliefangle',
		width : 80,
		align : 'center',
		hidden : true,
		sortable : true
	}, {
		header : '刀片厚度',
		dataIndex : 'thichness',
		width : 80,
		align : 'center',
		// hidden : true,
		sortable : true
	}, {
		header : '刀尖圆弧半径',
		dataIndex : 'noseradius',
		width : 80,
		align : 'center',
		hidden : true,
		sortable : true
	}, {
		header : '修光刃长度',
		dataIndex : 'wiperlength',
		width : 80,
		align : 'center',
		// renderer : THHEADANGLERender,
		// hidden : true,
		sortable : true
	}, {
		header : '特点',
		dataIndex : 'characteristic',
		width : 100,
		hidden : true,
		sortable : true
	}, /*
		 * { header : '特征码', dataIndex : 'featurecode', width : 100, // hidden :
		 * true, sortable : true },
		 */{
		header : '备注信息',
		dataIndex : 'remark',
		width : 80,
		// hidden : true,
		sortable : true
	}]);

	// Store数据存储
	var milling_toolholder_integralStore = new Ext.data.GroupingStore({
		proxy : new Ext.data.HttpProxy({
			url : 'surfacemilling.do?code=queryMilling_toolholder_integral4Manage'
				// queryMilling_toolholder_integral4Manage是在Milling_toolholder_integralAction中的方法queryMilling_toolholder_integral4Manage;
		}),
		reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [ /*
						 * { name : 'toolholderid' },
						 */{
							name : 'sapcode'
						}, {
							name : 'name'
						}, {
							name : 'toolholdertype'
						}, {
							name : 'brandid'
						},  {
							name : 'cuttype'
						}, {
							name : 'nominaldiameter'
						}, {
							name : 'celength'
						}, {
							name : 'helicalangle'
						}, {
							name : 'noseradius'
						}, {
							name : 'coneangle'
						}, {
							name : 'teethnumber'
						}, {
							name : 'portsize'
						}, {
							name : 'length'
						}, {
							name : 'mimmaterialname'
						}, {
							name : 'figure'
						}, {
							name : 'figure2'
						},{
							name : 'remark'
						},{
							name : 'k1'
						}]),
		listeners : {
	/*
	 * 'load' : function(store, records) { for (var i = 0; i < records.length;
	 * i++) { propertyGridStore[records[i].get('name')] =
	 * records[i].get('value'); } } load : { fn : function(store, records,
	 * options) { // get the property grid component var propGrid =
	 * Ext.getCmp('propertyGridid'); // make sure the property grid exists if
	 * (propGrid) { // populate the property grid with store data
	 * propGrid.setSource(store.getAt(0).data); } } }
	 */
	}
	});

	// Store数据存储
	var milling_toolholder_clampStore = new Ext.data.GroupingStore({
				proxy : new Ext.data.HttpProxy({
					url : 'surfacemilling.do?code=queryMilling_toolholder_clamp4Manage'
						// queryMilling_toolholder_clamp4Manage是在Milling_toolholder_clampAction中的方法queryMilling_toolholder_clamp4Manage;
				}),
				reader : new Ext.data.JsonReader({
							totalProperty : 'TOTALCOUNT',
							root : 'ROOT'
						}, [ /*
								 * { name : 'toolholderid' },
								 */{
									name : 'sapcode'
								}, {
									name : 'name'
								}, {
									name : 'toolholdertype'
								}, {
									name : 'brandid'
								},{
									name : 'cuttype'
								}, {
									name : 'nominaldiameter'
								}, {
									name : 'mainangle'
								}, {
									name : 'toothnumber'
								}, {
									name : 'effectivetoothnumber'
								}, {
									name : 'portsize'
								}, {
									name : 'length'
								}, {
									name : 'interferencedepth'
								}, {
									name : 'mainangle'
								}, {
									name : 'aemax'
								}, {
									name : 'apmax'
								}, {
									name : 'featurecode'
								}, {
									name : 'toolweight'
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
								}, {
									name : 'aname6'
								}, {
									name : 'atype6'
								}, {
									name : 'aname7'
								}, {
									name : 'atype7'
								}, {
									name : 'aname8'
								}, {
									name : 'atype8'
								}, {
									name : 'aname9'
								}, {
									name : 'atype9'
								}, {
									name : 'figure'
								}, {
									name : 'figure2'
								},  {
									name : 'remark'
								},  {
									name : 'k1'
								}])
			});

	// Store数据存储
	var milling_blade_clampStore = new Ext.data.GroupingStore({
				proxy : new Ext.data.HttpProxy({
					url : 'surfacemilling.do?code=queryMilling_blade_clamp4Manage'
						// querymilling_blade_clamp4Manage是在SurfacemillingAction中的方法querymilling_blade_clamp4Manage;
				}),
				reader : new Ext.data.JsonReader({
							totalProperty : 'TOTALCOUNT',
							root : 'ROOT'
						}, [ /*
								 * { name : 'bladeid' },
								 */{
									name : 'sapcode'
								}, {
									name : 'name'
								}, {
									name : 'bladetype'
								}, {
									name : 'brandid'
								}, /*
									 * { name : 'bladematerialid' },
									 */{
									name : 'bladematerialname'
								}, {
									name : 'grooveid'
								}, {
									name : 'shape'
								}, {
									name : 'reliefangle'
								}, {
									name : 'celength'
								}, {
									name : 'turningtime'
								}, {
									name : 'thichness'
								}, {
									name : 'noseradius'
								}, {
									name : 'wiperlength'
								}, {
									name : 'characteristic'
								}, {
									name : 'featurecode'
								},{
									name : 'figure'
								}, {
									name : 'figure2'
								},  {
									name : 'remark'
								},{
									name : 'k2'
								}]),
				listeners : {
	/*
	 * 'load' : function(store, records) { for (var i = 0; i < records.length;
	 * i++) { propertyGridStore[records[i].get('name')] =
	 * records[i].get('value'); } } load : { fn : function(store, records,
	 * options) { // get the property grid component var propGrid =
	 * Ext.getCmp('propertyGridid'); // make sure the property grid exists if
	 * (propGrid) { // populate the property grid with store data
	 * propGrid.setSource(store.getAt(0).data); } } }
	 */
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
						if (runtimeButton2.getActiveItem().itemIndex == '1') {
							runtimeButton2.toggleSelected();
							runtimeButton2.setIconClass('lightonIcon');
						}
						/*
						 * if (runtimeButton3.getActiveItem().itemIndex == '1') {
						 * runtimeButton3.toggleSelected();
						 * runtimeButton3.setIconClass('lightonIcon'); }
						 */

						calcButton.hide();
						calcButton2.hide();
						// calcButton3.hide();
						parent.grf = true;
					} else {
						if (runtimeButton2.getActiveItem().itemIndex == '0') {
							runtimeButton2.toggleSelected();
							runtimeButton2.setIconClass('lightoffIcon');
						}
						/*
						 * if (runtimeButton3.getActiveItem().itemIndex == '0') {
						 * runtimeButton3.toggleSelected();
						 * runtimeButton3.setIconClass('lightoffIcon'); }
						 */

						calcButton.show();
						calcButton2.show();
						// calcButton3.show();
						parent.grf = false;
					}
				}
			});

	var autoLoadButton = new Ext.CycleButton({
				showText : true,
				prependText : '刀片自动加载: ',
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
						// calcButton.hide();
						parent.gdlf = true;
						milling_blade_clampStoreLoad();
					} else {
						// calcButton.show();
						parent.gdlf = false;
					}
				}
			});

	var runtimeButton2 = new Ext.CycleButton({
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
					if (runtimeButton2.getActiveItem().itemIndex == '0') {
						if (runtimeButton.getActiveItem().itemIndex == '1') {
							runtimeButton.toggleSelected();
							runtimeButton.setIconClass('lightonIcon');
						}
						/*
						 * if (runtimeButton3.getActiveItem().itemIndex == '1') {
						 * runtimeButton3.toggleSelected();
						 * runtimeButton3.setIconClass('lightonIcon'); }
						 */

						calcButton.hide();
						calcButton2.hide();
						// calcButton3.hide();
						parent.grf = true;
					} else {
						if (runtimeButton.getActiveItem().itemIndex == '0') {
							runtimeButton.toggleSelected();
							runtimeButton.setIconClass('lightoffIcon');
						}
						/*
						 * if (runtimeButton3.getActiveItem().itemIndex == '0') {
						 * runtimeButton3.toggleSelected();
						 * runtimeButton3.setIconClass('lightoffIcon'); }
						 */

						calcButton.show();
						calcButton2.show();
						// calcButton3.show();
						parent.grf = false;
					}
				}
			});

	/*
	 * var runtimeButton3 = new Ext.CycleButton({ showText : true, prependText :
	 * '实时过滤状态: ', items : [{ text : '开', iconCls : 'lightonIcon', checked :
	 * parent.grf }, { text : '关', iconCls : 'lightoffIcon', checked :
	 * !parent.grf }], changeHandler : function(btn, item) { if
	 * (runtimeButton3.getActiveItem().itemIndex == '0') { if
	 * (runtimeButton.getActiveItem().itemIndex == '1') {
	 * runtimeButton.toggleSelected();
	 * runtimeButton.setIconClass('lightonIcon'); } if
	 * (runtimeButton2.getActiveItem().itemIndex == '1') {
	 * runtimeButton2.toggleSelected();
	 * runtimeButton2.setIconClass('lightonIcon'); }
	 * 
	 * calcButton.hide(); calcButton2.hide(); calcButton3.hide(); parent.grf =
	 * true; } else { if (runtimeButton.getActiveItem().itemIndex == '0') {
	 * runtimeButton.toggleSelected();
	 * runtimeButton.setIconClass('lightoffIcon'); } if
	 * (runtimeButton2.getActiveItem().itemIndex == '0') {
	 * runtimeButton2.toggleSelected();
	 * runtimeButton2.setIconClass('lightoffIcon'); }
	 * 
	 * calcButton.show(); calcButton2.show(); calcButton3.show(); parent.grf =
	 * false; } } });
	 */

	// 查询结果按钮
	var calcButton = new Ext.Button({
				text : '查询结果',
				iconCls : 'tableIcon',
				hidden : true,
				listeners : {
					click : function(btn, e) {
						milling_toolholder_integralStoreLoad();
					}
				}
			});

	var calcButton2 = new Ext.Button({
				text : '查询结果',
				iconCls : 'tableIcon',
				hidden : true,
				listeners : {
					click : function() {
						milling_toolholder_clampStoreLoad();
						milling_blade_clampStoreLoad();
					}
				}
			});

	var calcButton3 = new Ext.Button({
				text : '查询结果',
				iconCls : 'tableIcon',
				hidden : true,
				listeners : {
					click : function() {
						milling_blade_clampStoreLoad();
					}
				}
			});

	// 每页显示条数下拉选择框（整体刀体）
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
				milling_toolholder_integralStoreLoad();
			});

	// 分页工具栏
	var bbar = new Ext.PagingToolbar({
				pageSize : number,
				store : milling_toolholder_integralStore,
				displayInfo : true,
				displayMsg : '显示第 {0} 条到第 {1} 条,共 {2} 条',
				plugins : new Ext.ux.ProgressBarPager(),
				emptyMsg : '对不起,没有符合条件的记录!',
				items : ['-', '&nbsp;&nbsp;', pagesize_combo, {
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
						}]
			});

	// 每页显示条数下拉选择框（机夹刀体）
	var pagesize_combo2 = new Ext.form.ComboBox({
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

	var number2 = parseInt(pagesize_combo2.getValue());
	pagesize_combo2.on('select', function(comboBox) {
				bbar2.pageSize = parseInt(comboBox.getValue());
				number2 = parseInt(comboBox.getValue());
				milling_toolholder_clampStoreLoad();
			});

	// 分页工具栏
	var bbar2 = new Ext.PagingToolbar({
				pageSize : number2,
				store : milling_toolholder_clampStore,
				displayInfo : true,
				displayMsg : '显示第 {0} 条到第 {1} 条,共 {2} 条',
				plugins : new Ext.ux.ProgressBarPager(),
				emptyMsg : '对不起,没有符合条件的记录!',
				items : ['-', '&nbsp;&nbsp;', pagesize_combo2, {
							xtype : 'tbspacer',
							width : 10
						}, /*
							 * { text : '通过选择条目过滤刀片', id :
							 * 'selectMilling_toolholder_clamp', iconCls :
							 * 'acceptIcon', handler : function() {
							 * tabs.activate(2); // var record =
							 * grid2.getSelectionModel().getSelected(); var
							 * records =
							 * grid2.getSelectionModel().getSelections();
							 * 
							 * if (records.length == 0) {
							 * milling_blade_clampStoreLoad(); } else { if
							 * (records.length > 1) { infoMsg('您选择了 ' +
							 * records.length + ' 个条目，选择单个条目会获得准确匹配。'); } //
							 * grid.getSelectionModel().selectRow(grid.getSelectionModel().last, //
							 * false); milling_blade_clampStore.load({ params : {
							 * start : bbar2.pageSize *
							 * (grid2.getBottomToolbar().getPageData().activePage -
							 * 1), limit : bbar2.pageSize, featurecode :
							 * jsArray2JsString(records, 'featurecode') } }); } } },
							 */{
							xtype : 'tbspacer',
							width : 10
						}, autoLoadButton, runtimeButton2, {
							xtype : 'tbspacer',
							width : 10
						}, calcButton2, {
							text : ' ',
							// iconCls : 'acceptIcon',
							disabled : true,
							disabledClass : 'x-item-disabled-fuxianwu',
							id : 'helpdiv2'
						}]
			});

	// 每页显示条数下拉选择框(机夹刀片）
	/*
	 * var pagesize_combo3 = new Ext.form.ComboBox({ name : 'pagesize',
	 * triggerAction : 'all', mode : 'local', store : new Ext.data.ArrayStore({
	 * fields : ['value', 'text'], data : [[10, '10 条/页'], [20, '20 条/页'], [50,
	 * '50 条/页'], [100, '100条/页'], [250, '250条/页'], [500, '500条/页']] }),
	 * valueField : 'value', displayField : 'text', value : '50', editable :
	 * false, width : 85 });
	 */

	/*
	 * var number3 = parseInt(pagesize_combo3.getValue());
	 * pagesize_combo3.on('select', function(comboBox) { bbar3.pageSize =
	 * parseInt(comboBox.getValue()); number3 = parseInt(comboBox.getValue());
	 * milling_blade_clampStoreLoad(); });
	 */

	// 分页工具栏
	/*
	 * var bbar3 = new Ext.PagingToolbar({ pageSize : number3, store :
	 * milling_blade_clampStore, displayInfo : true, displayMsg : '显示第 {0} 条到第
	 * {1} 条,共 {2} 条', plugins : new Ext.ux.ProgressBarPager(), emptyMsg :
	 * '对不起,没有符合条件的记录!', items : ['-', '&nbsp;&nbsp;', pagesize_combo3, { xtype :
	 * 'tbspacer', width : 10 }, { text : '通过选择条目过滤刀体', id :
	 * 'selectMilling_toolholder_clamp', iconCls : 'acceptIcon', handler :
	 * function() { tabs.activate(1); // var record =
	 * grid2.getSelectionModel().getSelected(); var records =
	 * grid3.getSelectionModel().getSelections();
	 * 
	 * if (records.length == 0) { milling_toolholder_clampStoreLoad(); } else {
	 * if (records.length > 1) { infoMsg('您选择了 ' + records.length + '
	 * 个条目，选择单个条目会获得准确匹配。'); } //
	 * grid.getSelectionModel().selectRow(grid.getSelectionModel().last, //
	 * false); milling_toolholder_clampStore.load({ params : { start :
	 * bbar3.pageSize * (grid3.getBottomToolbar().getPageData().activePage - 1),
	 * limit : bbar3.pageSize, featurecode : jsArray2JsString(records,
	 * 'featurecode') } }); } } }, { xtype : 'tbspacer', width : 10 },
	 * runtimeButton3, { xtype : 'tbspacer', width : 10 }, calcButton3, { text : ' ', //
	 * iconCls : 'acceptIcon', disabled : true, disabledClass :
	 * 'x-item-disabled-fuxianwu', id : 'helpdiv2' }] });
	 */

	//机夹式刀具联动         workpieceisotypeCombo3 nameCombo2 nominaldiameterCombo2 mainangleCombo2 apmaxCombo2
	//刀具名称
	function name2StoreLoad() {
		nameStore2.load({
			params : {
				workpiecematerialid : workpieceisotypeCombo3.getValue()	
			}
		});
	}
	
	//公称直径
	function nominaldiameter2StoreLoad() {
		nominaldiameterStore2.load({
			params : {
				workpiecematerialid : workpieceisotypeCombo3.getValue(),
				name : nameCombo2.getValue()
			}
		});
	}
	
	//主偏角
	function mainangle2StoreLoad() {
		mainangleStore2.load({
			params : {
				workpiecematerialid : workpieceisotypeCombo3.getValue(),
				name : nameCombo2.getValue(),
				nominaldiameter : nominaldiameterCombo2.getValue()
			}
		});
	}
	
	//切削深度
	function apmax2StoreLoad() {
		apmaxStore2.load({
			params : {
				workpiecematerialid : workpieceisotypeCombo3.getValue(),
				name : nameCombo2.getValue(),
				nominaldiameter : nominaldiameterCombo2.getValue(),
				mainangle : mainangleCombo2.getValue()
			}
		});
	}
	
	//整体式刀具联动  workpieceisotypeCombo  nameCombo  nominaldiameterCombo celengthCombo
	//刀具名称
	function nameStoreLoad() {
		nameStore.load({
			params : {
				workpiecematerialid : workpieceisotypeCombo.getValue()	
			}
		});
	}
	
	//公称直径
	function nominaldiameterStoreLoad() {
		nominaldiameterStore.load({
			params : {
				workpiecematerialid : workpieceisotypeCombo.getValue(),
				name : nameCombo.getValue()
			}
		});
	}
	
	//切削深度
	function celengthStoreLoad() {
		celengthStore.load({
			params : {
				workpiecematerialid : workpieceisotypeCombo.getValue(),
				name : nameCombo.getValue(),
				nominaldiameter : nominaldiameterCombo.getValue()
			}
		});
	}
	
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
								workpieceisotypeCombo3.reset();

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
						
						nameStoreLoad();
						nominaldiameterStoreLoad();
						celengthStoreLoad();
						
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

								workpieceisotypeCombo3.setValue(r
										.get('workpiecematerialid'));
								workpieceisotypeCombo3.setRawValue(r
										.get('name'));
							}
						}
						refreshMilling_toolholder_integral();
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

	/*
	 * // 刀具类型下拉框 var shapeCombo = new Ext.form.ComboBox({ fieldLabel : '刀片形状',
	 * hiddenName : 'shape', id : 'shapeidid', emptyText : '请选择...',
	 * triggerAction : 'all', store : SHAPEStore, displayField : 'text',
	 * valueField : 'value', selectOnFocus : true, loadingText : '正在加载数据...',
	 * mode : 'local', forceSelection : true, // pageSize : cln, // minListWidth :
	 * 270, plugins : [new QM.plugin.PinyinFilter], resizable : true, width :
	 * document.body.clientWidth / numlign - divnum, listWidth : shapeArr[0] *
	 * shapepp + 25, tpl : '<tpl for="."><div x-combo-list-item
	 * class="x-combo-list-item"><img src="' + webContext +
	 * '/dec/combo/milling_toolholder_integral/shape/' + '{value}' + '.png"
	 * width=' + shapeArr[0] shapepp + ' height=' + shapeArr[1] * shapepp + '></div></tpl>',
	 * listeners : { focus : function() { //shapeStore.load();
	 * setTimeout('Ext.getCmp("shapeidid").expand();', 1); }, select :
	 * function() { shapeCombo2.setValue(shapeCombo.getValue());
	 * refreshMilling_toolholder_integral(); }, specialkey : function(c, e) { if
	 * (e.getKey() == e.ENTER) { if (parent.grf == true) { c.reset(); }
	 * refreshMilling_toolholder_integralForce(); } } } });
	 */
	// 切削深度数据
	var celengthStore = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : 'surfacemilling.do?code=queryCelengthInMilling_toolholder_integral'
		}),
		reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [{
							name : 'value'
						}, {
							name : 'value'
						}])
	});
	celengthStore.load();

	// 切削深度下拉框
	var celengthCombo = new Ext.form.ComboBox({
				fieldLabel : '切削深度',
				hiddenName : 'celength',
				id : 'celengthid',
				emptyText : '请选择...',
				triggerAction : 'all',
				store : celengthStore,
				displayField : 'value',
				valueField : 'value',
				selectOnFocus : true,
				loadingText : '正在加载数据...',
				mode : 'local',
				forceSelection : true,
				// pageSize : cln,
				// minListWidth : 270,
				plugins : [new QM.plugin.PinyinFilter],
				resizable : true,
				width : document.body.clientWidth / numlign - divnum,
				listeners : {
					focus : function() {
						
						// nominaldiameterStore.load();
						setTimeout('Ext.getCmp("celengthid").expand();', 1);
					},
					collapse:function(){depthDisplayWin2.hide()  ;},
					expand:function(){depthDisplayWin2.show() 	;},
					//depthDisplayWin2.show();
					select : function(c, re, index) {
						
						//depthDisplayWin2.hide()  ;
						/*if(!depthDisplayWin2.rendered){  
							depthDisplayWin2.hide()  
							}else{  
								depthDisplayWin2.show();  
							};*/
						// celengthCombo.setValue(celengthCombo.getValue());

						refreshMilling_toolholder_integral();/*
						nameStore.load({
							params	: {
								celength		: celengthCombo.getValue()
							}
						});
						nominaldiameterStore.load({
							params	: {
								celength		: celengthCombo.getValue()
							}
						});*/
					},
					specialkey : function(c, e) {
						if (e.getKey() == e.ESC) {
							if (parent.grf == true) {
								c.reset();
								/*
								 * celengthCombo.reset();
								 * celengthCombo.setValue('');
								 */
							}
							refreshMilling_toolholder_integralForce();

						}if (e.getKey() == e.ENTER) {
						c.setValue(Ext.get('celengthid').dom.value) ;
							refreshMilling_toolholder_integralForce();
						}
					}
				}
			});

	// 公称直径
	var nominaldiameterStore = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : 'surfacemilling.do?code=queryNominaldiameterInMilling_toolholder_integral'
				// queryMachinetool4Manage是在MachinetoolAction中的方法queryMachinetool4Manage;
		}),
		reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [{
							name : 'value'
						}, {
							name : 'text'
						}])
		
	});
	nominaldiameterStore.load();
	//提示框
	var nominaldiameterDisplayWin = new Ext.Window(
			{
				//title : '选择助手',
				id:'nominaldiameterDisplayWinid',
			
				x:((document.body.clientWidth)/numlign-divnum)*3+195,
				y:(document.body.clientWidth)*(1/11),
				width : 200,
			//	modal : true,
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
						id: 'boxid8',
						xtype : 'box',
						autoEl : {
							tag : 'img',
							style : 'width:100%;height:100%;' ,
							src : 'dec/combo/alter/mianxi-diameter/mianxi-diameter.png'
						}
					} 
			            
			        ],
			       
				
				listeners : {
					'afterRender':function() {
						setTimeout('close', 1000)}
					
					}
					
				});
	/*function getX(nominaldiameterCombo){      
	    return nominaldiameterCombo.offsetLeft + (nominaldiameterCombo.offsetParent ? getX(nominaldiameterCombo.offsetParent) : nominaldiameterCombo.x ? nominaldiameterCombo.x : 0);      
	}  
*/
	
	
	var depthDisplayWin = new Ext.Window(
			{
				//title : '选择助手',
				x:((document.body.clientWidth)/numlign-divnum)*5+300,
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
				
				
			               
			     items: [ {
						id: 'boxid9',
						xtype : 'box',
						autoEl : {
							tag : 'img',
							style : 'width:100%;height:100%;' ,
							src : 'dec/combo/alter/mianxi-depth.png'
						}
					} 
			            
			        ],
			       
				
				listeners : {
					
					}
					
				});
	
	
	
	var depthDisplayWin2 = new Ext.Window(
			{
				//title : '选择助手',
				x:((document.body.clientWidth)/numlign-divnum)*4+260,
				y:(document.body.clientWidth)*(1/11),
				width : 200,
			//	modal : true,
				height : 200,
				frame:false,
				bodyBorder :false,
				 //baseCls: 'my-panel-no-border',
			    //baseCls: 'x-plain', 
		        border:false,
				closeAction : 'hide',
				maximizable : false,
				closable:false,
				
				
			               
			     items: [ {
						id: 'boxid10',
						xtype : 'box',
						autoEl : {
							tag : 'img',
							style : 'width:100%;height:100%;' ,
							src : 'dec/combo/alter/mianxi-depth2.png'
						}
					} 
			            
			        ],
			       
				
				listeners : {
					
					}
					
				});

	var angleDisplayWin = new Ext.Window(
			{
				//title : '选择助手',
				x:((document.body.clientWidth)/numlign-divnum)*4+240,
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
				
			               
			     items: [ {
						id: 'boxid11',
						xtype : 'box',
						autoEl : {
							tag : 'img',
							style : 'width:100%;height:100%;' ,
							src : 'dec/combo/alter/mianxi-angle.png'
						}
					} 
			            
			        ],
			       
				
				listeners : {
					
					}
					
				});

	
	
		// 公称直径下拉框
	var nominaldiameterCombo = new Ext.form.ComboBox({
		fieldLabel : '公称直径',
		hiddenName : 'nominaldiameter',
		id : 'nominaldiameterid',
		emptyText : '请选择...',
		triggerAction : 'all',
		store : nominaldiameterStore,
		displayField : 'text',
		valueField : 'value',
		selectOnFocus : true,
		loadingText : '正在加载数据...',
		mode : 'local',
		forceSelection : true,
		//minListWidth : 200,
		// pageSize : cln,
		// minListWidth : 270,
		// plugins : [new QM.plugin.PinyinFilter],
		resizable : true,
		width : document.body.clientWidth / numlign - divnum,
		
		// listWidth : nominaldiameterArr[0] * nominaldiametsapp
		// + 25,
		/*
		 * tpl : '<tpl for="."><div x-combo-list-item
		 * class="x-combo-list-item"><img src="' + webContext +
		 * '/dec/combo/refreshMilling_toolholder_clamp/nominaldiameter/' +
		 * '{value}' + '.png" width=' + nominaldiameterArr[0] nominaldiametsapp + '
		 * height=' + nominaldiameterArr[1] * nominaldiametsapp + '></div></tpl>',
		 */
		listeners : {
		
			focus : function() {
				
				//nominaldiameterDisplayWin.show();
				// nominaldiameterStore.load();
				setTimeout('Ext.getCmp("nominaldiameterid").expand();', 3000);
			},
			collapse:function(){nominaldiameterDisplayWin2.hide()  ;},
			expand:function(){nominaldiameterDisplayWin2.show() 	;},
			select : function() {
				//nominaldiameterDisplayWin.hide()  ;
				/*if(!nominaldiameterDisplayWin.rendered){  
					nominaldiameterDisplayWin.hide()  
					}else{  
						nominaldiameterDisplayWin.show();  
					};*/
				celengthStoreLoad();
				refreshMilling_toolholder_integral();
				nameStore.load({
					params	: {
						nominaldiameter		: nominaldiameterCombo.getValue()
					}
				});/*
				celengthStore.load({
					params	: {
						nominaldiameter		: nominaldiameterCombo.getValue(),
				        name		: nameCombo.getValue()
					}
				});*/
			
			},
			specialkey : function(c, e) {
				if (e.getKey() == e.ESC) {
					if (parent.grf == true) {
						c.reset();
						nameCombo2.reset();
						nameCombo2.setValue('');
					}
					refreshMilling_toolholder_integralForce();

				}if (e.getKey() == e.ENTER) {
						c.setValue(Ext.get('nominaldiameterid').dom.value) ;
							refreshMilling_toolholder_integralForce();
						}
			
			}
		}
	});
	
	var nameStore = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : 'surfacemilling.do?code=queryNameInMilling_toolholder_integral'
				// queryMachinetool4Manage是在MachinetoolAction中的方法queryMachinetool4Manage;
		}),
		reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [{
							name : 'value'
						}, {
							name : 'text'
						}])
	});
	nameStore.load();

	// 刀具名称下拉框
	var nameCombo = new Ext.form.ComboBox({
		fieldLabel : '刀具名称',
		hiddenName : 'name',
		id : 'nameid',
		emptyText : '请选择...',
		triggerAction : 'all',
		store : nameStore,
		displayField : 'text',
		valueField : 'value',
		selectOnFocus : true,
		loadingText : '正在加载数据...',
		mode : 'local',
		forceSelection : true,
		minListWidth : 150,
		editable : false,
	
		// pageSize : cln,
		// minListWidth : 270,
		// plugins : [new QM.plugin.PinyinFilter],
		resizable : true,
		width : document.body.clientWidth / numlign - divnum,
		// listWidth : nominaldiameterArr[0] * nominaldiametsapp
		// + 25,
		/*
		 * tpl : '<tpl for="."><div x-combo-list-item
		 * class="x-combo-list-item"><img src="' + webContext +
		 * '/dec/combo/refreshMilling_toolholder_clamp/nominaldiameter/' +
		 * '{value}' + '.png" width=' + nominaldiameterArr[0] nominaldiametsapp + '
		 * height=' + nominaldiameterArr[1] * nominaldiametsapp + '></div></tpl>',
		 */
		listeners : {
			focus : function() {
				// nominaldiameterStore.load();
				setTimeout('Ext.getCmp("nameid").expand();', 1);
			},
			select : function() {
				refreshMilling_toolholder_integral();
				nominaldiameterStoreLoad();
				celengthStoreLoad();
				/*nominaldiameterStore.load({
					params	: {
						name		: nameCombo.getValue()
					}
				});*//*
				celengthStore.load({
					params	: {
						name		: nameCombo.getValue()
					}
				});*/
			},
			specialkey : function(c, e) {
				if (e.getKey() == e.ESC) {
					if (parent.grf == true) {
						c.reset();
						nameCombo2.reset();
						nameCombo2.setValue('');
					}
					refreshMilling_toolholder_integralForce();

				}
			}
		}
	});
	
	

	/*
	 * var mainangleStore = new Ext.data.Store({ proxy : new
	 * Ext.data.HttpProxy({ url :
	 * 'surfacemilling.do?code=queryMainangleInMilling_toolholder_integral'
	 * //queryMachinetool4Manage是在MachinetoolAction中的方法queryMachinetool4Manage; } ),
	 * reader : new Ext.data.JsonReader({ totalProperty : 'TOTALCOUNT', root :
	 * 'ROOT' }, [{ name : 'value' }, { name : 'value' }]) });
	 */
	// 主偏角下拉框
	/*
	 * var mainangleCombo = new Ext.form.ComboBox({ fieldLabel : '主偏角',
	 * hiddenName : 'mainangle', id : 'mainangleid', emptyText : '请选择...',
	 * triggerAction : 'all', store : mainangleStore, displayField : 'value',
	 * valueField : 'value', selectOnFocus : true, loadingText : '正在加载数据...',
	 * mode : 'local', forceSelection : true, // pageSize : cln, // minListWidth :
	 * 270, plugins : [new QM.plugin.PinyinFilter], resizable : true, width :
	 * document.body.clientWidth / numlign - divnum, //listWidth :
	 * mainangleArr[0] * mainanglepp + 25, tpl : '<tpl for="."><div
	 * x-combo-list-item class="x-combo-list-item"><img src="' + webContext +
	 * '/dec/combo/milling_toolholder_integral/nominaldiameter/' + '{value}' +
	 * '.png" width=' + nominaldiameterArr[0] nominaldiametsapp + ' height=' +
	 * nominaldiameterArr[1] * nominaldiametsapp + '></div></tpl>', listeners : {
	 * focus : function() { //nominaldiameterStore.load();
	 * setTimeout('Ext.getCmp("mainangleid").expand();', 1); }, select :
	 * function() { mainangleCombo2.setValue(mainangleCombo.getValue());
	 * refreshMilling_toolholder_integral(); }, specialkey : function(c, e) { if
	 * (e.getKey() == e.ENTER) { if (parent.grf == true) { c.reset(); }
	 * refreshMilling_toolholder_integralForce(); } } } });
	 */

	/*
	 * // 切削深度下拉框 var shapeCombo = new Ext.form.ComboBox({ fieldLabel : '刀片形状',
	 * hiddenName : 'shape', id : 'shapeidid', emptyText : '请选择...',
	 * triggerAction : 'all', store : SHAPEStore, displayField : 'text',
	 * valueField : 'value', selectOnFocus : true, loadingText : '正在加载数据...',
	 * mode : 'local', forceSelection : true, // pageSize : cln, // minListWidth :
	 * 270, plugins : [new QM.plugin.PinyinFilter], resizable : true, width :
	 * document.body.clientWidth / numlign - divnum, listWidth : shapeArr[0] *
	 * shapepp + 25, tpl : '<tpl for="."><div x-combo-list-item
	 * class="x-combo-list-item"><img src="' + webContext +
	 * '/dec/combo/milling_toolholder_integral/shape/' + '{value}' + '.png"
	 * width=' + shapeArr[0] shapepp + ' height=' + shapeArr[1] * shapepp + '></div></tpl>',
	 * listeners : { focus : function() { //shapeStore.load();
	 * setTimeout('Ext.getCmp("shapeidid").expand();', 1); }, select :
	 * function() { shapeCombo2.setValue(shapeCombo.getValue());
	 * refreshMilling_toolholder_integral(); }, specialkey : function(c, e) { if
	 * (e.getKey() == e.ENTER) { if (parent.grf == true) { c.reset(); }
	 * refreshMilling_toolholder_integralForce(); } } } });
	 */

	/*
	 * // 刀具类型下拉框 var shapeCombo = new Ext.form.ComboBox({ fieldLabel : '刀片形状',
	 * hiddenName : 'shape', id : 'shapeidid', emptyText : '请选择...',
	 * triggerAction : 'all', store : SHAPEStore, displayField : 'text',
	 * valueField : 'value', selectOnFocus : true, loadingText : '正在加载数据...',
	 * mode : 'local', forceSelection : true, // pageSize : cln, // minListWidth :
	 * 270, plugins : [new QM.plugin.PinyinFilter], resizable : true, width :
	 * document.body.clientWidth / numlign - divnum, listWidth : shapeArr[0] *
	 * shapepp + 25, tpl : '<tpl for="."><div x-combo-list-item
	 * class="x-combo-list-item"><img src="' + webContext +
	 * '/dec/combo/refreshMilling_toolholder_clamp/shape/' + '{value}' + '.png"
	 * width=' + shapeArr[0] shapepp + ' height=' + shapeArr[1] * shapepp + '></div></tpl>',
	 * listeners : { focus : function() { //shapeStore.load();
	 * setTimeout('Ext.getCmp("shapeidid").expand();', 1); }, select :
	 * function() { shapeCombo2.setValue(shapeCombo.getValue());
	 * refreshMilling_toolholder_clamp(); }, specialkey : function(c, e) { if
	 * (e.getKey() == e.ENTER) { if (parent.grf == true) { c.reset(); }
	 * refreshMilling_toolholder_clampForce(); } } } });
	 */
	// 公称直径
	var nominaldiameterStore2 = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : 'surfacemilling.do?code=queryNominaldiameterInMilling_toolholder_clamp'
				// queryMachinetool4Manage是在SurfacemillingAction中的方法queryNominaldiameterInMilling_toolholder_clamp;
		}),
		reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [{
							name : 'value'
						}, {
							name : 'text'
						}])
	});
	nominaldiameterStore2.load();
	//提示框
	var nominaldiameterDisplayWin2 = new Ext.Window(
			{
				//title : '选择助手',
				id:'nominaldiameterDisplayWin2id',
				x:((document.body.clientWidth)/numlign-divnum)*3+195,
				y:(document.body.clientWidth)*(1/11),
				width : 200,
			//	modal : true,
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
						id: 'boxid12',
						xtype : 'box',
						autoEl : {
							tag : 'img',
							style : 'width:100%;height:100%;' ,
							src : 'dec/combo/alter/mianxi-diameter2/mianxi-diameter2.png'
						}
					} 
			            
			        ],
			       
				
				listeners : {
					'afterRender':function() {
						setTimeout('close', 1000)}
					
					}
					
				});

	// 公称直径下拉框
	var nominaldiameterCombo2 = new Ext.form.ComboBox({
		fieldLabel : '公称直径',
		hiddenName : 'nominaldiameter2',
		id : 'nominaldiameterid2',
		emptyText : '请选择...',
		triggerAction : 'all',
		store : nominaldiameterStore2,
		displayField : 'text',
		valueField : 'value',
		selectOnFocus : true,
		loadingText : '正在加载数据...',
		mode : 'local',
		forceSelection : true,
		// pageSize : cln,
		// minListWidth : 200,
		//plugins : [new QM.plugin.PinyinFilter],
		resizable : true,
		width : document.body.clientWidth / numlign - divnum,
		// listWidth : nominaldiameterArr[0] * nominaldiametsapp + 25,
		/*
		 * tpl : '<tpl for="."><div x-combo-list-item
		 * class="x-combo-list-item"><img src="' + webContext +
		 * '/dec/combo/refreshMilling_toolholder_clamp/nominaldiameter/' +
		 * '{value}' + '.png" width=' + nominaldiameterArr[0] nominaldiametsapp + '
		 * height=' + nominaldiameterArr[1] * nominaldiametsapp + '></div></tpl>',
		 */
		listeners : {
			focus : function() {
				
				//nominaldiameterDisplayWin.show();
				// nominaldiameterStore.load();
				setTimeout('Ext.getCmp("nominaldiameterid2").expand() ;', 1);
			},
			collapse:function(){nominaldiameterDisplayWin.hide()  ;},
			expand:function(){nominaldiameterDisplayWin.show() 	;},
			select : function() {
				/*if(!nominaldiameterDisplayWin.rendered){  
					nominaldiameterDisplayWin.hide()  
					}else{  
						nominaldiameterDisplayWin.show();  
					}*///nominaldiameterDisplayWin.hide()  ;
				nominaldiameterCombo.setValue(nominaldiameterCombo2.getValue());
				mainangle2StoreLoad();
				apmax2StoreLoad();
				refreshMilling_toolholder_clamp();
				nameStore2.load({
					params	: {
						nominaldiameter		: nominaldiameterCombo2.getValue()
					}
				});
			},
			specialkey : function(c, e) {
				if (e.getKey() == e.ESC) {
					if (parent.grf == true) {
						c.reset();
						nominaldiameterCombo.reset();
						nominaldiameterCombo.setValue('');
					}
					refreshMilling_toolholder_clampForce();

				}if (e.getKey() == e.ENTER) {
						c.setValue(Ext.get('nominaldiameterid2').dom.value) ;
							refreshMilling_toolholder_clampForce();
						}
			}
		}
	});

	var nameStore2 = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : 'surfacemilling.do?code=queryNameInMilling_toolholder_clamp'
				// queryMachinetool4Manage是在MachinetoolAction中的方法queryMachinetool4Manage;
		}),
		reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [{
							name : 'value'
						}, {
							name : 'text'
						}])
	});
	nameStore2.load();

	// 刀具名称下拉框
	var nameCombo2 = new Ext.form.ComboBox({
		fieldLabel : '刀具名称',
		hiddenName : 'name2',
		id : 'nameid2',
		emptyText : '请选择...',
		triggerAction : 'all',
		store : nameStore2,
		displayField : 'text',
		valueField : 'value',
		selectOnFocus : true,
		loadingText : '正在加载数据...',
		minlistWidth : 150,
		listWidth : 150,
		mode : 'local',
		forceSelection : true,
		editable : false,
		// pageSize : cln,
		// minListWidth : 270,
		// plugins : [new QM.plugin.PinyinFilter],
		resizable : true,
		width : document.body.clientWidth / numlign - divnum,
		// listWidth : nominaldiameterArr[0] * nominaldiametsapp
		// + 25,
		/*
		 * tpl : '<tpl for="."><div x-combo-list-item
		 * class="x-combo-list-item"><img src="' + webContext +
		 * '/dec/combo/refreshMilling_toolholder_clamp/nominaldiameter/' +
		 * '{value}' + '.png" width=' + nominaldiameterArr[0] nominaldiametsapp + '
		 * height=' + nominaldiameterArr[1] * nominaldiametsapp + '></div></tpl>',
		 */
		listeners : {
			focus : function() {
				// nominaldiameterStore.load();
				setTimeout('Ext.getCmp("nameid2").expand();', 1);
			},
			select : function() {
				nominaldiameter2StoreLoad();
				mainangle2StoreLoad();
				apmax2StoreLoad();
				refreshMilling_toolholder_clamp();
			/*	nominaldiameterStore2.load({
					params	: {
						name		: nameCombo2.getValue()
					}
				});*/
			},
			specialkey : function(c, e) {
				if (e.getKey() == e.ESC) {
					if (parent.grf == true) {
						c.reset();
						nameCombo.reset();
						nameCombo.setValue('');
					}
					refreshMilling_toolholder_clampForce();

				}
			}
		}
	});
	
	var mainangleStore2 = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : 'surfacemilling.do?code=queryMainangleInMilling_toolholder_clamp'
				// queryMainangleInMilling_toolholder_clamp是在SurfacemillingAction中的方法queryMainangleInMilling_toolholder_clamp;
		}),
		reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [{
							name : 'value'
						}, {
							name : 'value'
						}])
	});
	mainangleStore2.load();

	// 主偏角下拉框
	var mainangleCombo2 = new Ext.form.ComboBox({
				fieldLabel : '主偏角',
				hiddenName : 'mainangle',
				id : 'mainangleid2',
				emptyText : '请选择...',
				triggerAction : 'all',
				store : mainangleStore2,
				displayField : 'value',
				valueField : 'value',
				selectOnFocus : true,
				loadingText : '正在加载数据...',
				mode : 'local',
				forceSelection : true,
				// pageSize : cln,
				// minListWidth : 270,
				plugins : [new QM.plugin.PinyinFilter],
				resizable : true,
				width : document.body.clientWidth / numlign - divnum,
				// listWidth : mainangleArr[0] * mainanglepp + 25,
				/*
				 * tpl : '<tpl for="."><div x-combo-list-item
				 * class="x-combo-list-item"><img src="' + webContext +
				 * '/dec/combo/refreshMilling_toolholder_clamp/mainangle/' +
				 * '{value}' + '.png" width=' + mainangleArr[0] mainanglepp + '
				 * height=' + mainangleArr[1] * mainanglepp + '></div></tpl>',
				 */
				listeners : {
					focus : function() {
					angleDisplayWin.show();
						// shapeStore.load();
						setTimeout('Ext.getCmp("mainangleid2").expand();', 1);
					},
					
					collapse:function(){angleDisplayWin.hide()  ;},
					expand:function(){angleDisplayWin.show() 	;},
					select : function() {
						/*if(!angleDisplayWin.rendered){  
							angleDisplayWin.hide()  
							}else{  
								angleDisplayWin.show();  
							};*/angleDisplayWin.hide()  ;
						mainangleCombo2.setValue(mainangleCombo2.getValue());
						apmax2StoreLoad();
						refreshMilling_toolholder_clamp();
					},
					specialkey : function(c, e) {
						if (e.getKey() == e.ESC) {
							if (parent.grf == true) {
								c.reset();

							}
							refreshMilling_toolholder_clampForce();

						}if (e.getKey() == e.ENTER) {
						c.setValue(Ext.get('mainangleid2').dom.value) ;
							refreshMilling_toolholder_clampForce();
						}
					}
				}
			});

	// 切削深度
	var apmaxStore2 = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : 'surfacemilling.do?code=queryApmaxInMilling_toolholder_clamp'
						// queryMainangleInMilling_toolholder_clamp是在SurfacemillingAction中的方法queryMainangleInMilling_toolholder_clamp;
				}),
				reader : new Ext.data.JsonReader({
							totalProperty : 'TOTALCOUNT',
							root : 'ROOT'
						}, [{
									name : 'value'
								}, {
									name : 'value'
								}])
			});
	apmaxStore2.load();

	// 切削深度下拉框
	var apmaxCombo2 = new Ext.form.ComboBox({
				fieldLabel : '切削深度',
				hiddenName : 'apmax',
				id : 'apmaxid2',
				emptyText : '请选择...',
				triggerAction : 'all',
				store : apmaxStore2,
				displayField : 'value',
				valueField : 'value',
				selectOnFocus : true,
				loadingText : '正在加载数据...',
				mode : 'local',
				forceSelection : true,
				// pageSize : cln,
				// minListWidth : 270,
				plugins : [new QM.plugin.PinyinFilter],
				resizable : true,
				width : document.body.clientWidth / numlign - divnum,
				// listWidth : mainangleArr[0] * mainanglepp + 25,
				/*
				 * tpl : '<tpl for="."><div x-combo-list-item
				 * class="x-combo-list-item"><img src="' + webContext +
				 * '/dec/combo/refreshMilling_toolholder_clamp/mainangle/' +
				 * '{value}' + '.png" width=' + mainangleArr[0] mainanglepp + '
				 * height=' + mainangleArr[1] * mainanglepp + '></div></tpl>',
				 */
				listeners : {
					focus : function() {
						
						//depthDisplayWin.show();
						// shapeStore.load();
						setTimeout('Ext.getCmp("apmaxid2").expand();', 1);
					},
					collapse:function(){depthDisplayWin.hide()  ;},
					expand:function(){depthDisplayWin.show() 	;},
					select : function() {
						//depthDisplayWin.hide()  ;
						/*if(!depthDisplayWin.rendered){  
							depthDisplayWin.hide()  
							}else{  
								depthDisplayWin.show();  
							};
						*/
						
						
						// mainangleCombo2.setValue(mainangleCombo2.getValue());

						refreshMilling_toolholder_clamp();
					},
					specialkey : function(c, e) {
						if (e.getKey() == e.ESC) {
							if (parent.grf == true) {
								c.reset();

							}
							refreshMilling_toolholder_clampForce();

						}if (e.getKey() == e.ENTER) {
						c.setValue(Ext.get('apmaxid2').dom.value) ;
							refreshMilling_toolholder_clampForce();
						}
					}
				}
			});

	// 工件材料状态
	var workpieceisotypeGrid3 = new Ext.grid.GridPanel({
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
							id : 'inputname_isotype3',
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
							// tpl : resultTpl,
							// tpl : '<table><tr><tpl for="."><td
							// class="x-combo-list-item">{text}</td><tpl
							// if="xindex % 5 ===
							// 0"></tr><tr></tpl></tpl></tr></table>',
							hideTrigger : true,
							enableKeyEvents : true,
							maxHeight : 0,
							plugins : [new QM.plugin.PinyinFilter],
							// 响应回车键
							listeners : {
								specialkey : function(field, e) {
									if (e.getKey() == e.ENTER) {
										queryInfo_isotype3();
									}
								},
								select : function(record) {
									this
											.setValue(record.data.workpiecematerialid);
								},
								focus : function() {
									workpieceisotypeCombo3.setValue('');
								}
							}
						}, {
							text : '确定',
							iconCls : 'acceptIcon',
							handler : function() {
								var r = workpieceisotypeGrid3
										.getSelectionModel().getSelected();
								if (typeof r == 'undefined') {
									infoMsg('您没有选中任何条目，请先选中要修改的项目，您也可以直接双击要选择的行！');
									return;
								} else {
									// workpieceisotypeCombo2.setValue(r.get('workpiecematerialid'));
									// workpieceisotypeCombo2.setRawValue(r.get('name'));

									selectMenu3.hide();

									// refreshMilling_toolholder_integral();
								}
							}
						}, '->', {
							text : '清空材料牌号',
							iconCls : 'tbar_synchronizeIcon',
							handler : function() {
								// selectMenu3.suspendEvents();
								workpieceisotypeCombo.reset();
								workpieceisotypeCombo3.reset();

								selectMenu3.hide();
								// selectMenu3.resumeEvents();
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
						selectMenu3.hide();
						/*
						 * var r = g.getSelectionModel().getSelected();
						 * workpieceisotypeCombo2.setValue(r.get('workpiecematerialid'));
						 * workpieceisotypeCombo2.setRawValue(r.get('name'));
						 * refreshMilling_toolholder_integral();
						 */
					},
					rowclick : function(g, rowIndex, event) {
						var r = g.getSelectionModel().getSelected();
						workpieceisotypeCombo3.setValue(r
								.get('workpiecematerialid'));
						workpieceisotypeCombo3.setRawValue(r.get('name'));
					}
				}
			});

	// 查询表格数据
	function queryInfo_isotype3() {
		workpieceisotypeCombo3.collapse();
		selectMenu3.hide();
		/*
		 * var va = Ext.getCmp('inputname_isotype').getRawValue();
		 * workpieceisotypeCombo2.setValue(Ext.getCmp('inputname_isotype').getValue());
		 * workpieceisotypeCombo2.setRawValue(va.substring(0, va.indexOf('-')));
		 */

		// refreshMilling_toolholder_integral();
		/*
		 * workpieceisotypeStore.load({ params : { start : 0, limit :
		 * bbar.pageSize, keyword : Ext.getCmp('inputname_isotype').getValue() }
		 * });
		 */
	}

	var selectMenu3 = new Ext.menu.Menu({
		items : [workpieceisotypeGrid3],
		listeners : {
			hide : function(m) {
				// infoMsg('sfgsfdg');
                name2StoreLoad();
                nominaldiameter2StoreLoad();
                mainangle2StoreLoad();
                apmax2StoreLoad();
				
				var r = workpieceisotypeGrid3.getSelectionModel().getSelected();
				if (typeof r == 'undefined') {
					workpieceisotypeCombo3.reset();
				} else {
					if (workpieceisotypeCombo3.getValue() != "") {
						workpieceisotypeCombo.setValue(r
								.get('workpiecematerialid'));
						workpieceisotypeCombo.setRawValue(r.get('name'));

						workpieceisotypeCombo3.setValue(r
								.get('workpiecematerialid'));
						workpieceisotypeCombo3.setRawValue(r.get('name'));
					}
				}

				recs = grid2.getSelectionModel().getSelections();
				if (~Ext.isEmpty(recs)) {
					milling_blade_clampStoreLoad(recs);
					milling_toolholder_clampStoreLoad();
				} else {
					milling_blade_clampStoreLoad(recs);
					milling_toolholder_clampStoreLoad();
				}
			}
		}
	});

	// 工件材料状态下拉框
	var workpieceisotypeCombo3 = new Ext.form.ComboBox({
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
							this.menu = selectMenu3;
						}
						// workpieceisotypeStore.load();
						this.menu.show(this.el, "tl-bl?");
						// selectMenu3.show();
						Ext.getCmp('inputname_isotype3').focus(true, 500);
					}/*
						 * , focus : function(field) { if (this.menu == null) {
						 * this.menu = selectMenu3; }
						 * //workpieceisotypeStore.load();
						 * this.menu.show(this.el, "tl-bl?");
						 * //selectMenu3.show();
						 * Ext.getCmp('inputname_isotype').focus(true, 500); }
						 */
				}
			});

	// 整体刀体表格
	var tbar = new Ext.Toolbar({// workpiecematerialCombo 
		// //workpieceisotypeCombo
		items : [new Ext.Toolbar.TextItem({
							text : '工件材料:',
							autoHeight : true
						}), workpieceisotypeCombo, '-',
				new Ext.Toolbar.TextItem({
							text : '刀具名称:',
							autoHeight : true
						}), nameCombo, '-',
				new Ext.Toolbar.TextItem({
							text : '公称直径:',
							autoHeight : true
						}), nominaldiameterCombo, '-',
				new Ext.Toolbar.TextItem({
							text : '切削深度:',
							autoHeight : true
						}), celengthCombo,'-', '-', {
							text : '打印预览',
							iconCls : 'previewIcon',
							handler : function() {
								printTask3();
							}
						},'->', {
					text : '重置',
					iconCls : 'tbar_synchronizeIcon',
					handler : function() {
						resetCombo();
					}
				}]
	});

	// 页面过滤
	var filtersMilling_toolholder_integral = new Ext.ux.grid.GridFilters({// string,numeric,date,list,boolean
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
					dataIndex : 'toolholdertype',
					type : 'string'
				}, {
					dataIndex : 'brandid',
					type : 'string'
				}, {
					dataIndex : 'figure',
					type : 'string'
				}, {
					dataIndex : 'figure2',
					type : 'string'
				}, {
					dataIndex : 'cuttype',
					type : 'string'
				}, {
					dataIndex : 'nominaldiameter',
					type : 'string'
				}, {
					dataIndex : 'celength',
					type : 'string'
				}, {
					dataIndex : 'helicalangle',
					type : 'string'
				}, {
					dataIndex : 'noseradius',
					type : 'string'
				}, {
					dataIndex : 'coneangle',
					type : 'string'
				}, {
					dataIndex : 'teethnumber',
					type : 'string'
				}, {
					dataIndex : 'portsize',
					type : 'string'
				}, {
					dataIndex : 'length',
					type : 'string'
				}, {
					dataIndex : 'mimmaterialname',
					type : 'string'
				}, {
					dataIndex : 'remark',
					type : 'string'
				}]
	});
	// 表格
	var grid = new Ext.grid.GridPanel({
				title : '<span class="commoncss">整体式刀具</span>',
				header : false,
				height : 500,
				id : 'gridid',
				autoScroll : true,
				frame : true,
				region : 'center',
				store : milling_toolholder_integralStore,
				stripeRows : true,
				sm : sm,
				cm : milling_toolholder_integralCm,
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
				plugins : [filtersMilling_toolholder_integral],
				stateful : sf,
				stateId : 'grid-surfacemilling',
				listeners : {
					afterrender : function() {
						if (parent.grf == true) {
							calcButton.hide();
							calcButton2.hide();
							calcButton3.hide();
						} else {
							calcButton.show();
							calcButton2.show();
							calcButton3.show();
						}
					}
				}
			});

	// 机夹刀体表格
	var tbar2 = new Ext.Toolbar({// workpiecematerialCombo 
		// //workpieceisotypeCombo
		items : [new Ext.Toolbar.TextItem({
							text : '工件材料:',
							autoHeight : true
						}), workpieceisotypeCombo3,
				new Ext.Toolbar.TextItem({
							text : '刀具名称:',
							autoHeight : true
						}), nameCombo2, '-',
				new Ext.Toolbar.TextItem({
							text : '公称直径:',
							autoHeight : true
						}), nominaldiameterCombo2, '-',
				new Ext.Toolbar.TextItem({
							text : '主偏角:',
							autoHeight : true
						}), mainangleCombo2, '-', new Ext.Toolbar.TextItem({
							text : '切削深度:',
							autoHeight : true
						}), apmaxCombo2,'-', '-', {
							text : '刀体打印预览',
							iconCls : 'previewIcon',
							handler : function() {
								printTask();
							}
						},'-', '-', {
							text : '刀片打印预览',
							iconCls : 'previewIcon',
							handler : function() {
								printTask2();
							}
						}, '->', {
					text : '重置',
					iconCls : 'tbar_synchronizeIcon',
					handler : function() {
						resetCombo2();
					}
				}]
	});

	// 页面过滤
	var filtersMilling_toolholder_clamp = new Ext.ux.grid.GridFilters({// string,numeric,date,list,boolean
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
					dataIndex : 'toolholdertype',
					type : 'string'
				}, {
					dataIndex : 'brandid',
					type : 'string'
				}, {
					dataIndex : 'figure',
					type : 'string'
				}, {
					dataIndex : 'figure2',
					type : 'string'
				}, {
					dataIndex : 'cuttype',
					type : 'string'
				}, {
					dataIndex : 'nominaldiameter',
					type : 'string'
				}, {
					dataIndex : 'mainangle',
					type : 'string'
				}, {
					dataIndex : 'toothnumber',
					type : 'string'
				}, {
					dataIndex : 'effectivetoothnumber',
					type : 'string'
				}, {
					dataIndex : 'portsize',
					type : 'numeric'
				}, {
					dataIndex : 'length',
					type : 'numeric'
				}, {
					dataIndex : 'interferencedepth',
					type : 'numeric'
				}, {
					dataIndex : 'apmax',
					type : 'numeric'
				}, {
					dataIndex : 'aemax',
					type : 'string'
				}, {
					dataIndex : 'featurecode',
					type : 'string'
				}, {
					dataIndex : 'toolweight',
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
					dataIndex : 'aname6',
					type : 'string'
				}, {
					dataIndex : 'atype6',
					type : 'string'
				}, {
					dataIndex : 'aname7',
					type : 'string'
				}, {
					dataIndex : 'atype7',
					type : 'string'
				}, {
					dataIndex : 'aname8',
					type : 'string'
				}, {
					dataIndex : 'atype8',
					type : 'string'
				}, {
					dataIndex : 'aname9',
					type : 'string'
				}, {
					dataIndex : 'atype9',
					type : 'string'
				}, {
					dataIndex : 'remark',
					type : 'string'
				}
		/*
		 * { type : 'list', dataIndex : 'size', options : ['extra small',
		 * 'small', 'medium', 'large', 'extra large'] }
		 */]
	});

	// 表格
	var grid2 = new Ext.grid.GridPanel({
				// title : '<span class="commoncss">机夹式刀体</span>',
				header : false,
				height : (document.body.clientHeight - 31) * grid_ratio,
				id : 'grid2id',
				autoScroll : true,
				frame : true,
				region : 'center',
				store : milling_toolholder_clampStore,
				stripeRows : true,
				sm : sm2,
				cm : milling_toolholder_clampCm,
				tbar : tbar2,
				// bbar : bbar2,
				viewConfig : {
					forceFit : false
					// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
				},
				loadMask : {
					msg : '正在加载表格数据,请稍等...'
				},
				view : new Ext.grid.GroupingView(),
				plugins : [filtersMilling_toolholder_clamp],
				stateful : sf,
				stateId : 'grid-surfacemilling2',
				listeners : {
					afterrender : function() {
						if (parent.grf == true) {
							calcButton.hide();
							calcButton2.hide();
							calcButton3.hide();
						} else {
							calcButton.show();
							calcButton2.show();
							calcButton3.show();
						}
					}
				}
			});
	// 机夹刀片表格
	var tbar3 = new Ext.Toolbar({// workpiecematerialCombo
		// //workpieceisotypeCombo
		items : ['->', {
					text : '重置',
					iconCls : 'tbar_synchronizeIcon',
					handler : function() {
						resetCombo3();
					}
				}]
	});

	// 页面过滤
	var filtersMilling_blade_clamp = new Ext.ux.grid.GridFilters({// string,numeric,date,list,boolean
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
					dataIndex : 'bladetype',
					type : 'string'
				}, {
					dataIndex : 'brandid',
					type : 'string'
				}, {
					dataIndex : 'figure',
					type : 'string'
				}, {
					dataIndex : 'figure2',
					type : 'string'
				}, {
					dataIndex : 'bladematerialid',
					type : 'string'
				}, {
					dataIndex : 'bladematerialname',
					type : 'string'
				}, {
					dataIndex : 'grooveid',
					type : 'string'
				}, {
					dataIndex : 'shape',
					type : 'string'
				}, {
					dataIndex : 'reliefangle',
					type : 'string'
				}, {
					dataIndex : 'celength',
					type : 'string'
				}, {
					dataIndex : 'turningtime',
					type : 'numeric'
				}, {
					dataIndex : 'thichness',
					type : 'numeric'
				}, {
					dataIndex : 'noseradius',
					type : 'numeric'
				}, {
					dataIndex : 'wiperlength',
					type : 'string'
				}, {
					dataIndex : 'characteristic',
					type : 'string'
				}, {
					dataIndex : 'featurecode',
					type : 'string'
				}, {
					dataIndex : 'remark',
					type : 'string'
				}
		/*
		 * { type : 'list', dataIndex : 'size', options : ['extra small',
		 * 'small', 'medium', 'large', 'extra large'] }
		 */]
	});
	
	// 表格
	var grid3 = new Ext.grid.GridPanel({
				// title : '<span class="commoncss">机夹式刀片</span>',
				header : false,
				height : (document.body.clientHeight - 31) * (1 - grid_ratio),
				id : 'grid3id',
				autoScroll : true,
				frame : true,
				region : 'center',
				store : milling_blade_clampStore,
				stripeRows : true,
				sm : sm3,
				cm : milling_blade_clampCm,
				// tbar : tbar3,
				bbar : bbar2, // 请注意,在第三个grid中使用的是第二个的bbar2!
				// 2014-03-17-16-52-02
				viewConfig : {
					forceFit : false
					// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
				},
				loadMask : {
					msg : '正在加载表格数据,请稍等...'
				},
				view : new Ext.grid.GroupingView(),
				plugins : [filtersMilling_blade_clamp],
				stateful : sf,
				stateId : 'grid-surfacemilling3',
				listeners : {
					afterrender : function() {
						if (parent.grf == true) {
							calcButton.hide();
							calcButton2.hide();
							calcButton3.hide();
						} else {
							calcButton.show();
							calcButton2.show();
							calcButton3.show();
						}
					}
				}
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
	milling_toolholder_integralStore.load({
				params : {
					start : 0,
					limit : bbar.pageSize
				}
			});

	// 表格单击事件
	grid2.on('rowclick', function(pGrid, rowIndex, event) {
				recs = pGrid.getSelectionModel().getSelections();

				// 加载双grid中的下面的grid的数据;
				milling_blade_clampStoreLoad(recs);
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
	 * milling_toolholder_clampStore.load({ params : { start : 0, limit :
	 * bbar2.pageSize } });
	 */
	// 表格单击事件
	grid3.on('rowclick', function(pGrid, rowIndex, event) {
				// Ext.getCmp('modifyid').enable();
				// Ext.getCmp('deleteid').enable();
			});
	// 表格双击事件
	grid3.on('rowdblclick', function(grid, rowIndex, event) {
				propertyDisplay3();
			});

	// 是否默认选中第一行数据
	/*
	 * bbar3.on("change", function() { //
	 * grid.getSelectionModel().selectFirstRow(); });
	 */

	// 页面初始自动查询数据
	/*
	 * milling_toolholder_clampStore.load({ params : { start : 0, limit :
	 * bbar2.pageSize } });
	 */

	// 表格右键（整体）
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
								milling_toolholder_integralStore.reload();
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

	// 绑定右键（整体）
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

	// 表格右键(机体）
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
							iconCls : 'page_refreshIcon',
							handler : function() {
								milling_toolholder_clampStore.reload();
							}
						}, {
							text : '重置',
							iconCls : 'tbar_synchronizeIcon',
							handler : function() {
								resetCombo2();
							}
						}]
			});

	// 复制
	function copyCell2() {
		copyToClipboard(infoCell2);
	}

	// 绑定右键(机体）
	var infoCell2;
	grid2.on("cellcontextmenu", function(grid2, rowIndex, columnIndex, e) {// cellcontextmenu
				// //rowcontextmenu
				e.preventDefault();
				grid2.getSelectionModel().selectRow(rowIndex);

				var record2 = grid2.getStore().getAt(rowIndex); // 获取record
				var fieldName2 = grid2.getColumnModel()
						.getDataIndex(columnIndex);// 当前列的fieldname
				infoCell2 = record2.get(fieldName2);// 获取当前单元格数据

				contextmenu2.showAt(e.getXY());
			});

	grid2.on("contextmenu", function(e) {// cellcontextmenu
				// //rowcontextmenu
				e.preventDefault();
			});
	// 表格右键(机片）
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
							iconCls : 'page_refreshIcon',
							handler : function() {
								milling_blade_clampStore.reload();
							}
						}, {
							text : '重置',
							iconCls : 'tbar_synchronizeIcon',
							handler : function() {
								resetCombo3();
							}
						}]
			});

	// 复制
	function copyCell3() {
		copyToClipboard(infoCell3);
	}

	// 绑定右键(机片）
	var infoCell3;
	grid3.on("cellcontextmenu", function(grid3, rowIndex, columnIndex, e) {// cellcontextmenu
				// //rowcontextmenu
				e.preventDefault();
				grid3.getSelectionModel().selectRow(rowIndex);

				var record3 = grid3.getStore().getAt(rowIndex); // 获取record
				var fieldName3 = grid3.getColumnModel()
						.getDataIndex(columnIndex);// 当前列的fieldname
				infoCell3 = record3.get(fieldName3);// 获取当前单元格数据

				contextmenu3.showAt(e.getXY());
			});

	grid3.on("contextmenu", function(e) {// cellcontextmenu
				// //rowcontextmenu
				e.preventDefault();
			});

	var grid2and3 = new Ext.Panel({
				title : '机夹式刀具',
				frame : false,
				id : 'gridid2_3',
				
				layout :/* {
					type : 'vbox',
					align : 'center'
				},*/'auto',
				items : [grid2, grid3 /*
										 * { rowHeight : .7, // baseCls :
										 * 'x-plain', // bodyStyle :
										 * 'padding:5px 0 5px 5px', items :
										 * [grid2] }, { rowHeight : .3, items :
										 * [grid3] }
										 */],
				listeners : {
					resize : function(p, aw, ah, ow, oh) {
						/*if (!grid_init) {
							if (ah < oh) { // 隐藏了header
								grid2.setHeight(grid2.height - 80 * grid_ratio);
								grid3.setHeight(grid3.height - 80
										* (1 - grid_ratio));
							} else {
								grid2.setHeight(grid2.height + 80 * grid_ratio);
								grid3.setHeight(grid3.height + 80
										* (1 - grid_ratio));
							}
						}*/
					/*	grid_init = false;*/
					}
				}
			});

	var tabs = new Ext.TabPanel({
				region : 'center',
				id : 'tabsid',
				enableTabScroll : true,
				// autoWidth : true,
				activeTab : 0,
				height : document.body.clientHeight,
				width : document.body.clientWidth,
				buttonAlign : 'right',
				items : [grid2and3, grid /* , grid3 */],
				listeners : {
					tabchange : function(tabpanel, tab) {
						/*
						 * if (tab.getId() == 'gridid') {//激活了刀体grid;
						 * refreshMilling_toolholder_integralForce(); } else
						 * if(tab.getId() == 'grid2id') {
						 * refreshMilling_toolholder_clampForce(); }
						 */
						if (tabpanel.getActiveTab().getId() == 'gridid') {
							milling_toolholder_integralStoreLoad();
						} else if (tabpanel.getActiveTab().getId() == 'gridid2_3') {
							milling_toolholder_clampStoreLoad();
							milling_blade_clampStoreLoad();
						}
					}
				}
			});

	// 布局模型
	var viewport = new Ext.Viewport({
				layout : 'border',
				items : [tabs]
			});

	// 刷新整体刀体
	function refreshMilling_toolholder_integral() {
		if (parent.grf == true) {
			refreshMilling_toolholder_integralForce();
		}
	}

	function refreshMilling_toolholder_integralForce() {
		milling_toolholder_integralStoreLoad();
	}

	// 刷新机夹式铣刀刀体
	function refreshMilling_toolholder_clamp() {
		if (parent.grf == true) {
			refreshMilling_toolholder_clampForce();
		}
	}

	function refreshMilling_toolholder_clampForce() {
		milling_toolholder_clampStoreLoad();
	}
	// 刷新机夹式铣刀刀片
	function refreshMilling_blade_clamp() {
		if (parent.grf == true) {
			refreshMilling_blade_clampForce();
		}
	}

	function refreshMilling_blade_clampForce() {
		milling_blade_clampStoreLoad();
	}

	// 更新
	function resetCombo() {
		nameStore.load();
		nominaldiameterStore.load();
		/*celengthStore.load();*/
		workpieceisotypeCombo.setValue('');
		nominaldiameterCombo.setValue('');
		// mainangleCombo.setValue('');
		nameCombo.setValue('');
		nameCombo2.setValue('');
		celengthCombo.setValue('');
		nominaldiameterCombo2.setValue('');
		mainangleCombo2.setValue('');
		apmaxCombo2.setValue('');
		workpieceisotypeCombo3.setValue('');

		
		nameStoreLoad();
		nominaldiameterStoreLoad();
		celengthStoreLoad();
		
		pagesize_combo.reset();
		bbar.pageSize=50;
		milling_toolholder_integralStoreLoad();
		var currentpage=1;
		var currentpage=bbar.store.currentPage;
		bbar.moveFirst();
	}

	// 更新
	function resetCombo2() {
		nameStore2.load();
		nominaldiameterStore2.load();
		nominaldiameterCombo2.setValue('');
		mainangleCombo2.setValue('');
		apmaxCombo2.setValue('');
		nameCombo.setValue('');
		nameCombo2.setValue('');
		workpieceisotypeCombo.setValue('');
		nominaldiameterCombo.setValue('');
		workpieceisotypeCombo3.setValue('');
		celengthCombo.setValue('');

		name2StoreLoad();
		nominaldiameter2StoreLoad();
		mainangle2StoreLoad();
		apmax2StoreLoad();
		

		pagesize_combo2.reset();
		bbar2.pageSize=50;
		milling_blade_clampStoreLoad();
		milling_toolholder_clampStoreLoad();
		var currentpage=1;
		var currentpage=bbar2.store.currentPage;
		bbar2.moveFirst();

	}

	// 更新
	// function resetCombo3() {
	/*
	 * workpieceisotypeCombo3.setValue('');
	 * 
	 * nominaldiameterCombo2.setValue(''); apmaxCombo2.setValue('');
	 * mainangleCombo2.setValue(''); workpieceisotypeCombo.setValue('');
	 * nominaldiameterCombo.setValue(''); workpieceisotypeCombo3.setValue('');
	 */
	// mainangleCombo.setValue('');
	/*
	 * turningtypeCombo.reset(); thheadangleCombo.reset();
	 * handoftoolCombo.reset(); portsizeCombo.reset(); cseriesCombo.reset();
	 * shapeCombo2.setValue(''); //shapeCombo2.reset();
	 * reliefangleCombo2.setValue(''); //reliefangleCombo2.reset();
	 * boreCombo.reset(); boreCombo.hide(); Ext.getCmp('borelableid').hide();
	 * shapeCombo.setValue(''); //shapeCombo.reset();
	 * reliefangleCombo.setValue(''); //shapeCombo.reset();
	 * celengthCombo.setValue(''); celengthCombo.disable(); /*
	 * milling_toolholder_integralStore.load({ params : { workpieceisotype :
	 * workpieceisotypeCombo.getValue(), accuracyid : accuracyCombo.getValue(),
	 * shape : '', reliefangle : '', celength : celengthCombo.getValue(),
	 * noseradius : mainangleCombo.getValue() } });
	 */

	// milling_toolholder_clampStore.reload();
	/*
	 * .load({ params : { turningtype : '', thheadangle : '', handoftool : '',
	 * portsize : '', cseries : '', shapeblade : '', reliefangleblade : '' } });
	 */
	// milling_blade_clampStoreLoad();
	// }
	

	// 查看整体刀具详细信息;
	function propertyDisplay() {
		var record = grid.getSelectionModel().getSelected();
		var index = grid.getStore().indexOf(record);

		var path = checkImagePath(record.data.figure);
		var path2 = checkImagePath(record.data.figure2);

		var propertygrid = new Ext.grid.PropertyGrid({
					title : '整体刀具详情',
					border : true,
					autoSort : false,
					frame : true,
					ds : milling_toolholder_integralStore,
					cm : milling_toolholder_integralCm,
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
						'sapcode' : 'SAP编码',
						'name' : '刀片名称',
						'toolholdertype' : '型号',
						'brandid' : '品牌',
						'figure' : '结构简图',
						'figure2' : '尺寸简图',
						'cuttype' : '切削类型',
						'nominaldiameter' : '公称直径',
						'celength' : '刃长',
						'helicalangle' : '螺旋角',
						'noseradius' : '刃尖倒角半径',
						'coneangle' : '刃部锥角',
						'teethnumber' : '刃数',
						'portsize' : '接口尺寸',
						'length' : '总长',
						'mimmaterialname' : '材质',
						'remark' : '备注'
					},
					/*
					 * customEditors : { 'cuttype' : new Ext.grid.GridEditor(new
					 * Ext.form.ComboBox({ displayField : 'text', mode :
					 * 'local', triggerAction : 'all', store : CUTTYPEStore })),
					 * 'nominaldiameter' : new Ext.grid.GridEditor(new
					 * Ext.form.ComboBox({ displayField : 'text', mode :
					 * 'local', triggerAction : 'all', store :
					 * nominaldiameterStore })), 'mainangle' : new
					 * Ext.grid.GridEditor(new Ext.form.ComboBox({ displayField :
					 * 'text', mode : 'local', triggerAction : 'all', store :
					 * mainangleStore })) }, customRenderers : { 'cuttype' :
					 * CUTTYPERender, 'nominaldiameter' : NOMINALDIAMETERRender,
					 * 'mainangle' : MAINANGLERender, 'teethnumber' :
					 * TEETHNUMBERRender },
					 */
					listeners : {
						beforeedit : function(e) {
							e.cancel = true;
							return false;
						}
					}
				});

		// Store数据存储
		var parameterStore = new Ext.data.GroupingStore({
					proxy : new Ext.data.HttpProxy({
						url : 'surfacemilling.do?code=queryIntegralParameter'
							// queryMilling_blade_clamp4Manage是在TempletmillingAction中的方法queryMilling_blade_clamp4Manage;
						}),
					reader : new Ext.data.JsonReader({
								totalProperty : 'TOTALCOUNT',
								root : 'ROOT'
							}, [{
										name : 'vc'
									}, {
										name : 's'
									}, {
										name : 'ae'
									}, {
										name : 'ap'
									},{
										name : 'f'
									},  {
										name : 'removalrates'
									}, {
										name : 'fz'
									}])
				});

		// 列模型
		var parameterCm = new Ext.grid.ColumnModel([{
					header : 'Vc<br />(m/min)',
					dataIndex : 'vc',
					width : 80,
					align : 'center',
					// renderer : THICKNESS2Render,
					// hidden : true,
					sortable : true
				}, {
					header : 'S<br />(r/min)',
					dataIndex : 's',
					width : 80,
					align : 'center',
					// hidden : true,
					sortable : true
				}, {
					header : 'Fz<br />(mm/Z)',
					dataIndex : 'fz',
					width : 80,
					align : 'center',
					// renderer : THICKNESS2Render,
					// hidden : true,
					sortable : true
				},{
					header : 'F<br />(mm/min)',
					dataIndex : 'f',
					width : 80,
					align : 'center',
					// hidden : true,
					sortable : true
				}, {
					header : 'Ap<br />(mm)',
					dataIndex : 'ap',
					width : 80,
					align : 'center',
					// hidden : true,
					sortable : true
				}, {
					header : 'Ae<br />(mm)',
					dataIndex : 'ae',
					width : 80,
					align : 'center',
					// hidden : true,
					sortable : true
				}/*,  {
					header : 'Q<br />(cm^3/min)',
					dataIndex : 'removalrates',
					width : 90,
					align : 'center',
					// renderer : THICKNESS2Render,
					hidden : true,
					sortable : true
				}, {
					header : 'Pc<br />(kW)',
					dataIndex : 'power',
					width : 60,
					align : 'center',
					// renderer : THICKNESS2Render,
				    hidden : true,
					sortable : true
				}, {
					header : 'chip',
					dataIndex : 'chip',
					width : 60,
					align : 'center',
					hidden : true,
					sortable : true
				}*/]);

		var parameterGrid = new Ext.grid.GridPanel({
			title : '切削参数',
			header : false,
			height : 500,
			id : 'parameterid',
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
				// stateId : 'cuttingparameterID'
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
			items : [{  id:'boxid',
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
				// stateId : 'grid-surfacemilling-milling_toolholder_clamp'
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
			items : [{   id:'boxid2',
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
				// stateId : 'grid-surfacemilling-milling_toolholder_clamp'
			});

		var milling_toolholder_integralStorePanel = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
				url : 'surfacemilling.do?code=queryMilling_toolholder_integral4Manage'
					// queryMilling_toolholder_integral4Manage是在Milling_toolholder_integralAction中的方法queryMilling_toolholder_integral4Manage;
			}),
			reader : new Ext.data.JsonReader({
						totalProperty : 'TOTALCOUNT',
						root : 'ROOT'
					}, [{
								name : 'sapcode'
							}, {
								name : 'name'
							}, {
								name : 'toolholdertype'
							}, {
								name : 'brandid'
							}, {
								name : 'featurecode'
							}])
		});

		// 表格
		var milling_toolholder_integralPanel = new Ext.grid.GridPanel({
					title : '匹配刀体',
					// header : false,
					autoScroll : true,
					id : 'milling_toolholder_integralPanelid',
					// disabled : true,
					frame : true,
					region : 'center',
					store : milling_toolholder_integralStorePanel,
					stripeRows : true,
					// sm : sm2,
					cm : new Ext.grid.ColumnModel([new Ext.grid.RowNumberer({
										header : '序',
										width : 26
									}), {
								header : 'SAP编码',
								dataIndex : 'sapcode',
								width : 72,
								sortable : true
							}, {
								header : '刀体名称',
								dataIndex : 'name',
								width : 150,
								sortable : true
									// hidden : true
							},{
								header : '刀体型号',
								dataIndex : 'toolholdertype',
								width : 130,
								// hidden : true,
								sortable : true
							}, {
								header : '刀体品牌',
								dataIndex : 'brandid',
								// hidden : true,
								width : 80,
								sortable : true
							}, {
								header : '刀片形式',
								dataIndex : 'featurecode',
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
			items : [propertygrid]
				/*
				 * , listeners : { tabchange : function(tabpanel, tab) { } }
				 */
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
								width : 160,
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
					/* milling_toolholder_integralPanel, */sapPanel,parameterGrid],
			listeners : {
				tabchange : function(tabpanel, tab) {
					if (tab.getId() == 'milling_toolholder_clampPanelid') {
						milling_toolholder_integralStorePanel.load({
									params : {
										featurecode : record.data.featurecode
									}
								});
					} else if (tab.getId() == 'sapPanelid') {
						sapStore.load({
									params : {
										sapcode : record.data.sapcode
									}
								});
					} else if (pictureTabs.getActiveTab().getItemId() == 'picturePanelid') {
						var newsrc =checkImagePath(record.data.figure);
						Ext.getCmp('boxid').getEl().dom.src = newsrc;
						}
					else if (pictureTabs.getActiveTab().getItemId() == 'sizePanelid') {
					
						var newsrc =checkImagePath(record.data.figure2);
						Ext.getCmp('boxid2').getEl().dom.src = newsrc;

						}else if (tab.getId() == 'parameterid') {
						parameterStore.load({
									params : {
										workpiecematerialid : workpieceisotypeCombo
												.getValue(),
												sapcode : record.data.sapcode, 
										k1 : record.data.k1
										// toolholder

									}
								});
					}
				}
			}
		});

		var propertyDisplayWin = new Ext.Window({
			title : '整体式刀具详细信息',
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
						// grid.getSelectionModel().selectRow(index
						// + 1);
					// grid.getView().focusRow(index
						// + 1);
						index = 0;
						record = grid.getStore().getAt(index);
						propertygrid.setSource({'SAP编码':	record.data.sapcode,
							'刀片名称':	record.data.name,
							'型号':	record.data.toolholdertype,
							'品牌':	record.data.brandid,
							'切削类型':	record.data.cuttype,
							'公称直径':	record.data.nominaldiameter,
							'刃长':	record.data.celength,
							'螺旋角':	record.data.helicalangle,
							'刃尖倒角半径':	record.data.noseradius,
							'刃部锥角':	record.data.coneangle,
							'刃数':	record.data.teethnumber,
							'接口尺寸':	record.data.portsize,
							'总长':	record.data.length,
							'材质':	record.data.mimmaterialname,
							'备注':	record.data.remark});
						Ext.getCmp('previousbtn').disable();
					} else {
						record = grid.getStore().getAt(index);
						propertygrid.setSource({'SAP编码':	record.data.sapcode,
							'刀片名称':	record.data.name,
							'型号':	record.data.toolholdertype,
							'品牌':	record.data.brandid,
							'切削类型':	record.data.cuttype,
							'公称直径':	record.data.nominaldiameter,
							'刃长':	record.data.celength,
							'螺旋角':	record.data.helicalangle,
							'刃尖倒角半径':	record.data.noseradius,
							'刃部锥角':	record.data.coneangle,
							'刃数':	record.data.teethnumber,
							'接口尺寸':	record.data.portsize,
							'总长':	record.data.length,
							'材质':	record.data.mimmaterialname,
							'备注':	record.data.remark});
						Ext.getCmp('nextbtn').enable();
					}

					if (pictureTabs.getActiveTab().getItemId() == 'milling_toolholder_integralPanelid') {
						milling_toolholder_integralStorePanel.load({
									params : {
										featurecode : record.data.featurecode
									}
								});
					} else if (pictureTabs.getActiveTab().getItemId() == 'picturePanelid') {
						var newsrc =checkImagePath(record.data.figure);
						Ext.getCmp('boxid').getEl().dom.src = newsrc;
						}
					else if (pictureTabs.getActiveTab().getItemId() == 'sizePanelid') {
					
						var newsrc =checkImagePath(record.data.figure2);
						Ext.getCmp('boxid2').getEl().dom.src = newsrc;

						}else if (pictureTabs.getActiveTab().getItemId() == 'sapPanelid') {
						sapStore.load({
									params : {
										sapcode : record.data.sapcode
									}
								});
					} else if (pictureTabs.getActiveTab().getItemId() == 'parameterid') {
						parameterStore.load({
									params : {
										workpiecematerialid : workpieceisotypeCombo
												.getValue(),
												sapcode : record.data.sapcode, 
										k1 : record.data.k1
										// toolholder

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
					if (index >= grid.getStore().getCount()-1 ) {
						infoMsg('已经到最后一条了.');
						// grid.getSelectionModel().selectRow(index
						// - 1);
						// grid.getView().focusRow(index
						// - 1);
						index = grid2.getStore().getCount() - 1;
						record = grid.getStore().getAt(index);
						propertygrid.setSource({'SAP编码':	record.data.sapcode,
							'刀片名称':	record.data.name,
							'型号':	record.data.toolholdertype,
							'品牌':	record.data.brandid,
							'切削类型':	record.data.cuttype,
							'公称直径':	record.data.nominaldiameter,
							'刃长':	record.data.celength,
							'螺旋角':	record.data.helicalangle,
							'刃尖倒角半径':	record.data.noseradius,
							'刃部锥角':	record.data.coneangle,
							'刃数':	record.data.teethnumber,
							'接口尺寸':	record.data.portsize,
							'总长':	record.data.length,
							'材质':	record.data.mimmaterialname,
							'备注':	record.data.remark});
						Ext.getCmp('nextbtn').disable();
					} else {
						record = grid.getStore().getAt(index);
						propertygrid.setSource({'SAP编码':	record.data.sapcode,
							'刀片名称':	record.data.name,
							'型号':	record.data.toolholdertype,
							'品牌':	record.data.brandid,
							'切削类型':	record.data.cuttype,
							'公称直径':	record.data.nominaldiameter,
							'刃长':	record.data.celength,
							'螺旋角':	record.data.helicalangle,
							'刃尖倒角半径':	record.data.noseradius,
							'刃部锥角':	record.data.coneangle,
							'刃数':	record.data.teethnumber,
							'接口尺寸':	record.data.portsize,
							'总长':	record.data.length,
							'材质':	record.data.mimmaterialname,
							'备注':	record.data.remark});
						Ext.getCmp('previousbtn').enable();
					}

					if (pictureTabs.getActiveTab().getItemId() == 'milling_toolholder_integralPanelid') {
						milling_toolholder_integralStorePanel.load({
									params : {
										featurecode : record.data.featurecode
									}
								});
					} else if (pictureTabs.getActiveTab().getItemId() == 'sapPanelid') {
						sapStore.load({
									params : {
										sapcode : record.data.sapcode
									}
								});
					} else if (pictureTabs.getActiveTab().getItemId() == 'picturePanelid') {
						var newsrc =checkImagePath(record.data.figure);
						Ext.getCmp('boxid').getEl().dom.src = newsrc;
						}
					else if (pictureTabs.getActiveTab().getItemId() == 'sizePanelid') {
					
						var newsrc =checkImagePath(record.data.figure2);
						Ext.getCmp('boxid2').getEl().dom.src = newsrc;

						}else if (pictureTabs.getActiveTab().getItemId() == 'parameterid') {
						parameterStore.load({
									params : {
										workpiecematerialid : workpieceisotypeCombo
												.getValue(),
												sapcode : record.data.sapcode, 
										k1 : record.data.k1
										// toolholder

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
					propertygrid.setSource({'SAP编码':	record.data.sapcode,
						'刀片名称':	record.data.name,
						'型号':	record.data.toolholdertype,
						'品牌':	record.data.brandid,
						'切削类型':	record.data.cuttype,
						'公称直径':	record.data.nominaldiameter,
						'刃长':	record.data.celength,
						'螺旋角':	record.data.helicalangle,
						'刃尖倒角半径':	record.data.noseradius,
						'刃部锥角':	record.data.coneangle,
						'刃数':	record.data.teethnumber,
						'接口尺寸':	record.data.portsize,
						'总长':	record.data.length,
						'材质':	record.data.mimmaterialname,
						'备注':	record.data.remark});
				},
				beforeshow : function(win) {
					var workpiecematerialid = workpieceisotypeCombo.getValue();
					if (workpiecematerialid != "") {
						Ext.getCmp('parameterid').enable();
					} else {
						Ext.getCmp('parameterid').disable();
					}
				}
			}
		});

		propertyDisplayWin.show();
	}

	// 查看机夹式铣刀刀体详细信息;
	function propertyDisplay2() {
		var record = grid2.getSelectionModel().getSelected();
		var index = grid2.getStore().indexOf(record);

		var path = checkImagePath(record.data.figure);
		var path2 = checkImagePath(record.data.figure2);

		var propertygrid2 = new Ext.grid.PropertyGrid({
					title : '刀体详情',
					border : true,
					autoSort : false,
					frame : true,
					ds : milling_toolholder_clampStore,
					cm : milling_toolholder_clampCm,
					id : 'propertyGrid2id',
					enableColLock : true,
					enableColumnMove : false,
					autoExpandColumn : true,
					loadMask : true,
					stripeRows : true,
					autoScroll : true,
					clicksToEdit : 1,
					propertyNames : {
						/* 'toolholderid' : '刀体ID', */
						'sapcode' : 'SAP编码',
						'name' : '刀体名称',
						'toolholdertype' : '刀体型号',
						'brandid' : '刀体品牌',
						'figure' : '简图',
						'figure2' : '尺寸图',
						'cuttype' : '铣削类型',
						'nominaldiameter' : '公称直径',
						'mainangle' : '主偏角',
						'toothnumber' : '齿数',
						'effectivetoothnumber' : '有效齿数',
						'portsize' : '接口规格',
						'length' : '刀具总长',
						'interferencedepth' : '侧铣深度',
						'apmax' : '最大轴向切深',
						'aemax' : '最大径向切深',
						'featurecode' : '特征码',
						'toolweight' : '刀具重量',
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
						'aname6' : '附件6名称',
						'atype6' : '附件6型号',
						'aname7' : '附件7名称',
						'atype7' : '附件7型号',
						'aname8' : '附件8名称',
						'atype8' : '附件8型号',
						'aname9' : '附件9名称',
						'atype9' : '附件9型号',
						'remark' : '备注'
					},
					/*
					 * customEditors : { 'cuttype' : new Ext.grid.GridEditor(new
					 * Ext.form.ComboBox({ displayField : 'text', mode :
					 * 'local', triggerAction : 'all', store : CUTTYPEStore })),
					 * 'nominaldiameter' : new Ext.grid.GridEditor(new
					 * Ext.form.ComboBox({ displayField : 'text', mode :
					 * 'local', triggerAction : 'all', store :
					 * nominaldiameterStore })), 'mainangle' : new
					 * Ext.grid.GridEditor(new Ext.form.ComboBox({ displayField :
					 * 'text', mode : 'local', triggerAction : 'all', store :
					 * mainangleStore })) }, customRenderers : { 'cuttype' :
					 * CUTTYPERender, 'nominaldiameter' : NOMINALDIAMETERRender,
					 * 'mainangle' : MAINANGLERender },
					 */
					listeners : {
						beforeedit : function(e) {
							e.cancel = true;
							return false;
						}
					}
				});

		/*
		 * var cuttingparameter2 = new Ext.grid.GridPanel({ title : '切削参数',
		 * header : false, height : 500, //id : 'grid2id', autoScroll : true,
		 * frame : true, disabled : true, region : 'center', //store :
		 * milling_toolholder_clampStore, stripeRows : true, //sm : sm2, //cm :
		 * milling_toolholder_clampCm, //tbar : tbar2, //bbar : bbar2,
		 * viewConfig : { forceFit : false // 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况 },
		 * loadMask : { msg : '正在加载表格数据,请稍等...' } //view : new
		 * Ext.grid.GroupingView(), //plugins :
		 * [filtersMilling_toolholder_clamp], //stateful : true, //stateId :
		 * 'grid-surfacemilling-milling_toolholder_clamp' } );
		 */

		var picturePanel2 = new Ext.Panel({
			title : '结构简图',
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
			items : [{  id:'boxid3',
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
				// stateId : 'grid-surfacemilling-milling_toolholder_clamp'
			});

		var sizePanel2 = new Ext.Panel({
			title : '尺寸简图',
			 id : 'sizePanel2id',
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
			items : [{  id:'boxid4',
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
				// stateId : 'grid-surfacemilling-milling_toolholder_clamp'
			});

		var milling_toolholder_clampStorePanel = new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
						url : 'surfacemilling.do?code=queryMilling_blade_clamp4Manage'
							// queryMilling_toolholder_clamp4Manage是在Milling_toolholder_clampAction中的方法queryMilling_toolholder_clamp4Manage;
					}),
					reader : new Ext.data.JsonReader({
								totalProperty : 'TOTALCOUNT',
								root : 'ROOT'
							}, [{
										name : 'sapcode'
									}, {
										name : 'name'
									}, {
										name : 'bladetype'
									}, {
										name : 'brandid'
									}, {
										name : 'featurecode'
									}])
				});

		// 表格
		var milling_toolholder_clampPanel = new Ext.grid.GridPanel({
					title : '匹配刀片',
					// header : false,
					autoScroll : true,
					id : 'milling_toolholder_clampPanelid',
					// disabled : true,
					frame : true,
					region : 'center',
					store : milling_toolholder_clampStorePanel,
					stripeRows : true,
					// sm : sm2,
					cm : new Ext.grid.ColumnModel([new Ext.grid.RowNumberer({
										header : '序',
										width : 26
									}), {
								header : 'SAP编码',
								dataIndex : 'sapcode',
								width : 72,
								sortable : true
							}, {
								header : '刀片名称',
								dataIndex : 'name',
								width : 100,
								sortable : true
									// hidden : true
							},{
								header : '刀片型号',
								dataIndex : 'bladetype',
								width : 130,
								// hidden : true,
								sortable : true
							}, {
								header : '刀片品牌',
								dataIndex : 'brandid',
								// hidden : true,
								width : 80,
								sortable : true
							}, {
								header : '刀片特征码',
								dataIndex : 'featurecode',
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
			items : [propertygrid2]
				/*
				 * , listeners : { tabchange : function(tabpanel, tab) { } }
				 */
			});

		var sapStore2 = new Ext.data.Store({
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
		var sapPanel2 = new Ext.grid.GridPanel({
					title : '库存信息',
					// header : false,
					autoScroll : true,
					id : 'sapPanel2id',
					// disabled : true,
					frame : true,
					region : 'center',
					store : sapStore2,
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
								width : 160,
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
					items : [picturePanel2,
							sizePanel2 /* ,cuttingparameter2, */,
							milling_toolholder_clampPanel, sapPanel2],
					listeners : {
						tabchange : function(tabpanel, tab) {
							if (tab.getId() == 'milling_toolholder_clampPanelid') {
								var a = null;
		if (Ext.isDefined(grid2.getSelectionModel().getSelections())) {
			var a = jsArray2JsString(grid2.getSelectionModel().getSelections(), 'featurecode');
		}
								milling_toolholder_clampStorePanel.load({
											params : {
												featurecode : a
											}
										});
							} else if (pictureTabs2.getActiveTab().getItemId() == 'picturePanel2id') {
								var newsrc =checkImagePath(record.data.figure);
								Ext.getCmp('boxid3').getEl().dom.src = newsrc;
								}
							else if (pictureTabs2.getActiveTab().getItemId() == 'sizePanel2id') {
							
								var newsrc =checkImagePath(record.data.figure2);
								Ext.getCmp('boxid4').getEl().dom.src = newsrc;

								}else if (tab.getId() == 'sapPanel2id') {
								sapStore2.load({
											params : {
												sapcode : record.data.sapcode
											}
										});
							}
						}
					}
				});

		var propertyDisplayWin2 = new Ext.Window({
			title : '机夹式铣刀刀体详细信息',
			width : 800,
			modal : true,
			height : 400,
			closeAction : 'close',
			maximizable : true,
			// plain : true,
			layout : 'border',
			items : [propertyTabs2, pictureTabs2],
			buttons : [{
				text : '上一条',
				id : 'previousbtn2',
				iconCls : 'app_leftIcon',
				handler : function() {
					grid2.getSelectionModel().selectRow(index - 1);
					grid2.getView().focusRow(index - 1);
					index = index - 1;
					if (index <= 0) {
						infoMsg('已经到第一条了.');
						index = 0;
						record = grid2.getStore().getAt(index);
						propertygrid2.setSource({'SAP编码':	record.data.sapcode,
							'刀体名称':	record.data.name,
							'刀体型号':	record.data.toolholdertype,
							'刀体品牌':	record.data.brandid,
							'铣削类型':	record.data.cuttype,
							'公称直径':	record.data.nominaldiameter,
							'主偏角':	record.data.mainangle,
							'齿数':	record.data.toothnumber,
							'有效齿数':	record.data.effectivetoothnumber,
							'接口规格':	record.data.portsize,
							'刀具总长':	record.data.length,
							'侧铣深度':	record.data.interferencedepth,
							'最大轴向切深':	record.data.apmax,
							'最大径向切深':	record.data.aemax,
							'特征码':	record.data.featurecode,
							'刀具重量':	record.data.toolweight,
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
							'附件6名称':	record.data.aname6,
							'附件6型号':	record.data.atype6,
							'附件7名称':	record.data.aname7,
							'附件7型号':	record.data.atype7,
							'附件8名称':	record.data.aname8,
							'附件8型号':	record.data.atype8,
							'附件9名称':	record.data.aname9,
							'附件9型号':	record.data.atype9,
							'备注':	record.data.remark});
						Ext.getCmp('previousbtn2').disable();
					} else {
						record = grid2.getStore().getAt(index);
						propertygrid2.setSource({'SAP编码':	record.data.sapcode,
							'刀体名称':	record.data.name,
							'刀体型号':	record.data.toolholdertype,
							'刀体品牌':	record.data.brandid,
							'铣削类型':	record.data.cuttype,
							'公称直径':	record.data.nominaldiameter,
							'主偏角':	record.data.mainangle,
							'齿数':	record.data.toothnumber,
							'有效齿数':	record.data.effectivetoothnumber,
							'接口规格':	record.data.portsize,
							'刀具总长':	record.data.length,
							'侧铣深度':	record.data.interferencedepth,
							'最大轴向切深':	record.data.apmax,
							'最大径向切深':	record.data.aemax,
							'特征码':	record.data.featurecode,
							'刀具重量':	record.data.toolweight,
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
							'附件6名称':	record.data.aname6,
							'附件6型号':	record.data.atype6,
							'附件7名称':	record.data.aname7,
							'附件7型号':	record.data.atype7,
							'附件8名称':	record.data.aname8,
							'附件8型号':	record.data.atype8,
							'附件9名称':	record.data.aname9,
							'附件9型号':	record.data.atype9,
							'备注':	record.data.remark});
						Ext.getCmp('nextbtn2').enable();
					}if (pictureTabs2.getActiveTab().getItemId() == 'milling_toolholder_clampPanelid') {
						var a = null;
		if (Ext.isDefined(grid2.getSelectionModel().getSelections())) {
			var a = jsArray2JsString(grid2.getSelectionModel().getSelections(), 'featurecode');
		}
						milling_blade_clampStore.load({
									params : {
										featurecode : a
									}
								});
					}

					if (pictureTabs2.getActiveTab().getItemId() == 'milling_toolholder_clampPanelid') {
						var a = null;
		if (Ext.isDefined(grid2.getSelectionModel().getSelections())) {
			var a = jsArray2JsString(grid2.getSelectionModel().getSelections(), 'featurecode');
		}
						milling_toolholder_clampStorePanel.load({
									params : {
										featurecode : a
									}
								});
					} else if (pictureTabs2.getActiveTab().getItemId() == 'sapPanel2id') {
						sapStore2.load({
									params : {
										sapcode : record.data.sapcode
									}
								});
					}else if (pictureTabs2.getActiveTab().getItemId() == 'picturePanel2id') {
						var newsrc =checkImagePath(record.data.figure);
						Ext.getCmp('boxid3').getEl().dom.src = newsrc;
						}
					else if (pictureTabs2.getActiveTab().getItemId() == 'sizePanel2id') {
					
						var newsrc =checkImagePath(record.data.figure2);
						Ext.getCmp('boxid4').getEl().dom.src = newsrc;

						}
				}
			}, {
				text : '下一条',
				id : 'nextbtn2',
				iconCls : 'app_rightIcon',
				handler : function() {
					grid2.getSelectionModel().selectRow(index + 1);
					grid2.getView().focusRow(index + 1);
					index = index + 1;
					if (index >= grid2.getStore().getCount() - 1) {
						infoMsg('已经到最后一条了.');
						index = grid2.getStore().getCount() - 1;
						record = grid2.getStore().getAt(index);
						propertygrid2.setSource({'SAP编码':	record.data.sapcode,
							'刀体名称':	record.data.name,
							'刀体型号':	record.data.toolholdertype,
							'刀体品牌':	record.data.brandid,
							'铣削类型':	record.data.cuttype,
							'公称直径':	record.data.nominaldiameter,
							'主偏角':	record.data.mainangle,
							'齿数':	record.data.toothnumber,
							'有效齿数':	record.data.effectivetoothnumber,
							'接口规格':	record.data.portsize,
							'刀具总长':	record.data.length,
							'侧铣深度':	record.data.interferencedepth,
							'最大轴向切深':	record.data.apmax,
							'最大径向切深':	record.data.aemax,
							'特征码':	record.data.featurecode,
							'刀具重量':	record.data.toolweight,
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
							'附件6名称':	record.data.aname6,
							'附件6型号':	record.data.atype6,
							'附件7名称':	record.data.aname7,
							'附件7型号':	record.data.atype7,
							'附件8名称':	record.data.aname8,
							'附件8型号':	record.data.atype8,
							'附件9名称':	record.data.aname9,
							'附件9型号':	record.data.atype9,
							'备注':	record.data.remark});
						Ext.getCmp('nextbtn2').disable();
					} else {
						record = grid2.getStore().getAt(index);
						propertygrid2.setSource({'SAP编码':	record.data.sapcode,
							'刀体名称':	record.data.name,
							'刀体型号':	record.data.toolholdertype,
							'刀体品牌':	record.data.brandid,
							'铣削类型':	record.data.cuttype,
							'公称直径':	record.data.nominaldiameter,
							'主偏角':	record.data.mainangle,
							'齿数':	record.data.toothnumber,
							'有效齿数':	record.data.effectivetoothnumber,
							'接口规格':	record.data.portsize,
							'刀具总长':	record.data.length,
							'侧铣深度':	record.data.interferencedepth,
							'最大轴向切深':	record.data.apmax,
							'最大径向切深':	record.data.aemax,
							'特征码':	record.data.featurecode,
							'刀具重量':	record.data.toolweight,
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
							'附件6名称':	record.data.aname6,
							'附件6型号':	record.data.atype6,
							'附件7名称':	record.data.aname7,
							'附件7型号':	record.data.atype7,
							'附件8名称':	record.data.aname8,
							'附件8型号':	record.data.atype8,
							'附件9名称':	record.data.aname9,
							'附件9型号':	record.data.atype9,
							'备注':	record.data.remark});
						Ext.getCmp('previousbtn2').enable();
					}

					if (pictureTabs2.getActiveTab().getItemId() == 'milling_toolholder_clampPanelid') {
						var a = null;
		if (Ext.isDefined(grid2.getSelectionModel().getSelections())) {
			var a = jsArray2JsString(grid2.getSelectionModel().getSelections(), 'featurecode');
		}
						milling_blade_clampStore.load({
									params : {
										featurecode : a
									}
								});
					}

					if (pictureTabs2.getActiveTab().getItemId() == 'milling_toolholder_clampPanelid') {
						var a = null;
		if (Ext.isDefined(grid2.getSelectionModel().getSelections())) {
			var a = jsArray2JsString(grid2.getSelectionModel().getSelections(), 'featurecode');
		}
						milling_toolholder_clampStorePanel.load({
									params : {
										featurecode : a
									}
								});
					} 
					else if (pictureTabs2.getActiveTab().getItemId() == 'picturePanel2id') {
						var newsrc =checkImagePath(record.data.figure);
						Ext.getCmp('boxid3').getEl().dom.src = newsrc;
						}
					else if (pictureTabs2.getActiveTab().getItemId() == 'sizePanel2id') {
					
						var newsrc =checkImagePath(record.data.figure2);
						Ext.getCmp('boxid4').getEl().dom.src = newsrc;

						}else if (pictureTabs2.getActiveTab().getItemId() == 'sapPanel2id') {
						sapStore2.load({
									params : {
										sapcode : record.data.sapcode
									}
								});
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
				}
			}],
			listeners : {
				afterrender : function(tabpanel, tab) {
					propertygrid2.setSource({'SAP编码':	record.data.sapcode,
						'刀体名称':	record.data.name,
						'刀体型号':	record.data.toolholdertype,
						'刀体品牌':	record.data.brandid,
						'铣削类型':	record.data.cuttype,
						'公称直径':	record.data.nominaldiameter,
						'主偏角':	record.data.mainangle,
						'齿数':	record.data.toothnumber,
						'有效齿数':	record.data.effectivetoothnumber,
						'接口规格':	record.data.portsize,
						'刀具总长':	record.data.length,
						'侧铣深度':	record.data.interferencedepth,
						'最大轴向切深':	record.data.apmax,
						'最大径向切深':	record.data.aemax,
						'特征码':	record.data.featurecode,
						'刀具重量':	record.data.toolweight,
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
						'附件6名称':	record.data.aname6,
						'附件6型号':	record.data.atype6,
						'附件7名称':	record.data.aname7,
						'附件7型号':	record.data.atype7,
						'附件8名称':	record.data.aname8,
						'附件8型号':	record.data.atype8,
						'附件9名称':	record.data.aname9,
						'附件9型号':	record.data.atype9,
						'备注':	record.data.remark});
				}
			}
		});

		propertyDisplayWin2.show();
	}

	// 查看机夹式铣刀刀片详细信息;
	function propertyDisplay3() {
		var record = grid3.getSelectionModel().getSelected();
		var index = grid3.getStore().indexOf(record);

		var path = checkImagePath(record.data.figure);
		var path2 = checkImagePath(record.data.figure2);

		var propertygrid3 = new Ext.grid.PropertyGrid({
					title : '刀片详情',
					border : true,
					autoSort : false,
					frame : true,
					ds : milling_blade_clampStore,
					cm : milling_blade_clampCm,
					id : 'propertyGrid3id',
					enableColLock : true,
					enableColumnMove : false,
					autoExpandColumn : true,
					loadMask : true,
					stripeRows : true,
					autoScroll : true,
					clicksToEdit : 1,
					propertyNames : {
						/* 'bladeid' : '刀片编号', */
						'sapcode' : 'SAP编码',
						'name' : '刀片名称',
						'bladetype' : '刀片型号',
						'brandid' : '刀片品牌',
						'figure' : '简图',
						'figure2' : '实物图',
						/* 'bladematerialid' : '刀片材质ID', */
						'bladematerialname' : '刀片材质',
						'grooveid' : '断屑槽形',
						'shape' : '刀片形状',
						'reliefangle' : '刀片后角',
						'celength' : '切削刃长度',
						'turningtime' : '可转位次数',
						'thichness' : '刀片厚度',
						'noseradius' : '刀尖圆弧半径',
						'wiperlength' : '修光刃长度',
						'characteristic' : '特点',
						'featurecode' : '特征码',
						'remark' : '备注'
					},
					/*
					 * customEditors : { 'cuttype' : new Ext.grid.GridEditor(new
					 * Ext.form.ComboBox({ displayField : 'text', mode :
					 * 'local', triggerAction : 'all', store : CUTTYPEStore })) },
					 * customRenderers : { 'cuttype' : CUTTYPERender },
					 */
					listeners : {
						beforeedit : function(e) {
							e.cancel = true;
							return false;
						}
					}
				});

		/*
		 * var cuttingparameter2 = new Ext.grid.GridPanel({ title : '切削参数',
		 * header : false, height : 500, //id : 'grid2id', autoScroll : true,
		 * frame : true, disabled : true, region : 'center', //store :
		 * milling_toolholder_clampStore, stripeRows : true, //sm : sm2, //cm :
		 * milling_toolholder_clampCm, //tbar : tbar2, //bbar : bbar2,
		 * viewConfig : { forceFit : false // 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况 },
		 * loadMask : { msg : '正在加载表格数据,请稍等...' } //view : new
		 * Ext.grid.GroupingView(), //plugins :
		 * [filtersMilling_toolholder_clamp], //stateful : true, //stateId :
		 * 'grid-surfacemilling-milling_toolholder_clamp' } );
		 */

		var picturePanel3 = new Ext.Panel({
			title : '结构简图',
			 id : 'picturePanel3id',
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
			items : [{   id:'boxid6',
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
				// stateId : 'grid-surfacemilling-milling_toolholder_clamp'
			});

		var sizePanel3 = new Ext.Panel({
			title : '尺寸简图',
			 id : 'sizePanel3id',
			autoScroll : true,
			frame : true,
			region : 'center',
			// sm : sm3,
			// cm : milling_toolholder_clampCm,
			// tbar : tbar3,
			// bbar : bbar3,
			viewConfig : {
				forceFit : true
				// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
			},
			loadMask : {
				msg : '正在加载图像数据,请稍等...'
			},
			items : [{  id:'boxid5',
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
				// stateId : 'grid-surfacemilling-milling_toolholder_clamp'
			});

		/*
		 * var milling_toolholder_integralStorePanel = new Ext.data.Store({
		 * proxy : new Ext.data.HttpProxy({ url :
		 * 'surfacemilling.do?code=queryMilling_toolholder_integral4Manage' //
		 * queryMilling_toolholder_integral4Manage是在Milling_toolholder_integralAction中的方法queryMilling_toolholder_integral4Manage; } ),
		 * reader : new Ext.data.JsonReader({ totalProperty : 'TOTALCOUNT', root :
		 * 'ROOT' }, [{ name : 'sapcode' }, { name :
		 * 'milling_toolholder_integraltype' }, { name : 'featurecode' }]) }); //
		 * 表格 var bladePanel = new Ext.grid.GridPanel({ title : '匹配刀片', //header :
		 * false, autoScroll : true, id : 'milling_toolholder_integralPanelid',
		 * //disabled : true, frame : true, region : 'center', store :
		 * milling_toolholder_integralStorePanel, stripeRows : true, //sm : sm2,
		 * cm : new Ext.grid.ColumnModel([new Ext.grid.RowNumberer({ header :
		 * '序', width : 24 }), { header : 'SAP编码', dataIndex : 'sapcode', width :
		 * 60, sortable : true }, { header : '刀片型号', dataIndex : 'bladetype',
		 * width : 130, // hidden : true, sortable : true }, { header : '刀片特征码',
		 * dataIndex : 'featurecode', width : 80, sortable : true }]), //tbar :
		 * tbar2, //bbar : bbar2, viewConfig : { forceFit : true // 不产生横向滚动条,
		 * 各列自动扩展自动压缩, 适用于列数比较少的情况 }, loadMask : { msg : '正在加载表格数据,请稍等...' } });
		 */

		var milling_blade_clampStorePanel = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
				url : 'surfacemilling.do?code=queryMilling_toolholder_clamp4Manage'
					// queryMilling_blade_clamp4Manage是在Milling_blade_clampAction中的方法queryMilling_blade_clamp4Manage;
			}),
			reader : new Ext.data.JsonReader({
						totalProperty : 'TOTALCOUNT',
						root : 'ROOT'
					}, [{
								name : 'sapcode'
							}, {
								name : 'name'
							}, {
								name : 'toolholdertype'
							}, {
								name : 'brandid'
							}, {
								name : 'featurecode'
							}])
		});

		// 表格
		var milling_blade_clampPanel = new Ext.grid.GridPanel({
					title : '匹配刀体',
					// header : false,
					autoScroll : true,
					id : 'milling_blade_clampPanelid',
					// disabled : true,
					frame : true,
					region : 'center',
					store : milling_blade_clampStorePanel,
					stripeRows : true,
					// sm : sm2,
					cm : new Ext.grid.ColumnModel([new Ext.grid.RowNumberer({
										header : '序',
										width : 26
									}), {
								header : 'SAP编码',
								dataIndex : 'sapcode',
								width : 72,
								sortable : true
							}, {
								header : '刀体名称',
								dataIndex : 'name',
								width : 150,
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
								dataIndex : 'brandid',
								// hidden : true,
								width : 80,
								sortable : true
							}, {
								header : '刀体特征码',
								dataIndex : 'featurecode',
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
		var propertyTabs3 = new Ext.TabPanel({
			region : 'center',
			id : 'propertytabs3id',
			enableTabScroll : true,
			// autoWidth : true,
			activeTab : 0,
			height : document.body.clientHeight,
			// width : document.body.clientWidth / 4,
			// width : 400,
			buttonAlign : 'right',
			items : [propertygrid3]
				/*
				 * , listeners : { tabchange : function(tabpanel, tab) { } }
				 */
			});

		// Store数据存储
		var parameterStore = new Ext.data.GroupingStore({
					proxy : new Ext.data.HttpProxy({
						url : 'surfacemilling.do?code=queryParameter'
							// queryBlade4Manage是在BladeAction中的方法queryBlade4Manage;
						}),
					reader : new Ext.data.JsonReader({
								totalProperty : 'TOTALCOUNT',
								root : 'ROOT'
							}, [{
										name : 'parametersid'
									}, {
										name : 'materialid'
									}, {
										name : 'workpiecematerialid'
									}, {
										name : 'wmcode'
									}, {
										name : 'K1'
									}, {
										name : 'K2'
									}, {
										name : 'ae'
									}, {
										name : 'ap'
									}, {
										name : 'vc'
									}, {
										name : 's'
									}, {
										name : 'fz'
									}, {
										name : 'f'
									}, {
										name : 'chip'
									}, {
										name : 'removalrates'
									}, {
										name : 'power'
									}, {
										name : 'remark'
									}, {
										name : 'apmax'
									}, {
										name : 'aemax'
									}]),
					listeners : {

		}
				});

		// 列模型
		var parameterCm = new Ext.grid.ColumnModel([{
			header : 'Vc<br />(m/min)',
			dataIndex : 'vc',
			width : 80,
			align : 'center',
			// renderer : THICKNESS2Render,
			// hidden : true,
			sortable : true
		},{
			header : 'S<br />(r/min)',
			dataIndex : 's',
			width : 80,
			align : 'center',
			// hidden : true,
			sortable : true
		},{
			header : 'Fz<br />(mm/Z)',
			dataIndex : 'fz',
			width : 80,
			align : 'center',
			// renderer : THICKNESS2Render,
			// hidden : true,
			sortable : true
		},    {
			header : 'F<br />(mm/min)',
			dataIndex : 'f',
			width : 80,
			align : 'center',
			// hidden : true,
			sortable : true
		},{
			header : 'Ap<br />(mm)',
			dataIndex : 'ap',
			width : 80,
			align : 'center',
			//hidden : true,
			sortable : true
		},/* {
			header : 'Ap max<br />(mm)',
			dataIndex : 'apmax',
			width : 80,
			align : 'center',
			// renderer : THICKNESS2Render,
			hidden : true,
			sortable : true
		}, */{
			header : 'Ae<br />(mm)',
			dataIndex : 'ae',
			width : 80,
			align : 'center',
			//hidden : true,
			sortable : true
		}/* ,{
			header : 'Ae max<br />(mm)',
			dataIndex : 'aemax',
			width : 80,
			align : 'center',
			hidden : true,
			sortable : true
		},  {	header : 'Pc<br />(kW)',
					dataIndex : 'power',
					width : 60,
					align : 'center',
					// renderer : THICKNESS2Render,
				    hidden : true,
					sortable : true
				}, {
			header : 'Q<br />(cm^3/min)',
			dataIndex : 'removalrates',
			width : 60,
			align : 'center',
			// renderer : THICKNESS2Render,
			hidden : true,
			sortable : true
		}*/]);

		var parameterGrid = new Ext.grid.GridPanel({
			title : '切削参数',
			header : false,
			height : 500,
			id : 'parameterid',
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
				// stateId : 'cuttingparameterID'
			});

		var sapStore3 = new Ext.data.Store({
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
		var sapPanel3 = new Ext.grid.GridPanel({
					title : '库存信息',
					// header : false,
					autoScroll : true,
					id : 'sapPanel3id',
					// disabled : true,
					frame : true,
					region : 'center',
					store : sapStore3,
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
								width : 160,
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

		/*
		 * var pictureTabs3 = new Ext.TabPanel({ region : 'east', split : true,
		 * enableTabScroll : true, width : '60%', // collapsible: true, //
		 * margins:'3 0 3 3', // cmargins:'3 3 3 3', activeTab : 0, height :
		 * document.body.clientHeight, // width : document.body.clientWidth / 4,
		 * buttonAlign : 'right', items : [ picturePanel3, sizePanel3,
		 * milling_blade_clampPanel ,sapPanel3], listeners : { tabchange :
		 * function(tabpanel, tab) { if (tab.getId() ==
		 * 'milling_blade_clampPanelid') { milling_blade_clampStorePanel.load({
		 * params : { featurecode : record.data.featurecode } }); }else if
		 * (tab.getId() == 'sapPanel3id') { sapStore3.load({ params : { sapcode :
		 * record.data.sapcode } });} } } });
		 */

		// TODO
		var pictureTabs3 = new Ext.TabPanel({
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
					items : [picturePanel3, sizePanel3, 
							milling_blade_clampPanel, sapPanel3,parameterGrid],
					listeners : {
						tabchange : function(pictureTabs3) {
						if (pictureTabs3.getActiveTab().getItemId() == 'picturePanel3id') {
								var newsrc =checkImagePath(record.data.figure2);
								Ext.getCmp('boxid6').getEl().dom.src = newsrc;
								}
							else if (pictureTabs3.getActiveTab().getItemId() == 'sizePanel3id') {
							
								var newsrc =checkImagePath(record.data.figure);
								Ext.getCmp('boxid5').getEl().dom.src = newsrc;

								}
							dataLoadDynamic(pictureTabs3, parameterGrid,
									parameterStore,
									milling_blade_clampStorePanel, sapPanel3,
									sapStore3);
						}
					}
				});

		var propertyDisplayWin3 = new Ext.Window({
			title : '机夹式铣刀刀片详细信息',
			width : 800,
			modal : true,
			height : 400,
			closeAction : 'close',
			maximizable : true,
			// plain : true,
			layout : 'border',
			items : [propertyTabs3, pictureTabs3],
			buttons : [{
				text : '上一条',
				id : 'previousbtn3',
				iconCls : 'app_leftIcon',
				handler : function() {
					grid3.getSelectionModel().selectRow(index - 1);
					grid3.getView().focusRow(index - 1);
					index = index - 1;
					if (index <= 0) {
						infoMsg('已经到第一条了.');
						index = 0;
						record = grid3.getStore().getAt(index);
						propertygrid3.setSource({
							'SAP编码':	record.data.sapcode,
							'刀片名称':	record.data.name,
							'刀片型号':	record.data.bladetype,
							'刀片品牌':	record.data.brandid,
							'刀片材质':	record.data.bladematerialname,
							'断屑槽形':	record.data.grooveid,
							'刀片形状':	record.data.shape,
							'刀片后角':	record.data.reliefangle,
							'切削刃长度':	record.data.celength,
							'可转位次数':	record.data.turningtime,
							'刀片厚度':	record.data.thichness,
							'刀尖圆弧半径':	record.data.noseradius,
							'修光刃长度':	record.data.wiperlength,
							'特点':	record.data.characteristic,
							'特征码':	record.data.featurecode,
							'备注':	record.data.remark});
						Ext.getCmp('previousbtn3').disable();
					} else {
						record = grid3.getStore().getAt(index);
						propertygrid3.setSource({
							'SAP编码':	record.data.sapcode,
							'刀片名称':	record.data.name,
							'刀片型号':	record.data.bladetype,
							'刀片品牌':	record.data.brandid,
							'刀片材质':	record.data.bladematerialname,
							'断屑槽形':	record.data.grooveid,
							'刀片形状':	record.data.shape,
							'刀片后角':	record.data.reliefangle,
							'切削刃长度':	record.data.celength,
							'可转位次数':	record.data.turningtime,
							'刀片厚度':	record.data.thichness,
							'刀尖圆弧半径':	record.data.noseradius,
							'修光刃长度':	record.data.wiperlength,
							'特点':	record.data.characteristic,
							'特征码':	record.data.featurecode,
							'备注':	record.data.remark});
						Ext.getCmp('nextbtn3').enable();
					}
					 if (pictureTabs3.getActiveTab().getItemId() == 'picturePanel3id') {
						var newsrc =checkImagePath(record.data.figure2);
						Ext.getCmp('boxid6').getEl().dom.src = newsrc;
						}
					else if (pictureTabs3.getActiveTab().getItemId() == 'sizePanel3id') {
					
						var newsrc =checkImagePath(record.data.figure);
						Ext.getCmp('boxid5').getEl().dom.src = newsrc;

						}
					dataLoadDynamic(pictureTabs3, parameterGrid,
							parameterStore, milling_blade_clampStorePanel,
							sapPanel3, sapStore3);
				}
			}, {
				text : '下一条',
				id : 'nextbtn3',
				iconCls : 'app_rightIcon',
				handler : function() {
					grid3.getSelectionModel().selectRow(index + 1);
					grid3.getView().focusRow(index + 1);
					index = index + 1;
					if (index >= grid3.getStore().getCount() - 1) {
						infoMsg('已经到最后一条了.');
						index = grid3.getStore().getCount() - 1;
						record = grid3.getStore().getAt(index);
						propertygrid3.setSource({
							'SAP编码':	record.data.sapcode,
							'刀片名称':	record.data.name,
							'刀片型号':	record.data.bladetype,
							'刀片品牌':	record.data.brandid,
							'刀片材质':	record.data.bladematerialname,
							'断屑槽形':	record.data.grooveid,
							'刀片形状':	record.data.shape,
							'刀片后角':	record.data.reliefangle,
							'切削刃长度':	record.data.celength,
							'可转位次数':	record.data.turningtime,
							'刀片厚度':	record.data.thichness,
							'刀尖圆弧半径':	record.data.noseradius,
							'修光刃长度':	record.data.wiperlength,
							'特点':	record.data.characteristic,
							'特征码':	record.data.featurecode,
							'备注':	record.data.remark});
						Ext.getCmp('nextbtn3').disable();
					} else {
						record = grid3.getStore().getAt(index);
						propertygrid3.setSource({
							'SAP编码':	record.data.sapcode,
							'刀片名称':	record.data.name,
							'刀片型号':	record.data.bladetype,
							'刀片品牌':	record.data.brandid,
							'刀片材质':	record.data.bladematerialname,
							'断屑槽形':	record.data.grooveid,
							'刀片形状':	record.data.shape,
							'刀片后角':	record.data.reliefangle,
							'切削刃长度':	record.data.celength,
							'可转位次数':	record.data.turningtime,
							'刀片厚度':	record.data.thichness,
							'刀尖圆弧半径':	record.data.noseradius,
							'修光刃长度':	record.data.wiperlength,
							'特点':	record.data.characteristic,
							'特征码':	record.data.featurecode,
							'备注':	record.data.remark});
						Ext.getCmp('previousbtn3').enable();
					}
					 if (pictureTabs3.getActiveTab().getItemId() == 'picturePanel3id') {
						var newsrc =checkImagePath(record.data.figure2);
						Ext.getCmp('boxid6').getEl().dom.src = newsrc;
						}
					else if (pictureTabs3.getActiveTab().getItemId() == 'sizePanel3id') {
					
						var newsrc =checkImagePath(record.data.figure);
						Ext.getCmp('boxid5').getEl().dom.src = newsrc;

						}
					dataLoadDynamic(pictureTabs3, parameterGrid,
							parameterStore, milling_blade_clampStorePanel,
							sapPanel3, sapStore3);
				}
			}, {
				text : '保存',
				id : 'savebtn3',
				hidden : true,
				iconCls : 'acceptIcon',
				handler : function() {

				}
			}, {
				text : '关闭',
				id : 'cancelbtn3',
				iconCls : 'cancelIcon',
				handler : function() {
					propertyDisplayWin3.close();
				}
			}],
			listeners : {
				afterrender : function(tabpanel, tab) {
					propertygrid3.setSource({
						'SAP编码':	record.data.sapcode,
						'刀片名称':	record.data.name,
						'刀片型号':	record.data.bladetype,
						'刀片品牌':	record.data.brandid,
						'刀片材质':	record.data.bladematerialname,
						'断屑槽形':	record.data.grooveid,
						'刀片形状':	record.data.shape,
						'刀片后角':	record.data.reliefangle,
						'切削刃长度':	record.data.celength,
						'可转位次数':	record.data.turningtime,
						'刀片厚度':	record.data.thichness,
						'刀尖圆弧半径':	record.data.noseradius,
						'修光刃长度':	record.data.wiperlength,
						'特点':	record.data.characteristic,
						'特征码':	record.data.featurecode,
						'备注':	record.data.remark});
				},
				beforeshow : function(win) {
					var workpiecematerialid = workpieceisotypeCombo3.getValue();
					if (workpiecematerialid != "") {
						Ext.getCmp('parameterid').enable();
					} else {
						Ext.getCmp('parameterid').disable();
					}
				}
			}

		});

		propertyDisplayWin3.show();
	}
	
	// 数据动态加载
	function dataLoadDynamic(pictureTabs, parameterGrid, parameterStore,
			milling_blade_clampStorePanel, sapPanel3, sapStore3) {
		var record = grid2.getSelectionModel().getSelected(); // 刀体
		var record2 = grid3.getSelectionModel().getSelected();// 刀片
		if (pictureTabs.getActiveTab().getItemId() == 'milling_blade_clampPanelid') {
			milling_blade_clampStorePanel.load({
						params : {
							featurecode : record2.data.featurecode
						}
					});
		}/*else if (pictureTabs.getActiveTab().getItemId() == 'picturePanel3id') {
			var newsrc =checkImagePath(record.data.figure);
			Ext.getCmp('boxid5').getEl().dom.src = newsrc;
			}
		else if (pictureTabs.getActiveTab().getItemId() == 'sizePanel3id') {
		
			var newsrc =checkImagePath(record.data.figure2);
			Ext.getCmp('boxid6').getEl().dom.src = newsrc;

			}*/ else if (pictureTabs.getActiveTab().getItemId() == 'parameterid') {
			parameterStore.load({
						params : {
							workpiecematerialid : workpieceisotypeCombo
									.getValue(),
							k1 : record.data.k1, // toolholder
							sapcode : record.data.sapcode, 
							k2 : record2.data.k2
							// blade
						}
					});
		} else if (pictureTabs.getActiveTab().getItemId() == 'sapPanel3id') {
			sapStore3.load({
						params : {
							sapcode : record2.data.sapcode
						}
					});
		}
	}
	
	// 整体刀具页面数据加载函数
	function milling_toolholder_integralStoreLoad() {
		milling_toolholder_integralStore.load({
			params : {
				start : bbar.pageSize
						* (grid.getBottomToolbar().getPageData().activePage - 1),
				limit : bbar.pageSize,
				workpieceisotype : workpieceisotypeCombo.getValue(),
				celength : celengthCombo.getValue(),
				nominaldiameter : nominaldiameterCombo.getValue(),
				name : nameCombo.getValue()
			}
		});
	};

	// 机夹刀体页面数据加载函数
	function milling_toolholder_clampStoreLoad() {
		milling_toolholder_clampStore.load({
			params : {
				// start : bbar2.pageSize *
				// (grid2.getBottomToolbar().getPageData().activePage
				// - 1),
				start : bbar2.pageSize
						* (grid3.getBottomToolbar().getPageData().activePage - 1),
				// 请注意上面使用的是第三个grid,因为grid2中的bbar2加载到了grid中,所以要用grid3.getBottomToolbar来得到相应的页数.
				limit : bbar2.pageSize,
				nominaldiameter : nominaldiameterCombo2.getValue(),
				mainangle : mainangleCombo2.getValue(),
				workpieceisotype : workpieceisotypeCombo3.getValue(),
				apmax : apmaxCombo2.getValue(),
				name : nameCombo2.getValue()
			}
		});
	}

	/*
	 * function milling_blade_clampStoreLoad() { milling_blade_clampStore
	 * .load({ params : { // start : bbar2.pageSize * //
	 * (grid2.getBottomToolbar().getPageData().activePage // - 1), start :
	 * bbar2.pageSize (grid3.getBottomToolbar() .getPageData().activePage - 1), //
	 * 请注意上面使用的是第三个grid,因为grid2中的bbar2加载到了grid中,所以要用grid3.getBottomToolbar来得到相应的页数.
	 * 
	 * workpieceisotype : workpieceisotypeCombo3 .getValue() } }); }
	 */

	// 机夹刀片页面数据加载函数
	function milling_blade_clampStoreLoad(rec) {// 请注意函数有rec参数
		var jsarrstr = null;
		if (Ext.isDefined(rec)) {
			var jsarrstr = jsArray2JsString(rec, 'featurecode');
		}
if(jsarrstr != ''){
		if (parent.gdlf) {
			milling_blade_clampStore.load({
						params : {
							
							workpieceisotype : workpieceisotypeCombo3
									.getValue(),
							featurecode : jsarrstr
						}
					});
		}
		
}else{
	

	if (parent.gdlf) {
		milling_blade_clampStore.load({
					params : {
						
						workpieceisotype : workpieceisotypeCombo3
								.getValue(),
						featurecode : 0
					}
				});
	}
	

	
	
}
		
	}
	autoLoadButton.setActiveItem(0);
	
	
	// 导出任务计划数据
	function printTask() {
		showWaitMsg('正在准备报表数据,请稍等...');
		
		if(grid2.getSelectionModel().getCount()==1){
			var record = grid2.getSelectionModel().getSelected()
		}else if(grid2.getSelectionModel().getCount()>=2){	
			errorMsg("请只选择一把刀片")
		}else{
			errorMsg("请选择刀片")};
		
		
		Ext.Ajax.request({
			
			url : 'surfacemilling.do?code=printTask',
			   
			
			params : {
				 workpieceisotype : workpieceisotypeCombo3.getValue(),
				 name : nameCombo2.getValue(),
				 nominaldiameter : nominaldiameterCombo2.getValue(),
				 mainangle : mainangleCombo2.getValue(),
				 apmax : apmaxCombo2.getValue(),
			     sapcode : record.data.sapcode
			    /* workpiecematerialid : workpieceisotypeCombo.getValue(),
				 bladematerialid : record.data.bladematerialid,
				 bladetype : record.data.bladetype*/
					
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
		
		if(grid3.getSelectionModel().getCount()==1){
			var record = grid3.getSelectionModel().getSelected()
		}else if(grid3.getSelectionModel().getCount()>=2){	
			errorMsg("请只选择一把刀片")
		}else{
			errorMsg("请选择刀片")};
		
			var record2 = grid2.getSelectionModel().getSelected();
		Ext.Ajax.request({
			
			url : 'surfacemilling.do?code=printTask2',
			   
			
			params : {
				 workpieceisotype : workpieceisotypeCombo3.getValue(),
				 name : nameCombo2.getValue(),
				 nominaldiameter : nominaldiameterCombo2.getValue(),
				 mainangle : mainangleCombo2.getValue(),
				 apmax : apmaxCombo2.getValue(),
				 sapcodeoftoolholder : grid2.getSelectionModel().getSelected().data.sapcode,
			     sapcode2 : record.data.sapcode,
			     sapcode : record2.data.sapcode,
			     workpiecematerialid : workpieceisotypeCombo3.getValue(),
			     k1 : grid2.getSelectionModel().getSelected().data.k1,
			     k2 : record.data.k2
					
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
		
		if(grid.getSelectionModel().getCount()==1){
			var record = grid.getSelectionModel().getSelected()
		}else if(grid.getSelectionModel().getCount()>=2){	
			errorMsg("请只选择一把刀片")
		}else{
			errorMsg("请选择刀片")};
		
		
		Ext.Ajax.request({
			
			url : 'surfacemilling.do?code=printTask3',
			   
			
			params : {
				 workpieceisotype : workpieceisotypeCombo.getValue(),
				 name : nameCombo.getValue(),
				 nominaldiameter : nominaldiameterCombo.getValue(),
				 celength : celengthCombo.getValue(),
			     sapcode : record.data.sapcode,
			     workpiecematerialid : workpieceisotypeCombo.getValue(),
			     k1 : record.data.k1
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
