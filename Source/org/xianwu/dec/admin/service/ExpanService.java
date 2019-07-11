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
public interface ExpanService extends BizService {

	/**
	 * 保存丝锥
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto saveExpan(Dto pDto);

	
	public Dto saveKeyp(Dto pDto);
	
	public Dto savePrevent(Dto pDto);
	
	public Dto saveMethod(Dto pDto);
	
	public Dto saveReduce(Dto pDto);
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
