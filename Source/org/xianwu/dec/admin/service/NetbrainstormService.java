package org.xianwu.dec.admin.service;

import java.util.List;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.model.service.BizService;

/**
 * 网络智爆法
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public interface NetbrainstormService extends BizService {

	/**
	 * 保存网络智爆法——罗涛
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto saveNetbrainstorm(Dto pDto);

	
}
