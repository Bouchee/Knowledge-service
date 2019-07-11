package org.xianwu.system.admin.service.impl;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.system.admin.service.ParamService;
import org.xianwu.system.common.util.idgenerator.IdHelper;

/**
 * 全局参数数据访问实现
 * 
 * @author XianwuFu
 * @since 2013-01-01
 * @see BizServiceImpl
 */
public class ParamServiceImpl extends BizServiceImpl implements ParamService{

	/**
	 * 保存参数信息表
	 */
	@SuppressWarnings("unchecked")
	public Dto saveParamItem(Dto pDto){
		pDto.put("paramid", IdHelper.getParamID());
		g4Dao.insert("Param.saveParamItem", pDto);
		return null;
	}

	/**
	 * 删除参数信息
	 * 
	 * @param pDto
	 */
	@SuppressWarnings("unchecked")
	public Dto deleteParamItem(Dto pDto){
		Dto dto = new BaseDto();
		String[] arrChecked = pDto.getAsString("strChecked").split(",");
		for(int i = 0; i < arrChecked.length; i++){
			dto.put("paramid", arrChecked[i]);
			g4Dao.delete("Param.deletParamItem", dto);
		}
		return null;
	}

	/**
	 * 修改参数信息
	 * 
	 * @param pDto
	 */
	public Dto updateParamItem(Dto pDto){
		g4Dao.update("Param.updateParamItem", pDto);
		return null;
	}

}
