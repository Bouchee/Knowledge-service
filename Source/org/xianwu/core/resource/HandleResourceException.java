package org.xianwu.core.resource;

/**
 * HandleResourceException
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class HandleResourceException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public HandleResourceException() {
		super("处理异常");
	}

	public HandleResourceException(String message, Throwable cause) {
		super(message, cause);
	}

	public HandleResourceException(String message) {
		super(message);
	}

	public HandleResourceException(Throwable cause) {
		super(cause);
	}

}
