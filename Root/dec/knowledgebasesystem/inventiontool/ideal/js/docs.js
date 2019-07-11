/*
 * ! Ext JS Library 3.4.0 Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com http://www.sencha.com/license
 */
Ext.onReady(function() {

	var form1 = new Ext.form.FormPanel({
		id : 'form1',
		baseCls : 'x-plain',
		labelWidth : 55,
		url : 'save-form.php',
		defaultType : 'textfield',

		items : [new Ext.Toolbar.TextItem({
			text : '<span style="font-size:18px; font-weight:bold;">系统当前性能:</span>',
			autoHeight : true
		}), {
			xtype : 'textarea',
			hideLabel : true,
			name : 'msg',
			anchor : '100%-50' // anchor width by
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
			text : '<span style="font-size:18px; font-weight:bold;">系统理想性能:</span>',
			autoHeight : true
		}), {
			xtype : 'textarea',
			hideLabel : true,
			name : 'msg',
			anchor : '100%-50' // anchor width by
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
			text : '<span style="font-size:18px; font-weight:bold;">达到理想性能的可能性:</span>',
			autoHeight : true
		}), {
			xtype : 'textarea',
			hideLabel : true,
			name : 'msg',
			anchor : '100%-50' // anchor width by
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
			text : '<span style="font-size:18px; font-weight:bold;">达到理想性能的障碍:</span>',
			autoHeight : true
		}), {
			xtype : 'textarea',
			hideLabel : true,
			name : 'msg',
			anchor : '100%-50' // anchor width by
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
			text : '<span style="font-size:18px; font-weight:bold;">产生障碍的原因:</span>',
			autoHeight : true
		}), {
			xtype : 'textarea',
			hideLabel : true,
			name : 'msg',
			anchor : '100% ' // anchor width by
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
			text : '<span style="font-size:18px; font-weight:bold;">清除障碍的方法:</span>',
			autoHeight : true
		}), {
			xtype : 'textarea',
			hideLabel : true,
			name : 'msg',
			anchor : '100%-50' // anchor width by
				// percentage and height
				// by raw
				// adjustment
			}]
	});

	var window1 = new Ext.Panel({
				id : 'windows1w',
				title : 'Resize Me',
				width : '100%',
				height : '10%',
			//	minWidth : 800,
			//	minHeight : 200,
				layout : 'fit',
				plain : true,
				bodyStyle : 'padding:5px;',
				buttonAlign : 'center',
				items : form1,

				buttons : [{
							text : 'Save'
						}, {
							text : 'Cancel'
						}]
			});
	var window5 = new Ext.Panel({
				id : 'windows54',
				title : 'Resize Me',
					width : '100%',
				height : '10%',
			//	minWidth : 800,
			//	minHeight : 200,
				layout : 'fit',
				plain : true,
				bodyStyle : 'padding:5px;',
				buttonAlign : 'center',
				items : form5,

				buttons : [{
							text : 'Save'
						}, {
							text : 'Cancel'
						}]
			});

	var window2 = new Ext.Panel({
				id : 'windows29',
				title : 'Resize Me',
					width : '100%',
				height : '10%',
			//	minWidth : 800,
			//	minHeight : 200,
				layout : 'fit',
				plain : true,
				bodyStyle : 'padding:5px;',
				buttonAlign : 'center',
				items : form2,

				buttons : [{
							text : 'Save'
						}, {
							text : 'Cancel'
						}]
			});

	var window3 = new Ext.Panel({
				id : 'windows38',
				title : 'Resize Me',
					width : '100%',
				height : '10%',
			//	minWidth : 800,
			//	minHeight : 200,
				layout : 'fit',
				plain : true,
				bodyStyle : 'padding:5px;',
				buttonAlign : 'center',
				items : form3,

				buttons : [{
							text : 'Save'
						}, {
							text : 'Cancel'
						}]
			});

	var window4 = new Ext.Panel({
				id : 'windows47',
				title : 'Resize Me',
				width : '100%',
				height : '10%',
			//	minWidth : 800,
			//	minHeight : 200,
				layout : 'fit',
				plain : true,
				bodyStyle : 'padding:5px;',
				buttonAlign : 'center',
				items : form4,

				buttons : [{
							text : 'Save'
						}, {
							text : 'Cancel'
						}]
			});
	var window6 = new Ext.Panel({
				id : 'windows66',
				title : 'Resize Me',
					width : '100%',
				height : '120',
			//	minWidth : 800,
			//	minHeight : 200,
				layout : 'fit',
				plain : true,
				bodyStyle : 'padding:5px;',
				buttonAlign : 'center',
				items : form6,

				buttons : [{
							text : 'Save'
						}, {
							text : 'Cancel'
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

	var window = new Ext.Panel({

				region : 'center',
				id : 'tabsid',
				enableTabScroll : true,
				// autoWidth : true,
				activeTab : 0,
				height : document.body.clientHeight,
				width : document.body.clientWidth,
				buttonAlign : 'right',
				tbar : tbar,
				items : [window1, window2, window3, window4, window5, window6]

			});

	var viewport = new Ext.Viewport({
				layout : 'border',
				items : [window]
			});
	viewport.doLayout();
		/*
		 * window1.show(); window2.show(); window3.show(); window4.show();
		 * window5.show();
		 */

});