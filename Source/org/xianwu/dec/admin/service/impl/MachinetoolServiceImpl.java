package org.xianwu.dec.admin.service.impl;

import java.sql.SQLException;
import java.util.List;

import org.xianwu.core.orm.xibatis.sqlmap.client.SqlMapExecutor;
import org.xianwu.core.orm.xibatis.support.SqlMapClientCallback;
import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.dec.admin.service.MachinetoolService;
import org.xianwu.system.common.util.idgenerator.MaxId;

/**
 * 机床
 *
 * @author XianwuFu
 * @since 2013-01-01
 */
public class MachinetoolServiceImpl extends BizServiceImpl implements MachinetoolService {

	/**
	 * 保存机床
	 *
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto saveMachinetool(Dto pDto) {
		Dto outDto = new BaseDto();
		pDto.put("machinetoolid", MaxId.getMachinetoolID());
		g4Dao.insert("Machinetool.saveMachinetool", pDto);
		outDto.put("msg", "机床新增成功！");
		outDto.put("success", new Boolean(true));
		return outDto;
	}

	/**
	 * 批量保存机床
	 *
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveMachinetool(final List<Dto> dataList) {
		final Dto outDto = new BaseDto();
		g4Dao.getSqlMapClientTpl().execute(new SqlMapClientCallback() {
			public Object doInSqlMapClient(SqlMapExecutor executor) throws SQLException {
				executor.startBatch();
				for (int i = 0; i < dataList.size(); i++) {
					Dto dto3 = (Dto) dataList.get(i);
					dto3.put("machinetoolid", MaxId.getMachinetoolID());
					//dto3.put("mainshaftpower", null);
					executor.insert("Machinetool.saveMachinetool", dto3);
				}
				executor.executeBatch();
				
				outDto.put("msg", "批量导入机床成功！");
				outDto.put("success", true);
				return null;
			}
		});
		return outDto;
	}
	
	/**
	 * 保存机床
	 *
	 * @param pDto
	 * @return
	 */
	public Dto insertMachinetool(Dto pDto) {
		return saveMachinetool(pDto);
	}

	/**
	 * 删除机床
	 *
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto deleteMachinetool(Dto pDto) {
		Dto dto = new BaseDto();
		String[] arrChecked = pDto.getAsString("strChecked").split(",");
		for (int i = 0; i < arrChecked.length; i++) {
			dto.put("machinetoolid", arrChecked[i]);
			g4Dao.update("Machinetool.updateMachinetoolholder4Machinetool", dto);
			g4Dao.delete("Machinetool.deleteMachinetool", dto);
		}
		return null;
	}

	/**
	 * 修改机床
	 *
	 * @param pDto
	 * @return
	 */
	public Dto updateMachinetool(Dto pDto) {

		g4Dao.update("Machinetool.updateMachinetool", pDto);
		return null;
	}

	
	public Dto saveMainTable(Dto dto){
		g4Dao.update("Machinetool.saveMainTable", dto);
		return null;
	}

	
	public Dto saveSubTable(Dto dto){
		g4Dao.update("Machinetool.saveSubTable", dto);
		return null;
	}
	
}
