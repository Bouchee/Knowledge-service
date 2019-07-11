package org.xianwu.core.server;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.mortbay.jetty.Connector;
import org.mortbay.jetty.Server;
import org.mortbay.jetty.nio.SelectChannelConnector;
import org.mortbay.jetty.webapp.WebAppContext;
import org.xianwu.core.model.SpringBeanLoader;
import org.xianwu.core.properties.PropertiesFactory;
import org.xianwu.core.properties.PropertiesFile;
import org.xianwu.core.properties.PropertiesHelper;
import org.xianwu.core.util.Constants;
import org.xianwu.system.common.util.SystemConstants;

/**
 * 服务器,基于Jetty构建<br>
 * 将大大提高应用启动速度,并能有效解决在开发过程中classes不同步的问题
 * @author XianwuFu
 * @since 2013-01-01
 */
public class XianwuServer {
	
	private static Log log = LogFactory.getLog(XianwuServer.class);
	
	/**
	 * Web应用上下文
	 */
	private String webContext;
	/**
	 * Web端口
	 */
	private int webPort;
	/**
	 * Web物理磁盘根路径
	 */
	private String WebApp;
	
	Server server = null;
	
	public XianwuServer(){
		server = new Server();
	}
	
	/**
	 * Server构造函数
	 * @param pWebContext Web应用上下文
	 * @param pWebPor Web端口
	 */
	public XianwuServer(String pWebApp, String pWebContext, int pWebPort){
		server = new Server();
		this.webContext = pWebContext;
		this.webPort = pWebPort;
		this.WebApp = pWebApp;
	}
	
	/**
	 * 启动Server
	 */
	@SuppressWarnings("unused")
	public void start(){
	    PropertiesHelper pHelper = PropertiesFactory.getPropertiesHelper(PropertiesFile.GLOBAL);
	    String forceLoad = pHelper.getValue("forceLoad", SystemConstants.FORCELOAD_N);
		/**
		 * 强制改变加载顺序
		 * 解决直接使用iBatis源码带来的初始化Spring容器报错的问题
		 */
	    if(forceLoad.equals(SystemConstants.FORCELOAD_Y)){
		    log.info("系统正在初始化服务容器...");
		    SpringBeanLoader.getApplicationContext();
		    log.info("服务容器初始化成功，托管Bean已被实例化...");
		}
		
		Connector connector = new SelectChannelConnector();
		connector.setPort(webPort);
		server.setConnectors(new Connector[] { connector });
		WebAppContext context = new WebAppContext(
				server,
				WebApp,
				webContext);
		try {
			server.start();
		} catch (Exception e) {
			log.error(Constants.Exception_Head + "\n Server启动出错.\n");
			e.printStackTrace();
		}
	}
	
	/**
	 * 停止Server
	 */
	public void stop() {
		try {
			server.stop();
		} catch (Exception e) {
			log.error(Constants.Exception_Head + "\n Server未能正常停止.\n");
			e.printStackTrace();
		}
	}

	public String getWebContext() {
		return webContext;
	}

	public void setWebContext(String webContext) {
		this.webContext = webContext;
	}

	public int getWebPort() {
		return webPort;
	}

	public void setWebPort(int webPort) {
		this.webPort = webPort;
	}

	public String getWebApp() {
		return WebApp;
	}

	public void setWebApp(String webApp) {
		WebApp = webApp;
	}
	
}
