package org.xianwu.dec.admin.web.milling;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.xianwu.core.mvc.xstruts.action.ActionForm;
import org.xianwu.core.mvc.xstruts.action.ActionForward;
import org.xianwu.core.mvc.xstruts.action.ActionMapping;
import org.xianwu.core.web.BizAction;

/**
 * 铣削系统管理
 * 
 * @author XianwuFu
 * @since 2013-01-01
 * @see BizAction
 */
public class MillingAction extends BizAction {
	/**
	 * 铣削系统管理
	 * 
	 * @param
	 * @return
	 */
	public ActionForward init(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		return mapping.findForward("millingView");
	}

}
