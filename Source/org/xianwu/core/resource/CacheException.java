package org.xianwu.core.resource;

/**
 * CacheException
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class CacheException extends ResourceException {

	private static final long serialVersionUID = 1L;

	public CacheException() {
		super("cache异常!");
	}

	public CacheException(String message, Throwable cause) {
		super(message, cause);
	}

	public CacheException(String message) {
		super(message);
	}

	public CacheException(Throwable cause) {
		super(cause);
	}

}
