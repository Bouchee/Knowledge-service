package org.xianwu.core.web.taglib.html;

import java.io.IOException;
import java.io.StringWriter;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.tplengine.DefaultTemplate;
import org.xianwu.core.tplengine.StringTemplate;
import org.xianwu.core.tplengine.TemplateEngine;
import org.xianwu.core.tplengine.TemplateEngineFactory;
import org.xianwu.core.tplengine.TemplateType;
import org.xianwu.core.util.Constants;
import org.xianwu.core.web.taglib.util.TagHelper;

/**
 * Body标签
 * @author XianwuFu
 * @since 2013-01-01
 */
public class BodyTag extends TagSupport{

	/**
	 *
	 */
	private static final long serialVersionUID = -2010981556541597411L;
	private static Log log = LogFactory.getLog(BodyTag.class);
	private String onload;
	private String any;
	private String cls;

	/**
	 * 标签开始
	 */
	@SuppressWarnings({ "unchecked", "static-access" })
	public int doStartTag() throws JspException{
		Dto dto = new BaseDto();
		dto.put("onload", TagHelper.checkEmpty(onload));
		dto.put("any", TagHelper.checkEmpty(any));
		dto.put("cls", TagHelper.checkEmpty(cls));
		//<body oncontextmenu=self.event.returnValue=false
		String tpl = "<body #if(${cls}!=*off*)class=*${cls}*#end #if(${onload}!=*off*)onload=*${onload}*#end #if(${any}!=*off*)${any}#end>";
		TemplateEngine engine = TemplateEngineFactory.getTemplateEngine(TemplateType.VELOCITY);
		DefaultTemplate template = new StringTemplate(TagHelper.replaceStringTemplate(tpl));
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
	 * @param onload
	 */
	@SuppressWarnings("static-access")
	public int doEndTag() throws JspException{
		try {
			pageContext.getOut().write("</body>");
		} catch (IOException e) {
			log.error(Constants.Exception_Head + e.getMessage());
			e.printStackTrace();
		}
		return super.EVAL_PAGE;
	}

	/**
	 * 释放资源
	 */
	public void release(){
		any = null;
		cls = null;
		onload = null;
		super.release();
	}

	public void setOnload(String onload) {
		this.onload = onload;
	}
	public void setAny(String any) {
		this.any = any;
	}

	public void setCls(String cls) {
		this.cls = cls;
	}

}
