package org.xianwu.system.admin.service.impl;

import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.core.util.Constants;
import org.xianwu.core.util.Utils;
import org.xianwu.system.admin.service.PartService;
import org.xianwu.system.common.util.SystemConstants;
import org.xianwu.system.common.util.idgenerator.IdHelper;

/**
 * UI组件授权服务实现
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class PartServiceImpl extends BizServiceImpl implements PartService {
	
	/**
	 * 保存托管UI组件脏数据
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public Dto saveDirtyDatas(Dto pDto){
		Dto outDto = new BaseDto();
		List list = pDto.getDefaultAList();
		if(!checkUniqueIndex(list)){
			outDto.setSuccess(Constants.FALSE);
			return outDto;
		}
		for (int i = 0; i < list.size(); i++) {
			Dto dto = (BaseDto)list.get(i);
			if (dto.getAsString("remark").equals("null")) {
				dto.put("remark", "");
			}
			if (dto.getAsString("dirtytype").equalsIgnoreCase("1")) {
				dto.put("partid", IdHelper.getPartID());
				g4Dao.insert("Part.savePartItem", dto);
			}else {
				g4Dao.update("Part.updatePartItem", dto);
			}
		}
		outDto.setSuccess(Constants.TRUE);
		return outDto;
	}
	
	/**
	 * 检查组件唯一性
	 * 
	 * @param pList
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	private boolean checkUniqueIndex(List pList){
		/*
		for (int i = 0; i < pList.size(); i++) {
			Dto dto = (BaseDto)pList.get(i);
			Dto qDto = new BaseDto();
			qDto.put("menuid", dto.getAsString("menuid"));
			qDto.put("cmpid", dto.getAsString("cmpid"));
			Dto outDto = (BaseDto)g4Dao.queryForObject("Part.queryPartByDto", qDto);
			if (!Utils.isEmpty(outDto)) {
				return false;
			}
		}
		*/
		return true;
	}
	
	
	/**
	 * 删除数据
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto deleteItem(Dto pDto){
		g4Dao.delete("Part.deletePartUserGrantItem", pDto);
		g4Dao.delete("Part.deletePartRoleGrantItem", pDto);
		
		g4Dao.delete("Part.deletePartItem", pDto);
		return null;
	}
	
	/**
	 * 保存UI元素人员授权数据
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public Dto savePartUserGrantDatas(Dto pDto){
		List list = pDto.getDefaultAList();
		for (int i = 0; i < list.size(); i++) {
			Dto lDto = (BaseDto)list.get(i);
			if (Utils.isEmpty(lDto.getAsString("authorizeid"))) {
				if (!lDto.getAsString("partauthtype").equals(SystemConstants.PARTAUTHTYPE_NOGRANT)) {
					lDto.put("authorizeid", IdHelper.getAuthorizeid4Eauserauthorize());
					g4Dao.insert("Part.insertEausermenupartItem", lDto);
				}
			}else {
				if (lDto.getAsString("partauthtype").equals(SystemConstants.PARTAUTHTYPE_NOGRANT)) {
					g4Dao.delete("Part.deleteEausermenupartItem", lDto);
				}else {
					g4Dao.update("Part.updateEausermenupartItem", lDto);
				}
			}
		}
		return null;
	}
	
	/**
	 * 保存UI元素角色授权数据
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public Dto savePartRoleGrantDatas(Dto pDto){
		List list = pDto.getDefaultAList();
		for (int i = 0; i < list.size(); i++) {
			Dto lDto = (BaseDto)list.get(i);
			if (Utils.isEmpty(lDto.getAsString("authorizeid"))) {
				if (!lDto.getAsString("partauthtype").equals(SystemConstants.PARTAUTHTYPE_NOGRANT)) {
					lDto.put("authorizeid", IdHelper.getAuthorizeid4Earoleauthorize());
					g4Dao.insert("Part.insertEarolemenupartItem", lDto);
				}
			}else {
				if (lDto.getAsString("partauthtype").equals(SystemConstants.PARTAUTHTYPE_NOGRANT)) {
					g4Dao.delete("Part.deleteEarolemenupartItem", lDto);
				}else {
					g4Dao.update("Part.updateEarolemenupartItem", lDto);
				}
			}
		}
		return null;
	}
}
