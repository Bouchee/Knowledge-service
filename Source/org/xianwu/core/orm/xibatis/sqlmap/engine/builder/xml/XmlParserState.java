package org.xianwu.core.orm.xibatis.sqlmap.engine.builder.xml;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.StringTokenizer;

import javax.sql.DataSource;

import org.xianwu.core.orm.xibatis.common.resources.Resources;
import org.xianwu.core.orm.xibatis.sqlmap.engine.config.CacheModelConfig;
import org.xianwu.core.orm.xibatis.sqlmap.engine.config.ParameterMapConfig;
import org.xianwu.core.orm.xibatis.sqlmap.engine.config.ResultMapConfig;
import org.xianwu.core.orm.xibatis.sqlmap.engine.config.SqlMapConfiguration;

public class XmlParserState {

	private SqlMapConfiguration config = new SqlMapConfiguration();

	private Properties globalProps = new Properties();
	private Properties txProps = new Properties();
	private Properties dsProps = new Properties();
	private Properties cacheProps = new Properties();
	private boolean useStatementNamespaces = false;
	@SuppressWarnings("rawtypes")
	private Map sqlIncludes = new HashMap();

	private ParameterMapConfig paramConfig;
	private ResultMapConfig resultConfig;
	private CacheModelConfig cacheConfig;

	private String namespace;
	private DataSource dataSource;

	public SqlMapConfiguration getConfig() {
		return config;
	}

	public void setGlobalProps(Properties props) {
		globalProps = props;
	}

	public Properties getGlobalProps() {
		return globalProps;
	}

	public Properties getTxProps() {
		return txProps;
	}

	public Properties getDsProps() {
		return dsProps;
	}

	public Properties getCacheProps() {
		return cacheProps;
	}

	public void setUseStatementNamespaces(boolean useStatementNamespaces) {
		this.useStatementNamespaces = useStatementNamespaces;
	}

	public boolean isUseStatementNamespaces() {
		return useStatementNamespaces;
	}

	@SuppressWarnings("rawtypes")
	public Map getSqlIncludes() {
		return sqlIncludes;
	}

	public void setNamespace(String namespace) {
		this.namespace = namespace;
	}

	public String applyNamespace(String id) {
		String newId = id;
		if (namespace != null && namespace.length() > 0 && id != null && id.indexOf('.') < 0) {
			newId = namespace + "." + id;
		}
		return newId;
	}

	public CacheModelConfig getCacheConfig() {
		return cacheConfig;
	}

	public void setCacheConfig(CacheModelConfig cacheConfig) {
		this.cacheConfig = cacheConfig;
	}

	public ParameterMapConfig getParamConfig() {
		return paramConfig;
	}

	public void setParamConfig(ParameterMapConfig paramConfig) {
		this.paramConfig = paramConfig;
	}

	public ResultMapConfig getResultConfig() {
		return resultConfig;
	}

	public void setResultConfig(ResultMapConfig resultConfig) {
		this.resultConfig = resultConfig;
	}

	public String getFirstToken(String s) {
		return new StringTokenizer(s, ", ", false).nextToken();
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String[] getAllButFirstToken(String s) {
		List strings = new ArrayList();
		StringTokenizer parser = new StringTokenizer(s, ", ", false);
		parser.nextToken();
		while (parser.hasMoreTokens()) {
			strings.add(parser.nextToken());
		}
		return (String[]) strings.toArray(new String[strings.size()]);
	}

	public void setGlobalProperties(String resource, String url) {
		config.getErrorContext().setActivity("loading global properties");
		try {
			Properties props;
			if (resource != null) {
				config.getErrorContext().setResource(resource);
				props = Resources.getResourceAsProperties(resource);
			} else if (url != null) {
				config.getErrorContext().setResource(url);
				props = Resources.getUrlAsProperties(url);
			} else {
				throw new RuntimeException("The " + "properties"
						+ " element requires either a resource or a url attribute.");
			}

			// Merge properties with those passed in programmatically
			if (props != null) {
				props.putAll(globalProps);
				globalProps = props;
			}
		} catch (Exception e) {
			throw new RuntimeException("Error loading properties.  Cause: " + e, e);
		}
	}

	public DataSource getDataSource() {
		return dataSource;
	}

	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}
}
