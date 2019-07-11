/**
 * 齿轮管理 //请在此输入模块名称
 * 
 * @author fuxianwu
 * @since 2013-01-01
 */
Ext.onReady(function() {
	Ext.QuickTips.init();

	// 复选框
	var sm = new Ext.grid.CheckboxSelectionModel();

	// 行号
	var rownum = new Ext.grid.RowNumberer({
				header	: '序',
				width	: 26
			});

	// 列模型
	var cm = new Ext.grid.ColumnModel([rownum, sm, {
		header		: '齿轮ID', // 列标题
		dataIndex	: 'gearid', // 数据索引,和Store数据存储模型对应
		width		: 60, // 列宽度
		sortable	: true, // 该列是否要排序
		hidden		: true
			// 该列是否隐藏
		}, {
		header		: '名称',
		dataIndex	: 'name',
		width		: 80,
		sortable	: true
			// hidden : true
		}, {
		header		: '备注',
		dataIndex	: 'remark',
		width		: 100,
		sortable	: true
			// hidden : true
		}]);

	// Store数据存储
	var store = new Ext.data.GroupingStore({
				proxy	: new Ext.data.HttpProxy({
							url	: 'gear.do?code=queryGear4Manage'// gear.do在struct-config-dec.xml中配置,queryGear4Manage是指在相应Action中的方法名称
						}),
				reader	: new Ext.data.JsonReader({
							totalProperty	: 'TOTALCOUNT',
							root			: 'ROOT'
						}, [{
									name	: 'gearid'// 与数据库查询字段名称对应
								}, {
									name	: 'name'
								}, {
									name	: 'remark'
								}])
			});

	// 页面过滤
	var filters = new Ext.ux.grid.GridFilters({//
		encode		: true,
		autoReload	: false,
		local		: true,
		filters		: [{
					dataIndex	: 'gearid',
					type		: 'string'// 请注意type值要与数据库中该字段类型对应,可取值string,numeric,date,list,boolean;
				}, {
					dataIndex	: 'name',
					type		: 'string'
				}, {
					dataIndex	: 'remark',
					type		: 'string'
				}]
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
				plugins		: [new Ext.ux.ProgressBarPager()],
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
							selectOnFocus	: true,
							cls				: 'search',
							emptyText		: '齿轮名称|备注',// 请修改该处为要查询的字段名称,如果多个,用"|"隔开
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
							text	: '重置',
							iconCls	: 'tbar_synchronizeIcon',
							handler	: function() {
								resetToolbar();
							}
						}]
			});

	// 表格
	var grid = new Ext.grid.GridPanel({
				title		: '<span class="commoncss">齿轮</span>',// 请修改名称
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
				bodyStyle	: 'width:100%',
				viewConfig	: {
					forceFit	: true
					// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
				},
				loadMask	: {
					msg	: '正在加载表格数据,请稍等...'
				},
				view		: new Ext.grid.GroupingView(),
				plugins		: [filters],
				stateful	: sf,
				stateId		: 'grid-gear'// 请一定修改此ID名称为对应名称
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

	// 新增窗口
	var addItemForm = new Ext.form.FormPanel({
				width		: '100%',
				header		: false,
				autoHeight	: true,
				frame		: true,
				layout		: 'form',
				labelWidth	: 80,
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
											allowBlank	: true,
											maxLength	: mlm,
											labelStyle	: fucolor
										},
										items		: [{
													fieldLabel	: '名称',// 请修改对应名称
													name		: 'name',// 请修改对应数据库字段
													labelStyle	: micolor,
													allowBlank	: false,
													emptyText	: '请输入齿轮名称...'
												}/*
													 * , { fieldLabel : '机床名称', name : 'name', //xtype : 'numberfield', emptyText : '请输入机床名称...' }
													 */]
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
													fieldLabel	: '备注',
													name		: 'remark',
													emptyText	: '请输入使用备注...'
												}/*
													 * , { fieldLabel : '主轴最高转速', name : 'maxspeed', xtype : 'numberfield', maxLength : mll, emptyText : '请输入主轴最高转速(单位转/分(R/min))...' }
													 */]
									}]
						}, {
							id		: 'gearid',// 修改为数据库表第一个ID(特别注意,一定要修改,否则新增后无法修改;);
							name	: 'gearid',
							xtype	: 'textfield',
							hidden	: true
						}, {// 此字段不可删除,删除后将无法区分新增与修改窗口;
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
				height			: 360,
				modal			: true,
				closable		: true, // 是否可关闭
				closeAction		: 'hide',
				animCollapse	: true,
				collapsible		: false, // 是否可收缩
				maximizable		: false, // 设置是否可以最大化
				border			: false, // 边框线设置
				constrain		: false, // 设置窗口是否可以溢出父容器
				// pageY : document.body.clientHeight / 2 - 270 / 2,//pageY : 20, // 页面定位Y坐标
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
								if (mode == 'add') {
									submitForm();
								} else {
									updateForm();
								}
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

	// 查询数据
	function queryInfo() {
		store.load({
					params	: {
						start	: 0,
						limit	: bbar.pageSize,
						keyword	: Ext.getCmp('inputname').getValue()
					}
				});
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
		addItem.show();

		Ext.getCmp('gearid').setValue(record.get('gearid'));// 请修改ID值;
	}

	// 删除
	function deleteInit() {
		var records = grid.getSelectionModel().getSelections();
		if (Ext.isEmpty(records)) {
			infoMsg('您没有选中任何条目，请先选中要删除的项目！');
			return;
		}
		var strChecked = jsArray2JsString(records, 'gearid');// 请修改ID
		Ext.Msg.confirm('请确认', '确认删除选中的记录吗', function(btn, text) {
					if (btn == 'yes') {
						showWaitMsg();
						Ext.Ajax.request({
									url		: 'gear.do?code=deleteGear',// 修改对应方法;
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
					url				: 'gear.do?code=saveGear',// 请修改
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
					url				: 'gear.do?code=updateGear',
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
		store.load({
					params	: {
						start	: 0,
						limit	: bbar.pageSize
					}
				});
	}

		/*
		 * //切削液 var categoryStore = new Ext.data.Store({ proxy : new Ext.data.HttpProxy({ url : 'machinetool.do?code=queryCategory4Machinetool' }), reader : new Ext.data.JsonReader({ totalProperty :
		 * 'TOTALCOUNT', root : 'ROOT' }, [{ name : 'value' }, { name : 'text' }]), listeners : { load : function(store) { store.insert(0, new Ext.data.Record({ value : 'null', text : '暂不选择(置空)...'
		 * })); } }
		 * 
		 * }); categoryStore.load();
		 * 
		 * //切削液下拉框 var categoryCombo = new Ext.form.ComboBox({ fieldLabel : '切削液', hiddenName : 'categoryid', id : 'categoryidid', emptyText : '请选择切削液...', cls : 'combobox-window-class',
		 * triggerAction : 'all', store : categoryStore, displayField : 'text', valueField : 'value', loadingText : '正在加载数据...', mode : 'local', forceSelection : true, //pageSize : cln, //minListWidth :
		 * 270, plugins : [new QM.plugin.PinyinFilter], resizable : true, anchor : '90%', listeners : { focus : function() { //categoryStore.load(); setTimeout('Ext.getCmp("categoryidid").expand();',
		 * 1); } } });
		 */
	});
