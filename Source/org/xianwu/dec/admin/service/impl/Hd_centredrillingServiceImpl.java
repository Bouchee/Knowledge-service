package org.xianwu.dec.admin.service.impl;

import java.sql.SQLException;
import java.util.Iterator;
import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.core.orm.xibatis.sqlmap.client.SqlMapExecutor;
import org.xianwu.core.orm.xibatis.support.SqlMapClientCallback;
import org.xianwu.dec.admin.service.Hd_centredrillingService;
import org.xianwu.system.common.util.idgenerator.MaxId;

/**
 * 中心钻
 *
 * @author XianwuFu
 * @since 2013-01-01
 */
public class Hd_centredrillingServiceImpl extends BizServiceImpl implements Hd_centredrillingService {

	/**
	 * 保存中心钻
	 *
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto saveHd_centredrilling(Dto pDto) {
		Dto outDto = new BaseDto();
		//pDto.put("Hd_toolholder_boringid", MaxId.getHd_toolholder_boringID());
		
		String hd_centredrillingID = MaxId.getHd_centredrillingID();
		
		pDto.put("hdtcid", hd_centredrillingID);
		g4Dao.insert("Hd_centredrilling.saveHd_centredrilling", pDto);
		pDto.put("typeid", hd_centredrillingID);
		pDto.put("toolholderid", MaxId.getHd_holedrillingID());
		g4Dao.insert("Hd_centredrilling.saveHd_holedrilling", pDto);
		
		outDto.put("msg", "中心钻新增成功！");
		outDto.put("success", new Boolean(true));
		return outDto;
	}
	/**
	 * 批量保存中心钻
	 *
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveHd_centredrilling(final List<Dto> dataList) {
		final Dto outDto = new BaseDto();
		g4Dao.getSqlMapClientTpl().execute(new SqlMapClientCallback() {
			public Object doInSqlMapClient(SqlMapExecutor executor) throws SQLException {
				executor.startBatch();
				for (int i = 0; i < dataList.size(); i++) {
					Dto dto3 = (Dto) dataList.get(i);
					String temp = MaxId.getHd_centredrillingID();
					dto3.put("hdtcid",temp);
					dto3.put("typeid", temp);
					dto3.put("toolholderid", MaxId.getHd_holedrillingID());
					executor.insert("Hd_centredrilling.saveHd_centredrilling", dto3);
					executor.insert("Hd_centredrilling.saveHd_holedrilling", dto3);
				}
				
				executor.executeBatch();
				
				outDto.put("msg", "批量导入中心钻成功！");
				outDto.put("success", true);
				return null;
			}
		});
		return outDto;
	}
	/**
	 * 插入中心钻
	 *
	 * @param pDto
	 * @return
	 */
	public Dto insertHd_centredrilling(Dto pDto) {
		return saveHd_centredrilling(pDto);
	}

	/**
	 * 删除中心钻
	 *
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto deleteHd_centredrilling(Dto pDto) {
		Dto dto = new BaseDto();
		String[] arrChecked = pDto.getAsString("strChecked").split(",");
		Dto dtoKey = null;
		
		for (int i = 0; i < arrChecked.length; i++) {
			dto.put("toolholderid", arrChecked[i]);
			
			List typeid =  g4Dao.queryForList("Hd_centredrilling.queryTypeid4Delete", dto);
			
			g4Dao.delete("Hd_centredrilling.deleteHd_holedrilling", dto);
			
			// g4Dao.update("Hd_toolholder_boring.updateMachinetoolholder4Hd_toolholder_boring", dto);
			// g4Dao.update("Hd_toolholder_boring.updateBladetoolholder4Hd_toolholder_boring", dto);

			Iterator<Dto> typeid_it = typeid.iterator();
			while (typeid_it.hasNext()) {
				 dtoKey = typeid_it.next();
				 //dto.put("typeid", dtoKey.get("typeid"));
			}
			g4Dao.delete("Hd_centredrilling.deleteHd_centredrilling", dtoKey); 
		}
		return null;
	}

	/**
	 * 修改中心钻
	 *
	 * @param pDto
	 * @return
	 */
	public Dto updateHd_centredrilling(Dto pDto) {

		List typeid = g4Dao.queryForList("Hd_centredrilling.queryTypeid4Update", pDto);
		

		Iterator<Dto> typeid_it = typeid.iterator();
		Dto dtoKey = null;
		while (typeid_it.hasNext()) {
			 dtoKey = typeid_it.next();
			 //dto.put("typeid", dtoKey.get("typeid"));
			 
			 pDto.put("typeid", dtoKey.get("typeid"));
			 g4Dao.update("Hd_centredrilling.updateHd_holedrilling", pDto);
			 g4Dao.update("Hd_centredrilling.updateHd_centredrilling", pDto);
		}

		return null;
	}

	public Dto saveMainTable(Dto dto){
		g4Dao.update("Hd_centredrilling.saveMainTable", dto);
		return null;
	}

	
	public Dto saveSubTable(Dto dto){
		g4Dao.update("Hd_centredrilling.saveSubTable", dto);
		return null;
	}
	


}
