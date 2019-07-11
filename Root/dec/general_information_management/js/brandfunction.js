/**
 * 品牌管理
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
				header		: '品牌ID', // 列标题
				dataIndex	: 'brandid', // 数据索引,和Store数据存储模型对应
				width		: 60, // 列宽度
				sortable	: true, // 该列是否要排序
				hidden		: true
					// 该列是否隐藏
				}, {
				header		: '品牌名称',
				dataIndex	: 'name',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '别名',
				dataIndex	: 'alias',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '国家',
				dataIndex	: 'nation',
				renderer	: NATIONNAMERender,
				width		: 100,
				// hidden : true,
				sortable	: true
			}, {
				header		: '公司',
				dataIndex	: 'office',
				width		: 60,
				 hidden : true,
				sortable	: true
			}, {
				header		: '详细地址',
				dataIndex	: 'address',
				width		: 250,
				 hidden : true,
				sortable	: true
			}, {
				header		: '联系电话',
				dataIndex	: 'telephone',
				width		: 80,
				 hidden : true,
				sortable	: true
			}, {
				header		: '通讯地址',
				dataIndex	: 'mailaddress',
				width		: 160,
				hidden : true,
				sortable	: true
			},/* {
				header		: '品牌特点',
				dataIndex	: 'brandfeature',
				width		: 160,
				// hidden : true,
				sortable	: true
			},*/ {
				header		: '应用范围',
				dataIndex	: 'remark1',
				width		: 320,
				// hidden : true,
				sortable	: true
			}, {
				header		: '备注2',
				dataIndex	: 'remark2',
				width		: 160,
				hidden		: true,
				sortable	: true
			}]);

			// Store数据存储
			var store = new Ext.data.GroupingStore({
						proxy	: new Ext.data.HttpProxy({
									url	: 'brand.do?code=queryBrand4Manage'
								}),
						reader	: new Ext.data.JsonReader({
									totalProperty	: 'TOTALCOUNT',
									root			: 'ROOT'
								}, [{
											name	: 'brandid'
										}, {
											name	: 'name'
										}, {
											name	: 'alias'
										}, {
											name	: 'nation'
										}, {
											name	: 'office'
										}, {
											name	: 'address'
										}, {
											name	: 'telephone'
										}, {
											name	: 'mailaddress'
										}, {
											name	: 'brandfeature'
										}, {
											name	: 'remark1'
										}, {
											name	: 'remark2'
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
						items	: [/*{
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
								},'-', {
									text : 'Excel导入',
									iconCls : 'page_excelIcon',
									id : 'excelImport',
									handler : function() {
										importExcelData();
									}
								}, '->', */ {},
								   '->',{
									xtype			: 'textfield',
									id				: 'inputname',
									name			: 'inputname',
									cls				: 'search',
									emptyText		: '品牌名称|详细地址',
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

			var nationnameCombo = new Ext.form.ComboBox({
				fieldLabel		: '国家',
				hiddenName		: 'nation',
				id				: 'nationid',
				emptyText		: '请选择国家...',
				triggerAction	: 'all',
				store			: NATIONNAMEStore,
				displayField	: 'text',
				valueField		: 'value',
				loadingText		: '正在加载数据...',
				mode			: 'local', // 数据会自动读取,如果设置为local又调用了store.load()则会读取2次；也可以将其设置为local，然后通过store.load()方法来读取
				forceSelection	: true,
				resizable		: true,
				plugins			: [new QM.plugin.PinyinFilter],
				// editable : false,
				anchor			: '94.6%',
				listeners		: {
					focus	: function() {
						setTimeout('Ext.getCmp("nationid").expand();', 1);
					}
				}
					// width : '85%'
				});

			// 页面过滤
			var filters = new Ext.ux.grid.GridFilters({// string,numeric,date,list,boolean
				encode		: true,
				autoReload	: false,
				local		: true,
				filters		: [{
							dataIndex	: 'name',
							type		: 'string'
						}, {
							dataIndex	: 'alias',
							type		: 'string'
						}, {
							dataIndex	: 'nation',
							type		: 'string'
						}, {
							dataIndex	: 'office',
							type		: 'string'
						}, {
							dataIndex	: 'address',
							type		: 'string'
						}, {
							dataIndex	: 'telephone',
							type		: 'string'
						}, {
							dataIndex	: 'mailaddress',
							type		: 'string'
						}, {
							dataIndex	: 'brandfeature',
							type		: 'string'
						}, {
							dataIndex	: 'remark1',
							type		: 'string'
						}, {
							dataIndex	: 'remark2',
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
						labelWidth	: 80,
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
													maxLength	: mlm,
													allowBlank	: true,
													labelStyle	: fucolor
												},
												items		: [{
													fieldLabel	: '品牌名称',
													name		: 'name',
													emptyText	: '请输入品牌名称...',
													allowBlank	: false,
													labelStyle	: micolor
														/*
														 * listeners : { blur : function(e) { if (!isUndefined(e.getValue())) { e.setValue(e.getValue().toUpperCase()); } } }
														 */
													}, {
													fieldLabel	: '别名',
													name		: 'alias',
													emptyText	: '请输入别名...'
												}, nationnameCombo, {
													fieldLabel	: '公司',
													name		: 'office',
													emptyText	: '请输入公司...'
												}]
											}, {
												columnWidth	: .5,
												layout		: 'form',
												defaultType	: 'textfield',
												defaults	: {
													width		: '85%',
													anchor		: '89%',
													maxLength	: mlm,
													labelStyle	: fucolor,
													allowBlank	: true
												},
												items		: [{
															fieldLabel	: '详细地址',
															name		: 'address',
															emptyText	: '请输入详细地址...'
														}, {
															xtype		: 'numberfield',
															fieldLabel	: '联系电话',
															name		: 'telephone',
															emptyText	: '联系电话...'
															// maxLength : 11
													}	, {
															fieldLabel	: '通讯地址',
															name		: 'mailaddress',
															emptyText	: '通讯地址...'
														}, {
															fieldLabel	: '品牌特点',
															name		: 'brandfeature',
															emptyText	: '品牌特点...'
														}]
											}]
								}, {
									fieldLabel	: '备注1',
									xtype		: 'textfield',
									name		: 'remark1',
									id			: 'remark1',
									anchor		: '94.6%',
									maxLength	: mlh,
									maxText		: '最多只能输入 ' + mlh + ' 个字符!',
									emptyText	: '请输入备注信息...'
								}, {
									fieldLabel	: '备注2',
									xtype		: 'textfield',
									name		: 'remark2',
									id			: 'remark2',
									anchor		: '94.6%',
									maxLength	: mlh,
									maxText		: '最多只能输入 ' + mlh + ' 个字符!',
									emptyText	: '请输入备注信息...'
								}, {
									id		: 'brandid',
									name	: 'brandid',
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
						height		: Ext.isChrome ? 243 : (Ext.isFirefox ? 239 : 239), // Chrome/FireFox/其它,先只调试IE的高度;
						// height : 270,
						modal		: true,
						closable	: true, // 是否可关闭
						closeAction	: 'hide',
						collapsible	: false, // 是否可收缩
						maximizable	: false, // 设置是否可以最大化
						border		: false, // 边框线设置
						constrain	: false, // 设置窗口是否可以溢出父容器
						// pageY : document.body.clientHeight / 2 - 150 /
						// 2,//pageY : 20, // 页面定位Y坐标
						// pageX : document.body.clientWidth / 2 - 800 / 2,
						// //页面定位X坐标
						items		: [addItemForm],
						buttons		: [{
									text	: '保存',
									id		: 'savebtn',
									iconCls	: 'acceptIcon',
									handler	: function() {
										if (runMode == '0') {
											infoMsgClick('应用授权不可用，请联系开发人员输入购买的授权密码，您目前只能进行查询操作！');
											return;
										};
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
						title		: '<span class="commoncss">品牌</span>',
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
						stateId		: 'grid-brand'
					});

			
			

			// 查看刀具品牌详细信息;
			function propertyDisplay() {
				var record = grid.getSelectionModel().getSelected();
				var index = grid.getStore().indexOf(record);

				var path = checkImagePath(record.data.remark2);

				var propertygrid = new Ext.grid.PropertyGrid({
					title : '品牌详情',
					border : true,
					autoSort : false,
					frame : true,
					cm : cm,
					id : 'propertyGridid',
					enableColLock : true,
					enableColumnMove : false,
					autoExpandColumn : true,
					loadMask : true,
					stripeRows : true,
					autoScroll : true,
					clicksToEdit : 1,
					propertyNames : {
						
						'name' : '品牌名称',
						'alias' : '别名',
						'nation' : '国家',
						'office' : '公司',
						'address' : '详细地址',
						'telephone' : '联系电话',
						'mailaddress' : '通讯地址',
						'remark1' : '应用范围'
					},
					
					listeners : {
						beforeedit : function(e) {
							e.cancel = true;
							return false;
						}
					}
				});

               var picturePanel = new Ext.Panel({
					title : '品牌LOGO',
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
				/* var brandStore = new Ext.data.GroupingStore({
						proxy : new Ext.data.HttpProxy({
							url : 'generalturning.do?code=queryBrand4Manage'
								
							}),
						reader : new Ext.data.JsonReader({
									totalProperty : 'TOTALCOUNT',
									root : 'ROOT'
								}, [
										{
											name : 'brandfeature'
												}])
					});
					*/
				 
			
				/*   brandStore.load({
						
						params : {
							
							name : record.data.bladebrandname
						}
					});*/
				
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
					items : [picturePanel ,{
						   title : "品牌简介",
						   xtype: "textarea",
		                    fieldLabel: "特点",
		                   // region : 'south',
		                    id: "brandmemo",
		                    height:140,
		                    emptyText:'数据完善中……',
		                    textfield:'',
		                    width: 330
		                  
						
					}],
					listeners : {
						tabchange : function(tabpanel, tab) {
							if (tab.getId() == 'brandmemo') {
								Ext.getCmp('brandmemo').setValue(record.data.brandfeature)
								
							}
						}
					}
				});

				var propertyDisplayWin = new Ext.Window(
						{
							title : '刀具品牌详细信息',
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
												propertygrid.setSource({
													'品牌名称':	record.data.name,
													'别名':	record.data.alias,
													'国家':	record.data.nation,
													'公司':	record.data.office,
													'详细地址':	record.data.address,
													
													'联系电话':	record.data.telephone,
												
													'通讯地址':	record.data.mailaddress,
												
													'应用范围':	record.data.remark1
													});
												Ext.getCmp('previousbtn')
														.disable();
											} else {
												record = grid.getStore().getAt(
														index);
												propertygrid.setSource({
													'品牌名称':	record.data.name,
													'别名':	record.data.alias,
													'国家':	record.data.nation,
													'公司':	record.data.office,
													'详细地址':	record.data.address,
													
													'联系电话':	record.data.telephone,
												
													'通讯地址':	record.data.mailaddress,
												
													'应用范围':	record.data.remark1
													});
												Ext.getCmp('nextbtn').enable();
											}
											Ext.getCmp('brandmemo').setValue(record.data.brandfeature);
											dataLoadDynamic(pictureTabs);
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
													'品牌名称':	record.data.name,
													'别名':	record.data.alias,
													'国家':	record.data.nation,
													'公司':	record.data.office,
													'详细地址':	record.data.address,
													
													'联系电话':	record.data.telephone,
												
													'通讯地址':	record.data.mailaddress,
												
													'应用范围':	record.data.remark1});
												Ext.getCmp('nextbtn').disable();
											} else {
												record = grid.getStore().getAt(
														index);
												propertygrid.setSource({
													'品牌名称':	record.data.name,
													'别名':	record.data.alias,
													'国家':	record.data.nation,
													'公司':	record.data.office,
													'详细地址':	record.data.address,
													
													'联系电话':	record.data.telephone,
												
													'通讯地址':	record.data.mailaddress,
												
													'应用范围':	record.data.remark1});
												Ext.getCmp('previousbtn')
														.enable();
											}
											Ext.getCmp('brandmemo').setValue(record.data.brandfeature);
											dataLoadDynamic(pictureTabs);
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
									propertygrid.setSource({
										'品牌名称':	record.data.name,
										'别名':	record.data.alias,
										'国家':	record.data.nation,
										'公司':	record.data.office,
										'详细地址':	record.data.address,
										
										'联系电话':	record.data.telephone,
									
										'通讯地址':	record.data.mailaddress,
									
										'应用范围':	record.data.remark1});
								}
								
							}
						});

				propertyDisplayWin.show();
			}
			
			function dataLoadDynamic(pictureTabs) {
		var record = grid.getSelectionModel().getSelected(); 
		
		 if (pictureTabs.getActiveTab().getItemId() == 'picturePanelid') {
			var newsrc =checkImagePath(record.data.remark2);
			Ext.getCmp('boxid').getEl().dom.src = newsrc;
			}
		
	}
			// 表格单击事件
			grid.on('rowclick', function(pGrid, rowIndex, event) {
						Ext.getCmp('modifyid').enable();
						Ext.getCmp('deleteid').enable();
					});
			// 表格双击事件
			grid.on('rowdblclick', function(grid, rowIndex, event) {
				propertyDisplay();
					});

			// 表格右键
			var contextmenu = new Ext.menu.Menu({
						id		: 'theContextMenu',
						items	: [/*{
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
								}, '-',*/ {
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
				if (!isUndefined(Ext.getCmp('windowmode').getValue())) {
					addItemForm.form.getEl().dom.reset();
				}

				addItem.setTitle('<span class="commoncss">新增</span>');
				Ext.getCmp('windowmode').setValue('add');

				Ext.getCmp('savebtn').setText('保存');
				addItem.show();
				addItemForm.form.reset();
			}

			// 修改
			function editInit() {
				var record = grid.getSelectionModel().getSelected();
				var records = grid.getSelectionModel().getSelections();
				if (records.length == 0) {
					infoMsg('您没有选中任何条目，请先选中要修改的项目！');
					return;
				} else if (records.length > 1) {
					infoMsg('您选择了 ' + records.length + ' 个条目，系统将只修改最先选择的项目！');
					grid.getSelectionModel().selectRow(grid.getSelectionModel().last, false);
				}

				addItemForm.getForm().loadRecord(record);
				addItem.setTitle('<span class="commoncss">修改</span>');

				Ext.getCmp('savebtn').setText('更新');
				Ext.getCmp('windowmode').setValue('edit');
				Ext.getCmp('brandid').setValue(record.get('brandid'));
				addItem.show();
			}

			// 删除
			function deleteInit() {
				var records = grid.getSelectionModel().getSelections();
				if (Ext.isEmpty(records)) {
					infoMsg('您没有选中任何条目，请先选中要删除的项目！');
					return;
				}
				var strChecked = jsArray2JsString(records, 'brandid');
				Ext.Msg.confirm('请确认', '确认删除选中的记录吗', function(btn, text) {
							if (btn == 'yes') {
								showWaitMsg();
								Ext.Ajax.request({
											url		: 'brand.do?code=deleteBrand',
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
							url				: 'brand.do?code=saveBrand',
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

			// 更新
			function updateForm() {
				if (!addItemForm.getForm().isValid()) {
					warningMsg('必填项未填写，或填写格式不正确，请检查窗口红色标示的区域!');
					return;
				}
				addItemForm.form.submit({
							url				: 'brand.do?code=updateBrand',
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
				
				
				pagesize_combo.reset();
				bbar.pageSize=50;
				store.load({
					params	: {
						start	: 0,
						limit	: bbar.pageSize
					}
				});
				var currentpage=1;
				var currentpage=bbar.store.currentPage;
				bbar.moveFirst();
			}
			
			// 导入数据
			function importExcelData() {
				var sheetnameStore = new Ext.data.JsonStore({
					autoLoad : false,
					// totalProperty : "TOTALCOUNT",
					// root : "ROOT",
					fields : [ 'text' ],
					listeners : {
						load : function(s, records, opt) {
							sheetnameCombo.setDisabled(false);
							var text_str = s.getAt(0).data.text;
							sheetnameCombo.setRawValue(text_str);

							startrowSlider.setDisabled(false);

							var text_num = text_str.substring(text_str
									.lastIndexOf("：") + 1, text_str
									.lastIndexOf("/"));
							modifySlider(startrowSlider, text_num);
						}
					}
				});

				var sheetnameCombo = new Ext.form.ComboBox(
						{
							fieldLabel : 'Sheet名称',
							hiddenName : 'sheetname',
							id : 'sheetnameid',
							emptyText : '请选择要导入的Sheet名称...',
							triggerAction : 'all',
							store : sheetnameStore,
							displayField : 'text',
							valueField : 'text',
							loadingText : '正在加载数据...',
							mode : 'local',
							forceSelection : true,
							disabled : false,
							// pageSize : cln,
							// minListWidth : 270,
							// plugins : [new QM.plugin.PinyinFilter],
							resizable : true,
							anchor : '99%',
							listeners : {
								focus : function() {
									// categoryStore.load();
									setTimeout(
											'Ext.getCmp("sheetnameid").expand();',
											1);
								},
								change : function(c, newValue, oldValue) {
									// var text_str = c.getRawValue();
									var text_str = newValue;
									var text_num = text_str.substring(text_str
											.lastIndexOf("：") + 1, text_str
											.lastIndexOf("/"));
									modifySlider(startrowSlider, text_num);
								}
							}
						});

				var startrowSlider = new Ext.form.TextField({
					id : 'startrowSlider',
					name : 'startrowSlider',
					width : 140,
					fieldLabel : '要导入的行',
					allowBlank : false,
					maxLength : 20,
					selectOnFocus : true,
					enableKeyEvents : true

				});

				/*
				 * new Ext.Slider({ //width : 300, fieldLabel: '要导入的行', anchor :
				 * '99%', minValue : 2, maxValue : 10, disabled : true, //
				 * values : [2, 7], plugins : [new Ext.slider.Tip({ getText :
				 * function(v) { return String.format('<b>第{0}行</b>',
				 * v.value); } })] });
				 */

				// 导入表单
				var importpanel = new Ext.form.FormPanel(
						{
							id : 'importpanel',
							name : 'importpanel',
							defaultType : 'textfield',
							labelAlign : 'right',
							labelWidth : 90,
							layout : 'form',
							frame : true,
							fileUpload : true,
							items : [
									{
										fieldLabel : 'Excel文件(.xls)',
										name : 'theFile',
										id : 'theFile',
										inputType : 'file',
										allowBlank : true,
										anchor : '99%',
										listeners : {
											change : function(tf, newValue,
													oldValue) {
												// infoMsg("校验Excel数据合法性，完成后进行选择，请稍候...");
												importpanel.form
														.submit({
															url : 'brand.do?code=importBrandFromExcel',
															waitTitle : '提示',
															method : 'POST',
															waitMsg : '校验Excel数据合法性，完成后进行选择，请稍候...',
															success : function(
																	form,
																	action) {
																sheetnameStore
																		.loadData(Ext.util.JSON
																				.decode(action.result.sheetname));
															},
															failure : function(
																	form,
																	action) {
																infoMsgClick(action.result.msg);
															},
															params : {
																nameandid : "initializeImportExcelData"
															}
														});

												/*
												 * Ext.Ajax.request({ url :
												 * 'machinetool.do?code=importMachinetoolFromExcel',
												 * success : function(response) {
												 * var resultArray =
												 * Ext.util.JSON.decode(response.responseText);
												 * infoMsg(resultArray.msg); },
												 * params : { nameandid :
												 * "initializeImportExcelData" }
												 * });
												 */
											}
										}
									}, sheetnameCombo, startrowSlider ]
						});

				// 导入窗口
				var importWindow = new Ext.Window(
						{
							layout : 'fit',
							width : 400,
							height : 150,
							resizable : false,
							modal : true,
							draggable : true,
							closeAction : 'close',
							title : '通过EXCEL文件导入数据',
							collapsible : true,
							titleCollapse : true,
							maximizable : false,
							buttonAlign : 'right',
							border : false,
							animCollapse : true,
							animateTarget : Ext.getBody(),
							constrain : true,
							items : [ importpanel ],
							buttons : [
									{
										text : '导入说明',
										iconCls : 'helpIcon',
										handler : function() {
											excelHelpWin();
										}
									},
									{
										text : '导入数据',
										iconCls : 'page_excelIcon',
										handler : function() {
											var theFile = Ext.getCmp('theFile')
													.getValue();
											if (Ext.isEmpty(theFile)) {
												infoMsg('请先选择您要导入的Excel文件...');
												return;
											}
											if (theFile.substring(
													theFile.length - 4,
													theFile.length) != ".xls") {
												infoMsg('您选择的文件格式不对,只能导入*.xls文件!');
												return;
											}
											importpanel.form
													.submit({
														url : 'brand.do?code=importBrandFromExcel',
														waitTitle : '提示',
														method : 'POST',
														waitMsg : '正在处理数据,请稍候...',
														success : function(
																form, action) {
															// hideWaitMsg();
															infoMsg(action.result.msg);

															importWindow
																	.close();
															store.reload();
															// var resultArray =
															// Ext.util.JSON.decode(response.responseText);
															// infoMsg(action.result.msg);
														},
														failure : function(
																form, action) {
															infoMsgClick(action.result.msg);
														},
														params : {
															nameandid : getGridHeaderNameAndId(grid),
															sheetname : sheetnameCombo
																	.getRawValue()
																	.substring(
																			sheetnameCombo
																					.getRawValue()
																					.indexOf(
																							" - ") + 3,
																			sheetnameCombo
																					.getRawValue()
																					.lastIndexOf(
																							" - ")),
															importdata : startrowSlider
																	.getValue()
														}
													});

										}
									}, {
										text : '关闭',
										id : 'btnReset',
										iconCls : 'deleteIcon',
										handler : function() {
											importWindow.close();
										}
									} ]
						});

				importWindow.show();
			}
		});
