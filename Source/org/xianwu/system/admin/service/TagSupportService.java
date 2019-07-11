package org.xianwu.system.admin.service;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.model.service.BizService;

/**
 * 
 * 权限模型标签业务接口
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface TagSupportService extends BizService{
	/**
	 * 获取卡片
	 * @param pDto
	 * @return
	 */
	public Dto getCardList(Dto pDto);
	
	/**
	 * 获取卡片子树
	 * @param pDto
	 * @return
	 */
	public Dto getCardTreeList(Dto pDto);
	
	/**
	 * 获取登录人员所属部门信息
	 * @return
	 */
	public Dto getDepartmentInfo(Dto pDto);
	
	/**
	 * 获取登录人员附加信息
	 * @param pDto
	 * @return
	 */
	public Dto getEauserSubInfo(Dto pDto);
	
	/**
	 * 获取应用菜单(桌面布局)
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto getMenuList4Desktop(Dto pDto);
}
