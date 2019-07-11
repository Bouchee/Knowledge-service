package org.xianwu.core.orm.xibatis.sqlmap.engine.datasource;

import java.util.Map;

import javax.sql.DataSource;

import org.xianwu.core.orm.xibatis.common.jdbc.SimpleDataSource;

/**
 * DataSourceFactory implementation for the iBATIS SimpleDataSource
 */
public class SimpleDataSourceFactory implements DataSourceFactory {

	private DataSource dataSource;

	@SuppressWarnings("rawtypes")
	public void initialize(Map map) {
		dataSource = new SimpleDataSource(map);
	}

	public DataSource getDataSource() {
		return dataSource;
	}

}
