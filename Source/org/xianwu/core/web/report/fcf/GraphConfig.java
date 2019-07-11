package org.xianwu.core.web.report.fcf;

import java.util.HashMap;

/**
 * FlashReport样式配置对象
 * @author XianwuFu
 * @since 2013-01-01
 */
@SuppressWarnings("rawtypes")
public class GraphConfig extends HashMap {
	/**
	 * 
	 */
	private static final long serialVersionUID = -7282232885127146593L;

	@SuppressWarnings("unchecked")
	public GraphConfig(){
		this.put("baseFont", "宋体");
		this.put("baseFontSize", "12");
		this.put("canvasBorderThickness", "1");
		
	}
	
	/**
	 * 设置主标题
	 * @param pCaption
	 */
	@SuppressWarnings("unchecked")
	public void setCaption(String pCaption){
		this.put("caption", pCaption);
	}
	
	/**
	 * 设置副标题
	 * @param pSubcaption
	 */
	@SuppressWarnings("unchecked")
	public void setSubcaption(String pSubcaption){
		this.put("subcaption", pSubcaption);
	}
	
	/**
	 * 设置X坐标轴名称
	 * @param pXAxisName
	 */
	@SuppressWarnings("unchecked")
	public void setXAxisName(String pXAxisName){
		this.put("xAxisName", pXAxisName);
	}
	
	/**
	 * 设置Y坐标轴名称
	 * @param pYAxisName
	 */
	@SuppressWarnings("unchecked")
	public void setYAxisName(String pYAxisName){
		this.put("yAxisName", pYAxisName);
	}
	
	/**
	 * 设置字体
	 * @param pBaseFont
	 */
	@SuppressWarnings("unchecked")
	public void setBaseFont(String pBaseFont){
		this.put("baseFont", pBaseFont);
	}
	
	/**
	 * 设置字体大小
	 * @param pBaseFontSize
	 */
	@SuppressWarnings("unchecked")
	public void setBaseFontSize(String pBaseFontSize){
		this.put("baseFontSize", pBaseFontSize);
	}
	
	/**
	 * 设置数字值的前缀
	 * @param pNumberPrefix
	 */
	@SuppressWarnings("unchecked")
	public void setNumberPrefix(String pNumberPrefix){
		this.put("numberPrefix", pNumberPrefix);
	}
	
	/**
	 * 设置细边框
	 * @param pCanvasBorderThickness
	 */
	@SuppressWarnings("unchecked")
	public void setCanvasBorderThickness(Boolean pCanvasBorderThickness){
		this.put("canvasBorderThickness", pCanvasBorderThickness.booleanValue() ? "1" : "0");
	}
	
	/**
	 * 设置边框颜色
	 * @param pCanvasBorderColor
	 */
	@SuppressWarnings("unchecked")
	public void setCanvasBorderColor(String pCanvasBorderColor){
		this.put("CanvasBorderColor", pCanvasBorderColor);
	}
	
	/**
	 * 设置是否图上显示分类名称
	 * @param pCanvasBorderColor
	 */
	@SuppressWarnings("unchecked")
	public void setShowNames(Boolean pShowNames){
		this.put("showNames", pShowNames.booleanValue() ? "1" : "0");
	}
	
	/**
	 * 设置是否显示数据
	 * @param pAreaBorderThickness
	 */
	@SuppressWarnings("unchecked")
	public void setShowValues(Boolean pShowValues){
		this.put("showValues", pShowValues.booleanValue() ? "1" : "0");
	}
}
