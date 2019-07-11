package org.xianwu.dec.admin.service.impl;

import java.sql.SQLException;
import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.core.orm.xibatis.sqlmap.client.SqlMapExecutor;
import org.xianwu.core.orm.xibatis.support.SqlMapClientCallback;
import org.xianwu.dec.admin.service.GrooveService;
import org.xianwu.system.common.util.idgenerator.MaxId;

/**
 * 槽形
 *
 * @author XianwuFu
 * @since 2013-01-01
 */
public class GrooveServiceImpl extends BizServiceImpl implements GrooveService {

	/**
	 * 保存槽形
	 *
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto saveGroove(Dto pDto) {
		Dto outDto = new BaseDto();
		pDto.put("grooveid", MaxId.getGrooveID());
		g4Dao.insert("Groove.saveGroove", pDto);
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
	public Dto batchSaveGroove(final List<Dto> dataList) {
		final Dto outDto = new BaseDto();
		g4Dao.getSqlMapClientTpl().execute(new SqlMapClientCallback() {
			public Object doInSqlMapClient(SqlMapExecutor executor) throws SQLException {
				executor.startBatch();
				for (int i = 0; i < dataList.size(); i++) {
					Dto dto3 = (Dto) dataList.get(i);
					dto3.put("grooveid", MaxId.getGrooveID());
					//dto3.put("mainshaftpower", null);
					executor.insert("Groove.saveGroove", dto3);
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
	 * 保存槽形
	 *
	 * @param pDto
	 * @return
	 */
	public Dto insertGroove(Dto pDto) {
		return saveGroove(pDto);
	}

	/**
	 * 删除槽形
	 *
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto deleteGroove(Dto pDto) {
		Dto dto = new BaseDto();
		String[] arrChecked = pDto.getAsString("strChecked").split(",");
		for (int i = 0; i < arrChecked.length; i++) {
			dto.put("grooveid", arrChecked[i]);
			//g4Dao.update("Groove.deleteBladetoolholder4Blade4Groove", dto);

			g4Dao.update("Groove.updateBlade4Groove", dto);

			g4Dao.delete("Groove.deleteGroove", dto);
		}
		return null;
	}

	/**
	 * 修改槽形
	 *
	 * @param pDto
	 * @return
	 */
	public Dto updateGroove(Dto pDto) {
		g4Dao.update("Groove.updateGroove", pDto);
		return null;
	}

	public Dto saveMainTable(Dto dto){
		g4Dao.update("Groove.saveMainTable", dto);
		return null;
	}

	
	public Dto saveSubTable(Dto dto){
		g4Dao.update("Groove.saveSubTable", dto);
		return null;
	}
}
