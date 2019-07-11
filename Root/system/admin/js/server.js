/**
 * 获取服务器信息及内存CPU实时监控
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
Ext.onReady(function() {

			var serverInfoGrid = new Ext.grid.PropertyGrid({
						title		: '<span class="commoncss">服务器信息</span>',
						iconCls		: 'server_connectIcon',
						width		: 400,
						collapsible	: true,
						split		: true,
						region		: 'west',
						source		: jsonInfo
					});

			serverInfoGrid.on("beforeedit", function(e) {
						// e.cancel = true;
						// return false;
					});

			var jvmMemPanel = new Ext.Panel({
						title		: '<span class="commoncss">JVM内存监控视图</span>',
						contentEl	: 'jvmMemChart_div',
						collapsible	: true,
						region		: 'center',
						bodyStyle	: '5,5,5,5',
						autoScroll	: true
					});

			var cpuPanel = new Ext.Panel({
						title		: '<span class="commoncss">CPU监控图</span>',
						contentEl	: 'CpuChart_div',
						collapsible	: true,
						region		: 'center',
						bodyStyle	: '5,5,5,5',
						autoScroll	: true
					});

			var hostMemcpuPanel = new Ext.Panel({
						title		: '<span class="commoncss">主机物理内存监控图</span>',
						contentEl	: 'HostMemChart_div',
						collapsible	: true,
						region		: 'center',
						bodyStyle	: '5,5,5,5',
						autoScroll	: true
					});

			var panelRight = new Ext.Panel({
						title		: '<span class="commoncss">监控图</span>',
						header		: false,
						region		: 'center',
						bodyStyle	: '5,5,5,5',
						autoScroll	: true,
						items		: [jvmMemPanel/* , cpuPanel, hostMemcpuPanel */]
					});

			var viewport = new Ext.Viewport({
						layout	: 'border',
						items	: [serverInfoGrid, panelRight]
					});

			var jvmtask = {
				run			: function() {
					updateJVMChart();
					// updateCPUChart();
					// updateHostMemChart();
				},
				interval	: 3000
			};

			var taskRunner = new Ext.util.TaskRunner();
			taskRunner.start(jvmtask);

			function updateJVMChart() {
				Ext.Ajax.request({
							url		: 'serverInfo.do?code=updateJvmChart',
							success	: function(response, opts) {
								var resultArray = Ext.util.JSON.decode(response.responseText);
								var xmlstring = resultArray.xmlstring;
								updateChartXML('jvmMemChart', xmlstring);
							},
							failure	: function(response, opts) {
								infoMsg('获取监控数据失败');
							},
							params	: {}
						});
			}

			function updateCPUChart() {
				Ext.Ajax.request({
							url		: 'serverInfo.do?code=updateCpuChart',
							success	: function(response, opts) {
								var resultArray = Ext.util.JSON.decode(response.responseText);
								var xmlstring = resultArray.xmlstring_cpu;
								updateChartXML('CpuChart', xmlstring);
							},
							failure	: function(response, opts) {
								infoMsg('获取监控数据失败');
							},
							params	: {}
						});
			}

			function updateHostMemChart() {
				Ext.Ajax.request({
							url		: 'serverInfo.do?code=updateHostMemChart',
							success	: function(response, opts) {
								var resultArray = Ext.util.JSON.decode(response.responseText);
								var xmlstring = resultArray.xmlstring_hostmem;
								updateChartXML('HostMemChart', xmlstring);
							},
							failure	: function(response, opts) {
								infoMsg('获取监控数据失败');
							},
							params	: {}
						});
			}

		});