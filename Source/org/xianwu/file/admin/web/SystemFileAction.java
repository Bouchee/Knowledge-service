package org.xianwu.file.admin.web;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.xianwu.core.ftp.FtpHelper;
import org.xianwu.core.json.JsonHelper;
import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.mvc.xstruts.action.ActionForm;
import org.xianwu.core.mvc.xstruts.action.ActionForward;
import org.xianwu.core.mvc.xstruts.action.ActionMapping;
import org.xianwu.core.mvc.xstruts.upload.FormFile;
import org.xianwu.core.util.Utils;
import org.xianwu.core.web.BizAction;
import org.xianwu.core.web.CommonActionForm;
import org.xianwu.core.web.image.UploadImage;

import org.xianwu.file.admin.service.SystemfileService;

/**
 * Action文件管理
 * 
 * @author fuxianwu
 * @since 2013-01-01
 * @see BaseAction
 */
public class SystemFileAction extends BizAction {

	private SystemfileService systemfileService = (SystemfileService) getService("systemfileService");
	private String filepath = "\\upload\\file\\";

	/**
	 * 文件操作页面初始化
	 * 
	 * @param
	 * @return
	 */
	public ActionForward init(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		return mapping.findForward("systemFileView");
	}

	/**
	 * 查询文件列表
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("rawtypes")
	public ActionForward queryFile4Manage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List list = g4Reader.queryForPage("Systemfile.querySystemfile4Manage", dto);
		Integer countInteger = (Integer) g4Reader.queryForObject("Systemfile.querySystemfile4Manage4PageCount", dto);
		String jsonString = JsonHelper.encodeList2PageJson(list, countInteger, null);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * Web表单文件上传 单个/批量同理
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public ActionForward doUpload(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm cForm = (CommonActionForm) form;
		// 单个文件,如果是多个就cForm.getFile2()....支持最多5个文件
		FormFile myFile = cForm.getFile1();

		// 我们通常还会把这个文件的相关信息持久化到数据库
		Dto inDto = cForm.getParamAsDto(request);

		inDto.put("title", Utils.isEmpty(inDto.getAsString("title")) ? myFile.getFileName() : inDto.getAsString("title"));
		inDto.put("filesize", myFile.getFileSize());
		inDto.put("path", UploadImage.upload(request, myFile, filepath));
		String[] fileExt = myFile.getFileName().split("\\.");
		inDto.put("filetype", "." + fileExt[fileExt.length - 1]);
		systemfileService.insertSystemfile(inDto);
		setOkTipMsg("文件上传成功!", response);
		return mapping.findForward(null);
	}

	/**
	 * Flash组件文件上传 如果是批量则客户端的SWF会循环来调用这个方法
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public ActionForward doUploadByFlash(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm cForm = (CommonActionForm) form;
		FormFile myFile = cForm.getSwfUploadFile();

		// 我们通常还会把这个文件的相关信息持久化到数据库
		Dto inDto = cForm.getParamAsDto(request);

		inDto.put("title", Utils.isEmpty(inDto.getAsString("title")) ? myFile.getFileName() : inDto.getAsString("title"));
		inDto.put("filesize", myFile.getFileSize());
		inDto.put("path", UploadImage.upload(request, myFile, filepath));

		String[] fileExt = myFile.getFileName().split("\\.");
		inDto.put("filetype", "." + fileExt[fileExt.length - 1]);

		systemfileService.insertSystemfile(inDto);
		setOkTipMsg("文件上传成功!", response);
		return mapping.findForward(null);
	}

	/**
	 * FTP上传
	 * 
	 * @param
	 * @return
	 */
	public ActionForward doUploadByFtp(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm cForm = (CommonActionForm) form;
		boolean b = true;

		FormFile myFile = cForm.getFile1();
		// FTP开始
		// 封装的FTP还有其他处理方式,这只是其中一种,更多API请查看FtpHelper.java
		FtpHelper ftpHelper = new FtpHelper();
		ftpHelper.createConnection("127.0.0.1", "anonymous", "", 21);
		ftpHelper.useWorkingDir("/files/支持中文路径");
		b = ftpHelper.storeFile(myFile.getInputStream(), "支持中文名" + myFile.getFileName());
		// 释放连接非常重要
		ftpHelper.disconnect();

		String msg = "";
		if (b) {
			msg = "文件上传成功,此操作需要FTP服务器配合,请查看后台代码";
		} else {
			msg = "文件上传失败";
		}
		setOkTipMsg(msg, response);
		return mapping.findForward(null);
	}

	/**
	 * 下载文件
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward downloadFile(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		String fileid = dto.getAsString("fileid");
		Dto fileDto = (BaseDto) g4Reader.queryForObject("Systemfile.querySystemfileByKey", fileid);
		// 这里可稍做优化,根据文件类型动态设置此属性
		// response.setContentType("application/vnd.ms-excel");
		String filename = Utils.encodeChineseDownloadFileName(request, fileDto.getAsString("title"));
		response.setHeader("Content-Disposition", "attachment; filename=" + filename + ";");
		String path = fileDto.getAsString("path");
		File file = new File(request.getSession().getServletContext().getRealPath("/") + path);
		BufferedInputStream in = new BufferedInputStream(new FileInputStream(file));
		ByteArrayOutputStream out = new ByteArrayOutputStream(1024);
		byte[] temp = new byte[1024];
		int size = 0;
		while ((size = in.read(temp)) != -1) {
			out.write(temp, 0, size);
		}
		in.close();
		ServletOutputStream os = response.getOutputStream();
		os.write(out.toByteArray());
		os.flush();
		os.close();
		return mapping.findForward(null);
	}

	/**
	 * 删除文件
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward deleteSystemfile(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		String[] strChecked = dto.getAsString("strChecked").split(",");
		for (int i = 0; i < strChecked.length; i++) {
			String fileid = strChecked[i];
			Dto fileDto = (BaseDto) g4Reader.queryForObject("Systemfile.querySystemfileByKey", fileid);
			String path = fileDto.getAsString("path");
			File file = new File(path);
			file.delete();
			systemfileService.deleteSystemfile(fileid);
		}
		setOkTipMsg("文件删除成功!", response);
		return mapping.findForward(null);
	}

	/**
	 * 保存脏数据
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public ActionForward saveEditorData(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		List list = aForm.getGridDirtyData(request);
		for (int i = 0; i < list.size(); i++) {
			Dto dto = (BaseDto) list.get(i);
			// System.out.println("脏数据:\n" + dto);
			systemfileService.updateSystemfile(dto);
		}
		Dto outDto = new BaseDto();
		outDto.put("success", new Boolean(true));
		outDto.put("msg", "数据已提交并成功保存！");
		super.write(outDto.toJson(), response);
		return mapping.findForward(null);
	}

}
