/**
 * Tab标签卡范例
 * 
 * @author fuxianwu
 * @since 2013-01-01
 */
Ext.onReady(function() {

			var sm = new Ext.grid.CheckboxSelectionModel();

			// 定义自动当前页行号
			var rownum = new Ext.grid.RowNumberer({
						header	: '序',
						width	: 26
					});

			// 生成一个下载图标列
			function downloadColumnRender(value) {
				return "<a href='javascript:void(0);'><img src='" + webContext + "/resource/image/ext/download.png'/></a>";;
			}

			// 定义列模型
			var cm = new Ext.grid.ColumnModel([rownum, sm, {
						header		: '下载', // 列标题
						dataIndex	: 'download',
						width		: 35,
						renderer	: downloadColumnRender
					}, {
						header		: '文件标识',
						dataIndex	: 'fileid',
						sortable	: true,
						width		: 35,
						hidden		: true
					}, {
						header		: '文件标题',
						dataIndex	: 'title',
						width		: 220,
						sortable	: true
					}, {
						header		: '文件大小',
						dataIndex	: 'filesize',
						id			: 'filesizeid',
						width		: 80,
						sortable	: true,
						renderer	: function(value, cellmeta, record, rowIndex, columnIndex, store) {
							return Ext.util.Format.fileSize(value);
						}
					}, {
						header		: '存储路径',
						dataIndex	: 'path',
						width		: 350,
						sortable	: true
					}, {
						header		: '文件类型',
						dataIndex	: 'filetype',
						width		: 40,
						hidden		: true,
						sortable	: true
					}, {
						header		: '文件描述',
						dataIndex	: 'remark',
						width		: 200,
						sortable	: true
					}]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.GroupingStore({
						proxy	: new Ext.data.HttpProxy({
									url	: 'template.do?code=queryTemplate4Manage'
								}),
						reader	: new Ext.data.JsonReader({
									totalProperty	: 'TOTALCOUNT',
									root			: 'ROOT'
								}, [{
											name	: 'fileid'
										}, {
											name	: 'title'
										}, {
											name	: 'path'
										}, {
											name	: 'filesize'
										}, {
											name	: 'filetype'
										}, {
											name	: 'remark'
										}])
					});

			// 翻页排序时带上查询条件
			store.on('beforeload', function() {
						this.baseParams = {
							// title : Ext.getCmp('filetitle').getValue(),
							filetype	: '.xls'
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
										start		: 0,
										limit		: bbar.pageSize,
										filetype	: '.xls'
									}
								});
					});

			// 分页工具栏
			var bbar = new Ext.PagingToolbar({
						pageSize	: number,
						store		: store,
						displayInfo	: true,
						displayMsg	: '显示第 {0} 条到第 {1} 条, 共 {2} 条',
						plugins		: new Ext.ux.ProgressBarPager(), // 分页进度条
						emptyMsg	: "对不起, 没有符合条件的记录!",
						items		: ['-', '&nbsp;&nbsp;', pagesize_combo]
					});

			// 表格工具栏
			var tbar = new Ext.Toolbar({
						items	: [{
									text	: '下载',
									iconCls	: 'downloadIcon',
									handler	: function() {
										downloadFile();
									}
								}, '->', {
									xtype			: 'textfield',
									id				: 'inputname',
									cls				: 'search',
									name			: 'filetitle',
									emptyText		: '文件标题|文件描述',
									width			: 160,
									enableKeyEvents	: true,
									// 响应回车键
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
									text	: '重置',
									iconCls	: 'tbar_synchronizeIcon',
									handler	: function() {
										resetToolbar();
									}
								}]
					});

			var tabs = new Ext.TabPanel({
						region			: 'center',
						id				: 'tabsid',
						enableTabScroll	: true,
						// autoWidth : true,
						height			: document.body.clientHeight,
						buttonAlign		: 'right'/*
													 * , buttons : [{ text : 'Excel 2007(2010,2013) 版模板生成', iconCls : 'acceptIcon', handler : function() { //tabs.activate(1); // } }, { text : 'Excel
													 * 2003 版模板生成', iconCls : 'deleteIcon', handler : function() { //Ext.getCmp('tab2').disable(); } }]
													 */
					});

			// 页面过滤
			var filters = new Ext.ux.grid.GridFilters({// string,numeric,date,list,boolean
				encode		: true,
				autoReload	: false,
				local		: true,
				filters		: [{
							dataIndex	: 'title',
							type		: 'string'
						}, {
							dataIndex	: 'path',
							type		: 'string'
						}, {
							dataIndex	: 'filesize',
							type		: 'string'
						}, {
							dataIndex	: 'filetype',
							type		: 'string'
						}, {
							dataIndex	: 'remark',
							type		: 'string'
						}]
			});

			// 表格实例
			var grid = new Ext.grid.GridPanel({
						// title : '<span class="commoncss">文件列表</span>',
						// height : 600,//mainTabs.getHeight(),
						height		: 500,// Ext.getCmp('tabsid').height - 32,
						header		: false,
						frame		: true,
						// autoHeight : true,
						autoScroll	: true,
						region		: 'center', // 和VIEWPORT布局模型对应，充当center区域布局
						store		: store, // 数据存储
						stripeRows	: true, // 斑马线
						// autoExpandColumn : 'remark',
						cm			: cm, // 列模型
						sm			: sm, // 复选框
						tbar		: tbar, // 表格工具栏
						bbar		: bbar,// 分页工具栏
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
						stateId		: 'grid-template'
					});

			grid.on("cellclick", function(pGrid, rowIndex, columnIndex, e) {
						var store = pGrid.getStore();
						var record = store.getAt(rowIndex);
						var fieldName = pGrid.getColumnModel().getDataIndex(columnIndex);
						// columnIndex为小画笔所在列的索引,索引从0开始这里要非常注意!!!!!
						if (fieldName == 'download' && columnIndex == 2) {
							var fileid = record.get("fileid");
							// 通过iFrame实现类ajax文件下载
							// 这个很重要
							var downloadIframe = document.createElement('iframe');
							downloadIframe.src = 'template.do?code=downloadTemplate&fileid=' + fileid;
							downloadIframe.style.display = "none";
							document.body.appendChild(downloadIframe);
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
									text	: '下载',
									iconCls	: 'downloadIcon',
									handler	: function() {
										downloadFile();
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
			// 页面初始自动查询数据
			store.load({
						params	: {
							start		: 0,
							limit		: bbar.pageSize,
							filetype	: '.xls'
						}
					});

			// 布局模型
			/*
			 * var viewport = new Ext.Viewport({ layout : 'border', items : [ grid ] });
			 */

			// 每一个Tab都可以看作为一个Panel
			/*
			 * tabs.add({ title : '<span class="commoncss">全部模板</span>', //html : '汇总信息',
			 *  // tbar:tb, //工具栏 // items:[], iconCls : 'book_previousIcon', // 图标 });
			 */
			tabs.add({
				id			: 'tab2',
				title		: '<span class="commoncss">Excel 2003</span>',
				closable	: false,
				items		: [grid]
					// html : '明细信息'
				});
			tabs.add({
				id			: 'tab1',
				title		: '<span class="commoncss">Excel 2007(2010,2013)</span>',
				closable	: false
					// items : [grid]
					// html : '明细信息'
				});
			tabs.add({
				id		: 'tab3',
				title	: '<span class="commoncss">模板生成帮助</span>'
					// html : '明细信息'
				});
			tabs.activate(0);

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

			function downloadFile() {
				var record = grid.getSelectionModel().getSelected();
				var records = grid.getSelectionModel().getSelections();
				if (records.length == 0) {
					infoMsg('您没有选中任何条目，请先选中要下载的项目！');
					return;
				} else if (records.length > 1) {
					infoMsg('您选择了 ' + records.length + ' 个条目，系统将只下载最先选择的项目！');
					grid.getSelectionModel().selectRow(grid.getSelectionModel().last, false);
				}

				var fileid = record.get("fileid");
				// 通过iFrame实现类ajax文件下载
				// 这个很重要
				var downloadIframe = document.createElement('iframe');
				downloadIframe.src = 'template.do?code=downloadTemplate&fileid=' + fileid;
				downloadIframe.style.display = "none";
				document.body.appendChild(downloadIframe);

				// uploadWindow.show();
			}

		});