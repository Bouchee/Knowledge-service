package org.xianwu.core.id;

/**
 * CreatePrefixException
 * 此代码源于开源项目E3
 * 
 * @author XianwuFu
 * @since 2013-01-01
 * @see IDException
 */
public class CreatePrefixException extends IDException {

	private static final long serialVersionUID = 1L;

	public CreatePrefixException() {
		super();
	}

	public CreatePrefixException(String message, Throwable cause) {
		super(message, cause);
	}

	public CreatePrefixException(String message) {
		super(message);
	}

	public CreatePrefixException(Throwable cause) {
		super(cause);
	}
}
