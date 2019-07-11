package org.xianwu.core.web.taglib.fcf;

import java.io.IOException;
import java.io.StringWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.tplengine.DefaultTemplate;
import org.xianwu.core.tplengine.FileTemplate;
import org.xianwu.core.tplengine.TemplateEngine;
import org.xianwu.core.tplengine.TemplateEngineFactory;
import org.xianwu.core.tplengine.TemplateType;
import org.xianwu.core.util.Constants;
import org.xianwu.core.web.taglib.util.FcfConstant;
import org.xianwu.core.web.taglib.util.TagHelper;

/**
 * FlashReport标签
 * @author XianwuFu
 * @since 2013-01-01
 */
public class FlashReportTag extends TagSupport{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -3657649101702974826L;
	private static Log log = LogFactory.getLog(FlashReportTag.class);
	private String id;
	private String type;
	private String align = "left";
	private String width= "550";
	private String height = "350"; 
	private String visible;
	private String dataVar;
	private String style;
	
	
	/**
	 * 标签开始
	 */
	@SuppressWarnings({ "unchecked", "static-access" })
	public int doStartTag() throws JspException{
		HttpServletRequest request = (HttpServletRequest)pageContext.getRequest();
		String contextPath = request.getContextPath();
		Dto dto = new BaseDto();
		dto.put("contextPath", contextPath);
		dto.put("id", id);
		dto.put("align", align);
		dto.put("width", width);
		dto.put("height", height);
		dto.put("style", style);
		dto.put("cls", visible == "true" ? "" : "x-hidden");
		dto.put("swfModelPath", contextPath + "/resource/fcf/" + FcfConstant.getReportModel(type));
		String xmlString = (String)request.getAttribute(dataVar);
		dto.put("reportXMLData", xmlString);
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
		id = null;
		align = null;
		height = null;
		width = null;
		visible = null;
		type = null;
		style= null;
		dataVar = null;
		super.release();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getAlign() {
		return align;
	}

	public void setAlign(String align) {
		this.align = align;
	}

	public String getWidth() {
		return width;
	}

	public void setWidth(String width) {
		this.width = width;
	}

	public String getHeight() {
		return height;
	}

	public void setHeight(String height) {
		this.height = height;
	}

	public void setVisible(String visible) {
		this.visible = visible;
	}

	public String getDataVar() {
		return dataVar;
	}

	public void setDataVar(String dataVar) {
		this.dataVar = dataVar;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public void setStyle(String style) {
		this.style = style;
	}
}
