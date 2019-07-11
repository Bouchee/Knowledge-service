package org.xianwu.core.web.report.excel;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import jxl.Cell;
import jxl.CellView;
import jxl.JXLException;
import jxl.Workbook;
import jxl.format.Alignment;
import jxl.format.VerticalAlignment;
import jxl.write.Label;
import jxl.write.Number;
import jxl.write.WritableCellFormat;
import jxl.write.WritableFont;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.xianwu.core.metatype.BaseDomain;
import org.xianwu.core.metatype.BaseVo;
import org.xianwu.core.metatype.Dto;
import org.xianwu.core.metatype.impl.BaseDto;
import org.xianwu.core.util.Constants;
import org.xianwu.core.util.Utils;
import org.xianwu.core.web.util.WebUtils;

/**
 * Excel数据填充器
 * 
 * @author XianwuFu
 * @since 2013-01-01
 */
public class ExcelFiller {

	private Log log = LogFactory.getLog(ExcelFiller.class);

	private ExcelTemplate excelTemplate = null;

	private ExcelData excelData = null;
	
	private WritableFont wfTitle = new jxl.write.WritableFont(WritableFont.createFont("微软雅黑"));//(WritableFont.ARIAL, 18, WritableFont.BOLD,true);   
	private WritableCellFormat wcfTitle = new WritableCellFormat(wfTitle);

	public ExcelFiller() {
	}

	/**
	 * 构造函数
	 * 
	 * @param pExcelTemplate
	 * @param pExcelData
	 */
	public ExcelFiller(ExcelTemplate pExcelTemplate, ExcelData pExcelData) {
		setExcelData(pExcelData);
		setExcelTemplate(pExcelTemplate);
	}

	/**
	 * 数据填充 将ExcelData填入excel模板
	 * 
	 * @return ByteArrayOutputStream
	 */
	public ByteArrayOutputStream fill(HttpServletRequest request) {
		WritableSheet wSheet = null;
		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		try {
	        InputStream is = request.getSession().getServletContext().getResourceAsStream(getExcelTemplate().getTemplatePath()); 
			Workbook wb = Workbook.getWorkbook(is);
			WritableWorkbook wwb = Workbook.createWorkbook(bos, wb);
			wSheet = wwb.getSheet(0);
			
			//fillStatics(wSheet);
			fillParameters(wSheet, request);
			fillFields(wSheet, request);
			if (Utils.isNotEmpty(getExcelData().getFieldsList())) {
				// fillFields(wSheet);
			}
			wwb.write();
			
			CellView cellView = new CellView();
			cellView.setAutosize(true); // 设置自动大小
			for (int j = wSheet.getColumns() - 1; j > 0; j--) {
				wSheet.setColumnView(j, cellView);// 根据内容自动设置列宽
			}
			
			wwb.close();
			wb.close();
		} catch (Exception e) {
			log.error(Constants.Exception_Head + "基于模板生成的工作表出错了!");
			e.printStackTrace();
		}
		return bos;
	}

	/**
	 * 写入静态对象
	 */
	@SuppressWarnings({ "rawtypes", "unused" })
	private void fillStatics(WritableSheet wSheet) throws JXLException {
		List statics = getExcelTemplate().getStaticObject();
		wcfTitle.setAlignment(Alignment.CENTRE);  // 设置水平对齐方式
		wcfTitle.setVerticalAlignment(VerticalAlignment.CENTRE); // 设置垂直对齐方式
		wcfTitle.setWrap(false); // 设置是否自动换行 
		for (int i = 0; i < statics.size(); i++) {
			Cell cell = (Cell) statics.get(i);
			Label label = new Label(cell.getColumn(), cell.getRow(), cell.getContents(), wcfTitle);
			label.setCellFormat(cell.getCellFormat());
			try {
				wSheet.addCell(label);
			} catch (Exception e) {
				log.error(Constants.Exception_Head + "写入静态对象发生错误!");
				e.printStackTrace();
			}
		}
	}

	/**
	 * 写入参数对象
	 */
	@SuppressWarnings("rawtypes")
	private void fillParameters(WritableSheet wSheet, HttpServletRequest request) {
		List parameters = getExcelTemplate().getParameterObjct();
		Dto parameterDto = getExcelData().getParametersDto();
		String insertData = "";
		
		CellView cellView = new CellView(); 
		cellView.setAutosize(true);
		
		for (int i = 0; i < parameters.size(); i++) {
			Cell cell = (Cell) parameters.get(i);
			String key = getKey(cell.getContents().trim());
			String type = getType(cell.getContents().trim());
			try {
				if (type.equalsIgnoreCase(Constants.ExcelTPL_DataType_Number)) {
					Number number = new Number(cell.getColumn(), cell.getRow(), parameterDto.getAsBigDecimal(key)
							.doubleValue());
					number.setCellFormat(cell.getCellFormat());
					wSheet.addCell(number);
				} else {
					List codeList = WebUtils.getCodeListByField(key, request);
					if (Utils.isEmpty(codeList)){
						insertData = parameterDto.getAsString(key);
					} else {
						insertData = WebUtils.getCodeDesc(key, parameterDto.getAsString(key), request);
					}
					wSheet.setColumnView(cell.getColumn(), cellView);//根据内容自动设置列宽
					
					Label label = new Label(cell.getColumn(), cell.getRow(), insertData);
					label.setCellFormat(cell.getCellFormat());
					wSheet.addCell(label);
				}
			} catch (Exception e) {
				log.error(Constants.Exception_Head + "写入表格参数对象发生错误!");
				e.printStackTrace();
			}
		}
	}

	/**
	 * 写入表格字段对象
	 * 
	 * @throws Exception
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	private void fillFields(WritableSheet wSheet, HttpServletRequest request) throws Exception {
		List fields = getExcelTemplate().getFieldObjct();
		List fieldList = getExcelData().getFieldsList();
		String insertData = "";
		
		for (int j = 0; j < fieldList.size(); j++) {
			Dto dataDto = new BaseDto();
			Object object = fieldList.get(j);
			if (object instanceof BaseDomain) {
				BaseDomain domain = (BaseDomain) object;
				dataDto.putAll(domain.toDto());
			} else if (object instanceof BaseVo) {
				BaseVo vo = (BaseVo) object;
				dataDto.putAll(vo.toDto());
			} else if (object instanceof BaseDto) {
				Dto dto = (BaseDto) object;
				dataDto.putAll(dto);
			} else {
				log.error(Constants.Exception_Head + "不支持的数据类型!");
			}
			for (int i = 0; i < fields.size(); i++) {
				Cell cell = (Cell) fields.get(i);
				String key = getKey(cell.getContents().trim());
				String type = getType(cell.getContents().trim());
				try {
					if (type.equalsIgnoreCase(Constants.ExcelTPL_DataType_Number)) {
						Number number = new Number(cell.getColumn(), cell.getRow() + j, dataDto.getAsBigDecimal(key)
								.doubleValue());
						number.setCellFormat(cell.getCellFormat());
						wSheet.addCell(number);
					} else {
						List codeList = WebUtils.getCodeListByField(key, request);
						if (Utils.isEmpty(codeList)){
							insertData = dataDto.getAsString(key);
						} else {
							insertData = WebUtils.getCodeDesc(key, dataDto.getAsString(key), request);
						}
						Label label = new Label(cell.getColumn(), cell.getRow() + j, insertData);
						label.setCellFormat(cell.getCellFormat());
						wSheet.addCell(label);
					}
				} catch (Exception e) {
					log.error(Constants.Exception_Head + "写入表格字段对象发生错误!");
					e.printStackTrace();
				}
			}
		}
		int row = 0;
		row += fieldList.size();
		if (Utils.isEmpty(fieldList)) {
			if (Utils.isNotEmpty(fields)) {
				Cell cell = (Cell) fields.get(0);
				row = cell.getRow();
				wSheet.removeRow(row+5);
				wSheet.removeRow(row+4);
				wSheet.removeRow(row+3);
				wSheet.removeRow(row+2);
				wSheet.removeRow(row+1);
				wSheet.removeRow(row);
			}
		}else {
			Cell cell = (Cell) fields.get(0);
			row += cell.getRow();
			fillVariables(wSheet, row);
		}
	}

	/**
	 * 写入变量对象
	 */
	@SuppressWarnings("rawtypes")
	private void fillVariables(WritableSheet wSheet, int row) {
		List variables = getExcelTemplate().getVariableObject();
		Dto parameterDto = getExcelData().getParametersDto();
		for (int i = 0; i < variables.size(); i++) {
			Cell cell = (Cell) variables.get(i);
			String key = getKey(cell.getContents().trim());
			String type = getType(cell.getContents().trim());
			try {
				if (type.equalsIgnoreCase(Constants.ExcelTPL_DataType_Number)) {
					Number number = new Number(cell.getColumn(), row, parameterDto.getAsBigDecimal(key).doubleValue());
					number.setCellFormat(cell.getCellFormat());
					wSheet.addCell(number);
				} else {
					String content = parameterDto.getAsString(key);
					if (Utils.isEmpty(content) && !key.equalsIgnoreCase("nbsp")) {
						content = key;
					}
					Label label = new Label(cell.getColumn(), row, content);
					label.setCellFormat(cell.getCellFormat());
					wSheet.addCell(label);
				}
			} catch (Exception e) {
				log.error(Constants.Exception_Head + "写入表格变量对象发生错误!");
				e.printStackTrace();
			}
		}
	}

	/**
	 * 获取模板键名
	 * 
	 * @param pKey
	 *            模板元标记
	 * @return 键名
	 */
	private static String getKey(String pKey) {
		String key = null;
		int index = pKey.indexOf(":");
		if (index == -1) {
			key = pKey.substring(3, pKey.length() - 1);
		} else {
			key = pKey.substring(3, index);
		}
		return key;
	}

	/**
	 * 获取模板单元格标记数据类型
	 * 
	 * @param pType
	 *            模板元标记
	 * @return 数据类型
	 */
	private static String getType(String pType) {
		String type = Constants.ExcelTPL_DataType_Label;
		if (pType.indexOf(":n") != -1 || pType.indexOf(":N") != -1) {
			type = Constants.ExcelTPL_DataType_Number;
		}
		return type;
	}

	public ExcelTemplate getExcelTemplate() {
		return excelTemplate;
	}

	public void setExcelTemplate(ExcelTemplate excelTemplate) {
		this.excelTemplate = excelTemplate;
	}

	public ExcelData getExcelData() {
		return excelData;
	}

	public void setExcelData(ExcelData excelData) {
		this.excelData = excelData;
	}
}
