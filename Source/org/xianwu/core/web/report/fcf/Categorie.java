package org.xianwu.core.web.report.fcf;

import java.util.HashMap;

/**
 * FlashReport种类元对象<br>
 * <b>只适用与组合图
 * @author XianwuFu
 * @since 2013-01-01
 */
@SuppressWarnings({"rawtypes" })
public class Categorie extends HashMap {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -4284902711091190633L;

	public Categorie(String pName){
		setName(pName);
	}
	
	/**
	 * 设置名称属性
	 * @param pName
	 */
	@SuppressWarnings("unchecked")
	public void setName(String pName) {
		this.put("name", pName);
	}
	
	/**
	 * 设置鼠标悬停时候追加的文本
	 * @param pName
	 */
	@SuppressWarnings("unchecked")
	public void setHoverText(String pHoverText) {
		this.put("hoverText", pHoverText);
	}
}
