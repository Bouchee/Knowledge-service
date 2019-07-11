package org.xianwu.system.admin.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.mvc.xstruts.action.ActionForm;
import org.xianwu.core.mvc.xstruts.action.ActionForward;
import org.xianwu.core.mvc.xstruts.action.ActionMapping;
import org.xianwu.core.util.Utils;
import org.xianwu.core.web.BizAction;
import org.xianwu.core.web.SessionListener;
import org.xianwu.core.web.util.WebUtils;
import org.xianwu.system.admin.service.MonitorService;
import org.xianwu.system.admin.service.OrganizationService;
import org.xianwu.system.common.dao.vo.UserInfoVo;
import org.xianwu.system.common.util.idgenerator.IdHelper;

/**
 * 登录页面Action
 * 
 * @author XianwuFu
 * @since 2013-01-01
 * @see BizAction
 */
public class LoginAction extends BizAction {

	private static Log log = LogFactory.getLog(LoginAction.class);

	private OrganizationService organizationService = (OrganizationService) super.getService("organizationService");

	private MonitorService monitorService = (MonitorService) super.getService("monitorService");

	/**
	 * 登陆页面初始化
	 * 
	 * @param
	 * @return
	 */
	public ActionForward init(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String bannerPath = getParamValue("LOGIN_WINDOW_BANNER", request);
		bannerPath = request.getContextPath() + bannerPath;
		request.setAttribute("bannerPath", bannerPath);
		request.setAttribute("sysTitle", getParamValue("SYS_TITLE", request));
		return mapping.findForward("loginView");
	}

	/**
	 * 登陆身份验证
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public ActionForward login(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String account = request.getParameter("account");
		String password = request.getParameter("password");
		password = Utils.encryptBasedDes(password);
		log.info("帐户[" + account + "]正尝试登陆系统...");
		Dto dto = new BaseDto();
		dto.put("account", account);
		Dto outDto = organizationService.getUserInfo(dto);
		UserInfoVo userInfo = (UserInfoVo) outDto.get("userInfo");
		Dto jsonDto = new BaseDto();
		if (Utils.isEmpty(userInfo)) {
			jsonDto.put("success", new Boolean(false));
			jsonDto.put("msg", "1");
			// jsonDto.put("msg", "帐号输入错误,请重新输入!");
			jsonDto.put("errorType", "1");
			log.warn("帐户[" + account + "]登陆失败.(失败原因：不存在此帐户)");
			write(jsonDto.toJson(), response);
			return mapping.findForward("");
		}
		if (!password.equals(userInfo.getPassword())) {
			jsonDto.put("success", new Boolean(false));
			jsonDto.put("msg", "2");
			// jsonDto.put("msg", "密码输入错误,请重新输入!");
			jsonDto.put("errorType", "2");
			log.warn(userInfo.getUsername() + "[" + userInfo.getAccount() + "]" + "登录系统失败(失败原因：密码输入错误)");
			write(jsonDto.toJson(), response);
			return mapping.findForward("");
		}
		String multiSession = WebUtils.getParamValue("MULTI_SESSION", request);
		if ("0".equals(multiSession)) {
			Integer sessions = (Integer) g4Reader.queryForObject("Organization.countHttpSessions", account);
			if (sessions.intValue() > 0) {
				jsonDto.put("success", new Boolean(false));
				jsonDto.put("msg", "3");
				// jsonDto.put("msg", "此用户已经登录,系统不允许建立多个会话连接!");
				jsonDto.put("errorType", "3");
				log.warn(userInfo.getUsername() + "[" + userInfo.getAccount() + "]" + "登录系统失败(失败原因：此用户已经登录,系统参数配置为不允许一个用户建立多个连接)");
				write(jsonDto.toJson(), response);
				return mapping.findForward("");
			}
		}
		userInfo.setSessionID(request.getSession().getId());
		userInfo.setSessionCreatedTime(Utils.getCurrentTime());
		userInfo.setLoginIP(request.getRemoteAddr());
		userInfo.setExplorer(Utils.getClientExplorerType(request));
		if (!checkMultiUser(userInfo, request)) {
			jsonDto.put("success", new Boolean(false));
			jsonDto.put("msg", "4");
			// jsonDto.put("msg", "不允许在同一客户端上同时以不同帐户登录系统,请先退出你已经登录的帐户后再尝试登录!");
			jsonDto.put("errorType", "1");
			log.warn("帐户[" + account + "]登陆失败.(失败原因：不允许在同一客户端上同时以不同帐户登录系统.请先退出你已经登录的帐户后再尝试登录)");
			write(jsonDto.toJson(), response);
			return mapping.findForward("");
		}
		super.getSessionContainer(request).setUserInfo(userInfo);
		log.info(userInfo.getUsername() + "[" + userInfo.getAccount() + "]" + "成功登录系统!创建了一个有效Session连接,会话ID:[" + request.getSession().getId() + "]" + Utils.getCurrentTime());
		SessionListener.addSession(request.getSession(), userInfo); // 保存有效Session
		if (g4PHelper.getValue("requestMonitor", "0").equals("1")) {
			saveLoginEvent(userInfo, request);
		}
		jsonDto.put("success", new Boolean(true));
		jsonDto.put("userid", userInfo.getUserid());
		write(jsonDto.toJson(), response);
		return mapping.findForward("");
	}

	/**
	 * 回写Cookie
	 * 
	 * @param userInfoVo
	 * @param request
	 */
	@SuppressWarnings("unused")
	private void writeCookie2Client(UserInfoVo userInfoVo, HttpServletRequest request) {

	}

	/**
	 * 不允许在同一客户端上不同帐户同时以同种浏览器登录系统<br>
	 * 规避同一客户端同时以不同账户使用同种浏览器登录系统窜账户的情况
	 * 
	 * @return
	 */
	private Boolean checkMultiUser(UserInfoVo userInfoVo, HttpServletRequest request) {
		boolean allowLogin = true;
		String cookieUserid = WebUtils.getCookieValue(request.getCookies(), "fuxianwu.login.userid", "");
		String sessionid = request.getSession().getId();
		HttpSession httpSession = SessionListener.getSessionByID(sessionid);
		if (Utils.isNotEmpty(httpSession)) {
			// System.out.println(userInfoVo.getSessionCreatedTime());
			// UserInfoVo oldUserInfoVo =
			// WebUtils.getSessionContainer(httpSession).getUserInfo();
			if (!cookieUserid.equals(userInfoVo.getUserid())) {
				allowLogin = false;
			}
		}
		return new Boolean(allowLogin);
	}

	/**
	 * 退出登录
	 * 
	 * @param
	 * @return
	 */
	public ActionForward logout(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		UserInfoVo userInfo = super.getSessionContainer(request).getUserInfo();
		if (Utils.isNotEmpty(userInfo)) {
			if (g4PHelper.getValue("requestMonitor", "0").equals("1")) {
				saveLogoutEvent(userInfo, request);
			}
			log.info(userInfo.getUsername() + "退出了系统!");
			super.getSessionContainer(request).setUserInfo(null);
		}
		if (Utils.isNotEmpty(request.getSession())) {
			request.getSession().invalidate();
		}
		init(mapping, form, request, response);
		return mapping.findForward("loginView");
	}

	/**
	 * 保存登录事件
	 * 
	 * @param userInfo
	 */
	@SuppressWarnings("unchecked")
	private void saveLoginEvent(UserInfoVo userInfo, HttpServletRequest request) {
		Dto dto = new BaseDto();
		dto.put("account", userInfo.getAccount());
		dto.put("activetime", Utils.getCurrentTimeAsNumber());
		dto.put("userid", userInfo.getUserid());
		dto.put("username", userInfo.getUsername());
		dto.put("description", "登录系统");
		dto.put("requestpath", request.getRequestURI());
		dto.put("methodname", request.getParameter("code"));
		dto.put("eventid", IdHelper.getEventID());
		monitorService.saveEvent(dto);
	}

	/**
	 * 保存退出事件
	 * 
	 * @param userInfo
	 */
	@SuppressWarnings("unchecked")
	private void saveLogoutEvent(UserInfoVo userInfo, HttpServletRequest request) {
		Dto dto = new BaseDto();
		dto.put("account", userInfo.getAccount());
		dto.put("activetime", Utils.getCurrentTimeAsNumber());
		dto.put("userid", userInfo.getUserid());
		dto.put("username", userInfo.getUsername());
		dto.put("description", "退出系统");
		dto.put("requestpath", request.getRequestURI());
		dto.put("methodname", request.getParameter("code"));
		dto.put("eventid", IdHelper.getEventID());
		monitorService.saveEvent(dto);
	}

	/**
	 * 修复登录
	 * 
	 * @param userInfo
	 */
	public ActionForward renewLogin(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		UserInfoVo userInfo = super.getSessionContainer(request).getUserInfo();
		if (Utils.isNotEmpty(userInfo)) {
			if (g4PHelper.getValue("requestMonitor", "0").equals("1")) {
				saveLogoutEvent(userInfo, request);
			}
			log.info(userInfo.getUsername() + "被强制清退出系统!");
			super.getSessionContainer(request).setUserInfo(null);
		}
		if (Utils.isNotEmpty(request.getSession())) {
			request.getSession().invalidate();
		}
		setOkTipMsg("清空登录信息成功!", response);
		return mapping.findForward(null);
	}
}
