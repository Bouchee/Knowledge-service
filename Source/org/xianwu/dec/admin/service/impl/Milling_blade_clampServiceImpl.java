package org.xianwu.dec.admin.service.impl;

import java.sql.SQLException;
import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.core.orm.xibatis.sqlmap.client.SqlMapExecutor;
import org.xianwu.core.orm.xibatis.support.SqlMapClientCallback;
import org.xianwu.dec.admin.service.Milling_blade_clampService;
import org.xianwu.system.common.util.idgenerator.MaxId;

/**
 * 机夹刀具刀片
 *
 * @author XianwuFu
 * @since 2013-01-01
 */
public class Milling_blade_clampServiceImpl extends BizServiceImpl implements Milling_blade_clampService {

	/**
	 * 保存机夹刀具刀片
	 *
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto saveMilling_blade_clamp(Dto pDto) {
		Dto outDto = new BaseDto();
		pDto.put("bladeid", MaxId.getMilling_blade_clampID());
		g4Dao.insert("Milling_blade_clamp.saveMilling_blade_clamp", pDto);
		outDto.put("msg", "机夹刀具刀片新增成功！");
		outDto.put("success", new Boolean(true));
		return outDto;
	}
	/**
	 * 批量保存机夹刀具刀片
	 *
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveMilling_blade_clamp(final List<Dto> dataList) {
		final Dto outDto = new BaseDto();
		g4Dao.getSqlMapClientTpl().execute(new SqlMapClientCallback() {
			public Object doInSqlMapClient(SqlMapExecutor executor) throws SQLException {
				executor.startBatch();
				for (int i = 0; i < dataList.size(); i++) {
					Dto dto3 = (Dto) dataList.get(i);
					dto3.put("bladeid", MaxId.getMilling_blade_clampID());
					//dto3.put("mainshaftpower", null);
					executor.insert("Milling_blade_clamp.saveMilling_blade_clamp", dto3);
				}
				executor.executeBatch();
				
				outDto.put("msg", "批量导入机夹刀具刀片成功！");
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
	public Dto insertMilling_blade_clamp(Dto pDto) {
		return saveMilling_blade_clamp(pDto);
	}

	/**
	 * 删除机夹刀具刀片
	 *
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto deleteMilling_blade_clamp(Dto pDto) {
		Dto dto = new BaseDto();
		String[] arrChecked = pDto.getAsString("strChecked").split(",");
		for (int i = 0; i < arrChecked.length; i++) {
			dto.put("bladeid", arrChecked[i]);
			g4Dao.delete("Milling_blade_clamp.deleteMilling_blade_clamp", dto);
		}
		return null;
	}

	/**
	 * 修改机夹刀具刀片
	 *
	 * @param pDto
	 * @return
	 */
	public Dto updateMilling_blade_clamp(Dto pDto) {

		g4Dao.update("Milling_blade_clamp.updateMilling_blade_clamp", pDto);
		return null;
	}
	
	public Dto saveMainTable(Dto dto){
		g4Dao.update("Milling_blade_clamp.saveMainTable", dto);
		return null;
	}

	
	public Dto saveSubTable(Dto dto){
		g4Dao.update("Milling_blade_clamp.saveSubTable", dto);
		return null;
	}
}
