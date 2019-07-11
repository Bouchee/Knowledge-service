package org.xianwu.core.model.service.impl;

import org.xianwu.core.model.dao.Dao;
import org.xianwu.core.model.service.BizService;
import org.xianwu.core.properties.PropertiesFactory;
import org.xianwu.core.properties.PropertiesFile;
import org.xianwu.core.properties.PropertiesHelper;

/**
 * 业务模型实现基类<br>
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class BizServiceImpl implements BizService {

	/**
	 * 基类中给子类暴露的一个DAO接口<br>
	 * 连接平台数据库
	 */
	protected Dao g4Dao;

	protected static PropertiesHelper g4PHelper = PropertiesFactory.getPropertiesHelper(PropertiesFile.GLOBAL);
	
	protected static PropertiesHelper appPHelper = PropertiesFactory.getPropertiesHelper(PropertiesFile.APP);
    
	public void setG4Dao(Dao g4Dao) {
		this.g4Dao = g4Dao;
	}
}
