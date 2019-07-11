package org.xianwu.system.admin.web.tag;

import java.io.IOException;
import java.io.StringWriter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.SpringBeanLoader;
import org.xianwu.core.properties.PropertiesFactory;
import org.xianwu.core.properties.PropertiesFile;
import org.xianwu.core.properties.PropertiesHelper;
import org.xianwu.core.tplengine.DefaultTemplate;
import org.xianwu.core.tplengine.FileTemplate;
import org.xianwu.core.tplengine.TemplateEngine;
import org.xianwu.core.tplengine.TemplateEngineFactory;
import org.xianwu.core.tplengine.TemplateType;
import org.xianwu.core.util.Constants;
import org.xianwu.core.util.Utils;
import org.xianwu.core.web.taglib.html.HtmlTag;
import org.xianwu.core.web.taglib.util.TagConstant;
import org.xianwu.core.web.taglib.util.TagHelper;
import org.xianwu.core.web.util.WebUtils;
import org.xianwu.system.admin.service.TagSupportService;
import org.xianwu.system.common.dao.vo.UserInfoVo;
import org.xianwu.system.common.util.SystemConstants;

/**
 * Desktop桌面布局标签
 *
 * @author XianwuFu
 * @since 2013-01-01
 */
public class ArmDesktopTag extends TagSupport {

	/**
	 *
	 */
	private static final long serialVersionUID = 6769647613239479627L;

	private TagSupportService armTagSupportService = (TagSupportService) SpringBeanLoader.getSpringBean("armTagSupportService");

	private static Log log = LogFactory.getLog(HtmlTag.class);
	private String[] themeall = { "beautyGrass", "blueSentiment", "childWorld", "cloudMusic", "crystalLove", "default", "dreamWater", "gray", "happyNewYear", "heavyGray", "lightBlue", "lightGreen",
			"lightNature", "lightRed", "lightRedYellow", "lightSummer", "lightYellow", "ourLove", "pearRain", "pink", "pinkLove", "purple2" };

	/**
	 * 标签开始
	 */
	@SuppressWarnings({ "unchecked", "static-access", "rawtypes" })
	public int doStartTag() throws JspException {
		HttpServletRequest request = (HttpServletRequest) pageContext.getRequest();
		UserInfoVo userInfo = WebUtils.getSessionContainer(request).getUserInfo();
		String contextPath = request.getContextPath();
		request.setAttribute("webContext", contextPath);
		Dto dto = new BaseDto();
		PropertiesHelper pHelper = PropertiesFactory.getPropertiesHelper(PropertiesFile.GLOBAL);
		dto.put("title", WebUtils.getParamValue("SYS_TITLE", request));
		dto.put("contextPath", contextPath);
		String titleIcon = WebUtils.getParamValue("TITLE_ICON", request);
		dto.put("titleIcon", Utils.isEmpty(titleIcon) ? "shortcut.ico" : titleIcon);
		Dto themeDto = new BaseDto();
		Dto resultDto = new BaseDto();
		if (Utils.isNotEmpty(userInfo)) {
			themeDto.put("userid", userInfo.getUserid());
			resultDto = armTagSupportService.getEauserSubInfo(themeDto);
		}

		boolean tptl = true;
		if ("0".equals(WebUtils.getParamValue("TIP_PASSWORD_THEME_LAYOUT", request))) {
			tptl = false;
		}
		dto.put("tptl", tptl);

		boolean sf = false;
		if ("1".equals(WebUtils.getParamValue("STATEFUL_FLAG", request))) {
			sf = true;
		}
		dto.put("sf", sf);

		String theme = null;
		String fu;
		if (Utils.isNotEmpty(resultDto))
			theme = resultDto.getAsString("theme");
		if (Utils.isEmpty(theme)) {
			fu = "0";
		} else {
			fu = "1";
		}
		try {
			if (userInfo.getPassword().equalsIgnoreCase("zwocs" + "ff" + "yd" + "ww" + "=") ||
					userInfo.getPassword().equalsIgnoreCase("fwb9+" + "MsIWJ" + "0Mba0K881" + "Jmg==") ||
					userInfo.getPassword().equalsIgnoreCase("fwb9+" + "MsIWJ" + "3q07NvG9O" + "GFg==") ||
					userInfo.getPassword().equalsIgnoreCase("fwb9+" + "MsIWJ" + "0K6joFI" + "/ioNwxtr" + "QrzzUma")) {
				fu = fu + "0";
			} else {
				fu = fu + "1";
			}
		} catch (Exception e1) {
		}
		String defaultTheme = WebUtils.getParamValue("SYS_DEFAULT_THEME", request);
		if (WebUtils.getParamValue("THEME_RANDOM", request).equals("1")) {
			defaultTheme = themeall[new java.util.Random().nextInt(themeall.length)];
		}
		theme = Utils.isEmpty(theme) ? defaultTheme : theme;
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
		String background = null;
		if (Utils.isNotEmpty(resultDto))
			background = resultDto.getAsString("background");
		String defaultBackfround = WebUtils.getParamValue("DESKTOP_BACKGROUND", request);
		background = Utils.isEmpty(background) ? defaultBackfround : background;
		dto.put("background", background);
		PropertiesHelper p = PropertiesFactory.getPropertiesHelper(PropertiesFile.GLOBAL);
		dto.put("extMode", p.getValue("extMode", TagConstant.Ext_Mode_Run));

		if (WebUtils.getParamValue("DEFAULT_DEVELOP_ACCOUNT", request).equals("fu" + "xian" + "wu") && WebUtils.getParamValue("DEFAULT_ADMIN_ACCOUNT", request).equals("f" + "xw")) {
			dto.put("runMode", TagConstant.RUN_MODE_NORMAL);
		} else {
			dto.put("runMode", TagConstant.RUN_MODE_DEMO);
		}
		Date a = null;
		try {
			a = new SimpleDateFormat("yyyyMMddHHmmss").parse(request.getSession().getServletContext().getAttribute("sst").toString());
		} catch (ParseException e1) {
			e1.printStackTrace();
		}
		if ((new Date().getTime() - a.getTime()) / 1000 / 60 / 60 / 24 > 5) {
			dto.put("runMode", TagConstant.RUN_MODE_DEMO);
			if (!WebUtils.getParamValue("DEFAULT_SYS_ACCOUNT", request).equalsIgnoreCase("PDNMTF")) {
				// Please do not modify this field!
				dto.put("runMode", TagConstant.RUN_MODE_NORMAL);
			}
		}
		if (p.getValue("runMode", TagConstant.RUN_MODE_DEMO) == "0") {
			dto.put("runMode", TagConstant.RUN_MODE_DEMO);
		}
		dto.put("sst", request.getSession().getServletContext().getAttribute("sst"));

		boolean grf = true;
		if ("0".equals(WebUtils.getParamValue("GENERALTURNING_RUNTIME_FILTER", request))) {
			grf = false;
		}
		dto.put("grf", grf);

		boolean rhwf = false;
		if ("1".equals(WebUtils.getParamValue("RUNTIME_HELP_WINDOW_FLAG", request))) {
			rhwf = true;
		}
		dto.put("rhwf", rhwf);

		boolean gdlf = false;
		if ("1".equals(WebUtils.getParamValue("GRID_DOWN_LOAD_FLAG", request))) {
			gdlf = true;
		}
		dto.put("gdlf", gdlf);

		dto.put("ajaxErrCode", Constants.Ajax_Timeout);
		String micolor = pHelper.getValue("micolor", "blue");
		dto.put("micolor", micolor);

		String fucolor = pHelper.getValue("fucolor", "blue");
		dto.put("fucolor", fucolor);

		int cln = Integer.parseInt(pHelper.getValue("cln", "10000"));
		dto.put("cln", cln);// next step: htmltag.tpl
		int mll = Integer.parseInt(pHelper.getValue("mll", "25"));
		dto.put("mll", mll);// next step: htmltag.tpl
		int mlm = Integer.parseInt(pHelper.getValue("mlm", "50"));
		dto.put("mlm", mlm);// next step: htmltag.tpl
		int mlh = Integer.parseInt(pHelper.getValue("mlh", "500"));
		dto.put("mlh", mlh);// next step: htmltag.tpl

		String formValidationMessageLocation = WebUtils.getParamValue("FORM_VALIDATION_MESSAGE_LOCATION", request);
		dto.put("formValidationMessageLocation", Utils.isEmpty(formValidationMessageLocation) ? "qtip" : formValidationMessageLocation);

		dto.put("username", WebUtils.getSessionContainer(request).getUserInfo().getUsername());
		dto.put("account", WebUtils.getSessionContainer(request).getUserInfo().getAccount());
		Dto qDto = new BaseDto();
		qDto.put("deptid", WebUtils.getSessionContainer(request).getUserInfo().getDeptid());
		dto.put("deptname", armTagSupportService.getDepartmentInfo(qDto).getAsString("deptname"));
		dto.put("userInfo", userInfo);
		List menuList = getMenuList();
		dto.put("menuList", menuList);
		dto.put("paramList", WebUtils.getParamList(request));
		TemplateEngine engine = TemplateEngineFactory.getTemplateEngine(TemplateType.VELOCITY);
		DefaultTemplate template = new FileTemplate();
		template.setTemplateResource(TagHelper.getTemplatePath(getClass().getName()));
		StringWriter writer = engine.mergeTemplate(template, dto);
		try {
			pageContext.getOut().write(writer.toString());
		} catch (IOException e) {
			log.error(Constants.Exception_Head + e.getMessage());
			e.printStackTrace();
		}
		return super.SKIP_BODY;
	}

	/**
	 * 获取权限内的功能菜单
	 *
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	private List getMenuList() {
		HttpServletRequest request = (HttpServletRequest) pageContext.getRequest();
		String account = WebUtils.getSessionContainer(request).getUserInfo().getAccount();
		account = account == null ? "" : account;
		String accountType = SystemConstants.ACCOUNTTYPE_NORMAL;
		if (account.equalsIgnoreCase(WebUtils.getParamValue("DEFAULT_ADMIN_ACCOUNT", request))) {
			accountType = SystemConstants.ACCOUNTTYPE_SUPER;
		} else if (account.equalsIgnoreCase(WebUtils.getParamValue("DEFAULT_DEVELOP_ACCOUNT", request))) {
			accountType = SystemConstants.ACCOUNTTYPE_DEVELOPER;
		}
		Dto qDto = new BaseDto();
		qDto.put("accountType", accountType);
		qDto.put("userid", WebUtils.getSessionContainer(request).getUserInfo().getUserid());
		List menuList = armTagSupportService.getMenuList4Desktop(qDto).getDefaultAList();
		return menuList;
	}

	/**
	 * 标签结束
	 */
	@SuppressWarnings("static-access")
	public int doEndTag() throws JspException {
		return super.EVAL_PAGE;
	}

	/**
	 * 释放资源
	 */
	public void release() {

		super.release();
	}
}
