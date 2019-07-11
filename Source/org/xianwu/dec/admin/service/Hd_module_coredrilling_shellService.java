package org.xianwu.dec.admin.service;

import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.model.service.BizService;

/**
 * 模块
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface Hd_module_coredrilling_shellService extends BizService {

	/**
	 * 保存 模块
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto saveHd_module_coredrilling_shell(Dto pDto);

	/**
	 * 批量保存套式扩孔钻模块
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveHd_module_coredrilling_shell(List<Dto> list);
	
	/**
	 * 保存 模块
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertHd_module_coredrilling_shell(Dto pDto);

	
	/**
	 * 删除 模块
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto deleteHd_module_coredrilling_shell(Dto pDto);

	/**
	 * 修改 模块
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateHd_module_coredrilling_shell(Dto pDto);


    public Dto saveMainTable(Dto dto);
	
	public Dto saveSubTable(Dto dto);
	
}
