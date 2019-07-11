package org.xianwu.dec.admin.service.impl;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.dec.admin.service.MachinetoolholderService;


/**
 * 机床刀体关系
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class MachinetoolholderServiceImpl extends BizServiceImpl implements MachinetoolholderService {

	/**
	 * 保存机床刀体关系
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto saveMachinetoolholder(Dto pDto) {
		Dto outDto = new BaseDto();
		//pDto.put("machinetoolholderid", IDHelper.getMachinetoolholderID());
		g4Dao.insert("Machinetoolholder.saveMachinetoolholder", pDto);
		outDto.put("msg", "机床刀体关系新增成功！");
		outDto.put("success", new Boolean(true));
		return outDto;
	}

	/**
	 * 保存机床刀体关系
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertMachinetoolholder(Dto pDto) {
		return saveMachinetoolholder(pDto);
	}
	
	/**
	 * 删除机床刀体关系
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto deleteMachinetoolholder(Dto pDto) {
		Dto dto = new BaseDto();
		String[] arrChecked = pDto.getAsString("strChecked").split(",");
		for (int i = 0; i < arrChecked.length; i++) {
			dto.put("machinetoolholderid", arrChecked[i]);
			dto.put("toolholderid", arrChecked[i + 1]);
			g4Dao.delete("Machinetoolholder.deleteMachinetoolholder", dto);
			i++;
		}
		return null;
	}

	/**
	 * 修改机床刀体关系
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateMachinetoolholder(Dto pDto) {
		
		g4Dao.update("Machinetoolholder.updateMachinetoolholder", pDto);
		return null;
	}

}
