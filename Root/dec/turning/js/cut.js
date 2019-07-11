/**
 * 切断切槽
 * 
 * @author fuxianwu
 * @since 2013-01-01
 */
Ext.onReady(function() {
			var divnum = 25;// 调整toolbar中的下拉框的大小与位置;
			var numlign = 11;

			var pp = 0.8; // 将下拉框图片缩放为80%;

			// 图片大小;
			var handletypeArr = new Array(176, 79); // 刀柄形式
			var handletypepp = pp;

			var handoftoolArr = new Array(130, 80); // 刀具左右手
			var handoftoolpp = pp;

			var cuttinghandArr = new Array(91, 81); // 刀片左右手
			var cuttinghandpp = pp;

			var turningtypeArr = new Array(98, 80); // 车削类型
			var turningtypepp = pp + 0.2;

			var portsizeArr = new Array(230, 80); // 接口规格
			var portsizepp = pp - 0.2;

			// 复选框
			var sm = new Ext.grid.CheckboxSelectionModel();

			// 行号
			var rownum = new Ext.grid.RowNumberer({
						header	: '序',
						width	: 26
					});

			var sm2 = new Ext.grid.CheckboxSelectionModel();

			// 行号
			var rownum2 = new Ext.grid.RowNumberer({
						header	: '序',
						width	: 26
					});
			// 列模型
			var cutbladeCm = new Ext.grid.ColumnModel([rownum, sm,/*, {
				header		: '刀片ID', // 列标题
				dataIndex	: 'cutbladeid', // 数据索引,和Store数据存储模型对应
				width		: 60, // 列宽度
				sortable	: true, // 该列是否要排序
				hidden		: true
					// 该列是否隐藏
				},*/ {
					header		: '刀片名称',
					dataIndex	: 'name',
					width		: 80,
					// hidden : true,
					sortable	: true
				}, {
				header		: 'SAP编码',
				dataIndex	: 'sapcode',
				width		: 100,
				sortable	: true
			//	hidden		: true
			},  {
				header		: '刀片型号',
				dataIndex	: 'bladetype',
				// hidden : true,
				width		: 180,
				sortable	: true
			}, {
				header		: '结构简图',
				dataIndex	: 'figure',
				width		: 80,
				 hidden : true,
				sortable	: true
			}, {
				header		: '尺寸图',
				dataIndex	: 'figure2',
				width		: 80,
				hidden : true,
				sortable	: true
			}, {
				header		: '车削类型',
				dataIndex	: 'turningtype',
				width		: 80,
				// hidden : true,
				sortable	: true
			}/*,{
				header		: '刀片材质ID',
				dataIndex	: 'bladematerialid',
				width		: 80,
				sortable	: true,
				hidden		: true
			}*/, {
				header		: '刀片槽型',
				dataIndex	: 'cutgroovename',
				width		: 60,
				// hidden : true,
				sortable	: true
			}, {
				header		: '刀片材质',
				dataIndex	: 'cutbladematerialname',
				width		: 60,
				sortable	: true,
				hidden		: false
			},{
				header		: '刀片品牌',
				dataIndex	: 'cutbladebrandname',
				width		: 60,
				// hidden : true,
				sortable	: true
			}, {
				header		: '刀片左右手',
				dataIndex	: 'cuttinghand',
				width		: 60,
				// hidden : true,
				sortable	: true
			}, {
				header		: '切削刃数目',
				dataIndex	: 'cuttingedge',
				width		: 60,
				align       :      'center',
				// hidden : true,
				sortable	: true
			}, {
				header		: '刀片宽度',
				dataIndex	: 'bladewidth',
				width		: 80,
				align       :      'center',
				// hidden : true,
				sortable	: true
			}, {
				header		: '主偏角',
				dataIndex	: 'mainangle',
				width		: 90,
				// hidden : true,
				align       :      'center',
				sortable	: true
			}, {
				header		: '刀片后角',
				dataIndex	: 'reliefangle',
				width		: 60,
				// hidden : true,
				align       :      'center',
				sortable	: true
			}, {
				header		: '刀片侧后角',
				dataIndex	: 'sidereliefangle',
				width		: 80,
				// hidden : true,
				align       :      'center',
				sortable	: true
			}, {
				header		: '最大切槽深度',
				dataIndex	: 'cuttingdepth',
				width		: 80,
				// hidden : true,
				align       :      'center',
				sortable	: true
			}, {
				header		: '刀尖圆弧半径',
				dataIndex	: 'cuttingradius',
				width		: 80,
				// hidden : true,
				align       :      'center',
				sortable	: true
			}, {
				header		: '特征描述',
				dataIndex	: 'description',
				width		: 80,
				align       :      'center',
				// hidden : true,
				sortable	: true
			}, {
				header		: '刀片特征码',
				dataIndex	: 'featurecode',
				width		: 80,
				align       :      'center',
				 hidden : true,
				sortable	: true
			}, {
				header		: '刀片优先级',
				dataIndex	: 'priority',
				width		: 80,
				align       :      'center',
			    hidden : true,
				sortable	: true
			}, {
				header		: '轴向切深',
				dataIndex	: 'apmax',
				width		: 80,
				// hidden : true,
				align       :      'center',
				sortable	: true
			}, {
				header		: '径向切深',
				dataIndex	: 'apmin',
				width		: 80,
				// hidden : true,
				align       :      'center',
				sortable	: true
			}, {
				header		: '最大轴向进给',
				dataIndex	: 'fnzmax',
				width		: 80,
				// hidden : true,
				align       :      'center',
				sortable	: true
			}, {
				header		: '最小轴向进给',
				dataIndex	: 'fnzmin',
				width		: 80,
				align       :      'center',
				// hidden : true,
				sortable	: true
			},  {
				header		: '最大径向进给',
				dataIndex	: 'fnxmax',
				width		: 80,
				// hidden : true,
				align       :      'center',
				sortable	: true
			}, {
				header		: '最小径向进给',
				dataIndex	: 'fnxmin',
				width		: 80,
				align       :      'center',
				// hidden : true,
				sortable	: true
			}, {
				header		: '备注信息',
				dataIndex	: 'remark',
				width		: 120,
				align       :      'center',
				// hidden : true,
				sortable	: true
			}]);

			// 列模型
			var cuttoolholderCm = new Ext.grid.ColumnModel([rownum2, sm2,/*, {
				header		: '刀体ID', // 列标题
				dataIndex	: 'toolholderid', // 数据索引,和Store数据存储模型对应
				width		: 60, // 列宽度
				sortable	: true, // 该列是否要排序
				hidden		: true
					// 该列是否隐藏
				}*/ {
				header		: '刀体名称',
				dataIndex	: 'name',
				width		: 100,
				sortable	: true
					// hidden : true
				}, {
					header		: 'SAP编码',
					dataIndex	: 'sapcode',
					width		: 100,
					sortable	: true,
					hidden		: true
				},{
				header		: '刀体型号',
				dataIndex	: 'toolholdertype',
				width		: 130,
				// hidden : true,
				sortable	: true
			}, {
				header		: '刀体品牌',
				dataIndex	: 'cuttoolholderbrandname',
				// hidden : true,
				width		: 80,
				sortable	: true
			}, {
				header		: '车削类型',
				dataIndex	: 'turningtype',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '结构简图',
				dataIndex	: 'figure',
				width		: 80,
				// renderer : TURNINGTYPERender,
				hidden : true,
				sortable	: true
			}, {
				header		: '尺寸图',
				dataIndex	: 'figure2',
				width		: 80,
				// renderer : TURNINGTYPERender,
				hidden : true,
				sortable	: true
			}, {
				header		: '刀柄类型',
				dataIndex	: 'handletype',
				width		: 80,
				// renderer : TURNINGTYPERender,
				// hidden : true,
				sortable	: true
			}, {
				header		: '接口规格',
				dataIndex	: 'portsize',
				width		: 80,
				// hidden : true,
				renderer : PORTSIZECRender,
				sortable	: true
			}, {
				header		: '刀具方向',
				dataIndex	: 'handoftool',
				width		: 80,
				// hidden : true,
				// renderer : HANDOFTOOLRender,
				sortable	: true
			}, {
				header		: '特征码',
				dataIndex	: 'featurecode',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '最大切槽宽度',
				dataIndex	: 'cutwidthmax',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '最小切槽宽度',
				dataIndex	: 'cutwidthmin',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '刀片夹紧方式',
				dataIndex	: 'cseries',
				width		: 100
					// renderer : CSERIESRender,
					// hidden : true,
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
				header		: '最大切槽深度',
				dataIndex	: 'cuttingdepth',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '最小加工直径',
				dataIndex	: 'diametermax',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '最大首切直径',
				dataIndex	: 'cutdiametermax',
				width		: 100,
				// hidden : true,
				sortable	: true
			}, {
				header		: '最小首切直径',
				dataIndex	: 'cutdiametermin',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '附件1名称',
				dataIndex	: 'aname1',
				width		: 80,
					 hidden : true
				}, {
				header		: '附件1型号',
				dataIndex	: 'atype1',
				width		: 80,
					 hidden : true
				}, {
				header		: '附件2名称',
				dataIndex	: 'aname2',
				width		: 80,
					 hidden : true
				}, {
				header		: '附件2型号',
				dataIndex	: 'atype2',
				width		: 80,
				hidden		: true
			}, {
				header		: '附件3名称',
				dataIndex	: 'aname3',
				width		: 80,
				hidden		: true
			}, {
				header		: '附件3型号',
				dataIndex	: 'atype3',
				width		: 80,
				hidden		: true
			}, {
				header		: '附件4名称',
				dataIndex	: 'aname4',
				width		: 80,
				hidden		: true
			}, {
				header		: '附件4型号',
				dataIndex	: 'atype4',
				width		: 80,
				hidden		: true
			}, {
				header		: '附件5名称',
				dataIndex	: 'aname5',
				width		: 80,
				hidden		: true
			}, {
				header		: '附件5型号',
				dataIndex	: 'atype5',
				width		: 80,
				hidden		: true
			}, {
				header		: '备注信息',
				dataIndex	: 'remark',
				width		: 80
					/* hidden : true,*/
				}]);

			// Store数据存储
			var cutbladeStore = new Ext.data.GroupingStore({
				proxy	: new Ext.data.HttpProxy({
					url	: 'cut.do?code=queryCutblade4Manage'
						// queryCutblade4Manage是在CutbladeAction中的方法queryCutblade4Manage;
					}),
				reader	: new Ext.data.JsonReader({
							totalProperty	: 'TOTALCOUNT',
							root			: 'ROOT'
						}, [/*{
									name	: 'cutbladeid'
								},*/ {
									name	: 'sapcode'
								}, {
									name	: 'name'
								}, {
									name	: 'bladetype'
								}, {
									name	: 'turningtype'
								}, {
									name	: 'cutbladematerialname'
								}, {
									name	: 'cutgroovename'
								}, {
									name	: 'cutbladebrandname'
								}, {
									name	: 'cuttinghand'
								}, {
									name	: 'cuttingedge'
								}, {
									name	: 'bladewidth'
								}, {
									name	: 'mainangle'
								}, {
									name	: 'reliefangle'
								}, {
									name	: 'sidereliefangle'
								}, {
									name	: 'cuttingdepth'
								}, {
									name	: 'cuttingradius'
								}, {
									name	: 'description'
								}, {
									name	: 'featurecode'
								}, {
									name	: 'priority'
								}, {
									name	: 'apmax'
								}, {
									name	: 'apmin'
								}, {
									name	: 'fnxmax'
								}, {
									name	: 'fnxmin'
								}, {
									name	: 'fnzmax'
								}, {
									name	: 'fnzmin'
								}, {
									name	: 'figure'
								}, {
									name	: 'figure2'
								}, {
									name	: 'bladematerialid'
								},{
									name	: 'remark'
								}])
					/*
					 * , listeners : { 'load' : function(store, records) { for (var i = 0; i < records.length; i++) { propertyGridStore[records[i].get('name')] = records[i].get('value'); } } load : {
					 * fn : function(store, records, options) { // get the property grid component var propGrid = Ext.getCmp('propertyGridid'); // make sure the property grid exists if (propGrid) { //
					 * populate the property grid with store data propGrid.setSource(store.getAt(0).data); } } } }
					 */
				});

			// Store数据存储
			var cuttoolholderStore = new Ext.data.GroupingStore({
						proxy	: new Ext.data.HttpProxy({
							url	: 'cut.do?code=queryCuttoolholder4Manage'
								// queryCuttoolholder4Manage是在CuttoolholderAction中的方法queryCuttoolholder4Manage;
							}),
						reader	: new Ext.data.JsonReader({
									totalProperty	: 'TOTALCOUNT',
									root			: 'ROOT'
								}, [/*{
											name	: 'toolholderid'
										},*/ {
											name	: 'sapcode'
										}, {
											name	: 'name'
										}, {
											name	: 'toolholdertype'
										}, {
											name	: 'cuttoolholderbrandname'
										}, {
											name	: 'turningtype'
										}, {
											name	: 'portsize'
										}, {
											name	: 'handoftool'
										},  {
											name	: 'featurecode'
										}, {
											name	: 'handletype'
										}, {
											name	: 'cutwidthmax'
										}, {
											name	: 'cutwidthmin'
										}, {
											name	: 'cseries'
										}, {
											name	: 'length'
										}, {
											name	: 'width'
										}, {
											name	: 'cuttingdepth'
										}, {
											name	: 'diametermax'
										}, {
											name	: 'cutdiametermax'
										}, {
											name	: 'cutdiametermin'
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
											name	: 'figure'
										}, {
											name	: 'figure2'
										},{
											name	: 'remark'
										}])
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
			pagesize_combo.on('select', function(comboBox) {
						bbar.pageSize = parseInt(comboBox.getValue());
						number = parseInt(comboBox.getValue());
						cutbladeStoreLoad();
					});

			// 实时过滤状态
			var runtimeButton = new Ext.CycleButton({
						showText		: true,
						prependText		: '实时过滤状态: ',
						items			: [{
									text	: '开',
									iconCls	: 'lightonIcon',
									checked	: parent.grf
								}, {
									text	: '关',
									iconCls	: 'lightoffIcon',
									checked	: !parent.grf
								}],
						changeHandler	: function(btn, item) {
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
						showText		: true,
						prependText		: '实时过滤状态: ',
						items			: [{
									text	: '开',
									iconCls	: 'lightonIcon',
									checked	: parent.grf
								}, {
									text	: '关',
									iconCls	: 'lightoffIcon',
									checked	: !parent.grf
								}],
						changeHandler	: function(btn, item) {
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
			function getfeaturecode(){var a;if(grid2.getSelectionModel().getSelected()){a=grid2.getSelectionModel().getSelected().data.featurecode}else{a=''};return a};
			function getfeaturecode2(){var a;if(grid.getSelectionModel().getSelected()){a=grid.getSelectionModel().getSelected().data.featurecode}else{a=''};return a};
			function cutbladeStoreLoad() {
				cutbladeStore.load({
							params	: {
								start				: bbar.pageSize * (grid.getBottomToolbar().getPageData().activePage - 1),
								limit				: bbar.pageSize,
								workpieceisotype	: workpieceisotypeCombo.getValue(),
								turningtype			: turningtypeCombo.getValue(),
								bladewidth			: bladewidthCombo.getValue(),
								cuttingdepth		: cuttingdepthCombo.getValue(),
								cuttingradius		: cuttingradiusCombo.getValue(),
								cuttinghand			: cuttinghandCombo.getValue(),
								cuttingedge			: cuttingedgeCombo.getValue(),
								featurecode			: getfeaturecode()
							}
						});
			}

			function cuttoolholderStoreLoad() {
				cuttoolholderStore.load({
							params	: {
								start			: bbar2.pageSize * (grid2.getBottomToolbar().getPageData().activePage - 1),
								limit			: bbar2.pageSize,
								turningtype		: turningtypeCombo2.getValue(),
								cuttingdepth	: cuttingdepthCombo2.getValue(),
								portsize		: portsizeCombo.getValue(),
								handoftool		: handoftoolCombo.getValue(),
								handletype		: handletypeCombo.getValue(),
								diametermax		: diametermaxCombo.getValue(),
								cutdiameter		: cutdiameterCombo.getValue(),
								featurecode		: getfeaturecode2()
							          }
						});
			}

            //刀片联动
			//工件材料联动                           
			function workpieceisotypeStoreLoad() {
				workpieceisotypeStore.load({
					params : {
						
						featurecode : getfeaturecode()
					}
				});
			}
			//车削类型联动
			function turningtypeStoreLoad() {
				turningtypeStore.load({
					params : {
						workpiecematerialid : workpieceisotypeCombo.getValue(),
						featurecode : getfeaturecode()
					}
				});
			}
			
			//切槽宽度联动
			function BladewidthStoreLoad() {
				BladewidthStore.load({
					params : {
						workpiecematerialid : workpieceisotypeCombo.getValue(),
						turningtype : turningtypeCombo.getValue(),
						featurecode : getfeaturecode()
					}
				});
			}
			
			//刀尖圆弧半径联动
			function CuttingradiusStoreLoad() {
				CuttingradiusStore.load({
					params : {
						workpiecematerialid : workpieceisotypeCombo.getValue(),
						turningtype : turningtypeCombo.getValue(),
						bladewidth : bladewidthCombo.getValue(),
						featurecode : getfeaturecode()
					}
				});
			}
			
			//刀片左右手联动
			function cuttinghandStoreLoad() {
				cuttinghandStore.load({
					params : {
						workpiecematerialid : workpieceisotypeCombo.getValue(),
						turningtype : turningtypeCombo.getValue(),
						bladewidth : bladewidthCombo.getValue(),
						cuttingradius : cuttingradiusCombo.getValue(),
						featurecode : getfeaturecode()
					}
				});
			}
			
			//切削刃数目联动
			function cuttingedgeStoreLoad() {
				cuttingedgeStore.load({
					params : {
						workpiecematerialid : workpieceisotypeCombo.getValue(),
						turningtype : turningtypeCombo.getValue(),
						bladewidth : bladewidthCombo.getValue(),
						cuttingradius : cuttingradiusCombo.getValue(),
						cuttinghand : cuttinghandCombo.getValue(),
						featurecode : getfeaturecode()
					}
				});
			}
			//刀体联动
			//撤销类型联动                                     
			function turningtype2StoreLoad() {
				turningtype2Store.load({
					params : {
						
						featurecode : getfeaturecode2()
					}
				});
			}
			//切槽深度联动
			function Cuttingdepth2StoreLoad() {
				Cuttingdepth2Store.load({
					params : {
						turningtype2 : turningtypeCombo2.getValue(),
						featurecode : getfeaturecode2()
					}
				});
			}
			
			//接口规格联动
			function portsizeStoreLoad() {
				portsizeStore.load({
					params : {
						turningtype2 : turningtypeCombo2.getValue(),
						cuttingdepth2 : cuttingdepthCombo2.getValue(),
						featurecode : getfeaturecode2()
					}
				});
			}
			//刀具方向联动
			function handoftoolStoreLoad() {
				handoftoolStore.load({
					params : {
						turningtype2 : turningtypeCombo2.getValue(),
						cuttingdepth2 : cuttingdepthCombo2.getValue(),
						portsize : portsizeCombo.getValue(),
						featurecode : getfeaturecode2()
					}
				});
			}
			
			// 查询结果按钮
			var calcButton = new Ext.Button({
						text		: '查询结果',
						iconCls		: 'cuttableIcon',
						hidden		: true,
						listeners	: {
							click	: function() {
								cutbladeStoreLoad();
							}
						}
					});
			// 查询结果按钮
			var calcButton2 = new Ext.Button({
						text		: '查询结果',
						iconCls		: 'cuttableIcon',
						hidden		: true,
						listeners	: {
							click	: function() {
								cuttoolholderStoreLoad();
							}
						}
					});

			// 分页工具栏
			var bbar = new Ext.PagingToolbar({
						pageSize	: number,
						store		: cutbladeStore,
						displayInfo	: true,
						displayMsg	: '显示第 {0} 条到第 {1} 条,共 {2} 条',
						plugins		: new Ext.ux.ProgressBarPager(),
						emptyMsg	: '对不起,没有符合条件的记录!',
						items		: ['-', '&nbsp;&nbsp;', pagesize_combo, /*
																			 * '-', '&nbsp;&nbsp;', { text : '查询结果', iconCls : 'acceptIcon', handler : function() { resultDisplay(); //
																			 * Ext.getCmp('helpdiv').setText('adfadsf'); } },
																			 */		{
									xtype	: 'tbspacer',
									width	: 10
								}, {
									text	: '通过选择条目过滤刀体',
									iconCls	: 'acceptIcon',
									id		: 'selectCuttoolholder',
									handler	: function() {
										tabs.activate(1);

										// var record =
										// grid.getSelectionModel().getSelected();
										var records = grid.getSelectionModel().getSelections();

										if (records.length == 0) {
											cuttoolholderStoreLoad();
										} else {
											if (records.length > 1) {
												infoMsg('您选择了 ' + records.length + ' 个条目，选择单个条目会获得准确匹配。');
											}

											// grid.getSelectionModel().selectRow(grid.getSelectionModel().last,
											// false);
											cuttoolholderStore.load({
														params	: {
															start		: bbar2.pageSize * (grid2.getBottomToolbar().getPageData().activePage - 1),
															limit		: bbar2.pageSize,
															featurecode	: jsArray2JsString(records, 'featurecode')
														}
													});
										}
									}
								}, {
									xtype	: 'tbspacer',
									width	: 10
								}, runtimeButton, {
									xtype	: 'tbspacer',
									width	: 10
								}, calcButton, {
									text			: ' ',
									// iconCls : 'acceptIcon',
									disabled		: true,
									disabledClass	: 'x-item-disabled-fuxianwu',
									id				: 'helpdiv1'
								}]
					});

			// 每页显示条数下拉选择框
			var pagesize_combo2 = new Ext.form.ComboBox({
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

			var number2 = parseInt(pagesize_combo2.getValue());
			pagesize_combo2.on('select', function(comboBox) {
						bbar2.pageSize = parseInt(comboBox.getValue());
						number2 = parseInt(comboBox.getValue());
						cuttoolholderStoreLoad();
					});

			// 分页工具栏
			var bbar2 = new Ext.PagingToolbar({
						pageSize	: number2,
						store		: cuttoolholderStore,
						displayInfo	: true,
						displayMsg	: '显示第 {0} 条到第 {1} 条,共 {2} 条',
						plugins		: new Ext.ux.ProgressBarPager(),
						emptyMsg	: '对不起,没有符合条件的记录!',
						items		: ['-', '&nbsp;&nbsp;', pagesize_combo2, /*
																				 * '-', '&nbsp;&nbsp;', { text : '查询结果', iconCls : 'acceptIcon', handler : function() { resultDisplay(); //
																				 * Ext.getCmp('helpdiv').setText('adfadsf'); } },
																				 */		{
									xtype	: 'tbspacer',
									width	: 10
								}, {
									text	: '通过选择条目过滤刀片',
									id		: 'selectCutblade',
									iconCls	: 'acceptIcon',
									handler	: function() {
										tabs.activate(0);

										// var record = grid2.getSelectionModel().getSelected();
										var records = grid2.getSelectionModel().getSelections();

										if (records.length == 0) {
											cutbladeStoreLoad();
										} else {
											if (records.length > 1) {
												infoMsg('您选择了 ' + records.length + ' 个条目，选择单个条目会获得准确匹配。');
											}

											// grid.getSelectionModel().selectRow(grid.getSelectionModel().last,
											// false);
											cutbladeStore.load({
														params	: {
															start		: bbar.pageSize * (grid.getBottomToolbar().getPageData().activePage - 1),
															limit		: bbar.pageSize,
															featurecode	: jsArray2JsString(records, 'featurecode')
														}
													});
										}
									}
								}, {
									xtype	: 'tbspacer',
									width	: 10
								}, runtimeButton2, {
									xtype	: 'tbspacer',
									width	: 10
								}, calcButton2, {
									text			: ' ',
									// iconCls : 'acceptIcon',
									disabled		: true,
									disabledClass	: 'x-item-disabled-fuxianwu',
									id				: 'helpdiv2'
								}]
					});

			// 刀片选择的Combo+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
			// 每页显示条数下拉选择框
			/*
			 * function nameaddmark(v, record) { return record.name + record.mark; }
			 */

			/*
			 * var pagesize_combo_iso = new Ext.form.ComboBox({ name : 'pagesize', triggerAction : 'all', mode : 'local', store : new Ext.data.ArrayStore({ fields : ['value', 'text'], data : [[10, '10
			 * 条/页'], [20, '20 条/页'], [50, '50 条/页'], [100, '100条/页'], [250, '250条/页'], [500, '500条/页']] }), valueField : 'value', displayField : 'text', value : '50', editable : false, width : 85 });
			 */
			// 工件材料状态数据
			var workpieceisotypeStore = new Ext.data.Store({
						proxy		: new Ext.data.HttpProxy({
									url	: 'cut.do?code=queryWorkpiecematerial'
								}),
						reader		: new Ext.data.JsonReader({
									totalProperty	: 'TOTALCOUNT',
									root			: 'ROOT'
								}, [{
											name	: 'workpiecematerialid'
										}, {
											name	: 'name'// ,convert: nameaddmark
										}, {
											name	: 'name2'
										}, {
											name	: 'mark'
										}, {
											name	: 'wmtype'
										}, {
											name	: 'heattreat'
										}, {
											name	: 'hardness'
										}]),
						baseParams	: {
							start	: 0,
							limit	: bbar.pageSize,
							query	: ''
						}
					});
			workpieceisotypeStore.load();

			// 行号
			var rownum_iso = new Ext.grid.RowNumberer({
						header	: '序',
						width	: 26
					});

			var workpieceisotypeCm = new Ext.grid.ColumnModel([rownum_iso, {
						header		: '工件材料',
						dataIndex	: 'name',
						width		: 100,
						sortable	: true
					}, {
						header		: '材料牌号ID',
						dataIndex	: 'workpiecematerialid',
						width		: 1,
						hidden		: true,
						sortable	: true
					}, {
						header		: '牌号-印记',
						dataIndex	: 'name2',
						width		: 1,
						hidden		: true,
						sortable	: true
					}, {
						header		: '印记',
						dataIndex	: 'mark',
						width		: 50,
						// align : 'center',
						sortable	: true
					}, {
						header		: '材料类型',
						dataIndex	: 'wmtype',
						width		: 100,
						sortable	: true
					}, {
						header		: '热处理状态',
						dataIndex	: 'heattreat',
						width		: 90,
						sortable	: true
					}, {
						header		: '硬度',
						dataIndex	: 'hardness',
						width		: 80,
						sortable	: true
					}]);

			// var resultTpl = new Ext.XTemplate('<tpl for="."><div
			// class="search-item">', '{name}', '</div></tpl>');

			var workpieceisotypeGrid = new Ext.grid.GridPanel({
						title			: '',
						region			: 'center',
						height			: 300,
						width			: 600,
						stripeRows		: true,
						// autoSizeColumns : true,
						trackMouseOver	: true,
						frame			: true,
						store			: workpieceisotypeStore,
						cm				: workpieceisotypeCm,
						sm				: new Ext.grid.RowSelectionModel({
									singleSelect	: true
								}),
						viewConfig		: {
							forceFit	: true
						},
						/*
						 * bbar : new Ext.PagingToolbar({ pageSize : bbar.pageSize, store : workpieceisotypeStore, displayInfo : true, displayMsg : '显示第 {0} 条到第 {1} 条,共 {2} 条', plugins : new
						 * Ext.ux.ProgressBarPager(), emptyMsg : "对不起,没有符合条件的记录!", items : ['-', '&nbsp;&nbsp;', pagesize_combo_iso] }),
						 */
						tbar			: [{
									xtype			: 'combo',
									id				: 'inputname_isotype',
									// hiddenName : 'workpiecematerialid',
									store			: workpieceisotypeStore,
									cls				: 'search',
									// name : 'filetitle',
									displayField	: 'name2',
									valueField		: 'workpiecematerialid',
									emptyText		: '工件材料牌号|印记',
									// loadingText : '正在加载数据，请稍候...',
									width			: 200,
									// pageSize: cln,
									selectOnFocus	: true,
									mode			: 'local',
									// itemSelector : 'div.search-item',
									typeAhead		: false,
									// tpl : resultTpl,
									// tpl : '<table><tr><tpl for="."><td
									// class="x-combo-list-item">{text}</td><tpl
									// if="xindex % 5 ===
									// 0"></tr><tr></tpl></tpl></tr></table>',
									hideTrigger		: true,
									enableKeyEvents	: true,
									maxHeight		: 0,
									plugins			: [new QM.plugin.PinyinFilter],
									// 响应回车键
									listeners		: {
										specialkey	: function(field, e) {
											if (e.getKey() == e.ENTER) {
												queryInfo_isotype();
											}
										},
										select		: function(record) {
											this.setValue(record.data.workpiecematerialid);
										},
										focus		: function() {
											workpieceisotypeCombo.setValue('');
										}
									}
								}, {
									text	: '确定',
									iconCls	: 'acceptIcon',
									handler	: function() {
										var r = workpieceisotypeGrid.getSelectionModel().getSelected();
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
									text	: '清空材料牌号',
									iconCls	: 'tbar_synchronizeIcon',
									handler	: function() {
										// selectMenu.suspendEvents();
										workpieceisotypeCombo.reset();
										selectMenu.hide();
										// selectMenu.resumeEvents();
										// var r = g.getSelectionModel().getSelected();

										// refreshBlade();
									}
								}],/*
									 * view : new Ext.ux.grid.BufferView({ rowHeight : 50, scrollDelay : true }),
									 */
						listeners		: {
							rowdblclick	: function(g, rowIndex, event) {
								selectMenu.hide();
								/*
								 * var r = g.getSelectionModel().getSelected(); workpieceisotypeCombo.setValue(r.get('workpiecematerialid')); workpieceisotypeCombo.setRawValue(r.get('name'));
								 * refreshBlade();
								 */
							},
							rowclick	: function(g, rowIndex, event) {
								var r = g.getSelectionModel().getSelected();
								workpieceisotypeCombo.setValue(r.get('workpiecematerialid'));
								workpieceisotypeCombo.setRawValue(r.get('name'));
							}
						}
					});

			// 查询表格数据
			function queryInfo_isotype() {
				workpieceisotypeCombo.collapse();
				selectMenu.hide();
				/*
				 * var va = Ext.getCmp('inputname_isotype').getRawValue(); workpieceisotypeCombo.setValue(Ext.getCmp('inputname_isotype').getValue()); workpieceisotypeCombo.setRawValue(va.substring(0,
				 * va.indexOf('-')));
				 */

				// refreshBlade();
				/*
				 * workpieceisotypeStore.load({ params : { start : 0, limit : bbar.pageSize, keyword : Ext.getCmp('inputname_isotype').getValue() } });
				 */
			}

			var selectMenu = new Ext.menu.Menu({
						items		: [workpieceisotypeGrid],
						listeners	: {
							hide	: function(m) {
								//alert(workpieceisotypeCombo.getValue());
								// infoMsg('sfgsfdg');
								turningtypeStoreLoad();
								BladewidthStoreLoad();
								CuttingradiusStoreLoad();
								cuttinghandStoreLoad();
								cuttingedgeStoreLoad();
								var r = workpieceisotypeGrid.getSelectionModel().getSelected();
								if (typeof r == 'undefined') {
									workpieceisotypeCombo.reset();
								} else {
									if (workpieceisotypeCombo.getValue() != "") {
										workpieceisotypeCombo.setValue(r.get('workpiecematerialid'));
										workpieceisotypeCombo.setRawValue(r.get('name'));
									}
								}
								refreshCutblade();
							}
						}
					});

			// 工件材料状态下拉框
			var workpieceisotypeCombo = new Ext.form.ComboBox({
						fieldLabel		: '工件材料牌号',
						hiddenName		: 'workpiecematerialid',
						triggerAction	: 'all',
						store			: new Ext.data.ArrayStore({
									fields	: ['name', 'name'],
									data	: [[]]
								}),
						displayField	: 'name',
						valueField		: 'workpiecematerialid',
						lazyRender		: true,
						editable		: false,
						emptyText		: '请选择...',
						loadingText		: '正在加载数据...',
						mode			: 'local',
						forceSelection	: true,
						onSelect		: Ext.emptyFn,
						// tpl : resultTpl2,
						// pageSize : cln,
						// minListWidth : 600,
						// plugins : [new QM.plugin.PinyinFilter],
						width			: document.body.clientWidth / numlign - divnum,
						listeners		: {
							expand	: function(field) {
								if (this.menu == null) {
									this.menu = selectMenu;
								}
								// workpieceisotypeStore.load();
								this.menu.show(this.el, "tl-bl?");
								// selectMenu.show();
								Ext.getCmp('inputname_isotype').focus(true, 500);
							}/*
								 * , focus : function(field) { if (this.menu == null) { this.menu = selectMenu; } //workpieceisotypeStore.load(); this.menu.show(this.el, "tl-bl?");
								 * //selectMenu.show(); Ext.getCmp('inputname_isotype').focus(true, 500); }
								 */
						}
					});
			// 车削类型数据
			var turningtypeStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : 'cut.do?code=queryTurningtypeInCutblade'
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [ {
					name : 'value'
				} 
					  , { name : 'text' }
					 ])
			});
			turningtypeStore.load();
			// 车削类型下拉框
			var turningtypeCombo = new Ext.form.ComboBox({
						fieldLabel		: '车削类型',
						hiddenName		: 'turningtype',
						id				: 'turningtypeidid',
						emptyText		: '请选择...',
						triggerAction	: 'all',
						store			: turningtypeStore,
						displayField	: 'text',
						valueField		: 'value',
						selectOnFocus	: true,
						loadingText		: '正在加载数据...',
						mode			: 'local',
						forceSelection	: true,
						lazyRender		: true,
						// pageSize : cln,
						// minListWidth : 270,
						plugins			: [new QM.plugin.PinyinFilter],
						resizable		: true,
						editable : false,
						width			: document.body.clientWidth / numlign - divnum,
						listWidth		: turningtypeArr[0] * turningtypepp + 20,
						tpl				: '<tpl for="."><div x-combo-list-item class="x-combo-list-item"><img src="' + webContext + '/dec/combo/cutblade/turningtype/' + '{value}' + '.png" width='
								+ turningtypeArr[0] * turningtypepp + ' height=' + turningtypeArr[1] * turningtypepp + '></div></tpl>',
						listeners		: {
							focus		: function() {
								setTimeout('Ext.getCmp("turningtypeidid").expand();', 1);
							},
							expand		: function(c) {
								// 车削类型过滤;
								c.getStore().filter([{
											property		: 'value',
											value			: '2',
											anyMatch		: false,
											caseSensitive	: false
										}, {
											fn	: function(record) {
												return record.get('value').substring(0, 1) == '2';
											}
										}]);
							},

							select		: function(c, r, index) {
								/*
								 * if(index == 3||index == 4) { Ext.getCmp('diametermaxlableid').show(); diametermaxCombo.show(); } else { Ext.getCmp('diametermaxlableid').hide();
								 * diametermaxCombo.reset(); diametermaxCombo.hide(); }
								 */
								turningtypeCombo2.setValue(c.getValue());
								BladewidthStoreLoad();
								CuttingradiusStoreLoad();
								cuttinghandStoreLoad();
								cuttingedgeStoreLoad();
								refreshCutblade();
								//alert(turningtypeCombo.getValue());
							},
							specialkey	: function(c, e) {
								if (e.getKey() == e.ESC) {
									c.reset();
									turningtypeCombo2.reset();
									refreshCutblade();
									// Ext.getCmp('borelableid').hide();
									// boreCombo.reset();
									// boreCombo.hide();
								}
							}
						}
					});

			
			// 切槽宽度半径
			var BladewidthStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : 'cut.do?code=querybladewidth'
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [ {
					name : 'value'
				} 
					  , { name : 'text' }
					 ])
			});
			BladewidthStore.load();
			
			// 切槽宽度下拉框
			var bladewidthCombo = new Ext.form.ComboBox({
						fieldLabel		: '切槽宽度',
						hiddenName		: 'bladewidth',
						id				: 'bladewidthidid',
						emptyText		: '请选择...',
						triggerAction	: 'all',
						store			: BladewidthStore,
						displayField	: 'text',
						valueField		: 'text',
						selectOnFocus	: true,
						loadingText		: '正在加载数据...',
						mode			: 'local',
						forceSelection	: true,
						// pageSize : cln,
						// minListWidth : 270,
						plugins			: [new QM.plugin.PinyinFilter],
						resizable		: true,
						width			: document.body.clientWidth / numlign - divnum,
						listeners		: {
							focus		: function() {
								// accuracyStore.load();
								setTimeout('Ext.getCmp("bladewidthidid").expand();', 1);
							},
							select		: function() {
								// bladewidthCombo.setValue(bladewidthCombo.getValue());
								CuttingradiusStoreLoad();
								cuttinghandStoreLoad();
								cuttingedgeStoreLoad();
								refreshCutblade();
								//alert(bladewidthCombo.getValue());
							},
							specialkey	: function(c, e) {
							if (e.getKey() == e.ESC) {
									c.reset();
									refreshCutblade();
								}if (e.getKey() == e.ENTER) {
						c.setValue(Ext.get('bladewidthidid').dom.value) ;
							refreshCutblade();
						}
							}
						}
					});
			
			
			// 最大切槽深度数据
			var CuttingdepthStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : 'cut.do?code=queryCuttingdepthInCutblade'
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [ {
					name : 'value'
				} 
					  , { name : 'text' }
					 ])
			});
			CuttingdepthStore.load();
			

			
			
			
			
			// 最大切槽深度下拉框
			var cuttingdepthCombo = new Ext.form.ComboBox({
						fieldLabel		: '切槽深度',
						hiddenName		: 'cuttingdepth',
						id				: 'cuttingdepthidid',
						emptyText		: '请选择...',
						triggerAction	: 'all',
						store			: CuttingdepthStore,
						displayField	: 'value',
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
						listeners : {
							focus		: function() {
								// cuttinghandStore.load();
								setTimeout('Ext.getCmp("cuttingdepthidid").expand();', 1);
							},
							select : function() {
								refreshCutblade();
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
									refreshCutblade();
								}if (e.getKey() == e.ENTER) {
						c.setValue(Ext.get('cuttingdepthidid').dom.value) ;
							refreshCutblade();
						}
							}
						}
					});
			
			
			
			
			
			
			// 刀尖圆弧半径
			var CuttingradiusStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : 'cut.do?code=querycuttingradius'
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [ {
					name : 'value'
				} 
					  , { name : 'text' }
					 ])
			});
			CuttingradiusStore.load();
			
			
			
			
			// 刀尖圆弧半径下拉框
			var cuttingradiusCombo = new Ext.form.ComboBox({
						fieldLabel		: '刀尖圆弧半径',
						hiddenName		: 'cuttingradius',
						id				: 'cuttingradiusidid',
						emptyText		: '请选择...',
						triggerAction	: 'all',
						store			: CuttingradiusStore,
						displayField	: 'text',
						valueField		: 'text',
						selectOnFocus	: true,
						loadingText		: '正在加载数据...',
						mode			: 'local',
						forceSelection	: true,
						// pageSize : cln,
						// minListWidth : 270,
						plugins			: [new QM.plugin.PinyinFilter],
						resizable		: true,
						width			: document.body.clientWidth / numlign - divnum,
						listeners		: {
							focus		: function() {
								// accuracyStore.load();
								setTimeout('Ext.getCmp("cuttingradiusidid").expand();', 1);
							},
							select		: function() {
								//alert(cuttingradiusCombo.getValue())
								// cuttingradiusCombo.setValue(cuttingradiusCombo.getValue());
								cuttinghandStoreLoad();
								cuttingedgeStoreLoad();
								refreshCutblade();
							},
							specialkey	: function(c, e) {
								if (e.getKey() == e.ESC) {
									c.reset();
									refreshCutblade();
								}if (e.getKey() == e.ENTER) {
						c.setValue(Ext.get('cuttingradiusidid').dom.value) ;
							refreshCutblade();
						}
							}
						}
					});
			
			
			// 刀片左右手
			var cuttinghandStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : 'cut.do?code=querycuttinghand'
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [ {
					name : 'value'
				} 
					  , { name : 'text' }
					 ])
			});
			cuttinghandStore.load();
			
			
			// 刀片左右手下拉框
			var cuttinghandCombo = new Ext.form.ComboBox({
						fieldLabel		: '刀片左右手',
						hiddenName		: 'cuttinghand',
						id				: 'cuttinghandidid',
						emptyText		: '请选择...',
						triggerAction	: 'all',
						store			: cuttinghandStore,
						displayField	: 'text',
						valueField		: 'value',
						selectOnFocus	: true,
						loadingText		: '正在加载数据...',
						mode			: 'local',
						forceSelection	: true,
						editable : false,
						// pageSize : cln,
						// minListWidth : 270,
						plugins			: [new QM.plugin.PinyinFilter],
						resizable		: true,
						width			: document.body.clientWidth / numlign - divnum,
						listWidth		: cuttinghandArr[0] * handoftoolpp + 5,
						// listAlign : ['tl-bl?', [6, 0]],
						tpl				: '<tpl for="."><div x-combo-list-item class="x-combo-list-item"><img src="' + webContext + '/dec/combo/cutblade/cuttinghand/' + '{value}' + '.png" width='
								+ cuttinghandArr[0] * cuttinghandpp + ' height=' + cuttinghandArr[1] * cuttinghandpp + '></div></tpl>',// 已修正
						listeners		: {
							focus		: function() {
								// cuttinghandStore.load();
								setTimeout('Ext.getCmp("cuttinghandidid").expand();', 1);
							},
							select		: function() {
								//alert(cuttinghandCombo.getValue());
								cuttingedgeStoreLoad();
								refreshCutblade();
							},
							specialkey	: function(c, e) {
								if (e.getKey() == e.ESC) {
									c.reset();
									refreshCutblade();
								}
							}
						}
					});
			
			// 切削刃数目
			var cuttingedgeStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : 'cut.do?code=querycuttingedge'
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [ {
					name : 'value'
				} 
					  , { name : 'text' }
					 ])
			});
			cuttingedgeStore.load();
			// 切削刃数目下拉框
			var cuttingedgeCombo = new Ext.form.ComboBox({
						fieldLabel		: '切削刃数目',
						hiddenName		: 'cuttingedge',
						id				: 'cuttingedgeidid',
						emptyText		: '请选择...',
						triggerAction	: 'all',
						store			: cuttingedgeStore,
						displayField	: 'value',
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
						listeners		: {
							focus		: function() {
								// accuracyStore.load();
								setTimeout('Ext.getCmp("cuttingedgeidid").expand();', 1);
							},
							select		: function() {
								// cuttingedgeCombo.setValue(cuttingedgeCombo.getValue());
								refreshCutblade();
                               // alert(cuttingedgeCombo.getValue());
							},
							specialkey	: function(c, e) {
								if (e.getKey() == e.ESC) {
									c.reset();
									refreshCutblade();
								}if (e.getKey() == e.ENTER) {
						c.setValue(Ext.get('cuttingedgeidid').dom.value) ;
							refreshCutblade();
						}
							}
						}
					});



			// 车削类型数据
			var turningtype2Store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : 'cut.do?code=queryTurningtypeInCuttoolholder'
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [ {
					name : 'value'
				} 
					  , { name : 'text' }
					 ])
			});
			turningtype2Store.load();
			
			// 车削类型下拉框
			var turningtypeCombo2 = new Ext.form.ComboBox({
						fieldLabel		: '车削类型',
						hiddenName		: 'turningtype',
						id				: 'turningtypeidid2',
						emptyText		: '请选择...',
						triggerAction	: 'all',
						store			: turningtype2Store,
						displayField	: 'text',
						valueField		: 'value',
						selectOnFocus	: true,
						loadingText		: '正在加载数据...',
						mode			: 'local',
						forceSelection	: true,
						lazyRender		: true,
						editable : false,
						// pageSize : cln,
						// minListWidth : 270,
						plugins			: [new QM.plugin.PinyinFilter],
						resizable		: true,
						width			: document.body.clientWidth / numlign - divnum,
						listWidth		: turningtypeArr[0] * turningtypepp + 20,
						tpl				: '<tpl for="."><div x-combo-list-item class="x-combo-list-item"><img src="' + webContext + '/dec/combo/cuttoolholder/turningtype/' + '{value}'
								+ '.png" width=' + turningtypeArr[0] * turningtypepp + ' height=' + turningtypeArr[1] * turningtypepp + '></div></tpl>',
						listeners		: {
							focus		: function() {
								setTimeout('Ext.getCmp("turningtypeidid2").expand();', 1);
							},
							expand		: function(c) {
								// 车削类型过滤;
								c.getStore().filter([{
											property		: 'value',
											value			: '2',
											anyMatch		: false,
											caseSensitive	: false
										}, {
											fn	: function(record) {
												return record.get('value').substring(0, 1) == '2';
											}
										}]);
							},
							select		: function(c, r, index) {
								if (index == 6|| index==5) {
									Ext.getCmp('s_cutdiameterlableid').show();
									Ext.getCmp('cutdiameterlableid').show();
									cutdiameterCombo.show();
									Ext.getCmp('s_diametermaxlableid').hide();
									Ext.getCmp('diametermaxlableid').hide();
									diametermaxCombo.reset();
									diametermaxCombo.hide();
								} else if (index == 3 || index == 4) {
									Ext.getCmp('s_diametermaxlableid').show();
									Ext.getCmp('diametermaxlableid').show();
									diametermaxCombo.show();
									Ext.getCmp('s_cutdiameterlableid').hide();
									Ext.getCmp('cutdiameterlableid').hide();
									cutdiameterCombo.reset();
									cutdiameterCombo.hide();
								} else {
								
									Ext.getCmp('s_diametermaxlableid').hide();
									Ext.getCmp('diametermaxlableid').hide();
									diametermaxCombo.reset();
									diametermaxCombo.hide();
									Ext.getCmp('s_cutdiameterlableid').hide();
									Ext.getCmp('cutdiameterlableid').hide();
									cutdiameterCombo.reset();
									cutdiameterCombo.hide();
								}
								// toolholderCm.getColumnHeader().getById('bore')
								turningtypeCombo.setValue(c.getValue());
								Cuttingdepth2StoreLoad();
								handoftoolStoreLoad();
								portsizeStoreLoad();
								refreshCuttoolholder();
								//alert(turningtypeCombo2.getValue());
							},
							specialkey	: function(c, e) {
								if (e.getKey() == e.ESC) {
									c.reset();
									turningtypeCombo.reset();
									refreshCuttoolholder();
									// Ext.getCmp('borelableid').hide();
									// boreCombo.reset();
									// boremaxCombo.hide();
								}
							}
						}
					});
			// 刀体最大切槽深度数据
			var Cuttingdepth2Store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : 'cut.do?code=queryCuttingdepthInCuttoolholder'
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [ {
					name : 'value'
				} 
					  , { name : 'text' }
					 ])
			});
			Cuttingdepth2Store.load();
			// 切槽深度下拉框
			var cuttingdepthCombo2 = new Ext.form.ComboBox({
						fieldLabel		: '切槽深度',
						hiddenName		: 'cuttingdepth',
						id				: 'cuttingdepthidid2',
						emptyText		: '请选择...',
						triggerAction	: 'all',
						store			: Cuttingdepth2Store,
						displayField	: 'value',
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
						listeners		: {
							focus		: function() {
								// accuracyStore.load();
								setTimeout('Ext.getCmp("cuttingdepthidid2").expand();', 1);
							},
							select		: function(c, r, index) {
								// cuttingdepthCombo2.setValue(cuttingdepthCombo2.getValue());
								cuttingdepthCombo.setValue(c.getValue());
								portsizeStoreLoad();
								handoftoolStoreLoad();
								refreshCuttoolholder();
								//alert(cuttingdepthCombo2.getValue());
							},
							specialkey	: function(c, e) {
								if (e.getKey() == e.ESC) {
									c.reset();
									refreshCuttoolholder();
								}
							}
						}
					});
			// 接口规格数据
			var portsizeStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : 'cut.do?code=queryportsizeInCuttoolholder'
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [ {
					name : 'value'
				} 
					  , { name : 'text' }
					 ])
			});
			portsizeStore.load();
			// 接口规格下拉框
			var portsizeCombo = new Ext.form.ComboBox({
						fieldLabel		: '接口规格',
						hiddenName		: 'portsize',
						id				: 'portsizeidid',
						emptyText		: '请选择...',
						triggerAction	: 'all',
						store			: portsizeStore,
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
						listWidth		: portsizeArr[0] * 2 * portsizepp + 40,
						tpl				: '<table><tr><tpl for="."><td class="x-combo-list-item"><img src="' + webContext + '/dec/combo/cuttoolholder/portsize/' + '{value}' + '.png' + '" width='
								+ portsizeArr[0] * portsizepp + ' height=' + portsizeArr[1] * portsizepp + '/></td><tpl if="xindex % 2 === 0"></tr><tr></tpl></tpl></tr></table>',
						listeners		: {
							focus		: function() {
								// portsizeStore.load();
								setTimeout('Ext.getCmp("portsizeidid").expand();', 1);
							},
							select		: function() {
								handoftoolStoreLoad();
								refreshCuttoolholder();
								//alert(portsizeCombo.getValue());
							},
							specialkey	: function(c, e) {
								if (e.getKey() == e.ESC) {
									c.reset();
									refreshCuttoolholder();
								}
							}
						}
					});
			// 刀具方向数据
			var handoftoolStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : 'cut.do?code=queryhandoftoolInCuttoolholder'
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [ {
					name : 'value'
				} 
					  , { name : 'text' }
					 ])
			});
			handoftoolStore.load();
			// 刀具方向下拉框
			var handoftoolCombo = new Ext.form.ComboBox({
						fieldLabel		: '刀具方向',
						hiddenName		: 'handoftool',
						id				: 'handoftoolidid',
						emptyText		: '请选择...',
						triggerAction	: 'all',
						store			: handoftoolStore,
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
						listWidth		: handoftoolArr[0] * handoftoolpp + 5,
						// listAlign : ['tl-bl?', [6, 0]],
						tpl				: '<tpl for="."><div x-combo-list-item class="x-combo-list-item"><img src="' + webContext + '/dec/combo/cuttoolholder/handoftool/' + '{value}' + '.png" width='
								+ handoftoolArr[0] * handoftoolpp + ' height=' + handoftoolArr[1] * handoftoolpp + '></div></tpl>',// 已修正
						listeners		: {
							focus		: function() {
								// handoftoolStore.load();
								setTimeout('Ext.getCmp("handoftoolidid").expand();', 1);
							},
							select		: function() {
								refreshCuttoolholder();
								//alert(handoftoolCombo.getValue());
							},
							specialkey	: function(c, e) {
								if (e.getKey() == e.ESC) {
									c.reset();
									refreshCuttoolholder();
								}
							}
						}
					});

			// 刀柄类型下拉框
			var handletypeCombo = new Ext.form.ComboBox({
						fieldLabel		: '刀柄类型',
						hiddenName		: 'handletype',
						id				: 'handletypeidid',
						emptyText		: '请选择...',
						triggerAction	: 'all',
						store			: HANDLETYStore,
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
						listWidth		: handletypeArr[0] * handletypepp + 20,
						// listAlign : ['tl-bl?', [6, 0]],
						tpl				: '<tpl for="."><div x-combo-list-item class="x-combo-list-item"><img src="' + webContext + '/dec/combo/cuttoolholder/handletype/' + '{value}' + '.png" width='
								+ handletypeArr[0] * handletypepp + ' height=' + handletypeArr[1] * handletypepp + '></div></tpl>',// 已修正
						listeners		: {
							focus		: function() {
								// handoftoolStore.load();
								setTimeout('Ext.getCmp("handletypeidid").expand();', 1);
							},
							select		: function() {
								refreshCuttoolholder();
							},
							specialkey	: function(c, e) {
								if (e.getKey() == e.ESC) {
									c.reset();
									refreshCuttoolholder();
								}
							}
						}
					});
			
			
			var cutdiameterCombo = new Ext.form.TextField({ 
				fieldLabel : '切槽直径', 
				hiddenName		: 'cutdiameterid',
				id				: 'cutdiameterid',
				emptyText		: '请输入',
				hidden			: true,
				triggerAction	: 'all',
				listeners		: {
					specialkey	: function(c, e) {
						if (e.getKey() == e.ENTER) {
							refreshCuttoolholder();
							//alert(cutdiameterCombo.getValue());
						}
					}
				}
				}); 
			
			
			
			var diametermaxStore = new Ext.data.Store({
				proxy		: new Ext.data.HttpProxy({
							url	: 'cut.do?code=querydiametermax2'
						}),
				reader		: new Ext.data.JsonReader({
							totalProperty	: 'TOTALCOUNT',
							root			: 'ROOT'
						}, [{
									name	: 'diametermax'
								}])
				
			});
			
			diametermaxStore.load();
			
			
			
					// 切槽孔径下拉框
			var diametermaxCombo = new Ext.form.ComboBox({
						fieldLabel		: '切槽孔径',
						hiddenName		: 'diametermax',
						id				: 'diametermaxid',
						emptyText		: '请选择...',
						hidden			: true,
						triggerAction	: 'all',
						store			: diametermaxStore,
						displayField	: 'diametermax',
						valueField		: 'diametermax',
						selectOnFocus	: true,
						loadingText		: '正在加载数据...',
						mode			: 'local',
						forceSelection	: false,
						typeAhead		: true,
						//cls				: 'greatthan',
						enableKeyEvents	: true,
						// pageSize : cln,
						// minListWidth : 270,
						plugins			: [new QM.plugin.PinyinFilter],
						resizable		: true,
						editable		: true,
						width			: document.body.clientWidth / numlign - divnum,
						listeners		: {
							focus		: function() {
								setTimeout('Ext.getCmp("diametermaxid").expand();', 1);
							},
							afterrender	: function(c) {
								c.setValue('');
							},
							select		: function() {
								refreshCuttoolholder();
								//alert(diametermaxCombo.getValue());
							},/*
								 * expand : function(c) { //c.addClass('greatthan'); //c.setHideTrigger(true); //c.syncSize(); }, collapse : function(c) { //c.removeClass('greatthan');
								 * //c.setHideTrigger(false); //c.syncSize(); },
								 */
							specialkey	: function(c, e) {
								if (e.getKey() == e.ESC) {
									c.reset();
									refreshCuttoolholder();
								}
							}
						}
					});

			// 表格工具栏
			/*
			 * var tbar = new Ext.Toolbar({//workpiecematerialCombo //workpieceisotypeCombo heigth : 40, buttonAlign : 'left', items : [{ text : '请选择工件材料状态:', height : 20, width :
			 * document.body.clientWidth / numlign - divnum }, '-', '-', { text : '请选择加工精度:', width : document.body.clientWidth / numlign - divnum }, '-', '-', { text : '请选择刀片形状:', width :
			 * document.body.clientWidth / numlign - divnum }, '-', '-', { text : '请选择刀片尺寸:', width : document.body.clientWidth / numlign - divnum }, '-', '-', { text : '请选择刀片后角:', width :
			 * document.body.clientWidth / numlign - divnum }, '-', '-', { text : '请选择刀尖圆弧半径:', width : document.body.clientWidth / numlign - divnum }] } );
			 */

			var tbar = new Ext.Toolbar({// workpiecematerialCombo             
				// //workpieceisotypeCombo
				items	: [new Ext.Toolbar.TextItem({
									text		: '工件材料:',
									autoHeight	: true
								}), workpieceisotypeCombo, '-', new Ext.Toolbar.TextItem({
									text		: '车削类型:',
									autoHeight	: true
								}), turningtypeCombo, '-', new Ext.Toolbar.TextItem({
									text		: '切槽宽度:',
									autoHeight	: true
								}), bladewidthCombo, '-', /*new Ext.Toolbar.TextItem({
									text		: '最大切槽深度:',
									autoHeight	: true
								}), cuttingdepthCombo, '-',*/ new Ext.Toolbar.TextItem({
									text		: '刀尖圆弧半径:',
									autoHeight	: true
								}), cuttingradiusCombo, '-', new Ext.Toolbar.TextItem({
									text		: '刀片左右手:',
									autoHeight	: true
								}), cuttinghandCombo, '-', new Ext.Toolbar.TextItem({
									text		: '切削刃数目:',
									autoHeight	: true
								}), cuttingedgeCombo,'-', '-', {
									text : '打印预览',
									iconCls : 'previewIcon',
									handler : function() {
										printTask();
									}
								}, '->', {
							text	: '重置',
							iconCls	: 'tbar_synchronizeIcon',
							handler	: function() {
								resetCombo();
							}
						}]
			});

			// 页面过滤
			var filtersCutblade = new Ext.ux.grid.GridFilters({// string,numeric,date,list,boolean
				encode		: true,
				autoReload	: false,
				local		: true,
				filters		: [{
							dataIndex	: 'sapcode',
							type		: 'string'
						}, {
							dataIndex	: 'name',
							type		: 'string'
						}, {
							dataIndex	: 'bladetype',
							type		: 'string'
						}, {
							dataIndex	: 'figure',
							type		: 'string'
						}, {
							dataIndex	: 'figure2',
							type		: 'string'
						}, {
							dataIndex	: 'turningtype',
							type		: 'string'
						}, {
							dataIndex	: 'bladematerialname',
							type		: 'string'
						}, {
							dataIndex	: 'cutgroovename',
							type		: 'string'
						}, {
							dataIndex	: 'cutbladematerialname',
							type		: 'string'
						}, {
							dataIndex	: 'cutbladebrandname',
							type		: 'string'
						},  {
							dataIndex	: 'bladebrandname',
							type		: 'string'
						},  {
							dataIndex	: 'cuttinghand',
							type		: 'string'
						}, {
							dataIndex	: 'cuttingedge',
							type		: 'string'
						}, {
							dataIndex	: 'bladewidth',
							type		: 'string'
						}, {
							dataIndex	: 'mainangle',
							type		: 'string'
						}, {
							dataIndex	: 'reliefangle',
							type		: 'numeric'
						}, {
							dataIndex	: 'sidereliefangle',
							type		: 'string'
						}, {
							dataIndex	: 'cuttingdepth',
							type		: 'string'
						}, {
							dataIndex	: 'cuttingradius',
							type		: 'string'
						}, {
							dataIndex	: 'description',
							type		: 'string'
						}, {
							dataIndex	: 'featurecode',
							type		: 'string'
						}, {
							dataIndex	: 'apmax',
							type		: 'numeric'
						}, {
							dataIndex	: 'apmin',
							type		: 'numeric'
						}, {
							dataIndex	: 'fnxmax',
							type		: 'numeric'
						}, {
							dataIndex	: 'fnxmin',
							type		: 'numeric'
						},{
							dataIndex	: 'fnzmax',
							type		: 'numeric'
						}, {
							dataIndex	: 'fnzmin',
							type		: 'numeric'
						},  {
							dataIndex	: 'remark',
							type		: 'string'
						}
				/*
				 * { type : 'list', dataIndex : 'size', options : ['extra small', 'small', 'medium', 'large', 'extra large'] }
				 */]
			});

			// 页面过滤
			var filtersCuttoolholder = new Ext.ux.grid.GridFilters({// string,numeric,date,list,boolean
				encode		: true,
				autoReload	: false,
				local		: true,
				filters		: [{
							dataIndex	: 'sapcode',
							type		: 'string'
						}, {
							dataIndex	: 'name',
							type		: 'string'
						}, {
							dataIndex	: 'toolholdertype',
							type		: 'string'
						}, {
							dataIndex	: 'cuttoolholderbrandname',
							type		: 'string'
						}, {
							dataIndex	: 'turningtype',
							type		: 'string'
						}, {
							dataIndex	: 'figure',
							type		: 'string'
						}, {
							dataIndex	: 'figure2',
							type		: 'string'
						}, {
							dataIndex	: 'handletype',
							type		: 'string'
						}, {
							dataIndex	: 'portsize',
							type		: 'string'
						}, {
							dataIndex	: 'handoftool',
							type		: 'string'
						}, {
							dataIndex	: 'featurecode',
							type		: 'string'
						}, {
							dataIndex	: 'cutwidthmax',
							type		: 'string'
						}, {
							dataIndex	: 'cutwidthmin',
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
							dataIndex	: 'cuttingdepth',
							type		: 'numeric'
						}, {
							dataIndex	: 'diametermax',
							type		: 'numeric'
						}, {
							dataIndex	: 'cutdiametermax',
							type		: 'numeric'
						}, {
							dataIndex	: 'cutdiametermin',
							type		: 'numeric'
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
							dataIndex	: 'remark',
							type		: 'string'
						}
				/*
				 * { type : 'list', dataIndex : 'size', options : ['extra small', 'small', 'medium', 'large', 'extra large'] }
				 */]
			});

			// 表格
			var grid = new Ext.grid.GridPanel({
						title		: '<span class="commoncss">刀片选择</span>',
						header		: false,
						height		: 500,
						id			: 'gridid',
						autoScroll	: true,
						frame		: true,
						region		: 'center',
						store		: cutbladeStore,
						stripeRows	: true,
						sm			: sm,
						cm			: cutbladeCm,
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
						plugins		: [filtersCutblade],
						stateful	: true,
						stateId		: 'grid-cut-cutblade',
						listeners	: {
							afterrender	: function() {
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
			 * var tbar2 = new Ext.Toolbar({ items : [turningtypeCombo, '-', '-', thheadangleCombo, '-', '-', handoftoolCombo, '-', '-', shapeCombo2, '-', '-', reliefangleCombo2, '-', '-',
			 * portsizeCombo, '-', '-', cseriesCombo, '->', { text : '重置', iconCls : 'tbar_synchronizeIcon', handler : function() { resetCombo2(); } }] });
			 */

			var tbar2 = new Ext.Toolbar({// workpiecematerialCombo              
				// //workpieceisotypeCombo
				items	: [new Ext.Toolbar.TextItem({
									text		: '车削类型:',
									autoHeight	: true
								}), turningtypeCombo2, '-', new Ext.Toolbar.TextItem({
									text		: '切槽深度:',
									autoHeight	: true
								}), cuttingdepthCombo2, '-', new Ext.Toolbar.TextItem({
									text		: '接口规格:',
									autoHeight	: true
								}), portsizeCombo, '-', new Ext.Toolbar.TextItem({
									text		: '刀具方向:',
									autoHeight	: true
								}), handoftoolCombo, '-', /*new Ext.Toolbar.TextItem({
									text		: '刀柄类型:',
									autoHeight	: true
								}), handletypeCombo,*/ '-',
								new Ext.Toolbar.Separator({
									id : 's_diametermaxlableid',
									hidden : true
								}),
								new Ext.Toolbar.TextItem({
									text		: '切槽孔径:',
									id			: 'diametermaxlableid',
									hidden : true,
									autoHeight	: true
								}), diametermaxCombo,
								new Ext.Toolbar.Separator({
									id : 's_cutdiameterlableid',
									hidden : true
								}), new Ext.Toolbar.TextItem({
									text : '切槽直径:',
									id : 'cutdiameterlableid',
									hidden : true,
									autoHeight : true
								}), cutdiameterCombo,'-', '-', {
									text : '打印预览',
									iconCls : 'previewIcon',
									handler : function() {
										printTask2();
									}
								},
								
								'->',{
							text	: '重置',
							iconCls	: 'tbar_synchronizeIcon',
							handler	: function() {
								resetCombo2();
							}
						}]
			});

			// 表格
			var grid2 = new Ext.grid.GridPanel({
						title		: '<span class="commoncss">刀体选择</span>',
						header		: false,
						height		: 500,
						id			: 'grid2id',
						autoScroll	: true,
						frame		: true,
						region		: 'center',
						store		: cuttoolholderStore,
						stripeRows	: true,
						sm			: sm2,
						cm			: cuttoolholderCm,
						tbar		: tbar2,
						bbar		: bbar2,
						viewConfig	: {
							forceFit	: false
							// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
						},
						loadMask	: {
							msg	: '正在加载表格数据,请稍等...'
						},
						view		: new Ext.grid.GroupingView(),
						plugins		: [filtersCuttoolholder],
						stateful	: true,
						stateId		: 'grid-cut-cuttoolholder'
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
			cutbladeStore.load({
						params	: {
							start	: 0,
							limit	: bbar.pageSize
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
			 * toolholderStore.load({ params : { start : 0, limit : bbar2.pageSize } });
			 */

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
									text	: '刷新',
									iconCls	: 'arrow_refreshIcon',
									handler	: function() {
										cutbladeStore.reload();
									}
								}, {
									text	: '重置',
									iconCls	: 'tbar_synchronizeIcon',
									handler	: function() {
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

			grid.on("contextmenu", function(e) {// cellcontextmenu //rowcontextmenu
						e.preventDefault();
					});

			// 表格右键
			var contextmenu2 = new Ext.menu.Menu({
						id		: 'theContextMenu2',
						items	: [{
									text	: '复制',
									iconCls	: 'buildingIcon',
									handler	: function() {
										copyCell2();
									}
								}, '-', {
									text	: '刷新',
									iconCls	: 'page_refreshIcon',
									handler	: function() {
										cuttoolholderStore.reload();
									}
								}, {
									text	: '重置',
									iconCls	: 'tbar_synchronizeIcon',
									handler	: function() {
										resetCombo2();
									}
								}]
					});

			// 复制
			function copyCell2() {
				copyToClipboard(infoCell2);
			}

			// 绑定右键
			var infoCell2;
			grid2.on("cellcontextmenu", function(grid2, rowIndex, columnIndex, e) {// cellcontextmenu
						// //rowcontextmenu
						e.preventDefault();
						grid2.getSelectionModel().selectRow(rowIndex);

						var record2 = grid2.getStore().getAt(rowIndex); // 获取record
						var fieldName2 = grid2.getColumnModel().getDataIndex(columnIndex);// 当前列的fieldname
						infoCell2 = record2.get(fieldName2);// 获取当前单元格数据

						contextmenu2.showAt(e.getXY());
					});

			grid2.on("contextmenu", function(e) {// cellcontextmenu //rowcontextmenu
						e.preventDefault();
					});

			var tabs = new Ext.TabPanel({
						region			: 'center',
						id				: 'tabsid',
						enableTabScroll	: true,
						// autoWidth : true,
						activeTab		: 0,
						height			: document.body.clientHeight,
						width			: document.body.clientWidth,
						buttonAlign		: 'right',
						items			: [grid, grid2],
						listeners		: {
							tabchange	: function(tabpanel, tab) {
								/*
								 * if (tab.getId() == 'gridid') {//激活了刀体grid; refreshBladeForce(); } else if(tab.getId() == 'grid2id') { refreshToolholderForce(); }
								 */
								if (tabpanel.getActiveTab().getId() == 'gridid') {
									 workpieceisotypeStoreLoad();
									 turningtypeStoreLoad();
									 BladewidthStoreLoad();
									 CuttingradiusStoreLoad();
									 cuttinghandStoreLoad();
									 cuttingedgeStoreLoad();
									// 激活了刀体grid;
									// refreshBladeForce();
									// bladeStore.reload();
									// var record = grid2.getSelectionModel().getSelected();
									var records = grid2.getSelectionModel().getSelections();

									if (records.length == 0) {
										cutbladeStoreLoad();
									} else {
										if (records.length > 1) {
											infoMsg('您选择了 ' + records.length + ' 个条目，选择单个条目会获得准确匹配。');
										}

										// grid.getSelectionModel().selectRow(grid.getSelectionModel().last,
										// false);
										cutbladeStore.load({
													params	: {
														start		: bbar.pageSize * (grid.getBottomToolbar().getPageData().activePage - 1),
														limit		: bbar.pageSize,
														featurecode	: jsArray2JsString(records, 'featurecode')
													}
												});
									}
								
									
								} else if (tabpanel.getActiveTab().getId() == 'grid2id') {
									 turningtype2StoreLoad();
									 Cuttingdepth2StoreLoad();
									 portsizeStoreLoad();
									 handoftoolStoreLoad();
									
									
									
									// toolholderStore.reload();
									// refreshToolholderForce();
									// var record =
									// grid.getSelectionModel().getSelected();
									var records = grid.getSelectionModel().getSelections();

									if (records.length == 0) {
										cuttoolholderStoreLoad();
									} else {
										if (records.length > 1) {
											infoMsg('您选择了 ' + records.length + ' 个条目，选择单个条目会获得准确匹配。');
										}

										// grid.getSelectionModel().selectRow(grid.getSelectionModel().last,
										// false);
										cuttoolholderStore.load({
													params	: {
														start		: bbar2.pageSize * (grid2.getBottomToolbar().getPageData().activePage - 1),
														limit		: bbar2.pageSize,
														featurecode	: jsArray2JsString(records, 'featurecode')
													}
												});
									}
								
								}
							}
						}
					});

			// 布局模型
			var viewport = new Ext.Viewport({
						layout	: 'border',
						items	: [tabs]
					});

			// 刷新刀片
			function refreshCutblade() {
				if (parent.grf == true) {
					refreshCutbladeForce();
				}
			}

			// 刷新刀片
			function refreshCutbladeForce() {
				cutbladeStoreLoad();
			}

			// 刷新刀体
			function refreshCuttoolholder() {
				if (parent.grf == true) {
					refreshCuttoolholderForce();
				}
			}

			function refreshCuttoolholderForce() {
				cuttoolholderStoreLoad();
			}

			// 更新
			function resetCombo() {

				workpieceisotypeCombo.reset();
			
				turningtypeCombo.setValue('');
				bladewidthCombo.reset();
				cuttingdepthCombo.reset();
			

				cuttingradiusCombo.reset();
			

				cuttinghandCombo.reset();
				cuttingedgeCombo.reset();

				turningtypeCombo2.setValue('');
				cuttingdepthCombo2.setValue('');
				
				workpieceisotypeStoreLoad();
				turningtypeStoreLoad();
				BladewidthStoreLoad();
				CuttingradiusStoreLoad();
				cuttinghandStoreLoad();
				cuttingedgeStoreLoad();
				
				pagesize_combo.reset();
				bbar.pageSize=50;
				cutbladeStoreLoad();
				var currentpage=1;
				var currentpage=bbar.store.currentPage;
				bbar.moveFirst();
			}

			// 更新
			function resetCombo2() {

				/*turningtypeCombo2.setValue('');*/
				turningtypeCombo2.reset();
				/*cuttingdepthCombo2.setValue('');*/
				cuttingdepthCombo2.reset();
				portsizeCombo.reset();
				handoftoolCombo.reset();
				handletypeCombo.reset();
				diametermaxCombo.reset();
      
				turningtypeCombo.setValue('');
				cuttingdepthCombo.reset();
				cutdiameterCombo.reset();
				
				turningtype2StoreLoad();
				Cuttingdepth2StoreLoad();
				portsizeStoreLoad();
				handoftoolStoreLoad();
				
				cutdiameterCombo.hide();
				Ext.getCmp('cutdiameterlableid').hide();
				diametermaxCombo.hide();
				Ext.getCmp('diametermaxlableid').hide();
				pagesize_combo2.reset();
				bbar2.pageSize=50;
				cuttoolholderStoreLoad();
				var currentpage=1;
				var currentpage=bbar2.store.currentPage;
				bbar2.moveFirst();
			}

			
			
			// 刀片数据动态加载
			function dataLoadDynamic(pictureTabs, cuttingparameter,cuttoolholderPanel,cuttoolholderStorePanel,parameterStore,sapPanel,sapStore) {
				var record = grid.getSelectionModel().getSelected();
				
				if (pictureTabs.getActiveTab().getItemId() == 'cuttoolholderPanelid') {
					cuttoolholderStorePanel.load({
								params : {
									featurecode : record.data.featurecode
								}
							});
				} else if (pictureTabs.getActiveTab().getItemId() == 'ctparameterid') {
					parameterStore.load({
						params : {
								workpiecematerialid : workpieceisotypeCombo.getValue(),
									bladematerialid : record.data.bladematerialid,
									bladetype : record.data.bladetype
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
							
							name : record.data.cutbladebrandname
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
				
					cm : cutbladeCm,
				
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
							url : 'cut.do?code=querycutgroove'
								
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
							
							name : record.data.cutgroovename
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
							url : 'cut.do?code=querycutbladematerial'
								
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
							
							name : record.data.cutbladematerialname
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
							title				: '刀片详情',
							border				: true,
							autoSort			: false,
							frame				: true,
							ds					: cutbladeStore,
							cm					: cutbladeCm,
							id					: 'propertyGridid',
							enableColLock		: true,
							enableColumnMove	: false,
							autoExpandColumn	: true,
							loadMask			: true,
							stripeRows			: true,
							autoScroll			: true,
							clicksToEdit		: 1,
							propertyNames		: {
								'cutbladeid'		: '刀片ID',
								'sapcode'			: 'SAP编码',
								'name'				: '刀片名称',
								'bladetype'			: '刀片型号',
								'figure'			: '结构简图',
								'figure2'			: '尺寸简图',
								'turningtype'		: '车削类型',
								'bladematerialname'	: '刀片材质',
								'cutbladematerialname'	: '刀片材质',
					//			'bladematerialid' : '刀片材质ID',
								'groovename'		: '槽型',
								'cutgroovename'			: '槽型',
								'bladebrandname'	: '刀片品牌',
								'cutbladebrandname'			: '刀片品牌',
								'cuttinghand'		: '刀片左右手',
								'cuttingedge'		: '切削刃数目',
								'bladewidth'		: '刀片宽度',
								'mainangle'			: '主偏角',
								'reliefangle'		: '刀片后角',
								'sidereliefangle'	: '刀片侧后角',
								'cuttingdepth'		: '最大切槽深度',
								'cuttingradius'		: '圆角半径',
								'description'		: '特征描述',
								'featurecode'		: '刀片特征码',
								'priority'			: '刀片优先级',
								'apmax'				: '最大切削深度',
								'apmin'				: '最小切削深度',
								'fnzmax'				: '最大轴向进给',
								'fnzmin'				: '最小轴向进给',
								'fnxmax'				: '最大径向进给',
								'fnxmin'				: '最小径向进给',
								'remark'			: '备注'
							},
							customEditors		: {
								'turningtype'	: new Ext.grid.GridEditor(new Ext.form.ComboBox({
											displayField	: 'text',
											mode			: 'local',
											triggerAction	: 'all',
											store			: TURNINGTYPEStore
										})),
								'cuttingedge'	: new Ext.grid.GridEditor(new Ext.form.ComboBox({
											displayField	: 'text',
											mode			: 'local',
											triggerAction	: 'all',
											store			: CUTTINGEDGEStore
										})),
								'mainangle'		: new Ext.grid.GridEditor(new Ext.form.ComboBox({
											displayField	: 'text',
											mode			: 'local',
											triggerAction	: 'all',
											store			: MAINANGLEStore
										})),
								'reliefangle'	: new Ext.grid.GridEditor(new Ext.form.ComboBox({
											displayField	: 'text',
											mode			: 'local',
											triggerAction	: 'all',
											store			: RELIEFANGLEStore
										}))
							},
							customRenderers		: {
				// 'turningtype' : TURNINGTYPERender,
							// 'cuttingedge' : CUTTINGEDGERender,
							// 'mainangle' : MAINANGLERender,
							// 'reliefangle' : RELIEFANGLERender,
							// 'cuttingradius' : CUTTINGRADIUSRender
							},
							listeners			: {
								
								
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
								
								beforeedit	: function(e) {
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
						//'workpiecematerialname' : '工件材料代码',
						//'bladematerialname' : '刀片材质',
						'vcmax' : '最大切削速度 m/min',
						'vcmin' : '最小切削速度 m/min',
						'apmax':'最大径向切深 mm',
						'apmin' : '最小径向切深 mm',
						'fnxmax' : '最大径向进给 mm/r',
						'fnxmin' : '最小径向进给 mm/r',
						'fnzmax' : '最大轴向进给 mm/r',
						'fnzmin' : '最小轴向进给 mm/r'
						'axmax' : '最大轴向进给 mm/r',
						'axmin' : '最小轴向进给 mm/r'
					},
					listeners : {
						beforeedit : function(e) {
							e.cancel = true;
							return false;
						}
					}
				});*/
				// Store数据存储
		var parameterStore = new Ext.data.GroupingStore({
					proxy : new Ext.data.HttpProxy({
						url : 'cut.do?code=queryCtparameter'
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
										name : 'fnzmax'
									}, {
										name : 'fnzmin'
									}, {
										name : 'fnxmax'
									}, {
										name : 'fnxmin'
									},{
										name : 'vcmax'
									}, {
										name : 'vcmin'
									}])
				});
				// 列模型
		var parameterCm = new Ext.grid.ColumnModel([{
			header : 'Vc max<br />(m/min)',
			dataIndex : 'vcmax',
			width : 50,
			align : 'center',
			// hidden : true,
			sortable : true
		}, {
			header : 'Vc min<br />(m/min)',
			dataIndex : 'vcmin',
			width : 50,
			align : 'center',
			// hidden : true,
			sortable : true
		},{
					header : 'Apz<br />(mm)',
					dataIndex : 'apmax',
					width : 50,
					align : 'center',
					// renderer : THICKNESS2Render,
					// hidden : true,
					sortable : true
				}, {
					header : 'Apx<br />(mm)',
					dataIndex : 'apmin',
					width : 50,
					align : 'center',
					// hidden : true,
					sortable : true
				}, {
					header : 'Fnz max<br />(mm/r)',
					dataIndex : 'fnzmax',
					width : 50,
					align : 'center',
					// renderer : THICKNESS2Render,
					// hidden : true,
					sortable : true
				}, {
					header : 'Fnz min<br />(mm/r)',
					dataIndex : 'fnzmin',
					width : 50,
					align : 'center',
					// hidden : true,
					sortable : true
				}, {
					header : 'Fnx max<br />(mm/r)',
					dataIndex : 'fnxmax',
					width : 50,
					align : 'center',
					// renderer : THICKNESS2Render,
					// hidden : true,
					sortable : true
				}, {
					header : 'Fnx min<br />(mm/r)',
					dataIndex : 'fnxmin',
					width : 50,
					align : 'center',
					// hidden : true,
					sortable : true
				}]);
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
					title		: '结构简图',
					 id : 'picturePanelid',
					autoScroll	: true,
					frame		: true,
					region		: 'center',
					// sm : sm2,
					// cm : toolholderCm,
					// tbar : tbar2,
					// bbar : bbar2,
					viewConfig	: {
						forceFit	: true
						// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
					},
					loadMask	: {
						msg	: '正在加载图像数据,请稍等...'
					},
					items		: [{
						        id:'boxid',
								xtype	: 'box',
								autoEl	: {
									tag		: 'img',
									style	: 'width:80%;height:80%;position:relative;top:10%;left:10%',
									src	:  path
								}
							}]
						// view : new Ext.grid.GroupingView(),
						// plugins : [filtersToolholder],
						// stateful : true,
						// stateId : 'grid-cut-toolholder'
					});

				var sizePanel = new Ext.Panel({
					title		: '尺寸简图',
					 id : 'sizePanelid',
					autoScroll	: true,
					frame		: true,
					region		: 'center',
					// sm : sm2,
					// cm : toolholderCm,
					// tbar : tbar2,
					// bbar : bbar2,
					viewConfig	: {
						forceFit	: true
						// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
					},
					loadMask	: {
						msg	: '正在加载图像数据,请稍等...'
					},
					items		: [{
						        id:'boxid2',
								xtype	: 'box',
								autoEl	: {
									tag		: 'img',
									style	: 'width:80%;height:80%;position:relative;top:10%;left:10%',
									src :  path2
								}
							}]
						// view : new Ext.grid.GroupingView(),
						// plugins : [filtersToolholder],
						// stateful : true,
						// stateId : 'grid-cut-toolholder'
					});

				var cuttoolholderStorePanel = new Ext.data.Store({
							proxy	: new Ext.data.HttpProxy({
								url	: 'cut.do?code=queryCuttoolholder4Manage'
									// queryToolholder4Manage是在ToolholderAction中的方法queryToolholder4Manage;
								}),
							reader	: new Ext.data.JsonReader({
										totalProperty	: 'TOTALCOUNT',
										root			: 'ROOT'
									}, [{
												name	: 'sapcode'
											}, {
												name	: 'name'
											}, {
												name	: 'toolholdertype'
											}, {
												name	: 'cuttoolholderbrandname'
											}, {
												name	: 'featurecode'
											}])
						});

				// 表格
				var cuttoolholderPanel = new Ext.grid.GridPanel({
							title		: '匹配刀体',
							// header : false,
							autoScroll	: true,
							id			: 'cuttoolholderPanelid',
							// disabled : true,
							frame		: true,
							region		: 'center',
							store		: cuttoolholderStorePanel,
							stripeRows	: true,
							// sm : sm2,
							cm			: new Ext.grid.ColumnModel([new Ext.grid.RowNumberer({
												header	: '序',
												width	: 26
											}), {
										header		: 'SAP编码',
										dataIndex	: 'sapcode',
										width		: 100,
										sortable	: true
									},  {
										header		: '刀体名称',
										dataIndex	: 'name',
										width		: 100,
										sortable	: true
											// hidden : true
									},{
										header		: '刀体型号',
										dataIndex	: 'toolholdertype',
										width		: 130,
										// hidden : true,
										sortable	: true
									},  {
										header		: '刀体品牌',
										dataIndex	: 'cuttoolholderbrandname',
										// hidden : true,
										width		: 80,
										sortable	: true
									},{
										header		: '特征码',
										dataIndex	: 'featurecode',
										width		: 80,
										sortable	: true
									}]),
							// tbar : tbar2,
							// bbar : bbar2,
							viewConfig	: {
								forceFit	: true
								// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
							},
							loadMask	: {
								msg	: '正在加载表格数据,请稍等...'
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
					region			: 'center',
					id				: 'propertytabsid',
					enableTabScroll	: true,
					// autoWidth : true,
					activeTab		: 0,
					height			: document.body.clientHeight,
					// width : document.body.clientWidth / 4,
					// width : 400,
					buttonAlign		: 'right',
					items			: [propertygrid]
						/*
						 * , listeners : { tabchange : function(tabpanel, tab) { } }
						 */
					});
				
			

				var pictureTabs = new Ext.TabPanel({
							region			: 'east',
							split			: true,
							enableTabScroll	: true,
							width			: '60%',
							// collapsible: true,
							// margins:'3 0 3 3',
							// cmargins:'3 3 3 3',
							activeTab		: 0,
							height			: document.body.clientHeight,
							// width : document.body.clientWidth / 4,
							buttonAlign		: 'right',
							items			: [picturePanel, sizePanel, cuttoolholderPanel,sapPanel, cuttingparameter],
							listeners		: {
								
												tabchange	: function(tabpanel, tab) {
									dataLoadDynamic(tabpanel, cuttingparameter,cuttoolholderPanel,cuttoolholderStorePanel,parameterStore,sapPanel,sapStore);
								
							
									}
								
							}
						});

				var propertyDisplayWin = new Ext.Window({
							title		: '刀片详细信息',
							width		: 800,
							modal		: true,
							height		: 400,
							closeAction	: 'close',
							closable:false,
							maximizable	: true,
							// plain : true,
							layout		: 'border',
							items		: [propertyTabs, pictureTabs],
							buttons		: [{
										text	: '上一条',
										id		: 'previousbtn',
										iconCls	: 'app_leftIcon',
										handler	: function() {
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
															'刀片型号':	record.data.bladetype,
															'车削类型':	record.data.turningtype,
															'刀片材质':	record.data.bladematerialname,
															'刀片材质':	record.data.cutbladematerialname,
															
															'槽型':	record.data.groovename,
															'槽型':	record.data.cutgroovename,
															'刀片品牌':	record.data.bladebrandname,
															'刀片品牌':	record.data.cutbladebrandname,
															'刀片左右手':	record.data.cuttinghand,
															'切削刃数目':	record.data.cuttingedge,
															'刀片宽度':	record.data.bladewidth,
															'主偏角':	record.data.mainangle,
															'刀片后角':	record.data.reliefangle,
															'刀片侧后角':	record.data.sidereliefangle,
															'最大切槽深度':	record.data.cuttingdepth,
															'圆角半径':	record.data.cuttingradius,
															'特征描述':	record.data.description,
															'刀片特征码':	record.data.featurecode,
															'刀片优先级':	record.data.priority,
															'最大切削深度':	record.data.apmax,
															'最小切削深度':	record.data.apmin,
															'最大轴向进给':	record.data.fnzmax,
															'最小轴向进给':	record.data.fnzmin,
															/*'最大径向进给':	record.data.fnxmax,
															'最小径向进给':	record.data.fnxmin,*/
															'备注':	record.data.remark});
												Ext.getCmp('previousbtn')
														.disable();
											} else {
												record = grid.getStore().getAt(
														index);
												propertygrid
														.setSource({'SAP编码':	record.data.sapcode,
															'刀片名称':	record.data.name,
															'刀片型号':	record.data.bladetype,
															'车削类型':	record.data.turningtype,
															'刀片材质':	record.data.bladematerialname,
															'刀片材质':	record.data.cutbladematerialname,
															
															'槽型':	record.data.groovename,
															'槽型':	record.data.cutgroovename,
															'刀片品牌':	record.data.bladebrandname,
															'刀片品牌':	record.data.cutbladebrandname,
															'刀片左右手':	record.data.cuttinghand,
															'切削刃数目':	record.data.cuttingedge,
															'刀片宽度':	record.data.bladewidth,
															'主偏角':	record.data.mainangle,
															'刀片后角':	record.data.reliefangle,
															'刀片侧后角':	record.data.sidereliefangle,
															'最大切槽深度':	record.data.cuttingdepth,
															'圆角半径':	record.data.cuttingradius,
															'特征描述':	record.data.description,
															'刀片特征码':	record.data.featurecode,
															'刀片优先级':	record.data.priority,
															'最大切削深度':	record.data.apmax,
															'最小切削深度':	record.data.apmin,
															'最大轴向进给':	record.data.fnzmax,
															'最小轴向进给':	record.data.fnzmin,
															/*'最大径向进给':	record.data.fnxmax,
															'最小径向进给':	record.data.fnxmin,*/
															'备注':	record.data.remark});
												Ext.getCmp('nextbtn').enable();
											}
											 brandStore.load({
													
													params : {
														
														name : record.data.cutbladebrandname
													}
												});
											  groovestyleStore.load({
													
													params : {
														
														name : record.data.cutgroovename
													}
												});
											  materailStore.load({
													
													params : {
														
														name : record.data.cutbladematerialname
													}
												});
											
											dataLoadDynamic(pictureTabs, cuttingparameter,cuttoolholderPanel,cuttoolholderStorePanel,parameterStore,sapPanel,sapStore);
										}
									}, {
										text	: '下一条',
										id		: 'nextbtn',
										iconCls	: 'app_rightIcon',
										handler	: function() {
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
															'刀片型号':	record.data.bladetype,
															'车削类型':	record.data.turningtype,
															'刀片材质':	record.data.bladematerialname,
															'刀片材质':	record.data.cutbladematerialname,
															
															'槽型':	record.data.groovename,
															'槽型':	record.data.cutgroovename,
															'刀片品牌':	record.data.bladebrandname,
															'刀片品牌':	record.data.cutbladebrandname,
															'刀片左右手':	record.data.cuttinghand,
															'切削刃数目':	record.data.cuttingedge,
															'刀片宽度':	record.data.bladewidth,
															'主偏角':	record.data.mainangle,
															'刀片后角':	record.data.reliefangle,
															'刀片侧后角':	record.data.sidereliefangle,
															'最大切槽深度':	record.data.cuttingdepth,
															'圆角半径':	record.data.cuttingradius,
															'特征描述':	record.data.description,
															'刀片特征码':	record.data.featurecode,
															'刀片优先级':	record.data.priority,
															'最大切削深度':	record.data.apmax,
															'最小切削深度':	record.data.apmin,
															'最大轴向进给':	record.data.fnzmax,
															'最小轴向进给':	record.data.fnzmin,
															/*'最大径向进给':	record.data.fnxmax,
															'最小径向进给':	record.data.fnxmin,*/
															'备注':	record.data.remark});
												Ext.getCmp('nextbtn').disable();
											} else {
												record = grid.getStore().getAt(
														index);
												propertygrid
														.setSource({'SAP编码':	record.data.sapcode,
															'刀片名称':	record.data.name,
															'刀片型号':	record.data.bladetype,
															'车削类型':	record.data.turningtype,
															'刀片材质':	record.data.bladematerialname,
															'刀片材质':	record.data.cutbladematerialname,
															
															'槽型':	record.data.groovename,
															'槽型':	record.data.cutgroovename,
															'刀片品牌':	record.data.bladebrandname,
															'刀片品牌':	record.data.cutbladebrandname,
															'刀片左右手':	record.data.cuttinghand,
															'切削刃数目':	record.data.cuttingedge,
															'刀片宽度':	record.data.bladewidth,
															'主偏角':	record.data.mainangle,
															'刀片后角':	record.data.reliefangle,
															'刀片侧后角':	record.data.sidereliefangle,
															'最大切槽深度':	record.data.cuttingdepth,
															'圆角半径':	record.data.cuttingradius,
															'特征描述':	record.data.description,
															'刀片特征码':	record.data.featurecode,
															'刀片优先级':	record.data.priority,
															'最大切削深度':	record.data.apmax,
															'最小切削深度':	record.data.apmin,
															'最大轴向进给':	record.data.fnzmax,
															'最小轴向进给':	record.data.fnzmin,
															/*'最大径向进给':	record.data.fnxmax,
															'最小径向进给':	record.data.fnxmin,*/
															'备注':	record.data.remark});
												Ext.getCmp('previousbtn')
														.enable();
											}
											 brandStore.load({
													
													params : {
														
														name : record.data.cutbladebrandname
													}
												});
											  groovestyleStore.load({
													
													params : {
														
														name : record.data.cutgroovename
													}
												});
											  materailStore.load({
													
													params : {
														
														name : record.data.cutbladematerialname
													}
												});
											
											dataLoadDynamic(pictureTabs, cuttingparameter,cuttoolholderPanel,cuttoolholderStorePanel,parameterStore,sapPanel,sapStore);
										}
									}, {
										text	: '保存',
										id		: 'savebtn',
										hidden	: true,
										iconCls	: 'acceptIcon',
										handler	: function() {

										}
									}, {
										text	: '关闭',
										id		: 'cancelbtn',
										iconCls	: 'cancelIcon',
										handler	: function() {
											propertyDisplayWin.close();
											brandDisplayWin.close();
											groovestyleDisplayWin.close();
											materailDisplayWin.close();
										}
									}],
							listeners	: {
								afterrender	: function(tabpanel, tab) {
									propertygrid.setSource({'SAP编码':	record.data.sapcode,
										'刀片名称':	record.data.name,
										'刀片型号':	record.data.bladetype,
										'车削类型':	record.data.turningtype,
										'刀片材质':	record.data.bladematerialname,
										'刀片材质':	record.data.cutbladematerialname,
									
										'槽型':	record.data.groovename,
										'槽型':	record.data.cutgroovename,
										'刀片品牌':	record.data.bladebrandname,
										'刀片品牌':	record.data.cutbladebrandname,
										'刀片左右手':	record.data.cuttinghand,
										'切削刃数目':	record.data.cuttingedge,
										'刀片宽度':	record.data.bladewidth,
										'主偏角':	record.data.mainangle,
										'刀片后角':	record.data.reliefangle,
										'刀片侧后角':	record.data.sidereliefangle,
										'最大切槽深度':	record.data.cuttingdepth,
										'圆角半径':	record.data.cuttingradius,
										'特征描述':	record.data.description,
										'刀片特征码':	record.data.featurecode,
										'刀片优先级':	record.data.priority,
										'最大切削深度':	record.data.apmax,
										'最小切削深度':	record.data.apmin,
										'最大轴向进给':	record.data.fnzmax,
										'最小轴向进给':	record.data.fnzmin,
										/*'最大径向进给':	record.data.fnxmax,
										'最小径向进给':	record.data.fnxmin,*/
										'备注':	record.data.remark});
								},
								beforeshow : function(win){
									var workpiecematerialid = workpieceisotypeCombo.getValue();
									if (workpiecematerialid != ""){
										Ext.getCmp('ctparameterid').enable();
									}else{
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
							
							name : record.data.cuttoolholderbrandname
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
					                    readOnly:true,
					                    height:140,
					                    emptyText:'数据完善中……',
					                    textfield:'11',
					                    width: 330
					                  
									
								}
						            
						        ],
						       
							
							listeners : {}
								
							});
				
				
				
				var propertygrid2 = new Ext.grid.PropertyGrid({
							title				: '刀体详情',
							border				: true,
							autoSort			: false,
							frame				: true,
							ds					: cuttoolholderStore,
							cm					: cuttoolholderCm,
							id					: 'propertyGrid2id',
							enableColLock		: true,
							enableColumnMove	: false,
							autoExpandColumn	: true,
							loadMask			: true,
							stripeRows			: true,
							autoScroll			: true,
							clicksToEdit		: 1,
							propertyNames		: {
								'toolholderid'		: '刀体ID',
								'sapcode'			: 'SAP编码',
								'name'				: '刀体名称',
								'toolholdertype'	: '刀体型号',
								'brand'				: '刀体品牌',
								'cuttoolholderbrandname' : '刀体品牌',
								'turningtype'		: '车削类型',
								'figure'			: '结构简图',
								'figure2'			: '尺寸简图',
								'handletype'		: '切削方向',
								'portsize'			: '接口尺寸',
								'handoftool'		: '刀具方向',
								'featurecode'		: '特征码',
								'cutwidthmax'		: '最大切槽宽度',
								'cutwidthmin'		: '最小切槽宽度',
								'cseries'			: '刀片夹紧方式',
								'length'			: '刀体长度',
								'width'				: '刀体宽度',
								'cuttingdepth'		: '最大切槽深度',
								'diametermax'		: '最小加工直径',
								'cutdiametermax'	: '最大首切直径',
								'cutdiametermin'	: '最小首切直径',
								'aname1'			: '附件1名称',
								'atype1'			: '附件1型号',
								'aname2'			: '附件2名称',
								'atype2'			: '附件2型号',
								'aname3'			: '附件3名称',
								'atype3'			: '附件3型号',
								'aname4'			: '附件4名称',
								'atype4'			: '附件4型号',
								'aname5'			: '附件5名称',
								'atype5'			: '附件5型号',
								'remark'			: '备注'
							},
							customEditors		: {
								'turningtype'	: new Ext.grid.GridEditor(new Ext.form.ComboBox({
											displayField	: 'text',
											mode			: 'local',
											triggerAction	: 'all',
											store			: TURNINGTYPEStore
										})),
								'portsize'		: new Ext.grid.GridEditor(new Ext.form.ComboBox({
											displayField	: 'text',
											mode			: 'local',
											triggerAction	: 'all',
											store			: PORTSIZECStore
										})),
								'handoftool'	: new Ext.grid.GridEditor(new Ext.form.ComboBox({
											displayField	: 'text',
											mode			: 'local',
											triggerAction	: 'all',
											store			: HANDOFTOOLStore
										})),
								'cseries'		: new Ext.grid.GridEditor(new Ext.form.ComboBox({
											displayField	: 'text',
											mode			: 'local',
											triggerAction	: 'all',
											store			: CSERIESStore
										}))
							},
							customRenderers		: {
				// 'turningtype' : TURNINGTYPERender,
							// 'portsize' : PORTSIZERender,
							// 'handoftool' : HANDOFTOOLRender,
							// 'cseries' : CSERIESRender,

							},
							listeners			: {
								
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
								beforeedit	: function(e) {
									e.cancel = true;
									return false;
								}
							}
						});

				/*
				 * var cuttingparameter2 = new Ext.grid.GridPanel({ title : '切削参数', header : false, height : 500, //id : 'grid2id', autoScroll : true, frame : true, disabled : true, region : 'center',
				 * //store : toolholderStore, stripeRows : true, //sm : sm2, //cm : toolholderCm, //tbar : tbar2, //bbar : bbar2, viewConfig : { forceFit : false // 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况 },
				 * loadMask : { msg : '正在加载表格数据,请稍等...' } //view : new Ext.grid.GroupingView(), //plugins : [filtersToolholder], //stateful : true, //stateId : 'grid-generalturning-toolholder' } );
				 */

				var picturePanel2 = new Ext.Panel({
					title		: '结构简图',
					 id : 'picturePanel2id',
					autoScroll	: true,
					frame		: true,
					region		: 'center',
					// sm : sm2,
					// cm : toolholderCm,
					// tbar : tbar2,
					// bbar : bbar2,
					viewConfig	: {
						forceFit	: true
						// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
					},
					loadMask	: {
						msg	: '正在加载图像数据,请稍等...'
					},
					items		: [{
						        id:'boxid3',
								xtype	: 'box',
								autoEl	: {
									tag		: 'img',
									style	: 'width:80%;height:80%;position:relative;top:10%;left:10%',
									src	:  path
								}
							}]
						// view : new Ext.grid.GroupingView(),
						// plugins : [filtersToolholder],
						// stateful : true,
						// stateId : 'grid-generalturning-toolholder'
					});

				var sizePanel2 = new Ext.Panel({
					title		: '尺寸简图',
					 id : 'sizePanel2id',
					autoScroll	: true,
					frame		: true,
					region		: 'center',
					// sm : sm2,
					// cm : toolholderCm,
					// tbar : tbar2,
					// bbar : bbar2,
					viewConfig	: {
						forceFit	: true
						// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
					},
					loadMask	: {
						msg	: '正在加载图像数据,请稍等...'
					},
					items		: [{
						         id:'boxid4',
								xtype	: 'box',
								autoEl	: {
									tag		: 'img',
									style	: 'width:80%;height:80%;position:relative;top:10%;left:10%',
									src	:  path2
								}
							}]
						// view : new Ext.grid.GroupingView(),
						// plugins : [filtersToolholder],
						// stateful : true,
						// stateId : 'grid-generalturning-toolholder'
					});

				var cutbladeStorePanel = new Ext.data.Store({
							proxy	: new Ext.data.HttpProxy({
								url	: 'cut.do?code=queryCutblade4Manage'
									// queryBlade4Manage是在BladeAction中的方法queryBlade4Manage;
								}),
							reader	: new Ext.data.JsonReader({
										totalProperty	: 'TOTALCOUNT',
										root			: 'ROOT'
									}, [{
												name	: 'sapcode'
											}, {
												name	: 'name'
											}, {
												name	: 'bladetype'
											}, {
												name	: 'cutbladebrandname'
											}, {
												name	: 'featurecode'
											}])
						});

				// 表格
				var cutbladePanel = new Ext.grid.GridPanel({
							title		: '匹配刀片',
							// header : false,
							autoScroll	: true,
							id			: 'cutbladePanelid',
							// disabled : true,
							frame		: true,
							region		: 'center',
							store		: cutbladeStorePanel,
							stripeRows	: true,
							// sm : sm2,
							cm			: new Ext.grid.ColumnModel([new Ext.grid.RowNumberer({
												header	: '序',
												width	: 26
											}), {
										header		: 'SAP编码',
										dataIndex	: 'sapcode',
										width		: 100,
										sortable	: true
									}, {
										header		: '刀片名称',
										dataIndex	: 'name',
										width		: 80,
										// hidden : true,
										sortable	: true
									}, {
										header		: '刀片型号',
										dataIndex	: 'bladetype',
										width		: 130,
										// hidden : true,
										sortable	: true
									}, {
										header		: '刀片品牌',
										dataIndex	: 'cutbladebrandname',
										width		: 60,
										// hidden : true,
										sortable	: true
									}, {
										header		: '刀片特征码',
										dataIndex	: 'featurecode',
										width		: 80,
										sortable	: true
									}]),
							// tbar : tbar2,
							// bbar : bbar2,
							viewConfig	: {
								forceFit	: true
								// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
							},
							loadMask	: {
								msg	: '正在加载表格数据,请稍等...'
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
					region			: 'center',
					id				: 'propertytabs2id',
					enableTabScroll	: true,
					// autoWidth : true,
					activeTab		: 0,
					height			: document.body.clientHeight,
					// width : document.body.clientWidth / 4,
					// width : 400,
					buttonAlign		: 'right',
					items			: [propertygrid2]
						/*
						 * , listeners : { tabchange : function(tabpanel, tab) { } }
						 */
					});

				var pictureTabs2 = new Ext.TabPanel({
							region			: 'east',
							split			: true,
							enableTabScroll	: true,
							width			: '60%',
							// collapsible: true,
							// margins:'3 0 3 3',
							// cmargins:'3 3 3 3',
							activeTab		: 0,
							height			: document.body.clientHeight,
							// width : document.body.clientWidth / 4,
							buttonAlign		: 'right',
							items			: [picturePanel2, sizePanel2, /* cuttingparameter2, */
									cutbladePanel,sapPanel2],
							listeners		: {
								tabchange	: function(tabpanel, tab) {
									if (tab.getId() == 'cutbladePanelid') {
										cutbladeStorePanel.load({
													params	: {
														featurecode	: record.data.featurecode
													}
												});
									}else if (pictureTabs2.getActiveTab().getItemId() == 'picturePanel2id') {
										var newsrc =checkImagePath(record.data.figure);
										Ext.getCmp('boxid3').getEl().dom.src = newsrc;
										}
									else if (pictureTabs2.getActiveTab().getItemId() == 'sizePanel2id') {
									
										var newsrc =checkImagePath(record.data.figure2);
										Ext.getCmp('boxid4').getEl().dom.src = newsrc;

										}else if (tab.getId() =='sapPanel2id') {
										sapStore2.load({
											params : {
												sapcode : record.data.sapcode
											}
										});}
								}
							}
						});

				var propertyDisplayWin2 = new Ext.Window({
							title		: '刀体详细信息',
							width		: 800,
							modal		: true,
							height		: 400,
							closeAction	: 'close',
							closable:false,
							maximizable	: true,
							// plain : true,
							layout		: 'border',
							items		: [propertyTabs2, pictureTabs2],
							buttons		: [{
										text	: '上一条',
										id		: 'previousbtn2',
										iconCls	: 'app_leftIcon',
										handler	: function() {
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
													'刀体品牌':	record.data.brand,
													'刀体品牌':	record.data.cuttoolholderbrandname,
													'车削类型':	record.data.turningtype,
													'切削方向':	record.data.handletype,
													'接口尺寸':	record.data.portsize,
													'刀具方向':	record.data.handoftool,
													'特征码':	record.data.featurecode,
													'最大切槽宽度':	record.data.cutwidthmax,
													'最小切槽宽度':	record.data.cutwidthmin,
													'刀片夹紧方式':	record.data.cseries,
													'刀体长度':	record.data.length,
													'刀体宽度':	record.data.width,
													'最大切槽深度':	record.data.cuttingdepth,
													'最小加工直径':	record.data.diametermax,
													'最大首切直径':	record.data.cutdiametermax,
													'最小首切直径':	record.data.cutdiametermin,
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
												Ext.getCmp('previousbtn2').disable();
											} else {
												record = grid2.getStore().getAt(index);
												propertygrid2.setSource({'SAP编码':	record.data.sapcode,
													'刀体名称':	record.data.name,
													'刀体型号':	record.data.toolholdertype,
													'刀体品牌':	record.data.brand,
													'刀体品牌':	record.data.cuttoolholderbrandname,
													'车削类型':	record.data.turningtype,
													'切削方向':	record.data.handletype,
													'接口尺寸':	record.data.portsize,
													'刀具方向':	record.data.handoftool,
													'特征码':	record.data.featurecode,
													'最大切槽宽度':	record.data.cutwidthmax,
													'最小切槽宽度':	record.data.cutwidthmin,
													'刀片夹紧方式':	record.data.cseries,
													'刀体长度':	record.data.length,
													'刀体宽度':	record.data.width,
													'最大切槽深度':	record.data.cuttingdepth,
													'最小加工直径':	record.data.diametermax,
													'最大首切直径':	record.data.cutdiametermax,
													'最小首切直径':	record.data.cutdiametermin,
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
														
														name : record.data.cuttoolholderbrandname
													}
												});
											
											
											if (pictureTabs2.getActiveTab().getItemId() == 'cutbladePanelid') {
												cutbladeStorePanel.load({
															params	: {
																featurecode	: record.data.featurecode
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
										text	: '下一条',
										id		: 'nextbtn2',
										iconCls	: 'app_rightIcon',
										handler	: function() {
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
													'刀体品牌':	record.data.brand,
													'刀体品牌':	record.data.cuttoolholderbrandname,
													'车削类型':	record.data.turningtype,
													'切削方向':	record.data.handletype,
													'接口尺寸':	record.data.portsize,
													'刀具方向':	record.data.handoftool,
													'特征码':	record.data.featurecode,
													'最大切槽宽度':	record.data.cutwidthmax,
													'最小切槽宽度':	record.data.cutwidthmin,
													'刀片夹紧方式':	record.data.cseries,
													'刀体长度':	record.data.length,
													'刀体宽度':	record.data.width,
													'最大切槽深度':	record.data.cuttingdepth,
													'最小加工直径':	record.data.diametermax,
													'最大首切直径':	record.data.cutdiametermax,
													'最小首切直径':	record.data.cutdiametermin,
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
												Ext.getCmp('nextbtn2').disable();
											} else {
												record = grid2.getStore().getAt(index);
												propertygrid2.setSource({'SAP编码':	record.data.sapcode,
													'刀体名称':	record.data.name,
													'刀体型号':	record.data.toolholdertype,
													'刀体品牌':	record.data.brand,
													'刀体品牌':	record.data.cuttoolholderbrandname,
													'车削类型':	record.data.turningtype,
													'切削方向':	record.data.handletype,
													'接口尺寸':	record.data.portsize,
													'刀具方向':	record.data.handoftool,
													'特征码':	record.data.featurecode,
													'最大切槽宽度':	record.data.cutwidthmax,
													'最小切槽宽度':	record.data.cutwidthmin,
													'刀片夹紧方式':	record.data.cseries,
													'刀体长度':	record.data.length,
													'刀体宽度':	record.data.width,
													'最大切槽深度':	record.data.cuttingdepth,
													'最小加工直径':	record.data.diametermax,
													'最大首切直径':	record.data.cutdiametermax,
													'最小首切直径':	record.data.cutdiametermin,
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
												Ext.getCmp('previousbtn2').enable();
											}
											brandStore.load({
												
												params : {
													
													name : record.data.cuttoolholderbrandname
												}
											});
										
											if (pictureTabs2.getActiveTab().getItemId() == 'cutbladePanelid') {
												cutbladeStorePanel.load({
															params	: {
																featurecode	: record.data.featurecode
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
										text	: '保存',
										id		: 'savebtn2',
										hidden	: true,
										iconCls	: 'acceptIcon',
										handler	: function() {

										}
									}, {
										text	: '关闭',
										id		: 'cancelbtn2',
										iconCls	: 'cancelIcon',
										handler	: function() {
											propertyDisplayWin2.close();
											 brandDisplayWin.close();
										}
									}],
							listeners	: {
								afterrender	: function(tabpanel, tab) {
									propertygrid2.setSource({'SAP编码':	record.data.sapcode,
										'刀体名称':	record.data.name,
										'刀体型号':	record.data.toolholdertype,
										'刀体品牌':	record.data.brand,
										'刀体品牌':	record.data.cuttoolholderbrandname,
										'车削类型':	record.data.turningtype,
										'切削方向':	record.data.handletype,
										'接口尺寸':	record.data.portsize,
										'刀具方向':	record.data.handoftool,
										'特征码':	record.data.featurecode,
										'最大切槽宽度':	record.data.cutwidthmax,
										'最小切槽宽度':	record.data.cutwidthmin,
										'刀片夹紧方式':	record.data.cseries,
										'刀体长度':	record.data.length,
										'刀体宽度':	record.data.width,
										'最大切槽深度':	record.data.cuttingdepth,
										'最小加工直径':	record.data.diametermax,
										'最大首切直径':	record.data.cutdiametermax,
										'最小首切直径':	record.data.cutdiametermin,
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
					
					url : 'cut.do?code=printTask',
				
					
					params : {
						 workpieceisotype : workpieceisotypeCombo.getValue(),
						 turningtype : turningtypeCombo.getValue(),
						 bladewidth : bladewidthCombo.getValue(),
						 cuttingradius : cuttingradiusCombo.getValue(),
						 cuttinghand : cuttinghandCombo.getValue(),
						 cuttingedge : cuttingedgeCombo.getValue(),
					     sapcode : record.data.sapcode,
					     workpiecematerialid : workpieceisotypeCombo.getValue(),
						 bladematerialid : record.data.bladematerialid,
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
					
					url : 'cut.do?code=printTask2',
				
					
					params : {
						turningtype2 : turningtypeCombo2.getValue(),
						cuttingdepth2 : cuttingdepthCombo2.getValue(),
						portsize2 : portsizeCombo.getValue(),
						handoftool2 : handoftoolCombo.getValue(),
						diametermax2 : diametermaxCombo.getValue(),
						cutdiameter2: cutdiameterCombo.getValue(),
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
