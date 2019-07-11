package org.xianwu.core.orm.xibatis.sqlmap.engine.scope;

import java.sql.ResultSet;
import java.util.HashMap;
import java.util.Map;

import org.xianwu.core.orm.xibatis.sqlmap.engine.mapping.parameter.ParameterMap;
import org.xianwu.core.orm.xibatis.sqlmap.engine.mapping.result.ResultMap;
import org.xianwu.core.orm.xibatis.sqlmap.engine.mapping.sql.Sql;
import org.xianwu.core.orm.xibatis.sqlmap.engine.mapping.statement.MappedStatement;

/**
 * Request based implementation of Scope interface
 */
public class StatementScope {
	// Used by Any
	private SessionScope sessionScope;
	private ErrorContext errorContext;
	private MappedStatement statement;
	private ParameterMap parameterMap;
	private ResultMap resultMap;
	private Sql sql;
	// Used by DynamicSql
	private ParameterMap dynamicParameterMap;
	private String dynamicSql;
	// Used by N+1 Select solution
	private ResultSet resultSet;
	@SuppressWarnings("rawtypes")
	private Map uniqueKeys;
	private boolean rowDataFound;
	private String currentNestedKey;

	public StatementScope(SessionScope sessionScope) {
		this.errorContext = new ErrorContext();
		this.rowDataFound = true;
		this.sessionScope = sessionScope;
	}

	/**
	 * @return Returns the currentNestedKey.
	 */
	public String getCurrentNestedKey() {
		return currentNestedKey;
	}

	/**
	 * @param currentNestedKey
	 *            The currentNestedKey to set.
	 */
	public void setCurrentNestedKey(String currentNestedKey) {
		this.currentNestedKey = currentNestedKey;
	}

	/**
	 * Get the request's error context
	 * 
	 * @return - the request's error context
	 */
	public ErrorContext getErrorContext() {
		return errorContext;
	}

	/**
	 * Get the session of the request
	 * 
	 * @return - the session
	 */
	public SessionScope getSession() {
		return sessionScope;
	}

	/**
	 * Get the statement for the request
	 * 
	 * @return - the statement
	 */
	public MappedStatement getStatement() {
		return statement;
	}

	/**
	 * Set the statement for the request
	 * 
	 * @param statement
	 *            - the statement
	 */
	public void setStatement(MappedStatement statement) {
		this.statement = statement;
	}

	/**
	 * Get the parameter map for the request
	 * 
	 * @return - the parameter map
	 */
	public ParameterMap getParameterMap() {
		return parameterMap;
	}

	/**
	 * Set the parameter map for the request
	 * 
	 * @param parameterMap
	 *            - the new parameter map
	 */
	public void setParameterMap(ParameterMap parameterMap) {
		this.parameterMap = parameterMap;
	}

	/**
	 * Get the result map for the request
	 * 
	 * @return - the result map
	 */
	public ResultMap getResultMap() {
		return resultMap;
	}

	/**
	 * Set the result map for the request
	 * 
	 * @param resultMap
	 *            - the result map
	 */
	public void setResultMap(ResultMap resultMap) {
		this.resultMap = resultMap;
	}

	/**
	 * Get the SQL for the request
	 * 
	 * @return - the sql
	 */
	public Sql getSql() {
		return sql;
	}

	/**
	 * Set the SQL for the request
	 * 
	 * @param sql
	 *            - the sql
	 */
	public void setSql(Sql sql) {
		this.sql = sql;
	}

	/**
	 * Get the dynamic parameter for the request
	 * 
	 * @return - the dynamic parameter
	 */
	public ParameterMap getDynamicParameterMap() {
		return dynamicParameterMap;
	}

	/**
	 * Set the dynamic parameter for the request
	 * 
	 * @param dynamicParameterMap
	 *            - the dynamic parameter
	 */
	public void setDynamicParameterMap(ParameterMap dynamicParameterMap) {
		this.dynamicParameterMap = dynamicParameterMap;
	}

	/**
	 * Get the dynamic SQL for the request
	 * 
	 * @return - the dynamic SQL
	 */
	public String getDynamicSql() {
		return dynamicSql;
	}

	/**
	 * Set the dynamic SQL for the request
	 * 
	 * @param dynamicSql
	 *            - the dynamic SQL
	 */
	public void setDynamicSql(String dynamicSql) {
		this.dynamicSql = dynamicSql;
	}

	public ResultSet getResultSet() {
		return resultSet;
	}

	public void setResultSet(ResultSet resultSet) {
		this.resultSet = resultSet;
	}

	@SuppressWarnings("rawtypes")
	public Map getUniqueKeys(ResultMap map) {
		if (uniqueKeys == null) {
			return null;
		}
		return (Map) uniqueKeys.get(map);
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public void setUniqueKeys(ResultMap map, Map keys) {
		if (uniqueKeys == null) {
			uniqueKeys = new HashMap();
		}
		this.uniqueKeys.put(map, keys);
	}

	public boolean isRowDataFound() {
		return rowDataFound;
	}

	public void setRowDataFound(boolean rowDataFound) {
		this.rowDataFound = rowDataFound;
	}

}
