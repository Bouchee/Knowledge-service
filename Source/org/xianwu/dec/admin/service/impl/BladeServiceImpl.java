package org.xianwu.dec.admin.service.impl;

import java.sql.SQLException;
import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.core.orm.xibatis.sqlmap.client.SqlMapExecutor;
import org.xianwu.core.orm.xibatis.support.SqlMapClientCallback;
import org.xianwu.dec.admin.service.BladeService;
import org.xianwu.system.common.util.idgenerator.MaxId;

/**
 * 刀片
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class BladeServiceImpl extends BizServiceImpl implements BladeService {

	/**
	 * 保存刀片
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto saveBlade(Dto pDto) {
		Dto outDto = new BaseDto();
		pDto.put("bladeid", MaxId.getBladeID());
		g4Dao.insert("Blade.saveBlade", pDto);
		outDto.put("msg", "刀片新增成功！");
		outDto.put("success", new Boolean(true));
		return outDto;
	}
	
	/**
	 * 批量保存刀片
	 *
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveBlade(final List<Dto> dataList) {
		final Dto outDto = new BaseDto();
		g4Dao.getSqlMapClientTpl().execute(new SqlMapClientCallback() {
			public Object doInSqlMapClient(SqlMapExecutor executor) throws SQLException {
				executor.startBatch();
				for (int i = 0; i < dataList.size(); i++) {
					Dto dto3 = (Dto) dataList.get(i);
					dto3.put("bladeid", MaxId.getBladeID());
					//dto3.put("mainshaftpower", null);
					executor.insert("Blade.saveBlade", dto3);
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
	 * 保存刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertBlade(Dto pDto) {
		return saveBlade(pDto);
	}

	/**
	 * 删除刀片
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto deleteBlade(Dto pDto) {
		Dto dto = new BaseDto();
		String[] arrChecked = pDto.getAsString("strChecked").split(",");
		for (int i = 0; i < arrChecked.length; i++) {
			dto.put("bladeid", arrChecked[i]);
			g4Dao.update("Blade.updateBladetoolholder4Blade", dto);
			g4Dao.delete("Blade.deleteBlade", dto);
		}
		return null;
	}

	/**
	 * 修改刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateBlade(Dto pDto) {
		g4Dao.update("Blade.updateBlade", pDto);
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
