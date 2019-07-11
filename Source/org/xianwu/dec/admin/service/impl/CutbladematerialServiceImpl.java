package org.xianwu.dec.admin.service.impl;

import java.sql.SQLException;
import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.core.orm.xibatis.sqlmap.client.SqlMapExecutor;
import org.xianwu.core.orm.xibatis.support.SqlMapClientCallback;
import org.xianwu.dec.admin.service.CutbladematerialService;
import org.xianwu.system.common.util.idgenerator.MaxId;

/**
 * 切断切槽刀片材质
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class CutbladematerialServiceImpl extends BizServiceImpl implements CutbladematerialService {

	/**
	 * 保存刀片材质
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto saveCutbladematerial(Dto pDto) {
		Dto outDto = new BaseDto();
		pDto.put("bladematerialid", MaxId.getCutbladematerialID());
		g4Dao.insert("Cutbladematerial.saveCutbladematerial", pDto);
		outDto.put("msg", "刀片材质新增成功！");
		outDto.put("success", new Boolean(true));
		return outDto;
	}
	/**
	 * 批量保存刀片材质
	 *
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveCutbladematerial(final List<Dto> dataList) {
		final Dto outDto = new BaseDto();
		g4Dao.getSqlMapClientTpl().execute(new SqlMapClientCallback() {
			public Object doInSqlMapClient(SqlMapExecutor executor) throws SQLException {
				executor.startBatch();
				for (int i = 0; i < dataList.size(); i++) {
					Dto dto3 = (Dto) dataList.get(i);
					dto3.put("bladematerialid", MaxId.getCutbladematerialID());
					//dto3.put("mainshaftpower", null);
					executor.insert("Cutbladematerial.saveCutbladematerial", dto3);
				}
				executor.executeBatch();
				
				outDto.put("msg", "批量导入刀片材质成功！");
				outDto.put("success", true);
				return null;
			}
		});
		return outDto;
	}
	
	/**
	 * 保存刀片材质
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertCutbladematerial(Dto pDto) {
		return saveCutbladematerial(pDto);
	}
	
	/**
	 * 删除刀片材质
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto deleteCutbladematerial(Dto pDto) {
		Dto dto = new BaseDto();
		String[] arrChecked = pDto.getAsString("strChecked").split(",");
		for (int i = 0; i < arrChecked.length; i++) {
			dto.put("bladematerialid", arrChecked[i]);
			//g4Dao.update("Cutbladematerial.updateWorkpieceblade4Cutbladematerial", dto);
			//g4Dao.update("Cutbladematerial.updateCtparameter4Cutbladematerial", dto);
			g4Dao.update("Cutbladematerial.deleteCutbladematerial", dto);
			g4Dao.delete("Cutbladematerial.deleteCutbladematerial", dto);
		}
		return null;
	}

	/**
	 * 修改刀片材质
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateCutbladematerial(Dto pDto) {
		
		g4Dao.update("Cutbladematerial.updateCutbladematerial", pDto);
		return null;
	}
	
	public Dto saveMainTable(Dto dto){
		g4Dao.update("Cutbladematerial.saveMainTable", dto);
		return null;
	}

	
	public Dto saveSubTable(Dto dto){
		g4Dao.update("Cutbladematerial.saveSubTable", dto);
		return null;
	}
}
