package org.xianwu.core.metatype;

import java.io.Serializable;

import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.util.Utils;


/**
 * 实体对象基类<br>
 * 每一个实体对象对应一张数据库表结构,表字段分别和实体对象属性一一对应<br>
 * <b>注意：实体对象类只允许由平台的代码生成工具生成,不允许手工改动
 * @author XianwuFu
 * @since 2013-01-01
 * @see java.io.Serializable
 */
public abstract class BaseDomain implements Serializable{
	
    /**
	 * 
	 */
	private static final long serialVersionUID = 2722077440064026428L;

	/**
     * 将实体领域对象转换为Dto对象
     * @return dto 返回的Dto对象
     */
	public Dto toDto(){
		Dto dto = new BaseDto();
		Utils.copyPropFromBean2Dto(this, dto);
	   	//BeanUtils自动将getPk()方法认为是Bean属性拷贝到了Dto对象中,故将其移除.
    	dto.remove("pk");
		return dto;
	}
	
	/**
	 * 将实体领域对象转换为XML字符串
	 * @param pStyle XML文档风格
	 * @return String 返回的XML格式字符串
	 */
    public String toXml(String pStyle){
    	Dto dto = toDto();
    	return dto.toXml(pStyle);
    }
    
	/**
	 * 将实体领域对象转换为JSON字符串
	 * @return String 返回的JSON格式字符串
	 */
    public String toJson(){
    	Dto dto = toDto();
    	return dto.toJson();
    }
    
    /**
     * 获取主键或强制非空键值组合
     */
    public abstract PKey getPk();

}
