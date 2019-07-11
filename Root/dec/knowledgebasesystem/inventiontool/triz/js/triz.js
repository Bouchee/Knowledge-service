/*
 * ! Ext JS Library 3.4.0 Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com http://www.sencha.com/license
 */
Ext.onReady(function() {

	Ext.QuickTips.init();

	// turn on validation errors beside the field globally
	Ext.form.Field.prototype.msgTarget = 'side';

	/*
	 * ====================================================================
	 * RadioGroup examples
	 * ====================================================================
	 */
	// NOTE: These radio examples use the exact same options as the checkbox
	// ones
	// above, so the comments will not be repeated. Please see comments above
	// for
	// additional explanation on some config options.
	var txtusername = {
		xtype : 'textarea',
		name : 'original problem',
		fieldLabel : '原始问题输入',
		height : 200,
		allowBlank : false,
		anchor : '100%',
		blankText : '请输入原始问题'
	};

	/*
	 * new Ext.form.textarea({ name : 'original problem', fieldLabel : '原始问题输入',
	 * height : 200, allowBlank : false, anchor : '100%', blankText : '请输入原始问题'
	 * });
	 */

	var radioGroup1 = {

		xtype : 'fieldset',
		title : '',
		autoHeight : true,
		items : [{
					xtype : 'radiogroup',
					fieldLabel : '改善参数',
					columns : 3,
					id : 'gscs',
					items : [{
								boxLabel : '运动物体的质量',
								name : 'rb-horiz',
								inputValue : 1
							}, {
								boxLabel : '静止物体的质量',
								name : 'rb-horiz',
								inputValue : 2
							}, {
								boxLabel : '运动物体的长度',
								name : 'rb-horiz',
								inputValue : 3
							}, {
								boxLabel : '静止物体的长度',
								name : 'rb-horiz',
								inputValue : 4
							}, {
								boxLabel : '运动物体的面积',
								name : 'rb-horiz',
								inputValue : 5
							}, {
								boxLabel : '静止物体的面积',
								name : 'rb-horiz',
								inputValue : 6
							}, {
								boxLabel : '运动物体的体积',
								name : 'rb-horiz',
								inputValue : 7
							}, {
								boxLabel : '静止物体的体积',
								name : 'rb-horiz',
								inputValue : 8
							}, {
								boxLabel : '速度',
								name : 'rb-horiz',
								inputValue : 9
							}, {
								boxLabel : '力',
								name : 'rb-horiz',
								inputValue : 10
							}, {
								boxLabel : '应力或压强',
								name : 'rb-horiz',
								inputValue : 11
							}, {
								boxLabel : '形状',
								name : 'rb-horiz',
								inputValue : 12
							}, {
								boxLabel : '稳定性',
								name : 'rb-horiz',
								inputValue : 13
							}, {
								boxLabel : '强度',
								name : 'rb-horiz',
								inputValue : 14
							}, {
								boxLabel : '运动物体作用的时间',
								name : 'rb-horiz',
								inputValue : 15
							}, {
								boxLabel : '静止物体作用的时间',
								name : 'rb-horiz',
								inputValue : 16
							}, {
								boxLabel : '温度',
								name : 'rb-horiz',
								inputValue : 17
							}, {
								boxLabel : '照度',
								name : 'rb-horiz',
								inputValue : 18
							}, {
								boxLabel : '运动物体的能量消耗',
								name : 'rb-horiz',
								inputValue : 19
							}, {
								boxLabel : '静止物体的能量消耗',
								name : 'rb-horiz',
								inputValue : 20
							}, {
								boxLabel : '功率',
								name : 'rb-horiz',
								inputValue : 21
							}, {
								boxLabel : '能量损失',
								name : 'rb-horiz',
								inputValue : 22
							}, {
								boxLabel : '物质损失',
								name : 'rb-horiz',
								inputValue : 23
							}, {
								boxLabel : '信息损失',
								name : 'rb-horiz',
								inputValue : 24
							}, {
								boxLabel : '时间损失',
								name : 'rb-horiz',
								inputValue : 25
							}, {
								boxLabel : '物质或事物的数量',
								name : 'rb-horiz',
								inputValue : 26
							}, {
								boxLabel : '可靠性',
								name : 'rb-horiz',
								inputValue : 27
							}, {
								boxLabel : '测试精度',
								name : 'rb-horiz',
								inputValue : 28
							}, {
								boxLabel : '制造精度',
								name : 'rb-horiz',
								inputValue : 29
							}, {
								boxLabel : '作用于事物的有害因素',
								name : 'rb-horiz',
								inputValue : 30
							}, {
								boxLabel : '物体产生的有害因素',
								name : 'rb-horiz',
								inputValue : 31
							}, {
								boxLabel : '可制造性',
								name : 'rb-horiz',
								inputValue : 32
							}, {
								boxLabel : '操作流程的方便性',
								name : 'rb-horiz',
								inputValue : 33
							}, {
								boxLabel : '可维修性',
								name : 'rb-horiz',
								inputValue : 34
							}, {
								boxLabel : '适应性及通用性',
								name : 'rb-horiz',
								inputValue : 35
							}, {
								boxLabel : '系统的复杂性',
								name : 'rb-horiz',
								inputValue : 36
							}, {
								boxLabel : '控制和测量的复杂性',
								name : 'rb-horiz',
								inputValue : 37
							}, {
								boxLabel : '自动化程度',
								name : 'rb-horiz',
								inputValue : 38
							}, {
								boxLabel : '生产率',
								name : 'rb-horiz',
								inputValue : 39
							}]
				}]
	};

	var radioGroup2 = {

		xtype : 'fieldset',
		title : '',
		autoHeight : true,
		items : [{
					xtype : 'radiogroup',
					fieldLabel : '恶化参数',
					id : 'ehcs',
					columns : 3,
					items : [{
								boxLabel : '运动物体的质量',
								name : 'rb-horiz1',
								inputValue : 1
							}, {
								boxLabel : '静止物体的质量',
								name : 'rb-horiz1',
								inputValue : 2
							}, {
								boxLabel : '运动物体的长度',
								name : 'rb-horiz1',
								inputValue : 3
							}, {
								boxLabel : '静止物体的长度',
								name : 'rb-horiz1',
								inputValue : 4
							}, {
								boxLabel : '运动物体的面积',
								name : 'rb-horiz1',
								inputValue : 5
							}, {
								boxLabel : '静止物体的面积',
								name : 'rb-horiz1',
								inputValue : 6
							}, {
								boxLabel : '运动物体的体积',
								name : 'rb-horiz1',
								inputValue : 7
							}, {
								boxLabel : '静止物体的体积',
								name : 'rb-horiz1',
								inputValue : 8
							}, {
								boxLabel : '速度',
								name : 'rb-horiz1',
								inputValue : 9
							}, {
								boxLabel : '力',
								name : 'rb-horiz1',
								inputValue : 10
							}, {
								boxLabel : '应力或压强',
								name : 'rb-horiz1',
								inputValue : 11
							}, {
								boxLabel : '形状',
								name : 'rb-horiz1',
								inputValue : 12
							}, {
								boxLabel : '稳定性',
								name : 'rb-horiz1',
								inputValue : 13
							}, {
								boxLabel : '强度',
								name : 'rb-horiz1',
								inputValue : 14
							}, {
								boxLabel : '运动物体作用的时间',
								name : 'rb-horiz1',
								inputValue : 15
							}, {
								boxLabel : '静止物体作用的时间',
								name : 'rb-horiz1',
								inputValue : 16
							}, {
								boxLabel : '温度',
								name : 'rb-horiz1',
								inputValue : 17
							}, {
								boxLabel : '照度',
								name : 'rb-horiz1',
								inputValue : 18
							}, {
								boxLabel : '运动物体的能量消耗',
								name : 'rb-horiz1',
								inputValue : 19
							}, {
								boxLabel : '静止物体的能量消耗',
								name : 'rb-horiz1',
								inputValue : 20
							}, {
								boxLabel : '功率',
								name : 'rb-horiz1',
								inputValue : 21
							}, {
								boxLabel : '能量损失',
								name : 'rb-horiz1',
								inputValue : 22
							}, {
								boxLabel : '物质损失',
								name : 'rb-horiz1',
								inputValue : 23
							}, {
								boxLabel : '信息损失',
								name : 'rb-horiz1',
								inputValue : 24
							}, {
								boxLabel : '时间损失',
								name : 'rb-horiz1',
								inputValue : 25
							}, {
								boxLabel : '物质或事物的数量',
								name : 'rb-horiz1',
								inputValue : 26
							}, {
								boxLabel : '可靠性',
								name : 'rb-horiz1',
								inputValue : 27
							}, {
								boxLabel : '测试精度',
								name : 'rb-horiz1',
								inputValue : 28
							}, {
								boxLabel : '制造精度',
								name : 'rb-horiz1',
								inputValue : 29
							}, {
								boxLabel : '作用于事物的有害因素',
								name : 'rb-horiz1',
								inputValue : 30
							}, {
								boxLabel : '物体产生的有害因素',
								name : 'rb-horiz1',
								inputValue : 31
							}, {
								boxLabel : '可制造性',
								name : 'rb-horiz1',
								inputValue : 32
							}, {
								boxLabel : '操作流程的方便性',
								name : 'rb-horiz1',
								inputValue : 33
							}, {
								boxLabel : '可维修性',
								name : 'rb-horiz1',
								inputValue : 34
							}, {
								boxLabel : '适应性及通用性',
								name : 'rb-horiz1',
								inputValue : 35
							}, {
								boxLabel : '系统的复杂性',
								name : 'rb-horiz1',
								inputValue : 36
							}, {
								boxLabel : '控制和测量的复杂性',
								name : 'rb-horiz1',
								inputValue : 37
							}, {
								boxLabel : '自动化程度',
								name : 'rb-horiz1',
								inputValue : 38
							}, {
								boxLabel : '生产率',
								name : 'rb-horiz1',
								inputValue : 39
							}]
				}]
	};

	var panel_standard = new Ext.Panel({
				title : '问题标准化',
				/*
				 * width : 400, height : 200,
				 */
				anchor : '100%',
				layout : 'column',
				defaults : { // 设置没一列的子元素的默认配置
					layout : 'anchor',
					defaults : {
						anchor : '100%'
					}
				},
				items : [{
							columnWidth : 5 / 10, // 设置列的宽度
							items : [radioGroup1]
						}, {
							columnWidth : 5 / 10,
							items : [radioGroup2]
						}]

			});

	/*
	 * listeners: { click:function(node) { var id = node.id; Ext.Ajax.request( {
	 * url:"", method:"post", timeout:60000, success:function(response) { var
	 * res = response.responseText; Ext.getCmp("小提示文本域组件id").setValue(res);; },
	 * params: { iarg0:id } }); } }
	 */

	var form1 = new Ext.form.FormPanel({
		id : 'form1',
		baseCls : 'x-plain',
		labelWidth : 55,
		url : 'save-form.php',
		defaultType : 'textfield',

		items : [new Ext.Toolbar.TextItem({
			text : '<span style="font-size:18px; font-weight:bold;">建议使用如下发明原理解决问题</span>',
			autoHeight : true
		}), {
			xtype : 'textarea',
			id : "fmyl",
			hideLabel : true,
			name : 'msg',
			anchor : '100% -53' // anchor width by
				// percentage and height
				// by raw
				// adjustment
			}]
	});

	var window1 = new Ext.Window({
				id : 'windows1',
				title : '发明原理',
				width : 400,
				height : 400,
				closeAction: "hide",
				minWidth : 300,
				minHeight : 100,
				// x: 0,
				// y: 0,
				layout : 'fit',
				plain : true,
				bodyStyle : 'padding:5px;',
				buttonAlign : 'center',
				items : form1,

				buttons : [/*
							 * { text : '保存', id : 'savebtn1', iconCls :
							 * 'acceptIcon1', handler : function() { } },
							 */{
							text : '确认',
							id : 'cancelbtn1',
							iconCls : 'cancelIcon1',
							handler : function() {
								//window1.close();
								window1.hide(); 
							}
						}]
			});
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
	// combine all that into one huge form
	var fp = new Ext.FormPanel({
				title : '冲突解决方式',
				frame : true,
				anchor : '100%',
				id : 'card4',
				// labelWidth : 110,
				// width : 600,
				renderTo : 'form-ct',
				bodyStyle : 'padding:0 10px 0;',
				buttonAlign : "center",
				items : [txtusername, panel_standard, {
							id : 'boxid15',
							xtype : 'box',
							autoEl : {
								tag : 'img',
								style : 'width:100%;height:400;',
								src : 'dec/combo/alter/new/triz.png'
							}
						}],
				buttons : [{
							text : '确定',
							handler : function() {

								var gscsmc = Ext.getCmp("gscs").getValue().boxLabel;
								var ehcsmc = Ext.getCmp("ehcs").getValue().boxLabel;
								Ext.Ajax.request({
											url : "triz.do?code=queryFamingyuanli",
											method : "post",
											timeout : 60000,
											success : function(response) {
												var res = Ext.decode(response.responseText);
												Ext.getCmp("fmyl")
														.setValue(res.ROOT[0].fmyljtnr);
											},
											params : {
												gscsmc : gscsmc,
												ehcsmc : ehcsmc
											}
										});

								window1.show();
							}
						}, {
							text : '重置',
							handler : function() {
								fp.getForm().reset();
							}
						}, {
							text : '下一步',
							handler : function() {
								window2.show();
							}
						}]
			});
		/*
		 * var luowenguigeDisplayWin = new Ext.Window( { //title : '选择助手',
		 * id:'luowenguigeDisplayWinid',
		 * x:((document.body.clientWidth)/numlign-divnum)*3+400,
		 * y:(document.body.clientWidth)*(1/11), width : 200, //modal : true,
		 * height : 200, frame:false, bodyBorder :false, //baseCls:
		 * 'my-panel-no-border', //baseCls: 'x-plain', border:false, closeAction :
		 * 'hide', maximizable : false, closable:false, // plain : true,
		 * 
		 * 
		 * items: [ { id: 'boxid15', xtype : 'box', autoEl : { tag : 'img',
		 * style : 'width:100%;height:100%;' , src :
		 * 'dec/combo/alter/new/gongsi_luowenguige.png' } } ],
		 * 
		 */

		/*
		 * // card var cardNav = function(incr) { var l =
		 * Ext.getCmp('cardPanel').getLayout(); var i =
		 * l.activeItem.id.split('card')[1]; var next = parseInt(i, 10) + incr;
		 * l.setActiveItem(next); // Ext.getCmp('cardPrev').setDisabled(next ===
		 * 0); // Ext.getCmp('cardNext').setDisabled(next === 2); };
		 * 
		 * var panel = new Ext.Panel({ title : 'TRIZ', renderTo : 'form-ct', //
		 * renderTo :Ext.getBody(), //width : 400, //height : 300, //
		 * width:parent.width, // height:parent.height, layout : 'card',
		 * activeItem : 1, // 默认活动项 id : 'cardPanel', buttonAlign : 'center',
		 * items : [ { id : 'card0', title : '面板1', xtype : "panel", html :
		 * "子元素1" }, { id : 'card2', title : '面板3', xtype : "panel", html :
		 * "子元素3" }, { id : 'card3', title : '面板4', xtype : "panel", html :
		 * "子元素4" },fp, { id : 'card5', title : '面板5', xtype : "panel", layout :
		 * "fit", html : "子元素4" }], bbar : [{ id : 'cardPrev', text : '« 前一步',
		 * handler : function() { window1.show(); } }, { id : 'cardNext', text :
		 * '后一步 »', handler : function() { cardNav(0); } }, { text : '重置',
		 * handler : function() { fp.getForm().reset(); } }] });
		 */

});