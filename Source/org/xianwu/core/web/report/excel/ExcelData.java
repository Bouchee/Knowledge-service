package org.xianwu.core.web.report.excel;

import java.util.List;

import org.xianwu.core.metatype.Dto;

/**
 * Excel数据对象
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class ExcelData {

	/**
	 * Excel参数元数据对象
	 */
	private Dto parametersDto;

	/**
	 * Excel集合元对象
	 */
	@SuppressWarnings("rawtypes")
	private List fieldsList;

	/**
	 * 构造函数
	 * 
	 * @param pDto
	 *            元参数对象
	 * @param pList
	 *            集合元对象
	 */
	@SuppressWarnings("rawtypes")
	public ExcelData(Dto pDto, List pList) {
		setParametersDto(pDto);
		setFieldsList(pList);
	}

	public Dto getParametersDto() {
		return parametersDto;
	}

	public void setParametersDto(Dto parametersDto) {
		this.parametersDto = parametersDto;
	}

	@SuppressWarnings("rawtypes")
	public List getFieldsList() {
		return fieldsList;
	}

	@SuppressWarnings("rawtypes")
	public void setFieldsList(List fieldsList) {
		this.fieldsList = fieldsList;
	}

}
