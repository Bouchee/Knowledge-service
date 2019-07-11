package org.xianwu.core.resource.cache;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;

import org.xianwu.core.resource.CacheException;

/**
 * LRUCache
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class LRUCache extends AbstractCache {
	@SuppressWarnings("rawtypes")
	private final Map cacheMap = new HashMap();

	@SuppressWarnings("rawtypes")
	private final LinkedList keyList = new LinkedList();

	private int maxSize = 100;

	public void setMaxSize(int maxSize) {
		if (maxSize < 0) {
			throw new IllegalArgumentException("maxSize必须大于0!当前值是:" + maxSize);
		}
		this.maxSize = maxSize;
	}

	@SuppressWarnings("unchecked")
	public void put(Object key, Object value) throws CacheException {
		cacheMap.put(key, value);
		keyList.add(key);
		if (keyList.size() > maxSize) {
			try {
				Object oldKey = keyList.removeFirst();
				cacheMap.remove(oldKey);
			} catch (IndexOutOfBoundsException e) {
				// ignore
			}
		}
	}

	@SuppressWarnings("unchecked")
	public Object get(Object key) throws CacheException {
		Object result = cacheMap.get(key);
		keyList.remove(key);
		if (result != null) {
			keyList.add(key);
		}
		return result;
	}

	public void remove(Object key) throws CacheException {
		keyList.remove(key);
		cacheMap.remove(key);
	}

	public void clear() throws CacheException {
		cacheMap.clear();
		keyList.clear();
	}

	public String toString() {
		return "LRUCache: " + maxSize;
	}

}