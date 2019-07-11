package org.xianwu.core.web.report.jasper;

import java.util.List;

import org.xianwu.core.metatype.Dto;

/**
 * 报表数据模板
 * @author XianwuFu
 * @since 2013-01-01
 */
public class ReportData {
	/**
	 * 报表文件路径
	 */
	private String reportFilePath;

	/**
	 * 报表参数对象
	 */
	private Dto parametersDto;

	/**
	 * 报表集合对象
	 */
	@SuppressWarnings("rawtypes")
	private List fieldsList;
	private List fieldsList1;
	private List fieldsList2;
	
	
	public ReportData() {}
	
	/**
	 * 构造函数
	 * 
	 * @param pReportFilePath 报表文件路径
	 * @param pParametersDto 报表参数集
	 * @param pFieldsList 报表字段列表集合
	 */
	@SuppressWarnings("rawtypes")
	public ReportData(String pReportFilePath, Dto pParametersDto, List pFieldsList) {
		reportFilePath = pReportFilePath;
		parametersDto = pParametersDto;
		fieldsList = pFieldsList;
	}
    
	public String getReportFilePath() {
		return reportFilePath;
	}

	/**
	 * 设置报表文件路径
	 * @param reportFilePath
	 */
	public void setReportFilePath(String reportFilePath) {
		this.reportFilePath = reportFilePath;
	}

	public Dto getParametersDto() {
		return parametersDto;
	}

	/**
	 * 设置报表参数集
	 * @param parametersDto
	 */
	public void setParametersDto(Dto parametersDto) {
		this.parametersDto = parametersDto;
	}

	@SuppressWarnings("rawtypes")
	public List getFieldsList() {
		return fieldsList;
	}

	/**
	 * 设置报表字段列表集合
	 * @param fieldsList
	 */
	@SuppressWarnings("rawtypes")
	public void setFieldsList(List fieldsList) {
		this.fieldsList = fieldsList;
	}
	
	
	public List getFieldsList1() {
		return fieldsList1;
	}

	public void setFieldsList1(List fieldsList1) {
		this.fieldsList1 = fieldsList1;
	}

	public List getFieldsList2() {
		return fieldsList2;
	}

	public void setFieldsList2(List fieldsList2) {
		this.fieldsList2 = fieldsList2;
	}

}
