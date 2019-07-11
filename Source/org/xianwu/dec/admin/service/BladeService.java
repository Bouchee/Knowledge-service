package org.xianwu.dec.admin.service;

import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.model.service.BizService;

/**
 * 刀片
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface BladeService extends BizService {

	/**
	 * 保存刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto saveBlade(Dto pDto);

	/**
	 * 批量保存刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveBlade(List<Dto> list);
	
	/**
	 * 保存刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertBlade(Dto pDto);
	
	/**
	 * 删除刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto deleteBlade(Dto pDto);

	/**
	 * 修改刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateBlade(Dto pDto);

    public Dto saveMainTable(Dto dto);
	
	public Dto saveSubTable(Dto dto);
}
