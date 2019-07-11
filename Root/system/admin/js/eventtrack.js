/**
 * 操作员事件跟踪
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
Ext.onReady(function() {
			var expander = new Ext.grid.RowExpander({
						tpl					: new Ext.Template('<p style=margin-left:70px;><span style=color:Teal;>描述信息</span><br><span>{description}</span></p>',
								'<p style=margin-left:70px;><span style=color:Teal;>请求路径</span><br><span>{requestpath}</span></p>',
								'<p style=margin-left:70px;><span style=color:Teal;>请求方法</span><br><span>{methodname}</span></p>',
								'<p style=margin-left:70px;><span style=color:Teal;>耗时</span><br><span>{costtime}毫秒</span></p>'),
						// 屏蔽双击事件
						expandOnDblClick	: true
					});
			var sm = new Ext.grid.CheckboxSelectionModel();
			var rownum = new Ext.grid.RowNumberer({
						header	: '序',
						width	: 26
					});
			var cm = new Ext.grid.ColumnModel([rownum, sm, expander, {
						header		: '激活时间',
						dataIndex	: 'activetime',
						sortable	: true,
						width		: 130
					}, {
						header		: '登录姓名',
						dataIndex	: 'username',
						width		: 80,
						sortable	: true
					}, {
						header		: '登录账户',
						dataIndex	: 'account',
						width		: 80,
						sortable	: true
					}, {
						header		: '耗时(ms)',
						dataIndex	: 'costtime',
						width		: 80,
						align		: 'right',
						sortable	: true
					}, {
						header		: '描述信息',
						dataIndex	: 'description',
						width		: 350,
						sortable	: true
					}, {
						header		: '请求路径',
						dataIndex	: 'requestpath',
						sortable	: true,
						width		: 200
					}, {
						header		: '请求方法',
						dataIndex	: 'methodname',
						sortable	: true,
						width		: 150
					}, {
						header		: '事件编号',
						dataIndex	: 'eventid',
						hidden		: true,
						width		: 120,
						sortable	: true
					}, {
						header		: '用户ID',
						dataIndex	: 'userid',
						hidden		: true
					}, {
						id			: '_blank',
						dataIndex	: '_blank'
					}]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.GroupingStore({
						proxy	: new Ext.data.HttpProxy({
									url	: 'eventTrack.do?code=queryEvents'
								}),
						reader	: new Ext.data.JsonReader({
									totalProperty	: 'TOTALCOUNT',
									root			: 'ROOT'
								}, [{
											name	: 'eventid'
										}, {
											name	: 'userid'
										}, {
											name	: 'account'
										}, {
											name	: 'username'
										}, {
											name	: 'activetime'
										}, {
											name	: 'description'
										}, {
											name	: 'requestpath'
										}, {
											name	: 'methodname'
										}, {
											name	: 'costtime'
										}])
					});

			var filters = new Ext.ux.grid.GridFilters({// string,numeric,date,list,boolean
				encode		: true,
				autoReload	: false,
				local		: true,
				filters		: [{
							dataIndex	: 'account',
							type		: 'string'
						}, {
							dataIndex	: 'username',
							type		: 'string'
						}, {
							dataIndex	: 'activetime',
							type		: 'date'
						}, {
							dataIndex	: 'description',
							type		: 'string'
						}, {
							dataIndex	: 'requestpath',
							type		: 'string'
						}, {
							dataIndex	: 'methodname',
							type		: 'string'
						}, {
							dataIndex	: 'costtime',
							type		: 'numeric'
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
							jsrq	: jsrq,
							ksrq	: ksrq,
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
									data	: [[10, '10条/页'], [20, '20条/页'], [50, '50条/页'], [100, '100条/页'], [250, '250条/页'], [500, '500条/页']]
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
						title				: '<span class="commoncss">Rquest请求跟踪</span>',
						height				: 500,
						header				: false,
						// width:600,
						header				: false,
						autoScroll			: true,
						region				: 'center',
						store				: store,
						loadMask			: {
							msg	: '正在加载表格数据,请稍等...'
						},
						stripeRows			: true,
						frame				: true,
						autoExpandColumn	: '_blank',
						cm					: cm,
						sm					: sm,
						plugins				: expander,
						tbar				: [{
									text	: '删除',
									iconCls	: 'page_delIcon',
									handler	: function() {
										deleteEvents('del');
									}
								}, '-', {
									text	: '清空',
									iconCls	: 'tbar_synchronizeIcon',
									handler	: function() {
										deleteEvents('reset');
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
											emptyText		: '登录姓名|描述信息|路径',
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
						stateId				: 'grid-event'
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
									iconCls	: 'page_delIcon',
									handler	: function() {
										deleteEvents('del');
									}
								}, '-', {
									text	: '清空',
									iconCls	: 'tbar_synchronizeIcon',
									handler	: function() {
										deleteEvents('reset');
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

			// 高级查询
			function advancedQuery() {
				infoMsg('高级查询属于自定义查询，需要用户告知开发者所需功能才可进行添加。');
			}

			// 重置
			function resetToolbar() {
				Ext.getCmp('inputname').setValue('');
				Ext.getCmp('ksrq').reset();
				Ext.getCmp('jsrq').reset();

				store.load({
							params	: {
								start	: 0,
								limit	: bbar.pageSize
							}
						});
			}

			/**
			 * 删除事件
			 */
			function deleteEvents(type) {
				var rows = grid.getSelectionModel().getSelections();
				if (type == 'del') {
					if (Ext.isEmpty(rows)) {
						infoMsg('您没有选中任何条目，请先选中要删除的项目！');
						return;
					}
				}
				var strChecked = jsArray2JsString(rows, 'eventid');
				var msg = "确认删除选中的记录吗?";
				if (type == 'reset') {
					msg = "确认重置所有的记录吗,记录信息将被清空?";
				}
				Ext.Msg.confirm('请确认', msg, function(btn, text) {
							if (btn == 'yes') {
								showWaitMsg();
								Ext.Ajax.request({
											url		: 'eventTrack.do?code=deleteEvents',
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
				infoMsg('为保障演示系统高速运行,跟踪功能已关闭.您看到的数据是历史跟踪数据!');
			}

		});