package org.xianwu.dec.admin.service;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.model.service.BizService;

/**
 * 机床刀体关系
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface MachinetoolholderService extends BizService {

	/**
	 * 保存机床刀体关系
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto saveMachinetoolholder(Dto pDto);

	/**
	 * 保存机床刀体关系
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertMachinetoolholder(Dto pDto);

	
	/**
	 * 删除机床刀体关系
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto deleteMachinetoolholder(Dto pDto);

	/**
	 * 修改机床刀体关系
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateMachinetoolholder(Dto pDto);

	
}
