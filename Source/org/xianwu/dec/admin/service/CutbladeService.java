package org.xianwu.dec.admin.service;

import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.model.service.BizService;

/**
 * 切断切槽刀片
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface CutbladeService extends BizService {

	/**
	 * 保存刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto saveCutblade(Dto pDto);

	/**
	 * 批量保存刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveCutblade(List<Dto> list);
	
	/**
	 * 保存刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertCutblade(Dto pDto);
	
	/**
	 * 删除刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto deleteCutblade(Dto pDto);

	/**
	 * 修改刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateCutblade(Dto pDto);

    public Dto saveMainTable(Dto dto);
	
	public Dto saveSubTable(Dto dto);
	
}
