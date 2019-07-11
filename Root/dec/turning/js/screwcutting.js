/**
 * 螺纹车削
 * 
 * @author fuxianwu
 * @since 2013-01-01
 */
Ext.onReady(function() {
	var divnum = 25;// 调整toolbar中的下拉框的大小与位置;
	var numlign = 11;

	var pp = 0.8; // 将下拉框图片缩放为80%;

	// 图片大小;
	/*
	 * var reliefangleArr = new Array(143, 79); //刀片后角 var reliefanglepp = pp;
	 */

	var threaddirectionArr = new Array(114, 81);
	var threaddirectionpp = pp + 0.2;

	var threadtypeArr = new Array(123, 79);// 螺纹类型
	var threadtypepp = pp + 0.2;

	/*
	 * var celengthArr = new Array(216, 80); //刀片尺寸 var celengthpp = pp - 0.2;
	 * var celengthArr = new Array(216, 80); //刀片尺寸 var celengthpp = pp - 0.2;
	 * var noseradiusArr = new Array(144, 79); //刀尖圆弧半径 var noseradiuspp = pp;
	 * var shapeArr = new Array(198, 80); //刀片形状 var shapepp = pp - 0.2; var
	 * cseriesArr = new Array(264, 79); //刀片夹紧方式 var cseriespp = pp - 0.2; var
	 * handoftoolArr = new Array(151, 80); //刀具方向 var handoftoolpp = pp - 0.2;
	 */

	var portsizeArr = new Array(230, 80); // 接口规格
	var portsizepp = pp - 0.2;

	/*
	 * var thheadangleArr = new Array(65, 79); //刀头形式 var thheadanglepp = pp +
	 * 0.2; var turningtypeArr = new Array(159, 79); //车削类型 var turningtypepp =
	 * pp - 0.1;
	 */

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

	function THREADTYPERender2(value) {
		if (value == 'IL')
			return '内螺纹左手';
		if (value == 'IR')
			return '内螺纹右手';
		if (value == 'EL')
			return '外螺纹左手';
		if (value == 'ER')
			return '外螺纹右手';
		else
			return value;
	}

	// 列模型
	var threadbladeCm = new Ext.grid.ColumnModel([rownum, sm, /*
																 * { header :
																 * '刀片ID', //
																 * 列标题 dataIndex :
																 * 'threadbladeid', //
																 * 数据索引,和Store数据存储模型对应
																 * width : 60, //
																 * 列宽度 sortable :
																 * true, //
																 * 该列是否要排序
																 * hidden : true //
																 * 该列是否隐藏 },
																 */	{
				header : '刀片名称',
				dataIndex : 'name',
				width : 80,
				// hidden : true,
				sortable : true
			}, {
				header : 'SAP编码',
				dataIndex : 'sapcode',
				width : 120,
				sortable : true
				/* hidden : true */
		}	, {
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
				dataIndex : 'threadtype',
				width : 80,
				hidden : true,
				sortable : true,
				renderer : THREADTYPERender2
			}/*
				 * , { header : '刀片材质ID', dataIndex : 'bladematerialid', width :
				 * 80, sortable : true, hidden : true }
				 */, {
				header : '刀片材质',
				dataIndex : 'bladematerialname',
				width : 80,
				// hidden : true,
				sortable : true
			}/*
				 * , { header : '刀片品牌ID', dataIndex : 'brandid', width : 80,
				 * hidden : true, sortable : true }
				 */, {
				header : '品牌名称',
				dataIndex : 'brandname',
				width : 70,
				// hidden : true,
				sortable : true
			}, {
				header : '螺距',
				dataIndex : 'pitch',
				width : 80,
				align : 'center',
				// hidden : true,
				sortable : true
			}, {
				header : '螺纹标准',
				dataIndex : 'threadstandard',
				align : 'center',
				width : 80,
				// hidden : true,
				sortable : true

			}, {
				header : '刀片类型',
				dataIndex : 'blademold',
				width : 80,
				// hidden : true,
				sortable : true

			}, {
				header : '刀片尺寸',
				dataIndex : 'bladesize',
				width : 90,
				align : 'center',
				// hidden : true,
				sortable : true,
				renderer : BLADESIZERender
			}, {
				header : '刀片厚度',
				dataIndex : 'thickness',
				width : 70,
				align : 'center',
				// hidden : true,
				sortable : true,
				renderer : THICKNESSRender
			}, {
				header : '刀片左右手',
				dataIndex : 'threadhand',
				width : 130,
				hidden : true,
				sortable : true

			}, {
				header : '特征描述',
				dataIndex : 'description',
				width : 130,
				hidden : true,
				sortable : true
			}, {
				header : '刀片特征码',
				dataIndex : 'featurecode',
				width : 70,
				align : 'center',
				hidden : true,
				sortable : true
			}, {
				header : '最大走刀次数',
				dataIndex : 'apmax',
				width : 90,
				align : 'center',
				// hidden : true,
				sortable : true
			}, {
				header : '最小走刀次数',
				dataIndex : 'fnmax',
				width : 90,
				align : 'center',
				// hidden : true,
				sortable : true
			}, {
				header : '备注信息',
				dataIndex : 'remark',
				width : 160,
				// hidden : true,
				sortable : true
			}]);

	// 列模型
	var threadtoolholderCm = new Ext.grid.ColumnModel([rownum2, sm2, {
		header : '刀体编号', // 列标题
		dataIndex : 'toolholderid', // 数据索引,和Store数据存储模型对应
		width : 60, // 列宽度
		sortable : true, // 该列是否要排序
		hidden : true
			// 该列是否隐藏
		}, {
		header : '刀体名称',
		dataIndex : 'name',
		width : 70,
		sortable : true
			// hidden : true
		}, {
		header : 'SAP编码',
		dataIndex : 'sapcode',
		width : 160,
		sortable : true
			// hidden : true
		}, {
		header : '刀体型号',
		dataIndex : 'toolholdertype',
		width : 130,
		sortable : true
			// hidden : true
		}/*
			 * , { header : '刀体品牌ID', dataIndex : 'brandid', width : 80, hidden :
			 * true, sortable : true }
			 */, {
		header : '刀体品牌名称',
		dataIndex : 'brandname',
		width : 80,
		// hidden : true,
		sortable : true
	}, {
		header : '车削类型',
		dataIndex : 'threadtype',
		width : 80,
		hidden : true,
		sortable : true,
		renderer : THREADTYPERender

	}, {
		header : '接口规格',
		dataIndex : 'portsize',
		width : 60,
		align : 'center',
		// hidden : true,
		sortable : true,
		renderer : PORTSIZERender
	}, {
		header : '切削方向',
		dataIndex : 'handoftool',
		width : 60,
		// hidden : true,
		sortable : true,
		renderer : HANDOFTOOLRender
	}, {
		header : '结构简图',
		dataIndex : 'figure',
		hidden : true,
		width : 60,
		sortable : true
	}, {
		header : '尺寸图',
		dataIndex : 'figure2',
		hidden : true,
		width : 60,
		sortable : true
	}, {
		header : '刀片形式',
		dataIndex : 'featurecode',
		width : 80,
		// hidden : true,
		sortable : true
	}, {
		header : '压紧刀片方式',
		dataIndex : 'cseries',
		width : 80,
		renderer : CSERIESRender,
		// hidden : true,
		sortable : true
	}, {
		header : '刀体长度',
		dataIndex : 'length',
		width : 60,
		align : 'center',
		// hidden : true,
		sortable : true
	}, {
		header : '刀体宽度',
		dataIndex : 'width',
		// hidden : true,
		align : 'center',
		width : 60,
		sortable : true
	}, {
		header : '螺纹直径',
		dataIndex : 'diameter',
		// hidden : true,
		align : 'center',
		width : 80,
		sortable : true,
		renderer : DIAMETERRender
	}, {
		header : '附件1名称',
		dataIndex : 'aname1',
		width : 80,
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
		// hidden : true,
		sortable : true
	}]);

	// Store数据存储
	var threadbladeStore = new Ext.data.GroupingStore({
		proxy : new Ext.data.HttpProxy({
			url : 'screwcutting.do?code=queryThreadblade4Manage'
				// queryThreadblade4Manage是在ThreadbladeAction中的方法queryThreadblade4Manage;
			}),
		reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT',
					sortInfo : {
						field : "fieldName",
						direction : "DESC"
					},
					fields : [{
								name : 'generalturning.do?code=queryBlade4Manage',
								type : 'string'
							}]
				}, [/*
					 * { name : 'threadbladeid' },
					 */{
							name : 'sapcode'
						}, {
							name : 'name'
						}, {
							name : 'bladetype'
						}, {
							name : 'threadtype'
						}, {
							name : 'bladematerialname',
							type : 'string'
						}/*
							 * , { name : 'brandid' }
							 */, {
							name : 'brandname',
							type : 'string'
						}, {
							name : 'pitch'
						}, {
							name : 'threadstandard'
						}, {
							name : 'blademold'
						}, {
							name : 'bladesize'
						}, {
							name : 'thickness'
						}, {
							name : 'threadhand'
						}, {
							name : 'featurecode'
						}, {
							name : 'apmax'
						}, {
							name : 'fnmax'
						}, {
							name : 'figure'
						}, {
							name : 'figure2'
						}, {
							name : 'description'
						}, {
							name : 'bladematerialid'
						}, {
							name : 'remark'
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
	// 数据动态加载
	function dataLoadDynamic(pictureTabs, cuttingparameter,
			threadtoolholderPanel, threadtoolholderStorePanel, parameterStore,
			sapPanel, sapStore) {
		var record = grid.getSelectionModel().getSelected();

		if (pictureTabs.getActiveTab().getItemId() == 'threadtoolholderPanelid') {
			threadtoolholderStorePanel.load({
						params : {
							featurecode : record.data.featurecode
						}
					});
		} else if (pictureTabs.getActiveTab().getItemId() == 'ctparameterid') {/*
																				 * Ext.Ajax.request({
																				 * url :
																				 * 'screwcutting.do?code=queryCtparameter',
																				 * success :
																				 * function(response) {
																				 * var
																				 * resultArray =
																				 * Ext.util.JSON.decode(response.responseText);
																				 * ctparameterPropertyGrid.setSource(resultArray); },
																				 * params : {
																				 * workpiecematerialid :
																				 * workpieceisotypeCombo.getValue(),
																				 * bladematerialid :
																				 * record.data.bladematerialid }
																				 * });
																				 */
			parameterStore.load({
						params : {
							workpiecematerialid : workpieceisotypeCombo
									.getValue(),
							bladematerialid : record.data.bladematerialid,
							bladetype : record.data.bladetype
						}
					});
		} else if (pictureTabs.getActiveTab().getItemId() == 'sapPanelid') {
			sapStore.load({
						params : {
							sapcode : record.data.sapcode
						}
					});
		}
	}

	// Store数据存储
	var threadtoolholderStore = new Ext.data.GroupingStore({
				proxy : new Ext.data.HttpProxy({
					url : 'screwcutting.do?code=queryThreadtoolholder4Manage'
						// queryThreadtoolholder4Manage是在ThreadtoolholderAction中的方法queryThreadtoolholder4Manage;
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
									name : 'toolholdertype'
								}/*
									 * , { name : 'brandid' }
									 */, {
									name : 'brandname'
								}, {
									name : 'threadtype'
								}, {
									name : 'portsize'
								}, {
									name : 'handoftool'
								}, {
									name : 'featurecode'
								}, {
									name : 'cseries'
								}, {
									name : 'length'
								}, {
									name : 'width'
								}, {
									name : 'diameter'
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
									name : 'figure'
								}, {
									name : 'figure2'
								}, {
									name : 'remark'
								}])
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
				threadbladeStoreLoad();
			});

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
	
	function threadbladeStoreLoad() {
		threadbladeStore.load({
			params : {
				start : bbar.pageSize
						* (grid.getBottomToolbar().getPageData().activePage - 1),
				limit : bbar.pageSize,
				workpieceisotype : workpieceisotypeCombo.getValue(),
				// threaddirection :
				// threaddirectionCombo.getValue(),
				threadtype : threadtypeCombo.getValue(),
				threadstandard : threadstandardCombo.getValue(),
				pitch : pitchCombo.getValue(),
				bladesize : bladesizeCombo.getValue(),
				featurecode:getfeaturecode()
			}
		});
	}

	function threadtoolholderStoreLoad() {
		threadtoolholderStore.load({
			params : {
				/*
				 * start : bbar2.pageSize *
				 * (grid2.getBottomToolbar().getPageData().activePage - 1),
				 * limit : bbar2.pageSize,
				 */
				// threaddirection :
				// threaddirectionCombo2.getValue(),
				start : bbar2.pageSize
						* (grid2.getBottomToolbar().getPageData().activePage - 1),
				limit : bbar2.pageSize,
				threadtype : threadtypeCombo2.getValue(),
				diameter : diameterCombo.getValue(),
				bladesize : bladesizeCombo2.getValue(),
				portsize : portsizeCombo.getValue(),
				featurecode:getfeaturecode2()
			}
		});
	}

	var calcButton = new Ext.Button({
				text : '查询结果',
				iconCls : 'tableIcon',
				hidden : true,
				listeners : {
					click : function() {
						threadbladeStoreLoad();
					}
				}
			});

	var calcButton2 = new Ext.Button({
				text : '查询结果',
				iconCls : 'tableIcon',
				hidden : true,
				listeners : {
					click : function() {
						threadtoolholderStoreLoad();
					}
				}
			});

	// 分页工具栏
	var bbar = new Ext.PagingToolbar({
		pageSize : number,
		store : threadbladeStore,
		displayInfo : true,
		displayMsg : '显示第 {0} 条到第 {1} 条,共 {2} 条',
		plugins : new Ext.ux.ProgressBarPager(),
		emptyMsg : '对不起,没有符合条件的记录!',
		items : ['-', '&nbsp;&nbsp;',
				pagesize_combo, /*
								 * '-', '&nbsp;&nbsp;', { text : '查询结果', iconCls :
								 * 'acceptIcon', handler : function() {
								 * resultDisplay(); //
								 * Ext.getCmp('helpdiv').setText('adfadsf'); } },
								 */
				{
					xtype : 'tbspacer',
					width : 10
				}, {
					text : '通过选择条目过滤刀体',
					iconCls : 'acceptIcon',
					id : 'selectThreadtoolholder',
					handler : function() {
						tabs.activate(1);

						// var record =
						// grid.getSelectionModel().getSelected();
						var records = grid.getSelectionModel().getSelections();

						if (records.length == 0) {
							threadtoolholderStoreLoad();
						} else {
							if (records.length > 1) {
								infoMsg('您选择了 ' + records.length
										+ ' 个条目，选择单个条目会获得准确匹配。');
							}

							// grid.getSelectionModel().selectRow(grid.getSelectionModel().last,
							// false);
							threadtoolholderStore.load({
								params : {
									start : bbar2.pageSize
											* (grid2.getBottomToolbar()
													.getPageData().activePage - 1),
									limit : bbar2.pageSize,
									featurecode : jsArray2JsString(records,
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
				}]
	});

	// 每页显示条数下拉选择框
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
				var r = comboBox.getValue();
				bbar2.pageSize = parseInt(comboBox.getValue());
				number2 = parseInt(comboBox.getValue());
				threadtoolholderStoreLoad();
			});

	// 分页工具栏
	var bbar2 = new Ext.PagingToolbar({
		pageSize : number2,
		store : threadtoolholderStore,
		displayInfo : true,
		displayMsg : '显示第 {0} 条到第 {1} 条,共 {2} 条',
		plugins : new Ext.ux.ProgressBarPager(),
		emptyMsg : '对不起,没有符合条件的记录!',
		items : ['-', '&nbsp;&nbsp;',
				pagesize_combo2, /*
									 * '-', '&nbsp;&nbsp;', { text : '查询结果',
									 * iconCls : 'acceptIcon', handler :
									 * function() { resultDisplay(); //
									 * Ext.getCmp('helpdiv').setText('adfadsf'); } },
									 */
				{
					xtype : 'tbspacer',
					width : 10
				}, {
					text : '通过选择条目过滤刀片',
					id : 'selectThreadblade',
					iconCls : 'acceptIcon',
					handler : function() {
						tabs.activate(0);

						// var record =
						// grid2.getSelectionModel().getSelected();
						var records = grid2.getSelectionModel().getSelections();

						if (records.length == 0) {
							threadbladeStoreLoad();
						} else {
							if (records.length > 1) {
								infoMsg('您选择了 ' + records.length
										+ ' 个条目，选择单个条目会获得准确匹配。');
							}

							// grid.getSelectionModel().selectRow(grid.getSelectionModel().last,
							// false);
							threadbladeStore.load({
								params : {
									start : bbar.pageSize
											* (grid.getBottomToolbar()
													.getPageData().activePage - 1),
									limit : bbar.pageSize,
									featurecode : jsArray2JsString(records,
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
				}]
	});

	// 刀片选择的Combo+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	// 每页显示条数下拉选择框
	/*
	 * function nameaddmark(v, record) { return record.name + record.mark; }
	 */

	/*
	 * var pagesize_combo_iso = new Ext.form.ComboBox({ name : 'pagesize',
	 * triggerAction : 'all', mode : 'local', store : new Ext.data.ArrayStore({
	 * fields : ['value', 'text'], data : [[10, '10 条/页'], [20, '20 条/页'], [50,
	 * '50 条/页'], [100, '100条/页'], [250, '250条/页'], [500, '500条/页']] }),
	 * valueField : 'value', displayField : 'text', value : '50', editable :
	 * false, width : 85 });
	 */
	// 工件材料状态数据
	var workpieceisotypeStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : 'screwcutting.do?code=queryWorkpiecematerial'
						}),
				reader : new Ext.data.JsonReader({
							totalProperty : 'TOTALCOUNT',
							root : 'ROOT'
						}, [{
									name : 'workpiecematerialid'
								}, {
									name : 'name'// convert: nameaddmark
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
	//刀片联动
	//进给方向下拉框   
	function workpieceisotypeStoreLoad() {
		workpieceisotypeStore.load({
					params : {
						
						featurecode : getfeaturecode()
					}
				});
	}
	function threaddirectionStoreLoad() {
		threaddirectionStore.load({
					params : {
						workpiecematerialid : workpieceisotypeCombo.getValue(),
						featurecode : getfeaturecode()
					}
				});
	}
	//螺纹类型下拉框
	function threadtypeStoreLoad() {
		threadtypeStore.load({
					params : {
						threaddirection : threaddirectionCombo.getValue(),
						featurecode : getfeaturecode()
					}
				});
	}
	
	//螺纹标准下拉框
	function threadstandardStoreLoad() {
		threadstandardStore.load({
					params : {
						threadtype : threadtypeCombo.getValue(),
						workpiecematerialid : workpieceisotypeCombo.getValue(),
						featurecode : getfeaturecode()
					}
				});
	}
	
	
	

	//螺纹螺距下拉框
	function pitchStoreLoad() {
		pitchStore.load({
					params : {
						threadtype : threadtypeCombo.getValue(),
						workpiecematerialid : workpieceisotypeCombo.getValue(),
						threadstandard : threadstandardCombo.getValue(),
						featurecode : getfeaturecode()
						
					}
				});
	}
	
	
	
	//刀片尺寸下拉框
	function bladesizeStoreLoad() {
		bladesizeStore.load({
					params : {
						threadtype : threadtypeCombo.getValue(),
						workpiecematerialid : workpieceisotypeCombo.getValue(),
						threadstandard : threadstandardCombo.getValue(),
						pitch : pitchCombo.getValue(),
						featurecode : getfeaturecode()
					}
				});
	}
	
	//刀体联动
	//刀体刀片尺寸下拉框      
	function threaddirection2StoreLoad() {
		threaddirection2Store.load({
					params : {
					
						featurecode : getfeaturecode2()
					}
				});
	}
	function bladesize2StoreLoad() {
		bladesize2Store.load({
					params : {
						threadtype : threadtypeCombo2.getValue(),
						diameter : diameterCombo.getValue(),
						featurecode : getfeaturecode2()
					}
				});
	}
	//螺纹类型下拉框
	function threadtypeCombo2StoreLoad() {
		threadtypeCombo2Store.load({
					params : {
						threaddirection : threaddirectionCombo2.getValue(),
						featurecode : getfeaturecode2()
					}
				});
	}
	
	//刀体螺纹直径下拉框
	function diameter2StoreLoad() {
		diameter2Store.load({
					params : {
						threadtype : threadtypeCombo2.getValue(),
						featurecode : getfeaturecode2()
					}
				});
	}
	
	//刀体接口尺寸下拉框
	function portsize2StoreLoad() {
		portsizeStore.load({
					params : {
						threadtype : threadtypeCombo2.getValue(),
						diameter : diameterCombo.getValue(),
						bladesize : bladesizeCombo2.getValue(),
						featurecode : getfeaturecode2()
					}
				});
	}
	// 行号
	var rownum_iso = new Ext.grid.RowNumberer({
				header : '序',
				width : 26
			});

	var workpieceisotypeCm = new Ext.grid.ColumnModel([rownum_iso, {
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
							// if="xindex % 5
							// === 0"></tr><tr></tpl></tpl></tr></table>',
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

									// refreshThreadblade();
								}
							}
						}, '->', {
							text : '清空材料牌号',
							iconCls : 'tbar_synchronizeIcon',
							handler : function() {
								workpieceisotypeCombo.reset();
								selectMenu.hide();

								// workpieceisotypeCombo.setValue('');
								// workpieceisotypeCombo.setRawValue('');

								// refreshThreadblade();
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
						 * workpieceisotypeCombo.setValue(r.get('workpiecematerialid'));
						 * workpieceisotypeCombo.setRawValue(r.get('name'));
						 * refreshThreadblade();
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
		 * workpieceisotypeCombo.setValue(Ext.getCmp('inputname_isotype').getValue());
		 * workpieceisotypeCombo.setRawValue(va.substring(0, va.indexOf('-')));
		 * refreshThreadblade();
		 */
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
						//alert(workpieceisotypeCombo.getValue());
						threadstandardStoreLoad();
						pitchStoreLoad();
						bladesizeStoreLoad();
						// infoMsg('sfgsfdg');
						threaddirectionStoreLoad();
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
						refreshThreadblade();
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

	// 进给方向数据
	var threaddirectionStore = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
					url : 'screwcutting.do?code=queryThreaddirectionInThreadblade'
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
	threaddirectionStore.load();

	// 进给方向下拉框
	var threaddirectionCombo = new Ext.form.ComboBox({
		fieldLabel : '进给方向',
		hiddenName : 'threaddirection',
		id : 'threaddirectionidid',
		emptyText : '请选择...',
		triggerAction : 'all',
		store : threaddirectionStore,
		displayField : 'text',
		valueField : 'value',
		selectOnFocus : true,
		loadingText : '正在加载数据...',
		mode : 'local',
		forceSelection : true,
		editable : false,
		// pageSize : cln,
		// minListWidth : 270,
		plugins : [new QM.plugin.PinyinFilter],
		resizable : true,
		width : document.body.clientWidth / numlign - divnum,
		listWidth : threaddirectionArr[0] * threaddirectionpp + 5,
		tpl : '<tpl for="."><div x-combo-list-item class="x-combo-list-item"><img src="'
				+ webContext
				+ '/dec/combo/screw/direction/'
				+ '{value}'
				+ '.png" width='
				+ threaddirectionArr[0]
				* threaddirectionpp
				+ ' height='
				+ threaddirectionArr[1]
				* threaddirectionpp
				+ '></div></tpl>',
		listeners : {
			focus : function() {
				// accuracyStore.load();
				setTimeout('Ext.getCmp("threaddirectionidid").expand();', 1);
			},
			select : function() {
				threaddirectionCombo2.setValue(threaddirectionCombo.getValue());
				threadtypeCombo.enable();
				threadtypeCombo.reset();
				threadtypeCombo2.enable();
				threadtypeCombo2.setValue('');
				threadtypeStoreLoad();
			},
			specialkey : function(c, e) {
				if (e.getKey() == e.ESC) {
					c.reset();
					threaddirectionCombo2.setValue('');
					threadtypeCombo.reset();
					threadtypeCombo2.setValue('');
					if (parent.grf == true) {
						threadtypeCombo.disable();
						threadtypeCombo2.disable();
					} else {
						threadtypeCombo.enable();
						threadtypeCombo2.enable();
					}
					refreshThreadblade();
				}
			}
		}
	});

	// 螺纹类型据
	var threadtypeStore = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
					url : 'screwcutting.do?code=queryThreadtypeInThreadblade'
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
	threadtypeStore.load();
	// 螺纹类型下拉框
	var threadtypeCombo = new Ext.form.ComboBox({
		fieldLabel : '车削类型',
		hiddenName : 'threadtype',
		id : 'threadtypeidid',
		emptyText : '请选择...',
		triggerAction : 'all',
		disabled : true,
		store : threadtypeStore,
		displayField : 'text',
		valueField : 'value',
		selectOnFocus : true,
		loadingText : '正在加载数据...',
		mode : 'local',
		forceSelection : true,
		editable : false,
		// pageSize : cln,
		// minListWidth : 270,
		plugins : [new QM.plugin.PinyinFilter],
		resizable : true,
		width : document.body.clientWidth / numlign - divnum,
		listWidth : threadtypeArr[0] * threadtypepp + 25,
		tpl : '<tpl for="."><div x-combo-list-item class="x-combo-list-item"><img src="'
				+ webContext
				+ '/dec/combo/screw/threadtype/'
				+ '{value}'
				+ '.png" width='
				+ threadtypeArr[0]
				* threadtypepp
				+ ' height='
				+ threadtypeArr[1] * threadtypepp + '></div></tpl>',
		listeners : {
			focus : function() {
				// accuracyStore.load();
				setTimeout('Ext.getCmp("threadtypeidid").expand();', 1);
			},
			select : function() {
				threadtypeCombo2.setValue(threadtypeCombo.getValue());
				//alert(threadtypeCombo.getValue());
				threadstandardStoreLoad();
				refreshThreadblade();
				pitchStoreLoad();
				bladesizeStoreLoad();
			},
			expand : function(c) {
				if (c.getStore().isFiltered()) {
					c.getStore().clearFilter(true);
				}
				c.getStore().filter([{
							property : 'value',
							value : threaddirectionCombo.getValue(),
							anyMatch : false,
							caseSensitive : false
						}, {
							fn : function(record) {
								return record.get('value').substring(0, 1) == threaddirectionCombo
										.getValue();
							}
						}]);
			},
			specialkey : function(c, e) {
				if (e.getKey() == e.ESC) {
					c.reset();
					threadtypeCombo2.setValue('');
					refreshThreadblade();
				}
			}
		}
	});

	
	// 螺纹标准数据
	var threadstandardStore = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
					url : 'screwcutting.do?code=queryThreadstandardInThreadblade'
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
	threadstandardStore.load();
	
	// 螺纹标准下拉框
	var threadstandardCombo = new Ext.form.ComboBox({
				fieldLabel : '螺纹标准',
				hiddenName : 'threadstandard',
				id : 'threadstandardidid',
				emptyText : '请选择...',
				triggerAction : 'all',
				store : threadstandardStore,
				displayField : 'text',
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
				listWidth : 200,
				listeners : {
					focus : function() {
						// accuracyStore.load();
						setTimeout(
								'Ext.getCmp("threadstandardidid").expand();', 1);
					},
					select : function() {
						pitchCombo.enable();
						refreshThreadblade();
						/*pitchStore.load({
									params : {
										threadstandard : threadstandardCombo
												.getValue()
									}
								});*/
						pitchStoreLoad();
						bladesizeStoreLoad();
						//alert(threadstandardCombo.getValue())
						// TSPITCHStore.load();
					},
					specialkey : function(c, e) {
						if (e.getKey() == e.ESC) {
							c.reset();
							pitchCombo.reset();
							if (parent.grf == true) {
								pitchCombo.disable();
							}
							refreshThreadblade();
						}
					}
				}
			});

	var pitchStore = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
					url : 'screwcutting.do?code=queryPitchInThreadblade'
				}),
		reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT',
					sortInfo : {
						field : "fieldName",
						direction : "DESC"
					},
					fields : [{
								name : 'screwcutting.do?code=queryPitchInThreadblade',
								type : 'string'
							}]
				}, [{
							name : 'value',
							type : 'string'
						}])
	});
	pitchStore.load({
				/*params : {
					threadstandard : threadstandardCombo.getValue()
					
				}*/
			});

	// 螺距下拉框
	var pitchCombo = new Ext.form.ComboBox({
				fieldLabel : '螺距',
				hiddenName : 'pitch',
				id : 'pitchidid',
				emptyText : '请选择...',
				triggerAction : 'all',
				disabled : true,
				store : pitchStore,// TSPITCHStore,
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
						// accuracyStore.load();
						setTimeout('Ext.getCmp("pitchidid").expand();', 1);
					},
					select : function() {
						refreshThreadblade();
						bladesizeStoreLoad();
						//alert(pitchCombo.getValue());
					},
					specialkey : function(c, e) {
						if (e.getKey() == e.ESC) {
							c.reset();
							refreshThreadblade();
						}
						if (e.getKey() == e.ENTER) {
							c.setValue(Ext.get('pitchidid').dom.value);
							refreshThreadblade();
						}
					}/*
						 * , expand : function(c) { if
						 * (c.getStore().isFiltered()) {
						 * c.getStore().clearFilter(true); }
						 * c.getStore().filter([{ property : 'value', value :
						 * threadstandardCombo.getValue(), anyMatch : false,
						 * caseSensitive : false }, { fn : function(record) {
						 * return record.get('value').substring(0, 1) ==
						 * threadstandardCombo.getValue(); } }]); }
						 */
				}
			});
	// 螺纹刀片尺寸数据
	var bladesizeStore = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
					url : 'screwcutting.do?code=queryBladesizeInThreadblade'
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
	bladesizeStore.load();
	
	// 螺纹刀片尺寸下拉框
	var bladesizeCombo = new Ext.form.ComboBox({
				fieldLabel : '刀片尺寸',
				hiddenName : 'bladesize',
				id : 'bladesizeidid',
				emptyText : '请选择...',
				triggerAction : 'all',
				store : bladesizeStore,
				displayField : 'text',
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
						// accuracyStore.load();
						setTimeout('Ext.getCmp("bladesizeidid").expand();', 1);
					},
					select : function() {
						bladesizeCombo2.setValue(bladesizeCombo.getValue());
						refreshThreadblade();
					},
					specialkey : function(c, e) {
						if (e.getKey() == e.ESC) {
							c.reset();
							bladesizeCombo2.setValue('');
							refreshThreadblade();
						}
						if (e.getKey() == e.ENTER) {
							c.setValue(Ext.get('bladesizeidid').dom.value);
							refreshThreadblade();
						}
					}
				}
			});
	// 进给方向数据
	var threaddirection2Store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
					url : 'screwcutting.do?code=querythreaddirection2InThreadtoolholder'
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
	threaddirection2Store.load();
	
	// 进给方向下拉框
	var threaddirectionCombo2 = new Ext.form.ComboBox({
		fieldLabel : '进给方向',
		hiddenName : 'threaddirection',
		id : 'threaddirectionidid2',
		emptyText : '请选择...',
		triggerAction : 'all',
		store : threaddirection2Store,
		displayField : 'text',
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
		listWidth : threaddirectionArr[0] * threaddirectionpp + 5,
		tpl : '<tpl for="."><div x-combo-list-item class="x-combo-list-item"><img src="'
				+ webContext
				+ '/dec/combo/screw/direction/'
				+ '{value}'
				+ '.png" width='
				+ threaddirectionArr[0]
				* threaddirectionpp
				+ ' height='
				+ threaddirectionArr[1]
				* threaddirectionpp
				+ '></div></tpl>',
		listeners : {
			focus : function() {
				// accuracyStore.load();
				setTimeout('Ext.getCmp("threaddirectionidid2").expand();', 1);
			},
			select : function() {
				threaddirectionCombo.setValue(threaddirectionCombo2.getValue());
				threadtypeCombo.enable();
				threadtypeCombo.setValue('');
				threadtypeCombo2.enable();
				threadtypeCombo2.reset();
				threadtypeCombo2StoreLoad();
				//alert(threaddirectionCombo2.getValue());
			},
			specialkey : function(c, e) {
				if (e.getKey() == e.ESC) {
					c.reset();
					threaddirectionCombo.setValue('');
					threadtypeCombo2.reset();
					threadtypeCombo.setValue('');
					if (parent.grf == true) {
						threadtypeCombo.disable();
						threadtypeCombo2.disable();
					} else {
						threadtypeCombo.enable();
						threadtypeCombo2.enable();
					}
					refreshThreadblade();
				}
			}
		}
	});

	// 螺纹类型数据
	var threadtypeCombo2Store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : 'screwcutting.do?code=queryThreadtype2InThreadtoolholder'
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
	threadtypeCombo2Store.load();
	// 车削类型下拉框
	var threadtypeCombo2 = new Ext.form.ComboBox({
		fieldLabel : '车削类型',
		hiddenName : 'threadtype',
		id : 'threadtypeidid2',
		emptyText : '请选择...',
		triggerAction : 'all',
		disabled : true,
		store : threadtypeCombo2Store,
		displayField : 'text',
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
		listWidth : threadtypeArr[0] * threadtypepp + 25,
		tpl : '<tpl for="."><div x-combo-list-item class="x-combo-list-item"><img src="'
				+ webContext
				+ '/dec/combo/screw/threadtype/'
				+ '{value}'
				+ '.png" width='
				+ threadtypeArr[0]
				* threadtypepp
				+ ' height='
				+ threadtypeArr[1] * threadtypepp + '></div></tpl>',
		listeners : {
			focus : function() {
				// accuracyStore.load();
				setTimeout('Ext.getCmp("threadtypeidid2").expand();', 1);
			},
			select : function() {
				threadtypeCombo.setValue(threadtypeCombo2.getValue());
				if (threadtypeCombo2.getValue().substring(1, 2).toUpperCase() == "I") {
					diameterCombo.reset();
					Ext.getCmp('diameterlabel').show();
					Ext.getCmp('diameterlabel-sep').show();
					diameterCombo.show();
				} else {
					diameterCombo.reset();
					Ext.getCmp('diameterlabel').hide();
					Ext.getCmp('diameterlabel-sep').hide();
					diameterCombo.hide();
				}
				refreshThreadtoolholder();
				diameter2StoreLoad();
				
				bladesize2StoreLoad();
				portsize2StoreLoad();
				//alert(threadtypeCombo2.getValue());
			},
			expand : function(c) {
				if (c.getStore().isFiltered()) {
					c.getStore().clearFilter(true);
				}
				c.getStore().filter([{
							property : 'value',
							value : threaddirectionCombo2.getValue(),
							anyMatch : false,
							caseSensitive : false
						}, {
							fn : function(record) {
								return record.get('value').substring(0, 1) == threaddirectionCombo2
										.getValue();
							}
						}]);
			},
			specialkey : function(c, e) {
				if (e.getKey() == e.ESC) {
					c.reset();
					threadtypeCombo.setValue('');
					diameterCombo.reset();
					diameterCombo.hide();
					Ext.getCmp('diameterlabel').hide();
					Ext.getCmp('diameterlabel-sep').hide();
					refreshThreadtoolholder();
				}
			}
		}
	});
	//  螺纹直径数据
	var diameter2Store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : 'screwcutting.do?code=querydiameter2InThreadtoolholder'
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
	diameter2Store.load();
	// 螺纹直径下拉框
	var diameterCombo = new Ext.form.ComboBox({
				fieldLabel : '螺纹直径',
				hiddenName : 'diameter',
				id : 'diameteridid',
				emptyText : '请选择...',
				triggerAction : 'all',
				hidden : true,
				store : diameter2Store,
				displayField : 'text',
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
						// accuracyStore.load();
						setTimeout('Ext.getCmp("diameteridid").expand();', 1);
					},
					select : function() {
						refreshThreadtoolholder();
						bladesize2StoreLoad();
						portsize2StoreLoad();
						//alert(diameterCombo.getValue());
					},
					specialkey : function(c, e) {
						if (e.getKey() == e.ESC) {
							c.reset();
							refreshThreadtoolholder();
						}
					}
				}
			});
	// 螺纹刀片尺寸数据
	var bladesize2Store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : 'screwcutting.do?code=querybladesize2InThreadtoolholder'
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
	bladesize2Store.load();
	// 螺纹刀片尺寸下拉框
	var bladesizeCombo2 = new Ext.form.ComboBox({
				fieldLabel : '刀片尺寸',
				hiddenName : 'bladesize',
				id : 'bladesizeidid2',
				emptyText : '请选择...',
				triggerAction : 'all',
				store : bladesize2Store,
				displayField : 'text',
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
						// accuracyStore.load();
						setTimeout('Ext.getCmp("bladesizeidid2").expand();', 1);
					},
					select : function() {
						bladesizeCombo.setValue(bladesizeCombo2.getValue());
						refreshThreadtoolholder();
						portsize2StoreLoad();
						//alert(bladesizeCombo2.getValue());
					},
					specialkey : function(c, e) {
						if (e.getKey() == e.ESC) {
							c.reset();
							bladesizeCombo.setValue('');
							refreshThreadtoolholder();
						}
					}
				}
			});
//  接口规格数据
	var portsizeStore = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : 'screwcutting.do?code=queryportsizeInThreadtoolholder'
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
	portsizeStore.load();
	// 接口规格下拉框
	var portsizeCombo = new Ext.form.ComboBox({
		fieldLabel : '接口规格',
		hiddenName : 'portsize',
		id : 'portsizeidid',
		emptyText : '请选择...',
		triggerAction : 'all',
		store : portsizeStore,
		displayField : 'text',
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
				setTimeout('Ext.getCmp("portsizeidid").expand();', 1);
			},
			select : function() {
				refreshThreadtoolholder();
				//alert(portsizeCombo.getValue());
			},
			specialkey : function(c, e) {
				if (e.getKey() == e.ESC) {
					c.reset();
					refreshThreadtoolholder();
				}
			}
		}
	});

	var tbar = new Ext.Toolbar({// workpiecematerialCombo
		// //workpieceisotypeCombo
		items : [new Ext.Toolbar.TextItem({
							text : '工件材料:',
							autoHeight : true
						}), workpieceisotypeCombo, '-',
				new Ext.Toolbar.TextItem({
							text : '进给方向:',
							autoHeight : true
						}), threaddirectionCombo, '-',
				new Ext.Toolbar.TextItem({
							text : '螺纹类型:',
							autoHeight : true
						}), threadtypeCombo, '-', new Ext.Toolbar.TextItem({
							text : '螺纹标准:',
							autoHeight : true
						}), threadstandardCombo, '-',
				new Ext.Toolbar.TextItem({
							text : '螺纹螺距:',
							autoHeight : true
						}), pitchCombo, '-', new Ext.Toolbar.TextItem({
							text : '刀片尺寸:',
							autoHeight : true
						}), bladesizeCombo,'-', '-', {
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
				}]
	});

	// 页面过滤
	var filtersThreadblade = new Ext.ux.grid.GridFilters({// string,numeric,date,list,boolean
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
					dataIndex : 'figure',
					type : 'string'
				}, {
					dataIndex : 'figure2',
					type : 'string'
				}, {
					dataIndex : 'threadtype',
					type : 'string'
				}, {
					dataIndex : 'bladematerialname',
					type : 'string'
				}, {
					dataIndex : 'brandname',
					type : 'string'
				}, {
					dataIndex : 'pitch',
					type : 'string'
				}, {
					dataIndex : 'threadstandard',
					type : 'string'
				}, {
					dataIndex : 'blademold',
					type : 'string'
				}, {
					dataIndex : 'bladesize',
					type : 'string'
				}, {
					dataIndex : 'handoftool',
					type : 'string'
				}, {
					dataIndex : 'thickness',
					type : 'string'
				}, {
					dataIndex : 'threadhand',
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
					dataIndex : 'fnmax',
					type : 'numeric'
				}, {
					dataIndex : 'remark',
					type : 'string'
				}
		/*
		 * { type : 'list', dataIndex : 'size', options : ['extra small',
		 * 'small', 'medium', 'large', 'extra large'] }
		 */]
	});

	// 页面过滤
	var filtersThreadtoolholder = new Ext.ux.grid.GridFilters({// string,numeric,date,list,boolean
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
					dataIndex : 'figure',
					type : 'string'
				}, {
					dataIndex : 'figure2',
					type : 'string'
				}, {
					dataIndex : 'brandname',
					type : 'string'
				}, {
					dataIndex : 'threadtype',
					type : 'string'
				}, {
					dataIndex : 'portsize',
					type : 'string'
				}, {
					dataIndex : 'handoftool',
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
					dataIndex : 'diameter',
					type : 'numeric'
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
		 * { type : 'list', dataIndex : 'size', options : ['extra small',
		 * 'small', 'medium', 'large', 'extra large'] }
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
				store : threadbladeStore,
				stripeRows : true,
				sm : sm,
				cm : threadbladeCm,
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
				plugins : [filtersThreadblade],
				stateful : sf,
				stateId : 'grid-sc-thread-blade',
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
	 * var tbar2 = new Ext.Toolbar({ items : [turningtypeCombo, '-', '-',
	 * thheadangleCombo, '-', '-', handoftoolCombo, '-', '-', shapeCombo2, '-',
	 * '-', reliefangleCombo2, '-', '-', portsizeCombo, '-', '-', cseriesCombo,
	 * '->', { text : '重置', iconCls : 'tbar_synchronizeIcon', handler :
	 * function() { resetCombo2(); } }] });
	 */

	var tbar2 = new Ext.Toolbar({// workpiecematerialCombo
		items : [new Ext.Toolbar.TextItem({
							text : '进给方向:',
							autoHeight : true                                   
						}), threaddirectionCombo2, '-',
				new Ext.Toolbar.TextItem({
							text : '螺纹类型:',
							autoHeight : true
						}), threadtypeCombo2, new Ext.Toolbar.Separator({
							id : 'diameterlabel-sep',
							hidden : true
						}), new Ext.Toolbar.TextItem({
							text : '螺纹直径:',
							id : 'diameterlabel',
							hidden : true,
							autoHeight : true
						}), diameterCombo, '-', new Ext.Toolbar.TextItem({
							text : '刀片尺寸:',
							autoHeight : true
						}), bladesizeCombo2, '-', new Ext.Toolbar.TextItem({
							text : '接口规格:',
							autoHeight : true
						}), portsizeCombo,'-', '-', {
							text : '打印预览',
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

	// 表格
	var grid2 = new Ext.grid.GridPanel({
				title : '<span class="commoncss">刀体选择</span>',
				header : false,
				height : 500,
				id : 'grid2id',
				autoScroll : true,
				frame : true,
				region : 'center',
				store : threadtoolholderStore,
				stripeRows : true,
				sm : sm2,
				cm : threadtoolholderCm,
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
				plugins : [filtersThreadtoolholder],
				stateful : sf,
				stateId : 'grid-sc-thread-toolholder'
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
	threadbladeStore.load({
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
	 * toolholderStore.load({ params : { start : 0, limit : bbar2.pageSize } });
	 */

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
								threadbladeStore.reload();
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
								threadtoolholderStore.reload();
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

	// 绑定右键
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

	var tabs = new Ext.TabPanel({
		region : 'center',
		id : 'tabsid',
		enableTabScroll : true,
		// autoWidth : true,
		activeTab : 0,
		height : document.body.clientHeight,
		width : document.body.clientWidth,
		buttonAlign : 'right',
		items : [grid, grid2],
		listeners : {
			tabchange : function(tabpanel, tab) {
				/*
				 * if (tab.getId() == 'gridid') {//激活了刀体grid;
				 * refreshThreadbladeForce(); } else if(tab.getId() ==
				 * 'grid2id') { refreshThreadtoolholderForce(); }
				 */
				if (tabpanel.getActiveTab().getId() == 'gridid') {
					workpieceisotypeStoreLoad();
					threaddirectionStoreLoad();
					threadstandardStoreLoad();
					//threadtypeCombo2StoreLoad();
					pitchStoreLoad();
					bladesizeStoreLoad();
					threadtypeCombo2StoreLoad();
					threadtypeStoreLoad();
					
					// 激活了刀体grid;
					// refreshThreadbladeForce();
					// bladeStore.reload();

					// var record =
					// grid2.getSelectionModel().getSelected();
					var records = grid2.getSelectionModel().getSelections();

					if (records.length == 0) {
						threadbladeStoreLoad();
					} else {
						if (records.length > 1) {
							infoMsg('您选择了 ' + records.length
									+ ' 个条目，选择单个条目会获得准确匹配。');
						}

						// grid.getSelectionModel().selectRow(grid.getSelectionModel().last,
						// false);
						threadbladeStore.load({
									params : {
										start : bbar.pageSize
												* (grid.getBottomToolbar()
														.getPageData().activePage - 1),
										limit : bbar.pageSize,
										featurecode : jsArray2JsString(records,
												'featurecode')
									}
								});
					}

				} else if (tabpanel.getActiveTab().getId() == 'grid2id') {
					
					threaddirection2StoreLoad();
					bladesize2StoreLoad() ;
					diameter2StoreLoad();
					portsize2StoreLoad() ;
					threadtypeCombo2StoreLoad();
					// toolholderStore.reload();
					// refreshThreadtoolholderForce();

					// var record =
					// grid.getSelectionModel().getSelected();
					var records = grid.getSelectionModel().getSelections();

					if (records.length == 0) {
						threadtoolholderStoreLoad();
					} else {
						if (records.length > 1) {
							infoMsg('您选择了 ' + records.length
									+ ' 个条目，选择单个条目会获得准确匹配。');
						}

						// grid.getSelectionModel().selectRow(grid.getSelectionModel().last,
						// false);
						threadtoolholderStore.load({
									params : {
										start : bbar2.pageSize
												* (grid2.getBottomToolbar()
														.getPageData().activePage - 1),
										limit : bbar2.pageSize,
										featurecode : jsArray2JsString(records,
												'featurecode')
									}
								});
					}

				}
			}
		}
	});

	// 布局模型
	var viewport = new Ext.Viewport({
				layout : 'border',
				items : [tabs]
			});

	// 刷新刀片
	function refreshThreadblade() {
		if (parent.grf == true) {
			refreshThreadbladeForce();
		}
	}

	// 刷新刀片
	function refreshThreadbladeForce() {
		threadbladeStoreLoad();
	}

	// 刷新刀体
	function refreshThreadtoolholder() {
		if (parent.grf == true) {
			refreshThreadtoolholderForce();
		}
	}

	function refreshThreadtoolholderForce() {
		threadtoolholderStoreLoad();
	}

	// 更新
	function resetCombo() {

		workpieceisotypeCombo.reset();

		threaddirectionCombo.setValue('');
		threadtypeCombo.setValue('');

		threadstandardCombo.reset();
		pitchCombo.reset();

		pitchCombo.disable();
		bladesizeCombo.setValue('');

		threaddirectionCombo2.setValue('');
		threadtypeCombo2.setValue('');
		bladesizeCombo2.setValue('');

		threadtypeCombo.disable();
		threadtypeCombo2.disable();
		threadstandardStoreLoad();
		pitchStoreLoad();
		bladesizeStoreLoad();
		workpieceisotypeStoreLoad();
		threadtypeStoreLoad();
		
		/*
		 * workpieceisotypeCombo.reset(); accuracyCombo.reset();
		 * shapeCombo.setValue(''); // shapeCombo.reset();
		 * reliefangleCombo.setValue(''); // reliefangleCombo.reset();
		 * celengthCombo.reset(); celengthCombo.disable();
		 * noseradiusCombo.reset(); shapeCombo2.setValue(''); //
		 * shapeCombo2.reset(); reliefangleCombo2.setValue(''); //
		 * reliefangleCombo2.reset(); // bladeStore.reload();
		 */
		/*
		 * .load({ params : { workpieceisotype : '', accuracyid : '', shape :
		 * '', reliefangle : '', celength : '', noseradius : '' } });
		 */

		/*
		 * toolholderStore.load({ params : { turningtype :
		 * turningtypeCombo.getValue(), thheadangle :
		 * thheadangleCombo.getValue(), handoftool : handoftoolCombo.getValue(),
		 * portsize : portsizeCombo.getValue(), cseries :
		 * cseriesCombo.getValue(), shapeblade : '', reliefangleblade : '' } });
		 */

		
		pagesize_combo.reset();
		bbar.pageSize = 50;
		threadbladeStoreLoad();
		var currentpage = 1;
		var currentpage = bbar.store.currentPage;
		bbar.moveFirst();

	}

	// 更新
	function resetCombo2() {
		
		threaddirectionCombo.reset();
		threadtypeCombo.reset();
		bladesizeCombo.reset();

		threaddirectionCombo2.setValue("");
		threadtypeCombo2.reset();
		bladesizeCombo2.reset();

		diameterCombo.reset();
		portsizeCombo.reset();

		threadtypeCombo.disable();
		threadtypeCombo2.disable();
		
		diameterCombo.hide();
		Ext.getCmp('diameterlabel').hide();
		Ext.getCmp('diameterlabel-sep').hide();
		/*
		 * turningtypeCombo.reset(); thheadangleCombo.reset();
		 * handoftoolCombo.reset(); portsizeCombo.reset(); cseriesCombo.reset();
		 * shapeCombo2.setValue(''); // shapeCombo2.reset();
		 * reliefangleCombo2.setValue(''); // reliefangleCombo2.reset();
		 * boreCombo.reset(); boreCombo.hide();
		 * Ext.getCmp('borelableid').hide(); shapeCombo.setValue(''); //
		 * shapeCombo.reset(); reliefangleCombo.setValue(''); //
		 * shapeCombo.reset(); celengthCombo.setValue('');
		 * celengthCombo.disable();
		 */
		/*
		 * bladeStore.load({ params : { workpieceisotype :
		 * workpieceisotypeCombo.getValue(), accuracyid :
		 * accuracyCombo.getValue(), shape : '', reliefangle : '', celength :
		 * celengthCombo.getValue(), noseradius : noseradiusCombo.getValue() }
		 * });
		 */

		// toolholderStore.reload();
		/*
		 * .load({ params : { turningtype : '', thheadangle : '', handoftool :
		 * '', portsize : '', cseries : '', shapeblade : '', reliefangleblade : '' }
		 * });
		 */
		threaddirection2StoreLoad();
		diameter2StoreLoad();
		bladesize2StoreLoad();
		portsize2StoreLoad();
		threadtypeCombo2StoreLoad();
		
	
		pagesize_combo2.reset();
		bbar2.pageSize = 50;
		threadtoolholderStoreLoad();
		var currentpage = 1;
		var currentpage = bbar2.store.currentPage;
		bbar2.moveFirst();
	};

	// 查看刀片详细信息

	function propertyDisplay() {
		var record = grid.getSelectionModel().getSelected();
		var index = grid.getStore().indexOf(record);

		var path = checkImagePath(record.data.figure);
		var path2 = checkImagePath(record.data.figure2);

		
//		品牌跳转
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
					
					name : record.data.brandname
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
		
			cm : threadbladeCm,
		
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
	
		

		
//		材质跳转		
		
		

		
		  var  materailStore = new Ext.data.GroupingStore({
				proxy : new Ext.data.HttpProxy({
					url : 'screwcutting.do?code=querythreadbladematerial'
						
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
					ds : threadbladeStore,
					cm : threadbladeCm,
					id : 'propertyGridid',
					enableColLock : true,
					enableColumnMove : false,
					autoExpandColumn : true,
					loadMask : true,
					stripeRows : true,
					autoScroll : true,
					clicksToEdit : 1,
					propertyNames : {
						/* 'threadbladeid' : '刀片ID', */

						'name' : '刀片名称',
						'sapcode' : 'SAP编码',
						'bladetype' : '刀片型号',
						'threadtype' : '车削类型',
						'bladematerialname' : '刀片材质',
						/* 'brandid' : '刀片品牌ID', */
						'brandname' : '品牌名称',
						'pitch' : '螺距',
						'threadstandard' : '螺纹标准',
						'blademold' : '刀片类型',
						'bladesize' : '刀片尺寸',
						'thickness' : '刀片厚度',
						'threadhand' : '刀片左右手',
						'description' : '特征描述',
						'featurecode' : '刀片特征码',
						'apmax' : '最大走刀次数',
						'fnmax' : '最小走刀次数',
						'figure' : '结构简图',
						'figure2' : '尺寸图',
						// 'bladematerialid' : '刀片材质ID',
						'remark' : '备注信息'
					},
					/*
					 * customEditors : { 'turningtype' : new
					 * Ext.grid.GridEditor( new Ext.form.ComboBox({ displayField :
					 * 'text', mode : 'local', triggerAction : 'all', store :
					 * TURNINGTYPEStore })), 'reliefangle' : new
					 * Ext.grid.GridEditor( new Ext.form.ComboBox({ displayField :
					 * 'text', mode : 'local', triggerAction : 'all', store :
					 * RELIEFANGLEStore })), 'shape' : new Ext.grid.GridEditor(
					 * new Ext.form.ComboBox({ displayField : 'text', mode :
					 * 'local', triggerAction : 'all', store : SHAPEStore })),
					 * 'celength' : new Ext.grid.GridEditor( new
					 * Ext.form.ComboBox({ displayField : 'text', mode :
					 * 'local', triggerAction : 'all', store : CELENGTHStore
					 * })), 'noseradius' : new Ext.grid.GridEditor( new
					 * Ext.form.ComboBox({ displayField : 'text', mode :
					 * 'local', triggerAction : 'all', store : NOSERADIUSStore
					 * })), 'thickness' : new Ext.grid.GridEditor( new
					 * Ext.form.ComboBox({ displayField : 'text', mode :
					 * 'local', triggerAction : 'all', store : THICKNESSStore
					 * })) }, customRenderers : { 'turningtype' :
					 * TURNINGTYPERender, 'reliefangle' : RELIEFANGLERender,
					 * 'shape' : SHAPERender, 'celength' : CELENGTHRender,
					 * 'noseradius' : NOSERADIUSRender, 'thickness' :
					 * THICKNESSRender },
					 */
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
						
					else if (record.data.name=="品牌名称"&&record.data.value!==""){
						
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
		 * var ctparameterPropertyGrid = new Ext.grid.PropertyGrid({ title :
		 * '切削参数', border : true, frame : true, tabTip : '切削参数不可用时，请先选择材料牌号。',
		 * id : 'ctparameterid', loadMask : true, propertyNames : { //
		 * 'parametersid' : '切削参数ID', // 'workpiecematerialid' : '工件材料代码ID', //
		 * 'bladematerialid' : '刀片材质ID', 'workpiecematerialname' : '工件材料代码',
		 * 'bladematerialname' : '刀片材质', 'vcmax' : '最大切削速度(m/min)', 'vcmin' :
		 * '最小切削速度(m/min)' }, listeners : { beforeedit : function(e) { e.cancel =
		 * true; return false; } } });
		 */
		var parameterStore = new Ext.data.GroupingStore({
					proxy : new Ext.data.HttpProxy({
						url : 'screwcutting.do?code=queryCtparameter'
							// queryMilling_blade_clamp4Manage是在TempletmillingAction中的方法queryMilling_blade_clamp4Manage;
						}),
					reader : new Ext.data.JsonReader({
								totalProperty : 'TOTALCOUNT',
								root : 'ROOT'
							}, [{
										name : 'vcmax'
									}, {
										name : 'vcmin'
									}, {
										name : 'apmax'
									}, {
										name : 'fnmax'
									}])
				});
		// 列模型
		var parameterCm = new Ext.grid.ColumnModel([{
					header : 'Vc max<br />(m/min)',
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
				}, {
					header : '最大走刀次数',
					dataIndex : 'apmax',
					width : 90,
					align : 'center',
					// renderer : THICKNESS2Render,
					// hidden : true,
					sortable : true
				}, {
					header : '最小走刀次数',
					dataIndex : 'fnmax',
					width : 90,
					align : 'center',
					// renderer : THICKNESS2Render,
					// hidden : true,
					sortable : true
				}]);
		var cuttingparameter = new Ext.grid.GridPanel({
			title : '切削参数',
			header : false,
			id : 'ctparameterid',
			height : 500,
			// id : 'grid2id',
			autoScroll : true,
			frame : true,
			disabled : true,
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
				// plugins : [filtersToolholder],
				// stateful : true,
				// stateId : 'grid-cut-toolholder'
			}	// TODO
		);
		var picturePanel = new Ext.Panel({
			title : '结构简图',
			id : 'picturePanel_bkadeid_1',
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
			items : [{
				xtype : 'box',
				id : 'boxid',
				autoEl : {
					tag : 'img',
					style : 'width:80%;height:80%;position:relative;top:10%;left:10%',
					src : path
				}
			}]
				// view : new Ext.grid.GroupingView(),
				// plugins : [filtersToolholder],
				// stateful : true,
				// stateId : 'grid-generalturning-toolholder'
		});

		var sizePanel = new Ext.Panel({
			title : '尺寸简图',
			id : 'picturePanel_bkadeid_2',
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
			items : [{
				xtype : 'box',
				id : 'boxid2',
				autoEl : {
					tag : 'img',
					style : 'width:80%;height:80%;position:relative;top:10%;left:10%',
					src : path2
				}
			}]
				// view : new Ext.grid.GroupingView(),
				// plugins : [filtersToolholder],
				// stateful : true,
				// stateId : 'grid-generalturning-toolholder'
		});

		var threadtoolholderStorePanel = new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
						url : 'screwcutting.do?code=queryThreadtoolholder4Manage'
							// queryThreadtoolholder4Manage是在ThreadtoolholderAction中的方法queryThreadtoolholder4Manage;
					}),
					reader : new Ext.data.JsonReader({
								totalProperty : 'TOTALCOUNT',
								root : 'ROOT'
							}, [{
										name : 'sapcode'
									}, {
										name : 'name'
									}, {
										name : 'brandname'
									}, {
										name : 'toolholdertype'
									}, {
										name : 'featurecode'
									}])
				});

		// 表格
		var threadtoolholderPanel = new Ext.grid.GridPanel({
					title : '匹配刀体',
					// header : false,
					autoScroll : true,
					id : 'threadtoolholderPanelid',
					// disabled : true,
					frame : true,
					region : 'center',
					store : threadtoolholderStorePanel,
					stripeRows : true,
					// sm : sm2,
					cm : new Ext.grid.ColumnModel([new Ext.grid.RowNumberer({
										header : '序',
										width : 26
									}), {
								header : 'SAP编码',
								dataIndex : 'sapcode',
								width : 60,
								sortable : true
							}, {
								header : '刀体名称',
								dataIndex : 'name',
								width : 70,
								sortable : true
								// hidden : true
						}	, {
								header : '刀体型号',
								dataIndex : 'toolholdertype',
								width : 130,
								// hidden : true,
								sortable : true
							}, {
								header : '刀体品牌',
								dataIndex : 'brandname',
								width : 60,
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
					items : [picturePanel, sizePanel, threadtoolholderPanel,
							sapPanel, cuttingparameter],
					listeners : {
						tabchange : function(tabpanel, tab) {
							dataLoadDynamic(tabpanel, cuttingparameter,
									threadtoolholderPanel,
									threadtoolholderStorePanel, parameterStore,
									sapPanel, sapStore);
						}
					}
				});

		var propertyDisplayWin = new Ext.Window({
			title : '刀片详细信息',
			width : 800,
			modal : true,
			height : 400,
			closable:false,
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
						propertygrid.setSource({
									'刀片名称' : record.data.name,
									'SAP编码' : record.data.sapcode,
									'刀片型号' : record.data.bladetype,
									'车削类型' : record.data.threadtype,
									'刀片材质' : record.data.bladematerialname,
									'品牌名称' : record.data.brandname,
									'螺距' : record.data.pitch,
									'螺纹标准' : record.data.threadstandard,
									'刀片类型' : record.data.blademold,
									'刀片尺寸' : record.data.bladesize,
									'刀片厚度' : record.data.thickness,
									'刀片左右手' : record.data.threadhand,
									'特征描述' : record.data.description,
									'刀片特征码' : record.data.featurecode,
									'最大走刀次数' : record.data.apmax,
									'最小走刀次数' : record.data.fnmax,

									'备注信息' : record.data.remark
								});
						Ext.getCmp('previousbtn').disable();
					} else {
						record = grid.getStore().getAt(index);
						propertygrid.setSource({
									'刀片名称' : record.data.name,
									'SAP编码' : record.data.sapcode,
									'刀片型号' : record.data.bladetype,
									'车削类型' : record.data.threadtype,
									'刀片材质' : record.data.bladematerialname,
									'品牌名称' : record.data.brandname,
									'螺距' : record.data.pitch,
									'螺纹标准' : record.data.threadstandard,
									'刀片类型' : record.data.blademold,
									'刀片尺寸' : record.data.bladesize,
									'刀片厚度' : record.data.thickness,
									'刀片左右手' : record.data.threadhand,
									'特征描述' : record.data.description,
									'刀片特征码' : record.data.featurecode,
									'最大走刀次数' : record.data.apmax,
									'最小走刀次数' : record.data.fnmax,

									'备注信息' : record.data.remark
								});
						Ext.getCmp('nextbtn').enable();
					}

					if (pictureTabs.getActiveTab().getItemId() == 'picturePanel_bkadeid_1') {
						var newsrc = checkImagePath(record.data.figure);
						Ext.getCmp('boxid').getEl().dom.src = newsrc;

					} else if (pictureTabs.getActiveTab().getItemId() == 'picturePanel_bkadeid_2') {
						var newsrc = checkImagePath(record.data.figure2);
						Ext.getCmp('boxid2').getEl().dom.src = newsrc;

					}
					 brandStore.load({
							
							params : {
								
								name : record.data.brandname
							}
						});
					
					  materailStore.load({
							
							params : {
								
								name : record.data.bladematerialname
							}
						});
					dataLoadDynamic(pictureTabs, cuttingparameter,
							threadtoolholderPanel, threadtoolholderStorePanel,
							parameterStore, sapPanel, sapStore);
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
						record = grid.getStore().getAt(index);
						propertygrid.setSource({
									'刀片名称' : record.data.name,
									'SAP编码' : record.data.sapcode,
									'刀片型号' : record.data.bladetype,
									'车削类型' : record.data.threadtype,
									'刀片材质' : record.data.bladematerialname,
									'品牌名称' : record.data.brandname,
									'螺距' : record.data.pitch,
									'螺纹标准' : record.data.threadstandard,
									'刀片类型' : record.data.blademold,
									'刀片尺寸' : record.data.bladesize,
									'刀片厚度' : record.data.thickness,
									'刀片左右手' : record.data.threadhand,
									'特征描述' : record.data.description,
									'刀片特征码' : record.data.featurecode,
									'最大走刀次数' : record.data.apmax,
									'最小走刀次数' : record.data.fnmax,

									'备注信息' : record.data.remark
								});
						Ext.getCmp('nextbtn').disable();
					} else {
						record = grid.getStore().getAt(index);
						propertygrid.setSource({
									'刀片名称' : record.data.name,
									'SAP编码' : record.data.sapcode,
									'刀片型号' : record.data.bladetype,
									'车削类型' : record.data.threadtype,
									'刀片材质' : record.data.bladematerialname,
									'品牌名称' : record.data.brandname,
									'螺距' : record.data.pitch,
									'螺纹标准' : record.data.threadstandard,
									'刀片类型' : record.data.blademold,
									'刀片尺寸' : record.data.bladesize,
									'刀片厚度' : record.data.thickness,
									'刀片左右手' : record.data.threadhand,
									'特征描述' : record.data.description,
									'刀片特征码' : record.data.featurecode,
									'最大走刀次数' : record.data.apmax,
									'最小走刀次数' : record.data.fnmax,

									'备注信息' : record.data.remark
								});
						Ext.getCmp('previousbtn').enable();
					}

					if (pictureTabs.getActiveTab().getItemId() == 'picturePanel_bkadeid_1') {
						var newsrc = checkImagePath(record.data.figure);
						Ext.getCmp('boxid').getEl().dom.src = newsrc;

					} else if (pictureTabs.getActiveTab().getItemId() == 'picturePanel_bkadeid_2') {
						var newsrc = checkImagePath(record.data.figure2);
						Ext.getCmp('boxid2').getEl().dom.src = newsrc;

					}
					
					 brandStore.load({
							
							params : {
								
								name : record.data.brandname
							}
						});
					 
					  materailStore.load({
							
							params : {
								
								name : record.data.bladematerialname
							}
						});
					dataLoadDynamic(pictureTabs, cuttingparameter,
							threadtoolholderPanel, threadtoolholderStorePanel,
							parameterStore, sapPanel, sapStore);
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
					
					materailDisplayWin.close();
				}
			}],
			listeners : {
				afterrender : function(tabpanel, tab) {
					propertygrid.setSource({
								'刀片名称' : record.data.name,
								'SAP编码' : record.data.sapcode,
								'刀片型号' : record.data.bladetype,
								'车削类型' : record.data.threadtype,
								'刀片材质' : record.data.bladematerialname,
								'品牌名称' : record.data.brandname,
								'螺距' : record.data.pitch,
								'螺纹标准' : record.data.threadstandard,
								'刀片类型' : record.data.blademold,
								'刀片尺寸' : record.data.bladesize,
								'刀片厚度' : record.data.thickness,
								'刀片左右手' : record.data.threadhand,
								'特征描述' : record.data.description,
								'刀片特征码' : record.data.featurecode,
								'最大走刀次数' : record.data.apmax,
								'最小走刀次数' : record.data.fnmax,

								'备注信息' : record.data.remark
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

		
//		品牌跳转
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
					
					name : record.data.brandname
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
					ds : threadtoolholderStore,
					cm : threadtoolholderCm,
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

						'name' : '刀体名称',
						'sapcode' : 'SAP编码',
						'toolholdertype' : '刀体型号',
						/* 'toolholderid' : '刀体品牌ID', */
						'brandname' : '刀体品牌名称',
						'threadtype' : '车削类型',
						'portsize' : '接口规格',
						'handoftool' : '切削方向',
						'featurecode' : '刀片形式',
						'cseries' : '刀片夹紧方式',
						'length' : '刀体长度',
						'width' : '刀体宽度',
						'diameter' : '螺纹直径',
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
						'figure' : '结构简图',
						'figure2' : '尺寸图',
						'remark' : '备注'
					},
					listeners : {
						
						rowclick :function(propertygrid, rowIndex, columnIndex, e) {
							var store = propertygrid.getStore();
							var record = store.getAt(rowIndex);
						
					if (record.data.name=="刀体品牌名称"&&record.data.value!==""){
						
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
		 * var cuttingparameter2 = new Ext.grid.GridPanel({ title : '切削参数',
		 * header : false, height : 500, //id : 'grid2id', autoScroll : true,
		 * frame : true, disabled : true, region : 'center', //store :
		 * toolholderStore, stripeRows : true, //sm : sm2, //cm : toolholderCm,
		 * //tbar : tbar2, //bbar : bbar2, viewConfig : { forceFit : false //
		 * 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况 }, loadMask : { msg :
		 * '正在加载表格数据,请稍等...' } //view : new Ext.grid.GroupingView(), //plugins :
		 * [filtersToolholder], //stateful : true, //stateId :
		 * 'grid-generalturning-toolholder' } );
		 */

		var picturePanel2 = new Ext.Panel({
			title : '结构简图',
			id : 'picturePanel2_toolholderid_1',
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
			items : [{
				xtype : 'box',
				id : 'boxid3',
				autoEl : {
					tag : 'img',
					style : 'width:80%;height:80%;position:relative;top:10%;left:10%',
					src : path
				}
			}]
				// view : new Ext.grid.GroupingView(),
				// plugins : [filtersToolholder],
				// stateful : true,
				// stateId : 'grid-generalturning-toolholder'
		});

		var sizePanel2 = new Ext.Panel({
			title : '尺寸简图',
			id : 'picturePanel2_toolholderid_2',
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
			items : [{
				xtype : 'box',
				id : 'boxid4',
				autoEl : {
					tag : 'img',
					style : 'width:80%;height:80%;position:relative;top:10%;left:10%',
					src : path2
				}
			}]
				// view : new Ext.grid.GroupingView(),
				// plugins : [filtersToolholder],
				// stateful : true,
				// stateId : 'grid-generalturning-toolholder'
		});

		var threadbladeStorePanel = new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
						url : 'screwcutting.do?code=queryThreadblade4Manage'
							// queryThreadblade4Manage是在ThreadbladeAction中的方法queryThreadblade4Manage;
						}),
					reader : new Ext.data.JsonReader({
								totalProperty : 'TOTALCOUNT',
								root : 'ROOT'
							}, [{
										name : 'sapcode'
									}, {
										name : 'name'
									}, {
										name : 'brandname'
									}, {
										name : 'bladetype'
									}, {
										name : 'featurecode'
									}])
				});

		// 表格
		var threadbladePanel = new Ext.grid.GridPanel({
					title : '匹配刀片',
					// header : false,
					autoScroll : true,
					id : 'threadbladePanelid',
					// disabled : true,
					frame : true,
					region : 'center',
					store : threadbladeStorePanel,
					stripeRows : true,
					// sm : sm2,
					cm : new Ext.grid.ColumnModel([new Ext.grid.RowNumberer({
										header : '序',
										width : 26
									}), {
								header : 'SAP编码',
								dataIndex : 'sapcode',
								width : 60,
								sortable : true
							}, {
								header : '刀片名称',
								dataIndex : 'name',
								width : 60,
								// hidden : true,
								sortable : true
							}, {
								header : '刀片型号',
								dataIndex : 'bladetype',
								width : 130,
								// hidden : true,
								sortable : true
							}, {
								header : '刀片品牌',
								dataIndex : 'brandname',
								width : 60,
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
					items : [picturePanel2, sizePanel2, /* cuttingparameter2, */
							threadbladePanel, sapPanel2],
					listeners : {
						tabchange : function(tabpanel, tab) {
							if (tab.getId() == 'threadbladePanelid') {
								threadbladeStorePanel.load({
											params : {
												featurecode : record.data.featurecode
											}
										});
							} else if (tab.getId() == 'picturePanel2_toolholderid_1') {
								var newsrc = checkImagePath(record.data.figure);
								Ext.getCmp('boxid3').getEl().dom.src = newsrc;
							} else if (tab.getId() == 'picturePanel2_toolholderid_2') {
								var newsrc = checkImagePath(record.data.figure2);
								Ext.getCmp('boxid4').getEl().dom.src = newsrc;
							} else if (tab.getId() == 'sapPanel2id') {
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
			title : '刀体详细信息',
			width : 800,
			modal : true,
			height : 400,
			closeAction : 'close',
			closable:false,
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
						propertygrid2.setSource({
									'刀体名称' : record.data.name,
									'SAP编码' : record.data.sapcode,
									'刀体型号' : record.data.toolholdertype,
									'刀体品牌名称' : record.data.brandname,
									'车削类型' : record.data.threadtype,
									'接口规格' : record.data.portsize,
									'切削方向' : record.data.handoftool,
									'刀片形式' : record.data.featurecode,
									'刀片夹紧方式' : record.data.cseries,
									'刀体长度' : record.data.length,
									'刀体宽度' : record.data.width,
									'螺纹直径' : record.data.diameter,
									'附件1名称' : record.data.aname1,
									'附件1型号' : record.data.atype1,
									'附件2名称' : record.data.aname2,
									'附件2型号' : record.data.atype2,
									'附件3名称' : record.data.aname3,
									'附件3型号' : record.data.atype3,
									'附件4名称' : record.data.aname4,
									'附件4型号' : record.data.atype4,
									'附件5名称' : record.data.aname5,
									'附件5型号' : record.data.atype5,
									'备注' : record.data.remark
								});
						Ext.getCmp('previousbtn2').disable();
					} else {
						record = grid2.getStore().getAt(index);
						propertygrid2.setSource({
									'刀体名称' : record.data.name,
									'SAP编码' : record.data.sapcode,
									'刀体型号' : record.data.toolholdertype,
									'刀体品牌名称' : record.data.brandname,
									'车削类型' : record.data.threadtype,
									'接口规格' : record.data.portsize,
									'切削方向' : record.data.handoftool,
									'刀片形式' : record.data.featurecode,
									'刀片夹紧方式' : record.data.cseries,
									'刀体长度' : record.data.length,
									'刀体宽度' : record.data.width,
									'螺纹直径' : record.data.diameter,
									'附件1名称' : record.data.aname1,
									'附件1型号' : record.data.atype1,
									'附件2名称' : record.data.aname2,
									'附件2型号' : record.data.atype2,
									'附件3名称' : record.data.aname3,
									'附件3型号' : record.data.atype3,
									'附件4名称' : record.data.aname4,
									'附件4型号' : record.data.atype4,
									'附件5名称' : record.data.aname5,
									'附件5型号' : record.data.atype5,
									'备注' : record.data.remark
								});
						Ext.getCmp('nextbtn2').enable();
					}
					  brandStore.load({
							
							params : {
								
								name : record.data.brandname
							}
						});
					if (pictureTabs2.getActiveTab().getItemId() == 'threadbladePanelid') {
						threadbladeStorePanel.load({
									params : {
										featurecode : record.data.featurecode
									}
								});
					} else if (pictureTabs2.getActiveTab().getItemId() == 'picturePanel2_toolholderid_1') {
						var newsrc = checkImagePath(record.data.figure);
						Ext.getCmp('boxid3').getEl().dom.src = newsrc;

					} else if (pictureTabs2.getActiveTab().getItemId() == 'picturePanel2_toolholderid_2') {
						var newsrc = checkImagePath(record.data.figure2);
						Ext.getCmp('boxid4').getEl().dom.src = newsrc;

					} else if (pictureTabs2.getActiveTab().getItemId() == 'sapPanel2id') {
						sapStore2.load({
									params : {
										sapcode : record.data.sapcode
									}
								});
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
						propertygrid2.setSource({
									'刀体名称' : record.data.name,
									'SAP编码' : record.data.sapcode,
									'刀体型号' : record.data.toolholdertype,
									'刀体品牌名称' : record.data.brandname,
									'车削类型' : record.data.threadtype,
									'接口规格' : record.data.portsize,
									'切削方向' : record.data.handoftool,
									'刀片形式' : record.data.featurecode,
									'刀片夹紧方式' : record.data.cseries,
									'刀体长度' : record.data.length,
									'刀体宽度' : record.data.width,
									'螺纹直径' : record.data.diameter,
									'附件1名称' : record.data.aname1,
									'附件1型号' : record.data.atype1,
									'附件2名称' : record.data.aname2,
									'附件2型号' : record.data.atype2,
									'附件3名称' : record.data.aname3,
									'附件3型号' : record.data.atype3,
									'附件4名称' : record.data.aname4,
									'附件4型号' : record.data.atype4,
									'附件5名称' : record.data.aname5,
									'附件5型号' : record.data.atype5,
									'备注' : record.data.remark
								});
						Ext.getCmp('nextbtn2').disable();
					} else {
						record = grid2.getStore().getAt(index);
						propertygrid2.setSource({
									'刀体名称' : record.data.name,
									'SAP编码' : record.data.sapcode,
									'刀体型号' : record.data.toolholdertype,
									'刀体品牌名称' : record.data.brandname,
									'车削类型' : record.data.threadtype,
									'接口规格' : record.data.portsize,
									'切削方向' : record.data.handoftool,
									'刀片形式' : record.data.featurecode,
									'刀片夹紧方式' : record.data.cseries,
									'刀体长度' : record.data.length,
									'刀体宽度' : record.data.width,
									'螺纹直径' : record.data.diameter,
									'附件1名称' : record.data.aname1,
									'附件1型号' : record.data.atype1,
									'附件2名称' : record.data.aname2,
									'附件2型号' : record.data.atype2,
									'附件3名称' : record.data.aname3,
									'附件3型号' : record.data.atype3,
									'附件4名称' : record.data.aname4,
									'附件4型号' : record.data.atype4,
									'附件5名称' : record.data.aname5,
									'附件5型号' : record.data.atype5,
									'备注' : record.data.remark
								});
						Ext.getCmp('previousbtn2').enable();
					}
					  brandStore.load({
							
							params : {
								
								name : record.data.brandname
							}
						});
					if (pictureTabs2.getActiveTab().getItemId() == 'threadbladePanelid') {
						threadbladeStorePanel.load({
									params : {
										featurecode : record.data.featurecode
									}
								});
					} else if (pictureTabs2.getActiveTab().getItemId() == 'picturePanel2_toolholderid_1') {
						var newsrc = checkImagePath(record.data.figure);
						Ext.getCmp('boxid3').getEl().dom.src = newsrc;

					} else if (pictureTabs2.getActiveTab().getItemId() == 'picturePanel2_toolholderid_2') {
						var newsrc = checkImagePath(record.data.figure);
						Ext.getCmp('boxid4').getEl().dom.src = newsrc;

					} else if (pictureTabs2.getActiveTab().getItemId() == 'sapPanel2id') {
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
					 brandDisplayWin.close();
				}
			}],
			listeners : {
				afterrender : function(tabpanel, tab) {
					propertygrid2.setSource({
								'刀体名称' : record.data.name,
								'SAP编码' : record.data.sapcode,
								'刀体型号' : record.data.toolholdertype,
								'刀体品牌名称' : record.data.brandname,
								'车削类型' : record.data.threadtype,
								'接口规格' : record.data.portsize,
								'切削方向' : record.data.handoftool,
								'刀片形式' : record.data.featurecode,
								'刀片夹紧方式' : record.data.cseries,
								'刀体长度' : record.data.length,
								'刀体宽度' : record.data.width,
								'螺纹直径' : record.data.diameter,
								'附件1名称' : record.data.aname1,
								'附件1型号' : record.data.atype1,
								'附件2名称' : record.data.aname2,
								'附件2型号' : record.data.atype2,
								'附件3名称' : record.data.aname3,
								'附件3型号' : record.data.atype3,
								'附件4名称' : record.data.aname4,
								'附件4型号' : record.data.atype4,
								'附件5名称' : record.data.aname5,
								'附件5型号' : record.data.atype5,
								'备注' : record.data.remark
							});
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
			
			url : 'screwcutting.do?code=printTask',
		
			
			params : {
				workpieceisotype : workpieceisotypeCombo.getValue(),
				threaddirection : threaddirectionCombo.getValue(),
				threadtype : threadtypeCombo.getValue(),
				threadstandard : threadstandardCombo.getValue(),
				pitch : pitchCombo.getValue(),
				bladesize : bladesizeCombo.getValue(),
				sapcode :record.data.sapcode,
				apmax : record.data.apmax,
				fnmax : record.data.fnmax,
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
			
			url : 'screwcutting.do?code=printTask2',
		
			
			params : {
				threaddirection : threaddirectionCombo2.getValue(),
				threadtype : threadtypeCombo2.getValue(),
				diameter : diameterCombo.getValue(),
				bladesize : bladesizeCombo2.getValue(),
				portsize : portsizeCombo.getValue(),
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
