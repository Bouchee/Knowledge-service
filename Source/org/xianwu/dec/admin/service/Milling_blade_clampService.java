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
public interface Milling_blade_clampService extends BizService {

	/**
	 * 保存机夹刀具刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto saveMilling_blade_clamp(Dto pDto);
	
	/**
	 * 批量保存机夹刀具刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveMilling_blade_clamp(List<Dto> list);
	

	/**
	 * 保存机夹刀具刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertMilling_blade_clamp(Dto pDto);

	
	/**
	 * 删除机夹刀具刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto deleteMilling_blade_clamp(Dto pDto);

	/**
	 * 修改机夹刀具刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateMilling_blade_clamp(Dto pDto);


    public Dto saveMainTable(Dto dto);
	
	public Dto saveSubTable(Dto dto);
}
