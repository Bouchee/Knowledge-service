package org.xianwu.dec.admin.service;

import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.model.service.BizService;

/**
 * 机夹刀具刀体
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface Hd_toolholder_reaming_clampService extends BizService {

	/**
	 * 保存机夹刀具刀体
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto saveHd_toolholder_reaming_clamp(Dto pDto);

	/**
	 * 批量保存机夹式铰刀刀体
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveHd_toolholder_reaming_clamp(List<Dto> list);
	
	/**
	 * 保存机夹刀具刀体
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertHd_toolholder_reaming_clamp(Dto pDto);

	
	/**
	 * 删除机夹刀具刀体
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto deleteHd_toolholder_reaming_clamp(Dto pDto);

	/**
	 * 修改机夹刀具刀体
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateHd_toolholder_reaming_clamp(Dto pDto);

    public Dto saveMainTable(Dto dto);
	
	public Dto saveSubTable(Dto dto);
	
	
}
