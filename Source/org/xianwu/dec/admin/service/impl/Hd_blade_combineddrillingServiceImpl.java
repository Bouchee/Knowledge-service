package org.xianwu.dec.admin.service.impl;

import java.sql.SQLException;
import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.core.orm.xibatis.sqlmap.client.SqlMapExecutor;
import org.xianwu.core.orm.xibatis.support.SqlMapClientCallback;
import org.xianwu.dec.admin.service.Hd_blade_combineddrillingService;
import org.xianwu.system.common.util.idgenerator.MaxId;

/**
 * 复合钻刀具刀片
 *
 * @author XianwuFu
 * @since 2013-01-01
 */
public class Hd_blade_combineddrillingServiceImpl extends BizServiceImpl implements Hd_blade_combineddrillingService {

	/**
	 * 保存复合钻刀具刀片
	 *
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto saveHd_blade_combineddrilling(Dto pDto) {
		Dto outDto = new BaseDto();

		pDto.put("toolholderid", MaxId.getHd_blade_combineddrillingID());
		g4Dao.insert("Hd_blade_combineddrilling.saveHd_blade_combineddrilling", pDto);
		
		outDto.put("msg", "复合钻刀具刀片新增成功！");
		outDto.put("success", new Boolean(true));
		return outDto;
	}
	/**
	 * 批量保存复合钻刀片
	 *
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveHd_blade_combineddrilling(final List<Dto> dataList) {
		final Dto outDto = new BaseDto();
		g4Dao.getSqlMapClientTpl().execute(new SqlMapClientCallback() {
			public Object doInSqlMapClient(SqlMapExecutor executor) throws SQLException {
				executor.startBatch();
				for (int i = 0; i < dataList.size(); i++) {
					Dto dto3 = (Dto) dataList.get(i);
					dto3.put("toolholderid", MaxId.getHd_blade_combineddrillingID());
					//dto3.put("mainshaftpower", null);
					executor.insert("Hd_blade_combineddrilling.saveHd_blade_combineddrilling", dto3);
				}
				executor.executeBatch();
				
				outDto.put("msg", "批量导入复合钻刀片成功！");
				outDto.put("success", true);
				return null;
			}
		});
		return outDto;
	}
	/**
	 * 保存复合钻刀具刀片
	 *
	 * @param pDto
	 * @return
	 */
	public Dto insertHd_blade_combineddrilling(Dto pDto) {
		return saveHd_blade_combineddrilling(pDto);
	}

	/**
	 * 删除复合钻刀具刀片
	 *
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto deleteHd_blade_combineddrilling(Dto pDto) {
		Dto dto = new BaseDto();
		String[] arrChecked = pDto.getAsString("strChecked").split(",");
		for (int i = 0; i < arrChecked.length; i++) {
			dto.put("toolholderid", arrChecked[i]);
			g4Dao.delete("Hd_blade_combineddrilling.deleteHd_blade_combineddrilling", dto);
		}
		return null;
	}

	/**
	 * 修改复合钻刀具刀片
	 *
	 * @param pDto
	 * @return
	 */
	public Dto updateHd_blade_combineddrilling(Dto pDto) {

		g4Dao.update("Hd_blade_combineddrilling.updateHd_blade_combineddrilling", pDto);
		return null;
	}

	public Dto saveMainTable(Dto dto){
		g4Dao.update("Hd_blade_combineddrilling.saveMainTable", dto);
		return null;
	}

	
	public Dto saveSubTable(Dto dto){
		g4Dao.update("Hd_blade_combineddrilling.saveSubTable", dto);
		return null;
	}
	
}
