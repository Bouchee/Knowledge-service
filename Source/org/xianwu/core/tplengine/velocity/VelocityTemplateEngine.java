package org.xianwu.core.tplengine.velocity;

import java.io.StringWriter;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.xianwu.core.metatype.Dto;
import org.xianwu.core.tplengine.AbstractTemplateEngine;
import org.xianwu.core.tplengine.DefaultTemplate;
import org.xianwu.core.util.Constants;
import org.xianwu.core.util.Utils;

/**
 * Velocity模板引擎
 * @author XianwuFu
 * @since 2013-01-01
 */
public class VelocityTemplateEngine extends AbstractTemplateEngine {
	
	Log log = LogFactory.getLog(VelocityTemplateEngine.class);
	
	/**
	 * 驱动文件模板
	 * @param pTemplate 模板对象
	 * @param pDto 合并参数集合(将模板中所需变量全部压入Dto)
	 * @return 返回StringWriter对象
	 * @throws Exception 
	 */
	protected StringWriter mergeStringTemplate(DefaultTemplate pTemplate, Dto pDto) {
		VelocityEngine ve = VelocityHelper.getVelocityEngine();
		String strTemplate = pTemplate.getTemplateResource();
		if(Utils.isEmpty(strTemplate)){
			throw new IllegalArgumentException(Constants.Exception_Head + "字符串模板不能为空");
		}
		StringWriter writer = new StringWriter();
		VelocityContext context = VelocityHelper.convertDto2VelocityContext(pDto);
		try {
			if(log.isDebugEnabled())
				log.debug("字符串模板为:\n" + strTemplate);
				log.debug("模板引擎启动,正在驱动字符串模板合并...");
			ve.evaluate(context, writer, "eRedTemplateEngine.log", strTemplate);
			if(log.isDebugEnabled())
				log.debug("字符串模板合并成功.合并结果如下:\n" + writer);
		} catch (Exception e) {
			log.error(Constants.Exception_Head + "字符串模板合并失败");
			e.printStackTrace();
		}
		return writer;
	}
	
	/**
	 * 驱动字符串模板
	 * @param pTemplate 模板对象
	 * @param pDto 合并参数集合(将模板中所需变量全部压入Dto)
	 * @return 返回StringWriter对象
	 * @throws Exception 
	 * @throws Exception 
	 */
	protected StringWriter mergeFileTemplate(DefaultTemplate pTemplate, Dto pDto) {
		VelocityEngine ve = VelocityHelper.getVelocityEngine();
		String filePath = pTemplate.getTemplateResource();
		if(Utils.isEmpty(filePath)){
			throw new IllegalArgumentException(Constants.Exception_Head + "文件模板资源路径不能为空");
		}
		StringWriter writer = new StringWriter();
		Template template = null;
		try {
			if(log.isDebugEnabled())
				log.debug("模板引擎启动,正在生成文件模板...");
			template = ve.getTemplate(filePath);
			if(log.isDebugEnabled())
				log.debug("生成文件模板成功");
		} catch (Exception e) {
			log.error(Constants.Exception_Head + "生成文件模板失败");
			e.printStackTrace();
		}
		VelocityContext context = VelocityHelper.convertDto2VelocityContext(pDto);
		try {
			if(log.isDebugEnabled())
				log.debug("模板引擎启动,正在驱动文件模板合并...");
			template.merge(context, writer);
			if(log.isDebugEnabled())
				log.debug("合并文件模板成功.合并结果如下:\n" + writer);
		} catch (Exception e) {
			if(log.isDebugEnabled())log.error(Constants.Exception_Head + "文件模板合并失败");
			e.printStackTrace();
		} 
		return writer;
	}
	
}
