package org.xianwu.dec.admin.service.impl;

import java.sql.SQLException;
import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.core.orm.xibatis.sqlmap.client.SqlMapExecutor;
import org.xianwu.core.orm.xibatis.support.SqlMapClientCallback;
import org.xianwu.dec.admin.service.BrandService;
import org.xianwu.system.common.util.idgenerator.MaxId;

/**
 * 品牌种类
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class BrandServiceImpl extends BizServiceImpl implements BrandService {

	/**
	 * 保存品牌种类
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto saveBrand(Dto pDto) {
		Dto outDto = new BaseDto();
		pDto.put("brandid", MaxId.getBrandID());
		g4Dao.insert("Brand.saveBrand", pDto);
		outDto.put("msg", "品牌种类新增成功！");
		outDto.put("success", new Boolean(true));
		return outDto;
	}
	
	/**
	 * 批量保存品牌
	 *
	 * @param pDto
	 * @return
	 */
	public Dto batchSaveBrand(final List<Dto> dataList) {
		final Dto outDto = new BaseDto();
		g4Dao.getSqlMapClientTpl().execute(new SqlMapClientCallback() {
			public Object doInSqlMapClient(SqlMapExecutor executor) throws SQLException {
				executor.startBatch();
				for (int i = 0; i < dataList.size(); i++) {
					Dto dto3 = (Dto) dataList.get(i);
					dto3.put("brandid", MaxId.getBrandID());
					//dto3.put("mainshaftpower", null);
					executor.insert("Brand.saveBrand", dto3);
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
	 * 保存品牌种类
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertBrand(Dto pDto) {
		return saveBrand(pDto);
	}
	
	

	/**
	 * 删除品牌种类
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto deleteBrand(Dto pDto) {
		Dto dto = new BaseDto();
		String[] arrChecked = pDto.getAsString("strChecked").split(",");
		for (int i = 0; i < arrChecked.length; i++) {
			dto.put("brandid", arrChecked[i]);
			
			g4Dao.update("Brand.updateBlade4Brand", dto);
			
			g4Dao.update("Brand.updateGroove4Brand", dto);
			
			g4Dao.update("Brand.updateToolholder4Brand", dto);
			
			g4Dao.update("Brand.updateBladematerial4Brand", dto);
			
			g4Dao.delete("Brand.deleteBrand", dto);
		}
		return null;
	}

	/**
	 * 修改品牌种类
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateBrand(Dto pDto) {
		g4Dao.update("Brand.updateBrand", pDto);
		return null;
	}

	
	public Dto saveMainTable(Dto dto){
		g4Dao.update("Brand.saveMainTable", dto);
		return null;
	}

	
	public Dto saveSubTable(Dto dto){
		g4Dao.update("Brand.saveSubTable", dto);
		return null;
	}

}
