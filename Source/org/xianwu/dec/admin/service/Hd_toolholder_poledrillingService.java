package org.xianwu.dec.admin.service;

import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.model.service.BizService;

/**
 * 浅孔钻刀体
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface Hd_toolholder_poledrillingService extends BizService {

	/**
	 * 保存浅孔钻刀体
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto saveHd_toolholder_poledrilling(Dto pDto);

	/**
	 * 批量保存浅孔钻刀体
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveHd_toolholder_poledrilling(List<Dto> list);
	

	/**
	 * 插入浅孔钻刀体
	 * 
	 * @return
	 */
	public Dto insertHd_toolholder_poledrilling(Dto pDto);

	
	/**
	 * 删除浅孔钻刀体
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto deleteHd_toolholder_poledrilling(Dto pDto);

	/**
	 * 修改浅孔钻刀体
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateHd_toolholder_poledrilling(Dto pDto);


    public Dto saveMainTable(Dto dto);
	
	public Dto saveSubTable(Dto dto);
}
