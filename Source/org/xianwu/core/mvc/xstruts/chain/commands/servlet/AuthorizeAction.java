package org.xianwu.core.mvc.xstruts.chain.commands.servlet;

import javax.servlet.http.HttpServletRequest;

import org.xianwu.core.mvc.xstruts.action.ActionServlet;
import org.xianwu.core.mvc.xstruts.chain.commands.AbstractAuthorizeAction;
import org.xianwu.core.mvc.xstruts.chain.contexts.ActionContext;
import org.xianwu.core.mvc.xstruts.chain.contexts.ServletActionContext;
import org.xianwu.core.mvc.xstruts.config.ActionConfig;
import org.xianwu.core.mvc.xstruts.util.MessageResources;

/**
 * <p>
 * Determine if the action is authorized for the given roles.
 * </p>
 * 
 * @version $Rev: 421119 $ $Date: 2005-11-12 13:01:44 -0500 (Sat, 12 Nov 2005) $
 */
public class AuthorizeAction extends AbstractAuthorizeAction {
	// ------------------------------------------------------- Protected Methods
	protected boolean isAuthorized(ActionContext context, String[] roles, ActionConfig mapping) throws Exception {
		// Identify the HTTP request object
		ServletActionContext servletActionContext = (ServletActionContext) context;
		HttpServletRequest request = servletActionContext.getRequest();

		// Check the current user against the list of required roles
		for (int i = 0; i < roles.length; i++) {
			if (request.isUserInRole(roles[i])) {
				return (true);
			}
		}

		// Default to unauthorized
		return (false);
	}

	protected String getErrorMessage(ActionContext context, ActionConfig actionConfig) {
		ServletActionContext servletActionContext = (ServletActionContext) context;

		// Retrieve internal message resources
		ActionServlet servlet = servletActionContext.getActionServlet();
		MessageResources resources = servlet.getInternal();

		return resources.getMessage("notAuthorized", actionConfig.getPath());
	}
}
