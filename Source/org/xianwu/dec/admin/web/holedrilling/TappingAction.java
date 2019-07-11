package org.xianwu.dec.admin.web.holedrilling;

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
 * 孔加工
 * 
 * @author XianwuFu
 * @since 2013-01-01
 * @see BizAction
 */
public class TappingAction extends BizAction {
	private String reportTitle = "攻丝刀具";
	/**
	 * 攻丝
	 * 
	 * @param
	 * @return
	 */
	public ActionForward init(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		//super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_SURFACEMILLING_MILLING_TOOLHOLDER_INTEGRAL"); // 修正分页传参
																												// -
																												// 1
																												// /
																												// 5
		//super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_SURFACEMILLING_MILLING_TOOLHOLDER_CLAMP");
		//super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_SURFACEMILLING_MILLING_BLADE_CLAMP");
		return mapping.findForward("tappingView");

	}

	/**
	 * 查询刀具
	 * 
	 * @param
	 * @return
	 */
	//@SuppressWarnings({ "rawtypes", "unchecked" })
	
	
	public ActionForward queryHd_holedrilling4Manage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		// 修正分页传参 - 2 / 5		
		Dto dto_page = (BaseDto) super.getSessionAttribute(request, "PAGE_PARAMETER_DTO_GENERALTURNING_BLADE");// FIXME
		if (Utils.isNotEmpty(dto_page) && Utils.isNotEmpty(dto)) {
			dto = WebUtils.getDtoDataFromFirst2Second(dto, dto_page);
		}

/*		String featurecode = dto.getAsString("featurecode");
		if (featurecode.isEmpty() != true) {
			List featurecodeList = java.util.Arrays.asList(featurecode.split(","));
			dto.put("featurecode", featurecodeList);
		}*/
	
		
		// 修正分页传参 - 3 / 5
		//super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_GENERALTURNING_BLADE");// FIXME
		//super.setSessionAttribute(request, "PAGE_PARAMETER_DTO_GENERALTURNING_BLADE", dto);// FIXME
		List bladeList = g4Reader.queryForPage("Tapping.queryHd_toolholder_tapping4Manage", dto);
		Integer totalInteger = (Integer) g4Reader.queryForObject("Tapping.queryHd_holedrilling4Manage4PageCount", dto);
		String jsonString = JsonHelper.encodeList2PageJson(bladeList, totalInteger, null);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	
	//查询工件材料//TODO

	/**
	 * 查询工件材料状态
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("rawtypes")
	public ActionForward queryWorkpiecematerial(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List list = g4Reader.queryForList("Generalturning.queryWorkpiecematerial", dto);
		String jsonString = JsonHelper.encodeList2PageJson(list, list.size(), null);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}
	
	
	
	
	//查询螺纹标准
	@SuppressWarnings("rawtypes")
	public ActionForward queryThreadstandardInHd_toolholder_tapping(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List list = g4Reader.queryForList("Tapping.queryThreadstandardInHd_toolholder_tapping", dto);
		String jsonString = JsonHelper.encodeList2PageJson(list, list.size(), null);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}
	
	//查询螺纹标准
		@SuppressWarnings("rawtypes")
		public ActionForward queryTParameter(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
			CommonActionForm aForm = (CommonActionForm) form;
			Dto dto = aForm.getParamAsDto(request);
			List list = g4Reader.queryForList("Tapping.queryTParameter", dto);
			String jsonString = JsonHelper.encodeList2PageJson(list, list.size(), null);
			super.write(jsonString, response);
			return mapping.findForward(null);
		}
	
	//查询螺纹规格（公称直径）
@SuppressWarnings("rawtypes")
	public ActionForward queryNominaldiameterInHd_toolholder_tapping(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List list = g4Reader.queryForList("Tapping.queryNominaldiameterInHd_toolholder_tapping", dto);
		String jsonString = JsonHelper.encodeList2PageJson(list, list.size(), null);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}
	
	@SuppressWarnings("rawtypes")
	public ActionForward queryDepthInHd_toolholder_tapping(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List list = g4Reader.queryForList("Tapping.queryDepthInHd_toolholder_tapping", dto);
		String jsonString = JsonHelper.encodeList2PageJson(list, list.size(), null);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}

	// 整体攻丝详情
	@SuppressWarnings("rawtypes")
	public ActionForward queryHd_toolholder_tapping4Manage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List list = g4Reader.queryForPage("Tapping.queryHd_toolholder_tapping4Manage", dto); 
		Integer totalInteger = (Integer) g4Reader.queryForObject("Tapping.queryHd_toolholder_tapping4Manage4PageCount", dto);
		
		String jsonString = encodeList2PageJson(list, totalInteger, null);
		write(jsonString, response);

		return mapping.findForward(null);
	}
		
	@SuppressWarnings("rawtypes")
	public ActionForward queryGroovedirectionInHd_toolholder_tapping(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List list = g4Reader.queryForList("Tapping.queryGroovedirectionInHd_toolholder_tapping", dto);
		String jsonString = JsonHelper.encodeList2PageJson(list, list.size(), null);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}
	
	
	//报表打印
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public ActionForward printTask3(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto pdto = aForm.getParamAsDto(request);
		Dto dto = new BaseDto();
		
		String workpieceisotype;
		String threadstandard;
		String nominaldiameter;
		String depth;
		String screwtype;
		String shujuyuanlujing3;
		
		String path = request.getSession().getServletContext().getRealPath("");
			String figure2lujing = (String) g4Reader.queryForObject("Tapping.queryfigure2integer", pdto);
			  String  str1=figure2lujing.replace("/", "\\");
				 shujuyuanlujing3=path+str1;
				 
		String workpieceisotypeif = pdto.getAsString("workpieceisotype");
		
		threadstandard = pdto.getAsString("threadstandard");
		nominaldiameter = pdto.getAsString("nominaldiameter");
		depth = pdto.getAsString("depth");
		screwtype = pdto.getAsString("screwtype");
		
		if(workpieceisotypeif == ""){workpieceisotype= "";}else{workpieceisotype = (String) g4Reader.queryForObject("Tapping.querycailiaonanme2", pdto);}

		dto.put("reportTitle", reportTitle);
		dto.put("workpieceisotype", workpieceisotype);
		dto.put("threadstandard", threadstandard);
		dto.put("nominaldiameter", nominaldiameter);
		dto.put("depth", depth);
		dto.put("screwtype", screwtype);
		
	
	
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
		
		
		List arrayList = g4Reader.queryForList("Tapping.queryHd_toolholder_tapping4Manage", pdto);
		List saparrayList = g4Reader.queryForList("Generalturning.querySapinformation", pdto);
		List CtparameterarrayList = g4Reader.queryForList("Tapping.queryTParameter", pdto);
	
		ReportData reportData = new ReportData();
		reportData.setParametersDto(dto);
		reportData.setFieldsList(arrayList);
		reportData.setFieldsList1(saparrayList);
		if(workpieceisotypeif != ""){reportData.setFieldsList2(CtparameterarrayList);}
    	
		reportData.setReportFilePath("/file/jasper/TappingReport4Integer.jasper");
		getSessionContainer(request).setReportData("generalturning", reportData);
		return mapping.findForward(null);
	}


}
