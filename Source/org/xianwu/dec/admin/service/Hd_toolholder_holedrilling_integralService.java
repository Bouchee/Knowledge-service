package org.xianwu.dec.admin.service;

import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.model.service.BizService;

/**
 * 浅孔钻刀体
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface Hd_toolholder_holedrilling_integralService extends BizService {

	/**
	 * 保存浅孔钻刀体
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto saveHd_toolholder_holedrilling_integral(Dto pDto);

	/**
	 * 批量保存整体式钻孔刀具
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveHd_toolholder_holedrilling_integral(List<Dto> list);
	
	/**
	 * 插入浅孔钻刀体
	 * 
	 * @return
	 */
	public Dto insertHd_toolholder_holedrilling_integral(Dto pDto);

	
	/**
	 * 删除浅孔钻刀体
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto deleteHd_toolholder_holedrilling_integral(Dto pDto);

	/**
	 * 修改浅孔钻刀体
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateHd_toolholder_holedrilling_integral(Dto pDto);


    public Dto saveMainTable(Dto dto);
	
	public Dto saveSubTable(Dto dto);
}
