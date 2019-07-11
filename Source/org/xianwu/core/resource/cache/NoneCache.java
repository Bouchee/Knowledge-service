package org.xianwu.core.resource.cache;

import org.xianwu.core.resource.CacheException;

/**
 * LRUCache
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class NoneCache extends AbstractCache {

	public void put(Object key, Object pValue) throws CacheException {
	}

	public Object get(Object key) throws CacheException {
		return null;
	}

	public void remove(Object key) throws CacheException {
	}

	public void clear() throws CacheException {
		
	}

	public boolean exist(Object key) throws CacheException {
		return false;
	}

}
