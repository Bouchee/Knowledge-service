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
 *镗孔
 * 
 * @author XianwuFu
 * @since 2013-01-01
 * @see BizAction
 */
public class BoringAction extends BizAction {
	private String reportTitle = "镗孔刀具";
	public ActionForward init(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		//super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_BORING"); // 修正分页传参
																												// -
																												// 1
																												// /
																												// 5
		/*super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_BORING");
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_BORING");*/
		
		return mapping.findForward("boringView");
		
	}

	/**
	 * 查询镗刀
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public ActionForward queryHd_holedrilling4Manage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		// 修正分页传参 - 2 / 5
		Dto dto_page = (BaseDto) super.getSessionAttribute(request, "PAGE_PARAMETER_DTO_BORING");
		if (Utils.isNotEmpty(dto_page) && Utils.isNotEmpty(dto)) {
			dto = WebUtils.getDtoDataFromFirst2Second(dto, dto_page);
		}


		String portsize = dto.getAsString("portsize");
		if (portsize.isEmpty() != true) {
			List portsizeList = java.util.Arrays.asList(portsize.split(","));
			dto.put("portsize", portsizeList);
		}
		/*// 修正分页传参 - 3 / 5
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_BORING");
		super.setSessionAttribute(request, "PAGE_PARAMETER_DTO_BORING", dto);*/

		List milling_toolholder_integralList = g4Reader.queryForPage("Boring.queryHd_holedrilling4Manage", dto);
		Integer totalInteger = (Integer) g4Reader.queryForObject("Boring.queryHd_holedrilling4Manage4PageCount", dto);
		String jsonString = JsonHelper.encodeList2PageJson(milling_toolholder_integralList, totalInteger, null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	
	
	/**
	 * 查询镗刀
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public ActionForward queryHd_blade_boring4Manage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		// 修正分页传参 - 2 / 5
		Dto dto_page = (BaseDto) super.getSessionAttribute(request, "PAGE_PARAMETER_DTO_BORING");
		if (Utils.isNotEmpty(dto_page) && Utils.isNotEmpty(dto)) {
			dto = WebUtils.getDtoDataFromFirst2Second(dto, dto_page);
		}
		String centreblade = dto.getAsString("centreblade");
		if (centreblade.isEmpty() != true) {
			List portsizeList = java.util.Arrays.asList(centreblade.split(","));
			dto.put("centreblade", portsizeList);
		}

		String portsize = dto.getAsString("portsize");
		if (portsize.isEmpty() != true) {
			List portsizeList = java.util.Arrays.asList(portsize.split(","));
			dto.put("portsize", portsizeList);
		}
		/*// 修正分页传参 - 3 / 5
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_BORING");
		super.setSessionAttribute(request, "PAGE_PARAMETER_DTO_BORING", dto);*/

		List milling_toolholder_integralList = g4Reader.queryForList("Boring.queryHd_blade_boring4Manage", dto);
		Integer totalInteger = (Integer) g4Reader.queryForObject("Boring.queryHd_blade_boring4Manage4PageCount", dto);
		String jsonString = JsonHelper.encodeList2PageJson(milling_toolholder_integralList, totalInteger, null);
		write(jsonString, response);
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
	
	// 镗孔类型
	@SuppressWarnings("rawtypes")
	public ActionForward queryCuttypeInBoring(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List list = g4Reader.queryForList("Boring.queryCuttypeInBoring", dto);
		String jsonString = encodeList2PageJson(list, list.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 直径
	@SuppressWarnings("rawtypes")
	public ActionForward queryNominaldiameterInBoring(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List list = g4Reader.queryForList("Boring.queryNominaldiameterInBoring", dto);
		String jsonString = encodeList2PageJson(list, list.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 深度
	@SuppressWarnings("rawtypes")
	public ActionForward queryDepthInBoring(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List list = g4Reader.queryForList("Boring.queryDepthInBoring", dto);
		String jsonString = encodeList2PageJson(list, list.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	
	// 冷却类型
	@SuppressWarnings("rawtypes")
	public ActionForward queryCoolingtypeInBoring(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List list = g4Reader.queryForList("Boring.queryCoolingtypeInBoring", dto);
		String jsonString = encodeList2PageJson(list, list.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	// 切削参数

			public ActionForward queryCtparameter(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
				CommonActionForm aForm = (CommonActionForm) form;
				Dto dto = aForm.getParamAsDto(request);

				List list = g4Reader.queryForList("Boring.queryCtparameter", dto);
				String jsonString = JsonHelper.encodeList2PageJson(list, list.size(), null);
				super.write(jsonString, response);
				return mapping.findForward(null);
			}
			// 刀杆
		
			public ActionForward queryDaogan(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
				CommonActionForm aForm = (CommonActionForm) form;
				Dto dto = aForm.getParamAsDto(request);

				List list = g4Reader.queryForList("Boring.queryDaogan", dto);
				String jsonString = JsonHelper.encodeList2PageJson(list, list.size(), null);
				super.write(jsonString, response);
				return mapping.findForward(null);
			}
		
			
			
			
			/**
			 * 查询库存
			 * 
			 * @param
			 * @return
			 */
			@SuppressWarnings("rawtypes")
			public ActionForward querySapinformation(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
				CommonActionForm aForm = (CommonActionForm) form;
				Dto dto = aForm.getParamAsDto(request);
				
				/*List ctparameterList = g4Reader.queryForList("Generalturning.queryCtparameter", dto);
				String jsonString = encodeList2PageJson(ctparameterList, ctparameterList.size(), null);
				write(jsonString, response);*/
				
			
				List sapinformationList = g4Reader.queryForList("Boring.querySapinformation", dto);
				String jsonString = encodeList2PageJson(sapinformationList, sapinformationList.size(), null);
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
				String	cuttype;
				String	nominaldiameter;
				String	depth;
				String  coolingtype;
				String shujuyuanlujing3;
				
				String path = request.getSession().getServletContext().getRealPath("");
					String figure2lujing = (String) g4Reader.queryForObject("Boring.queryfigure2toolholder", pdto);
					  String  str1=figure2lujing.replace("/", "\\");
						 shujuyuanlujing3=path+str1;
						 
				String workpieceisotypeif = pdto.getAsString("workpieceisotype");
				
				cuttype = pdto.getAsString("cuttype");
				nominaldiameter = pdto.getAsString("nominaldiameter");
				depth = pdto.getAsString("depth");
				coolingtype = pdto.getAsString("coolingtype");
				
				if(workpieceisotypeif == ""){workpieceisotype= "";}else{workpieceisotype = (String) g4Reader.queryForObject("Boring.querycailiaonanme", pdto);}

				dto.put("reportTitle", reportTitle);
				dto.put("workpieceisotype", workpieceisotype);
				dto.put("cuttype", cuttype);
				dto.put("nominaldiameter", nominaldiameter);
				dto.put("depth", depth);
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
				
				
				
				List arrayList = g4Reader.queryForList("Boring.queryHd_holedrilling4Manage", pdto);
				List saparrayList = g4Reader.queryForList("Generalturning.querySapinformation", pdto);
				//List CtparameterarrayList = g4Reader.queryForList("Cut.queryCtparameter", pdto);
			
				ReportData reportData = new ReportData();
				reportData.setParametersDto(dto);
				reportData.setFieldsList(arrayList);
				reportData.setFieldsList1(saparrayList);
				//if(workpieceisotypeif != ""){reportData.setFieldsList2(CtparameterarrayList);}
		    	
				reportData.setReportFilePath("/file/jasper/BoringReport4Toolholder.jasper");
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
				String cuttype;
				String nominaldiameter;
				String depth;
				String coolingtype;
				String shujuyuanlujing3;
				
				String path = request.getSession().getServletContext().getRealPath("");
					String figure2lujing = (String) g4Reader.queryForObject("Boring.queryfigure2integer", pdto);
					  String  str1=figure2lujing.replace("/", "\\");
						 shujuyuanlujing3=path+str1;
						 
				String workpieceisotypeif = pdto.getAsString("workpieceisotype");
				
				cuttype = pdto.getAsString("cuttype");
				nominaldiameter = pdto.getAsString("nominaldiameter");
				depth = pdto.getAsString("depth");
				coolingtype = pdto.getAsString("coolingtype");
				
				if(workpieceisotypeif == ""){workpieceisotype= "";}else{workpieceisotype = (String) g4Reader.queryForObject("Boring.querycailiaonanme2", pdto);}

				dto.put("reportTitle", reportTitle);
				dto.put("workpieceisotype", workpieceisotype);
				dto.put("cuttype", cuttype);
				dto.put("nominaldiameter", nominaldiameter);
				dto.put("depth", depth);
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
				
				
				
				List arrayList = g4Reader.queryForList("Boring.queryDaogan", pdto);
				List saparrayList = g4Reader.queryForList("Generalturning.querySapinformation", pdto);
		
			
				ReportData reportData = new ReportData();
				reportData.setParametersDto(dto);
				reportData.setFieldsList(arrayList);
				reportData.setFieldsList1(saparrayList);
		    	
				reportData.setReportFilePath("/file/jasper/BoringReport4Integer.jasper");
				getSessionContainer(request).setReportData("generalturning", reportData);
				return mapping.findForward(null);
			}
	//报表打印
			@SuppressWarnings({ "unchecked", "rawtypes" })
			public ActionForward printTask2(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
				CommonActionForm aForm = (CommonActionForm) form;
				Dto pdto = aForm.getParamAsDto(request);
				Dto dto = new BaseDto();
				
				String workpieceisotype1;
				String	cuttype;
				String	nominaldiameter1;
				String	depth;
				String  coolingtype;
				
				String shujuyuanlujing3;
				
				String path = request.getSession().getServletContext().getRealPath("");
					String figure2lujing = (String) g4Reader.queryForObject("Boring.queryfigure2blade", pdto);
					  String  str1=figure2lujing.replace("/", "\\");
						 shujuyuanlujing3=path+str1;
						 
				String workpieceisotypeif = pdto.getAsString("workpieceisotype1");
				
				cuttype = pdto.getAsString("cuttype");
				nominaldiameter1 = pdto.getAsString("nominaldiameter1");
				depth = pdto.getAsString("depth");
				coolingtype = pdto.getAsString("coolingtype");
				
				if(workpieceisotypeif == ""){workpieceisotype1= "";}else{workpieceisotype1 = (String) g4Reader.queryForObject("Boring.querycailiaonanme1", pdto);}

				dto.put("reportTitle", reportTitle);
				dto.put("workpieceisotype", workpieceisotype1);
				dto.put("cuttype", cuttype);
				dto.put("nominaldiameter", nominaldiameter1);
				dto.put("depth", depth);
				dto.put("coolingtype", coolingtype);
				
			
			
				String SapreportPath=path+"\\file\\jasper\\";  
			
				dto.put("shujuyuanlujing1", SapreportPath);
			//	dto.put("shujuyuanlujing3", shujuyuanlujing3);
				dto.put("shujuyuanlujing2", SapreportPath);
				
				
				String jpg = ".jpg";
				String pathandpicture = path+"\\dec\\image\\pathandpicture.jpg";
				String picture = path+"\\dec\\image\\picture.jpg";
				if(shujuyuanlujing3.equals(path)){dto.put("shujuyuanlujing3", pathandpicture);}
				else{
					if(figure2lujing.contains(jpg)){dto.put("shujuyuanlujing3", shujuyuanlujing3);}
					else{dto.put("shujuyuanlujing3", picture);}
					}
				
				
				
				List arrayList = g4Reader.queryForList("Boring.queryHd_blade_boring4Manage", pdto);
				List saparrayList = g4Reader.queryForList("Generalturning.querySapinformation", pdto);
				List CtparameterarrayList = g4Reader.queryForList("Boring.queryCtparameter", pdto);
			
				ReportData reportData = new ReportData();
				reportData.setParametersDto(dto);
				reportData.setFieldsList(arrayList);
				reportData.setFieldsList1(saparrayList);
				if(workpieceisotypeif != ""){reportData.setFieldsList2(CtparameterarrayList);}
		    	
				reportData.setReportFilePath("/file/jasper/BoringReport4Blade.jasper");
				getSessionContainer(request).setReportData("generalturning", reportData);
				return mapping.findForward(null);
			}

	}