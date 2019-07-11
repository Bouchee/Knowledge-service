package org.xianwu.dec.admin.service;

import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.model.service.BizService;

/**
 * 切断切槽刀体
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface CuttoolholderService extends BizService {

	/**
	 * 保存刀体
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto saveCuttoolholder(Dto pDto);
	
	/**
	 * 批量保存刀体
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveCuttoolholder(List<Dto> list);

	/**
	 * 保存刀体
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertCuttoolholder(Dto pDto);

	
	/**
	 * 删除刀体
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto deleteCuttoolholder(Dto pDto);

	/**
	 * 修改刀体
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateCuttoolholder(Dto pDto);

    public Dto saveMainTable(Dto dto);
	
	public Dto saveSubTable(Dto dto);
	
}
