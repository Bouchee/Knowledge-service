package org.xianwu.dec.admin.service.impl;

import java.sql.SQLException;
import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.core.orm.xibatis.sqlmap.client.SqlMapExecutor;
import org.xianwu.core.orm.xibatis.support.SqlMapClientCallback;
import org.xianwu.dec.admin.service.Hd_toolholder_boring_moduleService;
import org.xianwu.system.common.util.idgenerator.MaxId;

/**
 * 镗削刀具模块
 *
 * @author XianwuFu
 * @since 2013-01-01
 */
public class Hd_toolholder_boring_moduleServiceImpl extends BizServiceImpl implements Hd_toolholder_boring_moduleService {

	/**
	 * 保存镗削刀具模块
	 *
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto saveHd_toolholder_boring_module(Dto pDto) {
		Dto outDto = new BaseDto();

		pDto.put("toolholderid", MaxId.getHd_toolholder_boring_moduleID());
		g4Dao.insert("Hd_toolholder_boring_module.saveHd_toolholder_boring_module", pDto);

		outDto.put("msg", "镗削刀具模块新增成功！");
		outDto.put("success", new Boolean(true));
		return outDto;
	}
	/**
	 * 批量保存镗刀模块
	 *
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveHd_toolholder_boring_module(final List<Dto> dataList) {
		final Dto outDto = new BaseDto();
		g4Dao.getSqlMapClientTpl().execute(new SqlMapClientCallback() {
			public Object doInSqlMapClient(SqlMapExecutor executor) throws SQLException {
				executor.startBatch();
				for (int i = 0; i < dataList.size(); i++) {
					Dto dto3 = (Dto) dataList.get(i);
					dto3.put("toolholderid", MaxId.getHd_toolholder_boring_moduleID());
					//dto3.put("mainshaftpower", null);
					executor.insert("Hd_toolholder_boring_module.saveHd_toolholder_boring_module", dto3);
				}
				executor.executeBatch();
				
				outDto.put("msg", "批量导入镗刀模块成功！");
				outDto.put("success", true);
				return null;
			}
		});
		return outDto;
	}
	/**
	 * 保存镗削模块
	 *
	 * @param pDto
	 * @return
	 */
	public Dto insertHd_toolholder_boring_module(Dto pDto) {
		return saveHd_toolholder_boring_module(pDto);
	}

	/**
	 * 删除镗削刀具模块
	 *
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto deleteHd_toolholder_boring_module(Dto pDto) {
		Dto dto = new BaseDto();
		String[] arrChecked = pDto.getAsString("strChecked").split(",");
		for (int i = 0; i < arrChecked.length; i++) {
			dto.put("toolholderid", arrChecked[i]);
			g4Dao.delete("Hd_toolholder_boring_module.deleteHd_toolholder_boring_module", dto);
		}
		return null;
	}

	/**
	 * 修改镗削刀具模块
	 *
	 * @param pDto
	 * @return
	 */
	public Dto updateHd_toolholder_boring_module(Dto pDto) {

		g4Dao.update("Hd_toolholder_boring_module.updateHd_toolholder_boring_module", pDto);
		return null;
	}
	
	public Dto saveMainTable(Dto dto){
		g4Dao.update("Hd_toolholder_boring_module.saveMainTable", dto);
		return null;
	}

	
	public Dto saveSubTable(Dto dto){
		g4Dao.update("Hd_toolholder_boring_module.saveSubTable", dto);
		return null;
	}
}
