//1、查看详情的窗口
var aaa = 1;
var msnWin = new Ext.Window({
	        closable    : false,
	        width       : 540,
	        height      : 300,
	        buttonAlign : 'center',
	        layout      : 'border',
	        constrain   : true,//防止超出浏览器视野
	        resizable   : false,//边框不可以拉伸
	        items       : [grid], //这里的消息信息grid的panel请自己设计
	        buttons     : [{
		                text    : '标为已读',
		                iconCls : 'acceptIcon',
		                handler : function() {
			                aaa = 2;
			                updateMsn();
		                }
	                }, {
		                text    : '关闭',
		                iconCls : 'deleteIcon',
		                handler : function() {
			                if (aaa == 1) {
				                Ext.MessageBox.confirm('提示', '新短消息没有标为已读，稍后仍会提醒！确信要关闭吗?', function(btn, text) {
					                        if (btn == 'yes') {
						                        msnWin.hide()
					                        }
				                        });
			                };
			                if (aaa == 2) {
				                msnWin.hide();
			                }
			                
		                }
	                }]
	        
        })

//2、定时提醒新短消息的设置
var task_CheckmsnState;//声明任务变量
Ext.onReady(function() {
	        task_CheckmsnState = {
		        run      : checkmsn,//执行任务时执行的函数
		        interval : 30000
		        //消息提醒时间间隔，毫秒为单位，这里是30秒
	        }
	        Ext.TaskMgr.start(task_CheckmsnState);//初始化时就启动消息提醒
        });

//2、定时加载消息库，有未读新短消息则右下角弹出提示窗。没有新消息则不弹出提示窗
function checkmsn() {
	store.load({
		        params : {
			        start     : 0,
			        limit     : bbar.pageSize,
			        sfyd      : '未读',
			        deptname  : username,
			        firstload : 'true'
		        }
	        });
	
	Ext.Ajax.request({
		        url     : 'msn.do?code=queryMsn',
		        success : function(response) {
			        if (this.store.getCount() != 0) { //新消息不为0则弹窗提示
				        aaa = 1;
				        music('resource/music/msg.mp3'); //声音提醒，当有消息弹出时 类似QQ声音提醒）           
				        var tip = new Ext.ux.TipWindow({
					                name    : 'tip',
					                title   : '<span class=commoncss>提示</span>',
					                html    : '<font color=red>' + username + '</font>用户你好：</br>您有[<font color=red>' + this.store.getCount()
					                        + '</font>]条未读信息      <label id="xx" style="cursor:hand;color:blue"><u>查看详情</u></label>',
					                iconCls : 'commentsIcon'
				                }).show(Ext.getBody());
				        Ext.get('xx').on('click', function() {
					                msnWin.show(); //点击查看详情后 打开消息详情；
				                });
			        }
		        },
		        failure : function(response) {
			        Ext.Msg.alert('提示:', '短消息提醒功能失效，请联系管理员进行修复!');
		        }
	        });
}
;

// 批量标记未读消息为已读（我这里直接设置为删除已读消息，你可以设置成批量修改未读 消息为“已读消息”）
function updateMsn() {
	var cell = grid.getSelectionModel().getSelections();
	if (Ext.isEmpty(cell)) {
		Ext.MessageBox.alert('提示', '您没有选中任何消息!');
		return;
	}
	var strChecked = jsArray2JsString(cell, 'xxid');
	Ext.Msg.confirm('请确认', '<span style="color:red"><b>提示:</b>为提高服务器速度，已读消息将清空.</span><br>继续删除吗?', function(btn, text) {
		        if (btn == 'yes') {
			        showWaitMsg();
			        Ext.Ajax.request({
				                url     : './msn.do?reqCode=delMsns',
				                success : function(response) {
					                var resultArray = Ext.util.JSON.decode(response.responseText);
					                store.reload();
					                Ext.Msg.alert('提示', '所有消息已清空');
				                },
				                failure : function(response) {
					                var resultArray = Ext.util.JSON.decode(response.responseText);
					                Ext.Msg.alert('提示', '删除失败');
				                },
				                params  : {
					                strChecked : strChecked
				                }
			                });
		        }
	        });
	
}

//声音提醒功能的实现
var flashvars = {};
var params = {
	wmode : "transparent"
};
var attributes = {};
swfobject.embedSWF("resource/music/sound.swf", "sound", "1", "1", "9.0.0", "expressInstall.swf", flashvars, params, attributes);

function music(c) {
	var sound = swfobject.getObjectById("sound");
	if (sound) {
		sound.SetVariable("f", c);
		sound.GotoFrame(1);
	}
}