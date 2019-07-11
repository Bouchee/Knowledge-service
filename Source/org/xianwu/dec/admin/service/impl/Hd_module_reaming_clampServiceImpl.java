package org.xianwu.dec.admin.service.impl;

import java.sql.SQLException;
import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.core.orm.xibatis.sqlmap.client.SqlMapExecutor;
import org.xianwu.core.orm.xibatis.support.SqlMapClientCallback;
import org.xianwu.dec.admin.service.Hd_module_reaming_clampService;
import org.xianwu.system.common.util.idgenerator.MaxId;

/**
 * 机夹刀具刀片
 *
 * @author XianwuFu
 * @since 2013-01-01
 */
public class Hd_module_reaming_clampServiceImpl extends BizServiceImpl implements Hd_module_reaming_clampService {

	/**
	 * 保存机夹刀具刀片
	 *
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto saveHd_module_reaming_clamp(Dto pDto) {
		Dto outDto = new BaseDto();
		pDto.put("toolholderid", MaxId.getHd_module_reaming_clampID());
		g4Dao.insert("Hd_module_reaming_clamp.saveHd_module_reaming_clamp", pDto);
		outDto.put("msg", "机夹刀具刀片新增成功！");
		outDto.put("success", new Boolean(true));
		return outDto;
	}
	/**
	 * 批量保存机夹式铰刀模块
	 *
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveHd_module_reaming_clamp(final List<Dto> dataList) {
		final Dto outDto = new BaseDto();
		g4Dao.getSqlMapClientTpl().execute(new SqlMapClientCallback() {
			public Object doInSqlMapClient(SqlMapExecutor executor) throws SQLException {
				executor.startBatch();
				for (int i = 0; i < dataList.size(); i++) {
					Dto dto3 = (Dto) dataList.get(i);
					dto3.put("toolholderid", MaxId.getHd_module_reaming_clampID());
					//dto3.put("mainshaftpower", null);
					executor.insert("Hd_module_reaming_clamp.saveHd_module_reaming_clamp", dto3);
				}
				executor.executeBatch();
				
				outDto.put("msg", "批量导入机夹式铰刀模块成功！");
				outDto.put("success", true);
				return null;
			}
		});
		return outDto;
	}
	/**
	 * 保存机夹刀具刀片
	 *
	 * @param pDto
	 * @return
	 */
	public Dto insertHd_module_reaming_clamp(Dto pDto) {
		return saveHd_module_reaming_clamp(pDto);
	}

	/**
	 * 删除机夹刀具刀片
	 *
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto deleteHd_module_reaming_clamp(Dto pDto) {
		Dto dto = new BaseDto();
		String[] arrChecked = pDto.getAsString("strChecked").split(",");
		for (int i = 0; i < arrChecked.length; i++) {
			dto.put("toolholderid", arrChecked[i]);
			g4Dao.delete("Hd_module_reaming_clamp.deleteHd_module_reaming_clamp", dto);
		}
		return null;
	}

	/**
	 * 修改机夹刀具刀片
	 *
	 * @param pDto
	 * @return
	 */
	public Dto updateHd_module_reaming_clamp(Dto pDto) {

		g4Dao.update("Hd_module_reaming_clamp.updateHd_module_reaming_clamp", pDto);
		return null;
	}

	public Dto saveMainTable(Dto dto){
		g4Dao.update("Hd_module_reaming_clamp.saveMainTable", dto);
		return null;
	}

	
	public Dto saveSubTable(Dto dto){
		g4Dao.update("Hd_module_reaming_clamp.saveSubTable", dto);
		return null;
	}
	
}
