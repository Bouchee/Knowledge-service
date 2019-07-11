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
import org.xianwu.dec.admin.service.GearService;
import org.xianwu.core.web.util.WebUtils;

/**
 * 齿轮
 * 
 * @author XianwuFu
 * @since 2013-01-01
 * @see BizAction
 */
public class GearAction extends BizAction {

	private GearService gearService = (GearService) super.getService("gearService");

	/**
	 * 齿轮主页面
	 * 
	 * @param
	 * @return
	 */
	public ActionForward init(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_GEAR_GEAR"); // 修正分页传参
																				// -
																				// 1
																				// /
																				// 5
		return mapping.findForward("gearView");
	}

	/**
	 * 查询齿轮
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings({ "rawtypes" })
	public ActionForward queryGear4Manage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		// 修正分页传参 - 2 / 5
		Dto dto_page = (BaseDto) super.getSessionAttribute(request, "PAGE_PARAMETER_DTO_GEAR_GEAR");
		if (Utils.isNotEmpty(dto_page) && Utils.isNotEmpty(dto)) {
			dto = WebUtils.getDtoDataFromFirst2Second(dto, dto_page);
		}

		// 修正分页传参 - 3 / 5
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_GEAR_GEAR");
		super.setSessionAttribute(request, "PAGE_PARAMETER_DTO_GEAR_GEAR", dto);

		List machinetoolList = g4Reader.queryForPage("Gear.queryGear4Manage", dto);
		Integer totalInteger = (Integer) g4Reader.queryForObject("Gear.queryGear4Manage4PageCount", dto);
		String jsonString = JsonHelper.encodeList2PageJson(machinetoolList, totalInteger, null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 保存齿轮
	 * 
	 * @param
	 * @return
	 */
	public ActionForward saveGear(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;

		Dto inDto = aForm.getParamAsDto(request);

		Dto outDto = gearService.saveGear(inDto);
		String jsonString = JsonHelper.encodeObject2Json(outDto);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 删除齿轮
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public ActionForward deleteGear(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String strChecked = request.getParameter("strChecked");
		Dto inDto = new BaseDto();
		inDto.put("strChecked", strChecked);

		gearService.deleteGear(inDto);

		setOkTipMsg("齿轮删除成功！", response);
		return mapping.findForward(null);
	}

	/**
	 * 修改齿轮
	 * 
	 * @param
	 * @return
	 */
	public ActionForward updateGear(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;

		Dto inDto = aForm.getParamAsDto(request);

		gearService.updateGear(inDto);
		setOkTipMsg("齿轮修改成功！", response);
		return mapping.findForward(null);
	}
}
