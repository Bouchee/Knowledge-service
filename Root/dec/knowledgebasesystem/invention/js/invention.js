// Ext.BLANK_IMAGE_URL = 'resources/s.gif';

Docs = {};

ApiPanel = function() {
	ApiPanel.superclass.constructor.call(this, {
				id : 'api-tree',
				region : 'west',
				split : true,
				header : false,
				width : 220,
				minSize : 175,
				maxSize : 500,
				collapsible : true,
				margins : '0 0 5 5',
				cmargins : '0 0 0 0',
				rootVisible : true,
				lines : false,
				autoScroll : true,
				animCollapse : false,
				animate : false,
				collapseMode : 'header',
				loader : new Ext.tree.TreeLoader({
							preloadChildren : true,
							clearOnLoad : false
							

						}),
				root : new Ext.tree.AsyncTreeNode(Docs.classData
						),
				collapseFirst : false
			});
	// no longer needed!
	// new Ext.tree.TreeSorter(this, {folderSort:true,leafAttr:'isClass'});

	this.getSelectionModel().on('beforeselect', function(sm, node) {
				return node.isLeaf();
			});
};

Ext.extend(ApiPanel, Ext.tree.TreePanel, {
			initComponent : function() {
				this.hiddenPkgs = [];
				Ext.apply(this, {
							collapsible : true,
							
							tbar : [' ', new Ext.form.TextField({
										width : 120,
										emptyText : 'Find a Class',
										enableKeyEvents : true,
										listeners : {
											render : function(f) {
												this.filter = new Ext.tree.TreeFilter(
														this, {
															clearBlank : true,
															autoClear : true
														});
											},
											keydown : {
												fn : this.filterTree,
												buffer : 350,
												scope : this
											},
											scope : this
										}
									}), ' ', ' ', {
								iconCls : 'expand-allIcon',
								tooltip : 'Expand All',
								handler : function() {
									this.root.expand(true);
								},
								scope : this
							}, '-', {
								iconCls : 'collapse-allIcon',
								tooltip : 'Collapse All',
								handler : function() {
									this.root.collapse(true);
								},
								scope : this
							},'-', {
								iconCls : 'book_previousIcon',
								tooltip : 'Collapse All',
								handler : function() {
									this.collapse(true);
								},
								scope : this
							}]
						});
				ApiPanel.superclass.initComponent.call(this);
			},
			filterTree : function(t, e) {
				var text = t.getValue();
				Ext.each(this.hiddenPkgs, function(n) {
							n.ui.show();
						});
				if (!text) {
					this.filter.clear();
					return;
				}
				this.expandAll();

				var re = new RegExp(Ext.escapeRe(text), 'i');
				this.filter.filterBy(function(n) {
							return !n.attributes.isClass || re.test(n.text);
						});

				// hide empty packages that weren't filtered
				this.hiddenPkgs = [];
				var me = this;
				this.root.cascade(function(n) {
							if (!n.attributes.isClass
									&& n.ui.ctNode.offsetHeight < 3) {
								n.ui.hide();
								me.hiddenPkgs.push(n);
							}
						});
			},
			// 点击tab，与api树相连接
			selectClass : function(cls) {
				if (cls) {
					var parts = cls.split('.');
					var last = parts.length - 1;
					var res = [];
					var pkg = [];
					for (var i = 0; i < last; i++) { // things get nasty -
						// static classes can
						// have .
						var p = parts[i];
						var fc = p.charAt(0);
						var staticCls = fc.toUpperCase() == fc;
						if (p == 'Ext' || !staticCls) {
							pkg.push(p);
							res[i] = 'pkg-' + pkg.join('.');
						} else if (staticCls) {
							--last;
							res.splice(i, 1);
						}
					}
					res[last] = cls;

					this.selectPath('/root/apidocs/' + res.join('/'));
				}
			}
		});

DocPanel = Ext.extend(Ext.Panel, {
	closable : true,
	autoScroll : true,  

	initComponent : function() {

		a = this.autoLoad.url.split('/');
		b = a[a.length - 1].split('.');
		this.title = b[0];

		Ext.apply(this, {});
		DocPanel.superclass.initComponent.call(this);
	},

	directLink : function() {
		var link = String.format("<a href=\"{0}\" target=\"_blank\">{0}</a>",
				document.location.href + '?class=' + this.cclass);
		Ext.Msg.alert('Direct Link to ' + this.cclass, link);
	},

	scrollToMember : function(member) {
		var el = Ext.fly(this.cclass + '-' + member);
		if (el) {
			var top = (el.getOffsetsTo(this.body)[1]) + this.body.dom.scrollTop;
			this.body.scrollTo('top', top - 25, {
						duration : 0.75,
						callback : this.hlMember.createDelegate(this, [member])
					});
		}
	},

	scrollToSection : function(id) {
		var el = Ext.getDom(id);
		if (el) {
			var top = (Ext.fly(el).getOffsetsTo(this.body)[1])
					+ this.body.dom.scrollTop;
			this.body.scrollTo('top', top - 25, {
						duration : 0.5,
						callback : function() {
							Ext.fly(el).next('h2').pause(0.2).highlight(
									'#8DB2E3', {
										attr : 'color'
									});
						}
					});
		}
	},

	hlMember : function(member) {
		var el = Ext.fly(this.cclass + '-' + member);
		if (el) {
			if (tr = el.up('tr')) {
				tr.highlight('#cadaf9');
			}
		}
	}
});





MainPanel = function() {

	MainPanel.superclass.constructor.call(this, {
				id : 'doc-body',
				region : 'center',
				margins : '0 5 5 0',
				resizeTabs : true,
				minTabWidth : 135,
				tabWidth : 135,
				plugins : new Ext.ux.TabCloseMenu(),
				enableTabScroll : true,
				activeTab : 0,

				items : {
					id : 'welcome-panel',
					title : '发明原理主页面',
					autoLoad : {
						url : 'dec/knowledgebasesystem/fmyl.html',
						//url : 'dec/knowledgebasesystem/welcome.html',
						callback : this.initSearch,
						scope : this
					},
					iconCls : 'icon-docs',
					autoScroll : true
				}
			});
};

Ext.extend(MainPanel, Ext.TabPanel, {

			initEvents : function() {
				MainPanel.superclass.initEvents.call(this);
				this.body.on('click', this.onClick, this);
			},

			onClick : function(e, target) {
				if (target = e.getTarget('a:not(.exi)', 3)) {
					var cls = Ext.fly(target).getAttributeNS('ext', 'cls');
					e.stopEvent();
					if (cls) {
						var member = Ext.fly(target).getAttributeNS('ext',
								'member');
						this.loadClass(target.href, cls, member);
					} else if (target.className == 'inner-link') {
						this.getActiveTab().scrollToSection(target.href
								.split('#')[1]);
					} else {
						window.open(target.href);
					}
				} else if (target = e.getTarget('.micon', 2)) {
					e.stopEvent();
					var tr = Ext.fly(target.parentNode);
					if (tr.hasClass('expandable')) {
						tr.toggleClass('expanded');
					}
				}
			},

			loadClass : function(href, cls, member) {
				var id = 'docs-' + cls;
				var tab = this.getComponent(id);
				if (tab) {
					this.setActiveTab(tab);
					if (member) {
						tab.scrollToMember(member);
					}
				} else {
					var autoLoad = {
						url : href
					};
					if (member) {
						autoLoad.callback = function() {
							Ext.getCmp(id).scrollToMember(member);
						};
					}
					var p = this.add(new DocPanel({
								id : id,
								cclass : cls,
								autoLoad : autoLoad,
								iconCls : Docs.icons[cls]
							}));
					this.setActiveTab(p);
				}
			}
		});



ExamplePanel = function() {

	 ExamplePanel.superclass.constructor.call(this, {
					id : 'example-body',
					resizeTabs : true,
					width:"100%",
					//plugins : new Ext.ux.TabCloseMenu(),
					enableTabScroll : true,
					activeTab : 0,
					items : {
						id : 'example-panel',
						title : '发明原理示例',
						autoLoad : {
							//url : 'dec/knowledgebasesystem/welcome.html',
							url : 'dec/knowledgebasesystem/fmylsl.html',
							callback : this.initSearch,
							scope : this
						},
						iconCls : 'icon-docs',
						autoScroll : true
					}
				});
	};

	Ext.extend(ExamplePanel, Ext.TabPanel, {

				initEvents : function() {
					ExamplePanel.superclass.initEvents.call(this);
					this.body.on('click', this.onClick, this);
				},

				onClick : function(e, target) {
					if (target = e.getTarget('a:not(.exi)', 3)) {
						var cls = Ext.fly(target).getAttributeNS('ext', 'cls');
						e.stopEvent();
						if (cls) {
							var member = Ext.fly(target).getAttributeNS('ext',
									'member');
							this.loadClass(target.href, cls, member);
						} else if (target.className == 'inner-link') {
							this.getActiveTab().scrollToSection(target.href
									.split('#')[1]);
						} else {
							window.open(target.href);
						}
					} else if (target = e.getTarget('.micon', 2)) {
						e.stopEvent();
						var tr = Ext.fly(target.parentNode);
						if (tr.hasClass('expandable')) {
							tr.toggleClass('expanded');
						}
					}
				},

				loadClass : function(href, cls, member) {
					var id = 'docs-' + cls;
					var tab = this.getComponent(id);
					if (tab) {
						this.setActiveTab(tab);
						if (member) {
							tab.scrollToMember(member);
						}
					} else {
						var autoLoad = {
							url : href
						};
						if (member) {
							autoLoad.callback = function() {
								Ext.getCmp(id).scrollToMember(member);
							};
						}
						var t = this.add(new DocPanel({
									id : id,
									cclass : cls,
									autoLoad : autoLoad,
									iconCls : Docs.icons[cls]
								}));
						this.setActiveTab(t);
					}
				}
			});

Ext.onReady(function() {

	Ext.QuickTips.init();

	var api = new ApiPanel();
	var mainPanel = new MainPanel();
	var examplePanel = new ExamplePanel();
	api.on('click', function(node, e) {

				e.stopEvent();
				mainPanel.loadClass(node.attributes.href, node.id);
				examplePanel.loadClass(node.attributes.href2, node.id);

			});

	mainPanel.on('tabchange', function(tp, tab) {
				api.selectClass(tab.cclass);
			});
	
	examplePanel.on('tabchange', function(tp, tab) {
		api.selectClass(tab.cclass);
	});

	 Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
     
     /*var viewport = new Ext.Viewport({
         layout: 'border',
         items: [
         // create instance immediately
         new Ext.BoxComponent({
             region: 'north',
             height: 100, // give north and south regions a height
             autoEl: {
                 tag: 'div',
                 html:'<p>north - generally for menus, toolbars and/or advertisements</p>'
             }
         }), {
             // lazily created panel (xtype:'panel' is default)
             region: 'south',
             contentEl: 'south',
             split: true,
             height: 100,
             minSize: 100,
             maxSize: 200,
             collapsible: true,
             title: 'South',
             margins: '0 0 0 0'
         }, {
             region: 'east',
             title: 'East Side',
             collapsible: true,
             split: true,
             width: 225, // give east and west regions a width
             minSize: 175,
             maxSize: 400,
             margins: '0 5 0 0',
             layout: 'fit', // specify layout manager for items
             items:    mainPanel        // this TabPanel is wrapped by another Panel so the title will be applied
             new Ext.TabPanel({
                 border: false, // already wrapped so don't add another border
                 activeTab: 1, // second tab initially active
                 tabPosition: 'bottom',
                 items: [{
                     html: '<p>A TabPanel component can be a region.</p>',
                     title: 'A Tab',
                     autoScroll: true
                 }, new Ext.grid.PropertyGrid({
                     title: 'Property Grid',
                     closable: true,
                     source: {
                         "(name)": "Properties Grid",
                         "grouping": false,
                         "autoFitColumns": true,
                         "productionQuality": false,
                         "created": new Date(Date.parse('10/15/2006')),
                         "tested": false,
                         "version": 0.01,
                         "borderWidth": 1
                     }
                 })]
             })
         }, {
             region: 'west',
             id: 'west-panel', // see Ext.getCmp() below
             title: 'West',
             split: true,
             width: 200,
             minSize: 175,
             maxSize: 400,
             collapsible: true,
             margins: '0 0 0 5',
             layout: {
                 type: 'accordion',
                 animate: true
             },
             items: [{
                 contentEl: 'west',
                 title: 'Navigation',
                 border: false,
                 iconCls: 'nav' // see the HEAD section for style used
             }, {
                 title: 'Settings',
                 html: '<p>Some settings in here.</p>',
                 border: false,
                 iconCls: 'settings'
             }]
         },
         // in this instance the TabPanel is not wrapped by another panel
         // since no title is needed, this Panel is added directly
         // as a Container
         new Ext.TabPanel({
             region: 'center', // a center region is ALWAYS required for border layout
             deferredRender: false,
             activeTab: 0,     // first tab initially active
             items: [{
                 contentEl: 'center1',
                 title: 'Close Me',
                 closable: true,
                 autoScroll: true
             }, {
                 contentEl: 'center2',
                 title: 'Center Panel',
                 autoScroll: true
             }]
         })]
     });
     // get a reference to the HTML element with id "hideit" and add a click listener to it 
     Ext.get("hideit").on('click', function(){
         // get a reference to the Panel that was created with id = 'west-panel' 
         var w = Ext.getCmp('west-panel');
         // expand or collapse that Panel based on its collapsed property state
         w.collapsed ? w.expand() : w.collapse();
     });*/
	 
	/* Form = function() {

			Form.superclass.constructor.call(this, {
					//	id : 'doc-body',
						region : 'south',
						margins : '0 5 5 0',
						resizeTabs : true,
						minTabWidth : 135,
						tabWidth : 135,
						enableTabScroll : true,
						activeTab : 0,

						items: [{
				            xtype: 'combo',
				            store: ['test@example.com', 'someone-else@example.com' ],
				            plugins: [ Ext.ux.FieldReplicator, Ext.ux.FieldLabeler ],
				            fieldLabel: 'Send To',
				            name: 'to'
				        },{
				            plugins: [ Ext.ux.FieldLabeler ],
				            fieldLabel: 'Subject',
				            name: 'subject'
				        }, {
				            xtype: 'textarea',
				            fieldLabel: 'Message text',
				            hideLabel: true,
				            name: 'msg',
				            flex: 1  // Take up all *remaining* vertical space
				        }]
					});
		};*/
	 
	

	var form = new Ext.form.FormPanel({
		 	region: 'south',
		 	height: 200,
		 	//width: '1600',
	        baseCls: 'x-plain',
	        labelWidth: 55,
	        url: 'save-form.php',//需要修改地址 
	        autoScroll:true,
            fieldLabel: 'Message text',
            hideLabel: true,
            name: 'msg',
            flex: 1 ,
            items:[examplePanel/*
             {
	            xtype: 'panel',
	            title: "发明原理示例",
	            id:"example",
	            fieldLabel: 'Message text',
	            hideLabel: true,
	            width: '100%',
	            collapsible: true,
	            split: true,
	            name: 'msg',
	            flex: 1,
	            items : {
					id : 'example-panel',
					autoLoad : {
						url : 'dec/knowledgebasesystem/principle/PrincipleDiscp/分割.html',
						callback : this.initSearch,
						scope : this
					}}
	            // Take up all *remaining* vertical space
	        }*/]
	        /*layout: {
	            type: 'vbox',
	            align: 'stretch'  // Child items are stretched to full width
	        },
	        defaults: {
	            xtype: 'textfield'
	        },*/
	       /* items: [{
	            xtype: 'combo',
	            store: ['test@example.com', 'someone-else@example.com' ],
	            plugins: [ Ext.ux.FieldReplicator, Ext.ux.FieldLabeler ],
	            fieldLabel: 'Send To',
	            name: 'to'
	        },{
	            plugins: [ Ext.ux.FieldLabeler ],
	            fieldLabel: 'Subject',
	            name: 'subject'
	        }, {
	            xtype: 'textarea',
	            fieldLabel: 'Message text',
	            hideLabel: true,
	            name: 'msg',
	            flex: 1  // Take up all *remaining* vertical space
	        }]*/});
	
	
	
	viewport = new Ext.Viewport({
				layout : 'border',
				items : [api,mainPanel,form],
	 buttons: [{
         text: 'Send'
     },{
         text: 'Cancel'
   
	
			}]});
	viewport.doLayout();
	/*
	 * var viewport = new Ext.Viewport({ layout:'border', items:[ { cls:
	 * 'docs-header', height: 44, region:'north', xtype:'box', el:'header',
	 * border:false, margins: '0 0 5 0' }, api, mainPanel ] });
	 */

	api.expandPath('/root/apidocs');
	

		// allow for link in
		/*
		 * var page = window.location.href.split('?')[1]; if (page) { var ps =
		 * Ext.urlDecode(page); var cls = ps['class'];
		 * mainPanel.loadClass('output/' + cls + '.html', cls, ps.member); }
		 */

		/*
		 * viewport.doLayout();
		 * 
		 * setTimeout(function(){ Ext.get('loading').remove();
		 * Ext.get('loading-mask').fadeOut({remove:true}); }, 250);
		 */

	});

/**
 * Makes a ComboBox more closely mimic an HTML SELECT. Supports clicking and
 * dragging through the list, with item selection occurring when the mouse
 * button is released. When used will automatically set {@link #editable} to
 * false and call {@link Ext.Element#unselectable} on inner elements.
 * Re-enabling editable after calling this will NOT work.
 * 
 * @author Corey Gilmore http://extjs.com/forum/showthread.php?t=6392
 * 
 * @history 2007-07-08 jvs Slight mods for Ext 2.0
 */
Ext.ux.SelectBox = function(config) {
	this.searchResetDelay = 1000;
	config = config || {};
	config = Ext.apply(config || {}, {
				editable : false,
				forceSelection : true,
				rowHeight : false,
				lastSearchTerm : false,
				triggerAction : 'all',
				mode : 'local'
			});

	Ext.ux.SelectBox.superclass.constructor.apply(this, arguments);

	this.lastSelectedIndex = this.selectedIndex || 0;
};

Ext.extend(Ext.ux.SelectBox, Ext.form.ComboBox, {
			lazyInit : false,
			initEvents : function() {
				Ext.ux.SelectBox.superclass.initEvents.apply(this, arguments);
				// you need to use keypress to capture upper/lower case and
				// shift+key, but it doesn't work in IE
				this.el.on('keydown', this.keySearch, this, true);
				this.cshTask = new Ext.util.DelayedTask(
						this.clearSearchHistory, this);
			},

			keySearch : function(e, target, options) {
				var raw = e.getKey();
				var key = String.fromCharCode(raw);
			//	var startIndex = 0;

				if (!this.store.getCount()) {
					return;
				}

				switch (raw) {
					case Ext.EventObject.HOME :
						e.stopEvent();
						this.selectFirst();
						return;

					case Ext.EventObject.END :
						e.stopEvent();
						this.selectLast();
						return;

					case Ext.EventObject.PAGEDOWN :
						this.selectNextPage();
						e.stopEvent();
						return;

					case Ext.EventObject.PAGEUP :
						this.selectPrevPage();
						e.stopEvent();
						return;
				}

				// skip special keys other than the shift key
				if ((e.hasModifier() && !e.shiftKey) || e.isNavKeyPress()
						|| e.isSpecialKey()) {
					return;
				}
				if (this.lastSearchTerm == key) {
					startIndex = this.lastSelectedIndex;
				}

				this.cshTask.delay(this.searchResetDelay);
			},

			onRender : function(ct, position) {
				this.store.on('load', this.calcRowsPerPage, this);
				Ext.ux.SelectBox.superclass.onRender.apply(this, arguments);
				if (this.mode == 'local') {
					this.calcRowsPerPage();
				}
			},

			onSelect : function(record, index, skipCollapse) {
				if (this.fireEvent('beforeselect', this, record, index) !== false) {
					this.setValue(record.data[this.valueField
							|| this.displayField]);
					if (!skipCollapse) {
						this.collapse();
					}
					this.lastSelectedIndex = index + 1;
					this.fireEvent('select', this, record, index);
				}
			},

			render : function(ct) {
				Ext.ux.SelectBox.superclass.render.apply(this, arguments);
				if (Ext.isSafari) {
					this.el.swallowEvent('mousedown', true);
				}
				this.el.unselectable();
				this.innerList.unselectable();
				this.trigger.unselectable();
				this.innerList.on('mouseup', function(e, target, options) {
							if (target.id && target.id == this.innerList.id) {
								return;
							}
							this.onViewClick();
						}, this);

				this.innerList.on('mouseover', function(e, target, options) {
							if (target.id && target.id == this.innerList.id) {
								return;
							}
							this.lastSelectedIndex = this.view
									.getSelectedIndexes()[0]
									+ 1;
							this.cshTask.delay(this.searchResetDelay);
						}, this);

				this.trigger.un('click', this.onTriggerClick, this);
				this.trigger.on('mousedown', function(e, target, options) {
							e.preventDefault();
							this.onTriggerClick();
						}, this);

				this.on('collapse', function(e, target, options) {
							Ext.getDoc().un('mouseup', this.collapseIf, this);
						}, this, true);

				this.on('expand', function(e, target, options) {
							Ext.getDoc().on('mouseup', this.collapseIf, this);
						}, this, true);
			},

			clearSearchHistory : function() {
				this.lastSelectedIndex = 0;
				this.lastSearchTerm = false;
			},

			selectFirst : function() {
				this.focusAndSelect(this.store.data.first());
			},

			selectLast : function() {
				this.focusAndSelect(this.store.data.last());
			},

			selectPrevPage : function() {
				if (!this.rowHeight) {
					return;
				}
				var index = Math.max(this.selectedIndex - this.rowsPerPage, 0);
				this.focusAndSelect(this.store.getAt(index));
			},

			selectNextPage : function() {
				if (!this.rowHeight) {
					return;
				}
				var index = Math.min(this.selectedIndex + this.rowsPerPage,
						this.store.getCount() - 1);
				this.focusAndSelect(this.store.getAt(index));
			},

			focusAndSelect : function(record) {
				var index = typeof record === 'number' ? record : this.store
						.indexOf(record);
				this.select(index, this.isExpanded());
				this.onSelect(this.store.getAt(record), index, this
								.isExpanded());
			},

			calcRowsPerPage : function() {
				if (this.store.getCount()) {
					this.rowHeight = Ext.fly(this.view.getNode(0)).getHeight();
					this.rowsPerPage = this.maxHeight / this.rowHeight;
				} else {
					this.rowHeight = false;
				}
			}

		});

Ext.Ajax.on('requestcomplete', function(ajax, xhr, o) {
			if (typeof urchinTracker == 'function' && o && o.url) {
				urchinTracker(o.url);
			}
		});



//树结构
Docs.classData ={"id" : "apidocs",
		"iconCls" : "icon-docs",
		"text" : "发明原理",
		"singleClickExpand" : true,
		"children" : [ {
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/fenge.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/fenge.html",
			"text" : "分割",
			"id" : "principle01",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item1",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/chouqu.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/chouqu.html",
			"text" : "抽取",
			"id" : "principle02",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item2",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/局部质量.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/局部质量.html",
			"text" : "局部质量",
			"id" : "principle03",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item3",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/增加不对称性.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/不对称.html",
			"text" : "增加不对称性",
			"id" : "principle04",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item4",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/组合与合并.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/联合.html",
			"text" : "组合与合并",
			"id" : "principle05",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item5",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/多用性.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/多功能.html",
			"text" : "多用性",
			"id" : "principle06",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item6",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/嵌套.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/嵌套.html",
			"text" : "嵌套",
			"id" : "principle07",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item7",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/重力补偿.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/反重量.html",
			"text" : "重力补偿",
			"id" : "principle08",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item8",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/预加反作用.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/预加反作用.html",
			"text" : "预加反作用",
			"id" : "principle09",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item9",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/预操作.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/预先作用.html",
			"text" : "预操作",
			"id" : "principle10",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item10",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/预补偿.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/预先防范.html",
			"text" : "预补偿质量",
			"id" : "principle11",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item11",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/等势性.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/等势.html",
			"text" : "等势性",
			"id" : "principle12",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item12",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/反向作用.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/反向作用.html",
			"text" : "反向作用",
			"id" : "principle13",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item13",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/曲面化.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/曲面化、曲率增加.html",
			"text" : "曲面化质量",
			"id" : "principle14",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item14",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/动态特性.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/动态特性.html",
			"text" : "动态特性",
			"id" : "principle15",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item15",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/未到达或过度的作用.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/未达到或过度的作用.html",
			"text" : "未到达或过度的作用",
			"id" : "principle16",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item16",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/维数变化.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/一维变多维.html",
			"text" : "维数变化",
			"id" : "principle17",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item17",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/机械振动.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/机械振动.html",
			"text" : "机械振动",
			"id" : "principle18",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item18",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/周期性作用.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/周期性作用.html",
			"text" : "周期性作用",
			"id" : "principle19",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item19",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/有效作用的连续性.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/有效作用的连续性.html",
			"text" : "有效作用的连续性",
			"id" : "principle20",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item20",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/紧急加速.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/减少有害作用的时间.html",
			"text" : "紧急加速",
			"id" : "principle21",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item21",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/变有害为有益.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/变害为利.html",
			"text" : "变有害为有益",
			"id" : "principle22",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item22",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/反馈.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/反馈.html",
			"text" : "反馈",
			"id" : "principle23",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item23",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/中介物.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/借助中介物.html",
			"text" : "中介物",
			"id" : "principle24",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item24",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/自服务.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/自服务.html",
			"text" : "自服务",
			"id" : "principle25",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item25",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/复制.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/复制.html",
			"text" : "复制",
			"id" : "principle26",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item26",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/廉价代替品.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/廉价替代品.html",
			"text" : "廉价代替品",
			"id" : "principle27",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item27",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/机械系统的替代.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/机械系统替代.html",
			"text" : "机械系统的替代",
			"id" : "principle28",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item28",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/气压与液压结构.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/用气压与液压结构.html",
			"text" : "气压与液压结构",
			"id" : "principle29",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item29",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/柔性壳体或薄膜.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/柔性壳体或薄膜.html",
			"text" : "柔性壳体或薄膜",
			"id" : "principle30",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item30",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/多孔材料.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/多孔材料.html",
			"text" : "多孔材料",
			"id" : "principle31",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item31",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/改变颜色.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/改变颜色：拟态.html",
			"text" : "改变颜色",
			"id" : "principle32",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item32",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/同质性.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/同质性.html",
			"text" : "同质性",
			"id" : "principle33",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item33",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/抛弃与修复.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/抛弃或再生.html",
			"text" : "抛弃与修复",
			"id" : "principle34",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item34",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/参数变化.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/物理或化学参数变化.html",
			"text" : "参数变化",
			"id" : "principle35",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item35",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/相变.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/相变.html",
			"text" : "相变",
			"id" : "principle36",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item36",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/热膨胀.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/热膨胀.html",
			"text" : "热膨胀",
			"id" : "principle37",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item37",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/加速氧化.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/加速氧化.html",
			"text" : "加速氧化",
			"id" : "principle38",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item38",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/惰性环境.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/惰性环境.html",
			"text" : "惰性环境",
			"id" : "principle39",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item39",
			"leaf" : true
		},{
			"href" : "dec/knowledgebasesystem/principle/PrincipleDiscp/复合材料.html",
			"href2" :"dec/knowledgebasesystem/principle/PrcpExampleDiscp/复合材料.html",
			"text" : "复合材料",
			"id" : "principle40",
			"isClass" : true,
			"iconCls" : "icon-cmp",
			"cls" : "item40",
			"leaf" : true
		}]};

 

Docs.icons = {

	"Ext.chart.Axis" : "icon-cls",
	"Ext.chart.BarChart" : "icon-cmp",
	"Ext.chart.BarSeries" : "icon-cls",
	"Ext.chart.CartesianChart" : "icon-cmp",
	"Ext.chart.CartesianSeries" : "icon-cls",
	"Ext.chart.CategoryAxis" : "icon-cls",
	"Ext.chart.Chart" : "icon-cmp",
	"Ext.chart.ColumnChart" : "icon-cmp",
	"Ext.chart.ColumnSeries" : "icon-cls",
	"Ext.chart.LineChart" : "icon-cmp",
	"Ext.chart.LineSeries" : "icon-cls",
	"Ext.chart.NumericAxis" : "icon-cls",
	"Ext.chart.PieChart" : "icon-cmp",
	"Ext.chart.PieSeries" : "icon-cls",
	"Ext.chart.Series" : "icon-cls",
	"Ext.chart.StackedBarChart" : "icon-cmp",
	"Ext.chart.StackedColumnChart" : "icon-cmp",
	"Ext.chart.TimeAxis" : "icon-cls",
	"Ext.data.Api" : "icon-static",
	"Ext.data.Api.Error" : "icon-cls",
	"Ext.data.ArrayReader" : "icon-cls",
	"Ext.data.ArrayStore" : "icon-cls",
	"Ext.data.Connection" : "icon-cls",
	"Ext.data.DataProxy" : "icon-cls",
	"Ext.data.DataProxy.Error" : "icon-cls",
	"Ext.data.DataReader" : "icon-cls",
	"Ext.data.DataReader.Error" : "icon-cls",
	"Ext.data.DataWriter" : "icon-cls",
	"Ext.data.DirectProxy" : "icon-cls",
	"Ext.data.DirectStore" : "icon-cls",
	"Ext.data.Field" : "icon-cls",
	"Ext.data.GroupingStore" : "icon-cls",
	"Ext.data.HttpProxy" : "icon-cls",
	"Ext.data.JsonReader" : "icon-cls",
	"Ext.data.JsonReader.Error" : "icon-cls",
	"Ext.data.JsonStore" : "icon-cls",
	"Ext.data.JsonWriter" : "icon-cls",
	"Ext.data.MemoryProxy" : "icon-cls",
	"Ext.data.Node" : "icon-cls",
	"Ext.data.Record" : "icon-cls",
	"Ext.data.Request" : "icon-cls",
	"Ext.data.Response" : "icon-cls",
	"Ext.data.ScriptTagProxy" : "icon-cls",
	"Ext.data.SortTypes" : "icon-static",
	"Ext.data.Store" : "icon-cls",
	"Ext.data.Store.Error" : "icon-cls",
	"Ext.data.Tree" : "icon-cls",
	"Ext.data.Types" : "icon-static",
	"Ext.data.XmlReader" : "icon-cls",
	"Ext.data.XmlStore" : "icon-cls",
	"Ext.data.XmlWriter" : "icon-cls",
	"Ext.dd.DD" : "icon-cls",
	"Ext.dd.DDProxy" : "icon-cls",
	"Ext.dd.DDTarget" : "icon-cls",
	"Ext.dd.DragDrop" : "icon-cls",
	"Ext.dd.DragDropMgr" : "icon-static",
	"Ext.dd.DragSource" : "icon-cls",
	"Ext.dd.DragTracker" : "icon-cls",
	"Ext.dd.DragZone" : "icon-cls",
	"Ext.dd.DropTarget" : "icon-cls",
	"Ext.dd.DropZone" : "icon-cls",
	"Ext.dd.PanelProxy" : "icon-cls",
	"Ext.dd.Registry" : "icon-static",
	"Ext.dd.ScrollManager" : "icon-static",
	"Ext.dd.StatusProxy" : "icon-cls",
	"Ext.direct.JsonProvider" : "icon-cls",
	"Ext.direct.PollingProvider" : "icon-cls",
	"Ext.direct.Provider" : "icon-cls",
	"Ext.direct.RemotingProvider" : "icon-cls",
	"Ext.form.Action" : "icon-cls",
	"Ext.form.Action.DirectLoad" : "icon-cls",
	"Ext.form.Action.DirectSubmit" : "icon-cls",
	"Ext.form.Action.Load" : "icon-cls",
	"Ext.form.Action.Submit" : "icon-cls",
	"Ext.form.BasicForm" : "icon-cls",
	"Ext.form.Checkbox" : "icon-cmp",
	"Ext.form.CheckboxGroup" : "icon-cmp",
	"Ext.form.ComboBox" : "icon-cmp",
	"Ext.form.CompositeField" : "icon-cmp",
	"Ext.form.DateField" : "icon-cmp",
	"Ext.form.DisplayField" : "icon-cmp",
	"Ext.form.Field" : "icon-cmp",
	"Ext.form.FieldSet" : "icon-cmp",
	"Ext.form.FormPanel" : "icon-cmp",
	"Ext.form.Hidden" : "icon-cmp",
	"Ext.form.HtmlEditor" : "icon-cmp",
	"Ext.form.Label" : "icon-cmp",
	"Ext.form.NumberField" : "icon-cmp",
	"Ext.form.Radio" : "icon-cmp",
	"Ext.form.RadioGroup" : "icon-cmp",
	"Ext.form.SliderField" : "icon-cmp",
	"Ext.form.TextArea" : "icon-cmp",
	"Ext.form.TextField" : "icon-cmp",
	"Ext.form.TimeField" : "icon-cmp",
	"Ext.form.TriggerField" : "icon-cmp",
	"Ext.form.TwinTriggerField" : "icon-cmp",
	"Ext.form.VTypes" : "icon-static",
	"Ext.grid.AbstractSelectionModel" : "icon-cls",
	"Ext.grid.ActionColumn" : "icon-cls",
	"Ext.grid.BooleanColumn" : "icon-cls",
	"Ext.grid.CellSelectionModel" : "icon-cls",
	"Ext.grid.CheckboxSelectionModel" : "icon-cls",
	"Ext.grid.Column" : "icon-cls",
	"Ext.grid.ColumnModel" : "icon-cls",
	"Ext.grid.DateColumn" : "icon-cls",
	"Ext.grid.EditorGridPanel" : "icon-cmp",
	"Ext.grid.GridDragZone" : "icon-cls",
	"Ext.grid.GridPanel" : "icon-cmp",
	"Ext.grid.GridView" : "icon-cls",
	"Ext.grid.GroupingView" : "icon-cls",
	"Ext.grid.NumberColumn" : "icon-cls",
	"Ext.grid.PivotAxis" : "icon-cmp",
	"Ext.grid.PivotGrid" : "icon-cmp",
	"Ext.grid.PivotGridView" : "icon-cls",
	"Ext.grid.PropertyColumnModel" : "icon-cls",
	"Ext.grid.PropertyGrid" : "icon-cmp",
	"Ext.grid.PropertyRecord" : "icon-cls",
	"Ext.grid.PropertyStore" : "icon-cls",
	"Ext.grid.RowNumberer" : "icon-cls",
	"Ext.grid.RowSelectionModel" : "icon-cls",
	"Ext.grid.TemplateColumn" : "icon-cls",
	"Ext.layout.boxOverflow.HorizontalMenu" : "icon-cls",
	"Ext.layout.boxOverflow.HorizontalScroller" : "icon-cls",
	"Ext.layout.boxOverflow.Menu" : "icon-cls",
	"Ext.layout.boxOverflow.None" : "icon-cls",
	"Ext.layout.boxOverflow.Scroller" : "icon-cls",
	"Ext.layout.boxOverflow.VerticalScroller" : "icon-cls",
	"Ext.layout.AbsoluteLayout" : "icon-cls",
	"Ext.layout.AccordionLayout" : "icon-cls",
	"Ext.layout.AnchorLayout" : "icon-cls",
	"Ext.layout.AutoLayout" : "icon-cls",
	"Ext.layout.BorderLayout" : "icon-cls",
	"Ext.layout.BorderLayout.Region" : "icon-cls",
	"Ext.layout.BorderLayout.SplitRegion" : "icon-cls",
	"Ext.layout.BoxLayout" : "icon-cls",
	"Ext.layout.CardLayout" : "icon-cls",
	"Ext.layout.ColumnLayout" : "icon-cls",
	"Ext.layout.ContainerLayout" : "icon-cls",
	"Ext.layout.FitLayout" : "icon-cls",
	"Ext.layout.FormLayout" : "icon-cls",
	"Ext.layout.HBoxLayout" : "icon-cls",
	"Ext.layout.MenuLayout" : "icon-cls",
	"Ext.layout.TableLayout" : "icon-cls",
	"Ext.layout.ToolbarLayout" : "icon-cls",
	"Ext.layout.VBoxLayout" : "icon-cls",
	"Ext.list.BooleanColumn" : "icon-cls",
	"Ext.list.Column" : "icon-cls",
	"Ext.list.ColumnResizer" : "icon-cls",
	"Ext.list.DateColumn" : "icon-cls",
	"Ext.list.ListView" : "icon-cmp",
	"Ext.list.NumberColumn" : "icon-cls",
	"Ext.list.Sorter" : "icon-cls",
	"Ext.menu.BaseItem" : "icon-cmp",
	"Ext.menu.CheckItem" : "icon-cmp",
	"Ext.menu.ColorMenu" : "icon-cmp",
	"Ext.menu.DateMenu" : "icon-cmp",
	"Ext.menu.Item" : "icon-cmp",
	"Ext.menu.Menu" : "icon-cmp",
	"Ext.menu.MenuMgr" : "icon-static",
	"Ext.menu.Separator" : "icon-cmp",
	"Ext.menu.TextItem" : "icon-cmp",
	"Ext.slider.MultiSlider" : "icon-cmp",
	"Ext.slider.SingleSlider" : "icon-cmp",
	"Ext.slider.Thumb" : "icon-cls",
	"Ext.slider.Tip" : "icon-cmp",
	"Ext.state.CookieProvider" : "icon-cls",
	"Ext.state.Manager" : "icon-static",
	"Ext.state.Provider" : "icon-cls",
	"Ext.tree.AsyncTreeNode" : "icon-cls",
	"Ext.tree.DefaultSelectionModel" : "icon-cls",
	"Ext.tree.MultiSelectionModel" : "icon-cls",
	"Ext.tree.RootTreeNodeUI" : "icon-cls",
	"Ext.tree.TreeDragZone" : "icon-cls",
	"Ext.tree.TreeDropZone" : "icon-cls",
	"Ext.tree.TreeEditor" : "icon-cmp",
	"Ext.tree.TreeFilter" : "icon-cls",
	"Ext.tree.TreeLoader" : "icon-cls",
	"Ext.tree.TreeNode" : "icon-cls",
	"Ext.tree.TreeNodeUI" : "icon-cls",
	"Ext.tree.TreePanel" : "icon-cmp",
	"Ext.tree.TreeSorter" : "icon-cls",
	"Ext.util.CSS" : "icon-static",
	"Ext.util.ClickRepeater" : "icon-cls",
	"Ext.util.Cookies" : "icon-static",
	"Ext.util.DelayedTask" : "icon-cls",
	"Ext.util.Format" : "icon-static",
	"Ext.util.Functions" : "icon-static",
	"Ext.util.JSON" : "icon-static",
	"Ext.util.MixedCollection" : "icon-cls",
	"Ext.util.Observable" : "icon-cls",
	"Ext.util.TaskRunner" : "icon-cls",
	"Ext.util.TextMetrics" : "icon-static",
	"Ext.AbstractManager" : "icon-cls",
	"Ext.Action" : "icon-cls",
	"Ext.Ajax" : "icon-static",
	"Ext.BoxComponent" : "icon-cmp",
	"Ext.Button" : "icon-cmp",
	"Ext.ButtonGroup" : "icon-cmp",
	"Ext.ColorPalette" : "icon-cmp",
	"Ext.Component" : "icon-cls",
	"Ext.ComponentMgr" : "icon-static",
	"Ext.CompositeElement" : "icon-cls",
	"Ext.CompositeElementLite" : "icon-cls",
	"Ext.Container" : "icon-cmp",
	"Ext.CycleButton" : "icon-cmp",
	"Ext.DataView" : "icon-cmp",
	"Ext.DatePicker" : "icon-cmp",
	"Ext.Direct" : "icon-static",
	"Ext.Direct.Transaction" : "icon-cls",
	"Ext.DomHelper" : "icon-static",
	"Ext.DomQuery" : "icon-static",
	"Ext.Editor" : "icon-cmp",
	"Ext.Element" : "icon-cls",
	"Ext.Error" : "icon-cls",
	"Ext.EventManager" : "icon-static",
	"Ext.EventObject" : "icon-static",
	"Ext.FlashComponent" : "icon-cmp",
	"Ext.FlashProxy" : "icon-static",
	"Ext.Fx" : "icon-cls",
	"Ext.History" : "icon-static",
	"Ext.KeyMap" : "icon-cls",
	"Ext.KeyNav" : "icon-cls",
	"Ext.Layer" : "icon-cls",
	"Ext.LoadMask" : "icon-cls",
	"Ext.Loader" : "icon-static",
	"Ext.MessageBox" : "icon-static",
	"Ext.PagingToolbar" : "icon-cmp",
	"Ext.Panel" : "icon-cmp",
	"Ext.ProgressBar" : "icon-cmp",
	"Ext.QuickTip" : "icon-cmp",
	"Ext.QuickTips" : "icon-static",
	"Ext.Resizable" : "icon-cls",
	"Ext.Shadow" : "icon-cls",
	"Ext.Spacer" : "icon-cmp",
	"Ext.SplitBar" : "icon-cls",
	"Ext.SplitBar.AbsoluteLayoutAdapter" : "icon-cls",
	"Ext.SplitBar.BasicLayoutAdapter" : "icon-cls",
	"Ext.SplitButton" : "icon-cmp",
	"Ext.StoreMgr" : "icon-static",
	"Ext.TabPanel" : "icon-cmp",
	"Ext.TaskMgr" : "icon-static",
	"Ext.Template" : "icon-cls",
	"Ext.Tip" : "icon-cmp",
	"Ext.ToolTip" : "icon-cmp",
	"Ext.Toolbar" : "icon-cmp",
	"Ext.Toolbar.Fill" : "icon-cmp",
	"Ext.Toolbar.Item" : "icon-cmp",
	"Ext.Toolbar.Separator" : "icon-cmp",
	"Ext.Toolbar.Spacer" : "icon-cmp",
	"Ext.Toolbar.TextItem" : "icon-cmp",
	"Ext.Updater" : "icon-cls",
	"Ext.Updater.BasicRenderer" : "icon-cls",
	"Ext.Updater.defaults" : "icon-cls",
	"Ext.Viewport" : "icon-cmp",
	"Ext.Window" : "icon-cmp",
	"Ext.WindowGroup" : "icon-cls",
	"Ext.WindowMgr" : "icon-static",
	"Ext.XTemplate" : "icon-cls",
	"Array" : "icon-cls",
	"Date" : "icon-cls",
	"Ext" : "icon-static",
	"Function" : "icon-cls",
	"Number" : "icon-cls",
	"String" : "icon-cls"
};

