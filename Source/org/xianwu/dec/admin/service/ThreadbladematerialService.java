package org.xianwu.dec.admin.service;

import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.model.service.BizService;

/**
 * 刀片材质
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface ThreadbladematerialService extends BizService {

	/**
	 * 保存刀片材质
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto saveThreadbladematerial(Dto pDto);
	
	/**
	 * 批量保存刀片材料
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveThreadbladematerial(List<Dto> list);

	/**
	 * 保存刀片材质
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertThreadbladematerial(Dto pDto);

	
	/**
	 * 删除刀片材质
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto deleteThreadbladematerial(Dto pDto);

	/**
	 * 修改刀片材质
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateThreadbladematerial(Dto pDto);

public Dto saveMainTable(Dto dto);
	
	public Dto saveSubTable(Dto dto);
}
