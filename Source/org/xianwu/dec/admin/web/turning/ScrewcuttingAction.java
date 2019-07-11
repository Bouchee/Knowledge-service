package org.xianwu.dec.admin.web.turning;

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
 * 螺纹车削
 * 
 * @author XianwuFu
 * @since 2013-01-01
 * @see BizAction
 */
public class ScrewcuttingAction extends BizAction {
	
	private String reportTitle = "螺纹车削刀片";
	/**
	 * 螺纹车削
	 * 
	 * @param
	 * @return
	 */
	public ActionForward init(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_SCREWCUTTING_THREADBLADE"); // 修正分页传参
																								// -
																								// 1
																								// /
																								// 5
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_SCREWCUTTING_THREADTOOLHOLDER");
		return mapping.findForward("screwcuttingView");
	}

	/**
	 * 查询刀片
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public ActionForward queryThreadblade4Manage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		// 修正分页传参 - 2 / 5
		Dto dto_page = (BaseDto) super.getSessionAttribute(request, "PAGE_PARAMETER_DTO_SCREWCUTTING_THREADBLADE");
		if (Utils.isNotEmpty(dto_page) && Utils.isNotEmpty(dto)) {
			dto = WebUtils.getDtoDataFromFirst2Second(dto, dto_page);
		}

		String featurecode = dto.getAsString("featurecode");
		if (featurecode.isEmpty() != true) {
			List featurecodeList = java.util.Arrays.asList(featurecode.split(","));
			dto.put("featurecode", featurecodeList);
		}

		// 修正分页传参 - 3 / 5
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_SCREWCUTTING_THREADBLADE");
		super.setSessionAttribute(request, "PAGE_PARAMETER_DTO_SCREWCUTTING_THREADBLADE", dto);

		List bladeList = g4Reader.queryForPage("Screwcutting.queryThreadblade4Manage", dto);
		Integer totalInteger = (Integer) g4Reader.queryForObject("Screwcutting.queryThreadblade4Manage4PageCount", dto);
		String jsonString = JsonHelper.encodeList2PageJson(bladeList, totalInteger, null);
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
	@SuppressWarnings("rawtypes")
	public ActionForward queryWorkpiecematerial(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List list = g4Reader.queryForList("Screwcutting.queryWorkpiecematerial", dto);
		String jsonString = JsonHelper.encodeList2PageJson(list, list.size(), null);
		super.write(jsonString, response);
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
	 * g4Reader.queryForList("Screwcutting.queryWorkpiecematerial", dto); String
	 * jsonString = JsonHelper.encodeList2PageJson(list, list.size(), null);
	 * super.write(jsonString, response); return mapping.findForward(null); }
	 * 
	 * // 刀片形状
	 * 
	 * @SuppressWarnings("rawtypes") public ActionForward
	 * queryShapeInBlade(ActionMapping mapping, ActionForm form,
	 * HttpServletRequest request, HttpServletResponse response) throws
	 * Exception { CommonActionForm aForm = (CommonActionForm) form; Dto dto =
	 * aForm.getParamAsDto(request); List areaList =
	 * g4Reader.queryForList("Screwcutting.queryShapeInBlade", dto); String
	 * jsonString = encodeList2PageJson(areaList, areaList.size(), null);
	 * write(jsonString, response); return mapping.findForward(null); }
	 * 
	 * // 刀片后角
	 * 
	 * @SuppressWarnings("rawtypes") public ActionForward
	 * queryReliefangleInBlade(ActionMapping mapping, ActionForm form,
	 * HttpServletRequest request, HttpServletResponse response) throws
	 * Exception { CommonActionForm aForm = (CommonActionForm) form; Dto dto =
	 * aForm.getParamAsDto(request);
	 * 
	 * List areaList =
	 * g4Reader.queryForList("Screwcutting.queryReliefangleInBlade", dto);
	 * String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
	 * write(jsonString, response); return mapping.findForward(null); }
	 * 
	 * // 刀片尺寸
	 * 
	 * @SuppressWarnings("rawtypes") public ActionForward
	 * queryCelengthInBlade(ActionMapping mapping, ActionForm form,
	 * HttpServletRequest request, HttpServletResponse response) throws
	 * Exception { CommonActionForm aForm = (CommonActionForm) form; Dto dto =
	 * aForm.getParamAsDto(request);
	 * 
	 * List areaList =
	 * g4Reader.queryForList("Screwcutting.queryCelengthInBlade", dto); String
	 * jsonString = encodeList2PageJson(areaList, areaList.size(), null);
	 * write(jsonString, response); return mapping.findForward(null); }
	 * 
	 * // 刀尖圆弧半径
	 * 
	 * @SuppressWarnings("rawtypes") public ActionForward
	 * queryNoseradiusInBlade(ActionMapping mapping, ActionForm form,
	 * HttpServletRequest request, HttpServletResponse response) throws
	 * Exception { CommonActionForm aForm = (CommonActionForm) form; Dto dto =
	 * aForm.getParamAsDto(request);
	 * 
	 * List areaList =
	 * g4Reader.queryForList("Screwcutting.queryNoseradiusInBlade", dto); String
	 * jsonString = encodeList2PageJson(areaList, areaList.size(), null);
	 * write(jsonString, response); return mapping.findForward(null); }
	 */
	/**
	 * 查询材质信息
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public ActionForward querythreadbladematerial(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		List areaList = g4Reader.queryForList("Screwcutting.querythreadbladematerial", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 查询螺纹类型
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public ActionForward queryThreaddirectionInThreadblade(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		List areaList = g4Reader.queryForList("Screwcutting.queryThreaddirectionInThreadblade", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	
	
	/**
	 * 查询螺纹类型
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public ActionForward queryThreadtypeInThreadblade(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		List areaList = g4Reader.queryForList("Screwcutting.queryThreadtypeInThreadblade", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 查询螺纹标准
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public ActionForward queryThreadstandardInThreadblade(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		List areaList = g4Reader.queryForPage("Screwcutting.queryThreadstandardInThreadblade", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	/**
	 * 查询刀片尺寸
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public ActionForward querybladesize2InThreadtoolholder(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		List areaList = g4Reader.queryForPage("Screwcutting.querybladesize2InThreadtoolholder", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 查询螺距
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public ActionForward queryPitchInThreadblade(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		List areaList = g4Reader.queryForPage("Screwcutting.queryPitchInThreadblade", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 查询螺纹类型
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public ActionForward queryThreadtype2InThreadtoolholder(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		List areaList = g4Reader.queryForPage("Screwcutting.queryThreadtype2InThreadtoolholder", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	/**
	 * 查询螺纹直径
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public ActionForward querydiameter2InThreadtoolholder(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		List areaList = g4Reader.queryForPage("Screwcutting.querydiameter2InThreadtoolholder", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	/**
	 * 查询刀片尺寸
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public ActionForward queryBladesizeInThreadblade(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		List areaList = g4Reader.queryForPage("Screwcutting.queryBladesizeInThreadblade", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 查询刀体
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public ActionForward queryThreadtoolholder4Manage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		// 修正分页传参 - 4 / 5
		Dto dto_page = (BaseDto) super.getSessionAttribute(request, "PAGE_PARAMETER_DTO_SCREWCUTTING_THREADTOOLHOLDER");
		if (Utils.isNotEmpty(dto_page) && Utils.isNotEmpty(dto)) {
			dto = WebUtils.getDtoDataFromFirst2Second(dto, dto_page);
		}

		String featurecode = dto.getAsString("featurecode");
		if (featurecode.isEmpty() != true) {
			List featurecodeList = java.util.Arrays.asList(featurecode.split(","));
			dto.put("featurecode", featurecodeList);
		}

		// 修正分页传参 - 5 / 5
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_SCREWCUTTING_THREADTOOLHOLDER");
		super.setSessionAttribute(request, "PAGE_PARAMETER_DTO_SCREWCUTTING_THREADTOOLHOLDER", dto);

		List toolholderList = g4Reader.queryForPage("Screwcutting.queryThreadtoolholder4Manage", dto);
		Integer totalInteger = (Integer) g4Reader.queryForObject("Screwcutting.queryThreadtoolholder4Manage4PageCount", dto);
		String jsonString = JsonHelper.encodeList2PageJson(toolholderList, totalInteger, null);
		write(jsonString, response);
		dto.put("featurecode", null);
		return mapping.findForward(null);
	}
	/**
	 * 查询进给方向
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public ActionForward querythreaddirection2InThreadtoolholder(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		List areaList = g4Reader.queryForPage("Screwcutting.querythreaddirection2InThreadtoolholder", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 查询螺纹类型
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public ActionForward queryThreadtypeInThreadtoolholder(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		List areaList = g4Reader.queryForPage("Screwcutting.queryThreadtypeInThreadtoolholder", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 查询螺纹直径
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public ActionForward queryDiameterInThreadtoolholder(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		List areaList = g4Reader.queryForPage("Screwcutting.queryDiameterInThreadtoolholder", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 查询接口规格
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public ActionForward queryportsizeInThreadtoolholder(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		List areaList = g4Reader.queryForPage("Screwcutting.queryportsizeInThreadtoolholder", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 切削参数
	@SuppressWarnings("rawtypes")
	public ActionForward queryCtparameter(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		
		/*List ctparameterList = g4Reader.queryForList("Screwcutting.queryCtparameter", dto);
		String jsonString = encodeList2PageJson(ctparameterList, ctparameterList.size(), null);
		write(jsonString, response);*/
		
		/*Dto ctparameterDto;
		ctparameterDto = (BaseDto)g4Reader.queryForObject("Screwcutting.queryCtparameter", dto);
		
		if (Utils.isEmpty(ctparameterDto)){
			ctparameterDto = new BaseDto();
		}
		
		// ctparameterDto.put("注意事项", "注意事项——test");
		write(ctparameterDto.toJson(), response);
		return mapping.findForward(null);*/
		
		List ctparameterList = g4Reader.queryForList("Screwcutting.queryCtparameter", dto);
		String jsonString = encodeList2PageJson(ctparameterList, ctparameterList.size(), null);
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
				String	threaddirection;
				String	threadtype;
				String	threadstandard;
				String shujuyuanlujing3;
				String bladesize;
				
				
				String path = request.getSession().getServletContext().getRealPath("");
					String figure2lujing = (String) g4Reader.queryForObject("Screwcutting.queryfigure2blade", pdto);
					  String  str1=figure2lujing.replace("/", "\\");
						 shujuyuanlujing3=path+str1;
						
				String workpieceisotypeif = pdto.getAsString("workpieceisotype");
				String threaddirectionif = pdto.getAsString("threaddirection");
				String threadtypeif = pdto.getAsString("threadtype");
				String threadstandardif = pdto.getAsString("threadstandard");
				String pitch = pdto.getAsString("pitch");
				String bladesizeif = pdto.getAsString("bladesize");
				String apmax = pdto.getAsString("apmax");
				String fnmax = pdto.getAsString("fnmax");
				if(workpieceisotypeif == ""){workpieceisotype= "";}else{workpieceisotype = (String) g4Reader.queryForObject("Screwcutting.querycailiaonanme", pdto);}
				if(threaddirectionif == ""){threaddirection= "";}else{threaddirection = (String) g4Reader.queryForObject("Screwcutting.queryjingeifangxiangnanme", pdto);}
				if(threadtypeif == ""){threadtype= "";}else{threadtype = (String) g4Reader.queryForObject("Screwcutting.queryluowenleixingnanme", pdto);}
				if(threadstandardif == ""){threadstandard= "";}else{threadstandard = (String) g4Reader.queryForObject("Screwcutting.queryluowenbiaozhunnanme", pdto);}
				if(bladesizeif == ""){bladesize= "";}else{bladesize = (String) g4Reader.queryForObject("Screwcutting.querybladesize", pdto);}
				
				
			
				
				
				dto.put("reportTitle", reportTitle);
				dto.put("workpieceisotype", workpieceisotype);
				dto.put("threaddirection", threaddirection);
				dto.put("threadtype", threadtype);
				dto.put("threadstandard", threadstandard);
				dto.put("pitch", pitch);
				dto.put("bladesize", bladesize);
				dto.put("apmax", apmax);
				dto.put("fnmax", fnmax);
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
				
				List arrayList = g4Reader.queryForList("Screwcutting.queryThreadblade4Manage", pdto);
				List saparrayList = g4Reader.queryForList("Generalturning.querySapinformation", pdto);
				List CtparameterarrayList = g4Reader.queryForList("Screwcutting.queryCtparameter", pdto);
			
				ReportData reportData = new ReportData();
				reportData.setParametersDto(dto);
				reportData.setFieldsList(arrayList);
				reportData.setFieldsList1(saparrayList);
				if(workpieceisotypeif != ""){reportData.setFieldsList2(CtparameterarrayList);}
		    	
				reportData.setReportFilePath("/file/jasper/ScrewcuttingReport4Blade.jasper");
				getSessionContainer(request).setReportData("generalturning", reportData);
				return mapping.findForward(null);
			}
	
			
			//报表打印
			@SuppressWarnings({ "unchecked", "rawtypes" })
			public ActionForward printTask2(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
				CommonActionForm aForm = (CommonActionForm) form;
				Dto pdto = aForm.getParamAsDto(request);
				Dto dto = new BaseDto();
				
				String threaddirection;
				String	threadtype;
				String	diameter;
				String	bladesize;
				String portsize;
				String shujuyuanlujing3;
				
				
				String path = request.getSession().getServletContext().getRealPath("");
					String figure2lujing = (String) g4Reader.queryForObject("Screwcutting.queryfigure2toolholder", pdto);
					  String  str1=figure2lujing.replace("/", "\\");
						 shujuyuanlujing3=path+str1;
						 
						 
				
				
				String threaddirectionif = pdto.getAsString("threaddirection");
				String threadtypeif = pdto.getAsString("threadtype");
				       diameter = pdto.getAsString("diameter");
				String bladesizeif = pdto.getAsString("bladesize");
				String portsizeif = pdto.getAsString("portsize");
				
				if(threaddirectionif == ""){threaddirection= "";}else{threaddirection = (String) g4Reader.queryForObject("Screwcutting.queryjingeifangxiang2nanme", pdto);}
				if(threadtypeif == ""){threadtype= "";}else{threadtype = (String) g4Reader.queryForObject("Screwcutting.queryluowenleixing2nanme", pdto);}
				if(bladesizeif == ""){bladesize= "";}else{bladesize = (String) g4Reader.queryForObject("Screwcutting.querydaopianchicun2nanme", pdto);}
				if(portsizeif == ""){portsize= "";}else{portsize = (String) g4Reader.queryForObject("Screwcutting.queryjiekouguige2nanme", pdto);}
				
				
			
				
				
				dto.put("reportTitle", reportTitle);
				dto.put("threaddirection", threaddirection);
				dto.put("threadtype", threadtype);
				dto.put("diameter", diameter);
				dto.put("bladesize", bladesize);
				dto.put("portsize", portsize);
				
				String SapreportPath=path+"\\file\\jasper\\";  
			
				
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
				
				List arrayList = g4Reader.queryForList("Screwcutting.queryThreadtoolholder4Manage", pdto);
				List saparrayList = g4Reader.queryForList("Generalturning.querySapinformation", pdto);
				
			
				ReportData reportData = new ReportData();
				reportData.setParametersDto(dto);
				reportData.setFieldsList(arrayList);
				reportData.setFieldsList1(saparrayList);
				
		    	
				reportData.setReportFilePath("/file/jasper/ScrewcuttingReport4toolholder.jasper");
				getSessionContainer(request).setReportData("generalturning", reportData);
				return mapping.findForward(null);
			}
}
