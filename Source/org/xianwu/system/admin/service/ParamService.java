package org.xianwu.system.admin.service;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.model.service.BizService;

/*
 * 全局参数管理业务接口
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface ParamService extends BizService{

	/**
	 * 保存参数信息表
	 */
	public Dto saveParamItem(Dto pDto);

	/**
	 * 删除参数信息
	 * 
	 * @param pDto
	 */
	public Dto deleteParamItem(Dto pDto);

	/**
	 * 修改参数信息
	 * 
	 * @param pDto
	 */
	public Dto updateParamItem(Dto pDto);
}
