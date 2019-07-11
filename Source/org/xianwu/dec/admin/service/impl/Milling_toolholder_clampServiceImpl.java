package org.xianwu.dec.admin.service.impl;

import java.sql.SQLException;
import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.core.orm.xibatis.sqlmap.client.SqlMapExecutor;
import org.xianwu.core.orm.xibatis.support.SqlMapClientCallback;
import org.xianwu.dec.admin.service.Milling_toolholder_clampService;
import org.xianwu.system.common.util.idgenerator.MaxId;

/**
 * 机夹刀具刀体
 *
 * @author XianwuFu
 * @since 2013-01-01
 */
public class Milling_toolholder_clampServiceImpl extends BizServiceImpl implements Milling_toolholder_clampService {

	/**
	 * 保存机夹刀具刀体
	 *
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto saveMilling_toolholder_clamp(Dto pDto) {
		Dto outDto = new BaseDto();
		pDto.put("toolholderid", MaxId.getMilling_toolholder_clampID());
		g4Dao.insert("Milling_toolholder_clamp.saveMilling_toolholder_clamp", pDto);
		outDto.put("msg", "机夹刀具刀体新增成功！");
		outDto.put("success", new Boolean(true));
		return outDto;
	}
	/**
	 * 批量保存机夹刀具刀体
	 *
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveMilling_toolholder_clamp(final List<Dto> dataList) {
		final Dto outDto = new BaseDto();
		g4Dao.getSqlMapClientTpl().execute(new SqlMapClientCallback() {
			public Object doInSqlMapClient(SqlMapExecutor executor) throws SQLException {
				executor.startBatch();
				for (int i = 0; i < dataList.size(); i++) {
					Dto dto3 = (Dto) dataList.get(i);
					dto3.put("toolholderid", MaxId.getMilling_toolholder_clampID());
					//dto3.put("mainshaftpower", null);
					executor.insert("Milling_toolholder_clamp.saveMilling_toolholder_clamp", dto3);
				}
				executor.executeBatch();
				
				outDto.put("msg", "批量导入机夹刀具刀体成功！");
				outDto.put("success", true);
				return null;
			}
		});
		return outDto;
	}
	
	/**
	 * 保存机夹刀具刀体
	 *
	 * @param pDto
	 * @return
	 */
	public Dto insertMilling_toolholder_clamp(Dto pDto) {
		return saveMilling_toolholder_clamp(pDto);
	}

	/**
	 * 删除机夹刀具刀体
	 *
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto deleteMilling_toolholder_clamp(Dto pDto) {
		Dto dto = new BaseDto();
		String[] arrChecked = pDto.getAsString("strChecked").split(",");
		for (int i = 0; i < arrChecked.length; i++) {
			dto.put("toolholderid", arrChecked[i]);
			g4Dao.delete("Milling_toolholder_clamp.deleteMilling_toolholder_clamp", dto);
		}
		return null;
	}

	/**
	 * 修改机夹刀具刀体
	 *
	 * @param pDto
	 * @return
	 */
	public Dto updateMilling_toolholder_clamp(Dto pDto) {
		g4Dao.update("Milling_toolholder_clamp.updateMilling_toolholder_clamp", pDto);
		return null;
	}
	
	public Dto saveMainTable(Dto dto){
		g4Dao.update("Milling_toolholder_clamp.saveMainTable", dto);
		return null;
	}

	
	public Dto saveSubTable(Dto dto){
		g4Dao.update("Milling_toolholder_clamp.saveSubTable", dto);
		return null;
	}
}
