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
public interface ThreadtoolholderService extends BizService {

	/**
	 * 保存刀体
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto saveThreadtoolholder(Dto pDto);
	
	/**
	 * 批量保存刀体
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveThreadtoolholder(List<Dto> list);

	/**
	 * 保存刀体
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertThreadtoolholder(Dto pDto);

	
	/**
	 * 删除刀体
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto deleteThreadtoolholder(Dto pDto);

	/**
	 * 修改刀体
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateThreadtoolholder(Dto pDto);
public Dto saveMainTable(Dto dto);
	
	public Dto saveSubTable(Dto dto);
	
}
