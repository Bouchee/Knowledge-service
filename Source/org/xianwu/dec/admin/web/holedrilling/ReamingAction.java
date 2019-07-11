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
 *铰孔
 * 
 * @author XianwuFu
 * @since 2013-01-01
 * @see BizAction
 */
public class ReamingAction extends BizAction {
	private String reportTitle = "铰孔刀具";

	public ActionForward init(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_REAMING"); // 修正分页传参
																												// -
																												// 1
																												// /
																												// 5
		/*super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_REAMING");
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_REAMING");*/
		return mapping.findForward("reamingView");
	}

	/**
	 * 查询铰刀
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public ActionForward queryHd_holedrilling4Manage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		// 修正分页传参 - 2 / 5
		Dto dto_page = (BaseDto) super.getSessionAttribute(request, "PAGE_PARAMETER_DTO_REAMING");
		if (Utils.isNotEmpty(dto_page) && Utils.isNotEmpty(dto)) {
			dto = WebUtils.getDtoDataFromFirst2Second(dto, dto_page);
		}

		String portsize = dto.getAsString("portsize");
		if (portsize.isEmpty() != true) {
			List portsizeList = java.util.Arrays.asList(portsize.split(","));
			dto.put("portsize", portsizeList);
		}
		

		// 修正分页传参 - 3 / 5
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_REAMING");
		super.setSessionAttribute(request, "PAGE_PARAMETER_DTO_REAMING", dto);

		List hd_holedrillingList = g4Reader.queryForPage("Reaming.queryHd_holedrilling4Manage", dto);
		Integer totalInteger = (Integer) g4Reader.queryForObject("Reaming.queryHd_holedrilling4Manage4PageCount", dto);
		String jsonString = JsonHelper.encodeList2PageJson(hd_holedrillingList, totalInteger, null);
		write(jsonString, response);
		dto.put("portsize", null);
		return mapping.findForward(null);
	}
	
		// 整体铰刀详情
		@SuppressWarnings("rawtypes")
		public ActionForward queryHd_toolholder_reaming_integral4Manage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
			CommonActionForm aForm = (CommonActionForm) form;
			Dto dto = aForm.getParamAsDto(request);
			List list = g4Reader.queryForList("Reaming.queryHd_toolholder_reaming_integral4Manage", dto);
			String jsonString = encodeList2PageJson(list, list.size(), null);
			write(jsonString, response);
			return mapping.findForward(null);
		}
		
		// 机夹式铰刀刀体详情
		@SuppressWarnings("rawtypes")
		public ActionForward queryHd_toolholder_reaming_clamp4Manage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
			CommonActionForm aForm = (CommonActionForm) form;
			Dto dto = aForm.getParamAsDto(request);
			List list = g4Reader.queryForList("Reaming.queryHd_toolholder_reaming_clamp4Manage", dto);
			String jsonString = encodeList2PageJson(list, list.size(), null);
			write(jsonString, response);
			return mapping.findForward(null);
		}
		
		// 机夹式铰刀模块详情
		@SuppressWarnings("rawtypes")
							 
		public ActionForward queryHd_module_reaming_clamp4Manage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
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
			super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_GENERALTURNING_BLADE");// FIXME
			super.setSessionAttribute(request, "PAGE_PARAMETER_DTO_GENERALTURNING_BLADE", dto);// FIXME
			List bladeList = g4Reader.queryForList("Reaming.queryHd_module_reaming_clamp4Manage", dto);
			//Integer totalInteger = (Integer) g4Reader.queryForObject("Enlarging.queryHd_module_coredrilling_shell4Manage4PageCount", dto);
			String jsonString = JsonHelper.encodeList2PageJson(bladeList, bladeList.size(), null);
			write(jsonString, response);
			dto.put("portsize", null);
			return mapping.findForward(null);
			
		}
		
		/**
		 * 查询工件材料状态
		 * 
		 * @param mapping
		 * @param form
		 * @param request
		 * @param response
		 * @return
		 * @throws Exception
		 *//*
		// 工件材料
		@SuppressWarnings("rawtypes")
		public ActionForward queryWorkpiecematerial(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
			CommonActionForm aForm = (CommonActionForm) form;
			Dto dto = aForm.getParamAsDto(request);
			List list = g4Reader.queryForList("Boring.queryWorkpiecematerial", dto);
			String jsonString = JsonHelper.encodeList2PageJson(list, list.size(), null);
			super.write(jsonString, response);
			return mapping.findForward(null);
		}*/

	// 直径
	@SuppressWarnings("rawtypes")
	public ActionForward queryNominaldiameterInReaming(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List list = g4Reader.queryForList("Reaming.queryNominaldiameterInReaming", dto);
		String jsonString = encodeList2PageJson(list, list.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 深度
	@SuppressWarnings("rawtypes")
	public ActionForward queryDepthInReaming(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List list = g4Reader.queryForList("Reaming.queryDepthInReaming", dto);
		String jsonString = encodeList2PageJson(list, list.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	
	// 铰孔精度
	@SuppressWarnings("rawtypes")
	public ActionForward queryAccuracyInHd_toolholder_reaming_clamp(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List list = g4Reader.queryForList("Reaming.queryAccuracyInHd_toolholder_reaming_clamp", dto);
		String jsonString = encodeList2PageJson(list, list.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	
	// 切削参数
		@SuppressWarnings("rawtypes")
		public ActionForward queryRParameter(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
			CommonActionForm aForm = (CommonActionForm) form;
			Dto dto = aForm.getParamAsDto(request);
			List list = g4Reader.queryForList("Reaming.queryRParameter", dto);
			String jsonString = encodeList2PageJson(list, list.size(), null);
			write(jsonString, response);
			return mapping.findForward(null);
		}

	// 刀具类型
	@SuppressWarnings("rawtypes")
	public ActionForward queryTooltypeInReaming(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List list = g4Reader.queryForList("Reaming.queryTooltypeInReaming", dto);
		String jsonString = encodeList2PageJson(list, list.size(), null);
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
			String accuracy;
			String tooltype;
			String shujuyuanlujing3;
			
			String path = request.getSession().getServletContext().getRealPath("");
				String figure2lujing = (String) g4Reader.queryForObject("Reaming.queryfigure2integer", pdto);
				  String  str1=figure2lujing.replace("/", "\\");
					 shujuyuanlujing3=path+str1;
					 
			String workpieceisotypeif = pdto.getAsString("workpieceisotype");
			
			nominaldiameter = pdto.getAsString("nominaldiameter");
			depth = pdto.getAsString("depth");
			accuracy = pdto.getAsString("accuracy");
			tooltype = pdto.getAsString("tooltype");
			
			if(workpieceisotypeif == ""){workpieceisotype= "";}else{workpieceisotype = (String) g4Reader.queryForObject("Reaming.querycailiaonanme2", pdto);}

			dto.put("reportTitle", reportTitle);
			dto.put("workpieceisotype", workpieceisotype);
			dto.put("nominaldiameter", nominaldiameter);
			dto.put("depth", depth);
			dto.put("accuracy", accuracy);
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
			
			
			List arrayList = g4Reader.queryForList("Reaming.queryHd_holedrilling4Manage", pdto);
			List saparrayList = g4Reader.queryForList("Generalturning.querySapinformation", pdto);
			List CtparameterarrayList = g4Reader.queryForList("Reaming.queryRParameter", pdto);
		
			ReportData reportData = new ReportData();
			reportData.setParametersDto(dto);
			reportData.setFieldsList(arrayList);
			reportData.setFieldsList1(saparrayList);
			if(workpieceisotypeif != ""){reportData.setFieldsList2(CtparameterarrayList);}
	    	
			reportData.setReportFilePath("/file/jasper/ReamingReport4Integer.jasper");
			getSessionContainer(request).setReportData("generalturning", reportData);
			return mapping.findForward(null);
		}

	}