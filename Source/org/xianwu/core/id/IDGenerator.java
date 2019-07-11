package org.xianwu.core.id;

/**
 * IDGenerator
 * 此代码源于开源项目E3
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface IDGenerator {
	public String create() throws CreateIDException;
}
