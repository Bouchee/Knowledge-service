package org.xianwu.dec.admin.service;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.model.service.BizService;

/**
 * 工件材料与刀片材质匹配规则
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface WorkpiecebladeService extends BizService {

	/**
	 * 保存工件材料与刀片材质匹配规则
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto saveWorkpieceblade(Dto pDto);

	/**
	 * 保存工件材料与刀片材质匹配规则
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertWorkpieceblade(Dto pDto);

	
	/**
	 * 删除工件材料与刀片材质匹配规则
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto deleteWorkpieceblade(Dto pDto);

	/**
	 * 修改工件材料与刀片材质匹配规则
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateWorkpieceblade(Dto pDto);

	
}
