package org.xianwu.dec.admin.service;

import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.model.service.BizService;

/**
 * 镗削刀具刀片
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface Hd_toolholder_boring_moduleService extends BizService {

	/**
	 * 保存镗削刀具刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto saveHd_toolholder_boring_module(Dto pDto);

	/**
	 * 批量保存镗刀模块
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveHd_toolholder_boring_module(List<Dto> list);
	
	/**
	 * 保存镗削刀具刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertHd_toolholder_boring_module(Dto pDto);

	
	/**
	 * 删除镗削刀具刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto deleteHd_toolholder_boring_module(Dto pDto);

	/**
	 * 修改镗削刀具刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateHd_toolholder_boring_module(Dto pDto);

    public Dto saveMainTable(Dto dto);
	
	public Dto saveSubTable(Dto dto);
	
	
}
