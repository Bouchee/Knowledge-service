package org.xianwu.dec.admin.service;

import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.model.service.BizService;

/**
 * 切断切槽刀片材质
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface CutbladematerialService extends BizService {

	/**
	 * 保存刀片材质
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto saveCutbladematerial(Dto pDto);

	/**
	 * 批量保存刀片材质
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveCutbladematerial(List<Dto> list);
	
	/**
	 * 保存刀片材质
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertCutbladematerial(Dto pDto);

	
	/**
	 * 删除刀片材质
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto deleteCutbladematerial(Dto pDto);

	/**
	 * 修改刀片材质
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateCutbladematerial(Dto pDto);

    public Dto saveMainTable(Dto dto);
	
	public Dto saveSubTable(Dto dto);
	
}
