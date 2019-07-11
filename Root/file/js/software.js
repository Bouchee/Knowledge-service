/**
 * 软件管理
 * 
 * @author fuxianwu
 * @since 2013-01-01
 */
Ext.onReady(function() {
			var mode = "http";

			// 复选框
			var sm = new Ext.grid.CheckboxSelectionModel();

			// 定义自动当前页行号
			var rownum = new Ext.grid.RowNumberer({
						header	: '序',
						width	: 26
					});

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
						width		: 20,
						hidden		: true
					}, {
						header		: '文件标题',
						dataIndex	: 'title',
						width		: 200,
						sortable	: true
					}, {
						header		: '文件大小',
						dataIndex	: 'filesize',
						id			: 'filesizeid',
						width		: 70,
						align		: 'right',
						sortable	: true,
						renderer	: function(value, cellmeta, record, rowIndex, columnIndex, store) {
							return Ext.util.Format.fileSize(value);
						}
					}, {
						header		: '存储路径',
						dataIndex	: 'path',
						width		: 300,
						hidden		: true,
						sortable	: true
					}, {
						header		: '文件类型',
						dataIndex	: 'filetype',
						width		: 60,
						align		: 'right',
						// hidden : true,
						sortable	: true
					}, {
						header		: '上传用户',
						dataIndex	: 'username',
						width		: 60,
						// hidden : true,
						sortable	: true
					}, {
						header		: '上传IP',
						dataIndex	: 'ip',
						width		: 100,
						// hidden : true,
						sortable	: true
					}, {
						header		: '上传时间',
						dataIndex	: 'submittime',
						width		: 100,
						// hidden : true,
						sortable	: true
					}, {
						header			: '文件描述',
						dataIndex		: 'remark',
						id				: 'remark',
						selectOnFocus	: true,
						width			: 300,
						editor			: new Ext.form.TextField({
									allowBlank	: true
								}),
						sortable		: true
					}]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.GroupingStore({
						proxy	: new Ext.data.HttpProxy({
									url	: 'software.do?code=querySoftware4Manage'
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
											name	: 'username'
										}, {
											name	: 'ip'
										}, {
											name	: 'submittime'
										}, {
											name	: 'remark'
										}])
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
						displayMsg	: '显示第 {0} 条到第 {1} 条, 共 {2} 条',
						plugins		: new Ext.ux.ProgressBarPager(), // 分页进度条
						emptyMsg	: "对不起, 没有符合条件的记录!",
						items		: ['-', '&nbsp;&nbsp;', pagesize_combo]
					});

			// 表格工具栏
			var tbar = new Ext.Toolbar({
						items	: [{
									text	: '上传',
									iconCls	: 'uploadIcon',
									handler	: function() {
										uploadHttp();
										// mode = 'http';
										// uploadWindow.show();
									}
								}, '-', {
									text	: '批量',
									iconCls	: 'uploadIcon',
									handler	: function() {
										uploadSwf();
									}
								}, '-', {
									text	: '下载',
									iconCls	: 'downloadIcon',
									handler	: function() {
										downloadFile();
									}
								}, '-', {
									text	: '删除',
									iconCls	: 'deleteIcon',
									handler	: function() {
										deleteInit();
									}
								}, '-', {
									text	: '保存',
									id		: 'saveid',
									iconCls	: 'page_delIcon',
									handler	: function() {
										saveEditorData();
									}
								}, '->', {
									xtype			: 'textfield',
									id				: 'inputname',
									name			: 'filetitle',
									cls				: 'search',
									emptyText		: '文件标题|文件描述',
									width			: 150,
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
							// labelField: 'name',
							// options : [{id:512000, name:'很小'}, {id:5242880, name:'较小'}, {id:52428800, name:'中等'}, {id:524288000, name:'较大'}, {id:1073741824, name:'很大'}],
							// phpMode : true,
							type		: 'string'
						}, {
							dataIndex	: 'filetype',
							type		: 'string'
						}, {
							dataIndex	: 'username',
							type		: 'string'
						}, {
							dataIndex	: 'ip',
							type		: 'string'
						}, {
							dataIndex	: 'submittime',
							type		: 'date'
						}, {
							dataIndex	: 'remark',
							type		: 'string'
						}]
			});

			// 表格实例
			var grid = new Ext.grid.EditorGridPanel({
						// title : '<span class="commoncss">文件列表</span>',
						height				: 500,
						header				: false,
						frame				: true,
						autoScroll			: true,
						region				: 'center', // 和VIEWPORT布局模型对应，充当center区域布局
						store				: store, // 数据存储
						stripeRows			: true, // 斑马线
						autoExpandColumn	: 'remark',
						cm					: cm, // 列模型
						sm					: sm, // 复选框
						clicksToEdit		: 1,
						tbar				: tbar, // 表格工具栏
						bbar				: bbar,// 分页工具栏
						viewConfig			: {
							forceFit	: true
							// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
						},
						loadMask			: {
							msg	: '正在加载表格数据,请稍等...'
						},
						view				: new Ext.grid.GroupingView(),
						plugins				: [filters],
						stateful			: sf,
						stateId				: 'grid-software'
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
							downloadIframe.src = 'software.do?code=downloadFile&fileid=' + fileid;
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
									text	: '上传',
									iconCls	: 'uploadIcon',
									handler	: function() {
										uploadHttp();
										// mode = 'http';
										// uploadWindow.show();
									}
								}, '-', {
									text	: '批量',
									iconCls	: 'uploadIcon',
									handler	: function() {
										uploadSwf();
									}
								}, '-', {
									text	: '下载',
									iconCls	: 'downloadIcon',
									handler	: function() {
										downloadFile();
									}
								}, '-', {
									text	: '删除',
									iconCls	: 'deleteIcon',
									handler	: function() {
										deleteInit();
									}
								}, {
									text	: '保存',
									iconCls	: 'page_delIcon',
									handler	: function() {
										saveEditorData();
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

			/*
			 * grid.on("afteredit", function(e){
			 * 
			 * var mr=store.getModifiedRecords();//获取所有更新过的记录 var recordCount=store.getCount();//获取数据集中记录的数量 if(mr.length == 0){ // 确认修改记录数量 infoMsg("您没有修改的数据需要保存！"); return; } var row =
			 * e.record;//获取被修改的行 var col = e.field;//获取被修改的列 var id = row.get('id'); if (col == "ad_jkrq"){ var lie = Ext.util.Format.date(row.get(col), "Y-m-d"); }else { var lie = r.get(l); }
			 * Ext.Ajax.request({ url: 'software.do?code=updateSoftware', success : function(response) { hideWaitMsg(); warningMsg("数据更新成功!"); }, failure : function(response) { hideWaitMsg();
			 * warningMsg("数据更新失败!"); }, params: { fileid : e.row.get('fileid'), field : e.field, value : e.value } }); });
			 */

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

			function uploadHttp() {
				var firstForm = new Ext.form.FormPanel({
							id			: 'firstForm',
							name		: 'firstForm',
							fileUpload	: true, // 一定要设置这个属性,否则获取不到上传对象的
							labelWidth	: 60,
							defaultType	: 'textfield',
							labelAlign	: 'right',
							bodyStyle	: 'padding:5 5 5 5',
							defaults	: {
								anchor		: '95%',
								labelStyle	: micolor,
								maxLength	: mlm,
								allowBlank	: false
							},
							items		: [{
										fieldLabel	: '选择文件',
										id			: 'file1',
										name		: 'file1', // 必须为file1/file2/file3/file4/file5.目前Web标准上传模式支持最多5个文件的批量上传
										// xtype : 'fileuploadfield', // 上传字段
										inputType	: 'file'
									}, {
										fieldLabel	: '文件标题',
										id			: 'title',
										name		: 'title',
										hidden		: true,
										hideLabel	: true,
										disabled	: true,
										fieldClass	: 'x-custom-field-disabled'
									}, {
										fieldLabel		: '文件描述',
										id				: 'remark',
										name			: 'remark',
										minLength		: 10,
										minLengthText	: '文件描述文字必须至少要20个字符（10个汉字）！',
										xtype			: 'textarea'
									}]
						});

				var uploadWindow = new Ext.Window({
							title			: '<span class="commoncss">文件上传</span>', // 窗口标题
							layout			: 'fit', // 设置窗口布局模式
							width			: 500, // 窗口宽度
							height			: 170, // 窗口高度
							closable		: true, // 是否可关闭
							collapsible		: false, // 是否可收缩
							maximizable		: false, // 设置是否可以最大化
							closeAction		: 'close',
							animCollapse	: true,
							animateTarget	: Ext.getBody(),
							border			: false, // 边框线设置
							constrain		: true, // 设置窗口是否可以溢出父容器
							// pageY : document.body.clientHeight / 2 - 170 / 2,//// pageY : 20, // 页面定位X坐标
							// pageX : document.body.clientWidth / 2 - 500 / 2, // 页面定位Y坐标
							items			: [firstForm], // 嵌入的表单面板
							buttons			: [{ // 窗口底部按钮配置
								text	: '上传', // 按钮文本
								iconCls	: 'uploadIcon', // 按钮图标
								handler	: function() { // 按钮响应函数
									if (runMode == '0') {
										infoMsgClick('应用授权不可用，请联系开发人员输入购买的授权密码，您目前只能进行查询操作！');
										return;
									}
									submitTheForm();
								}
							}, {	// 窗口底部按钮配置
										text	: '关闭', // 按钮文本
										iconCls	: 'acceptIcon', // 按钮图标
										handler	: function() { // 按钮响应函数
											uploadWindow.close();
										}
									}]
						});
				mode = 'http';
				uploadWindow.show();

				/**
				 * 表单提交(表单自带Ajax提交)
				 */
				function submitTheForm() {
					if (!firstForm.form.isValid()) {
						return;
					}
					if (mode == 'ftp') {
						// infoMsg('此演示需要FTP服务器配合,请直接查看后台代码.');
						// return;
					}
					var requesturl = 'software.do?code=doUpload';
					if (mode == 'ftp') {
						requesturl = 'software.do?code=doUploadByFtp';
					}
					firstForm.form.submit({
								url			: requesturl,
								waitTitle	: '提示',
								method		: 'POST',
								waitMsg		: '正在上传已添加的文件,请稍候...',
								timeout		: 600000, // 60s
								success		: function(form, action) {
									firstForm.destroy();
									uploadWindow.close();
									if (mode == 'http')
										store.reload();
									infoMsg(action.result.msg);

								},
								failure		: function(response) {
									infoMsg('对不起, 文件上传失败!');
								}
							});
				}

			}

			function uploadSwf() {
				// SWFUpload窗口
				var swfuploadWindow = new Ext.Window({
							title		: '<span class="commoncss">批量上传</span>',
							width		: 500,
							height		: 350,
							resizable	: false,
							layout		: 'fit',
							constrain	: true,
							closeAction	: 'close',
							maximizable	: true,
							listeners	: {
								'close'	: function(obj) {
									store.reload();
								}
							},
							items		: [{
										xtype					: 'uploadpanel',
										uploadUrl				: webContext + 'software.do?code=doUploadByFlash',
										filePostName			: 'swfUploadFile',
										flashUrl				: webContext + '/resource/myux/uploadpanel/swf/swfupload.swf',
										fileSize				: '2048MB',
										border					: false,
										fileTypes				: '*.*', // 在这里限制文件类型:'*.jpg,*.png,*.gif'
										fileTypesDescription	: '所有文件',
										postParams				: {
											postType	: 1
											// path : 'upload\\' //这只是个参数,由后台来读取;也可以直接由后台来分配路径
										}
									}]
						});
				swfuploadWindow.show();
			}

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

			// 获取选择行
			function getCheckboxValues() {
				// 返回一个行集合JS数组
				var rows = grid.getSelectionModel().getSelections();
				if (Ext.isEmpty(rows)) {
					infoMsg('您没有选中任何数据!');
					return;
				}
				// 将JS数组中的行级主键，生成以,分隔的字符串
				var strChecked = jsArray2JsString(rows, 'fileid');
				infoMsg(strChecked);
				// 获得选中数据后则可以传入后台继续处理
			}

			// 生成一个下载图标列
			function downloadColumnRender(value) {
				return "<a href='javascript:void(0);'><img src='" + webContext + "/resource/image/ext/download.png'/></a>";;
			}

			/**
			 * 删除文件
			 */
			function deleteInit() {
				var rows = grid.getSelectionModel().getSelections();
				if (Ext.isEmpty(rows)) {
					infoMsg('您没有选中任何条目，请先选中要删除的项目！');
					return;
				}
				if (runMode == '0') {
					infoMsgClick('应用授权不可用，请联系开发人员输入购买的授权密码，您目前只能进行查询操作！');
					return;
				}
				var strChecked = jsArray2JsString(rows, 'fileid');
				Ext.Msg.confirm('请确认', '确认要删除选中的文件吗?', function(btn, text) {
							if (btn == 'yes') {
								showWaitMsg();
								Ext.Ajax.request({
											url		: 'software.do?code=deleteSoftware',
											success	: function(response) {
												var resultArray = Ext.util.JSON.decode(response.responseText);
												infoMsg(resultArray.msg);
												store.reload();
											},
											failure	: function(response) {
												infoMsg("文件删除失败");
											},
											params	: {
												strChecked	: strChecked
											}
										});
							}
						});
			}

			function saveEditorData() {
				var m = store.modified.slice(0); // 获取修改过的record数组对象
				if (Ext.isEmpty(m)) {
					infoMsg('检测到没有修改的数据，不需要保存!');
					return;
				}
				var jsonArray = [];
				// 将record数组对象转换为简单Json数组对象
				Ext.each(m, function(item) {
							jsonArray.push(item.data);
						});
				// 提交到后台处理
				Ext.Ajax.request({
							url		: 'software.do?code=saveEditorData',
							success	: function(response) { // 回调函数有1个参数
								var resultArray = Ext.util.JSON.decode(response.responseText);
								infoMsg(resultArray.msg);
							},
							failure	: function(response) {
								infoMsg('数据保存失败!');
							},
							params	: {
								dirtydata	: Ext.encode(jsonArray)
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
				downloadIframe.src = 'software.do?code=downloadFile&fileid=' + fileid;
				downloadIframe.style.display = "none";
				document.body.appendChild(downloadIframe);

				// uploadWindow.show();
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