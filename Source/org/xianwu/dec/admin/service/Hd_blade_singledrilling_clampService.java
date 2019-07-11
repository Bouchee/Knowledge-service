  package org.xianwu.dec.admin.service;

import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.model.service.BizService;

/**
 * 单刀片机夹钻刀片
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface Hd_blade_singledrilling_clampService extends BizService {

	/**
	 * 保存单刀片机夹钻刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto saveHd_blade_singledrilling_clamp(Dto pDto);

	/**
	 * 批量保存单刀片机夹钻刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveHd_blade_singledrilling_clamp(List<Dto> list);
	
	/**
	 * 保存单刀片机夹钻刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertHd_blade_singledrilling_clamp(Dto pDto);

	
	/**
	 * 删除单刀片机夹钻刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto deleteHd_blade_singledrilling_clamp(Dto pDto);

	/**
	 * 修改单刀片机夹钻刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateHd_blade_singledrilling_clamp(Dto pDto);

    public Dto saveMainTable(Dto dto);
	
	public Dto saveSubTable(Dto dto);
	
}
