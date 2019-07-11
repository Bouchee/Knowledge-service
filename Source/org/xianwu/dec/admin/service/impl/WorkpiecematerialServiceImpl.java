package org.xianwu.dec.admin.service.impl;

import java.sql.SQLException;
import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.core.orm.xibatis.sqlmap.client.SqlMapExecutor;
import org.xianwu.core.orm.xibatis.support.SqlMapClientCallback;
import org.xianwu.dec.admin.service.WorkpiecematerialService;
import org.xianwu.system.common.util.idgenerator.MaxId;

/**
 * 工件材料
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class WorkpiecematerialServiceImpl extends BizServiceImpl implements WorkpiecematerialService {

	/**
	 * 保存工件材料
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto saveWorkmaterial(Dto pDto) {
		Dto outDto = new BaseDto();
		pDto.put("workpiecematerialid", MaxId.getWorkpiecematerialID());
		g4Dao.insert("Workpiecematerial.saveWorkpiecematerial", pDto);
		outDto.put("msg", "工件材料新增成功！");
		outDto.put("success", new Boolean(true));
		return outDto;
	}
	
	/**
	 * 批量保存工件材料
	 *
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveWorkpiecematerial(final List<Dto> dataList) {
		final Dto outDto = new BaseDto();
		g4Dao.getSqlMapClientTpl().execute(new SqlMapClientCallback() {
			public Object doInSqlMapClient(SqlMapExecutor executor) throws SQLException {
				executor.startBatch();
				for (int i = 0; i < dataList.size(); i++) {
					Dto dto3 = (Dto) dataList.get(i);
					dto3.put("workpiecematerialid", MaxId.getWorkpiecematerialID());
					//dto3.put("mainshaftpower", null);
					executor.insert("Workpiecematerial.saveWorkpiecematerial", dto3);
				}
				executor.executeBatch();
				
				outDto.put("msg", "批量导入工件材料成功！");
				outDto.put("success", true);
				return null;
			}
		});
		return outDto;
	}
	
	/**
	 * 保存工件材料
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertWorkmaterial(Dto pDto) {
		return saveWorkmaterial(pDto);
	}

	/**
	 * 删除工件材料
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto deleteWorkmaterial(Dto pDto) {
		Dto dto = new BaseDto();
		String[] arrChecked = pDto.getAsString("strChecked").split(",");
		for (int i = 0; i < arrChecked.length; i++) {
			dto.put("workpiecematerialid", arrChecked[i]);
			g4Dao.update("Workpiecematerial.updateWorkpieceblade4Workpiecematerial", dto);
			g4Dao.delete("Workpiecematerial.deleteWorkpiecematerial", dto);
		}
		return null;
	}

	/**
	 * 修改工件材料
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateWorkmaterial(Dto pDto) {
		
		g4Dao.update("Workpiecematerial.updateWorkpiecematerial", pDto);
		return null;
	}
	
	public Dto saveMainTable(Dto dto){
		g4Dao.update("Workpiecematerial.saveMainTable", dto);
		return null;
	}

	
	public Dto saveSubTable(Dto dto){
		g4Dao.update("Workpiecematerial.saveSubTable", dto);
		return null;
	}

}
