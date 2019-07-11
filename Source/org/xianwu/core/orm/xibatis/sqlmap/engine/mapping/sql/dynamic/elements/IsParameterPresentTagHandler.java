package org.xianwu.core.orm.xibatis.sqlmap.engine.mapping.sql.dynamic.elements;

public class IsParameterPresentTagHandler extends ConditionalTagHandler {

	public boolean isCondition(SqlTagContext ctx, SqlTag tag, Object parameterObject) {
		return parameterObject != null;
	}

}
