package org.xianwu.dec.admin.service;

import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.model.service.BizService;

/**
 * 中心钻
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface Hd_centredrillingService extends BizService {

	/**
	 * 保存中心钻
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto saveHd_centredrilling(Dto pDto);

	/**
	 * 批量保存中心钻
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveHd_centredrilling(List<Dto> list);
	
	/**
	 * 插入中心钻
	 * 
	 * @return
	 */
	public Dto insertHd_centredrilling(Dto pDto);

	
	/**
	 * 删除中心钻
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto deleteHd_centredrilling(Dto pDto);

	/**
	 * 修改中心钻
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateHd_centredrilling(Dto pDto);


    public Dto saveMainTable(Dto dto);
	
	public Dto saveSubTable(Dto dto);
}
