/*
 * ! Ext JS Library 3.4.0 Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com http://www.sencha.com/license
 */
Ext.onReady(function() {
	// 5w1h法的5个窗口表单
	var form1 = new Ext.form.FormPanel({
		id : 'form1',
		baseCls : 'x-plain',
		labelWidth : 55,
		url : 'save-form.php',
		defaultType : 'textfield',

		items : [new Ext.Toolbar.TextItem({
					text : '<span style="font-size:18px; font-weight:bold;">为什么干这件事？（目的）</span>',
					autoHeight : true
				}),{
					xtype : 'textarea',
					id:"enlarge",
					hideLabel : true,
					name : 'msg',
					anchor : '100% -53' // anchor width by
										// percentage and height
										// by raw
					// adjustment
			}]
	});

	var form2 = new Ext.form.FormPanel({
		id : 'form2',
		baseCls : 'x-plain',
		labelWidth : 55,
		url : 'save-form.php',
		defaultType : 'textfield',

		items : [new Ext.Toolbar.TextItem({
					text : '<span style="font-size:18px; font-weight:bold;">怎么回事？（对象）</span>',
					autoHeight : true
				}),{
					xtype : 'textarea',
					id : "method",
					hideLabel : true,
					name : 'msg',
					anchor : '100% -53' // anchor width by
										// percentage and height
										// by raw
					// adjustment
			}]
	});

	var form3 = new Ext.form.FormPanel({
		id : 'form3',
		baseCls : 'x-plain',
		labelWidth : 55,
		url : 'save-form.php',
		defaultType : 'textfield',

		items : [new Ext.Toolbar.TextItem({
					text : '<span style="font-size:18px; font-weight:bold;">在什么地方执行？（地点）</span>',
					autoHeight : true
				}),{
					xtype : 'textarea',
					id :"keyp",
					hideLabel : true,
					name : 'msg',
					anchor : '100% -53' // anchor width by
										// percentage and height
										// by raw
					// adjustment
			}]
	});
	var form4 = new Ext.form.FormPanel({
		id : 'form4',
		baseCls : 'x-plain',
		labelWidth : 55,
		url : 'save-form.php',
		defaultType : 'textfield',

		items : [new Ext.Toolbar.TextItem({
					text : '<span style="font-size:18px; font-weight:bold;">什么时间执行？什么时间完成？（时间）</span>',
					autoHeight : true
				}),{
					xtype : 'textarea',
					id :"prevent",
					hideLabel : true,
					name : 'msg',
					anchor : '100% -53' // anchor width by
										// percentage and height
										// by raw
					// adjustment
			}]
	});
	var form5 = new Ext.form.FormPanel({
		id : 'form5',
		baseCls : 'x-plain',
		labelWidth : 55,
		url : 'save-form.php',
		defaultType : 'textfield', 

		items : [new Ext.Toolbar.TextItem({
					text : '<span style="font-size:18px; font-weight:bold;">由谁执行？（人员）</span>',
					autoHeight : true
				}),{
					xtype : 'textarea',
					id :"reduce",
					hideLabel : true,
					name : 'msg',
					anchor : '100% -53' // anchor width by
										// percentage and height
										// by raw
					// adjustment
			}]
	});

	var form6 = new Ext.form.FormPanel({
		id : 'form6',
		baseCls : 'x-plain',
		labelWidth : 55,
		url : 'save-form.php',
		defaultType : 'textfield', 

		items : [new Ext.Toolbar.TextItem({
					text : '<span style="font-size:18px; font-weight:bold;">怎样执行？采取那些有效措施？（方法）</span>',
					autoHeight : true
				}),{
					xtype : 'textarea',
					id :"how",
					hideLabel : true,
					name : 'msg',
					anchor : '100% -53' // anchor width by
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
				enlarge : document.getElementById("enlarge").value,
				method : document.getElementById("method").value,
				prevent : document.getElementById("prevent").value,
				reduce : document.getElementById("reduce").value,
				keyp : document.getElementById("keyp").value,
				how : document.getElementById("how").value
				/*,
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
		id : 'windows1',
		title : '第一步',
		width : 400,
		height : 200,
		minWidth : 200,
		minHeight : 100,
		/*x: 0,
	    y: 0,*/
		layout : 'fit',
		plain : true,
		bodyStyle : 'padding:5px;',
		//buttonAlign : 'center',
		items : form1
	});
	var window5 = new Ext.Panel({
		id : 'windows5',
		title : '第五步',
		width : 400,
		height : 200,
		minWidth : 200,
		minHeight : 100,
		/*x: 0,
	    y: 0,*/
		layout : 'fit',
		plain : true,
		bodyStyle : 'padding:5px;',
//		buttonAlign : 'center',
		items : form5
	});

	var window2 = new Ext.Panel({
		id : 'windows2',
		title : '第二步',
		width : 400,
		height : 200,
		minWidth : 200,
		minHeight : 100,
		/*x: 0,
	    y: 0,*/
		plain : true,
		bodyStyle : 'padding:5px;',
		layout : 'fit',
//		buttonAlign : 'center',
		items : form2
	});

	var window3 = new Ext.Panel({
		id : 'windows3',
		title : '第三步',
		width : 400,
		height : 200,
		minWidth : 200,
		minHeight : 100,
		/*x: 0,
	    y: 0,*/
		plain : true,
		bodyStyle : 'padding:5px;',
		layout : 'fit',
//		buttonAlign : 'center',
		items : form3
	});

	var window4 = new Ext.Panel({
		id : 'windows4',
		title : '第四步',
		width : 400,
		height : 200,
		minWidth : 200,
		minHeight : 100,
		/*x: 0,
	    y: 0,*/
		layout : 'fit',
		plain : true,
		bodyStyle : 'padding:5px;',
//		buttonAlign : 'center',
		items : form4
	});

	var window6 = new Ext.Panel({
		id : 'windows6',
		title : '第六步',
		width : 400,
		height : 200,
		minWidth : 200,
		minHeight : 100,
		/*x: 0,
	    y: 0,*/
		layout : 'fit',
		plain : true,
		bodyStyle : 'padding:5px;',
//		buttonAlign : 'center',
		items : form6
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

			var window7 = new Ext.Panel({

						region : 'center',
						id : 'tabsid',
						enableTabScroll : true,
						// autoWidth : true,
						activeTab : 0,
						height : document.body.clientHeight,
						width : document.body.clientWidth,
						buttonAlign : 'right',
						tbar : tbar,
						  buttonAlign : 'center',
			                layout: 'fit',
			                items:   new Ext.Panel({
			                    renderTo: Ext.getBody(),
			                    layout: 'table',
			                    id: 'demo-ct',
			                    border: false,
			                    layoutConfig: {
			                        columns: 3
			                    },
			                    items: [window1,window2,window3,window4,window5,window6
			                         ]
			                }),
			                buttons : [{
			            		text	: '保存',
			            		id		: 'savebtn',
			            		iconCls	: 'acceptIcon',
			            		handler	: function() {
			            			/*if (runMode == '0') {
			            				infoMsgClick('应用授权不可用，请联系开发人员输入购买的授权密码，您目前只能进行查询操作！');
			            				return;
			            			}
			            			var mode = Ext.getCmp('windowmode').getValue();
			            			if (mode == 'add')*/
			            				submitForm1();
			            			/*else
			            				updateForm();*/
			            		}
			            	}, {
			            		text	: '取消',
			            		id		: 'cancelbtn',
			            		iconCls	: 'cancelIcon',
			            		handler	: function() {
			            			form1.form.reset();
			            			form2.form.reset();
			            			form3.form.reset();
			            			form4.form.reset();
			            			form5.form.reset();
			            			form6.form.reset();
			            			/*window1.hide();*/
			            		}
			            	},{
			            		text	: '下一步',
			            		id		: 'nextbtn',
			            		iconCls	: 'acceptIcon',
			            		handler	: function() {
			            			 /*window.*//*document.getElementById("mainTabs").*/window.parent.addTab('Innovationtool.do?code=init','思维、模块、工具','01100409','系统主页 → 知识平台 → 切削知识库 → 创新工具','images.png');
			            		}
			            	}]
					});
		
			
			
			var viewport = new Ext.Viewport({
						layout : 'border',
						items : [window7]
					});
			viewport.doLayout();
		/*	window1.show();
			window2.show();
			window3.show();
			window4.show();
			window5.show();*/

		});