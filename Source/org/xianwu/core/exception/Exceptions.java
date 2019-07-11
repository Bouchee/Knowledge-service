package org.xianwu.core.exception;

import org.xianwu.core.util.Constants;

/**
 * 公共异常类<br>
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
@SuppressWarnings("serial")
public class Exceptions extends RuntimeException {

	public Exceptions() {
		super();
	}

	public Exceptions(String msg) {
		super(Constants.Exception_Head + msg);
	}
}
