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
 * 方肩铣
 * 
 * @author XianwuFu
 * @since 2013-01-01
 * @see BizAction
 */
public class ShouldermillingAction extends BizAction {
	
	private String reportTitle = "方肩铣机夹式刀具";
	/**
	 * 方肩铣
	 * 
	 * @param
	 * @return
	 */
	public ActionForward init(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_SHOULDERMILLING_MILLING_TOOLHOLDER_INTEGRAL"); // 修正分页传参
																													// -
																													// 1
																													// /
																													// 5
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_SHOULDERMILLING_MILLING_TOOLHOLDER_CLAMP");
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_SHOULDERMILLING_MILLING_BLADE_CLAMP");
		return mapping.findForward("shouldermillingView");
	}

	/**
	 * 查询整体式铣刀
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public ActionForward queryMilling_toolholder_integral4Manage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		// 修正分页传参 - 2 / 5
		Dto dto_page = (BaseDto) super.getSessionAttribute(request, "PAGE_PARAMETER_DTO_SHOULDERMILLING_MILLING_TOOLHOLDER_INTEGRAL");
		if (Utils.isNotEmpty(dto_page) && Utils.isNotEmpty(dto)) {
			dto = WebUtils.getDtoDataFromFirst2Second(dto, dto_page);
		}

		// 修正分页传参 - 3 / 5
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_SHOULDERMILLING_MILLING_TOOLHOLDER_INTEGRAL");
		super.setSessionAttribute(request, "PAGE_PARAMETER_DTO_SHOULDERMILLING_MILLING_TOOLHOLDER_INTEGRAL", dto);

		List milling_toolholder_integralList = g4Reader.queryForPage("Shouldermilling.queryMilling_toolholder_integral4Manage", dto);
		Integer totalInteger = (Integer) g4Reader.queryForObject("Shouldermilling.queryMilling_toolholder_integral4Manage4PageCount", dto);
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
	 */
	// 工件材料
	@SuppressWarnings("rawtypes")
	public ActionForward queryWorkpiecematerial(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List list = g4Reader.queryForList("Shouldermilling.queryWorkpiecematerial", dto);
		String jsonString = JsonHelper.encodeList2PageJson(list, list.size(), null);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 查询加工方法
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	/*
	 * @SuppressWarnings("rawtypes") public ActionForward
	 * queryPromethod4Milling_toolholder_integral(ActionMapping mapping,
	 * ActionForm form, HttpServletRequest request, HttpServletResponse
	 * response) throws Exception { CommonActionForm aForm = (CommonActionForm)
	 * form; Dto dto = aForm.getParamAsDto(request); List list =
	 * g4Reader.queryForList
	 * ("Shouldermilling.queryPromethod4Milling_toolholder_integral", dto);
	 * String jsonString = JsonHelper.encodeList2PageJson(list, list.size(),
	 * null); super.write(jsonString, response); return
	 * mapping.findForward(null); }
	 */

	/*
	 * 加工精度
	 */
	/*
	 * @SuppressWarnings("rawtypes") public ActionForward
	 * queryAccuracy4Milling_toolholder_integral(ActionMapping mapping,
	 * ActionForm form, HttpServletRequest request, HttpServletResponse
	 * response) throws Exception { CommonActionForm aForm = (CommonActionForm)
	 * form; Dto dto = aForm.getParamAsDto(request); List areaList =
	 * g4Reader.queryForList
	 * ("Shouldermilling.queryAccuracy4Milling_toolholder_integral", dto);
	 * String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
	 * write(jsonString, response); return mapping.findForward(null); }
	 */

	// 公称直径
	@SuppressWarnings("rawtypes")
	public ActionForward queryNominaldiameterInMilling_toolholder_integral(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForList("Shouldermilling.queryNominaldiameterInMilling_toolholder_integral", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 刃长
	@SuppressWarnings("rawtypes")
	public ActionForward queryCelengthInMilling_toolholder_integral(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForList("Shouldermilling.queryCelengthInMilling_toolholder_integral", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 刀尖圆角半径
	@SuppressWarnings("rawtypes")
	public ActionForward queryNoseradiusInMilling_toolholder_integral(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		List areaList = g4Reader.queryForList("Shouldermilling.queryNoseradiusInMilling_toolholder_integral", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 刀片尺寸
	/*
	 * @SuppressWarnings("rawtypes") public ActionForward
	 * queryCelengthInBlade(ActionMapping mapping, ActionForm form,
	 * HttpServletRequest request, HttpServletResponse response) throws
	 * Exception { CommonActionForm aForm = (CommonActionForm) form; Dto dto =
	 * aForm.getParamAsDto(request);
	 * 
	 * List areaList =
	 * g4Reader.queryForList("Shouldermilling.queryCelengthInBlade", dto);
	 * String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
	 * write(jsonString, response); return mapping.findForward(null); }
	 */

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
		Dto dto_page = (BaseDto) super.getSessionAttribute(request, "PAGE_PARAMETER_DTO_SHOULDERMILLING_MILLING_TOOLHOLDER_CLAMP");
		if (Utils.isNotEmpty(dto_page) && Utils.isNotEmpty(dto)) {
			dto = WebUtils.getDtoDataFromFirst2Second(dto, dto_page);
		}

		String featurecode = dto.getAsString("featurecode");
		if (featurecode.isEmpty() != true) {
			List featurecodeList = java.util.Arrays.asList(featurecode.split(","));
			dto.put("featurecode", featurecodeList);
		}

		// 修正分页传参 - 5 / 5
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_SHOULDERMILLING_MILLING_TOOLHOLDER_CLAMP");
		super.setSessionAttribute(request, "PAGE_PARAMETER_DTO_SHOULDERMILLING_MILLING_TOOLHOLDER_CLAMP", dto);

		List milling_toolholder_clampList = g4Reader.queryForPage("Shouldermilling.queryMilling_toolholder_clamp4Manage", dto);
		Integer totalInteger = (Integer) g4Reader.queryForObject("Shouldermilling.queryMilling_toolholder_clamp4Manage4PageCount", dto);
		String jsonString = JsonHelper.encodeList2PageJson(milling_toolholder_clampList, totalInteger, null);
		write(jsonString, response);
		dto.put("featurecode", null);
		return mapping.findForward(null);
	}

	// 公称直径
	@SuppressWarnings("rawtypes")
	public ActionForward queryNominaldiameterInMilling_toolholder_clamp(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		List areaList = g4Reader.queryForPage("Shouldermilling.queryNominaldiameterInMilling_toolholder_clamp", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 切削深度
	@SuppressWarnings("rawtypes")
	public ActionForward queryInterferencedepthInMilling_toolholder_clamp(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForPage("Shouldermilling.queryInterferencedepthInMilling_toolholder_clamp", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 刀尖圆角半径
	@SuppressWarnings("rawtypes")
	public ActionForward queryNoseradiusInMilling_toolholder_clamp(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForPage("Shouldermilling.queryNoseradiusInMilling_toolholder_clamp", dto);
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
	 * List areaList = g4Reader.queryForPage(
	 * "Shouldermilling.queryCseriesInMilling_toolholder_clamp", dto); String
	 * jsonString = encodeList2PageJson(areaList, areaList.size(), null);
	 * write(jsonString, response); return mapping.findForward(null); }
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
		Dto dto_page = (BaseDto) super.getSessionAttribute(request, "PAGE_PARAMETER_DTO_SHOULDERMILLING_MILLING_BLADE_CLAMP");
		if (Utils.isNotEmpty(dto_page) && Utils.isNotEmpty(dto)) {
			dto = WebUtils.getDtoDataFromFirst2Second(dto, dto_page);
		}

		String featurecode = dto.getAsString("featurecode");
		if (featurecode.isEmpty() != true) {
			List featurecodeList = java.util.Arrays.asList(featurecode.split(","));
			dto.put("featurecode", featurecodeList);
		}

		// 修正分页传参 - 5 / 5
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_SHOULDERMILLING_MILLING_BLADE_CLAMP");
		super.setSessionAttribute(request, "PAGE_PARAMETER_DTO_SHOULDERMILLING_MILLING_BLADE_CLAMP", dto);

		List milling_blade_clampList = g4Reader.queryForList("Shouldermilling.queryMilling_blade_clamp4Manage", dto);
		// Integer totalInteger = (Integer)
		// g4Reader.queryForObject("Shouldermilling.queryMilling_blade_clamp4Manage4PageCount",
		// dto);
		String jsonString = JsonHelper.encodeList2PageJson(milling_blade_clampList, milling_blade_clampList.size(), null);
		write(jsonString, response);
		dto.put("featurecode", null);
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
	 */
	/*
	 * @SuppressWarnings("rawtypes") public ActionForward
	 * queryWorkpiecematerial(ActionMapping mapping, ActionForm form,
	 * HttpServletRequest request, HttpServletResponse response) throws
	 * Exception { CommonActionForm aForm = (CommonActionForm) form; Dto dto =
	 * aForm.getParamAsDto(request); List list =
	 * g4Reader.queryForList("Shouldermilling.queryWorkpiecematerial", dto);
	 * String jsonString = JsonHelper.encodeList2PageJson(list, list.size(),
	 * null); super.write(jsonString, response); return
	 * mapping.findForward(null); }
	 */
	/*
	 * // 工件材料
	 * 
	 * @SuppressWarnings("rawtypes") public ActionForward
	 * queryWorkpiecematerialInMilling_blade_clamp(ActionMapping mapping,
	 * ActionForm form, HttpServletRequest request, HttpServletResponse
	 * response) throws Exception { CommonActionForm aForm = (CommonActionForm)
	 * form; Dto dto = aForm.getParamAsDto(request);
	 * 
	 * List areaList = g4Reader.queryForPage(
	 * "Shouldermilling.queryWorkpiecematerialInMilling_blade_clamp", dto);
	 * String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
	 * write(jsonString, response); return mapping.findForward(null); }
	 */
	// 工件材料
	@SuppressWarnings("rawtypes")
	public ActionForward queryWorkpiecematerialInMilling_blade_clamp(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		List areaList = g4Reader.queryForPage("Shouldermilling.queryWorkpiecematerialInMilling_blade_clamp", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 刀尖圆角半径
	@SuppressWarnings("rawtypes")
	public ActionForward queryNoseradiusInMilling_blade_clamp(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForPage("Shouldermilling.queryNoseradiusInMilling_blade_clamp", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 切削参数

	public ActionForward queryParameter(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		List parameterList = g4Reader.queryForList("Shouldermilling.queryParameter", dto);

		String jsonString = encodeList2PageJson(parameterList, parameterList.size(), null);

		write(jsonString, response);

		return mapping.findForward(null);
	}

	// 整体式切削参数
	public ActionForward queryIntegralParameter(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		// Dto ParameterDto;
		// ParameterDto =
		// (BaseDto)g4Reader.queryForObject("Groovemilling.queryParameter",
		// dto);

		/*
		 * if (Utils.isEmpty(ParameterDto)){ ParameterDto = new BaseDto(); }
		 */
		List parameterList = g4Reader.queryForList("Shouldermilling.queryIntegralParameter", dto);

		String jsonString = encodeList2PageJson(parameterList, parameterList.size(), null);

		write(jsonString, response);
		// ctparameterDto.put("注意事项", "注意事项——test");
		// write(ParameterDto.toJson(), response);
		return mapping.findForward(null);
	}
	
	// 机夹刀体名称
		@SuppressWarnings("rawtypes")
		public ActionForward queryNameInMilling_toolholder_clamp(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
			CommonActionForm aForm = (CommonActionForm) form;
			Dto dto = aForm.getParamAsDto(request);

			List areaList = g4Reader.queryForPage("Shouldermilling.queryNameInMilling_toolholder_clamp", dto);
			String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
			write(jsonString, response);
			return mapping.findForward(null);
		}
		
	// 整体式刀体名称
				@SuppressWarnings("rawtypes")
				public ActionForward queryNameInMilling_toolholder_integral(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
					CommonActionForm aForm = (CommonActionForm) form;
					Dto dto = aForm.getParamAsDto(request);

					List areaList = g4Reader.queryForPage("Shouldermilling.queryNameInMilling_toolholder_integral", dto);
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
					String	celength;
					String  noseradius;
					String shujuyuanlujing3;
					
					String path = request.getSession().getServletContext().getRealPath("");
						String figure2lujing = (String) g4Reader.queryForObject("Shouldermilling.queryfigure2integer", pdto);
						  String  str1=figure2lujing.replace("/", "\\");
							 shujuyuanlujing3=path+str1;
							 
					String workpieceisotypeif = pdto.getAsString("workpieceisotype");
					
					name = pdto.getAsString("name");
					nominaldiameter = pdto.getAsString("nominaldiameter");
					celength = pdto.getAsString("celength");
					noseradius = pdto.getAsString("noseradius");
					if(workpieceisotypeif == ""){workpieceisotype= "";}else{workpieceisotype = (String) g4Reader.queryForObject("Shouldermilling.querycailiaonanme", pdto);}
			
					dto.put("reportTitle", reportTitle);
					dto.put("workpieceisotype", workpieceisotype);
					dto.put("name", name);
					dto.put("nominaldiameter", nominaldiameter);
					dto.put("celength", celength);
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
					
					
					
					List arrayList = g4Reader.queryForList("Shouldermilling.queryMilling_toolholder_integral4Manage", pdto);
					List saparrayList = g4Reader.queryForList("Generalturning.querySapinformation", pdto);
					List CtparameterarrayList = g4Reader.queryForList("Shouldermilling.queryIntegralParameter", pdto);
				
					ReportData reportData = new ReportData();
					reportData.setParametersDto(dto);
					reportData.setFieldsList(arrayList);
					reportData.setFieldsList1(saparrayList);
					if(workpieceisotypeif != ""){reportData.setFieldsList2(CtparameterarrayList);}
			    	
					reportData.setReportFilePath("/file/jasper/ShouldermillingReport4integal.jasper");
					getSessionContainer(request).setReportData("generalturning", reportData);
					return mapping.findForward(null);
				}
				//报表打印
				@SuppressWarnings({ "unchecked", "rawtypes" })
				public ActionForward printTask1(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
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
						String figure2lujing = (String) g4Reader.queryForObject("Shouldermilling.queryfigure2toolholder", pdto);
						  String  str1=figure2lujing.replace("/", "\\");
							 shujuyuanlujing3=path+str1;
							 
					String workpieceisotypeif = pdto.getAsString("workpieceisotype");
					
					name = pdto.getAsString("name");
					nominaldiameter = pdto.getAsString("nominaldiameter");
					interferencedepth = pdto.getAsString("interferencedepth");
					noseradius = pdto.getAsString("noseradius");
					
					if(workpieceisotypeif == ""){workpieceisotype= "";}else{workpieceisotype = (String) g4Reader.queryForObject("Shouldermilling.querycailiaonanme2", pdto);}
			
					dto.put("reportTitle", reportTitle);
					dto.put("workpieceisotype", workpieceisotype);
					dto.put("name", name);
					dto.put("nominaldiameter", nominaldiameter);
					dto.put("celength", interferencedepth);
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
					
					List arrayList = g4Reader.queryForList("Shouldermilling.queryMilling_toolholder_clamp4Manage", pdto);
					List saparrayList = g4Reader.queryForList("Generalturning.querySapinformation", pdto);
					//List CtparameterarrayList = g4Reader.queryForList("Cut.queryCtparameter", pdto);
				
					ReportData reportData = new ReportData();
					reportData.setParametersDto(dto);
					reportData.setFieldsList(arrayList);
					reportData.setFieldsList1(saparrayList);
					//if(workpieceisotypeif != ""){reportData.setFieldsList2(CtparameterarrayList);}
			    	
					reportData.setReportFilePath("/file/jasper/ShouldermillingReport4Toolholder.jasper");
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
						String figure2lujing = (String) g4Reader.queryForObject("Shouldermilling.queryfigure2blade", pdto);
						  String  str1=figure2lujing.replace("/", "\\");
							 shujuyuanlujing3=path+str1;
							 
					String workpieceisotypeif = pdto.getAsString("workpieceisotype");
					
					name = pdto.getAsString("name");
					nominaldiameter = pdto.getAsString("nominaldiameter");
					interferencedepth = pdto.getAsString("interferencedepth");
					noseradius = pdto.getAsString("noseradius");
					sapcodeoftoolholder = pdto.getAsString("sapcodeoftoolholder");
					if(sapcodeoftoolholder == ""){}else{dto.put("sapcodeoftoolholder", sapcodeoftoolholder);}
					
					
					
					
					
					
					if(workpieceisotypeif == ""){workpieceisotype= "";}else{workpieceisotype = (String) g4Reader.queryForObject("Shouldermilling.querycailiaonanme3", pdto);}
			
					
					
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
					
					List arrayList = g4Reader.queryForList("Shouldermilling.queryMilling_blade_clamp4Manage", pdto);
					List saparrayList = g4Reader.queryForList("Generalturning.querySapinformation", pdto);
					List CtparameterarrayList = g4Reader.queryForList("Shouldermilling.queryParameter", pdto);
				
					ReportData reportData = new ReportData();
					reportData.setParametersDto(dto);
					reportData.setFieldsList(arrayList);
					reportData.setFieldsList1(saparrayList);
					if(workpieceisotypeif != ""){reportData.setFieldsList2(CtparameterarrayList);}
			    	
					reportData.setReportFilePath("/file/jasper/ShouldermillingReport4Blade.jasper");
					getSessionContainer(request).setReportData("generalturning", reportData);
					return mapping.findForward(null);
				}
}
