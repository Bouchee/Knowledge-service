package org.xianwu.dec.admin.service.impl;

import java.sql.SQLException;
import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.core.orm.xibatis.sqlmap.client.SqlMapExecutor;
import org.xianwu.core.orm.xibatis.support.SqlMapClientCallback;
import org.xianwu.dec.admin.service.ToolholderService;
import org.xianwu.system.common.util.idgenerator.MaxId;

/**
 * 刀体
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class ToolholderServiceImpl extends BizServiceImpl implements ToolholderService {

	/**
	 * 保存刀体
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto saveToolholder(Dto pDto) {
		Dto outDto = new BaseDto();
		pDto.put("toolholderid", MaxId.getToolholderID());
		g4Dao.insert("Toolholder.saveToolholder", pDto);
		outDto.put("msg", "刀体新增成功！");
		outDto.put("success", new Boolean(true));
		return outDto;
	}

	/**
	 * 批量保存刀体
	 *
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveToolholder(final List<Dto> dataList) {
		final Dto outDto = new BaseDto();
		g4Dao.getSqlMapClientTpl().execute(new SqlMapClientCallback() {
			public Object doInSqlMapClient(SqlMapExecutor executor) throws SQLException {
				executor.startBatch();
				for (int i = 0; i < dataList.size(); i++) {
					Dto dto3 = (Dto) dataList.get(i);
					dto3.put("toolholderid", MaxId.getToolholderID());
					//dto3.put("mainshaftpower", null);
					executor.insert("Toolholder.saveToolholder", dto3);
				}
				executor.executeBatch();
				
				outDto.put("msg", "批量导入成功！");
				outDto.put("success", true);
				return null;
			}
		});
		return outDto;
	}
	
	/**
	 * 保存刀体
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertToolholder(Dto pDto) {
		return saveToolholder(pDto);
	}
	
	/**
	 * 删除刀体
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto deleteToolholder(Dto pDto) {
		Dto dto = new BaseDto();
		String[] arrChecked = pDto.getAsString("strChecked").split(",");
		for (int i = 0; i < arrChecked.length; i++) {
			dto.put("toolholderid", arrChecked[i]);
			g4Dao.update("Toolholder.updateMachinetoolholder4Toolholder", dto);
			g4Dao.update("Toolholder.updateBladetoolholder4Toolholder", dto);
			g4Dao.delete("Toolholder.deleteToolholder", dto);
		}
		return null;
	}

	/**
	 * 修改刀体
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateToolholder(Dto pDto) {
		
		g4Dao.update("Toolholder.updateToolholder", pDto);
		return null;
	}

	public Dto saveMainTable(Dto dto){
		g4Dao.update("Toolholder.saveMainTable", dto);
		return null;
	}

	
	public Dto saveSubTable(Dto dto){
		g4Dao.update("Toolholder.saveSubTable", dto);
		return null;
	}
}
