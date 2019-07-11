package org.xianwu.dec.admin.service;

import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.model.service.BizService;

/**
 * 机夹刀具刀片
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface Hd_blade_poledrillingService extends BizService {

	/**
	 * 保存机夹刀具刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto saveHd_blade_poledrilling(Dto pDto);

	/**
	 * 批量保存浅孔钻刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveHd_blade_poledrilling(List<Dto> list);
	

	/**
	 * 保存机夹刀具刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertHd_blade_poledrilling(Dto pDto);

	
	/**
	 * 删除机夹刀具刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto deleteHd_blade_poledrilling(Dto pDto);

	/**
	 * 修改机夹刀具刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateHd_blade_poledrilling(Dto pDto);


    public Dto saveMainTable(Dto dto);
	
	public Dto saveSubTable(Dto dto);
}
