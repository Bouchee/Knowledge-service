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
public interface Hd_cutterbar_combineddrillingService extends BizService {

	/**
	 * 保存镗削刀具刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto saveHd_cutterbar_combineddrilling(Dto pDto);

	/**
	 * 批量保存复合钻钻杆
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveHd_cutterbar_combineddrilling(List<Dto> list);
	
	/**
	 * 保存镗削刀具刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertHd_cutterbar_combineddrilling(Dto pDto);

	
	/**
	 * 删除镗削刀具刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto deleteHd_cutterbar_combineddrilling(Dto pDto);

	/**
	 * 修改镗削刀具刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateHd_cutterbar_combineddrilling(Dto pDto);

    public Dto saveMainTable(Dto dto);
	
	public Dto saveSubTable(Dto dto);
	
}
