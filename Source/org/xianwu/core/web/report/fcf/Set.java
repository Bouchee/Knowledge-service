package org.xianwu.core.web.report.fcf;

import java.util.HashMap;

/**
 * FlashReport数据元对象
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
@SuppressWarnings("rawtypes")
public class Set extends HashMap {
	/**
	 * 
	 */
	private static final long serialVersionUID = 7852888145221745736L;

	/**
	 * 设置名称属性
	 * @param pName
	 */
	@SuppressWarnings("unchecked")
	public void setName(String pName) {
		this.put("name", pName);
	}
	
	/**
	 * 设置值属性
	 * @param pName
	 */
	@SuppressWarnings("unchecked")
	public void setValue(String pValue) {
		this.put("value", pValue);
	}
	
	/**
	 * 设置颜色属性
	 * @param pName
	 */
	@SuppressWarnings("unchecked")
	public void setColor(String pColor) {
		this.put("color", pColor);
	}
	
	/**
	 * 设置浮动属性<br>
	 * <b>只针对2D饼图有效
	 * @param pName
	 */
	@SuppressWarnings("unchecked")
	public void setIsSliced(String pIsSliced) {
		this.put("isSliced", pIsSliced);
	}
	
	/**
	 * 设置鼠标悬停时候追加的文本
	 * @param pName
	 */
	@SuppressWarnings("unchecked")
	public void setHoverText(String pHoverText) {
		this.put("hoverText", pHoverText);
	}
	
	/**
	 * 设置透明度
	 * 只对漏斗图有效
	 * @param pAlpha
	 */
	@SuppressWarnings("unchecked")
	public void setAlpha(String pAlpha) {
		this.put("alpha", pAlpha);
	}
	
	/**
	 * 设置和图形交互的JS函数
	 * 函数中的入参必须使用双引号不能使用单引号
	 * @param pFunction
	 */
	@SuppressWarnings("unchecked")
	public void setJsFunction(String pFunction) {
		this.put("link", "JavaScript:" + pFunction + ";");
	}
	
	/**
	 * 设置和图形的下钻链接
	 * @param pLink
	 */
	@SuppressWarnings("unchecked")
	public void setLink(String pLink) {
		this.put("link", "n-" + pLink);
	}
}
