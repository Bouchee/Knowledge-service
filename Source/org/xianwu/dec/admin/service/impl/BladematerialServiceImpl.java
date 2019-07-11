package org.xianwu.dec.admin.service.impl;

import java.sql.SQLException;
import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.core.orm.xibatis.sqlmap.client.SqlMapExecutor;
import org.xianwu.core.orm.xibatis.support.SqlMapClientCallback;
import org.xianwu.dec.admin.service.BladematerialService;
import org.xianwu.system.common.util.idgenerator.MaxId;

/**
 * 刀片材质
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class BladematerialServiceImpl extends BizServiceImpl implements BladematerialService {

	/**
	 * 保存刀片材质
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto saveBladematerial(Dto pDto) {
		Dto outDto = new BaseDto();
		pDto.put("bladematerialid", MaxId.getBladematerialID());
		g4Dao.insert("Bladematerial.saveBladematerial", pDto);
		outDto.put("msg", "刀片材质新增成功！");
		outDto.put("success", new Boolean(true));
		return outDto;
	}
	/**
	 * 批量保存刀片材质
	 *
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveBladematerial(final List<Dto> dataList) {
		final Dto outDto = new BaseDto();
		g4Dao.getSqlMapClientTpl().execute(new SqlMapClientCallback() {
			public Object doInSqlMapClient(SqlMapExecutor executor) throws SQLException {
				executor.startBatch();
				for (int i = 0; i < dataList.size(); i++) {
					Dto dto3 = (Dto) dataList.get(i);
					dto3.put("bladematerialid", MaxId.getBladematerialID());
					//dto3.put("mainshaftpower", null);
					executor.insert("Bladematerial.saveBladematerial", dto3);
				}
				executor.executeBatch();
				
				outDto.put("msg", "批量导入品牌成功！");
				outDto.put("success", true);
				return null;
			}
		});
		return outDto;
	}
	/**
	 * 保存刀片材质
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto insertBladematerial(Dto pDto) {
		Dto outDto = new BaseDto();
		pDto.put("bladematerialid", MaxId.getBladematerialID());
		g4Dao.insert("Bladematerial.saveBladematerial", pDto);
		outDto.put("msg", "刀片材质新增成功！");
		outDto.put("success", new Boolean(true));
		return outDto;
	}
	
	/**
	 * 删除刀片材质
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto deleteBladematerial(Dto pDto) {
		Dto dto = new BaseDto();
		String[] arrChecked = pDto.getAsString("strChecked").split(",");
		for (int i = 0; i < arrChecked.length; i++) {
			dto.put("bladematerialid", arrChecked[i]);
			g4Dao.update("Bladematerial.updateWorkpieceblade4Bladematerial", dto);
			g4Dao.update("Bladematerial.updateCtparameter4Bladematerial", dto);
			g4Dao.update("Bladematerial.updateBlade4Bladematerial", dto);
			g4Dao.delete("Bladematerial.deleteBladematerial", dto);
		}
		return null;
	}

	/**
	 * 修改刀片材质
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateBladematerial(Dto pDto) {
		
		g4Dao.update("Bladematerial.updateBladematerial", pDto);
		return null;
	}

	public Dto saveMainTable(Dto dto){
		g4Dao.update("Blade.saveMainTable", dto);
		return null;
	}

	
	public Dto saveSubTable(Dto dto){
		g4Dao.update("Blade.saveSubTable", dto);
		return null;
	}
}
