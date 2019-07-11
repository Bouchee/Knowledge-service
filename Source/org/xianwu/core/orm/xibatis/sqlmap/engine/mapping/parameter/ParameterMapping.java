package org.xianwu.core.orm.xibatis.sqlmap.engine.mapping.parameter;

import org.xianwu.core.orm.xibatis.common.resources.Resources;
import org.xianwu.core.orm.xibatis.sqlmap.client.SqlMapException;
import org.xianwu.core.orm.xibatis.sqlmap.engine.type.JdbcTypeRegistry;
import org.xianwu.core.orm.xibatis.sqlmap.engine.type.TypeHandler;

public class ParameterMapping {

	private static final String MODE_INOUT = "INOUT";
	private static final String MODE_OUT = "OUT";
	private static final String MODE_IN = "IN";

	private String propertyName;
	private TypeHandler typeHandler;
	private String typeName; // this is used for REF types or user-defined types
	private int jdbcType;
	private String jdbcTypeName;
	private String nullValue;
	private String mode;
	private boolean inputAllowed;
	private boolean outputAllowed;
	@SuppressWarnings("rawtypes")
	private Class javaType;
	private String resultMapName;
	private Integer numericScale;

	private String errorString;

	public ParameterMapping() {
		mode = "IN";
		inputAllowed = true;
		outputAllowed = false;
	}

	public String getNullValue() {
		return nullValue;
	}

	public void setNullValue(String nullValue) {
		this.nullValue = nullValue;
	}

	public String getPropertyName() {
		return propertyName;
	}

	public void setPropertyName(String propertyName) {
		this.errorString = "Check the parameter mapping for the '" + propertyName + "' property.";
		this.propertyName = propertyName;
	}

	public String getErrorString() {
		return errorString;
	}

	public TypeHandler getTypeHandler() {
		return typeHandler;
	}

	public void setTypeHandler(TypeHandler typeHandler) {
		this.typeHandler = typeHandler;
	}

	@SuppressWarnings("rawtypes")
	public Class getJavaType() {
		return javaType;
	}

	@SuppressWarnings("rawtypes")
	public void setJavaType(Class javaType) {
		this.javaType = javaType;
	}

	public String getJavaTypeName() {
		if (javaType == null) {
			return null;
		} else {
			return javaType.getName();
		}
	}

	public void setJavaTypeName(String javaTypeName) {
		try {
			if (javaTypeName == null) {
				this.javaType = null;
			} else {
				this.javaType = Resources.classForName(javaTypeName);
			}
		} catch (ClassNotFoundException e) {
			throw new SqlMapException("Error setting javaType property of ParameterMap.  Cause: " + e, e);
		}
	}

	public int getJdbcType() {
		return jdbcType;
	}

	public String getJdbcTypeName() {
		return jdbcTypeName;
	}

	public void setJdbcTypeName(String jdbcTypeName) {
		this.jdbcTypeName = jdbcTypeName;
		this.jdbcType = JdbcTypeRegistry.getType(jdbcTypeName);
	}

	public String getMode() {
		return mode;
	}

	public void setMode(String mode) {
		this.mode = mode;
		inputAllowed = MODE_IN.equals(mode) || MODE_INOUT.equals(mode);
		outputAllowed = MODE_OUT.equals(mode) || MODE_INOUT.equals(mode);
	}

	public boolean isInputAllowed() {
		return inputAllowed;
	}

	public boolean isOutputAllowed() {
		return outputAllowed;
	}

	/**
	 * user-defined or REF types
	 * 
	 * @return typeName
	 */
	public String getTypeName() {
		return typeName;
	}

	/**
	 * for user-defined or REF types
	 * 
	 * @param typeName
	 */
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

	public String getResultMapName() {
		return resultMapName;
	}

	public void setResultMapName(String resultMapName) {
		this.resultMapName = resultMapName;
	}

	public Integer getNumericScale() {
		return numericScale;
	}

	public void setNumericScale(Integer numericScale) {
		if (numericScale != null && numericScale.intValue() < 0) {
			throw new RuntimeException(
					"Error setting numericScale on parameter mapping.  Cause: scale must be greater than or equal to zero");
		}
		this.numericScale = numericScale;
	}

}
