package org.xianwu.core.orm.xibatis.sqlmap.engine.accessplan;

import org.xianwu.core.orm.xibatis.common.beans.ClassInfo;
import org.xianwu.core.orm.xibatis.common.beans.Invoker;

/**
 * Base implementation of the AccessPlan interface
 */
public abstract class BaseAccessPlan implements AccessPlan {

	@SuppressWarnings("rawtypes")
	protected Class clazz;
	protected String[] propertyNames;
	protected ClassInfo info;

	@SuppressWarnings("rawtypes")
	BaseAccessPlan(Class clazz, String[] propertyNames) {
		this.clazz = clazz;
		this.propertyNames = propertyNames;
		info = ClassInfo.getInstance(clazz);
	}

	@SuppressWarnings("rawtypes")
	protected Class[] getTypes(String[] propertyNames) {
		Class[] types = new Class[propertyNames.length];
		for (int i = 0; i < propertyNames.length; i++) {
			types[i] = info.getGetterType(propertyNames[i]);
		}
		return types;
	}

	protected Invoker[] getGetters(String[] propertyNames) {
		Invoker[] methods = new Invoker[propertyNames.length];
		for (int i = 0; i < propertyNames.length; i++) {
			methods[i] = info.getGetInvoker(propertyNames[i]);
		}
		return methods;
	}

	protected Invoker[] getSetters(String[] propertyNames) {
		Invoker[] methods = new Invoker[propertyNames.length];
		for (int i = 0; i < propertyNames.length; i++) {
			methods[i] = info.getSetInvoker(propertyNames[i]);
		}
		return methods;
	}

	protected String[] getGetterNames(String[] propertyNames) {
		String[] names = new String[propertyNames.length];
		for (int i = 0; i < propertyNames.length; i++) {
			names[i] = info.getGetter(propertyNames[i]).getName();
		}
		return names;
	}

	protected String[] getSetterNames(String[] propertyNames) {
		String[] names = new String[propertyNames.length];
		for (int i = 0; i < propertyNames.length; i++) {
			names[i] = info.getSetter(propertyNames[i]).getName();
		}
		return names;
	}

}
