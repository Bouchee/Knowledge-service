package org.xianwu.dec.admin.web.milling.general;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
import org.xianwu.core.web.image.DeleteFile;
import org.xianwu.core.web.image.UploadImage;
import org.xianwu.dec.admin.service.Milling_integralService;
import org.xianwu.core.web.report.excel.ExcelImport;
import org.xianwu.core.web.util.WebUtils;

/**
 * 整体刀具
 * 
 * @author XianwuFu
 * @since 2013-01-01
 * @see BizAction
 */
public class Milling_integralAction extends BizAction {

	private Milling_integralService milling_integralService = (Milling_integralService) super.getService("milling_integralService");
	private String filepath = "\\dec\\image\\milling_integral\\";

	/**
	 * 整体刀具
	 * 
	 * @param
	 * @return
	 */
	public ActionForward init(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_MILLING_INTEGRAL_MILLING_INTEGRAL"); // 修正分页传参
																										// -
																										// 1
																										// /
																										// 5
		return mapping.findForward("milling_integralView");
	}

	/**
	 * 查询整体刀具
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings({ "rawtypes" })
	public ActionForward queryMilling_integral4Manage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		// 修正分页传参 - 2 / 5
		Dto dto_page = (BaseDto) super.getSessionAttribute(request, "PAGE_PARAMETER_DTO_MILLING_INTEGRAL_MILLING_INTEGRAL");
		if (Utils.isNotEmpty(dto_page) && Utils.isNotEmpty(dto)) {
			dto = WebUtils.getDtoDataFromFirst2Second(dto, dto_page);
		}

		// 修正分页传参 - 3 / 5
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_MILLING_INTEGRAL_MILLING_INTEGRAL");
		super.setSessionAttribute(request, "PAGE_PARAMETER_DTO_MILLING_INTEGRAL_MILLING_INTEGRAL", dto);

		List milling_integralList = g4Reader.queryForPage("Milling_integral.queryMilling_integral4Manage", dto);
		Integer totalInteger = (Integer) g4Reader.queryForObject("Milling_integral.queryMilling_integral4Manage4PageCount", dto);
		String jsonString = JsonHelper.encodeList2PageJson(milling_integralList, totalInteger, null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 保存整体刀具
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public ActionForward saveMilling_integral(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;

		Dto inDto = aForm.getParamAsDto(request);
		inDto.put("figure", UploadImage.upload(request, aForm.getFigure(), filepath, inDto.getAsInteger("compressflag")));
		inDto.put("figure2", UploadImage.upload(request, aForm.getFigure2(), filepath, inDto.getAsInteger("compressflag2")));

		Dto outDto = milling_integralService.saveMilling_integral(inDto);
		String jsonString = JsonHelper.encodeObject2Json(outDto);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 删除整体刀具
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public ActionForward deleteMilling_integral(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String strChecked = request.getParameter("strChecked");
		Dto inDto = new BaseDto();
		inDto.put("strChecked", strChecked);

		String msg = DeleteFile.delete(request, strChecked, "toolholderid", "Milling_integral.queryFigure4Delete4Milling_integral");

		milling_integralService.deleteMilling_integral(inDto);

		setOkTipMsg("整体刀具删除成功！" + msg, response);
		return mapping.findForward(null);
	}

	/**
	 * 修改整体刀具
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public ActionForward updateMilling_integral(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;

		Dto inDto = aForm.getParamAsDto(request);
		String fig = UploadImage.upload(request, aForm.getFigure(), filepath, inDto.getAsInteger("compressflag"));
		if (Utils.isEmpty(fig)) {
			inDto.remove("figure");
		} else {
			inDto.put("figure", fig);
		}
		// fig = UploadImage.upload(request, aForm.getFigure(), filepath);
		String fig2 = UploadImage.upload(request, aForm.getFigure2(), filepath, inDto.getAsInteger("compressflag2"));
		if (Utils.isEmpty(fig2)) {
			inDto.remove("figure2");
		} else {
			inDto.put("figure2", fig2);
		}

		milling_integralService.updateMilling_integral(inDto);
		setOkTipMsg("整体刀具修改成功！", response);
		return mapping.findForward(null);
	}

	/**
	 * 查询品牌
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("rawtypes")
	public ActionForward queryBrand4Milling_integral(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List list = g4Reader.queryForPage("Milling_integral.queryBrand4Milling_integral", dto);
		String jsonString = JsonHelper.encodeList2PageJson(list, list.size(), null);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 查询切削液
	 * 
	 * @param
	 * @return
	 */
	/*
	 * @SuppressWarnings({ "rawtypes" }) public ActionForward
	 * queryCategory4Milling_integral(ActionMapping mapping, ActionForm form,
	 * HttpServletRequest request, HttpServletResponse response) throws
	 * Exception { CommonActionForm aForm = (CommonActionForm) form; Dto dto =
	 * aForm.getParamAsDto(request);
	 * 
	 * List milling_integralList =
	 * g4Reader.queryForPage("Milling_integral.queryCategory4Milling_integral",
	 * dto); String jsonString =
	 * JsonHelper.encodeList2PageJson(milling_integralList,
	 * milling_integralList.size(), null); write(jsonString, response); return
	 * mapping.findForward(null); }
	 */
	
	/**
	 * 导入整体式刀具数据
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward importMilling_integralFromExcel(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm actionForm = (CommonActionForm) form;
		FormFile theFile = actionForm.getTheFile();
		Dto dto = (BaseDto) actionForm.getParamAsDto(request);

		String fielddata = dto.getAsString("nameandid");
		ExcelImport ei = new ExcelImport();
		
		Dto dtos = new BaseDto();
		
		if (fielddata.equalsIgnoreCase("initializeImportExcelData")) {
			Dto snDto = ei.initializeExcel(theFile);
			
			write(snDto.toJson(), response);
		} else {
			Dto nullFlag = new BaseDto();
			nullFlag.put("mtmodel", true);// 表示assetscode字段不能为空，默认所有都可为空；
			//nullFlag.put("assetscode", true);
			Dto codeFlag = new BaseDto();
			//codeFlag.put("remark", true); // 表示字段sex在code表中，在Excel中的数据要按code表中已有的值，
								     // 比如在Excel中，性别只能取[男, 女, 未知]三种，而该三种值对应code表中性别字段的描述信息；
			String importdata = dto.getAsString("importdata");
			int importStart = 2;
			int importTo = Integer.parseInt(importdata);

			/*String[] importdata = dto.getAsString("importdata").split(",");
			
			int importStart = Integer.parseInt(importdata[0]);
			int importTo = Integer.parseInt(importdata[1]);*/
			String sheetName = dto.getAsString("sheetname");
			
			// 使用说明：
			// fielddata    - (required) 页面传回的grid的表头信息，比如，姓名,性别-dec-name,sex；
			// theFile      - (required) 上传的要导入数据的Excel文件；
			// nullFlag     - (optional) 字段是否不为空，是为了检测Excel中数据的正确性；
			// codeFlag     - (optional) 哪些字段是在code表中，如果在code表中，请手动指明；
			// sheetName    - (optional) Excel中要导入数据的sheet名称或者索引，从1开始，如果未指明，则导入第一个；
			// importStart  - (optional) Excel中开始导入数据的行数，如果未指定，则从第二行开始导入，会认为第一行为表头；
			// importTo     - (optional) Excel中导入数据到第几行，如果未指定或指定为-1，则导入所有行；
			Dto resultDto = ei.importExcel(request, fielddata, theFile, nullFlag, codeFlag, sheetName, importStart, importTo);

			List<Dto> dataList = resultDto.getAsList("data");

			// Excel导入方法介绍，第一种：使用For循环导入
			// if (resultDto.getAsBoolean("issuccess")) {
			// 	for (int jj = 0; jj < dataList.size(); jj++) {
			// 		Dto dto3 = (Dto) dataList.get(jj);

			// 		// 数据导入
			// 		machinetoolService.saveMachinetool(dto3);
			// 	}

			// 	msg = "选择的要导入的数据信息导入成功!";
			// 	dtos.put("success", true);
			// } else {
			// 	dtos.put("failure", false);
			// 	msg = resultDto.getAsString("msg");
			// }
			// 
			// dtos.put("msg", msg);
			

			// 第二种方法，批量导入，推荐使用
			dtos = milling_integralService.batchSaveMilling_integral(dataList);
			
			write(dtos.toJson(), response);
		}
		return mapping.findForward(null);
	}

}
