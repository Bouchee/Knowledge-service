package org.xianwu.dec.admin.service;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.model.service.BizService;

/**
 * 机床性能卡
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface MtperformanceService extends BizService {

	/**
	 * 保存机床性能卡
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto saveMtperformance(Dto pDto);

	/**
	 * 保存机床性能卡
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertMtperformance(Dto pDto);

	
	/**
	 * 删除机床性能卡
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto deleteMtperformance(Dto pDto);

	/**
	 * 修改机床性能卡
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateMtperformance(Dto pDto);

	
}
