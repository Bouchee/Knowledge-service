/**
 * UI元素托管
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */

Ext.onReady(function() {
			var menuid;
			var root = new Ext.tree.AsyncTreeNode({
						text		: root_menuname,
						expanded	: true,
						id			: '01'
					});
			var menuTree = new Ext.tree.TreePanel({
						loader		: new Ext.tree.TreeLoader({
									baseAttrs	: {},
									dataUrl		: 'part.do?code=queryMenuItems'
								}),
						root		: root,
						title		: '',
						applyTo		: 'menuTreeDiv',
						autoScroll	: false,
						animate		: false,
						useArrows	: false,
						border		: false
					});
			menuTree.expandAll();

			menuTree.on('click', function(node) {
						if (!node.isLeaf()) {
							store.removeAll();
							Ext.getCmp('id_addRow').setDisabled(true);
							Ext.getCmp('id_save').setDisabled(true);
							return;
						}
						Ext.getCmp('id_addRow').setDisabled(false);
						menuid = node.id;
						store.load({
									params	: {
										start	: 0,
										limit	: bbar.pageSize,
										menuid	: menuid
									}
								});
					});

			menuTree.root.select();

			var cm = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(), {
						header		: '删除',
						dataIndex	: 'delete',
						width		: 35,
						renderer	: iconColumnRender
					}, {
						header		: '元素Dom标识',
						dataIndex	: 'cmpid',
						sortable	: true,
						width		: 150,
						editor		: new Ext.grid.GridEditor(new Ext.form.TextField({
									allowBlank		: false,
									selectOnFocus	: true,
									maxLength		: 20
								}))

					}, {
						header		: '元素类型',
						dataIndex	: 'cmptype',
						width		: 120,
						renderer	: CMPTYPERender,
						editor		: new Ext.grid.GridEditor(new Ext.form.ComboBox({
									store			: CMPTYPEStore,
									mode			: 'local',
									listWidth		: 408,
									triggerAction	: 'all',
									valueField		: 'value',
									displayField	: 'text',
									allowBlank		: false,
									resizable		: true,
									forceSelection	: true,
									editable		: false,
									typeAhead		: true,
									listeners		: {
										focus	: function(cb) {
											setTimeout('cb.expand();', 100);
										}
									}
								}))
					}, {
						header		: '元素描述',
						dataIndex	: 'remark',
						width		: 200,
						editor		: new Ext.grid.GridEditor(new Ext.form.TextField({
									maxLength	: 50
								}))
					}, {
						header		: '托管页面功能菜单',
						dataIndex	: 'menuname',
						id			: 'menuname',
						width		: 150
					}, {
						header		: '元素编号',
						dataIndex	: 'partid',
						width		: 120
					}, {
						header		: '菜单编号',
						dataIndex	: 'menuid',
						hidden		: true,
						width		: 120
					}]);

			var rec_part = new Ext.data.Record.create([{
						name	: 'partid',
						type	: 'string'
					}, {
						name	: 'menuid',
						type	: 'string'
					}, {
						name	: 'menuname',
						type	: 'string'
					}, {
						name	: 'cmpid',
						type	: 'string'
					}, {
						name	: 'cmptype',
						type	: 'string'
					}, {
						name	: 'remark',
						type	: 'string'
					}, {
						name	: 'dirtytype',
						type	: 'string'
					}]);

			var store = new Ext.data.GroupingStore({
						// True表示为，每次Store加载后，清除所有修改过的记录信息；record被移除时也会这样
						pruneModifiedRecords	: true,
						proxy					: new Ext.data.HttpProxy({
									url	: 'part.do?code=queryParts'
								}),
						reader					: new Ext.data.JsonReader({
									totalProperty	: 'TOTALCOUNT',
									root			: 'ROOT'
								}, [{
											name	: 'partid'
										}, {
											name	: 'menuid'
										}, {
											name	: 'menuname'
										}, {
											name	: 'cmpid'
										}, {
											name	: 'cmptype'
										}, {
											name	: 'remark'
										}])
					});

			var filters = new Ext.ux.grid.GridFilters({// string,numeric,date,list,boolean
				encode		: true,
				autoReload	: false,
				local		: true,
				filters		: [{
							dataIndex	: 'menuname',
							type		: 'string'
						}, {
							dataIndex	: 'cmpid',
							type		: 'string'
						}, {
							dataIndex	: 'cmptype',
							type		: 'string'
						}, {
							dataIndex	: 'remark',
							type		: 'string'
						}]
			});

			store.on('beforeload', function() {
						this.baseParams = {
							menuid	: menuid
						};
					});

			store.on('load', function() {
						/*
						 * if (store.getTotalCount() == 0) { Ext.getCmp('id_addRow').setDisabled(true); Ext.getCmp('id_save').setDisabled(true); } else { Ext.getCmp('id_addRow').setDisabled(false);
						 * Ext.getCmp('id_save').setDisabled(false); }
						 */

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

			var grid = new Ext.grid.EditorGridPanel({
						title				: '<span class="commoncss">托管UI元素</span>',
						height				: 500,
						header				: false,
						autoScroll			: true,
						region				: 'center',
						store				: store,
						loadMask			: {
							msg	: '正在加载表格数据,请稍等...'
						},
						stripeRows			: true,
						frame				: true,
						autoExpandColumn	: 'menuname',
						cm					: cm,
						clicksToEdit		: 1,
						tbar				: [{
									text	: '新增',
									iconCls	: 'addIcon',
									id		: 'id_addRow',
									handler	: function() {
										addInit();
									}
								}, '-', {
									text	: '保存',
									iconCls	: 'acceptIcon',
									id		: 'id_save',
									handler	: function() {
										if (runMode == '0') {
											infoMsgClick('应用授权不可用，请联系开发人员输入购买的授权密码，您目前只能进行查询操作！');
											return;
										}
										saveOrUpdateData();
									}
								}, '->', {
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
						stateId				: 'grid-uipart'
					});

			grid.on("cellclick", function(pGrid, rowIndex, columnIndex, e) {
						store = pGrid.getStore();
						var record = store.getAt(rowIndex);
						var fieldName = pGrid.getColumnModel().getDataIndex(columnIndex);
						if (fieldName == 'delete' && columnIndex == 1) {
							var dirtytype = record.get('dirtytype');
							if (Ext.isEmpty(dirtytype)) {
								Ext.Msg.confirm('请确认', '你确认要删除当前对象吗?', function(btn, text) {
											if (btn == 'yes') {

												delItem(record.get('partid'));

											} else {
												return;
											}
										});
							} else {
								store.remove(record);

							}
						}
					});

			// Ext.getCmp('id_addRow').setDisabled(true);
			// Ext.getCmp('id_save').setDisabled(true);

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
									iconCls	: 'addIcon',
									// id : 'id_addRow',
									handler	: function() {
										addInit();
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

			// 重置
			function resetToolbar() {
				// Ext.getCmp('inputname').setValue('');
				store.load({
							params	: {
								start	: 0,
								limit	: bbar.pageSize
							}
						});
			}
			/*
			 * store.load({ params : { start : 0, limit : bbar.pageSize } });
			 */
			var viewport = new Ext.Viewport({
						layout	: 'border',
						items	: [{
									title		: '<span style="font-weight:normal">功能菜单</span>',
									iconCls		: 'layout_contentIcon',
									tools		: [{
												id		: 'refresh',
												handler	: function() {
													menuTree.root.reload();
													menuTree.expandAll();
												}
											}],
									collapsible	: true,
									width		: 260,
									minSize		: 160,
									maxSize		: 280,
									split		: true,
									region		: 'west',
									autoScroll	: true,
									items		: [menuTree]
								}, grid]
					});

			function addInit() {
				var selectModel = menuTree.getSelectionModel();
				var selectNode = selectModel.getSelectedNode();
				var rec = new rec_part({});
				rec.set('partid', '保存后自动生成');
				rec.set('menuid', selectNode.id);
				rec.set('menuname', selectNode.text);
				rec.set('dirtytype', '1');
				grid.stopEditing();
				store.insert(0, rec);
				grid.startEditing(0, 2);
				// store.getAt(0).dirty=true; //不起作用
				store.getAt(0).set('cmpid', '不能为空,请输入');
				// 通过这种办法变相的将新增行标识为脏数据
				Ext.getCmp('id_save').setDisabled(false);
			}

			function saveOrUpdateData() {
				var m = store.modified.slice(0);
				if (Ext.isEmpty(m)) {
					infoMsg('检测到没有修改的数据，不需要保存!');
					return;
				}

				for (var i = 0; i < m.length; i++) {
					var record = m[i];
					var rowIndex = store.indexOfId(record.id);
					if (Ext.isEmpty(record.get('cmpid'))) {
						infoMsg('元素Dom标识字段数据校验不合法,请重新输入!', function() {
									grid.startEditing(rowIndex, 3);
								});
						return false;
					}
					if (Ext.isEmpty(record.get('cmptype'))) {
						infoMsg('元素类型字段数据校验不合法,请重新输入!', function() {
									grid.startEditing(rowIndex, 4);
								});
						return false;
					}
				}

				var jsonArray = [];
				Ext.each(m, function(item) {
							jsonArray.push(item.data);
						});

				Ext.Ajax.request({
							url		: 'part.do?code=saveDirtyDatas',
							success	: function(response) {

								var resultArray = Ext.util.JSON.decode(response.responseText);
								if (resultArray.bflag == '1') {
									Ext.getCmp('id_save').setDisabled(true);
								}
								store.reload();
								infoMsg(resultArray.msg);
							},
							failure	: function(response) {
								infoMsg('数据保存失败');
							},
							params	: {
								dirtydata	: Ext.encode(jsonArray)
							}
						});
			}

			function delItem(partid) {
				if (runMode == '0') {
					infoMsgClick('应用授权不可用，请联系开发人员输入购买的授权密码，您目前只能进行查询操作！');
					return;
				}
				Ext.Ajax.request({
							url		: 'part.do?code=deleteItem',
							success	: function(response) {
								store.reload();
								var resultArray = Ext.util.JSON.decode(response.responseText);
								infoMsg(resultArray.msg);
							},
							failure	: function(response) {
								infoMsg('数据删除失败');
							},
							params	: {
								partid	: partid
							}
						});
			}

			function iconColumnRender(value) {
				return "<a href='javascript:void(0);'><img src='" + webContext + "/resource/image/ext/delete.png'/></a>";;
			}

		});