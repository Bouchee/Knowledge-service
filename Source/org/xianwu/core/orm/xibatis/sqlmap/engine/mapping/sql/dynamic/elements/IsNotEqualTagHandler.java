package org.xianwu.core.orm.xibatis.sqlmap.engine.mapping.sql.dynamic.elements;

public class IsNotEqualTagHandler extends IsEqualTagHandler {

  public boolean isCondition(SqlTagContext ctx, SqlTag tag, Object parameterObject) {
    return !super.isCondition(ctx, tag, parameterObject);
  }

}
