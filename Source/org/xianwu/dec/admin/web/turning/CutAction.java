package org.xianwu.dec.admin.web.turning;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.xianwu.core.mvc.xstruts.action.ActionForm;
import org.xianwu.core.mvc.xstruts.action.ActionForward;
import org.xianwu.core.util.Utils;
import org.xianwu.core.web.BizAction;
import org.xianwu.core.json.JsonHelper;
import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.mvc.xstruts.action.ActionMapping;
import org.xianwu.core.web.CommonActionForm;
import org.xianwu.core.web.report.jasper.ReportData;
import org.xianwu.core.web.util.WebUtils;

/**
 * 切断切槽
 * 
 * @author XianwuFu
 * @since 2013-01-01
 * @see BizAction
 */
public class CutAction extends BizAction {
	
	private String reportTitle = "切断切槽刀片";
	/**
	 * 切断切槽
	 * 
	 * @param
	 * @return
	 */
	public ActionForward init(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_CUT_CUTDLADE"); // 修正分页传参
																					// -
																					// 1
																					// /
																					// 5
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_CUT_CUTTOOLHOLDER");
		return mapping.findForward("cutView");
	}

	/**
	 * 查询刀片
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public ActionForward queryCutblade4Manage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		// 修正分页传参 - 2 / 5
		Dto dto_page = (BaseDto) super.getSessionAttribute(request, "PAGE_PARAMETER_DTO_CUT_CUTDLADE");
		if (Utils.isNotEmpty(dto_page) && Utils.isNotEmpty(dto)) {
			dto = WebUtils.getDtoDataFromFirst2Second(dto, dto_page);
		}

		String featurecode = dto.getAsString("featurecode");
		if (featurecode.isEmpty() != true) {
			List featurecodeList = java.util.Arrays.asList(featurecode.split(","));
			dto.put("featurecode", featurecodeList);
		}

		// 修正分页传参 - 3 / 5
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_CUT_CUTDLADE");
		super.setSessionAttribute(request, "PAGE_PARAMETER_DTO_CUT_CUTDLADE", dto);

		List bladeList = g4Reader.queryForPage("Cut.queryCutblade4Manage", dto);
		Integer totalInteger = (Integer) g4Reader.queryForObject("Cut.queryCutblade4Manage4PageCount", dto);
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
		List list = g4Reader.queryForList("Cut.queryWorkpiecematerial", dto);
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
	 * queryPromethod4Blade(ActionMapping mapping, ActionForm form,
	 * HttpServletRequest request, HttpServletResponse response) throws
	 * Exception { CommonActionForm aForm = (CommonActionForm) form; Dto dto =
	 * aForm.getParamAsDto(request); List list =
	 * g4Reader.queryForList("Cut.queryPromethod4Cutblade", dto); String
	 * jsonString = JsonHelper.encodeList2PageJson(list, list.size(), null);
	 * super.write(jsonString, response); return mapping.findForward(null); }
	 */
	/*
	 * 加工类型
	 */
	@SuppressWarnings("rawtypes")
	public ActionForward queryTurningtypeInCutblade(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForList("Cut.queryTurningtypeInCutblade", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 槽刀宽度
	@SuppressWarnings("rawtypes")
	public ActionForward queryBladewidthInCutblade(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForList("Cut.queryBladewidthInCutblade", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 刀片最大切削深度
	@SuppressWarnings("rawtypes")
	public ActionForward queryCuttingdepthInCutblade(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		List areaList = g4Reader.queryForList("Cut.queryCuttingdepthInCutblade", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	

	// 刀片左右手
	@SuppressWarnings("rawtypes")
	public ActionForward queryCuttinghandInCutblade(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		List areaList = g4Reader.queryForList("Cut.queryCuttinghandInCutblade", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 刀剑圆弧
		@SuppressWarnings("rawtypes")
		public ActionForward querycuttingradius(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
			CommonActionForm aForm = (CommonActionForm) form;
			Dto dto = aForm.getParamAsDto(request);

			List areaList = g4Reader.queryForList("Cut.querycuttingradius", dto);
			String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
			write(jsonString, response);
			return mapping.findForward(null);
		}
		
		// 切槽宽度
		@SuppressWarnings("rawtypes")
		public ActionForward querybladewidth(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
			CommonActionForm aForm = (CommonActionForm) form;
			Dto dto = aForm.getParamAsDto(request);

			List areaList = g4Reader.queryForList("Cut.querybladewidth", dto);
			String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
			write(jsonString, response);
			return mapping.findForward(null);
		}
		// 刀片左右手
				@SuppressWarnings("rawtypes")
				public ActionForward querycuttinghand(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
					CommonActionForm aForm = (CommonActionForm) form;
					Dto dto = aForm.getParamAsDto(request);

					List areaList = g4Reader.queryForList("Cut.querycuttinghand", dto);
					String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
					write(jsonString, response);
					return mapping.findForward(null);
				}
				// 切削刃数目
				@SuppressWarnings("rawtypes")
				public ActionForward querycuttingedge(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
					CommonActionForm aForm = (CommonActionForm) form;
					Dto dto = aForm.getParamAsDto(request);

					List areaList = g4Reader.queryForList("Cut.querycuttingedge", dto);
					String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
					write(jsonString, response);
					return mapping.findForward(null);
				}
				// 接口规格
				@SuppressWarnings("rawtypes")
				public ActionForward queryportsizeInCuttoolholder(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
					CommonActionForm aForm = (CommonActionForm) form;
					Dto dto = aForm.getParamAsDto(request);

					List areaList = g4Reader.queryForList("Cut.queryportsizeInCuttoolholder", dto);
					String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
					write(jsonString, response);
					return mapping.findForward(null);
				}
				// 刀具方向
				@SuppressWarnings("rawtypes")
				public ActionForward queryhandoftoolInCuttoolholder(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
					CommonActionForm aForm = (CommonActionForm) form;
					Dto dto = aForm.getParamAsDto(request);

					List areaList = g4Reader.queryForList("Cut.queryhandoftoolInCuttoolholder", dto);
					String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
					write(jsonString, response);
					return mapping.findForward(null);
				}
	// 刀片形式
	@SuppressWarnings("rawtypes")
	public ActionForward queryCuttingedgeInCutblade(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		List areaList = g4Reader.queryForList("Cut.queryCuttingedgeInCutblade", dto);
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
	public ActionForward queryCuttoolholder4Manage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		// 修正分页传参 - 4 / 5
		Dto dto_page = (BaseDto) super.getSessionAttribute(request, "PAGE_PARAMETER_DTO_CUT_CUTTOOLHOLDER");
		if (Utils.isNotEmpty(dto_page) && Utils.isNotEmpty(dto)) {
			dto = WebUtils.getDtoDataFromFirst2Second(dto, dto_page);
		}

		String featurecode = dto.getAsString("featurecode");
		if (featurecode.isEmpty() != true) {
			List featurecodeList = java.util.Arrays.asList(featurecode.split(","));
			dto.put("featurecode", featurecodeList);
		}

		// 修正分页传参 - 5 / 5
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_CUT_CUTTOOLHOLDER");
		super.setSessionAttribute(request, "PAGE_PARAMETER_DTO_CUT_CUTTOOLHOLDER", dto);

		List cuttoolholderList = g4Reader.queryForPage("Cut.queryCuttoolholder4Manage", dto);
		Integer totalInteger = (Integer) g4Reader.queryForObject("Cut.queryCuttoolholder4Manage4PageCount", dto);

		String jsonString = JsonHelper.encodeList2PageJson(cuttoolholderList, totalInteger, null);
		write(jsonString, response);
		dto.put("featurecode", null);
		return mapping.findForward(null);
	}

	// 刀体最大切削深度
		@SuppressWarnings("rawtypes")
		public ActionForward queryCuttingdepthInCuttoolholder(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
			CommonActionForm aForm = (CommonActionForm) form;
			Dto dto = aForm.getParamAsDto(request);

			List areaList = g4Reader.queryForList("Cut.queryCuttingdepthInCuttoolholder", dto);
			String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
			write(jsonString, response);
			return mapping.findForward(null);
		}

		
		// 刀体切槽孔径
				@SuppressWarnings("rawtypes")
				public ActionForward querydiametermax2(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
					CommonActionForm aForm = (CommonActionForm) form;
					Dto dto = aForm.getParamAsDto(request);

					List areaList = g4Reader.queryForList("Cut.querydiametermax2", dto);
					String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
					write(jsonString, response);
					return mapping.findForward(null);
				}
		
		
	/*
	 * 加工类型
	 */
	@SuppressWarnings("rawtypes")
	public ActionForward queryTurningtypeInCuttoolholder(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForList("Cut.queryTurningtypeInCuttoolholder", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 接口规格
	@SuppressWarnings("rawtypes")
	public ActionForward queryPortsizeInCuttoolholder(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForPage("Cut.queryPortsizeInCuttoolholder", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 刀具方向
	@SuppressWarnings("rawtypes")
	public ActionForward queryHandoftoolInCuttoolholder(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForPage("Cut.queryHandoftoolInCuttoolholder", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 刀柄类型
	@SuppressWarnings("rawtypes")
	public ActionForward queryHandletypeInCuttoolholder(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		List areaList = g4Reader.queryForPage("Cut.queryHandletypeInCuttoolholder", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 切槽孔径
	@SuppressWarnings("rawtypes")
	public ActionForward queryDiametermaxInCuttoolholder(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		List areaList = g4Reader.queryForPage("Cut.queryDiametermaxInCuttoolholder", dto);
		String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}


//切削参数
	@SuppressWarnings("rawtypes")
	public ActionForward queryCtparameter(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		
		/*List ctparameterList = g4Reader.queryForList("Generalturning.queryCtparameter", dto);
		String jsonString = encodeList2PageJson(ctparameterList, ctparameterList.size(), null);
		write(jsonString, response);*/
		
		/*Dto ctparameterDto;
		ctparameterDto = (BaseDto)g4Reader.queryForObject("Cut.queryCtparameter", dto);
		
		if (Utils.isEmpty(ctparameterDto)){
			ctparameterDto = new BaseDto();
		}
		
		// ctparameterDto.put("注意事项", "注意事项——test");
		write(ctparameterDto.toJson(), response);
		return mapping.findForward(null);*/
		
		List ctparameterList = g4Reader.queryForList("Cut.queryCtparameter", dto);
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
		
	
		List sapinformationList = g4Reader.queryForPage("Generalturning.querySapinformation", dto);
		String jsonString = encodeList2PageJson(sapinformationList, sapinformationList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	
	}
	// 查询材质信息
		@SuppressWarnings("rawtypes")
		public ActionForward querycutbladematerial(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
			CommonActionForm aForm = (CommonActionForm) form;
			Dto dto = aForm.getParamAsDto(request);

			List areaList = g4Reader.queryForPage("Cut.querycutbladematerial", dto);
			String jsonString = encodeList2PageJson(areaList, areaList.size(), null);
			write(jsonString, response);
			return mapping.findForward(null);
		}
		// 查询槽型信息
				@SuppressWarnings("rawtypes")
				public ActionForward querycutgroove(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
					CommonActionForm aForm = (CommonActionForm) form;
					Dto dto = aForm.getParamAsDto(request);

					List areaList = g4Reader.queryForPage("Cut.querycutgroove", dto);
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
					String	turningtype;
					String	bladewidth;
					String	cuttingradius;
					String  cuttinghand;
					String  cuttingedge;
					String shujuyuanlujing3;
					
					String path = request.getSession().getServletContext().getRealPath("");
						String figure2lujing = (String) g4Reader.queryForObject("Cut.queryfigure2blade", pdto);
						  String  str1=figure2lujing.replace("/", "\\");
							 shujuyuanlujing3=path+str1;
							 
					String workpieceisotypeif = pdto.getAsString("workpieceisotype");
					String turningtypeif = pdto.getAsString("turningtype");
					String cuttinghandif = pdto.getAsString("cuttinghand");
					
					bladewidth = pdto.getAsString("bladewidth");
					cuttingradius = pdto.getAsString("cuttingradius");
					cuttingedge = pdto.getAsString("cuttingedge");
					
					if(workpieceisotypeif == ""){workpieceisotype= "";}else{workpieceisotype = (String) g4Reader.queryForObject("Cut.querycailiaonanme", pdto);}
					if(turningtypeif == ""){turningtype= "";}else{turningtype = (String) g4Reader.queryForObject("Cut.querychexiaoleixingnanme", pdto);}
					if(cuttinghandif == ""){cuttinghand= "";}else{cuttinghand = (String) g4Reader.queryForObject("Cut.querydaopianzuoyoushounanme", pdto);}
					
				
					
					
					dto.put("reportTitle", reportTitle);
					dto.put("workpieceisotype", workpieceisotype);
					dto.put("turningtype", turningtype);
					dto.put("cuttinghand", cuttinghand);
					dto.put("bladewidth", bladewidth);
					dto.put("cuttingradius", cuttingradius);
					dto.put("cuttingedge", cuttingedge);
				
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
					
					List arrayList = g4Reader.queryForList("Cut.queryCutblade4Manage", pdto);
					List saparrayList = g4Reader.queryForList("Generalturning.querySapinformation", pdto);
					List CtparameterarrayList = g4Reader.queryForList("Cut.queryCtparameter", pdto);
				
					ReportData reportData = new ReportData();
					reportData.setParametersDto(dto);
					reportData.setFieldsList(arrayList);
					reportData.setFieldsList1(saparrayList);
					if(workpieceisotypeif != ""){reportData.setFieldsList2(CtparameterarrayList);}
			    	
					reportData.setReportFilePath("/file/jasper/CutReport4Blade.jasper");
					getSessionContainer(request).setReportData("generalturning", reportData);
					return mapping.findForward(null);
				}
		
				
				
				//报表打印
				@SuppressWarnings({ "unchecked", "rawtypes" })
				public ActionForward printTask2(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
					CommonActionForm aForm = (CommonActionForm) form;
					Dto pdto = aForm.getParamAsDto(request);
					Dto dto = new BaseDto();
					
					String  turningtype2;
					String	cuttingdepth2;
					String	portsize2;
					String	handoftool2;
					String figure2lujing;
					//String  diametermax2;
					//String  cutdiameter2;
					String shujuyuanlujing3;
					
					
					String path = request.getSession().getServletContext().getRealPath("");
						figure2lujing = (String) g4Reader.queryForObject("Cut.queryfigure2toolholder", pdto);
						  String  str1=figure2lujing.replace("/", "\\");
							 shujuyuanlujing3=path+str1;
							
					
					String turningtype2if = pdto.getAsString("turningtype2");
					String portsize2if = pdto.getAsString("portsize2");
					String handoftool2if = pdto.getAsString("handoftool2");
					
					cuttingdepth2 = pdto.getAsString("cuttingdepth2");
					//diametermax2 = pdto.getAsString("diametermax2");
					//cutdiameter2 = pdto.getAsString("cutdiameter2");
					
					if(turningtype2if == ""){turningtype2= "";}else{turningtype2 = (String) g4Reader.queryForObject("Cut.querychexiaoleixing2nanme", pdto);}
					if(portsize2if == ""){portsize2= "";}else{portsize2 = (String) g4Reader.queryForObject("Cut.queryjiekouguige2nanme", pdto);}
					if(handoftool2if == ""){handoftool2= "";}else{handoftool2 = (String) g4Reader.queryForObject("Cut.querydaojufangxiang2nanme", pdto);}
					
				
					
					
					dto.put("reportTitle", reportTitle);
					dto.put("turningtype", turningtype2);
					dto.put("portsize", portsize2);
					dto.put("handoftool", handoftool2);
					dto.put("cuttingdepth", cuttingdepth2);
					//dto.put("diametermax", diametermax2);
					//dto.put("cutdiameter", cutdiameter2);
					
					String SapreportPath=path+"\\file\\jasper\\";  
				
					
					
						
						
						
					String jpg = ".jpg";
					String pathandpicture = path+"\\dec\\image\\pathandpicture.jpg";
					String picture = path+"\\dec\\image\\picture.jpg";
					if(shujuyuanlujing3.equals(path)){dto.put("shujuyuanlujing3", pathandpicture);}
					else{
						if(figure2lujing.contains(jpg)){dto.put("shujuyuanlujing3", shujuyuanlujing3);}
						else{dto.put("shujuyuanlujing3", picture);}
						}
					
					
					
					
					dto.put("shujuyuanlujing2", SapreportPath);
				
					
					List arrayList = g4Reader.queryForList("Cut.queryCuttoolholder4Manage", pdto);
					List saparrayList = g4Reader.queryForList("Generalturning.querySapinformation", pdto);
					
				
					ReportData reportData = new ReportData();
					reportData.setParametersDto(dto);
					reportData.setFieldsList(arrayList);
					reportData.setFieldsList1(saparrayList);
					
			    	
					reportData.setReportFilePath("/file/jasper/CutReport4toolholder.jasper");
					getSessionContainer(request).setReportData("generalturning", reportData);
					return mapping.findForward(null);
				}

}
