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
import org.xianwu.dec.admin.service.WorkpiecebladeService;
import org.xianwu.core.web.util.WebUtils;

/**
 * 工件材料与刀片材质匹配规则
 * 
 * @author XianwuFu
 * @since 2013-01-01
 * @see BizAction
 */
public class WorkpiecebladeAction extends BizAction {

	private WorkpiecebladeService workpiecebladeService = (WorkpiecebladeService) super.getService("workpiecebladeService");

	/**
	 * 工件材料与刀片材质匹配规则
	 * 
	 * @param
	 * @return
	 */
	public ActionForward init(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_WORKPIECEBLADE_WORKPIECEBLADE"); // 修正分页传参
		// -
		// 1
		// /
		// 5
		return mapping.findForward("workpiecebladeView");
	}

	/**
	 * 查询工件材料与刀片材质匹配规则
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings({ "rawtypes" })
	public ActionForward queryWorkpieceblade4Manage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		// 修正分页传参 - 2 / 5
		Dto dto_page = (BaseDto) super.getSessionAttribute(request, "PAGE_PARAMETER_DTO_WORKPIECEBLADE_WORKPIECEBLADE");
		if (Utils.isNotEmpty(dto_page) && Utils.isNotEmpty(dto)) {
			dto = WebUtils.getDtoDataFromFirst2Second(dto, dto_page);
		}

		// 修正分页传参 - 3 / 5
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_WORKPIECEBLADE_WORKPIECEBLADE");
		super.setSessionAttribute(request, "PAGE_PARAMETER_DTO_WORKPIECEBLADE_WORKPIECEBLADE", dto);

		List workpiecebladeList = g4Reader.queryForPage("Workpieceblade.queryWorkpieceblade4Manage", dto);
		Integer totalInteger = (Integer) g4Reader.queryForObject("Workpieceblade.queryWorkpieceblade4Manage4PageCount", dto);
		String jsonString = JsonHelper.encodeList2PageJson(workpiecebladeList, totalInteger, null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 保存工件材料与刀片材质匹配规则
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public ActionForward saveWorkpieceblade(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto inDto = aForm.getParamAsDto(request);

		Integer countInteger = (Integer) g4Reader.queryForObject("Workpieceblade.queryWorkpiecebladeNumber", inDto);
		Dto outDto = new BaseDto();
		if (countInteger.intValue() == 0) {
			outDto = workpiecebladeService.saveWorkpieceblade(inDto);
		} else {
			outDto.put("msg", "刀片材料与工件材料匹配关系已经存在！");
			outDto.put("success", new Boolean(false));
		}

		String jsonString = JsonHelper.encodeObject2Json(outDto);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 删除工件材料与刀片材质匹配规则
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public ActionForward deleteWorkpieceblade(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String strChecked = request.getParameter("strChecked");
		Dto inDto = new BaseDto();
		inDto.put("strChecked", strChecked);
		workpiecebladeService.deleteWorkpieceblade(inDto);
		setOkTipMsg("工件材料与刀片材质匹配规则删除成功！", response);
		return mapping.findForward(null);
	}

	/**
	 * 修改工件材料与刀片材质匹配规则
	 * 
	 * @param
	 * @return
	 */
	public ActionForward updateWorkpieceblade(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto inDto = aForm.getParamAsDto(request);
		workpiecebladeService.updateWorkpieceblade(inDto);
		setOkTipMsg("工件材料与刀片材质匹配规则修改成功！", response);
		return mapping.findForward(null);
	}

	/**
	 * 查询刀片材质
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public ActionForward queryBladematerial4Workpieceblade(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		List bladematerialList = g4Reader.queryForPage("Workpieceblade.queryBladematerial4Workpieceblade", dto);
		String jsonString = JsonHelper.encodeList2PageJson(bladematerialList, bladematerialList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 查询工件材料
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public ActionForward queryWorkpiecematerial4Workpieceblade(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		List workpiecematerialList = g4Reader.queryForPage("Workpieceblade.queryWorkpiecematerial4Workpieceblade", dto);
		String jsonString = JsonHelper.encodeList2PageJson(workpiecematerialList, workpiecematerialList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

}
