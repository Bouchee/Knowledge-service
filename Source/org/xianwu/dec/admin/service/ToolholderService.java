package org.xianwu.dec.admin.service;

import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.model.service.BizService;

/**
 * 刀体
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface ToolholderService extends BizService {

	/**
	 * 保存刀体
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto saveToolholder(Dto pDto);

	/**
	 * 批量保存刀体
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveToolholder(List<Dto> list);

	/**
	 * 保存刀体
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertToolholder(Dto pDto);

	
	/**
	 * 删除刀体
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto deleteToolholder(Dto pDto);

	/**
	 * 修改刀体
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateToolholder(Dto pDto);

public Dto saveMainTable(Dto dto);
	
	public Dto saveSubTable(Dto dto);
}
