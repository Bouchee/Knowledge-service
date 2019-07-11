package org.xianwu.core.properties;

import java.io.InputStream;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.util.Constants;

/**
 * Properties文件静态工厂
 *
 * @author XianwuFu
 * @since 2013-01-01
 */
@SuppressWarnings("unchecked")
public class PropertiesFactory {
	private static Log log = LogFactory.getLog(PropertiesFactory.class);
	/**
	 * 属性文件实例容器
	 */
	private static Dto container = new BaseDto();

	static {
		ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
		if (classLoader == null) {
			classLoader = PropertiesFactory.class.getClassLoader();
		}
		// 加载属性文件global.properties
		try {
			InputStream is = classLoader.getResourceAsStream("global.properties");
			PropertiesHelper ph = new PropertiesHelper(is);
			container.put(PropertiesFile.GLOBAL, ph);
		} catch (Exception e1) {
			log.error(Constants.Exception_Head + "加载属性文件global.properties出错!");
			e1.printStackTrace();
		}
		// 加载属性文件app.properties
		try {
			InputStream is = classLoader.getResourceAsStream("app.properties");
			PropertiesHelper ph = new PropertiesHelper(is);
			container.put(PropertiesFile.APP, ph);
		} catch (Exception e1) {
			log.error(Constants.Exception_Head + "加载属性文件app.properties出错!");
			e1.printStackTrace();
		}
		// 加载属性文件app.properties
		try {
			InputStream is = classLoader.getResourceAsStream("server.properties");
			PropertiesHelper ph = new PropertiesHelper(is);
			container.put(PropertiesFile.SERVER, ph);
		} catch (Exception e1) {
			log.error(Constants.Exception_Head + "加载属性文件server.properties出错!");
			e1.printStackTrace();
		}
	}

	/**
	 * 获取属性文件实例
	 *
	 * @param pFile
	 *            文件类型
	 * @return 返回属性文件实例
	 */
	public static PropertiesHelper getPropertiesHelper(String pFile) {
		PropertiesHelper ph = (PropertiesHelper) container.get(pFile);
		return ph;
	}
}
