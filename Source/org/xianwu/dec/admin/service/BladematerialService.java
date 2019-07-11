package org.xianwu.dec.admin.service;

import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.model.service.BizService;

/**
 * 刀片材质
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface BladematerialService extends BizService {

	/**
	 * 保存刀片材质
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto saveBladematerial(Dto pDto);

	/**
	 * 批量保存刀片材料
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveBladematerial(List<Dto> list);
	
	/**
	 * 保存刀片材质
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertBladematerial(Dto pDto);

	
	/**
	 * 删除刀片材质
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto deleteBladematerial(Dto pDto);

	/**
	 * 修改刀片材质
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateBladematerial(Dto pDto);

public Dto saveMainTable(Dto dto);
	
	public Dto saveSubTable(Dto dto);
}
