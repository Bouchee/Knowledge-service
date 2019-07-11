package org.xianwu.core.id;

/**
 * FormatSequenceExcepiton
 * 此代码源于开源项目E3
 * 
 * @author XianwuFu
 * @since 2013-01-01
 * @see IDException
 */
public class FormatSequenceExcepiton extends IDException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7824874543262077523L;

	public FormatSequenceExcepiton() {
		super("格式化序号异常!");
	}

	public FormatSequenceExcepiton(String message, Throwable cause) {
		super(message, cause);
	}

	public FormatSequenceExcepiton(String message) {
		super(message);
	}

	public FormatSequenceExcepiton(Throwable cause) {
		super(cause);
	}

}
