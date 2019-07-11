package org.xianwu.core.resource;

/**
 * ResourceHandler
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface ResourceHandler {
	public void handle(Resource pResource) throws HandleResourceException;
}
