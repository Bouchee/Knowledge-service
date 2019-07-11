package org.xianwu.file.admin.service;

import org.xianwu.core.model.service.BizService;
import org.xianwu.core.metatype.Dto;

/**
 * 系统演示接口
 * 
 * @author fuxianwu
 * @since 2013-01-01
 */
public interface SoftwareService extends BizService {

	/**
	 * 保存文件上传数据
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto insertSoftware(Dto pDto);

	/**
	 * 删除文件数据
	 * 
	 * @param pFileId
	 * @return
	 */
	public Dto deleteSoftware(String pFileId);

	/**
	 * 修改文件数据
	 * 
	 * @param pDto
	 * @return
	 */
	public Dto updateSoftware(Dto pDto);
}
