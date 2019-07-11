package org.xianwu.core.tplengine;

import java.io.StringWriter;

import org.xianwu.core.metatype.Dto;

/**
 * 模板引擎接口
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface TemplateEngine {
	/**
	 * 驱动模板
	 * @param pTemplate 模板对象
	 * @param pDto 合并参数集合(将模板中所需变量全部压入Dto)
	 * @return 引擎驱动后的StringWriter对象
	 */
	public StringWriter mergeTemplate(DefaultTemplate pTemplate, Dto pDto);
	
}
