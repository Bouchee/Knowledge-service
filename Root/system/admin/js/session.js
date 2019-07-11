/**
 * 会话监控
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
Ext.onReady(function() {

			var sm = new Ext.grid.CheckboxSelectionModel();
			// 定义自动当前页行号
			var rownum = new Ext.grid.RowNumberer({
						header	: '序',
						width	: 26
					});
			var cm = new Ext.grid.ColumnModel([rownum, sm, {
						header		: '用户编号',
						dataIndex	: 'userid',
						width		: 75,
						hidden		: true,
						sortable	: true
					}, {
						header		: '会话创建时间',
						dataIndex	: 'sessionCreatedTime',
						width		: 140
					}, {
						header		: '登录账户',
						dataIndex	: 'account',
						width		: 150
					}, {
						header		: '姓名',
						dataIndex	: 'username',
						width		: 90
					}, {
						header		: '客户端IP',
						dataIndex	: 'loginIP',
						width		: 100
					}, {
						header		: '客户端浏览器',
						dataIndex	: 'explorer',
						width		: 120
					}, {
						header		: '会话ID',
						dataIndex	: 'sessionID',
						width		: 250
					}, {
						dataIndex	: '_blank',
						id			: '_blank'
					}]);

			var store = new Ext.data.GroupingStore({
						proxy	: new Ext.data.HttpProxy({
									url	: 'sessionMonitor.do?code=getSessionList'
								}),
						reader	: new Ext.data.JsonReader({
									totalProperty	: 'TOTALCOUNT',
									root			: 'ROOT'
								}, [{
											name	: 'sessionID'
										}, {
											name	: 'userid'
										}, {
											name	: 'username'
										}, {
											name	: 'account'
										}, {
											name	: 'loginIP'
										}, {
											name	: 'explorer'
										}, {
											name	: 'sessionCreatedTime'
										}])
					});

			var filters = new Ext.ux.grid.GridFilters({// string,numeric,date,list,boolean
				encode		: true,
				autoReload	: false,
				local		: true,
				filters		: [{
							dataIndex	: 'username',
							type		: 'string'
						}, {
							dataIndex	: 'account',
							type		: 'string'
						}, {
							dataIndex	: 'loginIP',
							type		: 'string'
						}, {
							dataIndex	: 'explorer',
							type		: 'string'
						}, {
							dataIndex	: 'sessionCreatedTime',
							type		: 'string'
						}]
			});

			store.on('beforeload', function() {
						this.baseParams = {
							keyword	: Ext.getCmp('inputname').getValue()
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
									data	: [[10, '10 条/页'], [20, '20 条/页'], [50, '50 条/页'], [100, '100条/页'], [250, '250条/页'], [500, '500条/页'], [1000, '1000条/页']]
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
						title				: '<span class="commoncss">会话监控</span>',
						height				: 510,
						header				: false,
						store				: store,
						region				: 'center',
						loadMask			: {
							msg	: '正在加载数据,请稍等...'
						},
						stripeRows			: true,
						frame				: true,
						autoExpandColumn	: '_blank',
						cm					: cm,
						sm					: sm,
						tbar				: [{
									text	: '结束会话',
									iconCls	: 'deleteIcon',
									handler	: function() {
										if (runMode == '0') {
											infoMsgClick('应用授权不可用，请联系开发人员输入购买的授权密码，您目前只能进行查询操作！');
											return;
										}
										killSession();
									}
								}, '->', {
									id				: 'inputname',
									name			: 'account',
									xtype			: 'textfield',
									cls				: 'search',
									emptyText		: '登录帐户|姓名|浏览器',
									enableKeyEvents	: true,
									listeners		: {
										specialkey	: function(field, e) {
											if (e.getKey() == Ext.EventObject.ENTER) {
												queryInfo();
											}
										}
									},
									width			: 150
								}, {
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
						stateId				: 'grid-session'
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
									text	: '结束会话',
									iconCls	: 'deleteIcon',
									handler	: function() {
										if (runMode == '0') {
											infoMsgClick('应用授权不可用，请联系开发人员输入购买的授权密码，您目前只能进行查询操作！');
											return;
										}
										killSession();
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
			 * 结束会话
			 */
			function killSession() {
				var rows = grid.getSelectionModel().getSelections();
				if (Ext.isEmpty(rows)) {
					infoMsg('您没有选中任何条目，请先选中要结束的项目！');
					return;
				}
				var strChecked = jsArray2JsString(rows, 'sessionID');
				Ext.Msg.confirm('请确认', '确认要结束选中的会话吗?', function(btn, text) {
							if (btn == 'yes') {
								showWaitMsg('正在结束会话,请等待...');
								Ext.Ajax.request({
											url		: 'sessionMonitor.do?code=killSession',
											success	: function(response) {
												var resultArray = Ext.util.JSON.decode(response.responseText);
												infoMsg(resultArray.msg);
												store.reload();
											},
											failure	: function(response) {
												var resultArray = Ext.util.JSON.decode(response.responseText);
												infoMsg(resultArray.msg);
											},
											params	: {
												strChecked	: strChecked
											}
										});
							}
						});
			}

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