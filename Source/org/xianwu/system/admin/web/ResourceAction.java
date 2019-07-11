package org.xianwu.system.admin.web;

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
import org.xianwu.system.admin.service.ResourceService;
import org.xianwu.system.common.util.SystemConstants;

/**
 * 资源模型
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class ResourceAction extends BizAction {

	private ResourceService resourceService = (ResourceService) super.getService("resourceService");

	/**
	 * 菜单资源管理页面初始化
	 * 
	 * @param
	 * @return
	 */
	public ActionForward menuResourceInit(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		super.removeSessionAttribute(request, "menuid");
		Dto dto = (Dto) g4Reader.queryForObject("Resource.queryMenuByMenuID", "01");
		request.setAttribute("rootMenuName", dto.getAsString("menuname"));
		return mapping.findForward("manageMenuResourceView");
	}

	/**
	 * 查询菜单项目 生成菜单树
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public ActionForward queryMenuItems(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Dto dto = new BaseDto();
		String nodeid = request.getParameter("node");
		dto.put("parentid", nodeid);
		List menuList = g4Reader.queryForList("Resource.queryMenuItemsByDto", dto);
		Dto menuDto = new BaseDto();
		for (int i = 0; i < menuList.size(); i++) {
			menuDto = (BaseDto) menuList.get(i);
			if (menuDto.getAsString("leaf").equals(SystemConstants.LEAF_Y))
				menuDto.put("leaf", new Boolean(true));
			else
				menuDto.put("leaf", new Boolean(false));
			if (menuDto.getAsString("id").length() == 4)
				// ID长度为4的节点自动展开
				menuDto.put("expanded", new Boolean(true));
		}
		write(JsonHelper.encodeObject2Json(menuList), response);
		return mapping.findForward(null);
	}

	/**
	 * 查询菜单项目 - 菜单管理
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public ActionForward queryMenuItems4Manage(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		String menuid = request.getParameter("menuid");
		if (Utils.isNotEmpty(menuid)) {
			super.setSessionAttribute(request, "menuid", menuid);
		}
		dto.put("menuid", super.getSessionAttribute(request, "menuid"));
		List menuList = g4Reader.queryForPage("Resource.queryMenuItems4Manage", dto);
		Integer pageCount = (Integer) g4Reader.queryForObject("Resource.queryMenuItems4Manage4PageCount", dto);
		String jsonString = JsonHelper.encodeList2PageJson(menuList, pageCount, null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 保存菜单
	 * 
	 * @param
	 * @return
	 */
	public ActionForward saveMenuItem(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto inDto = aForm.getParamAsDto(request);
		resourceService.saveMenuItem(inDto);
		setOkTipMsg("菜单数据新增成功", response);
		return mapping.findForward(null);
	}

	/**
	 * 修改菜单
	 * 
	 * @param
	 * @return
	 */
	public ActionForward updateMenuItem(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto inDto = aForm.getParamAsDto(request);
		resourceService.updateMenuItem(inDto);
		setOkTipMsg("菜单数据修改成功", response);
		return mapping.findForward(null);
	}

	/**
	 * 删除菜单项
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public ActionForward deleteMenuItems(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String strChecked = request.getParameter("strChecked");
		String type = request.getParameter("type");
		String menuid = request.getParameter("menuid");
		Dto inDto = new BaseDto();
		inDto.put("strChecked", strChecked);
		inDto.put("type", type);
		inDto.put("menuid", menuid);
		resourceService.deleteMenuItems(inDto);
		setOkTipMsg("菜单数据删除成功", response);
		return mapping.findForward(null);
	}

	/**
	 * 代码表管理页面初始化
	 * 
	 * @param
	 * @return
	 */
	public ActionForward codeTableInit(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		return mapping.findForward("codeTableView");
	}

	/**
	 * 查询代码表
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public ActionForward queryCodeItems(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto inDto = aForm.getParamAsDto(request);
		List codeList = g4Reader.queryForPage("Resource.getCodeList4Page", inDto);
		Integer totalCount = (Integer) g4Reader.queryForObject("Resource.getCodeList4PageCount", inDto);
		String jsonStrList = JsonHelper.encodeList2PageJson(codeList, totalCount, null);
		write(jsonStrList, response);
		return mapping.findForward(null);
	}

	/**
	 * 保存代码表
	 * 
	 * @param
	 * @return
	 */
	public ActionForward saveCodeItem(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto inDto = aForm.getParamAsDto(request);
		Dto outDto = resourceService.saveCodeItem(inDto);
		String jsonString = JsonHelper.encodeObject2Json(outDto);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 删除代码表
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public ActionForward deleteCodeItem(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String strChecked = request.getParameter("strChecked");
		Dto inDto = new BaseDto();
		inDto.put("strChecked", strChecked);
		resourceService.deleteCodeItem(inDto);
		setOkTipMsg("字典数据删除成功", response);
		return mapping.findForward(null);
	}

	/**
	 * 修改代码表
	 * 
	 * @param
	 * @return
	 */
	public ActionForward updateCodeItem(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto inDto = aForm.getParamAsDto(request);
		resourceService.updateCodeItem(inDto);
		setOkTipMsg("字典数据修改成功", response);
		return mapping.findForward(null);
	}

	/**
	 * 字典内存同步
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unused" })
	public ActionForward synMemory(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		List codeList = g4Reader.queryForList("Resource.getCodeList");
		getServlet().getServletContext().removeAttribute("EACODELIST");
		getServlet().getServletContext().setAttribute("EACODELIST", codeList);
		setOkTipMsg("内存同步成功", response);
		return mapping.findForward(null);
	}

	/**
	 * 系统图标页面初始化
	 * 
	 * @param
	 * @return
	 */
	public ActionForward iconInit(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		return mapping.findForward("manageIconView");
	}

	/**
	 * 查询系统图标
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public ActionForward queryIconItems(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto inDto = aForm.getParamAsDto(request);
		List iconList = g4Reader.queryForPage("Resource.queryIconsForManage", inDto);
		String subPath = "./resource/image/ext/";
		for (int i = 0; i < iconList.size(); i++) {
			Dto dto = (BaseDto) iconList.get(i);
			dto.put("accesspath", subPath + dto.getAsString("filename"));
			dto.put("previewpath", subPath + dto.getAsString("filename"));
		}
		Integer pageCount = (Integer) g4Reader.queryForObject("Resource.queryIconsForManageForPageCount", inDto);
		String jsonString = JsonHelper.encodeList2PageJson(iconList, pageCount, null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 调色板页面初始化
	 * 
	 * @param
	 * @return
	 */
	public ActionForward colorPaletteInit(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		return mapping.findForward("colorPaletteView");
	}
}
