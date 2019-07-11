package org.xianwu.core.orm.xibatis.sqlmap.engine.datasource;

import java.util.Map;

import javax.sql.DataSource;

import org.xianwu.core.orm.xibatis.common.jdbc.DbcpConfiguration;

/**
 * DataSourceFactory implementation for DBCP
 */
public class DbcpDataSourceFactory implements DataSourceFactory {

	private DataSource dataSource;

	@SuppressWarnings("rawtypes")
	public void initialize(Map map) {
		DbcpConfiguration dbcp = new DbcpConfiguration(map);
		dataSource = dbcp.getDataSource();
	}

	public DataSource getDataSource() {
		return dataSource;
	}

}
