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
import org.xianwu.dec.admin.service.ExpanService;
import org.xianwu.dec.admin.service.NetbrainstormService;

/**
 * 知识库材料
 * 
 * @author XianwuFu
 * @since 2013-01-01
 * @see BizAction
 */
public class NetBrainstormAction extends BizAction {

	public ActionForward init(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		return mapping.findForward("netbrainstormView");
	}
	
	private NetbrainstormService netbrainstormService = (NetbrainstormService) super.getService("netbrainstormService");
	
	/**
	 * 保存扩大问题
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public ActionForward saveNetbrainstorm(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;

		Dto inDto = aForm.getParamAsDto(request);
/*		String enlarge1 =inDto.getAsString("enlarge1");*/
		
		Dto outDto = netbrainstormService.saveNetbrainstorm(inDto);
		String jsonString = JsonHelper.encodeObject2Json(outDto);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	


}
