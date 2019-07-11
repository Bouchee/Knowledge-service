package org.xianwu.core.mvc.xstruts.chain.commands.servlet;

import org.xianwu.core.mvc.xstruts.action.ActionForward;
import org.xianwu.core.mvc.xstruts.chain.commands.AbstractSelectInput;
import org.xianwu.core.mvc.xstruts.chain.contexts.ActionContext;
import org.xianwu.core.mvc.xstruts.config.ForwardConfig;
import org.xianwu.core.mvc.xstruts.config.ModuleConfig;

/**
 * <p>
 * Validate the properties of the form bean for this request. If there are any
 * validation errors, execute the child commands in our chain; otherwise,
 * proceed normally.
 * </p>
 * 
 * @version $Rev: 421119 $ $Date: 2005-05-07 12:11:38 -0400 (Sat, 07 May 2005) $
 */
public class SelectInput extends AbstractSelectInput {
	// ------------------------------------------------------- Protected Methods

	/**
	 * <p>
	 * Create and return a <code>ForwardConfig</code> representing the specified
	 * module-relative destination.
	 * </p>
	 * 
	 * @param context
	 *            The context for this request
	 * @param moduleConfig
	 *            The <code>ModuleConfig</code> for this request
	 * @param uri
	 *            The module-relative URI to be the destination
	 */
	protected ForwardConfig forward(ActionContext context, ModuleConfig moduleConfig, String uri) {
		return (new ActionForward(null, uri, false, moduleConfig.getPrefix()));
	}
}
