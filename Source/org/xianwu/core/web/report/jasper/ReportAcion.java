package org.xianwu.core.web.report.jasper;

import java.io.InputStream;
import java.io.ObjectOutputStream;
import java.io.OutputStream;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.JRExporterParameter;
import net.sf.jasperreports.engine.JRRuntimeException;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.engine.util.JRLoader;

import org.xianwu.core.metatype.Dto;
import org.xianwu.core.mvc.xstruts.action.ActionForm;
import org.xianwu.core.mvc.xstruts.action.ActionForward;
import org.xianwu.core.mvc.xstruts.action.ActionMapping;
import org.xianwu.core.util.Utils;
import org.xianwu.core.web.BizAction;

/**
 * JasperReport报表服务Acion
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class ReportAcion extends BizAction {

	/**
	 * 打印模板页面初始化
	 * 
	 * @param
	 * @return
	 */
	public ActionForward initAppletPage(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String flag = request.getParameter("flag");
		String url = request.getContextPath() + "/report.do?code=appletPreview&jsessionid=" + request.getSession().getId();
		if (!Utils.isEmpty(flag)) {
			url = url + "&reportflag=" + flag;
		}
		request.setAttribute("dataUrl", url);
		return mapping.findForward("printInitView");
	}
	
	/**
	 * PDF模板页面初始化
	 * 
	 * @param
	 * @return
	 */
	public ActionForward initPdfPage(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String flag = request.getParameter("flag");
		String url = request.getContextPath() + "/report.do?code=pdfPreview&jsessionid=" + request.getSession().getId();
		if (!Utils.isEmpty(flag)) {
			url = url + "&reportflag=" + flag;
		}
		request.setAttribute("dataUrl", url);
		return mapping.findForward("pdfInitView");
	}

	/**
	 * 实例化报表对象,填充报表数据 显示方式:applet
	 * 
	 * @param
	 * @return
	 */
	public ActionForward appletPreview(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// 接收url传过来的报表标识参数
		String flag = request.getParameter("reportflag");
		flag = Utils.isEmpty(flag) ? "default" : flag;
		JasperPrint jasperPrint = getJasperPrintObjectFromSession(flag, request);
		if (Utils.isEmpty(jasperPrint)) {
			throw new JRRuntimeException("实例化打印对象失败,请检查填充数据域和模板文件");
		}
		response.setContentType("application/octet-stream");
		ServletOutputStream ouputStream = response.getOutputStream();
		ObjectOutputStream oos = new ObjectOutputStream(ouputStream);
		oos.writeObject(jasperPrint);
		oos.flush();
		oos.close();
		ouputStream.flush();
		ouputStream.close();
		return mapping.findForward(null);
	}

	/**
	 * 实例化报表对象,填充报表数据 显示方式:pdf
	 * 
	 * @param
	 * @return
	 */
	public ActionForward pdfPreview(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// 接收url传过来的报表标识参数
		String flag = request.getParameter("reportflag");
		flag = Utils.isEmpty(flag) ? "default" : flag;
		JasperPrint jasperPrint = getJasperPrintObjectFromSession(flag, request);
		if (Utils.isEmpty(jasperPrint)) {
			throw new JRRuntimeException("实例化打印对象失败,请检查填充数据域和模板文件");
		}
		OutputStream os = response.getOutputStream();
		response.setContentType("application/pdf");
		JRPdfExporter exporter = new JRPdfExporter();
		exporter.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint);
		exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, os);
		exporter.exportReport();
		os.close();
		return mapping.findForward(null);
	}

	/**
	 * 获取JasperPrint对象
	 * 
	 * @param pFlag
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	private JasperPrint getJasperPrintObjectFromSession(String pFlag, HttpServletRequest request) throws Exception {
		ReportData reportData = super.getSessionContainer(request).getReportData(pFlag);
		if (Utils.isEmpty(reportData)) {
			throw new JRRuntimeException("没有获取到报表数据对象[ReportData],请检查!");
		}
        InputStream is = getServlet().getServletContext().getResourceAsStream(reportData.getReportFilePath()); 
		if (is == null) {
			throw new JRRuntimeException("模板文件未找到,请确认模板文件路径是否正确" + "[" + reportData.getReportFilePath() + "]");
		}
		JasperPrint jasperPrint = null;
		JasperReport jasperReport = (JasperReport) JRLoader.loadObject(is);
		List fieldsList = reportData.getFieldsList();
		
		//新增库存的list
				List fieldsList1 = reportData.getFieldsList1();
				List fieldsList2 = reportData.getFieldsList2();
	    //新增结束
				
		if (Utils.isEmpty(fieldsList)) {
			jasperPrint = JasperFillManager.fillReport(jasperReport, reportData.getParametersDto(),
					new JREmptyDataSource());
		} else {
			JRBeanCollectionDataSource jRDataSource = new JRBeanCollectionDataSource(fieldsList);
			
			
			// 新增参数
			
			JRBeanCollectionDataSource sapdata = new JRBeanCollectionDataSource(fieldsList1);
			Dto dto = reportData.getParametersDto();
			dto.put("shujuyuan2", sapdata);
			JRBeanCollectionDataSource Ctparameter = new JRBeanCollectionDataSource(fieldsList2);

			dto.put("shujuyuan1", Ctparameter);
				
			
			
			jasperPrint = JasperFillManager.fillReport(jasperReport, dto, jRDataSource);
		}
		return jasperPrint;
	}
}
