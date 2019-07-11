package org.xianwu.dec.admin.service.impl;

import java.sql.SQLException;
import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.core.orm.xibatis.sqlmap.client.SqlMapExecutor;
import org.xianwu.core.orm.xibatis.support.SqlMapClientCallback;
import org.xianwu.dec.admin.service.CutbladeService;
import org.xianwu.system.common.util.idgenerator.MaxId;

/**
 * 切断切槽刀片
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class CutbladeServiceImpl extends BizServiceImpl implements CutbladeService {

	/**
	 * 保存刀片
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto saveCutblade(Dto pDto) {
		Dto outDto = new BaseDto();
		pDto.put("cutbladeid", MaxId.getCutbladeID());
		g4Dao.insert("Cutblade.saveCutblade", pDto);
		outDto.put("msg", "刀片新增成功！");
		outDto.put("success", new Boolean(true));
		return outDto;
	}
	/**
	 * 批量保存刀片
	 *
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveCutblade(final List<Dto> dataList) {
		final Dto outDto = new BaseDto();
		g4Dao.getSqlMapClientTpl().execute(new SqlMapClientCallback() {
			public Object doInSqlMapClient(SqlMapExecutor executor) throws SQLException {
				executor.startBatch();
				for (int i = 0; i < dataList.size(); i++) {
					Dto dto3 = (Dto) dataList.get(i);
					dto3.put("cutbladeid", MaxId.getCutbladeID());
					//dto3.put("mainshaftpower", null);
					executor.insert("Cutblade.saveCutblade", dto3);
				}
				executor.executeBatch();
				
				outDto.put("msg", "批量导入刀片成功！");
				outDto.put("success", true);
				return null;
			}
		});
		return outDto;
	}
	
	/**
	 * 保存刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertCutblade(Dto pDto) {
		return saveCutblade(pDto);
	}

	/**
	 * 删除刀片
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto deleteCutblade(Dto pDto) {
		Dto dto = new BaseDto();
		String[] arrChecked = pDto.getAsString("strChecked").split(",");
		for (int i = 0; i < arrChecked.length; i++) {
			dto.put("cutbladeid", arrChecked[i]);
			//g4Dao.update("Cutblade.updateCutbladecuttoolholder4Cutblade", dto);
			g4Dao.delete("Cutblade.deleteCutblade", dto);
		}
		return null;
	}

	/**
	 * 修改刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateCutblade(Dto pDto) {
		g4Dao.update("Cutblade.updateCutblade", pDto);
		return null;
	}
	
	public Dto saveMainTable(Dto dto){
		g4Dao.update("Cutblade.saveMainTable", dto);
		return null;
	}

	
	public Dto saveSubTable(Dto dto){
		g4Dao.update("Cutblade.saveSubTable", dto);
		return null;
	}
}
