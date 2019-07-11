package org.xianwu.core.tplengine.velocity;

import org.xianwu.core.util.Constants;

/**
 * 初始模板引擎异常类
 * @author XianwuFu
 * @since 2013-01-01
 * @see RuntimeException
 */
public class InitVelocityEngineException extends RuntimeException{
	
	/**
	 * 缺省串行版本标识
	 */
	private static final long serialVersionUID = 1L;
	
	/**
	 * 构造函数1
	 * @param 
	 */
	public InitVelocityEngineException(){
		super(Constants.Exception_Head + "初始化缺省模板引擎失败.\n");
	}
	
	/**
	 * 构造函数2
	 * @param 
	 */
	public InitVelocityEngineException(String msg){
		super(Constants.Exception_Head + "初始化缺省模板引擎失败\n" + msg);
	}

}
