package org.xianwu.core.resource.impl;

import org.xianwu.core.resource.ResourceException;
import org.xianwu.core.resource.support.ResourceConfig;
import org.xianwu.core.resource.support.ResourceConfigMapping;
import org.xianwu.core.resource.util.AntPathMatcher;
import org.xianwu.core.resource.util.StringUtils;

/**
 * DefaultResourceConfigMapping
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class DefaultResourceConfigMapping implements ResourceConfigMapping {
	private UriMapping[] uriMappings = null;

	public UriMapping[] getUriMappings() {
		return uriMappings;
	}

	public void setUriMappings(UriMapping[] uriMappings) {
		/**
		 * @todo: clone数组
		 */
		this.uriMappings = uriMappings;
	}

	private AntPathMatcher pathMatcher = new AntPathMatcher();

	public ResourceConfig mapping(String pUri) throws ResourceException {
		if (uriMappings == null) {
			return null;
		}
		for (int i = 0; i < uriMappings.length; i++) {
			UriMapping uriMapping = uriMappings[i];
			if (isMatch(uriMapping, pUri) == false) {
				continue;
			} else {
				String loaderName = uriMapping.getLoader();
				String handlerNames = uriMapping.getHandlers();
				String charset = uriMapping.getCharset();
				String mimeType = uriMapping.getMimeType();
				String oldPrefix = uriMapping.getOldPrefix();
				String newPrefix = uriMapping.getNewPrefix();
				boolean cache = uriMapping.isCache();
				String[] hanlderNameArray = StringUtils.tokenizeToStringArray(handlerNames, Constants.SPLITER);
				ResourceConfig result = new ResourceConfig(loaderName, hanlderNameArray, charset, mimeType, oldPrefix,
						newPrefix, cache);
				return result;
			}

		}
		return null;
	}

	protected boolean isMatch(UriMapping pUriMapping, String pUri) {
		final String includes = pUriMapping.getIncludes();
		final String excludes = pUriMapping.getExcludes();
		if (includes == null) {
			return false;
		}
		if (pUri == null) {
			return false;
		}
		String[] includeArray = StringUtils.tokenizeToStringArray(includes, Constants.SPLITER);
		boolean match = false;
		for (int i = 0; i < includeArray.length; i++) {
			String include = includeArray[i];
			if (pathMatcher.match(include, pUri)) {
				match = true;
				break;
			}
		}
		if (match) {
			// 检查includes
			String[] excludeArray = StringUtils.tokenizeToStringArray(excludes, Constants.SPLITER);
			for (int i = 0; i < excludeArray.length; i++) {
				String exclude = excludeArray[i];
				if (pathMatcher.match(exclude, pUri)) {
					match = false;
					break;
				}
			}

		}
		return match;
	}

}
