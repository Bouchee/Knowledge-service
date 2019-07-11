package org.xianwu.core.resource.cache;

import java.util.HashMap;
import java.util.Map;

import org.xianwu.core.resource.CacheException;

/**
 * MemoryCache
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class MemoryCache extends  AbstractCache {

	@SuppressWarnings("rawtypes")
	private Map map = new HashMap();
	@SuppressWarnings("unchecked")
	public void put(Object key, Object pValue) throws CacheException{
		map.put(key, pValue);	
	}

	public Object get(Object key)  throws CacheException{
	   return map.get(key);
	}

	public void remove(Object key)  throws CacheException{
		map.remove(key);
	}

	public void clear() throws CacheException{
       map.clear();   		
	}

}
