package org.xianwu.system.devtoolkit.web;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.xianwu.core.json.JsonHelper;
import org.xianwu.core.metatype.Dto;
import org.xianwu.core.mvc.xstruts.action.ActionForm;
import org.xianwu.core.mvc.xstruts.action.ActionForward;
import org.xianwu.core.mvc.xstruts.action.ActionMapping;
import org.xianwu.core.web.BizAction;
import org.xianwu.core.web.CommonActionForm;

/**
 * 代码生成Action
 *
 * @author XianwuFu
 * @since 2013-01-01
 */
public class CodeGeneratorAction extends BizAction {

	/**
	 * 数据访问层代码生成向导页面初始化
	 *
	 * @param
	 * @return
	 */
	public ActionForward daoCodeInit(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return mapping.findForward("daoCodeInitView");
	}

	/**
	 * 查询表结构
	 *
	 * @param
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public ActionForward queryTables(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto inDto = aForm.getParamAsDto(request);
		inDto.put("table_name", inDto.getAsString("table_name").toLowerCase());
		List codeList = g4Reader.queryForPage("DevToolkit.Oracle.queryTables", inDto);
		Integer totalCount = (Integer) g4Reader.queryForObject("DevToolkit.Oracle.queryTablesForPageCount", inDto);
		String jsonStrList = JsonHelper.encodeList2PageJson(codeList, totalCount, null);
		write(jsonStrList, response);
		return mapping.findForward(null);
	}


}
