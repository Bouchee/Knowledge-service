/**
 * 刀片管理
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
				header		: 'ERP编码',
				dataIndex	: 'erpcode',
				width		: 60,
				sortable	: true,
				hidden		: true
			}, {
				header		: '刀片名称',
				dataIndex	: 'name',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '刀片型号',
				dataIndex	: 'bladetype',
				// hidden : true,
				width		: 150,
				sortable	: true
			}, {
				header		: '结构简图',
				dataIndex	: 'figure',
				width		: 80,
				hidden		: true,
				sortable	: true
			}, {
				header		: '车削类型',
				dataIndex	: 'turningtype',
				width		: 80,
				hidden		: true,
				sortable	: true
			}, {
				header		: '刀片材料ID',
				dataIndex	: 'bladematerialid',
				width		: 80,
				sortable	: true,
				hidden		: true
			}, {
				header		: '刀片材质',
				dataIndex	: 'bladematerialname',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '刀片槽型ID',
				dataIndex	: 'grooveid',
				width		: 90,
				hidden		: true,
				sortable	: true
			}, {
				header		: '槽型名称',
				dataIndex	: 'groovename',
				width		: 70,
				align		: 'center',
				// hidden : true,
				sortable	: true
			}, {
				header		: '刀片品牌ID',
				dataIndex	: 'brandid',
				width		: 80,
				hidden		: true,
				sortable	: true
			}, {
				header		: '品牌名称',
				dataIndex	: 'brandname',
				width		: 70,
				// hidden : true,
				sortable	: true
			}, {
				header		: '刀片后角',
				dataIndex	: 'reliefangle',
				width		: 80,
				align		: 'center',
				hidden		: true,
				sortable	: true,
				renderer	: RELIEFANGLERender
			}, {
				header		: '刀片形状',
				dataIndex	: 'shape',
				align		: 'center',
				width		: 80,
				// hidden : true,
				sortable	: true,
				renderer	: SHAPERender
			}, {
				header		: '切削刃长度',
				dataIndex	: 'celength',
				width		: 80,
				// hidden : true,
				sortable	: true,
				renderer	: CELENGTHRender
			}, {
				header		: '刀尖圆弧半径',
				dataIndex	: 'noseradius',
				width		: 90,
				align		: 'center',
				// hidden : true,
				sortable	: true,
				renderer	: NOSERADIUSRender
			}, {
				header		: '螺距',
				dataIndex	: 'pitch',
				width		: 70,
				align		: 'center',
				hidden		: true,
				sortable	: true
			}, {
				header		: '螺纹标准',
				dataIndex	: 'thread',
				width		: 70,
				align		: 'center',
				hidden		: true,
				sortable	: true
			}, {
				header		: '刀片类型',
				dataIndex	: 'blademold',
				width		: 70,
				align		: 'center',
				// hidden : true,
				sortable	: true
			}, {
				header		: '刀片大小',
				dataIndex	: 'bladesize',
				width		: 70,
				align		: 'center',
				hidden		: true,
				sortable	: true
			}, {
				header		: '刀片厚度',
				dataIndex	: 'thickness',
				width		: 70,
				align		: 'center',
				// hidden : true,
				sortable	: true,
				renderer	: THICKNESSRender
			}, {
				header		: '刀片左右手',
				dataIndex	: 'bladehand',
				width		: 70,
				align		: 'center',
				// hidden : true,
				sortable	: true
			}, {
				header		: '特征描述',
				dataIndex	: 'description',
				width		: 130,
				hidden		: true,
				sortable	: true
			}, {
				header		: '刀片特征码',
				dataIndex	: 'featurecode',
				width		: 70,
				align		: 'center',
				hidden		: true,
				sortable	: true
			}, {
				header		: '最大切削深度',
				dataIndex	: 'apmax',
				width		: 70,
				align		: 'center',
				// hidden : true,
				sortable	: true
			}, {
				header		: '最小切削深度',
				dataIndex	: 'apmin',
				width		: 70,
				align		: 'center',
				hidden		: true,
				sortable	: true
			}, {
				header		: '最大切削进给',
				dataIndex	: 'fnmax',
				width		: 70,
				align		: 'center',
				// hidden : true,
				sortable	: true
			}, {
				header		: '最小切削进给',
				dataIndex	: 'fnmin',
				width		: 70,
				align		: 'center',
				hidden		: true,
				sortable	: true
			}, {
				header		: '备注信息',
				dataIndex	: 'remark',
				width		: 100,
				// hidden : true,
				sortable	: true
			}]);

			// Store数据存储
			var store = new Ext.data.GroupingStore({
						proxy	: new Ext.data.HttpProxy({
							url	: 'blade.do?code=queryBlade4Manage'
								// queryBlade4Manage是在BladeAction中的方法queryBlade4Manage;
							}),
						reader	: new Ext.data.JsonReader({
									totalProperty	: 'TOTALCOUNT',
									root			: 'ROOT'
								}, [{
											name	: 'bladeid'
										}, {
											name	: 'erpcode'
										}, {
											name	: 'name'
										}, {
											name	: 'bladetype'
										}, {
											name	: 'figure'
										}, {
											name	: 'turningtype'
										}, {
											name	: 'bladematerialid'
										}, {
											name	: 'bladematerialname'
										}, {
											name	: 'grooveid'
										}, {
											name	: 'groovename'
										}, {
											name	: 'brandid'
										}, {
											name	: 'brandname'
										}, {
											name	: 'reliefangle'
										}, {
											name	: 'shape'
										}, {
											name	: 'celength'
										}, {
											name	: 'noseradius'
										}, {
											name	: 'pitch'
										}, {
											name	: 'thread'
										}, {
											name	: 'blademold'
										}, {
											name	: 'bladesize'
										}, {
											name	: 'thickness'
										}, {
											name	: 'bladehand'
										}, {
											name	: 'description'
										}, {
											name	: 'featurecode'
										}, {
											name	: 'apmax'
										}, {
											name	: 'apmin'
										}, {
											name	: 'fnmax'
										}, {
											name	: 'fnmin'
										}, {
											name	: 'remark'
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
								}, '->', {
									xtype			: 'textfield',
									id				: 'inputname',
									name			: 'inputname',
									cls				: 'search',
									emptyText		: '名称|型号|特征描述',
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
								}, {
									text	: '刷新',
									iconCls	: 'page_refreshIcon',
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

			var bladematerialStore = new Ext.data.Store({
						proxy		: new Ext.data.HttpProxy({
									url	: 'blade.do?code=queryBladematerial4Blade'
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
							// 设置远程数据源下拉选择框的初始值
							'load'	: function(obj) {
								// classStore.setValue('530101');
							}
						}
					});
			bladematerialStore.load(); // 如果mode : 'local',时候才需要手动load();

			var bladematerialCombo = new Ext.form.ComboBox({
						fieldLabel		: '刀片材质',
						hiddenName		: 'bladematerialid',
						id				: 'bladematerialidid',
						emptyText		: '请选择刀片材质...',
						triggerAction	: 'all',
						store			: bladematerialStore,
						displayField	: 'text',
						valueField		: 'value',
						loadingText		: '正在加载数据...',
						mode			: 'local', // 数据会自动读取,如果设置为local又调用了store.load()则会读取2次；也可以将其设置为local，然后通过store.load()方法来读取
						forceSelection	: true,
						// typeAhead : true,
						// pageSize : cln,
						// minListWidth : 270,
						plugins			: [new QM.plugin.PinyinFilter],
						resizable		: true,
						// editable : false,
						anchor			: '94.6%',
						// width : '85%'
						listeners		: {
							focus	: function() {
								// bladematerialStore.load();
								setTimeout('Ext.getCmp("bladematerialidid").expand();', 1);
							}
						}
					});

			var brandStore = new Ext.data.Store({
						proxy		: new Ext.data.HttpProxy({
									url	: 'blade.do?code=queryBrand4Blade'
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
							// 设置远程数据源下拉选择框的初始值
							'load'	: function(obj) {
								// classStore.setValue('530101');
							}
						}
					});
			brandStore.load(); // 如果mode : 'local',时候才需要手动load();

			var brandCombo = new Ext.form.ComboBox({
						fieldLabel		: '刀片品牌',
						hiddenName		: 'brandid',
						id				: 'brandidid',
						emptyText		: '请输入刀片品牌...',
						triggerAction	: 'all',
						store			: brandStore,
						displayField	: 'text',
						valueField		: 'value',
						loadingText		: '正在加载数据...',
						mode			: 'local', // 数据会自动读取,如果设置为local又调用了store.load()则会读取2次；也可以将其设置为local，然后通过store.load()方法来读取
						forceSelection	: true,
						// typeAhead : true,
						// pageSize : cln,
						// minListWidth : 270,
						plugins			: [new QM.plugin.PinyinFilter],
						resizable		: true,
						// editable : false,
						anchor			: '94.6%',
						// width : '85%'
						listeners		: {
							focus	: function() {
								// brandStore.load();
								setTimeout('Ext.getCmp("brandidid").expand();', 1);
							}
						}
					});

			var grooveStore = new Ext.data.Store({
						proxy		: new Ext.data.HttpProxy({
									url	: 'blade.do?code=queryGroove4Blade'
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
							// 设置远程数据源下拉选择框的初始值
							'load'	: function(obj) {
								// classStore.setValue('530101');
							}
						}
					});
			grooveStore.load(); // 如果mode : 'local',时候才需要手动load();

			var grooveCombo = new Ext.form.ComboBox({
						fieldLabel		: '断屑槽形',
						hiddenName		: 'grooveid',
						id				: 'grooveidid',
						emptyText		: '请选择槽形...',
						triggerAction	: 'all',
						store			: grooveStore,
						displayField	: 'text',
						valueField		: 'value',
						loadingText		: '正在加载数据...',
						mode			: 'local', // 数据会自动读取,如果设置为local又调用了store.load()则会读取2次；也可以将其设置为local，然后通过store.load()方法来读取
						forceSelection	: true,
						// typeAhead : true,
						// pageSize : cln,
						// minListWidth : 270,
						plugins			: [new QM.plugin.PinyinFilter],
						resizable		: true,
						// editable : false,
						anchor			: '94.6%',
						// width : '85%'
						listeners		: {
							focus	: function() {
								// grooveStore.load();
								setTimeout('Ext.getCmp("grooveidid").expand();', 1);
							}
						}
					});

			var turningtypeCombo = new Ext.form.ComboBox({
						fieldLabel		: '车削类型',
						hiddenName		: 'turningtype',
						id				: 'turningtypeid',
						emptyText		: '请选择车削类型...',
						triggerAction	: 'all',
						store			: TURNINGTYPEStore,
						displayField	: 'text',
						valueField		: 'value',
						loadingText		: '正在加载数据...',
						mode			: 'local',
						// editable : false,
						forceSelection	: true,
						plugins			: [new QM.plugin.PinyinFilter],
						resizable		: true,
						anchor			: '94.6%',
						listeners		: {
							focus	: function() {
								setTimeout('Ext.getCmp("turningtypeid").expand();', 1);
							}
						}
					});

			var reliefangleCombo = new Ext.form.ComboBox({
						fieldLabel		: '刀片后角',
						hiddenName		: 'reliefangle',
						id				: 'reliefangleid',
						emptyText		: '请输入刀片后角...',
						triggerAction	: 'all',
						store			: RELIEFANGLEStore,
						displayField	: 'text',
						valueField		: 'value',
						loadingText		: '正在加载数据...',
						mode			: 'local',
						// editable : false,
						forceSelection	: true,
						plugins			: [new QM.plugin.PinyinFilter],
						resizable		: true,
						anchor			: '94.6%',
						listeners		: {
							focus	: function() {
								setTimeout('Ext.getCmp("reliefangleid").expand();', 1);
							}
						}
					});

			var shapeCombo = new Ext.form.ComboBox({
						fieldLabel		: '刀片形状',
						hiddenName		: 'shape',
						id				: 'shapeid',
						emptyText		: '请输入刀片形状...',
						triggerAction	: 'all',
						store			: SHAPEStore,
						displayField	: 'text',
						valueField		: 'value',
						loadingText		: '正在加载数据...',
						mode			: 'local',
						// editable : false,
						forceSelection	: true,
						plugins			: [new QM.plugin.PinyinFilter],
						resizable		: true,
						anchor			: '94.6%',
						listeners		: {
							focus	: function() {
								setTimeout('Ext.getCmp("shapeid").expand();', 1);
							}
						}
					});

			var celengthCombo = new Ext.form.ComboBox({
						fieldLabel		: '切削刃长度',
						hiddenName		: 'celength',
						id				: 'celengthid',
						emptyText		: '请输入切削刃长度..',
						triggerAction	: 'all',
						store			: CELENGTHStore,
						displayField	: 'text',
						valueField		: 'value',
						loadingText		: '正在加载数据...',
						mode			: 'local',
						// editable : false,
						forceSelection	: true,
						plugins			: [new QM.plugin.PinyinFilter],
						resizable		: true,
						anchor			: '94.6%',
						listeners		: {
							focus	: function() {
								setTimeout('Ext.getCmp("celengthid").expand();', 1);
							}
						}
					});

			var thicknessCombo = new Ext.form.ComboBox({
						fieldLabel		: '刀片厚度',
						hiddenName		: 'thickness',
						id				: 'thicknessid',
						emptyText		: '请输入刀片厚度..',
						triggerAction	: 'all',
						store			: THICKNESSStore,
						displayField	: 'text',
						valueField		: 'value',
						loadingText		: '正在加载数据...',
						mode			: 'local',
						// editable : false,
						forceSelection	: true,
						plugins			: [new QM.plugin.PinyinFilter],
						resizable		: true,
						anchor			: '94.6%',
						listeners		: {
							focus	: function() {
								setTimeout('Ext.getCmp("thicknessid").expand();', 1);
							}
						}
					});

			var noseradiusCombo = new Ext.form.ComboBox({
						fieldLabel		: '刀尖圆弧半径',
						hiddenName		: 'noseradius',
						id				: 'noseradiusid',
						emptyText		: '请输入刀尖圆弧半径..',
						triggerAction	: 'all',
						store			: NOSERADIUSStore,
						displayField	: 'text',
						valueField		: 'value',
						loadingText		: '正在加载数据...',
						mode			: 'local',
						// editable : false,
						forceSelection	: true,
						plugins			: [new QM.plugin.PinyinFilter],
						resizable		: true,
						anchor			: '94.6%',
						listeners		: {
							focus	: function() {
								setTimeout('Ext.getCmp("noseradiusid").expand();', 1);
							}
						}
					});

			var figureRadio = new Ext.form.RadioGroup({
						fieldLabel	: "压缩参数",
						name		: "compressflag",
						labelStyle	: fucolor,
						items		: [new Ext.form.Radio({
											name		: "compressflag",
											inputValue	: "0",
											boxLabel	: "直接上传",
											checked		: true
										}), new Ext.form.Radio({
											name		: "compressflag",
											inputValue	: "8",
											boxLabel	: "800*500"
										}), new Ext.form.Radio({
											name		: "compressflag",
											inputValue	: "4",
											boxLabel	: "400*246"
										}), new Ext.form.Radio({
											name		: "compressflag",
											inputValue	: "2",
											boxLabel	: "200*120"
										}), new Ext.form.Radio({
											name		: "compressflag",
											inputValue	: "1",
											boxLabel	: "100*60"
										}), new Ext.form.Radio({
											name		: "compressflag",
											inputValue	: "5",
											boxLabel	: "50*30"
										})]
					});

			// 页面过滤
			var filters = new Ext.ux.grid.GridFilters({// string,numeric,date,list,boolean
				encode		: true,
				autoReload	: false,
				local		: true,
				filters		: [{
							dataIndex	: 'erpcode',
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
							dataIndex	: 'turningtype',
							type		: 'string'
						}, {
							dataIndex	: 'bladematerialname',
							type		: 'string'
						}, {
							dataIndex	: 'groovename',
							type		: 'string'
						}, {
							dataIndex	: 'brandname',
							type		: 'string'
						}, {
							dataIndex	: 'reliefangle',
							type		: 'string'
						}, {
							dataIndex	: 'shape',
							type		: 'string'
						}, {
							dataIndex	: 'celength',
							type		: 'string'
						}, {
							dataIndex	: 'noseradius',
							type		: 'string'
						}, {
							dataIndex	: 'pitch',
							type		: 'numeric'
						}, {
							dataIndex	: 'thread',
							type		: 'string'
						}, {
							dataIndex	: 'blademold',
							type		: 'string'
						}, {
							dataIndex	: 'bladesize',
							type		: 'numeric'
						}, {
							dataIndex	: 'thickness',
							type		: 'numeric'
						}, {
							dataIndex	: 'bladehand',
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
							dataIndex	: 'fnmax',
							type		: 'numeric'
						}, {
							dataIndex	: 'fnmin',
							type		: 'numeric'
						}, {
							dataIndex	: 'remark',
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
						labelWidth	: 100,
						labelAlign	: 'right',
						fileUpload	: true,
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
															fieldLabel	: '刀片型号',
															name		: 'bladetype',
															id			: 'bladetypeid',
															allowBlank	: false,
															labelStyle	: micolor,
															emptyText	: '请输入刀片型号(自动大写)...',
															listeners	: {
																blur	: function(e) {
																	if (!isUndefined(e.getValue())) {
																		e.setValue(e.getValue().toUpperCase());
																		var value = e.getValue();
																		var re = null;
																		var arrSplit = null;
																		re = new RegExp(/^([A-Z]{4})([\d]{6})-([A-Z]{2}) ?(\w+)$/);
																		if (re.test(value)) {
																			a = value.match(re);
																			var mv = a[1].substr(0, 1); // 第一个字母代表刀片形状;
																			var mv2 = a[2].substr(0, 2);
																			if (mv == 'C') {
																				Ext.getCmp('shapeid').setValue(1);
																				if (mv2 == '06') {
																					Ext.getCmp('celengthid').setValue(4);
																				} else if (mv2 == '09') {
																					Ext.getCmp('celengthid').setValue(5);
																				} else if (mv2 == '12') {
																					Ext.getCmp('celengthid').setValue(6);
																				} else if (mv2 == '16') {
																					Ext.getCmp('celengthid').setValue(1);
																				} else if (mv2 == '19') {
																					Ext.getCmp('celengthid').setValue(2);
																				} else if (mv2 == '25') {
																					Ext.getCmp('celengthid').setValue(3);
																				}
																			} else if (mv == 'D') {
																				Ext.getCmp('shapeid').setValue(2);
																				if (mv2 == '07') {
																					Ext.getCmp('celengthid').setValue(7);
																				} else if (mv2 == '11') {
																					Ext.getCmp('celengthid').setValue(8);
																				} else if (mv2 == '15') {
																					Ext.getCmp('celengthid').setValue(9);
																				}
																			} else if (mv == 'R') {
																				Ext.getCmp('shapeid').setValue(3);
																				if (mv2 == '05') {
																					Ext.getCmp('celengthid').setValue(10);
																				} else if (mv2 == '06') {
																					Ext.getCmp('celengthid').setValue(11);
																				} else if (mv2 == '08') {
																					Ext.getCmp('celengthid').setValue(12);
																				} else if (mv2 == '10') {
																					Ext.getCmp('celengthid').setValue(13);
																				} else if (mv2 == '12') {
																					Ext.getCmp('celengthid').setValue(14);
																				} else if (mv2 == '16') {
																					Ext.getCmp('celengthid').setValue(15);
																				} else if (mv2 == '20') {
																					Ext.getCmp('celengthid').setValue(16);
																				} else if (mv2 == '25') {
																					Ext.getCmp('celengthid').setValue(17);
																				}
																			} else if (mv == 'S') {
																				Ext.getCmp('shapeid').setValue(4);
																				if (mv2 == '09') {
																					Ext.getCmp('celengthid').setValue(18);
																				} else if (mv2 == '12') {
																					Ext.getCmp('celengthid').setValue(19);
																				} else if (mv2 == '15') {
																					Ext.getCmp('celengthid').setValue(20);
																				} else if (mv2 == '19') {
																					Ext.getCmp('celengthid').setValue(21);
																				} else if (mv2 == '25') {
																					Ext.getCmp('celengthid').setValue(22);
																				}
																			} else if (mv == 'T') {
																				Ext.getCmp('shapeid').setValue(5);
																				if (mv2 == '06') {
																					Ext.getCmp('celengthid').setValue(23);
																				} else if (mv2 == '09') {
																					Ext.getCmp('celengthid').setValue(24);
																				} else if (mv2 == '11') {
																					Ext.getCmp('celengthid').setValue(25);
																				} else if (mv2 == '16') {
																					Ext.getCmp('celengthid').setValue(26);
																				} else if (mv2 == '22') {
																					Ext.getCmp('celengthid').setValue(27);
																				}

																			} else if (mv == 'V') {// FIXME
																				Ext.getCmp('shapeid').setValue(6);
																				if (mv2 == '11') {
																					Ext.getCmp('celengthid').setValue(25);
																				} else if (mv2 == '16') {
																					Ext.getCmp('celengthid').setValue(26);
																				}
																				// TODO
																			} else if (mv == 'W') {
																				Ext.getCmp('shapeid').setValue(7);
																				if (mv2 == '04') {
																					Ext.getCmp('celengthid').setValue(28);
																				} else if (mv2 == '06') {
																					Ext.getCmp('celengthid').setValue(29);
																				} else if (mv2 == '08') {
																					Ext.getCmp('celengthid').setValue(30);
																				}
																			}

																			mv = a[1].substr(1, 1); // 第二个字母代表刀片后角;
																			if (mv == 'B') {
																				Ext.getCmp('reliefangleid').setValue(1);
																			} else if (mv == 'C') {
																				Ext.getCmp('reliefangleid').setValue(2);
																			} else if (mv == 'N') {
																				Ext.getCmp('reliefangleid').setValue(3);
																			} else if (mv == 'P') {
																				Ext.getCmp('reliefangleid').setValue(4);
																			}

																			mv = a[2].substr(4, 2);// 数字的第56两位代表刀片圆弧半径;
																			if (mv == '00') {
																				Ext.getCmp('noseradiusid').setValue(1);
																			} else if (mv == '02') {
																				Ext.getCmp('noseradiusid').setValue(2);
																			} else if (mv == '04') {
																				Ext.getCmp('noseradiusid').setValue(3);
																			} else if (mv == '08') {
																				Ext.getCmp('noseradiusid').setValue(4);
																			} else if (mv == '12') {
																				Ext.getCmp('noseradiusid').setValue(5);
																			} else if (mv == '16') {
																				Ext.getCmp('noseradiusid').setValue(6);
																			} else if (mv == '24') {
																				Ext.getCmp('noseradiusid').setValue(7);
																			} else if (mv == '32') {
																				Ext.getCmp('noseradiusid').setValue(8);
																			} else if (mv == 'A1') {
																				Ext.getCmp('noseradiusid').setValue(9);
																			} else if (mv == 'M0') {
																				Ext.getCmp('noseradiusid').setValue(10);
																			}

																			// grooveCombo.setValue(a[3]);
																			// bladematerialCombo.setValue(a[4]);
																		}
																	}
																},
																focus	: function() {
																	infoMsgTime('目前仅支持刀片型号为 "wwwwdddddd-ww*" 形式的匹配！如果您需要匹配其它类型，请联系开发人员。', 15);
																}
															}
														}, {
															fieldLabel	: '刀片名称',
															name		: 'name',
															emptyText	: '请输入刀片名称...'
														}, turningtypeCombo, grooveCombo, bladematerialCombo, brandCombo]
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
															fieldLabel	: 'ERP编码',
															name		: 'erpcode',
															emptyText	: '请输入ERP编码...'
														}, /*
															 * { fieldLabel : '刀片后角', name : 'reliefangle', id : 'reliefangleid', emptyText : '请输入刀片后角...' }, { fieldLabel : '刀片形状', name : 'shape', id :
															 * 'shapeid', emptyText : '请输入刀片形状...' }, { fieldLabel : '切削刃长度', name : 'celength', id : 'celengthid', emptyText : '请输入切削刃长度...' }, {
															 * fieldLabel : '刀片厚度', name : 'thickness', emptyText : '请输入刀片厚度...' }, { fieldLabel : '刀尖圆弧半径', name : 'noseradius', id : 'noseradiusid',
															 * emptyText : '请输入刀尖圆弧半径...' }
															 */reliefangleCombo, shapeCombo, celengthCombo, thicknessCombo, noseradiusCombo]
											}]
								}, {
									fieldLabel	: '结构简图',
									name		: 'figure',
									id			: 'figureid',
									xtype		: 'textfield',
									inputType	: 'file',
									maxLength	: mlh,
									labelStyle	: fucolor,
									anchor		: '94.6%',
									allowBlank	: true
								}, figureRadio, {
									fieldLabel	: '特征描述',
									name		: 'description',
									xtype		: 'textfield',
									maxLength	: mlh,
									labelStyle	: fucolor,
									anchor		: '94.6%',
									emptyText	: '请输入特征描述...'
								}, {
									fieldLabel	: '备注',
									xtype		: 'textfield',
									name		: 'remark',
									maxLength	: mlh,
									anchor		: '94.6%',
									emptyText	: '请输入备注...'
								}, {
									id		: 'bladeid',
									name	: 'bladeid',
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
						height		: 390,
						modal		: true,
						closable	: true, // 是否可关闭
						closeAction	: 'hide',
						collapsible	: false, // 是否可收缩
						maximizable	: false, // 设置是否可以最大化
						border		: false, // 边框线设置
						constrain	: false, // 设置窗口是否可以溢出父容器
						// pageY : document.body.clientHeight / 2 - 330 / 2,//pageY : 20, // 页面定位Y坐标
						// pageX : document.body.clientWidth / 2 - 800 / 2, //页面定位X坐标
						items		: [addItemForm],
						buttons		: [{
									text	: '保存',
									id		: 'savebtn',
									iconCls	: 'acceptIcon',
									handler	: function() {
										if (runMode == '0') {
											infoMsgClick('应用授权不可用，请联系开发人员输入购买的授权密码，您目前只能进行查询操作！');
											return;
										}
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
										addItemForm.form.reset();
										addItem.hide();
									}
								}],
						listeners	: {
							hide	: function() {
								if (imageshowWin != null) {
									imageshowWin.close();
								}
							}
						}
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
						stateId		: 'grid-blade-test'

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

			// 表格鼠标悬停事件
			grid.on('mouseover', function(e) {
						var index = grid.getView().findRowIndex(e.getTarget());
						if (index != false && index >= 0) {
							var record = store.getAt(index);
							var da = record.data.figure;
							if (da != null && da != "") {
								var rowEl = Ext.get(e.getTarget());
								rowEl.set({
											'ext:qtip'		: '<div style="font-size: 16;">' + "<a href='javascript:void(0);'><img src='" + webContext + da + "'/></a>" + '</div>',
											'ext:qwidth'	: 200,
											'ext:qtitle'	: '<b>刀片简图<b></br>',
											'ext:qclass'	: ''
										}, false);
							}
						}
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
								}, '-', {
									text	: '查询',
									iconCls	: 'page_findIcon',
									handler	: function() {
										advancedQuery();
									}
								}]
					});

			// 复制
			function copyCell() {
				copyToClipboard(infoCell);
			}

			// 绑定右键
			var infoCell;
			grid.on("cellcontextmenu", function(grid, rowIndex, columnIndex, e) {// cellcontextmenu //rowcontextmenu
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
				if (!isUndefined(Ext.getCmp('windowmode').getValue())) {
					addItemForm.form.getEl().dom.reset();
				}

				addItem.setTitle('<span class="commoncss">新增</span>');
				Ext.getCmp('windowmode').setValue('add');

				Ext.getCmp('savebtn').setText('保存');
				addItem.show();

				clearUploadField('figureid');
				addItemForm.form.reset();
			}

			// 修改
			var imageshowWin = null;
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

				var da = record.data.figure;
				imageshowWin = imageshow(da);
				if (imageshowWin != null) {
					imageshowWin.show();
				} else {
					infoMsg('该条目还没有添加图片!');
				}

				addItemForm.getForm().loadRecord(record);
				addItem.setTitle('<span class="commoncss">修改</span>');

				Ext.getCmp('savebtn').setText('更新');
				Ext.getCmp('windowmode').setValue('edit');
				addItem.show();

				clearUploadField('figureid');
			}

			// 删除
			function deleteInit() {
				var records = grid.getSelectionModel().getSelections();
				if (Ext.isEmpty(records)) {
					infoMsg('您没有选中任何条目，请先选中要删除的项目！');
					return;
				}
				var strChecked = jsArray2JsString(records, 'bladeid');
				Ext.Msg.confirm('请确认', '确认删除选中的记录吗', function(btn, text) {
							if (btn == 'yes') {
								showWaitMsg();
								Ext.Ajax.request({
											url		: 'blade.do?code=deleteBlade',
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
							url				: 'blade.do?code=saveBlade',
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
							},
							params			: {
								compressflag	: figureRadio.getValue().inputValue
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
							url				: 'blade.do?code=updateBlade',
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
							},
							params			: {
								compressflag	: figureRadio.getValue().inputValue
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
