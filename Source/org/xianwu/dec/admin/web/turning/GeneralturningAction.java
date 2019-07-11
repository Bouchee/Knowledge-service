package org.xianwu.dec.admin.web.turning;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.chain.web.WebContext;
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
 * 普通车削
 * 
 * @author XianwuFu
 * @since 2013-01-01
 * @see BizAction
 */
public class GeneralturningAction extends BizAction {
	/**
	 * 普通车削
	 * 
	 * @param
	 * @return
	 */
	
	private String reportTitle = "普通车削刀片";
	
	public ActionForward init(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_GENERALTURNING_BLADE"); // 修正分页传参																				// 5
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_GENERALTURNING_TOOLHOLDER");
		
		return mapping.findForward("generalturningView");
	}

	/**
	 * 查询刀片
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public ActionForward queryBlade4Manage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		// 修正分页传参 - 2 / 5
		Dto dto_page = (BaseDto) super.getSessionAttribute(request, "PAGE_PARAMETER_DTO_GENERALTURNING_BLADE");
		if (Utils.isNotEmpty(dto_page) && Utils.isNotEmpty(dto)) {
			dto = WebUtils.getDtoDataFromFirst2Second(dto, dto_page);
		}

		String featurecode = dto.getAsString("featurecode");
		if (featurecode.isEmpty() != true) {
			List featurecodeList = java.util.Arrays.asList(featurecode.split(","));
			dto.put("featurecode", featurecodeList);
		}

		// 修正分页传参 - 3 / 5
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_GENERALTURNING_BLADE");
		super.setSessionAttribute(request, "PAGE_PARAMETER_DTO_GENERALTURNING_BLADE", dto);

		List bladeList = g4Reader.queryForPage("Generalturning.queryBlade4Manage", dto);
		Integer totalInteger = (Integer) g4Reader.queryForObject("Generalturning.queryBlade4Manage4PageCount", dto);
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
		List list = g4Reader.queryForList("Generalturning.queryWorkpiecematerial", dto);
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
	@SuppressWarnings("rawtypes")
	public ActionForward queryPromethod4Blade(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List list = g4Reader.queryForList("Generalturning.queryPromethod4Blade", dto);
		String jsonString = JsonHelper.encodeList2PageJson(list, list.size(), null);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}

	/*
	 * 加工精度
	 */
	@SuppressWarnings("rawtypes")
	public ActionForward queryAccuracy4Blade(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForList("Generalturning.queryAccuracy4Blade", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	
	// 查询品牌
			@SuppressWarnings("rawtypes")
			public ActionForward querybrand(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
				CommonActionForm aForm = (CommonActionForm) form;
				Dto dto = aForm.getParamAsDto(request);
				List areaList = g4Reader.queryForList("Generalturning.querybrand", dto);
				String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
				write(jsonString, response);
				return mapping.findForward(null);
			}	
	// 查询材质
						@SuppressWarnings("rawtypes")
						public ActionForward querymaterail(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
							CommonActionForm aForm = (CommonActionForm) form;
							Dto dto = aForm.getParamAsDto(request);
							List areaList = g4Reader.queryForList("Generalturning.querymaterail", dto);
							String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
							write(jsonString, response);
							return mapping.findForward(null);
						}	
			
	// 查询槽型
						@SuppressWarnings("rawtypes")
						public ActionForward querygroove(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
							CommonActionForm aForm = (CommonActionForm) form;
							Dto dto = aForm.getParamAsDto(request);
							List areaList = g4Reader.queryForList("Generalturning.querygroove", dto);
							String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
							write(jsonString, response);
							return mapping.findForward(null);
						}	
			
	// 刀片形状
	@SuppressWarnings("rawtypes")
	public ActionForward queryShapeInBlade(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForList("Generalturning.queryShapeInBlade", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 刀片后角
	@SuppressWarnings("rawtypes")
	public ActionForward queryReliefangleInBlade(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		List areaList = g4Reader.queryForList("Generalturning.queryReliefangleInBlade", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 刀片尺寸
	@SuppressWarnings("rawtypes")
	public ActionForward queryCelengthInBlade(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
	
		List areaList = g4Reader.queryForList("Generalturning.queryCelengthInBlade", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 刀尖圆弧半径
	@SuppressWarnings("rawtypes")
	public ActionForward queryNoseradiusInBlade(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		List areaList = g4Reader.queryForList("Generalturning.queryNoseradiusInBlade", dto);
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
	public ActionForward queryToolholder4Manage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		// 修正分页传参 - 4 / 5
		Dto dto_page = (BaseDto) super.getSessionAttribute(request, "PAGE_PARAMETER_DTO_GENERALTURNING_TOOLHOLDER");
		if (Utils.isNotEmpty(dto_page) && Utils.isNotEmpty(dto)) {
			dto = WebUtils.getDtoDataFromFirst2Second(dto, dto_page);
		}

		String featurecode = dto.getAsString("featurecode");
		if (featurecode.isEmpty() != true) {
			List featurecodeList = java.util.Arrays.asList(featurecode.split(","));
			dto.put("featurecode", featurecodeList);
		}

		// 修正分页传参 - 5 / 5
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_GENERALTURNING_TOOLHOLDER");
		super.setSessionAttribute(request, "PAGE_PARAMETER_DTO_GENERALTURNING_TOOLHOLDER", dto);

		List toolholderList = g4Reader.queryForPage("Generalturning.queryToolholder4Manage", dto);
		Integer totalInteger = (Integer) g4Reader.queryForObject("Generalturning.queryToolholder4Manage4PageCount", dto);
		String jsonString = JsonHelper.encodeList2PageJson(toolholderList, totalInteger, null);
		write(jsonString, response);
		dto.put("featurecode", null);
		return mapping.findForward(null);
	}

	// 刀具形式
	@SuppressWarnings("rawtypes")
	public ActionForward queryThheadangleInToolholder(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		List areaList = g4Reader.queryForList("Generalturning.queryThheadangleInToolholder", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 刀具方向
	@SuppressWarnings("rawtypes")
	public ActionForward queryHandoftoolInToolholder(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForPage("Generalturning.queryHandoftoolInToolholder", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	
	// 刀片形状
		@SuppressWarnings("rawtypes")
		public ActionForward queryShapeInToolholder(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
			CommonActionForm aForm = (CommonActionForm) form;
			Dto dto = aForm.getParamAsDto(request);
			List areaList = g4Reader.queryForList("Generalturning.queryShapeInToolholder", dto);
			String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
			write(jsonString, response);
			return mapping.findForward(null);
		}
		
		// 刀片后角
		@SuppressWarnings("rawtypes")
		public ActionForward queryReliefangleInToolholder(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
			CommonActionForm aForm = (CommonActionForm) form;
			Dto dto = aForm.getParamAsDto(request);
			List areaList = g4Reader.queryForList("Generalturning.queryReliefangleInToolholder", dto);
			String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
			write(jsonString, response);
			return mapping.findForward(null);
		}
	
		// 接口规格
	@SuppressWarnings("rawtypes")
	public ActionForward queryPortsizeInToolholder(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForPage("Generalturning.queryPortsizeInToolholder", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 刀片夹紧方式
	@SuppressWarnings("rawtypes")
	public ActionForward queryCseriesInToolholder(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		List areaList = g4Reader.queryForPage("Generalturning.queryCseriesInToolholder", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	// 镗孔直径
		@SuppressWarnings("rawtypes")
		public ActionForward queryBoreInToolholder(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
			CommonActionForm aForm = (CommonActionForm) form;
			Dto dto = aForm.getParamAsDto(request);

			List areaList = g4Reader.queryForPage("Generalturning.queryBoreInToolholder", dto);
			String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
			write(jsonString, response);
			return mapping.findForward(null);
		}
		
	// 切削参数
	@SuppressWarnings("rawtypes")
	public ActionForward queryCtparameter(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		
		/*List ctparameterList = g4Reader.queryForList("Generalturning.queryCtparameter", dto);
		String jsonString = encodeList2PageJson(ctparameterList, ctparameterList.size(), null);
		write(jsonString, response);*/
		
	/*	Dto ctparameterDto;
		ctparameterDto = (BaseDto)g4Reader.queryForObject("Generalturning.queryCtparameter", dto);
		
		if (Utils.isEmpty(ctparameterDto)){
			ctparameterDto = new BaseDto();
		}
		
		// ctparameterDto.put("注意事项", "注意事项——test");
		write(ctparameterDto.toJson(), response);
		return mapping.findForward(null);
		*/
		List ctparameterList = g4Reader.queryForList("Generalturning.queryCtparameter", dto);
		String jsonString = encodeList2PageJson(ctparameterList, ctparameterList.size(), null);
		write(jsonString, response);
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
		
	
		List sapinformationList = g4Reader.queryForList("Generalturning.querySapinformation", dto);
		String jsonString = encodeList2PageJson(sapinformationList, sapinformationList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	
	}
	/**
	 * 查询车削类型
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public ActionForward queryturningtypeInToolholder(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		
		/*List ctparameterList = g4Reader.queryForList("Generalturning.queryCtparameter", dto);
		String jsonString = encodeList2PageJson(ctparameterList, ctparameterList.size(), null);
		write(jsonString, response);*/
		
	
		List sapinformationList = g4Reader.queryForList("Generalturning.queryturningtypeInToolholder", dto);
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
			String accuracyid;
			String workpieceisotype;
			String shujuyuanlujing3;
			String celength;
			String heattreat;
			String noseradius;
			
			// dto.put("jbr",
			// getSessionContainer(request).getUserInfo().getUsername());
			// dto.put("jbsj", Utils.getCurrentTime());
			//Dto inDto = (BaseDto) getSessionAttribute(request, "QUERYCATALOGS4PRINT_QUERYDTO");
			String path = request.getSession().getServletContext().getRealPath("");
				String figure2lujing = (String) g4Reader.queryForObject("Generalturning.queryfigure2", pdto);
				  String  str1=figure2lujing.replace("/", "\\");
					 shujuyuanlujing3=path+str1;
					
			String b = pdto.getAsString("workpieceisotype");
			if(b == ""){
				workpieceisotype= "";
				heattreat= "";
			}else{
				workpieceisotype = (String) g4Reader.queryForObject("Generalturning.querycailiaonanme", pdto);
				heattreat = (String) g4Reader.queryForObject("Generalturning.queryheattreat", pdto);
			}
			
			String a = pdto.getAsString("accuracyid");
			if(a == ""){
				accuracyid= "";
			}else{
				accuracyid=(String) g4Reader.queryForObject("Generalturning.queryjiagongleixing", pdto);
			}
			
			String shape=pdto.getAsString("shape");
			String reliefangle=pdto.getAsString("reliefangle");
			String celengthif=pdto.getAsString("celength");
			if(celengthif == ""){
				celength= "";
			}else{
				celength = (String) g4Reader.queryForObject("Generalturning.querycelength", pdto);
			}
			
			String noseradiusif=pdto.getAsString("noseradius");
			if(noseradiusif == ""){
				noseradius= "";
			}else{
				noseradius = (String) g4Reader.queryForObject("Generalturning.querynoseradius", pdto);
			}
			//String sapcode=pdto.getAsString("sapcode2");
			dto.put("reportTitle", reportTitle);
			dto.put("workpieceisotype", workpieceisotype);
			dto.put("accuracyid", accuracyid);
			dto.put("shape", shape);
			dto.put("reliefangle", reliefangle);
			dto.put("celength", celength);
			dto.put("noseradius", noseradius);
			String SapreportPath=path+"\\file\\jasper\\";  
			/*String  str=pdto.getAsString("figure2");
				     String  str1=str.replace("/", "\\");
			String shujuyuanlujing3="E:\\wangchaoyu\\dec\\Root"+str1;*/
			/* "D:\\Users\\hp\\JaspersoftWorkspace\\MyReports\\" */;
			/*String SapreportPath="D:\\Workspaces\\MyEclipse 10\\dec\\Root\\file\\jasper\\";*/
	/*		String shujuyuanlujing3= "E:\\wangchaoyu\\dec\\Root\\dec\\image\\turning\\1.jpg";*/
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
			dto.put("heattreat", heattreat);
			// List arrayList = g4Reader.queryForList("Task.queryTask4Print",
			// inDto); 2013-04-25 02:25:50
			List arrayList = g4Reader.queryForList("Generalturning.queryBlade4Manage", pdto);
			List saparrayList = g4Reader.queryForList("Generalturning.querySapinformation", pdto);
			List CtparameterarrayList = g4Reader.queryForList("Generalturning.queryCtparameter", pdto);
			/*
			 * int toIndex = 80; if (catalogList.size() <=toIndex) { toIndex =
			 * catalogList.size() - 1; } List subList = arrayList.subList(0,
			 * toIndex); for (int i = 0; i < subList.size(); i++) { Dto dto2 =
			 * (BaseDto)subList.get(i); dto2.put("zfbl",
			 * dto2.getAsBigDecimal("zfbl")); }
			 */
			ReportData reportData = new ReportData();
			reportData.setParametersDto(dto);
			reportData.setFieldsList(arrayList);
			reportData.setFieldsList1(saparrayList);
			if(b != ""){reportData.setFieldsList2(CtparameterarrayList);}
		//	reportData.setFieldsList(saparrayList);
			reportData.setReportFilePath("/file/jasper/GeneralturningReport4blade.jasper");
			getSessionContainer(request).setReportData("generalturning", reportData);
			return mapping.findForward(null);
		}
		//报表打印
				@SuppressWarnings({ "unchecked", "rawtypes" })
				public ActionForward printTask2(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
					CommonActionForm aForm = (CommonActionForm) form;
					Dto pdto = aForm.getParamAsDto(request);
					Dto dto = new BaseDto();
					
					String shujuyuanlujing3;
					String turningtype;
					String thheadangle;
					String handoftool;
					String portsize;
					String cseries;
					String reliefangle;
					
					
					//判断combobox是否为空
					String turningtypeif = pdto.getAsString("turningtype");
					String thheadangleif = pdto.getAsString("thheadangle");
					String reliefangleif = pdto.getAsString("reliefangle");
					String portsizeif = pdto.getAsString("portsize");
					String cseriesif = pdto.getAsString("cseries");
					String handoftoolif = pdto.getAsString("handoftool");
					
					if(turningtypeif == ""){turningtype= "";}else{turningtype = (String) g4Reader.queryForObject("Generalturning.queryturningtypename", pdto);}
					if(thheadangleif == ""){thheadangle= "";}else{thheadangle = (String) g4Reader.queryForObject("Generalturning.querythheadanglename", pdto);}
					if(reliefangleif == ""){reliefangle= "";}else{reliefangle = (String) g4Reader.queryForObject("Generalturning.queryreliefanglename", pdto);}
					if(portsizeif == ""){portsize= "";}else{portsize = (String) g4Reader.queryForObject("Generalturning.queryportsizename", pdto);}
					if(cseriesif == ""){cseries= "";}else{  cseries = (String) g4Reader.queryForObject("Generalturning.querycseriesname", pdto);}
					if(handoftoolif == ""){handoftool= "";}else{handoftool = (String) g4Reader.queryForObject("Generalturning.queryhandoftoolname", pdto);}
					String shape=pdto.getAsString("shape");
					
					String path = request.getSession().getServletContext().getRealPath("");
					String figure2lujing = (String) g4Reader.queryForObject("Generalturning.queryfigure2toolholder", pdto);
						  String  str1=figure2lujing.replace("/", "\\");
							 shujuyuanlujing3=path+str1;
							
						
					dto.put("reportTitle", reportTitle);
					dto.put("turningtype", turningtype);
					dto.put("thheadangle", thheadangle);
					dto.put("handoftool", handoftool);
					dto.put("reliefangle", reliefangle);
					dto.put("shape", shape);
					dto.put("portsize", portsize);
					dto.put("cseries", cseries);
					
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
					
					List arrayList = g4Reader.queryForList("Generalturning.queryToolholder4Manage", pdto);
					List saparrayList = g4Reader.queryForList("Generalturning.querySapinformation", pdto);
				
					ReportData reportData = new ReportData();
					reportData.setParametersDto(dto);
					reportData.setFieldsList(arrayList);
					reportData.setFieldsList1(saparrayList);
				
				   
					reportData.setReportFilePath("/file/jasper/GeneralturningReport4Toolholder.jasper");
					getSessionContainer(request).setReportData("generalturning", reportData);
					return mapping.findForward(null);
				}
}
