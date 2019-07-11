package org.xianwu.system.admin.service.impl;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.core.util.Utils;
import org.xianwu.system.admin.service.ResourceService;
import org.xianwu.system.common.util.SystemConstants;
import org.xianwu.system.common.util.idgenerator.IdHelper;
import org.xianwu.system.common.util.idgenerator.IdGenerator;

/**
 * 资源模型业务实现类
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class ResourceServiceImpl extends BizServiceImpl implements ResourceService {

	/**
	 * 保存代码对照
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto saveCodeItem(Dto pDto) {
		Dto outDto = new BaseDto();
		String codeid = IdHelper.getCodeID();
		pDto.put("codeid", codeid);
		Dto checkDto = (BaseDto) g4Dao.queryForObject("Resource.checkCodeByIndex", pDto);
		if (Utils.isNotEmpty(checkDto)) {
			outDto.put("success", new Boolean(false));
			outDto.put("msg", "违反唯一约束,[对照字段]和[代码]组合不能重复.");
			return outDto;
		} else {
			g4Dao.insert("Resource.insertCode", pDto);
			outDto.put("success", new Boolean(true));
		}
		return outDto;
	}

	/**
	 * 删除代码表
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto deleteCodeItem(Dto pDto) {
		Dto dto = new BaseDto();
		String[] arrChecked = pDto.getAsString("strChecked").split(",");
		for (int i = 0; i < arrChecked.length; i++) {
			dto.put("codeid", arrChecked[i]);
			Dto chechkDto = (BaseDto) g4Dao.queryForObject("Resource.getCodeByKey", dto);
			if (chechkDto.getAsString("editmode").equals(SystemConstants.EDITMODE_Y)) {
				g4Dao.delete("Resource.deleteCode", dto);
			}
		}
		return null;
	}

	/**
	 * 修改代码表
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateCodeItem(Dto pDto) {
		g4Dao.update("Resource.updateCode", pDto);
		return null;
	}

	/**
	 * 保存菜单
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public synchronized Dto saveMenuItem(Dto pDto) {
		String menuid = IdGenerator.getMenuIdGenerator(pDto.getAsString("parentid"));
		pDto.put("menuid", menuid);
		pDto.put("leaf", SystemConstants.LEAF_Y);
		pDto.put("sortno", Utils.isEmpty(pDto.getAsString("sortno")) ? Integer.valueOf("0") : pDto
				.getAsString("sortno"));
		pDto.put("width", Utils.isEmpty(pDto.getAsString("width")) ? Integer.valueOf("800") : pDto
				.getAsString("width"));
		pDto.put("height", Utils.isEmpty(pDto.getAsString("height")) ? Integer.valueOf("600") : pDto
				.getAsString("height"));
		g4Dao.insert("Resource.saveMenuItem", pDto);
		Dto updateDto = new BaseDto();
		updateDto.put("menuid", pDto.getAsString("parentid"));
		updateDto.put("leaf", SystemConstants.LEAF_N);
		g4Dao.update("Resource.updateLeafFieldInMenu", updateDto);
		return null;
	}

	/**
	 * 删除菜单项
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto deleteMenuItems(Dto pDto) {
		Dto dto = new BaseDto();
		Dto changeLeafDto = new BaseDto();
		if (pDto.getAsString("type").equals("1")) {
			String[] arrChecked = pDto.getAsString("strChecked").split(",");
			for (int i = 0; i < arrChecked.length; i++) {
				dto.put("menuid", arrChecked[i]);
				changeLeafDto.put("parentid", ((BaseDto) g4Dao.queryForObject("Resource.queryMenuItemsByDto", dto))
						.getAsString("parentid"));
				g4Dao.delete("Resource.deleteMenuItem", dto);
				g4Dao.delete("Resource.deleteEarwauthorizeItem", dto);
				g4Dao.delete("Resource.deleteEausermenumapByMenuid", dto);
				updateLeafOfDeletedParent(changeLeafDto);
			}
		} else {
			dto.put("menuid", pDto.getAsString("menuid"));
			changeLeafDto.put("parentid", ((BaseDto) g4Dao.queryForObject("Resource.queryMenuItemsByDto", dto))
					.getAsString("parentid"));
			g4Dao.delete("Resource.deleteMenuItem", dto);
			g4Dao.delete("Resource.deleteEarwauthorizeItem", dto);
			g4Dao.delete("Resource.deleteEausermenumapByMenuid", dto);
			updateLeafOfDeletedParent(changeLeafDto);
		}
		return null;
	}

	/**
	 * 调整被删除菜单的直系父级菜单的Leaf属性
	 * 
	 * @param pDto
	 */
	@SuppressWarnings("unchecked")
	private void updateLeafOfDeletedParent(Dto pDto) {
		String parentid = pDto.getAsString("parentid");
		pDto.put("menuid", parentid);
		Integer countInteger = (Integer) g4Dao.queryForObject("Resource.prepareChangeLeafOfDeletedParent", pDto);
		if (countInteger.intValue() == 0) {
			pDto.put("leaf", SystemConstants.LEAF_Y);
		} else {
			pDto.put("leaf", SystemConstants.LEAF_N);
		}
		g4Dao.update("Resource.updateLeafFieldInMenu", pDto);
	}

	/**
	 * 修改菜单
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto updateMenuItem(Dto pDto) {
		pDto.put("sortno", Utils.isEmpty(pDto.getAsString("sortno")) ? Integer.valueOf("0") : pDto
				.getAsString("sortno"));
		pDto.put("width", Utils.isEmpty(pDto.getAsString("width")) ? Integer.valueOf("0") : pDto
				.getAsString("width"));
		pDto.put("height", Utils.isEmpty(pDto.getAsString("height")) ? Integer.valueOf("0") : pDto
				.getAsString("height"));
		if (pDto.getAsString("parentid").equals(pDto.getAsString("parentid_old"))) {
			pDto.remove("parentid");
			g4Dao.update("Resource.updateMenuItem", pDto);
		} else {
			g4Dao.delete("Resource.deleteMenuItem", pDto);
			g4Dao.delete("Resource.deleteEarwauthorizeItem", pDto);
			g4Dao.delete("Resource.deleteEausermenumapByMenuid", pDto);
			saveMenuItem(pDto);
			pDto.put("parentid", pDto.getAsString("parentid_old"));
			updateLeafOfDeletedParent(pDto);
		}
		return null;
	}

}
