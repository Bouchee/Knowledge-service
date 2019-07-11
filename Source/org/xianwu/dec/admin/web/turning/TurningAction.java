package org.xianwu.dec.admin.web.turning;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.xianwu.core.mvc.xstruts.action.ActionForm;
import org.xianwu.core.mvc.xstruts.action.ActionForward;
import org.xianwu.core.mvc.xstruts.action.ActionMapping;
import org.xianwu.core.web.BizAction;

/**
 * 车削系统管理
 * 
 * @author XianwuFu
 * @since 2013-01-01
 * @see BizAction
 */
public class TurningAction extends BizAction {
	/**
	 * 车削系统管理
	 * 
	 * @param
	 * @return
	 */
	public ActionForward init(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		return mapping.findForward("turningView");
	}

}
