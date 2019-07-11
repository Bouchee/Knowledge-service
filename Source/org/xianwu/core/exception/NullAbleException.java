package org.xianwu.core.exception;

import org.xianwu.core.util.Constants;

/**
 * 非空异常校验类<br>
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
@SuppressWarnings("serial")
public class NullAbleException extends RuntimeException {

	private String nullField;

	/**
	 * 构造函数1
	 * 
	 * @param 非空校验类
	 */
	public NullAbleException() {
		super(Constants.Exception_Head + "对象不能为空,请检查.");
	}

	/**
	 * 构造函数2
	 * 
	 * @param 非空校验类
	 */
	@SuppressWarnings("rawtypes")
	public NullAbleException(Class cs) {
		super(Constants.Exception_Head + "对象不能为空,请检查.[" + cs + "]");
	}

	/**
	 * 构造函数3
	 * 
	 * @param pNullField
	 *            异常附加信息
	 */
	public NullAbleException(String pNullField) {
		super(Constants.Exception_Head + "对象属性[" + pNullField + "]不能为空,请检查.");
		this.setNullField(pNullField);
	}

	public String getNullField() {
		return nullField;
	}

	public void setNullField(String nullField) {
		this.nullField = nullField;
	}
}
