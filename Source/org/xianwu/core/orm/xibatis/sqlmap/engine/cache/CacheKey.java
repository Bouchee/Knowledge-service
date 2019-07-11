package org.xianwu.core.orm.xibatis.sqlmap.engine.cache;

import java.util.List;
import java.util.ArrayList;

/**
 * Hash value generator for cache keys
 */
public class CacheKey {

	private static final int DEFAULT_MULTIPLYER = 37;
	private static final int DEFAULT_HASHCODE = 17;

	private int multiplier;
	private int hashcode;
	private long checksum;
	private int count;
	@SuppressWarnings("rawtypes")
	private List paramList = new ArrayList();

	/**
	 * Default constructor
	 */
	public CacheKey() {
		hashcode = DEFAULT_HASHCODE;
		multiplier = DEFAULT_MULTIPLYER;
		count = 0;
	}

	/**
	 * Constructor that supplies an initial hashcode
	 * 
	 * @param initialNonZeroOddNumber
	 *            - the hashcode to use
	 */
	public CacheKey(int initialNonZeroOddNumber) {
		hashcode = initialNonZeroOddNumber;
		multiplier = DEFAULT_MULTIPLYER;
		count = 0;
	}

	/**
	 * Costructor that supplies an initial hashcode and multiplier
	 * 
	 * @param initialNonZeroOddNumber
	 *            - the hashcode to use
	 * @param multiplierNonZeroOddNumber
	 *            - the multiplier to use
	 */
	public CacheKey(int initialNonZeroOddNumber, int multiplierNonZeroOddNumber) {
		hashcode = initialNonZeroOddNumber;
		multiplier = multiplierNonZeroOddNumber;
		count = 0;
	}

	/**
	 * Updates this object with new information based on an int value
	 * 
	 * @param x
	 *            - the int value
	 * @return the cache key
	 */
	public CacheKey update(int x) {
		update(new Integer(x));
		return this;
	}

	/**
	 * Updates this object with new information based on an object
	 * 
	 * @param object
	 *            - the object
	 * @return the cachekey
	 */
	@SuppressWarnings("unchecked")
	public CacheKey update(Object object) {
		int baseHashCode = object.hashCode();

		count++;
		checksum += baseHashCode;
		baseHashCode *= count;

		hashcode = multiplier * hashcode + baseHashCode;

		paramList.add(object);

		return this;
	}

	public boolean equals(Object object) {
		if (this == object)
			return true;
		if (!(object instanceof CacheKey))
			return false;

		final CacheKey cacheKey = (CacheKey) object;

		if (hashcode != cacheKey.hashcode)
			return false;
		if (checksum != cacheKey.checksum)
			return false;
		if (count != cacheKey.count)
			return false;

		for (int i = 0; i < paramList.size(); i++) {
			Object thisParam = paramList.get(i);
			Object thatParam = cacheKey.paramList.get(i);
			if (thisParam == null) {
				if (thatParam != null)
					return false;
			} else {
				if (!thisParam.equals(thatParam))
					return false;
			}
		}

		return true;
	}

	public int hashCode() {
		return hashcode;
	}

	public String toString() {
		StringBuffer returnValue = new StringBuffer().append(hashcode).append('|').append(checksum);
		for (int i = 0; i < paramList.size(); i++) {
			returnValue.append('|').append(paramList.get(i));
		}

		return returnValue.toString();
	}

}
