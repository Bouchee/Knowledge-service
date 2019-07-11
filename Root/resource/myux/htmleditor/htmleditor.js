/**
 * @class Ext.ux.form.HtmlEditor.MidasCommand
 * @extends Ext.util.Observable
 * <p>A base plugin for extending to create standard Midas command buttons.</p>
 * http://msdn.microsoft.com/en-us/library/ms533049%28v=VS.85%29.aspx
 * http://www.mozilla.org/editor/midas-spec.html
 */
Ext.ns('Ext.ux.form.HtmlEditor');

if (!Ext.isObject) {
    Ext.isObject = function(v){
        return v && typeof v == "object";
    };
}

Ext.override(Ext.form.HtmlEditor, {
    getSelectedText: function(clip){
        var doc = this.getDoc(), selDocFrag;
        var txt = '', hasHTML = false, selNodes = [], ret, html = '';
        if (this.win.getSelection || doc.getSelection) {
            // FF, Chrome, Safari
            var sel = this.win.getSelection();
            if (!sel) {
                sel = doc.getSelection();
            }
            if (clip) {
                selDocFrag = sel.getRangeAt(0).extractContents();
            } else {
                selDocFrag = this.win.getSelection().getRangeAt(0).cloneContents();
            }
            Ext.each(selDocFrag.childNodes, function(n){
                if (n.nodeType !== 3) {
                    hasHTML = true;
                }
            });
            if (hasHTML) {
                var div = document.createElement('div');
                div.appendChild(selDocFrag);
                html = div.innerHTML;
                txt = this.win.getSelection() + '';
            } else {
                html = txt = selDocFrag.textContent;
            }
            ret = {
                textContent: txt,
                hasHTML: hasHTML,
                html: html
            };
        } else if (doc.selection) {
            // IE
            this.win.focus();
            txt = doc.selection.createRange();
            if (txt.text !== txt.htmlText) {
                hasHTML = true;
            }
            ret = {
                textContent: txt.text,
                hasHTML: hasHTML,
                html: txt.htmlText
            };
        } else {
            return {
                textContent: ''
            };
        }
        
        return ret;
    }
});

Ext.ux.form.HtmlEditor.MidasCommand = Ext.extend(Ext.util.Observable, {
    // private
    init: function(cmp){
        this.cmp = cmp;
        this.btns = [];
        this.cmp.on('render', this.onRender, this);
        this.cmp.on('initialize', this.onInit, this, {
            delay: 100,
            single: true
        });
    },
    // private
    onInit: function(){
        Ext.EventManager.on(this.cmp.getDoc(), {
            'mousedown': this.onEditorEvent,
            'dblclick': this.onEditorEvent,
            'click': this.onEditorEvent,
            'keyup': this.onEditorEvent,
            buffer: 100,
            scope: this
        });
    },
    // private
    onRender: function(){
        var midasCmdButton, tb = this.cmp.getToolbar(), btn, iconCls;
        Ext.each(this.midasBtns, function(b){
            if (Ext.isObject(b)) {
                iconCls = (b.iconCls) ? b.iconCls : 'x-edit-' + b.cmd;
                if (b.value) { iconCls = iconCls+'-'+b.value.replace(/[<>\/]/g,''); }
                midasCmdButton = {
                    iconCls: iconCls,
                    handler: function(){
                        this.cmp.relayCmd(b.cmd, b.value);
                    },
                    scope: this,
                    tooltip: b.tooltip ||
                    {
                        title: b.title
                    },
                    overflowText: b.overflowText || b.title
                };
            } else {
                midasCmdButton = new Ext.Toolbar.Separator();
            }
            btn = tb.addButton(midasCmdButton);
            if (b.enableOnSelection) {
                btn.disable();
            }
            this.btns.push(btn);
        }, this);
    },
    // private
    onEditorEvent: function(){
        var doc = this.cmp.getDoc();
        Ext.each(this.btns, function(b, i){
            if (this.midasBtns[i].enableOnSelection || this.midasBtns[i].disableOnSelection) {
                if (doc.getSelection) {
                    if ((this.midasBtns[i].enableOnSelection && doc.getSelection() !== '') || (this.midasBtns[i].disableOnSelection && doc.getSelection() === '')) {
                        b.enable();
                    } else {
                        b.disable();
                    }
                } else if (doc.selection) {
                    if ((this.midasBtns[i].enableOnSelection && doc.selection.createRange().text !== '') || (this.midasBtns[i].disableOnSelection && doc.selection.createRange().text === '')) {
                        b.enable();
                    } else {
                        b.disable();
                    }
                }
            }
            if (this.midasBtns[i].monitorCmdState) {
                b.toggle(doc.queryCommandState(this.midasBtns[i].cmd));
            }
        }, this);
    }
});


/**
 * @class Ext.ux.form.HtmlEditor.Divider
 * @extends Ext.util.Observable
 * <p>A plugin that creates a divider on the HtmlEditor. Used for separating additional buttons.</p>
 */
Ext.ux.form.HtmlEditor.Divider = Ext.extend(Ext.util.Observable, {
    // private
    init: function(cmp){
        this.cmp = cmp;
        this.cmp.on('render', this.onRender, this);
    },
    // private
    onRender: function(){
        this.cmp.getToolbar().addButton([new Ext.Toolbar.Separator()]);
    }
});


/**
 * @class Ext.ux.form.HtmlEditor.HR
 * @extends Ext.util.Observable
 * <p>A plugin that creates a button on the HtmlEditor for inserting a horizontal rule.</p>
 */
Ext.ux.form.HtmlEditor.HR = Ext.extend(Ext.util.Observable, {
    // HR language text
    langTitle   : '<span style="font-weight:normal">插入水平线</span>',
    langHelp    : '插入水平线',
    langInsert  : '',
    langCancel  : 'Cancel',
    langWidth   : 'Width',
    // defaults
    defaultHRWidth: '100%',
    // private
    cmd: 'hr',
    // private
    init: function(cmp){
        this.cmp = cmp;
        this.cmp.on('render', this.onRender, this);
    },
    // private
    onRender: function(){
        var cmp = this.cmp;
        var btn = this.cmp.getToolbar().addButton({
            iconCls: 'x-edit-hr',
            handler: function(){
            	this.insertHR();
/*                if (!this.hrWindow) {
                    this.hrWindow = new Ext.Window({
                        title: this.langTitle,
                        width: 240,
                        closeAction: 'hide',
                        items: [{
                            itemId: 'insert-hr',
                            xtype: 'form',
                            border: false,
                            plain: true,
                            bodyStyle: 'padding: 10px;',
                            labelWidth: 60,
                            labelAlign: 'right',
                            items: [{
                                xtype: 'label',
                                html: this.langHelp + '<br/>&nbsp;'
                            }, {
                                xtype: 'textfield',
                                maskRe: /[0-9]|%/,
                                regex: /^[1-9][0-9%]{1,3}/,
                                fieldLabel: this.langWidth,
                                name: 'hrwidth',
                                width: 60,
                                value: this.defaultHRWidth,
                                listeners: {
                                    specialkey: function(f, e){
                                        if ((e.getKey() == e.ENTER || e.getKey() == e.RETURN) && f.isValid()) {
                                            this.doInsertHR();
                                        }
                                    },
                                    scope: this
                                }
                            }]
                        }],
                        buttons: [{
                            text: this.langInsert,
                            handler: function(){
                                var frm = this.hrWindow.getComponent('insert-hr').getForm();
                                if (frm.isValid()) {
                                    this.doInsertHR();
                                } else {
                                    frm.findField('hrwidth').getEl().frame();
                                }
                            },
                            scope: this
                        }, {
                            text: this.langCancel,
                            handler: function(){
                                this.hrWindow.hide();
                            },
                            scope: this
                        }],
                        listeners: {
                            render: (Ext.isGecko) ? this.focusHRLong : this.focusHR,
                            show: this.focusHR,
                            move: this.focusHR,
                            scope: this
                        }
                    });
                } else {
                    this.hrWindow.getEl().frame();
                }
                this.hrWindow.show();*/
            },
            scope: this,
            tooltip: {
                title: this.langInsert + ' ' + this.langTitle
            },
            overflowText: this.langTitle
        });
    },
    // private
    focusHRLong: function(w){
        this.focus(w, 600);
    },
    // private
    focusHR: function(w){
        this.focus(w, 100);
    },
    /**
     * This method is just for focusing the text field use for entering the width of the HR.
     * It's extra messy because Firefox seems to take a while longer to render the window than other browsers, 
     * particularly when Firbug is enabled, which is all the time if your like me.
     * Had to crank up the delay for focusing on render to 600ms for Firefox, and 100ms for all other focusing.
     * Other browsers seem to work fine in all cases with as little as 50ms delay. Compromise bleh!
     * @param {Object} win the window to focus
     * @param {Integer} delay the delay in milliseconds before focusing
     */
    focus: function(win, delay){
        win.getComponent('insert-hr').getForm().findField('hrwidth').focus(true, delay);
    },
    // private
    doInsertHR: function(){
        var frm = this.hrWindow.getComponent('insert-hr').getForm();
        if (frm.isValid()) {
            var hrwidth = frm.findField('hrwidth').getValue();
            if (hrwidth) {
                this.insertHR(hrwidth);
            } else {
                this.insertHR(this.defaultHRWidth);
            }
            frm.reset();
            this.hrWindow.hide();
        }
    },
    /**
     * Insert a horizontal rule into the document.
     * @param w String The width of the horizontal rule as the <tt>width</tt> attribute of the HR tag expects. ie: '100%' or '400' (pixels).
     */
    insertHR: function(w){
        this.cmp.insertAtCursor('<hr width="' + this.defaultHRWidth + '">');
    }
});


/**
 * @class Ext.ux.form.HtmlEditor.RemoveFormat
 * @extends Ext.ux.form.HtmlEditor.MidasCommand
 * <p>A plugin that creates a button on the HtmlEditor that will remove all formatting on selected text.</p>
 */
Ext.ux.form.HtmlEditor.RemoveFormat = Ext.extend(Ext.ux.form.HtmlEditor.MidasCommand, {
    midasBtns: ['|', {
        enableOnSelection: true,
        cmd: 'removeFormat',
        tooltip: {
            title: 'Remove Formatting'
        },
        overflowText: 'Remove Formatting'
    }]
});


/**
 * @class Ext.ux.form.HtmlEditor.IndentOutdent
 * @extends Ext.ux.form.HtmlEditor.MidasCommand
 * <p>A plugin that creates two buttons on the HtmlEditor for indenting and outdenting of selected text.</p>
 */
Ext.ux.form.HtmlEditor.IndentOutdent = Ext.extend(Ext.ux.form.HtmlEditor.MidasCommand, {
    // private
    midasBtns: ['|', {
        cmd: 'indent',
        tooltip: {
            title: 'Indent Text'
        },
        overflowText: 'Indent Text'
    }, {
        cmd: 'outdent',
        tooltip: {
            title: 'Outdent Text'
        },
        overflowText: 'Outdent Text'
    }]
});


/**
 * @class Ext.ux.form.HtmlEditor.SubSuperScript
 * @extends Ext.ux.form.HtmlEditor.MidasCommand
 * <p>A plugin that creates two buttons on the HtmlEditor for superscript and subscripting of selected text.</p>
 */
Ext.ux.form.HtmlEditor.SubSuperScript = Ext.extend(Ext.ux.form.HtmlEditor.MidasCommand, {
    // private
    midasBtns: ['|', {
        enableOnSelection: true,
        cmd: 'subscript',
        tooltip: {
            title: 'Subscript'
        },
        overflowText: 'Subscript'
    }, {
        enableOnSelection: true,
        cmd: 'superscript',
        tooltip: {
            title: 'Superscript'
        },
        overflowText: 'Superscript'
    }]
});


/**
 * @contributor Ronald van Raaphorst - Twensoc
 * @class Ext.ux.form.HtmlEditor.FindReplace
 * @extends Ext.util.Observable
 * <p>A plugin that provides search and replace functionality in source edit mode. Incomplete.</p>
 */
Ext.ux.form.HtmlEditor.FindAndReplace = Ext.extend(Ext.util.Observable, {
	// Find and Replace language text
	langTitle: 'Find/Replace',
	langFind: 'Find',
	langReplace: 'Replace',
	langReplaceWith: 'Replace with',
	langClose: 'Close',
    // private
    cmd: 'findandreplace',
    // private
    init: function(cmp){
        this.cmp = cmp;
        this.cmp.on({
            'render': this.onRender,
            'editmodechange': this.editModeChange,
            scope: this
        });
        this.lastSelectionStart=-1;
    },
    editModeChange: function(t, m){
        if (this.btn && m){
            this.btn.setDisabled(false);
        }
    },
    // private
    onRender: function(){
        this.btn = this.cmp.getToolbar().addButton({
            iconCls: 'x-edit-findandreplace',
            sourceEditEnabled:true,
            handler: function(){
                
                if (!this.farWindow){
                
                    this.farWindow = new Ext.Window({
                        title: this.langTitle,
                        closeAction: 'hide',
                        width: 270,
                        items: [{
                            itemId: 'findandreplace',
                            xtype: 'form',
                            border: false,
                            plain: true,
                            bodyStyle: 'padding: 10px;',
                            labelWidth: 80,
                            labelAlign: 'right',
                            items: [{
                                xtype: 'textfield',
                                allowBlank: false,
                                fieldLabel: this.langFind,
                                name: 'find',
                                width: 145
                            }, {
                                xtype: 'textfield',
                                allowBlank: true,
                                fieldLabel: this.langReplaceWith,
                                name: 'replace',
                                width: 145
                            }]
                        }],
                        buttons: [{
                            text: this.langFind,
                            handler: this.doFind,
                            scope: this
                        }, {
                            text: this.langReplace,
                            handler: this.doReplace,
                            scope: this
                        }, {
                            text: this.langClose,
                            handler: function(){
                                this.farWindow.hide();
                            },
                            scope: this
                        }]
                    });
                
                }else{
                    
                    this.farWindow.getEl().frame();
                    
                }
                
                this.farWindow.show();
                
            },
            scope: this,
            tooltip: {
                title: this.langTitle
            },
            overflowText: this.langTitle
        });
        
    },
    doFind: function(){
        
        var frm = this.farWindow.getComponent('findandreplace').getForm();
        if (!frm.isValid()) {
            return '';
        }
        
        var findValue = frm.findField('find').getValue();
        var replaceValue = frm.findField('replace').getValue();
        if(this.cmp.sourceEditMode) {
            // source edit mode
            var textarea = this.cmp.el.dom; 
            var startPos = textarea.selectionStart===this.lastSelectionStart ? textarea.selectionStart+1 : textarea.selectionStart;
            var txt = textarea.value.substring(startPos);
            
            var regexp = new RegExp(findValue);
            var r = txt.search(regexp);
            if(r==-1) {
                return;                                    
            }
            this.lastSelectionStart = startPos + r;
            if(Ext.isGecko) {
                textarea.setSelectionRange(this.lastSelectionStart , this.lastSelectionStart + findValue.length);
                this.cmp.scrollIntoView(startPos);
                this.cmp.focus(false, true);
            }
            return;
        }
        // design mode
        //var doc = this.cmp.getEditorBody();
        //var txt = doc.innerHTML;
        // Should we search/replace in the source, and push the result back to the design?
        
    },
    doReplace: function(){
        
        var frm = this.farWindow.getComponent('findandreplace').getForm();
        if (!frm.isValid()) {
            return '';
        }
        
        var findValue = frm.findField('find').getValue();
        var replaceValue = frm.findField('replace').getValue();
        if(this.cmp.sourceEditMode) {
            var textarea = this.cmp.el.dom;
            var startPos = textarea.selectionStart;
            var endPos = textarea.selectionEnd;
            var txt = textarea.value;
            
            //cmp.execCmd('delete', null);
            //cmp.focus(false, false);
            //cmp.insertAtCursor(replaceValue);

            if(Ext.isGecko) {
                // 
                var scrollPosition = textarea.scrollTop;
                textarea.value = txt.substring(0,startPos) + replaceValue + txt.substring(endPos);
                textarea.setSelectionRange(startPos,startPos + replaceValue.length);
                textarea.scrollTop = scrollPosition;
                this.cmp.focus(false, true);
            }
            return;
        }
        return;
        
    }
});


/**
 * @class Ext.ux.form.HtmlEditor.Table
 * @extends Ext.util.Observable
 * <p>A plugin that creates a button on the HtmlEditor for making simple tables.</p>
 */
Ext.ux.form.HtmlEditor.Table = Ext.extend(Ext.util.Observable, {
    // Table language text
    langTitle       : '<span style="font-weight:normal">插入表格</span>',
    langInsert      : '插入',
    langCancel      : '取消',
    langRows        : '行数',
    langColumns     : '列数',
    langBorder      : '边框',
    langCellLabel   : '测试数据',
    // private
    cmd: 'table',
    /**
     * @cfg {Boolean} showCellLocationText
     * Set true to display row and column informational text inside of newly created table cells.
     */
    showCellLocationText: true,
    /**
     * @cfg {String} cellLocationText
     * The string to display inside of newly created table cells.
     */
    cellLocationText: '{0}&nbsp;-&nbsp;{1}',
    /**
     * @cfg {Array} tableBorderOptions
     * A nested array of value/display options to present to the user for table border style. Defaults to a simple list of 5 varrying border types.
     */
    tableBorderOptions: [['1px solid #000', '细边框'], ['2px solid #000', '粗边框'], ['1px dashed #000', '虚线边框'], ['1px dotted #000', '点阵边框']],
    // private
    init: function(cmp){
        this.cmp = cmp;
        this.cmp.on('render', this.onRender, this);
    },
    // private
    onRender: function(){
        var btn = this.cmp.getToolbar().addButton({
            iconCls: 'x-edit-table',
            handler: function(){
                if (!this.tableWindow){
                    this.tableWindow = new Ext.Window({
                        title: this.langTitle,
                        closeAction: 'hide',
                        width: 235,
                        items: [{
                            itemId: 'insert-table',
                            xtype: 'form',
                            border: false,
                            plain: true,
                            bodyStyle: 'padding: 10px;',
                            labelWidth: 65,
                            labelAlign: 'right',
                            items: [{
                                xtype: 'numberfield',
                                allowBlank: false,
                                allowDecimals: false,
                                fieldLabel: this.langRows,
                                name: 'row',
                                width: 60
                            }, {
                                xtype: 'numberfield',
                                allowBlank: false,
                                allowDecimals: false,
                                fieldLabel: this.langColumns,
                                name: 'col',
                                width: 60
                            }, {
                                xtype: 'combo',
                                fieldLabel: this.langBorder,
                                name: 'border',
                                forceSelection: true,
                                mode: 'local',
                                editable:false,
                                store: new Ext.data.ArrayStore({
                                    autoDestroy: true,
                                    fields: ['spec', 'val'],
                                    data: this.tableBorderOptions
                                }),
                                triggerAction: 'all',
                                value: '1px solid #000',
                                displayField: 'val',
                                valueField: 'spec',
                                anchor: '-15'
                            }, {
                            	xtype: 'checkbox',
                            	fieldLabel: this.langCellLabel,
                            	checked: this.showCellLocationText,
                            	listeners: {
                            		check: function(){
                            			this.showCellLocationText = !this.showCellLocationText;
                            		},
                            		scope: this
                            	}
                            }]
                        }],
                        buttons: [{
                            text: this.langInsert,
                            iconCls:'acceptIcon',
                            handler: function(){
                                var frm = this.tableWindow.getComponent('insert-table').getForm();
                                if (frm.isValid()) {
                                    var border = frm.findField('border').getValue();
                                    var rowcol = [frm.findField('row').getValue(), frm.findField('col').getValue()];
                                    if (rowcol.length == 2 && rowcol[0] > 0 && rowcol[1] > 0) {
                                        var colwidth = Math.floor(100/rowcol[0]);
                                        var html = "<table style='border-collapse: collapse'>";
                                        var cellText = '&nbsp;';
                                        if (this.showCellLocationText){ cellText = this.cellLocationText; }
                                        for (var row = 0; row < rowcol[0]; row++) {
                                            html += "<tr>";
                                            for (var col = 0; col < rowcol[1]; col++) {
                                                html += "<td width='" + colwidth + "%' style='border: " + border + ";'>" + String.format(cellText, (row+1), String.fromCharCode(col+65)) + "</td>";
                                            }
                                            html += "</tr>";
                                        }
                                        html += "</table>";
                                        this.cmp.insertAtCursor(html);
                                    }
                                    this.tableWindow.hide();
                                }else{
                                    if (!frm.findField('row').isValid()){
                                        frm.findField('row').getEl().frame();
                                    }else if (!frm.findField('col').isValid()){
                                        frm.findField('col').getEl().frame();
                                    }
                                }
                            },
                            scope: this
                        }, {
                            text: this.langCancel,
                            iconCls:'deleteIcon',
                            handler: function(){
                                this.tableWindow.hide();
                            },
                            scope: this
                        }]
                    });
                
                }else{
                    this.tableWindow.getEl().frame();
                }
                this.tableWindow.show();
            },
            scope: this,
            tooltip: {
                title: this.langTitle
            },
            overflowText: this.langTitle
        });
    }
});


/**
 * @class Ext.ux.form.HtmlEditor.Word
 * @extends Ext.util.Observable
 * <p>A plugin that creates a button on the HtmlEditor for pasting text from Word without all the jibberish html.</p>
 */
Ext.ux.form.HtmlEditor.Word = Ext.extend(Ext.util.Observable, {
    // Word language text
    langTitle: '<span style="font-weight:normal">粘帖word文档</span>',
    langToolTip: '<span style="font-weight:normal">粘帖word文档</span>',
    wordPasteEnabled: true,
    // private
	curLength: 0,
	lastLength: 0,
	lastValue: '',
	// private
    init: function(cmp){
        
        this.cmp = cmp;
        this.cmp.on('render', this.onRender, this);
		this.cmp.on('initialize', this.onInit, this, {delay:100, single: true});
        
    },
	// private
	onInit: function(){
		
		Ext.EventManager.on(this.cmp.getDoc(), {
            'keyup': this.checkIfPaste,
            scope: this
        });
		this.lastValue = this.cmp.getValue();
		this.curLength = this.lastValue.length;
		this.lastLength = this.lastValue.length;
		
	},
	// private
	checkIfPaste: function(e){
		
		var diffAt = 0;
		this.curLength = this.cmp.getValue().length;
		
		if (e.V == e.getKey() && e.ctrlKey && this.wordPasteEnabled){
			
			this.cmp.suspendEvents();
			
			diffAt = this.findValueDiffAt(this.cmp.getValue());
			var parts = [
				this.cmp.getValue().substr(0, diffAt),
				this.fixWordPaste(this.cmp.getValue().substr(diffAt, (this.curLength - this.lastLength))),
				this.cmp.getValue().substr((this.curLength - this.lastLength)+diffAt, this.curLength)
			];
			this.cmp.setValue(parts.join(''));
			
			this.cmp.resumeEvents();
		}
		
		this.lastLength = this.cmp.getValue().length;
		this.lastValue = this.cmp.getValue();
		
	},
	// private
	findValueDiffAt: function(val){
		
		for (i=0;i<this.curLength;i++){
			if (this.lastValue[i] != val[i]){
				return i;			
			}
		}
		
	},
    /**
     * Cleans up the jubberish html from Word pasted text.
     * @param wordPaste String The text that needs to be cleansed of Word jibberish html.
     * @return {String} The passed in text with all Word jibberish html removed.
     */
    fixWordPaste: function(wordPaste) {
        
        var removals = [/&nbsp;/ig, /[\r\n]/g, /<(xml|style)[^>]*>.*?<\/\1>/ig, /<\/?(meta|object|span)[^>]*>/ig,
			/<\/?[A-Z0-9]*:[A-Z]*[^>]*>/ig, /(lang|class|type|href|name|title|id|clear)=\"[^\"]*\"/ig, /style=(\'\'|\"\")/ig, /<![\[-].*?-*>/g, 
			/MsoNormal/g, /<\\?\?xml[^>]*>/g, /<\/?o:p[^>]*>/g, /<\/?v:[^>]*>/g, /<\/?o:[^>]*>/g, /<\/?st1:[^>]*>/g, /&nbsp;/g, 
            /<\/?SPAN[^>]*>/g, /<\/?FONT[^>]*>/g, /<\/?STRONG[^>]*>/g, /<\/?H1[^>]*>/g, /<\/?H2[^>]*>/g, /<\/?H3[^>]*>/g, /<\/?H4[^>]*>/g, 
            /<\/?H5[^>]*>/g, /<\/?H6[^>]*>/g, /<\/?P[^>]*><\/P>/g, /<!--(.*)-->/g, /<!--(.*)>/g, /<!(.*)-->/g, /<\\?\?xml[^>]*>/g, 
            /<\/?o:p[^>]*>/g, /<\/?v:[^>]*>/g, /<\/?o:[^>]*>/g, /<\/?st1:[^>]*>/g, /style=\"[^\"]*\"/g, /style=\'[^\"]*\'/g, /lang=\"[^\"]*\"/g, 
            /lang=\'[^\"]*\'/g, /class=\"[^\"]*\"/g, /class=\'[^\"]*\'/g, /type=\"[^\"]*\"/g, /type=\'[^\"]*\'/g, /href=\'#[^\"]*\'/g, 
            /href=\"#[^\"]*\"/g, /name=\"[^\"]*\"/g, /name=\'[^\"]*\'/g, / clear=\"all\"/g, /id=\"[^\"]*\"/g, /title=\"[^\"]*\"/g, 
            /<span[^>]*>/g, /<\/?span[^>]*>/g, /<title>(.*)<\/title>/g, /class=/g, /<meta[^>]*>/g, /<link[^>]*>/g, /<style>(.*)<\/style>/g, 
            /<w:[^>]*>(.*)<\/w:[^>]*>/g];
					
        Ext.each(removals, function(s){
            wordPaste = wordPaste.replace(s, "");
        });
        
        // keep the divs in paragraphs
        wordPaste = wordPaste.replace(/<div[^>]*>/g, "<p>");
        wordPaste = wordPaste.replace(/<\/?div[^>]*>/g, "</p>");
        return wordPaste;
        
    },
	// private
    onRender: function() {
        
        this.cmp.getToolbar().add({
            iconCls: 'x-edit-wordpaste',
            pressed: true,
            handler: function(t){
                t.toggle(!t.pressed);
                this.wordPasteEnabled = !this.wordPasteEnabled;
            },
            scope: this,
            tooltip: {
                text: this.langToolTip
            },
            overflowText: this.langTitle
        });
		
    }
});


/**
 * @class Ext.ux.form.HtmlEditor.Link
 * @extends Ext.util.Observable
 *          <p>
 *          A plugin that creates a button on the HtmlEditor for inserting a
 *          link.
 *          </p>
 */
Ext.ux.form.HtmlEditor.Link = Ext.extend(Ext.util.Observable, {
	// Link language text
	langTitle : '<span style="font-weight:normal">插入超链接</span>',
	langInsert : '插入',
	langCancel : '取消',
	langTarget : '打开目标',
	langURL : '链接地址',
	langText : '显示文本',
	// private
	linkTargetOptions : [['_self', '当前窗口'], ['_blank', '新窗口']],
	init : function(cmp) {
		cmp.enableLinks = false;
		this.cmp = cmp;
		this.cmp.on('render', this.onRender, this);
	},
	onRender : function() {
		var cmp = this.cmp;
		var btn = this.cmp.getToolbar().addButton({
			iconCls : 'x-edit-createlink',
			handler : function() {
				var sel = this.cmp.getSelectedText();
				if (!this.linkWindow) {
					this.linkWindow = new Ext.Window({
						title : this.langTitle,
						closeAction : 'hide',
						width : 350,
						height : 160,
						layout : 'fit',
						items : [{
							xtype : 'form',
							itemId : 'insert-link',
							border : false,
							plain : true,
							bodyStyle : 'padding: 10px;',
							labelWidth : 60,
							labelAlign : 'right',
							items : [{
										xtype : 'textfield',
										fieldLabel : this.langText,
										name : 'text',
										anchor : '100%',
										allowBlank : false,
										emptyText : '显示文本'
									}, {
										xtype : 'textfield',
										fieldLabel : this.langURL,
										name : 'url',
										anchor : '100%',
										allowBlank : false,
										emptyText : '请填入链接地址'
									}, {
										xtype : 'combo',
										fieldLabel : this.langTarget,
										name : 'target',
										forceSelection : true,
										mode : 'local',
										editable : false, // 选择输入框可编辑
										store : new Ext.data.ArrayStore({
													autoDestroy : true,
													fields : ['spec', 'val'],
													data : this.linkTargetOptions
												}),
										triggerAction : 'all',
										value : '_blank',
										displayField : 'val',
										valueField : 'spec',
										anchor : '100%'
									}]
						}],
						buttons : [{
							text : this.langInsert,
							iconCls : 'acceptIcon',
							handler : function() {
								var frm = this.linkWindow
										.getComponent('insert-link').getForm();
								if (frm.isValid()) {
									url = frm.findField('url').getValue();
									if (!this.isUrl(url)) {
										Ext.Msg.alert('提示', 'URL不合法.请重新输入.格式[http://****]');
										return;
									};
									afterSpace = '', sel = this.cmp
											.getSelectedText(true), text = frm
											.findField('text').getValue(), url = frm
											.findField('url').getValue(), target = frm
											.findField('target').getValue();
									if (text.length
											&& text[text.length - 1] == ' ') {
										text = text.substr(0, text.length - 1);
										afterSpace = ' ';
									}
									if (sel.hasHTML) {
										text = sel.html;
									}
									var html = '<a href="' + url + '" target="'
											+ target + '">' + text + '</a>'
											+ afterSpace;
									this.cmp.insertAtCursor(html);
									this.linkWindow.hide();
								} else {
									if (!frm.findField('url').isValid()) {
										frm.findField('url').getEl().frame();
									} else if (!frm.findField('target')
											.isValid()) {
										frm.findField('target').getEl().frame();
									}
								}

							},
							scope : this
						}, {
							text : this.langCancel,
							iconCls : 'deleteIcon',
							handler : function() {
								this.linkWindow.hide();
							},
							scope : this
						}],
						listeners : {
							show : {
								fn : function() {
									var sel = this.cmp.getSelectedText();
									var frm = this.linkWindow
											.getComponent('insert-link')
											.getForm();
									frm.reset();
									if (sel.textContent != '') {
										frm.findField('text')
												.setValue(sel.textContent)
												.setDisabled(sel.hasHTML);
									}
								},
								scope : this,
								defer : 350
							}
						}
					});
					this.linkWindow.show();
				} else {
					this.linkWindow.show();
					this.linkWindow.getEl().frame();
				}
			},
			scope : this,
			tooltip : this.langTitle
		});
	},
	isUrl : function(urlString) {
		regExp = /(http[s]?|ftp):\/\/[^\/\.]+?\..+\w$/i;
		if (urlString.match(regExp))
			return true;
		else
			return false;
	}
});


/**
 * @class Ext.ux.form.HtmlEditor.SpecialCharacters
 * @extends Ext.util.Observable
 * <p>A plugin that creates a button on the HtmlEditor for inserting special characters.</p>
 */
Ext.ux.form.HtmlEditor.SpecialCharacters = Ext.extend(Ext.util.Observable, {
    // SpecialCharacters language text
    langTitle   : 'Insert Special Character',
    langInsert  : 'Insert',
    langCancel  : 'Cancel',
    /**
     * @cfg {Array} specialChars
     * An array of additional characters to display for user selection.  Uses numeric portion of the ASCII HTML Character Code only. For example, to use the Copyright symbol, which is &#169; we would just specify <tt>169</tt> (ie: <tt>specialChars:[169]</tt>).
     */
    specialChars: [153],
    /**
     * @cfg {Array} charRange
     * Two numbers specifying a range of ASCII HTML Characters to display for user selection. Defaults to <tt>[160, 256]</tt>.
     */
    charRange: [160, 256],
    // private
    chars: [],
    // private
    init: function(cmp){
        this.cmp = cmp;
        this.cmp.on('render', this.onRender, this);
    },
    // private
    onRender: function(){
        var cmp = this.cmp;
        var btn = this.cmp.getToolbar().addButton({
            iconCls: 'x-edit-char',
            handler: function(){
                if (!this.chars.length) {
                    if (this.specialChars.length) {
                        Ext.each(this.specialChars, function(c, i){
                            this.chars[i] = ['&#' + c + ';'];
                        }, this);
                    }
                    for (i = this.charRange[0]; i < this.charRange[1]; i++) {
                        this.chars.push(['&#' + i + ';']);
                    }
                }
                var charStore = new Ext.data.ArrayStore({
                    fields: ['char'],
                    data: this.chars
                });
                this.charWindow = new Ext.Window({
                    title: this.langTitle,
                    width: 436,
                    autoHeight: true,
                    layout: 'fit',
                    items: [{
                        xtype: 'dataview',
                        store: charStore,
                        ref: 'charView',
                        autoHeight: true,
                        multiSelect: true,
                        tpl: new Ext.XTemplate('<tpl for="."><div class="char-item">{char}</div></tpl><div class="x-clear"></div>'),
                        overClass: 'char-over',
                        itemSelector: 'div.char-item',
                        listeners: {
                            dblclick: function(t, i, n, e){
                                this.insertChar(t.getStore().getAt(i).get('char'));
                                this.charWindow.close();
                            },
                            scope: this
                        }
                    }],
                    buttons: [{
                        text: this.langInsert,
                        handler: function(){
                            Ext.each(this.charWindow.charView.getSelectedRecords(), function(rec){
                                var c = rec.get('char');
                                this.insertChar(c);
                            }, this);
                            this.charWindow.close();
                        },
                        scope: this
                    }, {
                        text: this.langCancel,
                        handler: function(){
                            this.charWindow.close();
                        },
                        scope: this
                    }]
                });
                this.charWindow.show();
            },
            scope: this,
            tooltip: {
                title: this.langTitle
            },
            overflowText: this.langTitle
        });
    },
    /**
     * Insert a single special character into the document.
     * @param c String The special character to insert (not just the numeric code, but the entire ASCII HTML entity).
     */
    insertChar: function(c){
        if (c) {
            this.cmp.insertAtCursor(c);
        }
    }
});


/**
 * @contributor Somani - http://www.sencha.com/forum/member.php?51567-Somani
 * @class Ext.ux.form.HtmlEditor.HeadingButtons
 * @extends Ext.ux.form.HtmlEditor.MidasCommand
 * <p>A plugin that creates a button on the HtmlEditor that will have H1 and H2 options. This is used when you want to restrict users to just a few heading types.</p>
 * NOTE: while 'heading' should be the command used, it is not supported in IE, so 'formatblock' is used instead. Thank you IE.
 */

Ext.ux.form.HtmlEditor.HeadingButtons = Ext.extend(Ext.ux.form.HtmlEditor.MidasCommand, {
    // private
    midasBtns: ['|', {
        enableOnSelection: true,
        cmd: 'formatblock',
        value: '<h1>',
        tooltip: {
            title: '1st Heading'
        },
        overflowText: '1st Heading'
    }, {
        enableOnSelection: true,
        cmd: 'formatblock',
        value: '<h2>',
        tooltip: {
            title: '2nd Heading'
        },
        overflowText: '2nd Heading'
    }]
}); 

/**
 * @author Shea Frederick - http://www.vinylfox.com
 * @class Ext.ux.form.HtmlEditor.HeadingMenu
 * @extends Ext.util.Observable
 * <p>A plugin that creates a menu on the HtmlEditor for selecting a heading size. Takes up less room than the heading buttons if your going to have all six heading sizes available.</p>
 */
Ext.ux.form.HtmlEditor.HeadingMenu = Ext.extend(Ext.util.Observable, {
    init: function(cmp){
        this.cmp = cmp;
        this.cmp.on('render', this.onRender, this);
    },
    // private
    onRender: function(){
        var cmp = this.cmp;
        var btn = this.cmp.getToolbar().addItem({
            xtype: 'combo',
            displayField: 'display',
            valueField: 'value',
            name: 'headingsize',
            forceSelection: true,
            mode: 'local',
            triggerAction: 'all',
            width: 60,
            emptyText: '标题',
            store: {
                xtype: 'arraystore',
                autoDestroy: true,
                fields: ['value','display'],
                data: [['H1','标题1'],['H2','标题2'],['H3','标题3'],['H4','标题4']]
            },
            listeners: {
                'select': function(combo,rec){
                    this.relayCmd('formatblock', '<'+rec.get('value')+'>');
                    combo.reset();
                },
                scope: cmp
            }
        });
    }
});

/**
 * @contributor vizcano - http://www.extjs.com/forum/member.php?u=23512
 * @class Ext.ux.form.HtmlEditor.UndoRedo
 * @extends Ext.ux.form.HtmlEditor.MidasCommand
 * <p>A plugin that creates undo and redo buttons on the HtmlEditor. Incomplete.</p>
 */

Ext.ux.form.HtmlEditor.UndoRedo = Ext.extend(Ext.ux.form.HtmlEditor.MidasCommand, {
    // private
    midasBtns: ['|', {
        cmd: 'undo',
        tooltip: {
            title: 'Undo'
        },
        overflowText: 'Undo'
    }, {
        cmd: 'redo',
        tooltip: {
            title: 'Redo'
        },
        overflowText: 'Redo'
    }]
});


/**
 * @class Ext.ux.form.HtmlEditor.Font
 * @extends Ext.util.Observable
 * <p>A plugin that creates a menu on the HtmlEditor for selecting a font. Uses the HtmlEditors default font settings which can be overriden on that component to change the list of fonts or default font.</p>
 */
Ext.ux.form.HtmlEditor.Font = Ext.extend(Ext.util.Observable, {
    init: function(cmp){
        this.cmp = cmp;
        this.cmp.on('render', this.onRender, this);
    },
    // private
    onRender: function(){
        var cmp = this.cmp;
        var fonts = function(){
            var fnts = [];
            Ext.each(cmp.fontFamilies, function(itm){
                fnts.push([itm.toLowerCase(),itm]);
            });
            return fnts;
        }(); 
        var btn = this.cmp.getToolbar().addItem({
            xtype: 'combo',
            displayField: 'display',
            valueField: 'value',
            name: 'fontfamily',
            forceSelection: true,
            mode: 'local',
            triggerAction: 'all',
            width: 80,
            emptyText: 'Font',
            tpl: '<tpl for="."><div class="x-combo-list-item" style="font-family:{value};">{display}</div></tpl>',
            store: {
                xtype: 'arraystore',
                autoDestroy: true,
                fields: ['value','display'],
                data: fonts
            },
            listeners: {
                'select': function(combo,rec){
                    this.relayCmd('fontname', rec.get('value'));
                    this.deferFocus();
                    combo.reset();
                },
                scope: cmp
            }
        });
    }
});


/**
 * @class Ext.ux.form.HtmlEditor.Image
 * @extends Ext.util.Observable
 *          <p>
 *          A plugin that creates an image button in the HtmlEditor toolbar for
 *          inserting an image. The method to select an image must be defined by
 *          overriding the selectImage method. Supports resizing of the image
 *          after insertion.
 *          </p>
 *          <p>
 *          The selectImage implementation must call insertImage after the user
 *          has selected an image, passing it a simple image object like the one
 *          below.
 *          </p>
 * 
 * <pre>
 * var img = {
 * 	Width : 100,
 * 	Height : 100,
 * 	ID : 123,
 * 	Title : 'My Image'
 * };
 * </pre>
 */
Ext.ux.form.HtmlEditor.Image = Ext.extend(Ext.util.Observable, {
	// Image language text
	langTitle : '<span style="font-weight:normal">插入图片</span>',
	urlSizeVars : ['width', 'height'],
	basePath : '',
	init : function(cmp) {
		this.cmp = cmp;
		this.cmp.on('render', this.onRender, this);
		this.cmp.on('initialize', this.onInit, this, {
					delay : 100,
					single : true
				});
	},
	onEditorMouseUp : function(e) {
		Ext.get(e.getTarget()).select('img').each(function(el) {
			var w = el.getAttribute('width'), h = el.getAttribute('height'), src = el
					.getAttribute('src')
					+ ' ';
			src = src.replace(new RegExp(this.urlSizeVars[0]
							+ '=[0-9]{1,5}([&| ])'), this.urlSizeVars[0] + '='
							+ w + '$1');
			src = src.replace(new RegExp(this.urlSizeVars[1]
							+ '=[0-9]{1,5}([&| ])'), this.urlSizeVars[1] + '='
							+ h + '$1');
			el.set({
						src : src.replace(/\s+$/, "")
					});
		}, this);

	},
	onInit : function() {
		Ext.EventManager.on(this.cmp.getDoc(), {
					'mouseup' : this.onEditorMouseUp,
					buffer : 100,
					scope : this
				});
	},
	onRender : function() {
		var btn = this.cmp.getToolbar().addButton({
					iconCls : 'x-edit-image',
					handler : this.selectImage,
					scope : this,
					tooltip : {
						title : this.langTitle
					},
					overflowText : this.langTitle
				});
	},
	selectImage : function() {
		// alert('OK');
		if (!this.imgWindow) {
			this.imgWindow = new Ext.Window({
						title : this.langTitle,
						closeAction : 'hide',
						width : 400,
						height : 140,
						layout : 'fit',
						items : [{
									xtype : 'form',
									itemId : 'insert-img',
									border : false,
									plain : true,
									bodyStyle : 'padding: 10px;',
									labelWidth : 60,
									labelAlign : 'right',
									items : [{
												xtype : 'textfield',
												fieldLabel : '图片URL',
												name : 'url',
												anchor : '100%',
												allowBlank : false,
												emptyText : '请填入支持外链的长期有效的图片URL'
											}, {
												xtype : 'textfield',
												fieldLabel : '图片说明',
												name : 'name',
												maxLength : 100,
												anchor : '100%',
												emptyText : '简短的图片说明'
											}]
								}],
						buttons : [{
							text : '插入',
							iconCls : 'acceptIcon',
							handler : function() {
								var frm = this.imgWindow
										.getComponent('insert-img').getForm();
								if (frm.isValid()) {
									url = frm.findField('url').getValue();
									if(!this.isUrl(url)){
										Ext.Msg.alert('提示', 'URL不合法.请重新输入.格式[http://****]');
										return;
									};
									var img = {
										// Width : 100,
										// Height : 100,
										Url : frm.findField('url').getValue(),
										ID : 'id_img_9999',
										Title : frm.findField('name')
												.getValue()
									};
									this.insertImage(img);
									this.imgWindow.hide();
								} else {
									if (!frm.findField('url').isValid()) {
										frm.findField('url').getEl().frame();
									}
								}

							},
							scope : this
						}, {
							text : '取消',
							iconCls : 'deleteIcon',
							handler : function() {
								this.imgWindow.hide();
							},
							scope : this
						}],
						listeners : {
							show : {
								fn : function() {
									var sel = this.cmp.getSelectedText();
									var frm = this.imgWindow
											.getComponent('insert-img')
											.getForm();
									frm.reset();
									// frm.findField('url').focus(true, 50);
								},
								scope : this,
								defer : 350
							}
						}
					});
			this.imgWindow.show();
		} else {
			this.imgWindow.show();
			this.imgWindow.getEl().frame();
		}
	},
	insertImage : function(img) {
		this.cmp.insertAtCursor('<img src="' + img.Url + '" title="' + img.Name
				+ '" alt="' + img.Name + '">');
	},
	isUrl : function(urlString) {
		regExp = /(http[s]?|ftp):\/\/[^\/\.]+?\..+\w$/i;
		if (urlString.match(regExp))
			return true;
		else
			return false;
	}

});

/**
 * @class Ext.ux.form.HtmlEditor.plugins
 * <p>A convenience function that returns a standard set of HtmlEditor buttons.</p>
 * <p>Sample usage:</p>
 * <pre><code>
    new Ext.FormPanel({
        ...
        items : [{
            ...
            xtype           : "htmleditor",
            plugins         : Ext.ux.form.HtmlEditor.plugins()
        }]
    });
 * </code></pre>
 */
Ext.ux.form.HtmlEditor.plugins = function(){
    return [
        new Ext.ux.form.HtmlEditor.Link(),
        new Ext.ux.form.HtmlEditor.Divider(),
        new Ext.ux.form.HtmlEditor.Word(),
        new Ext.ux.form.HtmlEditor.FindAndReplace(),
        new Ext.ux.form.HtmlEditor.Divider(),
        new Ext.ux.form.HtmlEditor.Image(),
        new Ext.ux.form.HtmlEditor.Table(),
        new Ext.ux.form.HtmlEditor.HR(),
        new Ext.ux.form.HtmlEditor.SpecialCharacters(),
        new Ext.ux.form.HtmlEditor.HeadingMenu(),
        new Ext.ux.form.HtmlEditor.IndentOutdent(),
        new Ext.ux.form.HtmlEditor.SubSuperScript(),
        new Ext.ux.form.HtmlEditor.RemoveFormat(),
        new Ext.ux.form.HtmlEditor.UndoRedo(),
        new Ext.ux.form.HtmlEditor.Font()
    ];
};