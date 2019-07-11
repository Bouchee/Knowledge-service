package org.xianwu.core.mvc.xstruts.chain.contexts;

import java.util.HashMap;
import java.util.Map;

//  ISSUE: Are there any useful "assert" type methods we could add to this?

/**
 * <p>
 * Implement <code>ActionContext</code> with empty maps for
 * <code>applicationScope</code>, <code>sessionScope</code>,
 * <code>requestScope</code>, and <code>parameterMap</code> properties.
 * </p>
 */
public class MockActionContext extends ActionContextBase {
	@SuppressWarnings("rawtypes")
	private Map applicationScope = new HashMap();
	@SuppressWarnings("rawtypes")
	private Map requestScope = new HashMap();
	@SuppressWarnings("rawtypes")
	private Map sessionScope = new HashMap();
	@SuppressWarnings("rawtypes")
	private Map parameterMap = new HashMap();

	@SuppressWarnings("rawtypes")
	public Map getApplicationScope() {
		return applicationScope;
	}

	@SuppressWarnings("rawtypes")
	public void setApplicationScope(Map applicationScope) {
		this.applicationScope = applicationScope;
	}

	@SuppressWarnings("rawtypes")
	public Map getParameterMap() {
		return parameterMap;
	}

	@SuppressWarnings("rawtypes")
	public void setParameterMap(Map parameterMap) {
		this.parameterMap = parameterMap;
	}

	@SuppressWarnings("rawtypes")
	public Map getRequestScope() {
		return requestScope;
	}

	@SuppressWarnings("rawtypes")
	public void setRequestScope(Map requestScope) {
		this.requestScope = requestScope;
	}

	@SuppressWarnings("rawtypes")
	public Map getSessionScope() {
		return sessionScope;
	}

	@SuppressWarnings("rawtypes")
	public void setSessionScope(Map sessionScope) {
		this.sessionScope = sessionScope;
	}
}
