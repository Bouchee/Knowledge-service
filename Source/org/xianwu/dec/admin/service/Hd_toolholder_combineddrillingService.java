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
public interface Hd_toolholder_combineddrillingService extends BizService {

	/**
	 * 保存刀体
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto saveHd_toolholder_combineddrilling(Dto pDto);

	/**
	 * 批量保存复合钻刀体
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveHd_toolholder_combineddrilling(List<Dto> list);
	
	/**
	 * 保存刀体
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertHd_toolholder_combineddrilling(Dto pDto);

	
	/**
	 * 删除刀体
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto deleteHd_toolholder_combineddrilling(Dto pDto);

	/**
	 * 修改刀体
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateHd_toolholder_combineddrilling(Dto pDto);

    public Dto saveMainTable(Dto dto);
	
	public Dto saveSubTable(Dto dto);
	
}
