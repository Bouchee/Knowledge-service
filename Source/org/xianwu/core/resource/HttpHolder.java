package org.xianwu.core.resource;

import javax.servlet.FilterChain;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * HttpHolder
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class HttpHolder {
	@SuppressWarnings("rawtypes")
	private static ThreadLocal requestThreadLocal = new ThreadLocal();
	@SuppressWarnings("rawtypes")
	private static ThreadLocal responseThreadLocal = new ThreadLocal();
	private static ServletContext servletContext = null;
	@SuppressWarnings("rawtypes")
	private static ThreadLocal filterChainLocal = new ThreadLocal();

	private HttpHolder() {
	}

	@SuppressWarnings("unchecked")
	public static void setRequest(HttpServletRequest pRequest) {
		requestThreadLocal.set(pRequest);
	}

	@SuppressWarnings("unchecked")
	public static void setResponse(HttpServletResponse pResponse) {
		responseThreadLocal.set(pResponse);
	}

	public static void setServletContext(ServletContext pServletContext) {
		servletContext = pServletContext;
	}

	@SuppressWarnings("unchecked")
	public static void setFilterChain(FilterChain pFilterChain) {
		filterChainLocal.set(pFilterChain);
	}

	public static ServletContext getServletContext() {
		return servletContext;
	}

	public static FilterChain getFilterChain() {
		return (FilterChain) filterChainLocal.get();
	}

	public static HttpServletRequest getRequest() {
		return (HttpServletRequest) requestThreadLocal.get();
	}

	public static HttpServletResponse getResponse() {
		return (HttpServletResponse) responseThreadLocal.get();
	}

}
