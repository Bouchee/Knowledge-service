package org.xianwu.core.resource.support;

import org.xianwu.core.resource.ResourceException;

/**
 * ResourceConfigMapping
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface ResourceConfigMapping {
	public ResourceConfig mapping(String pUri) throws ResourceException;
}
