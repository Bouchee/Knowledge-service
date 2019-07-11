package org.xianwu.core.web.report.fcf;

import java.util.HashMap;
import java.util.List;

/**
 * FlashReport组合图种类配置对象
 * <b>只适用与组合图
 * @author XianwuFu
 * @since 2013-01-01
 */
@SuppressWarnings("rawtypes")
public class CategoriesConfig extends HashMap{
	/**
	 * 
	 */
	private static final long serialVersionUID = -7863614447528945370L;

	/**
	 * 缺省属性配置
	 */
	@SuppressWarnings("unchecked")
	public CategoriesConfig(){
		this.put("font", "宋体");
		this.put("fontSize", "12");
	}
	
	/**
	 * 设置字体
	 * @param pFoneName
	 */
	@SuppressWarnings("unchecked")
	public void setFont(String pFoneName){
		this.put("font", pFoneName);
	}
	
	/**
	 * 设置字体大小
	 * @param pFoneName
	 */
	@SuppressWarnings("unchecked")
	public void setFontSize(String pFontSize){
		this.put("fontSize", pFontSize);
	}
	
	/**
	 * 设置字体颜色
	 * @param pFoneName
	 */
	@SuppressWarnings("unchecked")
	public void setFontColor(String pFontColor){
		this.put("fontColor", pFontColor);
	}
	
	/**
	 * 设置种类
	 * @param pCategoriesList
	 */
	@SuppressWarnings({ "unchecked" })
	public void setCategories(List pCategoriesList){
		this.put("categories", pCategoriesList);
	}
	
    /**
     * 获取种类
     * @return
     */
	public List getCategories(){
		return (List)this.get("categories");
	}
}
