package org.xianwu.dec.admin.service.impl;

import java.sql.SQLException;
import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.core.orm.xibatis.sqlmap.client.SqlMapExecutor;
import org.xianwu.core.orm.xibatis.support.SqlMapClientCallback;
import org.xianwu.dec.admin.service.Hd_blade_boringService;
import org.xianwu.system.common.util.idgenerator.MaxId;

/**
 * 镗削刀具刀片
 *
 * @author XianwuFu
 * @since 2013-01-01
 */
public class Hd_blade_boringServiceImpl extends BizServiceImpl implements Hd_blade_boringService {

	/**
	 * 保存镗削刀具刀片
	 *
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto saveHd_blade_boring(Dto pDto) {
		Dto outDto = new BaseDto();

		pDto.put("bladeid", MaxId.getHd_blade_boringID());
		g4Dao.insert("Hd_blade_boring.saveHd_blade_boring", pDto);
		
		outDto.put("msg", "镗削刀具刀片新增成功！");
		outDto.put("success", new Boolean(true));
		return outDto;
	}
	/**
	 * 批量保存镗刀刀片
	 *
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveHd_blade_boring(final List<Dto> dataList) {
		final Dto outDto = new BaseDto();
		g4Dao.getSqlMapClientTpl().execute(new SqlMapClientCallback() {
			public Object doInSqlMapClient(SqlMapExecutor executor) throws SQLException {
				executor.startBatch();
				for (int i = 0; i < dataList.size(); i++) {
					Dto dto3 = (Dto) dataList.get(i);
					dto3.put("bladeid", MaxId.getHd_blade_boringID());
					//dto3.put("mainshaftpower", null);
					executor.insert("Hd_blade_boring.saveHd_blade_boring", dto3);
				}
				executor.executeBatch();
				
				outDto.put("msg", "批量导入镗刀刀片成功！");
				outDto.put("success", true);
				return null;
			}
		});
		return outDto;
	}
	/**
	 * 保存镗削刀具刀片
	 *
	 * @param pDto
	 * @return
	 */
	public Dto insertHd_blade_boring(Dto pDto) {
		return saveHd_blade_boring(pDto);
	}

	/**
	 * 删除镗削刀具刀片
	 *
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto deleteHd_blade_boring(Dto pDto) {
		Dto dto = new BaseDto();
		String[] arrChecked = pDto.getAsString("strChecked").split(",");
		for (int i = 0; i < arrChecked.length; i++) {
			dto.put("bladeid", arrChecked[i]);
			g4Dao.delete("Hd_blade_boring.deleteHd_blade_boring", dto);
		}
		return null;
	}

	/**
	 * 修改镗削刀具刀片
	 *
	 * @param pDto
	 * @return
	 */
	public Dto updateHd_blade_boring(Dto pDto) {

		g4Dao.update("Hd_blade_boring.updateHd_blade_boring", pDto);
		return null;
	}
	
	public Dto saveMainTable(Dto dto){
		g4Dao.update("Hd_blade_boring.saveMainTable", dto);
		return null;
	}

	
	public Dto saveSubTable(Dto dto){
		g4Dao.update("Hd_blade_boring.saveSubTable", dto);
		return null;
	}
}
