package org.xianwu.system.admin.web;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.mvc.xstruts.action.ActionForm;
import org.xianwu.core.mvc.xstruts.action.ActionForward;
import org.xianwu.core.mvc.xstruts.action.ActionMapping;
import org.xianwu.core.util.Constants;
import org.xianwu.core.util.Utils;
import org.xianwu.core.web.BizAction;
import org.xianwu.core.web.CommonActionForm;
import org.xianwu.system.admin.service.MonitorService;

/**
 * JDBC监控
 * 
 * @author XianwuFu
 * @since 2013-01-01
 * @see BizAction
 */
public class JdbcMonitorAction extends BizAction {

	private MonitorService monitorService = (MonitorService) super.getService("monitorService");

	/**
	 * JDBC实时监控页面初始化
	 * 
	 * @param
	 * @return
	 */
	public ActionForward jdbcInit(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {

		return mapping.findForward("jdbcInitView");
	}

	/**
	 * 查询监控信息
	 * 
	 * @param
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public ActionForward queryMonitorData(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		dto.put("ksrq", Utils.Date2String(dto.getAsDate("ksrq"), "yyyyMMdd000000"));
		dto.put("jsrq", Utils.Date2String(dto.getAsDate("jsrq"), "yyyyMMdd235959"));
		List eventList = g4Reader.queryForPage("Monitor.queryJdbcMonitorRecordsByDto", dto);
		for (int i = 0; i < eventList.size(); i++) {
			Dto dto2 = (BaseDto) eventList.get(i);
			dto2.put("starttime", Utils.stringToDate(dto2.getAsString("starttime"), "yyyyMMddHHmmss", "yyyy-MM-dd HH:mm:ss"));
			dto2.put("effectrows", dto2.getAsString("effectrows").equals("-1") ? "-" : dto2.getAsString("effectrows"));
		}
		Integer totalCount = (Integer) g4Reader.queryForObject("Monitor.queryJdbcMonitorRecordsByDtoForPageCount", dto);
		String jsonString = encodeList2PageJson(eventList, totalCount, Constants.FORMAT_DateTime);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 删除监控信息
	 * 
	 * @param
	 * @return
	 */
	public ActionForward deleteMonitorDatas(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		monitorService.deleteJDBCMonitorData(dto);
		if (dto.getAsString("type").equalsIgnoreCase("reset"))
			setOkTipMsg("执行成功,所有监控记录已被清除!", response);
		else
			setOkTipMsg("数据删除成功!", response);
		return mapping.findForward(null);
	}

}
