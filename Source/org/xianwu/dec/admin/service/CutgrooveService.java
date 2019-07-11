package org.xianwu.dec.admin.service;

import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.model.service.BizService;

/**
 * 切断切槽刀片槽型种类
 *
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface CutgrooveService extends BizService {

	/**
	 * 保存槽形种类
	 *
	 * @param pDto
	 * @return
	 */
	public Dto saveCutgroove(Dto pDto);
	
	/**
	 * 批量保存槽型
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveCutgroove(List<Dto> list);
	

	/**
	 * 保存槽形种类
	 *
	 * @param pDto
	 * @return
	 */
	public Dto insertCutgroove(Dto pDto);

	/**
	 * 删除槽形种类
	 *
	 * @param pDto
	 * @return
	 */
	public Dto deleteCutgroove(Dto pDto);

	/**
	 * 修改槽形种类
	 *
	 * @param pDto
	 * @return
	 */
	public Dto updateCutgroove(Dto pDto);

    public Dto saveMainTable(Dto dto);
	
	public Dto saveSubTable(Dto dto);

}
