package org.xianwu.core.orm.xibatis.sqlmap.engine.datasource;

import java.util.Hashtable;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import org.xianwu.core.orm.xibatis.sqlmap.client.SqlMapException;

/**
 * DataSourceFactory implementation for JNDI
 */
public class JndiDataSourceFactory implements DataSourceFactory {

	private DataSource dataSource;

	@SuppressWarnings("rawtypes")
	public void initialize(Map properties) {
		try {
			InitialContext initCtx = null;
			Hashtable context = getContextProperties(properties);

			if (context == null) {
				initCtx = new InitialContext();
			} else {
				initCtx = new InitialContext(context);
			}

			if (properties.containsKey("DataSource")) {
				dataSource = (DataSource) initCtx.lookup((String) properties.get("DataSource"));
			} else if (properties.containsKey("DBJndiContext")) { // LEGACY
																	// --Backward
																	// compatibility
				dataSource = (DataSource) initCtx.lookup((String) properties.get("DBJndiContext"));
			} else if (properties.containsKey("DBFullJndiContext")) { // LEGACY
																		// --Backward
																		// compatibility
				dataSource = (DataSource) initCtx.lookup((String) properties.get("DBFullJndiContext"));
			} else if (properties.containsKey("DBInitialContext") && properties.containsKey("DBLookup")) { // LEGACY
																											// --Backward
																											// compatibility
				Context ctx = (Context) initCtx.lookup((String) properties.get("DBInitialContext"));
				dataSource = (DataSource) ctx.lookup((String) properties.get("DBLookup"));
			}

		} catch (NamingException e) {
			throw new SqlMapException("There was an error configuring JndiDataSourceTransactionPool. Cause: " + e, e);
		}
	}

	public DataSource getDataSource() {
		return dataSource;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	private static Hashtable getContextProperties(Map allProps) {
		final String PREFIX = "context.";
		Hashtable contextProperties = null;
		Iterator keys = allProps.keySet().iterator();
		while (keys.hasNext()) {
			String key = (String) keys.next();
			String value = (String) allProps.get(key);
			if (key.startsWith(PREFIX)) {
				if (contextProperties == null) {
					contextProperties = new Properties();
				}
				contextProperties.put(key.substring(PREFIX.length()), value);
			}
		}
		return contextProperties;
	}

}
