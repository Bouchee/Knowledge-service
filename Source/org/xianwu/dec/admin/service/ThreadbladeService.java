package org.xianwu.dec.admin.service;

import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.model.service.BizService;

/**
 * 刀片
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface ThreadbladeService extends BizService {

	/**
	 * 保存刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto saveThreadblade(Dto pDto);
	
	/**
	 * 批量保存刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveThreadblade(List<Dto> list);

	/**
	 * 保存刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertThreadblade(Dto pDto);
	
	/**
	 * 删除刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto deleteThreadblade(Dto pDto);

	/**
	 * 修改刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateThreadblade(Dto pDto);

public Dto saveMainTable(Dto dto);
	
	public Dto saveSubTable(Dto dto);
}
