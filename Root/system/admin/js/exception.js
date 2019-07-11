/**
 * Service切面监控
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
Ext.onReady(function() {
			var expander = new Ext.grid.RowExpander({
						tpl					: new Ext.Template('<p style=margin-left:70px;><span style=color:Teal;>方法</span><br><span>{methodname}</span></p>',
								'<p style=margin-left:70px;><span style=color:Teal;>激活时间</span><br><span>{activetime}</span></p>',
								'<p style=margin-left:70px;><span style=color:Teal;>类名</span><br><span>{clazz}</span></p>',
								'<p style=margin-left:70px;><span style=color:Teal;>异常信息</span><br><span style=color:red;>{exception}</span></p>'),
						// 屏蔽双击事件
						expandOnDblClick	: true
					});
			var sm = new Ext.grid.CheckboxSelectionModel();
			var cm = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(), sm, expander, {
						header		: '异常编号',
						dataIndex	: 'exceptionid',
						hidden		: true,
						width		: 120,
						sortable	: true
					}, {
						header		: '激活时间',
						dataIndex	: 'activetime',
						sortable	: true,
						width		: 130
					}, {
						header		: '异常类名',
						dataIndex	: 'clazz',
						width		: 350,
						sortable	: true
					}, {
						header		: '异常方法',
						dataIndex	: 'methodname',
						width		: 160,
						sortable	: true
					}, {
						header		: '异常信息',
						dataIndex	: 'exception',
						id			: 'exception',
						sortable	: true
					}]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.GroupingStore({
						proxy	: new Ext.data.HttpProxy({
									url	: 'beanMonitor.do?code=queryMonitorDatas'
								}),
						reader	: new Ext.data.JsonReader({
									totalProperty	: 'TOTALCOUNT',
									root			: 'ROOT'
								}, [{
											name	: 'exceptionid'
										}, {
											name	: 'methodname'
										}, {
											name	: 'activetime'
										}, {
											name	: 'clazz'
										}, {
											name	: 'exception'
										}])
					});

			var filters = new Ext.ux.grid.GridFilters({// string,numeric,date,list,boolean
				encode		: true,
				autoReload	: false,
				local		: true,
				filters		: [{
							dataIndex	: 'methodname',
							type		: 'string'
						}, {
							dataIndex	: 'activetime',
							type		: 'date'
						}, {
							dataIndex	: 'clazz',
							type		: 'string'
						}, {
							dataIndex	: 'exception',
							type		: 'string'
						}]
			});

			// 翻页排序时带上查询条件
			store.on('beforeload', function() {
						var ksrq = Ext.getCmp('ksrq').getValue();
						if (!Ext.isEmpty(ksrq)) {
							ksrq = ksrq.format('Y-n-j').toString();
						}
						var jsrq = Ext.getCmp('jsrq').getValue();
						if (!Ext.isEmpty(jsrq)) {
							jsrq = jsrq.format('Y-n-j').toString();
						}
						this.baseParams = {
							keyword	: Ext.getCmp('inputname').getValue(),
							jsrq	: jsrq,
							ksrq	: ksrq
						};
					});

			var pagesize_combo = new Ext.form.ComboBox({
						name			: 'pagesize',
						hiddenName		: 'pagesize',
						typeAhead		: true,
						triggerAction	: 'all',
						lazyRender		: true,
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

			var bbar = new Ext.PagingToolbar({
						pageSize	: number,
						store		: store,
						displayInfo	: true,
						displayMsg	: '显示第 {0} 条到第 {1} 条，共 {2} 条',
						plugins		: new Ext.ux.ProgressBarPager(),
						emptyMsg	: "对不起，没有符合条件的记录！",
						items		: ['-', '&nbsp;&nbsp;', pagesize_combo]
					});

			var grid = new Ext.grid.GridPanel({
						title				: '<span class="commoncss">系统异常监控</span>',
						height				: 500,
						header				: false,
						// width:600,
						autoScroll			: true,
						region				: 'center',
						store				: store,
						loadMask			: {
							msg	: '正在加载表格数据,请稍等...'
						},
						stripeRows			: true,
						frame				: true,
						autoExpandColumn	: 'exception',
						cm					: cm,
						sm					: sm,
						plugins				: expander,
						tbar				: [{
									text	: '删除',
									iconCls	: 'deleteIcon',
									handler	: function() {
										deleteInit('del');
									}
								}, '-', {
									text	: '清空',
									iconCls	: 'tbar_synchronizeIcon',
									handler	: function() {
										deleteInit('reset');
									}
								}, '->', {
									id			: 'ksrq',
									name		: 'ksrq',
									xtype		: 'datefield',
									emptyText	: '开始日期',
									format		: 'Y-n-j',
									width		: 120
								}, '-', {
									id			: 'jsrq',
									name		: 'jsrq',
									xtype		: 'datefield',
									emptyText	: '结束日期',
									format		: 'Y-n-j',
									width		: 120
								}, '-', new Ext.form.TextField({
											id				: 'inputname',
											name			: 'keyword',
											cls				: 'search',
											emptyText		: '异常类名|方法|信息',
											enableKeyEvents	: true,
											listeners		: {
												specialkey	: function(field, e) {
													if (e.getKey() == Ext.EventObject.ENTER) {
														queryInfo();
													}
												}
											},
											width			: 150
										}), {
									text	: '查询',
									iconCls	: 'previewIcon',
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
								}],
						bbar				: bbar,
						view				: new Ext.grid.GroupingView(),
						plugins				: [filters],
						stateful			: sf,
						stateId				: 'grid-exception'
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
									text	: '删除',
									iconCls	: 'deleteIcon',
									handler	: function() {
										deleteInit('del');
									}
								}, '-', {
									text	: '清空',
									iconCls	: 'tbar_synchronizeIcon',
									handler	: function() {
										deleteInit('reset');
									}
								}, '-', {
									text	: '查询',
									iconCls	: 'page_findIcon',
									handler	: function() {
										advancedQuery();
									}
								}, {
									text	: '刷新',
									iconCls	: 'page_refreshIcon',
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

			store.load({
						params	: {
							start	: 0,
							limit	: bbar.pageSize
						}
					});
			grid.on('sortchange', function() {
						// grid.getSelectionModel().selectFirstRow();
					});

			bbar.on("change", function() {
						// grid.getSelectionModel().selectFirstRow();
					});

			/**
			 * 布局
			 */
			var viewport = new Ext.Viewport({
						layout	: 'border',
						items	: [grid]
					});

			/**
			 * 查询事件
			 */
			function queryInfo() {
				var ksrq = Ext.getCmp('ksrq').getValue();
				if (!Ext.isEmpty(ksrq)) {
					ksrq = ksrq.format('Y-n-j').toString();
				}
				var jsrq = Ext.getCmp('jsrq').getValue();
				if (!Ext.isEmpty(jsrq)) {
					jsrq = jsrq.format('Y-n-j').toString();
				}
				store.load({
							params	: {
								start	: 0,
								limit	: bbar.pageSize,
								keyword	: Ext.getCmp('inputname').getValue(),
								jsrq	: jsrq,
								ksrq	: ksrq
							}
						});
			}

			/**
			 * 删除事件
			 */
			function deleteInit(type) {
				var rows = grid.getSelectionModel().getSelections();
				if (Ext.isEmpty(rows)) {
					infoMsg('您没有选中任何条目，请先选中要删除的项目！');
					return;
				}
				var strChecked = jsArray2JsString(rows, 'exceptionid');
				var msg = '确认删除选中的记录吗?';
				if (type == 'reset') {
					msg = '确认清空所有监控记录吗?';
				}

				Ext.Msg.confirm('请确认', msg, function(btn, text) {
							if (btn == 'yes') {
								showWaitMsg();
								Ext.Ajax.request({
											url		: 'beanMonitor.do?code=deleteMonitorDatas',
											success	: function(response) {
												var resultArray = Ext.util.JSON.decode(response.responseText);
												store.reload();
												infoMsg(resultArray.msg);
											},
											params	: {
												strChecked	: strChecked,
												type		: type
											}
										});
							}
						});
			}

			if (runMode == '0') {
				infoMsg('为保障演示系统高速运行,监控功能已关闭.您看到的数据是历史监控数据!');
			}

			// 高级查询
			function advancedQuery() {
				infoMsg('高级查询属于自定义查询，需要用户告知开发者所需功能才可进行添加。');
			}

			// 重置
			function resetToolbar() {
				Ext.getCmp('inputname').setValue('');
				Ext.getCmp('ksrq').setValue('');
				Ext.getCmp('jsrq').setValue('');

				store.load({
							params	: {
								start	: 0,
								limit	: bbar.pageSize
							}
						});
			}
		});