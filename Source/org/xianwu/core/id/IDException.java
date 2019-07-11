package org.xianwu.core.id;

/**
 * IDException
 * 此代码源于开源项目E3
 * 
 * @author XianwuFu
 * @since 2013-01-01
 * @see RuntimeException
 */
public class IDException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public IDException() {
		super("ID异常!");
	}

	public IDException(String message, Throwable cause) {
		super(message, cause);
	}

	public IDException(String message) {
		super(message);
	}

	public IDException(Throwable cause) {
		super(cause);
	}

}
