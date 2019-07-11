package org.xianwu.dec.admin.service;

import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.model.service.BizService;

/**
 * 机床
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface MachinetoolService extends BizService {

	/**
	 * 保存机床
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto saveMachinetool(Dto pDto);

	/**
	 * 批量保存机床
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveMachinetool(List<Dto> list);

	/**
	 * 保存机床
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertMachinetool(Dto pDto);

	
	/**
	 * 删除机床
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto deleteMachinetool(Dto pDto);

	/**
	 * 修改机床
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateMachinetool(Dto pDto);

	public Dto saveMainTable(Dto dto);
	
	public Dto saveSubTable(Dto dto);
}
