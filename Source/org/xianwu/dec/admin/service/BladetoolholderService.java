package org.xianwu.dec.admin.service;

import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.model.service.BizService;

/**
 * 刀片刀体匹配关系
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface BladetoolholderService extends BizService {

	/**
	 * 保存刀片刀体匹配关系
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto saveBladetoolholder(Dto pDto);

	/**
	 * 保存刀片刀体匹配关系
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertBladetoolholder(Dto pDto);

	
	/**
	 * 删除刀片刀体匹配关系
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto deleteBladetoolholder(Dto pDto);

	/**
	 * 修改刀片刀体匹配关系
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateBladetoolholder(Dto pDto);


}
