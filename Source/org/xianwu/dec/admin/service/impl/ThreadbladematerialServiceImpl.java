package org.xianwu.dec.admin.service.impl;

import java.sql.SQLException;
import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.core.orm.xibatis.sqlmap.client.SqlMapExecutor;
import org.xianwu.core.orm.xibatis.support.SqlMapClientCallback;
import org.xianwu.dec.admin.service.ThreadbladematerialService;
import org.xianwu.system.common.util.idgenerator.MaxId;

/**
 * 刀片材质
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class ThreadbladematerialServiceImpl extends BizServiceImpl implements ThreadbladematerialService {

	/**
	 * 保存刀片材质
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto saveThreadbladematerial(Dto pDto) {
		Dto outDto = new BaseDto();
		pDto.put("bladematerialid", MaxId.getThreadbladematerialID());
		g4Dao.insert("Threadbladematerial.saveThreadbladematerial", pDto);
		outDto.put("msg", "刀片材质新增成功！");
		outDto.put("success", new Boolean(true));
		return outDto;
	}
	/**
	 * 批量保存刀片
	 *
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveThreadbladematerial(final List<Dto> dataList) {
		final Dto outDto = new BaseDto();
		g4Dao.getSqlMapClientTpl().execute(new SqlMapClientCallback() {
			public Object doInSqlMapClient(SqlMapExecutor executor) throws SQLException {
				executor.startBatch();
				for (int i = 0; i < dataList.size(); i++) {
					Dto dto3 = (Dto) dataList.get(i);
					dto3.put("bladematerialid", MaxId.getThreadbladematerialID());
					//dto3.put("mainshaftpower", null);
					executor.insert("Threadbladematerial.saveThreadbladematerial", dto3);
				}
				executor.executeBatch();
				
				outDto.put("msg", "批量导入刀片材料成功！");
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
	public Dto insertThreadbladematerial(Dto pDto) {
		return saveThreadbladematerial(pDto);
	}
	
	/**
	 * 删除刀片材质
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto deleteThreadbladematerial(Dto pDto) {
		Dto dto = new BaseDto();
		String[] arrChecked = pDto.getAsString("strChecked").split(",");
		for (int i = 0; i < arrChecked.length; i++) {
			dto.put("bladematerialid", arrChecked[i]);
			//g4Dao.update("Threadbladematerial.updateWorkpieceblade4Threadbladematerial", dto);
			//g4Dao.update("Threadbladematerial.updateCtparameter4Threadbladematerial", dto);
			g4Dao.update("Threadbladematerial.updateThreadblade4Threadbladematerial", dto);
			g4Dao.delete("Threadbladematerial.deleteThreadbladematerial", dto);
		}
		return null;
	}

	/**
	 * 修改刀片材质
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateThreadbladematerial(Dto pDto) {
		
		g4Dao.update("Threadbladematerial.updateThreadbladematerial", pDto);
		return null;
	}
	
	public Dto saveMainTable(Dto dto){
		g4Dao.update("Threadbladematerial.saveMainTable", dto);
		return null;
	}

	
	public Dto saveSubTable(Dto dto){
		g4Dao.update("Threadbladematerial.saveSubTable", dto);
		return null;
	}
}
