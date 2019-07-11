package org.xianwu.dec.admin.service.impl;

import java.sql.SQLException;
import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.core.orm.xibatis.sqlmap.client.SqlMapExecutor;
import org.xianwu.core.orm.xibatis.support.SqlMapClientCallback;
import org.xianwu.dec.admin.service.Hd_module_coredrilling_shellService;
import org.xianwu.dec.admin.service.Hd_module_coredrilling_shellService;
import org.xianwu.system.common.util.idgenerator.MaxId;

/**
 * 套式扩孔钻模块
 *
 * @author XianwuFu
 * @since 2013-01-01
 */
public class Hd_module_coredrilling_shellServiceImpl extends BizServiceImpl implements Hd_module_coredrilling_shellService {

	/**
	 * 保存套式扩孔钻模块
	 *
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto saveHd_module_coredrilling_shell(Dto pDto) {
		Dto outDto = new BaseDto(); 
		pDto.put("toolholderid", MaxId.getHd_module_coredrilling_shellID());
		g4Dao.insert("Hd_module_coredrilling_shell.saveHd_module_coredrilling_shell", pDto);
		
		outDto.put("msg", "套式扩孔钻模块套式扩孔钻模块！");
		outDto.put("success", new Boolean(true));
		return outDto;
	}
	/**
	 * 批量保存套式扩孔钻模块
	 *
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveHd_module_coredrilling_shell(final List<Dto> dataList) {
		final Dto outDto = new BaseDto();
		g4Dao.getSqlMapClientTpl().execute(new SqlMapClientCallback() {
			public Object doInSqlMapClient(SqlMapExecutor executor) throws SQLException {
				executor.startBatch();
				for (int i = 0; i < dataList.size(); i++) {
					Dto dto3 = (Dto) dataList.get(i);
					dto3.put("toolholderid", MaxId.getHd_module_coredrilling_shellID());
					executor.insert("Hd_module_coredrilling_shell.saveHd_module_coredrilling_shell", dto3);
				}
				
				executor.executeBatch();
				
				outDto.put("msg", "批量导入套式扩孔钻模块成功！");
				outDto.put("success", true);
				return null;
			}
		});
		return outDto;
	}
	/**
	 * 保存套式扩孔钻模块
	 *
	 * @param pDto
	 * @return
	 */
	public Dto insertHd_module_coredrilling_shell(Dto pDto) {
		return saveHd_module_coredrilling_shell(pDto);
	}

	/**
	 * 删除套式扩孔钻模块
	 *
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto deleteHd_module_coredrilling_shell(Dto pDto) {
		Dto dto = new BaseDto();
		String[] arrChecked = pDto.getAsString("strChecked").split(",");
		for (int i = 0; i < arrChecked.length; i++) {
			dto.put("toolholderid", arrChecked[i]);
			g4Dao.delete("Hd_module_coredrilling_shell.deleteHd_module_coredrilling_shell", dto);
		}
		return null;
	}

	/**
	 * 修改套式扩孔钻模块
	 *
	 * @param pDto
	 * @return
	 */
	public Dto updateHd_module_coredrilling_shell(Dto pDto) {

		g4Dao.update("Hd_module_coredrilling_shell.updateHd_module_coredrilling_shell", pDto);
		return null;
	}

	public Dto saveMainTable(Dto dto){
		g4Dao.update("Hd_module_coredrilling_shell.saveMainTable", dto);
		return null;
	}

	
	public Dto saveSubTable(Dto dto){
		g4Dao.update("Hd_module_coredrilling_shell.saveSubTable", dto);
		return null;
	}
	
}
