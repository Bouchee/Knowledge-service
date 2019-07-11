package org.xianwu.core.orm.xibatis.common.logging.jakarta;

import org.apache.commons.logging.LogFactory;
import org.apache.commons.logging.Log;

public class JakartaCommonsLoggingImpl implements org.xianwu.core.orm.xibatis.common.logging.Log {

	private Log log;

	@SuppressWarnings("rawtypes")
	public JakartaCommonsLoggingImpl(Class clazz) {
		log = LogFactory.getLog(clazz);
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
