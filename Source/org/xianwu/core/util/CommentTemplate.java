package org.xianwu.core.util;

import java.util.HashMap;
import java.util.Map;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;

/**
 * 代码注释规范模版
 * 这里是类注释的描述部分,这部分支持HTML标记哦。<br>换行了哦
 * <p>文本块显示哦<p>很方便的哈<strong>这里是粗体显示哦</strong>
 * 还支持更多的html标记,请查看《eRedBOS产品代码注释规范》文档
 * @author XianwuFu <必需项>
 * @since 2013-01-01 <必须项>
 */
public class CommentTemplate extends BaseDto{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -4395632131453629113L;
	/**
	 * 类实例变量1的注视
	 */
	@SuppressWarnings("unused")
	private String instanceVarable1;
	
	/**
	 * 这里是methodA的描述说明<也支持HTML标记的哦>
	 * @param pId 入参1的说明
	 * @param pDto 入参2的说明
	 * @return map 出参说明
	 * @exception 异常说明
	 */
	@SuppressWarnings({ "rawtypes", "unchecked", "unused" })
	public Map methodA(String pId, Dto pDto) throws Exception{
		//方法体内部的单行注释
		Map map = new HashMap();
		/*
		 * 方法体内部的块级注释
		 * 说明：方法体内部的注释能不写就不写
		 */
		map.put("a", "01");
		String strTest = null;
		if(true){
			//逻辑判断注释
			strTest = "A";
		}else{
			//逻辑判断注释
			strTest = "B";
		}
		return map;
	}
}
