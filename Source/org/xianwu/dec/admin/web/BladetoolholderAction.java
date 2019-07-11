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
import org.xianwu.dec.admin.service.BladetoolholderService;
import org.xianwu.core.web.util.WebUtils;

/**
 * 刀片刀体匹配关系
 * 
 * @author XianwuFu
 * @since 2013-01-01
 * @see BizAction
 */
public class BladetoolholderAction extends BizAction {

	private BladetoolholderService bladetoolholderService = (BladetoolholderService) super.getService("bladetoolholderService");

	/**
	 * 刀片刀体匹配关系
	 * 
	 * @param
	 * @return
	 */
	public ActionForward init(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_BLADETOOLHOLDER_BLADETOOLHOLDER"); // 修正分页传参
																										// -
																										// 1
																										// /
																										// 5
		return mapping.findForward("bladetoolholderView");
	}

	/**
	 * 查询刀片刀体匹配关系
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings({ "rawtypes" })
	public ActionForward queryBladetoolholder4Manage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		// 修正分页传参 - 2 / 5
		Dto dto_page = (BaseDto) super.getSessionAttribute(request, "PAGE_PARAMETER_DTO_BLADETOOLHOLDER_BLADETOOLHOLDER");
		if (Utils.isNotEmpty(dto_page) && Utils.isNotEmpty(dto)) {
			dto = WebUtils.getDtoDataFromFirst2Second(dto, dto_page);
		}

		// 修正分页传参 - 3 / 5
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_BLADETOOLHOLDER_BLADETOOLHOLDER");
		super.setSessionAttribute(request, "PAGE_PARAMETER_DTO_BLADETOOLHOLDER_BLADETOOLHOLDER", dto);

		List bladetoolholderList = g4Reader.queryForPage("Bladetoolholder.queryBladetoolholder4Manage", dto);
		Integer totalInteger = (Integer) g4Reader.queryForObject("Bladetoolholder.queryBladetoolholder4Manage4PageCount", dto);
		String jsonString = JsonHelper.encodeList2PageJson(bladetoolholderList, totalInteger, null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 保存刀片刀体匹配关系
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public ActionForward saveBladetoolholder(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto inDto = aForm.getParamAsDto(request);

		Integer countInteger = (Integer) g4Reader.queryForObject("Bladetoolholder.queryBladetoolholderNumber", inDto);
		Dto outDto = new BaseDto();
		if (countInteger.intValue() == 0) {
			outDto = bladetoolholderService.saveBladetoolholder(inDto);
		} else {
			outDto.put("msg", "刀片与刀体匹配关系已经存在！");
			outDto.put("success", new Boolean(false));
		}

		String jsonString = JsonHelper.encodeObject2Json(outDto);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 删除刀片刀体匹配关系
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public ActionForward deleteBladetoolholder(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String strChecked = request.getParameter("strChecked");
		Dto inDto = new BaseDto();
		inDto.put("strChecked", strChecked);
		bladetoolholderService.deleteBladetoolholder(inDto);
		setOkTipMsg("刀片刀体匹配关系删除成功！", response);
		return mapping.findForward(null);
	}

	/**
	 * 修改刀片刀体匹配关系
	 * 
	 * @param
	 * @return
	 */
	public ActionForward updateBladetoolholder(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto inDto = aForm.getParamAsDto(request);
		bladetoolholderService.updateBladetoolholder(inDto);
		setOkTipMsg("刀片刀体匹配关系修改成功！", response);
		return mapping.findForward(null);
	}

	/**
	 * 查询刀体
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public ActionForward queryToolholder4Bladetoolholder(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		List bladematerialList = g4Reader.queryForPage("Bladetoolholder.queryToolholder4Bladetoolholder", dto);
		String jsonString = JsonHelper.encodeList2PageJson(bladematerialList, bladematerialList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 查询刀片
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public ActionForward queryBlade4Bladetoolholder(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		List workpiecematerialList = g4Reader.queryForPage("Bladetoolholder.queryBlade4Bladetoolholder", dto);
		String jsonString = JsonHelper.encodeList2PageJson(workpiecematerialList, workpiecematerialList.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}
}
