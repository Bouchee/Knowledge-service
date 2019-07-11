/**
 * 系统预置图标
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
Ext.onReady(function() {
			var cm = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(), {
						header		: '图标编号',
						dataIndex	: 'iconid',
						hidden		: false,
						width		: 80,
						sortable	: true
					}, {
						header		: '预览',
						dataIndex	: 'previewpath',
						renderer	: function(value) {
							return '<img src=' + value + ' />';
						},
						width		: 50
					}, {
						id			: 'cssname',
						header		: 'CSS类名',
						dataIndex	: 'cssname',
						width		: 170,
						sortable	: true
					}, {
						id			: 'filename',
						header		: '文件名',
						dataIndex	: 'filename',
						width		: 170,
						sortable	: true
					}, {
						id			: 'accesspath',
						header		: '访问路径',
						dataIndex	: 'accesspath',
						sortable	: true
					}]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.GroupingStore({
						proxy	: new Ext.data.HttpProxy({
									url	: './resource.do?code=queryIconItems'
								}),
						reader	: new Ext.data.JsonReader({
									totalProperty	: 'TOTALCOUNT',
									root			: 'ROOT'
								}, [{
											name	: 'iconid'
										}, {
											name	: 'previewpath'
										}, {
											name	: 'cssname'
										}, {
											name	: 'filename'
										}, {
											name	: 'accesspath'
										}])
					});

			var filters = new Ext.ux.grid.GridFilters({// string,numeric,date,list,boolean
				encode		: true,
				autoReload	: false,
				local		: true,
				filters		: [{
							dataIndex	: 'previewpath',
							type		: 'string'
						}, {
							dataIndex	: 'cssname',
							type		: 'string'
						}, {
							dataIndex	: 'filename',
							type		: 'string'
						}, {
							dataIndex	: 'accesspath',
							type		: 'string'
						}]
			});

			// 翻页排序时带上查询条件
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
						title				: '<span style="font-weight:normal">系统预置图标</span>',
						iconCls				: 'imagesIcon',
						header				: false,
						height				: 500,
						autoScroll			: true,
						region				: 'center',
						store				: store,
						loadMask			: {
							msg	: '正在查询并加载数据,请稍等...'
						},
						stripeRows			: true,
						frame				: true,
						autoExpandColumn	: 'accesspath',
						cm					: cm,
						tbar				: ['->', new Ext.form.TextField({
											id				: 'inputname',
											name			: 'inputname',
											cls				: 'search',
											emptyText		: '文件名|CSS类名',
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
									iconCls	: 'page_findIcon',
									handler	: function() {
										queryInfo();
									}
								}, '-', {
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
								}],
						bbar				: bbar,
						view				: new Ext.grid.GroupingView(),
						plugins				: [filters],
						stateful			: sf,
						stateId				: 'grid-icon'
					});
			store.load({
						params	: {
							start	: 0,
							limit	: bbar.pageSize
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
									text	: '查询',
									iconCls	: 'previewIcon',
									handler	: function() {
										advancedQuery();
									}
								}, '-', {
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

			grid.on('sortchange', function() {
						grid.getSelectionModel().selectFirstRow();
					});

			bbar.on("change", function() {
						grid.getSelectionModel().selectFirstRow();
					});
			grid.on("celldblclick", function(grid, rowIndex, columnIndex, e) {
						var store = grid.getStore();
						var record = store.getAt(rowIndex);
						var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
						var celldata = record.get(fieldName);
						// copyToClipboard(celldata);
						iconPanel.getForm().loadRecord(record);
						iconWindow.show();
					});

			var iconPanel = new Ext.form.FormPanel({
						id			: 'iconPanel',
						name		: 'iconPanel',
						defaultType	: 'textfield',
						labelAlign	: 'right',
						labelWidth	: 65,
						frame		: true,
						items		: [{
									fieldLabel	: 'CSS类名',
									name		: 'cssname',
									allowBlank	: true,
									anchor		: '99%'
								}, {
									fieldLabel	: '文件名',
									name		: 'filename',
									allowBlank	: true,
									anchor		: '99%'
								}, {
									fieldLabel	: '访问路径',
									name		: 'accesspath',
									allowBlank	: true,
									anchor		: '99%'
								}]
					});

			var iconWindow = new Ext.Window({
						layout			: 'fit',
						width			: 400,
						height			: 130,
						resizable		: false,
						draggable		: true,
						closeAction		: 'hide',
						title			: '<span class="commoncss">系统图标</span>',
						// iconCls : 'page_addIcon',
						modal			: false,
						collapsible		: true,
						titleCollapse	: true,
						maximizable		: false,
						buttonAlign		: 'right',
						border			: false,
						animCollapse	: true,
						pageY			: document.body.clientHeight / 2 - 130 / 2,// // pageY : 20,
						pageX			: document.body.clientWidth / 2 - 400 / 2,
						animateTarget	: Ext.getBody(),
						constrain		: true,
						items			: [iconPanel]
					});

			/**
			 * 布局
			 */
			var viewport = new Ext.Viewport({
						layout	: 'border',
						items	: [grid]
					});

			/**
			 * 查询参数
			 */
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

			/**
			 * 显示窗口
			 */
			function showWindowInit() {
				var record = grid.getSelectionModel().getSelected();
				if (Ext.isEmpty(record)) {
					grid.getSelectionModel().selectFirstRow();
				}
				iconPanel.getForm().loadRecord(record);
				iconWindow.show();
			}

			// 重置
			function resetToolbar() {
				Ext.getCmp('inputname').reset();
				store.load({
							params	: {
								start	: 0,
								limit	: bbar.pageSize
							}
						});
			}
		});