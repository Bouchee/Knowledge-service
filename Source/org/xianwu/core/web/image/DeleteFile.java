package org.xianwu.core.web.image;

import java.io.File;

import javax.servlet.http.HttpServletRequest;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.model.SpringBeanLoader;
import org.xianwu.core.model.dao.Reader;
import org.xianwu.core.util.Utils;

public class DeleteFile {

	public DeleteFile() {

	}

	@SuppressWarnings("unchecked")
	public static String delete(HttpServletRequest request, String strChecked, String id, String statement) {
		Dto delDto = new BaseDto();
		Object[] fm;
		File fileTemp;
		String msg = "";
		Reader g4Reader = (Reader) SpringBeanLoader.getSpringBean("g4Reader");
		String savePath = request.getSession().getServletContext().getRealPath("/");

		String[] arrChecked = strChecked.split(",");
		for (int i = 0; i < arrChecked.length; i++) {
			delDto.put(id, arrChecked[i]);
			Dto deleteDto = (BaseDto)g4Reader.queryForObject(statement, delDto);
			if (Utils.isNotEmpty(deleteDto)){
				fm = deleteDto.values().toArray();
			for (Object c : fm) {
				if (Utils.isNotEmpty(c)) {
					fileTemp = new File(savePath + c);
					if (true == fileTemp.exists()) {
						if (true == fileTemp.isFile()) {
							fileTemp.delete();
							msg = "关联文件删除成功!";
						} else {
							msg = "关联文件删除失败！可能是文件处于锁定状态或文件不存在。";
						}
					}
				} else {
					msg = "关联文件不存在，不用删除!";
				}
				}
			} else {
				msg = "关联文件不存在，不用删除!";
			}
		}
		return msg;
	}
}
