package org.xianwu.dec.admin.service.impl;

import java.sql.SQLException;
import java.util.Iterator;
import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.core.orm.xibatis.sqlmap.client.SqlMapExecutor;
import org.xianwu.core.orm.xibatis.support.SqlMapClientCallback;
import org.xianwu.dec.admin.service.Hd_toolholder_holedrilling_integralService;


import org.xianwu.system.common.util.idgenerator.MaxId;

/**
 * 麻花钻
 *
 * @author XianwuFu
 * @since 2013-01-01
 */
public class Hd_toolholder_holedrilling_integralServiceImpl extends BizServiceImpl implements Hd_toolholder_holedrilling_integralService {

	/**
	 * 保存麻花钻
	 *
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto saveHd_toolholder_holedrilling_integral(Dto pDto) {
		Dto outDto = new BaseDto();
		//pDto.put("Hd_toolholder_boringid", MaxId.getHd_toolholder_boringID());
		
		String hd_toolholder_holedrilling_integralID = MaxId.getHd_toolholder_holedrilling_integralID();
		
		pDto.put("hdthilid", hd_toolholder_holedrilling_integralID);
		g4Dao.insert("Hd_toolholder_holedrilling_integral.saveHd_toolholder_holedrilling_integral", pDto);
		pDto.put("typeid", hd_toolholder_holedrilling_integralID);
		pDto.put("toolholderid", MaxId.getHd_holedrillingID());
		g4Dao.insert("Hd_toolholder_holedrilling_integral.saveHd_holedrilling", pDto);
		
		outDto.put("msg", "麻花钻刀体新增成功！");
		outDto.put("success", new Boolean(true));
		return outDto;
	}
	/**
	 * 批量保存整体式钻孔刀具
	 *
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveHd_toolholder_holedrilling_integral(final List<Dto> dataList) {
		final Dto outDto = new BaseDto();
		g4Dao.getSqlMapClientTpl().execute(new SqlMapClientCallback() {
			public Object doInSqlMapClient(SqlMapExecutor executor) throws SQLException {
				executor.startBatch();
				for (int i = 0; i < dataList.size(); i++) {
					Dto dto3 = (Dto) dataList.get(i);
					String temp = MaxId.getHd_toolholder_holedrilling_integralID();
					dto3.put("hdthilid",temp);
					dto3.put("typeid", temp);
					//dto3.put("mainshaftpower", null);
					//executor.insert("Hd_toolholder_poledrilling.saveHd_holedrilling", dto3);
					dto3.put("toolholderid", MaxId.getHd_holedrillingID());
					//dto3.put("mainshaftpower", null);
					executor.insert("Hd_toolholder_holedrilling_integral.saveHd_holedrilling", dto3);
					executor.insert("Hd_toolholder_holedrilling_integral.saveHd_toolholder_holedrilling_integral", dto3);
				}
				
				executor.executeBatch();
				
				outDto.put("msg", "批量导入整体式钻孔刀具成功！");
				outDto.put("success", true);
				return null;
			}
		});
		return outDto;
	}
	
	/**
	 * 插入麻花钻
	 *
	 * @param pDto
	 * @return
	 */
	public Dto insertHd_toolholder_holedrilling_integral(Dto pDto) {
		return saveHd_toolholder_holedrilling_integral(pDto);
	}

	/**
	 * 删除麻花钻
	 *
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto deleteHd_toolholder_holedrilling_integral(Dto pDto) {
		Dto dto = new BaseDto();
		String[] arrChecked = pDto.getAsString("strChecked").split(",");
		Dto dtoKey = null;
		
		for (int i = 0; i < arrChecked.length; i++) {
			dto.put("toolholderid", arrChecked[i]);
			
			List typeid =  g4Dao.queryForList("Hd_toolholder_holedrilling_integral.queryTypeid4Delete", dto);
			
			g4Dao.delete("Hd_toolholder_holedrilling_integral.deleteHd_holedrilling", dto);
			
			// g4Dao.update("Hd_toolholder_boring.updateMachinetoolholder4Hd_toolholder_boring", dto);
			// g4Dao.update("Hd_toolholder_boring.updateBladetoolholder4Hd_toolholder_boring", dto);

			Iterator<Dto> typeid_it = typeid.iterator();
			while (typeid_it.hasNext()) {
				 dtoKey = typeid_it.next();
				 //dto.put("typeid", dtoKey.get("typeid"));
			}
			g4Dao.delete("Hd_toolholder_holedrilling_integral.deleteHd_toolholder_holedrilling_integral", dtoKey); 
		}
		return null;
	}

	/**
	 * 修改麻花钻
	 *
	 * @param pDto
	 * @return
	 */
	public Dto updateHd_toolholder_holedrilling_integral(Dto pDto) {

		List typeid = g4Dao.queryForList("Hd_toolholder_holedrilling_integral.queryTypeid4Update", pDto);
		Iterator<Dto> typeid_it = typeid.iterator();
		Dto dtoKey = null;
		while (typeid_it.hasNext()) {
			 dtoKey = typeid_it.next();
			 //dto.put("typeid", dtoKey.get("typeid"));
				pDto.put("typeid", dtoKey.get("typeid"));
				g4Dao.update("Hd_toolholder_holedrilling_integral.updateHd_holedrilling", pDto);
				g4Dao.update("Hd_toolholder_holedrilling_integral.updateHd_toolholder_holedrilling_integral", pDto);
		}
		
	
		
		return null;
	}



	public Dto saveMainTable(Dto dto){
		g4Dao.update("Hd_toolholder_holedrilling_integral.saveMainTable", dto);
		return null;
	}

	
	public Dto saveSubTable(Dto dto){
		g4Dao.update("Hd_toolholder_holedrilling_integral.saveSubTable", dto);
		return null;
	}
	


}
