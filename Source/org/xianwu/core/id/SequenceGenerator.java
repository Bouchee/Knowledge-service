package org.xianwu.core.id;

/**
 * SequenceGenerator 此代码源于开源项目E3
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface SequenceGenerator {
	public long next() throws CreateSequnceException;
}
