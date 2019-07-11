package org.xianwu.dec.admin.service;

import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.model.service.BizService;

/**
 * 钻孔刀具
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface Hd_toolholder_coredrilling_shellService extends BizService {

	/**
	 * 保存 钻孔刀具
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto saveHd_toolholder_coredrilling_shell(Dto pDto);

	/**
	 * 批量保存套式扩孔钻
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveHd_toolholder_coredrilling_shell(List<Dto> list);
	
	/**
	 * 保存 钻孔刀具
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertHd_toolholder_coredrilling_shell(Dto pDto);

	
	/**
	 * 删除 钻孔刀具
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto deleteHd_toolholder_coredrilling_shell(Dto pDto);

	/**
	 * 修改 钻孔刀具
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateHd_toolholder_coredrilling_shell(Dto pDto);


    public Dto saveMainTable(Dto dto);
	
	public Dto saveSubTable(Dto dto);
	
}
