package org.xianwu.core.mvc.xstruts.chain.commands;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.xianwu.core.mvc.xstruts.chain.contexts.ActionContext;
import org.xianwu.core.mvc.xstruts.config.ActionConfig;
import org.xianwu.core.mvc.xstruts.config.ForwardConfig;
import org.xianwu.core.mvc.xstruts.config.ModuleConfig;

/**
 * <p>
 * Select and cache a <code>ForwardConfig</code> that returns us to the input
 * page for the current action, if any.
 * </p>
 * 
 * @version $Rev: 421119 $ $Date: 2005-06-04 10:58:46 -0400 (Sat, 04 Jun 2005) $
 */
public abstract class AbstractSelectInput extends ActionCommandBase {
	// ------------------------------------------------------ Instance Variables

	/**
	 * <p>
	 * Provide Commons Logging instance for this class.
	 * </p>
	 */
	private static final Log LOG = LogFactory.getLog(AbstractSelectInput.class);

	// ---------------------------------------------------------- Public Methods

	/**
	 * <p>
	 * Select and cache a <code>ForwardConfig</code> for the input page for the
	 * current request.
	 * </p>
	 * 
	 * @param actionCtx
	 *            The <code>Context</code> for the current request
	 * @return <code>false</code> so that processing continues
	 * @throws Exception
	 *             if thrown by the Action class
	 */
	public boolean execute(ActionContext actionCtx) throws Exception {
		// Skip processing if the current request is valid
		Boolean valid = actionCtx.getFormValid();

		if ((valid != null) && valid.booleanValue()) {
			return (false);
		}

		// Acquire configuration objects that we need
		ActionConfig actionConfig = actionCtx.getActionConfig();
		ModuleConfig moduleConfig = actionConfig.getModuleConfig();

		// Cache an ForwardConfig back to our input page
		ForwardConfig forwardConfig;
		String input = actionConfig.getInput();

		if (moduleConfig.getControllerConfig().getInputForward()) {
			if (LOG.isTraceEnabled()) {
				LOG.trace("Finding ForwardConfig for '" + input + "'");
			}

			forwardConfig = actionConfig.findForwardConfig(input);

			if (forwardConfig == null) {
				forwardConfig = moduleConfig.findForwardConfig(input);
			}
		} else {
			if (LOG.isTraceEnabled()) {
				LOG.trace("Delegating to forward() for '" + input + "'");
			}

			forwardConfig = forward(actionCtx, moduleConfig, input);
		}

		if (LOG.isDebugEnabled()) {
			LOG.debug("Forwarding back to " + forwardConfig);
		}

		actionCtx.setForwardConfig(forwardConfig);

		return (false);
	}

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
	 * @return ForwardConfig representing destination
	 */
	protected abstract ForwardConfig forward(ActionContext context, ModuleConfig moduleConfig, String uri);
}
