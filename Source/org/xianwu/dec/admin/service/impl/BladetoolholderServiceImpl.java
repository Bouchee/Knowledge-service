package org.xianwu.dec.admin.service.impl;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.dec.admin.service.BladetoolholderService;

/**
 * 刀片刀体匹配关系
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class BladetoolholderServiceImpl extends BizServiceImpl implements BladetoolholderService {

	/**
	 * 保存刀片刀体匹配关系
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto saveBladetoolholder(Dto pDto) {
		Dto outDto = new BaseDto();
		//pDto.put("bladetoolholderid", IDHelper.getBladetoolholderID());
		g4Dao.insert("Bladetoolholder.saveBladetoolholder", pDto);
		outDto.put("msg", "刀片刀体匹配关系新增成功！");
		outDto.put("success", new Boolean(true));
		return outDto;
	}

	/**
	 * 保存刀片刀体匹配关系
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertBladetoolholder(Dto pDto) {
		return saveBladetoolholder(pDto);
	}
	
	/**
	 * 删除刀片刀体匹配关系
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto deleteBladetoolholder(Dto pDto) {
		//
		Dto dto = new BaseDto();
		String[] arrChecked = pDto.getAsString("strChecked").split(",");
		for (int i = 0; i < arrChecked.length; i++) {
			dto.put("bladeid", arrChecked[i]);
			dto.put("toolholderid", arrChecked[i + 1]);
			g4Dao.delete("Bladetoolholder.deleteBladetoolholder", dto);
			i++;
		}
		return null;
	}

	/**
	 * 修改刀片刀体匹配关系
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateBladetoolholder(Dto pDto) {
		g4Dao.update("Bladetoolholder.updateBladetoolholder", pDto);
		return null;
	}

}
