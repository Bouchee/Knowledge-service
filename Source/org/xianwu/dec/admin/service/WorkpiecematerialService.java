package org.xianwu.dec.admin.service;

import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.model.service.BizService;

/**
 * 工件材料
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface WorkpiecematerialService extends BizService {

	/**
	 * 保存工件材料
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto saveWorkmaterial(Dto pDto);

	/**
	 * 批量保存工件材料
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveWorkpiecematerial(List<Dto> list);
	
	/**
	 * 保存工件材料
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertWorkmaterial(Dto pDto);

	/**
	 * 删除工件材料
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto deleteWorkmaterial(Dto pDto);

	/**
	 * 修改工件材料
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateWorkmaterial(Dto pDto);

	
    public Dto saveMainTable(Dto dto);
	
	public Dto saveSubTable(Dto dto);
	
}
