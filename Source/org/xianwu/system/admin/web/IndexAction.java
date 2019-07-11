package org.xianwu.system.admin.web;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.xianwu.core.json.JsonHelper;
import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.SpringBeanLoader;
import org.xianwu.core.mvc.xstruts.action.ActionForm;
import org.xianwu.core.mvc.xstruts.action.ActionForward;
import org.xianwu.core.mvc.xstruts.action.ActionMapping;
import org.xianwu.core.util.Constants;
import org.xianwu.core.util.Utils;
import org.xianwu.core.web.BizAction;
import org.xianwu.core.web.CommonActionForm;
import org.xianwu.system.admin.service.OrganizationService;
import org.xianwu.system.admin.service.UserService;
import org.xianwu.system.common.dao.vo.UserInfoVo;

/**
 * 首页Action
 * 
 * @author XianwuFu
 * @since 2013-01-01
 * @see BizAction
 */
public class IndexAction extends BizAction {

	private OrganizationService organizationService = (OrganizationService) SpringBeanLoader.getSpringBean("organizationService");

	/**
	 * 首页初始化
	 * 
	 * @param
	 * @return
	 */
	public ActionForward indexInit(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		request.setAttribute("sysTitle", getParamValue("SYS_TITLE", request));
		request.setAttribute("westTitle", getParamValue("WEST_NAVIGATE_TITLE", request));
		String viewString = "indexView";

		if (getSessionContainer(request).getUserInfo() == null) {// 没有登录
			return mapping.findForward("index2loginView");
		}

		String userLayout = getSessionContainer(request).getUserInfo().getLayout();
		if (Utils.isNotEmpty(userLayout)) {
			if (userLayout.equals(Constants.APP_LAYOUT_DESKTOP)) {
				viewString = "desktopView";
			} else if (userLayout.equals(Constants.APP_LAYOUT_CLASSIC)) {
				viewString = "indexView";
			}
		} else {
			String appLayout = getParamValue("APP_LAYOUT", request);
			if (appLayout.equals(Constants.APP_LAYOUT_DESKTOP)) {
				viewString = "desktopView";
			} else if (appLayout.equals(Constants.APP_LAYOUT_CLASSIC)) {
				viewString = "indexView";
			} else if (appLayout.equals(Constants.APP_LAYOUT_RANDOM)) {
				if (java.lang.Math.random() < 0.5) {
					viewString = "indexView";
				} else {
					viewString = "desktopView";
				}
			} else {
				viewString = "desktopView";
			}
		}
		return mapping.findForward(viewString);
	}

	/**
	 * 欢迎页面初始化
	 * 
	 * @param
	 * @return
	 */
	public ActionForward preferencesInit(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {

		return mapping.findForward("welcomeView");
	}

	/**
	 * 保存用户自定义皮肤
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public ActionForward saveUserTheme(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Dto dto = new BaseDto();
		String theme = request.getParameter("theme");
		dto.put("userid", super.getSessionContainer(request).getUserInfo().getUserid());
		dto.put("theme", theme);
		Dto outDto = organizationService.saveUserTheme(dto);
		String jsonString = JsonHelper.encodeObject2Json(outDto);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 保存用户自定义布局
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public ActionForward saveUserLayout(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Dto dto = new BaseDto();
		String layout = request.getParameter("layout");
		dto.put("userid", super.getSessionContainer(request).getUserInfo().getUserid());
		dto.put("layout", layout);
		Dto outDto = organizationService.saveUserLayout(dto);
		UserInfoVo userInfoVo = getSessionContainer(request).getUserInfo();
		userInfoVo.setLayout(layout);
		getSessionContainer(request).setUserInfo(userInfoVo);
		String jsonString = JsonHelper.encodeObject2Json(outDto);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 保存用户自定义桌面背景
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public ActionForward saveUserBackground(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Dto dto = new BaseDto();
		String background = request.getParameter("background");
		dto.put("userid", super.getSessionContainer(request).getUserInfo().getUserid());
		dto.put("background", background);
		Dto outDto = organizationService.saveUserBackground(dto);
		String jsonString = JsonHelper.encodeObject2Json(outDto);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 加载当前登录用户信息
	 * 
	 * @param
	 * @return
	 */
	public ActionForward loadUserInfo(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		UserInfoVo userInfoVo = getSessionContainer(request).getUserInfo();
		Dto inDto = new BaseDto();
		Utils.copyPropFromBean2Dto(userInfoVo, inDto);
		Dto outDto = (BaseDto) g4Reader.queryForObject("User.getUserInfoByKey", inDto);
		outDto.remove("password");
		String jsonString = JsonHelper.encodeDto2FormLoadJson(outDto, null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 修改当前登录用户信息
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public ActionForward updateUserInfo(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm cForm = (CommonActionForm) form;
		UserInfoVo userInfoVo = getSessionContainer(request).getUserInfo();
		UserService service = (UserService) getService("userService");
		Dto indDto = cForm.getParamAsDto(request);
		Dto outDto = new BaseDto(Constants.TRUE);
		outDto.put("flag", Constants.SUCCESS);
		String password = Utils.encryptBasedDes(indDto.getAsString("password2"));
		if (password.equals(userInfoVo.getPassword())) {
			service.updateUserItem4IndexPage(indDto);
			outDto.put("flag", Constants.SUCCESS);
			userInfoVo.setPassword(Utils.encryptBasedDes(indDto.getAsString("password1")));
			getSessionContainer(request).setUserInfo(userInfoVo);
		} else {
			outDto.setSuccess(Constants.FALSE);
			outDto.put("flag", Constants.FAILURE);
		}
		write(outDto.toJson(), response);
		return mapping.findForward(null);
	}

	/**
	 * 解锁系统
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public ActionForward unlockSystem(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm cForm = (CommonActionForm) form;
		UserInfoVo userInfoVo = getSessionContainer(request).getUserInfo();
		Dto indDto = cForm.getParamAsDto(request);
		String password = Utils.encryptBasedDes(indDto.getAsString("password"));
		Dto outDto = new BaseDto(Constants.TRUE);
		if (password.equals(userInfoVo.getPassword())) {
			outDto.put("flag", Constants.SUCCESS);
		} else {
			outDto.put("flag", Constants.FAILURE);
		}
		write(outDto.toJson(), response);
		return mapping.findForward(null);
	}

	@SuppressWarnings("rawtypes")
	public ActionForward queryAbout4Manager(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		// super.setSessionAttribute(request, "QUERYCATALOGS4EXPORT_QUERYDTO",
		// dto);
		List list = g4Reader.queryForPage("Organization.queryAbout4Manager", dto);
		String jsonString = JsonHelper.encodeList2PageJson(list, list.size(), null);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}
}
