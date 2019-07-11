/*
 * ! Ext JS Library 3.4.0 Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com http://www.sencha.com/license
 */
Ext.onReady(function() {

			var form1 = new Ext.form.FormPanel({
						id : 'expenform1',
						baseCls : 'x-plain',
						labelWidth : 55,
						url : 'save-form.php',
						defaultType : 'textfield',
						layout : 'fit',
						items : [new Ext.Toolbar.TextItem({
									text : '<span style="font-size:18px; font-weight:bold;">通过思考为什么，你得到了扩大的问题:</span>',
									autoHeight : true
								}),{
									xtype : 'textarea',
									id:"expenenlarge",
									hideLabel : true,
									name : 'msg',
									width : '100%' // anchor width by
														// percentage and height
														// by raw
									// adjustment
							}]
					});

			var form2 = new Ext.form.FormPanel({
						id : 'expenform2',
						baseCls : 'x-plain',
						labelWidth : 55,
						url : 'save-form.php',
						defaultType : 'textfield',
						layout : 'fit',
						items : [new Ext.Toolbar.TextItem({
									text : '<span style="font-size:18px; font-weight:bold;">为什么要解决这个问题，有没有其他方法？</span>',
									autoHeight : true
								}),{
									xtype : 'textarea',
									id : "expenmethod",
									hideLabel : true,
									name : 'msg',
									
									width : '100%' // anchor width by
														// percentage and height
														// by raw
									// adjustment
							}]
					});
			
			var form3 = new Ext.form.FormPanel({
						id : 'expenform3',
						baseCls : 'x-plain',
						labelWidth : 55,
						url : 'save-form.php',
						defaultType : 'textfield',
						layout : 'fit',
						items : [new Ext.Toolbar.TextItem({
									text : '<span style="font-size:18px; font-weight:bold;">请输入要解决的核心问题:</span>',
									autoHeight : true
								}),{
									xtype : 'textarea',
									id :"expenkeyp",
									hideLabel : true,
									name : 'msg',
									width : '100%' // anchor width by
														// percentage and height
														// by raw
									// adjustment
							}]
					});
			var form4 = new Ext.form.FormPanel({
						id : 'expenform4',
						baseCls : 'x-plain',
						labelWidth : 55,
						url : 'save-form.php',
						defaultType : 'textfield',
						layout : 'fit',
						items : [new Ext.Toolbar.TextItem({
									text : '<span style="font-size:18px; font-weight:bold;">是什么阻止了我解决这个问题？</span>',
									autoHeight : true
								}),{
									xtype : 'textarea',
									id :"expenprevent",
									hideLabel : true,
									name : 'msg',
									width : '100%' // anchor width by
														// percentage and height
														// by raw
									// adjustment
							}]
					});
			var form5 = new Ext.form.FormPanel({
						id : 'expenform5',
						baseCls : 'x-plain',
						labelWidth : 55,
						url : 'save-form.php',
						defaultType : 'textfield', 
						layout : 'fit',
						items : [new Ext.Toolbar.TextItem({
									text : '<span style="font-size:18px; font-weight:bold;">通过思考怎么办，你得到了缩小的问题:</span>',
									autoHeight : true
								}),{
									xtype : 'textarea',
									id :"expenreduce",
									hideLabel : true,
									name : 'msg',
									width : '100%' // anchor width by
														// percentage and height
														// by raw
									// adjustment
							}]
					});

			// 保存
			function submitForm1() {
				/*if (!addItemForm.getForm().isValid()) {
					warningMsg('必填项未填写，或填写格式不正确，请检查窗口红色标示的区域!');
					return;
				}*/
				form1.form.submit({
							url				: 'expan.do?code=saveExpan',
							waitTitle		: '提示',
							method			: 'POST',
							submitEmptyText	: false,
							waitMsg			: '正在处理数据,请稍候...',
							success			: function(form, action) {
						/*		store.reload();*/
								infoMsg(action.result.msg);
					/*			window1.hide();*/
							},
							failure			: function(form, action) {
								warningMsg('数据保存失败,错误类型: ' + action.failureType);
							},
							params			: {
								enlarge1 : document.getElementById("enlarge").value/*,
							    enlarge : document.getElementById("enlarge").value*/
								
							}
						});
			}
			
			// 保存
			function submitForm2() {
				/*if (!addItemForm.getForm().isValid()) {
					warningMsg('必填项未填写，或填写格式不正确，请检查窗口红色标示的区域!');
					return;
				}*/
				form1.form.submit({
							url				: 'expan.do?code=saveMethod',
							waitTitle		: '提示',
							method			: 'POST',
							submitEmptyText	: false,
							waitMsg			: '正在处理数据,请稍候...',
							success			: function(form, action) {
						/*		store.reload();*/
								infoMsg(action.result.msg);
					/*			window1.hide();*/
							},
							failure			: function(form, action) {
								warningMsg('数据保存失败,错误类型: ' + action.failureType);
							},
							params			: {
								method : document.getElementById("method").value/*,
							    enlarge : document.getElementById("enlarge").value*/
								
							}
						});
			}

			// 保存
			function submitForm3() {
				/*if (!addItemForm.getForm().isValid()) {
					warningMsg('必填项未填写，或填写格式不正确，请检查窗口红色标示的区域!');
					return;
				}*/
				form1.form.submit({
							url				: 'expan.do?code=saveKeyp',
							waitTitle		: '提示',
							method			: 'POST',
							submitEmptyText	: false,
							waitMsg			: '正在处理数据,请稍候...',
							success			: function(form, action) {
						/*		store.reload();*/
								infoMsg(action.result.msg);
					/*			window1.hide();*/
							},
							failure			: function(form, action) {
								warningMsg('数据保存失败,错误类型: ' + action.failureType);
							},
							params			: {
								keyp : document.getElementById("keyp").value/*,
							    enlarge : document.getElementById("enlarge").value*/
								
							}
						});
			}
			

			// 保存
			function submitForm4() {
				/*if (!addItemForm.getForm().isValid()) {
					warningMsg('必填项未填写，或填写格式不正确，请检查窗口红色标示的区域!');
					return;
				}*/
				form1.form.submit({
							url				: 'expan.do?code=savePrevent',
							waitTitle		: '提示',
							method			: 'POST',
							submitEmptyText	: false,
							waitMsg			: '正在处理数据,请稍候...',
							success			: function(form, action) {
						/*		store.reload();*/
								infoMsg(action.result.msg);
					/*			window1.hide();*/
							},
							failure			: function(form, action) {
								warningMsg('数据保存失败,错误类型: ' + action.failureType);
							},
							params			: {
								prevent : document.getElementById("prevent").value/*,
							    enlarge : document.getElementById("enlarge").value*/
								
							}
						});
			}
			
			// 保存
			function submitForm5() {
				/*if (!addItemForm.getForm().isValid()) {
					warningMsg('必填项未填写，或填写格式不正确，请检查窗口红色标示的区域!');
					return;
				}*/
				form1.form.submit({
							url				: 'expan.do?code=saveReduce',
							waitTitle		: '提示',
							method			: 'POST',
							submitEmptyText	: false,
							waitMsg			: '正在处理数据,请稍候...',
							success			: function(form, action) {
						/*		store.reload();*/
								infoMsg(action.result.msg);
					/*			window1.hide();*/
							},
							failure			: function(form, action) {
								warningMsg('数据保存失败,错误类型: ' + action.failureType);
							},
							params			: {
								reduce : document.getElementById("reduce").value/*,
							    enlarge : document.getElementById("enlarge").value*/
								
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
							url				: 'threadblade.do?code=updateThreadblade',
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
							},
							params			: {
								compressflag	: figureRadio.getValue().inputValue,
								compressflag2	: figure2Radio.getValue().inputValue
							}
						});
				
				
			}
			
			var window1 = new Ext.Panel({
						id : 'expenwindows1',
						title : '第一步',
						width : "30%",
						height : 200,
						minWidth : 300,
						minHeight : 100,
					//	x: 0,
			        //  y: 0,
						/*layout : 'fit',
						plain : true,
						bodyStyle : 'padding:5px;',*/
						//layout : 'fit',
						buttonAlign : 'center',
						items : [form1],
						layout : 'fit',
						buttons : [{
							text	: '保存',
							id		: 'savebtn1',
							iconCls	: 'acceptIcon1',
							handler	: function() {
								/*if (runMode == '0') {
									infoMsgClick('应用授权不可用，请联系开发人员输入购买的授权密码，您目前只能进行查询操作！');
									return;
								}
								var mode = Ext.getCmp('windowmode').getValue();
								if (mode == 'add')*/

								 window1.parent.addTab('generalturning.do?code=init','普通车削','01030101','系统主页 → 功能菜单 → 车削系统管理 → 普通车削','putongchexiao.png');
									submitForm1();
								/*else
									updateForm();*/
							}
						}, {
							text	: '取消',
							id		: 'cancelbtn1',
							iconCls	: 'cancelIcon1',
							handler	: function() {
								form1.form.reset();
							/*	window1.hide();*/
							}
						}]
					});
			
			
			var window5 = new Ext.Panel({
						id : 'expenwindows5',
						title : '第二步',
						width : "30%",
						height : 200,
						minWidth : 300,
						minHeight : 100,
					//	x: 0,
			        //  y: 0,
						/*layout : 'fit',
						plain : true,
						bodyStyle : 'padding:5px;',*/
						buttonAlign : 'center',
						items : [form5],
						layout : 'fit',
						buttons : [{
							text	: '保存',
							id		: 'savebtn4',
							iconCls	: 'acceptIcon4',
							handler	: function() {
								/*if (runMode == '0') {
									infoMsgClick('应用授权不可用，请联系开发人员输入购买的授权密码，您目前只能进行查询操作！');
									return;
								}
								var mode = Ext.getCmp('windowmode').getValue();
								if (mode == 'add')*/
									submitForm5();
								/*else
									updateForm();*/
							}
						}, {
							text	: '取消',
							id		: 'cancelbtn4',
							iconCls	: 'cancelIcon4',
							handler	: function() {
								form5.form.reset();
								/*window1.hide();*/
							}
						}]
					});

			var window2 = new Ext.Panel({
						id : 'expenwindows2',
						title : '第三步',
						width : "30%",
						height : 200,
						minWidth : 300,
						minHeight : 100,
					//	x: 0,
			        //  y: 0,
						/*plain : true,
						bodyStyle : 'padding:5px;',
						buttonAlign : 'center',*/
						items : [form2],
						layout : 'fit',
						buttons : [{
							text	: '保存',
							id		: 'savebtn2',
							iconCls	: 'acceptIcon2',
							handler	: function() {
								/*if (runMode == '0') {
									infoMsgClick('应用授权不可用，请联系开发人员输入购买的授权密码，您目前只能进行查询操作！');
									return;
								}
								var mode = Ext.getCmp('windowmode').getValue();
								if (mode == 'add')*/
									submitForm2();
								/*else
									updateForm();*/
							}
						}, {
							text	: '取消',
							id		: 'cancelbtn2',
							iconCls	: 'cancelIcon2',
							handler	: function() {
								form2.form.reset();
								/*window1.hide();*/
							}
						}]
					});

			var window3 = new Ext.Panel({
						id : 'expenwindows3',
						title : '第四步',
						width : "30%",
						height : 200,
						minWidth : 300,
						minHeight : 100,
					//	x: 0,
			        //  y: 0,
						/*layout : 'fit',
						plain : true,
						bodyStyle : 'padding:5px;',*/
						buttonAlign : 'center',
						items : [form3],
						layout : 'fit',
						buttons : [{
							text	: '保存',
							id		: 'savebtn3',
							iconCls	: 'acceptIcon3',
							handler	: function() {
								/*if (runMode == '0') {
									infoMsgClick('应用授权不可用，请联系开发人员输入购买的授权密码，您目前只能进行查询操作！');
									return;
								}
								var mode = Ext.getCmp('windowmode').getValue();
								if (mode == 'add')*/
									submitForm3();
								/*else
									updateForm();*/
							}
						}, {
							text	: '取消',
							id		: 'cancelbtn3',
							iconCls	: 'cancelIcon3',
							handler	: function() {
								form3.form.reset();
								/*window1.hide();*/
							}
						}]
					});

			var window4 = new Ext.Panel({
						id : 'expenwindows4',
						title : '第五步',
						width : "30%",
						height : 200,
						minWidth : 300,
						minHeight : 100,
					//	x: 0,
			        //  y: 0,
						/*layout : 'fit',
						plain : true,
						bodyStyle : 'padding:5px;',*/
						buttonAlign : 'center',
						items : [form4],
						layout : 'fit',
						buttons : [{
							text	: '保存',
							id		: 'savebtn4',
							iconCls	: 'acceptIcon4',
							handler	: function() {
								/*if (runMode == '0') {
									infoMsgClick('应用授权不可用，请联系开发人员输入购买的授权密码，您目前只能进行查询操作！');
									return;
								}
								var mode = Ext.getCmp('windowmode').getValue();
								if (mode == 'add')*/
									submitForm4();
								/*else
									updateForm();*/
							}
						}, {
							text	: '取消',
							id		: 'cancelbtn4',
							iconCls	: 'cancelIcon4',
							handler	: function() {
								form4.form.reset();
								/*window1.hide();*/
							}
						}]
					});

			var tbar = new Ext.Toolbar({// workpiecematerialCombo
				// //workpieceisotypeCombo
				items : [new Ext.Toolbar.TextItem({
									text : '<span style="font-size:15px; font-weight:bold"> 请根据窗口提示输入并修改您需要解决的问题:</span>',
									autoHeight : true
								}), '->', {
							text : '重置',
							iconCls : 'tbar_synchronizeIcon',
							handler : function() {

							}
						}]
			});
			
			var expanidea = new Ext.form.FormPanel({
			 	region: 'south',
			 	height: 400,
			 	//width: '1600',
		        baseCls: 'x-plain',
		        labelWidth: 55,
		        url: 'save-form.php',//需要修改地址
		        xtype: 'textarea',
		        fieldLabel: 'Message text',
		        hideLabel: true,
		        name: 'msg',
		        flex: 1 ,
		       /* buttonAlign : 'center',
		        buttons : [{
					text : '进入工艺基本知识库',
					handler : function() {
						window.parent.addTab('workpiecematerial.do?code=init', '工件材料',
								'010204', '系统主页 → 功能菜单 → 通用信息管理 → 工件材料', 'images.png');
					}
				},{
					text : '进入工艺综合知识库',
					handler : function() {
						window.parent.addTab('workpiecematerial.do?code=init', '工件材料',
								'010204', '系统主页 → 功能菜单 → 通用信息管理 → 工件材料', 'images.png');
					}
				}],*/
		        items:[{
		            xtype: 'label',
		            text: '创新想法'
		        },
		         {
		            xtype: 'textarea',
		            fieldLabel: 'Message text',
		            id : "expanidea",
		            hideLabel: true,
		            height:'380',
		            width: '100%',
		            collapsible: true,
		            split: true,
		            name: 'msg',
		            flex: 1 
		        }]
		       });
			var nextwindow2 = new Ext.Window({
				id : 'nextwindow2',
				title : '工艺目标优化',
				width : 400,
				height : 0,
				closeAction: "hide",
				//minWidth : 300,
				//minHeight : 100,
				// x: 0,
				// y: 0,
				layout : 'fit',
				//plain : true,
				//bodyStyle : 'padding:5px;',
				buttonAlign : 'center',
				//items : form1,

				buttons : [{
							text : 'Yes',
							id : 'cancelbtn1',
							//iconCls : 'cancelIcon1',
							handler : function() {
								 window.parent.addTab('Processoptimization.do?code=init','5W1H法（工艺优化）','01100419','系统主页 → 知识平台 → 切削知识库 →5W1H法（工艺优化）','images.png');
							}
						},{
							text : 'No',
							id : 'cancelbtn2',
							//iconCls : 'cancelIcon1',
							handler : function() {
								window.parent.addTab('final.do?code=init','实施方案','01100421','系统主页 → 知识平台 → 切削知识库 →实施方案','images.png');
							}
						}]
			});
			var awindow = new Ext.Panel({
				       renderTo: "form-ct6",
						//region : 'center',
						id : 'tabsid',
						enableTabScroll : true,
						// autoWidth : true,
						activeTab : 0,
				//		height : document.body.clientHeight,
				//		width : document.body.clientWidth,
				/*		buttonAlign : 'right',*/
				//		tbar : tbar,
						buttonAlign : "center",
						
						
						items:[{
							
							layout: 'column',  
						    defaults: {                     //设置没一列的子元素的默认配置  
						        layout: 'anchor',  
						        defaults: {  
						            anchor: '100%'  ,
						    
						        }  
						    }, 
						   /* layoutConfig: {
		                        columns: 3
		                    },*/
							items:[window1,window5,window2,window3,window4]},expanidea],
			
			buttons : [{
				text : '下一步',
				handler : function() {
					nextwindow2.show();
				}
			}]
			
			
					});
		
			
			
			/*var viewport = new Ext.Viewport({
						layout : 'border',
						items : [window]
					});
			viewport.doLayout();*/
			/*window1.show();
			window2.show();
			window3.show();
			window4.show();
			window5.show();
*/
		});