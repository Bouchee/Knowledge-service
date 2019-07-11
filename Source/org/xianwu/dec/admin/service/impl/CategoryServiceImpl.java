package org.xianwu.dec.admin.service.impl;

import java.sql.SQLException;
import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.core.orm.xibatis.sqlmap.client.SqlMapExecutor;
import org.xianwu.core.orm.xibatis.support.SqlMapClientCallback;
import org.xianwu.dec.admin.service.CategoryService;
import org.xianwu.system.common.util.idgenerator.MaxId;

/**
 * 切削液种类
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class CategoryServiceImpl extends BizServiceImpl implements CategoryService {

	/**
	 * 保存切削液种类
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto saveCategory(Dto pDto) {
		Dto outDto = new BaseDto();
		pDto.put("categoryid", MaxId.getCategoryID());
		g4Dao.insert("Category.saveCategory", pDto);
		outDto.put("msg", "切削液种类新增成功！");
		outDto.put("success", new Boolean(true));
		return outDto;
	}
	
	/**
	 * 批量保存切削液
	 *
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveCategory(final List<Dto> dataList) {
		final Dto outDto = new BaseDto();
		g4Dao.getSqlMapClientTpl().execute(new SqlMapClientCallback() {
			public Object doInSqlMapClient(SqlMapExecutor executor) throws SQLException {
				executor.startBatch();
				for (int i = 0; i < dataList.size(); i++) {
					Dto dto3 = (Dto) dataList.get(i);
					dto3.put("categoryid", MaxId.getCategoryID());
					//dto3.put("mainshaftpower", null);
					executor.insert("Category.saveCategory", dto3);
				}
				executor.executeBatch();
				
				outDto.put("msg", "批量导入切削液成功！");
				outDto.put("success", true);
				return null;
			}
		});
		return outDto;
	}
	
	/**
	 * 保存切削液种类
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertCategory(Dto pDto) {
		return saveCategory(pDto);
	}
	
	

	/**
	 * 删除切削液种类
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto deleteCategory(Dto pDto) {
		Dto dto = new BaseDto();
		String[] arrChecked = pDto.getAsString("strChecked").split(",");
		for (int i = 0; i < arrChecked.length; i++) {
			dto.put("categoryid", arrChecked[i]);			
			//g4Dao.delete("Category.deleteMachinetoolholder4Machinetool4Category", dto);
			g4Dao.update("Category.updateMachinetool4Category", dto);
			g4Dao.delete("Category.deleteCategory", dto);
		}
		return null;
	}

	/**
	 * 修改切削液种类
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateCategory(Dto pDto) {
		g4Dao.update("Category.updateCategory", pDto);
		return null;
	}
	
	public Dto saveMainTable(Dto dto){
		g4Dao.update("Category.saveMainTable", dto);
		return null;
	}

	
	public Dto saveSubTable(Dto dto){
		g4Dao.update("Category.saveSubTable", dto);
		return null;
	}

}
