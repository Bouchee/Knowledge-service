package org.xianwu.core.resource.support;

import org.xianwu.core.resource.ResourceException;
import org.xianwu.core.resource.ResourceLoader;

/**
 * LoaderMapping
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface LoaderMapping {
	public ResourceLoader mapping(String pName) throws ResourceException;
}
