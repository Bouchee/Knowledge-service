package org.xianwu.system.admin.web;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.mvc.xstruts.action.ActionForm;
import org.xianwu.core.mvc.xstruts.action.ActionForward;
import org.xianwu.core.mvc.xstruts.action.ActionMapping;
import org.xianwu.core.util.Utils;
import org.xianwu.core.web.BizAction;
import org.xianwu.core.web.CommonActionForm;
import org.xianwu.core.web.SessionContainer;
import org.xianwu.core.web.SessionListener;
import org.xianwu.system.admin.service.MonitorService;

/**
 * HTTP会话监控
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class HttpSessionMonitorAction extends BizAction {

	private MonitorService monitorService = (MonitorService) getService("monitorService");

	/**
	 * 会话监控页面初始化
	 * 
	 * @param
	 * @return
	 */
	public ActionForward init(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		return mapping.findForward("sessionMonitorView");
	}

	/**
	 * 获取当前活动的用户列表
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public ActionForward getSessionList(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm cForm = (CommonActionForm) form;
		Dto dto = cForm.getParamAsDto(request);
		List sessionList = g4Reader.queryForPage("Monitor.queryHttpSessions", dto);
		Integer pageCount = (Integer) g4Reader.queryForObject("Monitor.queryHttpSessionsForPageCount", dto);
		String jsonString = encodeList2PageJson(sessionList, pageCount, null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 杀死会话
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public ActionForward killSession(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String strChecked = request.getParameter("strChecked");
		String[] sessionid = strChecked.split(",");
		Dto delDto = new BaseDto();
		String msg = "选中的会话已杀死!";
		for (int i = 0; i < sessionid.length; i++) {
			String seid = sessionid[i];
			delDto.put("sessionid", seid);
			if (!seid.equalsIgnoreCase(request.getSession().getId())) {
				monitorService.deleteHttpSession(delDto);
				HttpSession session = SessionListener.getSessionByID(seid);
				if (Utils.isNotEmpty(seid)) {
					SessionContainer sessionContainer = (SessionContainer) session.getAttribute("SessionContainer");
					sessionContainer.setUserInfo(null); // 配合RequestFilter进行拦截
					sessionContainer.cleanUp();
				}
			} else {
				msg += " 提示：您不能结束属于自己的会话!";
			}
		}
		setOkTipMsg(msg, response);
		return mapping.findForward(null);
	}
}
