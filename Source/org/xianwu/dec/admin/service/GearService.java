package org.xianwu.dec.admin.service;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.model.service.BizService;

/**
 * 齿轮
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface GearService extends BizService {

	/**
	 * 保存齿轮
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto saveGear(Dto pDto);
	
	/**
	 * 删除齿轮
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto deleteGear(Dto pDto);

	/**
	 * 修改齿轮
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateGear(Dto pDto);

	
}
