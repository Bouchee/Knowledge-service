package org.xianwu.system.common.util.idgenerator;

import org.xianwu.core.id.SequenceStorer;
import org.xianwu.core.id.StoreSequenceException;
import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.SpringBeanLoader;
import org.xianwu.core.model.dao.Dao;

/**
 * ID数据库逻辑存储器
 * @author XianwuFu
 * @since 2013-01-01
 */
public class DBSequenceStorer implements SequenceStorer{
	
	private Dao g4Dao = (Dao)SpringBeanLoader.getSpringBean("g4Dao");
	
	/**
	 * 返回当前最大序列号
	 */
	@SuppressWarnings("unchecked")
	public long load(String pIdColumnName) throws StoreSequenceException {
		Dto dto = new BaseDto();
		dto.put("fieldname", pIdColumnName);
		dto = (BaseDto)g4Dao.queryForObject("IdGenerator.getEaSequenceByFieldName", dto);
		Long maxvalue = dto.getAsLong("maxid");
		return maxvalue.longValue();
	}
	
	/**
	 * 写入当前生成的最大序列号值
	 */
	@SuppressWarnings("unchecked")
	public void  updateMaxValueByFieldName(long pMaxId, String pIdColumnName) throws StoreSequenceException {
		Dto dto = new BaseDto();
		dto.put("maxid", String.valueOf(pMaxId));
		dto.put("fieldname", pIdColumnName);
		g4Dao.update("IdGenerator.updateMaxValueByFieldName", dto);
	}
}
