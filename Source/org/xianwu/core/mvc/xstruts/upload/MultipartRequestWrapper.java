package org.xianwu.core.mvc.xstruts.upload;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

import java.util.Collection;
import java.util.Collections;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Vector;

/**
 * <p>
 * This class functions as a wrapper around HttpServletRequest to provide
 * working getParameter methods for multipart requests.
 * </p>
 */
public class MultipartRequestWrapper extends HttpServletRequestWrapper {
	/**
	 * <p>
	 * The parameters for this multipart request
	 * </p>
	 */
	@SuppressWarnings("rawtypes")
	protected Map parameters;

	@SuppressWarnings("rawtypes")
	public MultipartRequestWrapper(HttpServletRequest request) {
		super(request);
		this.parameters = new HashMap();
	}

	/**
	 * <p>
	 * Sets a parameter for this request. The parameter is actually separate
	 * from the request parameters, but calling on the getParameter() methods of
	 * this class will work as if they weren't.
	 * </p>
	 */
	@SuppressWarnings("unchecked")
	public void setParameter(String name, String value) {
		String[] mValue = (String[]) parameters.get(name);

		if (mValue == null) {
			mValue = new String[0];
		}

		String[] newValue = new String[mValue.length + 1];

		System.arraycopy(mValue, 0, newValue, 0, mValue.length);
		newValue[mValue.length] = value;

		parameters.put(name, newValue);
	}

	/**
	 * <p>
	 * Attempts to get a parameter for this request. It first looks in the
	 * underlying HttpServletRequest object for the parameter, and if that
	 * doesn't exist it looks for the parameters retrieved from the multipart
	 * request
	 * </p>
	 */
	public String getParameter(String name) {
		String value = getRequest().getParameter(name);

		if (value == null) {
			String[] mValue = (String[]) parameters.get(name);

			if ((mValue != null) && (mValue.length > 0)) {
				value = mValue[0];
			}
		}

		return value;
	}

	/**
	 * <p>
	 * Returns the names of the parameters for this request. The enumeration
	 * consists of the normal request parameter names plus the parameters read
	 * from the multipart request
	 * </p>
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Enumeration getParameterNames() {
		Enumeration baseParams = getRequest().getParameterNames();
		Vector list = new Vector();

		while (baseParams.hasMoreElements()) {
			list.add(baseParams.nextElement());
		}

		Collection multipartParams = parameters.keySet();
		Iterator iterator = multipartParams.iterator();

		while (iterator.hasNext()) {
			list.add(iterator.next());
		}

		return Collections.enumeration(list);
	}

	/**
	 * <p>
	 * Returns the values of a parameter in this request. It first looks in the
	 * underlying HttpServletRequest object for the parameter, and if that
	 * doesn't exist it looks for the parameter retrieved from the multipart
	 * request.
	 * </p>
	 */
	public String[] getParameterValues(String name) {
		String[] value = getRequest().getParameterValues(name);

		if (value == null) {
			value = (String[]) parameters.get(name);
		}

		return value;
	}

	/**
	 * <p>
	 * Combines the parameters stored here with those in the underlying request.
	 * If paramater values in the underlying request take precedence over those
	 * stored here.
	 * </p>
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public Map getParameterMap() {
		Map map = new HashMap(parameters);

		map.putAll(getRequest().getParameterMap());

		return map;
	}
}
