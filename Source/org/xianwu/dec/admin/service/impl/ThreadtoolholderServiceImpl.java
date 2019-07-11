package org.xianwu.dec.admin.service.impl;

import java.sql.SQLException;
import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.core.orm.xibatis.sqlmap.client.SqlMapExecutor;
import org.xianwu.core.orm.xibatis.support.SqlMapClientCallback;
import org.xianwu.dec.admin.service.ThreadtoolholderService;
import org.xianwu.system.common.util.idgenerator.MaxId;

/**
 * 螺纹刀体
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class ThreadtoolholderServiceImpl extends BizServiceImpl implements ThreadtoolholderService {

	/**
	 * 保存刀体
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto saveThreadtoolholder(Dto pDto) {
		Dto outDto = new BaseDto();
		pDto.put("toolholderid", MaxId.getThreadtoolholderID());
		g4Dao.insert("Threadtoolholder.saveThreadtoolholder", pDto);
		outDto.put("msg", "螺纹刀体新增成功！");
		outDto.put("success", new Boolean(true));
		return outDto;
	}
	/**
	 * 批量保存刀体
	 *
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveThreadtoolholder(final List<Dto> dataList) {
		final Dto outDto = new BaseDto();
		g4Dao.getSqlMapClientTpl().execute(new SqlMapClientCallback() {
			public Object doInSqlMapClient(SqlMapExecutor executor) throws SQLException {
				executor.startBatch();
				for (int i = 0; i < dataList.size(); i++) {
					Dto dto3 = (Dto) dataList.get(i);
					dto3.put("toolholderid", MaxId.getThreadtoolholderID());
					//dto3.put("mainshaftpower", null);
					executor.insert("Threadtoolholder.saveThreadtoolholder", dto3);
				}
				executor.executeBatch();
				
				outDto.put("msg", "批量导入刀体成功！");
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
	public Dto insertThreadtoolholder(Dto pDto) {
		return saveThreadtoolholder(pDto);
	}
	
	/**
	 * 删除刀体
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto deleteThreadtoolholder(Dto pDto) {
		Dto dto = new BaseDto();
		String[] arrChecked = pDto.getAsString("strChecked").split(",");
		for (int i = 0; i < arrChecked.length; i++) {
			dto.put("toolholderid", arrChecked[i]);
			//g4Dao.update("Threadtoolholder.updateMachinetoolholder4Threadtoolholder", dto);
			//g4Dao.update("Threadtoolholder.updateThreadbladethreadtoolholder4Threadtoolholder", dto);
			g4Dao.delete("Threadtoolholder.deleteThreadtoolholder", dto);
		}
		return null;
	}

	/**
	 * 修改刀体
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateThreadtoolholder(Dto pDto) {
		
		g4Dao.update("Threadtoolholder.updateThreadtoolholder", pDto);
		return null;
	}
	
	public Dto saveMainTable(Dto dto){
		g4Dao.update("Threadtoolholder.saveMainTable", dto);
		return null;
	}

	
	public Dto saveSubTable(Dto dto){
		g4Dao.update("Threadtoolholder.saveSubTable", dto);
		return null;
	}
}
