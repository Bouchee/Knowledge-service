package org.xianwu.core.orm.xibatis.sqlmap.engine.transaction.user;

import java.sql.Connection;
import java.sql.SQLException;

import org.xianwu.core.orm.xibatis.common.jdbc.logging.ConnectionLogProxy;
import org.xianwu.core.orm.xibatis.common.logging.Log;
import org.xianwu.core.orm.xibatis.common.logging.LogFactory;
import org.xianwu.core.orm.xibatis.sqlmap.engine.transaction.Transaction;
import org.xianwu.core.orm.xibatis.sqlmap.engine.transaction.TransactionException;

public class UserProvidedTransaction implements Transaction {

	private static final Log connectionLog = LogFactory.getLog(Connection.class);

	private Connection connection;

	public UserProvidedTransaction(Connection connection) {
		if (connectionLog.isDebugEnabled()) {
			this.connection = ConnectionLogProxy.newInstance(connection);
		} else {
			this.connection = connection;
		}
	}

	public void commit() throws SQLException, TransactionException {
		connection.commit();
	}

	public void rollback() throws SQLException, TransactionException {
		connection.rollback();
	}

	public void close() throws SQLException, TransactionException {
		connection.close();
	}

	public Connection getConnection() throws SQLException, TransactionException {
		return connection;
	}

}
