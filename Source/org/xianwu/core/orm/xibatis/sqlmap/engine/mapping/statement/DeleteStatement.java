package org.xianwu.core.orm.xibatis.sqlmap.engine.mapping.statement;

import java.sql.SQLException;
import java.util.List;

import org.xianwu.core.orm.xibatis.sqlmap.client.event.RowHandler;
import org.xianwu.core.orm.xibatis.sqlmap.engine.scope.StatementScope;
import org.xianwu.core.orm.xibatis.sqlmap.engine.transaction.Transaction;

public class DeleteStatement extends MappedStatement {

	public StatementType getStatementType() {
		return StatementType.DELETE;
	}

	public Object executeQueryForObject(StatementScope statementScope, Transaction trans, Object parameterObject,
			Object resultObject) throws SQLException {
		throw new SQLException("Delete statements cannot be executed as a query.");
	}

	@SuppressWarnings("rawtypes")
	public List executeQueryForList(StatementScope statementScope, Transaction trans, Object parameterObject,
			int skipResults, int maxResults) throws SQLException {
		throw new SQLException("Delete statements cannot be executed as a query.");
	}

	public void executeQueryWithRowHandler(StatementScope statementScope, Transaction trans, Object parameterObject,
			RowHandler rowHandler) throws SQLException {
		throw new SQLException("Delete statements cannot be executed as a query.");
	}

}
