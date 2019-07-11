package org.xianwu.dec.admin.service;

import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.model.service.BizService;

/**
 * 丝锥
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface Hd_toolholder_tappingService extends BizService {

	/**
	 * 保存丝锥
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto saveHd_toolholder_tapping(Dto pDto);

	/**批量保存丝锥
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveHd_toolholder_tapping(List<Dto> list);
	
	/**
	 * 插入丝锥
	 * 
	 * @return
	 */
	public Dto insertHd_toolholder_tapping(Dto pDto);

	
	/**
	 * 删除丝锥
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto deleteHd_toolholder_tapping(Dto pDto);

	/**
	 * 修改丝锥
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateHd_toolholder_tapping(Dto pDto);


    public Dto saveMainTable(Dto dto);
	
	public Dto saveSubTable(Dto dto);
}
