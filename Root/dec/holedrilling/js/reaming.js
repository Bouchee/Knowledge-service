/**
 * 铰孔
 * 
 * @author fuxianwu
 * @since 2013-01-01
 */
// 工件材料状态//Workpiecematerial//workpiecematerial
// 直径//Nominaldiameter//nominaldiameter
// 深度//Depth//depth
// 铰孔精度//Accuracy//accuracy
// 刀具类型//Tooltype//tooltype
Ext
		.onReady(function() {
			var divnum = 25;// 调整toolbar中的下拉框的大小与位置;
			var numlign = 11;

			var pp = 0.8; // 将下拉框图片缩放为80%;

			// var grid_ratio = 0.65; // 上下两个grid的高度比例
			var grid_init = true;
			// 复选框
			var sm = new Ext.grid.CheckboxSelectionModel();

			// 行号
			var rownum = new Ext.grid.RowNumberer({
				header : '序',
				width : 26
			});

			// 列模型（铰孔）
			var hd_holedrillingCm = new Ext.grid.ColumnModel([ rownum, sm, {
				header : '刀体编号', // 列标题
				dataIndex : 'toolholderid', // 数据索引,和Store数据存储模型对应
				width : 60, // 列宽度
				sortable : true, // 该列是否要排序
				hidden : true
			// 该列是否隐藏
			},  {
				header : 'SAP编号',
				dataIndex : 'sapcode',
				width : 80,
				hidden : false,
				sortable : true
			}, {
				header : '名称',
				dataIndex : 'name',
				width : 80,
				hidden : false,
				sortable : true
			}, {
				header : '型号',
				dataIndex : 'type',
				width : 80,
				hidden : false,
				sortable : true
			}, {
				header : '品牌',
				dataIndex : 'brandid',
				width : 80,
				hidden : false,
				sortable : true
			}, {
				header : '切削类型',
				dataIndex : 'cuttype',
				width : 80,
				hidden : false,
				sortable : true
			}, {
				header : '刀体特征码',
				dataIndex : 'featurecode',
				width : 80,
				hidden : true,
				sortable : true
			}, {
				header : '公称直径',
				dataIndex : 'nominaldiameter',
				width : 80,
				hidden : false,
				sortable : true
			}, {
				header : '材质',
				dataIndex : 'materialid',
				width : 80,
				hidden : false,
				sortable : true
			}, /*{
				header : '锋角',
				dataIndex : 'pointangle',
				width : 80,
				hidden : false,
				sortable : true
			}, */{
				header : '齿数',
				dataIndex : 'toothnumber',
				width : 80,
				hidden : false,
				sortable : true
			}, {
				header : '接口尺寸',
				dataIndex : 'portsize',
				width : 80,
				hidden : false,
				sortable : true
			}, {
				header : '冷却类型',
				dataIndex : 'coolingtype',
				width : 80,
				hidden : false,
				sortable : true
			} ,{
				header : '总长',
				dataIndex : 'length',
				width : 80,
				hidden : false,
				sortable : true
			}, {
				header : '钻孔深度',
				dataIndex : 'depth',
				width : 80,
				hidden : false,
				sortable : true
			}, {
				header : '沟槽长度',
				dataIndex : 'groovelength',
				width : 80,
				hidden : false,
				sortable : true
			}]);

			// Store数据存储(铰刀主表)
			var hd_holedrillingStore = new Ext.data.GroupingStore({
				proxy : new Ext.data.HttpProxy({
					url : 'reaming.do?code=queryHd_holedrilling4Manage'
				// queryHd_holedrilling4Manage是在ReamingAction中的方法queryHd_holedrilling4Manage;
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [ {
					name : 'toolholderid'
				}, {
					name : 'sapcode'
				}, {
					name : 'name'
				}, {
					name : 'type'
				},  {
					name : 'brandid'
				}, {
					name : 'cuttype'
				}, /*{
					name : 'typeid'
				}, */{
					name : 'hdtooltype'
				}, {
					name : 'description'
				}, {
					name : 'remark'
				}, {
					name : 'k1'
				},/* {
					name : 'hdtriid'
				},*/ {
					name : 'accuracy'
				}, {
					name : 'materialid'
				}, {
					name : 'toothnumber'
				}, {
					name : 'groovedirection'
				}, {
					name : 'length'
				}, {
					name : 'depth'
				}, {
					name : 'groovelength'
				}, {
					name : 'portsize'
				}, {
					name : 'coolingtype'
				}, {
					name : 'nominaldiameter'
				}, /*{
					name : 'hdtrcid'
				}, */{
					name : 'figure'
				}, {
					name : 'figure2'
				} ]),
				listeners : {

				}
			});

			// 实时过滤按钮
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
			// TODO
			/*
			 * //刀片自动加载按钮 var autoLoadButton = new Ext.CycleButton({ showText :
			 * true, prependText : '刀片自动加载: ', items : [{ text : '开', iconCls :
			 * 'lightonIcon', checked : parent.gdlf }, { text : '关', iconCls :
			 * 'lightoffIcon', checked : !parent.gdlf }], changeHandler :
			 * function(btn, item) { if (btn.getActiveItem().itemIndex == '0') { //
			 * calcButton.hide(); parent.gdlf = true;
			 * milling_blade_clampStoreLoad(); } else { // calcButton.show();
			 * parent.gdlf = false; } } });
			 */

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

			// 铰孔刀体页面数据加载函数
			function hd_holedrillingStoreLoad() {
				hd_holedrillingStore
						.load({
							params : {
								start : bbar.pageSize
										* (grid.getBottomToolbar()
												.getPageData().activePage - 1),
								limit : bbar.pageSize,
								workpieceisotype : workpieceisotypeCombo
										.getValue(),
								nominaldiameter : nominaldiameterCombo
										.getValue(),
								depth : depthCombo.getValue(),
								accuracy : accuracyCombo.getValue(),
								tooltype : tooltypeCombo.getValue()
							}
						});
			}
			;

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
				hd_holedrillingStoreLoad();
			});

			// 分页工具栏
			var bbar = new Ext.PagingToolbar({
				pageSize : number,
				store : hd_holedrillingStore,
				displayInfo : true,
				displayMsg : '显示第 {0} 条到第 {1} 条,共 {2} 条',
				plugins : new Ext.ux.ProgressBarPager(),
				emptyMsg : '对不起,没有符合条件的记录!',
				items : [ '-', '&nbsp;&nbsp;', pagesize_combo, {
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

			// 工件材料状态数据
			var workpieceisotypeStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : 'generalturning.do?code=queryWorkpiecematerial'
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [ {
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
				} ]),
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

			var workpieceisotypeCm = new Ext.grid.ColumnModel([ rownum_iso, {
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
			} ]);

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
								} ],/*
									 * view : new Ext.ux.grid.BufferView({
									 * rowHeight : 50, scrollDelay : true }),
									 */
						listeners : {
							rowdblclick : function(g, rowIndex, event) {
								selectMenu.hide();
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

				// refreshMilling_toolholder_integral();
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
					}
				}
			});

			// 工件材料状态下拉框
			var workpieceisotypeCombo = new Ext.form.ComboBox({
				fieldLabel : '材料牌号',
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

			// 直径数据
			var nominaldiameterStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : 'reaming.do?code=queryNominaldiameterInReaming'
				// queryMachinetool4Manage是在MachinetoolAction中的方法queryMachinetool4Manage;
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [ {
					name : 'value'
				} /*
					 * , { name : 'value' }
					 */])
			});
			nominaldiameterStore.load();

			//提示框
			var gongchengzhijinDisplayWin = new Ext.Window(
					{
						//title : '选择助手',
						id:'gongchengzhijinDisplayWinid',
						x:((document.body.clientWidth)/numlign-divnum)*2+205,
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
									src : 'dec/combo/alter/new/jiaokong_gongchengzhijin.png'
								}
							} 
					            
					        ],
					       
						
						listeners : {
							'afterRender':function() {
								setTimeout('close', 1000)}
							
							}
							
						});
			
			// 直径下拉框
			var nominaldiameterCombo = new Ext.form.ComboBox({
				fieldLabel : '直径',
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
				 minListWidth : 150,
				// plugins : [new QM.plugin.PinyinFilter],
				resizable : true,
				width : document.body.clientWidth / numlign - divnum,
				listeners : {
					focus : function() {
						// nominaldiameterStore.load();
						setTimeout('Ext.getCmp("nominaldiameterid").expand();',
								1);
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
						}if (e.getKey() == e.ENTER) {
						c.setValue(Ext.get('nominaldiameterid').dom.value) ;
							refreshHd_holedrillingForce();
						}
					}
				}
			});

			// 深度
			var depthStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : 'reaming.do?code=queryDepthInReaming'
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [ {
					name : 'value'
				} /*
					 * , { name : 'text' }
					 */])
			});
			depthStore.load();

			//提示框
			var jiaokongshenduDisplayWin = new Ext.Window(
					{
						//title : '选择助手',
						id:'jiaokongshenduDisplayWinid',
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
									src : 'dec/combo/alter/new/jiaokong_jiaokongshendu.png'
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
				fieldLabel : '',
				hiddenName : 'depth',
				id : 'depthid',
				emptyText : '请选择...',
				triggerAction : 'all',
				store : depthStore,
				displayField : 'value',
				valueField : 'value',
				selectOnFocus : false,
				loadingText : '正在加载数据...',
				mode : 'local',
				forceSelection : false,
				// pageSize : cln,
				// minListWidth : 270,
				// plugins : [new QM.plugin.PinyinFilter],
				resizable : true,
				editable : true,
				width : document.body.clientWidth / numlign - divnum,
				listeners : {
					focus : function() {
						// depthStore.load();
						setTimeout('Ext.getCmp("depthid").expand();', 1);
					},
					expand:function(){jiaokongshenduDisplayWin.show()},
					collapse:function(){jiaokongshenduDisplayWin.hide()},
					select : function(c, re, index) {
						refreshHd_holedrilling();
					},
					specialkey : function(c, e) {
						if (e.getKey() == e.ESC) {
							if (parent.grf == true) {
								c.reset();
							}
							refreshHd_holedrillingForce();
						}if (e.getKey() == e.ENTER) {
						c.setValue(Ext.get('depthid').dom.value) ;
							refreshHd_holedrillingForce();
						}
					}
				}
			});

			// 铰孔精度数据
			var accuracyStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : 'reaming.do?code=queryAccuracyInHd_toolholder_reaming_clamp'
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [ {
					name : 'value'
				}])
			});
			accuracyStore.load();

			// 铰孔精度下拉框
			var accuracyCombo = new Ext.form.ComboBox({
				fieldLabel : '铰孔精度',
				hiddenName : 'accuracy',
				id : 'accuracyid',
				emptyText : '请选择...',
				triggerAction : 'all',
				store : accuracyStore,
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
				editable : false,
				width : document.body.clientWidth / numlign - divnum,
				listeners : {
					focus : function() {
						// accuracyStore.load();
						setTimeout('Ext.getCmp("accuracyid").expand();', 1);
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

			// 刀具类型数据
			var tooltypeStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : 'reaming.do?code=queryTooltypeInReaming'
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
			tooltypeStore.load();

			// 刀具类型下拉框
			var tooltypeCombo = new Ext.form.ComboBox({
				fieldLabel : '刀具类型',
				hiddenName : 'tooltype',
				id : 'tooltypeid',
				emptyText : '请选择...',
				triggerAction : 'all',
				store : tooltypeStore,
				// store : TOOLTYPEStore,
				displayField : 'value',
				valueField : 'value',
				selectOnFocus : true,
				loadingText : '正在加载数据...',
				mode : 'local',
				forceSelection : true,
				// pageSize : cln,
				 minListWidth : 140,
				//plugins : [ new QM.plugin.PinyinFilter ],
				resizable : true,
				editable : false,
				width : document.body.clientWidth / numlign - divnum,
				listeners : {
					focus : function() {
						// tooltypeStore.load();
						setTimeout('Ext.getCmp("tooltypeid").expand();', 1);
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

			// 铰孔刀体表格工具栏 
			var tbar = new Ext.Toolbar({// workpiecematerialCombo
				// //workpieceisotypeCombo
				items : [ new Ext.Toolbar.TextItem({
					text : '工件材料:',
					autoHeight : true
				}), workpieceisotypeCombo, '-', new Ext.Toolbar.TextItem({
					text : '公称直径:',
					autoHeight : true
				}), nominaldiameterCombo, new Ext.Toolbar.TextItem({
					text : '铰孔深度:',
					autoHeight : true
				}), depthCombo, new Ext.Toolbar.TextItem({
					text : '铰孔精度:',
					autoHeight : true
				}), accuracyCombo, new Ext.Toolbar.TextItem({
					text : '刀具类型:',
					autoHeight : true
				}), tooltypeCombo,'-', '-', {
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
				} ]
			});

			// 页面过滤
			var filtersHd_holedrilling = new Ext.ux.grid.GridFilters({// string,numeric,date,list,boolean
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
					dataIndex : 'cuttype',
					type : 'string'
				}, {
					dataIndex : 'typeid',
					type : 'string'
				}, {
					dataIndex : 'hdtooltype',
					type : 'string'
				}, {
					dataIndex : 'description',
					type : 'string'
				}, {
					dataIndex : 'remark',
					type : 'string'
				}, {
					dataIndex : 'k1',
					type : 'string'
				} ]
			});

			// 表格
			var grid = new Ext.grid.GridPanel({
				title : '<span class="commoncss">铰孔刀体</span>',
				header : false,
				height : 500,
				id : 'gridid',
				autoScroll : true,
				frame : true,
				region : 'center',
				store : hd_holedrillingStore,
				stripeRows : true,
				sm : sm,
				cm : hd_holedrillingCm,
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
				plugins : [ filtersHd_holedrilling ],
				stateful : sf,
				stateId : 'grid-reaming',
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
			hd_holedrillingStore.load({
				params : {
					start : 0,
					limit : bbar.pageSize
				}
			});

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
						hd_holedrillingStore.reload();
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
				e.preventDefault();
			});

			// 刷新
			function refreshHd_holedrilling() {
				if (parent.grf == true) {
					refreshHd_holedrillingForce();
				}
			}

			function refreshHd_holedrillingForce() {
				hd_holedrillingStoreLoad();
			}

			// 更新
			function resetCombo() {
				workpieceisotypeCombo.reset();
				nominaldiameterCombo.reset();
				depthCombo.reset();
				accuracyCombo.reset();
				tooltypeCombo.reset();

				
				pagesize_combo.reset();
				bbar.pageSize=50;
				hd_holedrillingStoreLoad();
				var currentpage=1;
				var currentpage=bbar.store.currentPage;
				bbar.moveFirst();
			}

			// 查看整体式铰刀详细信息;
			function propertyDisplay() {
				var record = grid.getSelectionModel().getSelected();
				var index = grid.getStore().indexOf(record);

				var path = checkImagePath(record.data.figure);
				var path2 = checkImagePath(record.data.figure2);

				var propertygrid = new Ext.grid.PropertyGrid({
					title : '铰刀刀具详情',
					border : true,
					autoSort : false,
					frame : true,
					// ds : hd_toolholder_reaming_integralStore,
					id : 'propertyGridid',
					enableColLock : true,
					enableColumnMove : false,
					autoExpandColumn : true,
					loadMask : true,
					stripeRows : true,
					autoScroll : true,
					clicksToEdit : 1,
					propertyNames : {
						'toolholderid' : '刀体编号',
						'sapcode' : 'SAP编号',
						'name' : '名称',
						'type' : '型号',
						'figure' : '简图',
						'figure2' : '实物图',
						'brandid' : '品牌',
						'cuttype' : '切削类型',
						/*'typeid' : '刀具类型详情ID',*/
						'hdtooltype' : '刀具类型',
						'nominaldiameter' : '公称直径',
						'nominaldiameter1' : '公称直径',
						'accuracy' : '加工孔精度',
						'accuracy1' : '加工孔精度',
						'materialid' : '材质',
						'materialid1' : '材质',
						'toothnumber' : '齿数',
						'toothnumber1' : '齿数',
						'groovedirection' : '螺旋槽方向',
						'groovedirection1' : '螺旋槽方向',
						'length' : '总长',
						'depth' : '钻孔深度',
						'groovelength' : '沟槽长度',
						'portsize' : '接口尺寸',
						'coolingtype' : '冷却类型',
						'coolingtype1' : '冷却类型',
						'description' : '特点',
						'remark' : '备注信息',
						'k1' : '系数K1'
					},
					listeners : {
						beforeedit : function(e) {
							e.cancel = true;
							return false;
						}
					}
				});

		/*		var cuttingparameter = new Ext.grid.GridPanel({
					title : '切削参数',
					header : false,
					height : 500,
					// id : 'grid2id',
					autoScroll : true,
					frame : true,
					disabled : true,
					region : 'center',
					// store : milling_toolholder_clampStore,
					stripeRows : true,
					// sm : sm2,
					// cm : milling_toolholder_clampCm,
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
*/
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
					items : [ { id:'boxid',
						xtype : 'box',
						autoEl : {
							tag : 'img',
							style : 'width:80%;height:80%;position:relative;top:10%;left:10%',
							src : path
						}
					} ]
				// view : new Ext.grid.GroupingView(),
				// plugins : [filtersMilling_toolholder_clamp],
				// stateful : true,
				// stateId : 'grid-reaming-milling_toolholder_clamp'
				});

				var sizePanel = new Ext.Panel({
					title : '尺寸简图',
					// id : 'grid2id',
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
					items : [ {id:'boxid2',
						xtype : 'box',
						autoEl : {
							tag : 'img',
							style : 'width:80%;height:80%;position:relative;top:10%;left:10%',
							src : path2
						}
					} ]
				// view : new Ext.grid.GroupingView(),
				// plugins : [filtersMilling_toolholder_clamp],
				// stateful : true,
				// stateId : 'grid-reaming-milling_toolholder_clamp'
				});
				var picturePanel2 = new Ext.Panel({
					title : '刀杆简图',
					// id : 'grid2id',
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
					items : [ {
						xtype : 'box',
						autoEl : {
							tag : 'iframe',
							style : 'height: 100%; width: 100%',
							src : path
						}
					} ]
				// view : new Ext.grid.GroupingView(),
				// plugins : [filtersMilling_toolholder_clamp],
				// stateful : true,
				// stateId : 'grid-boring-milling_toolholder_clamp'
				});

				var sizePanel2 = new Ext.Panel({
					title : '刀杆实物简图',
					// id : 'grid2id',
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
					items : [ {
						xtype : 'box',
						autoEl : {
							tag : 'iframe',
							style : 'height: 100%; width: 100%',
							src : path2
						}
					} ]
				// view : new Ext.grid.GroupingView(),
				// plugins : [filtersMilling_toolholder_clamp],
				// stateful : true,
				// stateId : 'grid-boring-milling_toolholder_clamp'
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

				/*
				 * // 模块详情表格 var hd_module_reaming_clampPanel = new
				 * Ext.grid.GridPanel({ title : '匹配铰孔模块', // header : false,
				 * autoScroll : true, id : 'hd_module_reaming_clampPanelid', //
				 * disabled : true, frame : true, region : 'center', store :
				 * hd_module_reaming_clampStore, stripeRows : true, //sm : sm2,
				 * cm : hd_module_reaming_clampCm, viewConfig : { forceFit :
				 * false // 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况 }, loadMask : {
				 * msg : '正在加载表格数据,请稍等...' }, view : new
				 * Ext.grid.GroupingView(), stateful : sf, stateId :
				 * 'grid-gt-hd_module_reaming_clamp' });
				 */

				/*
				 * var propertyTabs = new Ext.TabPanel({ region : 'center', id :
				 * 'propertytabsid', enableTabScroll : true, // autoWidth :
				 * true, activeTab : 0, height : document.body.clientHeight, //
				 * width : document.body.clientWidth / 4, // width : 400,
				 * buttonAlign : 'right', items : [propertygrid] , listeners : {
				 * tabchange : function(tabpanel, tab) { } }
				 * 
				 * });
				 */

				/*
				 * // 刀片详情表格 var hd_blade_boringPanel = new Ext.grid.GridPanel({
				 * title : '匹配刀片', // header : false, autoScroll : true, id :
				 * 'hd_blade_boringPanelid', // disabled : true, frame : true,
				 * region : 'center', store : hd_blade_boringStore, stripeRows :
				 * true, sm : sm2, cm : hd_blade_boringCm, viewConfig : {
				 * forceFit : false // 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况 },
				 * loadMask : { msg : '正在加载表格数据,请稍等...' }, view : new
				 * Ext.grid.GroupingView(), stateful : sf, stateId :
				 * 'grid-gt-hd_blade_boring' });
				 * 
				 * var propertyTabs = new Ext.TabPanel({ region : 'center', id :
				 * 'propertytabsid', enableTabScroll : true, // autoWidth :
				 * true, activeTab : 0, height : document.body.clientHeight, //
				 * width : document.body.clientWidth / 4, // width : 400,
				 * buttonAlign : 'right', items : [propertygrid] , listeners : {
				 * tabchange : function(tabpanel, tab) { } }
				 * 
				 * });
				 * 
				 * var pictureTabs = new Ext.TabPanel({ region : 'east', split :
				 * true, enableTabScroll : true, width : '60%', // collapsible:
				 * true, // margins:'3 0 3 3', // cmargins:'3 3 3 3', activeTab :
				 * 0, height : document.body.clientHeight, // width :
				 * document.body.clientWidth / 4, buttonAlign : 'right', items :
				 * [picturePanel, sizePanel, cuttingparameter], listeners : {
				 * tabchange : function(tabpanel, tab) { if (tab.getId() ==
				 * 'milling_toolholder_clampPanelid') { reamingStorePanel.load({
				 * params : { portsize : record.data.portsize } }); } } } });
				 */

				// 模块详情表格？？
				/*
				 * var hd_module_reaming_clampPanel = new Ext.grid.GridPanel({
				 * title : '匹配铰孔模块', // header : false, autoScroll : true, id :
				 * 'hd_module_reaming_clampPanelid', // disabled : true, frame :
				 * true, region : 'center', store :
				 * hd_module_reaming_clampStore, stripeRows : true, //sm : sm2,
				 * cm : hd_module_reaming_clampCm, viewConfig : { forceFit :
				 * false // 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况 }, loadMask : {
				 * msg : '正在加载表格数据,请稍等...' }, view : new
				 * Ext.grid.GroupingView(), stateful : sf, stateId :
				 * 'grid-gt-hd_module_reaming_clamp' });
				 */

				var hd_module_reaming_clampStore = new Ext.data.GroupingStore(
						{
							proxy : new Ext.data.HttpProxy(
									{
										url : 'reaming.do?code=queryHd_module_reaming_clamp4Manage'
									}),
							reader : new Ext.data.JsonReader({
								totalProperty : 'TOTALCOUNT',
								root : 'ROOT'
							}, [ {
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
								name : 'diameterrange'
							}, {
								name : 'length'
							}, {
								name : 'depth'
							}, {
								name : 'groovelength'
							}, {
								name : 'portsize'
							}, {
								name : 'mcc'
							}, {
								name : 'coolingtype'
							}, {
								name : 'description'
							}, {
								name : 'remark'
							}, {
								name : 'figure'
							}, {
								name : 'figure2'
							}, {
								name : 'aname'
							} ])

						});
				hd_module_reaming_clampStore.load();

				// TODO
				// 模块详情表格
				var hd_module_reaming_clampPanel = new Ext.grid.GridPanel({
					title : '匹配模块',
					// header : false,
					autoScroll : true,
					id : 'hd_module_reaming_clampPanelid',
					// disabled : true,
					frame : true,
					region : 'center',
					store : hd_module_reaming_clampStore,
					stripeRows : true,
					// sm : sm2,
					cm : new Ext.grid.ColumnModel([ new Ext.grid.RowNumberer({
						header : '序',
						width : 26
					}), {
						header : 'SAP编码',
						dataIndex : 'sapcode',
						width : 120,
						// hidden:true,
						sortable : true
					}, {
						header : '名称',
						dataIndex : 'name',
						width : 80,
						// hidden:true,
						sortable : true
					}, {
						header : '型号',
						dataIndex : 'type',
						width : 80,
						// hidden:true,
						sortable : true
					} , {
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
					}
				});

				/*
				 * var propertyTabs = new Ext.TabPanel({ region : 'center', id :
				 * 'propertytabsid', enableTabScroll : true, // autoWidth :
				 * true, activeTab : 0, height : document.body.clientHeight, //
				 * width : document.body.clientWidth / 4, // width : 400,
				 * buttonAlign : 'right', items : [propertygrid] , listeners : {
				 * tabchange : function(tabpanel, tab) { } }
				 * 
				 * });
				 */
				
				// Store数据存储
				var parameterStore = new Ext.data.GroupingStore({
							proxy : new Ext.data.HttpProxy({
								url : 'reaming.do?code=queryRParameter'
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

				var pictureTabs = new Ext.TabPanel(
						{
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
							items : [ picturePanel, sizePanel, /*picturePanel2,*/
									/*sizePanel2,*/ hd_module_reaming_clampPanel,sapPanel,
									cuttingparameter ],
							listeners : {
								tabchange : function(tabpanel, tab) {
									if (tab.getId() == 'hd_module_reaming_clampPanelid') {
										hd_module_reaming_clampStore.load({
											params : {
												portsize : record.data.portsize
											}
										});
									}
									else if (tab.getId() == 'ctparameterid') {
										parameterStore
												.load({
													params : {
														workpiecematerialid : workpieceisotypeCombo
														.getValue(),
														nominaldiameter : record.data.nominaldiameter,
												        k1 : record.data.k1
												
													}
												});
									}else if (pictureTabs.getActiveTab().getItemId() == 'picturePanelid') {
										var newsrc =checkImagePath(record.data.figure);
										Ext.getCmp('boxid').getEl().dom.src = newsrc;
										}
									else if (pictureTabs.getActiveTab().getItemId() == 'sizePanelid') {
									
										var newsrc =checkImagePath(record.data.figure2);
										Ext.getCmp('boxid2').getEl().dom.src = newsrc;

										}else if (tab.getId() == 'sapPanelid') {
										sapStore.load({
											params : {
												sapcode : record.data.sapcode
											}
										});}
									
								
								}
							}
						});
				var propertyDisplayWin = new Ext.Window(
						{
							title : '铰刀详细信息',
							width : 800,
							modal : true,
							height : 400,
							closeAction : 'close',
							maximizable : true,
							// plain : true,
							layout : 'border',
							items : [ propertyTabs, pictureTabs ],
							buttons : [
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
												propertygrid
														.setSource({/*'刀体编号':	record.data.toolholderid,*/
															'SAP编号':	record.data.sapcode,
															'名称':	record.data.name,
															'型号':	record.data.type,
															'品牌':	record.data.brandid,
															'切削类型':	record.data.cuttype,
																					/*'typeid' : '刀具类型详情ID',*/
															'刀具类型':	record.data.hdtooltype,
															'公称直径':	record.data.nominaldiameter,
															'公称直径':	record.data.nominaldiameter1,
															'加工孔精度':	record.data.accuracy,
															'加工孔精度':	record.data.accuracy1,
															'材质':	record.data.materialid,
															'材质':	record.data.materialid1,
															'齿数':	record.data.toothnumber,
															'齿数':	record.data.toothnumber1,
															'螺旋槽方向':	record.data.groovedirection,
															'螺旋槽方向':	record.data.groovedirection1,
															'总长':	record.data.length,
															'钻孔深度':	record.data.depth,
															'沟槽长度':	record.data.groovelength,
															'接口尺寸':	record.data.portsize,
															'冷却类型':	record.data.coolingtype,
															'冷却类型':	record.data.coolingtype1,
															'特点':	record.data.description,
															'备注信息':	record.data.remark,
															'系数K1':	record.data.k1});
												Ext.getCmp('previousbtn')
														.disable();
											} else {
												record = grid.getStore().getAt(
														index);
												propertygrid
														.setSource({/*'刀体编号':	record.data.toolholderid,*/
															'SAP编号':	record.data.sapcode,
															'名称':	record.data.name,
															'型号':	record.data.type,
															'品牌':	record.data.brandid,
															'切削类型':	record.data.cuttype,
																					/*'typeid' : '刀具类型详情ID',*/
															'刀具类型':	record.data.hdtooltype,
															'公称直径':	record.data.nominaldiameter,
															'公称直径':	record.data.nominaldiameter1,
															'加工孔精度':	record.data.accuracy,
															'加工孔精度':	record.data.accuracy1,
															'材质':	record.data.materialid,
															'材质':	record.data.materialid1,
															'齿数':	record.data.toothnumber,
															'齿数':	record.data.toothnumber1,
															'螺旋槽方向':	record.data.groovedirection,
															'螺旋槽方向':	record.data.groovedirection1,
															'总长':	record.data.length,
															'钻孔深度':	record.data.depth,
															'沟槽长度':	record.data.groovelength,
															'接口尺寸':	record.data.portsize,
															'冷却类型':	record.data.coolingtype,
															'冷却类型':	record.data.coolingtype1,
															'特点':	record.data.description,
															'备注信息':	record.data.remark,
															'系数K1':	record.data.k1});
												Ext.getCmp('nextbtn').enable();
											}

											if (pictureTabs.getActiveTab()
													.getItemId() == 'hd_module_reaming_clampPanelid') {
												hd_module_reaming_clampStore
														.load({
															params : {
																portsize : record.data.portsize
															}
														});
											}	else if (pictureTabs.getActiveTab().getItemId()  == 'ctparameterid') {
												parameterStore
												.load({
													params : {
														workpiecematerialid : workpieceisotypeCombo
														.getValue(),
														nominaldiameter : record.data.nominaldiameter,
												        k1 : record.data.k1
												
													}
												});
									}else if (pictureTabs.getActiveTab().getItemId() == 'picturePanelid') {
										var newsrc =checkImagePath(record.data.figure);
										Ext.getCmp('boxid').getEl().dom.src = newsrc;
										}
									else if (pictureTabs.getActiveTab().getItemId() == 'sizePanelid') {
									
										var newsrc =checkImagePath(record.data.figure2);
										Ext.getCmp('boxid2').getEl().dom.src = newsrc;

										}else if (pictureTabs.getActiveTab().getItemId()  == 'sapPanelid') {
										sapStore.load({
											params : {
												sapcode : record.data.sapcode
											}
										});}

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
												propertygrid
														.setSource({/*'刀体编号':	record.data.toolholderid,*/
															'SAP编号':	record.data.sapcode,
															'名称':	record.data.name,
															'型号':	record.data.type,
															'品牌':	record.data.brandid,
															'切削类型':	record.data.cuttype,
																					/*'typeid' : '刀具类型详情ID',*/
															'刀具类型':	record.data.hdtooltype,
															'公称直径':	record.data.nominaldiameter,
															'公称直径':	record.data.nominaldiameter1,
															'加工孔精度':	record.data.accuracy,
															'加工孔精度':	record.data.accuracy1,
															'材质':	record.data.materialid,
															'材质':	record.data.materialid1,
															'齿数':	record.data.toothnumber,
															'齿数':	record.data.toothnumber1,
															'螺旋槽方向':	record.data.groovedirection,
															'螺旋槽方向':	record.data.groovedirection1,
															'总长':	record.data.length,
															'钻孔深度':	record.data.depth,
															'沟槽长度':	record.data.groovelength,
															'接口尺寸':	record.data.portsize,
															'冷却类型':	record.data.coolingtype,
															'冷却类型':	record.data.coolingtype1,
															'特点':	record.data.description,
															'备注信息':	record.data.remark,
															'系数K1':	record.data.k1});
												Ext.getCmp('nextbtn').disable();
											} else {
												record = grid.getStore().getAt(
														index);
												propertygrid
														.setSource({/*'刀体编号':	record.data.toolholderid,*/
															'SAP编号':	record.data.sapcode,
															'名称':	record.data.name,
															'型号':	record.data.type,
															'品牌':	record.data.brandid,
															'切削类型':	record.data.cuttype,
																					/*'typeid' : '刀具类型详情ID',*/
															'刀具类型':	record.data.hdtooltype,
															'公称直径':	record.data.nominaldiameter,
															'公称直径':	record.data.nominaldiameter1,
															'加工孔精度':	record.data.accuracy,
															'加工孔精度':	record.data.accuracy1,
															'材质':	record.data.materialid,
															'材质':	record.data.materialid1,
															'齿数':	record.data.toothnumber,
															'齿数':	record.data.toothnumber1,
															'螺旋槽方向':	record.data.groovedirection,
															'螺旋槽方向':	record.data.groovedirection1,
															'总长':	record.data.length,
															'钻孔深度':	record.data.depth,
															'沟槽长度':	record.data.groovelength,
															'接口尺寸':	record.data.portsize,
															'冷却类型':	record.data.coolingtype,
															'冷却类型':	record.data.coolingtype1,
															'特点':	record.data.description,
															'备注信息':	record.data.remark,
															'系数K1':	record.data.k1});
												Ext.getCmp('previousbtn')
														.enable();
											}

											if (pictureTabs.getActiveTab()
													.getItemId() == 'hd_module_reaming_clampPanelid') {
												hd_module_reaming_clampStore
														.load({
															params : {
																portsize : record.data.portsize
															}
														});
											}	else if (pictureTabs.getActiveTab().getItemId()  == 'ctparameterid') {
												parameterStore
												.load({
													params : {
														workpiecematerialid : workpieceisotypeCombo
														.getValue(),
														nominaldiameter : record.data.nominaldiameter,
												        k1 : record.data.k1
												
													}
												});
									}else if (pictureTabs.getActiveTab().getItemId() == 'picturePanelid') {
										var newsrc =checkImagePath(record.data.figure);
										Ext.getCmp('boxid').getEl().dom.src = newsrc;
										}
									else if (pictureTabs.getActiveTab().getItemId() == 'sizePanelid') {
									
										var newsrc =checkImagePath(record.data.figure2);
										Ext.getCmp('boxid2').getEl().dom.src = newsrc;

										}else if (pictureTabs.getActiveTab().getItemId()  == 'sapPanelid') {
										sapStore.load({
											params : {
												sapcode : record.data.sapcode
											}
										});}

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
									} ],
							listeners : {
								afterrender : function(tabpanel, tab) {
									propertygrid.setSource({/*'刀体编号':	record.data.toolholderid,*/
										'SAP编号':	record.data.sapcode,
										'名称':	record.data.name,
										'型号':	record.data.type,
										'品牌':	record.data.brandid,
										'切削类型':	record.data.cuttype,
																/*'typeid' : '刀具类型详情ID',*/
										'刀具类型':	record.data.hdtooltype,
										'公称直径':	record.data.nominaldiameter,
										'公称直径':	record.data.nominaldiameter1,
										'加工孔精度':	record.data.accuracy,
										'加工孔精度':	record.data.accuracy1,
										'材质':	record.data.materialid,
										'材质':	record.data.materialid1,
										'齿数':	record.data.toothnumber,
										'齿数':	record.data.toothnumber1,
										'螺旋槽方向':	record.data.groovedirection,
										'螺旋槽方向':	record.data.groovedirection1,
										
										'总长':	record.data.length,
										'钻孔深度':	record.data.depth,
										'沟槽长度':	record.data.groovelength,
										'接口尺寸':	record.data.portsize,
										'冷却类型':	record.data.coolingtype,
										'冷却类型':	record.data.coolingtype1,
										'特点':	record.data.description,
										'备注信息':	record.data.remark,
										'系数K1':	record.data.k1});
								},
								beforeshow : function(win) {
									hd_module_reaming_clampStore.load();

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

			// 查看机夹式铰刀模块详细信息;
			/*
			 * function propertyDisplay2() { var record =
			 * grid.getSelectionModel().getSelected(); var index =
			 * grid.getStore().indexOf(record);
			 * 
			 * var path = record.data.figure; if (path == null || path == '') {
			 * path = '\\resource\\image\\ext\\null.gif'; }
			 * 
			 * var path2 = record.data.figure2; if (path2 == null || path2 ==
			 * '') { path2 = '\\resource\\image\\ext\\null.gif'; }
			 * 
			 * var propertygrid2 = new Ext.grid.PropertyGrid({ title : '模块详情',
			 * border : true, autoSort : false, frame : true, ds :
			 * hd_toolholder_reaming_integralStore, id : 'propertyGrid2id',
			 * enableColLock : true, enableColumnMove : false, autoExpandColumn :
			 * true, loadMask : true, stripeRows : true, autoScroll : true,
			 * clicksToEdit : 1, propertyNames : { 'toolholderid' : '刀杆编号',
			 * 'sapcode' : 'SAP编号', 'name' : '名称', 'type' : '型号', 'figure' :
			 * '简图', 'figure2' : '实物图', 'brandid' : '品牌', 'cuttype' : '切削类型',
			 * 'diameterrange' : '直径范围', 'length' : '总长', 'depth' : '钻孔深度',
			 * 'groovelength' : '沟槽长度', 'portsize' : '接口尺寸', 'mcc' : 'MCC',
			 * 'coolingtype' : '冷却类型', 'description' : '特点', 'remark' : '备注信息',
			 * 'aname' : '附件信息' }, customEditors : { 'turningtype' : new
			 * Ext.grid.GridEditor(new Ext.form.ComboBox({ displayField :
			 * 'text', mode : 'local', triggerAction : 'all', store :
			 * TURNINGTYPEStore })), 'portsize' : new Ext.grid.GridEditor(new
			 * Ext.form.ComboBox({ displayField : 'text', mode : 'local',
			 * triggerAction : 'all', store : PORTSIZEStore })), 'handoftool' :
			 * new Ext.grid.GridEditor(new Ext.form.ComboBox({ displayField :
			 * 'text', mode : 'local', triggerAction : 'all', store :
			 * HANDOFTOOLStore })), 'cseries' : new Ext.grid.GridEditor(new
			 * Ext.form.ComboBox({ displayField : 'text', mode : 'local',
			 * triggerAction : 'all', store : CSERIESStore })), 'thheadangle' :
			 * new Ext.grid.GridEditor(new Ext.form.ComboBox({ displayField :
			 * 'text', mode : 'local', triggerAction : 'all', store :
			 * THHEADANGLEStore })) }, customRenderers : { 'turningtype' :
			 * TURNINGTYPERender, 'portsize' : PORTSIZERender, 'handoftool' :
			 * HANDOFTOOLRender, 'cseries' : CSERIESRender, 'thheadangle' :
			 * THHEADANGLERender }, listeners : { beforeedit : function(e) {
			 * e.cancel = true; return false; } } });
			 */

			/*
			 * var propertyTabs2 = new Ext.TabPanel({ region : 'center', id :
			 * 'propertytabs2id', enableTabScroll : true, // autoWidth : true,
			 * activeTab : 0, height : document.body.clientHeight, // width :
			 * document.body.clientWidth / 4, // width : 400, buttonAlign :
			 * 'right', items : [propertygrid2] , listeners : { tabchange :
			 * function(tabpanel, tab) { } }
			 * 
			 * });
			 */

			/*
			 * var pictureTabs2 = new Ext.TabPanel({ region : 'east', split :
			 * true, enableTabScroll : true, width : '60%', // collapsible:
			 * true, // margins:'3 0 3 3', // cmargins:'3 3 3 3', activeTab : 0,
			 * height : document.body.clientHeight, // width :
			 * document.body.clientWidth / 4, buttonAlign : 'right', items :
			 * [picturePanel, sizePanel, picturePanel2, sizePanel2,
			 * hd_module_reaming_clampPanel, cuttingparameter], listeners : {
			 * tabchange : function(tabpanel, tab) { if (tab.getId() ==
			 * 'hd_module_reaming_clampPanelid') {
			 * hd_module_reaming_clampStore.load({ params : { featurecode :
			 * record.data.featurecode } }); } } } });
			 */
			/*
			 * var propertyDisplayWin2 = new Ext.Window({ title : '机夹式铰刀详细信息',
			 * width : 800, modal : true, height : 400, closeAction : 'close',
			 * maximizable : true, // plain : true, layout : 'border', items :
			 * [propertyTabs2, pictureTabs2], buttons : [{ text : '上一条', id :
			 * 'previousbtn', iconCls : 'app_leftIcon', handler : function() {
			 * 
			 * grid.getSelectionModel().selectRow(index - 1);
			 * grid.getView().focusRow(index - 1);
			 * 
			 * index = index - 1; if (index < 0) { infoMsg('已经到第一条了.');
			 * grid.getSelectionModel().selectRow(index + 1);
			 * grid.getView().focusRow(index + 1); // index = 1;
			 * Ext.getCmp('previousbtn').disable(); } else { record =
			 * grid.getStore().getAt(index);
			 * propertygrid.setSource(record.data);
			 * Ext.getCmp('nextbtn').enable(); }
			 * 
			 * if (pictureTabs.getActiveTab().getItemId() ==
			 * 'hd_module_reaming_clampPanelid') {
			 * hd_module_reaming_clampStore.load({ params : { //featurecode :
			 * record.data.featurecode } }); } } }, { text : '下一条', id :
			 * 'nextbtn', iconCls : 'app_rightIcon', handler : function() {
			 * index = index + 1;
			 * 
			 * grid.getSelectionModel().selectRow(index + 1);
			 * grid.getView().focusRow(index + 1); index = index + 1;
			 * 
			 * if (index > grid.getStore().getCount() - 1) {
			 * infoMsg('已经到最后一条了.'); grid.getSelectionModel().selectRow(index -
			 * 1); grid.getView().focusRow(index - 1); // index =
			 * grid.getStore().getCount() - 2; Ext.getCmp('nextbtn').disable(); }
			 * else { record = grid.getStore().getAt(index);
			 * propertygrid.setSource(record.data);
			 * Ext.getCmp('previousbtn').enable(); }
			 * 
			 * if (pictureTabs.getActiveTab().getItemId() ==
			 * 'hd_module_reaming_clampPanelid') {
			 * hd_module_reaming_clampStore.load({ params : { //featurecode :
			 * record.data.featurecode } }); } } }, { text : '保存', id :
			 * 'savebtn', hidden : true, iconCls : 'acceptIcon', handler :
			 * function() { } }, { text : '关闭', id : 'cancelbtn', iconCls :
			 * 'cancelIcon', handler : function() { propertyDisplayWin2.close(); }
			 * }], listeners : { afterrender : function(tabpanel, tab) {
			 * propertygrid2.setSource(record.data); } } });
			 * 
			 * propertyDisplayWin.show(); }
			 */

			var viewport = new Ext.Viewport({
				layout : 'border',
				items : [ grid ]
			});
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
					
					url : 'reaming.do?code=printTask3',
					   
					
					params : {
						 workpieceisotype : workpieceisotypeCombo.getValue(),
						 nominaldiameter : nominaldiameterCombo.getValue(),
						 depth : depthCombo.getValue(),
						 accuracy : accuracyCombo.getValue(),
						 tooltype : tooltypeCombo.getValue(),
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