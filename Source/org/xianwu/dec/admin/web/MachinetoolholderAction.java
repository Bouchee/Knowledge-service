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
import org.xianwu.dec.admin.service.MachinetoolholderService;
import org.xianwu.core.web.util.WebUtils;

/**
 * 机床刀体关系
 * 
 * @author XianwuFu
 * @since 2013-01-01
 * @see BizAction
 */
public class MachinetoolholderAction extends BizAction {

	private MachinetoolholderService machinetoolholderService = (MachinetoolholderService) super.getService("machinetoolholderService");

	/**
	 * 机床刀体关系
	 * 
	 * @param
	 * @return
	 */
	public ActionForward init(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_MACHINETOOLHOLDER_MACHINETOOLHOLDER"); // 修正分页传参
		return mapping.findForward("machinetoolholderView");
	}

	/**
	 * 查询机床刀体关系
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings({ "rawtypes" })
	public ActionForward queryMachinetoolholder4Manage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		// 修正分页传参 - 2 / 5
		Dto dto_page = (BaseDto) super.getSessionAttribute(request, "PAGE_PARAMETER_DTO_MACHINETOOLHOLDER_MACHINETOOLHOLDER");
		if (Utils.isNotEmpty(dto_page) && Utils.isNotEmpty(dto)) {
			dto = WebUtils.getDtoDataFromFirst2Second(dto, dto_page);
		}

		// 修正分页传参 - 3 / 5
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_MACHINETOOLHOLDER_MACHINETOOLHOLDER");
		super.setSessionAttribute(request, "PAGE_PARAMETER_DTO_MACHINETOOLHOLDER_MACHINETOOLHOLDER", dto);

		List machinetoolholderList = g4Reader.queryForPage("Machinetoolholder.queryMachinetoolholder4Manage", dto);
		Integer totalInteger = (Integer) g4Reader.queryForObject("Machinetoolholder.queryMachinetoolholder4Manage4PageCount", dto);
		String jsonString = JsonHelper.encodeList2PageJson(machinetoolholderList, totalInteger, null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 保存机床刀体关系
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public ActionForward saveMachinetoolholder(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		Integer countInteger = (Integer) g4Reader.queryForObject("Machinetoolholder.queryMachinetoolholderNumber", dto);
		Dto outDto = new BaseDto();
		if (countInteger.intValue() == 0) {
			outDto = machinetoolholderService.saveMachinetoolholder(dto);
		} else {
			outDto.put("msg", "机床刀体关系已经存在！");
			outDto.put("success", new Boolean(false));
		}

		String jsonString = JsonHelper.encodeObject2Json(outDto);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 删除机床刀体关系
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public ActionForward deleteMachinetoolholder(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String strChecked = request.getParameter("strChecked");
		Dto inDto = new BaseDto();
		inDto.put("strChecked", strChecked);
		machinetoolholderService.deleteMachinetoolholder(inDto);
		setOkTipMsg("机床刀体关系删除成功！", response);
		return mapping.findForward(null);
	}

	/**
	 * 修改机床刀体关系
	 * 
	 * @param
	 * @return
	 */
	public ActionForward updateMachinetoolholder(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto inDto = aForm.getParamAsDto(request);
		machinetoolholderService.updateMachinetoolholder(inDto);
		setOkTipMsg("机床刀体关系修改成功！", response);
		return mapping.findForward(null);
	}

	/**
	 * 机床信息
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({ "rawtypes" })
	public ActionForward queryMachinetool4Machinetoolholder(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List list = g4Reader.queryForList("Machinetoolholder.queryMachinetool4Machinetoolholder", dto);
		String jsonString = encodeList2PageJson(list, list.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 刀体信息
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({ "rawtypes" })
	public ActionForward queryToolholder4Machinetoolholder(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List list = g4Reader.queryForList("Machinetoolholder.queryToolholder4Machinetoolholder", dto);
		String jsonString = encodeList2PageJson(list, list.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}
}
