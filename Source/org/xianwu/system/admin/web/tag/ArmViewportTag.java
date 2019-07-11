package org.xianwu.system.admin.web.tag;

import java.io.StringWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.SpringBeanLoader;
import org.xianwu.core.model.dao.Reader;
import org.xianwu.core.tplengine.DefaultTemplate;
import org.xianwu.core.tplengine.FileTemplate;
import org.xianwu.core.tplengine.TemplateEngine;
import org.xianwu.core.tplengine.TemplateEngineFactory;
import org.xianwu.core.tplengine.TemplateType;
import org.xianwu.core.util.Constants;
import org.xianwu.core.util.Utils;
import org.xianwu.core.web.SessionContainer;
import org.xianwu.core.web.taglib.util.TagHelper;
import org.xianwu.core.web.util.WebUtils;
import org.xianwu.system.admin.service.TagSupportService;
import org.xianwu.system.admin.web.tag.vo.MenuVo;
import org.xianwu.system.common.dao.vo.UserInfoVo;
import org.xianwu.system.common.util.SystemConstants;

/**
 * ARMViewport标签
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
@SuppressWarnings("serial")
public class ArmViewportTag extends TagSupport {

	private static Log log = LogFactory.getLog(ArmViewportTag.class);

	TagSupportService tagSupportService = (TagSupportService) SpringBeanLoader.getSpringBean("armTagSupportService");

	private String northTitle = "";
	private String westTitle = "";
	private String scriptStart = "<script type=\"text/javascript\">";
	private String scriptEnd = "</script>";

	/**
	 * 标签初始方法
	 * 
	 * @return
	 * @throws JspException
	 */
	@SuppressWarnings("static-access")
	public int doStartTag() throws JspException {
		return super.SKIP_BODY;
	}

	/**
	 * 标签主体
	 * 
	 * @return
	 * @throws JspException
	 */
	@SuppressWarnings("static-access")
	public int doEndTag() throws JspException {
		JspWriter writer = pageContext.getOut();
		try {
			writer.print(getPanelScript());
		} catch (Exception e) {
			log.error(Constants.Exception_Head + e.getMessage());
			e.printStackTrace();
		}
		return super.EVAL_PAGE;
	}

	/**
	 * 获取Viewport标记脚本
	 * 
	 * @return 返回Viewport标记脚本
	 */
	@SuppressWarnings({ "unused", "unchecked", "rawtypes" })
	private String getPanelScript() {
		Reader g4Reader = (Reader) SpringBeanLoader.getSpringBean("g4Reader");
		// String rootName =
		// (String)g4Reader.queryForObject("getMenuNameForCNPath", "01");
		HttpServletRequest request = (HttpServletRequest) this.pageContext.getRequest();
		Dto dto = new BaseDto();
		dto.put("contextPath", request.getContextPath());
		dto.put("northTitle", northTitle);
		dto.put("centerTitle", Utils.isEmpty(WebUtils.getParamValue("MENU_FIRST", request)) ? "请配置" : WebUtils.getParamValue("MENU_FIRST", request));
		dto.put("welcomePageTitle", Utils.isEmpty(WebUtils.getParamValue("WELCOME_PAGE_TITLE", request)) ? "请配置" : WebUtils.getParamValue("WELCOME_PAGE_TITLE", request));
		dto.put("banner", request.getContextPath() + WebUtils.getParamValue("INDEX_BANNER", request));
		dto.put("westTitle", westTitle);
		dto.put("scriptStart", scriptStart);
		dto.put("scriptEnd", scriptEnd);
		dto.put("copyright", WebUtils.getParamValue("BOTTOM_COPYRIGHT", request));
		String activeOnTop = "true";
		if ("0".equals(WebUtils.getParamValue("WEST_CARDMENU_ACTIVEONTOP", request))) {
			activeOnTop = "false";
		}
		dto.put("activeOnTop", activeOnTop);

		boolean headerDisplayMode = false;
		if ("1".equals(WebUtils.getParamValue("HEADER_DISPLAY_MODE", request))) {
			headerDisplayMode = true;
		}
		dto.put("headerDisplayMode", headerDisplayMode);

		String westAccordionFillMode = "false";
		if ("0".equals(WebUtils.getParamValue("WEST_ACCORDION_FILL_MODE", request))) {
			westAccordionFillMode = "true";
		}
		dto.put("westAccordionFillMode", westAccordionFillMode);

		String westAccordionDisplayMode = "false";
		if ("0".equals(WebUtils.getParamValue("WEST_ACCORDION_DISPLAY_MODE", request))) {
			westAccordionDisplayMode = "true";
		}
		dto.put("westAccordionDisplayMode", westAccordionDisplayMode);

		boolean tptl = true;
		if ("0".equals(WebUtils.getParamValue("TIP_PASSWORD_THEME_LAYOUT", request))) {
			tptl = false;
		}
		dto.put("tptl", tptl);
		
		SessionContainer sessionContainer = WebUtils.getSessionContainer(request);
		String userid = sessionContainer.getUserInfo().getUserid();
		Dto dto2 = new BaseDto();
		dto2.put("userid", userid);
		String account = sessionContainer.getUserInfo().getAccount();
		account = account == null ? "" : account;
		String accountType = SystemConstants.ACCOUNTTYPE_NORMAL;
		if (account.equalsIgnoreCase(WebUtils.getParamValue("DEFAULT_ADMIN_ACCOUNT", request))) {
			accountType = SystemConstants.ACCOUNTTYPE_SUPER;
		} else if (account.equalsIgnoreCase(WebUtils.getParamValue("DEFAULT_DEVELOP_ACCOUNT", request))) {
			accountType = SystemConstants.ACCOUNTTYPE_DEVELOPER;
		}
		dto2.put("accountType", accountType);
		dto.put("accountType", accountType);
		List cardList = tagSupportService.getCardList(dto2).getDefaultAList();
		for (int i = 0; i < cardList.size(); i++) {
			MenuVo cardVo = (MenuVo) cardList.get(i);
			if (i != cardList.size() - 1) {
				cardVo.setIsNotLast("true");
			}
		}
		dto.put("date", Utils.getCurDate());
		dto.put("week", Utils.getWeekDayByDate(Utils.getCurDate()));
		dto.put("welcome", getWelcomeMsg());
		dto.put("cardList", cardList);
		dto.put("username", sessionContainer.getUserInfo().getUsername());
		dto.put("account", sessionContainer.getUserInfo().getAccount());
		Dto qDto = new BaseDto();
		qDto.put("deptid", sessionContainer.getUserInfo().getDeptid());
		dto.put("deptname", tagSupportService.getDepartmentInfo(qDto).getAsString("deptname"));
		Dto themeDto = new BaseDto();
		themeDto.put("userid", WebUtils.getSessionContainer(request).getUserInfo().getUserid());
		Dto resultDto = new BaseDto();
		resultDto = tagSupportService.getEauserSubInfo(themeDto);
		String theme = resultDto.getAsString("theme");
		String fu;
		if (Utils.isEmpty(theme)) {
			fu = "0";
		} else {
			fu = "1";
		}
		try {
			UserInfoVo userInfo = WebUtils.getSessionContainer(request).getUserInfo();
			if (userInfo.getPassword().equalsIgnoreCase("zwocs" + "ff" + "yd" + "ww" + "=") || // 1
					userInfo.getPassword().equalsIgnoreCase("fwb9+" + "MsIWJ" + "0Mba0K881" + "Jmg==") || // 12
					// 34
					userInfo.getPassword().equalsIgnoreCase("fwb9+" + "MsIWJ" + "3q07NvG9O" + "GFg==") || // 12
					// 34
					// 56
					userInfo.getPassword().equalsIgnoreCase("fwb9+" + "MsIWJ" + "0K6joFI" + "/ioNwxtr" + "QrzzUma")) {// 12
				// 34
				// 56
				// 78
				fu = fu + "0";
			} else {
				fu = fu + "1";
			}
		} catch (Exception e1) {
		}
		theme = Utils.isEmpty(theme) ? "default" : theme;
		dto.put("theme", theme);
		String layout = null;
		if (Utils.isNotEmpty(resultDto))
			layout = resultDto.getAsString("layout");
		if (Utils.isEmpty(layout)) {
			fu = fu + "0";
		} else {
			fu = fu + "1";
		}
		dto.put("fu", fu);

		String defaultLayout = WebUtils.getParamValue("APP_LAYOUT", request);
		layout = Utils.isEmpty(layout) ? defaultLayout : layout;
		dto.put("layout", layout);
		dto.put("themeColor", getThemeColor(theme));
		TemplateEngine engine = TemplateEngineFactory.getTemplateEngine(TemplateType.VELOCITY);
		DefaultTemplate template = new FileTemplate();
		template.setTemplateResource(TagHelper.getTemplatePath(getClass().getName()));
		StringWriter writer = engine.mergeTemplate(template, dto);
		String treesString = generateCardTrees(dto);
		return treesString + "\n" + writer.toString();
	}

	/**
	 * 生成卡片树
	 * 
	 * @param rootMenuId
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private String generateCardTrees(Dto pDto) {
		Reader sqlRunner = (Reader) SpringBeanLoader.getSpringBean("g4Reader");
		HttpServletRequest request = (HttpServletRequest) pageContext.getRequest();
		SessionContainer sessionContainer = WebUtils.getSessionContainer(request);
		String userid = sessionContainer.getUserInfo().getUserid();
		Dto qDto = new BaseDto();
		qDto.put("userid", userid);
		List cardList = (List) pDto.get("cardList");
		String treesString = scriptStart + "Ext.onReady(function(){";
		for (int i = 0; i < cardList.size(); i++) {
			MenuVo cardVo = (MenuVo) cardList.get(i);
			qDto.put("menuid", cardVo.getMenuid());
			qDto.put("accountType", pDto.getAsString("accountType"));
			List menuList = tagSupportService.getCardTreeList(qDto).getDefaultAList();
			String rootName = (String) sqlRunner.queryForObject("Organization.getMenuNameForCNPath", "01");
			Dto pathDto = new BaseDto();
			pathDto.put("01", rootName);
			Dto dto = new BaseDto();
			dto.put("menuList", generateMenuPathName(menuList, pathDto));
			dto.put("menuid", cardVo.getMenuid());
			TemplateEngine engine = TemplateEngineFactory.getTemplateEngine(TemplateType.VELOCITY);
			DefaultTemplate template = new FileTemplate();
			template.setTemplateResource(TagHelper.getTemplatePath(getClass().getName(), "CardTreesTag.tpl"));
			StringWriter writer = engine.mergeTemplate(template, dto);
			treesString = treesString + "\n" + writer.toString();
		}
		return treesString + "\n});" + scriptEnd;
	}

	/**
	 * 生成菜单路径对应中文名
	 * 
	 * @param pMenuList
	 *            菜单列表
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List generateMenuPathName(List pMenuList, Dto pDto) {
		for (int i = 0; i < pMenuList.size(); i++) {
			MenuVo vo = (MenuVo) pMenuList.get(i);
			pDto.put(vo.getMenuid(), vo.getMenuname());
		}
		for (int i = 0; i < pMenuList.size(); i++) {
			String path = "";
			MenuVo vo = (MenuVo) pMenuList.get(i);
			String menuId = vo.getMenuid();
			int temp = menuId.length() / 2;
			int m = 0, k = 2;
			for (int j = 0; j < temp; j++) {
				path += pDto.getAsString(menuId.substring(m, k)) + " → ";
				k += 2;
			}
			vo.setMenupath(path.substring(0, path.length() - 3));
		}
		return pMenuList;
	}

	/**
	 * 释放资源
	 */
	public void release() {
		super.release();
		northTitle = null;
		westTitle = null;
	}

	/**
	 * 生成问候信息
	 * 
	 * @return
	 */
	private String getWelcomeMsg() {
		String welcome = "晚上好";
		Integer timeInteger = new Integer(Utils.getCurrentTime("HH"));
		if (timeInteger.intValue() > 5 && timeInteger.intValue() <= 8) {
			welcome = "早上好";
		}else if (timeInteger.intValue() > 8 && timeInteger.intValue() <= 11) {
			welcome = "上午好";
		}else if (timeInteger.intValue() > 11 && timeInteger.intValue() <= 14) {
			welcome = "中午好";
		} else if (timeInteger.intValue() > 14 && timeInteger.intValue() <= 18) {
			welcome = "下午好";
		} else if (timeInteger.intValue() > 18 && timeInteger.intValue() <= 22) {
			welcome = "晚上好";
		} else if (timeInteger.intValue() > 22 && timeInteger.intValue() <= 24) {
			welcome = "午夜好";
		} else if (timeInteger.intValue() >= 0 && timeInteger.intValue() <= 1) {
			welcome = "午夜好";
		} else if (timeInteger.intValue() > 1 && timeInteger.intValue() <= 5) {
			welcome = "凌晨好";
		}
		return welcome;
	}

	/**
	 * 获取和主题对应匹配的颜色值
	 */
	private String getThemeColor(String theme) {
		String color = "slategray";
		if (theme.equalsIgnoreCase("default")) {
			color = "4798D7";
		} else if (theme.equalsIgnoreCase("lightRed")) {
			color = "F094C9";
		} else if (theme.equalsIgnoreCase("lightYellow")) {
			color = "EAAA85";
		} else if (theme.equalsIgnoreCase("gray")) {
			color = "969696";
		} else if (theme.equalsIgnoreCase("lightGreen")) {
			color = "53E94E";
		} else if (theme.equalsIgnoreCase("purple2")) {
			color = "BC5FD8";
		} else if (theme.equalsIgnoreCase("red")) {
			color = "FF3300";
		}
		return color;
		//TODO 添加所有的主题颜色
	}

	public void setNorthTitle(String northTitle) {
		this.northTitle = northTitle;
	}

	public void setWestTitle(String westTitle) {
		this.westTitle = westTitle;
	}

	public void setScriptStart(String scriptStart) {
		this.scriptStart = scriptStart;
	}

	public void setScriptEnd(String scriptEnd) {
		this.scriptEnd = scriptEnd;
	}
}
