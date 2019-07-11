Ext.ux.EditableGridPanel = function(config) {
	Ext.apply(this, config);
};
// plugin code
Ext.extend(Ext.ux.EditableGridPanel, Ext.util.Observable, {

			init : function(grid) {

				Ext.apply(grid, {

							onRender : grid.onRender.createSequence(function(ct, position) {

										var columns = this.colModel.config;

										for (i = 0; i < columns.length; i++) {

											if (columns[i].editor) {

												columns[i].editor.addListener('specialkey', this.gridEditorCtrlArrowKey, this);

											}

										}

									}), // end of function onRender

							gridEditorCtrlArrowKey : function(combo, el) {

								if (el.keyCode == el.RIGHT || el.keyCode == el.LEFT || el.keyCode == el.UP || el.keyCode == el.DOWN) {

									// Make sure Ctrl is pressed to avoid shifting of focus just on the Right or Left arrow key.

									if (!el.ctrlKey)

										return;

									// } else if (el.keyCode == el.TAB) {

									// if (el.shiftKey)

									// return;

								} else

									return;

								var grd = this;

								var row = grd.activeEditor.row;

								var col = grd.activeEditor.col;

								var totalCols = grd.colModel.config.length;

								var totalRows = grd.view.getRows().length;

								switch (el.keyCode) {

									case el.TAB :

									case el.RIGHT :

										var next = this.nextEditableCell(row, col);

										if (next.isNew)

											this.addEditableRow(grd, next.col);

										else

											grd.startEditing(next.row, next.col);

										break;

									case el.LEFT :

										var prev = this.previousEditableCell(row, col);

										if (prev.move)

											grd.startEditing(prev.row, prev.col);

										break;

									case el.UP :

										if (row != 0)

											grd.startEditing(row - 1, col);

										break;

									case el.DOWN :

										if (row != totalRows - 1)

											grd.startEditing(row + 1, col);

										break;

								}

								el.stopEvent();

							}, // end of function gridEditorCtrlArrowKey

							addEditableRow : function(grd, focusCol) {

								var rowIndex = grd.addRecord();

								grd.getView().focusRow(rowIndex);

								grd.startEditing(rowIndex, focusCol);

							},

							nextEditableCell : function(row, col) {

								var next = {};

								for (i = col + 1; i < this.colModel.config.length; i++) {

									if (!this.colModel.config[i].hidden) {

										next.col = i;

										break;

									}

								}

								if (next.col != undefined) {

									next.row = row;

									next.isNew = false;

								} else {

									for (i = 0; i < this.colModel.config.length; i++) {

										if (!this.colModel.config[i].hidden) {

											next.col = i;

											break;

										}

									}

									next.row = row + 1;

									next.isNew = true;

								}

								return (next);

							},

							previousEditableCell : function(row, col) {

								var prev = {};

								for (i = col - 1; i >= 0; i--) {

									if (!this.colModel.config[i].hidden) {

										prev.col = i;

										break;

									}

								}

								if (prev.col != undefined) {

									prev.row = row;

									prev.move = true;

								} else if (row > 0) {

									for (i = this.colModel.config.length - 1; i >= 0; i--) {

										if (!this.colModel.config[i].hidden) {

											prev.col = i;

											prev.row = row - 1;

											prev.move = true;

											break;

										}

									}

								} else {

									prev.row = row;

									prev.col = col;

									prev.move = false;

								}

								return (prev);

							}

						});

			} // end of function init

		}); // end of extend
