package org.xianwu.dec.admin.web.milling;

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
 * 仿形铣
 * 
 * @author XianwuFu
 * @since 2013-01-01
 * @see BizAction
 */
public class TempletmillingAction extends BizAction {
	private String reportTitle = "仿型铣机夹式刀具";

	public ActionForward init(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_TEMPLETMILLING_MILLING_TOOLHOLDER_INTEGRAL"); // 修正分页传参
																												// -
																												// 1
																												// /
																												// 5
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_TEMPLETMILLING_MILLING_TOOLHOLDER_CLAMP");
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_TEMPLETMILLING_MILLING_BLADE_CLAMP");
		return mapping.findForward("templetmillingView");
	}

	/**
	 * 查询整体式铣刀
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public ActionForward queryMilling_toolholder_integral4Manage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		// 修正分页传参 - 2 / 5
		Dto dto_page = (BaseDto) super.getSessionAttribute(request, "PAGE_PARAMETER_DTO_TEMPLETMILLING_MILLING_TOOLHOLDER_INTEGRAL");
		if (Utils.isNotEmpty(dto_page) && Utils.isNotEmpty(dto)) {
			dto = WebUtils.getDtoDataFromFirst2Second(dto, dto_page);
		}

		String featurecode = dto.getAsString("featurecode");
		if (featurecode.isEmpty() != true) {
			List featurecodeList = java.util.Arrays.asList(featurecode.split(","));
			dto.put("featurecode", featurecodeList);
		}

		// 修正分页传参 - 3 / 5
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_TEMPLETMILLING_MILLING_TOOLHOLDER_INTEGRAL");
		super.setSessionAttribute(request, "PAGE_PARAMETER_DTO_TEMPLETMILLING_MILLING_TOOLHOLDER_INTEGRAL", dto);

		List milling_toolholder_integralList = g4Reader.queryForPage("Templetmilling.queryMilling_toolholder_integral4Manage", dto);
		Integer totalInteger = (Integer) g4Reader.queryForObject("Templetmilling.queryMilling_toolholder_integral4Manage4PageCount", dto);
		String jsonString = JsonHelper.encodeList2PageJson(milling_toolholder_integralList, totalInteger, null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 工件材料
	@SuppressWarnings("rawtypes")
	public ActionForward queryWorkpiecematerialInMilling_toolholder_integral(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForList("Templetmilling.queryWorkpiecematerialInMilling_toolholder_integral", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 公称直径
	@SuppressWarnings("rawtypes")
	public ActionForward queryNominaldiameterInMilling_toolholder_integral(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForList("Templetmilling.queryNominaldiameterInMilling_toolholder_integral", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 刀尖圆角半径
	@SuppressWarnings("rawtypes")
	public ActionForward queryNoseradiusInMilling_toolholder_integral(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForList("Templetmilling.queryNoseradiusInMilling_toolholder_integral", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 刃长
	@SuppressWarnings("rawtypes")
	public ActionForward queryCelengthInMilling_toolholder_integral(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForList("Templetmilling.queryCelengthInMilling_toolholder_integral", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 刃部锥角
	@SuppressWarnings("rawtypes")
	public ActionForward queryConeangleInMilling_toolholder_integral(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForList("Templetmilling.queryConeangleInMilling_toolholder_integral", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 查询机夹式铣刀刀体
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public ActionForward queryMilling_toolholder_clamp4Manage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		// 修正分页传参 - 4 / 5
		Dto dto_page = (BaseDto) super.getSessionAttribute(request, "PAGE_PARAMETER_DTO_TEMPLETMILLING_MILLING_TOOLHOLDER_CLAMP");
		if (Utils.isNotEmpty(dto_page) && Utils.isNotEmpty(dto)) {
			dto = WebUtils.getDtoDataFromFirst2Second(dto, dto_page);
		}

		String featurecode = dto.getAsString("featurecode");
		if (featurecode.isEmpty() != true) {
			List featurecodeList = java.util.Arrays.asList(featurecode.split(","));
			dto.put("featurecode", featurecodeList);
			
		}

		// 修正分页传参 - 5 / 5
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_TEMPLETMILLING_MILLING_TOOLHOLDER_CLAMP");
		super.setSessionAttribute(request, "PAGE_PARAMETER_DTO_TEMPLETMILLING_MILLING_TOOLHOLDER_CLAMP", dto);

		List milling_toolholder_clampList = g4Reader.queryForPage("Templetmilling.queryMilling_toolholder_clamp4Manage", dto);
		Integer totalInteger = (Integer) g4Reader.queryForObject("Templetmilling.queryMilling_toolholder_clamp4Manage4PageCount", dto);
		String jsonString = JsonHelper.encodeList2PageJson(milling_toolholder_clampList, totalInteger, null);
		
		write(jsonString, response);
		dto.put("featurecode", null);
		return mapping.findForward(null);
	}

	// 工件材料
	@SuppressWarnings("rawtypes")
	public ActionForward queryWorkpiecematerialInMilling_toolholder_clamp(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		List areaList = g4Reader.queryForList("Templetmilling.queryWorkpiecematerialInMilling_toolholder_clamp", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 公称直径
	@SuppressWarnings("rawtypes")
	public ActionForward queryNominaldiameterInMilling_toolholder_clamp(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		List areaList = g4Reader.queryForList("Templetmilling.queryNominaldiameterInMilling_toolholder_clamp", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 刀尖圆角半径
	@SuppressWarnings("rawtypes")
	public ActionForward queryNoseradiusInMilling_blade_clamp(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForList("Templetmilling.queryNoseradiusInMilling_blade_clamp", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 铣削深度
	@SuppressWarnings("rawtypes")
	public ActionForward queryInterferencedepthInMilling_toolholder_clamp(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForList("Templetmilling.queryInterferencedepthInMilling_toolholder_clamp", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 刀片夹紧方式
	/*
	 * @SuppressWarnings("rawtypes") public ActionForward
	 * queryCseriesInMilling_toolholder_clamp(ActionMapping mapping, ActionForm
	 * form, HttpServletRequest request, HttpServletResponse response) throws
	 * Exception { CommonActionForm aForm = (CommonActionForm) form; Dto dto =
	 * aForm.getParamAsDto(request);
	 * 
	 * List areaList =
	 * g4Reader.queryForPage("Templetmilling.queryCseriesInMilling_toolholder_clamp"
	 * , dto); String jsonString = encodeList2PageJson(areaList,
	 * areaList.size(), null); write(jsonString, response); return
	 * mapping.findForward(null); }
	 */

	/**
	 * 查询机夹式铣刀刀片
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public ActionForward queryMilling_blade_clamp4Manage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		// 修正分页传参 - 4 / 5
		Dto dto_page = (BaseDto) super.getSessionAttribute(request, "PAGE_PARAMETER_DTO_TEMPLETMILLING_MILLING_BLADE_CLAMP");
		if (Utils.isNotEmpty(dto_page) && Utils.isNotEmpty(dto)) {
			dto = WebUtils.getDtoDataFromFirst2Second(dto, dto_page);
		}

		String featurecode = dto.getAsString("featurecode");
		if (featurecode.isEmpty() != true) {
			List featurecodeList = java.util.Arrays.asList(featurecode.split(","));
			dto.put("featurecode", featurecodeList);
		}

		// 修正分页传参 - 5 / 5
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_TEMPLETMILLING_MILLING_BLADE_CLAMP");
		super.setSessionAttribute(request, "PAGE_PARAMETER_DTO_TEMPLETMILLING_MILLING_BLADE_CLAMP", dto);

		List milling_blade_clampList = g4Reader.queryForList("Templetmilling.queryMilling_blade_clamp4Manage", dto);
		//Integer totalInteger = (Integer) g4Reader.queryForObject("Templetmilling.queryMilling_blade_clamp4Manage4PageCount", dto);
		String jsonString = JsonHelper.encodeList2PageJson(milling_blade_clampList, milling_blade_clampList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	
	// 机夹式切削参数
        public ActionForward queryParameter(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
			CommonActionForm aForm = (CommonActionForm) form;
			Dto dto = aForm.getParamAsDto(request);
			

			
			//Dto ParameterDto;
			//ParameterDto = (BaseDto)g4Reader.queryForObject("Groovemilling.queryParameter", dto);
			
	/*		if (Utils.isEmpty(ParameterDto)){
				ParameterDto = new BaseDto();
			}*/
			List parameterList = g4Reader.queryForList("Templetmilling.queryParameter", dto);
			
			String jsonString = encodeList2PageJson(parameterList, parameterList.size(), null);
			
			write(jsonString, response);
			// ctparameterDto.put("注意事项", "注意事项——test");
			//write(ParameterDto.toJson(), response);
			return mapping.findForward(null);
		}
        
     // 整体式切削参数
        public ActionForward queryIntegralParameter(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
			CommonActionForm aForm = (CommonActionForm) form;
			Dto dto = aForm.getParamAsDto(request);
			

			
			//Dto ParameterDto;
			//ParameterDto = (BaseDto)g4Reader.queryForObject("Groovemilling.queryParameter", dto);
			
	/*		if (Utils.isEmpty(ParameterDto)){
				ParameterDto = new BaseDto();
			}*/
			List parameterList = g4Reader.queryForList("Templetmilling.queryIntegralParameter", dto);
			
			String jsonString = encodeList2PageJson(parameterList, parameterList.size(), null);
			
			write(jsonString, response);
			// ctparameterDto.put("注意事项", "注意事项——test");
			//write(ParameterDto.toJson(), response);
			return mapping.findForward(null);
		}
        
     // 机夹刀体名称
     		@SuppressWarnings("rawtypes")
     		public ActionForward queryNameInMilling_toolholder_clamp(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
     			CommonActionForm aForm = (CommonActionForm) form;
     			Dto dto = aForm.getParamAsDto(request);

     			List areaList = g4Reader.queryForPage("Templetmilling.queryNameInMilling_toolholder_clamp", dto);
     			String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
     			write(jsonString, response);
     			return mapping.findForward(null);
     		}
     		
     	// 整体式刀体名称
     				@SuppressWarnings("rawtypes")
     				public ActionForward queryNameInMilling_toolholder_integral(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
     					CommonActionForm aForm = (CommonActionForm) form;
     					Dto dto = aForm.getParamAsDto(request);

     					List areaList = g4Reader.queryForPage("Templetmilling.queryNameInMilling_toolholder_integral", dto);
     					String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
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
						String	name;
						String	nominaldiameter;
						String	interferencedepth;
						String  noseradius;
						String shujuyuanlujing3;
						
						String path = request.getSession().getServletContext().getRealPath("");
							String figure2lujing = (String) g4Reader.queryForObject("Templetmilling.queryfigure2toolholder", pdto);
							  String  str1=figure2lujing.replace("/", "\\");
								 shujuyuanlujing3=path+str1;
								 
						String workpieceisotypeif = pdto.getAsString("workpieceisotype");
						
						name = pdto.getAsString("name");
						nominaldiameter = pdto.getAsString("nominaldiameter");
						interferencedepth = pdto.getAsString("interferencedepth");
						noseradius = pdto.getAsString("noseradius");
						
						if(workpieceisotypeif == ""){workpieceisotype= "";}else{workpieceisotype = (String) g4Reader.queryForObject("Templetmilling.querycailiaonanme", pdto);}
				
						dto.put("reportTitle", reportTitle);
						dto.put("workpieceisotype", workpieceisotype);
						dto.put("name", name);
						dto.put("nominaldiameter", nominaldiameter);
						dto.put("interferencedepth", interferencedepth);
					
						dto.put("noseradius", noseradius);
					
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
						
						
						List arrayList = g4Reader.queryForList("Templetmilling.queryMilling_toolholder_clamp4Manage", pdto);
						List saparrayList = g4Reader.queryForList("Generalturning.querySapinformation", pdto);
						//List CtparameterarrayList = g4Reader.queryForList("Cut.queryCtparameter", pdto);
					
						ReportData reportData = new ReportData();
						reportData.setParametersDto(dto);
						reportData.setFieldsList(arrayList);
						reportData.setFieldsList1(saparrayList);
						//if(workpieceisotypeif != ""){reportData.setFieldsList2(CtparameterarrayList);}
				    	
						reportData.setReportFilePath("/file/jasper/TempletmillingReport4Toolholder.jasper");
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
						String	name;
						String	nominaldiameter;
						String	interferencedepth;
						String  noseradius;
						String  sapcodeoftoolholder;
						String shujuyuanlujing3;
						
						String path = request.getSession().getServletContext().getRealPath("");
							String figure2lujing = (String) g4Reader.queryForObject("Templetmilling.queryfigure2blade", pdto);
							  String  str1=figure2lujing.replace("/", "\\");
								 shujuyuanlujing3=path+str1;
								 
						String workpieceisotypeif = pdto.getAsString("workpieceisotype");
						
						name = pdto.getAsString("name");
						nominaldiameter = pdto.getAsString("nominaldiameter");
						interferencedepth = pdto.getAsString("interferencedepth");
						noseradius = pdto.getAsString("noseradius");
						sapcodeoftoolholder = pdto.getAsString("sapcodeoftoolholder");
						if(workpieceisotypeif == ""){workpieceisotype= "";}else{workpieceisotype = (String) g4Reader.queryForObject("Templetmilling.querycailiaonanme2", pdto);}
				
						dto.put("reportTitle", reportTitle);
						dto.put("workpieceisotype", workpieceisotype);
						dto.put("name", name);
						dto.put("nominaldiameter", nominaldiameter);
						dto.put("interferencedepth", interferencedepth);
						dto.put("noseradius", noseradius);
						dto.put("sapcodeoftoolholder", sapcodeoftoolholder);
					
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
						
						
						List arrayList = g4Reader.queryForList("Templetmilling.queryMilling_blade_clamp4Manage", pdto);
						List saparrayList = g4Reader.queryForList("Generalturning.querySapinformation", pdto);
						List CtparameterarrayList = g4Reader.queryForList("Templetmilling.queryParameter", pdto);
					
						ReportData reportData = new ReportData();
						reportData.setParametersDto(dto);
						reportData.setFieldsList(arrayList);
						reportData.setFieldsList1(saparrayList);
						if(workpieceisotypeif != ""){reportData.setFieldsList2(CtparameterarrayList);}
				    	
						reportData.setReportFilePath("/file/jasper/TempletmillingReport4Blade.jasper");
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
						String	name;
						String	nominaldiameter;
						String	noseradius;
						String  celength;
						String  coneangle;
						String shujuyuanlujing3;
						
						String path = request.getSession().getServletContext().getRealPath("");
							String figure2lujing = (String) g4Reader.queryForObject("Templetmilling.queryfigure2integer", pdto);
							  String  str1=figure2lujing.replace("/", "\\");
								 shujuyuanlujing3=path+str1;
								 
						String workpieceisotypeif = pdto.getAsString("workpieceisotype");
						
						name = pdto.getAsString("name");
						nominaldiameter = pdto.getAsString("nominaldiameter");
						noseradius = pdto.getAsString("noseradius");
						celength = pdto.getAsString("celength");
						coneangle = pdto.getAsString("coneangle");
						if(workpieceisotypeif == ""){workpieceisotype= "";}else{workpieceisotype = (String) g4Reader.queryForObject("Templetmilling.querycailiaonanme3", pdto);}
				
						dto.put("reportTitle", reportTitle);
						dto.put("workpieceisotype", workpieceisotype);
						dto.put("name", name);
						dto.put("nominaldiameter", nominaldiameter);
						dto.put("noseradius", noseradius);
						dto.put("celength", celength);
						dto.put("coneangle", coneangle);
						
					
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
						
						
						List arrayList = g4Reader.queryForList("Templetmilling.queryMilling_toolholder_integral4Manage", pdto);
						List saparrayList = g4Reader.queryForList("Generalturning.querySapinformation", pdto);
						List CtparameterarrayList = g4Reader.queryForList("Templetmilling.queryIntegralParameter", pdto);
					
						ReportData reportData = new ReportData();
						reportData.setParametersDto(dto);
						reportData.setFieldsList(arrayList);
						reportData.setFieldsList1(saparrayList);
						if(workpieceisotypeif != ""){reportData.setFieldsList2(CtparameterarrayList);}
				    	
						reportData.setReportFilePath("/file/jasper/TempletmillingReport4Integer.jasper");
						getSessionContainer(request).setReportData("generalturning", reportData);
						return mapping.findForward(null);
					}

}
