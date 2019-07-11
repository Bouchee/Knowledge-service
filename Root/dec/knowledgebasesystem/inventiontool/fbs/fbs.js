
Ext.onReady(function() {
	
	/* bd.createChild({tag: 'h2', html: 'Form 3 - A little more complex'});*/
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

	    var top = new Ext.FormPanel({
	        labelAlign: 'top',
	        frame:true,
	        title: '工艺问题输入',
	        bodyStyle:'padding:5px 5px 0',
	      //  width: 600,
	        items: [{
	            xtype:'htmleditor',
	            id:'zonggongneng',
	            fieldLabel:'总功能输入',
	            height:200,
	            anchor:'98%',
	            buttons: [{
		            text: 'Save'
		        },{
		            text: 'Cancel'
		        }]
	        },{
	            layout:'column',
	            items:[{
	                columnWidth:.3,
	                layout: 'form',
	                items: [{
	                    xtype:'textfield',
	                    fieldLabel: '子功能1',
	                    id:"zigongneng1",
	                    name: 'first',
	                    anchor:'95%'
	                }, {
	                    xtype:'textfield',
	                    fieldLabel: '子功能2',
	                    id:"zigongneng2",
	                    name: 'second',
	                    anchor:'95%'
	                }, {
	                    xtype:'textfield',
	                    fieldLabel: '子功能3',
	                    id:"zigongneng3",
	                    name: 'third',
	                    anchor:'95%'
	                }, {
	                    xtype:'textfield',
	                    fieldLabel: '子功能4',
	                    id:"zigongneng4",
	                    name: 'furth',
	                    anchor:'95%'
	                }, {
	                    xtype:'textfield',
	                    fieldLabel: '子功能5',
	                    id:"zigongneng5",
	                    name: 'fifth',
	                    anchor:'95%'
	                }]
	            },{
	                columnWidth:.3,
	                layout: 'form',
	                items: [{
	                    xtype:'textfield',
	                    fieldLabel: '子行为1',
	                    id:"zixingwei1",
	                    name: 'first',
	                    anchor:'95%'
	                }, {
	                    xtype:'textfield',
	                    fieldLabel: '子功能2',
	                    id:"zixingwei2",
	                    name: 'second',
	                    anchor:'95%'
	                }, {
	                    xtype:'textfield',
	                    fieldLabel: '子功能3',
	                    id:"zixingwei3",
	                    name: 'third',
	                    anchor:'95%'
	                }, {
	                    xtype:'textfield',
	                    fieldLabel: '子功能4',
	                    id:"zixingwei4",
	                    name: 'furth',
	                    anchor:'95%'
	                }, {
	                    xtype:'textfield',
	                    fieldLabel: '子功能5',
	                    id:"zixingwei5",
	                    name: 'fifth',
	                    anchor:'95%'
	                }]
	            },{
	                columnWidth:.3,
	                layout: 'form',
	                items: [{
	                    xtype:'textfield',
	                    fieldLabel: '子结构1',
	                    id:"zijiegou1",
	                    name: 'first',
	                    anchor:'95%'
	                }, {
	                    xtype:'textfield',
	                    fieldLabel: '子结构2',
	                    id:"zijiegou2",
	                    name: 'second',
	                    anchor:'95%'
	                }, {
	                    xtype:'textfield',
	                    fieldLabel: '子结构3',
	                    id:"zijiegou3",
	                    name: 'third',
	                    anchor:'95%'
	                }, {
	                    xtype:'textfield',
	                    fieldLabel: '子结构4',
	                    id:"zijiegou4",
	                    name: 'furth',
	                    anchor:'95%'
	                }, {
	                    xtype:'textfield',
	                    fieldLabel: '子结构5',
	                    id:"zijiegou5",
	                    name: 'fifth',
	                    anchor:'95%'
	                }]
	            }]
	        },{
	            xtype:'htmleditor',
	            id:'bio',
	            fieldLabel:'创新想法',
	            height:200,
	            anchor:'98%'
	        }],
	        buttonAlign : 'center',
	        buttons: [{
	            text: '保存'
	        },{
	            text: '取消'
	        },{
	            text: '下一步',
	            handler : function() {
					window2.show();
				}
	        }]
	    });

	    top.render(document.body);

	
	
	var fp = new Ext.FormPanel({
		title : '功能-行为-结构',
		frame : true,
		anchor : '100%',
		id : 'card4',
		// labelWidth : 110,
		// width : 600,
		renderTo : 'form-ct1',
		bodyStyle : 'padding:0 10px 0;',
		buttonAlign : "center",
		items :{
            html: '<p>FBS设计方法即功能-行为-结构设计方法，用于面向目的的创新，即，设计一个全新产品或系统。可能现有产品或系统的主要功能改进已经达到极限，因此不局限于现有产品或系统的问题，而是跳出现有系统，是否有其它方法可以更好地达到目的。</p>',
        }
	});
	
	
});