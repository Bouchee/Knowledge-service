package org.xianwu.core.orm.xibatis.common.logging.log4j;

import org.apache.log4j.Logger;

public class Log4jImpl implements org.xianwu.core.orm.xibatis.common.logging.Log {

	private Logger log;

	@SuppressWarnings("rawtypes")
	public Log4jImpl(Class clazz) {
		log = Logger.getLogger(clazz);
	}

	public boolean isDebugEnabled() {
		return log.isDebugEnabled();
	}

	public void error(String s, Throwable e) {
		log.error(s, e);
	}

	public void error(String s) {
		log.error(s);
	}

	public void debug(String s) {
		log.debug(s);
	}

	public void warn(String s) {
		log.warn(s);
	}

}
