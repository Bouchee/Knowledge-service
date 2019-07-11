package org.xianwu.core.resource.support;

import org.xianwu.core.resource.Cache;
import org.xianwu.core.resource.CacheException;
import org.xianwu.core.resource.Resource;

/**
 * CacheManager
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class CacheManager {
	private final Cache cache;

	public CacheManager(Cache pCache) {
		this.cache = pCache;
	}

	public void put(Resource pResource) throws CacheException {
		cache.put(pResource.getUri(), pResource);
	}

	public Resource get(String pUri) throws CacheException {
		return (Resource) cache.get(pUri);
	}

}
