package org.xianwu.dec.admin.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.mvc.xstruts.action.ActionForm;
import org.xianwu.core.mvc.xstruts.action.ActionForward;
import org.xianwu.core.mvc.xstruts.action.ActionMapping;
import org.xianwu.core.util.Utils;
import org.xianwu.core.web.BizAction;
import org.xianwu.core.web.CommonActionForm;
import org.xianwu.core.web.util.WebUtils;

/**
 * 切断切槽
 * 
 * @author XianwuFu
 * @since 2013-01-01
 * @see BizAction
 */
public class CutgroovingAction extends BizAction {
	/**
	 * 切断切槽
	 * 
	 * @param
	 * @return
	 */
	public ActionForward init(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_CUTGROOVING_CUTGROOVING"); // 修正分页传参
		// 5
		return mapping.findForward("cutgroovingView");
	}

	/**
	 * 查询切断切槽
	 * 
	 * @param
	 * @return
	 */
	public ActionForward queryCutgrooving4Manage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		// 修正分页传参 - 2 / 5
		Dto dto_page = (BaseDto) super.getSessionAttribute(request, "PAGE_PARAMETER_DTO_CUTGROOVING_CUTGROOVING");
		if (Utils.isNotEmpty(dto_page) && Utils.isNotEmpty(dto)) {
			dto = WebUtils.getDtoDataFromFirst2Second(dto, dto_page);
		}

		// 修正分页传参 - 3 / 5
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_CUTGROOVING_CUTGROOVING");
		super.setSessionAttribute(request, "PAGE_PARAMETER_DTO_CUTGROOVING_CUTGROOVING", dto);

		// List bladeList =
		// g4Reader.queryForPage("Cutgrooveing.queryCutgrooving4Manage", dto);
		// Integer totalInteger = (Integer)
		// g4Reader.queryForObject("Cutgrooveing.queryCutgrooving4Manage4PageCount",
		// dto);
		// String jsonString = JsonHelper.encodeList2PageJson(bladeList,
		// totalInteger, null);
		// write(jsonString, response);
		return mapping.findForward(null);
	}

}
