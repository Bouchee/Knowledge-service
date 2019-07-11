package org.xianwu.file.admin.service.impl;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.model.service.impl.BizServiceImpl;
import org.xianwu.file.admin.service.SystemfileService;
import org.xianwu.system.common.util.idgenerator.MaxId;

public class SystemfileServiceImpl extends BizServiceImpl implements SystemfileService {

	/**
	 * 保存文件上传数据
	 *
	 * @param pDto
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Dto insertSystemfile(Dto pDto) {
		pDto.put("fileid", MaxId.getFileID());
		g4Dao.insert("Systemfile.insertSystemfile", pDto);
		return null;
	}

	/**
	 * 删除文件数据
	 *
	 * @param pFileId
	 * @return
	 */
	public Dto deleteSystemfile(String pFileId) {
		g4Dao.delete("Systemfile.deleteSystemfileByKey", pFileId);
		return null;
	}

	/**
	 * 修改文件数据
	 *
	 * @param pFileId
	 * @return
	 */
	public Dto updateSystemfile(Dto pDto) {
		g4Dao.update("Systemfile.updateSystemfile", pDto);
		return null;
	}
}
