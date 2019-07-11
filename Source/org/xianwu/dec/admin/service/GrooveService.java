package org.xianwu.dec.admin.service;

import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.model.service.BizService;

/**
 * 品牌种类
 *
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface GrooveService extends BizService {

	/**
	 * 保存槽形种类
	 *
	 * @param pDto
	 * @return
	 */
	public Dto saveGroove(Dto pDto);

	/**
	 * 批量保存槽型
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveGroove(List<Dto> list);
	
	/**
	 * 保存槽形种类
	 *
	 * @param pDto
	 * @return
	 */
	public Dto insertGroove(Dto pDto);

	/**
	 * 删除槽形种类
	 *
	 * @param pDto
	 * @return
	 */
	public Dto deleteGroove(Dto pDto);

	/**
	 * 修改槽形种类
	 *
	 * @param pDto
	 * @return
	 */
	public Dto updateGroove(Dto pDto);

public Dto saveMainTable(Dto dto);
	
	public Dto saveSubTable(Dto dto);
}
