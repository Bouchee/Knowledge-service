package org.xianwu.core.web;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.ApplicationContext;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.SpringBeanLoader;
import org.xianwu.core.model.dao.Dao;
import org.xianwu.core.model.dao.Reader;
import org.xianwu.core.properties.PropertiesFactory;
import org.xianwu.core.properties.PropertiesFile;
import org.xianwu.core.properties.PropertiesHelper;
import org.xianwu.core.util.Constants;
import org.xianwu.core.util.Utils;
import org.xianwu.system.admin.service.MonitorService;
import org.xianwu.system.common.util.SystemConstants;

/**
 * 系统启动监听器
 *
 * @author XianwuFu
 * @since 2013-01-01
 */
public class SystemInitListener implements ServletContextListener {
	private static Log log = LogFactory.getLog(SystemInitListener.class);
	private boolean success = true;
	@SuppressWarnings("unused")
	private ApplicationContext wac = null;

	public void contextDestroyed(ServletContextEvent sce) {

	}

	public void contextInitialized(ServletContextEvent sce) {
		systemStartup(sce.getServletContext());
	}

	/**
	 * 应用平台启动
	 */
	@SuppressWarnings("rawtypes")
	private void systemStartup(ServletContext servletContext) {
		PropertiesHelper pHelper = PropertiesFactory.getPropertiesHelper(PropertiesFile.GLOBAL);
		String forceLoad = pHelper.getValue("forceLoad", SystemConstants.FORCELOAD_N);
		long start = System.currentTimeMillis();
		String server_start_time = new java.text.SimpleDateFormat("yyyyMMddHHmmss").format(new java.util.Date(start));

		if (forceLoad.equalsIgnoreCase(SystemConstants.FORCELOAD_N)) {
			//log.info("*******************************************************");
		}
		try {
			wac = SpringBeanLoader.getApplicationContext();
		} catch (Exception e) {
			success = false;
			e.printStackTrace();
		}
		if (success) {
			MonitorService monitorService = (MonitorService) SpringBeanLoader.getSpringBean("monitorService");
			monitorService.deleteHttpSession(new BaseDto());
			try {
				initDbType();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		if (success) {
			log.info("系统开始启动字典装载程序,并加载字典...");
			
			Reader g4Reader = (Reader) SpringBeanLoader.getSpringBean("g4Reader");
			List codeList = null;
			try {
				codeList = g4Reader.queryForList("Resource.getCodeList");
				log.info("字典加载成功!");
			} catch (Exception e) {
				success = false;
				log.error("字典加载失败!");
				e.printStackTrace();
			}
			servletContext.setAttribute("EACODELIST", codeList);
			servletContext.setAttribute("sst", server_start_time);
		}
		if (success) {
			log.info("系统开始启动全局参数表装载程序,并加载全局参数表...");
			
			List paramList = null;
			try {
				Reader g4Reader = (Reader) SpringBeanLoader.getSpringBean("g4Reader");
				paramList = g4Reader.queryForList("Resource.getParameterList");
				log.info("全局参数表加载成功!");
			} catch (Exception e) {
				success = false;
				log.error("全局参数表加载失败!");
				e.printStackTrace();
			}
			servletContext.setAttribute("EAPARAMLIST", paramList);
		}
		long timeSec = (System.currentTimeMillis() - start) / 1000;
		String start_string = null;
		if (success) {
			start_string = "系统启动成功[" + Utils.getCurrentTime() + "]," + "总耗时: " + timeSec / 60 + "分 " + timeSec % 60 + "秒\n";
			log.info(start_string);
		} else {
			start_string = "系统启动失败[" + Utils.getCurrentTime() + "]" + "总耗时: " + timeSec / 60 + "分" + timeSec % 60 + "秒\n";
			log.error(start_string);
		}
		System.out.print(start_string);
	}

	/**
	 * 识别缺省的JDBC驱动类型(g4Dao)
	 *
	 * @throws SQLException
	 */
	private void initDbType() throws SQLException {
		Dao g4Dao = (Dao) SpringBeanLoader.getSpringBean("g4Dao");
		Connection connection = g4Dao.getConnection();
		String dbString = connection.getMetaData().getDatabaseProductName().toLowerCase();
		try {
			connection.close();
		} catch (Exception e) {
			log.error(Constants.Exception_Head + "未正常关闭数据库连接");
			e.printStackTrace();
		}
		if (dbString.indexOf("ora") > -1) {
			System.setProperty("g4Dao.db", "oracle");
		} else if (dbString.indexOf("mysql") > -1) {
			System.setProperty("g4Dao.db", "mysql");
		}else if (dbString.indexOf("microsoft") > -1) {
			System.setProperty("g4Dao.db", "sqlserver");
		} else {
			if (log.isErrorEnabled()) {
				log.error(Constants.Exception_Head + "目前还不支持你使用的数据库产品.如需获得支持,请和我们联系!");
			}
			System.exit(0);
		}
	}
}
