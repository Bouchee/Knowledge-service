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
public class EnlargingAction extends BizAction {
	private String reportTitle = "扩孔刀具";
	/**
	 * 扩孔
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
		return mapping.findForward("enlargingView");

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

		

		// 修正分页传参 - 4 / 5
		Dto dto_page = (BaseDto) super.getSessionAttribute(request, "PAGE_PARAMETER_DTO_GENERALTURNING_TOOLHOLDER");
		if (Utils.isNotEmpty(dto_page) && Utils.isNotEmpty(dto)) {
			dto = WebUtils.getDtoDataFromFirst2Second(dto, dto_page);
		}
		/*
		String featurecode = dto.getAsString("featurecode");
		if (featurecode.isEmpty() != true) {
			List featurecodeList = java.util.Arrays.asList(featurecode.split(","));
			dto.put("featurecode", featurecodeList);
			
		
		}*/
	

		String portsize = dto.getAsString("portsize");
		if (portsize.isEmpty() != true) {
			List portsizeList = java.util.Arrays.asList(portsize.split(","));
			dto.put("portsize", portsizeList);
		}
		
		// 修正分页传参 - 3 / 5
		//super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_GENERALTURNING_BLADE");// FIXME
		//super.setSessionAttribute(request, "PAGE_PARAMETER_DTO_GENERALTURNING_BLADE", dto);// FIXME
		List bladeList = g4Reader.queryForPage("Enlarging.queryHd_holedrilling4Manage", dto);
		Integer totalInteger = (Integer) g4Reader.queryForObject("Enlarging.queryHd_holedrilling4Manage4PageCount", dto);
		String jsonString = JsonHelper.encodeList2PageJson(bladeList, totalInteger, null);
		write(jsonString, response);
		return mapping.findForward(null);
	
	
	
	
	
	
	
	
	
	}
	
	
	
	
	//查询公称直径
	@SuppressWarnings("rawtypes")
	public ActionForward queryNominaldiameter(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List list = g4Reader.queryForList("Enlarging.queryNominaldiameter", dto);
		String jsonString = JsonHelper.encodeList2PageJson(list, list.size(), null);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}
	
	//查询深度
	@SuppressWarnings("rawtypes")
	public ActionForward queryDepth(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List list = g4Reader.queryForList("Enlarging.queryDepth", dto);
		String jsonString = JsonHelper.encodeList2PageJson(list, list.size(), null);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}
	
	//查询底孔径
	@SuppressWarnings("rawtypes")
	public ActionForward queryPorediamete(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List list = g4Reader.queryForList("Enlarging.queryPorediamete", dto);
		String jsonString = JsonHelper.encodeList2PageJson(list, list.size(), null);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}
	//查询工件材料
		@SuppressWarnings("rawtypes")
		public ActionForward queryWorkpiecematerial(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
			CommonActionForm aForm = (CommonActionForm) form;
			Dto dto = aForm.getParamAsDto(request);
			List list = g4Reader.queryForList("Enlarging.queryWorkpiecematerial", dto);
			String jsonString = JsonHelper.encodeList2PageJson(list, list.size(), null);
			super.write(jsonString, response);
			return mapping.findForward(null);
		}
	
	//查询刀具类型
		@SuppressWarnings("rawtypes")
		public ActionForward queryTooltypeInhd_holedrilling(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
			CommonActionForm aForm = (CommonActionForm) form;
			Dto dto = aForm.getParamAsDto(request);
			List list = g4Reader.queryForList("Enlarging.queryTooltypeInhd_holedrilling", dto);
			String jsonString = JsonHelper.encodeList2PageJson(list, list.size(), null);
			super.write(jsonString, response);
			return mapping.findForward(null);
		}
		
	
		// 切削参数

		public ActionForward queryEparameter(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
			CommonActionForm aForm = (CommonActionForm) form;
			Dto dto = aForm.getParamAsDto(request);

			List list = g4Reader.queryForList("Enlarging.queryEparameter", dto);
			String jsonString = JsonHelper.encodeList2PageJson(list, list.size(), null);
			super.write(jsonString, response);
			return mapping.findForward(null);
		}
	

	
	//查询扩孔详情信息
	public ActionForward queryHd_toolholder_coredrilling_shell4Manage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		// 修正分页传参 - 2 / 5		
		Dto dto_page = (BaseDto) super.getSessionAttribute(request, "PAGE_PARAMETER_DTO_GENERALTURNING_BLADE");// FIXME
		if (Utils.isNotEmpty(dto_page) && Utils.isNotEmpty(dto)) {
			dto = WebUtils.getDtoDataFromFirst2Second(dto, dto_page);
		}

		
		// 修正分页传参 - 3 / 5
		//super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_GENERALTURNING_BLADE");// FIXME
		//super.setSessionAttribute(request, "PAGE_PARAMETER_DTO_GENERALTURNING_BLADE", dto);// FIXME
		List bladeList = g4Reader.queryForPage("Enlarging.queryHd_toolholder_coredrilling_shell4Manage", dto);
		Integer totalInteger = (Integer) g4Reader.queryForObject("Enlarging.queryHd_toolholder_coredrilling_shell4Manage4PageCount", dto);
		String jsonString = JsonHelper.encodeList2PageJson(bladeList, totalInteger, null);
		write(jsonString, response);
		System.out.println("sb");
		return mapping.findForward(null);
	}
	
	/*@SuppressWarnings("rawtypes")
	public ActionForward queryTooltypeInhd_toolholder_coredrilling_shell(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List list = g4Reader.queryForList("Enlarging.queryTooltypeInhd_toolholder_coredrilling_shell", dto);
		String jsonString = JsonHelper.encodeList2PageJson(list, list.size(), null);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}*/
	
		/**
	 * 查询套式扩孔钻模块
	 * 
	 * @param
	 * @return
	 */
	
	public ActionForward queryHd_module_coredrilling_shell4Manage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		// 修正分页传参 - 2 / 5		
		Dto dto_page = (BaseDto) super.getSessionAttribute(request, "PAGE_PARAMETER_DTO_GENERALTURNING_BLADE");// FIXME
		if (Utils.isNotEmpty(dto_page) && Utils.isNotEmpty(dto)) {
			dto = WebUtils.getDtoDataFromFirst2Second(dto, dto_page);
		}
		
		//dto.put("portsize", featurecodeList);
		
		String portsize = dto.getAsString("portsize");
		List portsizeList = java.util.Arrays.asList(portsize.split(","));
		dto.put("portsize", portsizeList);
		
		
		// 修正分页传参 - 3 / 5
		//super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_GENERALTURNING_BLADE");// FIXME
		//super.setSessionAttribute(request, "PAGE_PARAMETER_DTO_GENERALTURNING_BLADE", dto);// FIXME
		List bladeList = g4Reader.queryForList("Enlarging.queryHd_module_coredrilling_shell4Manage", dto);
		//Integer totalInteger = (Integer) g4Reader.queryForObject("Enlarging.queryHd_module_coredrilling_shell4Manage4PageCount", dto);
		String jsonString = JsonHelper.encodeList2PageJson(bladeList, bladeList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	
	//报表打印
			@SuppressWarnings({ "unchecked", "rawtypes" })
			public ActionForward printTask3(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
				CommonActionForm aForm = (CommonActionForm) form;
				Dto pdto = aForm.getParamAsDto(request);
				Dto dto = new BaseDto();
				
				String workpieceisotype;
				String nominaldiameter;
				String depth;
				String porediamete;
				String tooltype;
				String shujuyuanlujing3;
				
				String path = request.getSession().getServletContext().getRealPath("");
					String figure2lujing = (String) g4Reader.queryForObject("Enlarging.queryfigure2integer", pdto);
					  String  str1=figure2lujing.replace("/", "\\");
						 shujuyuanlujing3=path+str1;
						 
				String workpieceisotypeif = pdto.getAsString("workpieceisotype");
				
				nominaldiameter = pdto.getAsString("nominaldiameter");
				depth = pdto.getAsString("depth");
				porediamete = pdto.getAsString("porediamete");
				tooltype = pdto.getAsString("tooltype");
				
				if(workpieceisotypeif == ""){workpieceisotype= "";}else{workpieceisotype = (String) g4Reader.queryForObject("Enlarging.querycailiaonanme2", pdto);}

				dto.put("reportTitle", reportTitle);
				dto.put("workpieceisotype", workpieceisotype);
				dto.put("nominaldiameter", nominaldiameter);
				dto.put("depth", depth);
				dto.put("porediamete", porediamete);
				dto.put("tooltype", tooltype);
				
			
			
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
				
				
				List arrayList = g4Reader.queryForList("Enlarging.queryHd_holedrilling4Manage", pdto);
				List saparrayList = g4Reader.queryForList("Generalturning.querySapinformation", pdto);
				List CtparameterarrayList = g4Reader.queryForList("Enlarging.queryEparameter", pdto);
			
				ReportData reportData = new ReportData();
				reportData.setParametersDto(dto);
				reportData.setFieldsList(arrayList);
				reportData.setFieldsList1(saparrayList);
				if(workpieceisotypeif != ""){reportData.setFieldsList2(CtparameterarrayList);}
		    	
				reportData.setReportFilePath("/file/jasper/EnlargingReport4Integer.jasper");
				getSessionContainer(request).setReportData("generalturning", reportData);
				return mapping.findForward(null);
			}
	
	

}
