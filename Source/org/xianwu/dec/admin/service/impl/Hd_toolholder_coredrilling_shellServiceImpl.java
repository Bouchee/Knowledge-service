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
import org.xianwu.dec.admin.service.Hd_toolholder_coredrilling_shellService;
import org.xianwu.dec.admin.service.ToolholderService;
import org.xianwu.system.common.util.idgenerator.MaxId;

/**
 * 刀体
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class Hd_toolholder_coredrilling_shellServiceImpl extends BizServiceImpl implements Hd_toolholder_coredrilling_shellService {

	/**
	 * 保存刀体
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto saveHd_toolholder_coredrilling_shell(Dto pDto) {
		Dto outDto = new BaseDto();
		//pDto.put("Hd_toolholder_coredrilling_shellid", MaxId.getHd_toolholder_coredrilling_shellID());
		
		String Hd_toolholder_coredrilling_shellID = MaxId.getHd_toolholder_coredrilling_shellID();
		
		pDto.put("hdtcsid", Hd_toolholder_coredrilling_shellID);
		g4Dao.insert("Hd_toolholder_coredrilling_shell.saveHd_toolholder_coredrilling_shell", pDto);

		pDto.put("typeid", Hd_toolholder_coredrilling_shellID);
		pDto.put("toolholderid", MaxId.getHd_holedrillingID());
		g4Dao.insert("Hd_toolholder_coredrilling_shell.saveHd_holedrilling", pDto);
		
		outDto.put("msg", "刀体新增成功！");
		outDto.put("success", new Boolean(true));
		return outDto;
	}
	/**
	 * 批量保存套式扩孔钻
	 *
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveHd_toolholder_coredrilling_shell(final List<Dto> dataList) {
		final Dto outDto = new BaseDto();
		g4Dao.getSqlMapClientTpl().execute(new SqlMapClientCallback() {
			public Object doInSqlMapClient(SqlMapExecutor executor) throws SQLException {
				executor.startBatch();
				for (int i = 0; i < dataList.size(); i++) {
					Dto dto3 = (Dto) dataList.get(i);
					String temp = MaxId.getHd_toolholder_coredrilling_shellID();
					dto3.put("hdtcsid",temp);
					dto3.put("typeid", temp);
					dto3.put("toolholderid", MaxId.getHd_holedrillingID());
					executor.insert("Hd_toolholder_coredrilling_shell.saveHd_holedrilling", dto3);
					executor.insert("Hd_toolholder_coredrilling_shell.saveHd_toolholder_coredrilling_shell", dto3);
				}
				
				executor.executeBatch();
				
				outDto.put("msg", "批量导入套式扩孔钻成功！");
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
	public Dto insertHd_toolholder_coredrilling_shell(Dto pDto) {
		return saveHd_toolholder_coredrilling_shell(pDto);
	}
	
	/**
	 * 删除刀体
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto deleteHd_toolholder_coredrilling_shell(Dto pDto) {
		Dto dto = new BaseDto();
		String[] arrChecked = pDto.getAsString("strChecked").split(",");
		Dto dtoKey = null;
		
		for (int i = 0; i < arrChecked.length; i++) {
			dto.put("toolholderid", arrChecked[i]);
			
			List typeid =  g4Dao.queryForList("Hd_toolholder_coredrilling_shell.queryTypeid4Delete", dto);
			
			g4Dao.delete("Hd_toolholder_coredrilling_shell.deleteHd_holedrilling", dto);
			
			// g4Dao.update("Hd_toolholder_coredrilling_shell.updateMachinetoolholder4Hd_toolholder_coredrilling_shell", dto);
			// g4Dao.update("Hd_toolholder_coredrilling_shell.updateBladetoolholder4Hd_toolholder_coredrilling_shell", dto);

			Iterator<Dto> typeid_it = typeid.iterator();
			while (typeid_it.hasNext()) {
				 dtoKey = typeid_it.next();
				 dto.put("hdtcsid", dtoKey.getAsString("typeid"));
				 g4Dao.delete("Hd_toolholder_coredrilling_shell.deleteHd_toolholder_coredrilling_shell", dtoKey); 
			}
			
		}
		return null;
	}

	/**
	 * 修改刀体
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateHd_toolholder_coredrilling_shell(Dto pDto) {
		
		List typeid = g4Dao.queryForList("Hd_toolholder_coredrilling_shell.queryTypeid4Update", pDto);
		

		Iterator<Dto> typeid_it = typeid.iterator();
		Dto dtoKey = null;
		while (typeid_it.hasNext()) {
			 dtoKey = typeid_it.next();
			 pDto.put("hdtcsid", dtoKey.getAsString("typeid"));
			 g4Dao.update("Hd_toolholder_coredrilling_shell.updateHd_holedrilling", pDto);
			 g4Dao.update("Hd_toolholder_coredrilling_shell.updateHd_toolholder_coredrilling_shell", pDto);
		}
		
		//pDto.put("typeid", dtoKey.get("typeid"));
		
		
		return null;
	}

	public Dto saveMainTable(Dto dto){
		g4Dao.update("Hd_toolholder_coredrilling_shell.saveMainTable", dto);
		return null;
	}

	
	public Dto saveSubTable(Dto dto){
		g4Dao.update("Hd_toolholder_coredrilling_shell.saveSubTable", dto);
		return null;
	}
	
}
