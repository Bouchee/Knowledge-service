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
public class CentredrillingAction extends BizAction {
	private String reportTitle = "中心钻刀具";
	/**
	 * 中心钻
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
		return mapping.findForward("centredrillingView");

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
		List bladeList = g4Reader.queryForPage("Centredrilling.queryHd_holedrilling4Manage", dto);
		//Integer totalInteger = (Integer) g4Reader.queryForObject("Centredrilling.queryHd_holedrilling4Manage4PageCount", dto);
		String jsonString = JsonHelper.encodeList2PageJson(bladeList,bladeList.size() /*totalInteger*/, null);
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
		List list = g4Reader.queryForList("Centredrilling.queryWorkpiecematerial", dto);
		String jsonString = JsonHelper.encodeList2PageJson(list, list.size(), null);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}
	
	//查询标准
	@SuppressWarnings("rawtypes")
	public ActionForward queryStandardInHd_toolholder_centredrilling(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List list = g4Reader.queryForList("Centredrilling.queryStandardInHd_toolholder_centredrilling", dto);
		String jsonString = JsonHelper.encodeList2PageJson(list, list.size(), null);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}
	
	//切削参数
		@SuppressWarnings("rawtypes")
		public ActionForward queryCParameter(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
			CommonActionForm aForm = (CommonActionForm) form;
			Dto dto = aForm.getParamAsDto(request);
			List list = g4Reader.queryForList("Centredrilling.queryCParameter", dto);
			String jsonString = JsonHelper.encodeList2PageJson(list, list.size(), null);
			super.write(jsonString, response);
			return mapping.findForward(null);
		}
	
	//查询公称直径
@SuppressWarnings("rawtypes")
	public ActionForward queryNominaldiameterInHd_toolholder_centredrilling(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List list = g4Reader.queryForList("Centredrilling.queryNominaldiameterInHd_toolholder_centredrilling", dto);
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
	String standard;
	String nominaldiameter;
	String shujuyuanlujing3;
	
	String path = request.getSession().getServletContext().getRealPath("");
		String figure2lujing = (String) g4Reader.queryForObject("Centredrilling.queryfigure2integer", pdto);
		  String  str1=figure2lujing.replace("/", "\\");
			 shujuyuanlujing3=path+str1;
			 
	String workpieceisotypeif = pdto.getAsString("workpieceisotype");
	
	standard = pdto.getAsString("standard");
	nominaldiameter = pdto.getAsString("nominaldiameter");

	
	if(workpieceisotypeif == ""){workpieceisotype= "";}else{workpieceisotype = (String) g4Reader.queryForObject("Centredrilling.querycailiaonanme2", pdto);}

	dto.put("reportTitle", reportTitle);
	dto.put("workpieceisotype", workpieceisotype);
	dto.put("standard", standard);
	dto.put("nominaldiameter", nominaldiameter);


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
	
	
	List arrayList = g4Reader.queryForList("Centredrilling.queryHd_holedrilling4Manage", pdto);
	List saparrayList = g4Reader.queryForList("Generalturning.querySapinformation", pdto);
	List CtparameterarrayList = g4Reader.queryForList("Centredrilling.queryCParameter", pdto);

	ReportData reportData = new ReportData();
	reportData.setParametersDto(dto);
	reportData.setFieldsList(arrayList);
	reportData.setFieldsList1(saparrayList);
	
	if(workpieceisotypeif != ""){reportData.setFieldsList2(CtparameterarrayList);}
	
	reportData.setReportFilePath("/file/jasper/CentredrillingReport4Integer.jasper");
	getSessionContainer(request).setReportData("generalturning", reportData);
	return mapping.findForward(null);
}
}
