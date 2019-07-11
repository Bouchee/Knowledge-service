package org.xianwu.core.resource.impl;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.xianwu.core.resource.ResourceException;
import org.xianwu.core.resource.ResourceLoader;
import org.xianwu.core.resource.loader.ClasspathResourceLoader;
import org.xianwu.core.resource.loader.DynamicResourceLoader;
import org.xianwu.core.resource.loader.FileResourceLoader;
import org.xianwu.core.resource.loader.MD5ClasspathResourceLoader;
import org.xianwu.core.resource.support.LoaderMapping;

/**
 * DefaultLoaderMapping
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
@SuppressWarnings("unchecked")
public class DefaultLoaderMapping implements LoaderMapping {

	private final Log logger = LogFactory.getLog(this.getClass());
	private final static FileResourceLoader file = new FileResourceLoader();
	private final static ClasspathResourceLoader classpath = new ClasspathResourceLoader();
	private final static MD5ClasspathResourceLoader md5classpath = new MD5ClasspathResourceLoader();
	private final static DynamicResourceLoader dynamic = new DynamicResourceLoader();

	@SuppressWarnings("rawtypes")
	private static Map loaders = new HashMap();

	static {
		loaders.put("file", file);
		loaders.put("classpath", classpath);
		loaders.put("md5classpath", md5classpath);
		loaders.put("dynamic", dynamic);
	}

	public void put(String pLoaderName, ResourceLoader pLoader) {
		loaders.put(pLoaderName, pLoader);
	}

	public ResourceLoader mapping(String pName) throws ResourceException {
		if (pName == null) {
			throw new NullPointerException("资源Loader名称不能为空null");
		}
		logger.debug("获取名字为：" + pName + "的资源Loader.");
		String handlerName = pName.toLowerCase();
		if (loaders.containsKey(handlerName) == false) {
			throw new ResourceException("不存在名为：" + pName + "的资源Loader");
		}
		ResourceLoader result = (ResourceLoader) loaders.get(handlerName);
		logger.debug("获取到名字为：" + pName + "的资源Loader.");
		return result;
	}

}
