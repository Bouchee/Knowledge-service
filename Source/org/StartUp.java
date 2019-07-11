package org;

import org.xianwu.core.server.XianwuServer;
import org.xianwu.core.properties.*;

/**
 * 系统启动
 * 
 * @author XianwuFu
 * @since 2014-03-07
 */
public class StartUp {
	public static void main(String[] args) {
		boolean startup_flag = false; // 星夜回缘 2014-03-07-11-25-21

		PropertiesHelper pHelper;

		if (startup_flag) {
			pHelper = PropertiesFactory.getPropertiesHelper(PropertiesFile.SERVER);
			XianwuServer server = new XianwuServer(pHelper.getValue("server.WebResource"), pHelper.getValue("server.WebContext"), new Integer(pHelper.getValue("server.WebPort")));
			server.stop();
			try {
				server.start();
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			System.out.print("请不要使用该方式启动系统,该方式不是热启动,在服务启动后修改文件不会自动更新文件!将自动退出启动过程.");
		}
	}
}
