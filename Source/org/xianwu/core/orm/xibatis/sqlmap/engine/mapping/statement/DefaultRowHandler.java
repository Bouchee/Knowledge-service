package org.xianwu.core.orm.xibatis.sqlmap.engine.mapping.statement;

import java.util.ArrayList;
import java.util.List;

import org.xianwu.core.orm.xibatis.sqlmap.client.event.RowHandler;

public class DefaultRowHandler implements RowHandler {

	@SuppressWarnings("rawtypes")
	private List list = new ArrayList();

	@SuppressWarnings("unchecked")
	public void handleRow(Object valueObject) {
		list.add(valueObject);
	}

	@SuppressWarnings("rawtypes")
	public List getList() {
		return list;
	}

	@SuppressWarnings("rawtypes")
	public void setList(List list) {
		this.list = list;
	}

}
