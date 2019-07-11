package org.xianwu.core.orm.xibatis.sqlmap.client;

/**
 * A single threaded session for working with your SQL Maps. This interface
 * inherits transaction control and execution methods from the
 * SqlMapTransactionManager and SqlMapExecutor interfaces.
 * 
 * @see SqlMapClient
 * @see SqlMapSession
 * @see SqlMapExecutor
 */
public interface SqlMapSession extends SqlMapExecutor, SqlMapTransactionManager {

	/**
	 * Closes the session
	 */
	public void close();

}
