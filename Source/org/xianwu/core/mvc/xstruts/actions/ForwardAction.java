package org.xianwu.core.mvc.xstruts.actions;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.xianwu.core.mvc.xstruts.action.ActionForm;
import org.xianwu.core.mvc.xstruts.action.ActionForward;
import org.xianwu.core.mvc.xstruts.action.ActionMapping;

public class ForwardAction extends BaseAction {
	// ----------------------------------------------------- Instance Variables

	/**
	 * Process the specified HTTP request, and create the corresponding HTTP
	 * response (or forward to another web component that will create it).
	 * Return an <code>ActionForward</code> instance describing where and how
	 * control should be forwarded, or <code>null</code> if the response has
	 * already been completed.
	 * 
	 * @param mapping
	 *            The ActionMapping used to select this instance
	 * @param form
	 *            The optional ActionForm bean for this request (if any)
	 * @param request
	 *            The HTTP request we are processing
	 * @param response
	 *            The HTTP response we are creating
	 * @return The forward to which control should be transferred, or
	 *         <code>null</code> if the response has been completed.
	 * @throws Exception
	 *             if an error occurs
	 */
	public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// Create a RequestDispatcher the corresponding resource
		String path = mapping.getParameter();

		if (path == null) {
			throw new ServletException(messages.getMessage("forward.path"));
		}

		// Let the controller handle the request
		ActionForward retVal = new ActionForward(path);

		return retVal;
	}
}
