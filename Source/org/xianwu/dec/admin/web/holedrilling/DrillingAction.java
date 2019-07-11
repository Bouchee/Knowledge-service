package org.xianwu.dec.admin.web.holedrilling;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.xianwu.core.json.JsonHelper;
import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.mvc.xstruts.action.ActionForm;
import org.xianwu.core.mvc.xstruts.action.ActionForward;
import org.xianwu.core.mvc.xstruts.action.ActionMapping;
import org.xianwu.core.util.Utils;
import org.xianwu.core.web.BizAction;
import org.xianwu.core.web.CommonActionForm;
import org.xianwu.core.web.report.jasper.ReportData;
import org.xianwu.core.web.util.WebUtils;

/**
 * 钻孔
 * 
 * @author XianwuFu
 * @since 2014-04-22
 * @see BizAction
 */

public class DrillingAction extends BizAction {
	
	
	private String reportTitle = "钻孔整体式刀具";
	/**
	 * 钻孔
	 * 
	 * @param
	 * @return
	 */
	public ActionForward init(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_SURFACEMILLING_MILLING_TOOLHOLDER_INTEGRAL"); // 修正分页传参
																												// -
																												// 1
																												// /
																												// 5
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_SURFACEMILLING_MILLING_TOOLHOLDER_CLAMP");
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_SURFACEMILLING_MILLING_BLADE_CLAMP");
		return mapping.findForward("drillingView");
	}

	/**
	 * 查询钻孔刀体
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public ActionForward queryHd_holedrilling4Manage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		// 修正分页传参 - 2 / 5
		Dto dto_page = (BaseDto) super.getSessionAttribute(request, "PAGE_PARAMETER_DTO_SURFACEMILLING_MILLING_TOOLHOLDER_INTEGRAL");
		if (Utils.isNotEmpty(dto_page) && Utils.isNotEmpty(dto)) {
			dto = WebUtils.getDtoDataFromFirst2Second(dto, dto_page);
		}

		/*
		 * String featurecode = dto.getAsString("featurecode");
		 * dto.put("featurecode", featurecode);
		 */
		/*
		 * if (featurecode.isEmpty() != true) { List featurecodeList =
		 * java.util.Arrays.asList(featurecode.split(","));
		 * dto.put("featurecode", featurecodeList); }
		 */

		// 修正分页传参 - 3 / 5
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_SURFACEMILLING_MILLING_TOOLHOLDER_INTEGRAL");
		super.setSessionAttribute(request, "PAGE_PARAMETER_DTO_SURFACEMILLING_MILLING_TOOLHOLDER_INTEGRAL", dto);

		List hd_holedrillingList = g4Reader.queryForPage("Drilling.queryHd_holedrilling4Manage", dto);
		Integer totalInteger = (Integer) g4Reader.queryForObject("Drilling.queryHd_holedrilling4Manage4PageCount", dto);
		String jsonString = JsonHelper.encodeList2PageJson(hd_holedrillingList, totalInteger, null);
		write(jsonString, response);
		dto.put("featurecode", null);
		return mapping.findForward(null);
	}

	/**
	 * 查询钻孔子表
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public ActionForward queryHd_toolholder_holedrilling_integral4Manage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		// 修正分页传参 - 2 / 5
		Dto dto_page = (BaseDto) super.getSessionAttribute(request, "PAGE_PARAMETER_DTO_SURFACEMILLING_MILLING_TOOLHOLDER_INTEGRAL");
		if (Utils.isNotEmpty(dto_page) && Utils.isNotEmpty(dto)) {
			dto = WebUtils.getDtoDataFromFirst2Second(dto, dto_page);
		}

		String featurecode = dto.getAsString("featurecode");
		if (featurecode.isEmpty() != true) {
			List featurecodeList = java.util.Arrays.asList(featurecode.split(","));
			dto.put("featurecode", featurecodeList);
		}

		// 修正分页传参 - 3 / 5
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_SURFACEMILLING_MILLING_TOOLHOLDER_INTEGRAL");
		super.setSessionAttribute(request, "PAGE_PARAMETER_DTO_SURFACEMILLING_MILLING_TOOLHOLDER_INTEGRAL", dto);

		List hd_toolholder_holedrilling_integralList = g4Reader.queryForPage("Drilling.queryHd_toolholder_holedrilling_integral4Manage", dto);
		Integer totalInteger = (Integer) g4Reader.queryForObject("Drilling.queryHd_toolholder_holedrilling_integral4Manage4PageCount", dto);
		String jsonString = JsonHelper.encodeList2PageJson(hd_toolholder_holedrilling_integralList, totalInteger, null);
		write(jsonString, response);
		dto.put("featurecode", null);
		return mapping.findForward(null);
	}

	/**
	 * 查询浅孔钻子表
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public ActionForward queryHd_toolholder_poledrilling4Manage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		// 修正分页传参 - 2 / 5
		Dto dto_page = (BaseDto) super.getSessionAttribute(request, "PAGE_PARAMETER_DTO_SURFACEMILLING_MILLING_TOOLHOLDER_INTEGRAL");
		if (Utils.isNotEmpty(dto_page) && Utils.isNotEmpty(dto)) {
			dto = WebUtils.getDtoDataFromFirst2Second(dto, dto_page);
		}

		String featurecode = dto.getAsString("featurecode");
		if (featurecode.isEmpty() != true) {
			List featurecodeList = java.util.Arrays.asList(featurecode.split(","));
			dto.put("featurecode", featurecodeList);
		}

		// 修正分页传参 - 3 / 5
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_SURFACEMILLING_MILLING_TOOLHOLDER_INTEGRAL");
		super.setSessionAttribute(request, "PAGE_PARAMETER_DTO_SURFACEMILLING_MILLING_TOOLHOLDER_INTEGRAL", dto);

		List hd_toolholder_poledrillingList = g4Reader.queryForPage("Drilling.queryHd_toolholder_poledrilling4Manage", dto);
		Integer totalInteger = (Integer) g4Reader.queryForObject("Drilling.queryHd_toolholder_poledrilling4Manage4PageCount", dto);
		String jsonString = JsonHelper.encodeList2PageJson(hd_toolholder_poledrillingList, totalInteger, null);
		write(jsonString, response);
		dto.put("featurecode", null);
		return mapping.findForward(null);
	}

	/**
	 * 查询浅孔钻刀片
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public ActionForward queryHd_blade_poledrilling4Manage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		// 修正分页传参 - 2 / 5
		Dto dto_page = (BaseDto) super.getSessionAttribute(request, "PAGE_PARAMETER_DTO_SURFACEMILLING_MILLING_TOOLHOLDER_INTEGRAL");
		if (Utils.isNotEmpty(dto_page) && Utils.isNotEmpty(dto)) {
			dto = WebUtils.getDtoDataFromFirst2Second(dto, dto_page);
		}
		
		String featurecode = dto.getAsString("featurecode");
		if (featurecode.isEmpty() != true) {
			List featurecodeList = java.util.Arrays.asList(featurecode.split(","));
			dto.put("featurecode", featurecodeList);
		}

		/*String htpcentreblade = dto.getAsString("htpcentreblade");
		if ( "null".equals(htpcentreblade)) {
			
			dto.put("htpcentreblade", "");
		} else {
			List htpcentrebladeList = java.util.Arrays.asList(htpcentreblade.split(","));
			dto.put("htpcentreblade", htpcentrebladeList);
		}*/
	
		/*String htccentredrill = dto.getAsString("htccentredrill");
		if ("null".equals(htccentredrill)) {
		
			dto.put("htccentredrill", "");
		} else 
		{
			List htccentredrillList = java.util.Arrays.asList(htccentredrill.split(","));
			dto.put("htccentredrill", htccentredrillList);
		}
		String htsccentreblade = dto.getAsString("htsccentreblade");
		if ( "null".equals(htsccentreblade)) {
		
			dto.put("htsccentreblade", "");
		} else {
			List htsccentrebladeList = java.util.Arrays.asList(htsccentreblade.split(","));
			dto.put("htsccentreblade", htsccentrebladeList);
		}*/
		/*
		 String htpcentreblade = dto.getAsString("htpcentreblade");
		if (htpcentreblade.isEmpty() != true) {
			List htpcentrebladeList = java.util.Arrays.asList(htpcentreblade.split(","));
			dto.put("htpcentreblade", htpcentrebladeList);
		}
		 String htccentredrill = dto.getAsString("htccentredrill");
		if (htccentredrill.isEmpty() != true) {
			List htccentredrillList = java.util.Arrays.asList(htccentredrill.split(","));
			dto.put("htccentredrill", htccentredrillList);
		}
		String htsccentreblade = dto.getAsString("htsccentreblade");
		if (htsccentreblade.isEmpty() != true) {
			List htsccentrebladeList = java.util.Arrays.asList(htsccentreblade.split(","));
			dto.put("htsccentreblade", htsccentrebladeList);
		}*/

		// 修正分页传参 - 3 / 5
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_SURFACEMILLING_MILLING_TOOLHOLDER_INTEGRAL");
		super.setSessionAttribute(request, "PAGE_PARAMETER_DTO_SURFACEMILLING_MILLING_TOOLHOLDER_INTEGRAL", dto);
		
		
		List hd_blade_poledrillingList = g4Reader.queryForList("Drilling.queryHd_blade_poledrilling4Manage", dto);
		Integer totalInteger = (Integer) g4Reader.queryForObject("Drilling.queryHd_blade_poledrilling4Manage4PageCount", dto);
		String jsonString = JsonHelper.encodeList2PageJson(hd_blade_poledrillingList, totalInteger, null);
		write(jsonString, response);
		dto.put("featurecode", null);
		return mapping.findForward(null);
	}

	/**
	 * 查询单刀片机夹钻子表
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public ActionForward queryHd_toolholder_singledrilling_clamp4Manage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		// 修正分页传参 - 2 / 5
		Dto dto_page = (BaseDto) super.getSessionAttribute(request, "PAGE_PARAMETER_DTO_SURFACEMILLING_MILLING_TOOLHOLDER_INTEGRAL");
		if (Utils.isNotEmpty(dto_page) && Utils.isNotEmpty(dto)) {
			dto = WebUtils.getDtoDataFromFirst2Second(dto, dto_page);
		}

		String featurecode = dto.getAsString("featurecode");
		if (featurecode.isEmpty() != true) {
			List featurecodeList = java.util.Arrays.asList(featurecode.split(","));
			dto.put("featurecode", featurecodeList);
		}

		// 修正分页传参 - 3 / 5
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_SURFACEMILLING_MILLING_TOOLHOLDER_INTEGRAL");
		super.setSessionAttribute(request, "PAGE_PARAMETER_DTO_SURFACEMILLING_MILLING_TOOLHOLDER_INTEGRAL", dto);

		List hd_toolholder_singledrilling_clampList = g4Reader.queryForPage("Drilling.queryHd_toolholder_singledrilling_clamp4Manage", dto);
		Integer totalInteger = (Integer) g4Reader.queryForObject("Drilling.queryHd_toolholder_singledrilling_clamp4Manage4PageCount", dto);
		String jsonString = JsonHelper.encodeList2PageJson(hd_toolholder_singledrilling_clampList, totalInteger, null);
		write(jsonString, response);
		dto.put("featurecode", null);
		return mapping.findForward(null);
	}

	/**
	 * 查询单刀片机夹钻刀片
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public ActionForward queryHd_blade_singledrilling_clamp4Manage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		// 修正分页传参 - 2 / 5
		Dto dto_page = (BaseDto) super.getSessionAttribute(request, "PAGE_PARAMETER_DTO_SURFACEMILLING_MILLING_TOOLHOLDER_INTEGRAL");
		if (Utils.isNotEmpty(dto_page) && Utils.isNotEmpty(dto)) {
			dto = WebUtils.getDtoDataFromFirst2Second(dto, dto_page);
		}

		String featurecode = dto.getAsString("featurecode");
		if (featurecode.isEmpty() != true) {
			List featurecodeList = java.util.Arrays.asList(featurecode.split(","));
			dto.put("featurecode", featurecodeList);
		}

		// 修正分页传参 - 3 / 5
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_SURFACEMILLING_MILLING_TOOLHOLDER_INTEGRAL");
		super.setSessionAttribute(request, "PAGE_PARAMETER_DTO_SURFACEMILLING_MILLING_TOOLHOLDER_INTEGRAL", dto);

		List hd_blade_singledrilling_clampList = g4Reader.queryForPage("Drilling.queryHd_blade_singledrilling_clamp4Manage", dto);
		Integer totalInteger = (Integer) g4Reader.queryForObject("Drilling.queryHd_blade_singledrilling_clamp4Manage4PageCount", dto);
		String jsonString = JsonHelper.encodeList2PageJson(hd_blade_singledrilling_clampList, totalInteger, null);
		write(jsonString, response);
		dto.put("featurecode", null);
		return mapping.findForward(null);
	}

	/**
	 * 查询复合钻子表
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public ActionForward queryHd_toolholder_combineddrilling4Manage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		// 修正分页传参 - 2 / 5
		Dto dto_page = (BaseDto) super.getSessionAttribute(request, "PAGE_PARAMETER_DTO_SURFACEMILLING_MILLING_TOOLHOLDER_INTEGRAL");
		if (Utils.isNotEmpty(dto_page) && Utils.isNotEmpty(dto)) {
			dto = WebUtils.getDtoDataFromFirst2Second(dto, dto_page);
		}

		String featurecode = dto.getAsString("featurecode");
		if (featurecode.isEmpty() != true) {
			List featurecodeList = java.util.Arrays.asList(featurecode.split(","));
			dto.put("featurecode", featurecodeList);
		}

		// 修正分页传参 - 3 / 5
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_SURFACEMILLING_MILLING_TOOLHOLDER_INTEGRAL");
		super.setSessionAttribute(request, "PAGE_PARAMETER_DTO_SURFACEMILLING_MILLING_TOOLHOLDER_INTEGRAL", dto);

		List hd_toolholder_combineddrillingList = g4Reader.queryForPage("Drilling.queryHd_toolholder_combineddrilling4Manage", dto);
		Integer totalInteger = (Integer) g4Reader.queryForObject("Drilling.queryHd_toolholder_combineddrilling4Manage4PageCount", dto);
		String jsonString = JsonHelper.encodeList2PageJson(hd_toolholder_combineddrillingList, totalInteger, null);
		write(jsonString, response);
		dto.put("featurecode", null);
		return mapping.findForward(null);
	}

	/**
	 * 查询复合刀片
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public ActionForward queryHd_blade_combineddrilling4Manage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		// 修正分页传参 - 2 / 5
		Dto dto_page = (BaseDto) super.getSessionAttribute(request, "PAGE_PARAMETER_DTO_SURFACEMILLING_MILLING_TOOLHOLDER_INTEGRAL");
		if (Utils.isNotEmpty(dto_page) && Utils.isNotEmpty(dto)) {
			dto = WebUtils.getDtoDataFromFirst2Second(dto, dto_page);
		}

		String featurecode = dto.getAsString("featurecode");
		if (featurecode.isEmpty() != true) {
			List featurecodeList = java.util.Arrays.asList(featurecode.split(","));
			dto.put("featurecode", featurecodeList);
		}

		// 修正分页传参 - 3 / 5
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_SURFACEMILLING_MILLING_TOOLHOLDER_INTEGRAL");
		super.setSessionAttribute(request, "PAGE_PARAMETER_DTO_SURFACEMILLING_MILLING_TOOLHOLDER_INTEGRAL", dto);

		List hd_blade_combineddrillingList = g4Reader.queryForPage("Drilling.queryHd_blade_combineddrilling4Manage", dto);
		Integer totalInteger = (Integer) g4Reader.queryForObject("Drilling.queryHd_blade_combineddrilling4Manage4PageCount", dto);
		String jsonString = JsonHelper.encodeList2PageJson(hd_blade_combineddrillingList, totalInteger, null);
		write(jsonString, response);
		dto.put("featurecode", null);
		return mapping.findForward(null);
	}

	// 工件材料
	@SuppressWarnings("rawtypes")
	public ActionForward queryWorkpiecematerialInHd_holedrilling(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForList("Drilling.queryWorkpiecematerialInHd_holedrilling", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 整体式公称直径
	@SuppressWarnings("rawtypes")
	public ActionForward queryNominaldiameterInHd_holedrilling(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForList("Drilling.queryNominaldiameterInHd_holedrilling", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 机夹式式公称直径
	@SuppressWarnings("rawtypes")
	public ActionForward queryNominaldiameterInHd_holedrilling1(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForList("Drilling.queryNominaldiameterInHd_holedrilling1", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 整体式深度
	@SuppressWarnings("rawtypes")
	public ActionForward queryDepthInHd_holedrilling(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForList("Drilling.queryDepthInHd_holedrilling", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 机夹式深度
	@SuppressWarnings("rawtypes")
	public ActionForward queryDepthInHd_holedrilling1(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForList("Drilling.queryDepthInHd_holedrilling1", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 冷却类型
	@SuppressWarnings("rawtypes")
	public ActionForward queryCoolingtype_integralInHd_holedrilling(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForList("Drilling.queryCoolingtype_integralInHd_holedrilling", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 冷却类型
	@SuppressWarnings("rawtypes")
	public ActionForward queryCoolingtypeInHd_holedrilling(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForList("Drilling.queryCoolingtypeInHd_holedrilling", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 刀具类型
	@SuppressWarnings("rawtypes")
	public ActionForward queryHdtooltypeInHd_holedrilling(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForList("Drilling.queryHdtooltypeInHd_holedrilling", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 刀具类型
	@SuppressWarnings("rawtypes")
	public ActionForward queryName(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForList("Drilling.queryName", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 查询钻孔刀片详情
	public ActionForward queryHoledrilling(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		String tableflag = dto.getAsString("tableflag");
		// String tablename = WebUtils.getCodeDesc("HDTOOLTYPE",
		// dto.getAsString("tableflag"), request);
		List areaList = new ArrayList();
		areaList = g4Reader.queryForList("Drilling.queryHd_blade_poledrilling4Manage", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	//机夹式 切削参数
	public ActionForward queryParameter(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		List parameterList = g4Reader.queryForList("Drilling.queryParameter", dto);

		String jsonString = encodeList2PageJson(parameterList, parameterList.size(), null);

		write(jsonString, response);

		return mapping.findForward(null);
	}
	
	
	//整体式 切削参数
		public ActionForward queryinternalParameter(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
			CommonActionForm aForm = (CommonActionForm) form;
			Dto dto = aForm.getParamAsDto(request);

			List parameterList = g4Reader.queryForList("Drilling.queryinternalParameter", dto);

			String jsonString = encodeList2PageJson(parameterList, parameterList.size(), null);

			write(jsonString, response);

			return mapping.findForward(null);
		}

	// 匹配钻杆

	public ActionForward queryHd_cutterbar_combineddrilling4Manage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		List parameterList = g4Reader.queryForList("Drilling.queryHd_cutterbar_combineddrilling4Manage", dto);

		String jsonString = encodeList2PageJson(parameterList, parameterList.size(), null);

		write(jsonString, response);

		return mapping.findForward(null);
	}
	//报表打印
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public ActionForward printTask(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto pdto = aForm.getParamAsDto(request);
		Dto dto = new BaseDto();
		
		String workpieceisotype;
		String	name1;
		String	nominaldiameter1;
		String	interferencedepth;
		String  coolingtype;
		String shujuyuanlujing3;
		
		String path = request.getSession().getServletContext().getRealPath("");
			String figure2lujing = (String) g4Reader.queryForObject("Drilling.queryfigure2toolholder", pdto);
			  String  str1=figure2lujing.replace("/", "\\");
				 shujuyuanlujing3=path+str1;
				 
		String workpieceisotypeif = pdto.getAsString("workpieceisotype");
		
		name1 = pdto.getAsString("name1");
		nominaldiameter1 = pdto.getAsString("nominaldiameter1");
		interferencedepth = pdto.getAsString("interferencedepth");
		coolingtype = pdto.getAsString("coolingtype");
		
		if(workpieceisotypeif == ""){workpieceisotype= "";}else{workpieceisotype = (String) g4Reader.queryForObject("Drilling.querycailiaonanme", pdto);}

		dto.put("reportTitle", reportTitle);
		dto.put("workpieceisotype", workpieceisotype);
		dto.put("name", name1);
		dto.put("nominaldiameter", nominaldiameter1);
		dto.put("interferencedepth", interferencedepth);
		dto.put("coolingtype", coolingtype);
	
	
		String SapreportPath=path+"\\file\\jasper\\";  
	
		dto.put("shujuyuanlujing1", SapreportPath);
		//dto.put("shujuyuanlujing3", shujuyuanlujing3);
		dto.put("shujuyuanlujing2", SapreportPath);
		String jpg = ".jpg";
		String pathandpicture = path+"\\dec\\image\\pathandpicture.jpg";
		String picture = path+"\\dec\\image\\picture.jpg";
		if(shujuyuanlujing3.equals(path)){dto.put("shujuyuanlujing3", pathandpicture);}
		else{
			if(figure2lujing.contains(jpg)){dto.put("shujuyuanlujing3", shujuyuanlujing3);}
			else{dto.put("shujuyuanlujing3", picture);}
			}
		
		
		List arrayList = g4Reader.queryForList("Drilling.queryHd_holedrilling4Manage", pdto);
		List saparrayList = g4Reader.queryForList("Generalturning.querySapinformation", pdto);
		//List CtparameterarrayList = g4Reader.queryForList("Cut.queryCtparameter", pdto);
	
		ReportData reportData = new ReportData();
		reportData.setParametersDto(dto);
		reportData.setFieldsList(arrayList);
		reportData.setFieldsList1(saparrayList);
		//if(workpieceisotypeif != ""){reportData.setFieldsList2(CtparameterarrayList);}
    	
		reportData.setReportFilePath("/file/jasper/DrillingReport4Toolholder.jasper");
		getSessionContainer(request).setReportData("generalturning", reportData);
		return mapping.findForward(null);
	}
	//报表打印
		@SuppressWarnings({ "unchecked", "rawtypes" })
		public ActionForward printTask2(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
			CommonActionForm aForm = (CommonActionForm) form;
			Dto pdto = aForm.getParamAsDto(request);
			Dto dto = new BaseDto();
			
			String workpieceisotype;
			String	name1;
			String	nominaldiameter1;
			String	interferencedepth;
			String  coolingtype;
			String  sapcodeoftoolholder;
			String shujuyuanlujing3;
			
			String path = request.getSession().getServletContext().getRealPath("");
				String figure2lujing = (String) g4Reader.queryForObject("Drilling.queryfigure2blade", pdto);
				  String  str1=figure2lujing.replace("/", "\\");
					 shujuyuanlujing3=path+str1;
					 
			String workpieceisotypeif = pdto.getAsString("workpieceisotype");
			
			name1 = pdto.getAsString("name1");
			nominaldiameter1 = pdto.getAsString("nominaldiameter1");
			interferencedepth = pdto.getAsString("interferencedepth");
			coolingtype = pdto.getAsString("coolingtype");
			sapcodeoftoolholder = pdto.getAsString("sapcodeoftoolholder");
			if(workpieceisotypeif == ""){workpieceisotype= "";}else{workpieceisotype = (String) g4Reader.queryForObject("Drilling.querycailiaonanme1", pdto);}

			dto.put("reportTitle", reportTitle);
			dto.put("workpieceisotype", workpieceisotype);
			dto.put("name", name1);
			dto.put("nominaldiameter", nominaldiameter1);
			dto.put("interferencedepth", interferencedepth);
			dto.put("coolingtype", coolingtype);
			dto.put("sapcodeoftoolholder", sapcodeoftoolholder);
		
		
			String SapreportPath=path+"\\file\\jasper\\";  
		
			dto.put("shujuyuanlujing1", SapreportPath);
			dto.put("shujuyuanlujing3", shujuyuanlujing3);
			dto.put("shujuyuanlujing2", SapreportPath);
			String jpg = ".jpg";
			String pathandpicture = path+"\\dec\\image\\pathandpicture.jpg";
			String picture = path+"\\dec\\image\\picture.jpg";
			if(shujuyuanlujing3.equals(path)){dto.put("shujuyuanlujing3", pathandpicture);}
			else{
				if(figure2lujing.contains(jpg)){dto.put("shujuyuanlujing3", shujuyuanlujing3);}
				else{dto.put("shujuyuanlujing3", picture);}
				}
			
			
			List arrayList = g4Reader.queryForList("Drilling.queryHd_blade_poledrilling4Manage", pdto);
			List saparrayList = g4Reader.queryForList("Generalturning.querySapinformation", pdto);
			List CtparameterarrayList = g4Reader.queryForList("Drilling.queryParameter", pdto);
		
			ReportData reportData = new ReportData();
			reportData.setParametersDto(dto);
			reportData.setFieldsList(arrayList);
			reportData.setFieldsList1(saparrayList);
			if(workpieceisotypeif != ""){reportData.setFieldsList2(CtparameterarrayList);}
	    	
			reportData.setReportFilePath("/file/jasper/DrillingReport4Blade.jasper");
			getSessionContainer(request).setReportData("generalturning", reportData);
			return mapping.findForward(null);
		}
	//报表打印
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public ActionForward printTask3(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto pdto = aForm.getParamAsDto(request);
		Dto dto = new BaseDto();
		
		String workpieceisotype;
		String nominaldiameter1;
		String celength;
		String coolingtype;
		String name;
		String shujuyuanlujing3;
		
		String path = request.getSession().getServletContext().getRealPath("");
			String figure2lujing = (String) g4Reader.queryForObject("Drilling.queryfigure2integer", pdto);
			  String  str1=figure2lujing.replace("/", "\\");
				 shujuyuanlujing3=path+str1;
				 
		String workpieceisotypeif = pdto.getAsString("workpieceisotype");
		
		nominaldiameter1 = pdto.getAsString("nominaldiameter1");
		celength = pdto.getAsString("celength");
		coolingtype = pdto.getAsString("coolingtype");
		name = pdto.getAsString("name");
		
		
		if(workpieceisotypeif == ""){workpieceisotype= "";}else{workpieceisotype = (String) g4Reader.queryForObject("Drilling.querycailiaonanme2", pdto);}

		dto.put("reportTitle", reportTitle);
		dto.put("workpieceisotype", workpieceisotype);
		dto.put("nominaldiameter1", nominaldiameter1);
		dto.put("celength", celength);
		dto.put("coolingtype", coolingtype);
		dto.put("name", name);
		
	
	
		String SapreportPath=path+"\\file\\jasper\\";  
	
		dto.put("shujuyuanlujing1", SapreportPath);
		//dto.put("shujuyuanlujing3", shujuyuanlujing3);
		dto.put("shujuyuanlujing2", SapreportPath);
		String jpg = ".jpg";
		String pathandpicture = path+"\\dec\\image\\pathandpicture.jpg";
		String picture = path+"\\dec\\image\\picture.jpg";
		if(shujuyuanlujing3.equals(path)){dto.put("shujuyuanlujing3", pathandpicture);}
		else{
			if(figure2lujing.contains(jpg)){dto.put("shujuyuanlujing3", shujuyuanlujing3);}
			else{dto.put("shujuyuanlujing3", picture);}
			}
		
		
		List arrayList = g4Reader.queryForList("Drilling.queryHd_toolholder_holedrilling_integral4Manage", pdto);
		List saparrayList = g4Reader.queryForList("Generalturning.querySapinformation", pdto);
		List CtparameterarrayList = g4Reader.queryForList("Drilling.queryinternalParameter", pdto);
	
		ReportData reportData = new ReportData();
		reportData.setParametersDto(dto);
		reportData.setFieldsList(arrayList);
		reportData.setFieldsList1(saparrayList);
		if(workpieceisotypeif != ""){reportData.setFieldsList2(CtparameterarrayList);}
    	
		reportData.setReportFilePath("/file/jasper/DrillingReport4Integer.jasper");
		getSessionContainer(request).setReportData("generalturning", reportData);
		return mapping.findForward(null);
	}

}
