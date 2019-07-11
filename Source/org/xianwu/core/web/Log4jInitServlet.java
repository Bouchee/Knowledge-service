package org.xianwu.core.web;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import org.apache.log4j.PropertyConfigurator;
import org.xianwu.core.util.Utils;

/**
 * Log4J初始化
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class Log4jInitServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7403381918728285006L;

	/**
	 * Servlet初始化
	 */
	public void init(ServletConfig config) throws ServletException {
		String root = config.getServletContext().getRealPath("/");
		String log4jLocation = Utils.getFullPathRelateClass("../../../../log4j.properties", getClass());
		System.setProperty("webRoot", root);
		if (Utils.isNotEmpty(log4jLocation)) {
			PropertyConfigurator.configure(log4jLocation);
		}
	}
}
