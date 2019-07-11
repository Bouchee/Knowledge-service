/**
 * 螺纹刀体管理
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
				header		: '刀体编号', // 列标题
				dataIndex	: 'toolholderid', // 数据索引,和Store数据存储模型对应
				width		: 60, // 列宽度
				sortable	: true, // 该列是否要排序
				hidden		: true
					// 该列是否隐藏
				}, {
				header		: 'SAP编码',
				dataIndex	: 'sapcode',
				width		: 120,
				sortable	: true
				//hidden		: true
			}, {
				header		: '刀体名称',
				dataIndex	: 'name',
				width		: 70,
				sortable	: true
					// hidden : true
				}, {
				header		: '刀体型号',
				dataIndex	: 'toolholdertype',
				width		: 130,
				sortable	: true
					// hidden : true
				}, {
				header		: '刀体品牌ID',
				dataIndex	: 'brandid',
				width		: 80,
				hidden		: true,
				sortable	: true
			}, {
				header		: '刀体品牌名称',
				dataIndex	: 'brandname',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '螺纹类型',
				dataIndex	: 'threadtype',
				width		: 80,
				hidden		: true,
				sortable	: true
			}, {
				header		: '接口规格',
				dataIndex	: 'portsize',
				width		: 60,
				align		: 'center',
				// hidden : true,
				sortable	: true
			}, {
				header		: '切削方向',
				dataIndex	: 'handoftool',
				width		: 60,
				// hidden : true,
				sortable	: true
			}, {
				header		: '结构简图',
				dataIndex	: 'figure',
				hidden : true,
				width		: 60,
				sortable	: true
			}, {
				header		: '尺寸图',
				dataIndex	: 'figure2',
				hidden : true,
				width		: 60,
				sortable	: true
			}, {
				header		: '刀片形式',
				dataIndex	: 'featurecode',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '压紧刀片方式',
				dataIndex	: 'cseries',
				width		: 80,
				renderer	: CSERIESRender,
				// hidden : true,
				sortable	: true
			}, {
				header		: '刀体长度',
				dataIndex	: 'length',
				width		: 60,
				align		: 'center',
				// hidden : true,
				sortable	: true
			}, {
				header		: '刀体宽度',
				dataIndex	: 'width',
				// hidden : true,
				align		: 'center',
				width		: 60,
				sortable	: true
			}, {
				header		: '螺纹直径',
				dataIndex	: 'diameter',
				// hidden : true,
				align		: 'center',
				width		: 80,
				sortable	: true
			}, {
				header		: '附件1名称',
				dataIndex	: 'aname1',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '附件1型号',
				dataIndex	: 'atype1',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '附件2名称',
				dataIndex	: 'aname2',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '附件2型号',
				dataIndex	: 'atype2',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '附件3名称',
				dataIndex	: 'aname3',
				width		: 80,
				hidden		: true,
				sortable	: true
			}, {
				header		: '附件3型号',
				dataIndex	: 'atype3',
				width		: 80,
				hidden		: true,
				sortable	: true
			}, {
				header		: '附件4名称',
				dataIndex	: 'aname4',
				width		: 80,
				hidden		: true,
				sortable	: true
			}, {
				header		: '附件4型号',
				dataIndex	: 'atype4',
				width		: 80,
				hidden		: true,
				sortable	: true
			}, {
				header		: '附件5名称',
				dataIndex	: 'aname5',
				width		: 80,
				hidden		: true,
				sortable	: true
			}, {
				header		: '附件5型号',
				dataIndex	: 'atype5',
				width		: 80,
				hidden		: true,
				sortable	: true
			}, {
				header		: '备注信息',
				dataIndex	: 'remark',
				width		: 80,
				// hidden : true,
				sortable	: true
			}]);

			// Store数据存储
			var store = new Ext.data.GroupingStore({
						proxy	: new Ext.data.HttpProxy({
									url	: 'threadtoolholder.do?code=queryThreadtoolholder4Manage'
								}),
						reader	: new Ext.data.JsonReader({
									totalProperty	: 'TOTALCOUNT',
									root			: 'ROOT'
								}, [{
											name	: 'toolholderid'
										}, {
											name	: 'sapcode'
										}, {
											name	: 'name'
										}, {
											name	: 'toolholdertype'
										}, {
											name	: 'brandid'
										}, {
											name	: 'brandname'
										}, {
											name	: 'threadtype'
										}, {
											name	: 'portsize'
										}, {
											name	: 'handoftool'
										}, {
											name	: 'figure'
										}, {
											name	: 'figure2'
										}, {
											name	: 'featurecode'
										}, {
											name	: 'cseries'
										}, {
											name	: 'length'
										}, {
											name	: 'width'
										}, {
											name	: 'dimeter'
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
									emptyText		: '型号|接口规格|切削方向',
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

			var brandStore = new Ext.data.Store({
						proxy		: new Ext.data.HttpProxy({
									url	: 'threadtoolholder.do?code=queryBrand4Threadtoolholder'
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
							}
						}
					});
			brandStore.load(); // 如果mode : 'local',时候才需要手动load();

			var brandCombo = new Ext.form.ComboBox({
						fieldLabel		: '刀体品牌',
						hiddenName		: 'brandid',
						id				: 'brandidid',
						emptyText		: '请选择刀体品牌...',
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
						// width : '85%',
						listeners		: {
							focus	: function() {
								// brandStore.load();
								setTimeout('Ext.getCmp("brandidid").expand();', 1);
							}
						}
					});

			var threadtypeCombo = new Ext.form.ComboBox({
						fieldLabel		: '螺纹类型',
						hiddenName		: 'threadtype',
						id				: 'threadtypeid',
						emptyText		: '请选择螺纹类型...',
						triggerAction	: 'all',
						store			: THREADTYPEStore,
						displayField	: 'text',
						valueField		: 'value',
						loadingText		: '正在加载数据...',
						mode			: 'local',
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

			var cseriesCombo = new Ext.form.ComboBox({
						fieldLabel		: '压紧刀片方式',
						hiddenName		: 'cseries',
						id				: 'cseriesid',
						emptyText		: '请选择压紧刀片方式...',
						triggerAction	: 'all',
						store			: CSERIESStore,
						displayField	: 'text',
						valueField		: 'value',
						loadingText		: '正在加载数据...',
						mode			: 'local',
						forceSelection	: true,
						plugins			: [new QM.plugin.PinyinFilter],
						resizable		: true,
						anchor			: '94.6%',
						listeners		: {
							focus	: function() {
								setTimeout('Ext.getCmp("cseriesid").expand();', 1);
							}
						}
					});

			var diameterCombo = new Ext.form.ComboBox({
						fieldLabel		: '螺纹直径',
						hiddenName		: 'diameter',
						id				: 'diameterid',
						emptyText		: '请选择螺纹直径...',
						triggerAction	: 'all',
						store			: DIAMETERStore,
						displayField	: 'text',
						valueField		: 'value',
						loadingText		: '正在加载数据...',
						mode			: 'local',
						forceSelection	: true,
						plugins			: [new QM.plugin.PinyinFilter],
						resizable		: true,
						anchor			: '94.6%',
						listeners		: {
							focus	: function() {
								setTimeout('Ext.getCmp("diameterid").expand();', 1);
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
							dataIndex	: 'toolholdertype',
							type		: 'string'
						}, {
							dataIndex	: 'brandname',
							type		: 'string'
						}, {
							dataIndex	: 'threadtype',
							type		: 'string'
						}, {
							dataIndex	: 'portsize',
							type		: 'string'
						}, {
							dataIndex	: 'handoftool',
							type		: 'string'
						}, {
							dataIndex	: 'figure',
							type		: 'string'
						}, {
							dataIndex	: 'figure2',
							type		: 'string'
						}, {
							dataIndex	: 'featurecode',
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
							dataIndex	: 'diameter',
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

			// 新增窗口表单
			var addItemForm = new Ext.form.FormPanel({
						width		: '100%',
						header		: false,
						autoHeight	: true,
						frame		: true,
						layout		: 'form',
						labelWidth	: 100,
						fileUpload	: true,
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
															fieldLabel	: '刀体型号',
															name		: 'toolholdertype',
															allowBlank	: false,
															labelStyle	: micolor,
															emptyText	: '请输入刀体型号...'
														}, {
															fieldLabel	: 'SAP编号',
															name		: 'sapcode',
															emptyText	: '请输入SAP编号...'
														}, {
															fieldLabel	: '刀具方向',
															name		: 'handoftool',
															emptyText	: '请输入刀具方向...'
														},{
															fieldLabel	: '刀体名称',
															name		: 'name',
															emptyText	: '请输入刀体名称...'
														}, brandCombo, threadtypeCombo, cseriesCombo]
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
															fieldLabel	: '刀体宽度',
															name		: 'width',
															maxLength	: 10,
															emptyText	: '请输入刀体宽度...'
														}, diameterCombo, {
															fieldLabel	: '切削方向',
															name		: 'handoftool',
															emptyText	: '请输入切削方向...'
														}, {
															fieldLabel	: '刀片形式',
															name		: 'featurecode',
															emptyText	: '请输入刀片形式...'
														}, {
															fieldLabel	: '接口规格',
															name		: 'portsize',
															emptyText	: '请输入接口规格...'
														}, {
															fieldLabel	: '刀体长度',
															name		: 'length',
															maxLength	: 10,
															emptyText	: '请输入刀体长度...'
														}]
											}]
								}, {
									fieldLabel	: '结构简图',
									name		: 'figure',
									id			: 'figureid',
									maxLength	: mlh,
									xtype		: 'fileuploadfield',
									labelStyle	: fucolor,
									anchor		: '94.6%',
									allowBlank	: true
								}, figureRadio, {
									fieldLabel	: '尺寸图',
									name		: 'figure2',
									id			: 'figure2id',
									maxLength	: mlh,
									xtype		: 'fileuploadfield',
									labelStyle	: fucolor,
									anchor		: '94.6%',
									allowBlank	: true
								}, figure2Radio, {
									fieldLabel	: '备注',
									name		: 'remark',
									xtype		: 'textfield',
									maxLength	: mlh,
									anchor		: '94.6%',
									emptyText	: '请输入备注...'
								}, {
									xtype			: 'fieldset',
									collapsible		: true,
									collapsed		: true,
									title			: '附件信息',
									layout			: 'fit',
									id				: 'fieldset1',
									animCollapse	: true,
									height			: 50,
									defaults		: {
										anchor	: '100%'
									},
									listeners		: {
										'collapse'	: function(obj) {
											addItem.setHeight(addItem.getHeight() - 160);
											addItem.setPagePosition(document.body.clientWidth / 2 - 800 / 2, document.body.clientHeight / 2 - addItem.getHeight() / 2);
											addItem.doLayout(false, true);
											// Ext.getCmp('fieldset1').expand();
										},
										'expand'	: function(obj) {
											addItem.setHeight(addItem.getHeight() + 160);
											addItem.setPagePosition(document.body.clientWidth / 2 - 800 / 2, document.body.clientHeight / 2 - addItem.getHeight() / 2);
											addItem.doLayout(false, true);
											// Ext.getCmp('fieldset1').collapse();
										}
									},
									height			: '100%',
									items			: [{
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
																		fieldLabel	: '附件1名称',
																		name		: 'aname1',
																		emptyText	: '请输入附件1名称...'
																	}, {
																		fieldLabel	: '附件2名称',
																		name		: 'aname2',
																		emptyText	: '请输入附件2名称...'
																	}, {
																		fieldLabel	: '附件3名称',
																		name		: 'aname3',
																		emptyText	: '请输入附件3名称...'
																	}, {
																		fieldLabel	: '附件4名称',
																		name		: 'aname4',
																		emptyText	: '请输入附件4名称...'
																	}, {
																		fieldLabel	: '附件5名称',
																		name		: 'aname5',
																		emptyText	: '请输入附件5名称...'
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
																		fieldLabel	: '附件1型号',
																		name		: 'atype1',
																		emptyText	: '请输入附件1型号...'
																	}, {
																		fieldLabel	: '附件2型号',
																		name		: 'atype2',
																		emptyText	: '请输入附件2型号...'
																	}, {
																		fieldLabel	: '附件3型号',
																		name		: 'atype3',
																		emptyText	: '请输入附件3型号...'
																	}, {
																		fieldLabel	: '附件4型号',
																		name		: 'atype4',
																		emptyText	: '请输入附件4型号...'
																	}, {
																		fieldLabel	: '附件5型号',
																		name		: 'atype5',
																		emptyText	: '请输入附件5型号...'
																	}]
														}]
											}]
								}, {
									id		: 'toolholderid',
									name	: 'toolholderid',
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
						title			: '<span class="commoncss">新增</span>',
						layout			: 'fit',
						width			: 800,
						height			: Ext.isChrome ? 577 : (Ext.isFirefox ? 573 : 573),
						// height : 580,
						closable		: true, // 是否可关闭
						closeAction		: 'hide',
						animCollapse	: true,
						modal			: false,
						collapsible		: false, // 是否可收缩
						maximizable		: false, // 设置是否可以最大化
						border			: false, // 边框线设置
						constrain		: false, // 设置窗口是否可以溢出父容器
						// pageY : document.body.clientHeight / 2 - 350 / 2,//20, // 页面定位Y坐标
						// pageX : document.body.clientWidth / 2 - 800 / 2, //页面定位X坐标
						items			: [addItemForm],
						buttons			: [{
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
										addItem.hide();
									}
								}],
						listeners		: {
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
						stateId		: 'grid-screw-toolholder'
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
											'ext:qtitle'	: '<b>刀体简图<b></br>',
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
				addItem.show();

				clearUploadField('figureid');
				clearUploadField('figure2id');

				Ext.getCmp('toolholderid').setValue(record.get('toolholderid'));

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
				var strChecked = jsArray2JsString(records, 'toolholderid');
				Ext.Msg.confirm('请确认', '确认删除选中的记录吗', function(btn, text) {
							if (btn == 'yes') {
								showWaitMsg();
								Ext.Ajax.request({
											url		: 'threadtoolholder.do?code=deleteThreadtoolholder',
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
							url				: 'threadtoolholder.do?code=saveThreadtoolholder',
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
							url				: 'threadtoolholder.do?code=updateThreadtoolholder',
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
															url : 'threadtoolholder.do?code=importThreadtoolholderFromExcel',
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
														url : 'threadtoolholder.do?code=importThreadtoolholderFromExcel',
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
