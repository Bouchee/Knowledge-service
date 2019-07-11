package org.xianwu.core.web.taglib.ext;

import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.SpringBeanLoader;
import org.xianwu.core.model.dao.Dao;
import org.xianwu.core.tplengine.DefaultTemplate;
import org.xianwu.core.tplengine.FileTemplate;
import org.xianwu.core.tplengine.TemplateEngine;
import org.xianwu.core.tplengine.TemplateEngineFactory;
import org.xianwu.core.tplengine.TemplateType;
import org.xianwu.core.util.Constants;
import org.xianwu.core.util.Utils;
import org.xianwu.core.web.taglib.util.TagHelper;
import org.xianwu.core.web.util.WebUtils;
import org.xianwu.system.common.dao.vo.UserInfoVo;

/**
 * 
 * UiGrant标签<br>
 * 实现UI元素授权
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class UiGrantTag extends TagSupport{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -1802147225496403036L;
	private static Log log = LogFactory.getLog(UiGrantTag.class);
	
	
	/**
	 * 标签开始
	 */
	@SuppressWarnings({ "unchecked", "static-access", "rawtypes" })
	public int doStartTag() throws JspException{
		HttpServletRequest request = (HttpServletRequest)pageContext.getRequest();
		Dao g4Dao = (Dao) SpringBeanLoader.getSpringBean("g4Dao");
		Dto qDto = new BaseDto();
		UserInfoVo userInfoVo = WebUtils.getSessionContainer(request).getUserInfo();
		qDto.put("userid", userInfoVo.getUserid());
		qDto.put("menuid", request.getParameter("menuid4Log"));
		List roleGrantList = g4Dao.queryForList("ArmTagSupport.getUiRoleGrantInfo", qDto);
		List userGrantList = g4Dao.queryForList("ArmTagSupport.getUiUserGrantInfo", qDto);
		List grantList = new ArrayList();
		if (Utils.isNotEmpty(roleGrantList)) {
			grantList.addAll(roleGrantList);
		}
		if (Utils.isNotEmpty(userGrantList)) {
			grantList.addAll(userGrantList);
		}
		Dto dto = new BaseDto();
		dto.put("grantList", grantList);
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
	 * 标签结束
	 */
	@SuppressWarnings("static-access")
	public int doEndTag() throws JspException{
		return super.EVAL_PAGE;
	}
	
	/**
	 * 释放资源
	 */
	public void release(){
		super.release();
	}
}
