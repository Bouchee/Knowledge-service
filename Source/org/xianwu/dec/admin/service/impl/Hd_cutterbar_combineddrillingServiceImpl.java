package org.xianwu.dec.admin.service.impl;

import java.sql.SQLException;
import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.core.orm.xibatis.sqlmap.client.SqlMapExecutor;
import org.xianwu.core.orm.xibatis.support.SqlMapClientCallback;
import org.xianwu.dec.admin.service.Hd_cutterbar_combineddrillingService;
import org.xianwu.system.common.util.idgenerator.MaxId;

/**
 * 复合钻刀具刀片
 *
 * @author XianwuFu
 * @since 2013-01-01
 */
public class Hd_cutterbar_combineddrillingServiceImpl extends BizServiceImpl implements Hd_cutterbar_combineddrillingService {

	/**
	 * 保存复合钻刀具刀片
	 *
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto saveHd_cutterbar_combineddrilling(Dto pDto) {
		Dto outDto = new BaseDto();

		pDto.put("toolholderid", MaxId.getHd_cutterbar_combineddrillingID());
		g4Dao.insert("Hd_cutterbar_combineddrilling.saveHd_cutterbar_combineddrilling", pDto);
		
		outDto.put("msg", "复合钻钻杆新增成功！");
		outDto.put("success", new Boolean(true));
		return outDto;
	}
	/**
	 * 批量保存复合钻钻杆
	 *
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveHd_cutterbar_combineddrilling(final List<Dto> dataList) {
		final Dto outDto = new BaseDto();
		g4Dao.getSqlMapClientTpl().execute(new SqlMapClientCallback() {
			public Object doInSqlMapClient(SqlMapExecutor executor) throws SQLException {
				executor.startBatch();
				for (int i = 0; i < dataList.size(); i++) {
					Dto dto3 = (Dto) dataList.get(i);
					dto3.put("toolholderid", MaxId.getHd_cutterbar_combineddrillingID());
					//dto3.put("mainshaftpower", null);
					executor.insert("Hd_cutterbar_combineddrilling.saveHd_cutterbar_combineddrilling", dto3);
				}
				executor.executeBatch();
				
				outDto.put("msg", "批量导入复合钻钻杆成功！");
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
	public Dto insertHd_cutterbar_combineddrilling(Dto pDto) {
		return saveHd_cutterbar_combineddrilling(pDto);
	}

	/**
	 * 删除复合钻刀具刀片
	 *
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto deleteHd_cutterbar_combineddrilling(Dto pDto) {
		Dto dto = new BaseDto();
		String[] arrChecked = pDto.getAsString("strChecked").split(",");
		for (int i = 0; i < arrChecked.length; i++) {
			dto.put("toolholderid", arrChecked[i]);
			g4Dao.delete("Hd_cutterbar_combineddrilling.deleteHd_cutterbar_combineddrilling", dto);
		}
		return null;
	}

	/**
	 * 修改复合钻刀具刀片
	 *
	 * @param pDto
	 * @return
	 */
	public Dto updateHd_cutterbar_combineddrilling(Dto pDto) {

		g4Dao.update("Hd_cutterbar_combineddrilling.updateHd_cutterbar_combineddrilling", pDto);
		return null;
	}

	public Dto saveMainTable(Dto dto){
		g4Dao.update("Hd_cutterbar_combineddrilling.saveMainTable", dto);
		return null;
	}

	
	public Dto saveSubTable(Dto dto){
		g4Dao.update("Hd_cutterbar_combineddrilling.saveSubTable", dto);
		return null;
	}
	
}
