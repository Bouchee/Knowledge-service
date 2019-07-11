package org.xianwu.core.orm.xibatis.sqlmap.engine.transaction;

public class TransactionException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = -60999348478149950L;

	public TransactionException() {
	}

	public TransactionException(String msg) {
		super(msg);
	}

	public TransactionException(Throwable cause) {
		super(cause);
	}

	public TransactionException(String msg, Throwable cause) {
		super(msg, cause);
	}

}
