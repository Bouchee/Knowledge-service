package org.xianwu.core.orm.xibatis.sqlmap.engine.execution;

import java.sql.BatchUpdateException;
import java.util.List;

/**
 * This exception is thrown if a <code>java.sql.BatchUpdateException</code> is
 * caught during the execution of any nested batch. The exception contains the
 * java.sql.BatchUpdateException that is the root cause, as well as the results
 * from any prior nested batch that executed successfully. This exception is
 * only thrown from the executeBatchDetailed method.
 * 
 * @author Jeff Butler
 * 
 */
@SuppressWarnings("serial")
public class BatchException extends Exception {

	@SuppressWarnings("rawtypes")
	private List successfulBatchResults;
	private BatchUpdateException batchUpdateException;
	private String failingSqlStatement;
	private String failingStatementId;

	/**
   * 
   */
	@SuppressWarnings("rawtypes")
	public BatchException(String message, BatchUpdateException cause, List successfulBatchResults,
			String failingStatementId, String failingSqlStatement) {
		super(message, cause);
		this.batchUpdateException = cause;
		this.successfulBatchResults = successfulBatchResults;
		this.failingStatementId = failingStatementId;
		this.failingSqlStatement = failingSqlStatement;
	}

	/**
	 * Returns the BatchUpdateException that caused the nested batch to fail.
	 * That exception contains an array of row counts that can be used to
	 * determine exactly which statemtn of the batch caused the failure (or
	 * failures).
	 * 
	 * @return the root BatchUpdateException
	 */
	public BatchUpdateException getBatchUpdateException() {
		return batchUpdateException;
	}

	/**
	 * Returns a list of BatchResult objects. There will be one entry in the
	 * list for each successful sub-batch executed before the failing batch.
	 * 
	 * @return the previously successful batch results (may be an empty list if
	 *         no batch has executed successfully)
	 */
	@SuppressWarnings("rawtypes")
	public List getSuccessfulBatchResults() {
		return successfulBatchResults;
	}

	/**
	 * Returns the SQL statement that caused the failure (not the parameters)
	 * 
	 * @return the failing SQL string
	 */
	public String getFailingSqlStatement() {
		return failingSqlStatement;
	}

	/**
	 * Returns the statement id of the statement that caused the failure
	 * 
	 * @return the statement id
	 */
	public String getFailingStatementId() {
		return failingStatementId;
	}
}
