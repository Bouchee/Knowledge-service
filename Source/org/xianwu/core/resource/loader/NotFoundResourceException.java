package org.xianwu.core.resource.loader;

import org.xianwu.core.resource.ResourceException;

/**
 * NotFoundResourceException
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class NotFoundResourceException extends ResourceException {

	private static final long serialVersionUID = 1L;

	public NotFoundResourceException() {
		super();
	}

	public NotFoundResourceException(String message, Throwable cause) {
		super(message, cause);
	}

	public NotFoundResourceException(String message) {
		super(message);
	}

	public NotFoundResourceException(Throwable cause) {
		super(cause);
	}

}
