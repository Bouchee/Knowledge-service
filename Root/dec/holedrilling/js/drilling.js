/**
 * 钻孔
 * 
 * @author fuxianwu
 * @since 2013-01-01
 */
Ext
		.onReady(function() {
			var divnum = 25;// 调整toolbar中的下拉框的大小与位置;
			var numlign = 11;

			var pp = 0.8; // 将下拉框图片缩放为80%;

			var grid_ratio = 0.65; // 上下两个grid的高度比例
			var grid_init = true;

			// 图片大小;
			/*
			 * var reliefangleArr = new Array(143, 79); //刀片后角 var reliefanglepp =
			 * pp;
			 * 
			 * var celengthArr = new Array(216, 80); //刀片尺寸 var celengthpp = pp -
			 * 0.2;
			 * 
			 * var noseradiusArr = new Array(144, 79); //刀尖圆弧半径 var noseradiuspp =
			 * pp;
			 * 
			 * var shapeArr = new Array(198, 80); //刀片形状 var shapepp = pp - 0.2;
			 * 
			 * var cseriesArr = new Array(264, 79); //刀片夹紧方式 var cseriespp = pp -
			 * 0.2;
			 * 
			 * var handoftoolArr = new Array(151, 80); //刀具方向 var handoftoolpp =
			 * pp - 0.2;
			 * 
			 * var portsizeArr = new Array(230, 80); //接口规格 var portsizepp = pp -
			 * 0.2;
			 * 
			 * var thheadangleArr = new Array(65, 79); //刀头形式 var thheadanglepp =
			 * pp + 0.2;
			 * 
			 * var turningtypeArr = new Array(159, 79); //车削类型 var turningtypepp =
			 * pp - 0.1;
			 */

			// 复选框
			var sm = new Ext.grid.CheckboxSelectionModel();

			// 行号
			var rownum = new Ext.grid.RowNumberer({
				header : '序',
				width : 26
			});

			var sm2 = new Ext.grid.CheckboxSelectionModel();

			// 行号
			var rownum2 = new Ext.grid.RowNumberer({
				header : '序',
				width : 26
			});

			// 复选框
			var sm3 = new Ext.grid.CheckboxSelectionModel();
			// 行号
			var rownum3 = new Ext.grid.RowNumberer({
				header : '序',
				width : 26
			});

			// 列模型（整体式铰孔）
			var hd_holedrillingCm = new Ext.grid.ColumnModel([ rownum, sm,{
				header : 'SAP编号',
				dataIndex : 'sapcode',
				width : 80,
				hidden : false,
				sortable : true
				},
			{
				header : '名称',
				dataIndex : 'name',
				width : 80,
				hidden : false,
				sortable : true
				},
			{
				header : '型号',
				dataIndex : 'type',
				width : 80,
				hidden : false,
				sortable : true
				},
			{
				header : '品牌',
				dataIndex : 'brandid',
				width : 80,
				hidden : false,
				sortable : true
				},
			{
				header : '切削类型',
				dataIndex : 'cuttype',
				width : 80,
				hidden : false,
				sortable : true
				},
			{
				header : '刀体特征码',
				dataIndex : 'featurecode',
				width : 80,
				hidden : true,
				sortable : true
				},
			{
				header : '公称直径',
				dataIndex : 'nominaldiameter',
				width : 80,
				hidden : false,
				sortable : true
				},
			{
				header : '材质',
				dataIndex : 'materialid',
				width : 80,
				hidden : false,
				sortable : true
				},
			{
				header : '锋角',
				dataIndex : 'pointangle',
				width : 80,
				hidden : false,
				sortable : true
				},
			{
				header : '齿数',
				dataIndex : 'toothnumber',
				width : 80,
				hidden : false,
				sortable : true
				},
			{
				header : '总长',
				dataIndex : 'length',
				width : 80,
				hidden : false,
				sortable : true
				},
			{
				header : '钻孔深度',
				dataIndex : 'depth',
				width : 80,
				hidden : false,
				sortable : true
				},
			{
				header : '沟槽长度',
				dataIndex : 'groovelength',
				width : 80,
				hidden : false,
				sortable : true
				},
			{
				header : '接口尺寸',
				dataIndex : 'portsize',
				width : 80,
				hidden : false,
				sortable : true
				},
			{
				header : '冷却类型',
				dataIndex : 'coolingtype',
				width : 80,
				hidden : false,
				sortable : true
				}]);
			
			// 列模型（机夹式钻孔刀体列模型）
			var jijiahd_holedrillingCm = new Ext.grid.ColumnModel([ rownum, sm, /*
																			 * {
																			 * header :
																			 * '刀体编号', //
																			 * 列标题
																			 * dataIndex :
																			 * 'toolholderid', //
																			 * 数据索引,和Store数据存储模型对应
																			 * width :
																			 * 60, //
																			 * 列宽度
																			 * sortable :
																			 * true, //
																			 * 该列是否要排序
																			 * hidden :
																			 * true //
																			 * 该列是否隐藏 },
																			 */{
				header : '名称',
				dataIndex : 'name',
				width : 100,
				sortable : true
			// hidden : true
			}, {
				header : 'SAP编号',
				dataIndex : 'sapcode',
				width : 120,
				sortable : true
			// hidden : true
			}, {
				header : '型号',
				dataIndex : 'type',
				width : 200,
				// hidden : true,
				sortable : true
			}, {
				header : '简图',
				dataIndex : 'figure',
				width : 80,
				hidden : true,
				sortable : true
			}, {
				header : '实物图',
				dataIndex : 'figure2',
				width : 80,
				hidden : true,
				sortable : true
			}, {
				header : '品牌',
				dataIndex : 'brandid',
				// hidden : true,
				width : 80,
				sortable : true
			}, {
				header : '切削类型',
				dataIndex : 'cuttype',
				width : 80,
				// hidden : true,
				sortable : true
			}, {header :' 公称直径',
				dataIndex :'nominaldiameter',
				width : 60,
				sortable : true
				// hidden : true
				},
				{header :' 总长',
				dataIndex :'length',
				width : 60,
				sortable : true
				// hidden : true
				},
				{header :' 钻孔深度',
				dataIndex :'depth',
				width : 60,
				sortable : true
				// hidden : true
				},
				{header :' 沟槽长度',
				dataIndex :'groovelength',
				width : 60,
				sortable : true
				// hidden : true
				},
				{header :' 接口尺寸',
				dataIndex :'portsize',
				width : 60,
				sortable : true
				// hidden : true
				},
				{header :' 齿数',
					dataIndex :'toothnumber',
					width : 60,
					sortable : true,
					 hidden : true
					},
				{header :' 冷却类型',
				dataIndex :'coolingtype',
				width : 60,
				sortable : true
				// hidden : true
				},/*
				 * { header : '刀具类型详情ID', dataIndex : 'typeid', width : 80,
				 * align : 'center', hidden : true, sortable : true }, { header :
				 * '刀具类型', dataIndex : 'hdtooltype', width : 80, align :
				 * 'center', renderer : HDTOOLTYPERender, // hidden : true,
				 * sortable : true },
				 */
				
				{header :' 附件1名称',
					dataIndex :'aname1',
					width : 60,
					sortable : true,
					 hidden : true
				},
				{header :' 附件1型号',
					dataIndex :'anametype1',
					width : 60,
					sortable : true,
					 hidden : true
				},
				{header :' 附件2名称',
					dataIndex :'aname2',
					width : 60,
					sortable : true,
					 hidden : true
				},
				{header :' 附件2型号',
					dataIndex :'anametype2',
					width : 60,
					sortable : true,
					 hidden : true
				},
				{header :' 附件3名称',
					dataIndex :'aname3',
					width : 60,
					sortable : true,
			       hidden : true
				},
				{header :' 附件3型号',
					dataIndex :'anametype3',
					width : 60,
					sortable : true,
					 hidden : true
				},
				{header :' 附件4名称',
					dataIndex :'aname4',
					width : 60,
					sortable : true,
					hidden : true
				},
				{header :' 附件4型号',
					dataIndex :'anametype4',
					width : 60,
					sortable : true,
					 hidden : true
				},
				{header :' 附件5名称',
					dataIndex :'aname5',
					width : 60,
					sortable : true,
					hidden : true
				},
				{header :' 附件5型号',
					dataIndex :'anametype5',
					width : 60,
					sortable : true,
					hidden : true
				},
				{header :' 附件6名称',
					dataIndex :'aname6',
					width : 60,
					sortable : true,
					hidden : true
				},
				{header :' 附件6型号',
					dataIndex :'anametype6',
					width : 60,
					sortable : true,
					 hidden : true
				},
				{header :' 附件7名称',
					dataIndex :'aname7',
					width : 60,
					sortable : true,
					 hidden : true
				},
				{header :' 附件7型号',
					dataIndex :'anametype7',
					width : 60,
					sortable : true,
					 hidden : true
				},
				{header :' 附件8名称',
					dataIndex :'aname8',
					width : 60,
					sortable : true,
			       hidden : true
				},
				{header :' 附件8型号',
					dataIndex :'anametype8',
					width : 60,
					sortable : true,
					 hidden : true
				},
				{header :' 附件9名称',
					dataIndex :'aname9',
					width : 60,
					sortable : true,
					 hidden : true
				},
				{header :' 附件9型号',
					dataIndex :'anametype9',
					width : 60,
					sortable : true,
					 hidden : true
				},
				{header :' 附件10名称',
					dataIndex :'aname10',
					width : 60,
					sortable : true,
					 hidden : true
				},
				{header :' 附件10型号',
					dataIndex :'anametype10',
					width : 60,
					sortable : true,
					 hidden : true
				},
				{header :' 附件11名称',
					dataIndex :'aname11',
					width : 60,
					sortable : true,
					 hidden : true
				},
				{header :' 附件11型号',
					dataIndex :'anametype11',
					width : 60,
					sortable : true,
					hidden : true
				},
				{header :' 附件12名称',
					dataIndex :'aname12',
					width : 60,
					sortable : true,
					 hidden : true
				},
				{header :' 附件12型号',
					dataIndex :'anametype12',
					width : 60,
					sortable : true,
				 hidden : true
				},
				
				{
				header : '特点',
				dataIndex : 'description',
				width : 80,
				align : 'center',
				// hidden : true,
				sortable : true
			}, {
				header : '备注信息',
				dataIndex : 'remark',
				width : 80,
				// hidden : true,
				sortable : true
			} 
			
			/*
				 * , { header : '系数K1', dataIndex : 'k1', width : 100, align :
				 * 'center', // hidden : true, sortable : true }
				 */]);

			// 列模型（钻孔刀片表）
			var hd_blade_drillingCm = new Ext.grid.ColumnModel([ rownum, sm, /*
																				 * {
																				 * header :
																				 * 'toolholderid', //
																				 * 列标题
																				 * dataIndex :
																				 * 'hdtcid', //
																				 * 数据索引,和Store数据存储模型对应
																				 * width :
																				 * 60, //
																				 * 列宽度
																				 * sortable :
																				 * true, //
																				 * 该列是否要排序
																				 * hidden :
																				 * true //
																				 * 该列是否隐藏 },
																				 */
			{
				header : '名称',
				dataIndex : 'name',
				width : 100,
				sortable : true
			// hidden : true
			}, {
				header : 'SAP编号',
				dataIndex : 'sapcode',
				width : 60,
				sortable : true
			// hidden : true
			}, {
				header : '型号',
				dataIndex : 'type',
				width : 130,
				// hidden : true,
				sortable : true
			}, /*
				 * { header : '简图', dataIndex : 'figure', width : 80, // hidden :
				 * true, sortable : true }, { header : '实物图', dataIndex :
				 * 'figure2', width : 80, align : 'center', // hidden : true,
				 * sortable : true },
				 */{
				header : '品牌',
				dataIndex : 'brandid',
				width : 100,
				align : 'center',
				// renderer : CSERIESRender,
				// hidden : true,
				sortable : true
			}, /*
				 * { header : '材质', dataIndex : 'materialid', width : 100,
				 * sortable : true // hidden : true },
				 *//*
				 * { header : '槽型', dataIndex : 'grooveid', width : 130, //
				 * hidden : true, sortable : true },
				 *//*
				 * { header : '形状', dataIndex : 'shape', width : 80, // hidden :
				 * true, sortable : true }, { header : '后角', dataIndex :
				 * 'reliefangle', width : 80, align : 'center', // hidden :
				 * true, sortable : true }, { header : '内切圆直径', dataIndex :
				 * 'diameter', width : 100, align : 'center', // renderer :
				 * CSERIESRender, // hidden : true, sortable : true },
				 *//*
				 * { header : '可转位次数', dataIndex : 'indexabletimes', width : 80, //
				 * hidden : true, sortable : true },
				 *//*
				 * { header : '厚度', dataIndex : 'thickness', width : 80, align :
				 * 'center', // hidden : true, sortable : true }, { header :
				 * '刀尖圆弧半径', dataIndex : 'noseradius', width : 100, align :
				 * 'center', // renderer : CSERIESRender, // hidden : true,
				 * sortable : true },
				 *//*
				 * { header : '特点', dataIndex : 'description', width : 100,
				 * align : 'center', // renderer : CSERIESRender, // hidden :
				 * true, sortable : true },
				 *//*
				 * { header : '备注信息', dataIndex : 'remark', width : 80, //
				 * hidden : true, sortable : true }, ,
				 *//*
				 * { header : '特征码', dataIndex : 'featurecode', width : 80,
				 * align : 'center', // hidden : true, sortable : true },
				 */{
				header : '刀片材质',
				dataIndex : 'materialid',
				width : 100,
				align : 'center',
				// renderer : CSERIESRender,
				// hidden : true,
				sortable : true
			} /*
				 * , { header : '系数K2', dataIndex : 'k2', width : 100, align :
				 * 'center', // renderer : CSERIESRender, // hidden : true,
				 * sortable : true }
				 */]);

			// Store数据存储(机夹刀体grid)
			var hd_holedrillingStore = new Ext.data.GroupingStore({
				proxy : new Ext.data.HttpProxy({
					url : 'drilling.do?code=queryHd_holedrilling4Manage'
				// queryHd_holedrilling4Manage是在ReamingAction中的方法queryHd_holedrilling4Manage;
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [
					/* { name : 'toolholderid' },*/
					 {
					name : 'sapcode'
				}, {
					name : 'name'
				}, {
					name : 'type'
				},{
					name : 'figure'
				}, {
					name : 'figure2'
				} , {
					name : 'brandid'
				}, {
					name : 'cuttype'
				}, {
					name : 'typeid'
				}, 
				/* { name : 'hdtooltype' },*/
				 {
					name : 'description'
				}, {
					name : 'remark'
				},  {
					name : 'k1'
				}, {
					name : 'featurecode'
				}, {
					name : 'htpcentreblade'
				},{
					name : 'rimblade1'
				},{
					name : 'toothnumber'
				},{
					name : 'aname1'
				}, {
					name : 'aname2'
				} , {
					name : 'aname3'
				}, {
					name : 'aname4'
				} ,{
					name : 'aname5'
				} ,{
					name : 'aname6'
				} ,{
					name : 'aname7'
				} ,{
					name : 'aname8'
				} ,{
					name : 'aname9'
				} ,{
					name : 'aname10'
				} ,{
					name : 'aname11'
				} ,{
					name : 'aname12'
				} ,{
					name : 'anametype1'
				}, {
					name : 'anametype2'
				} , {
					name : 'anametype3'
				}, {
					name : 'anametype4'
				}, {
					name : 'anametype5'
				}, {
					name : 'anametype6'
				}, {
					name : 'anametype7'
				}, {
					name : 'anametype8'
				}, {
					name : 'anametype9'
				}, {
					name : 'anametype10'
				}, {
					name : 'anametype11'
				}, {
					name : 'anametype12'
				}, {
					name : 'htsccentreblade'
				}, {
					name : 'rakeangle'
				}, {
					name : 'c'
				}, 	{
					name : 'htccentredrill'
				}, {
					name : 'rimblade2'
				} , {
					name : 'aname'
				},{
					name : 'length'
				},{
					name : 'depth'
				}, {
					name : 'groovelength'
				},  {
					name : 'portsize'
				}, {
					name : 'coolingtype'
				}, {
					name : 'nominaldiameter'
				}]),
				listeners : {

				}
			});

			// Store数据存储(整体式)
			var hd_holedrillingStore1 = new Ext.data.GroupingStore(
					{
						proxy : new Ext.data.HttpProxy(
								{
									url : 'drilling.do?code=queryHd_toolholder_holedrilling_integral4Manage'
								}),
						reader : new Ext.data.JsonReader({
							totalProperty : 'TOTALCOUNT',
							root : 'ROOT'
						}, [{
							name : 'sapcode'
						},
					{
						name : 'name'
						},
					{
						name : 'type'
						},
					{
						name : 'brandid'
						},
					{
						name : 'cuttype'
						},
					{
						name : 'featurecode'
						},
					{
						name : 'nominaldiameter'
						},
					{
						name : 'materialid'
						},
					{
						name : 'pointangle'
						},
					{
						name : 'toothnumber'
						},
					{
						name : 'length'
						},
					{
						name : 'depth'
						},{
						name : 'figure'
						},{
						name : 'figure2'
						},
					{
						name : 'groovelength'
						},
						{
						name : 'k1'
						},
					{
						name : 'portsize'
						},
					{
						name : 'coolingtype'
						},
]),
						listeners : {

						}
					});

			// Store数据存储（刀片）
			var hd_blade_drilling_Store = new Ext.data.GroupingStore({
				proxy : new Ext.data.HttpProxy({
					url : 'drilling.do?code=queryHd_blade_poledrilling4Manage'
				// queryHd_blade_poledrilling4Manage是在DrillingActionqueryHd_blade_poledrilling4Manage;
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [/*
					 * { name : 'toolholderid' },
					 */{
					name : 'sapcode'
				}, {
					name : 'name'
				}, {
					name : 'type'
				},/*
					 * { name : 'figure' }, { name : 'figure2' },
					 */{
					name : 'brandid'
				}, {
					name : 'materialid'
				}, /*
					 * { name : 'grooveid' }, { name : 'shape' }, { name :
					 * 'reliefangle' }, { name : 'diameter' }, { name :
					 * 'indexabletimes' }, { name : 'thickness' }, { name :
					 * 'noseradius' }, { name : 'description' }, { name :
					 * 'remark' },
					 */{
					name : 'featurecode'
				}, {
					name : 'k2'
				} ]),
				listeners : {

				}
			});

			// 每页显示条数下拉选择框
			var pagesize_combo = new Ext.form.ComboBox({
				name : 'pagesize',
				triggerAction : 'all',
				mode : 'local',
				store : new Ext.data.ArrayStore({
					fields : [ 'value', 'text' ],
					data : [ [ 10, '10 条/页' ], [ 20, '20 条/页' ],
							[ 50, '50 条/页' ], [ 100, '100条/页' ],
							[ 250, '250条/页' ], [ 500, '500条/页' ] ]
				}),
				valueField : 'value',
				displayField : 'text',
				value : '50',
				editable : false,
				width : 85
			});

			var number = parseInt(pagesize_combo.getValue());
			pagesize_combo.on('select', function(comboBox) {
				bbar.pageSize = parseInt(comboBox.getValue());
				number = parseInt(comboBox.getValue());
				hd_holedrillingStoreLoad();
			});

			// 实时过滤按钮

			var runtimeButton = new Ext.CycleButton({
				showText : true,
				prependText : '实时过滤状态: ',
				items : [ {
					text : '开',
					iconCls : 'lightonIcon',
					checked : parent.grf
				}, {
					text : '关',
					iconCls : 'lightoffIcon',
					checked : !parent.grf
				} ],
				changeHandler : function(btn, item) {
					if (btn.getActiveItem().itemIndex == '0') {
						if (runtimeButton2.getActiveItem().itemIndex == '1') {
							runtimeButton2.toggleSelected();
							runtimeButton2.setIconClass('lightonIcon');
						}
						/*
						 * if (runtimeButton3.getActiveItem().itemIndex == '1') {
						 * runtimeButton3.toggleSelected();
						 * runtimeButton3.setIconClass('lightonIcon'); }
						 */

						calcButton.hide();
						calcButton2.hide();
						// calcButton3.hide();
						parent.grf = true;
					} else {
						if (runtimeButton2.getActiveItem().itemIndex == '0') {
							runtimeButton2.toggleSelected();
							runtimeButton2.setIconClass('lightoffIcon');
						}
						/*
						 * if (runtimeButton3.getActiveItem().itemIndex == '0') {
						 * runtimeButton3.toggleSelected();
						 * runtimeButton3.setIconClass('lightoffIcon'); }
						 */

						calcButton.show(true);
						calcButton2.show(true);
						// calcButton3.show(true);
						parent.grf = false;
					}
				}
			});

			var autoLoadButton = new Ext.CycleButton({
				showText : true,
				prependText : '刀片自动加载: ',
				items : [ {
					text : '开',
					iconCls : 'lightonIcon',
					checked : parent.gdlf
				}, {
					text : '关',
					iconCls : 'lightoffIcon',
					checked : !parent.gdlf
				/* parent.gdlf */
				} ],
				changeHandler : function(btn, item) {
					if (btn.getActiveItem().itemIndex == '0') {
						// calcButton.hide();
						parent.gdlf = true;
						hd_blade_drilling_StoreLoad();

					} else {
						// calcButton.show();
						parent.gdlf = false;
					}
				}
			});

			var runtimeButton2 = new Ext.CycleButton({
				showText : true,
				prependText : '实时过滤状态: ',
				items : [ {
					text : '开',
					iconCls : 'lightonIcon',
					checked : parent.grf
				}, {
					text : '关',
					iconCls : 'lightoffIcon',
					checked : !parent.grf
				} ],
				changeHandler : function(btn, item) {
					if (btn.getActiveItem().itemIndex == '0') {
						if (runtimeButton.getActiveItem().itemIndex == '1') {
							runtimeButton.toggleSelected();
							runtimeButton.setIconClass('lightonIcon');
						}
						/*
						 * if (runtimeButton3.getActiveItem().itemIndex == '1') {
						 * runtimeButton3.toggleSelected();
						 * runtimeButton3.setIconClass('lightonIcon'); }
						 */

						calcButton.hide();
						calcButton2.hide();
						// calcButton3.hide();
						parent.grf = true;
					} else {
						if (runtimeButton.getActiveItem().itemIndex == '0') {
							runtimeButton.toggleSelected();
							runtimeButton.setIconClass('lightoffIcon');
						}
						/*
						 * if (runtimeButton3.getActiveItem().itemIndex == '0') {
						 * runtimeButton3.toggleSelected();
						 * runtimeButton3.setIconClass('lightoffIcon'); }
						 */

						calcButton.show();
						calcButton2.show();
						// calcButton3.show();
						parent.grf = false;
					}
				}
			});

			/*
			 * var runtimeButton3 = new Ext.CycleButton({ showText : true,
			 * prependText : '实时过滤状态: ', items : [{ text : '开', iconCls :
			 * 'lightonIcon', checked : parent.grf }, { text : '关', iconCls :
			 * 'lightoffIcon', checked : !parent.grf }], changeHandler :
			 * function(btn, item) { if (btn.getActiveItem().itemIndex == '0') {
			 * if (runtimeButton.getActiveItem().itemIndex == '1') {
			 * runtimeButton.toggleSelected();
			 * runtimeButton.setIconClass('lightonIcon'); } if
			 * (runtimeButton2.getActiveItem().itemIndex == '1') {
			 * runtimeButton2.toggleSelected();
			 * runtimeButton2.setIconClass('lightonIcon'); }
			 * 
			 * calcButton.hide(); calcButton2.hide(); calcButton3.hide();
			 * parent.grf = true; } else { if
			 * (runtimeButton.getActiveItem().itemIndex == '0') {
			 * runtimeButton.toggleSelected();
			 * runtimeButton.setIconClass('lightoffIcon'); } if
			 * (runtimeButton2.getActiveItem().itemIndex == '0') {
			 * runtimeButton2.toggleSelected();
			 * runtimeButton2.setIconClass('lightoffIcon'); }
			 * 
			 * calcButton.show(); calcButton2.show(); calcButton3.show();
			 * parent.grf = false; } } });
			 */

			// 查询结果按钮
			var calcButton = new Ext.Button({
				text : '查询结果',
				iconCls : 'tableIcon',
				hidden : true,
				listeners : {
					click : function(btn, e) {
						hd_holedrillingStoreLoad();
					}
				}
			});

			var calcButton2 = new Ext.Button({
				text : '查询结果',
				iconCls : 'tableIcon',
				hidden : true,
				listeners : {
					click : function() {
						hd_holedrillingStore2Load();
						hd_blade_drilling_StoreLoad();
					}
				}
			});

			var calcButton3 = new Ext.Button({
				text : '查询结果',
				iconCls : 'tableIcon',
				hidden : true,
				listeners : {
					click : function() {
						hd_blade_drilling_StoreLoad();
					}
				}
			});

			// 分页工具栏
			var bbar = new Ext.PagingToolbar({
				pageSize : number,
				store : hd_holedrillingStore1,
				displayInfo : true,
				displayMsg : '显示第 {0} 条到第 {1} 条,共 {2} 条',
				plugins : new Ext.ux.ProgressBarPager(),
				emptyMsg : '对不起,没有符合条件的记录!',
				items : [ '-', '&nbsp;&nbsp;', pagesize_combo, /*
																 * '-',
																 * '&nbsp;&nbsp;', {
																 * text :
																 * '查询结果',
																 * iconCls :
																 * 'acceptIcon',
																 * handler :
																 * function() {
																 * resultDisplay(); //
																 * Ext.getCmp('helpdiv').setText('adfadsf'); } },
																 */{
					xtype : 'tbspacer',
					width : 10
				}, /*
					 * { text : '通过选择条目过滤刀体', iconCls : 'acceptIcon', id :
					 * 'selectMilling_toolholder_clamp', handler : function() {
					 * tabs.activate(1); // var record = //
					 * grid.getSelectionModel().getSelected(); var records =
					 * grid.getSelectionModel().getSelections();
					 * 
					 * if (records.length == 0) {
					 * milling_toolholder_clampStore.load({ //
					 * 没有选中任何条目,只过滤已经选择的项目内容; params : { start : 0, limit :
					 * bbar.pageSize, workpieceisotype :
					 * workpieceisotypeCombo2.getValue(), nominaldiameter :
					 * nominaldiameterCombo2.getValue(), interferencedepth :
					 * interferencedepthCombo2.getValue(), noseradius :
					 * noseradiusCombo2.getValue() } }); } else { if
					 * (records.length > 1) { infoMsg('您选择了 ' + records.length + '
					 * 个条目，选择单个条目会获得准确匹配。'); } //
					 * grid.getSelectionModel().selectRow(grid.getSelectionModel().last, //
					 * false); milling_toolholder_clampStore.load({ params : {
					 * start : 0, limit : bbar2.pageSize, workpieceisotype :
					 * workpieceisotypeCombo2.getValue(), nominaldiameter :
					 * nominaldiameterCombo2.getValue(), interferencedepth :
					 * interferencedepthCombo2.getValue(), noseradius :
					 * noseradiusCombo2.getValue() } }); } } },
					 */runtimeButton, {
					xtype : 'tbspacer',
					width : 10
				}, runtimeButton, {
					xtype : 'tbspacer',
					width : 10
				}, calcButton, {
					text : ' ',
					// iconCls : 'acceptIcon',
					disabled : true,
					disabledClass : 'x-item-disabled-fuxianwu',
					id : 'helpdiv1'
				} ]
			});

			// 每页显示条数下拉选择框
			var pagesize_combo2 = new Ext.form.ComboBox({
				name : 'pagesize',
				triggerAction : 'all',
				mode : 'local',
				store : new Ext.data.ArrayStore({
					fields : [ 'value', 'text' ],
					data : [ [ 10, '10 条/页' ], [ 20, '20 条/页' ],
							[ 50, '50 条/页' ], [ 100, '100条/页' ],
							[ 250, '250条/页' ], [ 500, '500条/页' ] ]
				}),
				valueField : 'value',
				displayField : 'text',
				value : '50',
				editable : false,
				width : 85
			});

			var number2 = parseInt(pagesize_combo2.getValue());
			pagesize_combo2.on('select', function(comboBox) {
				bbar2.pageSize = parseInt(comboBox.getValue());
				number2 = parseInt(comboBox.getValue());
				hd_holedrillingStore2Load();
			});

			// 分页工具栏
			var bbar2 = new Ext.PagingToolbar({
				pageSize : number2,
				store : hd_holedrillingStore,
				displayInfo : true,
				displayMsg : '显示第 {0} 条到第 {1} 条,共 {2} 条',
				plugins : new Ext.ux.ProgressBarPager(),
				emptyMsg : '对不起,没有符合条件的记录!',
				items : [ '-', '&nbsp;&nbsp;', pagesize_combo2, /*
																 * '-',
																 * '&nbsp;&nbsp;', {
																 * text :
																 * '查询结果',
																 * iconCls :
																 * 'acceptIcon',
																 * handler :
																 * function() {
																 * resultDisplay(); //
																 * Ext.getCmp('helpdiv').setText('adfadsf'); } },
																 */{
					xtype : 'tbspacer',
					width : 10
				},/*
					 * { text : '通过选择条目过滤刀片', id :
					 * 'selectMilling_toolholder_clamp', iconCls : 'acceptIcon',
					 * handler : function() { tabs.activate(2); // var record =
					 * grid2.getSelectionModel().getSelected(); var records =
					 * grid2.getSelectionModel().getSelections();
					 * 
					 * if (records.length == 0) {
					 * milling_blade_clampStoreLoad(); } else { if
					 * (records.length > 1) { infoMsg('您选择了 ' + records.length + '
					 * 个条目，选择单个条目会获得准确匹配。'); } //
					 * grid.getSelectionModel().selectRow(grid.getSelectionModel().last, //
					 * false); milling_blade_clampStore.load({ params : { start :
					 * bbar3.pageSize *
					 * (grid3.getBottomToolbar().getPageData().activePage - 1),
					 * limit : bbar3.pageSize, featurecode :
					 * jsArray2JsString(records, 'featurecode') } }); } } },
					 */{
					xtype : 'tbspacer',
					width : 10
				}, autoLoadButton, runtimeButton2, {
					xtype : 'tbspacer',
					width : 10
				}, calcButton2, {
					text : ' ',
					// iconCls : 'acceptIcon',
					disabled : true,
					disabledClass : 'x-item-disabled-fuxianwu',
					id : 'helpdiv2'
				} ]
			});

			// 每页显示条数下拉选择框
			/*
			 * var pagesize_combo3 = new Ext.form.ComboBox({ name : 'pagesize',
			 * triggerAction : 'all', mode : 'local', store : new
			 * Ext.data.ArrayStore({ fields : ['value', 'text'], data : [[10,
			 * '10 条/页'], [20, '20 条/页'], [50, '50 条/页'], [100, '100条/页'], [250,
			 * '250条/页'], [500, '500条/页']] }), valueField : 'value',
			 * displayField : 'text', value : '50', editable : false, width : 85
			 * });
			 */

			/*
			 * var number3 = parseInt(pagesize_combo3.getValue());
			 * pagesize_combo3.on('select', function(comboBox) { bbar3.pageSize =
			 * parseInt(comboBox.getValue()); number3 =
			 * parseInt(comboBox.getValue()); milling_blade_clampStoreLoad; });
			 */

			// 分页工具栏
			/*
			 * var bbar3 = new Ext.PagingToolbar({ pageSize : number3, store :
			 * milling_blade_clampStore, displayInfo : true, displayMsg : '显示第
			 * {0} 条到第 {1} 条,共 {2} 条', plugins : new Ext.ux.ProgressBarPager(),
			 * emptyMsg : '对不起,没有符合条件的记录!', items : ['-', '&nbsp;&nbsp;',
			 * pagesize_combo3, '-', '&nbsp;&nbsp;', { text : '查询结果', iconCls :
			 * 'acceptIcon', handler : function() { resultDisplay(); //
			 * Ext.getCmp('helpdiv').setText('adfadsf'); } }, { xtype :
			 * 'tbspacer', width : 10 }, { text : '通过选择条目过滤刀体', id :
			 * 'selectMilling_blade_clamp', iconCls : 'acceptIcon', handler :
			 * function() { tabs.activate(1); // var record =
			 * grid2.getSelectionModel().getSelected(); var records =
			 * grid3.getSelectionModel().getSelections();
			 * 
			 * if (records.length == 0) { milling_toolholder_clampStoreLoad(); }
			 * else { if (records.length > 1) { infoMsg('您选择了 ' + records.length + '
			 * 个条目，选择单个条目会获得准确匹配。'); } //
			 * grid.getSelectionModel().selectRow(grid.getSelectionModel().last, //
			 * false); milling_toolholder_clampStore.load({ params : { start :
			 * bbar.pageSize * (grid.getBottomToolbar().getPageData().activePage -
			 * 1), limit : bbar.pageSize, featurecode :
			 * jsArray2JsString(records, 'featurecode') } }); } } }, { xtype :
			 * 'tbspacer', width : 10 }, runtimeButton3, { xtype : 'tbspacer',
			 * width : 10 }, calcButton3, { text : ' ', // iconCls :
			 * 'acceptIcon', disabled : true, disabledClass :
			 * 'x-item-disabled-fuxianwu', id : 'helpdiv3' }] });
			 */

			// 工件材料状态数据
			var workpieceisotypeStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : 'generalturning.do?code=queryWorkpiecematerial'
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [ {
					name : 'workpiecematerialid'
				}, {
					name : 'name'// ,convert:
				// nameaddmark
				}, {
					name : 'name2'
				}, {
					name : 'mark'
				}, {
					name : 'wmtype'
				}, {
					name : 'heattreat'
				}, {
					name : 'hardness'
				} ]),
				baseParams : {
					start : 0,
					limit : bbar.pageSize,
					query : ''
				}
			});
			workpieceisotypeStore.load();

			// 行号
			var rownum_iso = new Ext.grid.RowNumberer({
				header : '序',
				width : 26
			});

			var workpieceisotypeCm = new Ext.grid.ColumnModel([ rownum_iso, {
				header : '材料牌号',
				dataIndex : 'name',
				width : 100,
				sortable : true
			}, {
				header : '材料牌号ID',
				dataIndex : 'workpiecematerialid',
				width : 1,
				hidden : true,
				sortable : true
			}, {
				header : '牌号-印记',
				dataIndex : 'name2',
				width : 1,
				hidden : true,
				sortable : true
			}, {
				header : '印记',
				dataIndex : 'mark',
				width : 50,
				// align : 'center',
				sortable : true
			}, {
				header : '材料类型',
				dataIndex : 'wmtype',
				width : 100,
				sortable : true
			}, {
				header : '热处理状态',
				dataIndex : 'heattreat',
				width : 90,
				sortable : true
			}, {
				header : '硬度',
				dataIndex : 'hardness',
				width : 80,
				sortable : true
			} ]);

			// var resultTpl = new Ext.XTemplate('<tpl for="."><div
			// class="search-item">', '{name}', '</div></tpl>');

			var workpieceisotypeGrid = new Ext.grid.GridPanel(
					{
						title : '',
						region : 'center',
						height : 300,
						width : 600,
						stripeRows : true,
						// autoSizeColumns : true,
						trackMouseOver : true,
						frame : true,
						store : workpieceisotypeStore,
						cm : workpieceisotypeCm,
						sm : new Ext.grid.RowSelectionModel({
							singleSelect : true
						}),
						viewConfig : {
							forceFit : true
						},
						/*
						 * bbar : new Ext.PagingToolbar({ pageSize :
						 * bbar.pageSize, store : workpieceisotypeStore,
						 * displayInfo : true, displayMsg : '显示第 {0} 条到第 {1} 条,共
						 * {2} 条', plugins : new Ext.ux.ProgressBarPager(),
						 * emptyMsg : "对不起,没有符合条件的记录!", items : ['-',
						 * '&nbsp;&nbsp;', pagesize_combo_iso] }),
						 */
						tbar : [
								{
									xtype : 'combo',
									id : 'inputname_isotype',
									// hiddenName : 'workpiecematerialid',
									store : workpieceisotypeStore,
									cls : 'search',
									// name : 'filetitle',
									displayField : 'name2',
									valueField : 'workpiecematerialid',
									emptyText : '工件材料牌号|印记',
									// loadingText : '正在加载数据，请稍候...',
									width : 200,
									// pageSize: cln,
									selectOnFocus : true,
									mode : 'local',
									// itemSelector : 'div.search-item',
									typeAhead : false,
									// tpl : resultTpl,
									// tpl : '<table><tr><tpl for="."><td
									// class="x-combo-list-item">{text}</td><tpl
									// if="xindex % 5 ===
									// 0"></tr><tr></tpl></tpl></tr></table>',
									hideTrigger : true,
									enableKeyEvents : true,
									maxHeight : 0,
									plugins : [ new QM.plugin.PinyinFilter ],
									// 响应回车键
									listeners : {
										specialkey : function(field, e) {
											if (e.getKey() == e.ENTER) {
												queryInfo_isotype();
											}
										},
										select : function(record) {
											this
													.setValue(record.data.workpiecematerialid);
										},
										focus : function() {
											workpieceisotypeCombo.setValue('');
										}
									}
								},
								{
									text : '确定',
									iconCls : 'acceptIcon',
									handler : function() {
										var r = workpieceisotypeGrid
												.getSelectionModel()
												.getSelected();
										if (typeof r == 'undefined') {
											infoMsg('您没有选中任何条目，请先选中要修改的项目，您也可以直接双击要选择的行！');
											return;
										} else {
											// workpieceisotypeCombo.setValue(r.get('workpiecematerialid'));
											// workpieceisotypeCombo.setRawValue(r.get('name'));

											selectMenu.hide();

											// refreshMilling_toolholder_integral();
										}
									}
								}, '->', {
									text : '清空材料牌号',
									iconCls : 'tbar_synchronizeIcon',
									handler : function() {
										// selectMenu.suspendEvents();
										workpieceisotypeCombo.reset();
										selectMenu.hide();
										// selectMenu.resumeEvents();
										// var r =
										// g.getSelectionModel().getSelected();

										// refreshMilling_toolholder_integral();
									}
								} ],/*
									 * view : new Ext.ux.grid.BufferView({
									 * rowHeight : 50, scrollDelay : true }),
									 */
						listeners : {
							rowdblclick : function(g, rowIndex, event) {
								selectMenu.hide();
								/*
								 * var r = g.getSelectionModel().getSelected();
								 * 
								 * workpieceisotypeCombo.setValue(r.get('workpiecematerialid'));
								 * workpieceisotypeCombo.setRawValue(r.get('name'));
								 * 
								 * refreshMilling_toolholder_integral();
								 */
							},
							rowclick : function(g, rowIndex, event) {
								var r = g.getSelectionModel().getSelected();
								workpieceisotypeCombo.setValue(r
										.get('workpiecematerialid'));
								workpieceisotypeCombo
										.setRawValue(r.get('name'));
							}
						}
					});

			// 查询表格数据
			function queryInfo_isotype() {
				workpieceisotypeCombo.collapse();
				selectMenu.hide();
				/*
				 * var va = Ext.getCmp('inputname_isotype').getRawValue();
				 * 
				 * workpieceisotypeCombo.setValue(Ext.getCmp('inputname_isotype').getValue());
				 * workpieceisotypeCombo.setRawValue(va.substring(0,
				 * va.indexOf('-')));
				 */

				// refreshMilling_toolholder_integral();
				/*
				 * workpieceisotypeStore.load({ params : { start : 0, limit :
				 * bbar.pageSize, keyword :
				 * Ext.getCmp('inputname_isotype').getValue() } });
				 */
			}

			var selectMenu = new Ext.menu.Menu({
				items : [ workpieceisotypeGrid ],
				listeners : {
					hide : function(m) {
						// infoMsg('sfgsfdg');
						var r = workpieceisotypeGrid.getSelectionModel()
								.getSelected();
						if (typeof r == 'undefined') {
							workpieceisotypeCombo.reset();
						} else {
							if (workpieceisotypeCombo.getValue() != "") {
								workpieceisotypeCombo.setValue(r
										.get('workpiecematerialid'));
								workpieceisotypeCombo
										.setRawValue(r.get('name'));

								workpieceisotypeCombo3.setValue(r
										.get('workpiecematerialid'));
								workpieceisotypeCombo3.setRawValue(r
										.get('name'));
							}
						}
						refreshHd_holedrilling();
					}
				}
			});

			// 工件材料状态下拉框
			var workpieceisotypeCombo = new Ext.form.ComboBox({
				fieldLabel : '工件材料牌号',
				hiddenName : 'workpiecematerialid',
				triggerAction : 'all',
				store : new Ext.data.ArrayStore({
					fields : [ 'name', 'name' ],
					data : [ [] ]
				}),
				displayField : 'name',
				valueField : 'workpiecematerialid',
				lazyRender : true,
				editable : false,
				emptyText : '请选择...',
				loadingText : '正在加载数据...',
				mode : 'local',
				forceSelection : true,
				onSelect : Ext.emptyFn,
				// tpl : resultTpl2,
				// pageSize : cln,
				// minListWidth : 600,
				// plugins : [new QM.plugin.PinyinFilter],
				width : document.body.clientWidth / numlign - divnum,
				listeners : {
					expand : function(field) {
						if (this.menu == null) {
							this.menu = selectMenu;
						}
						// workpieceisotypeStore.load();
						this.menu.show(this.el, "tl-bl?");
						// selectMenu.show();
						Ext.getCmp('inputname_isotype').focus(true, 500);
					}/*
						 * , focus : function(field) { if (this.menu == null) {
						 * this.menu = selectMenu; }
						 * //workpieceisotypeStore.load();
						 * this.menu.show(this.el, "tl-bl?");
						 * //selectMenu.show();
						 * Ext.getCmp('inputname_isotype').focus(true, 500); }
						 */
				}
			});

			/*
			 * // 刀具类型下拉框 var shapeCombo = new Ext.form.ComboBox({ fieldLabel :
			 * '刀片形状', hiddenName : 'shape', id : 'shapeidid', emptyText :
			 * '请选择...', triggerAction : 'all', store : SHAPEStore, displayField :
			 * 'text', valueField : 'value', selectOnFocus : true, loadingText :
			 * '正在加载数据...', mode : 'local', forceSelection : true, // pageSize :
			 * cln, // minListWidth : 270, plugins : [new
			 * QM.plugin.PinyinFilter], resizable : true, width :
			 * document.body.clientWidth / numlign - divnum, listWidth :
			 * shapeArr[0] * shapepp + 25, tpl : '<tpl for="."><div
			 * x-combo-list-item class="x-combo-list-item"><img src="' +
			 * webContext + '/dec/combo/milling_toolholder_integral/shape/' +
			 * '{value}' + '.png" width=' + shapeArr[0] shapepp + ' height=' +
			 * shapeArr[1] * shapepp + '></div></tpl>', listeners : { focus :
			 * function() { //shapeStore.load();
			 * setTimeout('Ext.getCmp("shapeidid").expand();', 1); }, select :
			 * function() { shapeCombo2.setValue(shapeCombo.getValue());
			 * 
			 * refreshMilling_toolholder_integral(); }, specialkey : function(c,
			 * e) { if (e.getKey() == e.ENTER) { if (parent.grf == true) {
			 * c.reset(); } refreshMilling_toolholder_integralForce(); } } } });
			 */
			// 公称直径
			var nominaldiameterStore = new Ext.data.Store(
					{
						proxy : new Ext.data.HttpProxy(
								{
									url : 'drilling.do?code=queryNominaldiameterInHd_holedrilling'
								}),
						reader : new Ext.data.JsonReader({
							totalProperty : 'TOTALCOUNT',
							root : 'ROOT'
						}, [ {
							name : 'value'
						}, {
							name : 'value'
						} ])
					});
			nominaldiameterStore.load();
			//提示框
			var nominaldiameterDisplayWin = new Ext.Window(
					{
						//title : '选择助手',
						id:'nominaldiameterDisplayWinid',
						x:(document.body.clientWidth / numlign - divnum)*2+150,
						y:(document.body.clientWidth)*(1/11),
						width : 200,
						//modal : true,
						height : 200,
						frame:false,
						bodyBorder :false,
						 //baseCls: 'my-panel-no-border',
					    //baseCls: 'x-plain', 
				        border:false,
						closeAction : 'hide',
						maximizable : false,
						closable:false,
							//	plain : true,
						
					               
					     items: [ {
								id: 'boxid8',
								xtype : 'box',
								autoEl : {
									tag : 'img',
									style : 'width:100%;height:100%;' ,
									src : 'dec/combo/alter/zuankong-diameter.png'
								}
							} 
					            
					        ],
					       
						
						listeners : {
							'afterRender':function() {
								setTimeout('close', 1000)}
							
							}
							
						});
			//提示框
			var celengthDisplayWin = new Ext.Window(
					{
						//title : '选择助手',
						id:'celengthDisplayWinid',
						x:((document.body.clientWidth)/numlign-divnum)*3+213,
						y:(document.body.clientWidth)*(1/11),
						width : 200,
						//modal : true,
						height : 200,
						frame:false,
						bodyBorder :false,
						 //baseCls: 'my-panel-no-border',
					    //baseCls: 'x-plain', 
				        border:false,
						closeAction : 'hide',
						maximizable : false,
						closable:false,
							//	plain : true,
						
					               
					     items: [ {
								id: 'boxid9',
								xtype : 'box',
								autoEl : {
									tag : 'img',
									style : 'width:100%;height:100%;' ,
									src : 'dec/combo/alter/zuankong-celength.png'
								}
							} 
					            
					        ],
					       
						
						listeners : {
							'afterRender':function() {
								setTimeout('close', 1000)}
							
							}
							
						});
			
			//提示框
			var gongchengzhijinDisplayWin = new Ext.Window(
					{
						//title : '选择助手',
						id:'gongchengzhijinDisplayWinid',
						x:((document.body.clientWidth)/numlign-divnum)*2+155,
						y:(document.body.clientWidth)*(1/11),
						width : 200,
						//modal : true,
						height : 200,
						frame:false,
						bodyBorder :false,
						 //baseCls: 'my-panel-no-border',
					    //baseCls: 'x-plain', 
				        border:false,
						closeAction : 'hide',
						maximizable : false,
						closable:false,
							//	plain : true,
						
					               
					     items: [ {
								id: 'boxid15',
								xtype : 'box',
								autoEl : {
									tag : 'img',
									style : 'width:100%;height:100%;' ,
									src : 'dec/combo/alter/new/zuankong_zhengti_gongchengzhijin.png'
								}
							} 
					            
					        ],
					       
						
						listeners : {
							'afterRender':function() {
								setTimeout('close', 1000)}
							
							}
							
						});
			
			// 公称直径下拉框
			var nominaldiameterCombo = new Ext.form.ComboBox({
				fieldLabel : '公称直径',
				hiddenName : 'nominaldiameter',
				id : 'nominaldiameterid',
				emptyText : '请选择...',
				triggerAction : 'all',
				store : nominaldiameterStore,
				displayField : 'value',
				valueField : 'value',
				selectOnFocus : true,
				loadingText : '正在加载数据...',
				mode : 'local',
				forceSelection : true,
				// pageSize : cln,
				minListWidth : 100,
				height : 500,
				// plugins : [new QM.plugin.PinyinFilter],
				resizable : true,
				width : document.body.clientWidth / numlign - divnum,
				// listWidth : nominaldiameterArr[0] * nominaldiametsapp + 25,
				/*
				 * tpl : '<tpl for="."><div x-combo-list-item
				 * class="x-combo-list-item"><img src="' + webContext +
				 * '/dec/combo/milling_toolholder_integral/nominaldiameter/' +
				 * '{value}' + '.png" width=' + nominaldiameterArr[0]
				 * nominaldiametsapp + ' height=' + nominaldiameterArr[1] *
				 * nominaldiametsapp + '></div></tpl>',
				 */
				listeners : {
					focus : function() {
						// nominaldiameterStore.load();
						setTimeout('Ext.getCmp("nominaldiameterid").expand();',
								1);
					},
					expand:function(){gongchengzhijinDisplayWin.show()},
					collapse:function(){gongchengzhijinDisplayWin.hide()},
					select : function() {
						nominaldiameterCombo2.setValue(nominaldiameterCombo
								.getValue());

						refreshHd_holedrilling();
					},
					specialkey : function(c, e) {
						if (e.getKey() == e.ESC) {
							if (parent.grf == true) {
								c.reset();

								nominaldiameterCombo2.reset();
								nominaldiameterCombo2.setValue('');
							}
							refreshHd_holedrillingForce();

						}
						if (e.getKey() == e.ENTER) {
							c.setValue(Ext.get('nominaldiameterid').dom.value);
							refreshHd_holedrillingForce();
						}
					}
				}
			});

			/*
			 * // 切削深度下拉框 var shapeCombo = new Ext.form.ComboBox({ fieldLabel :
			 * '刀片形状', hiddenName : 'shape', id : 'shapeidid', emptyText :
			 * '请选择...', triggerAction : 'all', store : SHAPEStore, displayField :
			 * 'text', valueField : 'value', selectOnFocus : true, loadingText :
			 * '正在加载数据...', mode : 'local', forceSelection : true, // pageSize :
			 * cln, // minListWidth : 270, plugins : [new
			 * QM.plugin.PinyinFilter], resizable : true, width :
			 * document.body.clientWidth / numlign - divnum, listWidth :
			 * shapeArr[0] * shapepp + 25, tpl : '<tpl for="."><div
			 * x-combo-list-item class="x-combo-list-item"><img src="' +
			 * webContext + '/dec/combo/milling_toolholder_integral/shape/' +
			 * '{value}' + '.png" width=' + shapeArr[0] shapepp + ' height=' +
			 * shapeArr[1] * shapepp + '></div></tpl>', listeners : { focus :
			 * function() { //shapeStore.load();
			 * setTimeout('Ext.getCmp("shapeidid").expand();', 1); }, select :
			 * function() { shapeCombo2.setValue(shapeCombo.getValue());
			 * 
			 * refreshMilling_toolholder_integral(); }, specialkey : function(c,
			 * e) { if (e.getKey() == e.ENTER) { if (parent.grf == true) {
			 * c.reset(); } refreshMilling_toolholder_integralForce(); } } } });
			 */

			// 深度
			var celengthStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : 'drilling.do?code=queryDepthInHd_holedrilling'
				// queryDepthInHd_holedrilling是在DrillingAction中的方法queryDepthInHd_holedrilling;
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [ {
					name : 'value'
				}, {
					name : 'value'
				} ])
			});
			celengthStore.load();

			
			//提示框
			var zuankongshenduDisplayWin = new Ext.Window(
					{
						//title : '选择助手',
						id:'zuankongshenduDisplayWinid',
						x:((document.body.clientWidth)/numlign-divnum)*3+215,
						y:(document.body.clientWidth)*(1/11),
						width : 200,
						//modal : true,
						height : 200,
						frame:false,
						bodyBorder :false,
						 //baseCls: 'my-panel-no-border',
					    //baseCls: 'x-plain', 
				        border:false,
						closeAction : 'hide',
						maximizable : false,
						closable:false,
							//	plain : true,
						
					               
					     items: [ {
								id: 'boxid16',
								xtype : 'box',
								autoEl : {
									tag : 'img',
									style : 'width:100%;height:100%;' ,
									src : 'dec/combo/alter/new/zuankong_zhengti_zuankongshendu.png'
								}
							} 
					            
					        ],
					       
						
						listeners : {
							'afterRender':function() {
								setTimeout('close', 1000)}
							
							}
							
						});
			
			// 切深下拉框
			var celengthCombo = new Ext.form.ComboBox({
				fieldLabel : '切深',
				hiddenName : 'depth',
				id : 'depthid',
				emptyText : '请选择...',
				triggerAction : 'all',
				store : celengthStore,
				displayField : 'value',
				valueField : 'value',
				selectOnFocus : false,
				loadingText : '正在加载数据...',
				mode : 'local',
				forceSelection : false,
				editable : true,
				// pageSize : cln,
				minListWidth : 100,
				height : 500,
			    plugins : [new QM.plugin.PinyinFilter],
				resizable : true,
				width : document.body.clientWidth / numlign - divnum,
                
				listeners : {
					
					

					focus : function() {
						// shapeStore.load();
						setTimeout(
								'Ext.getCmp("depthid").expand();',1);
					},
					
					expand:function(){zuankongshenduDisplayWin.show()},
					collapse:function(){zuankongshenduDisplayWin.hide()},
					select : function() {
						// interferencedepthCombo2.setValue(interferencedepthCombo2.getValue());

						refreshHd_holedrillingForce();
					},

					specialkey : function(c, e) {
						if (e.getKey() == e.ESC) {
							if (parent.grf == true) {
								c.reset();

							}
							refreshHd_holedrillingForce();

						}if (e.getKey() == e.ENTER) {
							c.setValue(Ext.get('depthid').dom.value) ;
							refreshHd_holedrillingForce();
							}
					}
				
					
					
					
					
					
					
					
				}
			});

			var nominaldiameterStore2 = new Ext.data.Store(
					{
						proxy : new Ext.data.HttpProxy(
								{
									url : 'drilling.do?code=queryNominaldiameterInHd_holedrilling1'
								}),
						reader : new Ext.data.JsonReader({
							totalProperty : 'TOTALCOUNT',
							root : 'ROOT'
						}, [ {
							name : 'value'
						}, {
							name : 'value'
						} ])
					});
			nominaldiameterStore2.load();

			// 公称直径下拉框
			var nominaldiameterCombo2 = new Ext.form.ComboBox(
					{
						fieldLabel : '公称直径',
						hiddenName : 'nominaldiameter',
						id : 'nominaldiameterid2',
						emptyText : '请选择...',
						triggerAction : 'all',
						store : nominaldiameterStore2,
						displayField : 'value',
						valueField : 'value',
						selectOnFocus : true,
						loadingText : '正在加载数据...',
						mode : 'local',
						forceSelection : true,
						// pageSize : cln,
						minListWidth : 100,
						height : 500,
						// plugins : [new QM.plugin.PinyinFilter],
						resizable : true,
						width : document.body.clientWidth / numlign - divnum,
						// listWidth : nominaldiameterArr[0] * nominaldiametsapp
						// + 25,
						/*
						 * tpl : '<tpl for="."><div x-combo-list-item
						 * class="x-combo-list-item"><img src="' + webContext +
						 * '/dec/combo/refreshMilling_toolholder_clamp/nominaldiameter/' +
						 * '{value}' + '.png" width=' + nominaldiameterArr[0]
						 * nominaldiametsapp + ' height=' +
						 * nominaldiameterArr[1] * nominaldiametsapp + '></div></tpl>',
						 */
						listeners : {
							focus : function() {
								// nominaldiameterStore.load();
								setTimeout(
										'Ext.getCmp("nominaldiameterid2").expand();',
										1);
							},
							collapse:function(){nominaldiameterDisplayWin.hide()  ;},
							expand:function(){nominaldiameterDisplayWin.show() 	;},
							
							select : function() {
								nominaldiameterCombo
										.setValue(nominaldiameterCombo2
												.getValue());

								refreshHd_holedrilling2();
							},
							specialkey : function(c, e) {
								if (e.getKey() == e.ESC) {
									if (parent.grf == true) {
										c.reset();
										nominaldiameterCombo.reset();
										nominaldiameterCombo.setValue('');
									}
									refreshHd_holedrillingForce2();

								}
								if (e.getKey() == e.ENTER) {
									c
											.setValue(Ext
													.get('nominaldiameterid2').dom.value);
									refreshHd_holedrillingForce2();
								}
							}
						}
					});
			// 切削深度数据
			var interferencedepthStore2 = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : 'drilling.do?code=queryDepthInHd_holedrilling1'
				// queryDepthInHd_holedrilling是在DrillingAction中的方法queryDepthInHd_holedrilling;
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [ {
					name : 'value'
				}, {
					name : 'value'
				} ])
			});

			interferencedepthStore2.load();

			// 切削深度下拉框
			var interferencedepthCombo2 = new Ext.form.ComboBox({
				fieldLabel : '切削深度',
				hiddenName : 'interferencedepth',
				id : 'interferencedepthid2',
				emptyText : '请选择...',
				triggerAction : 'all',
				store : interferencedepthStore2,
				displayField : 'value',
				valueField : 'value',
				selectOnFocus : false,
				loadingText : '正在加载数据...',
				mode : 'local',
				forceSelection : false,
				editable : true,
				// pageSize : cln,
				minListWidth : 100, 
				height : 500,
				plugins : [new QM.plugin.PinyinFilter],
				resizable : true,
				width : document.body.clientWidth / numlign - divnum,
				// listWidth : interferencedepthArr[0] * interferencedepthpp +
				// 25,
				/*
				 * tpl : '<tpl for="."><div x-combo-list-item
				 * class="x-combo-list-item"><img src="' + webContext +
				 * '/dec/combo/refreshMilling_toolholder_clamp/interferencedepth/' +
				 * '{value}' + '.png" width=' + interferencedepthArr[0]
				 * interferencedepthpp + ' height=' + interferencedepthArr[1] *
				 * interferencedepthpp + '></div></tpl>',
				 */
				listeners : {
					focus : function() {
						// shapeStore.load();
						setTimeout(
								'Ext.getCmp("interferencedepthid2").expand();',
								1);
					},
					collapse:function(){celengthDisplayWin.hide()  ;},
					expand:function(){celengthDisplayWin.show() 	;},
					select : function() {
						// interferencedepthCombo2.setValue(interferencedepthCombo2.getValue());

						refreshHd_holedrillingForce2();
					},

					specialkey : function(c, e) {
						if (e.getKey() == e.ESC) {
							if (parent.grf == true) {
								c.reset();

							}
							refreshHd_holedrillingForce2();

						}if (e.getKey() == e.ENTER) {
							c.setValue(Ext.get('interferencedepthid2').dom.value) ;
							refreshHd_holedrillingForce2();
							}
					}
				}
			});

			// TODO
			// 整体式冷却类型
			var coolingtypeStore = new Ext.data.Store(
					{
						proxy : new Ext.data.HttpProxy(
								{
									url : 'drilling.do?code=queryCoolingtype_integralInHd_holedrilling'
								// queryCoolingtypeInHd_holedrilling是在DrillingAction中的方法queryCoolingtypeInHd_holedrilling;
								}),
						reader : new Ext.data.JsonReader({
							totalProperty : 'TOTALCOUNT',
							root : 'ROOT'
						}, [ {
							name : 'value'
						}, {
							name : 'value'
						} ])
					});
			coolingtypeStore.load();

			// 整体式 冷却类型下拉框
			var coolingtypeCombo = new Ext.form.ComboBox({
				fieldLabel : '冷却类型',
				hiddenName : 'coolingtype',
				id : 'coolingtypeid',
				emptyText : '请选择...',
				triggerAction : 'all',
				store : coolingtypeStore,
				displayField : 'value',
				valueField : 'value',
				selectOnFocus : true,
				loadingText : '正在加载数据...',
				mode : 'local',
				forceSelection : true,
				editable : false,
				// pageSize : cln,
				minListWidth : 100,
				height : 500,
				// plugins : [new QM.plugin.PinyinFilter],
				resizable : true,
				width : document.body.clientWidth / numlign - divnum,

				listeners : {
					focus : function() {
						// shapeStore.load();
						setTimeout('Ext.getCmp("coolingtypeid").expand();', 1);
					},
					select : function() {
						// mainangleCombo2.setValue(mainangleCombo2.getValue());

						refreshHd_holedrilling();
					},
					specialkey : function(c, e) {
						if (e.getKey() == e.ESC) {
							if (parent.grf == true) {
								c.reset();

							}
							refreshHd_holedrillingForce();

						}
					}
				}
			});

			// 机夹式冷却类型
			var coolingtypeStore2 = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : 'drilling.do?code=queryCoolingtypeInHd_holedrilling'
				// queryCoolingtypeInHd_holedrilling是在DrillingAction中的方法queryCoolingtypeInHd_holedrilling;
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [ {
					name : 'value'
				}, {
					name : 'value'
				} ])
			});
			coolingtypeStore2.load();

			// 机夹式冷却类型下拉框
			var coolingtypeCombo1 = new Ext.form.ComboBox(
					{
						fieldLabel : '冷却类型',
						hiddenName : 'coolingtype',
						id : 'coolingtypeid2',
						emptyText : '请选择...',
						triggerAction : 'all',
						store : coolingtypeStore2,
						displayField : 'value',
						valueField : 'value',
						selectOnFocus : true,
						loadingText : '正在加载数据...',
						mode : 'local',
						forceSelection : true,
						editable : false,
						// pageSize : cln,
						minListWidth : 100,
						height : 500,
						// plugins : [new QM.plugin.PinyinFilter],
						resizable : true,
						width : document.body.clientWidth / numlign - divnum,

						listeners : {
							focus : function() {
								// shapeStore.load();
								setTimeout(
										'Ext.getCmp("coolingtypeid2").expand();',
										1);
							},
							select : function() {
								// mainangleCombo2.setValue(mainangleCombo2.getValue());

								refreshHd_holedrilling2();
							},
							specialkey : function(c, e) {
								if (e.getKey() == e.ESC) {
									if (parent.grf == true) {
										c.reset();

									}
									refreshHd_holedrillingForce2();

								}
							}
						}
					});
			// 刀具类型
			var nameStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : 'drilling.do?code=queryName'
				// queryTooltypeInHd_holedrilling是在DrillingAction中的方法queryTooltypeInHd_holedrilling;
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [ {
					name : 'value'
				}, {
					name : 'value'
				} ])
			});
			nameStore.load();

			// 整体式刀具类型下拉框
			var nameCombo = new Ext.form.ComboBox({
				fieldLabel : '刀具类型',
				hiddenName : 'name',
				id : 'nameid',
				emptyText : '请选择...',
				triggerAction : 'all',
				store : nameStore,
				displayField : 'value',
				valueField : 'value',
				selectOnFocus : true,
				loadingText : '正在加载数据...',
				mode : 'local',
				forceSelection : true,
				editable : false,
				// pageSize : cln,
				minListWidth : 150,
				height : 500,
				// plugins : [new QM.plugin.PinyinFilter],
				resizable : true,
				width : document.body.clientWidth / numlign - divnum,

				listeners : {
					focus : function() {
						// shapeStore.load();
						setTimeout('Ext.getCmp("nameid").expand();', 1);
					},
					select : function() {
						// mainangleCombo2.setValue(mainangleCombo2.getValue());

						refreshHd_holedrilling();
					},
					specialkey : function(c, e) {
						if (e.getKey() == e.ESC) {
							if (parent.grf == true) {
								c.reset();

							}
							refreshHd_holedrillingForce();

						}
					}
				}
			});

			// 机夹式刀具类型下拉框
			var nameCombo2 = new Ext.form.ComboBox({
				fieldLabel : '刀具类型',
				hiddenName : 'name',
				id : 'nameid2',
				emptyText : '请选择...',
				triggerAction : 'all',
				store : HDCLAMPNAMEStore,
				displayField : 'value',
				valueField : 'value',
				selectOnFocus : true,
				loadingText : '正在加载数据...',
				mode : 'local',
				forceSelection : true,
				editable : false,
				// pageSize : cln,
				minListWidth : 100,
				height : 500,
				// plugins : [new QM.plugin.PinyinFilter],
				resizable : true,
				width : document.body.clientWidth / numlign - divnum,

				listeners : {
					focus : function() {
						// shapeStore.load();
						setTimeout('Ext.getCmp("nameid2").expand();', 1);
					},
					select : function() {
						// mainangleCombo2.setValue(mainangleCombo2.getValue());

						refreshHd_holedrilling2();
					},
					specialkey : function(c, e) {
						if (e.getKey() == e.ESC) {
							if (parent.grf == true) {
								c.reset();

							}
							refreshHd_holedrillingForce2();

						}
					}
				}
			});

			/*
			 * // 工件材料状态数据(页面3） var workpieceisotypeStore = new Ext.data.Store({
			 * proxy : new Ext.data.HttpProxy({ url :
			 * 'shouldermilling.do?code=queryWorkpiecematerial' }), reader : new
			 * Ext.data.JsonReader({ totalProperty : 'TOTALCOUNT', root : 'ROOT' }, [{
			 * name : 'workpiecematerialid' }, { name : 'name'// ,convert:
			 * nameaddmark }, { name : 'name2' }, { name : 'mark' }, { name :
			 * 'wmtype' }, { name : 'heattreat' }, { name : 'hardness' }]),
			 * baseParams : { start : 0, limit : bbar.pageSize, query : '' } });
			 * workpieceisotypeStore.load();
			 */

			/*
			 * // 行号 var rownum_iso = new Ext.grid.RowNumberer({ header : '序',
			 * width : 26 });
			 */
			// 页面3
			/*
			 * var workpieceisotypeCm = new Ext.grid.ColumnModel([rownum_iso, {
			 * header : '材料牌号', dataIndex : 'name', width : 100, sortable : true }, {
			 * header : '材料牌号ID', dataIndex : 'workpiecematerialid', width : 1,
			 * hidden : true, sortable : true }, { header : '牌号-印记', dataIndex :
			 * 'name2', width : 1, hidden : true, sortable : true }, { header :
			 * '印记', dataIndex : 'mark', width : 50, // align : 'center',
			 * sortable : true }, { header : '材料类型', dataIndex : 'wmtype', width :
			 * 100, sortable : true }, { header : '热处理状态', dataIndex :
			 * 'heattreat', width : 90, sortable : true }, { header : '硬度',
			 * dataIndex : 'hardness', width : 80, sortable : true }]);
			 */

			// var resultTpl = new Ext.XTemplate('<tpl for="."><div
			// class="search-item">', '{name}', '</div></tpl>');
			var workpieceisotypeGrid3 = new Ext.grid.GridPanel(
					{
						title : '',
						region : 'center',
						height : 300,
						width : 600,
						stripeRows : true,
						// autoSizeColumns : true,
						trackMouseOver : true,
						frame : true,
						store : workpieceisotypeStore,
						cm : workpieceisotypeCm,
						sm : new Ext.grid.RowSelectionModel({
							singleSelect : true
						}),
						viewConfig : {
							forceFit : true
						},
						tbar : [
								{
									xtype : 'combo',
									id : 'inputname_isotype3',
									// hiddenName : 'workpiecematerialid',
									store : workpieceisotypeStore,
									cls : 'search',
									// name : 'filetitle',
									displayField : 'name2',
									valueField : 'workpiecematerialid',
									emptyText : '工件材料牌号|印记',
									// loadingText : '正在加载数据，请稍候...',
									width : 200,
									// pageSize: cln,
									selectOnFocus : true,
									mode : 'local',
									// itemSelector : 'div.search-item',
									typeAhead : false,
									// tpl : resultTpl,
									// tpl : '<table><tr><tpl for="."><td
									// class="x-combo-list-item">{text}</td><tpl
									// if="xindex % 5 ===
									// 0"></tr><tr></tpl></tpl></tr></table>',
									hideTrigger : true,
									enableKeyEvents : true,
									maxHeight : 0,
									plugins : [ new QM.plugin.PinyinFilter ],
									// 响应回车键
									listeners : {
										specialkey : function(field, e) {
											if (e.getKey() == e.ENTER) {
												queryInfo_isotype3();
											}
										},
										select : function(record) {
											this
													.setValue(record.data.workpiecematerialid);
										},
										focus : function() {
											workpieceisotypeCombo3.setValue('');
										}
									}
								},
								{
									text : '确定',
									iconCls : 'acceptIcon',
									handler : function() {
										var r = workpieceisotypeGrid3
												.getSelectionModel()
												.getSelected();
										if (typeof r == 'undefined') {
											infoMsg('您没有选中任何条目，请先选中要修改的项目，您也可以直接双击要选择的行！');
											return;
										} else {
											// workpieceisotypeCombo3.setValue(r.get('workpiecematerialid'));
											// workpieceisotypeCombo3.setRawValue(r.get('name'));

											selectMenu3.hide();

											// refreshMilling_toolholder_integral();
										}
									}
								}, '->', {
									text : '清空材料牌号',
									iconCls : 'tbar_synchronizeIcon',
									handler : function() {
										// selectMenu3.suspendEvents();
										workpieceisotypeCombo.reset();
										workpieceisotypeCombo3.reset();
										selectMenu3.hide();
										// selectMenu3.resumeEvents();
										// var r =
										// g.getSelectionModel().getSelected();

										// refreshMilling_toolholder_integral();
									}
								} ],/*
									 * view : new Ext.ux.grid.BufferView({
									 * rowHeight : 50, scrollDelay : true }),
									 */
						listeners : {
							rowdblclick : function(g, rowIndex, event) {
								selectMenu3.hide();
								/*
								 * var r = g.getSelectionModel().getSelected();
								 * 
								 * workpieceisotypeCombo3.setValue(r.get('workpiecematerialid'));
								 * workpieceisotypeCombo3.setRawValue(r.get('name'));
								 * 
								 * refreshMilling_toolholder_integral();
								 */
							},
							rowclick : function(g, rowIndex, event) {
								var r = g.getSelectionModel().getSelected();
								workpieceisotypeCombo3.setValue(r
										.get('workpiecematerialid'));
								workpieceisotypeCombo3.setRawValue(r
										.get('name'));
							}
						}
					});

			// 查询表格数据
			function queryInfo_isotype3() {
				workpieceisotypeCombo3.collapse();
				selectMenu3.hide();
				/*
				 * var va = Ext.getCmp('inputname_isotype').getRawValue();
				 * 
				 * workpieceisotypeCombo3.setValue(Ext.getCmp('inputname_isotype').getValue());
				 * workpieceisotypeCombo3.setRawValue(va.substring(0,
				 * va.indexOf('-')));
				 */

				// refreshMilling_toolholder_integral();
				/*
				 * workpieceisotypeStore3.load({ params : { start : 0, limit :
				 * bbar.pageSize, keyword :
				 * Ext.getCmp('inputname_isotype').getValue() } });
				 */
			}

			var selectMenu3 = new Ext.menu.Menu({
				items : [ workpieceisotypeGrid3 ],
				listeners : {
					hide : function(m) {
						// infoMsg('sfgsfdg');
						var r = workpieceisotypeGrid3.getSelectionModel()
								.getSelected();
						if (typeof r == 'undefined') {
							workpieceisotypeCombo3.reset();
						} else {
							if (workpieceisotypeCombo3.getValue() != "") {
								workpieceisotypeCombo.setValue(r
										.get('workpiecematerialid'));
								workpieceisotypeCombo
										.setRawValue(r.get('name'));

								workpieceisotypeCombo3.setValue(r
										.get('workpiecematerialid'));
								workpieceisotypeCombo3.setRawValue(r
										.get('name'));
							}
						}

						recs = grid2.getSelectionModel().getSelections();
						if (~Ext.isEmpty(recs)) {
							hd_blade_drilling_StoreLoad(recs);
						} else {
							hd_blade_drilling_StoreLoad(recs);
						}
					}
				}
			});

			// 页面过滤
			var filtersHd_holedrilling = new Ext.ux.grid.GridFilters({// string,numeric,date,list,boolean
				encode : true,
				autoReload : false,
				local : true,
				filters : [ {
					dataIndex : 'sapcode',
					type : 'string'
				}, {
					dataIndex : 'name',
					type : 'string'
				}, {
					dataIndex : 'type',
					type : 'string'
				}, {
					dataIndex : 'figure',
					type : 'string'
				}, {
					dataIndex : 'figure2',
					type : 'string'
				}, {
					dataIndex : 'brandid',
					type : 'string'
				}, {
					dataIndex : 'cuttype',
					type : 'string'
				},/* {
					dataIndex : 'typeid',
					type : 'string'
				},*/ {
					dataIndex : 'hdtooltype',
					type : 'string'
				}, {
					dataIndex : 'description',
					type : 'string'
				}, {
					dataIndex : 'remark',
					type : 'string'
				}, {
					dataIndex : 'k1',
					type : 'string'
				} ]
			});

			// 工件材料状态下拉框
			var workpieceisotypeCombo3 = new Ext.form.ComboBox({
				fieldLabel : '工件材料牌号',
				hiddenName : 'workpiecematerialid',
				triggerAction : 'all',
				store : new Ext.data.ArrayStore({
					fields : [ 'name', 'name' ],
					data : [ [] ]
				}),
				displayField : 'name',
				valueField : 'workpiecematerialid',
				lazyRender : true,
				editable : false,
				emptyText : '请选择...',
				loadingText : '正在加载数据...',
				mode : 'local',
				forceSelection : true,
				onSelect : Ext.emptyFn,
				// tpl : resultTpl2,
				// pageSize : cln,
				// minListWidth : 600,
				// plugins : [new QM.plugin.PinyinFilter],
				width : document.body.clientWidth / numlign - divnum,
				listeners : {
					expand : function(field) {
						if (this.menu == null) {
							this.menu = selectMenu3;
						}
						// workpieceisotypeStore3.load();
						this.menu.show(this.el, "tl-bl?");
						// selectMenu3.show();
						Ext.getCmp('inputname_isotype3').focus(true, 500);
					}/*
						 * , focus : function(field) { if (this.menu == null) {
						 * this.menu = selectMenu3; }
						 * //workpieceisotypeStore3.load();
						 * this.menu.show(this.el, "tl-bl?");
						 * //selectMenu3.show();
						 * Ext.getCmp('inputname_isotype').focus(true, 500); }
						 */
				}
			});

			// 刀尖圆弧半径下拉框
			/*
			 * var noseradiusCombo3 = new Ext.form.ComboBox({ fieldLabel :
			 * '刀尖圆弧半径', hiddenName : 'noseradius', id : 'noseradiusid3',
			 * emptyText : '请选择...', triggerAction : 'all', store :
			 * noseradiusStore3, displayField : 'text', valueField : 'value',
			 * selectOnFocus : true, loadingText : '正在加载数据...', mode : 'local',
			 * forceSelection : true, // pageSize : cln, // minListWidth : 270,
			 * plugins : [new QM.plugin.PinyinFilter], resizable : true, width :
			 * document.body.clientWidth / numlign - divnum, // listWidth :
			 * noseradiusArr[0] * noseradiuspp + 25, listeners : { focus :
			 * function() { // noseradiusStore.load();
			 * setTimeout('Ext.getCmp("noseradiusid3").expand();', 1); }, select :
			 * function() { //
			 * noseradiusCombo2.setValue(noseradiusCombo3.getValue());
			 * 
			 * refreshMilling_blade_clamp(); },
			 * 
			 * specialkey : function(a, e) { if (e.getKey() == e.ENTER) { if
			 * (parent.grf == true) { a.reset(); c.setValue(''); }
			 * refreshMilling_blade_clampForce(); } } } });
			 */

			// 表格工具栏 
			var tbar = new Ext.Toolbar({// workpiecematerialCombo
				// //workpieceisotypeCombo
				items : [ new Ext.Toolbar.TextItem({
					text : '工件材料:',
					autoHeight : true
				}), workpieceisotypeCombo, '-', new Ext.Toolbar.TextItem({
					text : '公称直径:',
					autoHeight : true
				}), nominaldiameterCombo, '-', new Ext.Toolbar.TextItem({
					text : '钻孔深度:',
					autoHeight : true
				}), celengthCombo, '-', new Ext.Toolbar.TextItem({
					text : '冷却类型:',
					autoHeight : true
				}), coolingtypeCombo, '-', new Ext.Toolbar.TextItem({
					text : '刀具类型:',
					autoHeight : true
				}), nameCombo,'-', {
					text : '打印预览',
					iconCls : 'previewIcon',
					handler : function() {
						printTask3();
					}
				}, '->', {
					text : '重置',
					iconCls : 'tbar_synchronizeIcon',
					handler : function() {
						resetCombo();
					}
				} ]
			});

			// 表格工具栏
			var tbar2 = new Ext.Toolbar({// workpiecematerialCombo
				// //workpieceisotypeCombo
				items : [ new Ext.Toolbar.TextItem({
					text : '工件材料:',
					autoHeight : true
				}), workpieceisotypeCombo3, '-', new Ext.Toolbar.TextItem({
					text : '公称直径:',
					autoHeight : true
				}), nominaldiameterCombo2, '-', new Ext.Toolbar.TextItem({
					text : '钻孔深度:',
					autoHeight : true
				}), interferencedepthCombo2, '-', new Ext.Toolbar.TextItem({
					text : '冷却类型:',
					autoHeight : true
				}), coolingtypeCombo1, '-', new Ext.Toolbar.TextItem({
					text : '刀具类型:',
					autoHeight : true
				}), nameCombo2,'-', '-', {
					text : '刀体打印预览',
					iconCls : 'previewIcon',
					handler : function() {
						printTask();
					}
				}, '-', '-', {
					text : '刀片打印预览',
					iconCls : 'previewIcon',
					handler : function() {
						printTask2();
					}
				}, '->', {
					text : '重置',
					iconCls : 'tbar_synchronizeIcon',
					handler : function() {
						resetCombo2();
					}
				} ]
			});

			// 整体式铰孔表格
			var grid = new Ext.grid.GridPanel({
				title : '<span class="commoncss">整体式刀具</span>',
				header : false,
				height : 500,
				id : 'gridid',
				autoScroll : true,
				frame : true,
				region : 'center',
				store : hd_holedrillingStore1,
				stripeRows : true,
				sm : sm,
				cm : hd_holedrillingCm,
				tbar : tbar,
				bbar : bbar,
				viewConfig : {
					forceFit : false
				// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
				},
				loadMask : {
					msg : '正在加载表格数据,请稍等...'
				},
				view : new Ext.grid.GroupingView(),
				plugins : [ filtersHd_holedrilling ],
				stateful : sf,
				/* stateId : 'grid-reaming', */
				listeners : {
					afterrender : function() {
						if (parent.grf == true) {
							calcButton.hide();
							/*
							 * calcButton2.hide(); calcButton3.hide();
							 */
						} else {
							calcButton.show();
							/*
							 * calcButton2.show(); calcButton3.show();
							 */
						}
					}
				}
			});

			// 机夹式钻孔刀体
			var grid2 = new Ext.grid.GridPanel({
				title : '<span class="commoncss">机夹式钻孔刀体</span>',
				header : false,
				height : (document.body.clientHeight - 31) * grid_ratio,
				id : 'grid2id',
				autoScroll : true,
				frame : true,
				region : 'center',
				store : hd_holedrillingStore,
				stripeRows : true,
				sm : sm2,
				cm : jijiahd_holedrillingCm,
				tbar : tbar2,
				// bbar : bbar2,
				viewConfig : {
					forceFit : false
				// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
				},
				loadMask : {
					msg : '正在加载表格数据,请稍等...'
				},
				view : new Ext.grid.GroupingView(),
				plugins : [ filtersHd_holedrilling ],
				stateful : sf,
				/* stateId : 'grid-reaming', */
				listeners : {
					afterrender : function() {
						if (parent.grf == true) {
							calcButton.hide();
							/*
							 * calcButton2.hide(); calcButton3.hide();
							 */
						} else {
							calcButton.show();
							/*
							 * calcButton2.show(); calcButton3.show();
							 */
						}
					}
				}
			});

			// 表格工具栏
			var tbar3 = new Ext.Toolbar({// workpiecematerialCombo
				// //workpieceisotypeCombo
				items : [/*
							 * new Ext.Toolbar.TextItem({ text : '材料牌号:',
							 * autoHeight : true }), workpieceisotypeCombo3,
							 * '-', new Ext.Toolbar.TextItem({ text : '刀尖圆弧半径:',
							 * autoHeight : true }), noseradiusCombo3, '-', new
							 * Ext.Toolbar.TextItem({ text : '刀尖圆弧半径:',
							 * autoHeight : true }), noseradiusCombo2,
							 */'->', {
					text : '重置',
					iconCls : 'tbar_synchronizeIcon',
					handler : function() {
						resetCombo3();
					}
				} ]
			});

			// 刀片grid
			var grid3 = new Ext.grid.GridPanel({
				// title : '<span class="commoncss">机夹式钻孔刀片</span>',
				header : false,
				height : (document.body.clientHeight - 31) * (1 - grid_ratio),
				id : 'grid3id',
				autoScroll : true,
				frame : true,
				region : 'center',
				store : hd_blade_drilling_Store,
				stripeRows : true,
				sm : sm3,
				cm : hd_blade_drillingCm,
				// tbar : tbar3,
				bbar : bbar2, // 请注意,在第三个grid中使用的是第二个的bbar2!
				// 2014-03-17-16-52-02
				viewConfig : {
					forceFit : false
				// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
				},
				loadMask : {
					msg : '正在加载表格数据,请稍等...'
				},
				view : new Ext.grid.GroupingView(),
				// plugins : [filtersMilling_blade_clamp],
				stateful : sf,
				/* stateId : 'grid-shouldermilling3', */
				listeners : {
					afterrender : function() {
						if (parent.grf == true) {
							calcButton.hide();
							calcButton2.hide();
							calcButton3.hide();
						} else {
							calcButton.show();
							calcButton2.show();
							calcButton3.show();
						}
					}
				}
			});

			// 表格单击事件
			grid.on('rowclick', function(pGrid, rowIndex, event) {
				// Ext.getCmp('modifyid').enable();
				// Ext.getCmp('deleteid').enable();
			});
			// 表格双击事件
			grid.on('rowdblclick', function(grid, rowIndex, event) {
				propertyDisplay();
			});

			// 是否默认选中第一行数据
			bbar.on("change", function() {
				// grid.getSelectionModel().selectFirstRow();
			});

			// 页面初始自动查询数据
			hd_holedrillingStore1.load({
				params : {
					start : 0,
					limit : bbar.pageSize
				}
			});

			// 表格单击事件
			grid2.on('rowclick', function(pGrid, rowIndex, event) {
				recs = pGrid.getSelectionModel().getSelections();

				// 加载双grid中的下面的grid的数据;
				hd_blade_drilling_StoreLoad(recs);
			});
			// 表格双击事件
			grid2.on('rowdblclick', function(grid, rowIndex, event) {
				propertyDisplay2();
			});

			// 是否默认选中第一行数据
			bbar2.on("change", function() {
				// grid.getSelectionModel().selectFirstRow();
			});

			// 页面初始自动查询数据
			/*
			 * milling_toolholder_clampStore.load({ params : { start : 0, limit :
			 * bbar2.pageSize } });
			 */

			// 表格单击事件
			grid3.on('rowclick', function(pGrid, rowIndex, event) {
				// Ext.getCmp('modifyid').enable();
				// Ext.getCmp('deleteid').enable();
			});
			// 表格双击事件
			grid3.on('rowdblclick', function(grid, rowIndex, event) {
				propertyDisplay3();
			});

			// 是否默认选中第一行数据
			/*
			 * bbar3.on("change", function() { //
			 * grid.getSelectionModel().selectFirstRow(); });
			 */

			// 页面初始自动查询数据
			/*
			 * milling_blade_clampStore.load({ params : { start : 0, limit :
			 * bbar2.pageSize } });
			 */

			// 表格右键
			var contextmenu = new Ext.menu.Menu({
				id : 'theContextMenu',
				items : [ {
					text : '复制',
					iconCls : 'buildingIcon',
					handler : function() {
						copyCell();
					}
				}, '-', {
					text : '刷新',
					iconCls : 'arrow_refreshIcon',
					handler : function() {
						hd_holedrillingStore1.reload();
					}
				}, {
					text : '重置',
					iconCls : 'tbar_synchronizeIcon',
					handler : function() {
						resetCombo();
					}
				} ]
			});

			// 复制
			function copyCell() {
				copyToClipboard(infoCell);
			}

			// 绑定右键
			var infoCell;
			grid.on("cellcontextmenu",
					function(grid, rowIndex, columnIndex, e) {// cellcontextmenu
						// //rowcontextmenu
						e.preventDefault();
						grid.getSelectionModel().selectRow(rowIndex);

						var record = grid.getStore().getAt(rowIndex); // 获取record
						var fieldName = grid.getColumnModel().getDataIndex(
								columnIndex);// 当前列的fieldname
						infoCell = record.get(fieldName);// 获取当前单元格数据

						contextmenu.showAt(e.getXY());
					});

			grid.on("contextmenu", function(e) {// cellcontextmenu
				// //rowcontextmenu
				e.preventDefault();
			});

			// 表格右键
			var contextmenu2 = new Ext.menu.Menu({
				id : 'theContextMenu2',
				items : [ {
					text : '复制',
					iconCls : 'buildingIcon',
					handler : function() {
						copyCell2();
					}
				}, '-', {
					text : '刷新',
					iconCls : 'page_refreshIcon',
					handler : function() {
						hd_holedrillingStore.reload();
					}
				}, {
					text : '重置',
					iconCls : 'tbar_synchronizeIcon',
					handler : function() {
						resetCombo2();
					}
				} ]
			});

			// 复制
			function copyCell2() {
				copyToClipboard(infoCell2);
			}

			// 绑定右键
			var infoCell2;
			grid2.on("cellcontextmenu", function(grid2, rowIndex, columnIndex,
					e) {// cellcontextmenu
				// //rowcontextmenu
				e.preventDefault();
				grid2.getSelectionModel().selectRow(rowIndex);

				var record2 = grid2.getStore().getAt(rowIndex); // 获取record
				var fieldName2 = grid2.getColumnModel().getDataIndex(
						columnIndex);// 当前列的fieldname
				infoCell2 = record2.get(fieldName2);// 获取当前单元格数据

				contextmenu2.showAt(e.getXY());
			});

			grid2.on("contextmenu", function(e) {// cellcontextmenu
				// //rowcontextmenu
				e.preventDefault();
			});

			// 表格右键
			var contextmenu3 = new Ext.menu.Menu({
				id : 'theContextMenu3',
				items : [ {
					text : '复制',
					iconCls : 'buildingIcon',
					handler : function() {
						copyCell3();
					}
				}, '-', {
					text : '刷新',
					iconCls : 'page_refreshIcon',
					handler : function() {
						hd_blade_drilling_Store.reload();
					}
				}, {
					text : '重置',
					iconCls : 'tbar_synchronizeIcon',
					handler : function() {
						resetCombo3();
					}
				} ]
			});

			// 复制
			function copyCell3() {
				copyToClipboard(infoCell3);
			}

			// 绑定右键
			var infoCell3;
			grid3.on("cellcontextmenu", function(grid3, rowIndex, columnIndex,
					e) {// cellcontextmenu
				// //rowcontextmenu
				e.preventDefault();
				grid3.getSelectionModel().selectRow(rowIndex);

				var record3 = grid3.getStore().getAt(rowIndex); // 获取record
				var fieldName3 = grid3.getColumnModel().getDataIndex(
						columnIndex);// 当前列的fieldname
				infoCell3 = record3.get(fieldName3);// 获取当前单元格数据

				contextmenu3.showAt(e.getXY());
			});

			grid3.on("contextmenu", function(e) {// cellcontextmenu
				// //rowcontextmenu
				e.preventDefault();
			});
			var grid2and3 = new Ext.Panel(
					{
						title : '机夹式刀具',
						frame : false,
						id : 'gridid2_3',
						layout : {
							type : 'vbox',
							align : 'center'
						},
						items : [ grid2, grid3 /*
												 * { rowHeight : .7, // baseCls :
												 * 'x-plain', // bodyStyle :
												 * 'padding:5px 0 5px 5px',
												 * items : [grid2] }, {
												 * rowHeight : .3, items :
												 * [grid3] }
												 */],
						listeners : {
							resize : function(p, aw, ah, ow, oh) {
								if (!grid_init) {
									if (ah < oh) { // 隐藏了header
										grid2.setHeight(grid2.height - 80
												* grid_ratio);
										grid3.setHeight(grid3.height - 80
												* (1 - grid_ratio));
									} else {
										grid2.setHeight(grid2.height + 80
												* grid_ratio);
										grid3.setHeight(grid3.height + 80
												* (1 - grid_ratio));
									}
								}
								grid_init = false;
							}
						}
					});

			var tabs = new Ext.TabPanel(
					{
						region : 'center',
						id : 'tabsid',
						enableTabScroll : true,
						// autoWidth : true,
						activeTab : 0,
						height : document.body.clientHeight,
						width : document.body.clientWidth,
						buttonAlign : 'right',
						items : [ grid2and3, grid /* , grid3, */],
						listeners : {
							tabchange : function(tabpanel, tab) {
								/*
								 * if (tab.getId() == 'gridid') {//激活了刀体grid;
								 * refreshMilling_toolholder_integralForce(); }
								 * else if(tab.getId() == 'grid2id') {
								 * refreshMilling_toolholder_clampForce(); }
								 */
								if (tabpanel.getActiveTab().getId() == 'gridid') {// 激活了刀体grid;
									// refreshMilling_toolholder_integralForce();
									// milling_toolholder_integralStore.reload();
									hd_holedrillingStoreLoad();
								} else if (tabpanel.getActiveTab().getId() == 'gridid2_3') {
									// milling_toolholder_clampStore.reload();
									// refreshMilling_toolholder_clampForce();
									hd_holedrillingStore2Load();
									// } else if
									// (tabpanel.getActiveTab().getId() ==
									// 'grid3id') {
									// milling_blade_clampStore.reload();
									// refreshMilling_blade_clampForce();
									hd_blade_drilling_StoreLoad();
								}
							}
						}
					});

			// 布局模型
			var viewport = new Ext.Viewport({
				layout : 'border',
				items : [ tabs ]
			});

			// 刷新整体式刀具
			function refreshHd_holedrilling() {
				if (parent.grf == true) {
					refreshHd_holedrillingForce();
				}
			}

			// 刷新整体式刀具
			function refreshHd_holedrillingForce() {
				hd_holedrillingStoreLoad();
			}

			// 刷新机夹式钻孔刀刀体
			function refreshHd_holedrilling2() {
				if (parent.grf == true) {
					refreshHd_holedrillingForce2();
				}
			}

			// 刷新机夹式钻孔刀刀体
			function refreshHd_holedrillingForce2() {
				hd_holedrillingStore2Load();
			}

			// 刷新机夹式钻孔刀刀片
			function refreshMilling_blade_clamp() {
				if (parent.grf == true) {
					refreshMilling_blade_clampForce();
				}
			}

			// 刷新机夹式钻孔刀刀片
			function refreshMilling_blade_clampForce() {
				hd_blade_drilling_StoreLoad();
			}

			// 更新
			function resetCombo() {
				workpieceisotypeCombo.setValue('');
				nominaldiameterCombo.setValue('');
				celengthCombo.setValue('');
				coolingtypeCombo.setValue('');

				// workpieceisotypeCombo2.setValue('');
				/*
				 * nominaldiameterCombo2.setValue('');
				 * interferencedepthCombo2.setValue('');
				 */
				// noseradiusCombo3.setValue('');
				/* workpieceisotypeCombo3.setValue(''); */
				// nominaldiameterCombo3.setValue('');
				nameCombo.setValue('');
				/*
				 * shapeCombo.setValue(''); //shapeCombo.reset();
				 * reliefangleCombo.setValue(''); //reliefangleCombo.reset();
				 * 
				 * celengthCombo.reset(); celengthCombo.disable();
				 * 
				 * noseradiusCombo.reset();
				 * 
				 * shapeCombo2.setValue(''); //shapeCombo2.reset();
				 * reliefangleCombo2.setValue(''); //reliefangleCombo2.reset();
				 * 
				 * //milling_toolholder_integralStore.reload(); /* .load({
				 * params : { workpieceisotype : '', accuracyid : '', shape :
				 * '', reliefangle : '', celength : '', noseradius : '' } });
				 */

				/*
				 * milling_toolholder_clampStore.load({ params : { turningtype :
				 * turningtypeCombo.getValue(), thheadangle :
				 * thheadangleCombo.getValue(), handoftool :
				 * handoftoolCombo.getValue(), portsize :
				 * portsizeCombo.getValue(), cseries : cseriesCombo.getValue(),
				 * shapeblade : '', reliefangleblade : '' } });
				 */
				
				pagesize_combo.reset();
				bbar.pageSize=50;
				hd_holedrillingStoreLoad();
				var currentpage=1;
				var currentpage=bbar.store.currentPage;
				bbar.moveFirst();
			}

			// 更新
			function resetCombo2() {
				// workpieceisotypeCombo2.setValue('');
				nominaldiameterCombo2.setValue('');
				interferencedepthCombo2.setValue('');
				// noseradiusCombo3.setValue('');
				workpieceisotypeCombo.setValue('');
				nominaldiameterCombo.setValue('');
				celengthCombo.setValue('');
				nameCombo2.setValue('');

				workpieceisotypeCombo3.setValue('');
				coolingtypeCombo1.setValue('');
				/*
				 * turningtypeCombo.reset(); thheadangleCombo.reset();
				 * handoftoolCombo.reset(); portsizeCombo.reset();
				 * cseriesCombo.reset();
				 * 
				 * shapeCombo2.setValue(''); //shapeCombo2.reset();
				 * reliefangleCombo2.setValue(''); //reliefangleCombo2.reset();
				 * 
				 * boreCombo.reset(); boreCombo.hide();
				 * Ext.getCmp('borelableid').hide();
				 * 
				 * shapeCombo.setValue(''); //shapeCombo.reset();
				 * reliefangleCombo.setValue(''); //shapeCombo.reset();
				 * 
				 * celengthCombo.setValue(''); celengthCombo.disable(); /*
				 * milling_toolholder_integralStore.load({ params : {
				 * workpieceisotype : workpieceisotypeCombo.getValue(),
				 * accuracyid : accuracyCombo.getValue(), shape : '',
				 * reliefangle : '', celength : celengthCombo.getValue(),
				 * noseradius : noseradiusCombo.getValue() } });
				 */

				// milling_toolholder_clampStore.reload();
				/*
				 * .load({ params : { turningtype : '', thheadangle : '',
				 * handoftool : '', portsize : '', cseries : '', shapeblade :
				 * '', reliefangleblade : '' } });
				 */
				

				pagesize_combo2.reset();
				bbar2.pageSize=50;
				hd_blade_drilling_StoreLoad();
				hd_holedrillingStore2Load();
				var currentpage=1;
				var currentpage=bbar2.store.currentPage;
				bbar2.moveFirst();

			}

			/*
			 * // 更新 function resetCombo3() {
			 * workpieceisotypeCombo3.setValue(''); //
			 * nominaldiameterCombo3.setValue('');
			 * noseradiusCombo2.setValue('');
			 * workpieceisotypeCombo2.setValue('');
			 * nominaldiameterCombo2.setValue('');
			 * interferencedepthCombo2.reset(); noseradiusCombo2.setValue('');
			 * workpieceisotypeCombo.setValue('');
			 * nominaldiameterCombo.setValue(''); noseradiusCombo.setValue('');
			 * 
			 * milling_blade_clampStoreLoad(); }
			 */

			// 数据动态加载
			function dataLoadDynamic(pictureTabs, parameterGrid,
					parameterStore, milling_blade_clampStorePanel, sapPanel3,
					sapStore3) {
				var record = grid2.getSelectionModel().getSelected(); // 刀体
				var record2 = grid3.getSelectionModel().getSelected(); // 刀片

				if (pictureTabs.getActiveTab().getItemId() == 'milling_blade_clampPanelid') {
					milling_blade_clampStorePanel.load({
						params : {
							featurecode : record2.data.featurecode
						}
					});
				} else if (pictureTabs.getActiveTab().getItemId() == 'picturePanel3id') {
					var newsrc = checkImagePath(record.data.figure);
					Ext.getCmp('boxid5').getEl().dom.src = newsrc;
				} else if (pictureTabs.getActiveTab().getItemId() == 'sizePanel3id') {

					var newsrc = checkImagePath(record.data.figure2);
					Ext.getCmp('boxid6').getEl().dom.src = newsrc;

				} else if (pictureTabs.getActiveTab().getItemId() == 'parameterid') {
					parameterStore.load({
						params : {
							workpiecematerialid : workpieceisotypeCombo
									.getValue(),
							k1 : record.data.k1,
							nominaldiameter:record.data.nominaldiameter,
							// toolholder
							k2 : record2.data.k2
						// blade
						}
					});
				} else if (pictureTabs.getActiveTab().getItemId() == 'sapPanel3id') {
					sapStore3.load({
						params : {
							sapcode : record.data.sapcode
						}
					});
				}
			}

			function dataLoadDynamic1(pictureTabs, parameterGrid,
					parameterStore, sapPanel, sapStore) {
				var record = grid.getSelectionModel().getSelected(); // 刀体

				if (pictureTabs.getActiveTab().getItemId() == 'parameterid') {
					parameterStore.load({
						params : {
							workpiecematerialid : workpieceisotypeCombo
									.getValue(),
									nominaldiameter:record.data.nominaldiameter,
							k1 : record.data.k1
						// toolholder

						}
					});
				} else if (pictureTabs.getActiveTab().getItemId() == 'picturePanelid') {
					var newsrc = checkImagePath(record.data.figure);
					Ext.getCmp('boxid').getEl().dom.src = newsrc;
				} else if (pictureTabs.getActiveTab().getItemId() == 'sizePanelid') {

					var newsrc = checkImagePath(record.data.figure2);
					Ext.getCmp('boxid2').getEl().dom.src = newsrc;

				} else if (pictureTabs.getActiveTab().getItemId() == 'sapPanelid') {
					sapStore.load({
						params : {
							sapcode : record.data.sapcode
						}
					});
				}
			}

			// 查看整体刀具详细信息;
			function propertyDisplay() {
				var record = grid.getSelectionModel().getSelected();
				var index = grid.getStore().indexOf(record);

				var path = checkImagePath(record.data.figure);

				var path2 = checkImagePath(record.data.figure2);

				var propertygrid = new Ext.grid.PropertyGrid({
					title : '整体刀具详情',
					border : true,
					autoSort : false,
					frame : true,
					ds : hd_holedrillingStore1,
					cm : hd_holedrillingCm,
					id : 'propertyGridid',
					enableColLock : true,
					enableColumnMove : false,
					autoExpandColumn : true,
					loadMask : true,
					stripeRows : true,
					autoScroll : true,
					clicksToEdit : 1,
					propertyNames : {
						
						
						'name' : '刀具名称',
						'sapcode' : 'SAP编号',
						'figure' : '结构简图',
						'figure2' : '实物图',
						'brandid' : '品牌',
						'type' : '型号',
						'cuttype' : '切削类型',
						
						'hdtooltype' : '刀具类型',
						'description' : '特点',
						'remark' : '备注信息',
						'nominaldiameter' : '公称直径 ',

						'nominaldiameter1' : '公称直径 ',
						'toothnumber' : '齿数 ',
						'length' : '总长',
						'depth1' : '钻孔深度 ',
						'groovelength' : '沟槽长度 ',
						'portsize' : '接口尺寸 ',
						'centreblade' : '中心刀片 ',
						'rimblade' : '周边刀片 ',
						'coolingtype1' : '冷却类型 ',
						'aname1' : '附件信息 ',

						'nominaldiameter2' : '公称直径 ',
						'portsize' : '接口尺寸 ',
						'rimblade' : '周边刀片 ',
						'centredrill' : '中心钻 ',
						'coolingtype2' : '冷却类型 ',
						'aname2' : '附件信息 ',

						'standard' : '标准 ',
						'nominaldiameter3' : '公称直径 ',
						'materialid' : '材质 ',
						'pointangle' : '锋角 ',
						'toothnumber' : '齿数 ',
						'length' : '总长 ',
						'depth3' : '钻孔深度 ',
						'groovelength' : '沟槽长度 ',
						'portsize' : '接口尺寸 ',
						'coolingtype3' : '冷却类型 ',

						'rakeangle' : '锋角 ',
						'toothnumber' : '齿数 ',
						'length' : '总长 ',
						'depth4' : '钻孔深度 ',
						'groovelength' : '沟槽长度 ',
						'portsize' : '接口尺寸 ',
						'centreblade' : '中心刀片 ',
						'coolingtype4' : '冷却类型 ',
						'c' : '附件信息 '

					},
					/*
					 * customEditors : { 'cuttype' : new Ext.grid.GridEditor(new
					 * Ext.form.ComboBox({ displayField : 'text', mode :
					 * 'local', triggerAction : 'all', store : CUTTYPEStore })),
					 * 'nominaldiameter' : new Ext.grid.GridEditor(new
					 * Ext.form.ComboBox({ displayField : 'text', mode :
					 * 'local', triggerAction : 'all', store :
					 * nominaldiameterStore })), 'mainangle' : new
					 * Ext.grid.GridEditor(new Ext.form.ComboBox({ displayField :
					 * 'text', mode : 'local', triggerAction : 'all', store :
					 * mainangleStore })) }, customRenderers : { 'cuttype' :
					 * CUTTYPERender, 'nominaldiameter' : NOMINALDIAMETERRender,
					 * 'mainangle' : MAINANGLERender, 'teethnumber' :
					 * TEETHNUMBERRender },
					 */
					listeners : {
						beforeedit : function(e) {
							e.cancel = true;
							return false;
						}
					}
				});

				var picturePanel = new Ext.Panel({
					title : '结构简图',
					id : 'picturePanelid',
					autoScroll : true,
					frame : true,
					region : 'center',
					// sm : sm2,
					// cm : milling_toolholder_clampCm,
					// tbar : tbar2,
					// bbar : bbar2,
					viewConfig : {
						forceFit : true
					// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
					},
					loadMask : {
						msg : '正在加载图像数据,请稍等...'
					},
					items : [ {
						id : 'boxid',
						xtype : 'box',
						autoEl : {
							tag : 'img',
							style : 'width:80%;height:80%;position:relative;top:10%;left:10%',
							src : path
						}
					} ]
				// view : new Ext.grid.GroupingView(),
				// plugins : [filtersMilling_toolholder_clamp],
				// stateful : true,
				// stateId : 'grid-shouldermilling-milling_toolholder_clamp'
				});

				var sizePanel = new Ext.Panel({
					title : '尺寸简图',
					id : 'sizePanelid',
					autoScroll : true,
					frame : true,
					region : 'center',
					// sm : sm2,
					// cm : milling_toolholder_clampCm,
					// tbar : tbar2,
					// bbar : bbar2,
					viewConfig : {
						forceFit : true
					// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
					},
					loadMask : {
						msg : '正在加载图像数据,请稍等...'
					},
					items : [ {
						id : 'boxid2',
						xtype : 'box',
						autoEl : {
							tag : 'img',
							style : 'width:80%;height:80%;position:relative;top:10%;left:10%',
							src : path2
						}
					} ]
				// view : new Ext.grid.GroupingView(),
				// plugins : [filtersMilling_toolholder_clamp],
				// stateful : true,
				// stateId : 'grid-shouldermilling-milling_toolholder_clamp'
				});

				var propertyTabs = new Ext.TabPanel({
					region : 'center',
					id : 'propertytabsid',
					enableTabScroll : true,
					// autoWidth : true,
					activeTab : 0,
					height : document.body.clientHeight,
					// width : document.body.clientWidth / 4,
					// width : 400,
					buttonAlign : 'right',
					items : [ propertygrid ]
				/*
				 * , listeners : { tabchange : function(tabpanel, tab) { } }
				 */
				});

				// Store数据存储
				var parameterStore = new Ext.data.GroupingStore({
					proxy : new Ext.data.HttpProxy({
						url : 'drilling.do?code=queryinternalParameter'
					// queryMilling_blade_clamp4Manage是在TempletmillingAction中的方法queryMilling_blade_clamp4Manage;
					}),
					reader : new Ext.data.JsonReader({
						totalProperty : 'TOTALCOUNT',
						root : 'ROOT'
					}, [{
								name : 'vc'
							}, {
								name : 'fn'
							}, {
								name : 'shape'
							}, {
								name : 'removalrates'
							}, {
								name : 's'
							}, {
								name : 'f'
							}, {
								name : 'power'
							}])
				});

				// 列模型
				var parameterCm = new Ext.grid.ColumnModel([{
					header : 'Vc<br />(m/min)',
					dataIndex : 'vc',
					width : 60,
					align : 'center',
					// renderer : THICKNESS2Render,
					// hidden : true,
					sortable : true
				}, {
					header : 'S<br />(r/min)',
					dataIndex : 's',
					width : 100,
					align : 'center',
					// renderer : THICKNESS2Render,
					// hidden : true,
					sortable : true
				}, {
					header : 'fn<br />(mm/r)',
					dataIndex : 'fn',
					width : 60,
					align : 'center',
					// hidden : true,
					sortable : true
				}, {
					header : 'F<br />(mm/min)',
					dataIndex : 'f',
					width : 100,
					align : 'center',
					// renderer : THICKNESS2Render,
					// hidden : true,
					sortable : true
				},{
					header : 'shape',
					dataIndex : 'shape',
					width : 60,
					align : 'center',
				    hidden : true,
					sortable : true
				}, {
					header : 'Q<br />(cm^3/min)',
					dataIndex : 'removalrates',
					width : 100,
					align : 'center',
					// renderer : THICKNESS2Render,
					hidden : true,
					sortable : true
				},  {
					header : 'Pc<br />(kW)',
					dataIndex : 'power',
					width : 60,
					align : 'center',
					hidden : true,
					sortable : true
				}]);

				var parameterGrid = new Ext.grid.GridPanel({
					title : '切削参数',
					header : false,
					height : 500,
					id : 'parameterid',
					autoScroll : true,
					frame : true,
					// disabled : true,
					region : 'center',
					store : parameterStore,
					stripeRows : true,
					// sm : sm2,
					cm : parameterCm,
					// tbar : tbar2,
					// bbar : bbar2,
					viewConfig : {
						forceFit : false
					// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
					},
					loadMask : {
						msg : '正在加载表格数据,请稍等...'
					}

				// view : new Ext.grid.GroupingView(),
				// plugins : [filtersMilling_toolholder_clamp],
				// stateful : true,
				// stateId : 'cuttingparameterID'
				});

				var sapStore = new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
						url : 'generalturning.do?code=querySapinformation'
					// queryToolholder4Manage是在ToolholderAction中的方法queryToolholder4Manage;
					}),
					reader : new Ext.data.JsonReader({
						totalProperty : 'TOTALCOUNT',
						root : 'ROOT'
					}, [ {
						name : 'id'
					}, {
						name : 'departmentid'
					}, {
						name : 'storagelocation'
					}, {
						name : 'sapcode'
					}, {
						name : 'description'
					}, {
						name : 'position'
					}, {
						name : 'unit'
					}, {
						name : 'price'
					}, {
						name : 'amount'
					}, {
						name : 'worth'
					}, {
						name : 'time'
					} ])
				});

				// 库存表格
				var sapPanel = new Ext.grid.GridPanel({
					title : '库存信息',
					// header : false,
					autoScroll : true,
					id : 'sapPanelid',
					// disabled : true,
					frame : true,
					region : 'center',
					store : sapStore,
					stripeRows : true,
					// sm : sm2,
					cm : new Ext.grid.ColumnModel([ new Ext.grid.RowNumberer({
						header : '序',
						width : 26
					}), {
						header : '编号',
						dataIndex : 'id',
						width : 60,
						hidden : true,
						sortable : true

					}, {
						header : '部门编号',
						dataIndex : 'departmentid',
						width : 130,
						// hidden : true,
						sortable : true
					}, {
						header : '库存地点',
						dataIndex : 'storagelocation',
						width : 80,
						sortable : true
					}, {
						header : 'SAP编码',
						dataIndex : 'sapcode',
						width : 160,
						sortable : true
					}, {
						header : '物料描述',
						dataIndex : 'description',
						width : 130,
						// hidden : true,
						sortable : true
					}, {
						header : '仓位',
						dataIndex : 'position',
						width : 80,
						sortable : true
					}, {
						header : '基本计量单位',
						dataIndex : 'unit',
						width : 60,
						hidden : true,
						sortable : true
					}, {
						header : '单价',
						dataIndex : 'price',
						width : 130,
						hidden : true,
						sortable : true
					}, {
						header : '库存数量',
						dataIndex : 'amount',
						width : 80,
						sortable : true
					}, {
						header : '库存价值',
						dataIndex : 'worth',
						width : 130,
						hidden : true,
						sortable : true
					}, {
						header : '更新时间',
						dataIndex : 'time',
						width : 80,
						sortable : true
					} ]),
					// tbar : tbar2,
					// bbar : bbar2,
					viewConfig : {
						forceFit : true
					// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
					},
					loadMask : {
						msg : '正在加载表格数据,请稍等...'
					}
				});

				var pictureTabs = new Ext.TabPanel({
					region : 'east',
					split : true,
					enableTabScroll : true,
					width : '60%',
					// collapsible: true,
					// margins:'3 0 3 3',
					// cmargins:'3 3 3 3',
					activeTab : 0,
					height : document.body.clientHeight,
					// width : document.body.clientWidth / 4,
					buttonAlign : 'right',
					items : [ picturePanel, sizePanel, sapPanel, parameterGrid
					/* milling_toolholder_integralPanel */],
					listeners : {
						tabchange : function(tabpanel, tab) {
							
							  if (pictureTabs.getActiveTab()
										.getItemId() == 'picturePanelid') {
									var newsrc = checkImagePath(record.data.figure);
									Ext.getCmp('boxid').getEl().dom.src = newsrc;
								} else if (pictureTabs.getActiveTab()
										.getItemId() == 'sizePanelid') {

									var newsrc = checkImagePath(record.data.figure2);
									Ext.getCmp('boxid2').getEl().dom.src = newsrc;

								} 
							dataLoadDynamic1(tabpanel, parameterGrid,
									parameterStore, sapPanel, sapStore);
						}
					}

				});

				var propertyDisplayWin = new Ext.Window(
						{
							title : '整体式刀具详细信息',
							width : 800,
							modal : true,
							height : 400,
							closeAction : 'close',
							maximizable : true,
							// plain : true,
							layout : 'border',
							items : [ propertyTabs, pictureTabs ],
							buttons : [
									{
										text : '上一条',
										id : 'previousbtn',
										iconCls : 'app_leftIcon',
										handler : function() {
											grid.getSelectionModel().selectRow(
													index - 1);
											grid.getView().focusRow(index - 1);
											index = index - 1;
											if (index <= 0) {
												infoMsg('已经到第一条了.');
												// grid.getSelectionModel().selectRow(index
												// + 1);
												// grid.getView().focusRow(index
												// + 1);
												index = 0;
												record = grid.getStore().getAt(
														index);
												propertygrid
														.setSource({'SAP编号':	record.data.sapcode,
															'刀具名称':	record.data.name,
															'刀具型号':	record.data.type,
														    '品牌':	record.data.brandid,
														    '切削类型':	record.data.cuttype,
														    '材质 ':	record.data.materialid,
														    '公称直径 ':	record.data.nominaldiameter,
														    '总长':	record.data.length,
														    '沟槽长度 ':	record.data.groovelength,
														    '齿数 ':	record.data.toothnumber,
														    '接口尺寸 ':	record.data.portsize});
												Ext.getCmp('previousbtn')
														.disable();
											} else {
												record = grid.getStore().getAt(
														index);
												propertygrid
														.setSource({'SAP编号':	record.data.sapcode,
															'刀具名称':	record.data.name,
															'刀具型号':	record.data.type,
														    '品牌':	record.data.brandid,
														    '切削类型':	record.data.cuttype,
														    '材质 ':	record.data.materialid,
														    '公称直径 ':	record.data.nominaldiameter,
														    '总长':	record.data.length,
														    '沟槽长度 ':	record.data.groovelength,
														    '齿数 ':	record.data.toothnumber,
														    '接口尺寸 ':	record.data.portsize});
												Ext.getCmp('nextbtn').enable();
											}
											
											 if (pictureTabs.getActiveTab()
														.getItemId() == 'picturePanelid') {
													var newsrc = checkImagePath(record.data.figure);
													Ext.getCmp('boxid').getEl().dom.src = newsrc;
												} else if (pictureTabs.getActiveTab()
														.getItemId() == 'sizePanelid') {

													var newsrc = checkImagePath(record.data.figure2);
													Ext.getCmp('boxid2').getEl().dom.src = newsrc;

												} 
											dataLoadDynamic1(pictureTabs,
													parameterGrid,
													parameterStore, sapPanel,
													sapStore);
										}
									},
									{
										text : '下一条',
										id : 'nextbtn',
										iconCls : 'app_rightIcon',
										handler : function() {
											grid.getSelectionModel().selectRow(
													index + 1);
											grid.getView().focusRow(index + 1);
											index = index + 1;
											if (index >= grid.getStore()
													.getCount() - 1) {
												infoMsg('已经到最后一条了.');
												// grid.getSelectionModel().selectRow(index
												// - 1);
												// grid.getView().focusRow(index
												// - 1);
												index = grid.getStore().getCount() - 1;
												record = grid.getStore().getAt(
														index);
												propertygrid
														.setSource({'SAP编号':	record.data.sapcode,
															'刀具名称':	record.data.name,
															'刀具型号':	record.data.type,
														    '品牌':	record.data.brandid,
														    '切削类型':	record.data.cuttype,
														    '材质 ':	record.data.materialid,
														    '公称直径 ':	record.data.nominaldiameter,
														    '总长':	record.data.length,
														    '沟槽长度 ':	record.data.groovelength,
														    '齿数 ':	record.data.toothnumber,
														    '接口尺寸 ':	record.data.portsize
															});
												Ext.getCmp('nextbtn').disable();
											} else {
												record = grid.getStore().getAt(
														index);
												propertygrid
														.setSource({'SAP编号':	record.data.sapcode,
															'刀具名称':	record.data.name,
															'刀具型号':	record.data.type,
														    '品牌':	record.data.brandid,
														    '切削类型':	record.data.cuttype,
														    '材质 ':	record.data.materialid,
														    '公称直径 ':	record.data.nominaldiameter,
														    '总长':	record.data.length,
														    '沟槽长度 ':	record.data.groovelength,
														    '齿数 ':	record.data.toothnumber,
														    '接口尺寸 ':	record.data.portsize
															});
												Ext.getCmp('previousbtn')
														.enable();
											}

											
											 if (pictureTabs.getActiveTab()
														.getItemId() == 'picturePanelid') {
													var newsrc = checkImagePath(record.data.figure);
													Ext.getCmp('boxid').getEl().dom.src = newsrc;
												} else if (pictureTabs.getActiveTab()
														.getItemId() == 'sizePanelid') {

													var newsrc = checkImagePath(record.data.figure2);
													Ext.getCmp('boxid2').getEl().dom.src = newsrc;

												} 
											dataLoadDynamic1(pictureTabs,
													parameterGrid,
													parameterStore, sapPanel,
													sapStore);

										}
									}, {
										text : '保存',
										id : 'savebtn',
										hidden : true,
										iconCls : 'acceptIcon',
										handler : function() {

										}
									}, {
										text : '关闭',
										id : 'cancelbtn',
										iconCls : 'cancelIcon',
										handler : function() {
											propertyDisplayWin.close();
										}
									} ],
							listeners : {
								afterrender : function(tabpanel, tab) {
									propertygrid.setSource({'SAP编号':	record.data.sapcode,
										'刀具名称':	record.data.name,
										'刀具型号':	record.data.type,
									    '品牌':	record.data.brandid,
									    '切削类型':	record.data.cuttype,
									    '材质 ':	record.data.materialid,
									    '公称直径 ':	record.data.nominaldiameter,
									    '总长':	record.data.length,
									    '沟槽长度 ':	record.data.groovelength,
									    '齿数 ':	record.data.toothnumber,
									    '接口尺寸 ':	record.data.portsize,
									 /*   
									    '刀具类型':	record.data.hdtooltype,
										'特点':	record.data.description,
										'备注信息':	record.data.remark,
										'公称直径 ':	record.data.nominaldiameter1,
										
										
										'钻孔深度 ':	record.data.depth1,
										
										
										'中心刀片 ':	record.data.centreblade,
										'周边刀片 ':	record.data.rimblade,
										'冷却类型 ':	record.data.coolingtype1,
										'附件信息 ':	record.data.aname1,
										'公称直径 ':	record.data.nominaldiameter2,
										'接口尺寸 ':	record.data.portsize,
										'周边刀片 ':	record.data.rimblade,
										'中心钻 ':	record.data.centredrill,
										'冷却类型 ':	record.data.coolingtype2,
										'附件信息 ':	record.data.aname2,
										'标准 ':	record.data.standard,
										'公称直径 ':	record.data.nominaldiameter3,
										
										'锋角 ':	record.data.pointangle,
										'齿数 ':	record.data.toothnumber,
										
										'钻孔深度 ':	record.data.depth3,
										'沟槽长度 ':	record.data.groovelength,
										'接口尺寸 ':	record.data.portsize,
										'冷却类型 ':	record.data.coolingtype3,
										'锋角 ':	record.data.rakeangle,
										'齿数 ':	record.data.toothnumber,
										'总长 ':	record.data.length,
										'钻孔深度 ':	record.data.depth4,
										'沟槽长度 ':	record.data.groovelength,
										'接口尺寸 ':	record.data.portsize,
										'中心刀片 ':	record.data.centreblade,
										'冷却类型 ':	record.data.coolingtype4,*/
										'附件信息 ':	record.data.c});
								},
								beforeshow : function(win) {
									var workpiecematerialid = workpieceisotypeCombo
											.getValue();
									if (workpiecematerialid != "") {
										Ext.getCmp('parameterid').enable();
									} else {
										Ext.getCmp('parameterid').disable();
									}
								}
							}

						});

				propertyDisplayWin.show();
			}

			// 查看机夹式钻孔刀刀体详细信息;
			function propertyDisplay2() {
				var record = grid2.getSelectionModel().getSelected();
				var index = grid2.getStore().indexOf(record);

				var path = checkImagePath(record.data.figure);
				var path2 = checkImagePath(record.data.figure2);

				var propertygrid2 = new Ext.grid.PropertyGrid({
					title : '刀体详情',
					border : true,
					autoSort : false,
					frame : true,
					ds : hd_holedrillingStore,
					cm : jijiahd_holedrillingCm,
					id : 'propertyGrid2id',
					enableColLock : true,
					enableColumnMove : false,
					autoExpandColumn : true,
					loadMask : true,
					stripeRows : true,
					autoScroll : true,
					clicksToEdit : 1,
					propertyNames : {
						'sapcode' : 'SAP编号',
						'name' : '刀体名称',
						'type' : '型号',
						'figure' : '结构简图',
						'figure2' : '实物图',
						'brandid' : '品牌',
						'cuttype' : '切削类型',
						'hdtooltype' : '刀具类型',
						
						'nominaldiameter' : '公称直径 ',
						'length' : '总长',
						'depth' : '钻孔深度',
						'groovelength' : '沟槽长度',
						'coolingtype' : '冷却类型',
						'portsize' : '接口尺寸',
						'toothnumber' : '齿数',
						'htpcentreblade' : '中心刀片',
						
						'rimblade1' : '周边刀片',
						'aname' : '附件1名称',
						'anametype1' : '附件1型号',
						'aname2' : '附件2名称',
						'anametype2' : '附件2型号',
						'aname3' : '附件3名称',
						'anametype3' : '附件3型号',
						'aname4' : '附件4名称',
						'anametype4' : '附件4型号',
						
						'htsccentreblade' : '中心刀片',
					
						'rakeangle' : '锋角 ',
						'c' : '附件',
						
                        'htccentredrill' : '中心钻',
						'rimblade2' : '周边刀片 ',
						//'aname' : '附件信息',
						
						'description' : '特点',
						'remark' : '备注信息'
					},
					/*
					 * customEditors : { 'cuttype' : new Ext.grid.GridEditor(new
					 * Ext.form.ComboBox({ displayField : 'text', mode :
					 * 'local', triggerAction : 'all', store : CUTTYPEStore })),
					 * 'nominaldiameter' : new Ext.grid.GridEditor(new
					 * Ext.form.ComboBox({ displayField : 'text', mode :
					 * 'local', triggerAction : 'all', store :
					 * nominaldiameterStore })), 'mainangle' : new
					 * Ext.grid.GridEditor(new Ext.form.ComboBox({ displayField :
					 * 'text', mode : 'local', triggerAction : 'all', store :
					 * mainangleStore })) }, customRenderers : { 'cuttype' :
					 * CUTTYPERender, 'nominaldiameter' : NOMINALDIAMETERRender,
					 * 'mainangle' : MAINANGLERender },
					 */
					listeners : {
						beforeedit : function(e) {
							e.cancel = true;
							return false;
						}
					}
				});

				/*
				 * var cuttingparameter2 = new Ext.grid.GridPanel({ title :
				 * '切削参数', header : false, height : 500, //id : 'grid2id',
				 * autoScroll : true, frame : true, disabled : true, region :
				 * 'center', //store : milling_toolholder_clampStore, stripeRows :
				 * true, //sm : sm2, //cm : milling_toolholder_clampCm, //tbar :
				 * tbar2, //bbar : bbar2, viewConfig : { forceFit : false //
				 * 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况 }, loadMask : { msg :
				 * '正在加载表格数据,请稍等...' } //view : new Ext.grid.GroupingView(),
				 * //plugins : [filtersMilling_toolholder_clamp], //stateful :
				 * true, //stateId :
				 * 'grid-shouldermilling-milling_toolholder_clamp' } );
				 */

				var picturePanel2 = new Ext.Panel({
					title : '结构简图',
					id : 'picturePanel2id',
					autoScroll : true,
					frame : true,
					region : 'center',
					// sm : sm2,
					// cm : milling_toolholder_clampCm,
					// tbar : tbar2,
					// bbar : bbar2,
					viewConfig : {
						forceFit : true
					// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
					},
					loadMask : {
						msg : '正在加载图像数据,请稍等...'
					},
					items : [ {
						id : 'boxid3',
						xtype : 'box',
						autoEl : {
							tag : 'img',
							style : 'width:80%;height:80%;position:relative;top:10%;left:10%',
							src : path
						}
					} ]
				// view : new Ext.grid.GroupingView(),
				// plugins : [filtersMilling_toolholder_clamp],
				// stateful : true,
				// stateId : 'grid-shouldermilling-milling_toolholder_clamp'
				});

				var sizePanel2 = new Ext.Panel({
					title : '尺寸简图',
					id : 'sizePanel2id',
					autoScroll : true,
					frame : true,
					region : 'center',
					// sm : sm2,
					// cm : milling_toolholder_clampCm,
					// tbar : tbar2,
					// bbar : bbar2,
					viewConfig : {
						forceFit : true
					// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
					},
					loadMask : {
						msg : '正在加载图像数据,请稍等...'
					},
					items : [ {
						id : 'boxid4',
						xtype : 'box',
						autoEl : {
							tag : 'img',
							style : 'width:80%;height:80%;position:relative;top:10%;left:10%',
							src : path2
						}
					} ]
				// view : new Ext.grid.GroupingView(),
				// plugins : [filtersMilling_toolholder_clamp],
				// stateful : true,
				// stateId : 'grid-shouldermilling-milling_toolholder_clamp'
				});

				var hd_holedrillingStorePanel = new Ext.data.Store(
						{
							proxy : new Ext.data.HttpProxy(
									{
										url : 'drilling.do?code=queryHd_blade_poledrilling4Manage'
									// queryMilling_toolholder_integral4Manage是在Milling_toolholder_integralAction中的方法queryMilling_toolholder_integral4Manage;
									}),
							reader : new Ext.data.JsonReader({
								totalProperty : 'TOTALCOUNT',
								root : 'ROOT'
							}, [ {
								name : 'name'
							}, {
								name : 'sapcode'
							}, {
								name : 'type'
							},{
								name : 'brandid'
							}, {
								name : 'featurecode'
							} ])
						});
				// hd_holedrillingStorePanel.load();

				// 表格
				var hd_holedrillingPanel = new Ext.grid.GridPanel({
					title : '匹配刀片',
					// header : false,
					autoScroll : true,
					id : 'hd_holedrillingPanelid',
					// disabled : true,
					frame : true,
					region : 'center',
					store : hd_holedrillingStorePanel,
					stripeRows : true,
					// sm : sm2,
					cm : new Ext.grid.ColumnModel([ new Ext.grid.RowNumberer({
						header : '序',
						width : 26
					}), {
						header : 'SAP编码',
						dataIndex : 'sapcode',
						width : 130,
						// hidden : true,
						sortable : true
					},  {
						header : '刀片名称',
						dataIndex : 'name',
						width : 60,
						sortable : true
					},{
						header : '刀片型号',
						dataIndex : 'type',
						width : 80,
						sortable : true
					},{
						header : '品牌',
						dataIndex : 'brandid',
						width : 80,
						sortable : true
					}, {
						header : '特征码',
						dataIndex : 'featurecode',
						width : 130,
						// hidden : true,
						sortable : true
					} ]),
					// tbar : tbar2,
					// bbar : bbar2,
					viewConfig : {
						forceFit : true
					// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
					},
					loadMask : {
						msg : '正在加载表格数据,请稍等...'
					}
				});

				var propertyTabs2 = new Ext.TabPanel({
					region : 'center',
					id : 'propertytabs2id',
					enableTabScroll : true,
					// autoWidth : true,
					activeTab : 0,
					height : document.body.clientHeight,
					// width : document.body.clientWidth / 4,
					// width : 400,
					buttonAlign : 'right',
					items : [ propertygrid2 ]
				/*
				 * , listeners : { tabchange : function(tabpanel, tab) { } }
				 */
				});

				var sapStore2 = new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
						url : 'generalturning.do?code=querySapinformation'
					// queryToolholder4Manage是在ToolholderAction中的方法queryToolholder4Manage;
					}),
					reader : new Ext.data.JsonReader({
						totalProperty : 'TOTALCOUNT',
						root : 'ROOT'
					}, [ {
						name : 'id'
					}, {
						name : 'departmentid'
					}, {
						name : 'storagelocation'
					}, {
						name : 'sapcode'
					}, {
						name : 'description'
					}, {
						name : 'position'
					}, {
						name : 'unit'
					}, {
						name : 'price'
					}, {
						name : 'amount'
					}, {
						name : 'worth'
					}, {
						name : 'time'
					} ])
				});

				// 库存表格
				var sapPanel2 = new Ext.grid.GridPanel({
					title : '库存信息',
					// header : false,
					autoScroll : true,
					id : 'sapPanel2id',
					// disabled : true,
					frame : true,
					region : 'center',
					store : sapStore2,
					stripeRows : true,
					// sm : sm2,
					cm : new Ext.grid.ColumnModel([ new Ext.grid.RowNumberer({
						header : '序',
						width : 26
					}), {
						header : '编号',
						dataIndex : 'id',
						width : 60,
						hidden : true,
						sortable : true

					}, {
						header : '部门编号',
						dataIndex : 'departmentid',
						width : 130,
						// hidden : true,
						sortable : true
					}, {
						header : '库存地点',
						dataIndex : 'storagelocation',
						width : 80,
						sortable : true
					}, {
						header : 'SAP编码',
						dataIndex : 'sapcode',
						width : 160,
						sortable : true
					}, {
						header : '物料描述',
						dataIndex : 'description',
						width : 130,
						// hidden : true,
						sortable : true
					}, {
						header : '仓位',
						dataIndex : 'position',
						width : 80,
						sortable : true
					}, {
						header : '基本计量单位',
						dataIndex : 'unit',
						width : 60,
						hidden : true,
						sortable : true
					}, {
						header : '单价',
						dataIndex : 'price',
						width : 130,
						hidden : true,
						sortable : true
					}, {
						header : '库存数量',
						dataIndex : 'amount',
						width : 80,
						sortable : true
					}, {
						header : '库存价值',
						dataIndex : 'worth',
						width : 130,
						hidden : true,
						sortable : true
					}, {
						header : '更新时间',
						dataIndex : 'time',
						width : 80,
						sortable : true
					} ]),
					// tbar : tbar2,
					// bbar : bbar2,
					viewConfig : {
						forceFit : true
					// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
					},
					loadMask : {
						msg : '正在加载表格数据,请稍等...'
					}
				});

				// Store数据存储(复合钻钻杆)
				var hd_cutterbar_combineddrillingStore = new Ext.data.GroupingStore(
						{
							proxy : new Ext.data.HttpProxy(
									{
										url : 'drilling.do?code=queryHd_cutterbar_combineddrilling4Manage'
									// queryHd_cutterbar_combineddrilling4Manage是在Hd_blade_combineddrillingAction中的方法queryHd_cutterbar_combineddrilling4Manage;
									}),
							reader : new Ext.data.JsonReader({
								totalProperty : 'TOTALCOUNT',
								root : 'ROOT'
							}, [ {
								name : 'toolholderid'
							}, {
								name : 'sapcode'
							}, {
								name : 'name'
							}, {
								name : 'type'
							}, {
								name : 'figure'
							}, {
								name : 'figure2'
							}, {
								name : 'brandid'
							}, {
								name : 'cuttype'
							},  {
								name : 'nominaldiameter'
							},  {
								name : 'length'
							}, {
								name : 'depth'
							}, {
								name : 'portsize'
							}, {
								name : 'mcc'
							}, {
								name : 'groovelength'
							}, {
								name : 'coolingtype'
							}, {
								name : 'description'
							}, {
								name : 'remark'
							}, {
								name : 'aname'
							}, {
								name : 'anametype1'
							}, {
								name : 'aname2'
							}, {
								name : 'anametype2'
							}, {
								name : 'aname3'
							}, {
								name : 'anametype3'
							}, {
								name : 'aname4'
							}, {
								name : 'anametype4'
							}, {
								name : 'aname5'
							}, {
								name : 'anametype5'
							} ])
						});

				// 列模型(复合钻钻杆)
				var hd_cutterbar_combineddrillingCm = new Ext.grid.ColumnModel(
						[/*
							 * { header : '钻杆编号', // 列标题 dataIndex :
							 * 'toolholderid', // 数据索引,和Store数据存储模型对应 width :
							 * 60, // 列宽度 sortable : true, // 该列是否要排序 hidden :
							 * true // 该列是否隐藏 },
							 */{
							header : '钻杆名称',
							dataIndex : 'name',
							width : 100,
							sortable : true
						// hidden : true
						}, {
							header : 'SAP编号',
							dataIndex : 'sapcode',
							width : 120,
							sortable : true

						// hidden : true
						}, {
							header : '钻杆型号',
							dataIndex : 'type',
							width : 80,
							// hidden : true,
							sortable : true
						},{
							header : '切削类型',
							dataIndex : 'cuttype',
							width : 80,
							// hidden : true,
							sortable : true
						}, {
							header : '公称直径',
							dataIndex : 'nominaldiameter',
							width : 80,
							// hidden : true,
							sortable : true
						}, {
							header : '总长',
							dataIndex : 'length',
							width : 60,
							// renderer : TURNINGTYPERender,
							// hidden : true,
							sortable : true
						}, {
							header : '钻孔深度',
							dataIndex : 'depth',
							width : 80,
							align : 'center',
							// hidden : true,
							sortable : true
						}, {
							header : '接口尺寸',
							dataIndex : 'portsize',
							width : 60,
							align : 'center',
							hidden : true,
							sortable : true
						}, {
							header : 'MCC',
							dataIndex : 'mcc',
							width : 60,
							align : 'center',
							hidden : true,
							sortable : true
						}, {
							header : '沟槽长度',
							dataIndex : 'groovelength',
							align : 'center',
							width : 80,
							// renderer : SHAPERender,
							hidden : true,
							sortable : true
						}, {
							header : '冷却类型',
							dataIndex : 'coolingtype',
							width : 80,
							align : 'center',
							hidden : true,
							// renderer : RELIEFANGLERender,
							sortable : true
						}, {
							header : '附件名称1',
							dataIndex : 'aname',
							width : 80,
							align : 'center',
							hidden : true,
							// renderer : RELIEFANGLERender,
							sortable : true
						}, {
							header : '附件类型1',
							dataIndex : 'anametype1',
							width : 80,
							align : 'center',
							hidden : true,
							// renderer : RELIEFANGLERender,
							sortable : true
						}, {
							header : '附件名称2',
							dataIndex : 'aname2',
							width : 80,
							align : 'center',
							hidden : true,
							// renderer : RELIEFANGLERender,
							sortable : true
						}, {
							header : '附件类型2',
							dataIndex : 'anametype2',
							width : 80,
							align : 'center',
							hidden : true,
							// renderer : RELIEFANGLERender,
							sortable : true
						}, {
							header : '附件名称3',
							dataIndex : 'aname3',
							width : 80,
							align : 'center',
							hidden : true,
							// renderer : RELIEFANGLERender,
							sortable : true
						}, {
							header : '附件类型3',
							dataIndex : 'anametype3',
							width : 80,
							align : 'center',
							hidden : true,
							// renderer : RELIEFANGLERender,
							sortable : true
						}, {
							header : '附件名称4',
							dataIndex : 'aname4',
							width : 80,
							align : 'center',
							hidden : true,
							// renderer : RELIEFANGLERender,
							sortable : true
						}, {
							header : '附件类型4',
							dataIndex : 'anametype4',
							width : 80,
							align : 'center',
							hidden : true,
							// renderer : RELIEFANGLERender,
							sortable : true
						}, {
							header : '附件名称5',
							dataIndex : 'aname5',
							width : 80,
							align : 'center',
							hidden : true,
							// renderer : RELIEFANGLERender,
							sortable : true
						}, {
							header : '附件类型5',
							dataIndex : 'anametype5',
							width : 80,
							align : 'center',
							hidden : true,
							// renderer : RELIEFANGLERender,
							sortable : true
						} /*
							 * { header : '特点', dataIndex : 'description', width :
							 * 80, align : 'center', // hidden : true, //
							 * renderer : CELENGTHRender, sortable : true },
							 *//*
							 * { header : '备注信息', dataIndex : 'remark', width :
							 * 80, hidden : true, sortable : true }, { header :
							 * '附件信息', dataIndex : 'aname', width : 80, hidden :
							 * true, sortable : true }
							 */]);

				// 匹配钻杆表格
				var hd_cutterbar_combineddrillingPanel = new Ext.grid.GridPanel(
						{
							title : '匹配钻杆',
							// header : false,
							autoScroll : true,
							id : 'hd_cutterbar_combineddrillingPanelid',
							// disabled : true,
							frame : true,
							region : 'center',
							store : hd_cutterbar_combineddrillingStore,
							stripeRows : true,
							// sm : sm2,
							cm : hd_cutterbar_combineddrillingCm,
							// tbar : tbar2,
							// bbar : bbar2,
							viewConfig : {
								forceFit : false
							// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
							},
							loadMask : {
								msg : '正在加载表格数据,请稍等...'
							}
						});

				var pictureTabs2 = new Ext.TabPanel(
						{
							region : 'east',
							split : true,
							enableTabScroll : true,
							width : '60%',
							// collapsible: true,
							// margins:'3 0 3 3',
							// cmargins:'3 3 3 3',
							activeTab : 0,
							height : document.body.clientHeight,
							// width : document.body.clientWidth / 4,
							buttonAlign : 'right',
							items : [ picturePanel2,
									sizePanel2 /* ,cuttingparameter2, */,
									hd_holedrillingPanel, sapPanel2,
									hd_cutterbar_combineddrillingPanel ],
							listeners : {
								tabchange : function(tabpanel, tab) {
									if (tab.getId() == 'hd_holedrillingPanelid') {
										var a = null;
										if (Ext.isDefined(grid2
												.getSelectionModel()
												.getSelections())) {
											var a = jsArray2JsString(grid2
													.getSelectionModel()
													.getSelections(),
													'featurecode');
										}
										hd_holedrillingStorePanel.load({
											params : {
												featurecode : a
											// record.data.featurecode
											}
										});
									} else if (tab.getId() == 'sapPanel2id') {
										sapStore2.load({
											params : {
												sapcode : record.data.sapcode
											}
										});
									} else if (pictureTabs2.getActiveTab()
											.getItemId() == 'picturePanel2id') {
										var newsrc = checkImagePath(record.data.figure);
										Ext.getCmp('boxid3').getEl().dom.src = newsrc;
									} else if (pictureTabs2.getActiveTab()
											.getItemId() == 'sizePanel2id') {

										var newsrc = checkImagePath(record.data.figure2);
										Ext.getCmp('boxid4').getEl().dom.src = newsrc;

									} else if (tab.getId() == 'hd_cutterbar_combineddrillingPanelid') {
										hd_cutterbar_combineddrillingStore
												.load({
													params : {
														portsize : record.data.portsize
													}
												});
									}
								}
							}
						});

				var propertyDisplayWin2 = new Ext.Window(
						{
							title : '机夹式钻孔刀刀体详细信息',
							width : 800,
							modal : true,
							height : 400,
							closeAction : 'close',
							maximizable : true,
							// plain : true,
							layout : 'border',
							items : [ propertyTabs2, pictureTabs2 ],
							buttons : [
									{
										text : '上一条',
										id : 'previousbtn2',
										iconCls : 'app_leftIcon',
										handler : function() {
											grid2.getSelectionModel().selectRow(index - 1);
											grid2.getView().focusRow(index - 1);
											index = index - 1;
											if (index <= 0) {
												infoMsg('已经到第一条了.');
												index = 0;
												record = grid2.getStore()
												.getAt(index);
										propertygrid2
												.setSource({'SAP编号':	record.data.sapcode,
													'刀体名称':	record.data.name,
													'型号':	record.data.type,
													'品牌':	record.data.brandid,
													'切削类型':	record.data.cuttype,
													'刀具类型':	record.data.hdtooltype,
													'公称直径 ':	record.data.nominaldiameter,
													'总长':	record.data.length,
													'钻孔深度':	record.data.depth,
													'沟槽长度 ':	record.data.groovelength,
                                                	'冷却类型':	record.data.coolingtype,
													'接口尺寸':	record.data.portsize,
													'齿数':	record.data.toothnumber,
													'中心刀片':	record.data.htpcentreblade,
													'中心刀片':	record.data.htpcentreblade,
													
													'周边刀片':	record.data.rimblade1,
													'附件1名称':	record.data.aname,
													'附件1型号':	record.data.anametype1,
													'附件2名称':	record.data.aname2,
													'附件2型号':	record.data.anametype2,
													'附件3名称':	record.data.aname3,
													'附件3型号':	record.data.anametype3,
													'附件4名称':	record.data.aname4,
													'附件4型号':	record.data.anametype4,
													
													'中心刀片':	record.data.htsccentreblade,
													
													'锋角 ':	record.data.rakeangle,
													'附件':	record.data.c,
													
													'中心钻':	record.data.htccentredrill,
													'周边刀片 ':	record.data.rimblade2,
												//	'附件信息 ':	record.data.aname,
													
													'特点':	record.data.description,
													'备注信息':	record.data.remark});
												Ext.getCmp('previousbtn2')
														.disable();
											} else {
												record = grid2.getStore()
														.getAt(index);
												propertygrid2
														.setSource({'SAP编号':	record.data.sapcode,
															'刀体名称':	record.data.name,
															'型号':	record.data.type,
															'品牌':	record.data.brandid,
															'切削类型':	record.data.cuttype,
															'刀具类型':	record.data.hdtooltype,
															'公称直径 ':	record.data.nominaldiameter,
															'总长':	record.data.length,
															'钻孔深度':	record.data.depth,
															'沟槽长度 ':	record.data.groovelength,
                                                        	'冷却类型':	record.data.coolingtype,
															'接口尺寸':	record.data.portsize,
															'齿数':	record.data.toothnumber,
															'中心刀片':	record.data.htpcentreblade,
														
															'周边刀片':	record.data.rimblade1,
															'附件1名称':	record.data.aname,
															'附件1型号':	record.data.anametype1,
															'附件2名称':	record.data.aname2,
															'附件2型号':	record.data.anametype2,
															'附件3名称':	record.data.aname3,
															'附件3型号':	record.data.anametype3,
															'附件4名称':	record.data.aname4,
															'附件4型号':	record.data.anametype4,
															
															'中心刀片':	record.data.htsccentreblade,
														
															'锋角 ':	record.data.rakeangle,
															'附件':	record.data.c,
															
															'中心钻':	record.data.htccentredrill,
															'周边刀片 ':	record.data.rimblade2,
															//'附件信息 ':	record.data.aname,
															
															'特点':	record.data.description,
															'备注信息':	record.data.remark});
												Ext.getCmp('nextbtn2').enable();
											}
											if (pictureTabs2.getActiveTab()
													.getItemId() == 'hd_holedrillingPanelid') {
												var a = null;
												if (Ext.isDefined(grid2
														.getSelectionModel()
														.getSelections())) {
													var a = jsArray2JsString(
															grid2
																	.getSelectionModel()
																	.getSelections(),
															'featurecode');
												}
												hd_blade_drilling_Store.load({
													params : {
														featurecode : a
													}
												});
											}
											if (pictureTabs2.getActiveTab()
													.getItemId() == 'hd_holedrillingPanelid') {
												var a = null;
												if (Ext.isDefined(grid2
														.getSelectionModel()
														.getSelections())) {
													var a = jsArray2JsString(
															grid2
																	.getSelectionModel()
																	.getSelections(),
															'featurecode');
												}
												hd_holedrillingStorePanel
														.load({
															params : {
																featurecode : a
															}
														});
											} else if (pictureTabs2
													.getActiveTab().getItemId() == 'picturePanel2id') {
												var newsrc = checkImagePath(record.data.figure);
												Ext.getCmp('boxid3').getEl().dom.src = newsrc;
											} else if (pictureTabs2
													.getActiveTab().getItemId() == 'sizePanel2id') {

												var newsrc = checkImagePath(record.data.figure2);
												Ext.getCmp('boxid4').getEl().dom.src = newsrc;

											} else if (pictureTabs2
													.getActiveTab().getItemId() == 'sapPanel2id') {
												sapStore2
														.load({
															params : {
																sapcode : record.data.sapcode
															}
														});
											} else if (pictureTabs2
													.getActiveTab().getItemId() == 'hd_cutterbar_combineddrillingPanelid') {
												hd_cutterbar_combineddrillingStore
														.load({
															params : {
																portsize : record.data.portsize
															}
														});
											}
										}
									},
									{
										text : '下一条',
										id : 'nextbtn2',
										iconCls : 'app_rightIcon',
										handler : function() {
											grid2.getSelectionModel()
													.selectRow(index + 1);
											grid2.getView().focusRow(index + 1);
											index = index + 1;
											if (index >= grid2.getStore()
													.getCount() - 1) {
												infoMsg('已经到最后一条了.');
												index = grid2.getStore()
														.getCount() - 1;
												record = grid2.getStore()
												.getAt(index);
										propertygrid2
												.setSource({'SAP编号':	record.data.sapcode,
													'刀体名称':	record.data.name,
													'型号':	record.data.type,
													'品牌':	record.data.brandid,
													'切削类型':	record.data.cuttype,
													'刀具类型':	record.data.hdtooltype,
													'公称直径 ':	record.data.nominaldiameter,
													'总长':	record.data.length,
													'钻孔深度':	record.data.depth,
													'沟槽长度 ':	record.data.groovelength,
                                                	'冷却类型':	record.data.coolingtype,
													'接口尺寸':	record.data.portsize,
													'齿数':	record.data.toothnumber,
													'中心刀片':	record.data.htpcentreblade,
													
													'周边刀片':	record.data.rimblade1,
													'附件1名称':	record.data.aname,
													'附件1型号':	record.data.anametype1,
													'附件2名称':	record.data.aname2,
													'附件2型号':	record.data.anametype2,
													'附件3名称':	record.data.aname3,
													'附件3型号':	record.data.anametype3,
													'附件4名称':	record.data.aname4,
													'附件4型号':	record.data.anametype4,
													
													'中心刀片':	record.data.htsccentreblade,
												
													'锋角 ':	record.data.rakeangle,
													'附件':	record.data.c,
													
													'中心钻':	record.data.htccentredrill,
													'周边刀片 ':	record.data.rimblade2,
												//	'附件信息 ':	record.data.aname,
													
													'特点':	record.data.description,
													'备注信息':	record.data.remark});
												Ext.getCmp('nextbtn2')
														.disable();
											} else {
												record = grid2.getStore()
														.getAt(index);
												propertygrid2
														.setSource({'SAP编号':	record.data.sapcode,
															'刀体名称':	record.data.name,
															'型号':	record.data.type,
															'品牌':	record.data.brandid,
															'切削类型':	record.data.cuttype,
															'刀具类型':	record.data.hdtooltype,
															'公称直径 ':	record.data.nominaldiameter,
															'总长':	record.data.length,
															'钻孔深度':	record.data.depth,
															'沟槽长度 ':	record.data.groovelength,
                                                        	'冷却类型':	record.data.coolingtype,
															'接口尺寸':	record.data.portsize,
															'齿数':	record.data.toothnumber,
															'中心刀片':	record.data.htpcentreblade,
														
															'周边刀片':	record.data.rimblade1,
															'附件1名称':	record.data.aname,
															'附件1型号':	record.data.anametype1,
															'附件2名称':	record.data.aname2,
															'附件2型号':	record.data.anametype2,
															'附件3名称':	record.data.aname3,
															'附件3型号':	record.data.anametype3,
															'附件4名称':	record.data.aname4,
															'附件4型号':	record.data.anametype4,
															
															'中心刀片':	record.data.htsccentreblade,
														
															'锋角 ':	record.data.rakeangle,
															'附件':	record.data.c,
															
															'中心钻':	record.data.htccentredrill,
															'周边刀片 ':	record.data.rimblade2,
															//'附件信息 ':	record.data.aname,
															
															'特点':	record.data.description,
															'备注信息':	record.data.remark});
												Ext.getCmp('previousbtn2')
														.enable();
											}
											if (pictureTabs2.getActiveTab()
													.getItemId() == 'hd_holedrillingPanelid') {
												var a = null;
												if (Ext.isDefined(grid2
														.getSelectionModel()
														.getSelections())) {
													var a = jsArray2JsString(
															grid2
																	.getSelectionModel()
																	.getSelections(),
															'featurecode');
												}
												hd_blade_drilling_Store.load({
													params : {
														featurecode : a
													}
												});
											}
											if (pictureTabs2.getActiveTab()
													.getItemId() == 'hd_holedrillingPanelid') {
												var a = null;
												if (Ext.isDefined(grid2
														.getSelectionModel()
														.getSelections())) {
													var a = jsArray2JsString(
															grid2
																	.getSelectionModel()
																	.getSelections(),
															'featurecode');
												}
												hd_holedrillingStorePanel
														.load({
															params : {
																featurecode : a
															}
														});
											} else if (pictureTabs2
													.getActiveTab().getItemId() == 'sapPanel2id') {
												sapStore2
														.load({
															params : {
																sapcode : record.data.sapcode
															}
														});
											} else if (pictureTabs2
													.getActiveTab().getItemId() == 'picturePanel2id') {
												var newsrc = checkImagePath(record.data.figure);
												Ext.getCmp('boxid3').getEl().dom.src = newsrc;
											} else if (pictureTabs2
													.getActiveTab().getItemId() == 'sizePanel2id') {

												var newsrc = checkImagePath(record.data.figure2);
												Ext.getCmp('boxid4').getEl().dom.src = newsrc;

											} else if (pictureTabs2
													.getActiveTab().getItemId() == 'hd_cutterbar_combineddrillingPanelid') {
												hd_cutterbar_combineddrillingStore
														.load({
															params : {
																portsize : record.data.portsize
															}
														});
											}
										}
									}, {
										text : '保存',
										id : 'savebtn2',
										hidden : true,
										iconCls : 'acceptIcon',
										handler : function() {

										}
									}, {
										text : '关闭',
										id : 'cancelbtn2',
										iconCls : 'cancelIcon',
										handler : function() {
											propertyDisplayWin2.close();
										}
									} ],
							listeners : {
								afterrender : function(tabpanel, tab) {
									propertygrid2.setSource({'SAP编号':	record.data.sapcode,
										'刀体名称':	record.data.name,
										'型号':	record.data.type,
										'品牌':	record.data.brandid,
										'切削类型':	record.data.cuttype,
										'刀具类型':	record.data.hdtooltype,
										'公称直径 ':	record.data.nominaldiameter,
										'总长':	record.data.length,
										'钻孔深度':	record.data.depth,
										'沟槽长度 ':	record.data.groovelength,
                                    	'冷却类型':	record.data.coolingtype,
										'接口尺寸':	record.data.portsize,
										'齿数':	record.data.toothnumber,
										'中心刀片':	record.data.htpcentreblade,
									
										'周边刀片':	record.data.rimblade1,
										'附件1名称':	record.data.aname,
										'附件1型号':	record.data.anametype1,
										'附件2名称':	record.data.aname2,
										'附件2型号':	record.data.anametype2,
										'附件3名称':	record.data.aname3,
										'附件3型号':	record.data.anametype3,
										'附件4名称':	record.data.aname4,
										'附件4型号':	record.data.anametype4,
										
										'中心刀片':	record.data.htsccentreblade,
										
										'锋角 ':	record.data.rakeangle,
										'附件':	record.data.c,
										
										'中心钻':	record.data.htccentredrill,
										'周边刀片 ':	record.data.rimblade2,
										//'附件信息 ':	record.data.aname,
										
										'特点':	record.data.description,
										'备注信息':	record.data.remark});
								},
								beforeshow : function(win) {
									
									if ( record.data.name== "复合钻钻头") {
										Ext.getCmp('hd_cutterbar_combineddrillingPanelid').enable();
									} else {
										Ext.getCmp('hd_cutterbar_combineddrillingPanelid').disable();
									};		
								}
							}
						});

				propertyDisplayWin2.show();
			}

			// 查看机夹式钻孔刀刀片详细信息;
			function propertyDisplay3() {
				var record = grid3.getSelectionModel().getSelected();
				var index = grid3.getStore().indexOf(record);

				var path = checkImagePath(record.data.figure);
				var path2 = checkImagePath(record.data.figure2);

				var propertygrid3 = new Ext.grid.PropertyGrid({
					title : '刀片详情',
					border : true,
					autoSort : false,
					frame : true,
					ds : hd_blade_drilling_Store,
					// cm : milling_blade_clampCm,
					id : 'propertyGrid3id',
					enableColLock : true,
					enableColumnMove : false,
					autoExpandColumn : true,
					loadMask : true,
					stripeRows : true,
					autoScroll : true,
					clicksToEdit : 1,
					propertyNames : {
						
						'sapcode' : 'SAP编码',
						'name' : '刀片名称',
						'bladetype' : '刀片型号',
						'brandid' : '刀片品牌',
						'figure' : '简图',
						'figure2' : '实物图',
				
						'bladematerialname' : '刀片材质',
						'grooveid' : '断屑槽形',
						'shape' : '刀片形状',
						'reliefangle' : '刀片后角',
						'celength' : '切削刃长度',
						'turningtime' : '可转位次数',
						'type' : '刀片型号',
						'noseradius' : '刀尖圆弧半径',
						'wiperlength' : '修光刃长度',
						'materialid' : '刀片材质',
						'featurecode' : '特征码',
						'remark' : '备注'
					},
					/*
					 * customEditors : { 'cuttype' : new Ext.grid.GridEditor(new
					 * Ext.form.ComboBox({ displayField : 'text', mode :
					 * 'local', triggerAction : 'all', store : CUTTYPEStore })) },
					 * customRenderers : { 'cuttype' : CUTTYPERender },
					 */
					listeners : {
						beforeedit : function(e) {
							e.cancel = true;
							return false;
						}
					}
				});

				var picturePanel3 = new Ext.Panel({
					title : '结构简图',
					id : 'picturePanel3id',
					autoScroll : true,
					frame : true,
					region : 'center',
					// sm : sm2,
					// cm : milling_toolholder_clampCm,
					// tbar : tbar2,
					// bbar : bbar2,
					viewConfig : {
						forceFit : true
					// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
					},
					loadMask : {
						msg : '正在加载图像数据,请稍等...'
					},
					items : [ {
						id : 'boxid5',
						xtype : 'box',
						autoEl : {
							tag : 'img',
							style : 'width:80%;height:80%;position:relative;top:10%;left:10%',
							src : path
						}
					} ]
				// view : new Ext.grid.GroupingView(),
				// plugins : [filtersMilling_toolholder_clamp],
				// stateful : true,
				// stateId : 'grid-shouldermilling-milling_toolholder_clamp'
				});

				var sizePanel3 = new Ext.Panel({
					title : '尺寸简图',
					id : 'sizePanel3id',
					autoScroll : true,
					frame : true,
					region : 'center',
					// sm : sm3,
					// cm : milling_toolholder_clampCm,
					// tbar : tbar3,
					// bbar : bbar3,
					viewConfig : {
						forceFit : true
					// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
					},
					loadMask : {
						msg : '正在加载图像数据,请稍等...'
					},
					items : [ {
						id : 'boxid6',
						xtype : 'box',
						autoEl : {
							tag : 'img',
							style : 'width:80%;height:80%;position:relative;top:10%;left:10%',
							src : path2
						}
					} ]
				// view : new Ext.grid.GroupingView(),
				// plugins : [filtersMilling_toolholder_clamp],
				// stateful : true,
				// stateId : 'grid-shouldermilling-milling_toolholder_clamp'
				});

				/*
				 * var milling_toolholder_integralStorePanel = new
				 * Ext.data.Store({ proxy : new Ext.data.HttpProxy({ url :
				 * 'shouldermilling.do?code=queryMilling_toolholder_integral4Manage' //
				 * queryMilling_toolholder_integral4Manage是在Milling_toolholder_integralAction中的方法queryMilling_toolholder_integral4Manage; } ),
				 * reader : new Ext.data.JsonReader({ totalProperty :
				 * 'TOTALCOUNT', root : 'ROOT' }, [{ name : 'sapcode' }, { name :
				 * 'milling_toolholder_integraltype' }, { name : 'featurecode'
				 * }]) }); // 表格 var bladePanel = new Ext.grid.GridPanel({ title :
				 * '匹配刀片', //header : false, autoScroll : true, id :
				 * 'milling_toolholder_integralPanelid', //disabled : true,
				 * frame : true, region : 'center', store :
				 * milling_toolholder_integralStorePanel, stripeRows : true,
				 * //sm : sm2, cm : new Ext.grid.ColumnModel([new
				 * Ext.grid.RowNumberer({ header : '序', width : 24 }), { header :
				 * 'SAP编码', dataIndex : 'sapcode', width : 60, sortable : true }, {
				 * header : '刀片型号', dataIndex : 'bladetype', width : 130, //
				 * hidden : true, sortable : true }, { header : '刀片特征码',
				 * dataIndex : 'featurecode', width : 80, sortable : true }]),
				 * //tbar : tbar2, //bbar : bbar2, viewConfig : { forceFit :
				 * true // 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况 }, loadMask : { msg :
				 * '正在加载表格数据,请稍等...' } });
				 */

				// 匹配刀体Store
				var milling_blade_clampStorePanel = new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
						url : 'drilling.do?code=queryHd_holedrilling4Manage'
					// queryMilling_blade_clamp4Manage是在Milling_blade_clampAction中的方法queryMilling_blade_clamp4Manage;
					}),
					reader : new Ext.data.JsonReader({
						totalProperty : 'TOTALCOUNT',
						root : 'ROOT'
					}, [ {
						name : 'sapcode'
					}, {
						name : 'type'
					},  {
						name : 'brandid'
					},  {
						name : 'name'
					}, {
						name : 'featurecode'
					} ])
				});

				// 表格
				var milling_blade_clampPanel = new Ext.grid.GridPanel({
					title : '匹配刀体',
					// header : false,
					autoScroll : true,
					id : 'milling_blade_clampPanelid',
					// disabled : true,
					frame : true,
					region : 'center',
					store : milling_blade_clampStorePanel,
					stripeRows : true,
					// sm : sm2,
					cm : new Ext.grid.ColumnModel([ new Ext.grid.RowNumberer({
						header : '序',
						width : 26
					}), {
						header : 'SAP编码',
						dataIndex : 'sapcode',
						width : 160,
						sortable : true
					}, {
						header : '刀体名称',
						dataIndex : 'name',
						width : 160,
						sortable : true
					}, {
						header : '刀体型号',
						dataIndex : 'type',
						width : 130,
						// hidden : true,
						sortable : true
					}, {
						header : '品牌',
						dataIndex : 'brandid',
						width : 130,
						// hidden : true,
						sortable : true
					}, {
						header : '刀片形式',
						dataIndex : 'featurecode',
						width : 80,
						sortable : true
					} ]),
					// tbar : tbar2,
					// bbar : bbar2,
					viewConfig : {
						forceFit : true
					// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
					},
					loadMask : {
						msg : '正在加载表格数据,请稍等...'
					}
				});

				var propertyTabs3 = new Ext.TabPanel({
					region : 'center',
					id : 'propertytabs3id',
					enableTabScroll : true,
					// autoWidth : true,
					activeTab : 0,
					height : document.body.clientHeight,
					// width : document.body.clientWidth / 4,
					// width : 400,
					buttonAlign : 'right',
					items : [ propertygrid3 ]
				/*
				 * , listeners : { tabchange : function(tabpanel, tab) { } }
				 */
				});

				// Store数据存储
				var parameterStore = new Ext.data.GroupingStore({
					proxy : new Ext.data.HttpProxy({
						url : 'drilling.do?code=queryParameter'
					// queryMilling_blade_clamp4Manage是在TempletmillingAction中的方法queryMilling_blade_clamp4Manage;
					}),
					reader : new Ext.data.JsonReader({
						totalProperty : 'TOTALCOUNT',
						root : 'ROOT'
					}, [{
								name : 'vc'
							}, {
								name : 'fn'
							}, {
								name : 'shape'
							}, {
								name : 'removalrates'
							}, {
								name : 's'
							}, {
								name : 'f'
							}, {
								name : 'power'
							}])
				});

				// 列模型
				var parameterCm = new Ext.grid.ColumnModel([{
					header : 'Vc<br />(m/min)',
					dataIndex : 'vc',
					width : 60,
					align : 'center',
					// renderer : THICKNESS2Render,
					// hidden : true,
					sortable : true
				}, {
					header : 'S<br />(r/min)',
					dataIndex : 's',
					width : 100,
					align : 'center',
					// renderer : THICKNESS2Render,
					// hidden : true,
					sortable : true
				}, {
					header : 'fn<br />(mm/r)',
					dataIndex : 'fn',
					width : 60,
					align : 'center',
					// hidden : true,
					sortable : true
				}, {
					header : 'F<br />(mm/min)',
					dataIndex : 'f',
					width : 100,
					align : 'center',
					// renderer : THICKNESS2Render,
					// hidden : true,
					sortable : true
				},{
					header : 'shape',
					dataIndex : 'shape',
					width : 60,
					align : 'center',
				    hidden : true,
					sortable : true
				}, {
					header : 'Q<br />(cm^3/min)',
					dataIndex : 'removalrates',
					width : 100,
					align : 'center',
					// renderer : THICKNESS2Render,
					hidden : true,
					sortable : true
				},  {
					header : 'Pc<br />(kW)',
					dataIndex : 'power',
					width : 60,
					align : 'center',
					hidden : true,
					sortable : true
				}]);

				var parameterGrid = new Ext.grid.GridPanel({
					title : '切削参数',
					header : false,
					height : 500,
					id : 'parameterid',
					autoScroll : true,
					frame : true,
					// disabled : true,
					region : 'center',
					store : parameterStore,
					stripeRows : true,
					// sm : sm2,
					cm : parameterCm,
					// tbar : tbar2,
					// bbar : bbar2,
					viewConfig : {
						forceFit : false
					// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
					},
					loadMask : {
						msg : '正在加载表格数据,请稍等...'
					}

				// view : new Ext.grid.GroupingView(),
				// plugins : [filtersMilling_toolholder_clamp],
				// stateful : true,
				// stateId : 'cuttingparameterID'
				});

				var sapStore3 = new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
						url : 'generalturning.do?code=querySapinformation'
					// queryToolholder4Manage是在ToolholderAction中的方法queryToolholder4Manage;
					}),
					reader : new Ext.data.JsonReader({
						totalProperty : 'TOTALCOUNT',
						root : 'ROOT'
					}, [ {
						name : 'id'
					}, {
						name : 'departmentid'
					}, {
						name : 'storagelocation'
					}, {
						name : 'sapcode'
					}, {
						name : 'description'
					}, {
						name : 'position'
					}, {
						name : 'unit'
					}, {
						name : 'price'
					}, {
						name : 'amount'
					}, {
						name : 'worth'
					}, {
						name : 'time'
					} ])
				});

				// 库存表格
				var sapPanel3 = new Ext.grid.GridPanel({
					title : '库存信息',
					// header : false,
					autoScroll : true,
					id : 'sapPanel3id',
					// disabled : true,
					frame : true,
					region : 'center',
					store : sapStore3,
					stripeRows : true,
					// sm : sm2,
					cm : new Ext.grid.ColumnModel([ new Ext.grid.RowNumberer({
						header : '序',
						width : 26
					}), {
						header : '编号',
						dataIndex : 'id',
						width : 60,
						hidden : true,
						sortable : true

					}, {
						header : '部门编号',
						dataIndex : 'departmentid',
						width : 130,
						// hidden : true,
						sortable : true
					}, {
						header : '库存地点',
						dataIndex : 'storagelocation',
						width : 80,
						sortable : true
					}, {
						header : 'SAP编码',
						dataIndex : 'sapcode',
						width : 160,
						sortable : true
					}, {
						header : '物料描述',
						dataIndex : 'description',
						width : 130,
						// hidden : true,
						sortable : true
					}, {
						header : '仓位',
						dataIndex : 'position',
						width : 80,
						sortable : true
					}, {
						header : '基本计量单位',
						dataIndex : 'unit',
						width : 60,
						hidden : true,
						sortable : true
					}, {
						header : '单价',
						dataIndex : 'price',
						width : 130,
						hidden : true,
						sortable : true
					}, {
						header : '库存数量',
						dataIndex : 'amount',
						width : 80,
						sortable : true
					}, {
						header : '库存价值',
						dataIndex : 'worth',
						width : 130,
						hidden : true,
						sortable : true
					}, {
						header : '更新时间',
						dataIndex : 'time',
						width : 80,
						sortable : true
					} ]),
					// tbar : tbar2,
					// bbar : bbar2,
					viewConfig : {
						forceFit : true
					// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
					},
					loadMask : {
						msg : '正在加载表格数据,请稍等...'
					}
				});

				// TODO
				var pictureTabs3 = new Ext.TabPanel({
					region : 'east',
					split : true,
					enableTabScroll : true,
					width : '60%',
					// collapsible: true,
					// margins:'3 0 3 3',
					// cmargins:'3 3 3 3',
					activeTab : 0,
					height : document.body.clientHeight,
					// width : document.body.clientWidth / 4,
					buttonAlign : 'right',
					items : [ picturePanel3, sizePanel3,
							milling_blade_clampPanel, sapPanel3, parameterGrid ],
					listeners : {
						tabchange : function(pictureTabs3) {
							dataLoadDynamic(pictureTabs3, parameterGrid,
									parameterStore,
									milling_blade_clampStorePanel, sapPanel3,
									sapStore3);
						}
					}
				});

				var propertyDisplayWin3 = new Ext.Window(
						{
							title : '机夹式钻孔刀具刀片详细信息',
							width : 800,
							modal : true,
							height : 400,
							closeAction : 'close',
							maximizable : true,
							// plain : true,
							layout : 'border',
							items : [ propertyTabs3, pictureTabs3 ],
							buttons : [
									{
										text : '上一条',
										id : 'previousbtn3',
										iconCls : 'app_leftIcon',
										handler : function() {
											grid3.getSelectionModel()
													.selectRow(index - 1);
											grid3.getView().focusRow(index - 1);
											index = index - 1;
											if (index <= 0) {
												infoMsg('已经到第一条了.');
												index = 0;
												record = grid3.getStore()
												.getAt(index);
										propertygrid3
												.setSource({'SAP编码':	record.data.sapcode,
													'刀片名称':	record.data.name,
													'刀片型号':	record.data.bladetype,
													'刀片品牌':	record.data.brandid,
													'刀片材质':	record.data.bladematerialname,
													'断屑槽形':	record.data.grooveid,
													'刀片形状':	record.data.shape,
													'刀片后角':	record.data.reliefangle,
													'切削刃长度':	record.data.celength,
													'可转位次数':	record.data.turningtime,
													'刀片型号':	record.data.type,
													'刀尖圆弧半径':	record.data.noseradius,
													'修光刃长度':	record.data.wiperlength,
													'刀片材质':	record.data.materialid,
													'特征码':	record.data.featurecode,
													'备注':	record.data.remark});
												Ext.getCmp('previousbtn3')
														.disable();
											} else {
												record = grid3.getStore()
														.getAt(index);
												propertygrid3
														.setSource({'SAP编码':	record.data.sapcode,
															'刀片名称':	record.data.name,
															'刀片型号':	record.data.bladetype,
															'刀片品牌':	record.data.brandid,
															'刀片材质':	record.data.bladematerialname,
															'断屑槽形':	record.data.grooveid,
															'刀片形状':	record.data.shape,
															'刀片后角':	record.data.reliefangle,
															'切削刃长度':	record.data.celength,
															'可转位次数':	record.data.turningtime,
															'刀片型号':	record.data.type,
															'刀尖圆弧半径':	record.data.noseradius,
															'修光刃长度':	record.data.wiperlength,
															'刀片材质':	record.data.materialid,
															'特征码':	record.data.featurecode,
															'备注':	record.data.remark});
												Ext.getCmp('nextbtn3').enable();
											}

											dataLoadDynamic(
													pictureTabs3,
													parameterGrid,
													parameterStore,
													milling_blade_clampStorePanel,
													sapPanel3, sapStore3);
										}
									},
									{
										text : '下一条',
										id : 'nextbtn3',
										iconCls : 'app_rightIcon',
										handler : function() {
											grid3.getSelectionModel()
													.selectRow(index + 1);
											grid3.getView().focusRow(index + 1);
											index = index + 1;
											if (index >= grid3.getStore()
													.getCount() - 1) {
												infoMsg('已经到最后一条了.');
												index = grid3.getStore()
														.getCount() - 1;
												record = grid3.getStore()
												.getAt(index);
										propertygrid3
												.setSource({'SAP编码':	record.data.sapcode,
													'刀片名称':	record.data.name,
													'刀片型号':	record.data.bladetype,
													'刀片品牌':	record.data.brandid,
													'刀片材质':	record.data.bladematerialname,
													'断屑槽形':	record.data.grooveid,
													'刀片形状':	record.data.shape,
													'刀片后角':	record.data.reliefangle,
													'切削刃长度':	record.data.celength,
													'可转位次数':	record.data.turningtime,
													'刀片型号':	record.data.type,
													'刀尖圆弧半径':	record.data.noseradius,
													'修光刃长度':	record.data.wiperlength,
													'刀片材质':	record.data.materialid,
													'特征码':	record.data.featurecode,
													'备注':	record.data.remark});
												Ext.getCmp('nextbtn3')
														.disable();
											} else {
												record = grid3.getStore()
														.getAt(index);
												propertygrid3
														.setSource({'SAP编码':	record.data.sapcode,
															'刀片名称':	record.data.name,
															'刀片型号':	record.data.bladetype,
															'刀片品牌':	record.data.brandid,
															'刀片材质':	record.data.bladematerialname,
															'断屑槽形':	record.data.grooveid,
															'刀片形状':	record.data.shape,
															'刀片后角':	record.data.reliefangle,
															'切削刃长度':	record.data.celength,
															'可转位次数':	record.data.turningtime,
															'刀片型号':	record.data.type,
															'刀尖圆弧半径':	record.data.noseradius,
															'修光刃长度':	record.data.wiperlength,
															'刀片材质':	record.data.materialid,
															'特征码':	record.data.featurecode,
															'备注':	record.data.remark});
												Ext.getCmp('previousbtn3')
														.enable();
											}
											dataLoadDynamic(
													pictureTabs3,
													parameterGrid,
													parameterStore,
													milling_blade_clampStorePanel,
													sapPanel3, sapStore3);
										}
									}, {
										text : '保存',
										id : 'savebtn3',
										hidden : true,
										iconCls : 'acceptIcon',
										handler : function() {

										}
									}, {
										text : '关闭',
										id : 'cancelbtn3',
										iconCls : 'cancelIcon',
										handler : function() {
											propertyDisplayWin3.close();
										}
									} ],
							listeners : {
								afterrender : function(tabpanel, tab) {
									propertygrid3.setSource({'SAP编码':	record.data.sapcode,
										'刀片名称':	record.data.name,
										'刀片型号':	record.data.bladetype,
										'刀片品牌':	record.data.brandid,
										'刀片材质':	record.data.bladematerialname,
										'断屑槽形':	record.data.grooveid,
										'刀片形状':	record.data.shape,
										'刀片后角':	record.data.reliefangle,
										'切削刃长度':	record.data.celength,
										'可转位次数':	record.data.turningtime,
										'刀片型号':	record.data.type,
										'刀尖圆弧半径':	record.data.noseradius,
										'修光刃长度':	record.data.wiperlength,
										'刀片材质':	record.data.materialid,
										'特征码':	record.data.featurecode,
										'备注':	record.data.remark});
								},
								beforeshow : function(win) {
									var workpiecematerialid = workpieceisotypeCombo
											.getValue();
									if (workpiecematerialid != "") {
										Ext.getCmp('parameterid').enable();
									} else {
										Ext.getCmp('parameterid').disable();
									};	
								}
							}

						});

				propertyDisplayWin3.show();
			}
			function hd_holedrillingStoreLoad() {
				hd_holedrillingStore1
						.load({
							params : {

								start : bbar.pageSize
										* (grid.getBottomToolbar()
												.getPageData().activePage - 1),
								limit : bbar.pageSize,
								workpieceisotype : workpieceisotypeCombo
										.getValue(),
								nominaldiameter : nominaldiameterCombo
										.getValue(),
								depth : celengthCombo.getValue(),
								coolingtype : coolingtypeCombo.getValue(),
								name : nameCombo.getValue()
							}
						});
			}

			function hd_holedrillingStore2Load() {
				hd_holedrillingStore
						.load({
							params : {
								// start : bbar2.pageSize *
								// (grid2.getBottomToolbar().getPageData().activePage
								// - 1),
								start : bbar2.pageSize
										* (grid3.getBottomToolbar()
												.getPageData().activePage - 1),
								// 请注意上面使用的是第三个grid,因为grid2中的bbar2加载到了grid中,所以要用grid3.getBottomToolbar来得到相应的页数.
								limit : bbar2.pageSize,
								// workpieceisotype :
								// workpieceisotypeCombo3.getValue(),
								nominaldiameter : nominaldiameterCombo2
										.getValue(),
								depth : interferencedepthCombo2.getValue(),
								coolingtype : coolingtypeCombo1.getValue(),
								name : nameCombo2.getValue()
							}
						});
			}

			function hd_blade_drilling_StoreLoad(rec) {

			
				if (Ext.isDefined(rec)) {
					
					var featurecode = jsArray2JsString(rec, 'featurecode');
				}
				
					
				

				if (parent.gdlf /*
								 * || !Ext.isEmpty(jsarrstr) ||
								 * !Ext.isEmpty(workpieceisotypeCombo3.getValue())
								 */) {
					hd_blade_drilling_Store.load({
						params : {
							// start : bbar3.pageSize *

							workpieceisotype : workpieceisotypeCombo3
									.getValue(),
									featurecode : featurecode
						}
					});
				}
			}
			autoLoadButton.setActiveItem(0);
		// 导出任务计划数据
			function printTask() {
				showWaitMsg('正在准备报表数据,请稍等...');
				
				if(grid2.getSelectionModel().getCount()==1){
					var record = grid2.getSelectionModel().getSelected()
				}else if(grid2.getSelectionModel().getCount()>=2){	
					errorMsg("请只选择一把刀片")
				}else{
					errorMsg("请选择刀片")};
				
				
				Ext.Ajax.request({
					
					url : 'drilling.do?code=printTask',
					   
					
					params : {
						 workpieceisotype : workpieceisotypeCombo3.getValue(),
						 nominaldiameter1 : nominaldiameterCombo2.getValue(),
						 interferencedepth : interferencedepthCombo2.getValue(),
						 coolingtype : coolingtypeCombo1.getValue(),
						 name1 : nameCombo2.getValue(),
					     sapcode : record.data.sapcode,
					     name : record.data.name,
					     typeid : record.data.typeid
					     
					    
					},
					success : function(response) {
						hideWaitMsg();
						// doExport('task');
						doExport('generalturning');
					},
					failure : function(response) {
						hideWaitMsg();
						errorMsg("准备报表数据对象发生错误,请检查!");
					}
				});
			}
			// 导出任务计划数据
			function printTask2() {
				showWaitMsg('正在准备报表数据,请稍等...');
				
				if(grid3.getSelectionModel().getCount()==1&&grid2.getSelectionModel().getCount()==1){
					var record = grid3.getSelectionModel().getSelected()
				}else if(grid3.getSelectionModel().getCount()>=2){	
					errorMsg("请只选择一把刀片")
				}else if(grid2.getSelectionModel().getCount()==0){	
					errorMsg("请选择刀体")
				}else{
					errorMsg("请选择刀片")};
				
				
				Ext.Ajax.request({
					
					url : 'drilling.do?code=printTask2',
					   
					
					params : {
						 workpieceisotype : workpieceisotypeCombo3.getValue(),
						 nominaldiameter1 : nominaldiameterCombo2.getValue(),
						 interferencedepth : interferencedepthCombo2.getValue(),
						 coolingtype : coolingtypeCombo1.getValue(),
						 name1 : nameCombo2.getValue(),
						 sapcodeoftoolholder : grid2.getSelectionModel().getSelected().data.sapcode,
					     sapcode : record.data.sapcode,
					     typeid : grid2.getSelectionModel().getSelected().data.typeid,
					     k2 : record.data.k2,
					     k1 : grid2.getSelectionModel().getSelected().data.k1,
					     nominaldiameter : grid2.getSelectionModel().getSelected().data.nominaldiameter,
					     workpiecematerialid : workpieceisotypeCombo3.getValue()
					},
					success : function(response) {
						hideWaitMsg();
						// doExport('task');
						doExport('generalturning');
					},
					failure : function(response) {
						hideWaitMsg();
						errorMsg("准备报表数据对象发生错误,请检查!");
					}
				});
			}		
			// 导出任务计划数据     
			function printTask3() {
				showWaitMsg('正在准备报表数据,请稍等...');
				
				if(grid.getSelectionModel().getCount()==1){
					var record = grid.getSelectionModel().getSelected()
				}else if(grid.getSelectionModel().getCount()>=2){	
					errorMsg("请只选择一把刀片")
				}else{
					errorMsg("请选择刀片")};
				
				
				Ext.Ajax.request({
					
					url : 'drilling.do?code=printTask3',
					   
					
					params : {
						 workpieceisotype : workpieceisotypeCombo.getValue(),
						 nominaldiameter1 : nominaldiameterCombo.getValue(),
						 celength : celengthCombo.getValue(),
						 coolingtype : coolingtypeCombo.getValue(),
						 name : nameCombo.getValue(),
					     sapcode : record.data.sapcode,
					     workpiecematerialid : workpieceisotypeCombo.getValue(),
					     k1 : record.data.k1,
					     nominaldiameter : record.data.nominaldiameter
					},
					success : function(response) {
						hideWaitMsg();
						// doExport('task');
						doExport('generalturning');
					},
					failure : function(response) {
						hideWaitMsg();
						errorMsg("准备报表数据对象发生错误,请检查!");
					}
				});
			}
		});
