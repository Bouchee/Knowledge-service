package org.xianwu.dec.admin.service.impl;

import java.sql.SQLException;
import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.core.orm.xibatis.sqlmap.client.SqlMapExecutor;
import org.xianwu.core.orm.xibatis.support.SqlMapClientCallback;
import org.xianwu.dec.admin.service.Milling_integralService;
import org.xianwu.system.common.util.idgenerator.MaxId;

/**
 * 整体刀具
 *
 * @author XianwuFu
 * @since 2013-01-01
 */
public class Milling_integralServiceImpl extends BizServiceImpl implements Milling_integralService {

	/**
	 * 保存整体刀具
	 *
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto saveMilling_integral(Dto pDto) {
		Dto outDto = new BaseDto();
		pDto.put("toolholderid", MaxId.getMilling_integralID());
		g4Dao.insert("Milling_integral.saveMilling_integral", pDto);
		outDto.put("msg", "整体刀具新增成功！");
		outDto.put("success", new Boolean(true));
		return outDto;
	}
	/**
	 * 批量保存整体刀具
	 *
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveMilling_integral(final List<Dto> dataList) {
		final Dto outDto = new BaseDto();
		g4Dao.getSqlMapClientTpl().execute(new SqlMapClientCallback() {
			public Object doInSqlMapClient(SqlMapExecutor executor) throws SQLException {
				executor.startBatch();
				for (int i = 0; i < dataList.size(); i++) {
					Dto dto3 = (Dto) dataList.get(i);
					dto3.put("toolholderid", MaxId.getMilling_integralID());
					//dto3.put("mainshaftpower", null);
					executor.insert("Milling_integral.saveMilling_integral", dto3);
				}
				executor.executeBatch();
				
				outDto.put("msg", "批量导入整体刀具成功！");
				outDto.put("success", true);
				return null;
			}
		});
		return outDto;
	}
	
	/**
	 * 保存整体刀具
	 *
	 * @param pDto
	 * @return
	 */
	public Dto insertMilling_integral(Dto pDto) {
		return saveMilling_integral(pDto);
	}

	/**
	 * 删除整体刀具
	 *
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto deleteMilling_integral(Dto pDto) {
		Dto dto = new BaseDto();
		String[] arrChecked = pDto.getAsString("strChecked").split(",");
		for (int i = 0; i < arrChecked.length; i++) {
			dto.put("toolholderid", arrChecked[i]);
			g4Dao.delete("Milling_integral.deleteMilling_integral", dto);
		}
		return null;
	}

	/**
	 * 修改整体刀具
	 *
	 * @param pDto
	 * @return
	 */
	public Dto updateMilling_integral(Dto pDto) {

		g4Dao.update("Milling_integral.updateMilling_integral", pDto);
		return null;
	}
	
	public Dto saveMainTable(Dto dto){
		g4Dao.update("Milling_integral.saveMainTable", dto);
		return null;
	}

	
	public Dto saveSubTable(Dto dto){
		g4Dao.update("Milling_integral.saveSubTable", dto);
		return null;
	}
}
