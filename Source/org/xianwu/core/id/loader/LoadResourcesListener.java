package org.xianwu.core.id.loader;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.xianwu.core.id.IDException;

/**
 * LoadResourcesListener
 * 此代码源于开源项目E3
 * 
 * @author XianwuFu
 * @since 2013-01-01
 * @see IDException
 */
public class LoadResourcesListener implements ServletContextListener {
    
    
	public void contextInitialized(ServletContextEvent pServletContextEvent) {
		final String WEB_HOME = pServletContextEvent.getServletContext().getRealPath("/");
		ResourcesLoader.load(WEB_HOME);
	}

	public void contextDestroyed(ServletContextEvent pServletContextEvent) {
	}

}
