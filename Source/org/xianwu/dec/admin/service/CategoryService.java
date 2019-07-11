package org.xianwu.dec.admin.service;

import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.model.service.BizService;

/**
 * 切削液种类
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface CategoryService extends BizService {

	/**
	 * 保存切削液种类
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto saveCategory(Dto pDto);
	/**
	 * 批量保存切削液
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveCategory(List<Dto> list);

	/**
	 * 保存切削液种类
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertCategory(Dto pDto);
	
	/**
	 * 删除切削液种类
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto deleteCategory(Dto pDto);

	/**
	 * 修改切削液种类
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateCategory(Dto pDto);
    
	public Dto saveMainTable(Dto dto);
	
	public Dto saveSubTable(Dto dto);

	
}
