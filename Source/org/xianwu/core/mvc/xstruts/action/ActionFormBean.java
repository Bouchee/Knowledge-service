package org.xianwu.core.mvc.xstruts.action;

import org.xianwu.core.mvc.xstruts.config.FormBeanConfig;

public class ActionFormBean extends FormBeanConfig {
	/**
	 * 
	 */
	private static final long serialVersionUID = -5994907881268905797L;

	/**
	 * <p>
	 * Construct an instance with default vaslues.
	 * </p>
	 */
	public ActionFormBean() {
		super();
	}

	/**
	 * <p>
	 * Construct an instance with the specified values.
	 * </p>
	 * 
	 * @param name
	 *            Form bean name
	 * @param type
	 *            Fully qualified class name
	 */
	public ActionFormBean(String name, String type) {
		super();
		setName(name);
		setType(type);
	}
}
