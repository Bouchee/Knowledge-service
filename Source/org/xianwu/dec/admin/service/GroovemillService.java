package org.xianwu.dec.admin.service;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.model.service.BizService;

/**
 * 槽铣
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface GroovemillService extends BizService {

	/**
	 * 保存刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto saveGroovemill(Dto pDto);

	/**
	 * 保存刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertGroovemill(Dto pDto);
	
	/**
	 * 删除刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto deleteGroovemill(Dto pDto);

	/**
	 * 修改刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateGroovemill(Dto pDto);

	
}
