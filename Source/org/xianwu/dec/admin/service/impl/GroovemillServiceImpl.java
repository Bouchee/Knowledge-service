package org.xianwu.dec.admin.service.impl;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.dec.admin.service.GroovemillService;

/**
 * 刀片
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class GroovemillServiceImpl extends BizServiceImpl implements GroovemillService {

	/**
	 * 保存刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto saveGroovemill(Dto pDto) {
		Dto outDto = new BaseDto();
		/*pDto.put("groovemillid", MaxId.getGroovemillID());
		g4Dao.insert("Groovemill.saveGroovemill", pDto);
		outDto.put("msg", "刀片新增成功！");
		outDto.put("success", new Boolean(true));*/
		return outDto;
	}
	
	/**
	 * 保存刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertGroovemill(Dto pDto) {
		return saveGroovemill(pDto);
	}

	/**
	 * 删除刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto deleteGroovemill(Dto pDto) {
		/*Dto dto = new BaseDto();
		String[] arrChecked = pDto.getAsString("strChecked").split(",");
		for (int i = 0; i < arrChecked.length; i++) {
			dto.put("groovemillid", arrChecked[i]);
			g4Dao.update("Groovemill.updateGroovemilltoolholder4Groovemill", dto);
			g4Dao.delete("Groovemill.deleteGroovemill", dto);
		}*/
		return null;
	}

	/**
	 * 修改刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateGroovemill(Dto pDto) {
		g4Dao.update("Groovemill.updateGroovemill", pDto);
		return null;
	}

}
