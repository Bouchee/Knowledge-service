package org.xianwu.dec.admin.service.impl;

import java.sql.SQLException;
import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.core.orm.xibatis.sqlmap.client.SqlMapExecutor;
import org.xianwu.core.orm.xibatis.support.SqlMapClientCallback;
import org.xianwu.dec.admin.service.ThreadbladeService;
import org.xianwu.system.common.util.idgenerator.MaxId;

/**
 * 螺纹刀片
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class ThreadbladeServiceImpl extends BizServiceImpl implements ThreadbladeService {

	/**
	 * 保存螺纹刀片
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto saveThreadblade(Dto pDto) {
		Dto outDto = new BaseDto();
		pDto.put("threadbladeid", MaxId.getThreadbladeID());
		g4Dao.insert("Threadblade.saveThreadblade", pDto);
		outDto.put("msg", "螺纹刀片新增成功！");
		outDto.put("success", new Boolean(true));
		return outDto;
	}
	/**
	 * 批量保存刀片
	 *
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveThreadblade(final List<Dto> dataList) {
		final Dto outDto = new BaseDto();
		g4Dao.getSqlMapClientTpl().execute(new SqlMapClientCallback() {
			public Object doInSqlMapClient(SqlMapExecutor executor) throws SQLException {
				executor.startBatch();
				for (int i = 0; i < dataList.size(); i++) {
					Dto dto3 = (Dto) dataList.get(i);
					dto3.put("threadbladeid", MaxId.getThreadbladeID());
					//dto3.put("mainshaftpower", null);
					executor.insert("Threadblade.saveThreadblade", dto3);
				}
				executor.executeBatch();
				
				outDto.put("msg", "批量导入刀片成功！");
				outDto.put("success", true);
				return null;
			}
		});
		return outDto;
	}
	
	/**
	 * 保存螺纹刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertThreadblade(Dto pDto) {
		return saveThreadblade(pDto);
	}

	/**
	 * 删除螺纹刀片
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto deleteThreadblade(Dto pDto) {
		Dto dto = new BaseDto();
		String[] arrChecked = pDto.getAsString("strChecked").split(",");
		for (int i = 0; i < arrChecked.length; i++) {
			dto.put("threadbladeid", arrChecked[i]);
			//g4Dao.update("Threadblade.updateThreadbladethreadtoolholder4Threadblade", dto);
			g4Dao.delete("Threadblade.deleteThreadblade", dto);
		}
		return null;
	}

	/**
	 * 修改螺纹刀片
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateThreadblade(Dto pDto) {
		g4Dao.update("Threadblade.updateThreadblade", pDto);
		return null;
	}
	
	public Dto saveMainTable(Dto dto){
		g4Dao.update("Threadblade.saveMainTable", dto);
		return null;
	}

	
	public Dto saveSubTable(Dto dto){
		g4Dao.update("Threadblade.saveSubTable", dto);
		return null;
	}
}
