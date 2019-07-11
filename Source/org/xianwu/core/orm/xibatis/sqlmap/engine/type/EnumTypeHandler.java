package org.xianwu.core.orm.xibatis.sqlmap.engine.type;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * String implementation of TypeHandler
 */
public class EnumTypeHandler extends BaseTypeHandler implements TypeHandler {

	@SuppressWarnings("rawtypes")
	private Class type;

	@SuppressWarnings("rawtypes")
	public EnumTypeHandler(Class type) {
		this.type = type;
	}

	public void setParameter(PreparedStatement ps, int i, Object parameter, String jdbcType) throws SQLException {
		ps.setString(i, parameter.toString());
	}

	@SuppressWarnings("unchecked")
	public Object getResult(ResultSet rs, String columnName) throws SQLException {
		Object s = rs.getString(columnName);
		if (rs.wasNull()) {
			return null;
		} else {
			return Enum.valueOf(type, (String) s);
		}
	}

	@SuppressWarnings("unchecked")
	public Object getResult(ResultSet rs, int columnIndex) throws SQLException {
		Object s = rs.getString(columnIndex);
		if (rs.wasNull()) {
			return null;
		} else {
			return Enum.valueOf(type, (String) s);
		}
	}

	@SuppressWarnings("unchecked")
	public Object getResult(CallableStatement cs, int columnIndex) throws SQLException {
		Object s = cs.getString(columnIndex);
		if (cs.wasNull()) {
			return null;
		} else {
			return Enum.valueOf(type, (String) s);
		}
	}

	@SuppressWarnings("unchecked")
	public Object valueOf(String s) {
		return Enum.valueOf(type, (String) s);
	}

}