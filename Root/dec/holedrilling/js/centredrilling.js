/**
 * 中心钻
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

	// 中心钻 tapping Tapping
	// 材料牌号 workpiecematerial Workpiecematerial
	// 螺纹标准 threadstandard Threadstandard THREADSTANDARD
	// 螺纹规格 nominaldiameter Nominaldiameter
	// 深度 depth Depth
	// 螺孔类型 screwtype Screwtype

	// 复选框
	var sm = new Ext.grid.CheckboxSelectionModel();

	// 行号
	var rownum = new Ext.grid.RowNumberer({
				header : '序',
				width : 26
			});

	var hd_toolholder_centredrillingStore = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : 'centredrilling.do?code=queryHd_holedrilling4Manage'
				// queryHd_toolholder_tapping4Manage是在TappingAction中的方法queryHd_toolholder_tapping4Manage;
			}),
		reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [{
							name : 'toolholderid'
						}, {
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
							name : 'description'
						}, {
							name : 'remark'
						}, {
							name : 'k1'
						}, {
							name : 'standard'
						}, {
							name : 'nominaldiameter'
						}, {
							name : 'materialid'
						}, {
							name : 'pointangle'
						}, {
							name : 'length'
						},{
							name : 'figure'
						}, {
							name : 'figure2'
						},  {
							name : 'portsize'
						}])
			/*
			 * , listeners : { }
			 */
		});
	hd_toolholder_centredrillingStore.load();



	// 列模型（中心钻）
	var centredrillingCm = new Ext.grid.ColumnModel([rownum, sm, /*{
				header : '编号',
				dataIndex : 'toolholderid',
				width : 120,
				sortable : true
			}, */{
				header : 'SAP编号',
				dataIndex : 'sapcode',
				width : 120,
				sortable : true,
				isCellEditable:true
			}, {
				header : '名称',
				dataIndex : 'name',
				width : 60,
				sortable : true,
				isCellEditable:true
			}, {
				header : '型号',
				dataIndex : 'type',
				width : 160,
				sortable : true,
				isCellEditable:true
			}, {
				header : '简图',
				dataIndex : 'figure',
				width : 60,
				hidden : true,
				sortable : true
			}, {
				header : '实物图',
				dataIndex : 'figure2',
				width : 60,
				sortable : true,
				hidden : true
			}, {
				header : '品牌',
				dataIndex : 'brandid',
				width : 60,
				sortable : true,
				isCellEditable:true
			}, {
				header : '切削类型',
				dataIndex : 'cuttype',
				width : 60,
				sortable : true,
				isCellEditable:true
			},/* {
				header : '系数K1',
				dataIndex : 'k1',
				width : 60,
				sortable : true
			},*/ {
				header : '标准',
				dataIndex : 'standard',
				width : 60,
				sortable : true,
				isCellEditable:true
			}, {
				header : '公称直径',
				dataIndex : 'nominaldiameter',
				width : 60,
				sortable : true,
				isCellEditable:true
			}, {
				header : '材质',
				dataIndex : 'materialid',
				width : 60,
				sortable : true,
				isCellEditable:true
			}, {
				header : '锋角',
				dataIndex : 'pointangle',
				width : 60,
				sortable : true,
				isCellEditable:true
			}, {
				header : '总长',
				dataIndex : 'length',
				width : 60,
				sortable : true,
				isCellEditable:true
			}, {
				header : '接口尺寸',
				dataIndex : 'portsize',
				width : 60,
				sortable : true,
				isCellEditable:true
			},
			{
				header : '特点',
				dataIndex : 'description',
				width : 60,
				sortable : true,
				isCellEditable:true
			}, {
				header : '备注信息',
				dataIndex : 'remark',
				width : 60,
				sortable : true
			}]);

	// Store数据存储
	var centredrillingStore = new Ext.data.GroupingStore({
				proxy : new Ext.data.HttpProxy({
							// url :
							// 'tapping.do?code=queryHd_holedrilling4Manage'//
							// queryHd_toolholder_tapping4Manage
							url : 'centredrilling.do?code=queryHd_holedrilling4Manage'
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
									name : 'type'
								},  {
									name : 'brandid'
								}, {
									name : 'cuttype'
								}, {
									name : 'description'
								}, {
									name : 'remark'
								}, {
									name : ''
								}, {
									name : 'standard'
								}, {
									name : 'nominaldiameter'
								}, {
									name : 'materialid'
								}, {
									name : 'pointangle'
								}, {
									name : 'length'
								}, {
									name : 'figure'
								}, {
									name : 'figure2'
								},{
									name : 'portsize'
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
				centredrillingStoreLoad();
			});

	// 实时过滤开关
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

	function centredrillingStoreLoad() {
		centredrillingStore.load({
			params : {
				start : bbar.pageSize
						* (grid.getBottomToolbar().getPageData().activePage - 1),
				limit : bbar.pageSize,
				workpieceisotype : workpieceisotypeCombo.getValue(),
				standard : standardCombo.getValue(),
				nominaldiameter : nominaldiameterCombo.getValue()
			}
		});
	}
	function standardStoreLoad() {
		standardStore.load({
			params : {
				
				nominaldiameter : nominaldiameterCombo.getValue()
				
			}
		});
	}

	function nominaldiameterStoreLoad() {
		nominaldiameterStore.load({
			params : {
				
				standard : standardCombo.getValue()
				
			}
		});
	}

	// 查询结果按钮
	var calcButton = new Ext.Button({
				text : '查询结果',
				iconCls : 'tableIcon',
				hidden : true,
				listeners : {
					click : function(btn, e) {
						centredrillingStoreLoad();
					}
				}
			});

	// 分页工具栏
	var bbar = new Ext.PagingToolbar({
				pageSize : number,
				store : centredrillingStore,
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
						}, '-', {
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

	// 工件材料状态数据
	var workpieceisotypeStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : 'centredrilling.do?code=queryWorkpiecematerial'
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
						refreshCentredrilling();
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

	// 螺纹规格数据
	var standardStore = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : 'centredrilling.do?code=queryStandardInHd_toolholder_centredrilling'
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
	standardStore.load();

	// 标准下拉框
	var standardCombo = new Ext.form.ComboBox({
				fieldLabel : '标准',
				hiddenName : 'standardid',
				id : 'standardidid',
				emptyText : '请选择...',
				triggerAction : 'all',
				store : standardStore,
				displayField : 'value',
				valueField : 'value',
				selectOnFocus : true,
				loadingText : '正在加载数据...',
				mode : 'local',
				forceSelection : true,
				editable : false,
				// pageSize : cln,
				minListWidth : 180,
				// plugins : [ new QM.plugin.PinyinFilter ],
				resizable : true,
				width : document.body.clientWidth / numlign - divnum,
				listeners : {
					select : function() {
						refreshCentredrilling();
						nominaldiameterStoreLoad();
					},
					/*
					 * focus : function() { if (parent.rhwf) { hp =
					 * helpWin('test'); }
					 * setTimeout('Ext.getCmp("threadstandardidid").expand();',
					 * 10); }, blur : function() { if (Ext.isDefined(hp) &&
					 * hp.isVisible()) { hp.close(); } },
					 */
					specialkey : function(c, e) {
						if (e.getKey() == e.ESC) {
							c.reset();
							refreshCentredrilling();
						}
					}
				}
			});

	// 公称直径数据
	var nominaldiameterStore = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : 'centredrilling.do?code=queryNominaldiameterInHd_toolholder_centredrilling'
		}),
		reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [{
							name : 'value',
							
							type : 'numeric'
						} ,{
							name : 'standard'
						}])
	});
	nominaldiameterStore.load();

	//提示框
	var gongchengzhijinDisplayWin = new Ext.Window(
			{
				//title : '选择助手',
				id:'gongchengzhijinDisplayWinid',
				x:((document.body.clientWidth)/numlign-divnum)*3+185,
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
							src : 'dec/combo/alter/new/zhongxinzuan_gongchengzhijin.png'
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
				// plugins : [ new QM.plugin.PinyinFilter ],
				resizable : true,
				width : document.body.clientWidth / numlign - divnum,
				listeners : {
					select : function() {
						standardStoreLoad();
						refreshCentredrilling();
						
					},
					expand:function(){gongchengzhijinDisplayWin.show()},
					collapse:function(){gongchengzhijinDisplayWin.hide()},
					/*
					 * focus : function() { if (parent.rhwf) { hp =
					 * helpWin('test'); }
					 * setTimeout('Ext.getCmp("nominaldiameterid").expand();',
					 * 10); }, blur : function() { if (Ext.isDefined(hp) &&
					 * hp.isVisible()) { hp.close(); } },
					 */
					specialkey : function(c, e) {
						if (e.getKey() == e.ESC) {
							c.reset();
							refreshCentredrilling();
						}
						if (e.getKey() == e.ENTER) {
							c.setValue(Ext.get('nominaldiameterid').dom.value);
							refreshCentredrilling();
						}
					}
				}
			});

	// 表格工具栏
	var tbar = new Ext.Toolbar({
				items : [new Ext.Toolbar.TextItem({
									text : '工件材料:',
									autoHeight : true
								}), workpieceisotypeCombo, '-',
						new Ext.Toolbar.TextItem({
									text : '标准:',
									autoHeight : true
								}), standardCombo, '-',
						new Ext.Toolbar.TextItem({
									text : '公称直径:',
									autoHeight : true
								}), nominaldiameterCombo,'-', '-', {
									text : '打印预览',
									iconCls : 'previewIcon',
									handler : function() {
										printTask3();
									}
								}, '->', {
							text : '重置',
							iconCls : 'tbar_synchronizeIcon',
							handler : function() {
								resetCombo();
							}
						}]
			});

	var grid = new Ext.grid.GridPanel({
				title : '<span class="commoncss">中心钻</span>',
				header : false,
				height : 500,
				id : 'gridid',
				autoScroll : true,
				frame : true,
				region : 'center',
				store : centredrillingStore,
				cm : centredrillingCm,
				stripeRows : true,
				sm : sm,
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
				// plugins : [filtersBlade]
				stateful : sf,
				// stateId : 'grid-gt-blade',
				listeners : {
					afterrender : function() {
						if (parent.grf == true) {
							calcButton.hide();
						} else {
							calcButton.show();
						}
					}
				}

			});

	// 页面过滤//TODO

	// 表格单击事件
	grid.on('rowclick', function(pGrid, rowIndex, event) {
				// Ext.getCmp('modifyid').enable();
				// Ext.getCmp('deleteid').enable();
			});
	// 表格双击事件
	grid.on('rowdblclick', function(grid, rowIndex, event) {
				propertyDisplay();// TODO
			});

	// 是否默认选中第一行数据
	bbar.on("change", function() {
				// grid.getSelectionModel().selectFirstRow();
			});

	// 页面初始自动查询数据
	centredrillingStore.load({
				params : {
					start : 0,
					limit : bbar.pageSize
				}
			});

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
								centredrillingStoreLoad();
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

	// 查看中心钻详细信息;
	function propertyDisplay() {
		var record = grid.getSelectionModel().getSelected();
		var index = grid.getStore().indexOf(record);

		// var
		// properitystore=Ext.grid.PropertyStore(properitygrid,hd_toolholder_tappingStore);

		var path = checkImagePath(record.data.figure);
		var path2 = checkImagePath(record.data.figure2);

		var propertygrid = new Ext.grid.PropertyGrid({
					title : '中心钻刀具详情',
					border : true,
					autoSort : false,
					frame : true,
					id : 'propertyGridid',
					enableColLock : true,
				    enableColumnMove : false,
					autoExpandColumn : true,
					loadMask : true,
					stripeRows : true,
					autoScroll : true,
					clicksToEdit : 1,
					source:{
						 'SAP编号':'sapcode' ,
	                     '名称':	'name' ,
	                     '型号':	'type' ,
	                     '品牌':	'brandid' ,
	                     '切削类型':	'cuttype' ,
	                     '标准':	'standard' ,
	                     '公称直径':	'nominaldiameter' ,
	                     '材质':	'materialid' ,
	                     '锋角':	'pointangle' ,
	                     '总长':	'length' ,
	                     '接口尺寸':	'portsize' ,
	                     '特点':	'description' ,
	                     '备注信息':	'remark' 
	                     //'系数K1'	 :    'k1'
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
						url : 'centredrilling.do?code=queryCParameter'
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
			items : [{  id: 'boxid',
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
			items : [{  id:'boxid2',
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
			items : [picturePanel, sizePanel, sapPanel, cuttingparameter],
			listeners : {
				tabchange : function(tabpanel, tab) {
					if (tab.getId() == 'ctparameterid') {
						parameterStore.load({
									params : {
										workpiecematerialid : workpieceisotypeCombo
												.getValue(),
										k1 : record.data.k1,
										nominaldiameter : record.data.nominaldiameter

									}
								});
					}else if (pictureTabs.getActiveTab().getItemId() == 'picturePanelid') {
						var newsrc =checkImagePath(record.data.figure);
						Ext.getCmp('boxid').getEl().dom.src = newsrc;
						}
					else if (pictureTabs.getActiveTab().getItemId() == 'sizePanelid') {
					
						var newsrc =checkImagePath(record.data.figure2);
						Ext.getCmp('boxid2').getEl().dom.src = newsrc;

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
			title : '中心钻详细信息',
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
						propertygrid.setSource({
							'SAP编号':record.data.sapcode ,
		                     '名称':	record.data.name ,
		                     '型号':	record.data.type ,
		                     '品牌':	 record.data.brandid,
		                     '切削类型':	record.data.cuttype ,
		                     '标准':	record.data.standard ,
		                     '公称直径':	 record.data.nominaldiameter,
		                     '材质':	 record.data.materialid,
		                     '锋角':	 record.data.pointangle,
		                     '总长':	 record.data.length,
		                     '接口尺寸':	 record.data.portsize,
		                     '特点':	 record.data.description,
		                     '备注信息':	 record.data.remark
		                    // '系数K1'	 :    record.data.k1
					});
						Ext.getCmp('previousbtn').disable();
					} else {
						record = grid.getStore().getAt(index);
						propertygrid.setSource({
							'SAP编号':record.data.sapcode ,
		                     '名称':	record.data.name ,
		                     '型号':	record.data.type ,
		                     '品牌':	 record.data.brandid,
		                     '切削类型':	record.data.cuttype ,
		                     '标准':	record.data.standard ,
		                     '公称直径':	 record.data.nominaldiameter,
		                     '材质':	 record.data.materialid,
		                     '锋角':	 record.data.pointangle,
		                     '总长':	 record.data.length,
		                     '接口尺寸':	 record.data.portsize,
		                     '特点':	 record.data.description,
		                     '备注信息':	 record.data.remark
		                    // '系数K1'	 :    record.data.k1
					});
						Ext.getCmp('nextbtn').enable();
					}

					if (pictureTabs.getActiveTab().getItemId() == 'ctparameterid') {
						parameterStore.load({
									params : {
										workpiecematerialid : workpieceisotypeCombo
												.getValue(),
										k1 : record.data.k1,
										nominaldiameter : record.data.nominaldiameter

									}
								});
					}else if (pictureTabs.getActiveTab().getItemId() == 'picturePanelid') {
						var newsrc =checkImagePath(record.data.figure);
						Ext.getCmp('boxid').getEl().dom.src = newsrc;
						}
					else if (pictureTabs.getActiveTab().getItemId() == 'sizePanelid') {
					
						var newsrc =checkImagePath(record.data.figure2);
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
					grid.getSelectionModel().selectRow(index + 1);
					grid.getView().focusRow(index + 1);
					index = index + 1;
					if (index >= grid.getStore().getCount() - 1) {
						infoMsg('已经到最后一条了.');
						// grid.getSelectionModel().selectRow(index
						// - 1);
						// grid.getView().focusRow(index
						// - 1);
						index = grid.getStore().getCount() - 1;
						record = grid.getStore().getAt(index);
						propertygrid.setSource({
							'SAP编号':record.data.sapcode ,
		                     '名称':	record.data.name ,
		                     '型号':	record.data.type ,
		                     '品牌':	 record.data.brandid,
		                     '切削类型':	record.data.cuttype ,
		                     '标准':	record.data.standard ,
		                     '公称直径':	 record.data.nominaldiameter,
		                     '材质':	 record.data.materialid,
		                     '锋角':	 record.data.pointangle,
		                     '总长':	 record.data.length,
		                     '接口尺寸':	 record.data.portsize,
		                     '特点':	 record.data.description,
		                     '备注信息':	 record.data.remark
		                   //  '系数K1'	 :    record.data.k1
					});
						Ext.getCmp('nextbtn').disable();
					} else {
						record = grid.getStore().getAt(index);
						propertygrid.setSource({
							'SAP编号':record.data.sapcode ,
		                     '名称':	record.data.name ,
		                     '型号':	record.data.type ,
		                     '品牌':	 record.data.brandid,
		                     '切削类型':	record.data.cuttype ,
		                     '标准':	record.data.standard ,
		                     '公称直径':	 record.data.nominaldiameter,
		                     '材质':	 record.data.materialid,
		                     '锋角':	 record.data.pointangle,
		                     '总长':	 record.data.length,
		                     '接口尺寸':	 record.data.portsize,
		                     '特点':	 record.data.description,
		                     '备注信息':	 record.data.remark
		                   //  '系数K1'	 :    record.data.k1
					});
						Ext.getCmp('previousbtn').enable();
					}
					if (pictureTabs.getActiveTab().getItemId() == 'ctparameterid') {
						parameterStore.load({
									params : {
										workpiecematerialid : workpieceisotypeCombo
												.getValue(),
										k1 : record.data.k1,
										nominaldiameter : record.data.nominaldiameter

									}
								});
					}else if (pictureTabs.getActiveTab().getItemId() == 'picturePanelid') {
						var newsrc =checkImagePath(record.data.figure);
						Ext.getCmp('boxid').getEl().dom.src = newsrc;
						}
					else if (pictureTabs.getActiveTab().getItemId() == 'sizePanelid') {
					
						var newsrc =checkImagePath(record.data.figure2);
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
					/*propertygridStore.load({
						params : {
								toolholderid : record.data.toolholderid

						}
					});*/
					propertygrid.setSource({
							'SAP编号':record.data.sapcode ,
		                     '名称':	record.data.name ,
		                     '型号':	record.data.type ,
		                     '品牌':	 record.data.brandid,
		                     '切削类型':	record.data.cuttype ,
		                     '标准':	record.data.standard ,
		                     '公称直径':	 record.data.nominaldiameter,
		                     '材质':	 record.data.materialid,
		                     '锋角':	 record.data.pointangle,
		                     '总长':	 record.data.length,
		                     '接口尺寸':	 record.data.portsize,
		                     '特点':	 record.data.description,
		                     '备注信息':	 record.data.remark
		                    // '系数K1'	 :    record.data.k1
					});
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
				// e.preventDefault();
			});

	// 布局模型
	var viewport = new Ext.Viewport({
				layout : 'border',
				items : [grid]
			});
	// 刷新刀具
	function refreshCentredrilling() {
		if (parent.grf == true) {
			refreshCentredrillingForce();
		}
	}

	// 强制刷新刀具
	function refreshCentredrillingForce() {
		centredrillingStoreLoad();
	}

	// 更新
	function resetCombo() {
		workpieceisotypeCombo.reset();
		standardCombo.reset();
		nominaldiameterCombo.reset();
		
		standardStoreLoad();
		pagesize_combo.reset();
		bbar.pageSize=50;
		centredrillingStoreLoad();
		nominaldiameterStoreLoad();
		
		var currentpage=1;
		var currentpage=bbar.store.currentPage;
		bbar.moveFirst();
		
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
			
			url : 'centredrilling.do?code=printTask3',
			   
			
			params : {
				 workpieceisotype : workpieceisotypeCombo.getValue(),
				 standard : standardCombo.getValue(),
				 nominaldiameter : nominaldiameterCombo.getValue(),
			     sapcode : record.data.sapcode,
			     workpiecematerialid : workpieceisotypeCombo.getValue(),
			     k1 : record.data.k1,
			     nominaldiameter : record.data.nominaldiameter
			     
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
