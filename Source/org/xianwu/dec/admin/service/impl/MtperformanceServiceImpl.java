package org.xianwu.dec.admin.service.impl;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.dec.admin.service.MtperformanceService;
import org.xianwu.system.common.util.idgenerator.MaxId;

/**
 * 机床性能卡
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class MtperformanceServiceImpl extends BizServiceImpl implements MtperformanceService {

	/**
	 * 保存机床性能卡
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto saveMtperformance(Dto pDto) {
		Dto outDto = new BaseDto();
		pDto.put("mtperformanceid", MaxId.getMtperformanceID());
		g4Dao.insert("Mtperformance.saveMtperformance", pDto);
		outDto.put("msg", "机床性能卡新增成功！");
		outDto.put("success", new Boolean(true));
		return outDto;
	}

	/**
	 * 保存机床性能卡
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertMtperformance(Dto pDto) {
		return saveMtperformance(pDto);
	}
	
	/**
	 * 删除机床性能卡
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto deleteMtperformance(Dto pDto) {
		Dto dto = new BaseDto();
		String[] arrChecked = pDto.getAsString("strChecked").split(",");
		for (int i = 0; i < arrChecked.length; i++) {
			dto.put("mtperformanceid", arrChecked[i]);
			//g4Dao.delete("Mtperformance.deleteMachinetoolholder4Machinetool4Mtperformance", dto);
			//g4Dao.delete("Mtperformance.deleteMachinetool4Mtperformance", dto);
			g4Dao.delete("Mtperformance.deleteMtperformance", dto);
		}
		return null;
	}

	/**
	 * 修改机床性能卡
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateMtperformance(Dto pDto) {
		
		g4Dao.update("Mtperformance.updateMtperformance", pDto);
		return null;
	}

}
