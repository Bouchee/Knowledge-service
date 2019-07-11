/**
 * 工件材料管理
 * 
 * @author fuxianwu
 * @since 2013-01-01
 */

Ext.onReady(function() {

			var addAccesoryForm = new Ext.form.FormPanel({
						// title : '灵活布局的表单',
						width		: '100%',
						header		: false,
						autoHeight	: true,
						frame		: true,
						// renderTo : 'a',
						layout		: 'form', // 整个大的表单是form布局
						labelWidth	: 100,
						labelAlign	: 'right',
						bodyStyle	: 'padding:5 5 5 5', // 表单元素和表单面板的边距
						items		: [{
									layout	: 'column',
									items	: [{
												columnWidth	: .5,
												layout		: 'form',
												defaultType	: 'textfield',
												defaults	: {
													width	: '85%'
												},
												items		: [{
															fieldLabel	: '刀体附件1',
															name		: 'accesory1'
														}/*
															 * , { fieldLabel : '主要化学成分', name : 'component' }, { fieldLabel : '毛坯类型', name : 'blanktype' }, { fieldLabel : '材料分类', name : 'category' }, {
															 * fieldLabel : '是否考试', xtype : 'combo', hiddenName : 'istest', store : ISTESTStore, mode : 'local', triggerAction : 'all', valueField :
															 * 'value', displayField : 'text', emptyText : '请选择...', allowBlank : false, //forceSelection : true, // 选中内容必须为下拉列表的子项 editable : false, //
															 * 选择输入框可编辑 typeAhead : true, // 输入的时候自动匹配待选项目 anchor : '89%' }, { fieldLabel : '主办部门/单位' },
															 */]
											}, {
												columnWidth	: .5,
												layout		: 'form',
												defaultType	: 'textfield',
												defaults	: {
													width	: '85%'
												},
												items		: [{
															fieldLabel	: '刀体附件2',
															name		: 'accesory2'
														}/*
															 * , { fieldLabel : '班主任', //xtype : 'combo', name : 'teacherid' }, { fieldLabel : 'ISO分类标准', xtype : 'combo', hiddenName : 'isotype', store :
															 * ISOTYPEStore, mode : 'local', triggerAction : 'all', valueField : 'value', displayField : 'text', emptyText : '请选择...', allowBlank :
															 * false, //forceSelection : true, // 选中内容必须为下拉列表的子项 editable : false, // 选择输入框可编辑 typeAhead : true, // 输入的时候自动匹配待选项目 anchor : '89%' }, {
															 * fieldLabel : '热处理状态', name : 'heattreat' }, { fieldLabel : '进厂状态', name : 'incomingstate' }, { fieldLabel : '印记', name : 'mark' }
															 */]
											}]
								}, {
									xtype	: 'textfield',
									hidden	: true,
									id		: 'accesoryid',
									name	: 'accesoryid'
								}, {
									xtype	: 'textfield',
									hidden	: true,
									id		: 'windowmode',
									name	: 'windowmode'
								}]
					});

			var addAccesory = new Ext.Window({
						title		: '<span accesory="commoncss">新增刀体附件</span>', // 窗口标题
						layout		: 'fit', // 设置窗口布局模式
						width		: 800, // 窗口宽度
						height		: 120, // 窗口高度
						closable	: true, // 是否可关闭
						collapsible	: true, // 是否可收缩
						maximizable	: true, // 设置是否可以最大化
						border		: false, // 边框线设置
						constrain	: false, // 设置窗口是否可以溢出父容器
						// pageY : 20, // 页面定位Y坐标
						// pageX : document.body.clientWidth / 2 - 380 / 2, // 页面定位X坐标
						items		: [addAccesoryForm], // 嵌入的表单面板
						buttons		: [{
									text	: '保存',
									id		: 'savebtn',
									iconCls	: 'acceptIcon', // 按钮图标
									handler	: function() {
										var mode = Ext.getCmp('windowmode').getValue();
										if (mode == 'add')
											submitForm();
										else
											updateForm();
										// submitForm();
										// addEmulsion.hide();
									}
								}, {
									text	: '取消',
									id		: 'cancelbtn',
									iconCls	: 'cancelIcon', // 按钮图标
									handler	: function() {
										// addEmulsionForm.form.reset();
										addAccesory.hide();
									}
								}, { // 窗口底部按钮配置
									text	: '重置', // 按钮文本
									id		: 'resetbtn',
									iconCls	: 'tbar_synchronizeIcon', // 按钮图标
									handler	: function() { // 按钮响应函数
										addAccesoryForm.form.reset();
									}
								}]
					});

			// 提交教师信息
			function submitForm() {
				if (!addAccesoryForm.getForm().isValid()) {
					Ext.Msg.alert('提示', '请填写完必填信息后再保存!');
					return;
				}
				addAccesoryForm.form.submit({
							url				: 'accesory.do?code=saveAccesory',
							waitTitle		: '提示',
							method			: 'POST',
							submitEmptyText	: false,
							waitMsg			: '正在处理数据,请稍候...',
							success			: function(form, action) { // 回调函数有2个参数
								store.reload();
								Ext.MessageBox.alert('提示', action.result.msg);
								// Ext.getCmp('studentid').setValue(action.result.studentid);
								addAccesory.hide();
							},
							failure			: function(form, action) {
								Ext.MessageBox.alert('提示', '数据保存失败,错误类型: ' + action.failureType);
							}
						});
			};

			function updateForm() {
				if (!addAccesoryForm.getForm().isValid()) {
					Ext.Msg.alert('提示', '请填写完必填信息后再保存!');
					return;
				}
				addAccesoryForm.form.submit({
							url				: 'accesory.do?code=updateAccesory',
							waitTitle		: '提示',
							method			: 'POST',
							submitEmptyText	: false,
							waitMsg			: '正在处理数据,请稍候...',
							success			: function(form, action) { // 回调函数有2个参数
								store.reload();
								Ext.MessageBox.alert('提示', action.result.msg);
								addAccesory.hide();
								// Ext.getCmp('emulsionid').setValue(action.result.emulsionid);
								// addEmulsion.hide();
							},
							failure			: function(form, action) {
								Ext.MessageBox.alert('提示', '数据保存失败,错误类型: ' + action.failureType);
							}
						});
			};

			// 复选框
			var sm = new Ext.grid.CheckboxSelectionModel();

			// 定义自动当前页行号
			var rownum = new Ext.grid.RowNumberer({
						header	: '序号',
						width	: 35
					});

			// 定义列模型
			var cm = new Ext.grid.ColumnModel([rownum, sm, {
				header		: '附件ID', // 列标题
				dataIndex	: 'accesoryid', // 数据索引:和Store模型对应
				width		: 60,
				sortable	: true,
				hidden		: true
					// 是否可排序
				}, {
				header		: '刀体附件1',
				dataIndex	: 'accesory1',
				// hidden : true,
				sortable	: true
			}, {
				header		: '刀体附件2',
				dataIndex	: 'accesory2',
				sortable	: true
			}/*
				 * , { header : '结束时间', dataIndex : 'endtime', sortable : true }, { header : '任务ID', dataIndex : 'taskid', sortable : true }, { header : '总人数', dataIndex : 'numstu', sortable : true }, {
				 * header : '总费用', dataIndex : 'totalmoney', sortable : true }, { header : '班主任', dataIndex : 'teacherid', sortable : true }, { header : '满意率', dataIndex : 'statisfyrate', hidden :
				 * true, sortable : true }, { header : '合格率', dataIndex : 'passpercent', hidden : true, sortable : true }, { header : '状态', dataIndex : 'activeflag', hidden : true, sortable : true }, {
				 * header : '备注信息', dataIndex : 'remark', sortable : true }
				 */]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
						// 获取数据的方式
						proxy	: new Ext.data.HttpProxy({
									url	: 'accesory.do?code=queryAccesory4Manage'
								}),
						// 数据读取器
						reader	: new Ext.data.JsonReader({
									totalProperty	: 'TOTALCOUNT', // 记录总数
									root			: 'ROOT' // Json中的列表数据根节点
								}, [{
											name	: 'accesoryid' // Json中的属性Key值
										}, {
											name	: 'accesory1'
										}, {
											name	: 'accesory2'
										}/*
											 * , { name : 'component' }, { name : 'heattreat' }, { name : 'blanktype' }, { name : 'incomingstate' }, { name : 'category' }, { name : 'mark' }, { name :
											 * 'remark' }
											 */])
					});

			/**
			 * 翻页排序时候的参数传递
			 */
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
			// 改变每页显示条数reload数据
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
						plugins		: new Ext.ux.ProgressBarPager(), // 分页进度条
						emptyMsg	: "对不起,没有符合条件的记录!",
						items		: ['-', '&nbsp;&nbsp;', pagesize_combo/*
																			 * , '-', { text : '合计', iconCls : 'addIcon', handler : function() { summary.toggleSummary(); } }
																			 */]
					});

			// 表格工具栏
			var tbar = new Ext.Toolbar({
						items	: [{
									text	: '新增刀体附件',
									iconCls	: 'page_addIcon',
									handler	: function() {
										// firstWindow.show(); // 显示窗口
										addInit();
									}
								}, '-', {
									text		: '详细信息',
									iconCls		: 'page_edit_1Icon',
									id			: 'modifyid',
									disabled	: true,
									handler		: function() {
										editInit();
									}
								}, {
									text		: '删除选中',
									id			: 'deleteid',
									disabled	: true,
									iconCls		: 'page_delIcon',
									handler		: function() {
										deleteAccesory();
									}
								}, '->', {
									xtype			: 'textfield',
									id				: 'inputname',
									name			: 'inputname',
									emptyText		: '刀体附件',
									width			: 150,
									enableKeyEvents	: true,
									// 响应回车键
									listeners		: {
										specialkey	: function(field, e) {
											if (e.getKey() == Ext.EventObject.ENTER) {
												queryAccesoryInfo();
											}
										}
									}
								}, {
									text	: '查询',
									iconCls	: 'page_findIcon',
									handler	: function() {
										queryAccesoryInfo();
									}
								}, {
									text	: '刷新',
									iconCls	: 'page_refreshIcon',
									handler	: function() {
										store.reload();
									}
								}, {
									text	: '高级',
									iconCls	: 'page_findIcon',
									handler	: function() {
										advancedQuery();
									}
								}]
					});

			// 合计
			// var summary = new Ext.ux.grid.GridSummary();

			// 表格实例
			var grid = new Ext.grid.GridPanel({
						// 表格面板标题,默认为粗体，我不喜欢粗体，这里设置样式将其格式为正常字体
						// title : '<span accesory="commoncss">表格综合演示六</span>',
						header		: false,
						height		: 500,
						autoScroll	: true,
						frame		: true,
						region		: 'center', // 和VIEWPORT布局模型对应，充当center区域布局
						store		: store, // 数据存储
						stripeRows	: true, // 斑马线
						cm			: cm, // 列模型
						tbar		: tbar, // 表格工具栏
						bbar		: bbar,// 分页工具栏
						// plugins : [summary], // 合计
						viewConfig	: {
							// 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
							forceFit	: true
						},
						loadMask	: {
							msg	: '正在加载表格数据,请稍等...'
						}
					});

			grid.on('rowclick', function(pGrid, rowIndex, event) {
				Ext.getCmp('modifyid').enable();
				Ext.getCmp('deleteid').enable();
					// pGrid.getView().getRow(rowIndex).style.backgroundColor='blue';
					// pGrid.getView().getRow(sm.lastActive).style.backgroundColor='#1C86EE';
				});

			grid.on('rowdblclick', function(grid, rowIndex, event) {
						editInit();
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
			function queryAccesoryInfo() {
				store.load({
							params	: {
								start	: 0,
								limit	: bbar.pageSize,
								keyword	: Ext.getCmp('inputname').getValue()
							}/*
								 * , callback : fnSumInfo
								 */
						});
			}

			// 高级查询
			function advancedQuery() {
				Ext.Msg.alert('提示', '高级查询是用户自定义查询,因此需要用户的参与,开发者才可进行功能添加!');
			}

			function addInit() {
				// Ext.getCmp('resetbtn').hide();
				// clearForm(addUserFormPanel.getForm());

				var flag = Ext.getCmp('windowmode').getValue();
				if (typeof(flag) != 'undefined') {
					addAccesoryForm.form.getEl().dom.reset();
				} else {
					clearForm(addAccesoryForm.getForm());
				}
				addAccesory.show();

				addAccesory.setTitle('<span class="commoncss">新增刀体附件</span>');
				Ext.getCmp('windowmode').setValue('add');

				Ext.getCmp('resetbtn').show();

				Ext.getCmp('savebtn').setText('保存');
				// Ext.getCmp('addbtn').hide();

				// lockedCombo.setValue('0');
				// usertypeCombo.setValue('1');
				// sexCombo.setValue('0');
			}

			// 任务计划信息修改
			function editInit() {
				// Ext.Msg.alert('提示', '功能即将添加!');
				var record = grid.getSelectionModel().getSelected();
				if (Ext.isEmpty(record)) {
					Ext.Msg.alert('提示', '请先选中要修改的项目!');
					return;
				}
				addAccesoryForm.getForm().loadRecord(record);
				addAccesory.show();
				addAccesory.setTitle('<span class="commoncss">修改刀体附件</span>');

				// addTeacher.show();
				Ext.getCmp('savebtn').setText('更新');
				Ext.getCmp('windowmode').setValue('edit');
				Ext.getCmp('resetbtn').hide();
				// Ext.getCmp('addbtn').hide();
				Ext.getCmp('accesoryid').setValue(record.get('accesoryid'));
			}

			// 删除学员数据
			function deleteAccesory() {
				var records = grid.getSelectionModel().getSelections();
				// var record = grid.getSelectionModel().getSelected();
				if (Ext.isEmpty(records)) {
					Ext.Msg.alert('提示', '请先选中要删除的项目!');
					return;
				}
				var strChecked = jsArray2JsString(records, 'accesoryid');
				Ext.Msg.confirm('请确认', '确认删除选中的记录吗', function(btn, text) {
							if (btn == 'yes') {
								showWaitMsg();
								Ext.Ajax.request({
											url		: 'accesory.do?code=deleteAccesory',
											success	: function(response) {
												var resultArray = Ext.util.JSON.decode(response.responseText);
												store.reload();
												Ext.Msg.alert('提示', resultArray.msg);
											},
											params	: {
												strChecked	: strChecked
											}
										});
							}
						});
			}
		});