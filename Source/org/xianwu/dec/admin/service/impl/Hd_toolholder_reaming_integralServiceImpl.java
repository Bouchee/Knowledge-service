package org.xianwu.dec.admin.service.impl;

import java.sql.SQLException;
import java.util.Iterator;
import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.core.orm.xibatis.sqlmap.client.SqlMapExecutor;
import org.xianwu.core.orm.xibatis.support.SqlMapClientCallback;
import org.xianwu.dec.admin.service.Hd_toolholder_reaming_integralService;
import org.xianwu.system.common.util.idgenerator.MaxId;

/**
 * 整体刀具
 *
 * @author XianwuFu
 * @since 2013-01-01
 */
public class Hd_toolholder_reaming_integralServiceImpl extends BizServiceImpl implements Hd_toolholder_reaming_integralService {

	
	/**
	 * 保存刀体
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto saveHd_toolholder_reaming_integral(Dto pDto) {
		Dto outDto = new BaseDto();
		//pDto.put("Hd_toolholder_reaming_integralid", MaxId.getHd_toolholder_reaming_integralID());
		
		String hd_toolholder_reaming_integralID = MaxId.getHd_toolholder_reaming_integralID();
		
		pDto.put("hdtriid", hd_toolholder_reaming_integralID);
		g4Dao.insert("Hd_toolholder_reaming_integral.saveHd_toolholder_reaming_integral", pDto);

		pDto.put("typeid", hd_toolholder_reaming_integralID);
		pDto.put("toolholderid", MaxId.getHd_holedrillingID());
		g4Dao.insert("Hd_toolholder_reaming_integral.saveHd_holedrilling", pDto);
		
		outDto.put("msg", "刀体新增成功！");
		outDto.put("success", new Boolean(true));
		return outDto;
	}
	/**
	 * 批量保存整体铰刀
	 *
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveHd_toolholder_reaming_integral(final List<Dto> dataList) {
		final Dto outDto = new BaseDto();
		g4Dao.getSqlMapClientTpl().execute(new SqlMapClientCallback() {
			public Object doInSqlMapClient(SqlMapExecutor executor) throws SQLException {
				executor.startBatch();
				for (int i = 0; i < dataList.size(); i++) {
					Dto dto3 = (Dto) dataList.get(i);
					String temp = MaxId.getHd_toolholder_reaming_integralID();
					dto3.put("hdtriid",temp);
					dto3.put("typeid", temp);
					dto3.put("toolholderid", MaxId.getHd_holedrillingID());
					executor.insert("Hd_toolholder_reaming_integral.saveHd_holedrilling", dto3);
					executor.insert("Hd_toolholder_reaming_integral.saveHd_toolholder_reaming_integral", dto3);
				}
				
				executor.executeBatch();
				
				outDto.put("msg", "批量导入整体铰刀成功！");
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
	public Dto insertHd_toolholder_reaming_integral(Dto pDto) {
		return saveHd_toolholder_reaming_integral(pDto);
	}
	
	
	/**
	 * 删除刀体
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto deleteHd_toolholder_reaming_integral(Dto pDto) {
		Dto dto = new BaseDto();
		String[] arrChecked = pDto.getAsString("strChecked").split(",");
		Dto dtoKey = null;
		
		for (int i = 0; i < arrChecked.length; i++) {
			dto.put("toolholderid", arrChecked[i]);
			
			List typeid =  g4Dao.queryForList("Hd_toolholder_reaming_integral.queryTypeid4Delete", dto);
			
			g4Dao.delete("Hd_toolholder_reaming_integral.deleteHd_holedrilling", dto);
			
			// g4Dao.update("Hd_toolholder_reaming_integral.updateMachinetoolholder4Hd_toolholder_reaming_integral", dto);
			// g4Dao.update("Hd_toolholder_reaming_integral.updateBladetoolholder4Hd_toolholder_reaming_integral", dto);

			Iterator<Dto> typeid_it = typeid.iterator();
			while (typeid_it.hasNext()) {
				 dtoKey = typeid_it.next();
				 //dto.put("typeid", dtoKey.get("typeid"));
			}
			g4Dao.delete("Hd_toolholder_reaming_integral.deleteHd_toolholder_reaming_integral", dtoKey); 
		}
		return null;
	}

	/**
	 * 修改刀体
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateHd_toolholder_reaming_integral(Dto pDto) {
		
		List typeid = g4Dao.queryForList("Hd_toolholder_reaming_integral.queryTypeid4Update", pDto);
		

		Iterator<Dto> typeid_it = typeid.iterator();
		Dto dtoKey = null;
		while (typeid_it.hasNext()) {
			 dtoKey = typeid_it.next();
			 //dto.put("typeid", dtoKey.get("typeid"));
		}
		
		pDto.put("typeid", dtoKey.get("typeid"));
		g4Dao.update("Hd_toolholder_reaming_integral.updateHd_holedrilling", pDto);
		g4Dao.update("Hd_toolholder_reaming_integral.updateHd_toolholder_reaming_integral", pDto);
		
		return null;
	}

	public Dto saveMainTable(Dto dto){
		g4Dao.update("Hd_toolholder_reaming_integral.saveMainTable", dto);
		return null;
	}

	
	public Dto saveSubTable(Dto dto){
		g4Dao.update("Hd_toolholder_reaming_integral.saveSubTable", dto);
		return null;
	}
	
}
	
	