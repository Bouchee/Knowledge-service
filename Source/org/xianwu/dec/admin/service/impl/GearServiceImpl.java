package org.xianwu.dec.admin.service.impl;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.dec.admin.service.GearService;
import org.xianwu.system.common.util.idgenerator.MaxId;

/**
 * 齿轮
 *
 * @author XianwuFu
 * @since 2013-01-01
 */
public class GearServiceImpl extends BizServiceImpl implements GearService {

	/**
	 * 保存机床
	 *
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto saveGear(Dto pDto) {
		Dto outDto = new BaseDto();
		pDto.put("gearid", MaxId.getGearID());
		g4Dao.insert("Gear.saveGear", pDto);
		outDto.put("msg", "齿轮新增成功！");
		outDto.put("success", new Boolean(true));
		return outDto;
	}

	/**
	 * 删除齿轮
	 *
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto deleteGear(Dto pDto) {
		Dto dto = new BaseDto();
		String[] arrChecked = pDto.getAsString("strChecked").split(",");
		for (int i = 0; i < arrChecked.length; i++) {
			dto.put("gearid", arrChecked[i]);
			
			g4Dao.delete("Gear.deleteGear", dto);
		}
		return null;
	}

	/**
	 * 修改齿轮
	 *
	 * @param pDto
	 * @return
	 */
	public Dto updateGear(Dto pDto) {

		g4Dao.update("Gear.updateGear", pDto);
		return null;
	}

}
