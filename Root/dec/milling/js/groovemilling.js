/**
 * 槽铣
 * 
 * @author fuxianwu
 * @since 2013-01-01
 */
// 工件材料状态//Workpiecematerial//workpiecematerial
// 铣削方式//Cutmethod//cutmethod
// 公称直径//Nominaldiameter//nominaldiameter
// 槽深//Interferencedepth//interferencedepth
// 刀尖圆弧半径//Noseradius//noseradius
// 刀具类型//Tooltype//tooltype
// 刃口宽度//Cutedge//cutedge
Ext.onReady(function() {
	
	var cuttypeArr = new Array(143, 79); // 刀片后角
	var cuttypepp = pp;
	
	
	var divnum = 25;// 调整toolbar中的下拉框的大小与位置;
	var numlign = 11;

	var pp = 0.8; // 将下拉框图片缩放为80%;

	var grid_ratio = 0.65; // 上下两个grid的高度比例
	var grid_init = true;
	// 复选框
	var sm = new Ext.grid.CheckboxSelectionModel();

	// 行号
	var rownum = new Ext.grid.RowNumberer({
				header : '序',
				width : 26
			});
	// 复选框(机夹刀体）
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
	var milling_toolholder_integralCm = new Ext.grid.ColumnModel([rownum, sm, /*{
		header : '刀体编号', // 列标题
		dataIndex : 'toolholderid', // 数据索引,和Store数据存储模型对应
		width : 60, // 列宽度
		sortable : true, // 该列是否要排序
		hidden : true
			// 该列是否隐藏
		}, */ {
		header : '刀体名称',
		dataIndex : 'name',
		width : 140,
		sortable : true
			// hidden : true
		}, {
			header : 'SAP编码',
			dataIndex : 'sapcode',
			width : 100,
			sortable : true
			/*hidden : true*/
		},{
		header : '刀体型号',
		dataIndex : 'toolholdertype',
		width : 180,
		// hidden : true,
		sortable : true
	},  {
		header : '铣削类型',
		dataIndex : 'cuttype',
		width : 180,
		// hidden : true,
		sortable : true
	}, {
		header : '刀体品牌',
		dataIndex : 'brandid',
		// hidden : true,
		width : 80,
		sortable : true
	},/* {
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
	},*/{
		header : '接口尺寸',
		dataIndex : 'portsize',
		width : 80,
		align : 'center',
		hidden : true,
		sortable : true
	},{
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
		header : '刃部锥角',
		dataIndex : 'coneangle',
		width : 80,
		align : 'center',
		// hidden : true,
		sortable : true
	}, {
		header : '刃数',
		dataIndex : 'teethnumber',
		width : 80,
		align : 'center',
		// hidden : true,
		sortable : true
	},  {
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

	function dataLoadDynamic1(pictureTabs, parameterGrid, parameterStore,sapPanel,sapStore/*,
			milling_blade_clampStorePanel*/) {
		var record = grid.getSelectionModel().getSelected(); // 刀体
		/*if (pictureTabs.getId() == 'milling_toolholder_clampPanelid') {
			milling_toolholder_integralStorePanel.load({
						params : {
							featurecode : record.data.featurecode
						}
					});
		} else*/ if (pictureTabs.getActiveTab().getItemId() == 'parameterid') {
			parameterStore.load({
						params : {
							workpiecematerialid : workpieceisotypeCombo
									.getValue(),
							k1 : record.data.k1,
							sapcode : record.data.sapcode
							// toolholder

						}
					});
		}	else if (pictureTabs.getActiveTab().getItemId() == 'picturePanelid') {
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
			});}
	}


	// 列模型(机夹刀体）
	var milling_toolholder_clampCm = new Ext.grid.ColumnModel([rownum2, sm2, /*{
		header : '刀体编号', // 列标题
		dataIndex : 'toolholderid', // 数据索引,和Store数据存储模型对应
		width : 60, // 列宽度
		sortable : true, // 该列是否要排序
		hidden : true
			// 该列是否隐藏
		}, */{
		header : '刀体名称',
		dataIndex : 'name',
		width : 120,
		sortable : true
		//hidden : true
	},{
		header : 'SAP编码',
		dataIndex : 'sapcode',
		width : 100,
		sortable : true
		/*hidden : true*/
	},  {
		header : '刀体型号',
		dataIndex : 'toolholdertype',
		width : 150,
		//hidden : true,
		sortable : true
	},{
		header : '铣削类型',
		dataIndex : 'cuttype',
		width : 180,
		// renderer : TURNINGTYPERender,
		// hidden : true,
		sortable : true
	},  {
		header : '刀体品牌',
		dataIndex : 'brandid',
		width : 80,
		//hidden : true,
		sortable : true
	}, /*{
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
	},*/ {
		header : '公称直径',
		dataIndex : 'nominaldiameter',
		width : 80,
		align : 'center',
		// hidden : true,
		sortable : true
	},{
		header : '接口规格',
		dataIndex : 'portsize',
		align : 'center',
		width :150,
		// renderer : SHAPERender,
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
	},  {
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
		width : 60,
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
	}, /*{
		header : '特征码',
		dataIndex : 'featurecode',
		width : 80,
		hidden : true,
		sortable : true
	},*/ {
		header : '刀具重量',
		dataIndex : 'toolweight',
		width : 120,
		align : 'center',
		// hidden : true,
		sortable : true
	}, /*{
		header : '附件1名称',
		dataIndex : 'aname1',
		width : 120,
		 hidden : true,
		sortable : true
	}, {
		header : '附件1型号',
		dataIndex : 'atype1',
		width : 120,
		 hidden : true,
		sortable : true
	}, {
		header : '附件2名称',
		dataIndex : 'aname1',
		width : 120,
		 hidden : true,
		sortable : true
	}, {
		header : '附件2型号',
		dataIndex : 'atype1',
		width : 120,
		 hidden : true,
		sortable : true
	}, {
		header : '附件3名称',
		dataIndex : 'aname1',
		width : 120,
		hidden : true,
		sortable : true
	}, {
		header : '附件3型号',
		dataIndex : 'atype1',
		width : 120,
		hidden : true,
		sortable : true
	}, {
		header : '附件4名称',
		dataIndex : 'aname1',
		width : 120,
		hidden : true,
		sortable : true
	}, {
		header : '附件4型号',
		dataIndex : 'atype1',
		width : 120,
		hidden : true,
		sortable : true
	}, {
		header : '附件5名称',
		dataIndex : 'aname1',
		width : 120,
		hidden : true,
		sortable : true
	}, {
		header : '附件5型号',
		dataIndex : 'atype1',
		width : 120,
		hidden : true,
		sortable : true
	}, {
		header : '附件6名称',
		dataIndex : 'aname1',
		width : 120,
		hidden : true,
		sortable : true
	}, {
		header : '附件6型号',
		dataIndex : 'atype1',
		width : 120,
		hidden : true,
		sortable : true
	}, {
		header : '附件7名称',
		dataIndex : 'aname1',
		width : 120,
		hidden : true,
		sortable : true
	}, {
		header : '附件7型号',
		dataIndex : 'atype1',
		width : 120,
		hidden : true,
		sortable : true
	}, {
		header : '附件8名称',
		dataIndex : 'aname1',
		width : 120,
		hidden : true,
		sortable : true
	}, {
		header : '附件8型号',
		dataIndex : 'atype1',
		width : 120,
		hidden : true,
		sortable : true
	}, {
		header : '附件9名称',
		dataIndex : 'aname1',
		width : 120,
		hidden : true,
		sortable : true
	}, {
		header : '附件9型号',
		dataIndex : 'atype1',
		width : 120,
		hidden : true,
		sortable : true
	},*/ {
		header : '备注信息',
		dataIndex : 'remark',
		width : 120,
		// hidden : true,
		sortable : true
	}]);

	// 列模型(机夹刀片）
	var milling_blade_clampCm = new Ext.grid.ColumnModel([rownum3, sm3,/* {
		header : '刀片编号', // 列标题
		dataIndex : 'bladeid', // 数据索引,和Store数据存储模型对应
		width : 60, // 列宽度
		sortable : true, // 该列是否要排序
		hidden : true
			// 该列是否隐藏
		},*/ {
		header : '刀片名称',
		dataIndex : 'name',
		width : 100,
		sortable : true
			// hidden : true
		},  {
			header : 'SAP编码',
			dataIndex : 'sapcode',
			width : 100,
			sortable : true
			/*hidden : true*/
		},{
		header : '刀片型号',
		dataIndex : 'bladetype',
		width : 130,
		// hidden : true,
		sortable : true
	}, {
		header : '断屑槽形',
		dataIndex : 'grooveid',
		width : 80,
		align : 'center',
		// hidden : true,
		sortable : true
	},{
		header : '刀片材质',
		dataIndex : 'bladematerialname',
		width : 80,
		align : 'center',
		// renderer : TURNINGTYPERender,
		// hidden : true,
		sortable : true
	},{
		header : '刀片品牌',
		dataIndex : 'brandid',
		// hidden : true,
		width : 80,
		sortable : true
	}, /*{
		header : '结构简图',
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
	},*//*, {
		header : '刀片材质ID',
		dataIndex : 'bladematerialid',
		width : 80,
		align : 'center',
		hidden : true,
		// renderer : TURNINGTYPERender,
		// hidden : true,
		sortable : true
	},*/   {
		header : '刀片形状',
		dataIndex : 'shape',
		width : 80,
		align : 'center',
		// hidden : true,
		sortable : true
	},{
		header : '切削刃长度',
		dataIndex : 'celength',
		width : 100,
		align : 'center',
		// renderer : CSERIESRender,
		// hidden : true,
		sortable : true
	},  {
		header : '可转位次数°',
		dataIndex : 'turningtime',
		width : 80,
		align : 'center',
		// hidden : true,
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
		//hidden : true,
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
		header : '刀片后角',
		dataIndex : 'reliefangle',
		width : 80,
		align : 'center',
		hidden : true,
		sortable : true
	}, {
		header : '特点',
		dataIndex : 'characteristic',
		width : 100,
		hidden : true,
		sortable : true
	}, /*{
		header : '特征码',
		dataIndex : 'featurecode',
		width : 100,
		// hidden : true,
		sortable : true
	},*/ {
		header : '备注信息',
		dataIndex : 'remark',
		width : 80,
		// hidden : true,
		sortable : true
	}]);

	// Store数据存储
	var milling_toolholder_integralStore = new Ext.data.GroupingStore({
		proxy : new Ext.data.HttpProxy({
			url : 'groovemilling.do?code=queryMilling_toolholder_integral4Manage'
				// queryMilling_toolholder_integral4Manage是在Milling_toolholder_integralAction中的方法queryMilling_toolholder_integral4Manage;
		}),
		reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [/*{
							name : 'toolholderid'
						},*/ {
							name : 'sapcode'
						}, {
							name : 'name'
						}, {
							name : 'toolholdertype'
						}, {
							name : 'brandid'
						}, {
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
						},{
							name : 'figure'
						}, {
							name : 'figure2'
						},  {
							name : 'remark'
						}, {
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
					url : 'groovemilling.do?code=queryMilling_toolholder_clamp4Manage'
						// queryMilling_toolholder_clamp4Manage是在Milling_toolholder_clampAction中的方法queryMilling_toolholder_clamp4Manage;
				}),
				reader : new Ext.data.JsonReader({
							totalProperty : 'TOTALCOUNT',
							root : 'ROOT'
						}, [/*{
									name : 'toolholderid'
								},*/ {
									name : 'sapcode'
								}, {
									name : 'name'
								}, {
									name : 'toolholdertype'
								}, {
									name : 'brandid'
								}, {
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
									name : 'apmax'
								}, {
									name : 'aemax'
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
								}, {
									name : 'remark'
								}, {
									name : 'k1'
								}])
			});

	// Store数据存储
	var milling_blade_clampStore = new Ext.data.GroupingStore({
				proxy : new Ext.data.HttpProxy({
					url : 'groovemilling.do?code=queryMilling_blade_clamp4Manage'
						// querymilling_blade_clamp4Manage是在GroovemillingAction中的方法querymilling_blade_clamp4Manage;
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
									name : 'bladetype'
								}, {
									name : 'brandid'
								},  {
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
								}/*, {
									name : 'bladematerialid'
								}*/, {
									name : 'remark'
								}, {
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
					if (btn.getActiveItem().itemIndex == '0') {
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
					if (btn.getActiveItem().itemIndex == '0') {
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
	 * (btn.getActiveItem().itemIndex == '0') { if
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
				items : ['-', '&nbsp;&nbsp;', pagesize_combo, /*
																 * '-',
																 * '&nbsp;&nbsp;', {
																 * text :
																 * '查询结果',
																 * iconCls :
																 * 'acceptIcon',
																 * handler :
																 * function() {
																 * resultDisplay(); //
																 * Ext.getCmp('helpdiv').setText('adfadsf'); } },
																 */		{
							xtype : 'tbspacer',
							width : 10
						}, /*
							 * { text : '通过选择条目过滤刀体', iconCls : 'acceptIcon', id :
							 * 'selectMilling_toolholder_integral', handler :
							 * function() { tabs.activate(1); // var record = //
							 * grid.getSelectionModel().getSelected(); var
							 * records = grid.getSelectionModel()
							 * .getSelections();
							 * 
							 * if (records.length == 0) {
							 * milling_toolholder_integralStore.load({ //
							 * 没有选中任何条目,只过滤已经选择的项目内容; params : { start : 0,
							 * limit : bbar.pageSize } }); } else { if
							 * (records.length > 1) { infoMsg('您选择了 ' +
							 * records.length + ' 个条目，选择单个条目会获得准确匹配。'); } //
							 * grid.getSelectionModel().selectRow(grid.getSelectionModel().last, //
							 * false); milling_toolholder_clampStore.load({
							 * params : { start : 0, limit : bbar.pageSize } }); } } }, {
							 * xtype : 'tbspacer', width : 10 },
							 */runtimeButton, {
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
				items : ['-', '&nbsp;&nbsp;', pagesize_combo2, /*
																 * '-',
																 * '&nbsp;&nbsp;', {
																 * text :
																 * '查询结果',
																 * iconCls :
																 * 'acceptIcon',
																 * handler :
																 * function() {
																 * resultDisplay(); //
																 * Ext.getCmp('helpdiv').setText('adfadsf'); } },
																 */		{
							xtype : 'tbspacer',
							width : 10
						},/*
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
							 * start : bbar3.pageSize *
							 * (grid3.getBottomToolbar().getPageData().activePage -
							 * 1), limit : bbar3.pageSize, featurecode :
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
	 * '对不起,没有符合条件的记录!', items : ['-', '&nbsp;&nbsp;', pagesize_combo3, '-',
	 * '&nbsp;&nbsp;', { text : '查询结果', iconCls : 'acceptIcon', handler :
	 * function() { resultDisplay(); //
	 * Ext.getCmp('helpdiv').setText('adfadsf'); } }, { xtype : 'tbspacer',
	 * width : 10 }, { text : '通过选择条目过滤刀体', id :
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
	 * bbar2.pageSize * (grid2.getBottomToolbar().getPageData().activePage - 1),
	 * limit : bbar2.pageSize, featurecode : jsArray2JsString(records,
	 * 'featurecode') } }); } } }, { xtype : 'tbspacer', width : 10 },
	 * runtimeButton3, { xtype : 'tbspacer', width : 10 }, calcButton3, { text : ' ', //
	 * iconCls : 'acceptIcon', disabled : true, disabledClass :
	 * 'x-item-disabled-fuxianwu', id : 'helpdiv2' }] });
	 */
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

	// var resultTpl = new Ext.XTemplate('<tpl for="."><div
	// class="search-item">', '{name}', '</div></tpl>');

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
							// tpl : resultTpl,
							// tpl : '<table><tr><tpl for="."><td
							// class="x-combo-list-item">{text}</td><tpl
							// if="xindex % 5 ===
							// 0"></tr><tr></tpl></tpl></tr></table>',
							hideTrigger : true,
							enableKeyEvents : true,
							maxHeight : 0,
							// plugins : [new QM.plugin.PinyinFilter],
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

						/*
						 * var r = g.getSelectionModel().getSelected();
						 * 
						 * workpieceisotypeCombo.setValue(r.get('workpiecematerialid'));
						 * workpieceisotypeCombo.setRawValue(r.get('name'));
						 * 
						 * refreshMilling_toolholder_integral();
						 */

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
		 * 
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
				fieldLabel : '工件材料牌号',
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
	 * 
	 * refreshMilling_toolholder_integral(); }, specialkey : function(c, e) { if
	 * (e.getKey() == e.ENTER) { if (parent.grf == true) { c.reset(); }
	 * refreshMilling_toolholder_integralForce(); } } } });
	 */
	// 公称直径数据
	var nominaldiameterStore = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : 'groovemilling.do?code=queryNominaldiameterInMilling_toolholder_integra'
				// queryMachinetool4Manage是在MachinetoolAction中的方法queryMachinetool4Manage;
		}),
		reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [{
							name : 'value'
						} /*
							 * , { name : 'value' }
							 */])
	});
	nominaldiameterStore.load();

	// 公称直径下拉框
	var nominaldiameterCombo = new Ext.form.ComboBox({
				fieldLabel : '公称直径',
				hiddenName : 'nominaldiameter',
				id : 'nominaldiameterid',
				emptyText : '请选择...',
				triggerAction : 'all',
				store : nominaldiameterStore,
				displayField : 'value',
				valueField : 'value',
				selectOnFocus : true,
				loadingText : '正在加载数据...',
				mode : 'local',
				forceSelection : true,
				// pageSize : cln,
				// minListWidth : 270,
				// plugins : [new QM.plugin.PinyinFilter],
				resizable : true,
				width : document.body.clientWidth / numlign - divnum,
				// listWidth : nominaldiameterArr[0] * nominaldiametsapp + 25,
				/*
				 * tpl : '<tpl for="."><div x-combo-list-item
				 * class="x-combo-list-item"><img src="' + webContext +
				 * '/dec/combo/milling_toolholder_integral/nominaldiameter/' +
				 * '{value}' + '.png" width=' + nominaldiameterArr[0]
				 * nominaldiametsapp + ' height=' + nominaldiameterArr[1] *
				 * nominaldiametsapp + '></div></tpl>',
				 */
				listeners : {
					focus : function() {
						// nominaldiameterStore.load();
						setTimeout('Ext.getCmp("nominaldiameterid").expand();',
								1);
					},
					select : function(c, re, index) {
						nominaldiameterCombo2.setValue(c.getValue());

						refreshMilling_toolholder_integral();
						nameStore.load({
							params	: {
								nominaldiameter		: nominaldiameterCombo.getValue()
							}
						});
					},
					specialkey : function(c, e) {
						if (e.getKey() == e.ESC) {
							if (parent.grf == true) {
								c.reset();
								nominaldiameterCombo2.reset();
								nominaldiameterCombo2.setValue('');
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
			url : 'groovemilling.do?code=queryNameInMilling_toolholder_integral'
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
		minListWidth : 200,
		editable : false,
		// pageSize : cln,
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
				nominaldiameterStore.load({
					params	: {
						name		: nameCombo.getValue()
					}
				});
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

	// 槽深数据（刃长）
	var interferencedepth_or_celengthStore = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : 'groovemilling.do?code=queryCelengthInMilling_toolholder_integral'
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
	interferencedepth_or_celengthStore.load();

	// 槽深下拉框(刃长）
	var interferencedepth_or_celengthCombo = new Ext.form.ComboBox({
		fieldLabel : '',
		hiddenName : 'celength',
		id : 'interferencedepth_or_celengthid',
		emptyText : '请选择...',
		triggerAction : 'all',
		store : interferencedepth_or_celengthStore,
		displayField : 'value',
		valueField : 'value',
		selectOnFocus : true,
		loadingText : '正在加载数据...',
		mode : 'local',
		forceSelection : true,
		// pageSize : cln,
		// minListWidth : 270,
		// plugins : [new QM.plugin.PinyinFilter],
		resizable : true,
		editable : true,
		width : document.body.clientWidth / numlign - divnum,
		listeners : {
			focus : function() {
				// celengthStore.load();
				setTimeout(
						'Ext.getCmp("interferencedepth_or_celengthid").expand();',
						1);
			},
			select : function(c, re, index) {
				// interferencedepth_or_celengthCombo.getValue();
				// interferencedepth_or_interferencedepthCombo2.setValue(c.getValue());

				refreshMilling_toolholder_integral();
			},
			specialkey : function(c, e) {
				if (e.getKey() == e.ESC) {
					if (parent.grf == true) {
						c.reset();
						// interferencedepth_or_interferencedepthCombo2.reset();
						// interferencedepth_or_interferencedepthCombo2.setValue('');
					}
					refreshMilling_toolholder_integralForce();

				}if (e.getKey() == e.ENTER) {
						c.setValue(Ext.get('interferencedepth_or_celengthid').dom.value) ;
							refreshMilling_toolholder_integralForce();
						}
			}
		}
	});
	// 槽深数据（刃长2）
	var interferencedepth_or_aemaxStore = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : 'groovemilling.do?code=queryCelengthInMilling_toolholder_integral'
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
	interferencedepth_or_aemaxStore.load();

	// 槽深下拉框(刃长2）
	var interferencedepth_or_aemaxCombo = new Ext.form.ComboBox({
				fieldLabel : '',
				hiddenName : 'aemax',
				id : 'interferencedepth_or_aemaxid',
				emptyText : '请选择...',
				triggerAction : 'all',
				store : interferencedepth_or_aemaxStore,
				displayField : 'value',
				valueField : 'value',
				selectOnFocus : true,
				loadingText : '正在加载数据...',
				mode : 'local',
				forceSelection : true,
				hidden : true,
				// pageSize : cln,
				// minListWidth : 270,
				// plugins : [new QM.plugin.PinyinFilter],
				resizable : true,
				editable : true,
				width : document.body.clientWidth / numlign - divnum,
				hidden : true,
				listeners : {
					focus : function() {
						// celengthStore.load();
						setTimeout(
								'Ext.getCmp("interferencedepth_or_aemaxid").expand();',
								1);
					},
					select : function(c, re, index) {
						// interferencedepth_or_interferencedepthCombo2.setValue(c.getValue());

						refreshMilling_toolholder_integral();
					},
					specialkey : function(c, e) {
						if (e.getKey() == e.ESC) {
							if (parent.grf == true) {
								c.reset();
								// interferencedepth_or_interferencedepthCombo2.reset();
								// interferencedepth_or_interferencedepthCombo2.setValue('');
							}
							refreshMilling_toolholder_integralForce();

						}
					}
				}
			});
	// 刃口宽度（刃长）
	var cutedge_or_celengthStore = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : 'groovemilling.do?code=queryCelengthInMilling_toolholder_integral'
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
	cutedge_or_celengthStore.load();
	
	
	
	
	

	// 刃口宽度（刃长）
	var cutedge_or_celengthCombo = new Ext.form.ComboBox({
				fieldLabel : '',
				hiddenName : 'celength',
				id : 'cutedge_or_celengthid',
				emptyText : '请选择...',
				triggerAction : 'all',
				store : cutedge_or_celengthStore,
				displayField : 'value',
				valueField : 'value',
				selectOnFocus : true,
				loadingText : '正在加载数据...',
				mode : 'local',
				forceSelection : true,
				hidden : true,
				// pageSize : cln,
				// minListWidth : 270,
				// plugins : [new QM.plugin.PinyinFilter],
				resizable : true,
				editable : true,
				width : document.body.clientWidth / numlign - divnum,
				hidden : true,
				listeners : {
					focus : function() {
						// celengthStore.load();
						setTimeout(
								'Ext.getCmp("cutedge_or_celengthid").expand();',
								1);
					},
					
					
					select : function(c, re, index) {
						// interferencedepth_or_celengthCombo.setValue(c.getValue());

						refreshMilling_toolholder_integral();
					},
					
					specialkey : function(c, e) {
						if (e.getKey() == e.ESC) {
							if (parent.grf == true) {
								c.reset();
								// interferencedepth_or_celengthCombo.reset();
								// interferencedepth_or_celengthCombo.setValue('');
							}
							refreshMilling_toolholder_integralForce();

						}if (e.getKey() == e.ENTER) {
						c.setValue(Ext.get('cutedge_or_celengthid').dom.value) ;
							refreshMilling_toolholder_integralForce();
						}
					}
				}
			});

	// 刀尖圆弧半径数据
	var noseradiusStore = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : 'groovemilling.do?code=queryNoseradiusInMilling_toolholder_integral'
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
	noseradiusStore.load();

	// 刀尖圆弧半径下拉框
	var noseradiusCombo = new Ext.form.ComboBox({
				fieldLabel : '刀尖圆弧半径',
				hiddenName : 'noseradius',
				id : 'noseradiusid',
				emptyText : '请选择...',
				triggerAction : 'all',
				store : noseradiusStore,
				displayField : 'value',
				valueField : 'value',
				selectOnFocus : true,
				loadingText : '正在加载数据...',
				mode : 'local',
				forceSelection : true,
				// pageSize : cln,
				// minListWidth : 270,
				// plugins : [new QM.plugin.PinyinFilter],
				resizable : true,
				width : document.body.clientWidth / numlign - divnum,
				listeners : {
					focus : function() {
						// noseradiusStore.load();
						setTimeout('Ext.getCmp("noseradiusid").expand();', 1);
					},
					select : function(c, re, index) {
						noseradiusCombo3.setValue(c.getValue());

						refreshMilling_toolholder_integral();
					},/*
						 * , select : function() { refreshBlade(); }, specialkey :
						 * function(c, e) { if (e.getKey() == e.ENTER) { if
						 * (parent.grf == true) { c.reset(); }
						 * refreshBladeForce(); } }
						 */
					specialkey : function(c, e) {
						if (e.getKey() == e.ESC) {
							if (parent.grf == true) {
								c.reset();
								noseradiusCombo3.reset();
								noseradiusCombo3.setValue('');
							}
							refreshMilling_toolholder_integralForce();

						}if (e.getKey() == e.ENTER) {
						c.setValue(Ext.get('noseradiusid').dom.value) ;
							refreshMilling_toolholder_integralForce();
						}
					}
				}
			});
	// 机夹刀体下拉框
	// 公称直径数据
	var nominaldiameterStore2 = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : 'groovemilling.do?code=queryNominaldiameterInMilling_toolholder_clamp'
				// queryNominaldiameterInMilling_toolholder_clamp是在GroovemillingAction中的方法queryNominaldiameterInMilling_toolholder_clamp;
		}),
		reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [{
							name : 'text'
						}, {
							name : 'value'
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
						id: 'boxid15',
						xtype : 'box',
						autoEl : {
							tag : 'img',
							style : 'width:100%;height:100%;' ,
							src : 'dec/combo/alter/new/caoxi_jijia_lixi_gongchengzhijin.png'
						}
					} 
			            
			        ],
			       
				
				listeners : {
					'afterRender':function() {
						setTimeout('close', 1000)}
					
					}
					
				});
	//提示框
	var nominaldiameterDisplayWin3 = new Ext.Window(
			{
				//title : '选择助手',
				id:'nominaldiameterDisplayWin3id',
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
						id: 'boxid16',
						xtype : 'box',
						autoEl : {
							tag : 'img',
							style : 'width:100%;height:100%;' ,
							src : 'dec/combo/alter/new/caoxi_jijia_sanmianrenxi_gongchengzhijin.png'
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
				hiddenName : 'nominaldiameter',
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
				//hidden : true,
				// pageSize : cln,
				// minListWidth : 270,
				// plugins : [new QM.plugin.PinyinFilter],
				resizable : true,
				editable : true,
				width : document.body.clientWidth / numlign - divnum,
				listeners : {
					
					
					
					
					focus : function() {
						// nominaldiameterStore.load();
						setTimeout(
								'Ext.getCmp("nominaldiameterid2").expand();', 1);
					},
					expand:function(){	
						
									
						if(Ext.getCmp("cuttypeidid2").getValue()==1){
							nominaldiameterDisplayWin2.show() }
						else if(Ext.getCmp("cuttypeidid2").getValue()==2){
							nominaldiameterDisplayWin3.show() 	}else(alert("请选择铣削方式！"))
					
				},
					
					collapse:function(){
						
						
						
						if(Ext.getCmp("cuttypeidid2").getValue()==1){nominaldiameterDisplayWin2.hide() ;}
						else if(Ext.getCmp("cuttypeidid2").getValue()==2){nominaldiameterDisplayWin3.hide();}
					
				
					},
			
					
					
					
					
					select : function(c, re, index) {
						// c.setValue(c.getValue());
						// c.setRawValue(c.getRawValue());

						nominaldiameterCombo.setValue(c.getValue());

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
								nominaldiameterCombo.setValue(null);
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
			url : 'groovemilling.do?code=queryNameInMilling_toolholder_clamp'
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
		mode : 'local',
		forceSelection : true,
		editable : false,
		// pageSize : cln,
		minListWidth : 200,
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
			
				refreshMilling_toolholder_clamp();
				nominaldiameterStore2.load({
					params	: {
						name		: nameCombo2.getValue()
					}
				});
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

	
	//提示框
	var lixiDisplayWin = new Ext.Window(
			{
				//title : '选择助手',
				id:'lixiDisplayWinid',
				x:((document.body.clientWidth)/numlign-divnum)*4+240,
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
						id: 'boxid17',
						xtype : 'box',
						autoEl : {
							tag : 'img',
							style : 'width:100%;height:100%;' ,
							src : 'dec/combo/alter/new/caoxi_jijia_lixi_caoshen.png'
						}
					} 
			            
			        ],
			       
				
				listeners : {
					'afterRender':function() {
						setTimeout('close', 1000)}
					
					}
					
				});
	
	//提示框
	var sanmianrenxiDisplayWin = new Ext.Window(
			{
				//title : '选择助手',
				id:'sanmianrenxiDisplayWinid',
				x:((document.body.clientWidth)/numlign-divnum)*5+300,
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
						id: 'boxid18',
						xtype : 'box',
						autoEl : {
							tag : 'img',
							style : 'width:100%;height:100%;' ,
							src : 'dec/combo/alter/new/caoxi_jijia_sanmianrenxi_caoshen.png'
						}
					} 
			            
			        ],
			       
				
				listeners : {
					'afterRender':function() {
						setTimeout('close', 1000)}
					
					}
					
				});
	
	
	
	
	// 槽深数据（侧铣深度）
	var interferencedepth_or_interferencedepthStore2 = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : 'groovemilling.do?code=queryInterferencedepthInMilling_toolholder_clamp'
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
	interferencedepth_or_interferencedepthStore2.load();
	
	// 槽深数据（侧铣深度）
	var interferencedepth_or_interferencedepthCombo2 = new Ext.form.ComboBox({
		fieldLabel : '',
		hiddenName : 'interferencedepth',
		id : 'interferencedepth_or_interferencedepthid2',
		emptyText : '请选择...',
		triggerAction : 'all',
		store : interferencedepth_or_interferencedepthStore2,
		displayField : 'value',
		valueField : 'value',
		selectOnFocus : true,
		loadingText : '正在加载数据...',
		mode : 'local',
		forceSelection : true,
		hidden : true,
		// pageSize : cln,
		// minListWidth : 270,
		// plugins : [new QM.plugin.PinyinFilter],
		resizable : true,
		editable : true,
		width : document.body.clientWidth / numlign - divnum,
		hidden : true,
		listeners : {
			focus : function() {
				// celengthStore.load();
				setTimeout(
						'Ext.getCmp("interferencedepth_or_interferencedepthid2").expand();',
						1);
			},
			expand:function(){lixiDisplayWin.show()},
			collapse:function(){lixiDisplayWin.hide()},
				
			select : function(c, re, index) {
				// interferencedepth_or_celengthCombo.setValue(c.getValue());

				refreshMilling_toolholder_clamp();
			},
			specialkey : function(c, e) {
				if (e.getKey() == e.ESC) {
					if (parent.grf == true) {
						c.reset();
						// interferencedepth_or_celengthCombo.reset();
						// interferencedepth_or_celengthCombo.setValue('');
					}
					refreshMilling_toolholder_clampForce();

				}if (e.getKey() == e.ENTER) {
						c.setValue(Ext.get('interferencedepth_or_interferencedepthid2').dom.value) ;
							refreshMilling_toolholder_clampForce();
						}
			}
		}
	});
	// 槽深数据（最大径向切深）
	var interferencedepth_or_aemaxStore2 = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
					url : 'groovemilling.do?code=queryAemaxInMilling_toolholder_clamp'
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
	interferencedepth_or_aemaxStore2.load();

	// 槽深数据（最大径向切深）
	var interferencedepth_or_aemaxCombo2 = new Ext.form.ComboBox({
		fieldLabel : '',
		hiddenName : 'aemax',
		id : 'interferencedepth_or_aemaxid2',
		emptyText : '请选择...',
		triggerAction : 'all',
		store : interferencedepth_or_aemaxStore2,
		displayField : 'value',
		valueField : 'value',
		selectOnFocus : true,
		loadingText : '正在加载数据...',
		mode : 'local',
		forceSelection : true,
		hidden : true,
		// pageSize : cln,
		// minListWidth : 270,
		// plugins : [new QM.plugin.PinyinFilter],
		resizable : true,
		editable : true,
		width : document.body.clientWidth / numlign - divnum,
		hidden : true,
		listeners : {
			focus : function() {
				// celengthStore.load();
				setTimeout(
						'Ext.getCmp("interferencedepth_or_aemaxid2").expand();',
						1);
			},
			expand:function(){sanmianrenxiDisplayWin.show()},
			collapse:function(){sanmianrenxiDisplayWin.hide()},
				
			select : function(c, re, index) {
				// interferencedepth_or_celengthCombo.setValue(c.getValue());

				refreshMilling_toolholder_clamp();
			},
			specialkey : function(c, e) {
				if (e.getKey() == e.ESC) {
					if (parent.grf == true) {
						c.reset();
						// interferencedepth_or_celengthCombo.reset();
						// interferencedepth_or_celengthCombo.setValue('');
					}
					refreshMilling_toolholder_clampForce();

				}if (e.getKey() == e.ENTER) {
						c.setValue(Ext.get('interferencedepth_or_aemaxid2').dom.value) ;
							refreshMilling_toolholder_clampForce();
						}
			}
		}
	});
	// 刃口宽度（最大轴向切深）
	var cutedge_or_apmaxStore2 = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
					url : 'groovemilling.do?code=queryApmaxInMilling_toolholder_clamp'
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
	cutedge_or_apmaxStore2.load();
	
	
	//提示框
	var renkouDisplayWin = new Ext.Window(
			{
				//title : '选择助手',
				id:'renkouDisplayWinid',
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
					//	plain : true,
				
			               
			     items: [ {
						id: 'boxid19',
						xtype : 'box',
						autoEl : {
							tag : 'img',
							style : 'width:100%;height:100%;' ,
							src : 'dec/combo/alter/new/caoxi_jijia_sanmianrenxi_renkoukuandu.png'
						}
					} 
			            
			        ],
			       
				
				listeners : {
					'afterRender':function() {
						setTimeout('close', 1000)}
					
					}
					
				});
	// 刃口宽度（最大轴向切深）
	var cutedge_or_apmaxCombo2 = new Ext.form.ComboBox({
				fieldLabel : '',
				hiddenName : 'apmax',
				id : 'cutedge_or_apmaxid2',
				emptyText : '请选择...',
				triggerAction : 'all',
				store : cutedge_or_apmaxStore2,
				displayField : 'value',
				valueField : 'value',
				selectOnFocus : true,
				loadingText : '正在加载数据...',
				mode : 'local',
				forceSelection : true,
				hidden : true,
				// pageSize : cln,
				// minListWidth : 270,
				// plugins : [new QM.plugin.PinyinFilter],
				resizable : true,
				editable : true,
				width : document.body.clientWidth / numlign - divnum,
				hidden : true,
				listeners : {
					focus : function() {
						// celengthStore.load();
						setTimeout(
								'Ext.getCmp("cutedge_or_apmaxid2").expand();',
								1);
					},
					expand:function(){renkouDisplayWin.show() 	},
					collapse:function(){renkouDisplayWin.hide()  },
					
					select : function(c, re, index) {
						// interferencedepth_or_celengthCombo.setValue(c.getValue());

						refreshMilling_toolholder_clamp();
					},
					specialkey : function(c, e) {
						if (e.getKey() == e.ESC) {
							if (parent.grf == true) {
								c.reset();
								// interferencedepth_or_celengthCombo.reset();
								// interferencedepth_or_celengthCombo.setValue('');
							}
							refreshMilling_toolholder_clampForce();

						}if (e.getKey() == e.ENTER) {
						c.setValue(Ext.get('cutedge_or_apmaxid2').dom.value) ;
							refreshMilling_toolholder_clampForce();
						}
					}
				}
			});

	/*// 铣削方式下拉框
	var cuttypeCombo = new Ext.form.ComboBox({
		fieldLabel : '铣削方式',
		hiddenName : 'cuttype',
		id : 'cuttypeidid',
		emptyText : '请选择...',
		triggerAction : 'all',
		store : CUTTYPEStore,
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
		// plugins : [new QM.plugin.PinyinFilter],
		resizable : true,
		width : document.body.clientWidth / numlign - divnum,
		
		 * listWidth : turningtypeArr[0] * turningtypepp + 5, tpl : '<tpl
		 * for="."><div x-combo-list-item class="x-combo-list-item"><img
		 * src="' + webContext + '/dec/combo/toolholder/turningtype/' +
		 * '{value}' + '.png" width=' + turningtypeArr[0] * turningtypepp + '
		 * height=' + turningtypeArr[1] * turningtypepp + '></div></tpl>',
		 
		listeners : {
			focus : function() {
				setTimeout('Ext.getCmp("cuttypeidid").expand();', 1);
			},
			
			 * expand : function(c) { //铣削方式过滤; c.getStore().filter([{ property :
			 * 'value', value : '1', anyMatch : false, caseSensitive : false }, {
			 * fn : function(record) { return record.get('value').substring(0,
			 * 1) == '1'; } }]); },
			 
			select : function(c, r, index) {
				// cuttypeCombo2.suspendEvent(true);
				if (index == 0) { //
					Ext.getCmp('nominaldiameterlableid').show();
					nominaldiameterCombo.show();
					Ext.getCmp('s_nominaldiameterlableid').show();

					Ext.getCmp('interferencedepth_or_celengthlableid').show();
					interferencedepth_or_celengthCombo.show();
					Ext.getCmp('s_interferencedepth_or_celengthlableid').show();

					Ext.getCmp('cutedge_or_celengthlableid').hide();
					cutedge_or_celengthCombo.reset();
					cutedge_or_celengthCombo.hide();
					Ext.getCmp('s_cutedge_or_celengthlableid').hide();

					Ext.getCmp('interferencedepth_or_aemaxlableid').hide();
					interferencedepth_or_aemaxCombo.reset();
					interferencedepth_or_aemaxCombo.hide();
					Ext.getCmp('s_interferencedepth_or_aemaxlableid').hide();
				} else if (index == 1) {
					Ext.getCmp('cutedge_or_celengthlableid').show();
					cutedge_or_celengthCombo.show();
					Ext.getCmp('s_cutedge_or_celengthlableid').show();

					Ext.getCmp('interferencedepth_or_aemaxlableid').show();
					interferencedepth_or_aemaxCombo.show();
					Ext.getCmp('s_interferencedepth_or_aemaxlableid').show();

					Ext.getCmp('nominaldiameterlableid').hide();
					nominaldiameterCombo.reset();
					nominaldiameterCombo.hide();
					Ext.getCmp('s_nominaldiameterlableid').hide();

					Ext.getCmp('interferencedepth_or_celengthlableid').hide();
					interferencedepth_or_celengthCombo.reset();
					interferencedepth_or_celengthCombo.hide();
					Ext.getCmp('s_interferencedepth_or_celengthlableid').hide();
				} else {
					Ext.getCmp('cutedge_or_celengthlableid').hide();
					cutedge_or_celengthCombo.reset();
					cutedge_or_celengthCombo.hide();
					Ext.getCmp('s_cutedge_or_celengthlableid').hide();

					Ext.getCmp('interferencedepth_or_aemaxlableid').hide();
					interferencedepth_or_aemaxCombo.reset();
					interferencedepth_or_aemaxCombo.hide();
					Ext.getCmp('s_interferencedepth_or_aemaxlableid').hide();

					Ext.getCmp('nominaldiameterlableid').hide();
					nominaldiameterCombo.reset();
					nominaldiameterCombo.hide();
					Ext.getCmp('s_nominaldiameterlableid').hide();

					Ext.getCmp('interferencedepth_or_celengthlableid').hide();
					interferencedepth_or_celengthCombo.reset();
					interferencedepth_or_celengthCombo.hide();
					Ext.getCmp('s_interferencedepth_or_celengthlableid').hide();
				}

				// cuttypeCombo2.setValue(c.getValue());
				// cuttypeCombo2.fireEvent('select',
				// cuttypeCombo2, r, index);

				// refreshMilling_toolholder_integral();
			},
			specialkey : function(c, e) {
				if (e.getKey() == e.ESC) {
					c.reset();
					Ext.getCmp('cutedge_or_celengthlableid').hide();
					cutedge_or_celengthCombo.reset();
					cutedge_or_celengthCombo.hide();
					Ext.getCmp('s_cutedge_or_celengthlableid').hide();

					Ext.getCmp('interferencedepth_or_aemaxlableid').hide();
					interferencedepth_or_aemaxCombo.reset();
					interferencedepth_or_aemaxCombo.hide();
					Ext.getCmp('s_interferencedepth_or_aemaxlableid').hide();

					Ext.getCmp('nominaldiameterlableid').hide();
					nominaldiameterCombo.reset();
					nominaldiameterCombo.hide();
					Ext.getCmp('s_nominaldiameterlableid').hide();

					Ext.getCmp('interferencedepth_or_celengthlableid').hide();
					interferencedepth_or_celengthCombo.reset();
					interferencedepth_or_celengthCombo.hide();
					Ext.getCmp('s_interferencedepth_or_celengthlableid').hide();

					// refreshMilling_toolholder_integral();
				}
			}
		}
	});*/
	/*WHERE if(name = #a#,INSTR(name,"三面"),!INSTR(name,"三面"))*/ 
	
	
	var cuttypeDisplayWin = new Ext.Window(
			{
				//title : '选择助手',
				x:((document.body.clientWidth)/numlign-divnum)*2+130,
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
						id: 'boxid9',
						xtype : 'box',
						autoEl : {
							tag : 'img',
							style : 'width:100%;height:100%;' ,
							src : 'dec/combo/alter/caoxi-cuttype.png'
						}
					} 
			            
			        ],
			       
				
				listeners : {
					
					}
					
				});
	
	
	
	// 铣削方式下拉框
	var cuttypeCombo2 = new Ext.form.ComboBox({
		fieldLabel : '铣削方式',
		hiddenName : 'cuttype',
		id : 'cuttypeidid2',
		emptyText : '请选择...',
		triggerAction : 'all',
		store : CUTTYPEStore,
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
		// plugins : [new QM.plugin.PinyinFilter],
		resizable : true,
		width : document.body.clientWidth / numlign - divnum,
		
		listWidth :110,
		tpl : '<tpl for="."><div x-combo-list-item class="x-combo-list-item"><img src="'
			+ webContext
			+ '/dec/combo/blade/groovemilling/'
			+ '{value}'
			+ '.png" width='
			+ 100
			+ ' height='
			+90 + '></div></tpl>',
		
		
		/*
		 * listWidth : turningtypeArr[0] * turningtypepp + 5, tpl : '<tpl
		 * for="."><div x-combo-list-item class="x-combo-list-item"><img
		 * src="' + webContext + '/dec/combo/toolholder/turningtype/' +
		 * '{value}' + '.png" width=' + turningtypeArr[0] * turningtypepp + '
		 * height=' + turningtypeArr[1] * turningtypepp + '></div></tpl>',
		 */
		listeners : {
			focus : function() {
				setTimeout('Ext.getCmp("cuttypeidid2").expand();', 1);
			},/*
				 * expand : function(c) { //铣削方式过滤; c.getStore().filter([{
				 * property : 'value', value : '1', anyMatch : false,
				 * caseSensitive : false }, { fn : function(record) { return
				 * record.get('value').substring(0, 1) == '1'; } }]); },
				 */
		/*	collapse:function(){cuttypeDisplayWin.hide()  ;},
			expand:function(){cuttypeDisplayWin.show() 	;},*/
			
			select : function(c, r, index) {
				// cuttypeCombo.suspendEvent(true);
				milling_toolholder_clampStoreLoad();	
				nameStore2.load({
					params	: {
						cuttype		: cuttypeCombo2.getValue()
					}
				});
				if (index == 0) { //
					combobox2index = 0;
					Ext.getCmp('nominaldiameterlableid2').show();
					//nominaldiameterCombo2.show();
					Ext.getCmp('s_nominaldiameterlableid2').show();

					Ext
							.getCmp('interferencedepth_or_interferencedepthlableid2')
							.show();
					interferencedepth_or_interferencedepthCombo2.show();
					Ext
							.getCmp('s_interferencedepth_or_interferencedepthlableid2')
							.show();

					Ext.getCmp('cutedge_or_apmaxlableid2').hide();
					cutedge_or_apmaxCombo2.reset();
					cutedge_or_apmaxCombo2.hide();
					Ext.getCmp('s_cutedge_or_apmaxlableid2').hide();

					Ext.getCmp('interferencedepth_or_aemaxlableid2').hide();
					interferencedepth_or_aemaxCombo2.reset();
					interferencedepth_or_aemaxCombo2.hide();
					Ext.getCmp('s_interferencedepth_or_aemaxlableid2').hide();
				} else if (index == 1) {
					combobox2index = 1;
					Ext.getCmp('nominaldiameterlableid2').show();
					//nominaldiameterCombo2.show();
					Ext.getCmp('s_nominaldiameterlableid2').show();

					
					Ext.getCmp('cutedge_or_apmaxlableid2').show();
					cutedge_or_apmaxCombo2.show();
					Ext.getCmp('s_cutedge_or_apmaxlableid2').show();

					Ext.getCmp('interferencedepth_or_aemaxlableid2').show();
					interferencedepth_or_aemaxCombo2.show();
					Ext.getCmp('s_interferencedepth_or_aemaxlableid2').show();


					Ext
							.getCmp('interferencedepth_or_interferencedepthlableid2')
							.hide();
					interferencedepth_or_interferencedepthCombo2.reset();
					interferencedepth_or_interferencedepthCombo2.hide();
					Ext
							.getCmp('s_interferencedepth_or_interferencedepthlableid2')
							.hide();
				} else {
					combobox2index = 2;
					Ext.getCmp('cutedge_or_apmaxlableid2').hide();
					cutedge_or_apmaxCombo2.reset();
					cutedge_or_apmaxCombo2.hide();
					Ext.getCmp('s_cutedge_or_apmaxlableid2').hide();

					Ext.getCmp('interferencedepth_or_aemaxlableid2').hide();
					interferencedepth_or_aemaxCombo2.reset();
					interferencedepth_or_aemaxCombo2.hide();
					Ext.getCmp('s_interferencedepth_or_aemaxlableid2').hide();

					/*Ext.getCmp('nominaldiameterlableid2').hide();
					nominaldiameterCombo2.reset();
					nominaldiameterCombo2.hide();
					Ext.getCmp('s_nominaldiameterlableid2').hide();
*/
					Ext
							.getCmp('interferencedepth_or_interferencedepthlableid2')
							.hide();
					interferencedepth_or_interferencedepthCombo2.reset();
					interferencedepth_or_interferencedepthCombo2.hide();
					Ext
							.getCmp('s_interferencedepth_or_interferencedepthlableid2')
							.hide();
				}
				// cuttypeCombo.setValue(c.getValue());
				// cuttypeCombo.fireEvent('select',
				// cuttypeCombo, r, index);

				// refreshMilling_toolholder_clamp();
				// toolholderCm.getColumnHeader().getById('bore')
				/* refreshmilling_toolholder_integral(); */
			},
			specialkey : function(c, e) {
				c.reset();
				if (e.getKey() == e.ESC) {
					c.reset();
					// cuttypeCombo.reset();
					// cuttypeCombo.setValue('');

					// cuttypeCombo.fireEvent('specialkey',
					// cuttypeCombo, e);
					Ext.getCmp('cutedge_or_apmaxlableid2').hide();
					cutedge_or_apmaxCombo2.reset();
					cutedge_or_apmaxCombo2.hide();
					Ext.getCmp('s_cutedge_or_apmaxlableid2').hide();

					Ext.getCmp('interferencedepth_or_aemaxlableid2').hide();
					interferencedepth_or_aemaxCombo2.reset();
					interferencedepth_or_aemaxCombo2.hide();
					Ext.getCmp('s_interferencedepth_or_aemaxlableid2').hide();
/*
					Ext.getCmp('nominaldiameterlableid2').hide();
					nominaldiameterCombo2.reset();
					nominaldiameterCombo2.hide();
					Ext.getCmp('s_nominaldiameterlableid2').hide();*/

					Ext
							.getCmp('interferencedepth_or_interferencedepthlableid2')
							.hide();
					interferencedepth_or_interferencedepthCombo2.reset();
					interferencedepth_or_interferencedepthCombo2.hide();
					Ext
							.getCmp('s_interferencedepth_or_interferencedepthlableid2')
							.hide();

					// refreshMilling_toolholder_clampForce();
				}
			}
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
	 * '/dec/combo/refreshMilling_toolholder_clamp/shape/' + '{value}' + '.png"
	 * width=' + shapeArr[0] shapepp + ' height=' + shapeArr[1] * shapepp + '></div></tpl>',
	 * listeners : { focus : function() { //shapeStore.load();
	 * setTimeout('Ext.getCmp("shapeidid").expand();', 1); }, select :
	 * function() { shapeCombo2.setValue(shapeCombo.getValue());
	 * 
	 * refreshMilling_toolholder_clamp(); }, specialkey : function(c, e) { if
	 * (e.getKey() == e.ENTER) { if (parent.grf == true) { c.reset(); }
	 * refreshMilling_toolholder_clampForce(); } } } });
	 */

	// 机夹刀片下拉框
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

	// 刀尖圆弧半径数据
	var noseradiusStore3 = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : 'groovemilling.do?code=queryNoseradiusInMilling_blade_clamp'
						// queryNoseradiusInMilling_blade_clamp是在GroovemillingAction中的方法queryNoseradiusInMilling_blade_clamp;
				}),
				reader : new Ext.data.JsonReader({
							totalProperty : 'TOTALCOUNT',
							root : 'ROOT'
						}, [/*
							 * { name : 'text' },
							 */{
									name : 'value'
								}])
			});
	noseradiusStore3.load();

	// 刀尖圆弧半径下拉框
	var noseradiusCombo3 = new Ext.form.ComboBox({
				fieldLabel : '刀尖圆弧半径',
				hiddenName : 'noseradius',
				id : 'noseradiusid3',
				emptyText : '请选择...',
				triggerAction : 'all',
				store : noseradiusStore3,
				displayField : 'value',
				valueField : 'value',
				selectOnFocus : true,
				loadingText : '正在加载数据...',
				mode : 'local',
				forceSelection : true,
				// pageSize : cln,
				// minListWidth : 270,
				//plugins : [new QM.plugin.PinyinFilter],
				resizable : true,
				width : document.body.clientWidth / numlign - divnum,
				// listWidth : noseradiusArr[0] * noseradiuspp + 25,
				/*
				 * tpl : '<tpl for="."><div x-combo-list-item
				 * class="x-combo-list-item"><img src="' + webContext +
				 * '/dec/combo/milling_toolholder_integral/noseradius/' +
				 * '{value}' + '.png" width=' + noseradiusArr[0] noseradiuspp + '
				 * height=' + noseradiusArr[1] * noseradiuspp + '></div></tpl>',
				 */
				listeners : {
					focus : function() {
						// noseradiusStore.load();
						setTimeout('Ext.getCmp("noseradiusid3").expand();', 1);
					},
					select : function(c, re, index) {
						noseradiusCombo.setValue(c.getValue());
						refreshMilling_blade_clamp();
						refreshMilling_toolholder_clamp();
					},
					specialkey : function(c, e) {
						if (e.getKey() == e.ESC) {
							if (parent.grf == true) {
								c.reset();
								c.setValue('');
								noseradiusCombo.reset();
								noseradiusCombo.setValue(null);
								/*
								 * nominaldiameterCombo2.reset();
								 * nominaldiameterCombo2.setValue('');
								 */
							}
							refreshMilling_blade_clampForce();
							refreshMilling_toolholder_clampForce();
						}if (e.getKey() == e.ENTER) {
						c.setValue(Ext.get('noseradiusid3').dom.value) ;
								refreshMilling_blade_clampForce();
							refreshMilling_toolholder_clampForce();
						}
					}
				}
			});
	// 整体刀体表格工具栏
	var tbar = new Ext.Toolbar({// workpiecematerialCombo
		// //workpieceisotypeCombo
		items : [new Ext.Toolbar.TextItem({
							text : '工件材料:',
							autoHeight : true
						}), workpieceisotypeCombo, '-',
				 new Ext.Toolbar.TextItem({
							text : '公称直径:',
							autoHeight : true
						}), nominaldiameterCombo, '-',
				 new Ext.Toolbar.TextItem({
							text : '槽深:',
							autoHeight : true
						}), interferencedepth_or_celengthCombo,'-',
				new Ext.Toolbar.TextItem({
							text : '刀具名称:',
							autoHeight : true
						}), nameCombo, '-',
				new Ext.Toolbar.TextItem({
							text : '刀尖圆弧半径:',
							autoHeight : true
						}), noseradiusCombo, '-', '-', {
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
				stateId : 'grid-groovemilling',
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

	// 机夹刀体表格工具栏
	var tbar2 = new Ext.Toolbar({// workpiecematerialCombo 	// //workpieceisotypeCombo
		items : [
				new Ext.Toolbar.TextItem({
							text : '工件材料:',
							autoHeight : true
						}),
				workpieceisotypeCombo3,
				'-',
				new Ext.Toolbar.TextItem({
							text : '铣削方式:',
							autoHeight : true
						}),
				cuttypeCombo2,
				'-',
				new Ext.Toolbar.TextItem({
							text : '公称直径:',
							id : 'nominaldiameterlableid2',
						//	hidden : true,
							autoHeight : true
						}),
				nominaldiameterCombo2,
				new Ext.Toolbar.Separator({
							id : 's_nominaldiameterlableid2'
							//hidden : true
						}),
				new Ext.Toolbar.TextItem({
							text : '槽深:',
							id : 'interferencedepth_or_interferencedepthlableid2',
							hidden : true,
							autoHeight : true
						}),
				interferencedepth_or_interferencedepthCombo2,
				new Ext.Toolbar.Separator({
							id : 's_interferencedepth_or_interferencedepthlableid2',
							hidden : true
						}), new Ext.Toolbar.TextItem({
							text : '刃口宽度:',
							id : 'cutedge_or_apmaxlableid2',
							hidden : true,
							autoHeight : true
						}), cutedge_or_apmaxCombo2, new Ext.Toolbar.Separator({
							id : 's_cutedge_or_apmaxlableid2',
							hidden : true
						}), new Ext.Toolbar.TextItem({
							text : '槽深:',
							id : 'interferencedepth_or_aemaxlableid2',
							hidden : true,
							autoHeight : true
						}), interferencedepth_or_aemaxCombo2,
				new Ext.Toolbar.Separator({
							id : 's_interferencedepth_or_aemaxlableid2',
							hidden : true
						}),'-', 
				new Ext.Toolbar.TextItem({
							text : '刀具名称:',
							autoHeight : true
						}), nameCombo2, '-',
				new Ext.Toolbar.TextItem({
							text : '刀尖圆弧半径:',
							autoHeight : true
						}), noseradiusCombo3,'-', '-', {
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
					type : 'string'
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
				stateId : 'grid-groovemilling2',
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
				bbar : bbar2,// 请注意,在第三个grid中使用的是第二个的bbar2!
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
				stateId : 'grid-groovemilling3',
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
								copyCell2();
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
				layout : {
					type : 'vbox',
					align : 'center'
				},
				items : [grid2, grid3 /*
										 * { rowHeight : .7, // baseCls :
										 * 'x-plain', // bodyStyle :
										 * 'padding:5px 0 5px 5px', items :
										 * [grid2] }, { rowHeight : .3, items :
										 * [grid3] }
										 */],
				listeners : {
					resize : function(p, aw, ah, ow, oh) {
						if (!grid_init) {
							if (ah < oh) { // 隐藏了header
								grid2.setHeight(grid2.height - 80 * grid_ratio);
								grid3.setHeight(grid3.height - 80
										* (1 - grid_ratio));
							} else {
								grid2.setHeight(grid2.height + 80 * grid_ratio);
								grid3.setHeight(grid3.height + 80
										* (1 - grid_ratio));
							}
						}
						grid_init = false;
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
				items : [ grid2and3,grid /* , grid3 */],
				listeners : {
					tabchange : function(tabpanel, tab) {
						/*
						 * if (tab.getId() == 'gridid') {//激活了刀体grid;
						 * refreshMilling_toolholder_integralForce(); } else
						 * if(tab.getId() == 'grid2id') {
						 * refreshMilling_toolholder_clampForce(); }
						 */
						if (tabpanel.getActiveTab().getId() == 'gridid') {// 激活了刀体grid;
							// refreshMilling_toolholder_integralForce();
							// milling_toolholder_integralStore.reload();
							milling_toolholder_integralStoreLoad();
						} else if (tabpanel.getActiveTab().getId() == 'gridid2_3') {
							// milling_toolholder_clampStore.reload();
							// refreshMilling_toolholder_clampForce();
							milling_toolholder_clampStoreLoad();
							// } else if
							// (tabpanel.getActiveTab().getId() ==
							// 'grid3id') {
							// milling_blade_clampStore.reload();
							// refreshMilling_blade_clampForce();
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
		nameStore2.load();
		nominaldiameterStore2.load();
		/*cuttypeCombo.setValue('');*/
		workpieceisotypeCombo.setValue('');
		nominaldiameterCombo.setValue('');
		interferencedepth_or_celengthCombo.setValue('');
		interferencedepth_or_aemaxCombo.setValue('');
		cutedge_or_celengthCombo.setValue('');
		noseradiusCombo.setValue('');
		// depthCombo.setValue();
		// noseradiusCombo.setValue();
		// workpieceisotypeCombo2.setValue();
		// noseradiusCombo2.setValue();
		cuttypeCombo2.setValue();
		nominaldiameterCombo2.setValue();
		interferencedepth_or_interferencedepthCombo2.setValue('');
		interferencedepth_or_aemaxCombo2.setValue('');
		cutedge_or_apmaxCombo2.setValue('');

		// depthCombo2.setValue();
		workpieceisotypeCombo3.setValue('');
		noseradiusCombo3.setValue('');
		nameCombo.setValue('');
		nameCombo2.setValue('');

		
		

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
		// workpieceisotypeCombo2.reset();
		// noseradiusCombo2.reset();
		cuttypeCombo2.setValue();
		nominaldiameterCombo2.setValue();
		interferencedepth_or_interferencedepthCombo2.setValue('');
		interferencedepth_or_aemaxCombo2.setValue('');
		cutedge_or_apmaxCombo2.setValue('');
		// depthCombo2.reset();
		/*cuttypeCombo.setValue('');*/
		workpieceisotypeCombo.setValue('');
		nominaldiameterCombo.setValue('');
		interferencedepth_or_celengthCombo.setValue('');
		interferencedepth_or_aemaxCombo.setValue('');
		cutedge_or_celengthCombo.setValue('');
		noseradiusCombo.setValue('');

		noseradiusCombo3.setValue('');
		workpieceisotypeCombo3.setValue('');
		nameCombo.setValue('');
		nameCombo2.setValue('');
        
		


		pagesize_combo2.reset();
		bbar2.pageSize=50;
		milling_toolholder_clampStoreLoad();
		milling_blade_clampStoreLoad();
		var currentpage=1;
		var currentpage=bbar2.store.currentPage;
		bbar2.moveFirst();
		
	}

	/*
	 * // 更新 function resetCombo3() { noseradiusCombo3.setValue();
	 * workpieceisotypeCombo3.setValue(); // workpieceisotypeCombo2.reset(); //
	 * noseradiusCombo2.reset(); cuttypeCombo2.setValue();
	 * nominaldiameterCombo2.setValue();
	 * interferencedepth_or_interferencedepthCombo2.setValue('');
	 * interferencedepth_or_aemaxCombo2.setValue('');
	 * cutedge_or_apmaxCombo2.setValue(''); // depthCombo2.reset();
	 * cuttypeCombo.setValue(''); workpieceisotypeCombo.setValue('');
	 * nominaldiameterCombo.setValue('');
	 * interferencedepth_or_celengthCombo.setValue('');
	 * interferencedepth_or_aemaxCombo.setValue('');
	 * cutedge_or_celengthCombo.setValue(''); noseradiusCombo.setValue('');
	 * 
	 * milling_blade_clampStoreLoad(); }
	 */

	// TODO
	// 数据动态加载
	function dataLoadDynamic(pictureTabs, parameterGrid, parameterStore,
			milling_blade_clampStorePanel,sapPanel3,sapStore3) {
		var record = grid2.getSelectionModel().getSelected(); // 刀体
		var record2 = grid3.getSelectionModel().getSelected(); // 刀片

		if (pictureTabs.getActiveTab().getItemId() == 'milling_blade_clampPanelid') {
			milling_blade_clampStorePanel.load({
						params : {
							featurecode : record2.data.featurecode
						}
					});// TODO
		} /*else if (pictureTabs.getActiveTab().getItemId() == 'picturePanel3id') {
			var newsrc =checkImagePath(record.data.figure);
			Ext.getCmp('boxid5').getEl().dom.src = newsrc;
			}
		else if (pictureTabs.getActiveTab().getItemId() == 'sizePanel3id') {
		
			var newsrc =checkImagePath(record.data.figure2);
			Ext.getCmp('boxid6').getEl().dom.src = newsrc;

			}*/else if (pictureTabs.getActiveTab().getItemId() == 'parameterid') {
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
		}else if (pictureTabs.getActiveTab().getItemId() == 'sapPanel3id') {
			sapStore3.load({
				params : {
					sapcode : record2.data.sapcode
				}
			});}
	}

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
						/*'toolholderid' : '刀体编号',*/
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
				        id:'boxid',
						xtype : 'box',
						autoEl : {
							tag : 'img',
							style : 'width:80%;height:80%;position:relative;top:10%;left:10%',
							src :  path
						}
					}]
				// view : new Ext.grid.GroupingView(),
				// plugins : [filtersMilling_toolholder_clamp],
				// stateful : true,
				// stateId : 'grid-groovemilling-milling_toolholder_clamp'
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
				        id:'boxid2',
						xtype : 'box',
						autoEl : {
							tag : 'img',
							style : 'width:80%;height:80%;position:relative;top:10%;left:10%',
							src :  path2
						}
					}]
				// view : new Ext.grid.GroupingView(),
				// plugins : [filtersMilling_toolholder_clamp],
				// stateful : true,
				// stateId : 'grid-groovemilling-milling_toolholder_clamp'
			});

		var milling_toolholder_integralStorePanel = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
				url : 'groovemilling.do?code=queryMilling_toolholder_integral4Manage'
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
							},  {
								header : '刀体名称',
								dataIndex : 'name',
								width : 140,
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

		// Store数据存储
		var parameterStore = new Ext.data.GroupingStore({
					proxy : new Ext.data.HttpProxy({
						url : 'groovemilling.do?code=queryIntegralParameter'
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
										name : 'f'
									},{
										name : 'ap'
									}, {
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
		},{
			header : 'Fz<br />(mm/Z)',
			dataIndex : 'fz',
			width : 80,
			align : 'center',
			// renderer : THICKNESS2Render,
			// hidden : true,
			sortable : true
		}, {
			header : 'F<br />(mm/min)',
			dataIndex : 'f',
			width : 80,
			align : 'center',
			// hidden : true,
			sortable : true
		},  {
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
		}, {
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
			width : 80,
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
		}]);
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
				width : 130,
				// hidden : true,
				sortable : true
			}, {
				header : '库存地点',
				dataIndex : 'storagelocation',
				width : 80,
				sortable : true
			} , {
				header : 'SAP编码',
				dataIndex : 'sapcode',
				width : 150,
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
			items : [picturePanel, sizePanel, sapPanel,parameterGrid],
			listeners : {
				tabchange : function(pictureTabs) {
					dataLoadDynamic1(pictureTabs, parameterGrid, parameterStore,sapPanel,sapStore);
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
								propertygrid
										.setSource({'SAP编码':	record.data.sapcode,
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
								Ext.getCmp('previousbtn')
										.disable();
							} else {
								record = grid.getStore().getAt(
										index);
								propertygrid
										.setSource({'SAP编码':	record.data.sapcode,
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


							dataLoadDynamic1(pictureTabs, parameterGrid,
									parameterStore,sapPanel,sapStore/*,
									milling_blade_clampStorePanel*/);
						}
					}, {
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
								propertygrid
										.setSource({'SAP编码':	record.data.sapcode,
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
								record = grid.getStore().getAt(
										index);
								propertygrid
										.setSource({'SAP编码':	record.data.sapcode,
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
								Ext.getCmp('previousbtn')
										.enable();
							}
							dataLoadDynamic1(pictureTabs, parameterGrid,
									parameterStore,sapPanel,sapStore/*,
									milling_blade_clampStorePanel*/);
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
						var workpiecematerialid = workpieceisotypeCombo
								.getValue();
						if (workpiecematerialid != "") {
							Ext.getCmp('parameterid').enable();
						} else {
							Ext.getCmp('parameterid').disable();
						}
					}}
			
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
					/*	'toolholderid' : '刀体ID',*/
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
		 * 'grid-groovemilling-milling_toolholder_clamp' } );
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
			items : [{   
				        id:'boxid3',
						xtype : 'box',
						autoEl : {
							tag : 'img',
							style : 'width:80%;height:80%;position:relative;top:10%;left:10%',
							src :  path
						}
					}]
				// view : new Ext.grid.GroupingView(),
				// plugins : [filtersMilling_toolholder_clamp],
				// stateful : true,
				// stateId : 'grid-groovemilling-milling_toolholder_clamp'
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
			items : [{
				         id:'boxid4',
				        xtype : 'box',
						autoEl : {
							tag : 'img',
							style : 'width:80%;height:80%;position:relative;top:10%;left:10%',
							src :  path2
						}
					}]
				// view : new Ext.grid.GroupingView(),
				// plugins : [filtersMilling_toolholder_clamp],
				// stateful : true,
				// stateId : 'grid-groovemilling-milling_toolholder_clamp'
			});

		var milling_toolholder_clampStorePanel = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
				url : 'groovemilling.do?code=queryMilling_blade_clamp4Manage'
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
					// disabled : true,milling_toolholder_clampPanelid
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
			id : 'sapPanel2id',
			// disabled : true,
			frame : true,
			region : 'center',
			store : sapStore2,
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
				width : 130,
				// hidden : true,
				sortable : true
			}, {
				header : '库存地点',
				dataIndex : 'storagelocation',
				width : 80,
				sortable : true
			} , {
				header : 'SAP编码',
				dataIndex : 'sapcode',
				width : 150,
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
			items : [propertygrid2]
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
					items : [picturePanel2,
							sizePanel2 /* ,cuttingparameter2, */,
							milling_toolholder_clampPanel,sapPanel2],
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
							}else if (pictureTabs2.getActiveTab().getItemId() == 'picturePanel2id') {
								var newsrc =checkImagePath(record.data.figure);
								Ext.getCmp('boxid3').getEl().dom.src = newsrc;
								}
							else if (pictureTabs2.getActiveTab().getItemId() == 'sizePanel2id') {
							
								var newsrc =checkImagePath(record.data.figure2);
								Ext.getCmp('boxid4').getEl().dom.src = newsrc;

								}else if (tab.getId() ==  'sapPanel2id') {
								sapStore2.load({
									params : {
										sapcode : record.data.sapcode
									}
								});}
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
					}		if (pictureTabs2.getActiveTab().getItemId() == 'milling_toolholder_clampPanelid') {
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
					}else if (pictureTabs2.getActiveTab().getItemId() == 'picturePanel2id') {
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
						});}
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
					}else if (pictureTabs2.getActiveTab().getItemId() == 'picturePanel2id') {
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
						});}
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
						'bladeid' : '刀片编号',
						'sapcode' : 'SAP编码',
						'name' : '刀片名称',
						'bladetype' : '刀片型号',
						'brandid' : '刀片品牌',
						'figure' : '简图',
						'figure2' : '实物图',
						'bladematerialid' : '刀片材质ID',
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
		 * 'grid-groovemilling-milling_toolholder_clamp' } );
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
			items : [{   id:'boxid5',
						xtype : 'box',
						autoEl : {
							tag : 'img',
							style : 'width:80%;height:80%;position:relative;top:10%;left:10%',
							src :  path2
						}
					}]
				// view : new Ext.grid.GroupingView(),
				// plugins : [filtersMilling_toolholder_clamp],
				// stateful : true,
				// stateId : 'grid-groovemilling-milling_toolholder_clamp'
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
			items : [{
				          id:'boxid6',
						xtype : 'box',
						autoEl : {
							tag : 'img',
							style : 'width:80%;height:80%;position:relative;top:10%;left:10%',
							src :  path
						}
					}]
				// view : new Ext.grid.GroupingView(),
				// plugins : [filtersMilling_toolholder_clamp],
				// stateful : true,
				// stateId : 'grid-groovemilling-milling_toolholder_clamp'
			});

	

		var milling_blade_clampStorePanel = new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
						url : 'groovemilling.do?code=queryMilling_toolholder_clamp4Manage'
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
								width : 140,
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
						url : 'groovemilling.do?code=queryParameter'
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
										name : 'k1'
									}, {
										name : 'k2'
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
										name : 'aemax'
									}, {
										name : 'apmax'
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
		}, {
			header : 'Fz<br />(mm/Z)',
			dataIndex : 'fz',
			width : 80,
			align : 'center',
			// renderer : THICKNESS2Render,
			// hidden : true,
			sortable : true
		}, {
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
			// hidden : true,
			sortable : true
		}, {
			header : 'Ap max<br />(mm)',
			dataIndex : 'apmax',
			width : 80,
			align : 'center',
			// renderer : THICKNESS2Render,
			hidden : true,
			sortable : true
		}, {
			header : 'Ae<br />(mm)',
			dataIndex : 'ae',
			width : 80,
			align : 'center',
			// hidden : true,
			sortable : true
		} ,{
			header : 'Ae max<br />(mm)',
			dataIndex : 'aemax',
			width : 80,
			align : 'center',
			hidden : true,
			sortable : true
		},    {	header : 'Pc<br />(kW)',
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
		}]);

		// TODO
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
		
		var sapStore3= new Ext.data.Store({
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
		var sapPanel3= new Ext.grid.GridPanel({
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
				width : 130,
				// hidden : true,
				sortable : true
			}, {
				header : '库存地点',
				dataIndex : 'storagelocation',
				width : 80,
				sortable : true
			} , {
				header : 'SAP编码',
				dataIndex : 'sapcode',
				width : 150,
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
							milling_blade_clampPanel,sapPanel3, parameterGrid],
					listeners : {
						tabchange : function(pictureTabs3) {
							dataLoadDynamic(pictureTabs3, parameterGrid,
									parameterStore,
									milling_blade_clampStorePanel,sapPanel3,sapStore3);
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
								propertygrid3.setSource({'刀片编号':	record.data.bladeid,
									'SAP编码':	record.data.sapcode,
									'刀片名称':	record.data.name,
									'刀片型号':	record.data.bladetype,
									'刀片品牌':	record.data.brandid,
									'刀片材质ID':	record.data.bladematerialid,
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
								propertygrid3.setSource({'刀片编号':	record.data.bladeid,
									'SAP编码':	record.data.sapcode,
									'刀片名称':	record.data.name,
									'刀片型号':	record.data.bladetype,
									'刀片品牌':	record.data.brandid,
									'刀片材质ID':	record.data.bladematerialid,
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
							}// TODO
							 if (pictureTabs3.getActiveTab().getItemId() == 'picturePanel3id') {
									var newsrc =checkImagePath(record.data.figure2);
									Ext.getCmp('boxid5').getEl().dom.src = newsrc;
									}
								else if (pictureTabs3.getActiveTab().getItemId() == 'sizePanel3id') {
								
									var newsrc =checkImagePath(record.data.figure);
									Ext.getCmp('boxid6').getEl().dom.src = newsrc;

									}
							dataLoadDynamic(pictureTabs3, parameterGrid,
									parameterStore,
									milling_blade_clampStorePanel,sapPanel3,sapStore3);
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
								propertygrid3.setSource({'刀片编号':	record.data.bladeid,
									'SAP编码':	record.data.sapcode,
									'刀片名称':	record.data.name,
									'刀片型号':	record.data.bladetype,
									'刀片品牌':	record.data.brandid,
									'刀片材质ID':	record.data.bladematerialid,
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
								propertygrid3.setSource({'刀片编号':	record.data.bladeid,
									'SAP编码':	record.data.sapcode,
									'刀片名称':	record.data.name,
									'刀片型号':	record.data.bladetype,
									'刀片品牌':	record.data.brandid,
									'刀片材质ID':	record.data.bladematerialid,
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
							// TODO
							 if (pictureTabs3.getActiveTab().getItemId() == 'picturePanel3id') {
									var newsrc =checkImagePath(record.data.figure2);
									Ext.getCmp('boxid5').getEl().dom.src = newsrc;
									}
								else if (pictureTabs3.getActiveTab().getItemId() == 'sizePanel3id') {
								
									var newsrc =checkImagePath(record.data.figure);
									Ext.getCmp('boxid6').getEl().dom.src = newsrc;

									}
							dataLoadDynamic(pictureTabs3, parameterGrid,
									parameterStore,
									milling_blade_clampStorePanel,sapPanel3,sapStore3);
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
							propertygrid3.setSource({'刀片编号':	record.data.bladeid,
								'SAP编码':	record.data.sapcode,
								'刀片名称':	record.data.name,
								'刀片型号':	record.data.bladetype,
								'刀片品牌':	record.data.brandid,
								'刀片材质ID':	record.data.bladematerialid,
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
						var workpiecematerialid = workpieceisotypeCombo
								.getValue();
						if (workpiecematerialid != "") {
							Ext.getCmp('parameterid').enable();
						} else {
							Ext.getCmp('parameterid').disable();
						}
					}}
				
				});

		propertyDisplayWin3.show();
	}
	// 整体刀具页面数据加载函数
	function milling_toolholder_integralStoreLoad() {
		milling_toolholder_integralStore.load({
			params : {
				start : bbar.pageSize
						* (grid.getBottomToolbar().getPageData().activePage - 1),
				limit : bbar.pageSize,
				workpieceisotype : workpieceisotypeCombo.getValue(),
				nominaldiameter : nominaldiameterCombo.getValue(),
				interferencedepth_or_celength : interferencedepth_or_celengthCombo
						.getValue(),
				interferencedepth_or_aemax : interferencedepth_or_aemaxCombo
						.getValue(),
				cutedge_or_celength : cutedge_or_celengthCombo.getValue(),
				noseradius : noseradiusCombo.getValue(),
				name : nameCombo.getValue()
				// mainangle : mainangleCombo.getValue()

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
				interferencedepth : interferencedepth_or_interferencedepthCombo2
						.getValue(),
				interferencedepth_or_aemax : interferencedepth_or_aemaxCombo2
						.getValue(),
				cutedge_or_apmax : cutedge_or_apmaxCombo2.getValue(),
                workpieceisotype : workpieceisotypeCombo3.getValue(),
                noseradius : noseradiusCombo3.getValue(),
                name : nameCombo2.getValue(),
                cuttype : cuttypeCombo2.getValue()
			}
		});
	}

	// 机夹刀片页面数据加载函数
	function milling_blade_clampStoreLoad(rec) {// 请注意函数有rec参数
		var jsarrstr = null;
		if (Ext.isDefined(rec)) {
			var jsarrstr = jsArray2JsString(rec, 'featurecode');
		}

		if (parent.gdlf/* || !Ext.isEmpty(jsarrstr)
				|| !Ext.isEmpty(workpieceisotypeCombo3.getValue())*/) {
			milling_blade_clampStore.load({
						params : {
							// start : bbar3.pageSize *
							// (grid3.getBottomToolbar().getPageData().activePage
							// - 1),
							// limit : bbar3.pageSize,
							// start : bbar2.pageSize *
							// (grid3.getBottomToolbar().getPageData().activePage
							// - 1),
							// limit : bbar2.pageSize,
							// 请注意由于grid3中使用的是bbar2,所以以上两个地方要更改为bbar2;
							workpieceisotype : workpieceisotypeCombo3
									.getValue(),
							noseradius : noseradiusCombo3.getValue(),
							featurecode : jsarrstr
						}
					});
		}
	}
	autoLoadButton.setActiveItem(0);
	//导出任务计划数据                                
	function printTask3() {
		showWaitMsg('正在准备报表数据,请稍等...');
		
		if(grid.getSelectionModel().getCount()==1){
			var record = grid.getSelectionModel().getSelected()
		}else if(grid.getSelectionModel().getCount()>=2){	
			errorMsg("请只选择一把刀片")
		}else{
			errorMsg("请选择刀片")};
		
		
		Ext.Ajax.request({
			
			url : 'groovemilling.do?code=printTask3',
			   
			
			params : {
				 workpieceisotype : workpieceisotypeCombo.getValue(),
				 nominaldiameter : nominaldiameterCombo.getValue(),
				 interferencedepth_or_celength : interferencedepth_or_celengthCombo.getValue(),
				 name : nameCombo.getValue(),
				 noseradius : noseradiusCombo.getValue(),
				 k1 : record.data.k1,
				 sapcode : record.data.sapcode,
				 workpiecematerialid : workpieceisotypeCombo.getValue()
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
	function printTask() {
		showWaitMsg('正在准备报表数据,请稍等...');
		
		if(grid2.getSelectionModel().getCount()==1){
			var record = grid2.getSelectionModel().getSelected()
		}else if(grid2.getSelectionModel().getCount()>=2){	
			errorMsg("请只选择一把刀片")
		}else{
			errorMsg("请选择刀片")};
		
		
		Ext.Ajax.request({
			
			url : 'groovemilling.do?code=printTask',
			   
			
			params : {
				 workpieceisotype : workpieceisotypeCombo3.getValue(),
				 cuttype : cuttypeCombo2.getValue(),
				 nominaldiameter : nominaldiameterCombo2.getValue(),
				 interferencedepth_or_interferencedepth : interferencedepth_or_interferencedepthCombo2.getValue(),
				 cutedge_or_apmax : cutedge_or_apmaxCombo2.getValue(),
				 interferencedepth_or_aemax : interferencedepth_or_aemaxCombo2.getValue(),
				 name : nameCombo2.getValue(),
				 noseradius : noseradiusCombo3.getValue(),
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
		
		if(grid3.getSelectionModel().getCount()==1&&grid2.getSelectionModel().getCount()==1){
			var record = grid3.getSelectionModel().getSelected()
		}else if(grid3.getSelectionModel().getCount()>=2){	
			errorMsg("请只选择一把刀片")
		}else if(grid2.getSelectionModel().getCount()==0){	
			errorMsg("请选择刀体")
		}else{
			errorMsg("请选择刀片")};
			var record2 = grid2.getSelectionModel().getSelected();
		Ext.Ajax.request({
			
			url : 'groovemilling.do?code=printTask2',
			  
			
			
			params : {
				 workpieceisotype : workpieceisotypeCombo3.getValue(),
				 cuttype : cuttypeCombo2.getValue(),
				 nominaldiameter : nominaldiameterCombo2.getValue(),
				 interferencedepth_or_interferencedepth : interferencedepth_or_interferencedepthCombo2.getValue(),
				 cutedge_or_apmax : cutedge_or_apmaxCombo2.getValue(),
				 interferencedepth_or_aemax : interferencedepth_or_aemaxCombo2.getValue(),
				 name : nameCombo2.getValue(),
				 noseradius : noseradiusCombo3.getValue(),
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
	
});


