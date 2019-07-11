package org.xianwu.core.metatype;

/**
 * 非空数据传输对象接口<br>
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface PKey extends Dto{
	/**
	 * 对Key数据传输对象进行键值非空性校验
	 * @throws Exception 
	 */
	public void validateNullAble();
}
