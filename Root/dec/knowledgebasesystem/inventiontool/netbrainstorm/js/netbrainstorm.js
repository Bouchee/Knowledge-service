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
					text : '<span style="font-size:18px; font-weight:bold;">组员1的提议</span>',
					autoHeight : true
				}),{
					xtype : 'textarea',
					id:"zhuyuan1",
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
					text : '<span style="font-size:18px; font-weight:bold;">组员2的提议</span>',
					autoHeight : true
				}),{
					xtype : 'textarea',
					id : "zhuyuan2",
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
					text : '<span style="font-size:18px; font-weight:bold;">组员3的提议</span>',
					autoHeight : true
				}),{
					xtype : 'textarea',
					id :"zhuyuan3",
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
					text : '<span style="font-size:18px; font-weight:bold;">组员4的提议</span>',
					autoHeight : true
				}),{
					xtype : 'textarea',
					id :"zhuyuan4",
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
					text : '<span style="font-size:18px; font-weight:bold;">组员5的提议</span>',
					autoHeight : true
				}),{
					xtype : 'textarea',
					id :"zhuyuan5",
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
					text : '<span style="font-size:18px; font-weight:bold;">组员6的提议</span>',
					autoHeight : true
				}),{
					xtype : 'textarea',
					id :"zhuyuan6",
					hideLabel : true,
					name : 'msg',
					anchor : '100% -53' // anchor width by
										// percentage and height
										// by raw
					// adjustment
			}]
	});

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
		title : '组员1',
		width : 400,
		height : 200,
		minWidth : 200,
		minHeight : 100,
		/*
		 * x: 0, y: 0,
		 */
		layout : 'fit',
		plain : true,
		bodyStyle : 'padding:5px;',
		// buttonAlign : 'center',
		items : form1
	});

	var window2 = new Ext.Panel({
		id : 'windows2',
		title : '组员2',
		width : 400,
		height : 200,
		minWidth : 200,
		minHeight : 100,
		/*
		 * x: 0, y: 0,
		 */
		plain : true,
		bodyStyle : 'padding:5px;',
		layout : 'fit',
// buttonAlign : 'center',
		items : form2
	});

	var window3 = new Ext.Panel({
		id : 'windows3',
		title : '组员3',
		width : 400,
		height : 200,
		minWidth : 200,
		minHeight : 100,
		/*
		 * x: 0, y: 0,
		 */
		plain : true,
		bodyStyle : 'padding:5px;',
		layout : 'fit',
// buttonAlign : 'center',
		items : form3
	});

	var window4 = new Ext.Panel({
		id : 'windows4',
		title : '组员4',
		width : 400,
		height : 200,
		minWidth : 200,
		minHeight : 100,
		/*
		 * x: 0, y: 0,
		 */
		layout : 'fit',
		plain : true,
		bodyStyle : 'padding:5px;',
// buttonAlign : 'center',
		items : form4
	});

	var window5 = new Ext.Panel({
		id : 'windows5',
		title : '组员5',
		width : 400,
		height : 200,
		minWidth : 200,
		minHeight : 100,
		/*
		 * x: 0, y: 0,
		 */
		layout : 'fit',
		plain : true,
		bodyStyle : 'padding:5px;',
// buttonAlign : 'center',
		items : form5
	});

	
	var window6 = new Ext.Panel({
		id : 'windows6',
		title : '组员6',
		width : 400,
		height : 200,
		minWidth : 200,
		minHeight : 100,
		/*
		 * x: 0, y: 0,
		 */
		layout : 'fit',
		plain : true,
		bodyStyle : 'padding:5px;',
// buttonAlign : 'center',
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
					//	height : document.body.clientHeight,
					//	width : document.body.clientWidth,
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
			                })/*
								 * , buttons : [{ text : '保存', id : 'savebtn',
								 * iconCls : 'acceptIcon', handler : function() {
								 * if (runMode == '0') {
								 * infoMsgClick('应用授权不可用，请联系开发人员输入购买的授权密码，您目前只能进行查询操作！');
								 * return; } var mode =
								 * Ext.getCmp('windowmode').getValue(); if (mode ==
								 * 'add') submitForm1(); else updateForm(); } }, {
								 * text : '取消', id : 'cancelbtn', iconCls :
								 * 'cancelIcon', handler : function() {
								 * form1.form.reset(); form2.form.reset();
								 * form3.form.reset(); form4.form.reset();
								 * form5.form.reset(); form6.form.reset();
								 * window1.hide(); } },{ text : '下一步', id :
								 * 'nextbtn', iconCls : 'acceptIcon', handler :
								 * function() {
								 * window.document.getElementById("mainTabs").window.parent.addTab('scientific_effect.do?code=init','科学效应','01100409','系统主页 →
								 * 知识平台 → 切削知识库 → 科学效应','images.png'); } }]
								 */
					});
		
			var form9 = new Ext.form.FormPanel({
			 	region: 'south',
			 	height: 400,
			 	// width: '1600',
		        baseCls: 'x-plain',
		        labelWidth: 55,
		        url: 'save-form.php',// 需要修改地址
		        xtype: 'textarea',
	            fieldLabel: 'Message text',
	            hideLabel: true,
	            name: 'msg',
	            flex: 1 ,
	            items:[{
		            xtype: 'label',
		            text: '创新想法'
		        },
	             {
		            xtype: 'textarea',
		            id:'inventidea_netbrainstorm',
		            fieldLabel: 'Message text',
		            hideLabel: true,
		            height:'380',
		            width: '100%',
		            collapsible: true,
		            split: true,
		            name: 'msg',
		            flex: 1 
		        }]
		       });
			
			// 保存
			function submitForm() {
			/*
			 * if (!addItemForm.getForm().isValid()) {
			 * warningMsg('必填项未填写，或填写格式不正确，请检查窗口红色标示的区域!'); return; }
			 */
			form1.form.submit({
					url				: 'netbrainstorm.do?code=saveNetbrainstorm',
					waitTitle		: '提示',
					method			: 'POST',
					submitEmptyText	: false,
					waitMsg			: '正在处理数据,请稍候...',
					success			: function(form, action) {
				/* store.reload(); */
						infoMsg(action.result.msg);
			/* window1.hide(); */
					},
					failure			: function(form, action) {
						warningMsg('数据保存失败,错误类型: ' + action.failureType);
					},
					params			: {
						zhuyuan1 : document.getElementById("zhuyuan1").value,
						zhuyuan2 : document.getElementById("zhuyuan2").value,
						zhuyuan3 : document.getElementById("zhuyuan3").value,
						zhuyuan4 : document.getElementById("zhuyuan4").value,
						zhuyuan5 : document.getElementById("zhuyuan5").value,
						zhuyuan6 : document.getElementById("zhuyuan6").value,
						inventidea_netbrainstorm : document.getElementById("inventidea_netbrainstorm").value
						
					}
				});
			}
			var window2 = new Ext.Window({
				id : 'window2',
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
			var window_netbrainstorm = new Ext.Panel({

	                    renderTo: 'form-ctnetbrainstorm',
	                    layout: 'anchor', 
	            		items : [window7,form9],
	            		buttonAlign : 'center',
	                buttons : [{
	            		text	: '保存',
	            		id		: 'savebtn',
	            		iconCls	: 'acceptIcon',
	            		handler	: function() {
	            			submitForm();
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
	            		}
	            	},{
	            		text	: '下一步',
	            		id		: 'nextbtn',
	            		iconCls	: 'acceptIcon',
	            		handler	: function() {
	            			window2.show();
	            		}
	            	}]
			});
			

		});