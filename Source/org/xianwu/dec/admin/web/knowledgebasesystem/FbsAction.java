package org.xianwu.dec.admin.web.knowledgebasesystem;

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

/**
 * 知识库材料
 * 
 * @author XianwuFu
 * @since 2013-01-01
 * @see BizAction
 */
public class FbsAction extends BizAction {

	public ActionForward init(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		return mapping.findForward("fbsView");
	}
	
	/**
	 * 查询刀片
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public ActionForward queryFamingyuanli(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		// 修正分页传参 - 2 / 5
		Dto dto_page = (BaseDto) super.getSessionAttribute(request, "PAGE_PARAMETER_DTO_GENERALTURNING_BLADE");
		if (Utils.isNotEmpty(dto_page) && Utils.isNotEmpty(dto)) {
			dto = WebUtils.getDtoDataFromFirst2Second(dto, dto_page);
		}

		// 修正分页传参 - 3 / 5
		super.removeSessionAttribute(request, "PAGE_PARAMETER_DTO_GENERALTURNING_BLADE");
		super.setSessionAttribute(request, "PAGE_PARAMETER_DTO_GENERALTURNING_BLADE", dto);

		List famingyuanli = g4Reader.queryForPage("Triz.queryFamingyuanli", dto);
	/*	Integer totalInteger = (Integer) g4Reader.queryForObject("Triz.queryFamingyuanli4PageCount", dto);*/
		String jsonString = JsonHelper.encodeList2PageJson(famingyuanli, famingyuanli.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	

	/**
	 * 查询材料树
	 * 
	 * @param
	 * @return
	 */
	/*@SuppressWarnings({ "rawtypes", "unchecked" })
	public ActionForward queryTree(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List tree = g4Reader.queryForList("Problemoi.queryTree", dto);
		String jsonString = JsonHelper.encodeList2PageJson(tree, tree.size(), null);
		write(jsonString, response);
		return mapping.findForward(null);
	}*/
}
