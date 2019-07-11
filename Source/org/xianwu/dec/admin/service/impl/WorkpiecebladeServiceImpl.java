package org.xianwu.dec.admin.service.impl;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.dec.admin.service.WorkpiecebladeService;

/**
 * 工件材料与刀片材质匹配规则
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class WorkpiecebladeServiceImpl extends BizServiceImpl implements WorkpiecebladeService {

	/**
	 * 保存工件材料与刀片材质匹配规则
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto saveWorkpieceblade(Dto pDto) {
		Dto outDto = new BaseDto();
		//pDto.put("promethodid", MaxId.getWorkpiecebladeID());
		g4Dao.insert("Workpieceblade.saveWorkpieceblade", pDto);
		outDto.put("msg", "工件材料与刀片材质匹配规则新增成功！");
		outDto.put("success", new Boolean(true));
		return outDto;
	}

	/**
	 * 保存工件材料与刀片材质匹配规则
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertWorkpieceblade(Dto pDto) {
		return saveWorkpieceblade(pDto);
	}
	
	/**
	 * 删除工件材料与刀片材质匹配规则
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto deleteWorkpieceblade(Dto pDto) {
		Dto dto = new BaseDto();
		String[] arrChecked = pDto.getAsString("strChecked").split(",");
		for (int i = 0; i < arrChecked.length; i++) {
			dto.put("workpiecematerialid", arrChecked[i]);
			dto.put("bladematerialid", arrChecked[i + 1]);
			g4Dao.delete("Workpieceblade.deleteWorkpieceblade", dto);
			i++;
		}
		return null;
	}

	/**
	 * 修改工件材料与刀片材质匹配规则
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateWorkpieceblade(Dto pDto) {
		
		g4Dao.update("Workpieceblade.updateWorkpieceblade", pDto);
		return null;
	}

}
