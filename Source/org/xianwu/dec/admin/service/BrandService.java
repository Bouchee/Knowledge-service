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
public interface BrandService extends BizService {

	/**
	 * 保存品牌种类
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto saveBrand(Dto pDto);

	/**
	 * 批量保存品牌
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveBrand(List<Dto> list);

	/**
	 * 保存品牌种类
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertBrand(Dto pDto);
	
	/**
	 * 删除品牌种类
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto deleteBrand(Dto pDto);

	/**
	 * 修改品牌种类
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateBrand(Dto pDto);

    public Dto saveMainTable(Dto dto);
	
	public Dto saveSubTable(Dto dto);
	
}
