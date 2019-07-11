package org.xianwu.dec.admin.service.impl;

import java.sql.SQLException;
import java.util.Iterator;
import java.util.List;

import net.sf.jasperreports.web.util.WebUtil;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.core.orm.xibatis.sqlmap.client.SqlMapExecutor;
import org.xianwu.core.orm.xibatis.support.SqlMapClientCallback;
import org.xianwu.core.web.util.WebUtils;
import org.xianwu.dec.admin.service.Hd_toolholder_boringService;
import org.xianwu.dec.admin.service.ToolholderService;
import org.xianwu.system.common.util.idgenerator.MaxId;

/**
 * 刀体
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class Hd_toolholder_boringServiceImpl extends BizServiceImpl implements Hd_toolholder_boringService {

	/**
	 * 保存刀体
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto saveHd_toolholder_boring(Dto pDto) {
		Dto outDto = new BaseDto();
		//pDto.put("Hd_toolholder_boringid", MaxId.getHd_toolholder_boringID());
		
		String hd_toolholder_boringID = MaxId.getHd_toolholder_boringID();
		
		pDto.put("hdtbid", hd_toolholder_boringID);
		g4Dao.insert("Hd_toolholder_boring.saveHd_toolholder_boring", pDto);

		pDto.put("typeid", hd_toolholder_boringID);
		pDto.put("toolholderid", MaxId.getHd_holedrillingID());
		g4Dao.insert("Hd_toolholder_boring.saveHd_holedrilling", pDto);
		
		outDto.put("msg", "刀体新增成功！");
		outDto.put("success", new Boolean(true));
		return outDto;
	}
	/**
	 * 批量保存镗刀刀体
	 *
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveHd_toolholder_boring(final List<Dto> dataList) {
		final Dto outDto = new BaseDto();
		g4Dao.getSqlMapClientTpl().execute(new SqlMapClientCallback() {
			public Object doInSqlMapClient(SqlMapExecutor executor) throws SQLException {
				executor.startBatch();
				for (int i = 0; i < dataList.size(); i++) {
					Dto dto3 = (Dto) dataList.get(i);
					String temp = MaxId.getHd_toolholder_boringID();
					dto3.put("hdtbid",temp);
					dto3.put("typeid", temp);
					dto3.put("toolholderid", MaxId.getHd_holedrillingID());
					executor.insert("Hd_toolholder_boring.saveHd_holedrilling", dto3);
					executor.insert("Hd_toolholder_boring.saveHd_toolholder_boring", dto3);
				}
				
				executor.executeBatch();
				
				outDto.put("msg", "批量导入镗刀刀体成功！");
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
	public Dto insertHd_toolholder_boring(Dto pDto) {
		return saveHd_toolholder_boring(pDto);
	}
	
	/**
	 * 删除刀体
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto deleteHd_toolholder_boring(Dto pDto) {
		Dto dto = new BaseDto();
		String[] arrChecked = pDto.getAsString("strChecked").split(",");
		Dto dtoKey = null;
		
		for (int i = 0; i < arrChecked.length; i++) {
			dto.put("toolholderid", arrChecked[i]);
			
			List typeid =  g4Dao.queryForList("Hd_toolholder_boring.queryTypeid4Delete", dto);
			
			g4Dao.delete("Hd_toolholder_boring.deleteHd_holedrilling", dto);
			
			// g4Dao.update("Hd_toolholder_boring.updateMachinetoolholder4Hd_toolholder_boring", dto);
			// g4Dao.update("Hd_toolholder_boring.updateBladetoolholder4Hd_toolholder_boring", dto);

			Iterator<Dto> typeid_it = typeid.iterator();
			while (typeid_it.hasNext()) {
				 dtoKey = typeid_it.next();
				 //dto.put("typeid", dtoKey.get("typeid"));
			}
			g4Dao.delete("Hd_toolholder_boring.deleteHd_toolholder_boring", dtoKey); 
		}
		return null;
	}

	/**
	 * 修改刀体
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateHd_toolholder_boring(Dto pDto) {
		
		List typeid = g4Dao.queryForList("Hd_toolholder_boring.queryTypeid4Update", pDto);
		

		Iterator<Dto> typeid_it = typeid.iterator();
		Dto dtoKey = null;
		while (typeid_it.hasNext()) {
			 dtoKey = typeid_it.next();
			 //dto.put("typeid", dtoKey.get("typeid"));
		}
		
		pDto.put("hdtbid", dtoKey.getAsString("typeid"));
		g4Dao.update("Hd_toolholder_boring.updateHd_holedrilling", pDto);
		g4Dao.update("Hd_toolholder_boring.updateHd_toolholder_boring", pDto);
		
		return null;
	}
	
	public Dto saveMainTable(Dto dto){
		g4Dao.update("Hd_toolholder_boring.saveMainTable", dto);
		return null;
	}

	
	public Dto saveSubTable(Dto dto){
		g4Dao.update("Hd_toolholder_boring.saveSubTable", dto);
		return null;
	}
}
