// vim: ts=4:sw=4:nu:fdc=4:nospell
/**
 * Ext.ux.IconMenu Plugin Example Application
 *
 * @author    Ing. Jozef Sakáloš
 * @date      22. March 2008
 * @version   $Id: iconmenu.js 154 2008-04-09 23:55:20Z jozo $
 *
 * @license iconmenu.js is licensed under the terms of
 * the Open Source LGPL 3.0 license.  Commercial use is permitted to the extent
 * that the code/component(s) do NOT become part of another Open Source or Commercially
 * licensed development library or toolkit without explicit permission.
 * 
 * License details: http://www.gnu.org/licenses/lgpl.html
 */

/*global Ext, Example, WebPage, window */

Ext.BLANK_IMAGE_URL = '../ext/resources/images/default/s.gif';
Ext.ns('Example');
Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
Example.version = '1.0';

Example.win1 = Ext.extend(Ext.Window, {
	 title:'IconMenu Example Window 1'
	,width:400
	,height:300
	,x:400
	,y:160
	,maximizable:true
	,iconCls:'icon-prefs'
	,initComponent:function() {
		Ext.apply(this, {
			plugins:[new Ext.ux.IconMenu({
				customItems:['separator', {
					 text:'Zoom Window'
					,iconCls:'icon-zoom'
					,handler:function() {
						Ext.ux.Toast.msg('IconMenu Item Click', 'Zoom Window');
					}
				},{
					 text:'Print Window'
					,iconCls:'icon-print'
					,handler:function() {
						Ext.ux.Toast.msg('IconMenu Item Click', 'Print Window');
					}
				}]
				,showMenu:function() {
					var item = this.menu.items.itemAt(6);
					item.setDisabled(!item.disabled);
					Ext.ux.IconMenu.prototype.showMenu.apply(this, arguments);
				}
			})]
		});
		// call parent
		Example.win1.superclass.initComponent.apply(this, arguments);
	}
});
Ext.reg('examplewin1', Example.win1);

Example.win2 = Ext.extend(Ext.Window, {
	 title:'IconMenu Example Window 2'
	,width:400
	,height:300
	,x:500
	,y:260
	,maximizable:true
	,iconCls:'icon-open-self'
	,initComponent:function() {
		Ext.apply(this, {
			plugins:[new Ext.ux.IconMenu({qtip:'Click to Open Menu'})]
		});
		// call parent
		Example.win1.superclass.initComponent.apply(this, arguments);
	}
});
Ext.reg('examplewin2', Example.win2);

Ext.onReady(function() {
    Ext.QuickTips.init();

	var adsenseHost = 
		   'iconmenu.localhost' === window.location.host
		|| 'iconmenu.extjs.eu' === window.location.host
	;
	var page = new WebPage({
		 version:Example.version
		,westContent:'west-content'
		,centerContent:'center-content'
		,adRowContent:adsenseHost ? 'adrow-content' : undefined
	});

	var ads = Ext.getBody().select('div.adsense');
	if(adsenseHost) {
		ads.removeClass('x-hidden');
	}
	else {
		ads.remove();
	}
	var win1, win2;

	var btn1 = new Ext.Button({
		 renderTo:'btnct1'
		,text:'Window 1'
		,iconCls:'icon-prefs'
		,handler:function(btn) {
			if(!win1) {
				win1 = new Example.win1();
				win1.on('destroy', function() {win1 = null;});
			}
			if(win1.isVisible()) {
				win1.hide();
			}
			else {
				win1.show(btn.getEl());
			}
		}
	});

	var btn2 = new Ext.Button({
		 renderTo:'btnct2'
		,text:'Window 2'
		,iconCls:'icon-open-self'
		,handler:function(btn) {
			if(!win2) {
				win2 = new Example.win2();
				win2.on('destroy', function() {win2 = null;});
			}
			if(win2.isVisible()) {
				win2.hide();
			}
			else {
				win2.show(btn.getEl());
			}
		}
	});

}); // eo onReady

// eof
