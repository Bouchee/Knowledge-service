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
				dataIndex	: 'threadbladeid', // 数据索引,和Store数据存储模型对应
				width		: 60, // 列宽度
				sortable	: true, // 该列是否要排序
				//hidden		: true
					// 该列是否隐藏
				}, {
				header		: 'SAP编码',
				dataIndex	: 'sapcode',
				width		: 60,
				sortable	: true,
				//hidden		: true
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
				width		: 180,
				sortable	: true
			}, {
				header		: '结构简图',
				dataIndex	: 'figure',
				width		: 80,
				//hidden		: true,
				sortable	: true
			}, {
				header		: '尺寸图',
				dataIndex	: 'figure2',
				width		: 80,
				//hidden		: true,
				sortable	: true
			}, {
				header		: '螺纹类型',
				dataIndex	: 'threadtype',
				width		: 80,
				//hidden		: true,
				sortable	: true,
				renderer	: THREADTYPERender
			}, {
				header		: '刀片材质ID',
				dataIndex	: 'bladematerialid',
				width		: 80,
				sortable	: true,
				//hidden		: true
			}, {
				header		: '刀片材质',
				dataIndex	: 'bladematerialname',
				width		: 60,
				// hidden : true,
				sortable	: true
			}, {
				header		: '刀片品牌ID',
				dataIndex	: 'brandid',
				width		: 80,
				//hidden		: true,
				sortable	: true
			}, {
				header		: '刀片品牌',
				dataIndex	: 'brandname',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '螺距',
				dataIndex	: 'pitch',
				width		: 80,
				align		: 'center',
				// hidden : true,
				sortable	: true,
				renderer	: PITCHRender
			}, {
				header		: '螺纹标准',
				dataIndex	: 'threadstandard',
				align		: 'center',
				width		: 80,
				// hidden : true,
				sortable	: true,
				renderer	: THREADSTANDARDRender
			}, {
				header		: '刀片类型',
				dataIndex	: 'blademold',
				width		: 60,
				// hidden : true,
				sortable	: true,
				renderer	: BLADEMOLDRender
			}, {
				header		: '刀尖大小',
				dataIndex	: 'bladesize',
				width		: 60,
				align		: 'center',
				// hidden : true,
				sortable	: true,
				renderer	: BLADESIZERender
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
				dataIndex	: 'threadhand',
				width		: 130,
				//hidden		: true,
				sortable	: true,
				renderer	: THREADHANDRender
			}, {
				header		: '特征描述',
				dataIndex	: 'description',
				width		: 130,
				//hidden		: true,
				sortable	: true
			}, {
				header		: '刀片特征码',
				dataIndex	: 'featurecode',
				width		: 70,
				align		: 'center',
				//hidden		: true,
				sortable	: true
			}, {
				header		: '最大切削深度',
				dataIndex	: 'apmax',
				width		: 90,
				align		: 'center',
				// hidden : true,
				sortable	: true
			}, {
				header		: '最大切削进给',
				dataIndex	: 'fnmax',
				width		: 90,
				align		: 'center',
				// hidden : true,
				sortable	: true
			}, {
				header		: '备注信息',
				dataIndex	: 'remark',
				width		: 160,
				// hidden : true,
				sortable	: true
			}]);

			// Store数据存储
			var store = new Ext.data.GroupingStore({
						proxy	: new Ext.data.HttpProxy({
							url	: 'threadblade.do?code=queryThreadblade4Manage'
								// queryThreadblade4Manage是在ThreadbladeAction中的方法queryThreadblade4Manage;
							}),
						reader	: new Ext.data.JsonReader({
									totalProperty	: 'TOTALCOUNT',
									root			: 'ROOT'
								}, [{
											name	: 'threadbladeid'
										}, {
											name	: 'sapcode'
										}, {
											name	: 'name'
										}, {
											name	: 'bladetype'
										}, {
											name	: 'figure'
										}, {
											name	: 'figure2'
										}, {
											name	: 'threadtype'
										}, {
											name	: 'bladematerialid'
										}, {
											name	: 'bladematerialname'
										}, {
											name	: 'brandid'
										}, {
											name	: 'brandname'
										}, {
											name	: 'pitch'
										}, {
											name	: 'threadstandard'
										}, {
											name	: 'blademold'
										}, {
											name	: 'bladesize'
										}, {
											name	: 'thickness'
										}, {
											name	: 'threadhand'
										}, {
											name	: 'description'
										}, {
											name	: 'featurecode'
										}, {
											name	: 'apmax'
										}, {
											name	: 'fnmax'
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
								}, '-', {
									text : 'Excel导入',
									iconCls : 'page_excelIcon',
									id : 'excelImport',
									handler : function() {
										importExcelData();
									}
								}, '->', {
									xtype			: 'textfield',
									id				: 'inputname',
									name			: 'inputname',
									cls				: 'search',
									emptyText		: '刀片型号|特征描述|备注',
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

			var threadbladematerialStore = new Ext.data.Store({
						proxy		: new Ext.data.HttpProxy({
									url	: 'threadblade.do?code=queryThreadbladematerial4Threadblade'
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
			threadbladematerialStore.load(); // 如果mode : 'local',时候才需要手动load();

			var threadbladematerialCombo = new Ext.form.ComboBox({
						fieldLabel		: '刀片材质',
						hiddenName		: 'bladematerialid',
						id				: 'bladematerialidid',
						emptyText		: '请选择刀片材质...',
						triggerAction	: 'all',
						store			: threadbladematerialStore,
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
								// threadbladematerialStore.load();
								setTimeout('Ext.getCmp("bladematerialidid").expand();', 1);
							}
						}
					});

			var brandStore = new Ext.data.Store({
						proxy		: new Ext.data.HttpProxy({
									url	: 'threadblade.do?code=queryBrand4Threadblade'
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

			/*
			 * var turningtypeCombo = new Ext.form.ComboBox({ fieldLabel : '车削类型', hiddenName : 'turningtype', id : 'turningtypeid', emptyText : '请选择车削类型...', triggerAction : 'all', store :
			 * TURNINGTYPEStore, displayField : 'text', valueField : 'value', loadingText : '正在加载数据...', mode : 'local', //editable : false, forceSelection : true, plugins : [new
			 * QM.plugin.PinyinFilter], resizable : true, anchor : '94.6%', listeners : { focus : function() { setTimeout('Ext.getCmp("turningtypeid").expand();', 1); } } });
			 * 
			 * var reliefangleCombo = new Ext.form.ComboBox({ fieldLabel : '刀片后角', hiddenName : 'reliefangle', id : 'reliefangleid', emptyText : '请输入刀片后角...', triggerAction : 'all', store :
			 * RELIEFANGLEStore, displayField : 'text', valueField : 'value', loadingText : '正在加载数据...', mode : 'local', //editable : false, forceSelection : true, plugins : [new
			 * QM.plugin.PinyinFilter], resizable : true, anchor : '94.6%', listeners : { focus : function() { setTimeout('Ext.getCmp("reliefangleid").expand();', 1); } } });
			 * 
			 * var shapeCombo = new Ext.form.ComboBox({ fieldLabel : '刀片形状', hiddenName : 'shape', id : 'shapeid', emptyText : '请输入刀片形状...', triggerAction : 'all', store : SHAPEStore, displayField :
			 * 'text', valueField : 'value', loadingText : '正在加载数据...', mode : 'local', //editable : false, forceSelection : true, plugins : [new QM.plugin.PinyinFilter], resizable : true, anchor :
			 * '94.6%', listeners : { focus : function() { setTimeout('Ext.getCmp("shapeid").expand();', 1); } } });
			 */

			var threadstandardCombo = new Ext.form.ComboBox({
						fieldLabel		: '螺纹标准',
						hiddenName		: 'threadstandard',
						id				: 'threadstandardid',
						emptyText		: '请选择螺纹标准...',
						triggerAction	: 'all',
						store			: THREADSTANDARDStore,
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
								setTimeout('Ext.getCmp("threadstandardid").expand();', 1);
							}
						}
					});

			var threadtypeCombo = new Ext.form.ComboBox({
						fieldLabel		: '螺纹类型',
						hiddenName		: 'threadtype',
						id				: 'threadtypeid',
						emptyText		: '请输入螺纹类型..',
						triggerAction	: 'all',
						store			: THREADTYPEStore,
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
								setTimeout('Ext.getCmp("threadtypeid").expand();', 1);
							}
						}
					});

			var bladesizeCombo = new Ext.form.ComboBox({
						fieldLabel		: '刀片尺寸',
						hiddenName		: 'bladesize',
						id				: 'bladesizeid',
						emptyText		: '请输入刀片尺寸..',
						triggerAction	: 'all',
						store			: BLADESIZEStore,
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
								setTimeout('Ext.getCmp("bladesizeid").expand();', 1);
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

			var threadhandCombo = new Ext.form.ComboBox({
						fieldLabel		: '刀片左右手',
						hiddenName		: 'threadhand',
						id				: 'threadhandid',
						emptyText		: '请输入刀片左右手..',
						triggerAction	: 'all',
						store			: THREADHANDStore,
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
								setTimeout('Ext.getCmp("threadhandid").expand();', 1);
							}
						}
					});

			/*var pitchCombo = new Ext.form.ComboBox({
						fieldLabel		: '螺距',
						hiddenName		: 'pitch',
						id				: 'pitchid',
						emptyText		: '请输入螺距..',
						triggerAction	: 'all',
						store			: PITCHStore,
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
								setTimeout('Ext.getCmp("pitchid").expand();', 1);
							}
						}
					});
*/
			var blademoldCombo = new Ext.form.ComboBox({
						fieldLabel		: '刀片类型',
						hiddenName		: 'blademold',
						id				: 'blademoldid',
						emptyText		: '请输入刀片类型..',
						triggerAction	: 'all',
						store			: BLADEMOLDStore,
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
								setTimeout('Ext.getCmp("blademoldid").expand();', 1);
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

			var figure2Radio = new Ext.form.RadioGroup({
						fieldLabel	: "压缩参数",
						name		: "compressflag2",
						labelStyle	: fucolor,
						items		: [new Ext.form.Radio({
											name		: "compressflag2",
											inputValue	: "0",
											boxLabel	: "直接上传",
											checked		: true
										}), new Ext.form.Radio({
											name		: "compressflag2",
											inputValue	: "8",
											boxLabel	: "800*500"
										}), new Ext.form.Radio({
											name		: "compressflag2",
											inputValue	: "4",
											boxLabel	: "400*246"
										}), new Ext.form.Radio({
											name		: "compressflag2",
											inputValue	: "2",
											boxLabel	: "200*120"
										}), new Ext.form.Radio({
											name		: "compressflag2",
											inputValue	: "1",
											boxLabel	: "100*60"
										}), new Ext.form.Radio({
											name		: "compressflag2",
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
							dataIndex	: 'threadtype',
							type		: 'string'
						}, {
							dataIndex	: 'bladematerialname',
							type		: 'string'
						}, {
							dataIndex	: 'brandname',
							type		: 'string'
						}, {
							dataIndex	: 'pitch',
							type		: 'numeric'
						}, {
							dataIndex	: 'threadstandard',
							type		: 'numeric'
						}, /*
							 * { dataIndex : 'celength', type : 'string' }, { dataIndex : 'noseradius', type : 'string' },
							 */{
							dataIndex	: 'blademold',
							type		: 'numeric'
						}, {
							dataIndex	: 'bladesize',
							type		: 'string'
						}, {
							dataIndex	: 'thickness',
							type		: 'numeric'
						}, {
							dataIndex	: 'threadhand',
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
							dataIndex	: 'fnmax',
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
												/*
												 * blur : function(e) { if (!isUndefined(e.getValue())) { e.setValue(e.getValue().toUpperCase()); var value = e.getValue(); var re = null; var arrSplit =
												 * null; re = new RegExp(/^([A-Z]{4})([\d]{6})-([A-Z]{2}) ?(\w+)$/); if (re.test(value)) { a = value.match(re); var mv = a[1].substr(0, 1);
												 * //第一个字母代表刀片形状; var mv2 = a[2].substr(0, 2); if (mv == 'C') { Ext.getCmp('shapeid').setValue(1); if (mv2 == '06') {
												 * Ext.getCmp('celengthid').setValue(4); } else if (mv2 == '09') { Ext.getCmp('celengthid').setValue(5); } else if (mv2 == '12') {
												 * Ext.getCmp('celengthid').setValue(6); } else if (mv2 == '16') { Ext.getCmp('celengthid').setValue(1); } else if (mv2 == '19') {
												 * Ext.getCmp('celengthid').setValue(2); } else if (mv2 == '25') { Ext.getCmp('celengthid').setValue(3); } } else if (mv == 'D') {
												 * Ext.getCmp('shapeid').setValue(2); if (mv2 == '07') { Ext.getCmp('celengthid').setValue(7); } else if (mv2 == '11') {
												 * Ext.getCmp('celengthid').setValue(8); } else if (mv2 == '15') { Ext.getCmp('celengthid').setValue(9); } } else if (mv == 'R') {
												 * Ext.getCmp('shapeid').setValue(3); if (mv2 == '05') { Ext.getCmp('celengthid').setValue(10); } else if (mv2 == '06') {
												 * Ext.getCmp('celengthid').setValue(11); } else if (mv2 == '08') { Ext.getCmp('celengthid').setValue(12); } else if (mv2 == '10') {
												 * Ext.getCmp('celengthid').setValue(13); } else if (mv2 == '12') { Ext.getCmp('celengthid').setValue(14); } else if (mv2 == '16') {
												 * Ext.getCmp('celengthid').setValue(15); } else if (mv2 == '20') { Ext.getCmp('celengthid').setValue(16); } else if (mv2 == '25') {
												 * Ext.getCmp('celengthid').setValue(17); } } else if (mv == 'S') { Ext.getCmp('shapeid').setValue(4); if (mv2 == '09') {
												 * Ext.getCmp('celengthid').setValue(18); } else if (mv2 == '12') { Ext.getCmp('celengthid').setValue(19); } else if (mv2 == '15') {
												 * Ext.getCmp('celengthid').setValue(20); } else if (mv2 == '19') { Ext.getCmp('celengthid').setValue(21); } else if (mv2 == '25') {
												 * Ext.getCmp('celengthid').setValue(22); } } else if (mv == 'T') { Ext.getCmp('shapeid').setValue(5); if (mv2 == '06') {
												 * Ext.getCmp('celengthid').setValue(23); } else if (mv2 == '09') { Ext.getCmp('celengthid').setValue(24); } else if (mv2 == '11') {
												 * Ext.getCmp('celengthid').setValue(25); } else if (mv2 == '16') { Ext.getCmp('celengthid').setValue(26); } else if (mv2 == '22') {
												 * Ext.getCmp('celengthid').setValue(27); }
												 *  } else if (mv == 'V') {//FIXME Ext.getCmp('shapeid').setValue(6); if (mv2 == '11') { Ext.getCmp('celengthid').setValue(25); } else if (mv2 == '16') {
												 * Ext.getCmp('celengthid').setValue(26); } //TODO } else if (mv == 'W') { Ext.getCmp('shapeid').setValue(7); if (mv2 == '04') {
												 * Ext.getCmp('celengthid').setValue(28); } else if (mv2 == '06') { Ext.getCmp('celengthid').setValue(29); } else if (mv2 == '08') {
												 * Ext.getCmp('celengthid').setValue(30); } }
												 * 
												 * mv = a[1].substr(1, 1); //第二个字母代表刀片后角; if (mv == 'B') { Ext.getCmp('reliefangleid').setValue(1); } else if (mv == 'C') {
												 * Ext.getCmp('reliefangleid').setValue(2); } else if (mv == 'N') { Ext.getCmp('reliefangleid').setValue(3); } else if (mv == 'P') {
												 * Ext.getCmp('reliefangleid').setValue(4); }
												 * 
												 * mv = a[2].substr(4, 2);//数字的第56两位代表刀尖圆弧半径; if (mv == '00') { Ext.getCmp('noseradiusid').setValue(1); } else if (mv == '02') {
												 * Ext.getCmp('noseradiusid').setValue(2); } else if (mv == '04') { Ext.getCmp('noseradiusid').setValue(3); } else if (mv == '08') {
												 * Ext.getCmp('noseradiusid').setValue(4); } else if (mv == '12') { Ext.getCmp('noseradiusid').setValue(5); } else if (mv == '16') {
												 * Ext.getCmp('noseradiusid').setValue(6); } else if (mv == '24') { Ext.getCmp('noseradiusid').setValue(7); } else if (mv == '32') {
												 * Ext.getCmp('noseradiusid').setValue(8); } else if (mv == 'A1') { Ext.getCmp('noseradiusid').setValue(9); } else if (mv == 'M0') {
												 * Ext.getCmp('noseradiusid').setValue(10); } } } }, focus : function() { infoMsgTime('目前仅支持刀片型号为 "wwwwdddddd-ww*" 形式的匹配！如果您需要匹配其它类型，请联系开发人员。', 15); }
												 */
												}
														}, {
															fieldLabel	: '刀片名称',
															name		: 'name',
															emptyText	: '请输入刀片名称...'
														},{
															fieldLabel	: '切削深度',
															name		: 'apmax',
															emptyText	: '请输入切削深度...'
														}
														, threadtypeCombo, threadbladematerialCombo, brandCombo,{
															fieldLabel	: '螺距',
															name		: 'pitch',
															emptyText	: '请输入螺距...'
														} ]
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
															fieldLabel	: 'SAP编码',
															name		: 'sapcode',
															emptyText	: '请输入SAP编码...'
														}, {
															fieldLabel	: '刀片特征码',
															name		: 'featurecode',
															emptyText	: '请输入刀片特征码...'
														},{
															fieldLabel	: '切削进给',
															name		: 'fnmax',
															emptyText	: '请输入切削进给...'
														},
														threadstandardCombo, blademoldCombo, bladesizeCombo, thicknessCombo, threadhandCombo]
											}]
								}, {
									fieldLabel	: '结构简图',
									name		: 'figure',
									id			: 'figureid',
									xtype		: 'fileuploadfield',
									maxLength	: mlh,
									labelStyle	: fucolor,
									anchor		: '94.6%',
									allowBlank	: true
								}, figureRadio, {
									fieldLabel	: '尺寸图',
									name		: 'figure2',
									id			: 'figure2id',
									xtype		: 'fileuploadfield',
									maxLength	: mlh,
									labelStyle	: fucolor,
									anchor		: '94.6%',
									allowBlank	: true
								}, figure2Radio, {
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
									id		: 'threadbladeid',
									name	: 'threadbladeid',
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
						height		: Ext.isChrome ? 507 : (Ext.isFirefox ? 503 : 503),
						// height : 430,
						modal		: false,
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
							hide		: function() {
								if (imageshowWin != null) {
									imageshowWin.close();
								}
							},
							beforeshow	: function() {
								Ext.getBody().mask();
							},
							beforehide	: function() {
								Ext.getBody().unmask();
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
						stateId		: 'grid-screw-blade'

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
				clearUploadField('figure2id');
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

				addItemForm.getForm().loadRecord(record);
				addItem.setTitle('<span class="commoncss">修改</span>');

				Ext.getCmp('savebtn').setText('更新');
				Ext.getCmp('windowmode').setValue('edit');
				Ext.getCmp('threadbladeid').setValue(record.get('threadbladeid'));
				addItem.show();
				
				
				
				
				clearUploadField('figureid');
				clearUploadField('figure2id');

				imageshowWin = imageshow2(record.data.figure, record.data.figure2, addItem, 80);
				if (imageshowWin != null) {
					imageshowWin.show();
				} else {
					infoMsg('该条目还没有添加图片!');
				}
			}

			// 删除
			function deleteInit() {
				var records = grid.getSelectionModel().getSelections();
				if (Ext.isEmpty(records)) {
					infoMsg('您没有选中任何条目，请先选中要删除的项目！');
					return;
				}
				var strChecked = jsArray2JsString(records, 'threadbladeid');
				Ext.Msg.confirm('请确认', '确认删除选中的记录吗', function(btn, text) {
							if (btn == 'yes') {
								showWaitMsg();
								Ext.Ajax.request({
											url		: 'threadblade.do?code=deleteThreadblade',
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
							url				: 'threadblade.do?code=saveThreadblade',
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
								compressflag	: figureRadio.getValue().inputValue,
								compressflag2	: figure2Radio.getValue().inputValue
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
							url				: 'threadblade.do?code=updateThreadblade',
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
								compressflag	: figureRadio.getValue().inputValue,
								compressflag2	: figure2Radio.getValue().inputValue
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
					enableKeyEvents : true,

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
															url : 'threadblade.do?code=importThreadbladeFromExcel',
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
														url : 'threadblade.do?code=importThreadbladeFromExcel',
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
