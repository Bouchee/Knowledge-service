package org.xianwu.core.resource.support;

import org.xianwu.core.resource.ResourceException;
import org.xianwu.core.resource.ResourceHandler;

/**
 * HandlerMapping
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface HandlerMapping {

	public ResourceHandler mapping(String pName) throws ResourceException;

}
