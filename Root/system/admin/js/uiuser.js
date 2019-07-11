/**
 * UI组件人员授权
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
Ext.onReady(function() {
			var menuid;
			var userid;

			var root = new Ext.tree.AsyncTreeNode({
						text		: root_deptname,
						expanded	: true,
						id			: root_deptid
					});
			var deptTree = new Ext.tree.TreePanel({
						loader		: new Ext.tree.TreeLoader({
									baseAttrs	: {},
									dataUrl		: 'userPart.do?code=departmentTreeInit'
								}),
						root		: root,
						title		: '',
						applyTo		: 'deptTreeDiv',
						autoScroll	: false,
						animate		: false,
						useArrows	: false,
						border		: false
					});
			deptTree.root.select();
			deptTree.on('click', function(node) {
						deptid = node.attributes.id;
						store.load({
									params	: {
										start	: 0,
										limit	: bbar.pageSize,
										deptid	: deptid
									}
								});
					});
			deptTree.expandAll();

			var cm = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(), {
						header		: '授权',
						dataIndex	: 'userid',
						renderer	: function(value, cellmeta, record) {
							return '<a href="javascript:void(0);"><img src="./resource/image/ext/edit1.png"/></a>';
						},
						width		: 35
					}, {
						header		: '姓名',
						dataIndex	: 'username',
						width		: 80
					}, {
						header		: '登录帐户',
						dataIndex	: 'account',
						width		: 130
					}, {
						id			: 'deptname',
						header		: '所属部门',
						dataIndex	: 'deptname',
						width		: 130
					}, {
						header		: '性别',
						dataIndex	: 'sex',
						width		: 60,
						renderer	: function(value) {
							if (value == '1')
								return '男';
							else if (value == '2')
								return '女';
							else if (value == '0')
								return '未知';
							else
								return value;
						}
					}, {
						header		: '人员状态',
						dataIndex	: 'locked',
						width		: 60,
						renderer	: function(value) {
							if (value == '1')
								return '锁定';
							else if (value == '0')
								return '正常';
							else
								return value;
						}
					}, {
						id			: 'usertype',
						header		: '人员类型',
						dataIndex	: 'usertype',
						width		: 60,
						renderer	: function(value) {
							if (value == '1')
								return '经办员';
							else if (value == '2')
								return '管理员';
							else if (value == '3')
								return '系统人员';
							else if (value == '4')
								return '项目主页注册用户';
							else
								return value;
						}
					}, {
						header		: '人员编号',
						dataIndex	: 'userid',
						hidden		: false,
						hidden		: false,
						width		: 80,
						sortable	: true
					}, {
						id			: 'remark',
						header		: '备注',
						dataIndex	: 'remark'
					}, {
						id			: 'deptid',
						header		: '所属部门编号',
						dataIndex	: 'deptid',
						hidden		: true
					}]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.GroupingStore({
						proxy	: new Ext.data.HttpProxy({
									url	: './user.do?code=queryUsersForManage'
								}),
						reader	: new Ext.data.JsonReader({
									totalProperty	: 'TOTALCOUNT',
									root			: 'ROOT'
								}, [{
											name	: 'userid'
										}, {
											name	: 'username'
										}, {
											name	: 'sex'
										}, {
											name	: 'account'
										}, {
											name	: 'locked'
										}, {
											name	: 'deptid'
										}, {
											name	: 'deptname'
										}, {
											name	: 'remark'
										}, {
											name	: 'usertype'
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
							dataIndex	: 'sex',
							type		: 'string'
						}, {
							dataIndex	: 'account',
							type		: 'string'
						}, {
							dataIndex	: 'locked',
							type		: 'string'
						}, {
							dataIndex	: 'deptid',
							type		: 'string'
						}, {
							dataIndex	: 'deptname',
							type		: 'string'
						}, {
							dataIndex	: 'remark',
							type		: 'string'
						}, {
							dataIndex	: 'usertype',
							type		: 'string'
						}]
			});

			// 翻页排序时带上查询条件
			store.on('beforeload', function() {
						this.baseParams = {
							queryParam	: Ext.getCmp('queryParam').getValue()
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
						title				: '<span class="commoncss">人员信息</span>',
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
						autoExpandColumn	: 'remark',
						cm					: cm,
						tbar				: ['->', new Ext.form.TextField({
											id				: 'queryParam',
											name			: 'queryParam',
											cls				: 'search',
											emptyText		: '姓名',
											enableKeyEvents	: true,
											listeners		: {
												specialkey	: function(field, e) {
													if (e.getKey() == Ext.EventObject.ENTER) {
														queryUserItem();
													}
												}
											},
											width			: 150
										}), {
									text	: '查询',
									iconCls	: 'previewIcon',
									handler	: function() {
										queryUserItem();
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
						stateId				: 'grid-uiuser'
					});
			store.load({
						params	: {
							start		: 0,
							limit		: bbar.pageSize,
							firstload	: 'true'
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

			// 高级查询
			function advancedQuery() {
				infoMsg('高级查询属于自定义查询，需要用户告知开发者所需功能才可进行添加。');
			}

			grid.on('sortchange', function() {
						// grid.getSelectionModel().selectFirstRow();
					});
			grid.on("cellclick", function(grid, rowIndex, columnIndex, e) {
						var store = grid.getStore();
						var record = store.getAt(rowIndex);
						var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
						if (fieldName == 'userid' && columnIndex == 1) {
							userid = record.get('userid');
							userGrantWindow.show();
							// menuTreePanel.root.select();
						}
					});

			bbar.on("change", function() {
						// grid.getSelectionModel().selectFirstRow();
					});

			var viewport = new Ext.Viewport({
						layout	: 'border',
						items	: [{
									title		: '<span class="commoncss">组织机构</span>',
									iconCls		: 'chart_organisationIcon',
									tools		: [{
												id		: 'refresh',
												handler	: function() {
													deptTree.root.reload();
												}
											}],
									collapsible	: true,
									width		: 260,
									minSize		: 160,
									maxSize		: 280,
									split		: true,
									region		: 'west',
									autoScroll	: true,
									// collapseMode:'mini',
									items		: [deptTree]
								}, grid]
					});

			/**
			 * 根据条件查询人员
			 */
			function queryUserItem() {
				var selectModel = deptTree.getSelectionModel();
				var selectNode = selectModel.getSelectedNode();
				var deptid = selectNode.attributes.id;
				store.load({
							params	: {
								start		: 0,
								limit		: bbar.pageSize,
								queryParam	: Ext.getCmp('queryParam').getValue(),
								deptid		: deptid
							}
						});
			}

			var cm_part = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(), {
						header		: '<span style="color:blue">授权</span>',
						dataIndex	: 'partauthtype',
						width		: 80,
						renderer	: PARTAUTHTYPERender,
						editor		: new Ext.grid.GridEditor(new Ext.form.ComboBox({
									store			: PARTAUTHTYPEStore,
									mode			: 'local',
									triggerAction	: 'all',
									emptyText		: '请选择...',
									valueField		: 'value',
									displayField	: 'text',
									allowBlank		: false,
									forceSelection	: true,
									editable		: false,
									typeAhead		: true
								}))
					}, {
						header		: '元素Dom标识',
						dataIndex	: 'cmpid',
						sortable	: true,
						width		: 130

					}, {
						header		: '元素类型',
						dataIndex	: 'cmptype',
						width		: 100,
						renderer	: CMPTYPERender
					}, {
						header		: '托管页面功能菜单',
						dataIndex	: 'menuname',
						width		: 160
					}, {
						header		: '元素编号',
						dataIndex	: 'partid',
						hidden		: true
					}, {
						header		: '元素描述',
						dataIndex	: 'remark',
						id			: 'remark',
						width		: 200
					}, {
						header		: '菜单编号',
						dataIndex	: 'menuid',
						hidden		: true
					}, {
						header		: '人员编号',
						dataIndex	: 'userid',
						hidden		: true
					}, {
						header		: '授权编号',
						dataIndex	: 'authorizeid',
						hidden		: true
					}]);

			var store_part = new Ext.data.Store({
						pruneModifiedRecords	: true,
						proxy					: new Ext.data.HttpProxy({
									url	: 'userPart.do?code=queryParts'
								}),
						reader					: new Ext.data.JsonReader({
									totalProperty	: 'TOTALCOUNT',
									root			: 'ROOT'
								}, [{
											name	: 'partid'
										}, {
											name	: 'menuid'
										}, {
											name	: 'cmpid'
										}, {
											name	: 'cmptype'
										}, {
											name	: 'menuname'
										}, {
											name	: 'remark'
										}, {
											name	: 'partauthtype'
										}, {
											name	: 'authorizeid'
										}, {
											name	: 'userid'
										}])
					});

			store_part.on('beforeload', function() {
						this.baseParams = {
						// menuid : menuid,
						// userid : userid
						};
					});
			store_part.on('load', function() {
						if (store_part.getTotalCount() == 0) {
							Ext.getCmp('id_save').setDisabled(true);
						} else {
							Ext.getCmp('id_save').setDisabled(false);
						}

					});

			var grid_part = new Ext.grid.EditorGridPanel({
						title				: '<span class="commoncss">托管UI元素列表</span>',
						height				: 500,
						autoScroll			: true,
						region				: 'center',
						store				: store_part,
						loadMask			: {
							msg	: '正在加载表格数据,请稍等...'
						},
						stripeRows			: true,
						frame				: true,
						cm					: cm_part,
						autoExpandColumn	: 'remark',
						clicksToEdit		: 1,
						tbar				: [{
									text	: '保存',
									iconCls	: 'acceptIcon',
									id		: 'id_save',
									handler	: function() {
										if (runMode == '0') {
											infoMsgClick('应用授权不可用，请联系开发人员输入购买的授权密码，您目前只能进行查询操作！');
											return;
										}
										saveData();
									}
								}, '-', {
									text	: '刷新',
									iconCls	: 'arrow_refreshIcon',
									handler	: function() {
										store_part.reload();
									}
								}, '-', '提示:挂起状态=取消授权']
					});
			var root = new Ext.tree.AsyncTreeNode({
						text		: root_menuname,
						expanded	: true,
						id			: '01'
					});

			var menuTreePanel = new Ext.tree.TreePanel({
						loader		: new Ext.tree.TreeLoader({
									baseAttrs	: {},
									dataUrl		: 'part.do?code=queryMenuItems'
								}),
						root		: root,
						title		: '<span class="commoncss">功能菜单</span>',
						region		: 'west',
						split		: true,
						width		: 220,
						minSize		: 180,
						maxSize		: 300,
						collapsible	: true,
						autoScroll	: true,
						animate		: false
					});

			menuTreePanel.on('click', function(node) {
						if (!node.isLeaf()) {
							return;
						}
						menuid = node.id;
						store_part.load({
									params	: {
										start	: 0,
										limit	: 50,
										menuid	: menuid,
										userid	: userid
									}
								});
					});

			var userGrantWindow = new Ext.Window({
						layout			: 'border',
						width			: document.body.clientWidth - 100,
						height			: document.body.clientHeight - 50,
						resizable		: true,
						draggable		: true,
						closeAction		: 'hide',
						title			: '<span class="commoncss">UI元素人员授权</span>',
						iconCls			: 'app_rightIcon',
						modal			: true,
						collapsible		: true,
						maximizable		: true,
						animateTarget	: document.body,
						// //如果使用autoLoad,建议不要使用动画效果
						buttonAlign		: 'right',
						constrain		: true,
						border			: false,
						items			: [menuTreePanel, grid_part],
						buttons			: [{
									text	: '关闭',
									iconCls	: 'deleteIcon',
									handler	: function() {
										userGrantWindow.hide();
									}
								}]
					});

			userGrantWindow.on('show', function() {
						menuTreePanel.getRootNode().reload();
						menuTreePanel.root.select();
						store_part.removeAll();
						Ext.getCmp('id_save').setDisabled(true);
					});

			function saveData() {
				var m = store_part.modified.slice(0);
				if (Ext.isEmpty(m)) {
					infoMsg('检测到没有修改的数据，不需要保存!');
					return;
				}
				for (var i = 0; i < m.length; i++) {
					var record = m[i];
					var rowIndex = store.indexOfId(record.id);
					if (Ext.isEmpty(record.get('userid'))) {
						record.set('userid', userid);
					}
				}
				var jsonArray = [];
				Ext.each(m, function(item) {
							jsonArray.push(item.data);
						});

				Ext.Ajax.request({
							url		: 'userPart.do?code=savePartUserGrantDatas',
							success	: function(response) {
								var resultArray = Ext.util.JSON.decode(response.responseText);
								store_part.reload();
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

		});