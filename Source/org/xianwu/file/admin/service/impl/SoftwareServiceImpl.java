package org.xianwu.file.admin.service.impl;


import org.xianwu.core.metatype.Dto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.file.admin.service.SoftwareService;
import org.xianwu.system.common.util.idgenerator.MaxId;

public class SoftwareServiceImpl extends BizServiceImpl implements SoftwareService {

	/**
	 * 保存文件上传数据
	 * 
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto insertSoftware(Dto pDto) {
		pDto.put("fileid", MaxId.getSoftwareID());
		g4Dao.insert("Software.insertSoftware", pDto);
		return null;
	}

	/**
	 * 删除文件数据
	 * 
	 * @param pFileId
	 * @return
	 */
	public Dto deleteSoftware(String pFileId) {
		g4Dao.delete("Software.deleteSoftwareByKey", pFileId);
		return null;
	}
	
	/**
	 * 修改文件数据
	 * 
	 * @param pFileId
	 * @return
	 */
	public Dto updateSoftware(Dto pDto) {
		g4Dao.update("Software.updateSoftware", pDto);
		return null;
	}
}
