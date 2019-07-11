package org.xianwu.system.admin.web;

import java.util.List;

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
import org.xianwu.system.admin.service.OrganizationService;
import org.xianwu.system.admin.service.PartService;
import org.xianwu.system.common.util.SystemConstants;

/**
 * UI组件人员授权
 * 
 * @author XianwuFu
 * @since 2013-01-01
 * @see BizAction
 */
public class UserPartAction extends BizAction {

	private PartService partService = (PartService) getService("partService");

	private OrganizationService organizationService = (OrganizationService) getService("organizationService");

	/**
	 * 页面初始化
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public ActionForward init(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		super.removeSessionAttribute(request, "deptid");
		Dto inDto = new BaseDto();
		String deptid = super.getSessionContainer(request).getUserInfo().getDeptid();
		inDto.put("deptid", deptid);
		Dto outDto = organizationService.queryDeptinfoByDeptid(inDto);
		request.setAttribute("rootDeptid", outDto.getAsString("deptid"));
		request.setAttribute("rootDeptname", outDto.getAsString("deptname"));
		Dto dto = (Dto) g4Reader.queryForObject("Resource.queryMenuByMenuID", "01");
		request.setAttribute("rootMenuName", dto.getAsString("menuname"));
		return mapping.findForward("initView");
	}

	/**
	 * 部门管理树初始化
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public ActionForward departmentTreeInit(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Dto dto = new BaseDto();
		String nodeid = request.getParameter("node");
		dto.put("parentid", nodeid);
		Dto outDto = organizationService.queryDeptItems(dto);
		write(outDto.getAsString("jsonString"), response);
		return mapping.findForward(null);
	}

	/**
	 * 查询UI组件列表
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public ActionForward queryParts(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm cForm = (CommonActionForm) form;
		Dto dto = cForm.getParamAsDto(request);
		List list = g4Reader.queryForPage("Part.queryParts", dto);
		Integer countInteger = (Integer) g4Reader.queryForObject("Part.queryPartsForPageCount", dto);
		for (int i = 0; i < list.size(); i++) {
			Dto partDto = (BaseDto) list.get(i);
			dto.put("partid", partDto.getAsString("partid"));
			Dto outDto = (BaseDto) g4Reader.queryForObject("Part.queryPart4UserGrant", dto);
			if (Utils.isEmpty(outDto)) {
				partDto.put("partauthtype", SystemConstants.PARTAUTHTYPE_NOGRANT);
			} else {
				partDto.putAll(outDto);
			}
		}
		String jsonString = encodeList2PageJson(list, countInteger, null);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 保存UI人员授权数据
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public ActionForward savePartUserGrantDatas(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		List list = aForm.getGridDirtyData(request);
		Dto inDto = new BaseDto();
		inDto.setDefaultAList(list);
		partService.savePartUserGrantDatas(inDto);
		setOkTipMsg("授权数据保存成功", response);
		return mapping.findForward(null);
	}

}
