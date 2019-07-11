package org.xianwu.dec.admin.service.impl;

import java.sql.SQLException;
import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.core.orm.xibatis.sqlmap.client.SqlMapExecutor;
import org.xianwu.core.orm.xibatis.support.SqlMapClientCallback;
import org.xianwu.dec.admin.service.CutgrooveService;
import org.xianwu.system.common.util.idgenerator.MaxId;

/**
 * 切断切槽刀片槽形
 *
 * @author XianwuFu
 * @since 2013-01-01
 */
public class CutgrooveServiceImpl extends BizServiceImpl implements CutgrooveService {

	/**
	 * 保存槽形
	 *
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto saveCutgroove(Dto pDto) {
		Dto outDto = new BaseDto();
		pDto.put("grooveid", MaxId.getGrooveID());
		g4Dao.insert("Cutgroove.saveCutgroove", pDto);
		outDto.put("msg", "槽形新增成功！");
		outDto.put("success", new Boolean(true));
		return outDto;
	}
	/**
	 * 批量保存槽型
	 *
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveCutgroove(final List<Dto> dataList) {
		final Dto outDto = new BaseDto();
		g4Dao.getSqlMapClientTpl().execute(new SqlMapClientCallback() {
			public Object doInSqlMapClient(SqlMapExecutor executor) throws SQLException {
				executor.startBatch();
				for (int i = 0; i < dataList.size(); i++) {
					Dto dto3 = (Dto) dataList.get(i);
					dto3.put("grooveid", MaxId.getGrooveID());
					//dto3.put("mainshaftpower", null);
					executor.insert("Cutgroove.saveCutgroove", dto3);
				}
				executor.executeBatch();
				
				outDto.put("msg", "批量导入槽形成功！");
				outDto.put("success", true);
				return null;
			}
		});
		return outDto;
	}
	
	/**
	 * 保存槽形
	 *
	 * @param pDto
	 * @return
	 */
	public Dto insertCutgroove(Dto pDto) {
		return saveCutgroove(pDto);
	}

	/**
	 * 删除槽形
	 *
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto deleteCutgroove(Dto pDto) {
		Dto dto = new BaseDto();
		String[] arrChecked = pDto.getAsString("strChecked").split(",");
		for (int i = 0; i < arrChecked.length; i++) {
			dto.put("grooveid", arrChecked[i]);
			//g4Dao.update("Cutgroove.deleteBladetoolholder4Blade4Cutgroove", dto);

			g4Dao.update("Cutgroove.updateCutblade4Cutgroove", dto);

			g4Dao.delete("Cutgroove.deleteCutgroove", dto);
		}
		return null;
	}

	/**
	 * 修改槽形
	 *
	 * @param pDto
	 * @return
	 */
	public Dto updateCutgroove(Dto pDto) {
		g4Dao.update("Cutgroove.updateCutgroove", pDto);
		return null;
	}
	
	public Dto saveMainTable(Dto dto){
		g4Dao.update("Cutgroove.saveMainTable", dto);
		return null;
	}

	
	public Dto saveSubTable(Dto dto){
		g4Dao.update("Cutgroove.saveSubTable", dto);
		return null;
	}
}
