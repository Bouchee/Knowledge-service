package org.xianwu.dec.admin.web;

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
import org.xianwu.core.web.util.WebUtils;
import org.xianwu.dec.admin.service.MtperformanceService;

/**
 * 机床性能卡
 * 
 * @author XianwuFu
 * @since 2013-01-01
 * @see BizAction
 */
public class MtperformanceAction extends BizAction {

	private MtperformanceService mtperformanceService = (MtperformanceService) super.getService("mtperformanceService");

	/**
	 * 机床性能卡
	 * 
	 * @param
	 * @return
	 */
	public ActionForward init(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_MTPERFORMANCE_MTPERFORMANCE"); // 修正分页传参
																									// -
																									// 1
																									// /
																									// 5
		return mapping.findForward("mtperformanceView");
	}

	/**
	 * 查询机床性能卡
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings({ "rawtypes" })
	public ActionForward queryMtperformance4Manage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		// 修正分页传参 - 2 / 5
		Dto dto_page = (BaseDto) super.getSessionAttribute(request, "PAGE_PARAMETER_DTO_MTPERFORMANCE_MTPERFORMANCE");
		if (Utils.isNotEmpty(dto_page) && Utils.isNotEmpty(dto)) {
			dto = WebUtils.getDtoDataFromFirst2Second(dto, dto_page);
		}

		// 修正分页传参 - 3 / 5
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_MTPERFORMANCE_MTPERFORMANCE");
		super.setSessionAttribute(request, "PAGE_PARAMETER_DTO_MTPERFORMANCE_MTPERFORMANCE", dto);

		List mtperformanceList = g4Reader.queryForPage("Mtperformance.queryMtperformance4Manage", dto);
		Integer totalInteger = (Integer) g4Reader.queryForObject("Mtperformance.queryMtperformance4Manage4PageCount", dto);
		String jsonString = JsonHelper.encodeList2PageJson(mtperformanceList, totalInteger, null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 保存机床性能卡
	 * 
	 * @param
	 * @return
	 */
	public ActionForward saveMtperformance(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto inDto = aForm.getParamAsDto(request);
		Dto outDto = mtperformanceService.saveMtperformance(inDto);
		String jsonString = JsonHelper.encodeObject2Json(outDto);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 删除机床性能卡
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public ActionForward deleteMtperformance(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String strChecked = request.getParameter("strChecked");
		Dto inDto = new BaseDto();
		inDto.put("strChecked", strChecked);
		mtperformanceService.deleteMtperformance(inDto);
		setOkTipMsg("机床性能卡删除成功！", response);
		return mapping.findForward(null);
	}

	/**
	 * 修改机床性能卡
	 * 
	 * @param
	 * @return
	 */
	public ActionForward updateMtperformance(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto inDto = aForm.getParamAsDto(request);
		mtperformanceService.updateMtperformance(inDto);
		setOkTipMsg("机床性能卡修改成功！", response);
		return mapping.findForward(null);
	}

}
