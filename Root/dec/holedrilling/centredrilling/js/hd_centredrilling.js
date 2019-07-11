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
				header		: '编号', // 列标题
				dataIndex	: 'toolholderid', // 数据索引,和Store数据存储模型对应
				width		: 60, // 列宽度
				sortable	: true// 该列是否要排序
				//hidden		: true
					// 该列是否隐藏
				}, {
				header		: 'SAP编号',
				dataIndex	: 'sapcode',
				width		: 60,
				sortable	: true
				//hidden		: true
			}, {
				header		: '名称',
				dataIndex	: 'name',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '型号',
				dataIndex	: 'type',
				// hidden : true,
				width		: 150,
				sortable	: true
			}, {
				header		: '简图',
				dataIndex	: 'figure',
				width		: 80,
				//hidden		: true,
				sortable	: true
			}, {
				header		: '实物图',
				dataIndex	: 'figure2',
				width		: 80,
				//hidden		: true,
				sortable	: true
			}, {
				header		: '品牌',
				dataIndex	: 'brandid',
				width		: 80,
				//hidden		: true,
				sortable	: true
			}, {
				header		: '切削类型',
				dataIndex	: 'cuttype',
				width		: 80,
				sortable	: true
				//hidden		: true
			}, {

				header		: '中心钻标准',
				dataIndex	: 'standard',
				width		: 80,
				// hidden : true,
				sortable	: true
			}, {
				header		: '公称直径',
				dataIndex	: 'nominaldiameter',
				width		: 90,
				//hidden		: true,
				sortable	: true
			}, {
				header		: '材质',
				dataIndex	: 'materialid',
				width		: 70,
				align		: 'center',
				// hidden : true,
				sortable	: true
			}, {
				header		: '角度',
				dataIndex	: 'pointangle',
				width		: 80,
				//hidden		: true,
				sortable	: true
			},   {
				header		: '总长',
				dataIndex	: 'length',
				align		: 'center',
				width		: 80,
				// hidden : true,
				sortable	: true
				//renderer	: SHAPERender
			},{
				header		: '接口尺寸',
				dataIndex	: 'portsize',
				width		: 130,
				//hidden		: true,
				sortable	: true
			}, {
				header		: '特点',
				dataIndex	: 'description',
				width		: 90,
				align		: 'center',
				// hidden : true,
				sortable	: true
			}, {
				header		: '备注信息',
				dataIndex	: 'remark',
				width		: 70,
				align		: 'center',
			//	hidden		: true,
				sortable	: true
			}, {
				header		: '系数K1',
				dataIndex	: 'k1',
				width		: 90,
				align		: 'center',
				// hidden : true,
				sortable	: true
			}]);

			// Store数据存储
			var store = new Ext.data.GroupingStore({
						proxy	: new Ext.data.HttpProxy({
							url	: 'hd_centredrilling.do?code=queryHd_centredrilling4Manage'
								// queryBlade4Manage是在BladeAction中的方法queryBlade4Manage;
							}),
						reader	: new Ext.data.JsonReader({
									totalProperty	: 'TOTALCOUNT',
									root			: 'ROOT'
								}, [{
									name	: 'toolholderid'
								},
								{
									name	: 'sapcode'
								},
								{
									name	: 'name'
								},
								{
									name	: 'type'
								},
								{
									name	: 'figure'
								},
								{
									name	: 'figure2'
								},
								{
									name	: 'brandid'
								},
								{
									name	: 'cuttype'
								},
								{
									name	: 'standard'
								},
								{
									name	: 'nominaldiameter'
								},
								{
									name	: 'materialid'
								},
								{
									name	: 'pointangle'
								},
								
								{
									name	: 'length'
								},
								
								
								
								{
									name	: 'portsize'
								},
								
								{
									name	: 'description'
								},
								{
									name	: 'remark'
								},
								{
									name	: 'k1'
								},
])
					});
		
			// 页面过滤
			var filters = new Ext.ux.grid.GridFilters({// string,numeric,date,list,boolean
				encode : true,
				autoReload : false,
				local : true,
				filters : [{
					dataIndex:'toolholderid',
						type:'string'
					},
					{
						dataIndex:'sapcode',
						type:'string'
					},
					{
						dataIndex:'name',
						type:'string'
					},
					{
						dataIndex:'type',
						type:'string'
					},
					{
						dataIndex:'figure',
						type:'string'
					},
					{
						dataIndex:'figure2',
						type:'string'
					},
					{
						dataIndex:'brandid',
						type:'string'
					},
					{
						dataIndex:'cuttype',
						type:'string'
					},
					{
						dataIndex:'typeid',
						type:'string'
					},
					{
						dataIndex:'hdtooltype',
						type:'string'
					},
					{
						dataIndex:'description',
						type:'string'
					},
					{
						dataIndex:'remark',
						type:'string'
					},
					{
						dataIndex:'k1',
						type:'string'
					},
					{
						dataIndex:'hdtcid',
						type:'string'
					},
					{
						dataIndex:'standard',
						type:'string'
					},
					{
						dataIndex:'nominaldiameter',
						type:'string'
					},
					{
						dataIndex:'materialid',
						type:'string'
					},
					{
						dataIndex:'pointangle',
						type:'string'
					},
					
					
					{
						dataIndex:'length',
						type:'string'
					},
					
					
					
					{
						dataIndex:'portsize',
						type:'string'
					}
					
				/*
				 * { type : 'list', dataIndex : 'size', options : ['extra small',
				 * 'small', 'medium', 'large', 'extra large'] }
				 */]
			});

			// 翻页排序时带上查询条件
			store.on('beforeload', function() {
						this.baseParams = {
							keyword : Ext.getCmp('inputname').getValue()
						};
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
			pagesize_combo.on("select", function(comboBox) {
						bbar.pageSize = parseInt(comboBox.getValue());
						number = parseInt(comboBox.getValue());
						store.reload({
									params : {
										start : 0,
										limit : bbar.pageSize
									}
								});
					});

			// 分页工具栏
			var bbar = new Ext.PagingToolbar({
						pageSize : number,
						store : store,
						displayInfo : true,
						displayMsg : '显示第 {0} 条到第 {1} 条,共 {2} 条',
						plugins : [new Ext.ux.ProgressBarPager()],
						emptyMsg : "对不起,没有符合条件的记录!",
						items : ['-', '&nbsp;&nbsp;', pagesize_combo]
					});

			// 表格工具栏
			var tbar = new Ext.Toolbar({
						items : [{
									text : '新增',
									iconCls : 'page_addIcon',
									handler : function() {
										addInit();
									}
								}, {
									text : '修改',
									iconCls : 'page_edit_1Icon',
									id : 'modifyid',
									disabled : true,
									handler : function() {
										editInit();
									}
								}, {
									text : '删除',
									id : 'deleteid',
									disabled : true,
									iconCls : 'page_delIcon',
									handler : function() {
										deleteInit();
									}
								}, '-', {
									text : 'Excel导入',
									iconCls : 'page_excelIcon',
									id : 'excelImport',
									handler : function() {
										importExcelData();
									}
								},'->', /*
											 * { text : '性能卡', disabled : true, iconCls :
											 * 'page_edit_1Icon', id :
											 * 'readmtperformance', handler : function() {
											 * readPdf(); } }, '-',
											 */{
									xtype : 'textfield',
									id : 'inputname',
									name : 'inputname',
									selectOnFocus : true,
									cls : 'search',
									emptyText : '名称|型号',
									width : 150,
									enableKeyEvents : true,
									listeners : {
										specialkey : function(field, e) {
											if (e.getKey() == Ext.EventObject.ENTER) {
												queryInfo();
											}
										}
									}
								}, {
									text : '查询',
									iconCls : 'page_findIcon',
									handler : function() {
										queryInfo();
									}
								}, '-', {
									text : '刷新',
									iconCls : 'arrow_refreshIcon',
									handler : function() {
										store.reload();
									}
								}, {
									text : '高级',
									hidden : true,
									iconCls : 'page_findIcon',
									handler : function() {
										advancedQuery();
									}
								}, {
									text : '重置',
									iconCls : 'tbar_synchronizeIcon',
									handler : function() {
										resetToolbar();
									}
								}]
					});

			// 品牌
			var brandStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : 'hd_centredrilling.do?code=queryBrand4Hd_centredrilling'
				}),
				reader : new Ext.data.JsonReader({
							totalProperty : 'TOTALCOUNT',
							root : 'ROOT'
						}, [{
									name : 'value'
								}, {
									name : 'text'
								}]),
				listeners : {
					// 设置远程数据源下拉选择框的初始值
					'load' : function(obj) {
						// classStore.setValue('530101');
					}
				}
			});
			brandStore.load(); // 如果mode : 'local',时候才需要手动load();

			// 品牌下拉框
			var brandCombo = new Ext.form.ComboBox({
						fieldLabel : '中心钻品牌',
						hiddenName : 'brandid',
						id : 'brandidid',
						emptyText : '请输入中心钻品牌...',
						triggerAction : 'all',
						store : brandStore,
						displayField : 'text',
						valueField : 'value',
						loadingText : '正在加载数据...',
						mode : 'local', // 数据会自动读取,如果设置为local又调用了store.load()则会读取2次；也可以将其设置为local，然后通过store.load()方法来读取
						forceSelection : true,
						// typeAhead : true,
						// pageSize : cln,
						// minListWidth : 270,
						plugins : [new QM.plugin.PinyinFilter],
						resizable : true,
						// editable : false,
						anchor : '94.6%',
						// width : '85%'
						listeners : {
							focus : function() {
								// brandStore.load();
								setTimeout('Ext.getCmp("brandidid").expand();', 1);
							}
						}
					});

			// 切削液
			/*
			 * var categoryStore = new Ext.data.Store({ proxy : new Ext.data.HttpProxy({
			 * url : 'machinetool.do?code=queryCategory4Machinetool' }), reader : new
			 * Ext.data.JsonReader({ totalProperty : 'TOTALCOUNT', root : 'ROOT' }, [{
			 * name : 'value' }, { name : 'text' }]), listeners : { load :
			 * function(store) { store.insert(0, new Ext.data.Record({ value : 'null',
			 * text : '暂不选择(置空)...' })); } }
			 * 
			 * }); categoryStore.load();
			 */
			// 切削液下拉框
			/*
			 * var categoryCombo = new Ext.form.ComboBox({ fieldLabel : '切削液',
			 * hiddenName : 'categoryid', id : 'categoryidid', emptyText : '请选择切削液...',
			 * cls : 'combobox-window-class', triggerAction : 'all', store :
			 * categoryStore, displayField : 'text', valueField : 'value', loadingText :
			 * '正在加载数据...', mode : 'local', forceSelection : true, // pageSize : cln, //
			 * minListWidth : 270, plugins : [new QM.plugin.PinyinFilter], resizable :
			 * true, anchor : '90%', listeners : { focus : function() { //
			 * categoryStore.load(); setTimeout('Ext.getCmp("categoryidid").expand();',
			 * 1); } } });
			 */
			/*
			 * //性能卡 var mtperformanceStore = new Ext.data.Store({ proxy : new
			 * Ext.data.HttpProxy({ url :
			 * 'machinetool.do?code=queryMtperformance4Machinetool' } ), reader : new
			 * Ext.data.JsonReader({ totalProperty : 'TOTALCOUNT', root : 'ROOT' }, [{
			 * name : 'value' }, { name : 'text' }]), listeners : { 'load' :
			 * function(obj) { } } } ); mtperformanceStore.load();
			 * 
			 * //性能卡下拉框 var mtperformanceCombo = new Ext.form.ComboBox({ fieldLabel :
			 * '性能卡', hiddenName : 'mtperformance', emptyText : '请选择性能卡...',
			 * triggerAction : 'all', store : mtperformanceStore, displayField : 'text',
			 * valueField : 'value', loadingText : '正在加载数据...', mode : 'local',
			 * forceSelection : true, //pageSize : cln, //minListWidth : 270, //plugins :
			 * [new QM.plugin.PinyinFilter], resizable : true, anchor : '90%' });
			 */

			var figureRadio = new Ext.form.RadioGroup({
						fieldLabel : "压缩参数",
						name : "compressflag",
						labelStyle : fucolor,
						items : [new Ext.form.Radio({
											name : "compressflag",
											inputValue : "0",
											boxLabel : "直接上传",
											checked : true
										}), new Ext.form.Radio({
											name : "compressflag",
											inputValue : "8",
											boxLabel : "800*500"
										}), new Ext.form.Radio({
											name : "compressflag",
											inputValue : "4",
											boxLabel : "400*246"
										}), new Ext.form.Radio({
											name : "compressflag",
											inputValue : "2",
											boxLabel : "200*120"
										}), new Ext.form.Radio({
											name : "compressflag",
											inputValue : "1",
											boxLabel : "100*60"
										}), new Ext.form.Radio({
											name : "compressflag",
											inputValue : "5",
											boxLabel : "50*30"
										})]
					});

			var figure2Radio = new Ext.form.RadioGroup({
						fieldLabel : "压缩参数",
						name : "compressflag2",
						labelStyle : fucolor,
						items : [new Ext.form.Radio({
											name : "compressflag2",
											inputValue : "0",
											boxLabel : "直接上传",
											checked : true
										}), new Ext.form.Radio({
											name : "compressflag2",
											inputValue : "8",
											boxLabel : "800*500"
										}), new Ext.form.Radio({
											name : "compressflag2",
											inputValue : "4",
											boxLabel : "400*246"
										}), new Ext.form.Radio({
											name : "compressflag2",
											inputValue : "2",
											boxLabel : "200*120"
										}), new Ext.form.Radio({
											name : "compressflag2",
											inputValue : "1",
											boxLabel : "100*60"
										}), new Ext.form.Radio({
											name : "compressflag2",
											inputValue : "5",
											boxLabel : "50*30"
										})]
					});

			// 新增窗口表单
			var addItemForm = new Ext.form.FormPanel({
						width : '100%',
						header : false,
						autoHeight : true,
						frame : true,
						layout : 'form',
						labelWidth : 90,
						labelAlign : 'right',
						fileUpload : true,
						defaults : {
							anchor : '100%'
						},
						bodyStyle : 'padding:5 5 5 5',
						items : [{
							layout : 'column',
							items : [{
								columnWidth : .33,
								layout : 'form',
								defaultType : 'textfield',
								defaults : {
									width : '85%',
									anchor : '89%',
									allowBlank : true,
									maxLength : mlm,
									labelStyle : fucolor
								},
								items : [{
											
											labelStyle : micolor,
											allowBlank : false,
											fieldLabel : '型号',
											name : 'type',
											
						
											emptyText : '请输入型号(自动大写)...',
											listeners : {
												blur : function(e) {
													if (!isUndefined(e.getValue())) {
														e.setValue(e.getValue()
																.toUpperCase());
													}
												}
											}
										}, {
											fieldLabel : 'SAP编号',
											name : 'sapcode',
											// labelStyle : micolor,
											// allowBlank : false,
											emptyText : '请输入SAP编号...'},
											{
											fieldLabel : '名称',
											name : 'name',
											// labelStyle : micolor,
											// allowBlank : false,
											emptyText : '请输入名称...'},
											brandCombo,
											{
												fieldLabel : '切削类型',
												name : 'cuttype',
												// labelStyle : micolor,
												// allowBlank : false,
												emptyText : '请输入切削类型...'},
												{
													fieldLabel : '钻孔深度',
													name : 'depth',
													// labelStyle : micolor,
													// allowBlank : false,
													emptyText : '请输入钻孔深度...'},
												{
												fieldLabel : '标准',
												name : 'standard',
												// labelStyle : micolor,
												// allowBlank : false,
												emptyText : '请输入标准...'}]
							}, {
								columnWidth : .33,
								layout : 'form',
								defaultType : 'textfield',
								defaults : {
									width : '85%',
									anchor : '89%',
									maxLength : mlm,
									labelStyle : fucolor,
									allowBlank : true
								},
								items : [
{
	fieldLabel : '公称直径',
	name : 'nominaldiameter',
	// labelStyle : micolor,
	// allowBlank : false,
	emptyText : '请输入公称直径...'},
	{
	fieldLabel : '材质',
	name : 'materialid',
	// labelStyle : micolor,
	// allowBlank : false,
	emptyText : '请输入材质...'},
	{
	fieldLabel : '角度',
	name : 'pointangle',
	// labelStyle : micolor,
	// allowBlank : false,
	emptyText : '请输入角度...'},
	
	
	{
	fieldLabel : '总长',
	name : 'length',
	// labelStyle : micolor,
	// allowBlank : false,
	emptyText : '请输入总长...'}]
							}, {

								columnWidth : .33,
								layout : 'form',
								defaultType : 'textfield',
								defaults : {
									width : '85%',
									anchor : '89%',
									maxLength : mlm,
									labelStyle : fucolor,
									allowBlank : true
								},
								items : [
									
									
									{
									fieldLabel : '接口尺寸',
									name : 'portsize',
									// labelStyle : micolor,
									// allowBlank : false,
									emptyText : '请输入接口尺寸...'},
									
									{
									fieldLabel : '特点',
									name : 'description',
									// labelStyle : micolor,
									// allowBlank : false,
									emptyText : '请输入特点...'},
									{
									fieldLabel : '系数K1',
									name : 'k1',
									// labelStyle : micolor,
									// allowBlank : false,
									emptyText : '请输入系数K1...'}]

							}]
						}, {
							fieldLabel : '结构简图',
							name : 'figure',
							id : 'figureid',
							xtype : 'fileuploadfield',
							//inputType : 'file',
							maxLength : mlh,
							labelStyle : fucolor,
							anchor : '94.6%',
							allowBlank : true
						}, figureRadio, {
							fieldLabel : '实物图',
							name : 'figure2',
							id : 'figure2id',
							xtype : 'fileuploadfield',
						    //inputType : 'file',
							// applyTo : 'fileuploadfield',
							maxLength : mlh,
							labelStyle : fucolor,
							anchor : '94.6%',
							allowBlank : true
						}, figure2Radio, {
							fieldLabel : '备注',
							// labelStyle : fucolor,
							allowBlank : true,
							maxLength : mlh,
							anchor : '94.6%',
							xtype : 'textfield',
							name : 'remark',
							emptyText : '请输入备注...'
						}, {
							xtype : 'fieldset',
							collapsible : true,
							collapsed : true,
							title : '附件信息',
							layout : 'fit',
							id : 'fieldset1',
							animCollapse : true,
							height : 50,
							defaults : {
								anchor : '100%'
							},
							listeners : {
								'collapse' : function(obj) {
									addItem.setHeight(addItem.getHeight() - 160);
									addItem.setPagePosition(document.body.clientWidth
													/ 2 - 800 / 2,
											document.body.clientHeight / 2
													- addItem.getHeight() / 2);
									addItem.doLayout(false, true);
									// Ext.getCmp('fieldset1').expand();
								},
								'expand' : function(obj) {
									addItem.setHeight(addItem.getHeight() + 160);
									addItem.setPagePosition(document.body.clientWidth
													/ 2 - 800 / 2,
											document.body.clientHeight / 2
													- addItem.getHeight() / 2);
									addItem.doLayout(false, true);
									// Ext.getCmp('fieldset1').collapse();
								}
							},
							height : '100%',
							items : [{
										layout : 'column',
										items : [{
													columnWidth : .33,
													layout : 'form',
													defaultType : 'textfield',
													defaults : {
														width : '85%',
														anchor : '89%',
														maxLength : mlm,
														allowBlank : true,
														labelStyle : fucolor
													},
													items : [{
																fieldLabel : '附件1信息',
																name : 'aname1',
																emptyText : '请输入附件1信息...'
															}]
												}, {
													columnWidth : .33,
													layout : 'form',
													defaultType : 'textfield',
													defaults : {
														width : '85%',
														anchor : '89%',
														maxLength : mlm,
														labelStyle : fucolor,
														allowBlank : true
													}

												}]
									}]
						}, {
							id : 'toolholderid',
							name : 'toolholderid',
							xtype : 'textfield',
							hidden : true
						}, {
							id : 'windowmode',
							name : 'windowmode',
							xtype : 'textfield',
							hidden : true
						}]
					});

			var addItem = new Ext.Window({
				title : '<span class="commoncss">新增</span>',
				layout : 'fit',
				width : 800,
				height : Ext.isChrome ? 600 : (Ext.isFirefox ? 797 : 797),
				// height : Ext.isChrome ? 380 : (Ext.isFirefox ? 380 : 400),
				modal : false,
				closable : true, // 是否可关闭
				closeAction : 'hide',
				animCollapse : true,
				collapsible : false, // 是否可收缩
				maximizable : false, // 设置是否可以最大化
				border : false, // 边框线设置
				constrain : false, // 设置窗口是否可以溢出父容器
				// pageY : document.body.clientHeight / 2 - 270 / 2,//pageY : 20, //
				// 页面定位Y坐标
				// x : document.body.clientWidth / 2 - 1000 / 2, // 页面定位X坐标
				items : [addItemForm],
				buttons : [{
							text : '保存',
							id : 'savebtn',
							iconCls : 'acceptIcon',
							handler : function() {
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
							text : '取消',
							id : 'cancelbtn',
							iconCls : 'cancelIcon',
							handler : function() {
								// addItemForm.form.reset();
								addItem.hide();
							}
						}],
				listeners : {
					hide : function() {
						if (imageshowWin != null) {
							imageshowWin.close();
						}
					},
					beforeshow : function() {
						Ext.getBody().mask();
					},
					beforehide : function() {
						Ext.getBody().unmask();
					}
				}
			});

			// 表格
			var grid = new Ext.grid.GridPanel({
						title		: '<span class="commoncss">中心钻</span>',
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
						stateId		: 'grid-hd_centredrilling'

					});

		

			// 表格单击事件
			grid.on('rowclick', function(pGrid, rowIndex, event) {
				Ext.getCmp('modifyid').enable();
				Ext.getCmp('deleteid').enable();
					// Ext.getCmp('readmtperformance').enable();
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
									'ext:qtip' : '<div style="font-size: 16;">'
											+ "<a href='javascript:void(0);'><img src='"
											+ webContext + da + "'/></a>" + '</div>',
									'ext:qwidth' : 200,
									'ext:qtitle' : '<b>刀体简图<b></br>',
									'ext:qclass' : ''
								}, false);
					}
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
									text : '新增',
									iconCls : 'page_addIcon',
									handler : function() {
										addInit();
									}
								}, {
									text : '修改',
									iconCls : 'page_edit_1Icon',
									handler : function() {
										editInit();
									}
								}, {
									text : '删除',
									iconCls : 'page_delIcon',
									handler : function() {
										deleteInit();
									}
								}, '-', {
									text : '查询',
									iconCls : 'page_findIcon',
									handler : function() {
										advancedQuery();
									}
								}, '-', {
									text : '刷新',
									iconCls : 'arrow_refreshIcon',
									handler : function() {
										store.reload();
									}
								}, {
									text : '重置',
									iconCls : 'tbar_synchronizeIcon',
									handler : function() {
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

			grid.on("contextmenu", function(e) {// cellcontextmenu //rowcontextmenu
						e.preventDefault();
					});

			// 是否默认选中第一行数据
			bbar.on("change", function() {
						// grid.getSelectionModel().selectFirstRow();
					});

			// 页面初始自动查询数据
			store.load({
						params : {
							start : 0,
							limit : bbar.pageSize
						}
					});

			// 布局模型
			var viewport = new Ext.Viewport({
						layout : 'border',
						items : [grid]
					});

			// 查询表格数据
			function queryInfo() {
				store.load({
							params : {
								start : 0,
								limit : bbar.pageSize,
								keyword : Ext.getCmp('inputname').getValue()
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
					grid.getSelectionModel().selectRow(grid.getSelectionModel().last,
							false);
				}

				addItemForm.getForm().loadRecord(record);
				addItem.setTitle('<span class="commoncss">修改</span>');

				Ext.getCmp('savebtn').setText('更新');
				Ext.getCmp('windowmode').setValue('edit');
				addItem.show();

				clearUploadField('figureid');
				clearUploadField('figure2id');

				Ext.getCmp('toolholderid').setValue(record.get('toolholderid'));

				// imageshowWin = imageshow2(record.data.figure, "", addItem, 0);
				imageshowWin = imageshow2(record.data.figure, record.data.figure2,
						addItem, 0);
				if (imageshowWin != null) {
					imageshowWin.show();
				} else {
					infoMsg('该条目还没有添加图片!');
				}
			}

			// 查看性能卡
			/*
			 * function readPdf() { var record = grid.getSelectionModel().getSelected();
			 * var records = grid.getSelectionModel().getSelections(); if
			 * (records.length == 0) { infoMsg('您没有选中任何条目，请先选中要修改的项目！'); return; } else
			 * if (records.length > 1) { infoMsg('您选择了 ' + records.length + '
			 * 个条目，系统将只显示最先选择项目的相关信息！');
			 * grid.getSelectionModel().selectRow(grid.getSelectionModel().last, false); }
			 * 
			 * var path1 = record.data.mtperformance; var path2 = record.data.figure;
			 * 
			 * if (path1 == null || path1 == '') { path1 =
			 * '\\resource\\image\\ext\\null.gif'; }
			 * 
			 * if (path2 == null || path2 == '') { path2 =
			 * '\\resource\\image\\ext\\null.gif'; } var readWin = new Ext.Window({
			 * title : '机夹刀具刀体性能卡及简图', width : 800, modal : true, height : 500,
			 * closeAction : 'close', maximizable : true, layout : 'fit', items : [new
			 * Ext.TabPanel({ region : 'center', activeTab : 0, width : '100%', header :
			 * false, frame : true, items : [{ xtype : 'box', title : '性能卡', autoEl : {
			 * tag : 'iframe', style : 'height: 100%; width: 100%', src : webContext +
			 * path1 } }, { xtype : 'box', title : '机夹刀具刀体简图', autoEl : { tag :
			 * 'iframe', style : 'height: 100%; width: 100%', src : webContext + path2 } }]
			 * })]
			 * 
			 * });
			 * 
			 * readWin.show(); }
			 */
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
							url : 'hd_centredrilling.do?code=deleteHd_centredrilling',
							success : function(response) {
								var resultArray = Ext.util.JSON
										.decode(response.responseText);
								store.reload();
								infoMsg(resultArray.msg);
							},
							params : {
								strChecked : strChecked
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
				checkUploadImage();

				addItemForm.form.submit({
							url : 'hd_centredrilling.do?code=saveHd_centredrilling',
							waitTitle : '提示',
							method : 'POST',
							submitEmptyText : false,
							waitMsg : '正在处理数据,请稍候...',
							success : function(form, action) {
								store.reload();
								infoMsg(action.result.msg);
								addItem.hide();
							},
							failure : function(form, action) {
								warningMsg('数据保存失败,错误类型: ' + action.failureType);
							},
							params : {
								compressflag : figureRadio.getValue().inputValue,
								compressflag2 : figure2Radio.getValue().inputValue
							}
						});
			}

			// 更新
			function updateForm() {
				if (!addItemForm.getForm().isValid()) {
					warningMsg('必填项未填写，或填写格式不正确，请检查窗口红色标示的区域!');
					return;
				}
				checkUploadImage();

				addItemForm.form.submit({
							url : 'hd_centredrilling.do?code=updateHd_centredrilling',
							waitTitle : '提示',
							method : 'POST',
							submitEmptyText : false,
							waitMsg : '正在处理数据,请稍候...',
							success : function(form, action) {
								store.reload();
								infoMsg(action.result.msg);
								addItem.hide();
							},
							failure : function(form, action) {
								warningMsg('数据保存失败,错误类型: ' + action.failureType);
							},
							params : {
								compressflag : figureRadio.getValue().inputValue,
								compressflag2 : figure2Radio.getValue().inputValue
							}
						});
			}

			// 重置
			function resetToolbar() {
				Ext.getCmp('inputname').setValue('');
				store.load({
							params : {
								start : 0,
								limit : bbar.pageSize
							}
						});
			}

				// function keyboardMapping() {
				/*
				 * var newmap = ['n', 'e', 'w']; var kI = 0; var tabid =
				 * parent.mainTabs.getItem('tab_id_010201');
				 * Ext.EventManager.addListener(tabid.getEl(), 'keypress', function() {
				 * var keys = KeyboardJS.activeKeys();
				 * 
				 * if (keys.length) { for (var i = 0; i < keys.length; i += 1) { if
				 * (keys[i] === newmap[kI]) { if (kI < newmap.length - 1) { kI = kI + 1; }
				 * else { infoMsg('通过快捷键 baidu 打开新建菜单'); } } else { kI = 0; } } } });
				 */
				// }
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
															url : 'hd_centredrilling.do?code=importHd_centredrillingFromExcel',
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
														url : 'hd_centredrilling.do?code=importHd_centredrillingFromExcel',
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
