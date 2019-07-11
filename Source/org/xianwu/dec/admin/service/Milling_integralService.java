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
public interface Milling_integralService extends BizService {

	/**
	 * 保存整体刀具
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto saveMilling_integral(Dto pDto);

	/**
	 * 批量保存整体刀具
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveMilling_integral(List<Dto> list);
	
	/**
	 * 保存整体刀具
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertMilling_integral(Dto pDto);

	
	/**
	 * 删除整体刀具
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto deleteMilling_integral(Dto pDto);

	/**
	 * 修改整体刀具
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateMilling_integral(Dto pDto);

    public Dto saveMainTable(Dto dto);
	
	public Dto saveSubTable(Dto dto);
	
}
