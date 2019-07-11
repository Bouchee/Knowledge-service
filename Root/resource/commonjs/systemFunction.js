// 格式化日期
function formatDate(value) {
	return value ? value.dateFormat('Y-n-j') : '';
}

//  
function combobox_Workpiece_Matertial() { // union
	// TODO
	// FIXME
}

function getFileUploadPath(obj){
	if (obj){
		if (window.navigator.userAgent.indexOf("MSIE") >= 1){
			obj.select();
			return document.selection.createRange().text;
		}else if(window.navigator.userAgent.indexOf("Chrome") >= 1){
			
		}else if (window.navigator.userAgent.indexOf("Firefox") >= 1){
			if (obj.files){
				return obj.files.item(0).getAsDataURL();
			}
			return obj.value;
		}
		return obj.value;
	}
}

function excelHelpWin() {
	var excelHelpWin = new Ext.Window({
		title : 'Excel导入说明',
		width : 970,
		// modal : true,
		height : 600,
		closable : true,
		autoScroll : true,
		maximizable : true,
		closeAction : 'hide',
		constrain : false,
		layout : 'fit',
		items : [new Ext.TabPanel({
			width : 500,
			activeTab : 0,
			frame : true,
			defaults : {
				autoHeight : true
			},
			items : [{
				html : '<font size=3>1.	系统目前<font color=red>支持Excel 2003（.xls）版本</font>，高版本（2007、2010、2013）请另存为.xls兼容格式；</br></br>'
						+ '2.	如果您要导入的Excel包含多个工作表，请将要导入的<font color=red>工作表移动到第一个</font>；</br></br>'
						+ '3.	要导入的表格中<font color=red>不含”序号”和”ID”</font>列；</br></br>'
						+ '4.	请保证要导入的Excel的<font color=red>表头信息在第一行</font></br></br>'
						+ '5.	系统默认<font color=red>从第二行开始导入</font>,若Excel中有标题行，请将其<font color=red>删除</font>后进行导入。</br></br>'
						+ '6.	部分信息导入系统后，默认为隐藏状态，您可以通过表头的<font color=red>下拉菜单进行选择</font>，以进行显示;</br></br>'
						+ '7.   在导入相应数据时要保证<font color=red>Excel的表头列要包含有系统表格的表头列</font>中,不能导入在系统表格的表头列中没有的列；</br></br>'
						+ '8.	注意在<font color=red>Code表中的数据的导入需要其值严格按照表中定义内容</font>；</br></br>'
						+ '9.	若有【性别】列，请确保值为<font color=red>“男”、“女”或者为空</font>；</br></br>'
						+ '10.	若有【学历】列，请确保值取自<font color=red>[博士, 硕士, 本科, 高中, 大专, 中专, 初中, 小学]或者为空</font>；</br></br>'
						+ '11.	请确保要导入的工作表<font color=red>至少提供一列</font>；</br></br>'
						+ '12.	请确保要导入的<font color=red>Excel工作表的表头列没有隐藏列,或者空列，或者在数据结束行前存在隐藏行。</font></br></br>'
						+ '　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　修订于2014年7月22日22时</font>',
				title : 'Excel2003导入说明'
			}, {
				html : '<p>test</p>',
				disabled : true,
				title : 'Excel2007、2010、2013导入说明'
			}]
		})]
	});
	excelHelpWin.show();
}

function getGridHeaderNameAndId(grid) {
	var headername = "";
	var headerid = "";

	var columnModel = grid.getColumnModel();
	var temp_obj = [];

	/*
	 * var it = store.data.items; var rows = it.length;
	 */
	for (var i = 0; i < columnModel.getColumnCount(); i++) {
		if (columnModel.getDataIndex(i) != "") {
			temp_obj.push(i);
		}
	}

	for (var j = 1; j <= temp_obj.length; j++) {
		/*
		 * r = it[j].data; var v = r[cm.getDataIndex(i)]; var fld =
		 * store.recordType.prototype.fields.get(cm.getDataIndex(i));
		 * if(fld.type == 'date') { v = v.format('Y-m-d'); }
		 */
		headername += (columnModel.getColumnHeader(temp_obj[j - 1]) + ",");
		headerid += (columnModel.getDataIndex(temp_obj[j - 1]) + ",");
	}

	headername = headername.slice(0, -1);
	headerid = headerid.slice(0, -1);
	return headername + '-dec-' + headerid;
}

// 检查新增行的可编辑单元格数据合法性
function validateEditGrid(grid, colName) {
	var store = grid.getStore();
	var m = store.modified.slice(0);
	var cm = grid.getColumnModel();
	for (var i = 0; i < m.length; i++) {
		var record = m[i];
		var rowIndex = store.indexOfId(record.id);
		var value = record.get(colName);
		if (Ext.isEmpty(value)) {
			// infoMsg('数据校验不合法');
			return false;
		}
		var colIndex = cm.findColumnIndex(colName);
		var editor = cm.getCellEditor(colIndex).field;
		if (!editor.validateValue(value)) {
			// infoMsg('数据校验不合法');
			return false;
		}
	}
	return true;
}

// 示请求等待进度条窗口
function showWaitMsg(msg) {
	Ext.MessageBox.show({
				title : '系统提示',
				msg : msg == null ? '正在处理数据,请稍候...' : msg,
				// progressText : 'processing now,please wait...',
				width : 300,
				wait : true,
				waitConfig : {
					interval : 150
				}
			});
}

// Extjs消息提示框
MsgTip = function() {
	var msgCt;
	function createBox(t, s) {
		return ['<div class="msg">', '<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
				'<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc" style="font-size=12px;"><h3>', t, '</h3>', s, '</div></div></div>',
				'<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>', '</div>'].join('');
	}
	return {
		msg : function(title, message, autoHide, pauseTime) {
			if (!msgCt) {
				msgCt = Ext.DomHelper.insertFirst(document.body, {// Ext.getBody(),
																	// document.body,
																	// Ext.getHead()
					id		: 'msg-div22',
					style	: 'position:absolute;top:10px;right:-450px;width:300px;margin:0 auto;z-index:20000;'
				}, true);
			}
			msgCt.alignTo(document, 't-t');
			// 给消息框右下角增加一个关闭按钮
			message += '<br><span style="text-align:right;font-size:12px;width:100%;">' + '<font color="blank"><u style="cursor:hand;" onclick="MsgTip.hide(this);">关闭</u></font></span>';
			var m = Ext.DomHelper.append(msgCt, {
						html : createBox(title, message)
					}, true);
			m.slideIn('t');
			if (!Ext.isEmpty(autoHide) && autoHide == true) {
				if (Ext.isEmpty(pauseTime)) {
					pauseTime = 3;
				}
				m.pause(pauseTime).ghost("tr", {
							remove : true
						});
			}
		},
		hide : function(v) {
			var msg = Ext.get(v.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement);
			msg.ghost("tr", {
						remove : true
					});
		}
	};
}();

// 信息提示
function infoMsg(msg) {
	hideWaitMsg();
	MsgTip.msg('系统提示:', msg, true, 3);
}

// 规定时间内关闭
function infoMsgTime(msg, ti) {
	hideWaitMsg();
	MsgTip.msg('系统提示:', msg, true, ti);
}

function infoMsgClick(msg, multiline) {
	Ext.MessageBox.show({
				title : '系统提示',
				msg : msg == null ? '系统出现提示信息,请注意...' : msg.replaceAll('\r\n', '</br>'),
				// progressText : 'processing now,please wait...',
				width : 400,
				// fn : MsgTip.msg('系统提示', msg, true, 3),
				multiline : multiline == null ? false : true,
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.INFO
			});
}

// 警告信息提示
function warningMsg(msg) {
	hideWaitMsg();
	MsgTip.msg('系统警告:', msg, true, 3);
}

// 错误信息提示
function errorMsg(msg) {
	Ext.MessageBox.show({
				title : '系统错误:',
				msg : msg == null ? '系统出错,请点击更多信息并提交给开发人员...' : msg,
				// progressText : 'processing now,please wait...',
				width : 400,
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.ERROR
			});
}

// 隐藏请求等待进度条窗口
function hideWaitMsg() {
	Ext.MessageBox.hide();
}

// 检查上传文件是否是图片;
function checkUploadImage(str) {
	if (str == null){
		str = 'figureid';
	}
	var theFile = Ext.getCmp(str).getValue();
	if (theFile != "") {
		var ex = theFile.slice(-4);
		if (ex != '.jpg' && ex != '.bmp' && ex != '.png' && ex != '.gif') {
			errorMsg('您选择的文件格式不对,只能添加*.jpg;*.bmp;*.png;*.gif文件!');
			return false;
		}
	}
	return true;
}

// 获取路径
function getHostPath() {
	var hostPath = 'C:\\jetty-7.6\\work\\etmp';
	return hostPath;
}

// 清空upload文本框
function clearUploadField(id) {
	var fileField = document.getElementById(id);
	if(fileField!=null){
	var parentNod = fileField.parentNode;
	var tmpForm = document.createElement("form");
	parentNod.replaceChild(tmpForm, fileField);
	tmpForm.appendChild(fileField);
	tmpForm.reset();
	parentNod.replaceChild(fileField, tmpForm);
	}	
}

// 在左下角显示图片
function imageshow3(path, ai, flag) {
	if (path != null && path != "") {
		var imageshowWin = new Ext.Window({
					width : 300,
					modal : true,
					height : 250,
					modal : false,
					closeAction : 'close',
					autoScroll : true,
					layout : 'vbox',
					x : document.body.clientWidth - 300,
					// y : document.body.clientHeight - 250,
					items : [{
								xtype : 'panel',
								title : '简图',
								autoScroll : true,
								width : '100%',
								html : '<img src="' + webContext + path + '"/>'
							}],
					listeners : {
						beforeclose : function() {
							ai.setPagePosition((document.body.clientWidth - ai.width) / 2, (document.body.scrollHeight - ai.height) / 2 + flag);
						},
						beforeshow : function() {
							imageshowWin.setPagePosition((document.body.clientWidth + ai.width - imageshowWin.width) / 2, (document.body.scrollHeight - ai.height) / 2 + flag);
						}
					}
				});
		ai.setPagePosition((document.body.clientWidth - ai.width - imageshowWin.width) / 2, (document.body.scrollHeight - ai.height) / 2 + flag);
		return imageshowWin;
	} else {
		ai.setPagePosition((document.body.clientWidth - ai.widthh) / 2, (document.body.scrollHeight - ai.height) / 2 + flag);
		return null;
	}
}

// 在左下角显示图片
function imageshow(path) {
	if (path != null && path != "") {
		var imageshowWin = new Ext.Window({
					width : 300,
					modal : true,
					height : 250,
					modal : false,
					closeAction : 'close',
					autoScroll : true,
					layout : 'vbox',
					x : document.body.clientWidth - 300,
					// y : document.body.clientHeight - 250,
					items : [{
								xtype : 'panel',
								title : '简图',
								autoScroll : true,
								width : '100%',
								flex : 1,
								html : '<img src="' + webContext + path + '"/>'
							}]
				});
		// ai.setPagePosition((document.body.clientWidth - ai.width -
		// imageshowWin.width) / 2, (document.body.scrollHeight - ai.height) / 2
		// + 80);
		return imageshowWin;
	} else {
		// ai.setPagePosition((document.body.clientWidth - ai.width -
		// imageshowWin.width) / 2, (document.body.scrollHeight - ai.height) / 2
		// + 80);
		return null;
	}
}

// 在右侧显示两张图片
function imageshow2(path, path2, ai, flag) {
	if ((path != null && path != "") && (path2 != null && path2 != "")) {
		var imageshowWin = new Ext.Window({
					width : 300,
					height : 500,
					closable : false,
					modal : false,
					closeAction : 'close',
					autoScroll : false,
					layout : 'vbox',
					x : document.body.clientWidth - 300,
					// y : document.body.clientHeight - 250,
					items : [{
								xtype : 'panel',
								title : '简图',
								autoScroll : true,
								id : 'imageshow-panel-1',
								width : '100%',
								flex : 1,
								html : '<img src="' + webContext + path + '"/>'
							}, {
								xtype : 'panel',
								title : '尺寸图',
								width : '100%',
								autoScroll : true,
								id : 'imageshow-panel-2',
								flex : 1,
								html : '<img src="' + webContext + path2 + '"/>'
							}],
					listeners : {
						beforeclose : function() {
							ai.setPagePosition((document.body.clientWidth - ai.width) / 2, (document.body.scrollHeight - ai.height) / 2 + flag);
						},
						beforeshow : function() {
							imageshowWin.setPagePosition((document.body.clientWidth + ai.width - imageshowWin.width) / 2, (document.body.scrollHeight - ai.height) / 2 + flag);
						},
						resize : function() {
							// Ext.getCmp('imageshow-panel-1'),
						}
					}
				});
		ai.setPagePosition((document.body.clientWidth - ai.width - imageshowWin.width) / 2, (document.body.scrollHeight - ai.height) / 2 + flag);
		return imageshowWin;
	} else if ((path != null && path != "") || (path2 != null && path2 != "")) {
		var imageshowWin = new Ext.Window({
					width : 300,
					modal : true,
					height : 250,
					modal : false,
					closeAction : 'close',
					autoScroll : true,
					layout : 'vbox',
					x : document.body.clientWidth - 300,
					// y : document.body.clientHeight - 250,
					items : [{
								xtype : 'panel',
								title : path ? '简图' : '尺寸图',
								autoScroll : true,
								width : '100%',
								flex : 1,
								html : '<img src="' + webContext + (path ? path : path2) + '"/>'
							}],
					listeners : {
						beforeclose : function() {
							ai.setPagePosition((document.body.clientWidth - ai.width) / 2, (document.body.scrollHeight - ai.height) / 2 + flag);
						},
						beforeshow : function() {
							imageshowWin.setPagePosition((document.body.clientWidth + ai.width - imageshowWin.width) / 2, (document.body.scrollHeight - ai.height) / 2 + flag);
						}
					}
				});
		ai.setPagePosition((document.body.clientWidth - ai.width - imageshowWin.width) / 2, (document.body.scrollHeight - ai.height) / 2 + flag);
		return imageshowWin;
	} else {
		ai.setPagePosition((document.body.clientWidth - ai.width) / 2, (document.body.scrollHeight - ai.height) / 2 + flag);
		return null;
	}
}

// 检查图片路径
function checkImagePath(path) {
	if (path == null || path == '') {
		// path = webContext + '\\resource\\image\\ext\\null.gif';
		path = '\\dec\\resource\\image\\ext\\null.gif';
	} else {
		path = webContext + path;
	}
	return path;
}

// 显示帮助窗口
function helpWin(html, title) {
	if (Ext.isEmpty(title)) {
		title = '系统实时帮助';
	}
	var hw = new Ext.Window({
		title : title,
		id : 'helpid',
		width : 200,
		modal : false,
		height : 120,
		closeAction : 'close',
		constrain : false,
		layout : 'fit',
		maximizable : true,
		html : html,
		// plugins: new Ext.ux.WindowAlwaysOnTop,
		listeners : {
			deactivate : function(p) {
				p.manager.bringToFront(p);
				// http://www.sencha.com/forum/archive/index.php/t-47579.html
				/*
				 * if ((new Date().getTime() - p._lastAccess) / 1000 < 5){
				 * return false; }else{ return true; }
				 */
			},
			delay : 5
		}
			/*
			 * items : [new Ext.Panel({ autoScroll : true, autoHeight : true,
			 * region : 'center', items : [{ xtype : 'box', autoEl : { tag :
			 * 'iframe', style : 'height: 100%; width: 100%', src : webContext +
			 * '/test.htm' } }] })]
			 */
		});
	hw.show();
	return hw;
}

// 将JS数组转换为JS字符串 表格复选框专用
function jsArray2JsString(arrayChecked, id) {
	var strChecked = "";
	for (var i = 0; i < arrayChecked.length; i++) {
		strChecked = strChecked + arrayChecked[i].get(id) + ',';
	}
	return strChecked.substring(0, strChecked.length - 1);
}

// 将JS数组转换为JS字符串 表格复选框专用
function jsArray2JsString2(arrayChecked, id, id2) {
	var strChecked = "";
	for (var i = 0; i < arrayChecked.length; i++) {
		strChecked = strChecked + arrayChecked[i].get(id) + ',' + arrayChecked[i].get(id2) + ',';
	}
	return strChecked.substring(0, strChecked.length - 1);
}

// 模拟按键F11
function sendKeyF11() {
	try {
		// var WshShell = new ActiveXObject('WScript.Shell');
		// WshShell.SendKeys('{F11}');
	} catch (e) {
		return false;
	}
}

// 清除Ext.Form表单元素
function clearForm(pForm) {
	var formItems = pForm.items['items'];
	var element;
	for (var i = 0; i < formItems.length; i++) {
		element = formItems[i];
		element.setValue('');
		element.reset(); // 避免出现红色波浪线
	};
}

// 复制到剪贴板
function copyToClipboard(txt) {
	if (txt != null && txt != '') {
		var txt = txt.toString();
		if (window.clipboardData) {
			window.clipboardData.clearData();
			window.clipboardData.setData("Text", txt);
		} else if (navigator.userAgent.indexOf("Opera") != -1) {
			window.location = txt;
		} else if (window.netscape) {
			try {
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			} catch (e) {
				infoMsgClick("复制单元格操作被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'");
			}
			var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
			if (!clip)
				return;
			var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
			if (!trans)
				return;
			trans.addDataFlavor('text/unicode');
			var str = new Object();
			var len = new Object();
			var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
			var copytext = txt;
			str.data = copytext;
			trans.setTransferData("text/unicode", str, copytext.length * 2);
			var clipid = Components.interfaces.nsIClipboard;
			if (!clip)
				return false;
			clip.setData(trans, null, clipid.kGlobalClipboard);
		}/*
			 * else{ var clip = new ZeroClipboard.Client();
			 * //clip.setHandCursor( true ); clip.setText(txt); }
			 */
		if (Ext.isChrome == true) {
			infoMsgTime('很抱歉，Chrome不支持直接复制！', 2);
		} else {
			infoMsgTime('复制成功! "' + txt + '"', 2);
		}
	} else {
		infoMsgTime('单元格内容为空! ', 2);
	}
}

// 屏蔽浏览器的F5键刷新
function DisableF5() {
	with (event) {
		if (keyCode == 116 || (ctrlKey && keyCode == 82)) {
			event.keyCode = 0;
			event.cancelBubble = true;
			return false;
		}
	}
}

// 键盘事件
function foc(form, name) {
	form.getForm().findField(name).focus(true, 300);
}

// 初始化报表打印窗口
function doPrint(pFlag, pWidth, pHeight) {
	var initUrl = '/report.do?code=initAppletPage';
	if (!Ext.isEmpty(pFlag))
		initUrl = initUrl + '&flag=' + pFlag;
	if (Ext.isEmpty(pWidth))
		pWidth = 800;
	if (Ext.isEmpty(pHeight))
		pHeight = 600;
	var left = (screen.width - pWidth) / 2;
	var top = (screen.height - pHeight) / 2;
	var str = 'width=' + pWidth + ',height=' + pHeight + ',top=' + top + ",left=" + left + ',toolbar=no,menubar=no,scrollbars=no,resizable=yes,location=no,status=no';
	window.open(webContext + initUrl, '', str);
}

// 初始化报表打印窗口，窗口关闭后执行回调函数
function doPrintWithCallback(pFlag, pWidth, pHeight) {
	var initUrl = '/report.do?code=initAppletPage';
	if (!Ext.isEmpty(pFlag))
		initUrl = initUrl + '&flag=' + pFlag;
	if (Ext.isEmpty(pWidth))
		pWidth = 800;
	if (Ext.isEmpty(pHeight))
		pHeight = 600;
	var timer, popwin;
	var left = (screen.width - pWidth) / 2;
	var top = (screen.height - pHeight) / 2;
	var str = 'width=' + pWidth + ',height=' + pHeight + ',top=' + top + ",left=" + left + ',toolbar=no,menubar=no,scrollbars=no,resizable=yes,location=no,status=no';
	popwin = window.open(webContext + initUrl, '', str);
	timer = window.setInterval(function() {
				if (popwin.closed == true) {
					window.clearInterval(timer);
					Ext.MessageBox.confirm('请确认', '打印是否成功?', function(btn, text) {
								if (btn == 'yes') {
									// 在这个回调函数中实现打印次数纪录功能,此函数不能写在Ext作用域内
									fnPrintCallback();
								} else {
									return;
								}
							});
				}
			}, 500);
}

// 初始化PDF导出窗口
function doExport(pFlag, pWidth, pHeight) {
	var initUrl = '/report.do?code=initPdfPage';
	if (!Ext.isEmpty(pFlag))
		initUrl = initUrl + '&flag=' + pFlag;
	if (Ext.isEmpty(pWidth))
		pWidth = 800;
	if (Ext.isEmpty(pHeight))
		pHeight = 600;
	var left = (screen.width - pWidth) / 2;
	var top = (screen.height - pHeight) / 2;
	var str = 'width=' + pWidth + ',height=' + pHeight + ',top=' + top + ",left=" + left + ',toolbar=no,menubar=no,scrollbars=no,resizable=yes,location=no,status=no';
	window.open(webContext + initUrl, '', str);
}

// 初始化报PDF导出窗口，窗口关闭后执行回调函数
function doExportWithCallback(pFlag, pWidth, pHeight) {
	var initUrl = '/report.do?code=initPdfPage';
	if (!Ext.isEmpty(pFlag))
		initUrl = initUrl + '&flag=' + pFlag;
	if (Ext.isEmpty(pWidth))
		pWidth = 800;
	if (Ext.isEmpty(pHeight))
		pHeight = 600;
	var timer, popwin;
	var left = (screen.width - pWidth) / 2;
	var top = (screen.height - pHeight) / 2;
	var str = 'width=' + pWidth + ',height=' + pHeight + ',top=' + top + ",left=" + left + ',toolbar=no,menubar=no,scrollbars=no,resizable=yes,location=no,status=no';
	popwin = window.open(webContext + initUrl, '', str);
	timer = window.setInterval(function() {
				if (popwin.closed == true) {
					window.clearInterval(timer);
					Ext.MessageBox.confirm('请确认', '打印/导出是否成功?', function(btn, text) {
								if (btn == 'yes') {
									// 在这个回调函数中实现打印次数纪录功能,此函数不能写在Ext作用域内
									fnExportCallback();
								} else {
									return;
								}
							});
				}
			}, 500);
}

// 通过iFrame实现类ajax文件下载
function exportExcel(url) {
	var exportIframe = document.createElement('iframe');
	exportIframe.src = url;
	exportIframe.style.display = "none";
	document.body.appendChild(exportIframe);
	hideWaitMsg();
}

// 这个可以验证15位和18位的身份证，并且包含生日和校验位的验证。
function isIdCardNo(num) {
	if (Ext.isEmpty(num))
		return false;
	num = num.toUpperCase();
	// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
	if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
		warningMsg('输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。');
		return false;
	}
	// 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
	// 下面分别分析出生日期和校验位
	var len, re;
	len = num.length;
	if (len == 15) {
		re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
		var arrSplit = num.match(re);
		// 检查生日日期是否正确
		var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
		var bGoodDay;
		bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
		if (!bGoodDay) {
			warningMsg('输入的身份证号里出生日期不对！');
			return false;
		} else {
			// 将15位身份证转成18位
			// 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
			var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
			var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
			var nTemp = 0, i;
			num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
			for (i = 0; i < 17; i++) {
				nTemp += num.substr(i, 1) * arrInt[i];
			}
			num += arrCh[nTemp % 11];
			return num;
		}
	} else if (len == 18) {
		re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
		var arrSplit = num.match(re);
		// 检查生日日期是否正确
		var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
		var bGoodDay;
		bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
		if (!bGoodDay) {
			// alert(dtmBirth.getYear());
			// alert(arrSplit[2]);
			warningMsg('输入的身份证号里出生日期不对！');
			return false;
		} else {
			// 检验18位身份证的校验码是否正确。
			// 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
			var valnum;
			var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
			var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
			var nTemp = 0, i;
			for (i = 0; i < 17; i++) {
				nTemp += num.substr(i, 1) * arrInt[i];
			}
			valnum = arrCh[nTemp % 11];
			if (valnum != num.substr(17, 1)) {
				warningMsg('18位身份证的校验码不正确！应该为:' + valnum);
				return false;
			}
			return num;
		}
	}
	return false;
}

// 通过身份证号的得到出生日期
function getBirthdayByIdCardNo(idNo) {
	var idNo = idNo.toUpperCase();
	var tmpStr = "";
	// warningMsg(idNo);
	if ((idNo.length != 15) && (idNo.length != 18)) {
		warningMsg('您输入的身份证号码位数错误,请重新输入!');
	}
	if (idNo.length == 15) {
		tmpStr = idNo.substring(6, 12);
		tmpStr = "19" + tmpStr;
		tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6);
		return tmpStr;
	} else { // if(idNo.length==18)
		tmpStr = idNo.substring(6, 14);
		tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6);
		return tmpStr;
	}
}

// 通过身份证号得到性别
function getSexByIdCardNo(id) {
	var id = String(id);
	return id.slice(14, 17) % 2 ? 1 : 2;// "男" : "女"
}

// 身份证号返回年龄
function getAgeByIdCardNo(idCard) {
	var birYear = null;
	var birMonth = null;
	var birDay = null;
	var day = new Date();
	// 获取当前的日期
	var Year = day.getYear();
	var Month = day.getMonth() + 1;
	var Day = day.getDate();
	if (idCard.length == 18) {
		birYear = idCard.substr(6, 4);
		birMonth = idCard.substr(10, 2);
		birDay = idCard.substr(12, 2);
	}
	if (idCard.length == 15) {
		birYear = "19" + idCard.substr(6, 2);
		birMonth = idCard.substr(8, 2);
		birDay = idCard.substr(10, 2);
	}

	var age = Year - birYear;

	if (Month >= 10) {
		Month = Month;
	} else {
		Month = "0" + Month;
	}

	if (Day >= 10) {
		Day = Day;
	} else {
		Day = "0" + Day;
	}
	// 当前月、日大于出生月、日，年龄加1
	var m = Month - birMonth;
	var d = Day - birDay;
	if (m > 0) {
		age = age + 1;
	} else if (m == 0) {
		if (d >= 0) {
			age = age + 1;
		}
	}
	return age;
}

// 设置Cookie
function setCookie(name, value, minuts) {
	var argv = setCookie.arguments;
	var argc = setCookie.arguments.length;
	var expiration = new Date((new Date()).getTime() + minuts * 60000 * 60);
	document.cookie = name + "=" + escape(value) + "; expires=" + expiration.toGMTString();
}

// 获取Cookie
function getCookie(Name) {
	var search = Name + "=";
	if (document.cookie.length > 0) {
		var offset = document.cookie.indexOf(search);
		if (offset != -1) {
			offset += search.length;
			var end = document.cookie.indexOf(";", offset);
			if (end == -1)
				end = document.cookie.length;
			return unescape(document.cookie.substring(offset, end));
		} else
			return "";
	}
}

// 从缓存中清除Cookie
function clearCookie(name) {
	var expdate = new Date();
	expdate.setTime(expdate.getTime() - (86400 * 1000 * 1));
	setCookie(name, "", expdate);
}

// 截取字符串前面固定的长度，多余的用...代替
function getSubstr(str, len) {// length属性读出来的汉字长度为1
	if (str.length * 2 <= len) {
		return str;
	}
	var strlen = 0;
	var s = "";
	for (var i = 0; i < str.length; i++) {
		if (str.charCodeAt(i) > 128) {
			strlen = strlen + 2;
			if (strlen > len) {
				return s.substring(0, s.length - 1) + "...";
			}
		} else {
			strlen = strlen + 1;
			if (strlen > len) {
				return s.substring(0, s.length - 2) + "...";
			}
		}
		s = s + str.charAt(i);
	}
	return s;
}

// 乘法
function multiply(arg1, arg2) {
	var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
	try {
		m += s1.split(".")[1].length;
	} catch (e) {
	}
	try {
		m += s2.split(".")[1].length;
	} catch (e) {
	}
	return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

// 除法
function divide(arg1, arg2) {
	var t1 = 0, t2 = 0, r1, r2;
	try {
		t1 = arg1.toString().split(".")[1].length;
	} catch (e) {
	}
	try {
		t2 = arg2.toString().split(".")[1].length;
	} catch (e) {
	}
	with (Math) {
		r1 = Number(arg1.toString().replace(".", ""));
		r2 = Number(arg2.toString().replace(".", ""));
		return (r1 / r2) * pow(10, t2 - t1);
	}
}

// 减法
function subtract(arg1, arg2) {
	var r1, r2, m, n;
	try {
		r1 = arg1.toString().split(".")[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split(".")[1].length;
	} catch (e) {
		r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2));
	n = (r1 >= r2) ? r1 : r2;// 动态控制精度长度
	return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

// 加法
function plus(arg1, arg2) {
	var r1, r2, m;
	try {
		r1 = arg1.toString().split(".")[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split(".")[1].length;
	} catch (e) {
		r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2));
	return (arg1 * m + arg2 * m) / m;
}

// 去掉字符串头尾空格
function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

// 计算字符串长度
function strLength(str) {
	var len = 0;
	for (var i = 0; i < str.length; i++) {
		if (str.charCodeAt(i) > 256) {
			len += 2;
		} else {
			len++;
		}
	}
	return len;
}

// 验证手机号
function isPhoneNo(mobileNum, showMsg) {
	var ReDetection = false;
	var mobileNumber = this.trim(mobileNum);
	ReDetection = !(mobileNumber == "" || mobileNumber == null || mobileNumber.length == 0);
	if (!ReDetection) {
		if (showMsg == null || showMsg == "")
			warningMsg("手机号为空，请输入您的手机号！");
		return false; // 基础验证
	}
	// ReDetection = (/^0(([1-9]d)|([3-9]d{2}))d{8}$/.test(m));if(ReDetection)
	// return true; // 电话/小灵通验证
	var regu = /(^[1][3][0-9]{9}$)|(^[1][5][0-9]{9}$)|(^[1][8][0-9]{9}$)|(^[0][1-9]{1}[0-9]{9}$)/;
	var reg = new RegExp(regu);
	ReDetection = reg.test(mobileNumber); // 手机验证 13x 15x 18x 以此类推
	if (!ReDetection) {
		if (showMsg == null || showMsg == "")
			warningMsg("手机号不合法，请重新输入手机号！");
		return false;
	}
	return true;
}

// 验证电子邮箱的格式
function isEmail(email, showMsg) {
	var strEmail = this.trim(email);
	if (strEmail.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1) {
		return true;
	} else {
		if (showMsg == null || showMsg == "")
			warningMsg("Email格式不正确！");
		return false;
	}
}

// 汉字验证，只能输入汉字！
function isChinese(strChinese, showMsg) {
	var reg = /^[\u4e00-\u9fa5]+$/i;
	var str = this.trim(strChinese);
	if (!reg.test(str)) {
		if (showMsg == null || showMsg == "")
			warningMsg("请输入汉字!");
		return false;
	}
	return true;
}

// 获取当前格式化后的时间 2013-03-07
function getCurrentDate() {
	var day = new Date();
	var CurrentDate = "";
	var Year = day.getFullYear();
	var Month = day.getMonth() + 1;
	var Day = day.getDate();

	CurrentDate += Year + "-";

	if (Month >= 10) {
		CurrentDate += Month + "-";
	} else {
		CurrentDate += "0" + Month + "-";
	}
	if (Day >= 10) {
		CurrentDate += Day;
	} else {
		CurrentDate += "0" + Day;
	}
	return CurrentDate;
}

// 判断密码是否是字母,数字组成,并且是6-20位
function isPassword(str) {
	var filter = /^([0-9a-zA-Z]){6,20}$/;
	if (!filter.exec(str)) {
		warningMsg("密码只能由数字、字母组成，长度为6-20位！");
		return false;
	}
	return true;
}

// 判断用户名是否是字母,数字 . _等组成并且6-20位
function isUsername(str) {
	var filter = /^\s*[-.A-Za-z0-9_]{6,20}\s*$/;
	// var filter= /^[a-zA-Z]+\s*[.A-Za-z0-9_-]{5,20}\s*$/;
	if (!filter.test(str)) {
		warningMsg('用户名只能由数字、字母和"_-."组成，长度为6-20位！');
		return false;
	}
	return true;
}

// 生成校验码
function createCode() {
	var code = "";
	var codeLength = 4;// 验证码的长度

	var selectChar = new Array(2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');

	for (var i = 0; i < codeLength; i++) {
		var charIndex = Math.floor(Math.random() * 32);
		code += selectChar[charIndex];
	}
	if (code.length != codeLength) {
		createCode();
	}
	return code;
}

// 验证是否为数字
function isNumber(str, showMsg) {
	var reg = /^[0-9]*[1-9][0-9]*$/;
	if (reg.test(str) == false) {
		if (showMsg == null || showMsg == "")
			warningMsg('请输入一个大于0的整数！');
		return false;
	}
	return true;
}

// 验证键盘输入的是否是数字
function isNumberFromKeyboard() {
	var key = window.event ? event.keyCode : event.which;
	var keychar = String.fromCharCode(key);
	var reg = /\d/;
	if (!reg.test(keychar))
		return false;
	return true;
}

// 验证剪贴板里的是不是数字
function isNumberFromClipboard() {
	var str = window.clipboardData.getData("Text");
	var reg = /^[0-9]*[1-9][0-9]*$/;
	if (reg.test(str) == false) {
		return false;
	}
	return true;
}

// 执行JavaScripts
function evalScript(s) {
	if (s.indexOf('<script') == -1)
		return s;
	var p = /<script[^\>]*?>([^\x00]*?)<\/script>/ig;
	var arr = [];
	while (arr = p.exec(s)) {
		var p1 = /<script[^\>]*?src=\"([^\>]*?)\"[^\>]*?(reload=\"1\")?(?:charset=\"([\w\-]+?)\")?><\/script>/i;
		var arr1 = [];
		arr1 = p1.exec(arr[0]);
		if (arr1) {
			appendscript(arr1[1], '', arr1[2], arr1[3]);
		} else {
			p1 = /<script(.*?)>([^\x00]+?)<\/script>/i;
			arr1 = p1.exec(arr[0]);
			appendscript('', arr1[2], arr1[1].indexOf('reload=') != -1);
		}
	}
	return s;
}

// 除去JavaScript代码
function stripscript(s) {
	return s.replace(/<script.*?>.*?<\/script>/ig, '');
}

// 字符串批量替换
String.prototype.replaceAll = function(oldStr, newStr) {
	return this.replace(new RegExp(oldStr, "gm"), newStr);
};

// Propertygrid排序
Ext.grid.PropertyGrid.prototype.setSource = function(source) {
 delete this.propStore.store.sortInfo;
 this.propStore.setSource(source);
};

// 显示提示框
function showDialog(msg, mode, t, func, cover, funccancel, leftmsg, confirmtxt, canceltxt, closetime, locationtime) {
	var showDialogST = null;
	clearTimeout(showDialogST);
	cover = isUndefined(cover) ? (mode == 'info' ? 0 : 1) : cover;
	leftmsg = isUndefined(leftmsg) ? '' : leftmsg;
	mode = in_array(mode, ['confirm', 'notice', 'info', 'right']) ? mode : 'alert';
	var menuid = 'fwin_dialog';
	var menuObj = $(menuid);
	var confirmtxtdefault = '确定';
	closetime = isUndefined(closetime) ? '' : closetime;
	closefunc = function() {
		if (typeof func == 'function')
			func();
		else
			eval(func);
		hideMenu(menuid, 'dialog');
	};
	if (closetime) {
		leftmsg = closetime + ' 秒后窗口关闭';
		showDialogST = setTimeout(closefunc, closetime * 1000);
	}
	locationtime = isUndefined(locationtime) ? '' : locationtime;
	if (locationtime) {
		leftmsg = locationtime + ' 秒后页面跳转';
		showDialogST = setTimeout(closefunc, locationtime * 1000);
		confirmtxtdefault = '立即跳转';
	}
	confirmtxt = confirmtxt ? confirmtxt : confirmtxtdefault;
	canceltxt = canceltxt ? canceltxt : '取消';

	if (menuObj)
		hideMenu('fwin_dialog', 'dialog');
	menuObj = document.createElement('div');
	menuObj.style.display = 'none';
	menuObj.className = 'fwinmask';
	menuObj.id = menuid;
	$('append_parent').appendChild(menuObj);
	var hidedom = '';
	if (!BROWSER.ie) {
		hidedom = '<style type="text/css">object{visibility:hidden;}</style>';
	}
	var s = hidedom
			+ '<table cellpadding="0" cellspacing="0" class="fwin"><tr><td class="t_l"></td><td class="t_c"></td><td class="t_r"></td></tr><tr><td class="m_l">&nbsp;&nbsp;</td><td class="m_c"><h3 class="flb"><em>';
	s += t ? t : '提示信息';
	s += '</em><span><a href="javascript:;" id="fwin_dialog_close" class="flbc" onclick="hideMenu(\'' + menuid + '\', \'dialog\')" title="关闭">关闭</a></span></h3>';
	if (mode == 'info') {
		s += msg ? msg : '';
	} else {
		s += '<div class="c altw"><div class="' + (mode == 'alert' ? 'alert_error' : (mode == 'right' ? 'alert_right' : 'alert_info')) + '"><p>' + msg + '</p></div></div>';
		s += '<p class="o pns">' + (leftmsg ? '<span class="z xg1">' + leftmsg + '</span>' : '') + '<button id="fwin_dialog_submit" value="true" class="pn pnc"><strong>' + confirmtxt
				+ '</strong></button>';
		s += mode == 'confirm' ? '<button id="fwin_dialog_cancel" value="true" class="pn" onclick="hideMenu(\'' + menuid + '\', \'dialog\')"><strong>' + canceltxt + '</strong></button>' : '';
		s += '</p>';
	}
	s += '</td><td class="m_r"></td></tr><tr><td class="b_l"></td><td class="b_c"></td><td class="b_r"></td></tr></table>';
	menuObj.innerHTML = s;
	if ($('fwin_dialog_submit'))
		$('fwin_dialog_submit').onclick = function() {
			if (typeof func == 'function')
				func();
			else
				eval(func);
			hideMenu(menuid, 'dialog');
		};
	if ($('fwin_dialog_cancel')) {
		$('fwin_dialog_cancel').onclick = function() {
			if (typeof funccancel == 'function')
				funccancel();
			else
				eval(funccancel);
			hideMenu(menuid, 'dialog');
		};
		$('fwin_dialog_close').onclick = $('fwin_dialog_cancel').onclick;
	}
	showMenu({
				'mtype' : 'dialog',
				'menuid' : menuid,
				'duration' : 3,
				'pos' : '00',
				'zindex' : JSMENU['zIndex']['dialog'],
				'cache' : 0,
				'cover' : cover
			});
	try {
		if ($('fwin_dialog_submit'))
			$('fwin_dialog_submit').focus();
	} catch (e) {
	}
}

// 显示窗口
function showWindow(k, url, mode, cache, menuv) {
	mode = isUndefined(mode) ? 'get' : mode;
	cache = isUndefined(cache) ? 1 : cache;
	var menuid = 'fwin_' + k;
	var menuObj = $(menuid);
	var drag = null;
	var loadingst = null;
	var hidedom = '';

	if (disallowfloat && disallowfloat.indexOf(k) != -1) {
		if (BROWSER.ie)
			url += (url.indexOf('?') != -1 ? '&' : '?') + 'referer=' + escape(location.href);
		location.href = url;
		doane();
		return;
	}

	var fetchContent = function() {
		if (mode == 'get') {
			menuObj.url = url;
			url += (url.search(/\?/) > 0 ? '&' : '?') + 'infloat=yes&handlekey=' + k;
			url += cache == -1 ? '&t=' + (+new Date()) : '';
			ajaxget(url, 'fwin_content_' + k, null, '', '', function() {
						initMenu();
						show();
					});
		} else if (mode == 'post') {
			menuObj.act = $(url).action;
			ajaxpost(url, 'fwin_content_' + k, '', '', '', function() {
						initMenu();
						show();
					});
		}
		if (parseInt(BROWSER.ie) != 6) {
			loadingst = setTimeout(function() {
						showDialog('', 'info', '<img src="' + IMGDIR + '/loading.gif"> 请稍候...');
					}, 500);
		}
	};
	var initMenu = function() {
		clearTimeout(loadingst);
		var objs = menuObj.getElementsByTagName('*');
		var fctrlidinit = false;
		for (var i = 0; i < objs.length; i++) {
			if (objs[i].id) {
				objs[i].setAttribute('fwin', k);
			}
			if (objs[i].className == 'flb' && !fctrlidinit) {
				if (!objs[i].id)
					objs[i].id = 'fctrl_' + k;
				drag = objs[i].id;
				fctrlidinit = true;
			}
		}
	};
	var show = function() {
		hideMenu('fwin_dialog', 'dialog');
		var v = {
			'mtype' : 'win',
			'menuid' : menuid,
			'duration' : 3,
			'pos' : '00',
			'zindex' : JSMENU['zIndex']['win'],
			'drag' : typeof drag == null ? '' : drag,
			'cache' : cache
		};
		for (k in menuv) {
			v[k] = menuv[k];
		}
		showMenu(v);
	};

	if (!menuObj) {
		menuObj = document.createElement('div');
		menuObj.id = menuid;
		menuObj.className = 'fwinmask';
		menuObj.style.display = 'none';
		$('append_parent').appendChild(menuObj);
		var evt = ' style="cursor:move" onmousedown="dragMenu($(\'' + menuid + '\'), event, 1)" ondblclick="hideWindow(\'' + k + '\')"';
		if (!BROWSER.ie) {
			hidedom = '<style type="text/css">object{visibility:hidden;}</style>';
		}
		menuObj.innerHTML = hidedom + '<table cellpadding="0" cellspacing="0" class="fwin"><tr><td class="t_l"></td><td class="t_c"' + evt + '></td><td class="t_r"></td></tr><tr><td class="m_l"'
				+ evt + ')">&nbsp;&nbsp;</td><td class="m_c" id="fwin_content_' + k + '">' + '</td><td class="m_r"' + evt + '"></td></tr><tr><td class="b_l"></td><td class="b_c"' + evt
				+ '></td><td class="b_r"></td></tr></table>';
		if (mode == 'html') {
			$('fwin_content_' + k).innerHTML = url;
			initMenu();
			show();
		} else {
			fetchContent();
		}
	} else if ((mode == 'get' && (url != menuObj.url || cache != 1)) || (mode == 'post' && $(url).action != menuObj.act)) {
		fetchContent();
	} else {
		show();
	}
	doane();
}

/**
 * 生成图片缩略图
 * 
 * @param {}
 *            obj
 * @param {}
 *            method
 */
function thumbImg(obj, method) {
	if (!obj) {
		return;
	}
	obj.onload = null;
	var file = obj.src;
	var zw = obj.offsetWidth;
	var zh = obj.offsetHeight;
	if (zw < 2) {
		if (!obj.id) {
			obj.id = 'img_' + Math.random();
		}
		setTimeout("thumbImg($('" + obj.id + "'), " + method + ")", 100);
		return;
	}
	var zr = zw / zh;
	method = !method ? 0 : 1;
	if (method) {
		var fixw = obj.getAttribute('_width');
		var fixh = obj.getAttribute('_height');
		if (zw > fixw) {
			zw = fixw;
			zh = zw / zr;
		}
		if (zh > fixh) {
			zh = fixh;
			zw = zh * zr;
		}
	} else {
		fixw = typeof imagemaxwidth == 'undefined' ? '600' : imagemaxwidth;
		if (zw > fixw) {
			zw = fixw;
			zh = zw / zr;
			obj.style.cursor = 'pointer';
			if (!obj.onclick) {
				obj.onclick = function() {
					zoom(obj, obj.src);
				};
			}
		}
	}
	obj.width = zw;
	obj.height = zh;
}

// 检查变量是否定义
function isUndefined(variable) {
	return typeof variable == 'undefined' ? true : false;
}

function doane(event, preventDefault, stopPropagation) {
	var preventDefault = isUndefined(preventDefault) ? 1 : preventDefault;
	var stopPropagation = isUndefined(stopPropagation) ? 1 : stopPropagation;
	var e = event ? event : window.event;
	if (!e) {
		e = getEvent();
	}
	if (!e) {
		return null;
	}
	if (preventDefault) {
		if (e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}
	}
	if (stopPropagation) {
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
	}
	return e;
}

// 屏蔽回格键跳到浏览器的上一页
new Ext.KeyMap(document, [{
					key : Ext.EventObject.BACKSPACE,
					fn : function(key, e) {
						var t = e.target.tagName;
						if (t !== "INPUT" && t !== "TEXTAREA") {
							e.stopEvent();
						}
					}
				}]);

// EditorGridPanel 编辑时支持方向键
Ext.override(Ext.grid.CellSelectionModel, {
			onEditorKey : function(field, e) {
				var smodel = this;
				var k = e.getKey(), newCell, g = smodel.grid, ed = g.activeEditor;
				switch (k) {
					case e.TAB :
						e.stopEvent();
						ed.completeEdit();
						if (e.shiftKey) {
							newCell = g.walkCells(ed.row, ed.col - 1, -1, smodel.acceptsNav, smodel);
						} else {
							newCell = g.walkCells(ed.row, ed.col + 1, 1, smodel.acceptsNav, smodel);
						}
						if (ed.col == 1) {
							if (e.shiftKey) {
								newCell = g.walkCells(ed.row, ed.col + 1, -1, smodel.acceptsNav, smodel);
							} else {
								newCell = g.walkCells(ed.row, ed.col + 1, 1, smodel.acceptsNav, smodel);
							}
						}
						break;
					case e.UP :
						e.stopEvent();
						ed.completeEdit();
						newCell = g.walkCells(ed.row - 1, ed.col, -1, smodel.acceptsNav, smodel);
						break;
					case e.DOWN :
						e.stopEvent();
						ed.completeEdit();
						newCell = g.walkCells(ed.row + 1, ed.col, 1, smodel.acceptsNav, smodel);
						break;
					case e.LEFT :
						e.stopEvent();
						ed.completeEdit();
						newCell = g.walkCells(ed.row, ed.col - 1, -1, smodel.acceptsNav, smodel);
						break;
					case e.RIGHT :
						e.stopEvent();
						ed.completeEdit();
						newCell = g.walkCells(ed.row, ed.col + 1, 1, smodel.acceptsNav, smodel);
						break;
				}
				if (newCell) {
					g.startEditing(newCell[0], newCell[1]);
				}
			}
		});

// START OF MD5
function md5(s) {
	return rstr2hex(s);
	// return rstr2hex(rstr_md5(str2rstr_utf8(s)));
}

function rstr2hex(input) {/*
							 * var hex_tab = "0123456789ABCDEF";
							 */
	var hex_tab = "0123456789abcdef";
	var output = "";
	var x;
	for (var i = 0; i < input.length; i++) {
		x = input.charCodeAt(i);
		output += hex_tab.charAt((x >>> 4) & 0x0F) + hex_tab.charAt(x & 0x0F);
	}
	return output;
}

 function recordRestBrowserFile(record, resetid){
 	if (record != null){
 		var resetid_array = resetid.replaceAll(" ", "").split(",")[0];
 		var resetid_num = resetid_array.length;
 		
 		for (var i = 0; i < resetid_num; i++){
 			// TODO record.data.resetid_array[i] = null;
 		}
 	}
 }

/*
 * function rstr_md5(s) { return binl2rstr(binl_md5(rstr2binl(s), s.length *
 * 8)); }
 * 
 * function binl2rstr(input) { var output = ""; for (var i = 0; i < input.length *
 * 32; i += 8) output += String.fromCharCode((input[i >> 5] >>> (i % 32)) &
 * 0xFF); return output; }
 * 
 * function binl_md5(x, len) { x[len >> 5] |= 0x80 << ((len) % 32); x[(((len +
 * 64) >>> 9) << 4) + 14] = len;
 * 
 * var a = 1732584193; var b = -271733879; var c = -1732584194; var d =
 * 271733878;
 * 
 * for (var i = 0; i < x.length; i += 16) { var olda = a; var oldb = b; var oldc =
 * c; var oldd = d;
 * 
 * a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936); d = md5_ff(d, a, b, c, x[i +
 * 1], 12, -389564586); c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819); b =
 * md5_ff(b, c, d, a, x[i + 3], 22, -1044525330); a = md5_ff(a, b, c, d, x[i +
 * 4], 7, -176418897); d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426); c =
 * md5_ff(c, d, a, b, x[i + 6], 17, -1473231341); b = md5_ff(b, c, d, a, x[i +
 * 7], 22, -45705983); a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416); d =
 * md5_ff(d, a, b, c, x[i + 9], 12, -1958414417); c = md5_ff(c, d, a, b, x[i +
 * 10], 17, -42063); b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162); a =
 * md5_ff(a, b, c, d, x[i + 12], 7, 1804603682); d = md5_ff(d, a, b, c, x[i +
 * 13], 12, -40341101); c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290); b =
 * md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
 * 
 * a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510); d = md5_gg(d, a, b, c, x[i +
 * 6], 9, -1069501632); c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713); b =
 * md5_gg(b, c, d, a, x[i + 0], 20, -373897302); a = md5_gg(a, b, c, d, x[i +
 * 5], 5, -701558691); d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083); c =
 * md5_gg(c, d, a, b, x[i + 15], 14, -660478335); b = md5_gg(b, c, d, a, x[i +
 * 4], 20, -405537848); a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438); d =
 * md5_gg(d, a, b, c, x[i + 14], 9, -1019803690); c = md5_gg(c, d, a, b, x[i +
 * 3], 14, -187363961); b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501); a =
 * md5_gg(a, b, c, d, x[i + 13], 5, -1444681467); d = md5_gg(d, a, b, c, x[i +
 * 2], 9, -51403784); c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473); b =
 * md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
 * 
 * a = md5_hh(a, b, c, d, x[i + 5], 4, -378558); d = md5_hh(d, a, b, c, x[i +
 * 8], 11, -2022574463); c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562); b =
 * md5_hh(b, c, d, a, x[i + 14], 23, -35309556); a = md5_hh(a, b, c, d, x[i +
 * 1], 4, -1530992060); d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353); c =
 * md5_hh(c, d, a, b, x[i + 7], 16, -155497632); b = md5_hh(b, c, d, a, x[i +
 * 10], 23, -1094730640); a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174); d =
 * md5_hh(d, a, b, c, x[i + 0], 11, -358537222); c = md5_hh(c, d, a, b, x[i +
 * 3], 16, -722521979); b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189); a =
 * md5_hh(a, b, c, d, x[i + 9], 4, -640364487); d = md5_hh(d, a, b, c, x[i +
 * 12], 11, -421815835); c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520); b =
 * md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
 * 
 * a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844); d = md5_ii(d, a, b, c, x[i +
 * 7], 10, 1126891415); c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905); b =
 * md5_ii(b, c, d, a, x[i + 5], 21, -57434055); a = md5_ii(a, b, c, d, x[i +
 * 12], 6, 1700485571); d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606); c =
 * md5_ii(c, d, a, b, x[i + 10], 15, -1051523); b = md5_ii(b, c, d, a, x[i + 1],
 * 21, -2054922799); a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359); d =
 * md5_ii(d, a, b, c, x[i + 15], 10, -30611744); c = md5_ii(c, d, a, b, x[i +
 * 6], 15, -1560198380); b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649); a =
 * md5_ii(a, b, c, d, x[i + 4], 6, -145523070); d = md5_ii(d, a, b, c, x[i +
 * 11], 10, -1120210379); c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259); b =
 * md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
 * 
 * a = safe_add(a, olda); b = safe_add(b, oldb); c = safe_add(c, oldc); d =
 * safe_add(d, oldd); } return Array(a, b, c, d); }
 * 
 * function rstr2binl(input) { var output = Array(input.length >> 2); for (var i =
 * 0; i < output.length; i++) output[i] = 0; for (var i = 0; i < input.length *
 * 8; i += 8) output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
 * return output; }
 * 
 * function str2rstr_utf8(input) { var output = ""; var i = -1; var x, y;
 * 
 * while (++i < input.length) { // Decode utf-16 surrogate pairs x =
 * input.charCodeAt(i); y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
 * if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) { x = 0x10000 +
 * ((x & 0x03FF) << 10) + (y & 0x03FF); i++; }
 * 
 * //Encode output as utf-8 if (x <= 0x7F) output += String.fromCharCode(x);
 * else if (x <= 0x7FF) output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F),
 * 0x80 | (x & 0x3F)); else if (x <= 0xFFFF) output += String.fromCharCode(0xE0 |
 * ((x >>> 12) & 0x0F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F)); else if
 * (x <= 0x1FFFFF) output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
 * 0x80 | ((x >>> 12) & 0x3F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F)); }
 * return output; }
 * 
 * function md5_ff(a, b, c, d, x, s, t) { return md5_cmn((b & c) | ((~b) & d),
 * a, b, x, s, t); }
 * 
 * function md5_gg(a, b, c, d, x, s, t) { return md5_cmn((b & d) | (c & (~d)),
 * a, b, x, s, t); }
 * 
 * function md5_hh(a, b, c, d, x, s, t) { return md5_cmn(b ^ c ^ d, a, b, x, s,
 * t); }
 * 
 * function md5_ii(a, b, c, d, x, s, t) { return md5_cmn(c ^ (b | (~d)), a, b,
 * x, s, t); }
 * 
 * function md5_cmn(q, a, b, x, s, t) { return
 * safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b); }
 * 
 * function safe_add(x, y) { var lsw = (x & 0xFFFF) + (y & 0xFFFF); var msw = (x >>
 * 16) + (y >> 16) + (lsw >> 16); return (msw << 16) | (lsw & 0xFFFF); }
 * 
 * function bit_rol(num, cnt) { return (num << cnt) | (num >>> (32 - cnt)); } //
 * END OF MD5
 */
