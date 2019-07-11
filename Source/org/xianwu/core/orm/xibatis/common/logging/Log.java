package org.xianwu.core.orm.xibatis.common.logging;

public interface Log {

	boolean isDebugEnabled();

	void error(String s, Throwable e);

	void error(String s);

	public void debug(String s);

	public void warn(String s);

}
