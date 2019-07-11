package org.xianwu.dec.admin.web.knowledgebasesystem;


import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.xianwu.core.id.generator.DefaultIDGenerator;
import org.xianwu.core.json.JsonHelper;
import org.xianwu.core.metatype.Dto;
import org.xianwu.core.mvc.xstruts.action.ActionForm;
import org.xianwu.core.mvc.xstruts.action.ActionForward;
import org.xianwu.core.mvc.xstruts.action.ActionMapping;
import org.xianwu.core.web.BizAction;
import org.xianwu.core.web.CommonActionForm;
import org.xianwu.core.web.image.UploadImage;
import org.xianwu.dec.admin.service.ExpanService;
import org.xianwu.dec.admin.service.Hd_toolholder_tappingService;
import org.xianwu.system.common.util.idgenerator.IdGenerator;


/**
 * 知识库材料
 * 
 * @author XianwuFu
 * @since 2013-01-01
 * @see BizAction
 */
public class ExpanAction extends BizAction {

	private ExpanService expanService = (ExpanService) super.getService("expanService");
	
	public ActionForward init(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		return mapping.findForward("expanView");
	}

	/**
	 * 保存扩大问题
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public ActionForward saveExpan(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;

		Dto inDto = aForm.getParamAsDto(request);
/*		String enlarge1 =inDto.getAsString("enlarge1");*/
		
		Dto outDto = expanService.saveExpan(inDto);
		String jsonString = JsonHelper.encodeObject2Json(outDto);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	
	

	/**
	 * 保存核心问题
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public ActionForward saveKeyp(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;

		Dto inDto = aForm.getParamAsDto(request);
		/*String enlarge1 =inDto.getAsString("enlarge1");*/
		
		Dto outDto = expanService.saveKeyp(inDto);
		String jsonString = JsonHelper.encodeObject2Json(outDto);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	
	
	
	/**
	 * 保存阻止问题
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public ActionForward savePrevent(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;

		Dto inDto = aForm.getParamAsDto(request);
		/*String enlarge1 =inDto.getAsString("enlarge1");*/
		
		Dto outDto = expanService.savePrevent(inDto);
		String jsonString = JsonHelper.encodeObject2Json(outDto);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	
	/**
	 * 保存原因及方法
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public ActionForward saveMethod(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;

		Dto inDto = aForm.getParamAsDto(request);
		/*String enlarge1 =inDto.getAsString("enlarge1");*/
		
		Dto outDto = expanService.saveMethod(inDto);
		String jsonString = JsonHelper.encodeObject2Json(outDto);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	
	
	/**
	 * 保存缩小问题
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public ActionForward saveReduce(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;

		Dto inDto = aForm.getParamAsDto(request);
		/*String enlarge1 =inDto.getAsString("enlarge1");*/
		
		Dto outDto = expanService.saveReduce(inDto);
		String jsonString = JsonHelper.encodeObject2Json(outDto);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	
	
	
}
