

Ext.ns('Ext.ux.grid');
    Ext.ux.grid.GridDropZone = Ext.extend(Ext.dd.DropZone, {
        ddGroup: 'GridDD',
        constructor: function (grid, config) {
            this.view = grid.getView();
            Ext.ux.grid.GridDropZone.superclass.constructor.call(this, this.view.scroller.dom, config);
            this.proxyEl = document.createElement('div');
            this.proxyEl.style.cssText = "background:url(http://images.cnblogs.com/cnblogs_com/dickhead/314392/o_arrow_right.png);" +
            "width:16px;height:16px;position:absolute;";
            Ext.fly(this.proxyEl).insertAfter(this.view.scroller).hide();
        },
        getTargetFromEvent: function (e) {
            return e.getTarget(this.view.rowSelector);
        },
        onNodeEnter: function (target, dd, e, data) {
            var rowIndex = this.view.findRowIndex(target);
            data.targetRowIndex = rowIndex;
            if (rowIndex !== false) {
                rowIndex < data.rowIndex && (rowIndex += 1);
                data.targetRowIndex = rowIndex;
                if (rowIndex !== data.rowIndex) {
                    Ext.fly(this.proxyEl).show().alignTo(target, 'br-bl', [16, 9]);
                    return;
                }
            }
            Ext.fly(this.proxyEl).hide();
        },
        onNodeOut: function () {
            Ext.fly(this.proxyEl).hide();
        },
        onNodeOver: function (target, dd, e, data) {
            if (data.targetRowIndex !== false && data.targetRowIndex !== data.rowIndex) {
                return Ext.dd.DropZone.prototype.dropAllowed;
            } else {
                return Ext.dd.DropZone.prototype.dropNotAllowed;
            }
        },
        onNodeDrop: function (target, dd, e, data) {
            if (data.targetRowIndex !== data.rowIndex) {
                var record = data.grid.store.getAt(data.rowIndex);
                data.grid.store.data.removeAt(data.rowIndex);
                data.grid.store.data.insert(data.targetRowIndex, record);
                this.view.refresh();
                return true;
            }
            return false;
        },
        destroy: function () {
            Ext.destroy(this.proxyEl);
            delete this.proxyEl;
            Ext.ux.grid.GridDropZone.destroy.apply(this, arguments);
        }
    });

Ext.reg('dragdropgrid', Ext.ux.grid.GridDropZone);	