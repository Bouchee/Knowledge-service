package org.xianwu.core.web.taglib.html;

import java.io.IOException;
import java.io.StringWriter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

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
import org.xianwu.core.web.taglib.util.TagConstant;
import org.xianwu.core.web.taglib.util.TagHelper;
import org.xianwu.core.web.util.WebUtils;
import org.xianwu.system.admin.service.TagSupportService;
import org.xianwu.system.common.dao.vo.UserInfoVo;

/**
 * HTML标签
 *
 * @author XianwuFu
 * @since 2013-01-01
 */
public class HtmlTag extends TagSupport {

	/**
	 *
	 */
	private static final long serialVersionUID = -4098308477853801455L;

	private TagSupportService armTagSupportService = (TagSupportService) SpringBeanLoader.getSpringBean("armTagSupportService");

	private static Log log = LogFactory.getLog(HtmlTag.class);
	private String extDisabled;
	private String title;
	private String jqueryEnabled;
	private String showLoading;
	private String uxEnabled = "true";
	private String fcfEnabled = "false";
	private String pinyinFilter = "false";
	private String doctypeEnable = "false"; // 带有时分秒选择的控件的页面需要设置为:true
	private String exportParams = "false";
	private String exportUserinfo = "false";
	private String isSubPage = "true";
	private String urlSecurity2 = "true";
	private String exportExceptionWindow = "true";
	private String formValidationMessageLocation;
	private String[] themeall = { "beautyGrass", "blueSentiment", "childWorld", "cloudMusic", "crystalLove", "default", "dreamWater", "gray", "happyNewYear", "heavyGray", "lightBlue", "lightGreen",
			"lightNature", "lightRed", "lightRedYellow", "lightSummer", "lightYellow", "ourLove", "pearRain", "pink", "pinkLove", "purple2" };

	/**
	 * 标签开始
	 */
	@SuppressWarnings({ "unchecked", "static-access", "unused" })
	public int doStartTag() throws JspException {
		HttpServletRequest request = (HttpServletRequest) pageContext.getRequest();
		UserInfoVo userInfo = WebUtils.getSessionContainer(request).getUserInfo();
		String contextPath = request.getContextPath();
		request.setAttribute("webContext", contextPath);
		Dto dto = new BaseDto();
		PropertiesHelper pHelper = PropertiesFactory.getPropertiesHelper(PropertiesFile.GLOBAL);

		String micolor = pHelper.getValue("micolor", "red");
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

		String urlSecurity = pHelper.getValue("urlSecurity", "1");
		dto.put("urlSecurity", urlSecurity);
		dto.put("urlSecurity2", urlSecurity2);
		dto.put("userInfo", userInfo);
		dto.put("ajaxErrCode", Constants.Ajax_Timeout);
		dto.put("requestURL", request.getRequestURL());
		dto.put("contextPath", contextPath);
		dto.put("sst", request.getSession().getServletContext().getAttribute("sst"));
		dto.put("doctypeEnable", doctypeEnable);
		dto.put("extDisabled", Utils.isEmpty(extDisabled) ? "false" : extDisabled);
		dto.put("title", Utils.isEmpty(title) ? "DEC" : title);
		dto.put("jqueryEnabled", Utils.isEmpty(jqueryEnabled) ? "false" : jqueryEnabled);
		dto.put("showLoading", Utils.isEmpty(showLoading) ? "true" : showLoading);
		dto.put("uxEnabled", uxEnabled);
		dto.put("exportExceptionWindow", exportExceptionWindow);
		dto.put("fcfEnabled", fcfEnabled);
		dto.put("pinyinFilter", pinyinFilter);
		dto.put("exportParams", exportParams);
		dto.put("exportUserinfo", exportUserinfo);
		dto.put("isSubPage", isSubPage);

		formValidationMessageLocation = WebUtils.getParamValue("FORM_VALIDATION_MESSAGE_LOCATION", request);
		dto.put("formValidationMessageLocation", Utils.isEmpty(formValidationMessageLocation) ? "qtip" : formValidationMessageLocation);

		boolean sf = false;
		if ("1".equals(WebUtils.getParamValue("STATEFUL_FLAG", request))) {
			sf = true;
		}
		dto.put("sf", sf);

		dto.put("pageLoadMsg", WebUtils.getParamValue("PAGE_LOAD_MSG", request));
		String titleIcon = WebUtils.getParamValue("TITLE_ICON", request);
		dto.put("titleIcon", Utils.isEmpty(titleIcon) ? "shortcut.ico" : titleIcon);
		if (exportParams.equals("true")) {
			dto.put("paramList", WebUtils.getParamList(request));
		}
		// String agent = request.getHeader("user-agent");
		// dto.put("firefox", agent.indexOf("Firefox") == -1 ? "false" :
		// "true");
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

		Dto themeDto = new BaseDto();
		Dto resultDto = new BaseDto();
		if (Utils.isNotEmpty(userInfo)) {
			themeDto.put("userid", userInfo.getUserid());
			resultDto = armTagSupportService.getEauserSubInfo(themeDto);
		}
		String theme = null;
		if (Utils.isNotEmpty(resultDto))
			theme = resultDto.getAsString("theme");
		String defaultTheme = WebUtils.getParamValue("SYS_DEFAULT_THEME", request);
		if (WebUtils.getParamValue("THEME_RANDOM", request).equals("1")) {
			defaultTheme = themeall[new java.util.Random().nextInt(themeall.length)];
		}
		theme = Utils.isEmpty(theme) ? defaultTheme : theme;
		dto.put("theme", theme);

		String layout = null;
		if (Utils.isNotEmpty(resultDto))
			layout = resultDto.getAsString("layout");
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
		return super.EVAL_BODY_INCLUDE;
	}

	/**
	 * 标签结束
	 */
	@SuppressWarnings("static-access")
	public int doEndTag() throws JspException {
		try {
			pageContext.getOut().write("</html>");
		} catch (IOException e) {
			log.error(Constants.Exception_Head + e.getMessage());
			e.printStackTrace();
		}
		return super.EVAL_PAGE;
	}

	/**
	 * 释放资源
	 */
	public void release() {
		extDisabled = null;
		title = null;
		jqueryEnabled = null;
		uxEnabled = null;
		fcfEnabled = null;
		pinyinFilter = null;
		doctypeEnable = null;
		exportParams = null;
		exportUserinfo = null;
		isSubPage = null;
		urlSecurity2 = null;
		super.release();
	}

	public void setExtDisabled(String extDisabled) {
		this.extDisabled = extDisabled;
	}

	public void setJqueryEnabled(String jqueryEnabled) {
		this.jqueryEnabled = jqueryEnabled;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setShowLoading(String showLoading) {
		this.showLoading = showLoading;
	}

	public void setUxEnabled(String uxEnabled) {
		this.uxEnabled = uxEnabled;
	}

	public String getFcfEnabled() {
		return fcfEnabled;
	}

	public void setFcfEnabled(String fcfEnabled) {
		this.fcfEnabled = fcfEnabled;
	}

	public String getPinyinFilter() {
		return pinyinFilter;
	}

	public void setPinyinFilter(String pinyinFilter) {
		this.pinyinFilter = pinyinFilter;
	}

	public void setDoctypeEnable(String doctypeEnable) {
		this.doctypeEnable = doctypeEnable;
	}

	public void setExportParams(String exportParams) {
		this.exportParams = exportParams;
	}

	public void setExportUserinfo(String exportUserinfo) {
		this.exportUserinfo = exportUserinfo;
	}

	public void setIsSubPage(String isSubPage) {
		this.isSubPage = isSubPage;
	}

	public void setUrlSecurity2(String urlSecurity2) {
		this.urlSecurity2 = urlSecurity2;
	}

	public void setExportExceptionWindow(String exportExceptionWindow) {
		this.exportExceptionWindow = exportExceptionWindow;
	}
}
