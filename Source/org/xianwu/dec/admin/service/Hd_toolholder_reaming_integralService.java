package org.xianwu.dec.admin.service;

import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.model.service.BizService;

/**
 * 整体刀具
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface Hd_toolholder_reaming_integralService extends BizService {

	/**
	 * 保存整体刀具
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto saveHd_toolholder_reaming_integral(Dto pDto);

	/**
	 * 保存整体刀具
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertHd_toolholder_reaming_integral(Dto pDto);

	/**
	 * 批量保存整体铰刀
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveHd_toolholder_reaming_integral(List<Dto> list);
	
	
	/**
	 * 删除整体刀具
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto deleteHd_toolholder_reaming_integral(Dto pDto);

	/**
	 * 修改整体刀具
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateHd_toolholder_reaming_integral(Dto pDto);

    public Dto saveMainTable(Dto dto);
	
	public Dto saveSubTable(Dto dto);
	
	
}
