package org.xianwu.dec.admin.service;

import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.model.service.BizService;

/**
 * 机夹刀具刀片
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface Hd_module_reaming_clampService extends BizService {

	/**
	 * 保存机夹刀具刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto saveHd_module_reaming_clamp(Dto pDto);

	/**
	 * 保存机夹刀具刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertHd_module_reaming_clamp(Dto pDto);

	/**
	 * 批量保存机夹式铰刀模块
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveHd_module_reaming_clamp(List<Dto> list);
	
	
	/**
	 * 删除机夹刀具刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto deleteHd_module_reaming_clamp(Dto pDto);

	/**
	 * 修改机夹刀具刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateHd_module_reaming_clamp(Dto pDto);

    public Dto saveMainTable(Dto dto);
	
	public Dto saveSubTable(Dto dto);
	
	
}
